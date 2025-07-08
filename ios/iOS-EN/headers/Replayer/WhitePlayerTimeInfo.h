//
//  WhitePlayerTimeInfo.h
//  WhiteSDK
//
//  Created by yleaf on 2019/2/28.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** The time information of the `WhitePlayer` instance. */
@interface WhitePlayerTimeInfo : WhiteObject

/** The current playback position (seconds). */
@property (nonatomic, assign, readonly) NSTimeInterval scheduleTime;

/** The total duration (seconds) of the playback. */
@property (nonatomic, assign, readonly) NSTimeInterval timeDuration;

/** The total number of the playback frames. */
@property (nonatomic, assign, readonly) NSInteger framesCount;

/** The Unix timestamp (seconds) indicating when the playback started.

 You can convert the Unix timestamp to UTC time. For example, if the return value is `1615370614269`, the UTC time is 2021-03-10 18:03:34 GMT+0800. */
@property (nonatomic, assign, readonly) NSTimeInterval beginTimestamp;

@end

NS_ASSUME_NONNULL_END
