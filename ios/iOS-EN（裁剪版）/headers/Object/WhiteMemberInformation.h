//
//  WhiteMemberInformation.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/14.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** Configuration for customized user information. */
@interface WhiteMemberInformation : WhiteObject

/**
 The `MemberInformation` constructor, for initializing a `MemberInformation` object.
 
 @param userId The user ID.
 @param nickName The user's nickname.
 @param avatarUrl The URL address to the user avatar.
 */
- (instancetype)initWithUserId:(NSString *)userId name:(NSString *)nickName avatar:(NSString *)avatarUrl;


@property (nonatomic, assign, readwrite) NSInteger id;


/** The user's nickname. */
@property (nonatomic, copy, readonly) NSString *nickName;
/** The URL address to the user avatar. */
@property (nonatomic, copy, readonly, nullable) NSString *avatar;
/**
 The user ID. The user ID must be unique.
 */
@property (nonatomic, copy, readonly, nullable) NSString *userId;

@end

NS_ASSUME_NONNULL_END
