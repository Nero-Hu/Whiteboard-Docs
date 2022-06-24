//
//  WhiteNativeApi.h
//  Pods
//
//  Created by leavesster on 2018/8/12.
//

#import <Foundation/Foundation.h>

#pragma mark - ENUM
/**
 The connection state of the room.
 */
typedef NS_ENUM(NSInteger, WhiteRoomPhase) {
    /**
     The SDK is connecting to the room on the Interactive Whiteboard server.
     */
    WhiteRoomPhaseConnecting,          
    /**
     The SDK is connected to the room on the Interactive Whiteboard server.
     */
    WhiteRoomPhaseConnected,      
    /**
     The SDK is reconnecting to the room on the Interactive Whiteboard server.
     */
    WhiteRoomPhaseReconnecting, 
    /**
     The SDK is disconnecting from the room on the Interactive Whiteboard server.
     */                             
    WhiteRoomPhaseDisconnecting,       
    /**
     The SDK is disconnected from the room on the Interactive Whiteboard server.
     */
    WhiteRoomPhaseDisconnected,        
};

@class WhiteRoomState, WhiteEvent;

/** The event callback interface of the `WhiteRoom` object.*/
@protocol WhiteRoomCallbackDelegate <NSObject>

@optional

/** Occurs when the room connection state changes.
 @param phase The current connection state of the room. See [WhiteRoomPhase](WhiteRoomPhase).
 */
- (void)firePhaseChanged:(WhiteRoomPhase)phase;

/**
 Occurs when the room state changes.

 This callback reports only the room state fields that have changed and returns `null` for the room state fields that have not changed.

 @param modifyState The room state that has changed. See [WhiteRoomState](WhiteRoomState).
 */
- (void)fireRoomStateChanged:(WhiteRoomState *)modifyState;

/**
 Occurs when the SDK loses connection with the Interactive Whiteboard server.

 @param error An error message.
 */
- (void)fireDisconnectWithError:(NSString *)error;

/**
 Occurs when the local user is removed from the live Interactive Whiteboard room.

 @param reason The reason why the user is removed from the room.
 */
- (void)fireKickedWithReason:(NSString *)reason;

/**
 Reports the errors that occur during the synchronization of a user's operations.
 
 @param userId The user ID of the user whose operations are being synchronized.
 @param error An error message.
 */
- (void)fireCatchErrorWhenAppendFrame:(NSUInteger)userId error:(NSString *)error;

/**
 Occurs when the number of undoable actions changes.

 The SDK triggers this callback every time the local user calls [undo]([WhiteRoom undo]) and reports the number of remaining undoable actions.
 
 @param canUndoSteps The number of remaining undoable actions.
 */
- (void)fireCanUndoStepsUpdate:(NSInteger)canUndoSteps;

 /**
 Occurs when the number of undoable actions changes.

 The SDK triggers this callback every time the local user calls [redo]([WhiteRoom redo]) and reports the number of remaining undoable actions.
 
 @param canRedoSteps The number of remaining undoable actions.
 */
- (void)fireCanRedoStepsUpdate:(NSInteger)canRedoSteps;

/**
 Occurs when the a custom event is created.
 
 @param event A custom event. See [WhiteEvent](WhiteEvent).
 */
- (void)fireMagixEvent:(WhiteEvent *)event;

/**
 Occurs when the a high frequency event is created.

 @param events A high frequency event. See [WhiteEvent](WhiteEvent).
 */
- (void)fireHighFrequencyEvent:(NSArray<WhiteEvent *>*)events;

@end

#pragma mark - WhiteRoomCallbacks

/** The `WhiteRoomCallbacks` interface, which the SDK uses to send event callbacks of the `WhiteRoom` object. */
@interface WhiteRoomCallbacks : NSObject

/** The event callbacks of the `WhiteRoom` object. See [WhiteRoomCallbackDelegate](WhiteRoomCallbackDelegate). */
@property (nonatomic, weak) id<WhiteRoomCallbackDelegate> delegate;


@end
