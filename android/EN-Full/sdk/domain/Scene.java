package com.herewhite.sdk.domain;

/**
 * Settings for a scene.
 */
public class Scene extends WhiteObject {

    private String name;
    private Long componentsCount;
    private PptPage ppt;

    /**
     * The `Scene` constructor, for initializing a `Scene` object.
     *
     * @note When you insert the scene initialized by calling this method, the SDK randomly names the new scene. 
     */
    public Scene() {
    }

    /**
     * The `Scene` constructor, for initializing a `Scene` object.
     *
     * @param name The name of the scene.
     */
    public Scene(String name) {
        this.name = name;
    }

    /**
     * The `Scene` constructor, for initializing a `Scene` object.
     *
     * @param name The name of the scene.
     * @param ppt  Settings of the image to be inserted into the scene. See {@link PptPage PptPage}.
     */
    public Scene(String name, PptPage ppt) {
        this.name = name;
        this.ppt = ppt;
    }

    /**
     * Gets the name of the scene.
     *
     * @return The name of the scene.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the scene.
     *
     * @param name The name of the scene.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the number of strokes in the scene.
     *
     * @return The number of strokes in the scene.
     */
    public Long getComponentsCount() {
        return componentsCount;
    }

    /**
     * Gets the settings of the image to be inserted into the scene.
     *
     * @return Settings of the image to be inserted into the scene. See {@link PptPage PptPage}.
     */
    public PptPage getPpt() {
        return ppt;
    }

    /**
     * Sets the image to be inserted into the scene.
     *
     * @param ppt Settings of the image to be inserted into the scene. See {@link PptPage PptPage}.
     */
    public void setPpt(PptPage ppt) {
        this.ppt = ppt;
    }
}
