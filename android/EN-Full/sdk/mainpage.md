Agora provides interactive whiteboard with high reliability and rich features though a virtual global network and flexible combinations of APIs.
- The {@link com.herewhite.sdk.WhiteSdk WhiteSdk} class provides the main methods for initializing the `WhiteSdk` instance, joining the live Interactive Whiteboard room, and create a `Player` instance.
- The {@link com.herewhite.sdk.Room Room} class provides methods that manage the live Interactive Whiteboard room.
- The {@link com.herewhite.sdk.Player Player} class provides methods that manage the playback of the whiteboard content.
- The {@link com.herewhite.sdk.Displayer Displayer} is the parent class of the {@link com.herewhite.sdk.Room Room} class and the {@link com.herewhite.sdk.Player Player} class. The {@link com.herewhite.sdk.Room Room} and {@link com.herewhite.sdk.Player Player} classes can both inherit the methods of the `Displayer` class.


### SDK initialization

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration) WhiteSdk} [1/4]</td>
<td>Initializes a {@link com.herewhite.sdk.WhiteSdk WhiteSdk} instance.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, @Nullable CommonCallback commonCallback) WhiteSdk} [2/4]</td>
<td>Initializes a {@link com.herewhite.sdk.WhiteSdk WhiteSdk} instance and sets callbacks.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, @Nullable CommonCallback commonCallback, @Nullable AudioMixerBridge audioMixerBridge) WhiteSdk} [4/4]</td>
<td>Initializes a {@link com.herewhite.sdk.WhiteSdk WhiteSdk} instance and sets callbacks and audio mixing</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.setCommonCallbacks(CommonCallbacks commonCallbacks) setCommonCallbacks}</td>
<td>Sets common callbacks.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.joinRoom(RoomParams roomParams, Promise<Room> roomPromise) joinRoom} [1/2]</td>
<td>Joins the live Interactive Whiteboard room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.joinRoom(RoomParams roomParams, RoomListener roomListener, Promise<Room> roomPromise) joinRoom} [2/2]</td>
<td>Joins the live Interactive Whiteboard room and sets room event callbacks.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.createPlayer(PlayerConfiguration playerConfiguration, Promise<Player> playerPromise) createPlayer} [1/2]</td>
<td>Creates a {@link com.herewhite.sdk.Player Player} instance.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.createPlayer(PlayerConfiguration playerConfiguration, PlayerListener listener, Promise<Player> playerPromise) createPlayer} [2/2]</td>
<td>Creates a {@link com.herewhite.sdk.Player Player} instance and sets the event listener.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.isPlayable(PlayerConfiguration playerConfiguration, Promise<Boolean> playablePromise) isPlayable}</td>
<td>Checks whether the room has playback data.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.setupFontFaces(FontFace[] fontFaces) setupFontFaces}</td>
<td>Declares the fonts that can be used in the local whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.loadFontFaces(FontFace[] fontFaces, Promise<JSONObject> loadPromise) loadFontFaces}</td>
<td>Declares the fonts that can be used in the local whiteboard and preloads them.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.updateTextFont(String[] names) updateTextFont}</td>
<td>Sets the fonts used by the text tool in the local whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.releaseRoom() releaseRoom} [2/2]</td>
<td>Releases the {@link com.herewhite.sdk.Room Room} instance and removes the `RoomListener` callback.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.releasePlayer() releasePlayer} [1/2]</td>
<td>Releases the {@link com.herewhite.sdk.Player Player} instance and removes the `PlayerEventListener` callback.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.Version() Version}</td>
<td>Gets the SDK version number.</td>
</tr>
</table>

### Common events

<table>
<tr>
<th>Event</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.throwError(Object args) throwError}</td>
<td>Reports an uncaught global error during SDK runtime.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.urlInterrupter(String sourceUrl) urlInterrupter}</td>
<td>Occurs when the SDK intercepts an image URL address.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.onPPTMediaPlay() onPPTMediaPlay}</td>
<td>Occurs when the audio and video in dynamic PPT slides start playing.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.onPPTMediaPause() onPPTMediaPause}</td>
<td>Occurs when the audio and video in dynamic PPT slides pause playing.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.onMessage(JSONObject object) onMessage}</td>
<td>Occurs when the user receives a message from the web page.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.sdkSetupFail(SDKError error) sdkSetupFail}</td>
<td>Reports the failure of the SDK initialization.</td>
</tr>
</table>

### Room management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getObserverId() getObserverId}</td>
<td>Gets the user ID.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setWritable(boolean writable, @Nullable Promise<Boolean> promise) setWritable}</td>
<td>Sets whether a user is in interactive mode in the room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableOperations(boolean disableOperations) disableOperations}</td>
<td>Disables the whiteboard from responding to users' operations.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disconnect() disconnect}</td>
<td>Disconnects from the live Interactive Whiteboard room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setGlobalState(GlobalState globalState) setGlobalState}</td>
<td>Modifies the global state of the live Interactive Whiteboard room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getDisconnectedBySelf() getDisconnectedBySelf}</td>
<td>Gets whether the SDK calls {@link com.herewhite.sdk.Room.disconnect() disconnect} to disconnect from the live Interactive Whiteboard room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getWritable() getWritable}</td>
<td>Gets whether the local user is in interactive mode in the room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getGlobalState() getGlobalState} [1/2]</td>
<td>Gets the global state of the room (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getGlobalState(Promise<GlobalState> promise) getGlobalState} [2/2]</td>
<td>Gets the global state of the room (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomMembers() getRoomMembers} [1/2]</td>
<td>Gets the list of members in the room (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomMembers(Promise<RoomMember[]> promise) getRoomMembers} [2/2]</td>
<td>Gets the list of members in the room (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomPhase() getRoomPhase} [1/2]</td>
<td>Gets the connection state of the room (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomPhase(Promise<RoomPhase> promise) getRoomPhase} [2/2]</td>
<td>Gets the connection state of the room (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomState() getRoomState} [1/2]</td>
<td>Gets the current room state (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomState(Promise<RoomState> promise) getRoomState} [2/2]</td>
<td>Gets the current room state (asynchronous).</td>
</tr>
</table>

### Whiteboard tool

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setMemberState(MemberState memberState) setMemberState}</td>
<td>Modifies the state of the whiteboard tool currently in use.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getMemberState() getMemberState} [1/2]</td>
<td>Gets the state of the whiteboard tool currently in use (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getMemberState(Promise<MemberState> promise getMemberState) getMemberState} [2/2]</td>
<td>Gets the state of the whiteboard tool currently in use (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.copy() copy}</td>
<td>Copies the selected content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.paste() paste}</td>
<td>Pastes the copied content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.duplicate() duplicate}</td>
<td>Duplicates the selected content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.deleteOperation() deleteOperation}</td>
<td>Deletes the selected content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableSerialization(boolean disable) disableSerialization}</td>
<td>Disables/Enables the local serialization.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.redo() redo}</td>
<td>Redoes an undone action.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.undo() undo}</td>
<td>Undoes an action.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableEraseImage(boolean disable) disableEraseImage}</td>
<td>Disables the eraser from erasing images on the whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableDeviceInputs(boolean disableOperations) disableDeviceInputs}</td>
<td>Disables the whiteboard from responding to users' operations.</td>
</tr>
</table>

### View management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setViewMode(ViewMode viewMode) setViewMode}</td>
<td>Sets the view mode of the user.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.setCameraBound(CameraBound bound) setCameraBound}</td>
<td>Sets the boundary of the user's view.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.disableCameraTransform(Boolean disable) disableCameraTransform}</td>
<td>Disables the user from adjusting the view.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.moveCamera(CameraConfig camera) moveCamera}</td>
<td>Adjusts the view.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.moveCameraToContainer(RectangleConfig rectangle) moveCameraToContainer}</td>
<td>Adjusts the view to ensure the complete display of the view rectangle.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.scalePptToFit() scalePptToFit}</td>
<td>Adjusts the view in `Continuous` mode to ensure the complete display of the PPT slide.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.scalePptToFit(AnimationMode mode) scalePptToFit}</td>
<td>Adjusts the view in the specified mode to ensure the complete display of the PPT slide.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableCameraTransform(boolean disableCameraTransform) disableCameraTransform}</td>
<td>Disables the local user from adjusting the view of the whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getBroadcastState() getBroadcastState} [1/2]</td>
<td>Gets the view state of the user (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getBroadcastState(Promise<BroadcastState> promise) getBroadcastState} [2/2]</td>
<td>Gets the view state of the user (asynchronous).</td>
</tr>
</table>


### Scene management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.insertImage(ImageInformation imageInfo) insertImage} [1/2]</td>
<td>Inserts an image placeholder on the whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.completeImageUpload(String uuid, String url) completeImageUpload}</td>
<td>Displays an image in the specified image placeholder.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.insertImage(ImageInformationWithUrl imageInformationWithUrl) insertImage} [2/2]</td>
<td>Inserts and displays an image on the whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getSceneState() getSceneState} [1/2]</td>
<td>Gets the state of the scenes under the current scene directory (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getSceneState(Promise<SceneState> promise) getSceneState} [2/2]</td>
<td>Gets the state of the scenes under the current scene directory (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getScenes() getScenes} [1/2]</td>
<td>Gets the list of scenes under the current scene directory (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getScenes(Promise<Scene[]> promise) getScenes} [2/2]</td>
<td>Gets the list of scenes under the current scene directory (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setScenePath(String path) setScenePath} [1/2]</td>
<td>Switches to the specified scene (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setScenePath(String path, Promise<Boolean> promise) setScenePath} [2/2]</td>
<td>Switches to the specified scene (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setSceneIndex(Integer index, @Nullable Promise<Boolean> promise) setSceneIndex} [1/2]</td>
<td>Switches to the specified scene under the current scene directory.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.putScenes(String dir, Scene[] scenes, int index) putScenes}</td>
<td>Inserts multiples scenes under the specified scene directory.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.moveScene(String sourcePath, String targetDirOrPath) moveScene}</td>
<td>Moves a scene.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.removeScenes(String dirOrPath) removeScenes}</td>
<td> Deletes a scene or a scene directory.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.cleanScene(boolean retainPpt) cleanScene}</td>
<td>Clears all contents on the current scene.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.pptNextStep() pptNextStep}</td>
<td>Plays the next slide of the PPT file.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.pptPreviousStep() pptPreviousStep}</td>
<td>Returns to the previous slide of the PPT file.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getScenePathType(String path, Promise<WhiteScenePathType> promise) getScenePathType}</td>
<td>Gets the type of the scene path.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getEntireScenes(Promise<Map<String, Scene[]>> promise) getEntireScenes}</td>
<td>Gets information about all scenes in the room.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getScenePreviewImage(String scenePath, Promise<Bitmap> promise) getScenePreviewImage}</td>
<td>Gets the preview of the specified scene.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getSceneSnapshotImage(String scenePath, Promise<Bitmap> promise) getSceneSnapshotImage}</td>
<td>Gets the screenshot of the specified scene.</td>
</tr>
</table>

### Whiteboard playback management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.setPlaybackSpeed(double playbackSpeed) setPlaybackSpeed}</td>
<td>Sets the playback speed.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.play() play}</td>
<td>Starts the playback of the whiteboard content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.pause() pause}</td>
<td>Pauses the playback of the whiteboard content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.stop() stop}</td>
<td>Stops the playback of the whiteboard content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.seekToScheduleTime(long seekTime) seekToScheduleTime}</td>
<td>Sets the playback position (ms) of the whiteboard content.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.setObserverMode(PlayerObserverMode mode) setObserverMode}</td>
<td>Sets the mode for watching the whiteboard playback.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlaybackSpeed() getPlaybackSpeed}</td>
<td>Gets the playback speed (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlaybackSpeed(Promise<Double> promise) getPlaybackSpeed}</td>
<td>Gets the playback speed (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerPhase() getPlayerPhase}</td>
<td>Gets the current phase of the `Player` instance (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPhase(Promise<PlayerPhase> promise) getPhase}</td>
<td>Gets the current phase of the `Player` instance (asynchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerState() getPlayerState}</td>
<td>Gets the state of the the `Player` instance (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerState(Promise<PlayerState> promise) getPlayerState}</td>
<td>Gets the state of the the `Player` instance (asynchronous).</td>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerTimeInfo() getPlayerTimeInfo}</td>
<td>Gets the time information of the `Player` instance (synchronous).</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerTimeInfo(Promise<PlayerTimeInfo> promise) getPlayerTimeInfo}</td>
<td>Gets the time information of the `Player` instance (asynchronous).</td>
</tr>
</table>

### Customized events

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.dispatchMagixEvent(AkkoEvent eventEntry) dispatchMagixEvent}</td>
<td>Sends a custom event.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.addMagixEventListener(String eventName, EventListener eventListener) addMagixEventListener}</td>
<td>Adds a listener for a customized event.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.addHighFrequencyEventListener(String eventName, FrequencyEventListener eventListener, Integer fireInterval) addHighFrequencyEventListener}</td>
<td>Adds a listener for a customized high-frequency event.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.removeMagixEventListener(String eventName) removeMagixEventListener}</td>
<td>Removes a listener for a customized event.</td>
</tr>
</table>

### iframe plug-in message

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.postIframeMessage(String string) postIframeMessage}</td>
<td>Sends message in string format to the iframe plugin.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.postIframeMessage(WhiteObject object) postIframeMessage}</td>
<td>Sends message in key-value format to the iframe plugin.</td>
</tr>
</table>

### Miscellaneous methods

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.debugInfo(Promise<JSONObject> promise) debugInfo}</td>
<td>Gets debug logs.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setTimeDelay(Integer delaySec) setTimeDelay}</td>
<td>Sets the delay time for sending the whiteboard contents of the local user to the remote users.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getTimeDelay() getTimeDelay}</td>
<td>Gets the delay time for synchronizing the whiteboard contents of the local user to the remote users.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.convertToPointInWorld(double x, double y, Promise<Point> promise) convertToPointInWorld}</td>
<td>Converts the coordinates of a point on the whiteboard.</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.refreshViewSize() refreshViewSize}</td>
<td>Refreshes the whiteboard view.</td>
</tr>
</table>