package com.herewhite.sdk;

/**
 * The `CommonCallbacks` interface, which the SDK uses to send event callbacks to the application.
 * Both the {@link Room} instance and the {@link Player} instance can inherit the methods of this interface.
 *
 * @since 2.9.13
 *
 * @deprecated This interface is deprecated. Use {@link CommonCallback} instead.
 */
@Deprecated
public interface CommonCallbacks extends CommonCallback {
}
