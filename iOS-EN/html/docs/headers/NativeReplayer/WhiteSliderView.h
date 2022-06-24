//
//  WhiteProgressView.h
//  WhiteCombinePlayer
//
//  Created by yleaf on 2019/7/19.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN



/**
 The Whiteboard progress bar.
 */
@interface WhiteSliderView : UIView

/** Current progress. The value range is [0.0, 1.0]. */
@property (nonatomic, assign) CGFloat value;


/** Buffer progress. The value range is [0.0, 1.0]. */
@property (nonatomic, assign) CGFloat bufferValue;

@end

NS_ASSUME_NONNULL_END
