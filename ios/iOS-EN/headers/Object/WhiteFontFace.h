//
//  WhiteFontFace.h
//  Whiteboard-Whiteboard
//
//  Created by yleaf on 2020/12/1.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

/**
 Font file configurations. This class is similar to the `@font-face` attribute in CSS.
 */
@interface WhiteFontFace : WhiteObject

- (instancetype)init NS_UNAVAILABLE;

- (instancetype)initWithFontFamily:(NSString *)name src:(NSString *)src;

/**
 The font name. This parameter is equivalent to the `font-family` field in CSS.
 */
@property (nonatomic, strong) NSString *fontFamily;

/**
 The font style. This parameter is equivalent to the `font-style` field in CSS, and can be set to:

 - `normal`：(Default) Normal.
 - `italic`：Italic.
 */
@property (nonatomic, strong, nullable) NSString *fontStyle;

/**
 The font weight. This parameter is equivalent to the `font-weight` field in CSS.
 */
@property (nonatomic, strong, nullable) NSString *fontWeight;

/**
 The path to the font file. This parameter is equivalent to the `src` field in CSS. The supported format is `url()`, where you can fill in the URL to a remote font file location, for example, `url("https://white-pan.oss-cn-shanghai.aliyuncs.com/Pacifico-Regular.ttf")`.
 */
@property (nonatomic, strong) NSString *src;

/**
 The range of Unicode code points to be used by the font. This parameter is equivalent to the `unicode-range` field in CSS.
 */
@property (nonatomic, strong, nullable) NSString *unicodeRange;

@end

NS_ASSUME_NONNULL_END
