package com.herewhite.sdk.domain;

import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

/**
 * The `WhiteDisplayerState` class, which is inherited by the `Room` instances.
 *
 * @since 2.4.8
 */
public class WhiteDisplayerState extends WhiteObject {

    static Gson gson = new Gson();
    static Class<?> customClass = GlobalState.class;

    /**
     * Sets the customized `GlobalState` class.
     *
     * @since 2.4.8
     * <p>
     * A successful call of this method casts all `GlobalState` variables to the instances of the customized class.
     *
     * @param <T>      Type constraint. The customized `GlobalState` must extend the {@link com.herewhite.sdk.domain.GlobalState GlobalState} class.
     * @param classOfT The customized `GlobalState` class.
     */
    public static <T extends GlobalState> void setCustomGlobalStateClass(Class<T> classOfT) {
        customClass = classOfT;
    }

    /**
     * Gets the global state of the room.
     *
     * @return The global state of the room.
     */
    public GlobalState getGlobalState() {
        String str = gson.toJson(globalState);
        Object customInstance = null;
        try {
            customInstance = gson.fromJson(str, customClass);
        } catch (JsonSyntaxException e) {
            Log.e("getGlobalState error", e.getMessage());
        }
        if (customClass.isInstance(customInstance)) {
            return ((GlobalState) customInstance);
        } else {
            return null;
        }
    }

    /**
     * Gets the list of members in the room.
     *
     * @note
     * Only users in interactive mode (with read and write permissions) are room members; users in subscription mode (with read-only permission) are not included in the member list.
     *
     * @return The member list of the room. See {@link RoomMember RoomMember}.
     */
    public RoomMember[] getRoomMembers() {
        return roomMembers;
    }

    /**
     * Gets the state of the scenes under the current scene directory.
     *
     * @return The state of the scenes under the current scene directory. See {@link SceneState}.
     */
    public SceneState getSceneState() {
        return sceneState;
    }

    private Object globalState;
    private RoomMember[] roomMembers;
    private SceneState sceneState;

    /**
     * Gets the state of the view.
     *
     * @return The state of the view. See {@link CameraState}.
     */
    public CameraState getCameraState() {
        return cameraState;
    }

    private CameraState cameraState;

}
