//
//  WhiteConsts.h
//  WhiteSDK
//
//  Created by yleaf on 2019/3/4.
//

#import <Foundation/Foundation.h>

#pragma mark - Domain

extern NSString * const WhiteConstsErrorDomain;
extern NSString * const WhiteConstsConvertDomain;

#pragma mark - Ratio
extern NSTimeInterval const WhiteConstsTimeUnitRatio;

#pragma mark - Region
typedef NSString * WhiteRegionKey NS_STRING_ENUM;

extern WhiteRegionKey const WhiteRegionDefault;
/** China */
extern WhiteRegionKey const WhiteRegionCN;
/** US */
extern WhiteRegionKey const WhiteRegionUS;
/** India */
extern WhiteRegionKey const WhiteRegionIN;
/** Singapore */
extern WhiteRegionKey const WhiteRegionSG;
/** UK. Deprecated. Use WhiteRegionEU instead. */
extern WhiteRegionKey const WhiteRegionGB DEPRECATED_MSG_ATTRIBUTE("Using WhiteRegionEU instead.");
/** Europe */
extern WhiteRegionKey const WhiteRegionEU;
