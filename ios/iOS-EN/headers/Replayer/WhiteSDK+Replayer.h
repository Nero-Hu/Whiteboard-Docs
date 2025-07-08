//
//  WhiteSDK+Replayer.h
//  WhiteSDK
//
//  Created by yleaf on 2019/12/10.
//

#import "WhiteSDK.h"
#import "WhitePlayerEvent.h"
#import "WhitePlayerConfig.h"

NS_ASSUME_NONNULL_BEGIN

@class WhitePlayer;

@interface WhiteSDK (Replayer)
#pragma mark - Player

/** Creates a `WhitePlayer` object, which is used to replay the whiteboard content of a live Interactive Whiteboard room.

 @param config Configurations for the `WhitePlayer` object. See [WhitePlayerConfig](WhitePlayerConfig).
 @param eventCallbacks Callbacks of a `WhitePlayer` object. See [WhitePlayerEventDelegate](WhitePlayerEventDelegate).
 @param completionHandler The call result:

 - The `WhitePlayer` object, if the method call succeeds.  See [WhitePlayer](WhitePlayer).
 - An error message, if the method call fails.
 */
- (void)createReplayerWithConfig:(WhitePlayerConfig *)config callbacks:(nullable id<WhitePlayerEventDelegate>)eventCallbacks completionHandler:(void (^) (BOOL success, WhitePlayer * _Nullable player, NSError * _Nullable error))completionHandler;

/** Checks whether the room has playback data.

 @since 2.11.0

 @param config Configurations for the `WhitePlayer` instance. See [WhitePlayerConfig](WhitePlayerConfig)。
 @param result The callback.
 
 -`YES`：The method call succeeds.
 - `NO`：The method call fails.
 */
- (void)isPlayable:(WhitePlayerConfig *)config result:(void (^)(BOOL isPlayable))result;

@end

NS_ASSUME_NONNULL_END
