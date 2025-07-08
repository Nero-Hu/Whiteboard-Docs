package com.herewhite.sdk.domain;

import java.util.HashMap;


/**
 * 白板窗口相关配置。
 */
public class WindowParams extends WhiteObject {

    /**
     * 是否全屏。
     */
    private Boolean fullscreen;


    /**
     * 获取当前窗口是否全屏。
     */
    public Boolean getFullscreen() {
        return fullscreen;
    }

    /**
     * 设置当前窗口是否为全屏。
     */
    public WindowParams setFullscreen(Boolean fullscreen) {
        this.fullscreen = fullscreen;
        return this;
    }
}
