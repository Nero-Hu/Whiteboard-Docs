package com.herewhite.sdk;

import android.os.Build;
import android.os.Build.VERSION;

import com.google.gson.annotations.SerializedName;
import com.herewhite.sdk.domain.DeviceType;
import com.herewhite.sdk.domain.LoggerOptions;
import com.herewhite.sdk.domain.Region;
import com.herewhite.sdk.domain.WhiteObject;

import org.json.JSONObject;

import java.util.HashMap;

/**
 * Configuration for the `WhiteSdk` instance.
 *
 * @note After the `WhiteSdk` instance is initialized, you cannot call any method in the `WhiteSdkConfiguration` class to modify the configuration of the `WhiteSdk` instance.
 */
public class WhiteSdkConfiguration extends WhiteObject {

    /**
     * Rendering modes for drawings.
     *
     * @since 2.8.0
     */
    public enum RenderEngineType {
        /**
         * SVG rendering mode.
         *
         * The Interactive Whiteboard SDK v2.8.0 or earlier uses SVG rendering mode for drawings by default. This mode has better compatibility but poorer performance.
         */
        @SerializedName("svg")
        svg,
        /**
         * Canvas rendering mode.
         *
         * As of v2.8.0, the Interactive Whiteboard SDK adds canvas rendering mode, which has better performance but poorer compatibility.
         *
         * Since v2.9.0, the SDK uses canvas rendering mode for drawings by default.
         *
         * @note
         * The SDK automatically switches the default rendering mode to `svg` for devices running on Android 6.1 to Android 8.1, because these devices cannot support canvas rendering mode.
         */
        @SerializedName("canvas")
        canvas,
    }

    /**
     * The `PptParams` class, which is used for setting parameters for dynamic PPT slides.
     */
    public static class PptParams extends WhiteObject {

        /// @cond test
        /**
         * Hidden in documentation.
         */
        public String getScheme() {
            return scheme;
        }
        /// @endcond

        /// @cond test
        /**
         * Hidden in documentation.
         */
        public void setScheme(String scheme) {
            this.scheme = scheme;
        }
        /// @endcond

        private String scheme;

        /**
         * Gets whether server-side typesetting for dynamic PPT slides is enabled.
         *
         * @return Whether server-side typesetting for dynamic PPT slides is enabled:
         *  - `true`: Enabled.
         *  - `false`: Disabled.
         */
        public boolean isUseServerWrap() {
            return useServerWrap;
        }

        /**
         * Enables/Disables server-side typesetting for dynamic PPT slides.
         *
         * @since 2.11.16
         *
         * As of February 10, 2021, when converting dynamic PPT slides to HTML web pages, the Agora Interactive Whiteboard server supports typesetting the dynamic PPT slides to ensure the presentation of the text in the dynamic PPT slides is consistent across platforms.
         *
         * @param useServerWrap Whether to enable server-side typesetting for dynamic PPT slides.
         * - `true`: Enable server-side typesetting.
         * - `false`: (Default) Disable server-side typesetting.
         */
        public void setUseServerWrap(boolean useServerWrap) {
            this.useServerWrap = useServerWrap;
        }

        private boolean useServerWrap;

        /// @cond test
        /**
         * Hidden in documentation.
         */
        public PptParams(String scheme) {
            this.scheme = scheme;
        }
        /// @endcond
    }



    private DeviceType deviceType = DeviceType.touch;
    private boolean log = false;
    private RenderEngineType renderEngine = RenderEngineType.canvas;
    private boolean enableInterrupterAPI = false;
    private boolean preloadDynamicPPT = false;
    private boolean routeBackup = false;
    private boolean userCursor = false;
    private boolean onlyCallbackRemoteStateModify = false;
    private boolean disableDeviceInputs = false;
    private boolean enableIFramePlugin = false;
    private boolean enableRtcIntercept = false;

    private LoggerOptions loggerOptions;

    private String appIdentifier;
    private HashMap<String, String> __nativeTags = new HashMap<>();
    private PptParams pptParams;
    private HashMap<String, String> fonts;

    /**
     * Gets whether the iframe plug-in is enabled.
     *
     * @return Whether the iframe plug-in is enabled:
     * - `true`: Enabled.
     * - `false`: Disabled.
     */
    public boolean isEnableIFramePlugin() {
        return enableIFramePlugin;
    }

    /**
     * Enables/Disables the iframe plug-in.
     *
     * For the functions of the iframe plug-in, go to https://github.com/netless-io/netless-iframe-bridge.
     *
     * @param enableIFramePlugin Whether to enable the iframe plug-in.
     * - `true`: Enable the iframe plug-in.
     * - `false`: (default) Disable the iframe plug-in.
     */
    public void setEnableIFramePlugin(boolean enableIFramePlugin) {
        this.enableIFramePlugin = enableIFramePlugin;
    }

    /**
     * Gets the data center.
     *
     * @return The data center. See {@link com.herewhite.sdk.domain.Region Region}.
     */
    public Region getRegion() {
        return region;
    }

    /**
     * Sets the data center.
     *
     * @note
     * The data center set in this method must be the same as the data center of the live Interactive Whiteboard room to be joined; otherwise, the SDK fails to connect to the room.
     *
     * @param region The data center. See {@link com.herewhite.sdk.domain.Region Region}.
     */
    public void setRegion(Region region) {
        this.region = region;
    }

    boolean isEnableRtcIntercept() {
        return enableRtcIntercept;
    }

    /// @cond test
    /**
     *
     * Sets whether to play the audio in dynamic PPT slides using the audio mixing method of the Agora RTC SDK.
     *
     * @since 2.9.17
     *
     * When you use the Agora RTC SDK and Interactive Whiteboard SDK at the same time, and the dynamic PPT slides displayed in the whiteboard contain audio files, you can call this method to play the audio in the dynamic PPT slides using the audio mixing method of the Agora RTC SDK.
     *
     * If you implement and pass in the {@link AudioMixerBridge AudioMixerBridge} class when initializing the `WhiteSdk` instance, the SDK automatically sets `setEnableRtcIntercept(true)`. Therefore you do not need to call this method.
     *
     * @param enableRtcIntercept Whether to play the audio in a dynamic PPT using the audio mixing method of the Agora RTC SDK:
     * - `true`: Play the audio in dynamic PPT slides using the audio mixing method of the Agora RTC SDK.
     * - `false`: (Default) Do not use the audio mixing method of the Agora RTC SDK to play the audio in dynamic PPT slides.
     *
     */
    void setEnableRtcIntercept(boolean enableRtcIntercept) {
        this.enableRtcIntercept = enableRtcIntercept;
    }
    /// @endcond

    /// @cond test
    /**
     * Hidden in documentation.
     */
    public boolean isDisableDeviceInputs() {
        return disableDeviceInputs;
    }
    /// @endcond

    /// @cond test
    /**
     *
     * Hidden in documentation.
     */
    public void setDisableDeviceInputs(boolean disableDeviceInputs) {
        this.disableDeviceInputs = disableDeviceInputs;
    }
    /// @endcond

    /**
     * Sets the rendering mode for drawings.
     *
     * @since 2.8.0
     *
     * To optimize the rendering of drawings on the whiteboard, the SDK adds canvas rendering mode since v2.8.0 and sets canvas rendering mode as the default rendering mode since v 2.9.0.
     *
     * @note
     * The SDK automatically switches the default rendering mode to `svg` for devices running on Android 6.1 to Android 8.1, because these devices cannot support canvas rendering mode.
     *
     * @param renderEngine The rendering mode for drawings. See {@link RenderEngineType RenderEngineType}.
     */
    public void setRenderEngine(RenderEngineType renderEngine) {
        this.renderEngine = renderEngine;
    }

    /**
     * Gets the rendering mode for drawings.
     *
     * @return The rendering mode for drawings. See {@link RenderEngineType RenderEngineType}.
     */
    public RenderEngineType getRenderEngine() {
        return renderEngine;
    }

    /**
     * Gets the parameters set for dynamic PPT slides.
     *
     * @return The parameters set for the dynamic PPT. See {@link PptParams PptParams}.
     */
    public PptParams getPptParams() {
        return pptParams;
    }

    /**
     * Sets parameters for dynamic PPT slides.
     *
     * @param pptParams Parameters set for dynamic PPT slides. See {@link PptParams PptParams}.
     */
    public void setPptParams(PptParams pptParams) {
        this.pptParams = pptParams;
    }

    /**
     * Gets custom fonts.
     *
     * @return The names and addresses of custom fonts.
     */
    public HashMap<String, String> getFonts() {
        return fonts;
    }

    /**
     * Sets custom fonts.
     *
     * @since 2.2.0
     *
     * To display unconventional fonts in dynamic PPT slides, you can call this method to pass in the URL addresses of the font files when initializing the `WhiteSdk` instance.
     *
     * @note
     * Before calling this method, you need to upload each font file to your app server or a third-party cloud storage and generate a URL address.
     *
     * @param fonts Custom fonts in key-value pairs. The `key` is the font name and the `value` is the URL address of the font file. For example, `"Calibri", "https://your-cdn.com /Calibri.ttf"`.
     */
    public void setFonts(HashMap<String, String> fonts) {
        this.fonts = fonts;
    }

    /**
     * Gets whether to preload all image resources in dynamic PPT slides when loading the homepage of the slides.
     *
     * @return Whether to preload all image resources in dynamic PPT slides when loading the homepage of the slides:
     * - `true`: Preload all image resources in dynamic PPT slides when loading the homepage of the slides.
     * - `false`: Do not preload all image resources in dynamic PPT slides when loading the homepage of the slides.
     */
    public boolean isPreloadDynamicPPT() {
        return preloadDynamicPPT;
    }

    /**
     * Sets whether to preload all image resources in dynamic PPT slides when loading the homepage of the slides.
     *
     * @note
     * Agora does not recommend setting `setPreloadDynamicPPT(true)`, because the setting may slow down the PPT display.
     *
     * @param preloadDynamicPPT Whether to preload all image resources in dynamic PPT slides when loading the homepage of the slides:
     * - `true`: Preload all image resources in dynamic PPT slides when loading the homepage of the slides.
     * - `false`: Do not preload all image resources in dynamic PPT slides when loading the homepage of the slides.
     */
    public void setPreloadDynamicPPT(boolean preloadDynamicPPT) {
        this.preloadDynamicPPT = preloadDynamicPPT;
    }

    private void setupNativeTags() {
        __nativeTags.put("nativeVersion", WhiteSdk.Version());
        __nativeTags.put("platform", "android API " + Build.VERSION.SDK_INT);
    }

    /**
     * Initializes the `WhiteSdkConfiguration` object.
     *
     * @param appIdentifier The unique app identifier issued to your Interactive Whiteboard project by Agora.  See [Get an App Identifier](https://docs.agora.io/en/whiteboard/enable_whiteboard?platform=Android&versionId=7b951120-9d0b-11eb-934a-83674cc9d04a#get-an-app-identifier).
     * @param log Whether to enable debug logging:
     * - `true`: Enable debug logging.
     * - `false`: (Default) Disable debug logging.
     *
     * Debug logs contain only the logs of the following methods:
     * <ul>
     * <li>WhiteSdk</li>
     * <li>joinRoom</li>
     * <li>createPlayer</li>
     * </ul>.
     */
    public WhiteSdkConfiguration(String appIdentifier, boolean log) {
        this(appIdentifier);
        this.log = log;
    }

    /**
     * Initializes the `WhiteSdkConfiguration` object.
     *
     * @param appIdentifier The unique app identifier issued to your Interactive Whiteboard project by Agora. See [Get an App Identifier](https://docs.agora.io/en/whiteboard/enable_whiteboard?platform=Android&versionId=7b951120-9d0b-11eb-934a-83674cc9d04a#get-an-app-identifier).
     */
    public WhiteSdkConfiguration(String appIdentifier) {
        this.appIdentifier = appIdentifier;
        if (VERSION.SDK_INT >= Build.VERSION_CODES.N && VERSION.SDK_INT < Build.VERSION_CODES.P) {
            renderEngine = RenderEngineType.svg;
        }
        setupNativeTags();
    }


    /**
     * Gets log options.
     *
     * @return The set log options. See {@link com.herewhite.sdk.domain.LoggerOptions LoggerOptions}.
     */
    public LoggerOptions getLoggerOptions() {
        return loggerOptions;
    }

    /**
     * Sets log options.
     *
     * @since 2.4.2
     *
     * @param loggerOptions Log options. See {@link com.herewhite.sdk.domain.LoggerOptions LoggerOptions}.
     */
    public void setLoggerOptions(LoggerOptions loggerOptions) {
        this.loggerOptions = loggerOptions;
    }

    /**
     * Hidden in documentation.
     *
     * @return
     */
    public boolean isRouteBackup() {
        return routeBackup;
    }

    /// @cond test
    /**
     * Hidden in documentation.
     */
    public void setRouteBackup(boolean routeBackup) {
        this.routeBackup = routeBackup;
    }
    /// @endcond

    /// @cond test
    /**
     * Hidden in documentation.
     */
    public DeviceType getDeviceType() {
        return deviceType;
    }
    /// @endcond

    /**
     * Sets whether to display a user avatar.
     *
     * To display a user avatar, ensure that you pass in a key-value pair for the avatar in the `userPayload` object
     * and call {@link com.herewhite.sdk.RoomParams#setUserPayload(Object userPayload) setUserPayload}.
     *
     * @param userCursor Whether to display the user avatar:
     * - `true`: Display the user avatar.
     * - `false`: (Default) Do not display the user avatar.
     */
    public void setUserCursor(boolean userCursor) {
        this.userCursor = userCursor;
    }

    /**
     * Gets whether to display a user avatar.
     *
     * @return Whether to display a user avatar.
     * - `true`: Display the user avatar.
     * - `false`: Do not display the user avatar.
     */
    public boolean isUserCursor() {
        return userCursor;
    }

    /**
     * Gets whether to receive only callbacks of remote user state changes.
     *
     * @return Whether to receive only callbacks of remote user state changes:
     * - `true`: The local user receives only callbacks of remote user state changes and does not receive callbacks of their own state changes.
     * - `false`: The local user receives callbacks of remote user state changes as well as callbacks of their own state changes.
     */
    public boolean isOnlyCallbackRemoteStateModify() {
        return onlyCallbackRemoteStateModify;
    }

    /**
     * Enables/Disables receiving only callbacks of remote user state changes.
     *
     * @param onlyCallbackRemoteStateModify Whether to receive only callbacks of remote user state changes:
     * - `true`: The local user receives only callbacks of remote user state changes and does not receive callbacks of their own state changes.
     * - `false`: (Default) The local user receives callbacks of remote user state changes as well as callbacks of their own state changes.
     */
    public void setOnlyCallbackRemoteStateModify(boolean onlyCallbackRemoteStateModify) {
        this.onlyCallbackRemoteStateModify = onlyCallbackRemoteStateModify;
    }

    /// @cond test
    /**
     * Hidden in documentation.
     */
    public void setDeviceType(DeviceType deviceType) {
        this.deviceType = deviceType;
    }
    /// @endcond

    /**
     * Gets whether debug logging is enabled.
     *
     * @return Whether debug logging is enabled.
     * - `true`: Enabled.
     * - `false`: Disabled.
     */
    public boolean isLog() {
        return log;
    }

    /**
     * Enables/Disables debug logging.
     *
     * Debug logs contains only the logs of the following methods:
     * - `WhiteSdk`
     * - `joinRoom`
     * - `createPlayer`
     *
     * @param log Whether to enable debug logging:
     * - `true`: Enable debug logging.
     * - `false`: (Default) Disable debug logging.
     */
    public void setLog(boolean log) {
        this.log = log;
    }

    /**
     * Gets whether image URL interception is enabled.
     *
     * @return Whether image URL interception is enabled.
     * - `true`: Enabled.
     * - `false`: Disabled.
     */
    public boolean isEnableInterrupterAPI() {
        return enableInterrupterAPI;
    }

    /**
     * Enables/Disables image URL interception.
     *
     * This method enables the SDK to trigger the {@link com.herewhite.sdk.CommonCallbacks#urlInterrupter urlInterrupter} callback when an image is inserted into the whiteboard scene.
     * You can get the original URL address of the image and replace the original URL address with a specified URL address in the callback.
     *
     * @note
     * Agora does not recommend calling `setEnableInterrupterAPI(true)` because the SDK triggers the {@link com.herewhite.sdk.CommonCallbacks#urlInterrupter urlInterrupter} callback too frequently when it is enabled.
     *
     * @param enableInterrupterAPI Whether to enable image URL interception.
     * - `true`: Enable image URL interception.
     * - `false`: (Default) Disable image URL interception.
     */
    public void setEnableInterrupterAPI(boolean enableInterrupterAPI) {
        this.enableInterrupterAPI = enableInterrupterAPI;
    }

    /**
     * Gets whether the SDK listens for image loading failure events.
     *
     * @return Whether the SDK listens for image loading failure events.
     * - `true`: Listen for image loading failure events.
     * - `false`: Do not listen for image loading failure events.
     */
    public boolean isEnableImgErrorCallback() {
        return enableImgErrorCallback;
    }

    /**
     * Listens for image loading failure events.
     *
     * @param enableImgErrorCallback Whether to listen for image loading failure events:
     * - `true`: Listen for image loading failure events. Image loading failure events are reported in the {@link CommonCallback#onMessage(JSONObject) onMessage} callback.
     * - `false`: (Default) Do not listen for image loading failure events.
     */
    public void setEnableImgErrorCallback(boolean enableImgErrorCallback) {
        this.enableImgErrorCallback = enableImgErrorCallback;
    }

    private boolean enableImgErrorCallback;
}
