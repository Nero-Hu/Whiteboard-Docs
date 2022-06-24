//
//  WhiteRoomMember.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/14.
//

#import "WhiteObject.h"
#import "WhiteMemberState.h"
#import "WhiteMemberInformation.h"

NS_ASSUME_NONNULL_BEGIN

/** 
 Information of the users in interactive mode in the live Interactive Whiteboard room. 

 **Note:**

 This class applies to the users in interactive mode only, because the users in subscription mode are not room members.
*/
@interface WhiteRoomMember : WhiteObject

@property (nonatomic, copy, readonly) WhiteApplianceNameKey currentApplianceName DEPRECATED_MSG_ATTRIBUTE("使用 memberState.currentApplianceName 获取");

/** 
The member ID of the user.

When a user joins the live Interactive Whiteboard room in interactive mode, the SDK assigns a unique member ID for the user.
*/
@property (nonatomic, assign, readonly) NSInteger memberId;

/** The name of the whiteboard tool. See [WhiteReadonlyMemberState](WhiteReadonlyMemberState). */
@property (nonatomic, strong, readonly) WhiteReadonlyMemberState *memberState;

/**
 This property is deprecated. Use `payload` instead.

 The user information.
 */
@property (nonatomic, strong, readonly, nullable) WhiteMemberInformation *information;

/**
 The customized user information that is passed in when the user joins the room, which can be converted to JSON, string or number.

 @since 2.1.0
 
 **Note:**
 
 If you want to use the SDK default avatar display, please use the `avatar` field to set the user avatar.
 */
@property (nonatomic, strong, readonly, nullable) id payload;

@end

NS_ASSUME_NONNULL_END
