//
//  WhiteSlideAppParams.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * `WhiteSlideAppParams` 接口，主要用于 PPT 渲染相关的显示配置。
 */
@interface WhiteSlideAppParams : WhiteObject

/**
 是否显示 PPT 中的错误提示。
 
 - `YES`：显示。
 - `NO`：不显示（默认）。
 */
@property (nonatomic, assign) BOOL showRenderError;

/**
 是否开启 Debug 模式。

 - `YES`：开启。
 - `NO`：不开启（默认）。
*/
@property (nonatomic, assign) BOOL debug;

/**
 是否开启点击 PPT 画面执行下一步功能：

 - `YES`：开启（默认）。
 - `NO`：不开启。
*/
@property (nonatomic, assign) BOOL enableGlobalClick;

/**
 设置 PPT 动画播放的最小 FPS, 应用会尽量保证实际 FPS 高于此值, 此值越小, CPU 开销越小（默认值为 25）。
 */
@property (nonatomic, strong) NSNumber *minFPS;

/**
 设置 PPT 动画播放的最大 FPS, 应用会保证实际 FPS 低于此值, 此值越小, CPU 开销越小（默认值为 30）。
 */
@property (nonatomic, strong) NSNumber *maxFPS;

/**
 设置渲染分辨倍率。
 
 原始 PPT 有自己的像素尺寸，当在 2K 或者 4K 屏幕下，如果按原始 PPT 分辨率显示，画面会比较模糊。可以调整此值，使画面更清晰，同时性能开销也变高。建议保持默认值 `1`。
 */
@property (nonatomic, strong) NSNumber *resolution;

/**
 设置 PPT 最大分辨率。
 
 该值将同时影响渲染画布的分辨率和材质质量。在低端机上修改该属性可降低内存消耗、改善黑屏现象。可取以下值：
 
 - `0`：360p，640 * 360。
 
 - `1`：540p，960 * 540。
 
 - `2`：720p，1280 * 720。移动端设备将默认设为该值。
 
 - `3`：HD，920 * 1080。
 
 - `4`：3K，3200 × 1800。桌面端设备将默认设为该值。传入大于 `4` 的值会被视为 `4`。
 
 */
@property (nonatomic, strong) NSNumber *maxResolutionLevel;

/**
 是否强制使用 2D 渲染：

 - `YES`：强制使用 2D 渲染。
 - `NO`：不强制使用 2D 渲染（默认）。

 强制使用 2D 渲染将损失部分 3D 效果。
 */
@property (nonatomic, assign) BOOL forceCanvas;

/**
 PPT 动画的背景色。默认值为 `nil`，代表无背景色。
 */
@property (nonatomic, copy, nullable) NSString *bgColor;


@end

NS_ASSUME_NONNULL_END
