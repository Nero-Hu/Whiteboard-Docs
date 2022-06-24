//
//  AudioMixerBridge.h
//  Whiteboard
//
//  Created by yleaf on 2020/8/13.
//

#import <Foundation/Foundation.h>
#import "WhiteBoardView.h"

NS_ASSUME_NONNULL_BEGIN


/** 
 Use audio mixing method of RTC SDK to play audio files in dynamic PPT.
 
 Please call the [initWithBridge]([WhiteAudioMixerBridge initWithBridge:deletegate:]) method before the following methods.
 */
@protocol WhiteAudioMixerBridgeDelegate <NSObject>


/**
 Starts playing and mixing the music file.

 After calling this method, you need to call [setMediaState]([WhiteAudioMixerBridge setMediaState:errorCode:]) to pass the audio mixing state to the dynamic PPT slides.

 @param filePath The absolute path or URL address (including the filename extensions) of the music file.

 @param loopback Whether to only play music files on the local client:

 - `YES`：Only play music files on the local client so that only the local user can hear the music.
 - `NO`：Publish music files to remote clients so that both the local user and remote users can hear the music.

 @param replace Whether to replace the audio collected by the microphone with a music file:

 - `YES`： Replace the audio. Users can only hear music.
 - `NO`: Do not replace the audio. Users can hear both music and audio collected by the microphone.

 @param cycle The number of times the music file plays.

 - `≥ 0`: The number of playback times. For example, `0` means that the SDK does not play the music file, while `1` means that the SDK plays the music file once.
 - `-1`: Play the music in an indefinite loop.
 */
- (void)startAudioMixing:(NSString *)filePath loopback:(BOOL)loopback replace:(BOOL)replace cycle:(NSInteger)cycle;

/** 
 Stops playing or mixing the music file.
 */
- (void)stopAudioMixing;


/**
 Sets the playback position of the audio mixing file.

 @param position The playback position (ms) of the audio mixing file.
*/
- (void)setAudioMixingPosition:(NSInteger)position;

@end

/** 
 Bridging the audio mixing method of the Agora RTC SDK and the Interactive Whiteboard SDK. 

 When you use the Agora RTC SDK and Interactive Whiteboard SDK at the same time, and the dynamic PPT slides displayed in the whiteboard contain audio files,
 you may encounter the issues of low volume and/or echoes when playing the audio in the PPT slides.
 To solve these issues, you can use the `WhiteAudioMixerBridge` interface to call the audio mixing method of the Agora RTC SDK to play the audio files in the dynamic PPT slides.

 **Note:**

 This interface is designed based on the audio mixing method of the Agora RTC SDK.
 If the real-time audio and video SDK you are using is not the Agora RTC SDK, but it also has an audio mixing interface and audio mixing state callback, you can call the `WhiteAudioMixerBridge` interface as well.
 */
@interface WhiteAudioMixerBridge : NSObject

/**
 Initializes `WhiteAudioMixerBridge` object.

 @param bridge [WhiteBoardView](WhiteBoardView)
 @param delegate [WhiteAudioMixerBridgeDelegate](WhiteAudioMixerBridgeDelegate)
 @return An initialized `WhiteAudioMixerBridge` object
*/
- (instancetype)initWithBridge:(WhiteBoardView *)bridge deletegate:(id<WhiteAudioMixerBridgeDelegate>)delegate;


/**
 Sets the playback state of the audio file.

 You need to call this method in the `localAudioMixingStateDidChanged` callback triggered by the Agora RTC SDK to pass the playback state of the audio file
 to the dynamic PPT slides in the whiteboard.

 The dynamic PPT slides play the video based on the received audio playback state to ensure the synchronization of audio and video.

 **Note:** 
 
 Ensure that the real-time audio and video SDK you are using has an audio mixing state callback; otherwise, the audio and video playback of the dynamic PPT slides may be unsynchronized.

 @param stateCode The current audio file playback state：

 - 710: The audio mixing file is playing.
 - 711: The audio mixing file has paused playing. 
 - 713: The audio mixing file has stopped playing.
 - 714: An exception has occurred during the playback of the audio mixing file.
 
 @param errorCode The reason for the change of the audio file playback state:

 - 701：The SDK cannot open the audio mixing file.
 - 702：The SDK opens the audio mixing file too frequently.
 - 703：The audio mixing file playback is interrupted.
*/
- (void)setMediaState:(NSInteger)stateCode errorCode:(NSInteger)errorCode;

@end

NS_ASSUME_NONNULL_END
