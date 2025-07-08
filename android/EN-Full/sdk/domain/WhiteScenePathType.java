package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * The scene path types.
 *
 * @since 2.6.4
 */
public enum WhiteScenePathType {
    /**
     * The queried path does not exist.
     */
    @SerializedName("none")
    Empty,
    /**
     * The queried path is the path of a scene.
     */
    @SerializedName("page")
    Page,
    /**
     * The queried path is the path of a scene directory.
     */
    @SerializedName("dir")
    Dir,
}
