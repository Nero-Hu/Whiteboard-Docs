//
//  RoomState.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/14.
//


#import "WhiteDisplayerState.h"
#import "WhiteMemberState.h"
#import "WhiteBroadcastState.h"

NS_ASSUME_NONNULL_BEGIN

/** The state of the whiteboard room. */
@interface WhiteRoomState : WhiteDisplayerState

/** The state of the whiteboard tool currently in use. See [WhiteReadonlyMemberState](WhiteReadonlyMemberState). */
@property (nonatomic, strong, readonly, nullable) WhiteReadonlyMemberState *memberState;

/** The current state of the view. See [WhiteBroadcastState](WhiteBroadcastState). */
@property (nonatomic, strong, readonly, nullable) WhiteBroadcastState *broadcastState;

/** The scale of the view.*/
@property (nonatomic, strong, readonly, nullable) NSNumber *zoomScale;

@end

NS_ASSUME_NONNULL_END
