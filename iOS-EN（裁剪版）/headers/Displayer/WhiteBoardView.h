//
//  WhiteBroadView.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/15.
//

#import <dsbridge/dsbridge.h>

NS_ASSUME_NONNULL_BEGIN

@class WhiteRoom;

/** Configurations for the whiteboard view. */
@interface WhiteBoardView : DWKWebView

/** Whiteboard room information. See [WhiteRoom](WhiteRoom).*/
@property (nonatomic, strong, nullable) WhiteRoom *room;

/**
 Whether to disable the SDK's processing of keyboard offset.

 - `YES`: Disable the SDK's processing of keyboard offset.
 - `NO`: Enable the SDK's processing of keyboard offset.
 */
@property (nonatomic, assign) BOOL disableKeyboardHandler;

/**
 Initializes a `WhiteBroadView` object.
 
 @return An initialized `WhiteBroadView` object.
 */
- (instancetype)init;

@end

NS_ASSUME_NONNULL_END
