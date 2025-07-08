package com.herewhite.sdk.domain;

/**
 * The `FrequencyEventListener` interface, for reporting high-frequency events.
 */
public interface FrequencyEventListener {
    /**
     * Reports high-frequency events.
     *
     * @param events The high-frequency events. See {@link EventEntry}.
     */
    void onEvent(EventEntry[] events);
}
