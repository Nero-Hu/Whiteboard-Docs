import os
import sys
import logging
import argparse
from pathlib import Path
from typing import List, Dict
import yaml
import json
from datetime import datetime

class DocSynchronizer:
    def __init__(self, config_path: str = "config/sync_config.yaml"):
        self.config = self._load_config(config_path)
        self.setup_logging()
        self.logger = logging.getLogger(__name__)
        
    def _load_config(self, config_path: str) -> Dict:
        """加载配置文件"""
        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    
    def setup_logging(self):
        """设置日志"""
        log_dir = Path("logs")
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
            
            # 1. 检测变更
            if not force:
                changes = self._detect_changes(platform)
                if not changes:
                    self.logger.info("未检测到文档变更，跳过同步")
                    return True
            
            # 2. 准备目标仓库
            target_repo_path = self._prepare_target_repo()
            
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
    
    def _detect_changes(self, platform: str = None) -> Dict:
        """检测文档变更"""
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
                
            source_file = Path(self.config['source']['repo_path']) / source_path
            if source_file.exists() and self._has_changes(source_file):
                changes['release_notes'].append(source_path)
                changes['platforms'].append(self._extract_platform(source_path))
        
        # 检查API文档变更
        for source_path, target_path in self.config['sync_mapping']['api_docs'].items():
            if platform and platform not in source_path:
                continue
                
            source_file = Path(self.config['source']['repo_path']) / source_path
            if source_file.exists() and self._has_changes(source_file):
                changes['api_docs'].append(source_path)
                changes['platforms'].append(self._extract_platform(source_path))
        
        changes['platforms'] = list(set(changes['platforms']))
        
        self.logger.info(f"检测到变更: {len(changes['release_notes'])} 个发版说明, {len(changes['api_docs'])} 个API文档")
        return changes
    
    def _has_changes(self, file_path: Path) -> bool:
        """检查文件是否有变更"""
        import subprocess
        
        try:
            # 检查git状态
            result = subprocess.run(
                ['git', 'status', '--porcelain', str(file_path)],
                capture_output=True, text=True, cwd=file_path.parent
            )
            return bool(result.stdout.strip())
        except:
            # 如果git命令失败，默认认为有变更
            return True
    
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
        """准备目标仓库"""
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
        
        # 更新到最新
        import subprocess
        subprocess.run(['git', 'fetch'], cwd=target_repo_path, check=True)
        subprocess.run(['git', 'checkout', 'master'], cwd=target_repo_path, check=True)
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
                source_file = Path(self.config['source']['repo_path']) / source_path
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
                source_file = Path(self.config['source']['repo_path']) / source_path
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
        """比较两个文件是否相同"""
        try:
            with open(file1, 'rb') as f1, open(file2, 'rb') as f2:
                return f1.read() == f2.read()
        except:
            return False
    
    def _create_branch_and_pr(self, sync_results: Dict):
        """创建分支和PR"""
        self.logger.info("创建分支和PR...")
        
        target_repo_path = Path(self.config['target']['repo_path'])
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        branch_name = f"sync/fastboard-docs-{timestamp}"
        
        try:
            import subprocess
            
            # 创建新分支
            subprocess.run(['git', 'checkout', '-b', branch_name], cwd=target_repo_path, check=True)
            
            # 添加变更
            subprocess.run(['git', 'add', '.'], cwd=target_repo_path, check=True)
            
            # 提交变更
            commit_message = f"docs: sync fastboard docs\n\n同步文件:\n" + "\n".join(f"- {f}" for f in sync_results['synced_files'])
            subprocess.run(['git', 'commit', '-m', commit_message], cwd=target_repo_path, check=True)
            
            # 推送分支
            subprocess.run(['git', 'push', 'origin', branch_name], cwd=target_repo_path, check=True)
            
            # 创建PR
            self._create_pr_via_api(branch_name, sync_results)
            
            self.logger.info(f"成功创建分支: {branch_name}")
            
        except Exception as e:
            self.logger.error(f"创建分支和PR失败: {e}", exc_info=True)
            raise
    
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

def main():
    parser = argparse.ArgumentParser(description='同步Fastboard文档到shengwang-doc-source')
    parser.add_argument('--platform', choices=['android', 'ios', 'web'], help='指定平台')
    parser.add_argument('--force', action='store_true', help='强制同步，忽略变更检测')
    parser.add_argument('--dry-run', action='store_true', help='测试模式，只检测变更不创建PR')
    parser.add_argument('--config', default='config/sync_config.yaml', help='配置文件路径')
    
    args = parser.parse_args()
    
    synchronizer = DocSynchronizer(args.config)
    success = synchronizer.sync_docs(args.platform, args.force, args.dry_run)
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main() 