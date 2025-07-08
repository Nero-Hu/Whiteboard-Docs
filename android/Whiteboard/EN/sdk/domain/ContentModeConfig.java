package com.herewhite.sdk.domain;


import com.google.gson.annotations.SerializedName;

/**
 * Configurations for the scale mode and scale factor of the viewable area.
 *
 * @since 2.5.0
 */
public class ContentModeConfig extends WhiteObject {

    public ContentModeConfig() {
        scale = 1d;
        space = 0d;
        mode = ScaleMode.CENTER;
    }

    /**
     * The scale mode of the viewable area.
     */
    public enum ScaleMode {
        /**
         * `CENTER`: (Default) Resizes the viewable area by the specified `scale`.
         */
        //SerializedName("Scale")
        CENTER,
        /**
         * `CENTER_INSIDE`: Resizes the viewable area proportionately until its longer sides meet with the screen sides perpendicular to them, so that the viewable area is completely displayed on the screen.
         */
        //SerializedName("AspectFit")
        CENTER_INSIDE,
        /**
         * `CENTER_INSIDE_SCALE`: Resizes the viewable area proportionately until its longer sides meet with the screen sides perpendicular to them, so that the viewable area is completely displayed on the screen.
         * Then, resizes the viewable area by a specified scale factor.
         */
        //SerializedName("AspectFitScale")
        CENTER_INSIDE_SCALE,
        /**
         * `CENTER_INSIDE_SPACE`: Resizes the viewable area proportionately until its longer sides meet with the screen sides perpendicular to them, so that the viewable area is completely displayed on the screen.
         * Then, adds the specified spaces around the viewable area.
         */
        //SerializedName("AspectFitSpace")
        CENTER_INSIDE_SPACE,
        /**
         * `CENTER_CROP`: Resizes the viewable area proportionately until its shorter sides meet with the screen sides perpendicular to them, so that the viewable area completely covers the screen.
         */
        //SerializedName("AspectFill")
        CENTER_CROP,
        /**
         * `CENTER_CROP_SPACE`: Resizes the viewable area proportionately until its shorter sides meet with the screen sides perpendicular to them, so that the viewable area completely covers the screen.
         * Then, resizes the viewable area by the specified scale factor.
         */
        //SerializedName("AspectFillScale")
        CENTER_CROP_SPACE,
    }

    /**
     * Gets the scale factor of the viewable area.
     *
     * @return The scale factor of the viewable area.
     */
    public Double getScale() {
        return scale;
    }

    /**
     * Sets the scale factor of the viewable area.
     *
     * @param scale The scale factor of the viewable area. The default value is `1.0`, which means keeping the original size.
     *
     * @note This method takes effect only when the scale mode is set as one the following values:
     * - {@link ScaleMode#CENTER}
     * - {@link ScaleMode#CENTER_INSIDE}
     * - {@link ScaleMode#CENTER_INSIDE_SCALE}
     * - {@link ScaleMode#CENTER_CROP_SPACE}
     */
    public void setScale(Double scale) {
        this.scale = scale;
    }

    /**
     * Gets the space added around the viewable area.
     *
     * @return The space (pixels) added around the viewable area.
     */
    public Double getSpace() {
        return space;
    }

    /**
     * Adds the space around the viewable area.
     *
     * @note This method takes effect only when the scale mode is set as {@link ScaleMode#CENTER_INSIDE_SPACE}.
     *
     * @param space The space (pixels) around the viewable area. The default value is `0`.
     *
     */
    public void setSpace(Double space) {
        this.space = space;
    }

    /**
     * Gets the scale mode of the viewable area.
     *
     * @return The scale mode of the viewable area. See {@link ContentModeConfig#ScaleMode ScaleMode}.
     */
    public ScaleMode getMode() {
        return mode;
    }

    /**
     * Sets the scale mode of the viewable area.
     *
     * @param mode The scale mode of the viewable area. See {@link ContentModeConfig#ScaleMode ScaleMode}.
     */
    public void setMode(ScaleMode mode) {
        this.mode = mode;
    }

    private Double scale;
    private Double space;
    private ScaleMode mode;
}
