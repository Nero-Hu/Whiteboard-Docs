//
//  WhiteAppSyncAttributes.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/8/23.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** Information about the window app in multi-window mode. */
@interface WhiteAppSyncAttributes : WhiteObject

/** The type of the window app. */
@property (nonatomic, copy, readonly) NSString *kind;
/** The title of the window app. */
@property (nonatomic, copy, readonly) NSString *title;
/** The options of the window app. */
@property (nonatomic, copy, readonly) NSDictionary *options;
/** The optional data source of the window app. */
@property (nonatomic, copy, readonly, nullable) NSString *src;
/** The optional state of the window app. */
@property (nonatomic, copy, readonly) NSDictionary *state;


@end

NS_ASSUME_NONNULL_END
