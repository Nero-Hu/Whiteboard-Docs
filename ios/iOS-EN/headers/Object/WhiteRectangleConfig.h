//
//  WhiteRectangleConfig.h
//  WhiteSDK
//
//  Created by yleaf on 2019/12/10.
//

#import "WhiteObject.h"
#import <UIKit/UIKit.h>
#import "WhiteCameraConfig.h"

NS_ASSUME_NONNULL_BEGIN

/**
 Configurations for the view rectangle.

 The view rectangle defines a rectangular area that the view must cover.

 After you set a view rectangle, the SDK automatically adjusts the view to fully contain the rectangular area, so as to ensure contents within the rectangle area are completely displayed.

 You can set a view rectangle according to the size of a PPT slide or image to be displayed, to ensure the same content is displayed completely on screens of different sizes.
 */
@interface WhiteRectangleConfig : WhiteObject

/**
 Initializes a `WhiteRectangleConfig` object. 
 
 In this method, pass in the `width`, `height`, and `mode` parameters. Based on the `width` and `height` you pass in, the SDK calculates `originX` and `originY`, the X and Y coordinates of the top left corner of the view rectangle in the world coordinate system, in the following ways:

 - `originX = - width / 2.0d`
 - `originY = - height / 2.0d`

 You can use this method to quickly display a PPT slide completely.
 
 @param width The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
 @param height The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
 @return An initialized `WhiteRectangleConfig` object.
 */
- (instancetype)initWithInitialPosition:(CGFloat)width height:(CGFloat)height;

/**
 Sets the animation mode of the view rectangle and initialize a `WhiteRectangleConfig` object. 

 In this method, pass in the `width`, `height`, and `mode` parameters. Based on the `width` and `height` you pass in, the SDK calculates `originX` and `originY`, the X and Y coordinates of the top left corner of the view rectangle in the world coordinate system, in the following ways:

 - `originX = - width / 2.0d`
 - `originY = - height / 2.0d`

 This method does not support setting the animation mode of the view rectangle. By default, the SDK sets the animation mode to `Continuous`.

 You can use this method to quickly display a PPT slide completely.
 
 @param width The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
 @param height The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
 @param mode The animation mode of the view rectangle. See [WhiteAnimationMode](WhiteAnimationMode).
 @return An initialized `WhiteRectangleConfig` object.
 */
- (instancetype)initWithInitialPosition:(CGFloat)width height:(CGFloat)height animation:(WhiteAnimationMode)mode;

/**
 Sets the coordinate of the view rectangle and initialize a `WhiteRectangleConfig` object.  

 In this method, pass in the `originX`, `originY`, `width`, `height`, and `mode` parameters.

 Based on these parameters, the SDK determines the position and size of the view rectangle in the world coordinate system.

 @param originX The X coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
 @param originY The Y coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
 @param width The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
 @param height The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
 @return An initialized `WhiteRectangleConfig` object.
 */
- (instancetype)initWithOriginX:(CGFloat)originX originY:(CGFloat)originY width:(CGFloat)width height:(CGFloat)height;

/**
 Sets the coordinate and animation mode of the view rectangle and initialize a `WhiteRectangleConfig` object.  

 In this method, pass in the `originX`, `originY`, `width`, `height`, and `mode` parameters.
 Based on these parameters, the SDK determines the position and size of the view rectangle in the world coordinate system.
 
 @param originX The X coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
 @param originY The Y coordinate of the top left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
 @param width The width of the view rectangle. Do not set this parameter to a value smaller than the width of the area you want to display; otherwise, the user may not see the area completely.
 @param height The height of the view rectangle. Do not set this parameter to a value smaller than the height of the area you want to display; otherwise, the user may not see the area completely.
 @param mode The animation mode of the view rectangle. See [WhiteAnimationMode](WhiteAnimationMode).
 @return An initialized `WhiteRectangleConfig` object.
 */
- (instancetype)initWithOriginX:(CGFloat)originX originY:(CGFloat)originY width:(CGFloat)width height:(CGFloat)height animation:(WhiteAnimationMode)mode;

/** The X coordinate of the top left corner of the view rectangle in the world coordinate system. */
@property (nonatomic, assign) CGFloat originX;

/** The Y coordinate of the top left corner of the view rectangle in the world coordinate system. */
@property (nonatomic, assign) CGFloat originY;

/** The width of the view rectangle, which is cannot be smaller than the width of the area you want to display; otherwise, the user may not see the area completely. */
@property (nonatomic, assign) CGFloat width;

/** The height of the view rectangle, which is cannot be smaller than the height of the area you want to display; otherwise, the user may not see the area completely. */
@property (nonatomic, assign) CGFloat height;

/** The animation mode of the view rectangle. See [WhiteAnimationMode](WhiteAnimationMode). */
@property (nonatomic, assign) WhiteAnimationMode animationMode;

@end


NS_ASSUME_NONNULL_END
