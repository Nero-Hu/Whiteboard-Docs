package com.herewhite.sdk;

import com.herewhite.sdk.domain.RoomPhase;
import com.herewhite.sdk.domain.RoomState;

/**
 * The event callback interface of the {@link Room} instance.
 */
public interface RoomListener {

    /**
     * Occurs when the room connection state changes.
     *
     * @param phase The current connection state of the room. See {@link com.herewhite.sdk.domain.RoomPhase RoomPhase}.
     */
    void onPhaseChanged(RoomPhase phase);

    /**
     * Occurs when the SDK loses connection with the Interactive Whiteboard server.
     *
     * @param e An error message.
     */
    void onDisconnectWithError(Exception e);

    /**
     * Occurs when the local user is removed from the live Interactive Whiteboard room.
     *
     * @param reason The reason why the user is removed from the room.
     */
    void onKickedWithReason(String reason);

    /**
     * Occurs when the room state changes.
     *
     * This callback reports only the room state fields that have changed and returns `null` for the room state fields that have not changed.
     *
     * @param modifyState The room state that has changed. See {@link com.herewhite.sdk.domain.RoomState RoomState}.
     */
    void onRoomStateChanged(RoomState modifyState);

    /**
     * Occurs when the number of undoable actions changes.
     *
     * The SDK triggers this callback every time the local user calls {@link Room#undo undo} and reports the number of remaining undoable actions.
     *
     * @param canUndoSteps The number of remaining undoable actions.
     */
    void onCanUndoStepsUpdate(long canUndoSteps);

    /**
     * Occurs when the number of redoable actions changes.
     *
     * The SDK triggers this callback every time the local user calls {@link Room#redo redo} and reports the number of remaining redoable actions.
     *
     * @param canRedoSteps The number of remaining redoable actions.
     */
    void onCanRedoStepsUpdate(long canRedoSteps);

    /**
     * Reports the errors that occur during the synchronization of a user's operations.
     *
     * @param userId The user ID of the user whose operations are being synchronized.
     * @param error  An error message.
     */
    void onCatchErrorWhenAppendFrame(long userId, Exception error);
}
