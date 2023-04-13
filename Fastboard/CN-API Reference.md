本页提供声网 Fastboard SDK（iOS）的 Swift API 参考。

## Fastboard 类

### createFastRoom

```swift
public class func createFastRoom(withFastRoomConfig config: FastRoomConfiguration)
```

创建 `FastRoom` 实例。

**参数**

- `config`：`FastRoom` 实例的配置。详见 <a href="#roomconfig">FastRoomConfiguration</a>。

**返回**

方法调用成功时返回 `FastRoom` 对象。

<a name="roomconfig"></a>
#### FastRoomConfiguration

`FastRoomConfiguration` 类，提供初始化 `FastRoomConfiguration` 实例的方法。

```swift
public init(appIdentifier: String,
                roomUUID: String,
                roomToken: String,
                region: Region,
                userUID: String)
```

**参数**

- `appIdentifier`：String。互动白板项目的 App Identifier。详见[获取互动白板项目的安全密钥](https://docs.agora.io/cn/whiteboard/enable_whiteboard?platform=iOS#%E8%8E%B7%E5%8F%96%E4%BA%92%E5%8A%A8%E7%99%BD%E6%9D%BF%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%AE%89%E5%85%A8%E5%AF%86%E9%92%A5)。
- `roomUUID`：String。房间的 UUID，即房间的唯一标识符。详见[创建房间](https://docs.agora.io/cn/whiteboard/whiteboard_room_management?platform=RESTful#%E5%88%9B%E5%BB%BA%E6%88%BF%E9%97%B4%EF%BC%88post%EF%BC%89)请求成功后响应包体中 `uuid` 参数的值。
- `roomToken`：String。房间的 Room Token，用于加入房间时的用户鉴权。可以通过以下方式获取：
  - 调用[生成 Room Token RESTful API](https://docs.agora.io/cn/whiteboard/generate_whiteboard_token?platform=RESTful#生成-room-token（post）)。
  - 在 app 服务端用代码生成，详见[在 app 服务端生成 Token](https://docs.agora.io/cn/whiteboard/generate_whiteboard_token_at_app_server?platform=RESTful)。
- `region`：数据中心。详见 <a href="#region">Region</a >。
- `userUID`：String。用户的 UID，即用户的唯一标识符，字符串格式，不能超过 1024 字节。请确保同一房间内每个用户的 UID 唯一。

<a name="region"></a>
#### Region

数据中心，包含以下枚举：

- `CN`：中国杭州，服务区覆盖东亚、东南亚、以及其他数据中心未覆盖的地区。
- `US`：美国硅谷，服务区覆盖北美洲、南美洲。
- `SG`：新加坡，服务区覆盖新加坡、东亚、东南亚。
- `IN`：印度孟买，服务区覆盖印度。
- `GB`：英国伦敦，服务区覆盖欧洲。

## FastRoom 类

`FastRoom` 类提供管理互动白板实时房间的方法。

### joinRoom

```swift
public func joinRoom(completionHandler: ((Result<WhiteRoom, FastRoomError>)->Void)? = nil)
```

加入白板房间。

**注意**

该方法需要在创建`FastRoom` 对象后调用。

**参数**

- `completionHandler`：方法调用结果回调。传入 `nil`，表示不注册回调。

### disconnectRoom

```swift
public func disconnectRoom()
```

离开白板房间。

### insertImg

```swift
public func insertImg(_ src: URL, imageSize: CGSize)
```

插入图片。

该方法可以将指定的网络图片插入并展示到当前白板页面上。

**参数**

- `src`：String。图片的 URL 地址。请确保 app 客户端能够访问该 URL，否则图片无法正常展示。
- `imageSizewidth`：CGSize。图片的尺寸。

### insertMedia

```swift
public func insertMedia(_ src: URL, title: String, completionHandler: ((String)->Void)? = nil)
```

在白板子窗口中插入并播放音视频。

**参数**

- `src`：String。音视频文件的 URL 地址。请确保 app 客户端能够访问该 URL，否则无法正常加载音视频文件。
- `title`：String。窗口标题。
- `completionHandler`：方法调用结果回调。传入 `nil`，表示不注册回调。

### insertPptx

```swift
public func insertPptx(
    uuid: String,
    url: String,
    title: String,
    completionHandler: ((String)->Void)? = nil
)
```

在白板子窗口中插入并展示动态文档。

动态文档指通过[声网互动白板文档转换服务](https://docs.agora.io/cn/whiteboard/file_conversion_overview?platform=RESTful)，由 PPTX 格式的文件转换成的 HTML 网页。转换后的文件会保留源文件里的动画效果。

成功[发起文档转换任务](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#发起文档转换)并调用[查询文档转换任务进度 API](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#查询转换任务的进度) 获取文档转换结果后，可以调用该方法并传入获取的文档转换结果，SDK 会自动创建子窗口，插入并分页展示转换后的文档。

**参数**

- `uuid`：转换任务的 uuid，转换任务的唯一标识符。
- `url`：转换结果文件地址前缀路径。
- `title`：插入时的窗口标题。
- `completionHandler`：方法调用结果回调。传入 `nil`，表示不注册回调。

### insertStaticDocument

```swift
public func insertStaticDocument(_ pages: [WhitePptPage],
                                     title: String,
                                     completionHandler: ((String)->Void)? = nil)
```

在白板子窗口中插入并展示静态文档。

静态文档指通过[声网互动白板文档转换服务](https://docs.agora.io/cn/whiteboard/file_conversion_overview?platform=RESTful)，由 PPT、PPTX、DOC、DOCX、PDF 格式的文件转换成的 PNG、JPG/JPEG 格式的静态图片。

成功[发起文档转换任务](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#发起文档转换（post）)并调用[查询文档转换任务进度 API](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#查询转换任务的进度（get）) 获取文档转换结果后，可以调用该方法并传入获取的文档转换结果，SDK 会自动创建子窗口，插入并分页展示转换后的文档。

**参数**

- `pages`：转换后的文件列表。详见[查询文档转换任务进度 API](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#http-响应-1) 请求成功后返回的响应包体中 `convertedFileList` 参数的值。
- `title`：窗口标题。
- `completionHandler`：方法调用结果回调。传入 `nil`，表示不注册回调。


### followSystemPencilBehavior

```swift
public static var followSystemPencilBehavior
```

（仅适用于 iPad）设置使用白板时， Apple Pencil 的行为是否跟随系统默认设置：

- `YES`：跟随系统默认设置。在该状态下，用户可以使用 Apple Pencil 的系统默认功能操作白板，例如，双击切换当前工具为橡皮擦，双击显示调色板，使用 Apple Pencil 涂鸦等。
- `NO`：不跟随系统默认设置。在该状态下，Apple Pencil 的系统默认功能不可用。

## FastRoomThemeManager 类

`FastRoomThemeManager` 类提供设置白板用户界面主题的方法。

### apply

```swift
public func apply(_ theme: FastRoomThemeAsset)
```

应用白板主题。

Fastboard SDK 在 iOS 13.0 或以上版本上默认跟随系统的主题设置，在早于 iOS 13.0 版本上默认使用浅色主题。如果默认的主题设置无法满足你的需要，你可以调用该方法应用 SDK 提供的预定义主题或自定义主题。

**参数**

- `theme`：白板主题.
  - 预定义主题：
    - `FastRoomDefaultTheme.defaultLightTheme`：浅色主题。
    - `FastRoomDefaultTheme.defaultDarkTheme`：暗色主题。
    - `FastRoomDefaultTheme.defaultAutoTheme`：自动主题，即跟随系统主题设置。该选项仅适用于 iOS 13.0 或以上版本。
  - 自定义主题：详见 <a href="#themeasset">FastRoomThemeAsset</a >。

**示例**

- 应用预定义的暗色主题：

   ```swift
  FastRoomThemeManager.shared.apply(FastRoomDefaultTheme.defaultDarkTheme)
  ```

- 应用自定义主题：

   ```swift
   let white = FastRoomWhiteboardAssets(whiteboardBackgroundColor: .green, containerColor: .yellow)
    
   let control = FastRoomControlBarAssets(backgroundColor: .blue, borderColor: .gray, effectStyle: .init(style: .regular))
    
   let panel = FastRoomPanelItemAssets(normalIconColor: .black, selectedIconColor: .systemRed, highlightBgColor: .cyan, subOpsIndicatorColor: .yellow, pageTextLabelColor: .orange)
    
   let theme = FastRoomThemeAsset(whiteboardAssets: white, controlBarAssets: control, panelItemAssets: panel)
    
   FastRoomThemeManager.shared.apply(theme)
   ```

<a name="themeasset"></a>

#### FastRoomThemeAsset

白板主题样式。

```swift
open class FastRoomThemeAsset: NSObject {
   @objc
   public init(whiteboardAssets: FastRoomWhiteboardAssets,
               controlBarAssets: FastRoomControlBarAssets,
               panelItemAssets: FastRoomPanelItemAssets) {
       self.whiteboardAssets = whiteboardAssets
       self.controlBarAssets = controlBarAssets
       self.panelItemAssets = panelItemAssets
   }
     
   @objc
   open var whiteboardAssets: FastRoomWhiteboardAssets
     
   @objc
   open var controlBarAssets: FastRoomControlBarAssets
     
   @objc
   open var panelItemAssets: FastRoomPanelItemAssets
}
```

`FastRoomThemeAsset` 类包含如下属性：

- `whiteboardAssets`：白板的样式。详见 <a href="#whiteboardassets">FastRoomWhiteboardAssets</a >。
- `controlBarAssets`：控制条的样式。详见 <a href="#controlbarassets">FastRoomControlBarAssets</a >。
- `panelItemAssets`：按钮的样式。详见 <a href="#panelitemassets">FastRoomPanelItemAssets</a >。


<a name="whiteboardassets"></a>
##### FastRoomWhiteboardAssets

白板的样式。

```swift
open class FastRoomWhiteboardAssets: NSObject {
   @objc
   public init(whiteboardBackgroundColor: UIColor, containerColor: UIColor) {
       self.whiteboardBackgroundColor = whiteboardBackgroundColor
       self.containerColor = containerColor
   }
     
   @objc
   open var whiteboardBackgroundColor: UIColor
     
   @objc
   open var containerColor: UIColor
}
```

`FastRoomWhiteboardAssets` 类包含如下属性：

- `whiteboardBackgroundColor`：白板背景色。
- `containerColor`：挂载白板的 HTML 容器的颜色。


<a name="controlbarassets"></a>
##### FastRoomControlBarAssets

控制条的样式。

```swift
open class FastRoomControlBarAssets: NSObject {
   @objc
   public init(backgroundColor: UIColor, borderColor: UIColor, effectStyle: UIBlurEffect? = nil) {
       self.backgroundColor = backgroundColor
       self.borderColor = borderColor
       self.effectStyle = effectStyle
   }
     
   @objc
   var backgroundColor: UIColor
     
   @objc
   var borderColor: UIColor
     
   @objc
   var effectStyle: UIBlurEffect?
}
```

`FastRoomControlBarAssets` 包含如下属性：

- `backgroundColor`：控制条的背景色。
- `borderColor`：控制条边框的颜色。
- `effectStyle`：毛玻璃效果。详见 [UIBlurEffect](https://developer.apple.com/documentation/uikit/uiblureffect)。


<a name="panelitemassets"></a>
##### FastRoomPanelItemAssets

按钮的样式。

```swift
open class FastRoomPanelItemAssets: NSObject {
    @objc
    public init(normalIconColor: UIColor,
                selectedIconColor: UIColor,
                selectedIconBgColor: UIColor,
                highlightColor: UIColor,
                highlightBgColor: UIColor,
                disableColor: UIColor,
                subOpsIndicatorColor: UIColor,
                pageTextLabelColor: UIColor,
                selectedBackgroundCornerradius: CGFloat,
                selectedBackgroundEdgeinset: UIEdgeInsets) {
        self.normalIconColor = normalIconColor
        self.selectedIconColor = selectedIconColor
        self.selectedIconBgColor = selectedIconBgColor
        self.highlightColor = highlightColor
        self.highlightBgColor = highlightBgColor
        self.disableColor = disableColor
        self.subOpsIndicatorColor = subOpsIndicatorColor
        self.pageTextLabelColor = pageTextLabelColor
        self.selectedBackgroundCornerRadius = selectedBackgroundCornerradius
        self.selectedBackgroundEdgeinset = selectedBackgroundEdgeinset
    }
 
    @objc
    open var selectedBackgroundCornerRadius: CGFloat
 
    @objc
    open var selectedBackgroundEdgeinset: UIEdgeInsets
     
    @objc
    open var normalIconColor: UIColor
     
    @objc
    open var selectedIconColor: UIColor
     
    @objc
    open var selectedIconBgColor: UIColor
     
    @objc
    open var highlightColor: UIColor
     
    @objc
    open var highlightBgColor: UIColor
     
    @objc
    open var disableColor: UIColor
     
    @objc
    open var subOpsIndicatorColor: UIColor
     
    @objc
    open var pageTextLabelColor: UIColor
}
```

`FastRoomPanelItemAssets` 类包含如下属性：

- `normalIconColor`：普通状态下（即按钮未被选中时），按钮图标的颜色。
- `selectedIconColor`：选中状态下按钮图标的颜色。
- `selectedIconBgColor`：选中状态下按钮的背景色。
- `highlightColor`：高亮状态下（即按钮被按住时），按钮图标的颜色。
- `highlightBgColor`：高亮状态下（即按钮被按住时），按钮的背景色。
- `disableColor`：不可点击状态下按钮的颜色。
- `subOpsIndicatorColor`：下拉按钮的颜色。
- `pageTextLabelColor`：页码的颜色。
- `selectedBackgroundCornerradius`：选中状态的背景圆角。
- `selectedBackgroundEdgeinset` ：选中状态的背景内边距。

## FastRoomDefaultOperationItem 类

`FastRoomDefaultOperationItem` 类用于自定义白板用户界面上的操作组件。

### defaultColors

```swift
public static var defaultColors: [UIColor]
```

调色盘默认的颜色集合。

你可以在该属性中传入自定义的 `[UIColor]` 对象，修改调色盘的颜色集合。通过该属性设置的调色盘颜色集合应用于铅笔、文字和图形等工具。