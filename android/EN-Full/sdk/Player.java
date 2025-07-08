package com.herewhite.sdk;

import com.google.gson.JsonSyntaxException;
import com.herewhite.sdk.domain.EventEntry;
import com.herewhite.sdk.domain.EventListener;
import com.herewhite.sdk.domain.FrequencyEventListener;
import com.herewhite.sdk.domain.PlayerObserverMode;
import com.herewhite.sdk.domain.PlayerPhase;
import com.herewhite.sdk.domain.PlayerState;
import com.herewhite.sdk.domain.PlayerTimeInfo;
import com.herewhite.sdk.domain.Promise;
import com.herewhite.sdk.domain.SDKError;
import com.herewhite.sdk.internal.Logger;

import wendu.dsbridge.OnReturnValue;

/**
 * The `Player` class, which provides methods to manage the playback of whiteboard content.
 */
public class Player extends Displayer {
    private SyncDisplayerState<PlayerState> syncPlayerState;

    private long scheduleTime = 0;
    private long timeDuration;
    private long beginTimestamp;
    private int framesCount;

    /**
     * Gets the playback speed.
     *
     * @since 2.5.2
     *
     * @note
     * - This method call is synchronous.
     * - The value you get by this method is a multiple of the original playback speed. For example, if the return value is
     * `2.0`, the playback speed is two times the original speed.
     * - Even when the playback pauses when you call this method, the return value cannot be `0`.
     *
     * @return The multiple of the original playback speed.
     */
    public double getPlaybackSpeed() {
        return playbackSpeed;
    }

    /**
     * Sets the playback speed.
     *
     * This method sets the whiteboard content to play at a multiple of the original speed. For example, if you pass in `2.0`, the set playback speed is two times the original speed.
     *
     * @since 2.5.2
     *
     * @param playbackSpeed The multiple of the original playback speed. The value must be greater than 0.
     * When you set this parameter as `1`, the whiteboard content plays at the original speed.
     *
     */
    public void setPlaybackSpeed(double playbackSpeed) {
        this.playbackSpeed = playbackSpeed;
        bridge.callHandler("player.setPlaybackSpeed", new Object[]{playbackSpeed});
    }

    /**
     * Gets the playback speed.
     *
     * @since 2.5.2
     *
     * @note
     * - This method call is asynchronous. Agora recommends that you use this method only for debugging or troubleshooting.
     * In most cases, you can use the synchronous method {@link #getPlaybackSpeed() getPlaybackSpeed}[1/2] to get the playback speed.
     * - The value you get by this method is a multiple of the original playback speed. For example, if the return value is
     * `2.0`, the playback speed is two times the original speed.
     * - Even when the playback pauses when you call this method, the return value cannot be `0`.
     *
     * @param promise The Promise<Double> interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getPlaybackSpeed` through this interface:
     * - The playback speed, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void getPlaybackSpeed(final Promise<Double> promise) {
        bridge.callHandler("player.state.playbackSpeed", new OnReturnValue<Number>() {
            @Override
            public void onValue(Number value) {
                promise.then(value.doubleValue());
            }
        });
    }

    private double playbackSpeed;

    private PlayerPhase playerPhase = PlayerPhase.waitingFirstFrame;

    /// @cond test
    /**
     * Hidden in documentation
     */
    Player(String room, JsBridgeInterface bridge, int densityDpi) {
        super(room, bridge, densityDpi);
        syncPlayerState = new SyncDisplayerState(PlayerState.class, "{}", true);
        syncPlayerState.setListener(localPlayStateListener);
    }
    /// @endcond

    void setPlayerTimeInfo(PlayerTimeInfo playerTimeInfo) {
        this.scheduleTime = playerTimeInfo.getScheduleTime();
        this.timeDuration = playerTimeInfo.getTimeDuration();
        this.framesCount = playerTimeInfo.getFramesCount();
        this.beginTimestamp = playerTimeInfo.getBeginTimestamp();
    }

    /**
     * Starts the playback of the whiteboard content.
     *
     * @note
     * When the playback pauses, you can call this method to resume the playback.
     */
    public void play() {
        bridge.callHandler("player.play", new Object[]{});
    }

    /**
     * Pauses the playback of the whiteboard content.
     */
    public void pause() {
        bridge.callHandler("player.pause", new Object[]{});
    }

    /**
     * Stops the playback of the whiteboard content.
     *
     * A successful call of this method stops the playback of the whiteboard content and releases all resources related to the `Player` instance.
     * You need to re-initialize the `Player` instance if you want to enable the playback again.
     *
     */
    public void stop() {
        bridge.callHandler("player.stop", new Object[]{});
    }

    /**
     * Sets the playback position (ms) of the whiteboard content.
     *
     * By default, the playback starts from the beginning of the file. You can call this method to enable the playback to start from your specified position.
     *
     * @param seekTime The playback position (ms)
     */
    public void seekToScheduleTime(long seekTime) {
        bridge.callHandler("player.seekToScheduleTime", new Object[]{seekTime});
    }

    /**
     * Sets the mode for watching the whiteboard playback.
     *
     * @param mode The mode for watching the whiteboard playback.
     * See {@link com.herewhite.sdk.domain.PlayerObserverMode PlayerObserverMode}.
     */
    public void setObserverMode(PlayerObserverMode mode) {
        bridge.callHandler("player.setObserverMode", new Object[]{mode.name()});
    }

    //region Get API

    /**
     * Gets the current phase of the `Player` instance.
     *
     * @since 2.4.0
     *
     * You can call this method to get the current playback phase during the life cycle of the `Player` instance.
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest playback phase through {@link #getPlayerPhase getPlayerPhase} immediately after
     * calling {@link #stop() stop}, {@link #play() play}, or {@link #pause() pause}.
     * In this case, you can use {@link #getPhase(final Promise<PlayerPhase> promise) getPhase} instead.
     *
     * @return The current phase of the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerPhase PlayerPhase}.
     *
     */
    public PlayerPhase getPlayerPhase() {
        return this.playerPhase;
    }

    /**
     * Gets the current phase of the `Player` instance.
     *
     * You can call this method to get the current playback phase during the life cycle of the `Player` instance.
     *
     * @note
     * - This method call is asynchronous. Agora recommends that you use this method only for debugging or troubleshooting.
     * In most cases, you can use the synchronous method {@link #getPlayerPhase() getPlayerPhase} to get the playback phase.
     * - You cannot get the latest playback phase through {@link #getPlayerPhase getPlayerPhase} immediately after
     * calling {@link #stop() stop}, {@link #play() play}, or {@link #pause() pause}.
     * In this case, you can use {@link #getPhase(final Promise<PlayerPhase> promise) getPhase}.
     *
     * @param promise The `Promise<PlayerPhase>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getPhase` through this interface:
     * - The current playback phase, if the method call succeeds. See {@link com.herewhite.sdk.domain.PlayerPhase PlayerPhase}.
     * - An error message, if the method call fails.
     */
    public void getPhase(final Promise<PlayerPhase> promise) {
        bridge.callHandler("player.getBroadcastState", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(PlayerPhase.valueOf(String.valueOf(o)));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getPhase", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getPhase promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the state of the the `Player` instance.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is asynchronous.
     * - This method call returns `null` if the `Player` instance is in the `waitingFirstFrame` phase.
     *
     * @return The state of the the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerState PlayerState}.
     *
     */
    public PlayerState getPlayerState() {
        if (playerPhase == PlayerPhase.waitingFirstFrame) {
            return null;
        }
        return this.syncPlayerState.getDisplayerState();
    }

    /**
     * Gets the state of the the `Player` instance.
     *
     * @note
     * - This method call is asynchronous. Agora recommends that you use this method only for debugging or troubleshooting.
     * In most cases, you can use the synchronous method {@link #getPlayerPhase() getPlayerPhase}[1/2] to get the `Player` state.
     * - This method call returns `null` if the `Player` instance is in the `waitingFirstFrame` phase.
     *
     * @param promise The `Promise<PlayerState>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getPlayerState` through this interface:
     * - The state of the the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerState PlayerState}.
     * - An error message, if the method call fails.
     */
    public void getPlayerState(final Promise<PlayerState> promise) {
        bridge.callHandler("player.state.playerState", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    PlayerState playerState = gson.fromJson(String.valueOf(o), PlayerState.class);
                    promise.then(playerState);
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getPlayerState", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getPlayerState promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the time information of the `Player` instance.
     *
     * @since 2.4.0
     *
     * A successful method call returns the time information of the `Player` instance,
     * including the current playback position (ms), the total duration (ms) of the playback, and the Unix timestamp (ms) indicating when the playback started.
     *
     * @note
     * - This method call is synchronous.
     * - The playback position returned by this method may be not accurate.
     *
     * @return The time information of the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerTimeInfo PlayerTimeInfo}.
     */
    public PlayerTimeInfo getPlayerTimeInfo() {
        return new PlayerTimeInfo(this.scheduleTime, this.timeDuration, this.framesCount, this.beginTimestamp);
    }

    /**
     * Gets the time information of the `Player` instance.
     *
     * A successful method call returns the time information of the `Player` instance,
     * including the current playback position (ms), the total duration (ms) of the playback, and the Unix timestamp (ms) indicating when the playback started.
     *
     *
     * @note
     * - This method call is asynchronous. Agora recommends that you use this method only for debugging or troubleshooting.
     * In most cases, you can use the synchronous method {@link #getPlayerTimeInfo() getPlayerTimeInfo}[1/2] to get the time information.
     *
     * @param promise The `Promise<PlayerTimeInfo>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getPlayerTimeInfo` through this interface:
     * - The time information of the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerTimeInfo PlayerTimeInfo}.
     * - An error message, if the method call fails.
     */
    public void getPlayerTimeInfo(final Promise<PlayerTimeInfo> promise) {
        bridge.callHandler("player.state.timeInfo", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                promise.then(getPlayerTimeInfo());
            }
        });
    }
    //endregion

    // region PlayerListener
    private PlayerListener listener;

    void setPlayerEventListener(PlayerListener playerEventListener) {
        this.listener = playerEventListener;
    }
    // endregion

    private PlayerDelegate playerDelegate;

    PlayerDelegate getDelegate() {
        if (playerDelegate == null) {
            playerDelegate = new PlayerDelegateImpl();
        }
        return playerDelegate;
    }

    private SyncDisplayerState.Listener<PlayerState> localPlayStateListener = modifyState -> {
        if (listener != null) {
            listener.onPlayerStateChanged(modifyState);
        }
    };


    private class PlayerDelegateImpl implements PlayerDelegate {
        @Override
        public void fireMagixEvent(EventEntry eventEntry) {
            EventListener eventListener = eventListenerMap.get(eventEntry.getEventName());
            if (eventListener != null) {
                eventListener.onEvent(eventEntry);
            }
        }

        @Override
        public void fireHighFrequencyEvent(EventEntry[] eventEntries) {
            FrequencyEventListener eventListener = frequencyEventListenerMap.get(eventEntries[0].getEventName());
            if (eventListener != null) {
                eventListener.onEvent(eventEntries);
            }
        }

        @Override
        public void setPlayerPhase(PlayerPhase playerPhase) {
            Player.this.playerPhase = playerPhase;
            if (listener != null) {
                listener.onPhaseChanged(playerPhase);
            }
        }

        @Override
        public void onLoadFirstFrame() {
            if (listener != null) {
                listener.onLoadFirstFrame();
            }
        }

        @Override
        public void onSliceChanged(String slice) {
            if (listener != null) {
                listener.onSliceChanged(slice);
            }
        }

        @Override
        public void syncDisplayerState(String stateJSON) {
            if (syncPlayerState != null) {
                syncPlayerState.syncDisplayerState(stateJSON);
            }
        }

        @Override
        public void onStoppedWithError(SDKError error) {
            if (listener != null) {
                listener.onStoppedWithError(error);
            }
        }

        @Override
        public void setScheduleTime(long scheduleTime) {
            Player.this.scheduleTime = scheduleTime;
            if (listener != null) {
                listener.onScheduleTimeChanged(scheduleTime);
            }
        }

        @Override
        public void onCatchErrorWhenAppendFrame(SDKError error) {
            if (listener != null) {
                listener.onCatchErrorWhenAppendFrame(error);
            }
        }

        @Override
        public void onCatchErrorWhenRender(SDKError error) {
            if (listener != null) {
                listener.onCatchErrorWhenRender(error);
            }
        }
    }
}
