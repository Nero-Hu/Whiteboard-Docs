//
//  WhiteScene.h
//  WhiteSDK
//
//  Created by yleaf on 2019/1/11.
//

#import "WhiteObject.h"
#import "WhitePptPage.h"
NS_ASSUME_NONNULL_BEGIN

/** 白板场景信息。 */
@interface WhiteScene : WhiteObject

/**
 初始化 `WhiteScene` 对象。

 @return 初始化的 `WhiteScene` 对象。
 */
- (instancetype)init;

/** 传入场景名称和待插入场景的图片或动态 PPT 并初始化一个 `WhiteScene` 对象。
 @param name 场景名称。

 @param ppt 图片或动态 PPT。详见 [WhitePptPage](WhitePptPage)。

 @return 初始化的 `WhiteScene` 对象。
 */
- (instancetype)initWithName:(nullable NSString *)name ppt:(nullable WhitePptPage *)ppt;

/** 场景名称。 */
@property (nonatomic, copy, readonly) NSString *name;
@property (nonatomic, assign, readonly) NSInteger componentsCount __deprecated_msg("this property is always 0");
/**
 待插入场景的图片或动态 PPT。详见 [WhitePptPage](WhitePptPage)。
 */
@property (nonatomic, strong, readonly, nullable) WhitePptPage *ppt;
@end

NS_ASSUME_NONNULL_END
