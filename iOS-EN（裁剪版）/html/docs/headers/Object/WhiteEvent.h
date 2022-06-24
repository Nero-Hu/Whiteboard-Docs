//
//  WhiteEvent.h
//  WhiteSDK
//
//  Created by yleaf on 2018/10/9.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** Custom event callbacks that can be triggered by the SDK. */
@interface WhiteEvent : WhiteObject

/** Sets the name and content of the callback event and initializes a `WhiteEvent` object.
 @param eventName The name of the event.

 @param payload The content of the event.

 @return An initialized `WhiteEvent` object.
 */
- (instancetype)initWithName:(NSString *)eventName payload:(id)payload;

/** The name of the event. */
@property (nonatomic, strong) NSString *eventName;

/**
 The content of the event.
 */
@property (nonatomic, strong, nullable) id payload;

/** Room UUID, the unique identifier of a room.*/
@property (nonatomic, strong, readonly) NSString *uuid;

/**
 The role of the user who triggers the event, including `system`, `app`, `custom`, `magix`.
 */
@property (nonatomic, strong, readonly) NSString *scope;

/**
 The user ID of the event trigger.
 */
@property (nonatomic, strong, readonly) NSString *authorId;

@end

NS_ASSUME_NONNULL_END
