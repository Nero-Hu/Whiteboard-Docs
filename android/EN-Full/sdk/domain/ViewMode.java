package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * The user's view mode.
 */
public enum ViewMode {
    /**
     * `Freedom`: (Default) Freedom mode.
     *
     * In this mode, the user can freely adjust their own view. Each user's view setting does not affect the view settings of other users.
     *
     * @note
     * When there is no host in the room, all users are in `Freedom` view mode by default.
     *
     */
    //@SerializedName("freedom")
    Freedom,
    /**
     * `Follower`: Follower mode.
     *
     * In this mode, the user's view follows the view of the host.
     *
     * @note
     * - When one user’s view mode is set as `Broadcaster`, the view mode of the other users in the room (including users that join subsequently) automatically changes to `Follower`.
     * - When a user in `Follower` view mode operates the whiteboard, their view mode automatically switches to `Freedom` mode.
     * If needed, you can call {@link com.herewhite.sdk.Room#disableOperations(boolean disableOperations) disableOperations} to disable the user from operating the whiteboard, so as to lock their view mode.
     */
    //@SerializedName("follower")
    Follower,
    /**
     * `Broadcaster`: Host mode.
     *
     * In this mode, the user can freely adjust their view, and every other user in the room can only duplicate the view of the host.
     *
     * @note
     * - Each room can have only one user in `Broadcaster` view mode.
     * - When a user’s view mode is set as `Broadcaster`, the view mode of every other user in the room (including users that join subsequently) is automatically set as `Follower`.
     */
    @SerializedName("broadcaster")
    Broadcaster
}
