# Whiteboard-Docs

声网互动白板（Interactive Whiteboard）文档仓库，用于生成 Whiteboard SDK 和 Fastboard SDK 全平台（Web、iOS 和 Android）的发版说明和 API 参考文档。

## 仓库概述

这是一个**纯文档仓库**，不直接开发代码。仓库中的代码文件仅用于从代码注释生成 API 文档。

### 工作流程

1. **同步代码**：从其他 SDK 开发仓库同步最新版本的代码到本仓库
2. **更新注释**：为新增的对外 API 添加详细的代码注释
3. **生成文档**：使用平台特定的文档工具从代码注释生成 API 参考文档

## 支持的平台和 SDK

### 平台
- **Web** - JavaScript/TypeScript
- **iOS** - Objective-C/Swift
- **Android** - Java/Kotlin

### SDK 类型
- **Whiteboard SDK** - 基础白板 SDK
- **Fastboard SDK** - 快速集成白板 SDK

## 仓库结构

```
Whiteboard-Docs/
├── web/                    # Web 平台文档
│   ├── Whiteboard/         # Whiteboard SDK for Web
│   │   ├── CN/            # 中文文档
│   │   └── EN/            # 英文文档
│   └── Fastboard/         # Fastboard SDK for Web
│       ├── CN/            # 中文文档
│       └── EN/            # 英文文档
├── ios/                    # iOS 平台文档
│   ├── Whiteboard/         # Whiteboard SDK for iOS
│   │   ├── CN/            # 中文文档
│   │   └── EN/            # 英文文档
│   └── Fastboard/         # Fastboard SDK for iOS
│       ├── CN/            # 中文文档
│       └── EN/            # 英文文档
└── android/                # Android 平台文档
    ├── Whiteboard/         # Whiteboard SDK for Android
    │   ├── CN/            # 中文文档
    │   └── EN/            # 英文文档
    └── Fastboard/         # Fastboard SDK for Android
        ├── CN/            # 中文文档
        └── EN/            # 英文文档
```

## 文档类型

### Fastboard SDK
- **发版说明**：使用 MDX 格式编写
- **API 参考**：使用 MDX 格式编写
- **语言支持**：中文（CN）和英文（EN）

### Whiteboard SDK
- **发版说明**：使用 MDX 格式编写
- **API 参考**：使用平台特定的文档工具从代码注释生成：
  - **Web**：TypeDoc（TypeScript）
  - **iOS**：AppleDoc（Objective-C）
  - **Android**：Doxygen（Java）
- **语言支持**：中文（CN）和英文（EN）

## 文档生成工具

### Web 平台
- **TypeDoc**：从 TypeScript 类型定义文件生成 API 文档
- 配置文件：`web/Whiteboard/CN/config/typedoc.json`、`web/Whiteboard/EN/config/typedoc.json`

### iOS 平台
- **AppleDoc**：从 Objective-C 头文件生成 API 文档
- 配置文件：`ios/Whiteboard/CN/headers/AppledocSettings.plist`、`ios/Whiteboard/EN/headers/AppledocSettings.plist`

### Android 平台
- **Doxygen**：从 Java 源代码生成 API 文档
- 配置文件：`android/Whiteboard/CN/Doxyfile`、`android/Whiteboard/EN/Doxyfile`

## 使用指南

### 对于文档编写者

#### 更新发版说明
1. 在对应平台的 `Fastboard/` 或 `Whiteboard/` 目录下找到发版说明文件
2. 使用 MDX 格式编写新的版本更新内容
3. 确保中英文版本内容一致

#### 更新 API 文档
1. **同步代码**：从 SDK 开发仓库同步最新代码
2. **添加注释**：为新增的 API 添加详细的代码注释
3. **生成文档**：运行对应的文档生成工具
   - Web：`npm run doccn` 或 `npm run docen`
   - iOS：使用 AppleDoc 工具
   - Android：使用 Doxygen 工具

### 对于开发者
1. 导航到目标平台目录（`web/`、`ios/` 或 `android/`）
2. 选择 SDK 类型（`Whiteboard/` 或 `Fastboard/`）
3. 选择语言版本（`CN/` 或 `EN/`）
4. 查看对应的文档和发版说明

## 文档同步工具

本仓库提供了自动化工具来同步 Fastboard 文档到发布仓库。

### 功能特性

- **自动检测变更**：检测发版说明和API文档的变更
- **智能同步**：只同步有变更的文件，避免不必要的更新
- **自动创建PR**：在目标仓库自动创建分支和Pull Request
- **详细日志**：记录同步过程和结果，便于问题排查
- **多平台支持**：支持android、ios、web三个平台
- **手动和自动触发**：支持手动运行和GitHub Actions自动触发

### 使用方法

#### 1. 配置环境

1. 复制配置文件模板：
   ```bash
   cp config/sync_config.example.yaml config/sync_config.yaml
   ```

2. 编辑配置文件，设置正确的路径和GitHub Token：
   ```yaml
   source:
     repo_path: "E:/AgoraTWrepo/Whiteboard-Docs"
   
   target:
     repo_path: "E:/AgoraTWrepo/shengwang-doc-source"
     repo_url: "https://github.com/AgoraIO-Community/shengwang-doc-source.git"
     github_token: "your_github_token_here"
   ```

#### 2. 手动同步

```bash
# 同步所有平台
python tools/sync_docs.py

# 同步指定平台
python tools/sync_docs.py --platform android

# 强制同步（忽略变更检测）
python tools/sync_docs.py --force

# 使用自定义配置文件
python tools/sync_docs.py --config my_config.yaml
```

#### 3. 自动同步

当PR合入master分支时，如果修改了以下文件，会自动触发同步：
- `android/Fastboard/CN/release-notes-fb.android.mdx`
- `android/Fastboard/CN/fastboard-api.mdx`
- `ios/Fastboard/CN/release-notes-fb.ios.mdx`
- `ios/Fastboard/CN/fastboard-api.ios.mdx`
- `web/Fastboard/CN/release-notes-fb.javascript.mdx`
- `web/Fastboard/CN/fastboard-api.javascript.mdx`

也可以在GitHub Actions页面手动触发同步。

### 同步规则

- **发版说明**：同步到 `docs/whiteboard/fastboard-sdk/` 目录
- **API文档**：同步到 `docs-api-reference/fastboard/` 目录
- **文件名**：保持与源文件相同的文件名
- **PR标题**：`[AUTO] sync fastboard release docs`
- **分支命名**：`sync/fastboard-docs-{timestamp}`

### 日志和监控

- 同步日志保存在 `logs/` 目录下
- 日志文件名格式：`doc_sync_YYYYMMDD_HHMMSS.log`
- GitHub Actions运行日志可在Actions页面查看
- 同步失败时会记录详细的错误信息

### 故障排除

1. **GitHub Token权限不足**
   - 确保Token具有 `repo` 权限
   - 检查Token是否过期

2. **文件路径错误**
   - 检查配置文件中的路径是否正确
   - 确保目标仓库已正确克隆

3. **同步失败**
   - 查看日志文件了解详细错误信息
   - 检查网络连接和GitHub API访问

## 注意事项

- 本仓库不直接开发代码，仅用于文档生成
- 代码文件的存在是为了从注释生成 API 文档
- 所有发版说明都使用 MDX 格式编写
- 确保中英文文档内容保持一致
- 遵循各平台的文档工具使用规范
- 同步工具配置文件 `config/sync_config.yaml` 已添加到 `.gitignore`，避免敏感信息泄露

## 贡献指南

请参考各平台目录下的具体贡献指南和开发设置说明。

## 许可证

[在此添加许可证信息] 