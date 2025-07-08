//
//  WhiteBaseCallbacks.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/1.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/** Whiteboard common callbacks. The SDK send callback event notifications to the application. */
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

@end


/**
 Whiteboard common callbacks.The SDK send callback event notifications to the application.
 */
@interface WhiteCommonCallbacks : NSObject

/**
 Whiteboard common callbacks. See [WhiteCommonCallbackDelegate](WhiteCommonCallbackDelegate).
 */
@property (nonatomic, weak) id<WhiteCommonCallbackDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
