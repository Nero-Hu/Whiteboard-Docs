本文提供声网 Fastboard SDK（iOS）的发版说明。

声网 Fastboard SDK 是为帮助开发人员快速构建白板应用推出的新一代白板 SDK。Fastboard SDK 基于互动白板 SDK 开发，对复杂的 API 进行封装，简化了接口调用逻辑，并提供核心功能的实现和默认 UI；此外，Fastboard SDK 还集成窗口管理器（[Window Manager](https://github.com/netless-io/window-manager)）和常用插件，帮助开发者轻松扩展白板应用的功能。使用 Fastboard SDK，你无需深入学习互动白板复杂的概念，只需几行代码即可加入白板房间，并立即使用丰富的工具体验实时互动协作。

## 1.4.0 版

#### 改进

该版本更新 `Whiteboard` 依赖至 v2.16.81，集成 SDK 时不再区分 YYModel 和 YYKit, 之前使用 `pod 'Fastboard/core-YYKit'` 集成 SDK 的用户可以切换成 `pod 'Fastboard'` 集成。

## 1.2.2 版

该版本于 2023 年 4 月 25 日发布。

#### 新增特性

**显示用户光标**

该版本在 [`FastRoomConfiguration`](https://docs.agora.io/cn/whiteboard/fastboard_api_ios?platform=iOS#fastroomconfiguration) 类中新增 `userPayload` 属性，用于在白板房间中同步其他用户的光标位置并显示对应昵称和头像。自该版本起，SDK 将默认显示用户光标。

#### 问题修复

该版本修复了以下问题：

- 系统版本低于 iOS 14 的设备上设置 `drawOnlyApplePencil` 可能会造成崩溃。
- 初始化形状工具时，形状工具的样式可能显示错误。

## 1.1.2 版

该版本于 2022 年 10 月 28 日发布。

#### 新增特性

该版本新增了如下特性：

**插入动态文档**

该版本新增 [`insertPptx`](https://docs.agora.io/cn/whiteboard/fastboard_api_ios?platform=iOS#insertpptx) 方法，用于在白板子窗口中插入并展示动态文档。

**丰富自定义主题样式**

该版本新增白板按钮和控制条的可选样式，分别在以下类中设置：

- `FastRoomPanelItemAsset`：
  - `selectedBackgroundCornerradius`：选中状态的背景圆角。
  - `selectedBackgroundEdgeinset` ：选中状态的背景内边距。
	<div class="alert info">从 1.1.0 版及以前迁移过来的用户可以将 <code>selectedBackgroundCornerradius</code> 设置为 <code>0</code>，将 <code>selectedBackgroundEdgeinset</code> 设置为 <code>UIEdgeInsetsZero</code>。</div>

- `FastRoomControlBarAssets`： 
  - `backgroundColor`：控制条的背景色。
  - `borderColor`：控制条边框的颜色。
  - `effectStyle`：毛玻璃效果。详见 [UIBlurEffect](https://developer.apple.com/documentation/uikit/uiblureffect)。

#### 改进

该版本修改了橡皮擦默认擦除行为，现在默认不能擦除图片。

#### 问题修复

该版本修复了 iOS 13 以前设置教具背景色显示错误。


## 1.0.6 版

该版本于 2022 年 6 月 6 日发布。

#### 新增特性

**1. 修改白板用户界面的主题**

该版本在 `FastRoomThemeManager` 类中新增 [`apply`](https://docs.agora.io/cn/whiteboard/fastboard_api_ios?platform=iOS#apply) 方法，用于修改白板用户界面的主题。通过该方法，你可以将白板用户界面的主题设置为 SDK 提供的预定义主题，或设置为自定义主题。

**2. 修改调色盘的颜色集**

该版本在 `FastRoomDefaultOperationItem` 类中提供 [`defaultColors`](https://docs.agora.io/cn/whiteboard/fastboard_api_ios?platform=iOS#defaultcolors) 属性，支持修改白板工具调色盘的颜色集合。

**3. 启用/禁用 Apple Pencil 的系统默认功能**

该版本在 `FastRoom` 类中提供 [`followSystemPencilBehavior`](https://docs.agora.io/cn/whiteboard/fastboard_api_ios?platform=iOS#followsystempencilbehavior) 属性，用于在白板应用中启用/禁用 Apple Pencil 的系统默认功能。当 `followSystemPencilBehavior` 设为 `YES`，表示使用白板应用时，Apple Pencil 的行为跟随系统设置，用户可以使用 Apple Pencil 的系统默认功能操作白板，例如，双击切换当前工具为橡皮擦，双击显示调色板，使用 Apple Pencil 涂鸦等。当 `followSystemPencilBehavior` 设为 `NO`，表示使用白板应用时，Apple Pencil 的行为不跟随系统设置，即 Apple Pencil 的系统默认功能不可用。

## 1.0.3 版

该版本于 2022 年 3 月 25 日发布，是 Fastboard SDK 首个版本。

#### 功能特性

**1. 白板核心功能的默认实现和 UI**

该版本直接实现了互动白板的核心基础功能，并提供默认的 UI。集成 Fastboard SDK 并调用 `joinRoom` 方法加入白板房间后，即可使用这些功能。该版本实现的核心功能如下：

- 白板工具栏，包括铅笔、文本编辑、图形工具等所有白板基础编辑工具，并支持设置线条粗细、字体大小和颜色。
- 页面管理，包括新增页面、页面跳转、页面缩放。
- 撤销、重做

**2. 展示文件**

Fasdboard SDK 支持在白板中插入和展示多种形式的文件，例如，PNG、JPG 格式的图片，MP3、MP4 格式的音视频，以及 PPT、PPTX、DOC、DOCX、PDF 等格式的文档。具体实现步参考[展示文件](./present_files_ios)。

#### 相关文档

你可以参考以下文档使用 Fastboard SDK 实现相应的互动白板功能：

- [加入白板房间](./join_whiteboard_room_ios_fastboard)：快速集成 Fastboard SDK，加入白板房间，并立即使用丰富的编辑工具体验实时互动协作。
- [展示文件](./present_files_ios)：介绍如何在白板应用中插入图片、播放音视频和演示文档。
- [API 参考](./fastboard_api_ios)：提供 Fastboard SDK 核心 API 的详细描述。