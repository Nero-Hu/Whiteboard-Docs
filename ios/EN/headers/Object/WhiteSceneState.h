//
//  WhiteSceneState.h
//  WhiteSDK
//
//  Created by yleaf on 2019/2/25.
//

#import "WhiteObject.h"
#import "WhiteScene.h"

NS_ASSUME_NONNULL_BEGIN

/** The scene state. */
@interface WhiteSceneState : WhiteObject

/** The list of scenes under the current scene directory. */
@property (nonatomic, nonnull, strong, readonly) NSArray<WhiteScene *> *scenes;
/** The path of the current scene. */
@property (nonatomic, nonnull, strong, readonly) NSString *scenePath;
/** The index of the current scene under its scene directory. */
@property (nonatomic, assign, readonly) NSInteger index;

@end

NS_ASSUME_NONNULL_END
