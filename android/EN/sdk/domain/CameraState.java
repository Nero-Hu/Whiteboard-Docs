package com.herewhite.sdk.domain;

/**
 * The state of the view.
 */
public class CameraState extends WhiteObject {
    private Double centerX;

    /**
     * Gets the X coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The X coordinate of the center of the view in the world coordinate system. The initial value is `0.0`.
     */
    public Double getCenterX() {
        return centerX;
    }

    /**
     * Gets the Y coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The Y coordinate of the center of the view in the world coordinate system. The initial value is `0.0`.
     */
    public Double getCenterY() {
        return centerY;
    }

    /**
     * Gets the scale factor of the view.
     *
     * @return The scale factor of the view. The initial value is `1.0`.
     */
    public Double getScale() {
        return scale;
    }

    private Double centerY;
    private Double scale;
}
