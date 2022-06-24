//
//  WhiteCameraState.h
//  Whiteboard
//
//  Created by yleaf on 2021/1/20.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/**
 The state of the view.
 
 @since 2.11.12
 */
@interface WhiteCameraState : WhiteObject

//@property (nonatomic, strong) NSNumber *width;
//@property (nonatomic, strong) NSNumber *height;

/**
 The X coordinate of the center of the view in the world coordinate system. The initial value is `0.0`.
 */
@property (nonatomic, strong) NSNumber *centerX;

/**
 The X coordinate of the center of the view in the world coordinate system. The initial value is `0.0`.
 */
@property (nonatomic, strong) NSNumber *centerY;

/** The scale factor of the view. The initial value is `1.0`. */
@property (nonatomic, strong) NSNumber *scale;

@end

NS_ASSUME_NONNULL_END
