package com.herewhite.sdk.domain;

/**
 * Created by buhe on 2018/8/15.
 */

/**
 * Image information.
 */
public class ImageInformation extends WhiteObject {

    private String uuid;
    private Double centerX;
    private Double centerY;
    private Double width;
    private Double height;

    /**
     * Gets whether the image is locked.
     *
     * @return Whether the image is locked:
     * - `true`: Locked. When an image is locked, users cannot move or zoom the image.
     * - `false`: Unlocked.
     */
    public Boolean getLocked() {
        return locked;
    }

    /**
     * Locks an image.
     *
     * When an image is locked, users cannot move or zoom the image.
     *
     * @param locked Whether to lock the image:
     * - `true`: Locks the image.
     * - `false`: (Default) Do not lock the image
     */
    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    private Boolean locked = false;

    /**
     * Gets the unique identifier (UUID) of the image.
     *
     * @return The UUID of the image in string format.
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * Sets the unique identifier (UUID) of the image.
     *
     * The UUID of the image is a string, which is the identifier of the image and must be unique in the live interactive whiteboard room.
     * You can use the UUID generation library to generate the UUID of the image.
     *
     * @param uuid The UUID of the image in string format.
     */
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    /**
     * Gets the X coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
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
     * If the width of the image is greater than the boundary of the view, then users cannot see the excess part.
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
     * If the height of the image is greater than the boundary of the view, then users cannot see the excess part.
     */
    public void setHeight(double height) {
        this.height = height;
    }
}
