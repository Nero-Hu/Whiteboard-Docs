package com.herewhite.sdk.domain;

/**
 * The `EventEntry` class, for getting customized events.
 */
public class EventEntry extends WhiteObject {
    private String eventName;
    private Object payload;
    private String scope;
    private long authorId;

    /// @cond test
    /**
     * Hidden in the documentation
     */
    public String getScope() {
        return scope;
    }
    /// @endcond

    /**
     * Gets the user ID of the event trigger.

     * If it is a system event, the user ID is `AdminObserverId`.
     *
     * @return The user ID of the event trigger.
     */
    public long getAuthorId() {
        return authorId;
    }

    /**
     * Gets the name of the event.
     *
     * @return The name of the event.
     */
    public String getEventName() {
        return eventName;
    }

    /**
     * Gets the content of the event.
     *
     * @return The content of the event.
     */
    public Object getPayload() {
        return payload;
    }
}
