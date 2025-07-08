
本页提供声网 Fastboard SDK for Android 的 Java API 参考。

## FastboardView 类

### getFastboard

```java
public Fastboard getFastboard()
```

获取 `Fastboard` 对象。

Fastboard SDK 不支持直接初始化 `Fastboard` 对象。你需要先将 `FastboardView` 添加到 app 的布局中，然后调用 `getFastboard` 方法获取 `Fastboard` 对象。

**注意**

请确保在调用其他 API 前先调用该方法获取 `Fastboard` 对象。

**返回**

方法调用成功时返回 `Fastboard` 对象。

## Fastboard 类

Fastboard 类提供创建 `FastRoom` 对象的方法。

### createFastRoom

```java
public FastRoom createFastRoom(FastRoomOptions roomOptions)
```

创建 `FastRoom` 对象。

**注意**

该方法需要在获取 `Fastboard` 对象后调用。

**参数**

- `roomOptions`：白板房间的配置选项。详见 <a href="#roomoptions">FastRoomOptions</a>。

**返回**

方法调用成功时返回 `FastRoom` 对象。

<a name="roomoptions"></a>
#### FastRoomOptions

白板房间的配置选项。

```java
public class FastRoomOptions {
    private final String appId;
    private final String uuid;
    private final String token;
    private final String uid;
    private final boolean writable;
 
    private final FastRegion fastRegion;

    private Float containerSizeRatio;

    private FastUserPayload userPayload;

    public FastRoomOptions(String appId, String uuid, String token, String uid, FastRegion fastRegion) {
        this(appId, uuid, token, uid, fastRegion, true);
    }

    public FastRoomOptions(String appId, String uuid, String token, String uid, FastRegion fastRegion, boolean writable) {
        this.appId = appId;
        this.uuid = uuid;
        this.token = token;
        this.uid = uid;
        this.fastRegion = fastRegion;
        this.writable = writable;
    }
}
```

`FastRoomOptions` 类包含以下属性：

- `appId`：String。互动白板项目的 App Identifier。详见[获取互动白板项目的安全密钥](/doc/whiteboard/android/whiteboard-sdk/get-started/enable-service#获取互动白板项目的安全密钥)。
- `uuid`：String。房间的 UUID，即房间的唯一标识符。详见[创建房间](https://docs.agora.io/cn/whiteboard/whiteboard_room_management?platform=RESTful#创建房间（post）)请求成功后响应包体中 `uuid` 参数的值。
- `token`：String。房间的 Room Token，用于加入房间时的用户鉴权。可以通过以下方式获取：
  - 调用[生成 Room Token RESTful API](https://docs.agora.io/cn/whiteboard/generate_whiteboard_token?platform=RESTful#生成-room-token（post）)。
  - 在 app 服务端用代码生成，详见[在 app 服务端生成 Token](https://docs.agora.io/cn/whiteboard/generate_whiteboard_token_at_app_server?platform=RESTful)。
- `uid`：String。用户的 UID，即用户的唯一标识符，字符串格式，不能超过 1024 字节。请确保同一房间内每个用户的 uid 唯一。
- `writable`：boolean。用户是否以互动模式加入白板房间：
  - `true`：以互动模式加入白板房间，即具有读写权限。
  - `false`：以订阅模式加入白板房间，即具有只读权限。
- `fastRegion`：数据中心。详见 <a href="#fastregion">`FastRegion`</a>。
- `containerSizeRatio`：Float。本地显示窗口中，内容的高宽比，默认为 `0.56`，即 `9:16`。
- `userPayload`：用户光标显示的用户信息，包括用户的昵称和头像。详见 <a href="#fastuserpayload">`FastUserPayload`</a>。

<a name="fastregion"></a>
#### FastRegion

数据中心，包含以下枚举值：

- `CN_HZ`：中国杭州，服务区覆盖东亚、东南亚、以及其他数据中心未覆盖的地区。

- `US_SV`：美国硅谷，服务区覆盖北美洲、南美洲。

- `SG`：新加坡，服务区覆盖新加坡、东亚、东南亚。

- `IN_MUM`：印度孟买，服务区覆盖印度。

- `GB_LON`：英国伦敦，服务区覆盖欧洲。

<a name="fastuserpayload"></a>
#### FastUserPayload

```java
public class FastUserPayload {
    private final String nickName;
    private final String avatar;
   
    public FastUserPayload(String nickName) {
        this(nickName, null);
    }

    public FastUserPayload(String nickName, String avatar) {
        this.nickName = nickName;
        this.avatar = avatar;
    }
}
```

`FastUserPayload` 对象，用于储存光标上显示的用户信息，包含以下成员变量：

- `nickName`：String。用户光标上显示的用户昵称。

- `avatar`：String。（可选）用户光标上显示的用户头像，应传入头像对应的 URL 地址。

## FastRoom 类

`FastRoom` 类提供管理互动白板实时房间的方法。

### join [1/2] 

```java
public void join()
```

加入白板房间。

**注意**

该方法需要在成功创建 `FastRoom` 对象后调用。

### join [2/2]

```java
public void join(@Nullable OnRoomReadyCallback onRoomReadyCallback)
```

加入白板房间。

**注意**

该方法需要在成功创建 `FastRoom` 对象后调用。

**参数**

- `onRoomReadyCallback`：<a href="#roomready">OnRoomReadyCallback</a> 接口实例。传入 `null`，表示不注册该接口。


<a name="roomready"></a>
#### OnRoomReadyCallback

`OnRoomReadyCallback` 接口，用于向 app 发送房间事件通知，包含如下成员方法：

```java
void onRoomReady(FastRoom fastRoom);
```

房间准备就绪回调。

**参数**

- `fastRoom`：`FastRoom` 对象。

### isReady

```java
public boolean isReady()
```

获取房间是否准备就绪。

调用 `join` 方法后，需要调用该方法获取房间是否准备就绪。房间准备就绪后，才能调用 `FastRoom` 类中的其他方法对白板进行操作。

**返回**

房间是否准备就绪：

- `true`：准备就绪。
- `false`：尚未准备就绪。

### isWritable

```java
public boolean isWritable() 
```

获取本地用户在当前互动白板实时房间是否为互动模式。

**返回**

获取本地用户是否为互动模式：

- `true`：互动模式，即具有读写权限。
- `false`：订阅模式，即具有只读权限。

### redo

```java
public void redo()
```

重做，即回退撤销操作。

### setWritable [1/2]

```java
public void setWritable(boolean writable)
```

设置用户在房间是否为互动模式。

**注意**

该方法需要在房间准备就绪后调用。

**参数**

- `writable`：用户在房间中是否为互动模式：
  - `true`：互动模式，即具有读写权限。
  - `false`：订阅模式，即具有只读权限。

### setWritable [2/2]

```java
public void setWritable(boolean writable, FastResult<Boolean> result)
```

设置用户在房间是否为互动模式。

**注意**

该方法需要在房间准备就绪后调用。

**参数**

- `writable`：用户在房间中是否为互动模式：
  - `true`：互动模式，即具有读写权限。
  - `false`：订阅模式，即具有只读权限。
- `result`：`setWritable` 方法调用的结果。详见 <a href="#result">FastResult</a>。传入 `FastResult` 实例，SDK 会触发在 `FastResult` 接口中实现的回调，报告 `setWritable` 方法调用是否成功；传入 `null` 表示不监听回调。


### undo

```java
public void undo()
```

撤销上一步操作。

### setStrokeColor

```java
public void setStrokeColor(@ColorInt int color)
```

设置线条的颜色。

**参数**

- `color`：int。线条颜色，RGB 格式，例如 `0x0000FF` 表示蓝色

### setAppliance

```java
public void setAppliance(FastAppliance fastAppliance)
```

设置当前使用的白板工具。

**参数**

- `fastAppliance`：白板工具。详见  <a href="#appliance">FastAppliance</a>。


<a name="appliance"></a>
#### FastAppliance

白板工具，包含以下枚举值：

- `CLICKER(Appliance.CLICKER)`：点击工具。目前主要用于点击 HTML5 文件上的内容。

- `SELECTOR(Appliance.SELECTOR)`：选择工具。

- `PENCIL(Appliance.PENCIL)`：铅笔。

- `RECTANGLE(Appliance.RECTANGLE)`：矩形工具。

- `ELLIPSE(Appliance.ELLIPSE)`：椭圆工具。

- `TEXT(Appliance.TEXT)`：文字工具。

- `ERASER(Appliance.ERASER)`：橡皮工具。

- `LASER_POINTER(Appliance.LASER_POINTER)`：激光笔。

- `ARROW(Appliance.ARROW)`：箭头。

- `STRAIGHT(Appliance.STRAIGHT)`：直线。

- `PENTAGRAM(Appliance.SHAPE, ShapeType.Pentagram)`：五角星。

- `RHOMBUS(Appliance.SHAPE, ShapeType.Rhombus)`：菱形。

- `TRIANGLE(Appliance.SHAPE, ShapeType.Triangle)`：三角形。

- `BUBBLE(Appliance.SHAPE, ShapeType.SpeechBalloon)`：对话气泡。

- `OTHER_CLEAR()`：清除白板内容。


### setStrokeWidth

```java
public void setStrokeWidth(int width)
```

设置线条的宽度。

**参数**

- `width`：int。线条宽度（px）。

### cleanScene

```java
public void cleanScene()
```

清除白板内容。

### setWritable

```java
public void setWritable(boolean writable)
```

设置用户在房间中是否为互动模式。

**参数**

- `writable`：boolean。用户是否为互动模式：
  - `true`：互动模式，即具有读写权限。
  - `false`：订阅模式，即具有只读权限。

### insertImage

```java
public void insertImage(String url, int width, int height)
```

插入图片。

该方法可以将指定的网络图片插入并展示到当前白板页面上。

**参数**

- `url`：String。图片的 URL 地址。请确保 app 客户端能够访问该 URL，否则图片无法正常展示。
- `width`：int。图片的宽度（px)。
- `height`：int。图片的高度（px)。

### insertVideo

```java
public void insertVideo(String url, String title)
```

在白板子窗口中插入并播放音视频。

**参数**

- `url`：音视频文件的 URL 地址。请确保 app 客户端能够访问该 URL，否则无法正常加载音视频文件。
- `title`：窗口标题。

### insertDocs

```java
public void insertDocs(FastInsertDocParams params, FastResult<String> result)
```

在白板子窗口中插入并展示文档。

[成功发起文档转换任务](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#发起文档转换（post）)后，可以调用该方法，传入转换后文档的相关参数，SDK 会自动创建子窗口，插入并分页展示转换后的文档。

**参数**

- `params`：插入文档的参数设置。详见 <a href="#docparams">FastInsertDocParams</a>。
- `result`：`insertDocs` 方法调用结果。详见 <a href="#result">FastResult</a>。传入 `FastResult` 实例，SDK 会触发在 `FastResult` 接口中实现的回调，报告 `insertDocs` 方法调用是否成功；传入 `null` 表示不监听回调。


<a name="docparams"></a>
#### FastInsertDocParams

文档的参数设置。

```java
public class FastInsertDocParams {
    private String taskUUID;
    private String taskToken;
    private FastRegion region;
    private ConverterType converterType;   
    private String fileType;
    private Boolean dynamicDoc;
    private String title;
}
```

`FastInsertDocParams` 类包含以下属性：

- `taskUUID`：String。文档转换任务的 Task UUID，即[发起文档转换任务 API ](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#发起文档转换)请求成功时响应包体中 uuid 参数的值。
- `taskToken`：String。文档转换任务的 Task Token，必须和[发起文档转换任务](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#发起文档转换)时传入的 Task Token 一致。
- `converterType`: 枚举。文档转换服务的版本，取值如下：
  - `Projector`: 新版。详见[新版文档转换服务](https://docs.agora.io/cn/whiteboard/file_conversion_overview?platform=Android)。
  - `WhiteboardConverter`: 旧版（默认值）。详见[旧版文档转换服务](https://docs.agora.io/cn/whiteboard/file_conversion_overview_old?platform=RESTful)。
- `fileType`：String。文档类型：
  - `pdf`：静态文档。
  - `pptx`：动态文档。
- `dynamicDoc`: boolean。文档转换任务类型是否为动态转换任务。
- `title`：String。窗口标题。


### setFastStyle

```java
public void setFastStyle(FastStyle style)
```

设置白板用户界面的样式。

**参数**

- `style`：白板用户界面的样式。详见 <a href="#faststyle">FastStyle</a>。


<a name="faststyle"></a>
#### FastStyle

白板用户界面的样式。

```java
public class FastStyle {
    private int mainColor;
    private boolean darkMode;
 
    public FastStyle() {
    }
 
    public int getMainColor() {
        return mainColor;
    }
 
    public void setMainColor(@ColorInt int color) {
        this.mainColor = color;
    }
 
    public boolean isDarkMode() {
        return darkMode;
    }
 
    public void setDarkMode(boolean darkMode) {
        this.darkMode = darkMode;
    }
 
    public FastStyle copy() {
        FastStyle style = new FastStyle();
        style.mainColor = mainColor;
        style.darkMode = darkMode;
        return style;
    }
}
```

`FastStyle` 类包含如下成员方法：

**getMainColor**

获取白板用户界面的主题色。

**返回**

白板用户界面的主题色。

**setMainColor**

设置白板用户界面的主题色。

该方法可设置部分按钮边框、白板加载时提示文字的颜色。

**参数**

- `color`：白板用户界面的主题色，RGB 格式，例如 `0x0000FF` 表示蓝色。

**isDarkMode**

获取白板用户界面是否为暗色模式。

**返回**

- `true`：白板用户界面为暗色模式。
- `false`：白板用户界面为浅色模式。

**setDarkMode**

设置白板用户界面为暗色模式。

**参数**

- `darkMode`：是否使用暗色模式：

 - `true`：暗色模式。
 - `false`：浅色模式。


### setResource

```java
public void setResource(FastResource fastResource)
```

设置白板颜色相关的资源。

**参数**

- `fastResource`：白板颜色相关的资源。详见 <a href="#fastresource">FastResource</a>。

<a name="fastresource"></a>
#### FastResource

白板颜色相关的资源。

```java
public class FastResource {
    @ColorInt
    public int getBackgroundColor(boolean darkMode) {
        return color(darkMode
                ? R.color.fast_dark_mode_bg
                : R.color.fast_light_mode_bg
        );
    }

    @ColorInt
    public int getBoardBackgroundColor(boolean darkMode) {
        return getBackgroundColor(darkMode);
    }
}
```

包含如下成员方法，均可通过重写方法来自定义颜色：

**getBackgroundColor**

获取白板控件底色。

**参数**

- `darkMode`：boolean。白板控件底色是否为暗色模式：
  - `true`：暗色模式。
  - `false`：浅色模式。

**返回**

十六进制的颜色值。

**getBoardBackgroundColor**

获取白板底色。

**注意**

如果不重写该方法，将默认调用 `getBackgroundColor`。

**参数**

- `darkMode`：boolean。白板底色是否为暗色模式：
  - `true`：暗色模式。
  - `false`：浅色模式。

**返回**

十六进制的颜色值。


## FastUiSettings 类

`FastUiSettings` 类提供设置白板用户界面的方法。

### showRoomController 

```java
public void showRoomController(ControllerId... ids)
```

展示白板用户界面上的控件。

**参数**

- `ids`：控件的标识符。详见 <a href="#controllerId">ControllerId</a>。

### hideRoomController 

```java
public void hideRoomController(ControllerId... ids)
```

隐藏白板用户界面上的控件。

**参数**

- `ids`：控件的标识符。详见 <a href="#controllerId">ControllerId</a>。

<a name="controllerId"></a>
#### ControllerId

白板用户界面上的控件，包含如下枚举值：

- `RedoUndo`：重做和撤销按钮。
- `ToolBox`：工具条。
- `PageIndicator`：页面指示器。

### setToolsExpandAppliances

```java
public static void setToolsExpandAppliances(List<List<FastAppliance>> toolsExpandAppliances)
```

设置展开模式下工具条包含的工具集。

如果 Fastboard SDK 提供的默认工具条无法满足你的需求，你可以调用该方法自定义工具条包含的工具，并设置工具条为展开模式。你可以在该方法中传入二级工具列表，其中一级列表中的元素会在工具条上展开显示，二级列表中的元素会被折叠。

成功调用 `setToolsExpandAppliances` 方法后，如果你需要切换工具条为折叠模式，你可以调用 <a href="#settoolboxexpand">setToolboxExpand</a>。

**注意**

该方法需要在加入白板房间前调用。

**参数**

- `toolsExpandAppliances`：展开模式下工具条包含的工具。详见 <a href="#appliance">FastAppliance</a>。

**示例**

```java
ArrayList<List<FastAppliance>> config = new ArrayList<>();
config.add(Arrays.asList(
        FastAppliance.CLICKER,
        FastAppliance.PENCIL,
        FastAppliance.TEXT,
        FastAppliance.SELECTOR,
        FastAppliance.ERASER
));
config.add(Arrays.asList(FastAppliance.SELECTOR));
config.add(Arrays.asList(FastAppliance.PENCIL));
config.add(Arrays.asList(FastAppliance.TEXT));
config.add(Arrays.asList(FastAppliance.ERASER));
config.add(Arrays.asList(
        FastAppliance.STRAIGHT,
        FastAppliance.ARROW,
        FastAppliance.RECTANGLE,
        FastAppliance.ELLIPSE,
        FastAppliance.PENTAGRAM,
        FastAppliance.RHOMBUS,
        FastAppliance.BUBBLE,
        FastAppliance.TRIANGLE
));
config.add(Arrays.asList(FastAppliance.OTHER_CLEAR));
 
FastUiSettings.setToolsExpandAppliances(config);
```

### setToolsCollapseAppliances

```java
public static void setToolsCollapseAppliances(List<FastAppliance> toolsCollapseAppliances)
```

设置折叠模式下工具条包含的工具集。

如果 Fastboard SDK 提供的默认工具条无法满足你的需求，你可以调用该方法自定义工具条包含的工具，并设置工具条为折叠模式。你可以在该方法中传入一级工具列表，列表中的元素在工具条上默认折叠。

成功调用 `setToolsCollapseAppliances` 方法后，如果需要切换工具条为展开模式，你可以调用 <a href="#settoolboxexpand">setToolboxExpand</a>。

**注意**

该方法需要在加入白板房间前调用。

**参数**

- `toolsCollapseAppliances`：白板工具条包含的工具。详见 <a href="#appliance">FastAppliance</a>。

**示例**

```java
ArrayList<FastAppliance> collapseAppliances = new ArrayList<>();
collapseAppliances.add(FastAppliance.PENCIL);
collapseAppliances.add(FastAppliance.ERASER);
collapseAppliances.add(FastAppliance.ARROW);
collapseAppliances.add(FastAppliance.SELECTOR);
collapseAppliances.add(FastAppliance.TEXT);
collapseAppliances.add(FastAppliance.OTHER_CLEAR);
 
FastUiSettings.setToolsCollapseAppliances(collapseAppliances);
```

### setToolsColors

```java
public static void setToolsColors(List<Integer> toolsColors)
```

设置白板工具使用的颜色。

该方法设置使用白板工具绘制出的图形、线条或文字的颜色。

**注意**

该方法需要在加入白板房间前调用。

**参数**

- `toolsColors`：白板工具的颜色，RGB 格式，例如 `0x0000FF` 表示蓝色。

### setToolboxEdgeMargin

```java
public void setToolboxEdgeMargin(int margin)
```

设置白板工具条与侧边的边距。

边距的定义由 `setToolboxGravity` 中设置的工具条位置决定：

- 工具条位于白板左边：边距指工具条左侧侧边与白板左侧侧边之间的距离。
- 工具条位于白板右边：边距指工具条右侧侧边与白板右侧侧边之间的距离。

**参数**

- `margin`：int。工具条与白板侧边的距离，单位为 `px`。

### setToolboxGravity

```java
public void setToolboxGravity(int gravity)
```

设置工具条在白板上的位置。

**参数**

- `gravity`：工具栏在白板上的位置：

 - `Gravity.LEFT`：左边。
 - `Gravity.RIGHT`：右边。


<a name="settoolboxexpand"></a>
### setToolboxExpand

```java
public void setToolboxExpand(boolean expand)
```

设置是否展开工具栏。

工具栏的默认展示状态与设备有关，在平板上默认展开，在手机上默认折叠。你可以调用该方法，修改工具栏的展示状态。

**参数**

- `expand`：是否展开工具栏：
  - `true`：展开。
  - `false`：折叠。


<a name="result"></a>
## FastResult

方法调用结果。

```java
public interface FastResult<T> {
  void onSuccess(T value);
  void onError(Exception exception);
}
```

`FastResult` 接口报告方法的调用结果，包含以下回调方法：

- `onSuccess`：方法调用成功回调。
- `onError`：发生错误回调。