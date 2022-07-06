//
//  WhiteDisplayer.h
//  WhiteSDK
//
//  Created by yleaf on 2019/7/1.
//

#import <Foundation/Foundation.h>
#import "WhiteCameraConfig.h"
#import "WhiteRectangleConfig.h"
#import "WhiteCameraBound.h"
#import "WhitePanEvent.h"
#import "WhiteFontFace.h"

/** The scene path types. */
typedef NS_ENUM(NSInteger, WhiteScenePathType) {
    /** The queried path does not exist. */
    WhiteScenePathTypeEmpty,
    /** The queried path is the path of a scene. */
    WhiteScenePathTypePage,
    /** The queried path is the path of a scene directory. */
    WhiteScenePathTypeDir
};

NS_ASSUME_NONNULL_BEGIN

@class WhiteScene;

 /** Whiteboard room basic information.

 The `WhiteRoom` class can inherit the methods of the `WhiteDisplayer` class. */
@interface WhiteDisplayer : NSObject

/**
 This property is deprecated. The `WhiteboardView` class inherits from the `UIView` class, so you can use the `backgroundcolor` property of the `UIView` class to modify the background color of the whiteboard. See [`backgroundcolor`](https://developer.apple.com/documentation/uikit/uiview/1622591-backgroundcolor) for details.
 */
@property (nonatomic, strong) UIColor *backgroundColor __deprecated_msg("use WhiteboardView's backgroundColor property");

#pragma mark - iframe

/**
 The key information sent to the iframe plugin.

 @param payload Key information.
 */
- (void)postIframeMessage:(id)payload;

#pragma mark - 页面（场景）管理 API

/**
 Gets the information about a specified scene.

 @param scenePath The path of a scene. Ensure the scene path stars with `/` and consists of the scene directory and scene name. For example, `/math/classA`.
 @param result The call result. The SDK outputs the information about the specified scene if the method call succeeds. See [WhiteScene](WhiteScene).
 */
- (void)getSceneFromScenePath:(NSString *)scenePath result:(void (^) (WhiteScene* _Nullable scene))result;


/**
 Gets the type of the scene path.

 This method returns the scene type for the scene path that you specify in the method.

 @param pathOrDir The path of the scene.
 @param result The callback, which reports the global state of the room. See [WhiteScenePathType](WhiteScenePathType).
 */
- (void)getScenePathType:(NSString *)pathOrDir result:(void (^) (WhiteScenePathType pathType))result;

/**
 Gets information about all scenes in the room.

 @param result The callback, which reports the information about all scenes in the room.
 */
- (void)getEntireScenes:(void (^) (NSDictionary<NSString *, NSArray<WhiteScene *>*> *dict))result;

#pragma mark - 自定义事件
/** Adds a listener for a customized event.

 You can receive the customized event callback after a successful call of this method.

 **Note:**

 The SDK triggers only one callback for the customized events with the sane name.

 @param eventName The name of the event.
*/
- (void)addMagixEventListener:(NSString *)eventName;

/** Adds a listener for a customized high-frequency event.

 You can receive the customized event callback after a successful call of this method.

 **Note:**

 The SDK triggers only one callback for the customized events with the sane name.

 @param eventName The name of the event.

 @param millseconds The interval (ms) at which the SDK triggers the callback. The minimum interval is 500 ms. The SDK automatically adjusts the value smaller than 500 to 500.
*/
- (void)addHighFrequencyEventListener:(NSString *)eventName fireInterval:(NSUInteger)millseconds;

/** Removes a listener for a customized event.

 @param eventName The name of the event.
*/
- (void)removeMagixEventListener:(NSString *)eventName;

#pragma mark - 视野坐标类 API

/** Refreshes the whiteboard view.

 When the `WhiteboardView` changes, you need to call this method to refresh the whiteboard view.
 */
- (void)refreshViewSize;

/** Converts the coordinates of a point on the whiteboard.

 This method converts the coordinates of the iOS internal coordinate system (taking the upper left corner as the origin) to the coordinates of the world coordinate system (taking the center of the initial whiteboard as the origin).

 @param point The coordinate of the point in the iOS internal coordinate system.
 @param result The callback, which reports the coordinate of the point. See [WhitePanEvent](WhitePanEvent).
 */
- (void)convertToPointInWorld:(WhitePanEvent *)point result:(void (^) (WhitePanEvent *convertPoint))result;

/**
 Sets the viewable area of the local user.

 @param cameraBound The viewable area of the local user. See [WhiteCameraBound](WhiteCameraBound).
 */
- (void)setCameraBound:(WhiteCameraBound *)cameraBound;

/**
 Adjusts the view.

 @param camera The configuration of the view. See [WhiteCameraConfig](WhiteCameraConfig)。
 */
- (void)moveCamera:(WhiteCameraConfig *)camera;

/**
 Adjusts the view to ensure the complete display of the view rectangle.

 @param rectange The configuration of the view. See [WhiteRectangleConfig](WhiteRectangleConfig).
 */
- (void)moveCameraToContainer:(WhiteRectangleConfig *)rectange;

/**
 Adjusts the view to ensure the complete display of the PPT slide.

 This operation is one-time.

 @since 2.5.1

 **Note:**

 If the current user has called the [setViewMode](setViewMode) method and set it to `follower`,
 calling `scalePptToFit` method may cause the content seen by the current user and the host to be inconsistent.

 @param mode Animation mode. See [WhiteAnimationMode](WhiteAnimationMode).
 */
- (void)scalePptToFit:(WhiteAnimationMode)mode;

/**
 Adjusts the view to ensure the complete display of the HTML5 file.

 This method is a one-time operation. If the HTML5 file is not inserted, calling this method does not take effect.

 @since 2.12.5

 **Note:**

 If the current user has called the [setViewMode](setViewMode) method and set it to `follower`,
 calling `scaleIframeToFit` method may cause the content seen by the current user and the host to be inconsistent.
 */
- (void)scaleIframeToFit;

/**
 Disables the user from adjusting the view.

 @since 2.11.0

 This method disables the user from moving or zooming the view through touch screen gestures.

 @param disable Whether to disable the user from adjusting the view:

 - `YES`: Disable the user from adjusting the view.
 - `NO`: (Default) Enable the user to adjust the view.
 */
- (void)disableCameraTransform:(BOOL)disable;

#pragma mark - Screenshot

/**
 Gets the preview of the specified scene.

 **Note:**

 - The content of the scene that the user sees when switching is intercepted, not all the content in the scene.
 - Only when the picture server supports Cross-Origin Resource Sharing(CORS), it can be displayed in the screenshot. (Run in a real machine).

 @param scenePath The path of the scene.
 @param completionHandler The call result:

 - The preview of the specified scene, if the method call succeeds.
 - An error message, if the method call fails.
 */
- (void)getScenePreviewImage:(NSString *)scenePath completion:(void (^)(UIImage * _Nullable image))completionHandler;


/**
 Gets the screenshot of the specified scene.

 **Note:**

 - If the scene displays an image or dynamic PPT slide, ensure that the storage server of the image or the PPT slide supports cross-origin resource sharing; otherwise, the image or PPT slide may not be shown in the generated sceenshot.
 - To ensure the normal display of screenshots, Agora recommends using the [interactive whiteboard screenshot function](https://docs.agora.io/en/whiteboard/whiteboard_screenshot?platform=RESTful).

 @param scenePath The path of the scene.
 @param completionHandler The call result:

 - The screenshot of the scene, if the method call succeeds.
 - An error message, if the method call fails.
 */
- (void)getSceneSnapshotImage:(NSString *)scenePath completion:(void (^)(UIImage * _Nullable image))completionHandler;

@end

NS_ASSUME_NONNULL_END
