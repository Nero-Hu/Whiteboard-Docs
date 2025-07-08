package com.herewhite.sdk;

import android.content.Context;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.herewhite.sdk.domain.FontFace;
import com.herewhite.sdk.domain.PlayerConfiguration;
import com.herewhite.sdk.domain.PlayerTimeInfo;
import com.herewhite.sdk.domain.Promise;
import com.herewhite.sdk.domain.RoomPhase;
import com.herewhite.sdk.domain.SDKError;
import com.herewhite.sdk.domain.UrlInterrupter;

import org.json.JSONObject;

import androidx.annotation.Nullable;
import wendu.dsbridge.OnReturnValue;

/**
 * The `WhiteSdk` class.
 */
public class WhiteSdk {
    private final static Gson gson = new Gson();

    private final JsBridgeInterface bridge;
    private final RoomJsInterfaceImpl roomJsInterface;
    private final PlayerJsInterfaceImpl playerJsInterface;
    private final SdkJsInterfaceImpl sdkJsInterface;
    private RtcJsInterfaceImpl rtcJsInterface;

    private final int densityDpi;

    /**
     * Sets common event callbacks.
     *
     * The SDK uses the {@link com.herewhite.sdk.CommonCallbacks CommonCallbacks} class to report SDK runtime events to the application.
     *
     * @param commonCallbacks Common event callbacks. See {@link com.herewhite.sdk.CommonCallbacks CommonCallbacks}.
     */
    public void setCommonCallbacks(CommonCallbacks commonCallbacks) {
        sdkJsInterface.setCommonCallbacks(commonCallbacks);
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
     * @deprecated @deprecated The `urlInterrupter` parameter in this method is deprecated. Use the {@link CommonCallbacks#urlInterrupter(String) urlInterrupter} method of the `CommonCallbacks` interface instead.
     *
     * Ensure that you call `WhiteSdk` to create and initialize a `WhiteSdk` instance before calling any other APIs.
     *
     * @param bridge The whiteboard view, see {@link WhiteboardView WhiteboardView}.
     * @param context The context of the Android Activity.
     * @param whiteSdkConfiguration Configurations for the `WhiteSdk` instance. See {@link WhiteSdkConfiguration WhiteSdkConfiguration}.
     * @param urlInterrupter Sets the interception of image URL addresses. See {@link com.herewhite.sdk.domain.UrlInterrupter UrlInterrupter}.
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
        playerJsInterface = new PlayerJsInterfaceImpl();
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
        bridge.addJavascriptObject(this.playerJsInterface, "player");

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
                    room.setRoomPhase(RoomPhase.connected);

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
     * Creates a `Player` instance, which is used to replay the whiteboard content of a live Interactive Whiteboard room.
     *
     * @param playerConfiguration Configurations for the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerConfiguration PlayerConfiguration}.
     * @param playerPromise `Promise<Player>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `createPlayer` through this interface:
     * - The `Player` instance, if the method call succeeds. See {@link com.herewhite.sdk.Player Player}.
     * - An error message, if the method call fails.
     */
    public void createPlayer(final PlayerConfiguration playerConfiguration, final Promise<Player> playerPromise) {
        createPlayer(playerConfigurcreateation, null, playerPromise);
    }

    /**
     * Creates a `Player` instance, which is used to replay the whiteboard content of a live Interactive Whiteboard room.
     *
     * @param playerConfiguration Configurations for the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerConfiguration PlayerConfiguration}.
     * @param listener The event listener of the `Player` instance. See {@link com.herewhite.sdk.PlayerEventListener PlayerEventListener}.
     * @param playerPromise `Promise<Player>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `createPlayer` through this interface:
     * - The `Player` instance, if the method call succeeds. See {@link com.herewhite.sdk.Player Player}.
     * - An error message, if the method call fails.
     */
    public void createPlayer(final PlayerConfiguration playerConfiguration, final PlayerListener listener, final Promise<Player> playerPromise) {
        Player player = new Player(playerConfiguration.getRoom(), bridge, densityDpi);
        player.setPlayerEventListener(listener);
        playerJsInterface.setPlayer(player.getDelegate());

        try {
            bridge.callHandler("sdk.replayRoom", new Object[]{
                    playerConfiguration
            }, (OnReturnValue<String>) playString -> {
                JsonObject jsonObject = gson.fromJson(playString, JsonObject.class);
                SDKError promiseError = SDKError.promiseError(jsonObject);
                if (promiseError != null) {
                    playerPromise.catchEx(promiseError);
                } else {
                    JsonObject timeInfo = jsonObject.getAsJsonObject("timeInfo");
                    PlayerTimeInfo playerTimeInfo = gson.fromJson(timeInfo.toString(), PlayerTimeInfo.class);

                    player.setPlayerTimeInfo(playerTimeInfo);
                    playerPromise.then(player);
                }
            });
        } catch (AssertionError a) {
            throw a;
        } catch (Exception e) {
            playerPromise.catchEx(new SDKError(e.getMessage()));
        }
    }

    /**
     * Checks whether the room has playback data.
     *
     * @since 2.11.0
     *
     * @param playerConfiguration Configurations for the `Player` instance. See {@link com.herewhite.sdk.domain.PlayerConfiguration PlayerConfiguration}.
     * @param playablePromise The `Promise` interface instance, see {@link com.herewhite.sdk.domain.Promise Promise} for details. You can get the result of calling `isPlayable` through this interface:
     * - `true`, if the method call succeeds.
     * - `false`, if the method call fails.
     */
    public void isPlayable(final PlayerConfiguration playerConfiguration, final Promise<Boolean> playablePromise) {
        bridge.callHandler("sdk.isPlayable", new Object[]{playerConfiguration}, new OnReturnValue<Boolean>() {
            @Override
            public void onValue(Boolean retValue) {
                playablePromise.then(retValue);
            }
        });
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
     * Releases the `Player` instance and removes the `PlayerEventListener` callback.
     *
     * @since 2.4.12
     */
    public void releasePlayer() {
        playerJsInterface.setPlayer(null);
    }

    /**
     * Releases the playback room and removes the `PlayerEventListener` callback.
     *
     * @deprecated This method is deprecated. Please use {@link #releasePlayer() releasePlayer} instead.
     *
     * @param uuid Room UUID, the unique identifier of a room.
     * You do not need to specify this parameter because a `WhiteSdk` instance supports creating only one `Player` instance.
     *
     */
    @Deprecated
    public void releasePlayer(String uuid) {
        releasePlayer();
    }
}
