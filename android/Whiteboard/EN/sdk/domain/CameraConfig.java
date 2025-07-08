package com.herewhite.sdk.domain;

/**
 * Configurations for the view.
 *
 * @since 2.2.0
 */
public class CameraConfig extends WhiteObject {

    /**
     * Gets the animation mode of the view.
     *
     * @since 2.3.2
     *
     * @return The animation mode of the view. See {@link AnimationMode}.
     */
    public AnimationMode getAnimationMode() {
        return animationMode;
    }

    /**
     * Sets the animation mode of the view.
     *
     * @since 2.3.2
     *
     * @param animationMode The animation mode of the view. See {@link AnimationMode}.
     */
    public void setAnimationMode(AnimationMode animationMode) {
        this.animationMode = animationMode;
    }

    private AnimationMode animationMode;

    /**
     * Gets the X coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The X coordinate of the center of the view in the world coordinate system.
     */
    public Double getCenterX() {
        return centerX;
    }

    /**
     * Sets the X coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param centerX The X coordinate of the center of the view in the world coordinate system. The default value is 0.0.
     */
    public void setCenterX(Double centerX) {
        this.centerX = centerX;
    }

    /**
     * Gets the Y coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The Y coordinate of the center of the view in the world coordinate system.
     */
    public Double getCenterY() {
        return centerY;
    }

    /**
     * Sets the Y coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param centerY The Y coordinate of the center of the view in the world coordinate system. The default value is 0.0.
     */
    public void setCenterY(Double centerY) {
        this.centerY = centerY;
    }

    /**
     * Gets the scale factor of the view.
     *
     * @return The scale factor of the view.
     */
    public Double getScale() {
        return scale;
    }

    /**
     * Sets the scale factor of the view.
     *
     * @param scale The scale factor of the view. The default value is `1.0`.
     */
    public void setScale(Double scale) {
        this.scale = scale;
    }

    private Double centerX;
    private Double centerY;
    private Double scale;
}
