//
//  WhiteSlideAppParams.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * The `WhiteSlideAppParams` interface. Configuration options for notifications when rendering PPT slides.
 */
@interface WhiteSlideAppParams : WhiteObject

/**
 Whether to display rendering errors.
 
 - `YES`: Display rendering errors.
 - `NO`: (Default) Not display rendering errors.
 */
@property (nonatomic, assign) BOOL showRenderError;

/**
 Whether to enable debug mode.
 - `YES`: Enabled.
 - `NO`: (Default) Disabled.
*/
@property (nonatomic, assign) BOOL debug;

@end

NS_ASSUME_NONNULL_END
