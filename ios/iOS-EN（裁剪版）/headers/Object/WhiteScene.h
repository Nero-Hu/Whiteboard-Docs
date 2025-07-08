//
//  WhiteScene.h
//  WhiteSDK
//
//  Created by yleaf on 2019/1/11.
//

#import "WhiteObject.h"
#import "WhitePptPage.h"
NS_ASSUME_NONNULL_BEGIN

/** Settings for a WhiteScene. */
@interface WhiteScene : WhiteObject

/**
 Initializes a `WhiteScene` object.

 @return An initialized `WhiteScene` object.
 */
- (instancetype)init;

/** Sets the name, and image or dynamic PPT slide and initialize a  `WhiteScene` object.
 @param name The name of the scene.

 @param ppt An image or a dynamic PPT slide. See [WhitePptPage](WhitePptPage).

 @return An initialized `WhiteScene` object.
 */
- (instancetype)initWithName:(nullable NSString *)name ppt:(nullable WhitePptPage *)ppt;

/** The name of the scene. */
@property (nonatomic, copy, readonly) NSString *name;
@property (nonatomic, assign, readonly) NSInteger componentsCount __deprecated_msg("this property is always 0");
/**
 An image or a dynamic PPT slide. See [WhitePptPage](WhitePptPage).
 */
@property (nonatomic, strong, readonly, nullable) WhitePptPage *ppt;
@end

NS_ASSUME_NONNULL_END
