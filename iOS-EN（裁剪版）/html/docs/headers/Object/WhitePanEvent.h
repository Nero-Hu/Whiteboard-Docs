//
//  WhitePanEvent.h
//  WhiteSDK
//
//  Created by yleaf on 2019/1/28.
//

#import "WhiteObject.h"
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/** The coordinates of the points in the whiteboard.*/
@interface WhitePanEvent : WhiteObject

/** The X coordinate of the points in the whiteboard.*/
@property (nonatomic, assign) CGFloat x;

/** The Y coordinate of the points in the whiteboard.*/
@property (nonatomic, assign) CGFloat y;

@end

NS_ASSUME_NONNULL_END
