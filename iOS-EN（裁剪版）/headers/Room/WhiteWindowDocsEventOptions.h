//
//  WhiteWindowDocsEventOptions.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/7/6.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** Types of the docs event. */
typedef NSString * WhiteWindowDocsEventKey NS_STRING_ENUM;

/** Previous page. */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventPrevPage;
/** Next page. */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventNextPage;
/** Previous step. */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventPrevStep;
/** Next step. */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventNextStep;
/** 跳转至页码。需配合 `WhiteWindowDocsEventOptions` 使用，用于指定期望跳转的页码。 */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventJumpToPage;


/**
 * The options of the event. Needed only when `event` is `jumpToPage`, specifying the target page you want to jump to.
 */
@interface WhiteWindowDocsEventOptions : WhiteObject

/**
 * Jumpt to page.
 */
@property (nonatomic, copy) NSNumber *page;
@end

NS_ASSUME_NONNULL_END
