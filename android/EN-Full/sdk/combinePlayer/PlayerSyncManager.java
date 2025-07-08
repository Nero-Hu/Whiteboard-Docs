package com.herewhite.sdk.combinePlayer;

import android.os.Handler;
import android.os.Looper;

import com.herewhite.sdk.Player;
import com.herewhite.sdk.domain.PlayerPhase;

import java.util.concurrent.TimeUnit;

/**
 * The `PlayerSyncManager` class, for synchronizing the phase of the `NativePlayer` instance with the phase of the `Player` instance.
 *
 * @since 2.4.23
 */
public class PlayerSyncManager {

    /**
     * The `Callbacks` interface, for reporting the events of the `PlayerSyncManager` instance.
     */
    public interface Callbacks {
        /**
         * Occurs when the video starts buffering.
         */
        void startBuffering();

        /**
         * Occurs when the video finishes buffering.
         */
        void endBuffering();
    }

    private enum PauseReason {
        None(0),
        WaitingWhitePlayerBuffering(1),
        WaitingNativePlayerBuffering(1 << 1),
        WaitingBothBuffering(1 << 1 | 1),
        Pause(1 << 2),
        PauseAndWhiteBuffering(1 << 2 | 1),
        PauseAndNativeBuffering(1 << 2 | 1 << 1),
        PauseAndBothBuffering(1 << 2 | 1 << 1 | 1),
        Init(1 | 1 << 1 | 1 << 2);

        private int flag;

        PauseReason(int flag) {
            this.flag = flag;
        }

        public int getValue() {
            return flag;
        }

        public boolean equals(PauseReason flag) {
            return flag.getValue() == getValue();
        }

        public boolean hasFlag(PauseReason flag) {
            return (getValue() & flag.getValue()) != PauseReason.None.getValue();
        }

        public PauseReason removeFlag(PauseReason flag) {
            int value = getValue() & ~flag.getValue();
            for (PauseReason p : PauseReason.values()) {
                if (value == p.getValue()) {
                    return p;
                }

            }
            return PauseReason.None;
        }

        public PauseReason addFlag(PauseReason flag) {
            int value = getValue() | flag.getValue();
            for (PauseReason p : PauseReason.values()) {
                if (value == p.getValue()) {
                    return p;
                }

            }
            return PauseReason.None;
        }
    }

    private Player whitePlayer;
    private PauseReason pauseReason = PauseReason.Init;
    private NativePlayer nativePlayer;
    private Callbacks callbacks;

    /**
     * A `PlayerSyncManager` constructor, which is used to initialize a `PlayerSyncManager` instance.
     *
     * @param whitePlayer The `Player` instance. See {@link Player}.
     * @param nativePlayer The `NativePlayer` instance. See {@link NativePlayer}.
     * @param callbacks Callbacks of the `PlayerSyncManager` instance. See {@link PlayerSyncManager#Callbacks Callbacks}.
     */
    public PlayerSyncManager(Player whitePlayer, NativePlayer nativePlayer, Callbacks callbacks) {
        this.whitePlayer = whitePlayer;
        this.nativePlayer = nativePlayer;
        this.callbacks = callbacks;
        this.updateNativePhase(nativePlayer.getPhase());
        this.updateWhitePlayerPhase(whitePlayer.getPlayerPhase());
    }

    /**
     * A `PlayerSyncManager` constructor, which is used to initialize a `PlayerSyncManager` instance.
     *
     * @param nativePlayer The `NativePlayer` instance. See {@link NativePlayer}.
     * @param callbacks Callbacks of the `PlayerSyncManager` instance. See {@link PlayerSyncManager#Callbacks Callbacks}.
     */
    public PlayerSyncManager(NativePlayer nativePlayer, Callbacks callbacks) {
        this.nativePlayer = nativePlayer;
        this.callbacks = callbacks;
        this.updateNativePhase(nativePlayer.getPhase());
    }

    /**
     * Sets the `Player` instance.
     *
     * @param whitePlayer The `Player` instance. See {@link Player}.
     */
    public void setWhitePlayer(Player whitePlayer) {
        this.whitePlayer = whitePlayer;
        this.updateWhitePlayerPhase(whitePlayer.getPlayerPhase());
    }

    /**
     * Plays a video.
     */
    public void play() {

        pauseReason = pauseReason.removeFlag(PauseReason.Pause);

        playNativePlayer();
        if (nativePlayer != null && nativePlayer.hasEnoughBuffer()) {
            playWhitePlayer();
        }
    }

    /**
     * Pauses the playback of a video.
     */
    public void pause() {

        pauseReason = pauseReason.addFlag(PauseReason.Pause);
        pauseNativePlayer();
        pauseWhitePlayer();
    }

    /**
     * Sets the playback position of the `Player` instance.
     *
     * After setting the playback position of the `NativePlayer` instance, call this method to update the playback position in the `Player` instance accordingly.
     *
     * @param time     The playback position of the `Player` instance.
     * @param timeUnit The time duration in milliseconds. See [TimeUnit](https://www.android-doc.com/reference/java/util/concurrent/TimeUnit.html).
     */
    public void seek(long time, TimeUnit timeUnit) {
        Long milliseconds = TimeUnit.MILLISECONDS.convert(time, timeUnit);
        if (whitePlayer != null) {
            whitePlayer.seekToScheduleTime(milliseconds.intValue());
        }
    }

    /**
     * Synchronizes the phase of the `NativePlayer` to the `PlayerSyncManager`.
     *
     * After receiving the phase of the `NativePlayer`, the `PlayerSyncManager` synchronizes it to the `Player` to ensure the `Player` and `NativePlayer` are in the same phase.
     *
     * @param phase The phase of `NativePlayer`. See {@link NativePlayer#NativePlayerPhase NativePlayerPhase}.
     */
    public void updateNativePhase(NativePlayer.NativePlayerPhase phase) {
        if (phase == NativePlayer.NativePlayerPhase.Buffering || phase == NativePlayer.NativePlayerPhase.Idle) {
            nativeStartBuffering();
        } else {
            nativeEndBuffering();
        }
    }

    private Handler mainHandler = new Handler(Looper.getMainLooper());

    private void runOnMainThread(Runnable runnable) {
        if (Looper.getMainLooper() == Looper.myLooper()) {
            runnable.run();
            return;
        }
        mainHandler.post(runnable);
    }


    private void playNativePlayer() {
        if (nativePlayer != null) {
            runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    nativePlayer.play();
                }
            });
        }
    }

    private void pauseNativePlayer() {
        if (nativePlayer != null) {
            runOnMainThread(new Runnable() {
                @Override
                public void run() {
                    nativePlayer.pause();
                }
            });
        }
    }

    private void playWhitePlayer() {
        if (whitePlayer != null) {
            whitePlayer.play();
        }
    }

    private void pauseWhitePlayer() {
        if (whitePlayer != null) {
            whitePlayer.pause();
        }
    }

    private void nativeStartBuffering() {

        pauseReason = pauseReason.addFlag(PauseReason.WaitingNativePlayerBuffering);

        callbacks.startBuffering();

        pauseWhitePlayer();
    }

    private void nativeEndBuffering() {

        boolean isBuffering = pauseReason.hasFlag(PauseReason.WaitingWhitePlayerBuffering) || pauseReason.hasFlag(PauseReason.WaitingNativePlayerBuffering);
        pauseReason = pauseReason.removeFlag(PauseReason.WaitingNativePlayerBuffering);

        if (pauseReason.hasFlag(PauseReason.WaitingWhitePlayerBuffering)) {
            pauseNativePlayer();
        } else if (isBuffering) {
            callbacks.endBuffering();
        }

        if (pauseReason.equals(PauseReason.None)) {
            playNativePlayer();
            playWhitePlayer();
        }
    }

    /**
     * Updates the phase of the `Player` instance to the `PlayerSyncManager`.
     *
     * @param phase The phase of the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerPhase PlayerPhase}.
     */
    public void updateWhitePlayerPhase(PlayerPhase phase) {
        if (phase == PlayerPhase.buffering || phase == PlayerPhase.waitingFirstFrame) {
            whitePlayerStartBuffering();
        } else if (phase == PlayerPhase.pause || phase == PlayerPhase.playing) {
            whitePlayerEndBuffering();
        }
    }

    private void whitePlayerStartBuffering() {

        pauseReason = pauseReason.addFlag(PauseReason.WaitingWhitePlayerBuffering);

        pauseNativePlayer();

        callbacks.startBuffering();
    }

    private void whitePlayerEndBuffering() {

        boolean isBuffering = pauseReason.hasFlag(PauseReason.WaitingWhitePlayerBuffering) || pauseReason.hasFlag(PauseReason.WaitingNativePlayerBuffering);
        pauseReason = pauseReason.removeFlag(PauseReason.WaitingWhitePlayerBuffering);

        if (pauseReason.hasFlag(PauseReason.WaitingNativePlayerBuffering)) {
            pauseWhitePlayer();
        } else if (isBuffering) {
            callbacks.endBuffering();
        }

        if (pauseReason.equals(PauseReason.None)) {
            playNativePlayer();
            playWhitePlayer();
        } else if (pauseReason.hasFlag(PauseReason.Pause)) {
            pauseWhitePlayer();
            pauseNativePlayer();
        }
    }

}
