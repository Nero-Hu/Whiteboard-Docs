package com.herewhite.sdk.domain;

/**
 * The view state of the local user, as well as the user information of the host (if any) in the room.
 *
 * When the local user is in the `Follower` view mode, you can call {@link #getBroadcasterId} and {@link #getBroadcasterInformation} to get the information of the host in the room.
 */
public class BroadcastState extends WhiteObject {

    private ViewMode mode;
    private Long broadcasterId;
    private RoomMember broadcasterInformation;

    /**
     * Gets the view mode of the user.
     *
     * @return The view mode of the user.
     */
    public ViewMode getMode() {
        return mode;
    }

    /**
     * Gets the user ID of the host.
     *
     * For the SDK earlier than v2.4.8, this method call returns `0` by mistake when there is no host in the room.
     * v2.4.8 fixed this issue. As of v2.4.8, this method call returns `null` when there is no host in the room.
     *
     * @return The user ID of the host.
     */
    public Long getBroadcasterId() {
        return broadcasterId;
    }

    /**
     * Gets the user information of the host.
     *
     * @return The user information of the host. See {@link RoomMember RoomMember}.
     */
    public RoomMember getBroadcasterInformation() {
        return broadcasterInformation;
    }
}
