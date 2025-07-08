package com.herewhite.sdk.domain;


/**
 * The `Point` class, for describing a point in the world coordinate system (taking the center of the initial whiteboard as the origin).
 */
public class Point extends WhiteObject {
    private Double x;
    private Double y;

    /**
     * Gets the X coordinate of the point in the world coordinate system.
     *
     * @return The X coordinate of the point in the world coordinate system.
     */
    public double getX() {
        return x;
    }

    /**
     * Sets the X coordinate of the point in the world coordinate system.
     *
     * @param x The X coordinate of the point in the world coordinate system.
     */
    public void setX(double x) {
        this.x = x;
    }

    /**
     * Gets the Y coordinate of the point in the world coordinate system.
     *
     * @return The Y coordinate of the point in the world coordinate system.
     */
    public double getY() {
        return y;
    }

    /**
     * Sets the Y coordinate of the point in the world coordinate system.
     *
     * @param y The Y coordinate of the point in the world coordinate system.
     */
    public void setY(double y) {
        this.y = y;
    }

}
