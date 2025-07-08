package com.herewhite.sdk.domain;

/**
 * The scene state.
 */
public class SceneState extends WhiteObject {

    private Scene[] scenes;
    private String scenePath;
    private int index;

    /**
     * Gets the list of scenes under the current scene directory.
     *
     * @return The list of scenes under the current scene directory.
     */
    public Scene[] getScenes() {
        return scenes;
    }

    /**
     * Gets the path of the current scene.
     *
     * @return The path of the current scene.
     */
    public String getScenePath() {
        return scenePath;
    }

    /**
     * Gets the index of the current scene under its scene directory.
     *
     * @return The index of the current scene under its scene directory.
     */
    public int getIndex() {
        return index;
    }

}
