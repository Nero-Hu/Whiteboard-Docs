package com.herewhite.sdk.domain;

/**
 * The `CameraBound` class, for setting the boundaries for the view.
 *
 * The area enclosed by the boundaries is the viewable area. Within the viewable area, the user can flexibly move or zoom the view.
 * When the user tries to move the view beyond the viewable area, the SDK automatically drags the view back into the viewable area.
 *
 * @since 2.5.0
 */
public class CameraBound extends WhiteObject {

    /**
     * Gets the X coordinate of the center of the viewable area in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The X coordinate of the center of the viewable area in the world coordinate system.
     */
    public Double getCenterX() {
        return centerX;
    }

    /**
     * Sets the X coordinate of the center of the viewable area in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param centerX The X coordinate of the center of the viewable area in the world coordinate system. The default value is `0.0`.
     */
    public void setCenterX(Double centerX) {
        this.centerX = centerX;
    }

    /**
     * Gets the Y coordinate of the center of the viewable area in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The Y coordinate of the center of the viewable area in the world coordinate system.
     */
    public Double getCenterY() {
        return centerY;
    }

    /**
     * Sets the Y coordinate of the center of the viewable area in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param centerY The Y coordinate of the center of the viewable area in the world coordinate system. The default value is `0.0`.
     */
    public void setCenterY(Double centerY) {
        this.centerY = centerY;
    }

    /**
     * Gets the width of the viewable area.
     *
     * @return The width (pixels) of the viewable area.
     */
    public Double getWidth() {
        return width;
    }

    /**
     * Sets the width of the viewable area.
     *
     * @param width The width (pixels) of the viewable area. If you do not set this parameter, the viewable area has no width limit.
     */
    public void setWidth(Double width) {
        this.width = width;
    }

    /**
     * Gets the height of the viewable area.
     *
     * @return The height (pixels) of the viewable area.
     */
    public Double getHeight() {
        return height;
    }

    /**
     * Sets the height of the viewable area.
     *
     * @param height The height (pixels) of the viewable area. If you do not set this parameter, the viewable area has no height limit.
     */
    public void setHeight(Double height) {
        this.height = height;
    }


    /**
     * Gets the scale mode and the maximum scale factor of the viewable area.
     *
     * @return The scale mode and the maximum scale factor of the viewable area. See {@link ContentModeConfig ContentModeConfig}.
     */
    public ContentModeConfig getMaxContentMode() {
        return maxContentMode;
    }

    /**
     * Sets the scale mode and the maximum scale factor of the viewable area.
     *
     * @param maxContentMode The scale mode and the maximum scale factor of the viewable area. See {@link ContentModeConfig ContentModeConfig}.
     */
    public void setMaxContentMode(ContentModeConfig maxContentMode) {
        this.maxContentMode = maxContentMode;
    }


    /**
     * Gets the scale mode and the minimum scale factor of the viewable area.
     *
     * @return The scale mode and the minimum scale factor of the viewable area. See {@link ContentModeConfig ContentModeConfig}.
     */
    public ContentModeConfig getMinContentMode() {
        return minContentMode;
    }

    /**
     * Sets the scale mode and the minimum scale factor of the viewable area.
     *
     * @param minContentMode The scale mode and the minimum scale factor of the viewable area. See {@link ContentModeConfig ContentModeConfig}.
     */
    public void setMinContentMode(ContentModeConfig minContentMode) {
        this.minContentMode = minContentMode;
    }

    /**
     * Gets the resistance felt by the user when the user moves or scales up the view beyond the viewable area.
     *
     * @return The resistance coefficient.
     */
    public Double getDamping() {
        return damping;
    }

    /**
     * Sets the resistance felt by the user when the user moves or scales up the view beyond the viewable area.
     *
     * @param damping The resistance coefficient. The value range is [0.0,1.0]. The higher the value, the larger the resistance felt by the user.
     * - `0.0`: The user feels no resistance when moving or scaling up the view beyond the viewable area. Once the user stops moving or scaling up, the view returns to its original position.
     * - `1.0`: The user cannot move or scale up the view beyond the viewable area.
     */
    public void setDamping(Double damping) {
        this.damping = damping;
    }

    private Double damping;
    private Double centerX;
    private Double centerY;
    private Double width;
    private Double height;
    private ContentModeConfig maxContentMode;
    private ContentModeConfig minContentMode;

    public CameraBound() {
        super();
    }

    /**
     * Initializes the viewable area.
     *
     * @param miniScale The minimum scale factor of the viewable area.
     * @param maxScale  The maximum scale factor of the viewable area.
     */
    public CameraBound(Double miniScale, Double maxScale) {
        this();
        ContentModeConfig miniConfig = new ContentModeConfig();
        miniConfig.setScale(miniScale);
        this.minContentMode = miniConfig;

        ContentModeConfig maxConfig = new ContentModeConfig();
        maxConfig.setScale(maxScale);
        this.maxContentMode = maxConfig;

    }
}
