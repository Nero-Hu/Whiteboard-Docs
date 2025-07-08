package com.herewhite.sdk.domain;

// Created by buhe on 2018/8/11.

/**
 * `MemberState` 类，用于设置互动白板实时房间的白板工具状态。
 */
public class MemberState extends WhiteObject {
    /**
     * 白板工具名称，详见 {@link Appliance}。
     */
    private String currentApplianceName;

    /**
     * 图形工具的类型。详见 {@link com.herewhite.sdk.domain.ShapeType ShapeType}。
     */
    private ShapeType shapeType;
    /**
     * 线条颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    private int[] strokeColor;
    /**
     * 线条粗细。
     */
    private Double strokeWidth;
    /**
     * 字体大小。Chrome 浏览器对于小于 12 的字体会自动调整为 12。
     */
    private Double textSize;
    /**
     * 文本颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    private int[] textColor;
    /**
     * 文本是否可直接选择。
     */
    private Boolean textCanSelectText;
    /**
     * 新铅笔是否画虚线。
     */
    private Boolean dottedLine;
    /**
     * 铅笔橡皮的尺寸，取值范围为 [1,3]，值越大尺寸越大。
     */
    private Integer pencilEraserSize;

    /**
     * 线条透明度。取值范围为 [0.0, 1.0]，0 表示完全透明，1 表示完全不透明。
     */
    private Double strokeOpacity;

    /**
     * 图形填充透明度。取值范围为 [0.0, 1.0]，0 表示完全透明，1 表示完全不透明。
     */
    private Double fillOpacity;

    /**
     * 图形填充颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    private int[] fillColor;


    public MemberState() {
    }

    /**
     * 获取互动白板实时房间内当前使用的白板工具名称。
     *
     * @return 互动白板实时房间内当前使用的白板工具名称。
     */
    public String getCurrentApplianceName() {
        return currentApplianceName;
    }

    /**
     * 设置互动白板实时房间内使用的白板工具。
     *
     * @param currentApplianceName 白板工具名称，详见 {@link Appliance}。
     */
    public void setCurrentApplianceName(String currentApplianceName) {
        this.setCurrentApplianceName(currentApplianceName, null);
    }

    /**
     * 设置互动白板实时房间内使用的白板工具。
     *
     * @param currentApplianceName 白板工具名称，详见 {@link Appliance Appliance}。
     * @param shapeType 图形工具，默认值为 `Triangle`，详见 {@link com.herewhite.sdk.domain.ShapeType ShapeType}。
     */
    public void setCurrentApplianceName(String currentApplianceName, ShapeType shapeType) {
        this.currentApplianceName = currentApplianceName;

        if (Appliance.SHAPE.equals(currentApplianceName)) {
            this.shapeType = shapeType != null ? shapeType : ShapeType.Triangle;
        }
    }

    /**
     * 获取图形工具的类型。
     *
     * @since 2.12.26
     *
     * @return 图形工具的类型。详见 {@link com.herewhite.sdk.domain.ShapeType ShapeType}。
     */
    public ShapeType getShapeType() {
        return shapeType;
    }

    /**
     * 设置图形工具的类型。
     *
     * @since 2.12.26
     *
     * @param shapeType 图形工具的类型。详见 {@link com.herewhite.sdk.domain.ShapeType ShapeType}。
     */
    public void setShapeType(ShapeType shapeType) {
        this.currentApplianceName = Appliance.SHAPE;
        this.shapeType = shapeType;
    }

    /**
     * 获取用户设置的线条颜色。
     *
     * @return 线条颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    public int[] getStrokeColor() {
        return strokeColor;
    }

    /**
     * 设置线条颜色。
     *
     * @param strokeColor 线条颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    public void setStrokeColor(int[] strokeColor) {
        this.strokeColor = strokeColor;
    }

    /**
     * 获取文本工具中文字的颜色。
     *
     * @return 文本颜色的数组。
     */
    public int[] getTextColor() {
        return textColor;
    }

    /**
     * 设置文本工具中文字的颜色。
     *
     * @param textColor 文本颜色的数组。
     */
    public void setTextColor(int[] textColor) {
        this.textColor = textColor;
    }

    /**
     * 获取用户设置的线条粗细。
     *
     * @return 线条粗细。
     */
    public double getStrokeWidth() {
        return strokeWidth;
    }

    /**
     * 设置线条粗细。
     *
     * @param strokeWidth 线条粗细。
     */
    public void setStrokeWidth(double strokeWidth) {
        this.strokeWidth = strokeWidth;
    }


    /**
     * 获取用户设置的字体大小。
     *
     * @return 字体大小。
     */
    public double getTextSize() {
        return textSize;
    }

    /**
     * 设置字体大小。
     *
     * @param textSize 字体大小。Chrome 浏览器对于小于 12 的字体会自动调整为 12。
     */
    public void setTextSize(double textSize) {
        this.textSize = textSize;
    }

    /**
     * 获取文本是否可直接选择并编辑。
     *
     * @return 是否开启文本可选择并编辑。
     */
    public Boolean getTextCanSelectText() {
        return textCanSelectText;
    }

    /**
     * 设置文字是否可以直接选择并编辑。
     *
     * @param textCanSelectText 文字是否可否直接选择并编辑：
     *                          - `true`：文字可直接选择并编辑。
     *                          - `false`：文字不可直接选择并编辑。
     */
    public void setTextCanSelectText(Boolean textCanSelectText) {
        this.textCanSelectText = textCanSelectText;
    }

    /**
     * 获取新铅笔是否画虚线。
     *
     * @return 是否画虚线。
     */
    public Boolean getDottedLine() {
        return dottedLine;
    }

    /**
     * 设置铅笔工具画虚线。
     * 如需更改此配置，需要在加入房间时设置 {@link com.herewhite.sdk.RoomParams#setDisableNewPencil (false)}}。
     *
     * @param dottedLine 是否画虚线。
     *                   - `true`：画虚线。
     *                   - `false`：画直线。
     */
    public void setDottedLine(Boolean dottedLine) {
        this.dottedLine = dottedLine;
    }

    /**
     * 获取铅笔橡皮的尺寸。
     *
     */
    public Integer getPencilEraserSize() {
        return pencilEraserSize;
    }

    /**
     * 设置铅笔橡皮的尺寸
     * 如需更改此配置，需要在加入房间时设置 {@link com.herewhite.sdk.RoomParams#setDisableNewPencil (false)}}。
     *
     * @param pencilEraserSize 铅笔橡皮的尺寸，取值范围为 [1,3]，值越大尺寸越大。
     */
    public void setPencilEraserSize(Integer pencilEraserSize) {
        this.pencilEraserSize = pencilEraserSize;
    }

    /**
     * 获取线条透明度。
     * 
     * @since 2.16.100
     *
     * @return 线条透明度。取值范围为 [0.0, 1.0]，0 表示完全透明，1 表示完全不透明。
     */
    public Double getStrokeOpacity() {
        return strokeOpacity;
    }

    /**
     * 设置线条透明度。
     * 
     * @since 2.16.100
     *
     * @param strokeOpacity 线条透明度。取值范围为 [0.0, 1.0]，0 表示完全透明，1 表示完全不透明。
     */
    public void setStrokeOpacity(Double strokeOpacity) {
        this.strokeOpacity = strokeOpacity;
    }

    /**
     * 获取图形填充透明度。
     * 
     * @since 2.16.100
     *
     * @return 图形填充透明度。取值范围为 [0.0, 1.0]，0 表示完全透明，1 表示完全不透明。
     */
    public Double getFillOpacity() {
        return fillOpacity;
    }

    /**
     * 设置图形填充透明度。
     * 
     * @since 2.16.100
     *
     * @param fillOpacity 图形填充透明度。
     */
    public void setFillOpacity(Double fillOpacity) {
        this.fillOpacity = fillOpacity;
    }

    /**
     * 获取图形填充颜色。
     * 
     * @since 2.16.100
     *
     * @return 图形填充颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    public int[] getFillColor() {
        return fillColor;
    }

    /**
     * 设置图形填充颜色。
     * 
     * @since 2.16.100
     *
     * @param fillColor 图形填充颜色，为 RGB 格式，例如，[0, 0, 255] 表示蓝色。
     */
    public void setFillColor(int[] fillColor) {
        this.fillColor = fillColor;
    }
}
