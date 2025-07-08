package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * 移动或缩放视角时的动画模式。
 *
 * @since 2.3.2
 */
public enum AnimationMode {
    /**
     * `Continuous`：（默认）渐变模式。
     */
    //@SerializedName("continuous")
    Continuous,
    /**
     * `Immediately`：瞬间切换模式。
     */
    //@SerializedName("immediately")
    Immediately
}
