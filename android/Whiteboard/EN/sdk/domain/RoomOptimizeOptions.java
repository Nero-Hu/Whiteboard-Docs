package com.herewhite.sdk.domain;


/**
 * Whiteboard rendering optimization options.
 */
public class RoomOptimizeOptions extends WhiteObject {

    /**
     * Refresh interval for whiteboard drawing, ranging from [0,120] (ms). It is recommended to pass in multiples of 20.
     * A lower refresh interval results in smoother stroke display but higher performance overhead.
     * A higher refresh interval results in more laggy strokes but lower performance consumption.
     * For devices with poor performance or large screens, it is recommended to set a larger value, such as 60.
     */
    private Integer useLowTaskAnimation;

    /**
     * Whether to use a single canvas:
     *  - `true`: Use a single canvas and apply floating canvas optimization strategy.
     *  - `false`: Use double canvases for alternating drawing.
     * 
     * By default, the whiteboard uses two canvases to avoid flickering on some devices during drawing.
     * Using a single canvas for drawing can prevent redrawing and reduce performance consumption.
     */
    private Boolean useSinglerCanvas;

    public Integer getUseLowTaskAnimation() {
        return useLowTaskAnimation;
    }

    public void setUseLowTaskAnimation(Integer useLowTaskAnimation) {
        this.useLowTaskAnimation = useLowTaskAnimation;
    }

    public Boolean getUseSinglerCanvas() {
        return useSinglerCanvas;
    }

    public void setUseSinglerCanvas(Boolean useSinglerCanvas) {
        this.useSinglerCanvas = useSinglerCanvas;
    }
}
