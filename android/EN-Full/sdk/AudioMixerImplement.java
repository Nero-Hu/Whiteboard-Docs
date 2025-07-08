package com.herewhite.sdk;

/**
 * The `AudioMixerImplement` interface, for implementing the audio mixing.
 *
 * @note
 * This interface is designed based on the audio mixing method of the Agora RTC SDK.
 * If the real-time audio and video SDK you are using is not the Agora RTC SDK, but it also has an audio mixing interface and audio mixing state callback, you can call the methods of this class as well.
 *
 */
public class AudioMixerImplement {
    private final JsBridgeInterface bridge;

    AudioMixerImplement(JsBridgeInterface bridge) {
        this.bridge = bridge;
    }

    /**
     * Sets the playback state of the audio file.
     *
     * You need to call this method in the `onAudioMixingStateChanged` callback triggered by the Agora RTC SDK to pass the playback state of the audio file
     * to the dynamic PPT slides in the whiteboard.
     * The dynamic PPT slides play the video based on the received audio playback state to ensure the synchronization of audio and video.
     *
     * @note Ensure that the real-time audio and video SDK you are using has an audio mixing state callback; otherwise, the audio and video playback of the dynamic PPT slides may be unsynchronized.
     *
     * @param state     The current audio file playback state：
     *                  - `MEDIA_ENGINE_AUDIO_EVENT_MIXING_PLAY(710)`: The audio mixing file is playing.
     *                  - `MEDIA_ENGINE_AUDIO_EVENT_MIXING_PAUSED(711)`: The audio mixing file has paused playing. 
     *                  - `MEDIA_ENGINE_AUDIO_EVENT_MIXING_STOPPED(713)`：The audio mixing file has stopped playing.
     *                  - `MEDIA_ENGINE_AUDIO_EVENT_MIXING_ERROR(714)`: An exception has occurred during the playback of the audio mixing file.
     * @param errorCode The reason for the change of the audio file playback state:
     *                  - `MEDIA_ENGINE_AUDIO_ERROR_MIXING_OPEN(701)`: The SDK cannot open the audio mixing file.
     *                  - `MEDIA_ENGINE_AUDIO_ERROR_MIXING_TOO_FREQUENT(702)`: The SDK opens the audio mixing file too frequently.
     *                  - `MEDIA_ENGINE_AUDIO_EVENT_MIXING_INTERRUPTED_EOF(703)`: The audio mixing file playback is interrupted.
     *
     */
    public void setMediaState(long state, long errorCode) {
        bridge.callHandler("rtc.callback", new Object[]{state, errorCode});
    }
}
