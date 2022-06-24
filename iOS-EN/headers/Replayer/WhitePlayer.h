//
//  WhitePlayer.h
//  WhiteSDK
//
//  Created by yleaf on 2019/2/28.
//

#import <Foundation/Foundation.h>
#import "WhitePlayerConsts.h"
#import "WhitePlayerState.h"
#import "WhitePlayerTimeInfo.h"
#import "WhiteDisplayer.h"
#import "WhiteSDK+Replayer.h"

NS_ASSUME_NONNULL_BEGIN

@interface WhitePlayer : WhiteDisplayer

#pragma mark - 同步 API

@property (nonatomic, copy, readonly) NSString *uuid;

/** The current playback phase. See [WhitePlayerPhase](WhitePlayerPhase). */
@property (nonatomic, assign, readonly) WhitePlayerPhase phase;

/** The current playback state. See [WhitePlayerState](WhitePlayerState). */
@property (nonatomic, strong, readonly, nullable) WhitePlayerState *state;

/** The current playback time information. See [WhitePlayerTimeInfo](WhitePlayerTimeInfo). */
@property (nonatomic, strong, readonly) WhitePlayerTimeInfo *timeInfo;

#pragma mark - Action API

/**
 Starts the playback of the whiteboard content.

 **Note:**

 When the playback pauses, you can call this method to resume the playback.
 */
- (void)play;
/**
 Pauses the playback of the whiteboard content.
 */
- (void)pause;

/**
 Stops the playback of the whiteboard content.

 **Note:**
 
 A successful call of this method stops the playback of the whiteboard content and releases all resources related to the `WhitePlayer` object.
 You need to re-initialize the `WhitePlayer` object if you want to enable the playback again.
 */
- (void)stop;

/** 
 The playback speed. For example, if you pass in `2.0`, the set playback speed is two times the original speed. The default value is `1.0`.
*/
@property (nonatomic, assign) CGFloat playbackSpeed;

/**
 Sets the starting playback position of the whiteboard playback.

 The start time point of the whiteboard playback is 0. After the method is successfully called, the whiteboard playback will start playing at the specified position.

 @param beginTime The start time point of the whiteboard playback (seconds).
 */
- (void)seekToScheduleTime:(NSTimeInterval)beginTime;

/**
 Sets the mode for watching the whiteboard playback.

 @param mode The mode for watching the whiteboard playback. See [WhiteObserverMode](WhiteObserverMode).
 */
- (void)setObserverMode:(WhiteObserverMode)mode;

@end


/**
 Manage the playback of whiteboard content.
 */
@interface WhitePlayer (Asynchronous)

#pragma mark - get API

/**
 Gets the current phase of the `WhitePlayer` object.

 You can call this method to get the current playback phase during the life cycle of the `WhitePlayer` object. The initial state is `WhitePlayerPhaseWaitingFirstFrame`, which means it is waiting for the first frame of the whiteboard playback.

 @param result The callback, Which reports the current playback phase. See [WhitePlayerPhase](WhitePlayerPhase).
 */
- (void)getPhaseWithResult:(void (^)(WhitePlayerPhase phase))result;

/**
 Gets the state of the the `WhitePlayer` object.

 This method call returns `null` if the `WhitePlayer` object is in the `WhitePlayerPhaseWaitingFirstFrame` phase.
 
 @param result The callback, Which reports the state of the `WhitePlayer` object. See [WhitePlayerState](WhitePlayerState).
 */
- (void)getPlayerStateWithResult:(void (^)(WhitePlayerState * _Nullable state))result;

/**
 Gets the time information of the `WhitePlayer` object.

 A successful method call returns the time information of the `Player` instance,
 including the current playback position (seconds), the total duration (seconds) of the playback, and the Unix timestamp (seconds) indicating when the playback started. 
 @param result The callback, Which reports the time information of the `WhitePlayer` object. See [WhitePlayerTimeInfo](WhitePlayerTimeInfo).
 */
- (void)getPlayerTimeInfoWithResult:(void (^)(WhitePlayerTimeInfo *info))result;

/**
 Gets the playback speed. 
 **Note:**

 - The value you get by this method is a multiple of the original playback speed. For example, if the return value is
 `2.0`, the playback speed is two times the original speed.
 - Even when the playback pauses when you call this method, the return value cannot be `0`.
 @param result The callback, Which reports the multiple of the original playback speed.
 */
- (void)getPlaybackSpeed:(void (^) (CGFloat speed))result;

@end

NS_ASSUME_NONNULL_END
