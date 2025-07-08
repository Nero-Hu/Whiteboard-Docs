//
//  GBApplicationStringsProvider.m
//  appledoc
//
//  Created by Tomaz Kragelj on 1.10.10.
//  Copyright (C) 2010, Gentle Bytes. All rights reserved.
//

#import "GBApplicationStringsProvider.h"

@implementation GBApplicationStringsProvider

#pragma mark Initialization & disposal

+ (id)provider {
	return [[self alloc] init];
}

#pragma mark Object output strings

- (NSDictionary *)objectPage {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"classTitle"] = NSLocalizedString(@"%@ 类", @"%@ Class Reference");
		result[@"categoryTitle"] = NSLocalizedString(@"%1$@(%2$@) 类别", @"%1$@(%2$@) Category Reference");
		result[@"protocolTitle"] = NSLocalizedString(@"%@ 协议", @"%@ Protocol Reference");
		result[@"constantTitle"] = NSLocalizedString(@"%@ 常量", @"%@ Constants Reference");
        result[@"blockTitle"] = NSLocalizedString(@"%@ Block 回调", @"%@ Block Reference");
		result[@"mergedCategorySectionTitle"] = NSLocalizedString(@"%@ 方法", @"%@ Methods");
		result[@"mergedExtensionSectionTitle"] = NSLocalizedString(@"Extension Methods", @"Extension Methods");
		result[@"mergedPrefixedCategorySectionTitle"] = NSLocalizedString(@"%2$@ from %1$@", @"%2$@ from %1$@");
	}
	return result;
}

- (NSDictionary *)objectSpecifications {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"inheritsFrom"] = NSLocalizedString(@"Inherits from", @"Inherits from");
		result[@"conformsTo"] = NSLocalizedString(@"Conforms to", @"Conforms to");
        result[@"references"] = NSLocalizedString(@"References", @"References");
        result[@"availability"] = NSLocalizedString(@"Availability", @"Availability");
		result[@"declaredIn"] = NSLocalizedString(@"Declared in", @"Declared in");
		result[@"companionGuide"] = NSLocalizedString(@"Companion guide", @"Companion guide");
	}
	return result;
}

- (NSDictionary *)objectOverview {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"title"] = NSLocalizedString(@"概览", @"Overview");
	}
	return result;
}

- (NSDictionary *)objectTasks {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"title"] = NSLocalizedString(@"Tasks", @"Tasks");
		result[@"otherMethodsSectionName"] = NSLocalizedString(@"其他方法", @"Other Methods");
		result[@"requiredMethod"] = NSLocalizedString(@"required method", @"required method");
		result[@"property"] = NSLocalizedString(@"属性", @"property");
	}
	return result;
}

- (NSDictionary *)objectMethods {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"classMethodsTitle"] = NSLocalizedString(@"Class Methods", @"Class Methods");
		result[@"instanceMethodsTitle"] = NSLocalizedString(@"Instance Methods", @"Instance Methods");
        result[@"blockDefTitle"] = NSLocalizedString(@"Block 定义", @"Block Definition");
		result[@"propertiesTitle"] = NSLocalizedString(@"属性", @"Properties");
		result[@"parametersTitle"] = NSLocalizedString(@"参数", @"Parameters");
		result[@"resultTitle"] = NSLocalizedString(@"返回", @"Return Value");
		result[@"availability"] = NSLocalizedString(@"Availability", @"Availability");
		result[@"discussionTitle"] = NSLocalizedString(@"详情", @"Discussion");
		result[@"exceptionsTitle"] = NSLocalizedString(@"异常", @"Exceptions");
		result[@"seeAlsoTitle"] = NSLocalizedString(@"推荐使用", @"See Also");
		result[@"declaredInTitle"] = NSLocalizedString(@"Declared In", @"Declared In");
	}
	return result;
}

#pragma mark Document output strings

- (NSDictionary *)documentPage {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"titleTemplate"] = NSLocalizedString(@"%@ ", @"%@ Document");
	}
	return result;
}

#pragma mark Index output strings

- (NSDictionary *)indexPage {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"titleTemplate"] = NSLocalizedString(@"%@ ", @"%@ API Reference");
		result[@"docsTitle"] = NSLocalizedString(@"Programming Guides", @"Programming Guides");
		result[@"classesTitle"] = NSLocalizedString(@"类", @"Class References");
		result[@"categoriesTitle"] = NSLocalizedString(@"类别", @"Category References");
		result[@"protocolsTitle"] = NSLocalizedString(@"协议", @"Protocol References");
        result[@"constantsTitle"] = NSLocalizedString(@"常量", @"Constant References");
        result[@"blocksTitle"] = NSLocalizedString(@"Block 回调", @"Block References");
	}
	return result;
}

- (NSDictionary *)hierarchyPage {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"titleTemplate"] = NSLocalizedString(@"%@ 层级", @"%@ Hierarchy");
		result[@"classesTitle"] = NSLocalizedString(@"类层级", @"Class Hierarchy");
		result[@"categoriesTitle"] = NSLocalizedString(@"类别层级", @"Category References");
		result[@"protocolsTitle"] = NSLocalizedString(@"协议", @"Protocol References");
        result[@"constantsTitle"] = NSLocalizedString(@"常量", @"Constant References");
        result[@"blocksTitle"] = NSLocalizedString(@"Block 回调", @"Block References");
	}
	return result;
}

#pragma mark Documentation set output strings

- (NSDictionary *)docset {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"docsTitle"] = NSLocalizedString(@"Programming Guides", @"Programming Guides");
		result[@"classesTitle"] = NSLocalizedString(@"Classes", @"Classes");
		result[@"categoriesTitle"] = NSLocalizedString(@"Categories", @"Categories");
		result[@"protocolsTitle"] = NSLocalizedString(@"Protocols", @"Protocols");
        result[@"constantsTitle"] = NSLocalizedString(@"Constants", @"Constants");
        result[@"blocksTitle"] = NSLocalizedString(@"Blocks", @"Blocks");
	}
	return result;
}

- (NSDictionary *)appledocData {
	static NSMutableDictionary *result = nil;
	if (!result) {
		result = [[NSMutableDictionary alloc] init];
		result[@"tool"] = @"appledoc";
		result[@"version"] = @"2.2.1";
		result[@"build"] = @"1334";
		result[@"homepage"] = @"http://appledoc.gentlebytes.com";
	}
	return result;
}

@end
