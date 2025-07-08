package com.herewhite.sdk.domain;


// Created by buhe on 2018/8/12.

/**
 * The `RoomState` class.
 */
public class RoomState extends WhiteDisplayerState {

    private MemberState memberState;
    private BroadcastState broadcastState;
    private Double zoomScale;

    /**
     * Gets the state of the whiteboard tool currently in use.
     *
     * @return The state of the whiteboard tool currently in use. See {@link MemberState MemberState}.
     */
    public MemberState getMemberState() {
        return memberState;
    }

    /**
     * Gets the current state of the view.
     *
     * @return The current state of the view. See {@link BroadcastState BroadcastState}.
     */
    public BroadcastState getBroadcastState() {
        return broadcastState;
    }

    /**
     * Gets the scale of the view.
     *
     * @deprecated This method is deprecated.
     *
     * @return The scale of the view.
     */
    public Double getZoomScale() {
        return zoomScale;
    }
}
