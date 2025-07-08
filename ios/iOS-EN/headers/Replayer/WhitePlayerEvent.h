//
//  WhitePlayerEvent.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/1.
//

#import <Foundation/Foundation.h>
#import "WhitePlayerState.h"
#import "WhitePlayerConsts.h"
#import "WhiteEvent.h"

NS_ASSUME_NONNULL_BEGIN

/** Reports events of a `WhitePlayer` object. */
@protocol WhitePlayerEventDelegate <NSObject>

@optional

/** Occurs when the playback state changes. 
 @param phase The playback state. See [WhitePlayerPhase](WhitePlayerPhase).
 */
- (void)phaseChanged:(WhitePlayerPhase)phase;
/** Occurs when the first frame is loaded. */
- (void)loadFirstFrame;
- (void)sliceChanged:(NSString *)slice;
/** Occurs when the player state changes. 

 This callback reports only the player state fields that have changed.
 @param modifyState The player state. See [WhitePlayerState](WhitePlayerState).
 */
- (void)playerStateChanged:(WhitePlayerState *)modifyState;
/** Occurs when the playback stops due to an error. 
 @param error An error message.
 */
- (void)stoppedWithError:(NSError *)error;
/** Occurs when the playback position changes. 
 @param time The playback position (seconds).
 */
- (void)scheduleTimeChanged:(NSTimeInterval)time;
/** Reports an error that occurs when the SDK appends a frame. 
 @param error An error message.
 */
- (void)errorWhenAppendFrame:(NSError *)error;
/** Reports an error that occurs when the SDK renders a frame. 
 @param error An error message.
 */
- (void)errorWhenRender:(NSError *)error;
/**
 Custom event callback.
 @param event The custom event. See [WhiteEvent](WhiteEvent).
 */
- (void)fireMagixEvent:(WhiteEvent *)event;
/**
 One-time callback for high-frequency custom events.
 @param events A high frequency event. See [WhiteEvent](WhiteEvent).
 */
- (void)fireHighFrequencyEvent:(NSArray<WhiteEvent *>*)events;

@end
/**
 Reports events of a `WhitePlayer` object.
 */
@interface WhitePlayerEvent : NSObject

/** Reports events of a `WhitePlayer` object. */
@property (nonatomic, weak, nullable) id<WhitePlayerEventDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
