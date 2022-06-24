//
//  WhiteCombinePlayer.h
//  WhiteSDK
//
//  Created by yleaf on 2019/7/11.
//

#import <Foundation/Foundation.h>
#import "WhitePlayer.h"
#import <AVFoundation/AVFoundation.h>
#import "WhiteVideoView.h"
#import "WhiteSliderView.h"

NS_ASSUME_NONNULL_BEGIN



@protocol WhiteNativePlayerProtocol <NSObject>


- (void)play;


- (void)pause;


- (BOOL)desireToPlay;

- (BOOL)hasEnoughBuffer;


- (CMTime)itemDuration;

@end

/**
 The callback events.
 */
@protocol WhiteCombineDelegate <NSObject>

@optional

/**
 Occurs when the WhitePlayer or NativePlayer starts buffering.
 */
- (void)combinePlayerStartBuffering;

/**
 Occurs when the WhitePlayer and NativePlayer finish buffering.
 */
- (void)combinePlayerEndBuffering;

/**
 Occurs when the NativePlayer starts buffering.
 */
- (void)nativePlayerStartBuffering;

/**
 Occurs when the NativePlayer finish buffering.
 */
- (void)nativePlayerEndBuffering;
/**
 Occurs when the NativePlayer finish playing.
 */
- (void)nativePlayerDidFinish;

/**
 Occurs when the playback state of WhiteCombinePlayer changes.

 @param isPlaying Whether the WhiteCombinePlayer is playing or not
 */
- (void)combineVideoPlayStateChange:(BOOL)isPlaying;


/**
 The [WhiteCombinePlayer](WhiteCombinePlayer) cannot be played and needs to be recreated.

 @param error An error message.
 */
- (void)combineVideoPlayerError:(NSError *)error;

/**
 Occurs when the loading time range of the NativePlayer changes.

 @param loadedTimeRanges The loading time range.
 */
- (void)loadedTimeRangeChange:(NSArray<NSValue *> *)loadedTimeRanges;
@end

#pragma mark - WhiteSyncManagerPauseReason


typedef NS_OPTIONS(NSUInteger, WhiteSyncManagerPauseReason) {

    WhiteSyncManagerPauseReasonNone                           = 0,

    WhiteSyncManagerPauseReasonWaitingWhitePlayerBuffering    = 1 << 0,

    WhiteSyncManagerPauseReasonWaitingNativePlayerBuffering   = 1 << 1,

    SyncManagerWaitingPauseReasonPlayerPause                  = 1 << 2,
   
    WhiteSyncManagerPauseReasonInit                           = WhiteSyncManagerPauseReasonWaitingWhitePlayerBuffering | WhiteSyncManagerPauseReasonWaitingNativePlayerBuffering | SyncManagerWaitingPauseReasonPlayerPause,
};


#pragma mark - WhiteCombinePlayer

/**
 Combine the playback state of the NativePlayer and the WhitePlayer. One enters the buffer state, and the other pauses and waits.
 */
@interface WhiteCombinePlayer : NSObject

@property (nonatomic, strong, readonly) AVPlayer *nativePlayer;

/** The WhitePlayer. See [WhitePlayer](WhitePlayer).
 */
@property (nonatomic, strong, nullable, readwrite) WhitePlayer *whitePlayer;

/** The callback event notifications to the application. See [WhiteCombineDelegate](WhiteCombineDelegate)。
 */
@property (nonatomic, weak, nullable) id<WhiteCombineDelegate> delegate;

/** The playback rate of the WhitePlayer. Even if the playback is paused, the value will not change to 0. See [WhitePlayer](WhitePlayer). */
@property (nonatomic, assign) CGFloat playbackSpeed;

@property (nonatomic, assign, readonly) NSUInteger pauseReason;

/**
 Initializes a `WhiteCombinePlayer` object which is combined by WhitePlayer and NativePlayer.

 @param nativePlayer The NativePlayer.
 @param replayer [WhitePlayer](WhitePlayer).

 @return The initialized `WhiteCombinePlayer` object.
*/
- (instancetype)initWithNativePlayer:(AVPlayer *)nativePlayer whitePlayer:(WhitePlayer *)replayer;

/**
 Sets the media resource address and initialize the `WhiteCombinePlayer` object.

 @param mediaUrl The media resource address.
 @param replayer [WhitePlayer](WhitePlayer).

 @return The initialized `WhiteCombinePlayer` object.
*/
- (instancetype)initWithMediaUrl:(NSURL *)mediaUrl whitePlayer:(WhitePlayer *)replayer;

/**
 Sets the media resource address and initialize the NativePlayer (AV Player).
 
 @note You need to set the whiteboard player properties after generation.

 @param mediaUrl The media resource address

 @return The initialized `WhiteCombinePlayer` object.
*/
- (instancetype)initWithMediaUrl:(NSURL *)mediaUrl;
/**
 To initialize the NativePlayer (AV Player), you need to set the properties of the WhitePlayer after it is generated.

 @param nativePlayer The NativePlayer.

 @return The initialized `WhiteCombinePlayer` object.
*/
- (instancetype)initWithNativePlayer:(AVPlayer *)nativePlayer NS_DESIGNATED_INITIALIZER;

/** The duration of playback. */
- (NSTimeInterval)videoDuration;

/**
 Plays a video.
*/
- (void)play;
/**
 Pauses a video.
*/
- (void)pause;
/**
 Sets the playback position (s) of the whiteboard content.

 By default, the playback starts from the beginning of the file. You can call this method to enable the playback to start from your specified position.
 
 @param time  The playback position of the `WhitePlayer` object.
 @param completionHandler The call result:
 
 - `YES`：The call has been completed.
 - `NO`：The call is not completed.

*/
- (void)seekToTime:(CMTime)time completionHandler:(void (^)(BOOL finished))completionHandler;

/**
 Update the playback state.
 
 When the playback state of the WhitePlayer changes, 
 WhitePlayer will trigger this callback to report to you.

 @param phase The phase of the `WhitePlayer` object. See [WhitePlayer](WhitePlayer).
 
 @note In this callback, you need to actively call the [WhitePlayerPhase](WhitePlayerPhase) method to synchronize the state to [WhitePlayer](WhitePlayer).
 */
- (void)updateWhitePlayerPhase:(WhitePlayerPhase)phase;


@end

NS_ASSUME_NONNULL_END
