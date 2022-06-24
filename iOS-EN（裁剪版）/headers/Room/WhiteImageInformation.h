//
//  WhiteImageInformation.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/15.
//

#import "WhiteObject.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/** Image information. */
@interface WhiteImageInformation : WhiteObject

/** Sets the frame of the image and initialize the `WhiteImageInformation` object.
 @param frame The frame of the image, which include width, height and the coordinate of the upper left corner (in the whiteboard coordinate system).

 @return Initialized `WhiteImageInformation` object.
*/
- (instancetype)initWithFrame:(CGRect)frame;

/** Sets the size of the image and initialize the `WhiteImageInformation` object.
 @param size The picture size.

 @return Initialized `WhiteImageInformation` object.
*/
- (instancetype)initWithSize:(CGSize)size;

/** Sets the UUID and frame of the image and initialize the `WhiteImageInformation` object.
 @param uuid The unique identifier (UUID) of the image.
 @param frame The frame of the image, which include width, height and the coordinate of the upper left corner (in the whiteboard coordinate system).
 @return Initialized `WhiteImageInformation` object.
*/
- (instancetype)initWithUuid:(NSString *)uuid frame:(CGRect)frame;

/** The UUID of the image.

 The UUID of the image is a string, which is the identifier of the image and must be unique in the live interactive whiteboard room.
 */
@property (nonatomic, copy) NSString *uuid;
/** The X coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin). */
@property (nonatomic, assign) CGFloat centerX;
/** The Y coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).*/
@property (nonatomic, assign) CGFloat centerY;
/** The width (px) of the image. */
@property (nonatomic, assign) CGFloat width;
/** The height (px) of the image. */
@property (nonatomic, assign) CGFloat height;

/**
 Whether the image is locked.
 When an image is locked, users cannot move or zoom the image.
 
 - `YES`：Locks the image.
 - `NO`：(Default) Do not lock the image.
 */
@property (nonatomic, assign) BOOL locked;

@end

NS_ASSUME_NONNULL_END
