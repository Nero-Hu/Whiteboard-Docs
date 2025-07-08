package com.herewhite.sdk.domain;

/**
 * Configurations for the view rectangle.
 *
 * @since 2.2.0
 *
 * The view rectangle defines a rectangular area that the view must cover.
 * After you set a view rectangle, the SDK automatically adjusts the view to fully contain the rectangular area, so as to ensure contents within the rectangle area are completely displayed.
 *
 * You can set a view rectangle according to the size of a PPT slide or image to be displayed, to ensure the same content is displayed completely on screens of different sizes.
 *
 */
public class RectangleConfig extends WhiteObject {
    private Double originX;
    private Double originY;
    private Double width;
    private Double height;

    /**
     * The `RectangleConfig` constructor.
     *
     * In this method, pass in the `width`, `height`, and `mode` parameters. Based on the `width` and `height` you pass in, the SDK calculates `originX` and `originY`, the X and Y coordinates of the top left corner of the view rectangle in the world coordinate system, in the following ways:
     * - `originX = - width / 2.0d`
     * - `originY = - height / 2.0d`
     *
     * You can use this method to quickly display a PPT slide completely.
     *
     * @param width  The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
     * @param height The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
     * @param mode   The animation mode of the view rectangle. See {@link AnimationMode}.
     */
    public RectangleConfig(Double width, Double height, AnimationMode mode) {
        this.width = width;
        this.height = height;
        this.originX = -width / 2.0d;
        this.originY = -height / 2.0d;
        this.animationMode = mode;
    }

    /**
     * The `RectangleConfig` constructor.
     *
     * In this method, pass in the `width`, `height`, and `mode` parameters. Based on the `width` and `height` you pass in, the SDK calculates `originX` and `originY`, the X and Y coordinates of the top left corner of the view rectangle in the world coordinate system, in the following ways:
     * - `originX = - width / 2.0d`
     * - `originY = - height / 2.0d`
     * <p>
     * This method does not support setting the animation mode of the view rectangle. By default, the SDK sets the animation mode to `Continuous`.
     * <p>
     * You can use this method to quickly display a PPT slide completely.
     *
     * @param width  The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
     * @param height The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
     */
    public RectangleConfig(Double width, Double height) {
        this(width, height, AnimationMode.Continuous);
    }

    /**
     * The `RectangleConfig` constructor.
     * <p>
     * In this method, pass in the `originX`, `originY`, `width`, and `height` parameters. Based on these parameters, the SDK determines the position and size of the view rectangle in the world coordinate system.
     * <p>
     * This method does not support setting the animation mode of the view rectangle. By default, the SDK sets the animation mode to `Continuous`.
     *
     * @param originX The X coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     * @param originY The Y coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     * @param width   The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
     * @param height  The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
     */
    public RectangleConfig(Double originX, Double originY, Double width, Double height) {
        this(originX, originY, width, height, AnimationMode.Continuous);
    }

    /**
     * The `RectangleConfig` constructor.
     * <p>
     * In this method, pass in the `originX`, `originY`, `width`, `height`, and `mode` parameters.
     * Based on these parameters, the SDK determines the position and size of the view rectangle in the world coordinate system.
     *
     * @param originX The X coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     * @param originY The Y coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     * @param width   The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
     * @param height  The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
     * @param mode    The animation mode of the view rectangle. See {@link AnimationMode}.
     */
    public RectangleConfig(Double originX, Double originY, Double width, Double height, AnimationMode mode) {
        this.originX = originX;
        this.originY = originY;
        this.width = width;
        this.height = height;
        this.animationMode = mode;
    }

    /**
     * Gets the X coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The X coordinate of the top left corner of the view rectangle in the world coordinate system.
     */
    public Double getOriginX() {
        return originX;
    }

    /**
     * Sets the X coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param originX The X coordinate of the top left corner of the view rectangle in the world coordinate system.
     */
    public void setOriginX(Double originX) {
        this.originX = originX;
    }

    /**
     * Gets the Y coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The Y coordinate of the top left corner of the view rectangle in the world coordinate system.
     */
    public Double getOriginY() {
        return originY;
    }

    /**
     * Sets the Y coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param originY The Y coordinate of the top left corner of the view rectangle in the world coordinate system.
     */
    public void setOriginY(Double originY) {
        this.originY = originY;
    }

    /**
     * Gets the width of the view rectangle.
     *
     * @return The width of the view rectangle.
     */
    public Double getWidth() {
        return width;
    }

    /**
     * Sets the width of the view rectangle.
     *
     * @param width The width of the view rectangle.
     */
    public void setWidth(Double width) {
        this.width = width;
    }

    /**
     * Gets the height of the view rectangle.
     *
     * @return The height of the view rectangle.
     */
    public Double getHeight() {
        return height;
    }

    /**
     * Sets the height of the view rectangle.
     *
     * @param height The height of the view rectangle.
     */
    public void setHeight(Double height) {
        this.height = height;
    }

    /**
     * Gets the animation mode of the view rectangle
     *
     * @return The animation mode of the view rectangle. See {@link AnimationMode}.
     */
    public AnimationMode getAnimationMode() {
        return animationMode;
    }

    /**
     * Sets the animation mode of the view rectangle.
     *
     * @param animationMode The animation mode of the view rectangle. See {@link AnimationMode}.
     */
    public void setAnimationMode(AnimationMode animationMode) {
        this.animationMode = animationMode;
    }

    private AnimationMode animationMode;
}
