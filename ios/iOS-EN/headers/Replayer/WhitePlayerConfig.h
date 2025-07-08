//
//  WhitePlayerConfig.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/1.
//

#import "WhiteObject.h"
#import "WhiteConsts.h"
#import "WhiteCameraBound.h"

NS_ASSUME_NONNULL_BEGIN

/** Configuration of the `WhiteObject`. */
@interface WhitePlayerConfig : WhiteObject


- (instancetype)init NS_UNAVAILABLE;
/**
 Sets the Room Token and initialize the `WhitePlayerConfig` object.
 
 @param roomUuid The unique identifier of the room. Ensure that the room UUID is the same as the one you use to generate the Room Token.
 @param roomToken The Room Token for authentication.
 @return Initialized `WhitePlayerConfig` object.
 */
- (instancetype)initWithRoom:(NSString *)roomUuid roomToken:(NSString *)roomToken;

/** 
 The data center. 

 The data center includes as following:

 - `"cn-hz"`: Hangzhou, China. This data center provides services to the areas that are not covered by other data centers.
 - `"us-sv"`: Silicon Valley, US. This data center provides services to North America and South America.
 - `"in-mum"`: Mumbai, India.This data center provides services to India.
 - `"sg"`: Singapore.This data center provides services to Singapore, East Asia, and Southeast Asia.
 - `"eu"`: Frankfurt, Europe. This data center provides services to Europe.
  
  **Note:**
  
  - If you do not set the data center, the SDK uses the region set in [WhiteSdkConfiguration](WhiteSdkConfiguration).
  - If you neither set the data center when initialing the `WhiteSDK` object nor when creating the `WhitePlayer` object, the SDK reports an error message.


 @since 2.11.0 */
@property (nonatomic, strong, nullable) WhiteRegionKey region;

/** The unique identifier of the room, which must be consistent with the Room Token set when initializing the `WhitePlayerConfig` object. */
@property (nonatomic, copy) NSString *room;

/** The Room Token for authentication, which must be consistent with the Room Token set when initializing the `WhitePlayerConfig` object. */
@property (nonatomic, copy) NSString *roomToken;

/** Reserved parameters and no need to pay attention for. */
@property (nonatomic, copy, nullable) NSString *slice;

/** The Unix timestamp (seconds) indicating when the playback started. 

You can convert the Unix timestamp to UTC time. For example, if the return value is `1615370614269`, the UTC time is 2021-03-10 18:03:34 GMT+0800. */
@property (nonatomic, strong, nullable) NSNumber *beginTimestamp;

/** The playback duration(s). 

 **Note:**
 
 If it is not set, the playback will continue from the start time until exiting the room. */
@property (nonatomic, strong, nullable) NSNumber *duration;

/** The media URL of the playback.

 **Note:** 

 - Even if the video URL address is passed in, only audio will be played.
 - If you want to play the video, please call the [WhiteCombinePlayer](WhiteCombinePlayer) method.
 */
@property (nonatomic, strong, nullable) NSString *mediaURL;

/**
 The frequency that the SDK reports the current playback position callback (s). The default value is 0.5 seconds.
 */
@property (nonatomic, strong) NSNumber *step;

/** The viewable area of the local user. See [WhiteCameraBound](WhiteCameraBound). */
@property (nonatomic, strong, nullable) WhiteCameraBound *cameraBound;

@end

@interface WhitePlayerConfig (Deprecated)

/** 
 This method is deprecated. Use [mediaURL]([WhitePlayerConfig mediaURL]) instead.
 */
@property (nonatomic, strong, nullable) NSString *audioUrl DEPRECATED_MSG_ATTRIBUTE("use mediaURL property");

@end

NS_ASSUME_NONNULL_END
