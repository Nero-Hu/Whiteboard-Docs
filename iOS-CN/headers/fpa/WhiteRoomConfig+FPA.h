//
//  WhiteRoomConfig+FPA.h
//  Whiteboard
//
//  Created by xuyunshi on 2022/2/16.
//

#import "WhiteRoomConfig.h"

@interface WhiteRoomConfig ()

/**
 是否开启全链路加速。

 Agora 互动白板服务集成了 [Agora 全链路加速（FPA）服务](https://docs.agora.io/cn/global-accelerator/agora_ga_overview?platform=All%20Platforms)。
 集成 Agora Whiteboard SDK 后，你可以按照如下步骤设置，在互动白板应用中开启全链路加速功能，提升传输质量：
 1. 在项目的 `podfile` 文件中添加 `pod 'Whiteboard/fpa'`。
 2. 加入频道前，调用 `nativeWebSocket(YES)`，开启全链路加速功能。

 @note 该功能仅支持 iOS 13.0 或之后的系统。

 - `YES`：开启全链路加速。
 - `NO`：（默认）关闭全链路加速。
*/
@property (nonatomic, assign) BOOL nativeWebSocket API_AVAILABLE(ios(13.0));

@end
