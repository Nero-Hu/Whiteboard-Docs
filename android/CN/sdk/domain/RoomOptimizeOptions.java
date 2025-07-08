package com.herewhite.sdk.domain;


/**
 * 白板渲染优化配置项。
 */
public class RoomOptimizeOptions extends WhiteObject {

    /**
     * 白板绘制的刷新间隔，取值范围为 [0,120] (ms)，建议传入 20 的倍数。
     * 刷新间隔越低，笔迹显示越流畅，性能开销越大；刷新间隔越高，笔迹越卡，性能消耗越少。
     * 对于性能比较差的设备或大屏设备，建议设置成比较大的值，比如 60。
     */
    private Integer useLowTaskAnimation;

    /**
     * 是否使用单个画布：
     *  - `true`：使用单个画布，应用浮动画布优化策略。
     *  - `false`：使用双画布交替绘制。
     * 
     * 白板默认使用两个画布交替绘制以避免在部分设备上绘制时可能出现的画面闪烁现象，使用单个画布绘制可以避免重绘，降低性能消耗。
     */
    private Boolean useSinglerCanvas;

    public Integer getUseLowTaskAnimation() {
        return useLowTaskAnimation;
    }

    public void setUseLowTaskAnimation(Integer useLowTaskAnimation) {
        this.useLowTaskAnimation = useLowTaskAnimation;
    }

    public Boolean getUseSinglerCanvas() {
        return useSinglerCanvas;
    }

    public void setUseSinglerCanvas(Boolean useSinglerCanvas) {
        this.useSinglerCanvas = useSinglerCanvas;
    }
}
