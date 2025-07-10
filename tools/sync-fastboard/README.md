# 文档同步工具使用指南

## 概述

`sync_docs.py` 是一个自动化工具，用于将 Fastboard 文档从 Whiteboard-Docs 仓库同步到 shengwang-doc-source 发布仓库。

## 功能特性

- ✅ **智能变更检测**：使用文件哈希比较，只同步有变更的文件
- ✅ **安全交互模式**：检测未提交更改，保护用户工作
- ✅ **自动PR创建**：在目标仓库自动创建分支和Pull Request
- ✅ **多平台支持**：支持 android、ios、web 三个平台
- ✅ **详细日志记录**：完整的操作日志，便于问题排查
- ✅ **回滚机制**：操作失败时自动回滚已创建的资源

## 安装依赖

```bash
pip install -r tools/sync-fastboard/requirements.txt
```

## 配置

1. 复制配置文件模板：
```bash
cp config/sync_config.example.yaml config/sync_config.yaml
```

2. 编辑配置文件：
```yaml
source:
  repo_path: "E:/AgoraTWrepo/Whiteboard-Docs"

target:
  repo_path: "E:/AgoraTWrepo/shengwang-doc-source"
  repo_url: "https://github.com/AgoraIO-Community/shengwang-doc-source.git"
  repo_owner: "AgoraIO-Community"
  repo_name: "shengwang-doc-source"
  github_token: "your_github_token_here"
```

## 使用方法

### 基本用法

```bash
# 同步所有平台
python tools/sync-fastboard/sync_docs.py

# 同步指定平台
python tools/sync-fastboard/sync_docs.py --platform android
python tools/sync-fastboard/sync_docs.py --platform ios
python tools/sync-fastboard/sync_docs.py --platform web
```

### 高级选项

```bash
# 强制同步（跳过变更检测）
python tools/sync-fastboard/sync_docs.py --force

# 测试模式（只检测变更，不创建PR）
python tools/sync-fastboard/sync_docs.py --dry-run

# 非交互模式（适用于CI/CD）
python tools/sync-fastboard/sync_docs.py --non-interactive

# 使用自定义配置文件
python tools/sync-fastboard/sync_docs.py --config my_config.yaml
```

### 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--platform` | 指定平台 (android/ios/web) | 所有平台 |
| `--force` | 强制同步，忽略变更检测 | false |
| `--dry-run` | 测试模式，不创建PR | false |
| `--non-interactive` | 非交互模式 | false |
| `--config` | 配置文件路径 | config/sync_config.yaml |

## 交互模式

### 开发环境（推荐）

```bash
python tools/sync-fastboard/sync_docs.py --platform android
```

**可能的交互**：
```
⚠️  目标仓库有未提交的更改，是否继续？(y/N): 
```

**选项**：
- `y` 或 `yes`：继续执行同步
- `N`（默认）或回车：取消操作

### CI/CD环境

```bash
python tools/sync-fastboard/sync_docs.py --platform android --non-interactive
```

**特点**：
- 无交互，自动处理所有操作
- 检测到未提交更改时会直接失败
- 适合自动化流程

## 工作流程

1. **准备目标仓库**
   - 检查工作区状态
   - 检测未提交更改（交互模式）
   - 自动切换到master分支
   - 拉取最新代码

2. **检测变更**
   - 比较源文件和目标文件的哈希值
   - 识别需要同步的文件

3. **执行同步**
   - 复制有变更的文件到目标位置
   - 记录同步结果

4. **创建PR**
   - 创建新分支
   - 提交变更
   - 推送分支
   - 创建Pull Request

## 同步映射

### 发版说明
- 源路径：`{platform}/Fastboard/CN/release-notes-fb.{platform}.mdx`
- 目标路径：`docs/whiteboard/fastboard-sdk/`

### API文档
- 源路径：`{platform}/Fastboard/CN/fastboard-api.{platform}.mdx`
- 目标路径：`docs-api-reference/fastboard/`

## 日志和监控

### 日志文件
- 位置：`logs/doc_sync_YYYYMMDD_HHMMSS.log`
- 格式：包含时间戳、操作类型、详细信息

### 日志级别
- `INFO`：一般操作信息
- `WARNING`：警告信息（如未提交更改）
- `ERROR`：错误信息

## 故障排除

### 常见问题

1. **"目标仓库有未提交的更改"**
   ```bash
   # 解决方案：提交或暂存更改
   git add .
   git commit -m "your commit message"
   ```

2. **"GitHub Token权限不足"**
   - 检查Token是否具有 `repo` 权限
   - 确认Token未过期

3. **"文件路径错误"**
   - 检查配置文件中的路径
   - 确保目标仓库已正确克隆

4. **"同步失败"**
   - 查看日志文件了解详细错误
   - 检查网络连接

### 测试建议

1. **首次使用**：
   ```bash
# 先测试检测功能
python tools/sync-fastboard/sync_docs.py --dry-run --platform android
```

2. **确认配置**：
   ```bash
# 检查配置文件
python tools/sync-fastboard/sync_docs.py --dry-run --config config/sync_config.yaml
```

3. **小范围测试**：
   ```bash
# 只同步一个平台
python tools/sync-fastboard/sync_docs.py --platform android
```

## 安全考虑

- 🔒 **工作区保护**：检测未提交更改，防止数据丢失
- 🔒 **Token安全**：使用GitHub Token进行API访问
- 🔒 **回滚机制**：操作失败时自动清理已创建的资源
- 🔒 **日志记录**：完整记录所有操作，便于审计

## 最佳实践

1. **开发环境**：使用默认的交互模式
2. **CI/CD环境**：使用 `--non-interactive` 参数
3. **首次使用**：先运行 `--dry-run` 测试
4. **定期检查**：查看日志文件了解同步状态
5. **备份重要数据**：同步前确保重要更改已提交 