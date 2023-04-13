//
//  WhiteBaseCallbacks.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/** Whiteboard common callbacks. The SDK sends callback event notifications to the application. */
@protocol WhiteCommonCallbackDelegate <NSObject>

@optional

/** Reports an uncaught global error during SDK runtime.
 
 @param error An error message.
 */
- (void)throwError:(NSError *)error;


/**
 Occurs when the SDK intercepts an image URL address.
 
 **Note:**  
 
 - To trigger this callback, you must set `enableInterrupterAPI(YES)` to enable the image interception replacement function when initializing the whiteboard SDK. 
 See [WhiteSdkConfiguration](WhiteSdkConfiguration) for details.
 - After the picture interception and replacement function is enabled, the callback will be triggered when a picture or scene is inserted into the whiteboard.
 @param url The original URL address of an image.
 @return The URL address that you specify to replace the original one. Ensure that you set the return value.
 */
- (NSString *)urlInterrupter:(NSString *)url;

/**
 Occurs when the audio and video in dynamic PPT slides start playing.
 */
- (void)pptMediaPlay;

/**
 Occurs when the audio and video in dynamic PPT slides pause playing.
 */
- (void)pptMediaPause;

/**
 Reports the failure of the SDK initialization. 

 @since 2.9.13 

 You must initialize a `WhiteSDK` object before calling any other APIs. You can try reinitializing the SDK.

 The SDK initialization failure may be due to the following reasons:

 - Failure to obtain configuration information due to network connection issues.
 - The specified App Identifier is invalid.
  @param error An error message.
 */
- (void)sdkSetupFail:(NSError *)error;

/**
 Reports the message sent by the webpage.

 - Iframe data in dictionary format
 - Image loading failure message
 - PPT play/pause callback information

 This callback is triggered when a local user receives a message sent by a web page (such as iframe plug-in, dynamic PPT).

 @param dict Message in dictionary format. Only when the message is in dictionary format, the local user can receive it.
 */
- (void)customMessage:(NSDictionary *)dict;

/**
 Gets the local debug logs output by the SDK.

 @since v2.13.19

 After you successfully call `log (YES)` in [WhiteSdkConfiguration](WhiteSdkConfiguration), the SDK triggers this callback to send you the local debug logs.

 If you need to disable this callback, call `log (NO)` in [WhiteSdkConfiguration](WhiteSdkConfiguration).

 **Note:**
 
 After you call `log (NO)`, the SDK stops sending you the local debug logs through this callback, but still triggers this callback to send the logs related to [video-js-plugin](https://github.com/netless-io/whiteboard-demo/tree/master/packages/video-js-plugin).

 @param dict Log messages in dict format. Each log message contains the following keys:

 - `funName`: The function name.
 - `params`: Detailed parameter settings.

 For example, `{"funName": "joinRoom", "params": {"isWritable": 1, "region": "us-sv"}}`.
 */
- (void)logger:(NSDictionary *)dict;

/**
 Reports that the SDK tries to recover. 
 
 Called when the SDK crashes due to insufficient memory.

 Currently, only real-time rooms can trigger this callback. This callback is triggered a maximum of three times per crash.
 */
- (void)startRecoveringFromMemoryIssues;

/**
 Reports that the SDK finishes a recovery. 
 
 Called when the SDK crashes due to insufficient memory and then finishes one recovery.
  
 If the recovery fails, the SDK does not automatically retry.
 
 @param success Whether the recovery is successful.
 */
-(void)endRecoveringFromMemoryIssues:(BOOL)success;

@end


/**
 Whiteboard common callbacks.The SDK sends callback event notifications to the application.
 */
@interface WhiteCommonCallbacks : NSObject

/**
 Whiteboard common callbacks. See [WhiteCommonCallbackDelegate](WhiteCommonCallbackDelegate).
 */
@property (nonatomic, weak) id<WhiteCommonCallbackDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
