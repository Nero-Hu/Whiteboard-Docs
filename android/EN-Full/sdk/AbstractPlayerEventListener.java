package com.herewhite.sdk;


import com.herewhite.sdk.domain.PlayerPhase;
import com.herewhite.sdk.domain.PlayerState;
import com.herewhite.sdk.domain.SDKError;

/**
 * Created by buhe on 2018/8/12.
 */

/**
 * The default (empty) implementation of the {@link PlayerEventListener PlayerEventListener} interface.
 *
 @deprecated This interface is deprecated.
 */
@Deprecated
public abstract class AbstractPlayerEventListener implements PlayerEventListener {

    @Override
    public void onPhaseChanged(PlayerPhase phase) {

    }

    @Override
    public void onLoadFirstFrame() {

    }

    @Override
    public void onSliceChanged(String slice) {

    }

    @Override
    public void onPlayerStateChanged(PlayerState modifyState) {

    }

    @Override
    public void onStoppedWithError(SDKError error) {

    }

    @Override
    public void onScheduleTimeChanged(long time) {

    }

    @Override
    public void onCatchErrorWhenAppendFrame(SDKError error) {

    }

    @Override
    public void onCatchErrorWhenRender(SDKError error) {

    }
}
