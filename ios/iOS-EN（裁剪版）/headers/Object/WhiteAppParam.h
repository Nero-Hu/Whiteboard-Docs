//
//  WhiteAppParam.h
//
//  Created by yleaf on 2021/8/21.
//

#import "WhiteObject.h"
#import "WhiteScene.h"

NS_ASSUME_NONNULL_BEGIN


// @interface WhiteAppOptions : WhiteObject

// @property (nonatomic, nullable, copy) NSString *scenePath;
// @property (nonatomic, nullable, copy) NSString *title;
// @property (nonatomic, nullable, strong) NSArray<WhiteScene *> *scenes;

// @end

/** Configuration parameters for the window app in multi-window mode.
 *
 * Generate directly using class methods, no need to configure individual property values.
 */
@interface WhiteAppParam : WhiteObject

/** Type of the window app. */
@property (nonatomic, copy, readonly) NSString *kind;
/** Required configuration items for the window app. */
@property (nonatomic, strong, readonly) WhiteAppOptions *options;
/** Additional optional configuration items for the window app. */
@property (nonatomic, copy, readonly) NSDictionary *attrs;

// /*
//  Create a PPT window.
//  If the transcoding result contains `uuid` and `prefix`, use this method to generate `WhiteAppParam`.
//  The `uuid` field corresponds to the `taskId` parameter.
//  The `prefix` field corresponds to the `url` parameter.
//  Recommended to use.
//  */
// + (instancetype)createSlideApp:(NSString *)dir taskId:(NSString *)taskId url:(NSString *)url title:(NSString *)title;

// /*
//  Create a PPT window.
//  If the transcoding result contains `convertedFileList`, use this method to generate `WhiteAppParam`.
//  Recommended to use.
//  */
// + (instancetype)createSlideApp:(NSString *)dir scenes:(NSArray <WhiteScene *>*)scenes title:(NSString *)title;
// + (instancetype)createDocsViewerApp:(NSString *)dir scenes:(NSArray <WhiteScene *>*)scenes title:(NSString *)title;
// + (instancetype)createMediaPlayerApp:(NSString *)src title:(NSString *)title;

// /** Specific App, generally used to create custom App insertion parameters.
//  @param kind The kind used when registering the App.
//  @param options See [WhiteAppOptions](WhiteAppOptions) for details.
//  @param attrs Parameters for initializing the App, fill in as needed.
//  */
// - (instancetype)initWithKind:(NSString *)kind options:(WhiteAppOptions *)options attrs:(NSDictionary *)attrs;

@end

NS_ASSUME_NONNULL_END
