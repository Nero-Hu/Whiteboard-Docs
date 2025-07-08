package com.herewhite.sdk.domain;

/**
 * The `AkkoEvent` class, for setting the customized events.
 */
public class AkkoEvent extends WhiteObject {
    private String eventName;
    private Object payload;

    /**
     * The `AkkoEvent` constructor, for initializing a customized event.
     *
     * @param eventName The name of the customized event.
     * @param payload   The content of the customized event, which must extend the {@link WhiteObject} class to ensure the data format is correct.
     */
    public AkkoEvent(String eventName, Object payload) {
        this.eventName = eventName;
        this.payload = payload;
    }

    /**
     * Gets the name of the customized event.
     *
     * @return The name of the customized event.
     */
    public String getEventName() {
        return eventName;
    }

    /**
     * Sets the name of the customized event.
     *
     * @param eventName The name of the customized event.
     */
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    /**
     * Gets the content of the customized event.
     *
     * @return The content of the customized event.
     */
    public Object getPayload() {
        return payload;
    }

    /**
     * sets the content of the customized event.
     *
     * @param payload The content of the customized event, which must extend the {@link WhiteObject} class to ensure the data format is correct.
     */
    public void setPayload(Object payload) {
        this.payload = payload;
    }
}
