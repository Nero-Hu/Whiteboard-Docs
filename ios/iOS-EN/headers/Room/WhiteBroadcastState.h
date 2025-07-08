//
//  BroadcastState.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/14.
//

#import "WhiteObject.h"
#import "WhiteMemberInformation.h"

/**
 The mode for watching the whiteboard playback.
 */
typedef NS_ENUM(NSInteger, WhiteViewMode) {
    /**
     (Default) Freedom mode.
  
     In this mode, the user can freely adjust their view when watching the playback.
     
     Note:
     
     When there is no host in the room, all users are in `Freedom` view mode by default.
     */
    WhiteViewModeFreedom,
    /**
     Follower mode.
     In this mode, the user's view follows the view of the host.

     Note:
     - When a user’s view mode is set as `Broadcaster`, the view mode of other users in the room (including newly-joined users) automatically changes to `Follower`.
     - When a user in the `Follower` view mode operates the whiteboard, their view mode automatically switches to the `Freedom` mode.
     If needed, you can call [disableCameraTransform]([WhiteDisplayer disableCameraTransform:]) to disable the user from operating the whiteboard, so as to lock their view mode.
     */
    WhiteViewModeFollower,
    /**
     Host mode.
     
     In this mode, the user can freely adjust their view and synchronize their view to other users in the room.
     
     Note:
     - Each room can have only one user in the `host` view mode.
     - When a user’s view mode is set as `Broadcaster`, the view mode of other users in the room (including newly-joined users) automatically changes to `Follower`.
     */
    WhiteViewModeBroadcaster,
};

NS_ASSUME_NONNULL_BEGIN

/** The information of the host mode. */
@interface WhiteBroadcasterInformation : WhiteObject
/** The user ID of the user in the host mode in the room. The data type is NSNumber.
 */
@property (nonatomic, assign, readonly) NSNumber *id;
/** The user information of the user in the host mode in the room.
 */
@property (nonatomic, assign, readonly, nullable) id payload;

@end

/** The view state of the local user, as well as the user information of the host (if any) in the room. */
@interface WhiteBroadcastState : WhiteObject

/**
 Gets the view mode of the user.
 */
@property (nonatomic, assign, readonly) WhiteViewMode viewMode;

/**
 The user ID of the host. See [WhiteBroadcasterInformation](WhiteBroadcasterInformation).

 @since 2.4.7
 */
@property (nonatomic, assign, nullable, readonly) NSNumber *broadcasterId;
/**
 The user information of the host. See [WhiteBroadcasterInformation](WhiteBroadcasterInformation).
 */
@property (nonatomic, strong, nullable, readonly) WhiteBroadcasterInformation *broadcasterInformation;

@end

NS_ASSUME_NONNULL_END
