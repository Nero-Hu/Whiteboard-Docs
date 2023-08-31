//
//  WhiteWindowDocsEventOptions.h
//  Whiteboard
//
//  Created by xuyunshi on 2023/7/6.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/** 文档事件类型 */
typedef NSString * WhiteWindowDocsEventKey NS_STRING_ENUM;

/** 上一页 */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventPrevPage;
/** 下一页 */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventNextPage;
/** 上一步 */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventPrevStep;
/** 下一步 */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventNextStep;
/** 跳转至页码。需配合 `WhiteWindowDocsEventOptions` 使用，用于指定期望跳转的页码。 */
FOUNDATION_EXPORT WhiteWindowDocsEventKey const WhiteWindowDocsEventJumpToPage;


/**
 * 事件参数。仅当 `WhiteWindowDocsEventKey` 为 `WhiteWindowDocsEventJumpToPage` 时调用，用于指定期望跳转的页码。
 */
@interface WhiteWindowDocsEventOptions : WhiteObject

/**
 * 跳转至页码。
 */
@property (nonatomic, copy) NSNumber *page;
@end

NS_ASSUME_NONNULL_END
