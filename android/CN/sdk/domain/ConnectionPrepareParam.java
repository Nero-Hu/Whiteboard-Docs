package com.herewhite.sdk.domain;

import java.util.Objects;

/**
 * 白板预连接参数。
 */
public class ConnectionPrepareParam {
    /**
     * 白板项目的唯一标识，详见[获取白板项目的 App Identifier](/doc/whiteboard/ios/whiteboard-sdk/get-started/enable-service#获取互动白板项目的安全密钥)。
     * 需要与 {@link com.herewhite.sdk.WhiteSdkConfiguration#WhiteSdkConfiguration(String)} 设置保持一致。
     */
    private final String appId;

    /**
     * 用户的 App 所在的区域，详见 {@link Region}。
     */
    private final Region region;

    /**
     * 过期时间, 在时间内不做再次检查。默认为 12 小时。
     */
    private final Long expire;

    /**
     * 创建一个 {@link ConnectionPrepareParam} 实例。
     * @param appId 白板项目的唯一标识，可在控制台获取，详见[获取白板项目的 App Identifier](/doc/whiteboard/ios/whiteboard-sdk/get-started/enable-service#获取互动白板项目的安全密钥)。
     * @param region 用户的 App 所在的区域，详见 {@link Region}。
     *
     * 默认在 12 小时内不再次检查连接。
     */
    public ConnectionPrepareParam(String appId, Region region) {
        this(appId, region, 12 * 60 * 60 * 1000L);
    }

    /**
     * 创建一个 {@link ConnectionPrepareParam} 实例。
     * @param appId 白板项目的唯一标识，可在控制台获取，详见[获取白板项目的 App Identifier](/doc/whiteboard/ios/whiteboard-sdk/get-started/enable-service#获取互动白板项目的安全密钥)。
     * @param region 用户的 App 所在的区域，详见 {@link Region}。
     * @param expire 过期时间, 在该时间内不再次检查连接。默认为 12 小时。
     */
    public ConnectionPrepareParam(String appId, Region region, Long expire) {
        this.appId = Objects.requireNonNull(appId, "App ID cannot be null");
        this.region = Objects.requireNonNull(region, "Region cannot be null");
        if (expire <= 0) {
            throw new IllegalArgumentException("Expire time must be positive");
        }
        this.expire = expire;
    }

    /**
     * 获取白板项目的唯一标识。
     */
    public String getAppId() {
        return appId;
    }

    /**
     * 获取用户的 App 所在的区域。
     */
    public Region getRegion() {
        return region;
    }

    /**
     * 获取过期时间。
     */
    public Long getExpire() {
        return expire;
    }
}
