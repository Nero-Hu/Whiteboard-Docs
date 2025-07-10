import os
import sys
import logging
import argparse
from pathlib import Path
from typing import List, Dict
import yaml
import json
from datetime import datetime
import hashlib

class DocSynchronizer:
    def __init__(self, config_path: str = "../../config/sync_config.yaml", interactive: bool = True):
        self.config = self._load_config(config_path)
        self.setup_logging()
        self.logger = logging.getLogger(__name__)
        self.interactive = interactive  # 是否启用交互模式
        
    def _load_config(self, config_path: str) -> Dict:
        """加载配置文件"""
        with open(config_path, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)
        
        # 如果配置文件中使用占位符，从环境变量替换
        if config.get('target', {}).get('github_token') == 'PLACEHOLDER_TOKEN':
            import os
            sync_token = os.environ.get('GITHUB_TOKEN')
            if sync_token:
                config['target']['github_token'] = sync_token
            else:
                raise ValueError("未找到GITHUB_TOKEN环境变量")
        
        return config
    
    def setup_logging(self):
        """设置日志"""
        log_dir = Path("../../logs")
        log_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        log_file = log_dir / f"doc_sync_{timestamp}.log"
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file, encoding='utf-8'),
                logging.StreamHandler(sys.stdout)
            ]
        )
    
    def sync_docs(self, platform: str = None, force: bool = False, dry_run: bool = False) -> bool:
        """同步文档到shengwang-doc-source仓库"""
        try:
            self.logger.info(f"开始同步文档，平台: {platform or 'all'}, 强制同步: {force}, 测试模式: {dry_run}")
            
            # 1. 准备目标仓库
            target_repo_path = self._prepare_target_repo()
            
            # 2. 检测变更（改进：在目标仓库中比较文件内容）
            if not force:
                changes = self._detect_changes(target_repo_path, platform)
                if not changes:
                    self.logger.info("未检测到文档变更，跳过同步")
                    return True
            
            # 3. 执行同步
            sync_results = self._perform_sync(target_repo_path, platform, dry_run)
            
            # 4. 创建分支和PR（仅在非测试模式下）
            if sync_results['has_changes'] and not dry_run:
                self._create_branch_and_pr(sync_results)
            elif sync_results['has_changes'] and dry_run:
                self.logger.info("测试模式：检测到变更，但跳过创建分支和PR")
            
            self.logger.info("文档同步完成")
            return True
            
        except Exception as e:
            self.logger.error(f"文档同步失败: {e}", exc_info=True)
            return False
    
    def _detect_changes(self, target_repo_path: Path, platform: str = None) -> Dict:
        """检测文档变更（改进：在目标仓库中比较文件内容）"""
        self.logger.info("检测文档变更...")
        
        changes = {
            'release_notes': [],
            'api_docs': [],
            'platforms': []
        }
        
        # 检查发版说明变更
        for source_path, target_path in self.config['sync_mapping']['release_notes'].items():
            if platform and platform not in source_path:
                continue
                
            source_file = Path("../../") / source_path
            target_file = target_repo_path / target_path / Path(source_path).name
            
            if source_file.exists() and self._has_content_changes(source_file, target_file):
                changes['release_notes'].append(source_path)
                changes['platforms'].append(self._extract_platform(source_path))
        
        # 检查API文档变更
        for source_path, target_path in self.config['sync_mapping']['api_docs'].items():
            if platform and platform not in source_path:
                continue
                
            source_file = Path("../../") / source_path
            target_file = target_repo_path / target_path / Path(source_path).name
            
            if source_file.exists() and self._has_content_changes(source_file, target_file):
                changes['api_docs'].append(source_path)
                changes['platforms'].append(self._extract_platform(source_path))
        
        changes['platforms'] = list(set(changes['platforms']))
        
        self.logger.info(f"检测到变更: {len(changes['release_notes'])} 个发版说明, {len(changes['api_docs'])} 个API文档")
        return changes
    
    def _has_content_changes(self, source_file: Path, target_file: Path) -> bool:
        """检查文件内容是否有变更（改进：使用哈希比较）"""
        try:
            # 如果目标文件不存在，认为有变更
            if not target_file.exists():
                self.logger.debug(f"目标文件不存在，认为有变更: {target_file}")
                return True
            
            # 计算源文件和目标文件的哈希值
            source_hash = self._calculate_file_hash(source_file)
            target_hash = self._calculate_file_hash(target_file)
            
            has_changes = source_hash != target_hash
            if has_changes:
                self.logger.debug(f"文件内容有变更: {source_file} -> {target_file}")
            else:
                self.logger.debug(f"文件内容相同: {source_file}")
            
            return has_changes
            
        except Exception as e:
            self.logger.warning(f"比较文件内容时出错 {source_file}: {e}")
            # 如果比较失败，默认认为有变更
            return True
    
    def _calculate_file_hash(self, file_path: Path) -> str:
        """计算文件的MD5哈希值"""
        hash_md5 = hashlib.md5()
        try:
            with open(file_path, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    hash_md5.update(chunk)
            return hash_md5.hexdigest()
        except Exception as e:
            self.logger.error(f"计算文件哈希失败 {file_path}: {e}")
            raise
    
    def _extract_platform(self, file_path: str) -> str:
        """从文件路径提取平台信息"""
        if 'android' in file_path:
            return 'android'
        elif 'ios' in file_path:
            return 'ios'
        elif 'web' in file_path:
            return 'web'
        return 'unknown'
    
    def _prepare_target_repo(self) -> Path:
        """准备目标仓库（改进：添加安全检查）"""
        self.logger.info("准备目标仓库...")
        
        target_repo_path = Path(self.config['target']['repo_path'])
        
        if not target_repo_path.exists():
            self.logger.info("克隆目标仓库...")
            import subprocess
            subprocess.run([
                'git', 'clone', 
                self.config['target']['repo_url'], 
                str(target_repo_path)
            ], check=True)
            return target_repo_path
        
        # 检查工作区状态
        import subprocess
        
        # 检查是否有未提交的更改
        status_result = subprocess.run(
            ['git', 'status', '--porcelain'], 
            cwd=target_repo_path, capture_output=True, text=True
        )
        
        if status_result.stdout.strip():
            self.logger.warning("检测到未提交的更改！")
            self.logger.warning("未提交的文件:")
            for line in status_result.stdout.strip().split('\n'):
                if line.strip():
                    self.logger.warning(f"  {line}")
            
            # 询问用户是否继续
            if self.interactive:
                response = input("\n⚠️  目标仓库有未提交的更改，是否继续？(y/N): ").strip().lower()
                if response not in ['y', 'yes']:
                    raise Exception("用户取消操作：目标仓库有未提交的更改")
            else:
                self.logger.error("非交互模式下检测到未提交的更改，拒绝继续")
                raise Exception("目标仓库有未提交的更改，请在交互模式下运行或清理工作区")
        
        # 检查当前分支
        current_branch_result = subprocess.run(
            ['git', 'branch', '--show-current'], 
            cwd=target_repo_path, capture_output=True, text=True, check=True
        )
        current_branch = current_branch_result.stdout.strip()
        
        self.logger.info(f"当前分支: {current_branch}")
        
        # 如果不在master分支，自动切换到master（因为工作区已经确认干净）
        if current_branch != 'master':
            self.logger.info(f"切换到master分支...")
            subprocess.run(['git', 'checkout', 'master'], cwd=target_repo_path, check=True)
        
        # 更新到最新
        self.logger.info("拉取最新代码...")
        subprocess.run(['git', 'fetch'], cwd=target_repo_path, check=True)
        subprocess.run(['git', 'pull'], cwd=target_repo_path, check=True)
        
        return target_repo_path
    
    def _perform_sync(self, target_repo_path: Path, platform: str = None, dry_run: bool = False) -> Dict:
        """执行同步操作"""
        self.logger.info("执行文档同步...")
        
        sync_results = {
            'has_changes': False,
            'synced_files': [],
            'platforms': [],
            'errors': []
        }
        
        # 同步发版说明
        for source_path, target_path in self.config['sync_mapping']['release_notes'].items():
            if platform and platform not in source_path:
                continue
                
            try:
                source_file = Path("../../") / source_path
                target_file = target_repo_path / target_path / Path(source_path).name
                
                if self._sync_file(source_file, target_file, dry_run):
                    sync_results['synced_files'].append(source_path)
                    sync_results['platforms'].append(self._extract_platform(source_path))
                    sync_results['has_changes'] = True
            except Exception as e:
                error_msg = f"同步发版说明失败 {source_path}: {e}"
                self.logger.error(error_msg)
                sync_results['errors'].append(error_msg)
        
        # 同步API文档
        for source_path, target_path in self.config['sync_mapping']['api_docs'].items():
            if platform and platform not in source_path:
                continue
                
            try:
                source_file = Path("../../") / source_path
                target_file = target_repo_path / target_path / Path(source_path).name
                
                if self._sync_file(source_file, target_file, dry_run):
                    sync_results['synced_files'].append(source_path)
                    sync_results['platforms'].append(self._extract_platform(source_path))
                    sync_results['has_changes'] = True
            except Exception as e:
                error_msg = f"同步API文档失败 {source_path}: {e}"
                self.logger.error(error_msg)
                sync_results['errors'].append(error_msg)
        
        sync_results['platforms'] = list(set(sync_results['platforms']))
        self.logger.info(f"同步完成: {len(sync_results['synced_files'])} 个文件, {len(sync_results['errors'])} 个错误")
        return sync_results
    
    def _sync_file(self, source_file: Path, target_file: Path, dry_run: bool = False) -> bool:
        """同步单个文件"""
        try:
            # 确保目标目录存在
            target_file.parent.mkdir(parents=True, exist_ok=True)
            
            # 如果目标文件存在，比较内容
            if target_file.exists():
                if self._files_identical(source_file, target_file):
                    self.logger.info(f"文件内容相同，跳过: {source_file}")
                    return False
            
            if dry_run:
                self.logger.info(f"测试模式：检测到文件变更 {source_file} -> {target_file}")
                return True
            
            # 复制文件
            import shutil
            shutil.copy2(source_file, target_file)
            
            self.logger.info(f"同步文件: {source_file} -> {target_file}")
            return True
            
        except Exception as e:
            self.logger.error(f"同步文件失败 {source_file}: {e}")
            return False
    
    def _files_identical(self, file1: Path, file2: Path) -> bool:
        """比较两个文件是否相同（改进：使用哈希比较）"""
        try:
            return self._calculate_file_hash(file1) == self._calculate_file_hash(file2)
        except:
            return False
    
    def _create_branch_and_pr(self, sync_results: Dict):
        """创建分支和PR（改进：添加回滚机制）"""
        self.logger.info("创建分支和PR...")
        
        target_repo_path = Path(self.config['target']['repo_path'])
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        branch_name = f"sync/fastboard-docs-{timestamp}"
        
        # 记录当前分支，用于回滚
        current_branch = None
        branch_created = False
        branch_pushed = False
        pr_created = False
        
        try:
            import subprocess
            
            # 获取当前分支
            result = subprocess.run(['git', 'branch', '--show-current'], 
                                  cwd=target_repo_path, capture_output=True, text=True, check=True)
            current_branch = result.stdout.strip()
            self.logger.info(f"当前分支: {current_branch}")
            
            # 配置Git用户信息（GitHub Actions环境需要）
            subprocess.run(['git', 'config', 'user.name', 'GitHub Actions'], cwd=target_repo_path, check=True)
            subprocess.run(['git', 'config', 'user.email', 'actions@github.com'], cwd=target_repo_path, check=True)
            self.logger.info("已配置Git用户信息")
            
            # 创建新分支
            subprocess.run(['git', 'checkout', '-b', branch_name], cwd=target_repo_path, check=True)
            branch_created = True
            self.logger.info(f"创建分支: {branch_name}")
            
            # 检查工作区状态
            status_result = subprocess.run(['git', 'status', '--porcelain'], 
                                         cwd=target_repo_path, capture_output=True, text=True, check=True)
            self.logger.info(f"工作区状态:\n{status_result.stdout}")
            
            if not status_result.stdout.strip():
                self.logger.warning("工作区没有可提交的更改")
                return
            
            # 添加变更
            subprocess.run(['git', 'add', '.'], cwd=target_repo_path, check=True)
            self.logger.info("已添加所有变更到暂存区")
            
            # 检查暂存区状态
            staged_result = subprocess.run(['git', 'diff', '--cached', '--name-only'], 
                                         cwd=target_repo_path, capture_output=True, text=True, check=True)
            self.logger.info(f"暂存区文件:\n{staged_result.stdout}")
            
            if not staged_result.stdout.strip():
                self.logger.warning("暂存区没有文件，跳过提交")
                return
            
            # 提交变更
            synced_files_list = "\n".join(f"- {f}" for f in sync_results['synced_files'])
            commit_message = f"docs: sync fastboard docs\n\n同步文件:\n{synced_files_list}"
            self.logger.info(f"提交信息:\n{commit_message}")
            
            try:
                # 使用临时文件来避免命令行参数问题
                import tempfile
                with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False, encoding='utf-8') as f:
                    f.write(commit_message)
                    temp_file = f.name
                
                try:
                    subprocess.run(['git', 'commit', '-F', temp_file], cwd=target_repo_path, check=True)
                    self.logger.info("提交成功")
                finally:
                    # 清理临时文件
                    import os
                    if os.path.exists(temp_file):
                        os.unlink(temp_file)
                        
            except subprocess.CalledProcessError as e:
                self.logger.error(f"提交失败: {e}")
                # 获取更详细的错误信息
                error_result = subprocess.run(['git', 'status'], 
                                            cwd=target_repo_path, capture_output=True, text=True)
                self.logger.error(f"Git状态:\n{error_result.stdout}")
                raise
            
            # 推送分支
            subprocess.run(['git', 'push', 'origin', branch_name], cwd=target_repo_path, check=True)
            branch_pushed = True
            self.logger.info(f"推送分支: {branch_name}")
            
            # 创建PR
            self._create_pr_via_api(branch_name, sync_results)
            pr_created = True
            self.logger.info(f"成功创建PR: {branch_name}")
            
        except Exception as e:
            self.logger.error(f"创建分支和PR失败: {e}", exc_info=True)
            
            # 执行回滚操作
            self._rollback_branch_creation(target_repo_path, current_branch, branch_name, 
                                         branch_created, branch_pushed, pr_created)
            
            # 提供更详细的错误信息
            if "Command" in str(e) and "git commit" in str(e):
                self.logger.error("Git提交失败的可能原因:")
                self.logger.error("1. 没有可提交的更改")
                self.logger.error("2. 提交信息格式问题")
                self.logger.error("3. Git配置问题（用户名/邮箱未设置）")
                self.logger.error("4. 文件权限问题")
                
                # 检查Git配置
                try:
                    config_result = subprocess.run(['git', 'config', '--list'], 
                                                 cwd=target_repo_path, capture_output=True, text=True)
                    self.logger.error(f"当前Git配置:\n{config_result.stdout}")
                except Exception as config_error:
                    self.logger.error(f"无法获取Git配置: {config_error}")
            
            raise
    
    def _rollback_branch_creation(self, target_repo_path: Path, current_branch: str, 
                                 branch_name: str, branch_created: bool, 
                                 branch_pushed: bool, pr_created: bool):
        """回滚分支创建操作"""
        self.logger.info("开始回滚分支创建操作...")
        
        try:
            import subprocess
            
            # 1. 如果PR已创建，尝试删除PR（通过API）
            if pr_created:
                self.logger.info("尝试删除已创建的PR...")
                self._delete_pr_via_api(branch_name)
            
            # 2. 如果分支已推送，删除远程分支
            if branch_pushed:
                self.logger.info(f"删除远程分支: {branch_name}")
                try:
                    subprocess.run(['git', 'push', 'origin', '--delete', branch_name], 
                                 cwd=target_repo_path, check=True)
                except subprocess.CalledProcessError as e:
                    self.logger.warning(f"删除远程分支失败: {e}")
            
            # 3. 如果分支已创建，切换回原分支并删除本地分支
            if branch_created:
                if current_branch:
                    self.logger.info(f"切换回原分支: {current_branch}")
                    subprocess.run(['git', 'checkout', current_branch], cwd=target_repo_path, check=True)
                
                self.logger.info(f"删除本地分支: {branch_name}")
                try:
                    subprocess.run(['git', 'branch', '-D', branch_name], cwd=target_repo_path, check=True)
                except subprocess.CalledProcessError as e:
                    self.logger.warning(f"删除本地分支失败: {e}")
            
            self.logger.info("回滚操作完成")
            
        except Exception as e:
            self.logger.error(f"回滚操作失败: {e}", exc_info=True)
    
    def _delete_pr_via_api(self, branch_name: str):
        """通过GitHub API删除PR"""
        try:
            import requests
            
            headers = {
                'Authorization': f'token {self.config["target"]["github_token"]}',
                'Accept': 'application/vnd.github.v3+json'
            }
            
            # 首先获取PR列表，找到对应的PR
            response = requests.get(
                f'https://api.github.com/repos/{self.config["target"]["repo_owner"]}/{self.config["target"]["repo_name"]}/pulls',
                headers=headers,
                params={'head': f'{self.config["target"]["repo_owner"]}:{branch_name}'}
            )
            
            if response.status_code == 200:
                prs = response.json()
                for pr in prs:
                    if pr['head']['ref'] == branch_name:
                        # 删除PR
                        delete_response = requests.delete(
                            f'https://api.github.com/repos/{self.config["target"]["repo_owner"]}/{self.config["target"]["repo_name"]}/pulls/{pr["number"]}',
                            headers=headers
                        )
                        if delete_response.status_code == 204:
                            self.logger.info(f"成功删除PR: {pr['number']}")
                        else:
                            self.logger.warning(f"删除PR失败: {delete_response.status_code}")
                        break
            else:
                self.logger.warning(f"获取PR列表失败: {response.status_code}")
                
        except Exception as e:
            self.logger.error(f"删除PR时出错: {e}")
    
    def _create_pr_via_api(self, branch_name: str, sync_results: Dict):
        """通过GitHub API创建PR"""
        import requests
        
        headers = {
            'Authorization': f'token {self.config["target"]["github_token"]}',
            'Accept': 'application/vnd.github.v3+json'
        }
        
        # 构建PR正文
        platforms = ', '.join(sync_results['platforms'])
        synced_files = '\n'.join(f'- {f}' for f in sync_results['synced_files'])
        
        pr_body = f"""
## 自动同步Fastboard文档

### 同步信息
- **平台**: {platforms}
- **时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

### 同步文件
{synced_files}

### 说明
此PR由自动化脚本生成，用于同步Fastboard文档到发布仓库。
        """.strip()
        
        data = {
            'title': '[AUTO] sync fastboard release docs',
            'body': pr_body,
            'head': branch_name,
            'base': 'master'
        }
        
        response = requests.post(
            f'https://api.github.com/repos/{self.config["target"]["repo_owner"]}/{self.config["target"]["repo_name"]}/pulls',
            headers=headers,
            json=data
        )
        
        if response.status_code == 201:
            pr_data = response.json()
            self.logger.info(f"成功创建PR: {pr_data['html_url']}")
        else:
            self.logger.error(f"创建PR失败: {response.status_code} - {response.text}")
            raise Exception(f"创建PR失败: {response.status_code} - {response.text}")

def main():
    parser = argparse.ArgumentParser(description='同步Fastboard文档到shengwang-doc-source')
    parser.add_argument('--platform', choices=['all', 'android', 'ios', 'web'], help='指定平台（all/android/ios/web，不指定则同步所有平台）')
    parser.add_argument('--force', action='store_true', help='强制同步，忽略变更检测')
    parser.add_argument('--dry-run', action='store_true', help='测试模式，只检测变更不创建PR')
    parser.add_argument('--config', default='../../config/sync_config.yaml', help='配置文件路径')
    parser.add_argument('--non-interactive', action='store_true', help='非交互模式，适用于CI/CD环境')
    
    args = parser.parse_args()
    
    # 处理 'all' 选项
    platform = None if args.platform == 'all' else args.platform
    
    synchronizer = DocSynchronizer(args.config, interactive=not args.non_interactive)
    success = synchronizer.sync_docs(platform, args.force, args.dry_run)
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main() 