//
//  WhiteSlideDelegate.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NSString * WhiteSlideErrorType NS_STRING_ENUM;

extern WhiteSlideErrorType const WhiteSlideErrorTypeResourceError;
extern WhiteSlideErrorType const WhiteSlideErrorTypeRuntimeError;
extern WhiteSlideErrorType const WhiteSlideErrorTypeRuntimeWarn;
extern WhiteSlideErrorType const WhiteSlideErrorTypeCanvasCrash;
extern WhiteSlideErrorType const WhiteSlideErrorTypeCanvasUnknown;

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

/**
 * PPT 加载错误回调，用于监听 PPT 渲染错误事件。
 *
 * @since 2.16.93
 *
 * @param slideError 错误类型。包括：
 *  - `WhiteSlideErrorTypeResourceError`：当 PPT 依赖的远程资源（如 JSON、PNG）不可用时触发，触发后当前页无法交互。恢复手段：重新渲染当前页或者跳转到下一页。
 *  - `WhiteSlideErrorTypeRuntimeError`：未知的异常导致触发，触发后当前页无法交互。恢复手段：跳转到下一页。
 *  - `WhiteSlideErrorTypeRuntimeWarn`：动画过程中出现未知的警告，触发后动画当前帧表现异常，但不影响下一帧和页面交互。恢复手段：无需特殊处理。
 *  - `WhiteSlideErrorTypeCanvasCrash`：由于内存不足，或者 canvas 被意外移除（在未调用 slide.destroy() 的情况下移除 canvas 元素）导致触发，触发后 canvas 元素白屏。恢复手段：刷新网页，或者销毁 slide 对象并重新创建。
 *  - `WhiteSlideErrorTypeCanvasUnknown`：画布未知错误。
 * @param errorMessage  错误信息。
 * @param slideId   PPT ID。
 * @param slideIndex PPT 索引。
 */
- (void)onSlideError:(WhiteSlideErrorType)slideError errorMessage:(NSString *)errorMessage slideId:(NSString *)slideId slideIndex:(NSInteger)slideIndex;

@end

NS_ASSUME_NONNULL_END
