//
//  WhiteSDK+Room.h
//  WhiteSDK
//
//  Created by yleaf on 2019/12/10.
//

#import "WhiteSDK.h"
#import "WhiteRoomConfig.h"
#import "WhiteRoomCallbacks.h"

NS_ASSUME_NONNULL_BEGIN

@class WhiteRoom;

@interface WhiteSDK (Room)

/**
 Sets the configurations and event callbacks of whiteboard room and joins the live interactive whiteboard room.

 @param config  Configurations for the `WhiteRoom` object. See [WhiteRoomConfig](WhiteRoomConfig).
 @param callbacks Sets room event callbacks. See  [WhiteRoomCallbackDelegate](WhiteRoomCallbackDelegate).
 @param completionHandler The call result:

 - The `WhiteRoom` object, if the method call succeeds. See [WhiteRoom](WhiteRoom).
 - An error message, if the method call fails.
 */
- (void)joinRoomWithConfig:(WhiteRoomConfig *)config callbacks:(nullable id<WhiteRoomCallbackDelegate>)callbacks completionHandler:(void (^) (BOOL success, WhiteRoom * _Nullable room, NSError * _Nullable error))completionHandler;

@end

NS_ASSUME_NONNULL_END
