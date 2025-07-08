package com.herewhite.sdk;

/**
 * The `AudioMixerBridge` interface, for bridging the audio mixing method of the Agora RTC SDK and the Interactive Whiteboard SDK.
 *
 * @since 2.9.15
 *
 * When you use the Agora RTC SDK and Interactive Whiteboard SDK at the same time, and the dynamic PPT slides displayed in the whiteboard contain audio files,
 * you may encounter the issues of low volume and/or echoes when playing the audio in the PPT slides.
 * To solve these issues, you can use the `AudioMixerBridge` interface to call the audio mixing method of the Agora RTC SDK to play the audio files in the dynamic PPT slides.
 *
 * @note
 * This interface is designed based on the audio mixing method of the Agora RTC SDK.
 * If the real-time audio and video SDK you are using is not the Agora RTC SDK, but it also has an audio mixing interface and audio mixing state callback, you can call the `AudioMixerBridge` interface as well.
 */
public interface AudioMixerBridge {

    /**
     * Starts playing and mixing the music file.
     *
     * After calling this method, you need to call {@link AudioMixerImplement#setMediaState(long, long) setMediaState} to pass the audio mixing state to the dynamic PPT slides.
     *
     * @param filepath The absolute path or URL address (including the filename extensions) of the music file.
     * @param loopback Whether to only play music files on the local client:
     * - `true`: Only play music files on the local client so that only the local user can hear the music.
     * - `false`: Publish music files to remote clients so that both the local user and remote users can hear the music.
     * @param replace  Whether to replace the audio collected by the microphone with a music file:
     * - `true`: Replace the audio. Users can only hear music.
     * - `false`: Do not replace the audio. Users can hear both music and audio collected by the microphone.
     * @param cycle The number of times the music file plays.
     * - &ge; 0: The number of playback times. For example, 0 means that the SDK does not play the music file, while 1 means that the SDK plays the music file once.
     * - -1: Play the music in an indefinite loop
     */
    void startAudioMixing(String filepath, boolean loopback, boolean replace, int cycle);

    /**
     * Stops playing or mixing the music file.
     */
    void stopAudioMixing();

    /**
     * Sets the playback position of the audio mixing file.
     *
     * @param position The playback position (ms) of the audio mixing file.
     */
    void setAudioMixingPosition(int position);
}
