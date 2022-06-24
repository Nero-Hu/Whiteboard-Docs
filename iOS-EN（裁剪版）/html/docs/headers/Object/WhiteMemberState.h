//
//  MemberState.h
//  WhiteSDK
//
//  Created by leavesster on 2018/8/14.
//

#import "WhiteObject.h"

NS_ASSUME_NONNULL_BEGIN

#pragma mark - ApplianceName
/**
 Whiteboard tools.
 */
typedef NSString * WhiteApplianceNameKey NS_STRING_ENUM;

/** Clicker, which can be used for clicking and selectin content on the HTML5 file.*/
extern WhiteApplianceNameKey const ApplianceClicker;

/**
 Pencil.
 */
extern WhiteApplianceNameKey const AppliancePencil;
/**
 Selector.
 */
extern WhiteApplianceNameKey const ApplianceSelector;
/**
 Text input box.
 */
extern WhiteApplianceNameKey const ApplianceText;
/**
 Ellipse.
 */
extern WhiteApplianceNameKey const ApplianceEllipse;
/**
 Rectangle.
 */
extern WhiteApplianceNameKey const ApplianceRectangle;
/**
 Eraser.
 */
extern WhiteApplianceNameKey const ApplianceEraser;
/** Straight line. */
extern WhiteApplianceNameKey const ApplianceStraight;
/** Arrow. */
extern WhiteApplianceNameKey const ApplianceArrow;
/** Hand. */
extern WhiteApplianceNameKey const ApplianceHand;
/** Laser pointer. */
extern WhiteApplianceNameKey const ApplianceLaserPointer;
/** Shape tool. You need to set the `ShapeType` property. The default value is `ApplianceShapeTypeTriangle`.
 @since 2.12.24 */
extern WhiteApplianceNameKey const ApplianceShape;

#pragma mark - ShapeKey

/** TShape types. */
typedef NSString * WhiteApplianceShapeTypeKey NS_STRING_ENUM;
/** Triangle.
 @since 2.12.24  */
extern WhiteApplianceShapeTypeKey const ApplianceShapeTypeTriangle;
/** Rhombus.
 @since 2.12.24  */
extern WhiteApplianceShapeTypeKey const ApplianceShapeTypeRhombus;
/** Pentagram.
 @since 2.12.24  */
extern WhiteApplianceShapeTypeKey const ApplianceShapeTypePentagram;
/** Speech bubble.
 @since 2.12.24  */
extern WhiteApplianceShapeTypeKey const ApplianceShapeTypeSpeechBalloon;

#pragma mark - ReadonlyMemberState

/** Settings of the whiteboard tool in use.(Readonly) */
@interface WhiteReadonlyMemberState : WhiteObject

/** The name of the whiteboard tool currently in use. */
@property (nonatomic, copy, readonly) WhiteApplianceNameKey currentApplianceName;
/** The stroke color in RGB format, for example, `0, 0, 255` (blue). */
@property (nonatomic, copy, readonly) NSArray<NSNumber *> *strokeColor;
/** The stroke width. */
@property (nonatomic, strong, readonly) NSNumber *strokeWidth;
/** The font size of the text.  */
@property (nonatomic, strong, readonly) NSNumber *textSize;
@end

/** Settings of the whiteboard tool in use. */
@interface WhiteMemberState : WhiteReadonlyMemberState
/** The name of the whiteboard tool currently in use. */
@property (nonatomic, copy, readwrite) WhiteApplianceNameKey currentApplianceName;
/** The stroke color in RGB format, for example, `0, 0, 255` (blue). */
@property (nonatomic, copy, readwrite) NSArray<NSNumber *> *strokeColor;
/** The stroke width. */
@property (nonatomic, strong, readwrite) NSNumber *strokeWidth;
/** The font size of the text. */
@property (nonatomic, strong, readwrite) NSNumber *textSize;
@end
