Agora provides interactive whiteboard with high reliability and rich features though a virtual global network and flexible combinations of APIs.

- [WhiteSDK](WhiteSDK) class provides the main methods for initializing the `WhiteSdk` object, joining the live Interactive Whiteboard room, and create a `WhitePlayer` object.
- [WhiteRoom](WhiteRoom) class provides methods that manage the live Interactive Whiteboard room.
- [WhitePlayer](WhitePlayer) class provides methods that manage the playback of the whiteboard content.
- [WhiteDisplayer](WhiteDisplayer) is the parent class of the [WhitePlayer](WhitePlayer) class and the [WhiteRoom](WhiteRoom) class. The [WhitePlayer](WhitePlayer) and [WhiteRoom](WhiteRoom) classes can both inherit the methods of the `WhiteDisplayer` class.



### SDK initialization

| Method                                                       | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [initWithWhiteBoardView]([WhiteSDK initWithWhiteBoardView:config:commonCallbackDelegate:])| Initializes a [WhiteSDK](WhiteSDK) object and sets callbacks.  |
| [initWithWhiteBoardView]([WhiteSDK initWithWhiteBoardView:config:commonCallbackDelegate:audioMixerBridgeDelegate:])| Initializes a [WhiteRoom](WhiteRoom) object and sets callbacks and audio mixing. |
| [WhiteCommonCallbacks](WhiteCommonCallbacks)  | Sets common callbacks. |
| [joinRoomWithConfig]([WhiteSDK joinRoomWithConfig:callbacks:completionHandler:])   | Sets the configurations and event callbacks of whiteboard room and joins the live interactive whiteboard room. |
| [joinRoomWithUuid]([WhiteSDK joinRoomWithUuid:roomToken:completionHandler:])   | Sets the UUID and Token of whiteboard room and joins the live interactive whiteboard room. |
| [createReplayerWithConfig]([WhiteSDK createReplayerWithConfig:callbacks:completionHandler:])   | Creates a [WhitePlayer](WhitePlayer) object, which is used to replay the whiteboard content of a live Interactive Whiteboard room. |
| [isPlayable]([WhiteSDK isPlayable:result:])   | Checks whether the room has playback data. |
| [setupFontFaces]([WhiteSDK setupFontFaces:])   | Declares the fonts that can be used in the local whiteboard. |
| [loadFontFaces]([WhiteSDK loadFontFaces:completionHandler:])  | Declares the fonts that can be used in the local whiteboard and preloads them.|
| [updateTextFont]([WhiteSDK updateTextFont:])   | Sets the fonts used by the text tool in the local whiteboard. |


### Common events

| Event                                                       | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [throwError]([WhiteCommonCallbackDelegate throwError:])   | Reports an uncaught global error during SDK runtime. |
| [urlInterrupter]([WhiteCommonCallbackDelegate urlInterrupter:]) | Occurs when the SDK intercepts an image URL address. |
| [pptMediaPlay]([WhiteCommonCallbackDelegate pptMediaPlay])   | Occurs when the audio and video in dynamic PPT slides start playing. |
| [pptMediaPause]([WhiteCommonCallbackDelegate pptMediaPause])   | Occurs when the audio and video in dynamic PPT slides pause playing. |
| [customMessage]([WhiteCommonCallbackDelegate customMessage:])   | Occurs when the user receives a message from the web page. |
| [sdkSetupFail]([WhiteCommonCallbackDelegate sdkSetupFail:])   | Reports the failure of the SDK initialization. |



### Room management

| Method                                                      | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [observerId]([WhiteRoom observerId])   | The user ID. |
| [setWritable]([WhiteRoom setWritable:completionHandler:]) | Sets whether a user is in interactive mode in the room. |
| [disableDeviceInputs]([WhiteRoom disableDeviceInputs:])   | Disables the whiteboard from responding to users' operations. |
| [disconnect]([WhiteRoom disconnect:])   | Disconnects from the live Interactive Whiteboard room. |
| [setGlobalState]([WhiteRoom setGlobalState:])   | Modifies the global state of the live Interactive Whiteboard room. |
| [disconnectedBySelf]([WhiteRoom disconnectedBySelf])   | Gets whether the SDK calls [disconnect]([WhiteRoom disconnect:]) to disconnect from the live Interactive Whiteboard room. |
| [writable]([WhiteRoom writable]) | Gets whether the local user is in interactive mode in the room. |
| [globalState]([WhiteRoom globalState])| Gets the global state of the room (synchronous). |
| [getGlobalStateWithResult]([WhiteRoom getGlobalStateWithResult:]) | Gets the global state of the room (asynchronous). |
| [roomMembers]([WhiteRoom roomMembers])| Gets the list of members in the room (synchronous). |
| [getRoomMembersWithResult]([WhiteRoom getRoomMembersWithResult:])| Gets the list of members in the room. (asynchronous). |
| [phase]([WhiteRoom phase]) | Gets the connection state of the room.  (synchronous). |
| [getRoomPhaseWithResult](getRoomPhaseWithResult:) | Gets the connection state of the room (asynchronous). |
| [state]([WhiteRoom state]) | Gets the current room state (synchronous). |
| [getRoomStateWithResult]([WhiteRoom getRoomStateWithResult:])| Gets the current room state (asynchronous). |


### Whiteboard tool

| Method                                                      | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [setMemberState]([WhiteRoom setMemberState:])  | Modifies the state of the whiteboard tool currently in use. |
| [memberState]([WhiteRoom memberState])  | Gets the state of the whiteboard tool currently in use (synchronous). |
| [getMemberStateWithResult]([WhiteRoom getMemberStateWithResult:])  | Gets the state of the whiteboard tool currently in use (asynchronous). |
| [copy]([WhiteRoom copy])  | Copies the selected content. |
| [paste]([WhiteRoom paste]) | Pastes the copied content. |
| [duplicate]([WhiteRoom duplicate])  | Duplicates the selected content. |
| [deleteOpertion]([WhiteRoom deleteOpertion]) | Deletes the selected content. |
| [disableSerialization]([WhiteRoom disableSerialization:])  | Disables/Enables the local serialization. |
| [redo]([WhiteRoom redo])  | Redoes an undone action. |
| [undo]([WhiteRoom undo]) | Undoes an action. |
| [disableEraseImage]([WhiteRoom disableEraseImage:])  | Disables the eraser from erasing images on the whiteboard. |
| [disableDeviceInputs]([WhiteRoom disableDeviceInputs:])  | Disables the whiteboard from responding to users' operations. |

### View management

| Method                                                      | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [setViewMode]([WhiteRoom setViewMode:]) |  Sets the view mode of the user.|
| [setCameraBound]([WhiteDisplayer setCameraBound:])| Sets the boundary of the user's view. |
| [disableCameraTransform]([WhiteDisplayer disableCameraTransform:])| Disables the user from adjusting the view. |
| [moveCamera]([WhiteDisplayer moveCamera:]) | Adjusts the view.|
| [moveCameraToContainer]([WhiteDisplayer moveCameraToContainer:]) | Adjusts the view to ensure the complete display of the view rectangle.|
| [scalePptToFit]([WhiteDisplayer scalePptToFit:]) | Adjusts the view in the specified mode to ensure the complete display of the PPT slide.|
| [disableCameraTransform]([WhiteRoom disableCameraTransform:]) | Disables the local user from adjusting the view of the whiteboard.|
| [broadcastState]([WhiteRoom broadcastState])| Gets the view state of the user (synchronous). |
| [getBroadcastStateWithResult]([WhiteRoom getBroadcastStateWithResult:])| Gets the view state of the user (asynchronous). |


### Scene management

| Method                                                      | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [insertImage]([WhiteRoom insertImage:])| Inserts an image placeholder on the whiteboard. |
| [completeImageUploadWithUuid]([WhiteRoom completeImageUploadWithUuid:src:])| Displays an image in the specified image placeholder.|
| [insertImage]([WhiteRoom insertImage:src:])|Inserts and displays an image on the whiteboard. |
| [sceneState]([WhiteRoom sceneState])| Gets the state of the scenes under the current scene directory (synchronous).|
| [getSceneStateWithResult]([WhiteRoom getSceneStateWithResult:])| Gets the state of the scenes under the current scene directory (asynchronous).|
| [getScenesWithResult]([WhiteRoom getScenesWithResult:])| Gets the state of the scenes under the current scene directory (asynchronous).|
| [setScenePath]([WhiteRoom setScenePath:])|Switches to the specified scene (synchronous). |
| [setScenePath]([WhiteRoom setScenePath:completionHandler:]) |Switches to the specified scene (asynchronous). |
| [setSceneIndex]([WhiteRoom setSceneIndex:completionHandler:])| Switches to the specified scene under the current scene directory.|
| [putScenes]([WhiteRoom putScenes:scenes:index:])|Inserts multiples scenes under the specified scene directory.|
| [moveScene]([WhiteRoom moveScene:target:])|Moves a scene. |
| [removeScenes]([WhiteRoom removeScenes:])|Deletes a scene or a scene directory. |
| [cleanScene]([WhiteRoom cleanScene:])|Clears all contents on the current scene. |
| [pptNextStep]([WhiteRoom pptNextStep])|Plays the next slide of the PPT file. |
| [pptPreviousStep]([WhiteRoom pptPreviousStep])|Returns to the previous slide of the PPT file.|
| [getScenePathType]([WhiteDisplayer getScenePathType:result:])|Gets the type of the scene path. |
| [getEntireScenes]([WhiteDisplayer getEntireScenes:])|Gets information about all scenes in the room. |
| [getScenePreviewImage]([WhiteDisplayer getScenePreviewImage:completion:])| Gets the preview of the specified scene.|
| [getSceneSnapshotImage]([WhiteDisplayer getSceneSnapshotImage:completion:])|Gets the screenshot of the specified scene.|

### Whiteboard playback management

| Method                                                       | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [play]([WhitePlayer play])  | Starts the playback of the whiteboard content. |
| [pause]([WhitePlayer pause]) | Pauses the playback of the whiteboard content. |
| [stop]([WhitePlayer stop])   | Stops the playback of the whiteboard content.|
| [seekToScheduleTime]([WhitePlayer seekToScheduleTime:])  | Sets the playback position (s) of the whiteboard content. |
| [setObserverMode]([WhitePlayer setObserverMode:])  | Sets the mode for watching the whiteboard playback. |
| [playbackSpeed]([WhitePlayer playbackSpeed]) | Gets the playback speed (synchronous).|
| [getPlaybackSpeed]([WhitePlayer getPlaybackSpeed:])   |Gets the playback speed (asynchronous).|
| [phase]([WhitePlayer phase])  |Gets the current phase of the `WhitePlayer` object (synchronous).|
| [getPhaseWithResult]([WhitePlayer getPhaseWithResult:])  | Gets the current phase of the `WhitePlayer` object (asynchronous).|
| [state]([WhitePlayer state])  | Gets the state of the the `WhitePlayer` object (synchronous).|
| [getPlayerStateWithResult]([WhitePlayer getPlayerStateWithResult:])  | Gets the state of the the `WhitePlayer` object (asynchronous).|
| [timeInfo]([WhitePlayer timeInfo])   | Gets the time information of the `WhitePlayer` object (synchronous).|
| [getPlayerTimeInfoWithResult]([WhitePlayer getPlayerTimeInfoWithResult:])  | Gets the time information of the `WhitePlayer` object (asynchronous).|


### Customized events

| Method                                                       | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [dispatchMagixEvent]([WhiteRoom dispatchMagixEvent:payload:])  | Sends a custom event. |
| [addMagixEventListener]([WhiteDisplayer addMagixEventListener:]) | Adds a listener for a customized event. |
| [addHighFrequencyEventListener]([WhiteDisplayer addHighFrequencyEventListener:fireInterval:])  | Adds a listener for a customized high-frequency event. |
| [removeMagixEventListener]([WhiteDisplayer removeMagixEventListener:])  | Removes a listener for a customized event. |


### iframe plug-in message

| Method                                                       | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [postIframeMessage]([WhiteDisplayer postIframeMessage:])  | Sends message in string format to the iframe plugin. |
| [setTimeDelay]([WhiteRoom setTimeDelay:]) | Sets the delay time for sending the whiteboard contents of the local user to the remote users. |


### Miscellaneous methods

| Method                                                       | Description                          |
| :----------------------------------------------------------- | :------------------------------ |
| [debugInfo]([WhiteRoom debugInfo:])  | Gets debug logs. |
| [setTimeDelay]([WhiteRoom setTimeDelay:]) | Sets the delay time for sending the whiteboard contents of the local user to the remote users. |
| [convertToPointInWorld]([WhiteDisplayer convertToPointInWorld:result:])   | Converts the coordinates of a point on the whiteboard. |
| [refreshViewSize]([WhiteDisplayer refreshViewSize])  | Refreshes the whiteboard view. |