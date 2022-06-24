//
//  WhiteVideoView.h
//  WhiteCombinePlayer
//
//  Created by yleaf on 2019/7/15.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class AVPlayer;
/** The native player view. */
@interface WhiteVideoView : UIView

/**
 Sets the AVPlayer to play.

 @param player The AVPlayer.
 */
- (void)setAVPlayer:(AVPlayer *)player;

@end

NS_ASSUME_NONNULL_END
