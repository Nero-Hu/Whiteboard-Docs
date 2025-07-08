//
//  WhiteRoomConfig.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/30.
//

#import "WhiteObject.h"
#import "WhiteMemberInformation.h"
#import "WhiteCameraBound.h"
#import "WhiteConsts.h"

NS_ASSUME_NONNULL_BEGIN

/** 
 Configurations for a `WhiteRoom` object.

 **Note:** 

 All methods in this class must be called before joining a room. Any methods in this class that are called after successfully joining a room do not take effect.
 */
@interface WhiteRoomConfig : WhiteObject

/**
 Sets the room UUID and initialize the `WhiteRoomConfig` object.
 @param uuid Room UUID, the unique identifier of a room. 
 @param roomToken The Room Token for authentication. 
 @return Initialized `WhiteRoomConfig` object.
 */
- (instancetype)initWithUuid:(NSString *)uuid roomToken:(NSString *)roomToken;
/**
 This method is deprecated. Use [initWithUuid:roomToken:userPayload:]([WhiteRoomConfig initWithUuid:roomToken:userPayload:]) instead.

 Sets the room UUID and member information and initialize the `WhiteRoomConfig` object.
 @param uuid Room UUID, the unique identifier of a room. 
 @param roomToken The Room Token for authentication. 
 @param memberInfo The member information.
 @return An initialized `WhiteRoomConfig` object.
 */
- (instancetype)initWithUuid:(NSString *)uuid roomToken:(NSString *)roomToken memberInfo:(WhiteMemberInformation * _Nullable)memberInfo  __attribute__((deprecated("memberInfo is deprecated, please use userPayload")));
/**
 Sets the room UUID and user payload and initialize the `WhiteRoomConfig` object.
 @param uuid Room UUID, the unique identifier of a room. 
 @param roomToken The Room Token for authentication. 
 @param userPayload The user payload.
 @return An initialized `WhiteRoomConfig` object.
 */
- (instancetype)initWithUuid:(NSString *)uuid roomToken:(NSString *)roomToken userPayload:(id _Nullable)userPayload NS_DESIGNATED_INITIALIZER;

/** Room UUID, the unique identifier of a room.  */
@property (nonatomic, copy) NSString *uuid;
/** The Room Token for authentication.  */
@property (nonatomic, copy) NSString *roomToken;

/** 
 The data center. 
 
 @since 2.11.0

 The data center includes as following:

 - `"cn-hz"`: Hangzhou, China. This data center provides services to the areas that are not covered by other data centers.
 - `"us-sv"`: Silicon Valley, US. This data center provides services to North America and South America.
 - `"in-mum"`: Mumbai, India.This data center provides services to India.
 - `"sg"`: Singapore.This data center provides services to Singapore, East Asia, and Southeast Asia.
 - `"eu"`: Frankfurt, Europe. This data center provides services to Europe.
  
 **Note:**
  
 - The data center set in this method must be the same as the data center of the live Interactive Whiteboard room to be joined; otherwise, the SDK fails to connect to the room.
 - You can call either this method or the [region]([WhiteSdkConfiguration region]) method in the [WhiteSdkConfiguration](WhiteSdkConfiguration) class to set the data center. If you call both，this method overrides the [region]([WhiteSdkConfiguration region]) method.
 */
@property (nonatomic, strong, nullable) WhiteRegionKey region;

/**
 Whether to disable the whiteboard tools from responding to users' inputs.

 - `YES`：Disable the whiteboard tools from responding to users' inputs.
 - `NO`：(Default) Enable the whiteboard tools to respond to users' inputs.
 */
@property (nonatomic, assign) BOOL disableDeviceInputs;

/**
 Whether to disable the local user from adjusting the view of the whiteboard, including moving and zooming the view.

 - `YES`：Disable the local user from adjusting the view of the whiteboard.
 - `NO`：(Default) Enable the local user to adjust the view of the whiteboard.
 */
@property (nonatomic, assign) BOOL disableCameraTransform;

/**
 Whether to disable the Bézier curve optimization.

 - `YES`：The Bézier curve optimization is disabled.
 - `NO`：(Default) The Bézier curve optimization is enabled.
 */
@property (nonatomic, assign) BOOL disableBezier;

/**
 Whether to disable the whiteboard from responding to users' operations.

 - `YES`: Disable the whiteboard from responding to users' operations.
 - `NO`: (Default) Enable the whiteboard to respond to users' operations.

 @deprecated This property is deprecated. Use [disableDeviceInputs](disableDeviceInputs:) and [disableCameraTransform](disableCameraTransform:) instead.
 */
@property (nonatomic, assign) BOOL disableOperations __attribute__((deprecated("please use disableDeviceInputs and disableCameraTransform")));

/**
 Whether to disable the eraser from erasing images on the whiteboard.

 - `YES`：Disable the eraser from erasing images.
 - `NO`：(Default) Enable the eraser to erase images.
 */
@property (nonatomic, assign) BOOL disableEraseImage;

/**
 The boundary of the view. See [WhiteCameraBound](WhiteCameraBound)。
 */
@property (nonatomic, strong, nullable) WhiteCameraBound *cameraBound;

/**
 Customized user information in key-value pairs, for example, `"avatar", "https://example.com/user.png"`.

 @note

 - You can pass in customized user information, such as user ID, nickname, and avatar, in the `userPayload` and call this method to send the information to the application.
 - To ensure the format of the customized user information is correct, the `userPayload` must extend the [WhiteRoomConfig](WhiteRoomConfig) class.
 - The user information can be in JSON, NSString, NSNumber format, and the recommended format is NSDictionary.
 */
@property (nonatomic, copy, nullable) id userPayload;

/**
 This property is deprecated. Use [userPayload]([WhiteRoomConfiguserPayload]) instead.

 Customized user information.
 */
@property (nonatomic, copy, nullable) WhiteMemberInformation *memberInfo __attribute__((deprecated("memberInfo is deprecated, please use userPayload")));

/**
 Whether the user joins the whiteboard room in interactive mode.

 - Interactive mode, in which users have read and write permissions on the whiteboard, appear in the member list of the room, and are visible to all other users in the room.
 - Subscription mode, in which users have read-only access to the whiteboard, do not appear in the member list of the room, and are invisible to all other users in the room.

 After joining the room, you can also switch to the subscription mode through the [setWritable]([WhiteRoom setWritable:completionHandler:]) method.

 - `YES`：(Default) Join the room in interactive mode.
 - `NO`：Join the room in subscription mode.
 */
@property (nonatomic, assign) BOOL isWritable;

/**
 Whether to disables the stroke effect of the pencil.

 @since 2.12.2

 **Note:**

  - In v2.12.2, the SDK sets the default value of `disableNewPencil` as `false`; as of v2.12.3, the SDK changes the default value of `disableNewPencil` to `YES`.
  - To enable the stroke effect, ensure that every user in the room uses one of the following SDKs:
    - Android SDK v2.12.3 or later
    - iOS SDK v2.12.3 or later
    - Web SDK v2.12.5 or later
 - `YES`: (Default) Disable the stroke effect of the pencil.
 - `NO`: Enable the stroke effect of the pencil.
 */
@property (nonatomic, assign) BOOL disableNewPencil;


/**
 The timeout for joining a room.

 After the SDK times out, it will actively disconnect and trigger the [firePhaseChanged]([WhiteRoomCallbackDelegate firePhaseChanged:]) 回调。同时触发 [fireDisconnectWithError]([WhiteRoomCallbackDelegate fireDisconnectWithError:]) callback. 
 At the same time, it triggers the [fireDisconnectWithError]([WhiteRoomCallbackDelegate fireDisconnectWithError:]) callback and returns the prompt "Reconnection time exceeds xx milliseconds".
 */
@property (nonatomic, strong) NSNumber *timeout;

@end

NS_ASSUME_NONNULL_END
