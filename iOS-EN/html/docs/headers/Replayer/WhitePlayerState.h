//
//  WhitePlayerState.h
//  WhiteSDK
//
//  Created by yleaf on 2019/2/28.
//

#import "WhiteObject.h"
#import "WhiteDisplayerState.h"
#import "WhitePlayerConsts.h"

NS_ASSUME_NONNULL_BEGIN

/** The state of the `WhitePlayer` object. */
@interface WhitePlayerState : WhiteDisplayerState

/** The mode for watching the whiteboard playback. See [WhiteObserverMode](WhiteObserverMode)。 */
@property (nonatomic, assign, readonly) WhiteObserverMode observerMode;

@end

NS_ASSUME_NONNULL_END
