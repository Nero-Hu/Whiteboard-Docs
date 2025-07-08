package com.herewhite.sdk;

import com.herewhite.sdk.domain.SDKError;

import org.json.JSONObject;

/**
 * `CommonCallback`，用于 SDK 向 app 发送回调事件通知。
 * <p>
 * 实时房间和回放房间都可以继承该接口下的回调方法。
 *
 * @since 2.9.13
 */
public interface CommonCallback {

    /**
     * SDK 出现未捕获的全局错误回调。
     *
     * @param args 错误信息。
     */
    default void throwError(Object args) {

    }

    /**
     * 图片拦截回调。
     *
     * @since 2.9.14
     *
     * 该回调默认禁用。你可以在初始化白板 SDK 时，通过 {@link WhiteSdkConfiguration#setEnableInterrupterAPI setEnableInterrupterAPI}(true) 方法开启。
     *
     * 开启后，在白板中插入图片时，SDK 会触发该回调，报告图片的原 URL 地址。你可以在该回调中将原 URL 地址替换成指定的 URL 地址。
     *
     * @note 开启后，SDK 会频繁触发该回调，因此 Agora 不推荐开启该回调；在 Android 平台，你可以使用 WebView 的拦截功能进行图片拦截。
     *
     * @param sourceUrl 原 URL 地址。
     *
     * @return 替换后的图片地址。请确保在返回值中进行传参。
     */
    default String urlInterrupter(String sourceUrl) {
        return sourceUrl;
    }

    /**
     * 播放动态 PPT 中的音视频回调。
     *
     * @since 2.9.13
     */
    default void onPPTMediaPlay() {

    }

    /**
     * 暂停播放动态 PPT 中的音视频回调。
     *
     * @since 2.9.13
     */
    default void onPPTMediaPause() {

    }

    /**
     * 接收到网页发送的消息回调。
     *
     * @since 2.11.4
     *
     * 当本地用户收到了网页（如 iframe 插件、动态 PPT）发送的消息时会触发该回调。
     *
     * @note 不保证所有用户都能接收到该回调。
     *
     * @param object JSON 格式的消息。只有当消息为 JSON 格式时，本地用户才能收到。
     */
    default void onMessage(JSONObject object) {

    }

    /**
     * SDK 初始化失败回调。
     *
     * @since 2.9.14
     *
     * 如果 SDK 初始化失败，调用加入实时房间或回放房间时会处于一直无响应状态，需要重新初始化 SDK。
     * SDK 初始化失败可能由以下原因导致：
     * - 初始化 SDK 时候，网络异常，导致获取配置信息失败。
     * - 传入了不合法的 App Identifier。
     *
     * @param error 错误信息。
     *
     */
    default void sdkSetupFail(SDKError error) {

    }

    /**
     * 获取 SDK 输出的本地调试日志。
     *
     * @since 2.13.22
     *
     * 成功调用 {@link WhiteSdkConfiguration#setLog(boolean) setLog}(true) 后，SDK 会触发该回调，向你发送本地调试日志。
     *
     * 如果你需要关闭该回调，可以设置 `setLog(false)`。
     *
     * @note
     * 设置 `setLog(false)` 后，SDK 会停止通过 `onLogger` 回调发送本地调试日志，但仍然会通过该回调发送 [`video-js-plugin`](https://www.npmjs.com/package/@netless/video-js-plugin) 插件的日志信息。
     *
     * @param object JSON 对象格式的日志消息，每条日志消息包含以下 key：
     * - `funName`：功能名称。
     * - `params`：具体的参数设置。
     *
     * 例如，`{"funName": "joinRoom", "params": {"isWritable": 1, "region": "cn-hz"}}`。
     */
    default void onLogger(JSONObject object) {

    }
}
