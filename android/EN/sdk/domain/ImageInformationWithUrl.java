package com.herewhite.sdk.domain;

/** 
 * Position and sizing information for the image and the URL address of the image.
 */
public class ImageInformationWithUrl extends WhiteObject {

    public ImageInformationWithUrl() {
    }

    /**
     * The `ImageInformationWithUrl` constructor, for initializing an `ImageInformationWithUrl` object.
     *
     * @param centerX The X coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     * @param centerY The Y coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     * @param width   The width (px) of the image.
     * @param height  The height (px) of the image.
     * @param url     The URL address of the image. Ensure the application client can access the URL; otherwise, the image cannot be displayed.
     */
    public ImageInformationWithUrl(Double centerX, Double centerY, Double width, Double height, String url) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
        this.url = url;
    }

    private Double centerX;
    private Double centerY;
    private Double width;
    private Double height;
    private String url;

    /**
     * Gets the X coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The X coordinate of the center of the image in the world coordinate system.
     */
    public double getCenterX() {
        return centerX;
    }

    /**
     * Sets the X coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param centerX The X coordinate of the center of the image in the world coordinate system.
     */
    public void setCenterX(double centerX) {
        this.centerX = centerX;
    }

    /**
     * Gets the Y coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @return The Y coordinate of the center of the image in the world coordinate system.
     */
    public double getCenterY() {
        return centerY;
    }

    /**
     * Sets the Y coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param centerY The Y coordinate of the center of the image in the world coordinate system.
     */
    public void setCenterY(double centerY) {
        this.centerY = centerY;
    }

    /**
     * Gets the width of the image.
     *
     * @return The width (px) of the image.
     */
    public double getWidth() {
        return width;
    }

    /**
     * Sets the width of the image.
     *
     * @param width The width (px) of the image.
     * If the width of the image is greater than the boundary of the view, then users cannot see the parts that exceed the boundary.
     */
    public void setWidth(double width) {
        this.width = width;
    }

    /**
     * Gets the height of the image.
     *
     * @return The height (px) of the image.
     */
    public double getHeight() {
        return height;
    }

    /**
     * Sets the height of the image.
     *
     * @param height The height (px) of the image.
     * If the height of the image is greater than the boundary of the view, then users cannot see parts that exceed the boundary.
     */
    public void setHeight(double height) {
        this.height = height;
    }

    /**
     * Gets the URL address of the image.
     *
     * @return The URL address of the image.
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the URL address of the image.
     *
     * @param url The URL address of the image. Ensure the application client can access the URL; otherwise, the image cannot be displayed.
     */
    public void setUrl(String url) {
        this.url = url;
    }
}
