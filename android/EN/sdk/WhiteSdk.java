package com.herewhite.sdk;

import android.content.Context;

import androidx.annotation.Nullable;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.herewhite.sdk.domain.ConnectionPrepareParam;
import com.herewhite.sdk.domain.FontFace;
import com.herewhite.sdk.domain.PlayerConfiguration;
import com.herewhite.sdk.domain.PlayerTimeInfo;
import com.herewhite.sdk.domain.Promise;
import com.herewhite.sdk.domain.SDKError;
import com.herewhite.sdk.domain.UrlInterrupter;
import com.herewhite.sdk.internal.PlayerJsInterfaceImpl;
import com.herewhite.sdk.internal.PostMessageCallback;
import com.herewhite.sdk.internal.RoomJsInterfaceImpl;
import com.herewhite.sdk.internal.RtcJsInterfaceImpl;
import com.herewhite.sdk.internal.SdkJsInterfaceImpl;
import com.herewhite.sdk.window.SlideListener;

import org.json.JSONObject;

import java.io.File;

import wendu.dsbridge.OnReturnValue;

/**
 * The `WhiteSdk` class.
 */
public class WhiteSdk {
    private final static Gson gson = new Gson();

    private final JsBridgeInterface bridge;
    private final RoomJsInterfaceImpl roomJsInterface;
    private final SdkJsInterfaceImpl sdkJsInterface;
    private RtcJsInterfaceImpl rtcJsInterface;

    private final int densityDpi;

    /**
     * Sets common event callbacks.
     *
     * The SDK uses the {@link com.herewhite.sdk.CommonCallback CommonCallback} class to report SDK runtime events to the application.
     *
     * @param commonCallback Common event callbacks. See {@link com.herewhite.sdk.CommonCallback CommonCallback}.
     */
    public void setCommonCallbacks(CommonCallback commonCallback) {
        sdkJsInterface.setCommonCallbacks(commonCallback);
    }

    private final boolean onlyCallbackRemoteStateModify;

    /**
     * Gets the {@link AudioMixerImplement} instance.
     *
     * @return The {@link AudioMixerImplement} instance.
     */
    public AudioMixerImplement getAudioMixerImplement() {
        return audioMixerImplement;
    }

    @Nullable
    private AudioMixerImplement audioMixerImplement;

    /**
     * Gets the SDK version number.
     *
     * @return The version of the current SDK in the string format. For example, `"2.12.11"`.
     */
    public static String Version() {
        return "2.12.11";
    }

    /**
     * Initializes the `WhiteSdk` instance.
     *
     * Ensure that you call `WhiteSdk` to create and initialize a `WhiteSdk` instance before calling any other APIs.
     *
     * @param bridge The whiteboard view. See {@link WhiteboardView WhiteboardView}.
     * @param context The context of the Android Activity.
     * @param whiteSdkConfiguration Configurations for the `WhiteSdk` instance. See {@link WhiteSdkConfiguration WhiteSdkConfiguration}.
     *
     */
    public WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration) {
        this(bridge, context, whiteSdkConfiguration, (CommonCallback) null);
    }

    /**
     * Initializes the `WhiteSdk` instance.
     *
     * Ensure that you call `WhiteSdk` to create and initialize a `WhiteSdk` instance before calling any other APIs.
     *
     * @param bridge The whiteboard view. See {@link WhiteboardView WhiteboardView}.
     * @param context The context of the Android Activity.
     * @param whiteSdkConfiguration Configurations for the `WhiteSdk` instance. See {@link WhiteSdkConfiguration WhiteSdkConfiguration}.
     * @param commonCallback Common callback events. See {@link com.herewhite.sdk.CommonCallback CommonCallback}.
     */
    public WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, @Nullable CommonCallback commonCallback) {
        this(bridge, context, whiteSdkConfiguration, commonCallback, null);
    }

    /**
     * Initializes the `WhiteSdk` instance.
     *
     * Ensure that you call `WhiteSdk` to create and initialize a `WhiteSdk` instance before calling any other APIs.
     *
     * @param bridge The whiteboard view, see {@link WhiteboardView WhiteboardView}.
     * @param context The context of the Android Activity.
     * @param whiteSdkConfiguration Configurations for the `WhiteSdk` instance. See {@link WhiteSdkConfiguration WhiteSdkConfiguration}.
     * @param urlInterrupter Sets the interception of image URL addresses. See {@link com.herewhite.sdk.domain.UrlInterrupter UrlInterrupter}.
     * @deprecated The `urlInterrupter` parameter in this method is deprecated. Use the {@link CommonCallbacks#urlInterrupter(String) urlInterrupter} method of the `CommonCallbacks` interface instead.
     *
     */
    public WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, UrlInterrupter urlInterrupter) {
        this(bridge, context, whiteSdkConfiguration);
        sdkJsInterface.setUrlInterrupter(urlInterrupter);
    }

    /**
     * Initializes the `WhiteSdk` instance.
     *
     * Ensure that you call `WhiteSdk` to create and initialize a `WhiteSdk` instance before calling any other APIs.
     *
     * @param bridge The whiteboard view, see {@link WhiteboardView WhiteboardView}.
     * @param context The context of the Android Activity.
     * @param whiteSdkConfiguration Configurations for the `WhiteSdk` instance. See {@link WhiteSdkConfiguration WhiteSdkConfiguration}.
     * @param commonCallback Common callback events. See {@link com.herewhite.sdk.CommonCallback CommonCallback}.
     * @param audioMixerBridge Sets audio mixing. See {@link com.herewhite.sdk.AudioMixerBridge AudioMixerBridge}.
     * When you use the Agora RTC SDK and Interactive Whiteboard SDK at the same time, and the dynamic PPT displayed in the whiteboard contains audio files, you can call the `AudioMixerBridge` interface to play the audio in the dynamic PPT using the Agora RTC SDK interface.
     */
    public WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, @Nullable CommonCallback commonCallback, @Nullable AudioMixerBridge audioMixerBridge) {
        this.bridge = bridge;
        densityDpi = Utils.getDensityDpi(context);
        roomJsInterface = new RoomJsInterfaceImpl();
        sdkJsInterface = new SdkJsInterfaceImpl(commonCallback);
        onlyCallbackRemoteStateModify = whiteSdkConfiguration.isOnlyCallbackRemoteStateModify();

        if (audioMixerBridge != null) {
            audioMixerImplement = new AudioMixerImplement(bridge);

            rtcJsInterface = new RtcJsInterfaceImpl(audioMixerBridge);
            bridge.addJavascriptObject(rtcJsInterface, "rtc");
            whiteSdkConfiguration.setEnableRtcIntercept(true);
        }

        bridge.addJavascriptObject(this.sdkJsInterface, "sdk");
        bridge.addJavascriptObject(this.roomJsInterface, "room");

        // JavaScript 必须将所有 state 变化回调提供给 native。
        // 该属性的实现在 native 代码中体现。
        WhiteSdkConfiguration copyConfig = Utils.deepCopy(whiteSdkConfiguration, WhiteSdkConfiguration.class);
        copyConfig.setOnlyCallbackRemoteStateModify(false);

        bridge.callHandler("sdk.newWhiteSdk", new Object[]{copyConfig});
    }


    /**
     * Joins the live Interactive Whiteboard room.
     *
     * @param roomParams Configurations for the `Room` instance. See {@link RoomParams RoomParams}.
     * @param roomPromise `Promise<Room>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `joinRoom` through this interface:
     * - The `Room` instance, if the method call succeeds. See {@link Room}.
     * - An error message, if the method call fails.
     */
    public void joinRoom(final RoomParams roomParams, final Promise<Room> roomPromise) {
        this.joinRoom(roomParams, null, roomPromise);
    }

    /**
     * Joins the live Interactive Whiteboard room.
     *
     * @param roomParams Configurations for the `Room` instance. See {@link RoomParams RoomParams}.
     * @param roomListener Sets room event callbacks. See {@link RoomListener RoomListener}. When the SDK reconnects to the Interactive Whiteboard server, if you do not pass in the `roomListener` parameter, the SDK uses the previously set `roomListener` parameter. To release the `roomListener`, call {@link #releaseRoom(String) releaseRoom}.
     * @param roomPromise `Promise<Room>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `joinRoom` through this interface:
     * - The `Room` instance, if the method call succeeds. See {@link Room}.
     * - An error message, if the method call fails.
     */
    public void joinRoom(final RoomParams roomParams, final RoomListener roomListener, final Promise<Room> roomPromise) {
        Room room = new Room(roomParams.getUuid(), bridge, densityDpi, onlyCallbackRemoteStateModify);
        room.setRoomListener(roomListener);
        roomJsInterface.setRoom(room.getRoomDelegate());

        try {
            bridge.callHandler("sdk.joinRoom", new Object[]{roomParams}, (OnReturnValue<String>) roomString -> {
                JsonObject jsonObject = gson.fromJson(roomString, JsonObject.class);
                SDKError promiseError = SDKError.promiseError(jsonObject);
                if (promiseError != null) {
                    roomPromise.catchEx(promiseError);
                } else {
                    JsonObject jsonState = jsonObject.getAsJsonObject("state");
                    Long observerId = jsonObject.get("observerId").getAsLong();
                    Boolean isWritable = jsonObject.get("isWritable").getAsBoolean();

                    room.setSyncRoomState(jsonState.toString());
                    room.setObserverId(observerId);
                    room.setWritable(isWritable);

                    roomPromise.then(room);
                }
            });
        } catch (AssertionError a) {
            throw a;
        } catch (Exception e) {
            roomPromise.catchEx(new SDKError(e.getMessage()));
        }
    }

    /**
     * Declares the fonts that can be used in the local whiteboard.
     *
     * @since 2.11.2
     *
     * <p>
     * The fonts declared by this method can be used to render the characters in PPT and the characters entered by the text tool.
     * <p>
     * Both this method and {@link WhiteSdk#loadFontFaces loadFontFaces} can declare the fonts to be used in the local whiteboard. The difference is that `setupFontFaces` has no callback to report whether the font declaration is successful; `loadFontFaces` triggers callbacks to report the preload result of each type of font.
     *
     * @note
     * - This method works only for the local whiteboard and does not affect the font display of the remote whiteboard.
     * - Fonts declared by this method will be downloaded only when they are used.
     * - Font rendering may vary by device. For example, on some devices, the text will not be rendered until the font has finished loading, while on others, the text will be rendered first using the default font and then refreshed as a whole when the specified font has finished loading.
     * - Each time this method is called, it overrides the original font declaration.
     * - Do not call this method and the `loadFontFaces` method at the same time; otherwise, unexpected results may occur.
     *
     * @param fontFaces The specified fonts. See {@link com.herewhite.sdk.domain.FontFace FontFace}.
     */
    public void setupFontFaces(FontFace[] fontFaces) {
        bridge.callHandler("sdk.updateNativeFontFaceCSS", new Object[]{fontFaces});
    }

    /**
     * Declares the fonts that can be used in the local whiteboard and preloads them.
     *
     * @since 2.11.2
     *
     * <p>
     * The fonts declared by this method can be used to render the characters in PPT and the characters entered by the text tool.
     * <p>
     * Both this method and {@link WhiteSdk#setupFontFaces setupFontFaces} can declare the fonts to be used in the local whiteboard. The difference is that `setupFontFaces` has no callback to report whether the font declaration is successful; `loadFontFaces` triggers callbacks to report the preload result of each type of fonts.
     *
     * @note
     * - This method works only for the local whiteboard and does not affect the font display of the remote whiteboard.
     * - Fonts declared by this method will be downloaded only when they are used.
     * - Font rendering may vary by device. For example, on some devices, the text will not be rendered until the font has finished loading, while on others, the text will be rendered first using the default font and then refreshed as a whole when the specified font has finished loading.
     * - Fonts declared and preloaded by this method cannot be deleted. Each method call adds the new fonts to the already preloaded fonts.
     * - Do not call this method and the `setupFontFaces` method at the same time; otherwise, unexpected results may occur.
     *
     * @param fontFaces The specified fonts. See {@link com.herewhite.sdk.domain.FontFace FontFace}.
     * @param loadPromise The `Promise` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `loadFontFaces` through this interface:
     * - The `FontFace` object, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void loadFontFaces(FontFace[] fontFaces, final Promise<JSONObject> loadPromise) {
        bridge.callHandler("sdk.asyncInsertFontFaces", new Object[]{fontFaces}, new OnReturnValue<JSONObject>() {
            @Override
            public void onValue(JSONObject retValue) {
                loadPromise.then(retValue);
            }
        });
    }

    /**
     * Sets the fonts used by the text tool in the local whiteboard.
     *
     * @since 2.11.2
     *
     * @note
     * - This method only works for the local whiteboard and does not affect the font display of the remote whiteboard.
     * - This method cannot set the fonts for rendering the characters in PPT.
     *
     * @param names Names of the fonts. If the specified font does not exist in the user's system, the text tool cannot use the font. Ensure you call `setupFontFaces` or `loadFontFaces` to preload the specified font into the local whiteboard.
     *
     */
    public void updateTextFont(String[] names) {
        bridge.callHandler("sdk.updateNativeTextareaFont", new Object[]{names});
    }

    /**
     * Releases the `Room` instance and removes the `RoomListener` callback.
     *
     * @since 2.4.12
     */
    public void releaseRoom() {
        roomJsInterface.setRoom(null);
    }

    /**
     * Releases the `Room` instance and removes the `RoomListener` callback.
     *
     * @deprecated This method is deprecated. Use {@link WhiteSdk#releaseRoom() releaseRoom} instead.
     *
     * @param uuid Room UUID, the unique identifier of a room.
     * You do not need to specify this parameter because a `WhiteSdk` instance supports joining only one live Interactive Whiteboard room.
     *
     */
    @Deprecated
    public void releaseRoom(String uuid) {
        releaseRoom();
    }

    /**
     * Requests the slide log.
     *
     * @param logFile The file that stores the slide log. 
     * @param promise The callback of the request.
     */
    public void requestSlideLog(File logFile, final Promise<Boolean> promise) {
        try {
            RequestSlideLogHandler handler = new RequestSlideLogHandler(logFile, promise);
            handler.request();
        } catch (Exception e) {
            promise.catchEx(new SDKError(e.getMessage()));
        }
    }

    /**
     * Updates the volume of the PPT slide. 
     * 
     * @param volume Volume. The value range is (0,1].
     */
    public void updateSlideVolume(float volume) {
        bridge.evaluateJavascript("window.postMessage({'type': \"@slide/_update_volume_\",'volume': " + volume + "});");
    }

    /**
     * Gets the volume of the PPT slide. 
     *
     * @param promise The result of the method call, including two fields, `volume` and `error`: 
     * - A successful call: `volume` ranges from (0,1], indicating the volume of the PPT; `error` returns `nil`.
     * - A failed call: `volume` returns 0; `error` returns the error message. 
     */
    public void getSlideVolume(Promise<Double> promise) {
        sdkJsInterface.setPostMessageCallback(jsonObject -> {
            try {
                String type = jsonObject.optString("type");
                if ("@slide/_report_volume_".equals(type)) {
                    sdkJsInterface.setPostMessageCallback(null);
                    promise.then(jsonObject.getDouble("volume"));
                }
            } catch (Exception e) {
                sdkJsInterface.setPostMessageCallback(null);
                promise.catchEx(SDKError.parseError(jsonObject));
            }
        });
        bridge.evaluateJavascript("window.postMessage({'type': \"@slide/_get_volume_\"});");
    }

    /**
     * Sets the listener for PPT slides.
     * PPT slides use the `SlideListener` class to report events to App. 
     *
     * @param slideListener Common callback events. See {@link com.herewhite.sdk.window.SlideListener SlideListener}.
     */
    public void setSlideListener(SlideListener slideListener) {
        sdkJsInterface.setSlideListener(slideListener);
    }

    /**
     * Recovers the rendering status of the specified PPT.
     * 
     * If PPT rendering fails, you can call this method to recover the rendering status of the PPT.
     * 
     * @param slideId PPT ID.
     */
    public void recoverSlide(String slideId) {
        bridge.evaluateJavascript("window.postMessage({'type': \"@slide/_recover_\",'recoverBy': \"reloadCurrentPage\",'slideId': \"" + slideId + "\"});");
    }

    /**
     * Preselects the connection route to speed up the connection when joining a whiteboard room for the first time.
     *
     * @param context The context.
     * @param param The connection preparation parameters.
     */
    public static void prepareWhiteConnection(Context context, ConnectionPrepareParam param) {
        WhiteboardView whiteboardView = new WhiteboardView(context);
        whiteboardView.callHandler("sdk.prepareWhiteConnection", new Object[]{param}, (OnReturnValue<String>) value -> {
            whiteboardView.removeAllViews();
            whiteboardView.destroy();
        });
    }
}
