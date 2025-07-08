package com.herewhite.sdk.domain;

/**
 * Created by buhe on 2018/8/11.
 */

/**
 * Settings of the whiteboard tool in use.
 */
public class MemberState extends WhiteObject {
    private String currentApplianceName;
    private int[] strokeColor;
    private Double strokeWidth;
    private Double textSize;
    private int[] textColor;
    private Boolean textCanSelectText;
    private Boolean dottedLine;
    private Integer pencilEraserSize;
    private Double strokeOpacity;
    private Double fillOpacity;
    private int[] fillColor;
    
    public MemberState() {
    }

    /**
     * Gets the name of the whiteboard tool currently in use.
     *
     * @return The name of the whiteboard tool currently in use.
     */
    public String getCurrentApplianceName() {
        return currentApplianceName;
    }

    /**
     * Sets the whiteboard tool.
     *
     * @param currentApplianceName The whiteboard tool. See {@link Appliance}.
     */
    public void setCurrentApplianceName(String currentApplianceName) {
        this.currentApplianceName = currentApplianceName;
    }

    /**
     * Sets the whiteboard tool.
     *
     * @param currentApplianceName The whiteboard tool. See {@link Appliance}.
     * @param shapeType The shape type. The default value is `Triangle`. See {@link com.herewhite.sdk.domain.ShapeType ShapeType}.
     */
    public void setCurrentApplianceName(String currentApplianceName, ShapeType shapeType) {
        this.currentApplianceName = currentApplianceName;

        if (Appliance.SHAPE.equals(currentApplianceName)) {
            if (shapeType == null) {
                this.shapeType = ShapeType.Triangle;
            }
        }
    }

    /**
     * Sets the shape type.
     *
     * @since 2.12.26
     *
     * @param shapeType The shape type. See {@link com.herewhite.sdk.domain.ShapeType ShapeType}.
     */
    public void setShapeType(ShapeType shapeType) {
        this.currentApplianceName = Appliance.SHAPE;
        this.shapeType = shapeType;
    }

    /**
     * Gets the shape type.
     *
     * @since 2.12.26
     *
     * @return The shape type. See {@link com.herewhite.sdk.domain.ShapeType ShapeType}。
     */
    public ShapeType getShapeType() {
        return shapeType;
    }

    /**
     * Gets the stroke color.
     *
     * @return The stroke color in RGB format, for example, `0, 0, 255` (blue).
     */
    public int[] getStrokeColor() {
        return strokeColor;
    }

    /**
     * Sets the stroke color.
     *
     * @param strokeColor The stroke color in RGB format, for example, `0, 0, 255` (blue).
     */
    public void setStrokeColor(int[] strokeColor) {
        this.strokeColor = strokeColor;
    }

    /**
     * Gets the text color for the text tool.
     *
     * @return An array of integers representing the RGB values of the text color.
     */
    public int[] getTextColor() {
        return textColor;
    }

    /**
     * Sets the text color for the text tool.
     *
     * @param textColor An array of integers representing the RGB values of the text color.
     */
    public void setTextColor(int[] textColor) {
        this.textColor = textColor;
    }

    /**
     * Gets the stroke width.
     *
     * @return The stroke width.
     */
    public double getStrokeWidth() {
        return strokeWidth;
    }

    /**
     * Sets the stroke width.
     *
     * @param strokeWidth The stroke width.
     */
    public void setStrokeWidth(double strokeWidth) {
        this.strokeWidth = strokeWidth;
    }


    /**
     * Gets the font size of the text.
     *
     * @return The font size of the text.
     */
    public double getTextSize() {
        return textSize;
    }

    /**
     * Sets the font size of the text.
     *
     * @param textSize The font size of the text. The Chrome browser automatically adjusts fonts smaller than 12 to 12.
     */
    public void setTextSize(double textSize) {
        this.textSize = textSize;
    }

    /**
     * Gets whether directly selecting and editing whiteboard text is allowed.
     *
     * @return Whether directly selecting and editing whiteboard text is allowed.
     */
    public Boolean getTextCanSelectText() {
        return textCanSelectText;
    }

    /**
     * Sets whether to allow directly selecting and editing whiteboard text.
     *
     * @param textCanSelectText Whether to allow directly selecting and editing whiteboard text:
     *                          - `true`：Allow directly selecting and editing whiteboard text.
     *                          - `false`：Do not allow directly selecting and editing whiteboard text.
     */
    public void setTextCanSelectText(Boolean textCanSelectText) {
        this.textCanSelectText = textCanSelectText;
    }

    /**
     * Gets whether to support drawing dotted lines:
     *
     * @return Whether to support drawing dotted lines:
     */
    public Boolean getDottedLine() {
        return dottedLine;
    }

    /**
     * Sets whether to support drawing dotted lines:
     * This feature only applies to NewPencil. You need to set disableNewPencil to false before joining the room. 
     *
     * @param dottedLine Whether to support drawing dotted lines:
     *                   - `true`：Support drawing dotted lines.
     *                   - `false`：(Default) Do not support drawing dotted lines.
     */
    public void setDottedLine(Boolean dottedLine) {
        this.dottedLine = dottedLine;
    }

    /**
     * Gets the size of the pencil eraser tool.
     *
     * @return The size of the pencil eraser tool.
     */
    public Integer getPencilEraserSize() {
        return pencilEraserSize;
    }

    /**
     * Sets the size of the pencil eraser tool.
     *
     * @param pencilEraserSize The size of the pencil eraser tool.
     */
    public void setPencilEraserSize(Integer pencilEraserSize) {
        this.pencilEraserSize = pencilEraserSize;
    }

    /**
     * Gets the stroke opacity.
     * 
     * @since 2.16.100
     *
     * @return The stroke opacity. The value ranges from [0.0, 1.0], where 0 means completely transparent and 1 means completely opaque.
     */
    public Double getStrokeOpacity() {
        return strokeOpacity;
    }

    /**
     * Sets the stroke opacity.
     * 
     * @since 2.16.100
     *
     * @param strokeOpacity The stroke opacity. The value ranges from [0.0, 1.0], where 0 means completely transparent and 1 means completely opaque.
     */
    public void setStrokeOpacity(Double strokeOpacity) {
        this.strokeOpacity = strokeOpacity;
    }

    /**
     * Gets the fill opacity for shapes.
     * 
     * @since 2.16.100
     *
     * @return The fill opacity for shapes. The value ranges from [0.0, 1.0], where 0 means completely transparent and 1 means completely opaque.
     */
    public Double getFillOpacity() {
        return fillOpacity;
    }

    /**
     * Sets the fill opacity for shapes.
     * 
     * @since 2.16.100
     *
     * @param fillOpacity The fill opacity for shapes.
     */
    public void setFillOpacity(Double fillOpacity) {
        this.fillOpacity = fillOpacity;
    }

    /**
     * Gets the fill color for shapes.
     * 
     * @since 2.16.100
     *
     * @return The fill color for shapes, in RGB format. For example, [0, 0, 255] represents blue.
     */
    public int[] getFillColor() {
        return fillColor;
    }

    /**
     * Sets the fill color for shapes.
     * 
     * @since 2.16.100
     *
     * @param fillColor The fill color for shapes, in RGB format. For example, [0, 0, 255] represents blue.
     */
    public void setFillColor(int[] fillColor) {
        this.fillColor = fillColor;
    }
}
