//
//  CameraBound.h
//  WhiteSDK
//
//  Created by yleaf on 2019/9/5.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

#pragma mark - WhiteContentScaleMode
/**
 * The scale mode of the viewable area.
 */
typedef NS_ENUM(NSUInteger, WhiteContentMode) {
    /** (Default) Resizes the viewable area by the specified `scale`. */
    WhiteContentModeScale,
    /** Resizes the viewable area proportionately until its longer sides meet with the screen sides perpendicular to them, so that the viewable area is completely displayed on the screen. */
    WhiteContentModeAspectFit,
    /** Resizes the viewable area proportionately until its longer sides meet with the screen sides perpendicular to them, so that the viewable area is completely displayed on the screen.
     Then, resizes the viewable area by a specified scale factor. 
     */
    WhiteContentModeAspectFitScale,
    /** Resizes the viewable area proportionately until its longer sides meet with the screen sides perpendicular to them, so that the viewable area is completely displayed on the screen.
     Then, adds the specified spaces around the viewable area. 
     */
    WhiteContentModeAspectFitSpace,
    /** Resizes the viewable area proportionately until its shorter sides meet with the screen sides perpendicular to them, so that the viewable area completely covers the screen. */
    WhiteContentModeAspectFill,
    /** Resizes the viewable area proportionately until its shorter sides meet with the screen sides perpendicular to them, so that the viewable area completely covers the screen.
     Then, resizes the viewable area by the specified scale factor.
     */
    WhiteContentModeAspectFillScale,
};

#pragma mark - WhiteContentMode

/** Configurations for the scale mode and scale factor of the viewable area. */
@interface WhiteContentModeConfig : WhiteObject

- (instancetype)init NS_UNAVAILABLE;

/** Initialize a `WhiteContentMode` object.
 @param scaleMode The scale factor of the viewable area. The default value is `1.0`, which means keeping the original size.

 @return An initialized `WhiteContentMode` object.
 */
- (instancetype)initWithContentMode:(WhiteContentMode)scaleMode;

/** The scale mode of the viewable area. See [WhiteContentMode](WhiteContentMode).*/
@property (nonatomic, assign, readonly) WhiteContentMode contentMode;
/** The scale factor of the viewable area. 
 
 This method takes effect only when the scale mode is set as one the following values: 

 - `WhiteContentModeScale`
 - `WhiteContentModeAspectFitScale`
 - `WhiteContentModeAspectFillScale`
 */
@property (nonatomic, assign) CGFloat scale;
/** The space (pixels) added around the viewable area. This method takes effect only when the `scaleMode` is `WhiteContentModeAspectFitSpace`. */
@property (nonatomic, assign) CGFloat space;

@end

#pragma mark - WhiteCameraBound

/** The boundaries for the view.

 The area enclosed by the boundaries is the viewable area. Within the viewable area, the user can flexibly move or zoom the view.
 When the user tries to move the view beyond the viewable area, the SDK automatically drags the view back into the viewable area.
 */
@interface WhiteCameraBound : WhiteObject

/**
 Sets the center of the viewable area and initializes the `WhiteCameraBound` object.

 @param visionCenter The coordinate of the center in the viewable area in the world coordinate system (taking the center of the initial whiteboard as the origin).

 @param minConfig The minimum scale factor of the viewable area.

 @param maxConfig The maximum scale factor of the viewable area.

 @return An initialized `WhiteCameraBound` object.
 */
- (instancetype)initWithCenter:(CGPoint)visionCenter minContent:(WhiteContentModeConfig *)minConfig maxContent:(WhiteContentModeConfig *)maxConfig;

/**
 Sets the frame of the viewable area and initializes the `WhiteCameraBound` object.

 @param visionFrame The frame, that is, the width and height of the viewable area。

 @param minConfig The minimum frame (Frame * miniScale) of the viewable area.

 @param maxConfig The maximum frame (Frame * maxScale) of the viewable area.

 @return An initialized `WhiteCameraBound` object.
 */
- (instancetype)initWithFrame:(CGRect)visionFrame minContent:(WhiteContentModeConfig *)minConfig maxContent:(WhiteContentModeConfig *)maxConfig;

/** 
 Sets the default minimum scale mode of the viewable area.

 @param miniScale The minimum scale factor of the viewable area.

 @param maxScale The maximum scale factor of the viewable area.
*/
+ (instancetype)defaultMinContentModeScale:(CGFloat )miniScale maxContentModeScale:(CGFloat )maxScale;

/** The X coordinate of the center of the viewable area in the world coordinate system. The default value is `0.0`. */
@property (nonatomic, nullable, strong) NSNumber *centerX;
/** The Y coordinate of the center of the viewable area in the world coordinate system. The default value is `0.0`.*/
@property (nonatomic, nullable, strong) NSNumber *centerY;
/** The width (pixels) of the viewable area. If you do not set this parameter, the viewable area has no width limit. */
@property (nonatomic, nullable, strong) NSNumber *width;
/** The height (pixels) of the viewable area. If you do not set this parameter, the viewable area has no height limit. */
@property (nonatomic, nullable, strong) NSNumber *height;

/** The scale mode and the maximum scale factor of the viewable area. See [WhiteContentModeConfig](WhiteContentModeConfig). */
@property (nonatomic, nullable, strong) WhiteContentModeConfig *maxContentMode;
/** The scale mode and the minimum scale factor of the viewable area. See [WhiteContentModeConfig](WhiteContentModeConfig).*/
@property (nonatomic, nullable, strong) WhiteContentModeConfig *minContentMode;

@end

NS_ASSUME_NONNULL_END
