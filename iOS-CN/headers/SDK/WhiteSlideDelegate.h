//
//  WhiteSlideDelegate.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


/** 
 * 用于处理 PPT URL 拦截和替换后的结果。
 * 
 * @param result 替换后的 PPT 资源地址。
 */
typedef void (^SlideUrlInterrupterCallback)(NSString * _Nullable result);

/** 多窗口 PPT 回调事件。 */
@protocol WhiteSlideDelegate <NSObject>

@optional

/**
 PPT URL 拦截回调。
 
 **Note:**
 
 - 要触发该回调，必须在初始化白板 SDK 时，设置 `WhiteSdkConfiguration.enableSlideInterrupterAPI(YES)` 开启 PPT 拦截替换功能。详见 [WhiteSdkConfiguration](WhiteSdkConfiguration)。
 @param url 原始 PPT 资源地址。
 @param completionHandler 替换后的 PPT 资源地址的回调闭包，你需要在该回调中实现替换逻辑。完成替换后，你需要调用 `completionHandler` 处理 PPT URL 拦截和替换后的结果。
 */
- (void)slideUrlInterrupter:(NSString * _Nullable)url completionHandler:(SlideUrlInterrupterCallback _Nullable )completionHandler;

@end

NS_ASSUME_NONNULL_END
