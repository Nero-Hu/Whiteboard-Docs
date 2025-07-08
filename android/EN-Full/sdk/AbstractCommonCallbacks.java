package com.herewhite.sdk;

import com.herewhite.sdk.domain.SDKError;

import org.json.JSONObject;

/**
 * The default (empty) implementation of the `CommonCallbacks` interface. See {@link CommonCallbacks CommonCallbacks}.
 *
 * @deprecated This interface is deprecated.
 */
@Deprecated
public class AbstractCommonCallbacks implements CommonCallbacks {

    /**
     * Reports an uncaught global error during SDK runtime.
     *
     * @param args Error message.
     */
    @Override
    public void throwError(Object args) {

    }

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
    @Override
    public String urlInterrupter(String sourceUrl) {
        return sourceUrl;
    }

    /**
     * Occurs when the audio and video in dynamic PPT slides start playing.
     *
     * @since 2.9.13
     */
    @Override
    public void onPPTMediaPlay(Object args) {

    }

    /**
     * Occurs when the audio and video in dynamic PPT slides pause playing.
     *
     * @since 2.9.13
     */
    @Override
    public void onPPTMediaPause() {

    }

    /**
     * Occurs when the user receives the message from the web page.
     *
     * @since 2.11.4
     *
     * The SDK triggers the callback when the local user receives a message sent by a web page (such as the iframe plug-in and PPTX).
     *
     * @note Not all users can receive this callback.
     *
     * @param message Message in JSON format. Only when the message is in JSON format can the local user receive it.
     */
    @Override
    public void onMessage(JSONObject message) {

    }

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
    @Override
    public void sdkSetupFail(SDKError error) {

    }
}
