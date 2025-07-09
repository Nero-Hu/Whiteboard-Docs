# Fastboard文档同步工具

这个工具用于将Whiteboard-Docs仓库中的文档自动同步到shengwang-doc-source仓库，并自动创建分支和PR。

## 🚀 主要特性

### 改进的变更检测
- **基于内容比较**：使用MD5哈希值比较文件内容，而不是依赖git状态
- **更准确的检测**：在目标仓库中直接比较源文件和目标文件
- **高效处理**：分块读取大文件，避免内存问题

### 完善的回滚机制
- **状态跟踪**：跟踪分支创建、推送、PR创建的每个步骤
- **智能回滚**：在失败时自动回滚已完成的步骤
- **清理机制**：删除已创建的PR、远程分支和本地分支

### 详细的日志记录
- **时间戳日志**：每次运行生成带时间戳的日志文件
- **调试信息**：记录详细的执行步骤和错误信息
- **操作审计**：完整记录所有同步操作

## 📋 系统要求

- Python 3.7+
- Git
- GitHub访问令牌（用于创建PR）

## 🔧 安装和配置

### 1. 安装依赖

```bash
pip install pyyaml requests
```

### 2. 配置环境变量

```bash
export GITHUB_TOKEN="your_github_token_here"
```

### 3. 配置文件

复制并修改配置文件：

```bash
cp config/sync_config.yaml config/sync_config_local.yaml
```

编辑 `config/sync_config_local.yaml`，设置正确的路径和仓库信息。

## 📖 使用方法

### 基本用法

```bash
# 同步所有平台的文档
python tools/sync_docs.py

# 同步特定平台的文档
python tools/sync_docs.py --platform android
python tools/sync_docs.py --platform ios
python tools/sync_docs.py --platform web

# 强制同步（忽略变更检测）
python tools/sync_docs.py --force

# 测试模式（只检测变更，不创建PR）
python tools/sync_docs.py --dry-run

# 使用自定义配置文件
python tools/sync_docs.py --config config/sync_config_local.yaml
```

### 参数说明

- `--platform`: 指定平台（android/ios/web）
- `--force`: 强制同步，忽略变更检测
- `--dry-run`: 测试模式，只检测变更不创建PR
- `--config`: 指定配置文件路径

## 🔄 同步流程详解

### 1. 变更检测阶段

```python
# 改进的变更检测逻辑
def _detect_changes(self, target_repo_path: Path, platform: str = None) -> Dict:
    # 在目标仓库中比较文件内容
    if self._has_content_changes(source_file, target_file):
        changes['release_notes'].append(source_path)
```

**改进点**：
- 不再依赖git状态，直接比较文件内容
- 使用MD5哈希值进行高效比较
- 支持大文件的分块处理

### 2. 文件同步阶段

```python
def _sync_file(self, source_file: Path, target_file: Path, dry_run: bool = False) -> bool:
    # 确保目标目录存在
    target_file.parent.mkdir(parents=True, exist_ok=True)
    
    # 比较文件内容
    if target_file.exists():
        if self._files_identical(source_file, target_file):
            return False  # 跳过相同文件
    
    # 复制文件
    shutil.copy2(source_file, target_file)
```

### 3. 分支和PR创建阶段

```python
def _create_branch_and_pr(self, sync_results: Dict):
    # 状态跟踪
    current_branch = None
    branch_created = False
    branch_pushed = False
    pr_created = False
    
    try:
        # 创建分支
        subprocess.run(['git', 'checkout', '-b', branch_name])
        branch_created = True
        
        # 推送分支
        subprocess.run(['git', 'push', 'origin', branch_name])
        branch_pushed = True
        
        # 创建PR
        self._create_pr_via_api(branch_name, sync_results)
        pr_created = True
        
    except Exception as e:
        # 回滚操作
        self._rollback_branch_creation(...)
```

## 🛡️ 回滚机制

### 回滚流程

1. **删除PR**：如果PR已创建，通过GitHub API删除
2. **删除远程分支**：如果分支已推送，删除远程分支
3. **清理本地分支**：切换回原分支，删除本地分支

### 回滚示例

```python
def _rollback_branch_creation(self, target_repo_path, current_branch, branch_name, 
                             branch_created, branch_pushed, pr_created):
    # 1. 删除PR
    if pr_created:
        self._delete_pr_via_api(branch_name)
    
    # 2. 删除远程分支
    if branch_pushed:
        subprocess.run(['git', 'push', 'origin', '--delete', branch_name])
    
    # 3. 清理本地分支
    if branch_created:
        subprocess.run(['git', 'checkout', current_branch])
        subprocess.run(['git', 'branch', '-D', branch_name])
```

## 📊 日志和监控

### 日志文件

日志文件保存在 `logs/` 目录下，格式为：
```
logs/doc_sync_20231201_143022.log
```

### 日志内容示例

```
2023-12-01 14:30:22 - __main__ - INFO - 开始同步文档，平台: all, 强制同步: False, 测试模式: False
2023-12-01 14:30:23 - __main__ - INFO - 准备目标仓库...
2023-12-01 14:30:24 - __main__ - INFO - 检测文档变更...
2023-12-01 14:30:25 - __main__ - INFO - 检测到变更: 2 个发版说明, 1 个API文档
2023-12-01 14:30:26 - __main__ - INFO - 执行文档同步...
2023-12-01 14:30:27 - __main__ - INFO - 同步文件: android/Fastboard/CN/release-notes-fb.android.mdx -> ../shengwang-doc-source/docs/fastboard/android/cn/release-notes-fb.android.mdx
2023-12-01 14:30:28 - __main__ - INFO - 创建分支和PR...
2023-12-01 14:30:29 - __main__ - INFO - 当前分支: master
2023-12-01 14:30:30 - __main__ - INFO - 创建分支: sync/fastboard-docs-20231201_143030
2023-12-01 14:30:31 - __main__ - INFO - 推送分支: sync/fastboard-docs-20231201_143030
2023-12-01 14:30:32 - __main__ - INFO - 成功创建PR: sync/fastboard-docs-20231201_143030
2023-12-01 14:30:33 - __main__ - INFO - 文档同步完成
```

## ⚠️ 注意事项

### 1. 权限要求
- 需要GitHub仓库的写入权限
- 需要创建PR的权限
- 需要推送分支的权限

### 2. 网络要求
- 需要访问GitHub API
- 需要访问Git仓库

### 3. 磁盘空间
- 确保有足够的磁盘空间存储目标仓库
- 日志文件会占用一定空间

### 4. 并发安全
- 避免同时运行多个同步进程
- 建议使用锁机制或检查分支是否存在

## 🐛 故障排除

### 常见问题

1. **GitHub Token无效**
   ```
   错误: 创建PR失败: 401 - Bad credentials
   解决: 检查GITHUB_TOKEN环境变量是否正确设置
   ```

2. **目标仓库不存在**
   ```
   错误: 目标仓库路径不存在
   解决: 检查配置文件中的repo_path设置
   ```

3. **文件权限问题**
   ```
   错误: 无法写入目标文件
   解决: 检查目标目录的写入权限
   ```

4. **网络连接问题**
   ```
   错误: 无法连接到GitHub API
   解决: 检查网络连接和防火墙设置
   ```

### 调试模式

启用调试日志：
```bash
# 修改配置文件中的日志级别
logging:
  level: "DEBUG"
```

## 🔮 未来改进

1. **并发同步**：支持多线程并发同步
2. **增量同步**：只同步变更的文件
3. **自动合并**：支持自动合并PR
4. **通知机制**：同步完成后发送通知
5. **监控面板**：提供Web界面监控同步状态

## 📝 更新日志

### v2.0.0 (当前版本)
- ✅ 改进变更检测：基于内容比较而不是git状态
- ✅ 添加回滚机制：失败时自动清理已创建的资源
- ✅ 优化文件比较：使用MD5哈希值提高效率
- ✅ 增强错误处理：更详细的错误信息和恢复机制

### v1.0.0
- 基础同步功能
- 简单的变更检测
- 基本的PR创建 