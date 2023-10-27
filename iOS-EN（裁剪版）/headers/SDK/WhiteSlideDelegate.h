//
//  WhiteSlideDelegate.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


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

@end

NS_ASSUME_NONNULL_END
