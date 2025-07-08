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

/** 白板回放的状态。 */
@interface WhitePlayerState : WhiteDisplayerState

/** 白板回放的查看模式。详见 [WhiteObserverMode](WhiteObserverMode)。 */
@property (nonatomic, assign, readonly) WhiteObserverMode observerMode;

@end

NS_ASSUME_NONNULL_END
