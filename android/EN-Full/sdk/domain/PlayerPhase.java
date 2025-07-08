package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * The phase of the whiteboard playback.
 */
public enum PlayerPhase {
    /**
     * The SDK is waiting for the first frame of the playback, which is the initial phase.
     */
    waitingFirstFrame,
    /**
     * The playback is playing.
     */
    playing,
    /**
     * The playback is paused.
     */
    pause,
    /**
     * The playback has stopped.
     */
    @SerializedName("stop")
    stopped,
    /**
     * The playback has finished.
     */
    ended,
    /**
     * The playback is buffering.
     */
    buffering,
}
