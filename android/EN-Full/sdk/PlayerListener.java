package com.herewhite.sdk;

import com.herewhite.sdk.domain.PlayerPhase;
import com.herewhite.sdk.domain.PlayerState;
import com.herewhite.sdk.domain.SDKError;

/**
 * The `PlayerListener` interface, which reports events of a `Player` instance.
 */
public interface PlayerListener {
    /**
     * Occurs when the playback state changes.
     */
    void onPhaseChanged(PlayerPhase phase);

    /**
     * Occurs when the first frame is loaded.
     */
    void onLoadFirstFrame();

    /**
     * Hidden in documentation.
     */
    void onSliceChanged(String slice);

    /**
     * Occurs when the player state changes.
     *
     * This callback reports only the player state fields that have changed.
     */
    void onPlayerStateChanged(PlayerState modifyState);

    /**
     * Occurs when the playback stops due to an error.
     */
    void onStoppedWithError(SDKError error);

    /**
     * Occurs when the playback position changes.
     */
    void onScheduleTimeChanged(long time);

    /**
     * Reports an error that occurs when the SDK appends a frame.
     *
     */
    void onCatchErrorWhenAppendFrame(SDKError error);

    /**
     * Reports an error that occurs when the SDK renders a frame.
     */
    void onCatchErrorWhenRender(SDKError error);
}
