//
//  WhiteSdkConfiguration.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/15.
//

#import "WhiteObject.h"
#import <UIKit/UIKit.h>
#import "WhiteConsts.h"

// Hidden in doc
typedef NS_ENUM(NSInteger, WhiteDeviceType) {
    WhiteDeviceTypeTouch,
    WhiteDeviceTypeDesktop,
};

NS_ASSUME_NONNULL_BEGIN

/**
 Rendering modes for drawings.
 */
typedef NSString * WhiteSdkRenderEngineKey NS_STRING_ENUM;
/**
 SVG rendering mode.

 The Interactive Whiteboard SDK v2.8.0 or earlier uses SVG rendering mode for drawings by default. This mode has better compatibility but poorer performance.
 */
FOUNDATION_EXPORT WhiteSdkRenderEngineKey const WhiteSdkRenderEngineSvg;
/**
 Canvas rendering mode.

 Since v2.8.0, the Interactive Whiteboard SDK adds canvas rendering mode, which has better performance but poorer compatibility.

 Since v2.9.0, the SDK uses canvas rendering mode for drawings by default.
 */
FOUNDATION_EXPORT WhiteSdkRenderEngineKey const WhiteSdkRenderEngineCanvas;

/**
 The output log level.

 The log level follows the sequence of `error`, `warn`, `info`, and `debug`. When choosing a level, you can also see the logs preceding that level.

 For example, if you set the log level to `info`, the SDK outputs the logs within levels `error`，`warn`，and `info`.
 */
typedef NSString * WhiteSDKLoggerOptionLevelKey NS_STRING_ENUM;
/** Logs of the `debug` level.

 Set your log level as `debug` if you want to get the most complete log file.

 **Note:**

 At present, logs at the `debug` level have the same information as those at the `info` level.
 */
FOUNDATION_EXPORT WhiteSDKLoggerOptionLevelKey const WhiteSDKLoggerOptionLevelDebug;
/**
 Logs of the `info` level.

 Logs at this level mainly provide information on SDK connection states.
 */
FOUNDATION_EXPORT WhiteSDKLoggerOptionLevelKey const WhiteSDKLoggerOptionLevelInfo;
/**
 Logs of the `warn` level.

 Logs at this level mainly report the issues that the SDK has encountered but automatically solved.

 **Note:**

 If you call a deprecated method, the SDK does not send warning messages.
 */
FOUNDATION_EXPORT WhiteSDKLoggerOptionLevelKey const WhiteSDKLoggerOptionLevelWarn;
/**
 Logs of the `error` level.

 Logs at this level mainly report the errors that cause the SDK to fail to complete a task.
 */
FOUNDATION_EXPORT WhiteSDKLoggerOptionLevelKey const WhiteSDKLoggerOptionLevelError;

/** The mode of the SDK to report information. */
typedef NSString * WhiteSDKLoggerReportModeKey NS_STRING_ENUM;
/** (Default) Enable the SDK to report information all the time. */
FOUNDATION_EXPORT WhiteSDKLoggerReportModeKey const WhiteSDKLoggerReportAlways;
/** Disable the SDK from reporting information. */
FOUNDATION_EXPORT WhiteSDKLoggerReportModeKey const WhiteSDKLoggerReportBan;

/** Sets parameters for dynamic PPT slides. */
@interface WhitePptParams : WhiteObject

/**
 The request protocol for changing a dynamic ppt.
 You can change https://www.exmaple.com/1.pptx to scheme://www.example.com/1.pptx.

 This attribute cooperates with the `setURLSchemeHandler:forURLScheme:` method of the `WKWebViewConfiguration` class in iOS 11 WebKit, which can intercept PPT resources and choose to use local resources.
 */
@property (nonatomic, copy, nullable) NSString *scheme API_AVAILABLE(ios(11.0));

/**
 Whether to enable server-side typesetting for dynamic PPT slides.

 @since 2.12.25

 - `YES`: (Default) Enable server-side typesetting.
 - `NO`: Disable server-side typesetting.

 **Note:**

 - As of February 10, 2021, when converting dynamic PPT slides to HTML web pages, the Agora Interactive Whiteboard server supports typesetting the dynamic PPT slides to ensure the presentation of the text in the dynamic PPT slides is consistent across platforms.
 - From 2.12.25, the default value of `useServerWrap` is changed from `NO` to `YES`.
 */
@property (nonatomic, assign) BOOL useServerWrap;

@end

/** Configuration for the `WhiteSDK` instance.*/
@interface WhiteSdkConfiguration : WhiteObject

//+ (instancetype)defaultConfig;
- (instancetype)init NS_UNAVAILABLE;

/**
 Initializes the `WhiteSdkConfiguration` object.

 @param appIdentifier The unique app identifier issued to your Interactive Whiteboard project by Agora.  See [Get an App Identifier](https://docs.agora.io/en/whiteboard/enable_whiteboard?platform=Android&versionId=7b951120-9d0b-11eb-934a-83674cc9d04a#get-an-app-identifier).
 @return Initialized `WhiteSdkConfiguration` object.
*/
- (instancetype)initWithApp:(NSString *)appIdentifier NS_DESIGNATED_INITIALIZER;

/**
 The unique app identifier issued to your Interactive Whiteboard project by Agora.  See [Get an App Identifier](https://docs.agora.io/en/whiteboard/enable_whiteboard?platform=Android&versionId=7b951120-9d0b-11eb-934a-83674cc9d04a#get-an-app-identifier).

 @since 2.8.0
 */
@property (nonatomic, copy) NSString *appIdentifier;

/**
 Whether the SDK listens for image loading failure events.

  - `YES`：Listen for image loading failure events.
  - `NO`：(Default) Do not listen for image loading failure events.

 @since 2.12.0
 */
@property (nonatomic, assign) BOOL enableImgErrorCallback;
/**
 Whether the iframe plug-in is enabled.

 - `YES`：Enabled.
 - `NO`：Disabled.

 The iframe plug-in is enabled by default in version 2.10.0, and disabled by default in subsequent versions.
 */
@property (nonatomic, assign) BOOL enableIFramePlugin;


@property (nonatomic, assign) WhiteDeviceType deviceType;

/**
 The data center.

 The data center can be set to the following values:

 - `"cn-hz"`: Hangzhou, China. This data center provides services to the regions that are not covered by other data centers.
 - `"us-sv"`: Silicon Valley, US. This data center provides services to North America and South America.
 - `"in-mum"`: Mumbai, India.This data center provides services to India.
 - `"sg"`: Singapore.This data center provides services to Singapore, East Asia, and Southeast Asia.
 - `"eu"`: Frankfurt, Europe. This data center provides services to Europe.

  **Note:**

  The data center set in this method must be the same as the data center that you set when [creating the room](https://docs.agora.io/en/whiteboard/whiteboard_room_management?platform=RESTful); otherwise, the SDK fails to connect to the room.


 @since 2.11.0 */
@property (nonatomic, strong, nullable) WhiteRegionKey region;
/**
 The rendering mode for drawings. See [WhiteSdkRenderEngineKey]([WhiteSdkRenderEngineKey]).

 @since 2.8.0

 To optimize the rendering of drawings on the whiteboard, the SDK adds canvas rendering mode since v2.8.0 and sets canvas rendering mode as the default rendering mode since v 2.9.0.
 */
@property (nonatomic, copy) WhiteSdkRenderEngineKey renderEngine;

/**
 Whether to display the user avatar:

 - `YES`：Display the user avatar.
 - `NO`：(Default) Do not display the user avatar.
 */
@property (nonatomic, assign) BOOL userCursor;
/** The names and addresses of custom fonts. */
@property (nonatomic, copy, nullable) NSDictionary *fonts;

/**
 Sets whether to preload all image resources in dynamic PPT slides when loading the homepage of the slides.

 **Note:**

 Agora does not recommend setting `setPreloadDynamicPPT(true)`, because the setting may slow down the PPT display.

 - `YES`：Preload all image resources in dynamic PPT slides when loading the homepage of the slides.
 - `NO`: (Default) Do not preload all image resources in dynamic PPT slides when loading the homepage of the slides.
 */
@property (nonatomic, assign) BOOL preloadDynamicPPT;
/**
 Whether to enable image URL interception.

 - `YES`：Enable image URL interception.
 - `NO`：(Default) Disable image URL interception.

 **Note:**

 - This property enables the SDK to trigger the [urlInterrupter]([WhiteCommonCallbackDelegate urlInterrupter:]) callback when an image is inserted into the whiteboard scene.
 - You can get the original URL address of the image and replace the original URL address with a specified URL address in the callback.
 - Agora does not recommend calling `enableInterrupterAPI(YES)` because the SDK triggers the [urlInterrupter]([WhiteCommonCallbackDelegate urlInterrupter:]) callback too frequently when it is enabled.
 */
@property (nonatomic, assign) BOOL enableInterrupterAPI;

/** Whether to enable debug logging.

 - `YES`：Enable debug logging.
 - `NO`：(Default) Disable debug logging.
 */
@property (nonatomic, assign) BOOL log;

/**
 The set log options.

 The log level follows the sequence of `error`, `warn`, `info`, and `debug`. When choosing a level, you can also see the logs preceding that level.

 For example, if you set the log level to `info`, the SDK outputs the logs within levels `error`，`warn`，and `info`.
 */
@property (nonatomic, copy) NSDictionary *loggerOptions;


@property (nonatomic, assign) BOOL routeBackup;

/** The parameters set for the dynamic PPT. See [WhitePptParams](WhitePptParams). */
@property (nonatomic, strong) WhitePptParams *pptParams;


@property (nonatomic, assign) BOOL disableDeviceInputs;

@end

@implementation WhiteSdkConfiguration (Deleted)



//@property (nonatomic, assign) CGFloat zoomMinScale;
//@property (nonatomic, assign) CGFloat zoomMaxScale;


//@property (nonatomic, nullable, copy) NSDictionary *sdkStrategyConfig;

@end
NS_ASSUME_NONNULL_END
