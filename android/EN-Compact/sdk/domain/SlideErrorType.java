package com.herewhite.sdk.domain;

public enum SlideErrorType {
    /**
     * ResourceError: Triggered when remote resources (such as JSON, PNG) that the PPT depends on are unavailable,
     * after which the current page cannot be interacted with.
     * Recovery method: Re-render the current page or navigate to the next page.
     */
    RESOURCE_ERROR,

    /**
     * RuntimeError: Triggered by unknown exceptions, after which the current page cannot be interacted with.
     * Recovery method: Navigate to the next page.
     */
    RUNTIME_ERROR,

    /**
     * RuntimeWarn: Unknown warnings that occur during animation, after which the current frame of the animation appears abnormal,
     * but it does not affect the next frame or page interaction.
     * Recovery method: No special handling required.
     */
    RUNTIME_WARN,

    /**
     * CanvasCrash: Triggered due to insufficient memory, or the canvas being unexpectedly removed
     * (when the canvas element is removed without calling slide.destroy()), after which the canvas element displays a white screen.
     * Recovery method: Refresh the page, or destroy the slide object and recreate it.
     */
    CANVAS_CRASH,

    /**
     * Unknown error type
     */
    UNKNOWN
} 