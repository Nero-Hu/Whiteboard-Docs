package com.herewhite.sdk.domain;

/**
 * The `MemberInformation` class, for setting customized user information.
 *
 * @deprecated This class is deprecated. Use {@link com.herewhite.sdk.RoomParams#setUserPayload(Object) setUserPayload} instead.
 */
public class MemberInformation extends WhiteObject {
    private Long id;
    private String nickName;
    private String avatar;
    private String userId;

    /**
     * The `MemberInformation` constructor, for initializing a `MemberInformation` instance.
     */
    public MemberInformation() {

    }

    /**
     * The `MemberInformation` constructor, for initializing a `MemberInformation` instance.
     *
     * @param userId ID of the user.
     */
    public MemberInformation(String userId) {
        this.userId = userId;
    }

    /**
     * Gets the user ID in long format.
     *
     * @return The user ID in long format.
     */
    public long getId() {
        return id;
    }

    /**
     * Sets the user ID in long format.
     *
     * @param id The user ID in long format.
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Gets the user's nickname.
     *
     * @return The user's nickname.
     */
    public String getNickName() {
        return nickName;
    }

    /**
     * Gets the user ID in string format.
     *
     * @return The user ID in string format.
     */
    public String getUserId() {
        return userId;
    }

    /**
     * Sets the user ID in string format.
     *
     * @param userId The user ID in string format.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Sets a nickname for the user.
     *
     * @param nickName The nickname.
     */
    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    /**
     * Gets the user avatar.
     *
     * @return The URL address to the user avatar.
     */
    public String getAvatar() {
        return avatar;
    }

    /**
     * Sets the user avatar.
     *
     * @param avatar The URL address to the user avatar.
     *
     */
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
