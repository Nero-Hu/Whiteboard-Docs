package com.herewhite.sdk;

import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.herewhite.sdk.domain.AkkoEvent;
import com.herewhite.sdk.domain.Appliance;
import com.herewhite.sdk.domain.BroadcastState;
import com.herewhite.sdk.domain.CameraConfig;
import com.herewhite.sdk.domain.EventEntry;
import com.herewhite.sdk.domain.EventListener;
import com.herewhite.sdk.domain.FrequencyEventListener;
import com.herewhite.sdk.domain.GlobalState;
import com.herewhite.sdk.domain.ImageInformation;
import com.herewhite.sdk.domain.ImageInformationWithUrl;
import com.herewhite.sdk.domain.MemberState;
import com.herewhite.sdk.domain.Promise;
import com.herewhite.sdk.domain.RoomMember;
import com.herewhite.sdk.domain.RoomPhase;
import com.herewhite.sdk.domain.RoomState;
import com.herewhite.sdk.domain.SDKError;
import com.herewhite.sdk.domain.Scene;
import com.herewhite.sdk.domain.SceneState;
import com.herewhite.sdk.domain.ViewMode;
import com.herewhite.sdk.internal.Logger;

import org.json.JSONObject;

import java.util.UUID;

import androidx.annotation.Nullable;
import wendu.dsbridge.OnReturnValue;

/**
 * The `Room` class, which provides methods to operate a live Interactive Whiteboard room.
 */
public class Room extends Displayer {
    private SyncDisplayerState<RoomState> syncRoomState;
    private RoomPhase roomPhase = RoomPhase.connecting;

    void setDisconnectedBySelf(Boolean disconnectedBySelf) {
        this.disconnectedBySelf = disconnectedBySelf;
    }

    /**
     * Gets whether the SDK calls {@link disconnect() disconnect} to disconnect from the live Interactive Whiteboard room.
     *
     * This method can prevent the SDK from reconnecting to the room repeatedly.
     */
    public Boolean getDisconnectedBySelf() {
        return disconnectedBySelf;
    }

    private Boolean disconnectedBySelf = false;

    /**
     * Gets whether the local user is in interactive mode in the room.
     *
     * @return Whether the local user is in interactive mode:
     * - `true`: In interactive mode. The user has read and write permissions on the whiteboard.
     * - `false`: In subscription mode. The user has read-only access to the whiteboard.
     */
    public Boolean getWritable() {
        return writable;
    }

    void setWritable(Boolean writable) {
        this.writable = writable;
    }

    private Boolean writable;
    private Integer timeDelay;
    private Long observerId;

    /// @cond test
    /**
     * Hidden in documentation
     */
    Room(String uuid, JsBridgeInterface bridge, int densityDpi, boolean disableCallbackWhilePutting) {
        super(uuid, bridge, densityDpi);
        this.timeDelay = 0;
        this.syncRoomState = new SyncDisplayerState<>(RoomState.class, "{}", disableCallbackWhilePutting);
        this.syncRoomState.setListener(localRoomStateListener);
    }
    /// @endcond

    void setSyncRoomState(String stateJSON) {
        syncRoomState.syncDisplayerState(stateJSON);
    }

    void setRoomPhase(RoomPhase roomPhase) {
        this.roomPhase = roomPhase;
        if (roomListener != null) {
            roomListener.onPhaseChanged(roomPhase);
        }
    }

    /**
     * Gets the user ID of the local user.
     *
     * @since 2.4.11
     *
     * @return The user ID of the local user.
     */
    public Long getObserverId() {
        return observerId;
    }

    void setObserverId(Long observerId) {
        this.observerId = observerId;
    }

    //region Set API

    /**
     * Modifies the `globalState` object of the live Interactive Whiteboard room.
     *
     * The `globalState` object of the live Interactive Whiteboard room is a public global variable.
     * All users in the room can read the `globalState` object, while users in interactive mode can modify the `globalState` object.
     * The modified `globalState` object will be updated to all users in the room immediately.
     *
     * @param globalState The global public state the room. See {@link com.herewhite.sdk.domain.GlobalState GlobalState}.
     */
    public void setGlobalState(GlobalState globalState) {
        syncRoomState.putProperty("globalState", globalState);
        bridge.callHandler("room.setGlobalState", new Object[]{globalState});
    }

    /**
     * Modifies the state of the whiteboard tool currently in use.
     *
     * A successful call of this method updates the {@link com.herewhite.sdk.domain.MemberState MemberState} of the room immediately.
     *
     * You can call {@link #getMemberState() getMemberState} to get the latest {@link com.herewhite.sdk.domain.MemberState MemberState}.
     *
     * @param memberState The state of the whiteboard tool. See {@link com.herewhite.sdk.domain.MemberState MemberState}.
     */
    public void setMemberState(MemberState memberState) {
        syncRoomState.putProperty("memberState", memberState);
        if (Appliance.TEXT.equals(memberState.getCurrentApplianceName())) {
            bridge.callFocusView();
        }
        bridge.callHandler("room.setMemberState", new Object[]{memberState});
    }

    //region operation


    /**
     * Copies the selected content.
     *
     * @since 2.9.3
     *
     * This method stores the selected content to the memory, but does not paste it to the whiteboard.
     *
     * @note
     * This method takes effect only when you set {@link #disableSerialization disableSerialization} as `false`.
     */
    public void copy() {
        bridge.callHandler("room.sync.copy", new Object[]{});
    }

    /**
     * Pastes the copied content.
     *
     * @since 2.9.3
     *
     * This method pastes the content copied by the {@link #copy copy} method into the user view on the whiteboard.
     *
     * @note
     * - This method takes effect only when you set {@link #disableSerialization disableSerialization} as `false`.
     * - If you call this method multiple times, random offset may occur, which causes the pasted content not to center the user view.
     *
     */
    public void paste() {
        bridge.callHandler("room.sync.paste", new Object[]{});
    }

    /**
     * Duplicates the selected content.
     *
     * @since 2.9.3
     *
     * This method copies and pastes the selected content copied into the user view on the whiteboard.
     *
     * @note
     * - This method takes effect only when you set {@link #disableSerialization disableSerialization} as `false`.
     * - If you call this method multiple times, random offset may occur, which causes the pasted content not to center the user view.
     */
    public void duplicate() {
        bridge.callHandler("room.sync.duplicate", new Object[]{});
    }

    /**
     * Deletes the selected content.
     *
     * @since 2.9.3
     */
    public void deleteOperation() {
        bridge.callHandler("room.sync.delete", new Object[]{});
    }

    /**
     * Disables/Enables the local serialization.
     *
     * @since 2.9.3
     *
     * The following methods cannot take effect after the setting of `disableSerialization(true)`:
     * - `redo`
     * - `undo`
     * - `duplicate`
     * - `copy`
     * - `paste`
     *
     * @warning
     * To set `disableSerialization` as `false`, ensure that every user in the room uses one of the following SDKs; otherwise, the application may crash:
     *  - Web SDK v2.9.3 or later
     *  - Android SDK v2.9.3 or later
     *  - iOS SDK v2.9.3 or later
     *
     * @param disable Whether to disable the local serialization:
     *  - `true`: (Default) Disable the local serialization.
     *  - `false`: Enable the local serialization.
     */
    public void disableSerialization(boolean disable) {
        bridge.callHandler("room.sync.disableSerialization", new Object[]{disable});
    }

    /**
     * Redoes an undone action.
     *
     * @since 2.9.3
     *
     * @note
     * This method takes effect only when you set {@link #disableSerialization disableSerialization} as `false`.
     *
     */
    public void redo() {
        bridge.callHandler("room.redo", new Object[]{});
    }

    /**
     * Undoes an action.
     *
     * @since 2.9.3
     *
     * @note This method takes effect only when you set {@link #disableSerialization disableSerialization} as `false`.
     */
    public void undo() {
        bridge.callHandler("room.undo", new Object[]{});
    }
    //endregion

    /**
     * Sets the view mode of the user.
     *
     * In the live Interactive Whiteboard room, you can set one of the following view modes for a user:
     * - `Broadcaster`: Host mode.
     * - `Follower`: Follower mode.
     * - `Freedom`: (Default) Freedom mode.
     *
     * @note
     * The view mode setting of a user is affected by the view mode setting of other users in the room as follows:
     * - When there is no host in the room, all users are in `Freedom` view mode by default.
     * - When a user’s view mode is set as `Broadcaster`, the view mode of every other user in the room (including users that join subsequently) is automatically set as 'Follower'.
     * - When a user in `Follower` view mode operates the whiteboard, their view mode automatically switches to `Freedom` mode.
     * If needed, you can call {@link #disableOperations(boolean) disableOperations}(true) to disable the user from operating the whiteboard, so as to lock their view mode.
     *
     * This method call is asynchronous. After calling this method, you can call the {@link #getBroadcastState(Promise<BroadcastState> promise) getBroadcastState}[2/2] method to get the latest view mode of the user.
     *
     * @param viewMode The view mode of the user. See {@link com.herewhite.sdk.domain.ViewMode ViewMode}.
     */
    public void setViewMode(ViewMode viewMode) {
        bridge.callHandler("room.setViewMode", new Object[]{viewMode.name()});
    }

    //endregion

    /**
     * Disconnects from the live Interactive Whiteboard room.
     *
     * A successful call of this method allows the user to leave the room and releases all resources related to the room.
     * The user that has left the room must call {@link WhiteSdk#joinRoom(RoomParams roomParams, RoomListener roomListener, Promise<Room> roomPromise) joinRoom}[1/2]
     * or {@link WhiteSdk#joinRoom(final RoomParams roomParams, final RoomListener roomListener, final Promise<Room> roomPromise) joinRoom}[2/2] again to join the room.
     *
     * @note This method does not trigger a callback to report whether the SDK successfully disconnects from the room. You can use {@link #disconnect(@Nullable Promise<Object> promise) disconnect}[2/2] instead.
     */
    public void disconnect() {
        disconnect(null);
    }

    /**
     * Disconnects from the live Interactive Whiteboard room.
     *
     * A successful call of this method allows the user to leave the room and releases all resources related to the room.
     * The user that has left the room must call {@link WhiteSdk#joinRoom(RoomParams roomParams, RoomListener roomListener, Promise<Room> roomPromise) joinRoom}[1/2]
     * or {@link WhiteSdk#joinRoom(final RoomParams roomParams, final RoomListener roomListener, final Promise<Room> roomPromise) joinRoom}[2/2] again to join the room.
     *
     * You can pass in an instance of the `Promise<Object>` interface to get the call result of this method.
     *
     * @param promise The `Promise<Object>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `disconnect` through this interface:
     * - The global state of the room, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void disconnect(@Nullable final Promise<Object> promise) {
        setDisconnectedBySelf(true);
        bridge.callHandler("room.disconnect", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                if (promise == null) {
                    return;
                }
                try {
                    promise.then(gson.fromJson(String.valueOf(o), GlobalState.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from disconnect", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in disconnect promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }
    //region image

    /**
     * Inserts an image placeholder on the whiteboard.
     *
     * The method sets up and inserts an image placeholder on the whiteboard per `imageInfo` you pass in.
     * You also need to call {@link #completeImageUpload(String, String) completeImageUpload} to pass in the URL address of the image to insert and display the image in the placeholder.
     *
     * @note You can call {@link #insertImage(ImageInformationWithUrl) insertImage} to pass in the image information and URL address at the same time.
     *
     * @param imageInfo The image information. See {@link com.herewhite.sdk.domain.ImageInformation ImageInformation}.
     */
    public void insertImage(ImageInformation imageInfo) {
        bridge.callHandler("room.insertImage", new Object[]{imageInfo});
    }

    /**
     * Displays an image in the specified image placeholder.
     *
     * The method inserts and displays an image in the specified image placeholder.
     *
     * @note Ensure that you have called {@link #insertImage(ImageInformation) insertImage} to insert an image placeholder on the whiteboard.
     *
     * @param uuid The unique identifier of the image, which is the image UUID that you pass in {@link com.herewhite.sdk.domain.ImageInformation ImageInformation} of the {@link #insertImage(ImageInformation) insertImage} method.
     * @param url  The URL address of the image. Ensure the application client can access the URL; otherwise, the image cannot be displayed.
     */
    public void completeImageUpload(String uuid, String url) {
        bridge.callHandler("room.completeImageUpload", new Object[]{uuid, url});
    }

    /**
     * Inserts and displays an image on the whiteboard.
     *
     * This method wraps the {@link #insertImage(ImageInformation) insertImage} and {@link #completeImageUpload(String, String) completeImageUpload} methods.
     * You can pass in the image information and URL address at the same time in this method to directly insert and display the image on the whiteboard.
     *
     * @param imageInformationWithUrl The information and the URL address of the image. See {@link com.herewhite.sdk.domain.ImageInformationWithUrl ImageInformationWithUrl}。
     */
    public void insertImage(ImageInformationWithUrl imageInformationWithUrl) {
        ImageInformation imageInformation = new ImageInformation();
        String uuid = UUID.randomUUID().toString();
        imageInformation.setUuid(uuid);
        imageInformation.setCenterX(imageInformationWithUrl.getCenterX());
        imageInformation.setCenterY(imageInformationWithUrl.getCenterY());
        imageInformation.setHeight(imageInformationWithUrl.getHeight());
        imageInformation.setWidth(imageInformationWithUrl.getWidth());
        this.insertImage(imageInformation);
        this.completeImageUpload(uuid, imageInformationWithUrl.getUrl());
    }
    //endregion

    //region GET API

    /**
     * Gets the global state of the room.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - This method can get and cast the custom `GlobalState` set by the {@link com.herewhite.sdk.domain.WhiteDisplayerState#setCustomGlobalStateClass(Class<T> classOfT) setCustomGlobalStateClass} method.
     * - You can call this method immediately after calling the {@link #setGlobalState(GlobalState) setGlobalState} method.
     *
     * @return The global state of the room. See {@link com.herewhite.sdk.domain.GlobalState GlobalState}.
     *
     */
    public GlobalState getGlobalState() {
        return syncRoomState.getDisplayerState().getGlobalState();
    }

    /**
     * Gets the global state of the room.
     *
     * @deprecated This method is deprecated. Use {@link #getGlobalState() getGlobalState}[1/2] instead.
     *
     * @note
     * - This method call is asynchronous.
     * - This method can get and cast the custom `GlobalState` set by the {@link com.herewhite.sdk.domain.WhiteDisplayerState#setCustomGlobalStateClass(Class<T> classOfT) setCustomGlobalStateClass} method.
     *
     * @param promise The `Promise<GlobalState>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getGlobalState` through this interface:
     * - The `GlobalState` object, if the method call succeeds. See {@link com.herewhite.sdk.domain.GlobalState GlobalState}.
     * - An error message, if the method call fails.
     */
    public void getGlobalState(final Promise<GlobalState> promise) {
        getGlobalState(GlobalState.class, promise);
    }

    /**
     * Hidden in documentation
     */
    private <T> void getGlobalState(final Class<T> classOfT, final Promise<T> promise) {
        bridge.callHandler("room.getGlobalState", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                T customState = null;
                try {
                    customState = gson.fromJson(String.valueOf(o), classOfT);
                } catch (AssertionError a) {
                    throw a;
                } catch (Throwable e) {
                    Logger.error("An exception occurred while parse json from getGlobalState for customState", e);
                    promise.catchEx(new SDKError((e.getMessage())));
                }
                if (customState == null) {
                    return;
                }
                try {
                    promise.then(customState);
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getGlobalState", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getGlobalState promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the state of the whiteboard tool currently in use.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - You can call this method to get the latest `MemberState` immediately after calling the {@link #setMemberState(MemberState) setMemberState} method.
     *
     * @return The state of the whiteboard tool currently in use. See {@link com.herewhite.sdk.domain.MemberState MemberState}.
     *
     */
    public MemberState getMemberState() {
        return syncRoomState.getDisplayerState().getMemberState();
    }

    /**
     * Gets the state of the whiteboard tool currently in use.
     *
     * @note This method call is asynchronous.
     *
     * @param promise The `Promise<MemberState>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getMemberState` through this interface:
     * - The `MemberState` object, if the method call succeeds. See {@link com.herewhite.sdk.domain.MemberState MemberState}.
     * - An error message, if the method call fails.
     */
    public void getMemberState(final Promise<MemberState> promise) {
        bridge.callHandler("room.getMemberState", new OnReturnValue<String>() {
            @Override
            public void onValue(String o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), MemberState.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getMemberState", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getMemberState promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the list of members in the room.
     *
     * @note
     * - This method call is synchronous.
     * - Only users in interactive mode (with read and write permissions) are room members; users in subscription mode (with read-only permission) are not included in the member list.
     *
     * @return The member list of the room. See {@link com.herewhite.sdk.domain.RoomMember RoomMember}.
     *
     */
    public RoomMember[] getRoomMembers() {
        return syncRoomState.getDisplayerState().getRoomMembers();
    }

    /**
     * Gets the list of members in the room.
     *
     * @note
     * - This method call is asynchronous.
     * - Only users in interactive mode (with read and write permissions) are room members; users in subscription mode (with read-only permission) are not included in the member list.
     *
     * @param promise The`Promise<RoomMember[]>` interface instance. See{@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getRoomMembers` through this interface:
     * - The member list of the room, if the method call succeeds. See {@link com.herewhite.sdk.domain.RoomMember RoomMember}.
     * - An error message, if the method call fails.
     */
    public void getRoomMembers(final Promise<RoomMember[]> promise) {
        bridge.callHandler("room.getRoomMembers", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), RoomMember[].class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getRoomMembers", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getRoomMembers promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the view state of the user.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest view state of the user by calling this method immediately after calling {@link #setViewMode(ViewMode) setViewMode}.
     * In this case, use {@link #getBroadcastState(Promise<BroadcastState> promise) getBroadcastState}[2/2] instead.
     *
     * @return The view state of the user. See {@link com.herewhite.sdk.domain.BroadcastState BroadcastState}.
     *
     */
    public BroadcastState getBroadcastState() {
        return syncRoomState.getDisplayerState().getBroadcastState();
    }

    /**
     * Gets the view state of the user.
     *
     * @note
     * - This method call is asynchronous.
     * - You cannot get the latest view state of the user by calling {@link #getBroadcastState getBroadcastState}[1/2] immediately after calling {@link #setViewMode(ViewMode) setViewMode}.
     * In this case, use this method instead.
     *
     * @param promise The `Promise<BroadcastState>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getBroadcastState` through this interface:
     * - The view state of the user, if the method call succeeds. See {@link com.herewhite.sdk.domain.BroadcastState BroadcastState}.
     * - An error message, if the method call fails.
     */
    public void getBroadcastState(final Promise<BroadcastState> promise) {
        bridge.callHandler("room.getBroadcastState", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), BroadcastState.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getBroadcastState", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getBroadcastState promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the state of the scenes under the current scene directory.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest scene state through {@link #getSceneState() getSceneState}[1/2] immediately after calling the following methods:
     *   - {@link #setScenePath(String path) setScenePath}[1/2]
     *   - {@link #setScenePath(String path, Promise<Boolean> promise) setScenePath}[2/2]
     *   - {@link #putScenes(String, Scene[], int)}
     *
     * In ths case, use {@link #getSceneState(Promise<SceneState> promise) getSceneState}[2/2] instead.
     *
     * @return The state of the scenes under the current scene directory. See {@link com.herewhite.sdk.domain.SceneState SceneState}.
     */
    public SceneState getSceneState() {
        return syncRoomState.getDisplayerState().getSceneState();
    }

    /**
     * Gets the state of the scenes under the current scene directory.
     *
     * @note
     * - This method call is asynchronous.
     * - You cannot get the latest scene state through {@link #getSceneState() getSceneState}[1/2] immediately after calling the following methods:
     *   - {@link #setScenePath(String path) setScenePath}[1/2]
     *   - {@link #setScenePath(String path, Promise<Boolean> promise) setScenePath}[2/2]
     *   - {@link #putScenes(String, Scene[], int) putScenes}
     * In ths case, use {@link #getSceneState(final Promise<SceneState> promise) getSceneState}[2/2] instead.
     *
     * @param promise The `Promise<SceneState>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getSceneState` through this interface:
     * - The scene state under the current scene directory, if the method call succeeds. See {@link com.herewhite.sdk.domain.SceneState SceneState}.
     * - An error message, if the method call fails.
     */
    public void getSceneState(final Promise<SceneState> promise) {
        bridge.callHandler("room.getSceneState", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), SceneState.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getSceneState", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getSceneState promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the list of scenes under the current scene directory.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest list of scenes immediately through {@link #getScenes() getScenes}[1/2] after calling the following methods:
     *   - {@link #setScenePath(String path) setScenePath}[1/2]
     *   - {@link #setScenePath(String path, Promise<Boolean> promise) setScenePath}[2/2]
     *   - {@link #putScenes(String, Scene[], int) putScenes}
     * In this case, you can use {@link #getScenes(Promise<Scene[]> promise) getScenes} instead.
     *
     * @return The list of scenes under the current scene directory. See {@link com.herewhite.sdk.domain.Scene Scene}.
     */
    public Scene[] getScenes() {
        return this.getSceneState().getScenes();
    }

    /**
     * Gets the list of scenes under the current scene directory.
     *
     * @note
     * - This method call is asynchronous.
     * - You cannot get the latest list of scenes immediately through {@link #getScenes() getScenes}[1/2] after calling the following methods:
     *   - {@link #setScenePath(String path) setScenePath}[1/2]
     *   - {@link #setScenePath(String path, Promise<Boolean> promise) setScenePath}[2/2]
     *   - {@link #putScenes(String, Scene[], int) putScenes}
     * In this case, you can use {@link #getScenes(Promise<Scene[]> promise) getScenes} instead.
     *
     * @param promise The `Promise<Scene[]>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getScenes` through this interface:
     * - The list of scenes under the current scene directory, if the method call succeeds. See {@link com.herewhite.sdk.domain.Scene Scene}.
     * - An error message, if the method call fails.
     */
    public void getScenes(final Promise<Scene[]> promise) {
        bridge.callHandler("room.getScenes", new Object[]{}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), Scene[].class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getScenes", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getScenes promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }


    /**
     * Gets the scale of the view.
     *
     * @since 2.4.0
     *
     * @deprecated This method is deprecated.
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest view scale through {@link #getZoomScale() getZoomScale}[1/2] immediately after calling {@link #zoomChange(double) zoomChange} or {@link #moveCamera(CameraConfig) moveCamera}.
     * In this case, you can use {@link #getZoomScale(Promise<Number> promise) getZoomScale}[2/2] instead.
     *
     * @return The scale of the view.
     */
    public double getZoomScale() {
        return syncRoomState.getDisplayerState().getZoomScale();
    }

    /**
     * Gets the scale of the view.
     *
     * @deprecated This method is deprecated.
     *
     * @note
     * - This method call is asynchronous.
     * - You cannot get the latest view scale through {@link #getZoomScale() getZoomScale}[1/2] immediately after calling {@link #zoomChange(double) zoomChange} or {@link #moveCamera(CameraConfig) moveCamera}.
     * In this case, you can use {@link #getZoomScale(Promise<Number> promise) getZoomScale}[2/2] instead.
     *
     * @param promise The `Promise<Number>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getZoomScale` through this interface:
     * - The scale of the view, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void getZoomScale(final Promise<Number> promise) {
        bridge.callHandler("room.getZoomScale", new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), Number.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getZoomScale", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getZoomScale promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the connection state of the room.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest connection state of the room through {@link #getRoomPhase() getRoomPhase}[1/2] immediately
     * after calling {@link #disconnect() disconnect}[1/2] or {@link #disconnect(@Nullable Promise<Object> promise) disconnect}[2/2].
     * In this case, you can use {@link #getRoomPhase(Promise<RoomPhase> promise) getRoomPhase}[2/2] instead.
     *
     * @return The connection state of the room. See {@link com.herewhite.sdk.domain.RoomPhase RoomPhase}.
     */
    public RoomPhase getRoomPhase() {
        return this.roomPhase;
    }

    /**
     * Gets the connection state of the room.
     *
     * @note
     * - This method call is asynchronous.
     * - You cannot get the latest connection state of the room through {@link #getRoomPhase() getRoomPhase}[1/2] immediately
     * after calling {@link #disconnect() disconnect}[1/2] or {@link #disconnect(@Nullable Promise<Object> promise) disconnect}[2/2].
     * In this case, you can use {@link #getRoomPhase(Promise<RoomPhase> promise) getRoomPhase}[2/2] instead.
     *
     * @param promise The `Promise<RoomPhase>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getRoomPhase` through this interface:
     * - The connection state of the room, if the method call succeeds. See {@link com.herewhite.sdk.domain.RoomPhase RoomPhase}.
     * - An error message, if the method call fails.
     */
    public void getRoomPhase(final Promise<RoomPhase> promise) {
        bridge.callHandler("room.getRoomPhase", new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(RoomPhase.valueOf(String.valueOf(o)));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getRoomPhase", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getRoomPhase promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Gets the current room state.
     *
     * @since 2.4.0
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest room state through {@link getRoomState() getRoomState}[1/2] immediately after modifying the {@link com.herewhite.sdk.domain.RoomState RoomState} variables.
     * In this case, you can user {@link #getRoomState(Promise<RoomState> promise) getRoomState}[2/2] instead.
     *
     * @return The current room state. See {@link com.herewhite.sdk.domain.RoomState RoomState}.
     *
     */
    public RoomState getRoomState() {
        return syncRoomState.getDisplayerState();
    }

    /**
     * Gets the current room state.
     *
     * @note
     * - This method call is synchronous.
     * - You cannot get the latest room state through {@link getRoomState() getRoomState}[1/2] immediately after modifying the {@link com.herewhite.sdk.domain.RoomState RoomState} variables.
     * In this case, you can user {@link #getRoomState(Promise<RoomState> promise) getRoomState}[2/2] instead.
     *
     * @param promise The `Promise<RoomState>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `getRoomState` through this interface:
     * - The current room state, if the method call succeeds. See {@link com.herewhite.sdk.domain.RoomState RoomState}.
     * - An error message, if the method call fails.
     */
    public void getRoomState(final Promise<RoomState> promise) {
        bridge.callHandler("room.state.getDisplayerState", new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), RoomState.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from getDisplayerState", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in getDisplayerState promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }
    //endregion

    //region Scene API

    /**
     * Switches to the specified scene.
     *
     * A successful call of this method switches the whiteboard scene to the specified scene.
     *
     * @note
     * - This method call is synchronous.
     * - To get the callback of the method call, use {@link #setScenePath(String path, Promise<Boolean> promise) setScenePath}[2/2] instead.
     *
     * The scene switch may fail due to the following reasons:
     * - The specified scene path is invalid. Ensure the scene path stars with `/` and consists of the scene directory and scene name.
     * - The specified scene does not exist.
     * - The path passed in is the path of the scene directory, not the path of the scene.
     *
     * @param path The path of the scene that you want to switch to. Ensure the scene path stars with `/` and consists of the scene directory and scene name. For example, `/math/classA`.
     */
    public void setScenePath(String path) {
        bridge.callHandler("room.setScenePath", new Object[]{path});
    }

    /**
     * Switches to the specified scene.
     *
     * A successful call of this method switches the whiteboard scene to the specified scene.
     *
     * @note This method call is asynchronous.
     *
     * The scene switch may fail due to the following reasons:
     * - The specified scene path is invalid. Ensure the scene path stars with `/` and consists of the scene directory and scene name.
     * - The specified scene does not exist.
     * - The path passed in is the path of the scene directory, not the path of the scene.
     *
     * @param path The path of the scene that you want to switch to，Ensure the scene path stars with `/` and consists of the scene directory and scene name. For example, `/math/classA`.
     * @param promise The `Promise<Boolean>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `setScenePath` through this interface:
     * - `true`, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void setScenePath(String path, final Promise<Boolean> promise) {
        bridge.callHandler("room.setScenePath", new Object[]{path}, new OnReturnValue<String>() {
            @Override
            public void onValue(String result) {
                SDKError sdkError = SDKError.promiseError(result);
                if (sdkError != null) {
                    promise.catchEx(sdkError);
                } else {
                    promise.then(true);
                }
            }
        });
    }

    /**
     * Switches to the specified scene under the current scene directory.
     *
     * A successful call of this method switches the whiteboard scene to the specified scene.
     *
     * @note
     * The specified scene must exist in the current scene directory; otherwise, the method call fails.
     *
     * @param index The index of the target scene in the current scene directory.
     * @param promise The `Promise<Boolean>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `setSceneIndex` through this interface:
     * - `true`, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void setSceneIndex(Integer index, @Nullable final Promise<Boolean> promise) {
        bridge.callHandler("room.setSceneIndex", new Object[]{index}, new OnReturnValue<String>() {
            @Override
            public void onValue(String result) {
                if (promise == null) {
                    return;
                }
                SDKError sdkError = SDKError.promiseError(result);
                if (sdkError != null) {
                    promise.catchEx(sdkError);
                } else {
                    promise.then(true);
                }
            }
        });
    }

    /**
     * Inserts multiples scenes under the specified scene directory.
     *
     * @note
     * This method does not switch the whiteboard scene to any of the newly inserted scenes.
     * You need to call {@link #setScenePath(String) setScenePath(} to switch to one of the newly inserted scenes.
     *
     *
     * @param dir    The path of the scene directory, which must starts with `/` and cannot be the path of a scene. For example, `"/math"`.
     * @param scenes An array of scenes. For the files of a single scene, see {@link com.herewhite.sdk.domain.Scene Scene}.
     * @param index  The index of the first scene to be inserted. The index of scene under a scene directory can start from 0.
     * If the index is greater than the total number of existing scenes under the scene directory, the new scene is put after the last scene.
     *
     * <pre>
     * {@code
     * room.putScenes("ppt", new Scene[]{new Scene("page1", new PptPage("https://white-pan.oss-cn-shanghai.aliyuncs.com/101/image/alin-rusu-1239275-unsplash_opt.jpg", 1024d, 768d))}, 0);
     * room.setScenePath("ppt" + "/page1");
     * }
     * </pre>
     */
    public void putScenes(String dir, Scene[] scenes, int index) {
        bridge.callHandler("room.putScenes", new Object[]{dir, scenes, index});
    }

    /**
     * Moves a scene.
     *
     * After a scene is moved, the path of the scene changes.
     *
     * @note
     * - This method cannot move a scene directory, which means you can only pass in the path of a scene in the `sourcePath` parameter.
     * - The method supports moving the specified scene under the current scene directory or to another scene directory.
     * Therefore, you can pass in either the path of the target scene directory or the target path of the scene under the current directory in the `targetDirOrPath` parameter.
     *
     * @param sourcePath      The original path of the scene to be moved. It cannot be the path of a scene directory.
     * @param targetDirOrPath The path of the target scene directory or the target path of the scene under the current directory:
     *                        - If you pass in the path of the target scene directory, the path of the scene changes, but the name of the scene does not change.
     *                        - If you pass in the target path of the scene under the current directory, both the path of the scene and the name of the scene change.
     */
    public void moveScene(String sourcePath, String targetDirOrPath) {
        bridge.callHandler("room.moveScene", new Object[]{sourcePath, targetDirOrPath});
    }

    /**
     * Deletes a scene or a scene directory.
     *
     * @note
     * - There must be at least one scene in the live Interactive Whiteboard room. If you delete all scenes, the SDK automatically creates
     * an initial scene with the path of `/init`.
     * - If you delete the current whiteboard scene, the whiteboard displays the last scene under the current scene directory.
     * - If you delete a scene directory, all scenes under the directory will be deleted.
     * - If you delete the current scene directory, for example, `dirA`, the SDK executes upward recursive logic to locate the new scene:
     *    1. If there is a scene directory after the deleted scene directory under the same directory, for example, `dirB`，the SDK switches the whiteboard scene to the first scene under `dirB` (with the index of 0).
     *    2. If there is no scene directory after the deleted scene directory under the same directory, then the SDK looks for scenes under the directory.
     *       If there are scenes under the directory, the SDK switches the whiteboard scene to the first scene (with the index of 0).
     *    3. If there is neither a scene directory after the deleted scene directory nor scenes under the same directory, then the SDK looks for scene directories before the deleted scene directory.
     *       If there is a scene directory, for example, `dirC`， before the deleted `dirA`, then the SDK switches the whiteboard scene to the first scene under `dirC` (with the index of 0).
     * The SDK continues executing upward recursive logic until a new scene is found.
     *
     *
     * @param dirOrPath The path of a scene or a scene directory. If you pass in the path of a scene directory, this method deletes all scenes under the directory.
     */
    public void removeScenes(String dirOrPath) {
        bridge.callHandler("room.removeScenes", new Object[]{dirOrPath});
    }

    /**
     * Clears all contents on the current scene.
     *
     * @param retainPpt Whether to retain the PPT slide:
     * - `true`: Leave the PPT slide on the scene.
     * - `false`: Clear the PPT slide together with all other contents.
     */
    public void cleanScene(boolean retainPpt) {
        bridge.callHandler("room.cleanScene", new Object[]{retainPpt});
    }
    //endregion

    //region PPT

    /**
     * Plays the next slide of the PPT file.
     *
     * @since 2.2.0
     *
     * When the current PPT slide finishes playing, the SDK switches to the next scene to play the next PPT slide.
     */
    public void pptNextStep() {
        bridge.callHandler("ppt.nextStep", new Object[]{});
    }

    /**
     * Returns to the previous slide of the PPT file.
     *
     * @since 2.2.0
     *
     * When the current PPT slide is rolled back, the SDK switches back to the previous scene to play the previous PPT slide.
     */
    public void pptPreviousStep() {
        bridge.callHandler("ppt.previousStep", new Object[]{});
    }
    //endregion

    /**
     * Sets the scale of the view.
     *
     * @deprecated This method is deprecated. Use {@link #moveCamera(CameraConfig) moveCamera} instead.
     *
     * @param scale The scale of the view.
     */
    @Deprecated
    public void zoomChange(double scale) {
        CameraConfig config = new CameraConfig();
        config.setScale(scale);
        this.moveCamera(config);
    }

    /**
     * Gets debug logs.
     *
     * @since 2.6.2
     *
     * @param promise The `Promise<JSONObject>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `debugInfo` through this interface:
     * - The debug logs, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void debugInfo(final Promise<JSONObject> promise) {
        bridge.callHandler("room.state.debugInfo", new OnReturnValue<JSONObject>() {
            @Override
            public void onValue(JSONObject retValue) {
                promise.then(retValue);
            }
        });
    }


    //region Disable

    /**
     * Disables the whiteboard from responding to users' operations.
     *
     * This method disables the whiteboard from responding to the following operations of users:
     * - `CameraTransform`: Adjusting the view of the whiteboard, including moving and zooming the view.
     * - `DeviceInputs`: Using the whiteboard tool.
     *
     * @param disableOperations Whether to disable the whiteboard from responding to users' operations:
     * - `true`: Disable the whiteboard from responding to users' operations.
     * - `false`: (Default) Enable the whiteboard to respond to users' operations.
     */
    public void disableOperations(final boolean disableOperations) {
        disableCameraTransform(disableOperations);
        disableDeviceInputs(disableOperations);
    }

    /**
     * Sets whether a user is in interactive mode in the room.
     *
     * @since 2.6.1
     *
     * Users in the live Interactive Whiteboard room can be in one of the following modes
     * - Interactive mode, in which users have read and write permissions on the whiteboard, appear in the member list of the room, and are visible to all other users in the room.
     * - Subscription mode, in which users have read-only access to the whiteboard, do not appear in the member list of the room, and are invisible to all other users in the room.
     *
     * @param writable Whether the user is in interactive mode:
     *                 - `true`: The user is in interactive mode.
     *                 - `false`: The user is in subscription mode.
     * @param promise  The `Promise<Boolean>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}. You can get the call result of `setWritable` through this interface:
     * - Whether the user is interactive mode, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void setWritable(final boolean writable, @Nullable final Promise<Boolean> promise) {
        bridge.callHandler("room.setWritable", new Object[]{writable}, new OnReturnValue<String>() {
            @Override
            public void onValue(String result) {
                SDKError sdkError = SDKError.promiseError(result);
                if (promise == null) {
                    return;
                }

                if (sdkError != null) {
                    promise.catchEx(sdkError);
                } else {
                    JsonObject jsonObject = gson.fromJson(result, JsonObject.class);
                    Boolean isWritable = jsonObject.get("isWritable").getAsBoolean();
                    Long ObserverId = jsonObject.get("observerId").getAsLong();
                    setWritable(isWritable);
                    setObserverId(ObserverId);
                    promise.then(isWritable);
                }
            }
        });
    }

    /**
     * Disables the eraser from erasing images on the whiteboard.
     *
     * @since 2.9.3
     *
     * @param disable Whether to disable the eraser from erasing images on the whiteboard:
     * - `true`: Disable the eraser from erasing images.
     * - `false`: (Default) Enable the eraser to erase images.
     */
    public void disableEraseImage(boolean disable) {
        bridge.callHandler("room.sync.disableEraseImage", new Object[]{disable});
    }

    /**
     * Disables the local user from adjusting the view of the whiteboard, including moving and zooming the view.
     *
     * @since 2.2.0
     *
     * @param disableCameraTransform Whether to disable the local user from adjusting the view of the whiteboard:
     *  - `true`: Disable the local user from adjusting the view of the whiteboard.
     *  - `false`: (Default) Enable the local user to adjust the view of the whiteboard.
     */
    public void disableCameraTransform(final boolean disableCameraTransform) {
        bridge.callHandler("room.disableCameraTransform", new Object[]{disableCameraTransform});
    }

    /**
     * Disables the whiteboard tools from responding to users' inputs.
     *
     * @since 2.2.0
     *
     * @param disableOperations Whether to disable the whiteboard tools from responding to users' inputs:
     *   - `true`: Disable the whiteboard tools from responding to users' inputs.
     *   - `false`: (Default) Enable the whiteboard tools to respond to users' inputs.
     */
    public void disableDeviceInputs(final boolean disableOperations) {
        bridge.callHandler("room.disableDeviceInputs", new Object[]{disableOperations});
    }
    //endregion

    //region Delay API

    /**
     * Sets the delay time for sending the whiteboard contents of the local user to the remote users.
     *
     * After calling this method, the SDK delays sending the whiteboard contents of the local user to the remote users per the set time.
     *
     * This method helps synchronize the whiteboard contents with audio and video in CND live streaming.
     *
     * @note This method does not delays the content the local users see, that is, when the local user writes or draws on the whiteboard, they see the content on their own whiteboard immediately.
     *
     * @param delaySec The delay time in seconds.
     */
    public void setTimeDelay(Integer delaySec) {
        bridge.callHandler("room.setTimeDelay", new Object[]{delaySec * 1000});
        this.timeDelay = delaySec;
    }

    /**
     * Gets the delay time for synchronizing the whiteboard contents of the local user to the remote users.
     *
     * @return The delay time in seconds.
     */
    public Integer getTimeDelay() {
        return this.timeDelay;
    }
    //endregion

    /**
     * Sends a custom event.
     *
     * @note All users that listen for this event receive the notification.
     *
     * @param eventEntry The custom event. See {@link com.herewhite.sdk.domain.AkkoEvent AkkoEvent}.
     */
    public void dispatchMagixEvent(AkkoEvent eventEntry) {
        bridge.callHandler("room.dispatchMagixEvent", new Object[]{eventEntry});
    }
    //endregion

    // region roomListener
    private RoomListener roomListener;

    void setRoomListener(RoomListener roomCallbacks) {
        this.roomListener = roomCallbacks;
    }

    private SyncDisplayerState.Listener<RoomState> localRoomStateListener = modifyState -> {
        post(() -> {
            if (roomListener != null) {
                roomListener.onRoomStateChanged(modifyState);
            }
        });
    };

    //endregion
    private RoomDelegate roomDelegate;

    public RoomDelegate getRoomDelegate() {
        if (roomDelegate == null) {
            roomDelegate = new RoomDelegateImpl();
        }
        return roomDelegate;
    }

    private class RoomDelegateImpl implements RoomDelegate {
        /**
         * Hidden in documentation
         *
         */
        @Override
        public void fireMagixEvent(EventEntry eventEntry) {
            EventListener eventListener = eventListenerMap.get(eventEntry.getEventName());
            if (eventListener != null) {
                eventListener.onEvent(eventEntry);
            }
        }

        /// @cond test
        /**
         * Hidden in documentation
         *
         * @param eventEntries
         */
        @Override
        public void fireHighFrequencyEvent(EventEntry[] eventEntries) {
            FrequencyEventListener eventListener = frequencyEventListenerMap.get(eventEntries[0].getEventName());
            if (eventListener != null) {
                eventListener.onEvent(eventEntries);
            }
        }
        /// @endcond

        @Override
        public void firePhaseChanged(RoomPhase valueOf) {
            setRoomPhase(valueOf);
        }

        @Override
        public void fireCanUndoStepsUpdate(long canUndoSteps) {
            if (roomListener != null) {
                roomListener.onCanUndoStepsUpdate(canUndoSteps);
            }
        }

        @Override
        public void onCanRedoStepsUpdate(long canRedoSteps) {
            if (roomListener != null) {
                roomListener.onCanRedoStepsUpdate(canRedoSteps);
            }
        }

        @Override
        public void fireKickedWithReason(String reason) {
            if (roomListener != null) {
                roomListener.onKickedWithReason(reason);
            }
        }

        @Override
        public void fireDisconnectWithError(Exception exception) {
            if (roomListener != null) {
                roomListener.onDisconnectWithError(exception);
            }
        }

        @Override
        public void fireCatchErrorWhenAppendFrame(long userId, Exception exception) {
            if (roomListener != null) {
                roomListener.onCatchErrorWhenAppendFrame(userId, exception);
            }
        }

        @Override
        public void fireRoomStateChanged(String stateJSON) {
            syncRoomState.syncDisplayerState(stateJSON);
        }
    }
}
