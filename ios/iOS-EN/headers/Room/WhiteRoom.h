//
//  WhiteRoom.h
//  dsBridge
//
//  Created by leavesster on 2018/8/11.
//

#import <Foundation/Foundation.h>
#import "WhiteGlobalState.h"
#import "WhiteMemberState.h"
#import "WhiteImageInformation.h"
#import "WhitePptPage.h"
#import "WhiteRoomMember.h"
#import "WhiteBroadcastState.h"
#import "WhiteRoomCallbacks.h"
#import "WhiteRoomState.h"
#import "WhiteEvent.h"
#import "WhiteScene.h"
#import "WhiteSceneState.h"
#import "WhitePanEvent.h"
#import "WhiteDisplayer.h"
#import "WhiteSDK+Room.h"

@class WhiteBoardView;

NS_ASSUME_NONNULL_BEGIN

/** Provides methods to operate a live Interactive Whiteboard room. */
@interface WhiteRoom : WhiteDisplayer

#pragma mark - 同步 API
/** The user ID of the local user. It is the same as the user's `memberId` in [WhiteRoomMember](WhiteRoomMember).
 */
@property (nonatomic, strong, readonly) NSNumber *observerId;
/** Room UUID, the unique identifier of a room. */
@property (nonatomic, copy, readonly) NSString *uuid;
/** The global public state the room. See [WhiteGlobalState](WhiteGlobalState).*/
@property (nonatomic, strong, readonly) WhiteGlobalState *globalState;
/** The state of the whiteboard tool currently in use. See [WhiteReadonlyMemberState](WhiteReadonlyMemberState). */
@property (nonatomic, strong, readonly) WhiteReadonlyMemberState *memberState;
/** The member list of the room. See [WhiteRoomMember](WhiteRoomMember). */
@property (nonatomic, strong, readonly) NSArray<WhiteRoomMember *> *roomMembers;
/** The view state of the user. See [WhiteBroadcastState](WhiteBroadcastState). */
@property (nonatomic, strong, readonly) WhiteBroadcastState *broadcastState;
/** The scale of the view. */
@property (nonatomic, assign, readonly) CGFloat scale;
/** The current room state. See [WhiteDisplayerState](WhiteDisplayerState).*/
@property (nonatomic, strong, readonly) WhiteRoomState *state;
/** The state of the scenes under the current scene directory. See [WhiteSceneState](WhiteSceneState). */
@property (nonatomic, strong, readonly) WhiteSceneState *sceneState;
/** The connection state of the room. See [WhiteRoomPhase](WhiteRoomPhase). */
@property (nonatomic, assign, readonly) WhiteRoomPhase phase;

#pragma mark - Set API

/**
 Modifies the `globalState` object of the live Interactive Whiteboard room.
 
 The `globalState` object of the live Interactive Whiteboard room is a public global variable.
 All users in the room can read the `globalState` object, while users in interactive mode can modify the `globalState` object.
 The modified `globalState` object will be updated to all users in the room immediately.
 
 @param globalState The global public state the room. See [WhiteGlobalState](WhiteGlobalState).
 */
- (void)setGlobalState:(WhiteGlobalState * )globalState;

/**
 Modifies the state of the whiteboard tool currently in use.
 
 A successful call of this method updates the [WhiteMemberState](WhiteMemberState) of the room immediately.
 
 You can call [getMemberStateWithResult]([WhiteRoom getMemberStateWithResult:]) to get the latest [WhiteMemberState](WhiteMemberState).
 
 @param modifyState The state of the whiteboard tool. See [WhiteMemberState](WhiteMemberState).
 */
- (void)setMemberState:(WhiteMemberState *)modifyState;

/**
 Set the view modes of the user.

 In the live Interactive Whiteboard room, you can set one of the following view modes for a user:

 - `Broadcaster`: Host mode.
 - `Follower`：Follower mode.
 - `Freedom`：(Default) Freedom mode.
 
 **Note:**
 The view mode setting of a user is affected by the view mode setting of other users in the room as follows:

 - When there is no host in the room, all users are in `Freedom` view mode by default.
 - When a user’s view mode is set as `Broadcaster`, the view mode of every other user in the room (including users that join subsequently) is automatically set as 'Follower'.
 - When a user in `Follower` view mode operates the whiteboard, their view mode automatically switches to `Freedom` mode.
 
 If needed, you can call [disableOperations](disableOperations:) to disable the user from operating the whiteboard, so as to lock their view mode.
 @param viewMode The view mode of the user. See [WhiteViewMode](WhiteViewMode).
 */
- (void)setViewMode:(WhiteViewMode)viewMode;


#pragma mark - Action API

/** Gets debug logs.
 
 @param completionHandler The call result:

 - The debug logs, if the method call succeeds.
 - An error message, if the method call fails.
 */
- (void)debugInfo:(void (^ _Nullable)(NSDictionary * _Nullable dict))completionHandler;


//- (void)refreshViewSize;

/** 
 Disconnects from the live Interactive Whiteboard room.

 A successful call of this method allows the user to leave the room and releases all resources related to the room.
 
 The user that has left the room must call [joinRoomWithConfig]([WhiteSDK joinRoomWithConfig:callbacks:completionHandler:]) again to join the room. 

 @param completeHandler The call result:
 
 - The global state of the room, if the method call succeeds.
 - An error message, if the method call fails.
 */
- (void)disconnect:(void (^ _Nullable) (void))completeHandler;

/** Whether the SDK calls [disconnect]([WhiteRoom disconnect:]) to disconnect from the live Interactive Whiteboard room. */
@property (nonatomic, assign, readonly) BOOL disconnectedBySelf;

/**
 Sets whether a user is in interactive mode in the room.

 Users in the live Interactive Whiteboard room can be in one of the following modes:

 - Interactive mode, in which users have read and write permissions on the whiteboard, appear in the member list of the room, and are visible to all other users in the room.
 - Subscription mode, in which users have read-only access to the whiteboard, do not appear in the member list of the room, and are invisible to all other users in the room.


 @param writable Whether the user is in interactive mode:

  - `YES`：The user is in interactive mode.
  - `NO`：The user is in subscription mode.

 @param completionHandler The call result:

  - Whether the user is interactive mode, if the method call succeeds.
  - An error message, if the method call fails.
 */
- (void)setWritable:(BOOL)writable completionHandler:(void (^ _Nullable)(BOOL isWritable, NSError * _Nullable error))completionHandler;
/** 
 Whether the user is in interactive mode:

  - `YES`：The user is in interactive mode.
  - `NO`：The user is in subscription mode.
 */
@property (nonatomic, assign, readonly, getter=isWritable) BOOL writable;


/**
 Disables the local user from adjusting the view of the whiteboard, including moving and zooming the view.

 @param disableCameraTransform Whether to disable the local user from adjusting the view of the whiteboard:

  - `YES`：Disable the local user from adjusting the view of the whiteboard.
  - `NO`：(Default) Enable the local user to adjust the view of the whiteboard.
 */
- (void)disableCameraTransform:(BOOL)disableCameraTransform;

/**
 Disables the whiteboard tools from responding to users' inputs.

 @param disable Whether to disable the whiteboard tools from responding to users' inputs:

  - `YES`：Disable the whiteboard tools from responding to users' inputs.
  - `NO`：(Default) Enable the whiteboard tools to respond to users' inputs.
 */
- (void)disableDeviceInputs:(BOOL)disable;

/**
 Send a custom event.

 **Note:**
 
 All users that listen for this event receive the notification.

 @param eventName The custom event name. See [WhiteEvent](WhiteEvent).

 @param payload The custom event content. See [WhiteEvent](WhiteEvent).
 */
- (void)dispatchMagixEvent:(NSString *)eventName payload:(NSDictionary *)payload;

#pragma mark - PPT

/**
 Plays the next slide of the PPT file.

 When the current PPT slide finishes playing, the SDK switches to the next scene to play the next PPT slide.
 */
- (void)pptNextStep;

/**
 Returns to the previous slide of the PPT file.
 
 When the current PPT slide is rolled back, the SDK switches back to the previous scene to play the previous PPT slide.
 */
- (void)pptPreviousStep;

#pragma mark - Image API

/**
 Inserts an image placeholder on the whiteboard.

 The method sets up and inserts an image placeholder on the whiteboard per `imageInfo` you pass in.

 **Note:** 

 - You also need to call [completeImageUploadWithUuid]([WhiteRoom completeImageUploadWithUuid:src:]) to pass in the URL address of the image to insert and display the image in the placeholder.
 - You can call [insertImage]([WhiteRoom insertImage:src:]) to pass in the image information and URL address at the same time.

 @param imageInfo The image information. See [WhiteImageInformation](WhiteImageInformation).
 @param src The URL address of the image. See [WhiteImageInformation](WhiteImageInformation).
 */
- (void)insertImage:(WhiteImageInformation *)imageInfo src:(NSString *)src;

/**
 Inserts and displays an image on the whiteboard.

 The method sets up and inserts an image placeholder on the whiteboard per `imageInfo` you pass in.
 
 @param imageInfo The image information. See [WhiteImageInformation](WhiteImageInformation).
 */
- (void)insertImage:(WhiteImageInformation *)imageInfo;

/**
 Displays an image in the specified image placeholder.
 
 The method inserts and displays an image in the specified image placeholder.

 **Note:**
 
 Ensure that you have called [insertImage](insertImage:src:) to insert an image placeholder on the whiteboard.

 @param uuid The unique identifier of the image, which is the image UUID that you pass in `imageInfo` of the [insertImage]([WhiteRoom insertImage:src:]) method.
 @param src The URL address of the image. Ensure the application client can access the URL; otherwise, the image cannot be displayed.
 */
- (void)completeImageUploadWithUuid:(NSString *)uuid src:(NSString *)src;

/**
 Disables the eraser from erasing images on the whiteboard.

 @param disable Whether to disable the eraser from erasing images on the whiteboard:
 
 - `YES`：Disable the eraser from erasing images.
 - `NO`：(Default) Enable the eraser to erase images.
 */
- (void)disableEraseImage:(BOOL)disable;

#pragma mark - 延时

/** Synchronize UTC time with local time.

 After importing the UTC timestamp(s), the whiteboard will forcibly synchronize with the incoming UTC timestamp based on the user's local timestamp.

 @since 2.12.24

 @param timestamp UTC timestamp in seconds.
 
 **Note:** 
 
 This method requires the user's local time to be calibrated, otherwise it may cause an active delay.
 */
- (void)syncBlockTimstamp:(NSTimeInterval)timestamp;

/**
 Sets the delay time for sending the whiteboard contents of the local user to the remote users.
 
 After calling this method, the SDK delays sending the whiteboard contents of the local user to the remote users per the set time.
 
 This method helps synchronize the whiteboard contents with audio and video in CND live streaming.

 **Note:**
 
 This method does not delays the content the local users see, that is, when the local user writes or draws on the whiteboard, they see the content on their own whiteboard immediately.

 @param delay The delay time in seconds.
 */
- (void)setTimeDelay:(NSTimeInterval)delay;
@property (nonatomic, assign, readonly) NSTimeInterval delay;

@end


#pragma mark - 页面（场景）管理 API

@interface WhiteRoom (Scene)


/**
 Gets the state of the scenes under the current scene directory.

 @param result The callback, Which reports the scene state under the current scene directory. See [WhiteSceneState](WhiteSceneState).
 */
- (void)getSceneStateWithResult:(void (^) (WhiteSceneState *state))result;

/**
 Gets the list of scenes under the current scene directory.

 @param result The callback, Which reports the list of scenes under the current scene directory. See [WhiteScene](WhiteScene).
 */
- (void)getScenesWithResult:(void (^) (NSArray<WhiteScene *> *scenes))result;

/**
 Switches to the specified scene.

 A successful call of this method switches the whiteboard scene to the specified scene.

 **Note:**

  - This method call is synchronous.
  - To get the callback of the method call, use [setScenePath:completionHandler:]([WhiteRoom setScenePath:completionHandler:]) instead.

 The scene switch may fail due to the following reasons:

  - The specified scene path is invalid. Ensure the scene path stars with `/` and consists of the scene directory and scene name.
  - The specified scene does not exist.
  - The path passed in is the path of the scene directory, not the path of the scene.

 @param path The path of the scene that you want to switch to. Ensure the scene path stars with `/` and consists of the scene directory and scene name. For example, `/math/classA`.
 */

- (void)setScenePath:(NSString *)path;

/**
 Switches to the specified scene.
 
 A successful call of this method switches the whiteboard scene to the specified scene.

 **Note:**
 
 - This method call is asynchronous.
 - You cannot get the latest scene state through [getSceneStateWithResult:](getSceneStateWithResult:) immediately after calling this method.
 - The scene switch may fail due to the following reasons:

  - The specified scene path is invalid. Ensure the scene path stars with `/` and consists of the scene directory and scene name.
  - The specified scene does not exist.
  - The path passed in is the path of the scene directory, not the path of the scene.

 @param dirOrPath The path of the scene that you want to switch to，Ensure the scene path stars with `/` and consists of the scene directory and scene name. For example, `/math/classA`.
 @param completionHandler The call result:
  
  - `YES`, if the method call succeeds.
  - An error message, if the method call fails.
 */
- (void)setScenePath:(NSString *)dirOrPath completionHandler:(void (^ _Nullable)(BOOL success, NSError * _Nullable error))completionHandler;


/**
 Switches to the specified scene under the current scene directory.
 
 A successful call of this method switches the whiteboard scene to the specified scene.
 
 **Note:** 
 
 The specified scene must exist in the current scene directory; otherwise, the method call fails.
 
 @param index   The index of the target scene in the current scene directory.
 @param completionHandler The call result:

   - `YES`, if the method call succeeds.
   - An error message, if the method call fails.
 */
- (void)setSceneIndex:(NSUInteger)index completionHandler:(void (^ _Nullable)(BOOL success, NSError * _Nullable error))completionHandler;

/**
 Inserts multiples scenes under the specified scene directory.
 **Note:** 
 
 This method does not switch the whiteboard scene to any of the newly inserted scenes.
 You need to call [setScenePath](setScenePath) to switch to one of the newly inserted scenes. 

 @param dir    The path of the scene directory, which must starts with `/` and cannot be the path of a scene. For example, `"/math"`.
 @param scenes An array of scenes. For the files of a single scene, see [WhiteScene](WhiteScene).
 @param index  The index of the first scene to be inserted. The index of scene under a scene directory can start from 0.
 */
- (void)putScenes:(NSString *)dir scenes:(NSArray<WhiteScene *> *)scenes index:(NSUInteger)index;

/**
 Clears all contents on the current scene.

 @param retainPPT Whether to retain the PPT slide:
  
  - `YES`: Leave the PPT slide on the scene.
  - `NO`: Clear the PPT slide together with all other contents.
 */
- (void)cleanScene:(BOOL)retainPPT;

/**
 Deletes a scene or a scene directory.

 **Note:**

   - There must be at least one scene in the live Interactive Whiteboard room. If you delete all scenes, the SDK automatically creates
   an initial scene with the path of `/init`.
   - If you delete the current whiteboard scene, the whiteboard displays the last scene under the current scene directory.
   - If you delete a scene directory, all scenes under the directory will be deleted.
   - If you delete the current scene directory, for example, `dirA`, the SDK executes upward recursive logic to locate the new scene:
      - If there is a scene directory after the deleted scene directory under the same directory, for example, `dirB`，the SDK switches the whiteboard scene to the first scene under `dirB` (with the index of 0).
      - If there is no scene directory after the deleted scene directory under the same directory, then the SDK looks for scenes under the directory.
      - If there are scenes under the directory, the SDK switches the whiteboard scene to the first scene (with the index of 0).
      - If there is neither a scene directory after the deleted scene directory nor scenes under the same directory, then the SDK looks for scene directories before the deleted scene directory.
      - If there is a scene directory, for example, `dirC`， before the deleted `dirA`, then the SDK switches the whiteboard scene to the first scene under `dirC` (with the index of 0).
   The SDK continues executing upward recursive logic until a new scene is found.
 
 @param dirOrPath The path of a scene or a scene directory. If you pass in the path of a scene directory, this method deletes all scenes under the directory.
 */
- (void)removeScenes:(NSString *)dirOrPath;

/**
 Moves a scene.
 
 After a scene is moved, the path of the scene changes.

 **Note:**

 - This method cannot move a scene directory, which means you can only pass in the path of a scene in the `sourcePath` parameter.
 - The method supports moving the specified scene under the current scene directory or to another scene directory.
 Therefore, you can pass in either the path of the target scene directory or the target path of the scene under the current directory in the `targetDirOrPath` parameter.
 @param source The original path of the scene to be moved. It cannot be the path of a scene directory.
 @param target The path of the target scene directory or the target path of the scene under the current directory:

  - If you pass in the path of the target scene directory, the path of the scene changes, but the name of the scene does not change.
  - If you pass in the target path of the scene under the current directory, both the path of the scene and the name of the scene change.
 */
- (void)moveScene:(NSString *)source target:(NSString *)target;


#pragma mark - 执行操作 API

/**
 Copies the selected content.

 This method stores the selected content to the memory, but does not paste it to the whiteboard.

 @note This method takes effect only when you set [disableSerialization]([WhiteRoom disableSerialization:]) as `NO`.
 */
- (void)copy;

/**
 Pastes the copied content.

 This method pastes the content copied by the [copy](copy) method into the user view on the whiteboard.

 @note
 - This method takes effect only when you set [disableSerialization]([WhiteRoom disableSerialization:]) as `NO`.
 - If you call this method multiple times, random offset may occur, which causes the pasted content not to center the user view.
 */
- (void)paste;

/**
 Duplicates the selected content.

 This method copies and pastes the selected content copied into the user view on the whiteboard.

**Note:**

 - This method takes effect only when you set [disableSerialization]([WhiteRoom disableSerialization:]) as `NO`.
 - If you call this method multiple times, random offset may occur, which causes the pasted content not to center the user view.
 */
- (void)duplicate;

- (void)deleteOpertion DEPRECATED_MSG_ATTRIBUTE("use deleteOperation");

/**
 * Delete the selected content.
 */
- (void)deleteOperation;

/**
 Disables/Enables the local serialization.

 The following methods cannot take effect after the setting of `disableSerialization(true)`
 
 - `redo`
 - `undo`
 - `duplicate`
 - `copy`
 - `paste` 

 **Warning:**

 To set `disableSerialization(false)`, ensure that every user in the room uses one of the following SDKs; otherwise, the application may crash.

 - Web SDK 2.9.2 or later
 - Android SDK 2.9.3 or later
 - iOS SDK 2.9.3 or later

 @param disable Whether to disable the local serialization:

 - `YES`：(Default) Disable the local serialization.
 - `NO`：Enable the local serialization.
 */
- (void)disableSerialization:(BOOL)disable;

/**
 Redoes an undone action.

 **Note:** 

 This method takes effect only when you set [disableSerialization]([WhiteRoom disableSerialization:]) as `NO`.
 */
- (void)redo;

/**
 Undoes an action.

 **Note:** 

 This method takes effect only when you set [disableSerialization]([WhiteRoom disableSerialization:]) as `NO`.
 */
- (void)undo;

@end

#pragma mark - 异步 API

@interface WhiteRoom (Asynchronous)

/**
 Gets the global state of the room.
 
 **Note:**
 
 - This method call is synchronous.
 - This method can get and cast the custom `WhiteGlobalState` set by the [setCustomGlobalStateClass]([WhiteDisplayerState setCustomGlobalStateClass:]) method.
 - You can call this method immediately after calling the [setGlobalState]([WhiteRoom setGlobalState:]) method.
 @param result The callback, Which reports the `WhiteGlobalState` object. See [WhiteGlobalState](WhiteGlobalState).
 */
- (void)getGlobalStateWithResult:(void (^) (WhiteGlobalState *state))result;
/** 
 Gets the state of the whiteboard tool currently in use.

 **Note:** 

 This method call is synchronous.
 
 @param result The callback, Which reports the `WhiteMemberState` object. See [WhiteMemberState](WhiteMemberState).
 */
- (void)getMemberStateWithResult:(void (^) (WhiteMemberState *state))result;
/** 
 Gets the list of members in the room.

 **Note:**
 
 - This method call is synchronous.
 - Only users in interactive mode (with read and write permissions) are room members; users in subscription mode (with read-only permission) are not included in the member list.

 @param result The callback, Which reports the member list of the room。 See [WhiteRoomMember](WhiteRoomMember).
 */
- (void)getRoomMembersWithResult:(void (^) (NSArray<WhiteRoomMember *> *roomMembers))result;
/** 
 Gets the view state of the user.

 **Note:**

 This method call is synchronous.

 @param result The callback, Which reports the view state of the user. See [WhiteBroadcastState](WhiteBroadcastState).
 */
- (void)getBroadcastStateWithResult:(void (^) (WhiteBroadcastState *state))result;
/** 
 Gets the connection state of the room.
 
 **Note:**
 
 This method call is synchronous.
 
 @param result The callback, Which reports the connection state of the room. See [WhiteRoomPhase](WhiteRoomPhase).
 */
- (void)getRoomPhaseWithResult:(void (^) (WhiteRoomPhase phase))result;
/** 
 Gets the scale of the view.

 **Note:**
 
 This method call is synchronous.

 @param result The callback, Which reports the scale of the view.
 */
- (void)getZoomScaleWithResult:(void (^) (CGFloat scale))result;
/** 
 Gets the current room state.

 **Note:**
 
 This method call is synchronous.
 
 @param result The callback, Which reports the current room state. See [WhiteRoomState](WhiteRoomState).
 */
- (void)getRoomStateWithResult:(void (^) (WhiteRoomState *state))result;

@end

#pragma mark - 弃用方法
@interface WhiteRoom (Deprecated)

/**
 This method is deprecated. Use [disableDeviceInputs]([WhiteRoom disableDeviceInputs:]) and [disableDeviceInputs]([WhiteRoom disableDeviceInputs:]) instead.

 Disables the whiteboard from responding to users' operations.
 @param disable Whether to disable the whiteboard from responding to users' operations:

 - `true`: Disable the whiteboard from responding to users' operations.
 - `false`: (Default) Enable the whiteboard to respond to users' operations.
 */
- (void)disableOperations:(BOOL)disable DEPRECATED_MSG_ATTRIBUTE("use disableDeviceInputs and disableCameraTransform");

/**
 This method is deprecated. Use [moveCamera]([WhiteDisplayer moveCamera:]) instead.

 Sets the scale of the camera.
 @param scale The scale of the view.
 */
- (void)zoomChange:(CGFloat)scale DEPRECATED_MSG_ATTRIBUTE("use moveCamera:");

/**
 This method is deprecated. Use [getScenesWithResult]([WhiteRoom getScenesWithResult:]) instead.

 Gets the list of scenes under the current scene directory.

 @param result The callback, Which reports the list of scenes under the current scene directory.
 */
- (void)getPptImagesWithResult:(void (^) (NSArray<NSString *> *pptPages))result DEPRECATED_MSG_ATTRIBUTE("use getScenesWithResult:");

@end

NS_ASSUME_NONNULL_END
