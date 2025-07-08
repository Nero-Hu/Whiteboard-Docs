package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * Data center.
 */
public enum Region {
    /**
     * `cn` (`cn-hz`): Hangzhou, China.
     *
     * This data center provides services to the areas that are not covered by other data centers.
     */
    // @SerializedName("cn-hz")
    cn,
    /**
     * `us` (`us-sv`): Silicon Valley, US.
     *
     * This data center provides services to North America and South America.
     */
    // @SerializedName("us-sv")
    us,
    /**
     * `sg`: Singapore.
     *
     * This data center provides services to Singapore, East Asia, and Southeast Asia.
     */
    // @SerializedName("sg")
    sg,
    /**
     * `in_mum`: Mumbai, India.
     *
     * This data center provides services to India.
     */
    // @SerializedName("in-mum")
    in_mum,
    /**
     * `eu`: Frankfurt, Europe.
     *
     * This data center provides services to Europe.
     */
    // @SerializedName("eu")
    eu;
}
