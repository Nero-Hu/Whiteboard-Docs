//
//  WhiteDisplayerState.h
//  WhiteSDK
//
//  Created by yleaf on 2019/7/22.
//

#import "WhiteObject.h"
#import "WhiteGlobalState.h"
#import "WhiteRoomMember.h"
#import "WhiteSceneState.h"
#import "WhiteCameraState.h"
#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** The `WhiteDisplayerState` class is inherited by the `WhiteRoom` and `WhitePlayer` objects.  */
@interface WhiteDisplayerState : WhiteObject<YYModel>

/**
 Sets the customized `GlobalState` class.

 A successful call of this method casts all `WhiteGlobalState` variables to the instances of the customized class.

 @param clazz The customized `GlobalState` class, which is must extend the [WhiteGlobalState](WhiteGlobalState) class.

 **Note:**
 
 If you use Swift, you need to add the `@objc` modifier to the properties when configuring the properties of the [WhiteGlobalState](WhiteGlobalState) subclass.

 @return 
 
  - `YES`：Sets successfully.
  - `NO`：Fails to set, and it reverts to the [WhiteGlobalState](WhiteGlobalState) class.
 */
+ (BOOL)setCustomGlobalStateClass:(Class)clazz;

/** The global state of the room. See [WhiteGlobalState](WhiteGlobalState). */
@property (nonatomic, strong, readonly, nullable) WhiteGlobalState *globalState;

/** The users in interactive mode (with read and write permissions). See [WhiteRoomMember](WhiteRoomMember). */
@property (nonatomic, strong, readonly, nullable) NSArray<WhiteRoomMember *> *roomMembers;

/** The state of the scenes under the current scene directory. See [WhiteSceneState](WhiteSceneState). */
@property (nonatomic, strong, readonly, nullable) WhiteSceneState *sceneState;

/** The state of the camera. See [WhiteCameraState](WhiteCameraState). */
@property (nonatomic, strong, readonly, nullable) WhiteCameraState *cameraState;

@end

NS_ASSUME_NONNULL_END
