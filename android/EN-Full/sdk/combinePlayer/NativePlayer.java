package com.herewhite.sdk.combinePlayer;

/**
 * The `NativePlayer` interface.
 *
 * @since 2.4.23
 */
public interface NativePlayer {

    /**
     * Plays a video.
     *
     * @note
     * This method is called by `PlayerSyncManager`. You cannot call this method directly.
     */
    void play();

    /**
     * Pauses a video.
     *
     * @note
     * This method is called by `PlayerSyncManager`. You cannot call this method directly.
     */
    void pause();

    /**
     * Gets whether a video can be played without buffering.
     *
     * @return Whether a video can be played without buffering:
     * - `true`: The video can be played without buffering.
     * - `false`: The video must be played after buffering.
     */
    boolean hasEnoughBuffer();

    /**
     * Gets the phase of the `NativePlayer` instance.
     *
     * @return The phase of the `NativePlayer` instance. See {@link NativePlayer#NativePlayerPhase NativePlayerPhase}.
     */
    NativePlayerPhase getPhase();

    /** The phase of the `NativePlayer` instance.  */
    enum NativePlayerPhase {
        /**
         * The video playback has not started or has finished.
         */
        Idle,
        /**
         * The video playback is paused.
         */
        Pause,
        /**
         * The video is playing.
         */
        Playing,
        /**
         * The video is buffering.
         */
        Buffering,
    }
}
