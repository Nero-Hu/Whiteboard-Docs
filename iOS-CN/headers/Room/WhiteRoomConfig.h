//
//  WhiteRoomConfig.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/30.
//

#import "WhiteObject.h"
#import "WhiteMemberInformation.h"
#import "WhiteCameraBound.h"
#import "WhiteConsts.h"

NS_ASSUME_NONNULL_BEGIN

/**
 配置实时房间的参数。

 **Note:**

 `WhiteRoomConfig` 类中所有的方法都必须在加入房间前调用；成功加入房间后，调用该类中的任何方法都不会生效。
 */
@interface WhiteRoomConfig : WhiteObject

/**
 设置房间 UUID 并初始化 `WhiteRoomConfig` 对象。
 @param uuid 房间 UUID，即房间唯一标识符。
 @param roomToken 用于鉴权的 Room Token。生成该 Room Token 的房间 UUID 必须和上面传入的房间 UUID 一致。
 @param uid 自从 v2.15.0。用户唯一标识符，字符串格式，长度不能超过 1024 字节。如果你使用 2.15.0 及之后版本的 SDK，必须传入该参数。请确保同一房间内每个用户 uid 的唯一性。
 @return 初始化的 `WhiteRoomConfig` 对象。
 */
- (instancetype)initWithUUID:(NSString *)uuid roomToken:(NSString *)roomToken uid:(NSString *)uid;

/**
 设置房间 UUID 和用户信息并初始化 `WhiteRoomConfig` 对象。
 @param uuid 房间 UUID，即房间唯一标识符。
 @param roomToken 用于鉴权的 Room Token。生成该 Room Token 的房间 UUID 必须和上面传入的房间 UUID 一致。
 @param uid 自从 v2.15.0。用户唯一标识符，字符串格式，长度不能超过 1024 字节。如果你使用 2.15.0 及之后版本的 SDK，必须传入该参数。请确保同一房间内每个用户 uid 的唯一性。
 @param userPayload 自定义用户信息。
 @return 初始化的 `WhiteRoomConfig` 对象。
 */
- (instancetype)initWithUUID:(NSString *)uuid roomToken:(NSString *)roomToken uid:(NSString *)uid userPayload:(id _Nullable)userPayload NS_DESIGNATED_INITIALIZER;

/** 房间 UUID，即房间唯一标识符。 */
@property (nonatomic, copy) NSString *uuid;
/** 用于鉴权的 Room Token。 */
@property (nonatomic, copy) NSString *roomToken;
/** 用户唯一标识符，字符串格式，长度不超过 1024 字节。自从 v2.15.0。*/
@property (nonatomic, copy, readonly) NSString *uid;

/**
 互动白板房间所在的数据中心。

 数据中心包括：

 - `"cn-hz"`：中国杭州。该数据中心为其他数据中心服务区未覆盖的地区提供服务。
 - `"us-sv"`：美国硅谷。该数据中心为北美洲、南美洲地区提供服务。
 - `"in-mum"`：印度孟买。该数据中心为印度地区提供服务。
 - `"sg"`：新加坡。该数据中心为新加坡、东亚、东南亚地区提供服务。
 - `"eu"`：欧洲（法兰克福）。该数据中心为欧洲地区提供服务。

 **Note:**

 - 该方法设置的数据中心必须与要加入的互动白板实时房间所在数据中心一致，否则无法加入房间。
 - 该方法与 [WhiteSdkConfiguration](WhiteSdkConfiguration) 类中的 [region]([WhiteSdkConfiguration region]) 方法作用相同，两个方法只需要调用其中的一个。如果同时调用，该方法会覆盖 [WhiteSdkConfiguration](WhiteSdkConfiguration) 类中的 [region]([WhiteSdkConfiguration region])。

 @since 2.11.0 */
@property (nonatomic, strong, nullable) WhiteRegionKey region;

/**
 禁止/允许工具响应用户输入。

 - `YES`：禁止工具响应用户输入。
 - `NO`：（默认）允许工具响应用户输入。
 */
@property (nonatomic, assign) BOOL disableDeviceInputs;

/**
 禁止/允许本地用户操作白板的视角，包括缩放和移动视角。

 - `YES`：禁止本地用户操作白板视角。
 - `NO`：（默认）允许本地用户操作白板视角。
 */
@property (nonatomic, assign) BOOL disableCameraTransform;

/**
 是否关闭贝塞尔曲线优化。

 - `YES`：关闭贝塞尔曲线优化。
 - `NO`：（默认）开启贝塞尔曲线优化。
 */
@property (nonatomic, assign) BOOL disableBezier;

/**
 该方法已废弃。请使用 [disableDeviceInputs]([WhiteRoom disableDeviceInputs:]) 和 [disableCameraTransform]([WhiteDisplayer disableCameraTransform:])。

 允许/禁止白板响应用户任何操作。

 禁止白板响应用户任何操作后，用户无法使用工具输入内容，也无法对白板进行视角缩放和视角移动。
 */
@property (nonatomic, assign) BOOL disableOperations __attribute__((deprecated("please use disableDeviceInputs and disableCameraTransform")));

/**
 是否关闭橡皮擦擦除图片功能。

 - `YES`：橡皮擦不可以擦除图片。
 - `NO`：（默认）橡皮擦可以擦除图片。
 */
@property (nonatomic, assign) BOOL disableEraseImage;

/**
 是否开启浮动条。浮动条会在使用选择工具选中单个物体或者同类物体时出现。

 - `YES`：开启浮动条。
 - `NO`：（默认）关闭浮动条。
 */
@property (nonatomic, assign) BOOL floatBar;

/**
 本地用户的视角边界。详见 [WhiteCameraBound](WhiteCameraBound)。
 */
@property (nonatomic, strong, nullable) WhiteCameraBound *cameraBound;

/**
 自定义的用户信息，可以为 JSON、NSString、NSNumber 格式，推荐格式为 NSDictionary。

 **Note:**

 - 必须使用 `WhiteRoomConfig` 子类，以保证字段结构正确。
 - 自定义的用户信息会被完整透传。
 如果要在白板房间中显示用户头像，请在 `userPayload` 中传入 `avatar` 字段并添加用户头像的地址，例如 "avatar", "https://example.com/user.png")。
 - 从 [WhiteMemberInformation](WhiteMemberInformation) 迁移，只需要在 `userPayload` 中，传入相同字段即可。
 */
@property (nonatomic, copy, nullable) id userPayload;

/**
 已废弃，请使用 `userPayload`。

 自定义的用户信息。
 */
@property (nonatomic, copy, nullable) WhiteMemberInformation *memberInfo __attribute__((deprecated("memberInfo is deprecated, please use userPayload")));

/**
 用户是否以互动模式加入白板房间。

 在加入房间后，也可以通过 [setWritable]([WhiteRoom setWritable:completionHandler:]) 方法切换读写模式。

 - `YES`：以互动模式加入白板房间，即具有读写权限。
 - `NO`：以订阅模式加入白板房间，即具有只读权限。不能操作工具、修改房间状态，当前用户也不会出现在 `roomMembers` 列表中。
 */
@property (nonatomic, assign) BOOL isWritable;

/**
 关闭/开启新铅笔工具。

 设置是否关闭新铅笔工具：

 - `YES`: （默认）关闭新铅笔工具。SDK 会对铅笔工具（`AppliancePencil`）应用旧版笔迹平滑算法。
 - `NO`: 开启新铅笔工具。SDK 会对铅笔工具应用新版笔迹平滑算法，使书写笔迹更加流畅自然，并带有笔锋效果。

 @since 2.12.2

 **Note:**

  - 在 2.12.2 版本中，默认值为 `NO`，自 2.12.3 版本起，默认值改为 `YES`。
  - 为正常显示笔迹，在开启新铅笔前，请确保该房间内的所有用户使用如下 SDK：
    - Android SDK 2.12.3 版或之后
    - iOS SDK 2.12.3 版或之后
    - Web SDK 2.12.5 版或之后
 */
@property (nonatomic, assign) BOOL disableNewPencil;


/**
 加入房间的超时时间。单位为毫秒。

 SDK 超时后会主动断连，并触发 [firePhaseChanged]([WhiteRoomCallbackDelegate firePhaseChanged:]) 回调。同时触发 [fireDisconnectWithError]([WhiteRoomCallbackDelegate fireDisconnectWithError:]) 回调并返回”重连时长超出 xx 毫秒”的提示。
 */
@property (nonatomic, strong) NSNumber *timeout;

/**
 是否只允许用户使用 Apple Pencil 在白板上绘制和书写。

 - `YES`：只允许使用 Apple Pencil 在白板上绘制和书写。
 - `NO`：（默认）允许使用 Apple Pencil 或手指在白板上绘制和书写。

 设置 `drawOnlyApplePencil(YES)` 后，用户只能使用 Apple Pencil 在白板上绘制和书写，无法使用手指绘制和书写。
 如果用户用手指触碰白板，SDK 会触发两个 [fireRoomStateChanged]([WhiteRoomCallbackDelegate fireRoomStateChanged:]) 回调，报告当前使用的
 白板工具 (`memberState`) 在 `ApplianceClicker` 和 `AppliancePencil` 之间发生了切换。

 **Note:**

  - 该属性仅在 iPad 设备上生效。
  - 该属性的设置建议跟随 `UIPencilInteraction.prefersPencilOnlyDrawing` 的设置。
 */
@property (nonatomic, assign) BOOL drawOnlyApplePencil;

/**
 是否开启全链路加速。

 声网互动白板服务集成了 [声网 全链路加速（FPA）服务](https://docs.agora.io/cn/global-accelerator/agora_ga_overview?platform=All%20Platforms)。
 集成声网 Whiteboard SDK 后，你可以按照如下步骤设置，在互动白板应用中开启全链路加速功能，提升传输质量：
 1. 在项目的 `podfile` 文件中添加 `pod 'Whiteboard/fpa'`。
 2. 加入频道前，调用 `nativeWebSocket(YES)`，开启全链路加速功能。

 @note 该功能仅支持 iOS 13.0 或之后的系统。

 - `YES`：开启全链路加速。
 - `NO`：（默认）关闭全链路加速。
*/
@property (nonatomic, assign) BOOL nativeWebSocket;

@end

NS_ASSUME_NONNULL_END
