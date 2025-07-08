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
 * Processes the result after PPT URL is intercepted and replaced.
 * 
 * @param result The URL replacement of the PPT.
 */
typedef void (^SlideUrlInterrupterCallback)(NSString * _Nullable result);

/** PPT callback events. */
@protocol WhiteSlideDelegate <NSObject>

@optional

/**
 The callback for intercepting PPT URL. 
 
 **Note:**
 
 - To trigger this callback, you must enable the PPT interception and replacement feature by setting `WhiteSdkConfiguration.enableSlideInterrupterAPI(YES)` when initializing the Whiteboard SDK. See [WhiteSdkConfiguration](WhiteSdkConfiguration).
 @param url The original URL address of the PPT resource.
 @param completionHandler The callback closure for the replaced URL of the PPT resource. You need to implement the replacement logic within this callback. After completing the replacement, you should call completionHandler to handle the interception and replacement result of the PPT URL.
 */
- (void)slideUrlInterrupter:(NSString * _Nullable)url completionHandler:(SlideUrlInterrupterCallback _Nullable )completionHandler;

/**
 * PPT loading error callback, used to monitor PPT rendering error events.
 *
 * @since 2.16.93
 *
 * @param slideError The error type. Includes:
 *  - `WhiteSlideErrorTypeResourceError`：When the remote resources (such as JSON and PNG) required by the PPT are unavailable, this error is triggered. After the error is triggered, the current page cannot interact. The recovery method is to re-render the current page or jump to the next page.
 *  - `WhiteSlideErrorTypeRuntimeError`：This error is triggered due to an unknown exception. After the error is triggered, the current page cannot interact. The recovery method is to jump to the next page.
 *  - `WhiteSlideErrorTypeRuntimeWarn`：This error is triggered due to an unknown warning during the animation process. After the error is triggered, the current frame of the animation performs abnormally, but does not affect the next frame and page interaction. The recovery method is: no special processing is required.
 *  - `WhiteSlideErrorTypeCanvasCrash`：This error is triggered due to insufficient memory, or the canvas element is removed unexpectedly (the canvas element is removed without calling slide.destroy()), which causes the canvas element to become white. The recovery method is: refresh the webpage, or destroy the slide object and recreate it.
 *  - `WhiteSlideErrorTypeCanvasUnknown`：This error is triggered due to an unknown error.
 * @param errorMessage The error message.
 * @param slideId The PPT ID.
 * @param slideIndex The PPT index.
 */
- (void)onSlideError:(WhiteSlideErrorType)slideError errorMessage:(NSString *)errorMessage slideId:(NSString *)slideId slideIndex:(NSInteger)slideIndex;

@end

NS_ASSUME_NONNULL_END
