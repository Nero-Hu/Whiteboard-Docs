package com.herewhite.sdk.domain;

/**
 * The `RoomMember` class, for getting the information of the users in interactive mode in the live Interactive Whiteboard room.
 *
 * @note This class applies to the users in interactive mode only, because the users in subscription mode are not room members.
 */
public class RoomMember {
    private Long memberId;
    private MemberInformation information;

    /**
     * Gets the state of the whiteboard tool currently in use by the user.
     *
     * @since 2.4.8
     *
     * @return The state of the whiteboard tool currently in use. See {@link MemberState MemberState}.
     */
    public MemberState getMemberState() {
        return memberState;
    }

    private MemberState memberState;

    /**
     * Gets the customized user information of the user that is passed in when the user joins the room.
     *
     * @since 2.4.8
     *
     */
    public Object getPayload() {
        return payload;
    }

    private Object payload;

    /**
     * Gets the member ID of the user.
     * <p>
     * When a user joins the live Interactive Whiteboard room in interactive mode, the SDK assigns a unique member ID for the user.
     *
     * @return The member ID of the user.
     */
    public Long getMemberId() {
        return memberId;
    }

    /**
     * Gets the whiteboard tool currently in use by the user.
     *
     * @since 2.4.8
     * @deprecated This method is deprecated. Use {@link #getMemberState() getMemberState} instead.
     *
     * @return The name of the whiteboard tool.
     */
    @Deprecated
    public String getCurrentApplianceName() {
        return memberState.getCurrentApplianceName();
    }

    /**
     * Gets the customized user information that is passed in when the user joins the room.
     *
     * @deprecated This method is deprecated. Use {@link #getPayload() getPayload} instead.
     *
     * @return The customized user information.
     */
    public MemberInformation getInformation() {
        return information;
    }

}
