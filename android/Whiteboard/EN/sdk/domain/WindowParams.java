package com.herewhite.sdk.domain;

import java.util.HashMap;


/**
 * The `WindowParams` class. Used to configure whiteboard windows. 
 */
public class WindowParams extends WhiteObject {

    /**
     * Whether the window is displayed in fullscreen mode.
     */
    private Boolean fullscreen;


    /**
     * Gets whether the window is displayed in fullscreen mode.
     */
    public Boolean getFullscreen() {
        return fullscreen;
    }

    /**
     * Sets whether the window is displayed in fullscreen mode.
     */
    public WindowParams setFullscreen(Boolean fullscreen) {
        this.fullscreen = fullscreen;
        return this;
    }
}
