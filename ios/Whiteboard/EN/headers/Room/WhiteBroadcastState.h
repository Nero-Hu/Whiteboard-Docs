//
//  BroadcastState.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/14.
//

#import "WhiteObject.h"
#import "WhiteMemberInformation.h"

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
