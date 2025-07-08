//
//  WhiteSlideAppParams.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * The `WhiteSlideAppParams` interface. Configuration options for notifications when rendering PPT slides.
 */
@interface WhiteSlideAppParams : WhiteObject

/**
 Whether to display rendering errors.
 
 - `YES`: Display rendering errors.
 - `NO`: (Default) Do not display rendering errors.
 */
@property (nonatomic, assign) BOOL showRenderError;

/**
 Whether to enable debug mode.
 - `YES`: Enabled.
 - `NO`: (Default) Disabled.
*/
@property (nonatomic, assign) BOOL debug;

/**
 Whether to enable the function of executing the next step by clicking on the PPT screen:
 - `YES`: Enable (default).
 - `NO`: Disable.
*/
@property (nonatomic, assign) BOOL enableGlobalClick;

/**
 Set the minimum frame rate (FPS) for PPT animation playback. The app will try to ensure that the actual FPS is higher than this value. The smaller the value, the lower the CPU overhead (default value is 25).
 */
@property (nonatomic, strong) NSNumber *minFPS;

/**
 Set the maximum frame rate (FPS) for PPT animation playback. The app will ensure that the actual FPS is lower than this value. The smaller the value, the lower the CPU overhead (default value is 40).
 */
@property (nonatomic, strong) NSNumber *maxFPS;

/**
 Set the rendering resolution multiplier. The default value is 1, which means displaying at the original PPT resolution.
 When the original resolution of the PPT appears blurry on a 2K or 4K screen, you can adjust this value to make the image clearer, but it will also increase the performance overhead.
 It is recommended to keep the default value of `1`.
 */
@property (nonatomic, strong) NSNumber *resolution;

/**
 Set the maximum resolution for the PPT.
 
 This value will affect both the resolution of the rendering canvas and the quality of the materials. Modifying this property on low-end devices can reduce memory consumption and improve black screen issues. The following values are available:
 
 - `0`: 360p, 640 * 360.
 
 - `1`: 540p, 960 * 540.
 
 - `2`: 720p, 1280 * 720. This is the default value for mobile devices.
 
 - `3`: HD, 920 * 1080.
 
 - `4`: 3K, 3200 × 1800. This is the default value for desktop devices. Any value greater than `4` will be treated as `4`.
 
 */
@property (nonatomic, strong) NSNumber *maxResolutionLevel;

/**
 Whether to force 2D rendering:
 - `YES`: Force 2D rendering.
 - `NO`: Do not force 2D rendering (default).
 Forcing 2D rendering will result in the loss of some 3D effects.
 */
@property (nonatomic, assign) BOOL forceCanvas;

/**
 The background color for PPT animation. The default value is `nil`, which means no background color.
 */
@property (nonatomic, copy, nullable) NSString *bgColor;

@end

NS_ASSUME_NONNULL_END
