package com.herewhite.sdk;

import com.herewhite.sdk.domain.SDKError;

import org.json.JSONObject;

/**
 * The `RoomCallbacks` interface, which the SDK uses to send callback event notifications to the application.
 *
 * Both the {@link Room} instance and the {@link Player} instance can inherit the methods of this interface.
 *
 * @since 2.9.13
 */
public interface CommonCallback {

    /**
     * Reports an uncaught global error during SDK runtime.
     *
     * @param args Error message.
     */
    void throwError(Object args);

    /**
     * Occurs when the SDK intercepts an image URL address.
     *
     * @since 2.9.14
     *
     * By default, this callback is disabled. You can enable it by calling {@link WhiteSdkConfiguration#setEnableInterrupterAPI setEnableInterrupterAPI}(true) when initializing the `WhiteSdk` instance.
     * Once this callback is enabled and users insert an image into the whiteboard scene, the SDK triggers this callback, which reports the original URL address of the image. You can replace the original URL address with a specified URL address in this callback.
     *
     * @note Agora does not recommend enabling this callback because the SDK triggers this callback too frequently when it is enabled.
     *
     * @param sourceUrl The original URL address of an image.
     *
     * @return The URL address that you specify to replace the original one. Ensure that you set the return value.
     */
    String urlInterrupter(String sourceUrl);

    /**
     * Occurs when the audio and video in dynamic PPT slides start playing.
     *
     * @since 2.9.13
     */
    void onPPTMediaPlay();

    /**
     * Occurs when the audio and video in dynamic PPT slides pause playing.
     *
     * @since 2.9.13
     */
    void onPPTMediaPause();

    /**
     * Occurs when the user receives a message from the web page.
     *
     * @since 2.11.4
     *
     * The SDK triggers the callback when the local user receives a message sent by a web page (such as the iframe plug-in and PPTX).
     *
     * @note Not all users can receive this callback.
     *
     * @param object Message in JSON format. Only when the message is in JSON format can the local user receive it.
     */
    void onMessage(JSONObject object);

    /**
     * Reports the failure of the SDK initialization.
     *
     * @since 2.9.14
     *
     * You must initialize a `WhiteSdk` instance before calling any other APIs. You can try reinitializing the SDK.
     *
     * The SDK initialization failure may be due to the following reasons:
     *  - Failure to obtain configuration information due to network connection issues.
     *  - The specified App Identifier is invalid.
     *
     */
    void sdkSetupFail(SDKError error);
}
