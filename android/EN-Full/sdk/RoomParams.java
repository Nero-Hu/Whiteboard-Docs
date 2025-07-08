package com.herewhite.sdk;

import com.herewhite.sdk.domain.CameraBound;
import com.herewhite.sdk.domain.MemberInformation;
import com.herewhite.sdk.domain.Region;
import com.herewhite.sdk.domain.WhiteObject;

import java.util.concurrent.TimeUnit;

/**
 * Configurations for a {@link Room} instance.
 *
 * @note
 * All methods in this class must be called before joining a room. Any methods in this class that are called after successfully joining a room do not take effect.
 */
public class RoomParams extends WhiteObject {

    private String uuid;
    private String roomToken;

    /**
     * Sets the data center.
     *
     * @note
     * - The data center set in this method must be the same as the data center of the live Interactive Whiteboard room to be joined; otherwise, the SDK fails to connect to the room.
     * - You can call either this method or the {@link WhiteSdkConfiguration#setRegion(Region) setRegion} method in the `WhiteSdkConfiguration` class to set the data center. If you call both，this method overrides the {@link WhiteSdkConfiguration#setRegion(Region) setRegion} method.
     *
     * @param region The data center. See {@link com.herewhite.sdk.domain.Region Region}.
     */
    public void setRegion(Region region) {
        this.region = region;
    }

    /**
     * Gets the data center.
     *
     * @return The data center. See {@link com.herewhite.sdk.domain.Region Region}.
     */
    public Region getRegion() {
        return region;
    }

    private Region region;
    private CameraBound cameraBound;

    /**
     * Hidden in documentation
     */
    private long timeout = 45000;

    /**
     * Gets whether the user joins the whiteboard room in interactive mode.
     *
     * @return Whether the user joins the whiteboard room in interactive mode:
     * - `true`: The user joins the whiteboard room in interactive mode.
     * - `false`: The user joins the whiteboard room in subscription mode.
     */
    public boolean isWritable() {
        return isWritable;
    }

    /**
     * Sets whether a user joins the whiteboard room in interactive mode.
     *
     * Users can join a live Interactive Whiteboard room in one of the following modes:
     * - Interactive mode, in which users have read and write permissions on the whiteboard, appear in the member list of the room, and are visible to all other users in the room.
     * - Subscription mode, in which users have read-only access to the whiteboard, do not appear in the member list of the room, and are invisible to all other users in the room.
     *
     * @param writable Whether to join the room in interactive mode:
     *                 - `true`: (Default) Join the room in interactive mode.
     *                 - `false`: Join the room in subscription mode.
     */
    public void setWritable(boolean writable) {
        isWritable = writable;
    }

    private boolean isWritable = true;

    /**
     * Gets whether the eraser is disabled from erasing images on the whiteboard.
     *
     * @return Whether the eraser is disabled from erasing images on the whiteboard:
     * - `true`: The eraser is disabled from erasing images.
     * - `false`: The eraser is enabled to erase images.
     */
    public boolean getDisableEraseImage() {
        return disableEraseImage;
    }

    /**
     * Sets whether to disable the eraser from erasing images on the whiteboard.
     *
     * By default, the eraser can erase everything on the whiteboard, including images.
     * You can call `setDisableEraseImage(true)` to set the eraser to not erase the images.
     *
     * @param disableEraseImage Whether to disable the eraser from erasing images on the whiteboard:
     *                          - `true`: Disable the eraser from erasing images.
     *                          - `false`: (Default) Enable the eraser to erase images.
     */
    public void setDisableEraseImage(boolean disableEraseImage) {
        this.disableEraseImage = disableEraseImage;
    }

    /**
     * Sets the timeout for joining a room.
     *
     * @param timeout  The time duration. The default value is 45000.
     * @param timeUnit The unit of the `timeout` parameter. The default value is `MILLISECONDS`. For all supported values, see [TimeUnit](https://www.android-doc.com/reference/java/util/concurrent/TimeUnit.html).
     */
    public void setTimeout(long timeout, TimeUnit timeUnit) {
        this.timeout = TimeUnit.MILLISECONDS.convert(timeout, timeUnit);
    }

    private boolean disableEraseImage = false;

    /**
     * Gets whether the whiteboard tools are disabled from responding to users' inputs.
     *
     * @return Whether the whiteboard tools are disabled from responding to users' inputs.
     * - `true`：The whiteboard tools are disabled from responding to users' inputs.
     * - `false`：The whiteboard tools are enabled to respond to users' inputs.
     */
    public boolean isDisableDeviceInputs() {
        return disableDeviceInputs;
    }

    /**
     * Disables the whiteboard tools from responding to users' inputs.
     *
     * @since 2.5.0
     *
     * @param disableDeviceInputs Whether to disable the whiteboard tools from responding to users' inputs:
     *   - `true`: Disable the whiteboard tools from responding to users' inputs.
     *   - `false`: (Default) Enable the whiteboard tools to respond to users' inputs.
     */
    public void setDisableDeviceInputs(boolean disableDeviceInputs) {
        this.disableDeviceInputs = disableDeviceInputs;
    }

    /**
     * Gets whether the whiteboard is disabled from responding to users' operations.
     *
     * @return Whether the whiteboard is disabled from responding to users' operations:
     * - `true`: The whiteboard is disabled from responding to users' operations.
     * - `false`: The whiteboard is enabled to respond to users' operations.
     */
    public boolean isDisableOperations() {
        return disableOperations;
    }

    /**
     * Disables the whiteboard from responding to users' operations.
     *
     * @since 2.5.0
     *
     * @deprecated This method is deprecated. Use {@link #setDisableDeviceInputs(boolean) setDisableDeviceInputs} and {@link #setDisableCameraTransform(boolean) setDisableCameraTransform} instead.
     *
     * After calling `setDisableOperations(true)`, the users can neither use the whiteboard tools nor adjust the view of the whiteboard.
     *
     * @param disableOperations Whether to disable the whiteboard from responding to users' operations:
     *  - `true`: Disable the whiteboard from responding to users' operations.
     *  - `false`: (Default) Enable the whiteboard to respond to users' operations.
     */
    public void setDisableOperations(boolean disableOperations) {
        this.disableCameraTransform = disableOperations;
        this.disableDeviceInputs = disableOperations;
        this.disableOperations = disableOperations;
    }

    /**
     * Gets whether the Bézier curve optimization is disabled.
     *
     * @return Whether the Bézier curve optimization is disabled:
     * - `true`: The Bézier curve optimization is disabled.
     * - `false`：The Bézier curve optimization is enabled.
     */
    public boolean isDisableBezier() {
        return disableBezier;
    }

    /**
     * Disables/Enables the Bézier curve optimization.
     *
     * @since 2.5.0
     *
     * @param disableBezier Whether to disable the Bézier curve optimization:
     * - `true`: Disable.
     * - `false`: (Default) Enable.
     *
     */
    public void setDisableBezier(boolean disableBezier) {
        this.disableBezier = disableBezier;
    }

    private boolean disableDeviceInputs = false;
    private boolean disableOperations = false;

    /**
     * Gets whether adjusting the view of the whiteboard by the local user is disabled.
     *
     * @return Whether adjusting the view of the whiteboard by the local user is disabled:
     * - `true`: The local user can adjust the view of the whiteboard.
     * - `false`: The local user can adjust the view of the whiteboard.
     */
    public boolean isDisableCameraTransform() {
        return disableCameraTransform;
    }

    /**
     * Disables the local user from adjusting the view of the whiteboard, including moving and zooming the view.
     *
     *
     * @param disableCameraTransform Whether to disable the local user from adjusting the view of the whiteboard:
     *  - `true`: Disable the local user from adjusting the view of the whiteboard.
     *  - `false`: (Default) Enable the local user to adjust the view of the whiteboard.
     */
    public void setDisableCameraTransform(boolean disableCameraTransform) {
        this.disableCameraTransform = disableCameraTransform;
    }

    private boolean disableCameraTransform = false;
    private boolean disableBezier = false;

    /**
     * Gets whether the stroke effect is disabled.
     *
     * @return Whether the stroke effect is enabled:
     * - true: The stroke effect is disabled.
     * - false: The stroke effect is enabled.
     */
    public boolean isDisableNewPencil() {
        return disableNewPencil;
    }

    /**
     * Disables/Enables the stroke effect of the pencil.
     *
     * @since 2.12.2
     *
     * @note
     * - In v2.12.2, the SDK sets the default value of `disableNewPencil` as `false`; as of v2.12.3, the SDK changes the default value of `disableNewPencil` to `true`.
     * - To enable the stroke effect, ensure that every user in the room uses one of the following SDKs:
     *      - Android SDK v2.12.3 or later
     *      - iOS SDK v2.12.3 or later
     *      - Web SDK v2.12.5 or later
     *
     * @param disableNewPencil Whether to disable the handwriting effect of the pencil:
     * - `true`: (Default) Disable the stroke effect of the pencil.
     * - `false`: Enable the stroke effect of the pencil.
     */
    public void setDisableNewPencil(boolean disableNewPencil) {
        this.disableNewPencil = disableNewPencil;
    }

    private boolean disableNewPencil = true;


    /**
     * Gets the boundary of the local user's view.
     *
     * @return The boundary of the view.
     */
    public CameraBound getCameraBound() {
        return cameraBound;
    }

    /**
     * Sets the boundary of the local user's view.
     *
     * @since 2.5.0
     *
     * @param cameraBound The boundary of the view. See {@link com.herewhite.sdk.domain.CameraBound CameraBound}.
     */
    public void setCameraBound(CameraBound cameraBound) {
        this.cameraBound = cameraBound;
    }

    /**
     * Gets the customized user information.
     *
     * @return The customized user information.
     */
    public Object getUserPayload() {
        return userPayload;
    }

    /**
     * Sets the customized user information.
     *
     * @since 2.0.0
     *
     * You can pass in customized user information, such as user ID, nickname, and avatar, in the `userPayload` and call this method to send the information to the application.
     *
     * @note
     * To ensure the format of the customized user information is correct, the `userPayload` must extend the {@link com.herewhite.sdk.domain.WhiteObject WhiteObject} class.
     *
     * @param userPayload Customized user information in key-value pairs, for example, `"avatar", "https://example.com/user.png"`.

     */
    public void setUserPayload(Object userPayload) {
        this.userPayload = userPayload;
    }

    private Object userPayload;

    /**
     * Initializes a `RoomParams` instance.
     *
     * @param uuid The unique identifier of the room. Ensure that the room UUID is the same as the one you use to generate the Room Token.
     * @param roomToken The Room Token for authentication.
     */
    public RoomParams(String uuid, String roomToken) {
        this(uuid, roomToken, (Object) null);
    }

    /**
     * Initializes a `RoomParams` instance with customized user information.
     *
     * @deprecated This method is deprecated. Use {@link RoomParams(String, String, Object) RoomParams}[2/2] instead.
     *
     * @param uuid The unique identifier of the room. Ensure that the room UUID is the same as the one you use to generate the Room Token.
     * @param roomToken The Room Token for authentication.
     * @param memberInfo Customized user information. See {@link com.herewhite.sdk.domain.MemberInformation MemberInformation}.
     */
    @Deprecated
    public RoomParams(String uuid, String roomToken, MemberInformation memberInfo) {
        this.uuid = uuid;
        this.roomToken = roomToken;
        this.userPayload = memberInfo;
    }

    /**
     * Initializes a `RoomParams` instance with customized user information.
     *
     * @since 2.0.0
     *
     * @param uuid The unique identifier of the room. Ensure that the room UUID is the same as the one you use to generate the Room Token.
     * @param roomToken The Room Token for authentication.
     * @param userPayload Customized user information, which must be a subclass of {@link com.herewhite.sdk.domain.WhiteObject WhiteObject} to ensure the data format is correct.
     */
    public RoomParams(String uuid, String roomToken, Object userPayload) {
        this.uuid = uuid;
        this.roomToken = roomToken;
        this.userPayload = userPayload;
    }

    /**
     * Gets customized user information.
     *
     * @deprecated This method is deprecated. Use {@link getUserPayload() getUserPayload} instead.
     *
     * @return Customized user information. See {@link com.herewhite.sdk.domain.MemberInformation MemberInformation}.
     */
    @Deprecated
    public MemberInformation getMemberInfo() {
        if (userPayload instanceof MemberInformation) {
            return (MemberInformation) userPayload;
        }
        return null;
    }

    /**
     * Sets customized user information.
     *
     * @deprecated This method is deprecated. Use {@link getUserPayload() getUserPayload} instead.
     *
     * @param memberInfo Customized user information. See {@link com.herewhite.sdk.domain.MemberInformation MemberInformation}.
     */
    @Deprecated
    public void setMemberInfo(MemberInformation memberInfo) {
        this.userPayload = memberInfo;
    }

    /**
     * Gets the UUID of the room.
     *
     * @return The unique identifier of the room.
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * Sets the UUID of the room.
     *
     * @param uuid The unique identifier of the room.
     */
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    /**
     * Gets the Room Token.
     *
     * @return The Room Token for authentication.
     */
    public String getRoomToken() {
        return roomToken;
    }

    /**
     * Sets the Room Token.
     *
     * @param roomToken The Room Token for authentication.
     */
    public void setRoomToken(String roomToken) {
        this.roomToken = roomToken;
    }

}
