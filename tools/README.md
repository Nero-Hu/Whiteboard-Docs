# 文档同步工具

本目录包含用于自动化同步Fastboard文档到发布仓库的工具。

## 文件说明

- `sync_docs.py` - 主要的同步脚本
- `requirements.txt` - Python依赖包列表
- `README.md` - 本说明文件

## 安装依赖

```bash
pip install -r tools/requirements.txt
```

## 快速开始

1. 复制配置文件模板：
   ```bash
   cp config/sync_config.example.yaml config/sync_config.yaml
   ```

2. 编辑配置文件，设置正确的路径和GitHub Token

3. 运行同步脚本：
   ```bash
   python tools/sync_docs.py
   ```

## 脚本参数

- `--platform`: 指定平台 (android/ios/web)
- `--force`: 强制同步，忽略变更检测
- `--dry-run`: 测试模式，只检测变更不创建PR
- `--config`: 指定配置文件路径

## 示例

```bash
# 同步所有平台
python tools/sync_docs.py

# 同步指定平台
python tools/sync_docs.py --platform android

# 强制同步
python tools/sync_docs.py --force

# 测试模式（只检测变更，不创建PR）
python tools/sync_docs.py --dry-run

# 使用自定义配置
python tools/sync_docs.py --config my_config.yaml
```

## 日志

同步日志保存在 `logs/` 目录下，文件名格式为 `doc_sync_YYYYMMDD_HHMMSS.log`。 