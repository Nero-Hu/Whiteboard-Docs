package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;


/**
 * The `PptPage` class, for setting the parameters of a PPT slide.
 *
 */
public class PptPage extends WhiteObject {

    @SerializedName(value = "src", alternate = {"conversionFileUrl"})
    private String src;
    private Double width;
    private Double height;

    /**
     * The `PptPage` constructor, for initializing a `PptPage` instance.
     *
     * @param src    The URL address of the PPT slide.
     * @param width  The width (px) of the PPT slide.
     * @param height The height (px) of the PPT slide.
     */
    public PptPage(String src, Double width, Double height) {
        this.src = src;
        this.width = width;
        this.height = height;
    }

    /**
     * Gets the URL address of the PPT slide.
     *
     * @return The URL address of the PPT slide.
     */
    public String getSrc() {
        return src;
    }

    /**
     * Sets the URL address of the PPT slide.
     *
     * @param src The URL address of the PPT slide.
     */
    public void setSrc(String src) {
        this.src = src;
    }

    /**
     * Gets the width of the PPT slide.
     *
     * @return The width (px) of the PPT slide.
     */
    public double getWidth() {
        return width;
    }

    /**
     * Sets the width of the PPT slide.
     *
     * @param width The width (px) of the PPT slide.
     */
    public void setWidth(double width) {
        this.width = width;
    }

    /**
     * Gets the height of the PPT slide.
     *
     * @return The height (px) of the PPT slide.
     */
    public double getHeight() {
        return height;
    }

    /**
     * Sets the height of the PPT slide.
     *
     * @return The height (px) of the PPT slide.
     */
    public void setHeight(double height) {
        this.height = height;
    }
}
