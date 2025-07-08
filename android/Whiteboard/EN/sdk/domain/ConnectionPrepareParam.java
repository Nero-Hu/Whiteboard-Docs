package com.herewhite.sdk.domain;

import java.util.Objects;

/**
 * The whiteboard connection preparation parameters.
 */
public class ConnectionPrepareParam {
    /**
     * The unique identifier for a whiteboard project. See [Get security credentials for your whiteboard project](https://docs.agora.io/en/interactive-whiteboard/develop/enable-whiteboard?platform=android#get-security-credentials-for-your-whiteboard-project) for details.
     * Needs to be consistent with the setting in {@link com.herewhite.sdk.WhiteSdkConfiguration#WhiteSdkConfiguration(String)}.
     */
    private final String appId;

    /**
     * The region where the user's app is located, see {@link Region}.
     */
    private final Region region;

    /**
     * Expiration time, no further connection check within the time. Default is 12 hours.
     */
    private final Long expire;

    /**
     * Creates a {@link ConnectionPrepareParam} instance.
     * @param appId The unique identifier for a whiteboard project, which can be obtained from the console. See [Get security credentials for your whiteboard project](https://docs.agora.io/en/interactive-whiteboard/develop/enable-whiteboard?platform=android#get-security-credentials-for-your-whiteboard-project).
     * @param region The region where the user's app is located, see {@link Region}.
     *
     * By default, there is no further connection check within 12 hours.
     */
    public ConnectionPrepareParam(String appId, Region region) {
        this(appId, region, 12 * 60 * 60 * 1000L);
    }

    /**
     * Creates a {@link ConnectionPrepareParam} instance.
     * @param appId The unique identifier for a whiteboard project, which can be obtained from the console. See [Get security credentials for your whiteboard project](https://docs.agora.io/en/interactive-whiteboard/develop/enable-whiteboard?platform=android#get-security-credentials-for-your-whiteboard-project).
     * @param region The region where the user's app is located, see {@link Region}.
     * @param expire Expiration time, no further connection check within the time. Default is 12 hours.
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
     * Gets the unique identifier for a whiteboard project.
     */
    public String getAppId() {
        return appId;
    }

    /**
     * Gets the region where the user's app is located.
     */
    public Region getRegion() {
        return region;
    }

    /**
     * Gets the expiration time.
     */
    public Long getExpire() {
        return expire;
    }
}
