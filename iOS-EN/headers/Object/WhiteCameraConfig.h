//
//  WhiteCameraConfig.h
//  WhiteSDK
//
//  Created by yleaf on 2019/12/10.
//

#import "WhiteObject.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/** Animation mode for switching the view. */
typedef NS_ENUM(NSInteger, WhiteAnimationMode) {
    /**(Default) The view switches continuously. */
    WhiteAnimationModeContinuous,
    /** The view switches instantly. */
    WhiteAnimationModeImmediately,
};

#pragma mark - CameraConfig

/** Configurations for the view.
 */
@interface WhiteCameraConfig : WhiteObject

/** The X coordinate of the center of the view in the world coordinate system, which is `0` when not filled.  */
@property (nonatomic, strong, nullable) NSNumber *centerX;
/** The Y coordinate of the center of the view in the world coordinate system, which is `0` when not filled. *///TODO
@property (nonatomic, strong, nullable) NSNumber *centerY;

/** The scale factor of the view. */
@property (nonatomic, strong, nullable) NSNumber *scale;

/** Animation mode for switching the view. 

The defalt value is `WhiteAnimationModeContinuous`. See [WhiteAnimationMode](WhiteAnimationMode).  */
@property (nonatomic, assign) WhiteAnimationMode animationMode;

@end

NS_ASSUME_NONNULL_END
