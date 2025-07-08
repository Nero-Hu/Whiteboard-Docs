package com.herewhite.sdk.domain;

/**
 * The `EventListener` interface, for reporting customized events.
 */
public interface EventListener {
    /**
     * Reports a customized event.
     *
     * @param eventEntry The customized event. See {@link EventEntry}.
     */
    void onEvent(EventEntry eventEntry);
}
