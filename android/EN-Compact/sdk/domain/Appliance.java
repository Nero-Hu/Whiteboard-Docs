package com.herewhite.sdk.domain;

/**
 * Whiteboard tools.
 */
public class Appliance {
    /**
     * Pencil.
     */
    public final static String PENCIL = "pencil";
    /**
     * Selector.
     */
    public final static String SELECTOR = "selector";
    /**
     * Rectangle.
     */
    public final static String RECTANGLE = "rectangle";
    /**
     * Ellipse.
     */
    public final static String ELLIPSE = "ellipse";
    /**
     * Eraser.
     */
    public final static String ERASER = "eraser";
    /**
     * Text input box.
     */
    public final static String TEXT = "text";
    /**
     * Straight line.
     */
    public final static String STRAIGHT = "straight";
    /**
     * Arrow.
     */
    public final static String ARROW = "arrow";
    /**
     * Hand.
     */
    public final static String HAND = "hand";
    /**
     * Laser pointer.
     */
    public final static String LASER_POINTER = "laserPointer";
    /**
     * Clicker, which can be used for clicking and selectin content on the HTML5 file.
     */
    public final static String CLICKER = "clicker";
    /**
     * Shape tool.
     */
    public final static String SHAPE = "shape";
    /**
     * The eraser tool for erasing partial pencil strokes. This tool only works for `NewPencil` and requires `disableNewPencil` to be set to `false` before use.
     */
    public final static String PENCIL_ERASER = "pencilEraser";
    /**
     * The laser pencil tool.
     * This tool is only available when `WhiteSdkConfiguration.enableAppliancePlugin` is enabled.
     */
    public final static String LASER_PENCIL = "laserPen";
}
