//
//  WhiteSlideAppParams.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/3/2.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * `WhiteSlideAppParams` 接口，主要用于 PPT 渲染相关的显示配置。
 */
@interface WhiteSlideAppParams : WhiteObject

/**
 是否显示 PPT 中的错误提示。
 
 - `YES`：显示。
 - `NO`：不显示 (默认)。
 */
@property (nonatomic, assign) BOOL showRenderError;

/**
 是否开启 Debug 模式。
 - `YES`：开启。
 - `NO`：不开启 (默认)。
*/
@property (nonatomic, assign) BOOL debug;

@end

NS_ASSUME_NONNULL_END
