package com.herewhite.sdk.domain;

/**
 * Created by buhe on 2018/8/12.
 */

/**
 * The connection state of the room.
 */
public enum RoomPhase {
    /**
     * The SDK is connecting to the room on the Interactive Whiteboard server.
     */
    connecting,
    /**
     * The SDK is connected to the room on the Interactive Whiteboard server.
     */
    connected,
    /**
     * The SDK is reconnecting to the room on the Interactive Whiteboard server.
     */
    reconnecting,
    /**
     * The SDK is disconnecting from the room on the Interactive Whiteboard server.
     */
    disconnecting,
    /**
     * The SDK is disconnected from the room on the Interactive Whiteboard server.
     */
    disconnected,
}
