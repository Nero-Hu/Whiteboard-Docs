Agora provides interactive whiteboard with high reliability and rich features through a virtual global network and flexible combinations of APIs.
- The {@link WhiteWebSdk WhiteWebSdk} class provides the main methods for initializing the `WhiteSWebSdk` instance, joining the live Interactive Whiteboard room, and create a `Player` object.
- The {@link Room Room} class provides methods that manage the live Interactive Whiteboard room.
- The {@link Player Player} class provides methods that manage the playback of the whiteboard content.
- The {@link Displayer Displayer} interface is the parent interface of the {@link Room Room} interface and the {@link Player Player} interface. Both {@link Room Room} and {@link Player Player} inherit the methods of the `Displayer` interface.



### SDK initialization

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link WhiteWebSdk WhiteWebSdk}</td>
<td>Initializes a {@link WhiteWebSdk WhiteWebSdk} instance.</td>
</tr>
<tr>
<td>{@link Callbacks Callbacks}</td>
<td>Sets event callbacks.</td>
</tr>
<tr>
<td>{@link joinRoom joinRoom}</td>
<td>Joins the live Interactive Whiteboard room and sets room event callbacks.</td>
</tr>
<tr>
<td>{@link replayRoom replayRoom}</td>
<td>Creates a {@link Player Player} object and sets the callbacks for playback of whiteboard content.</td>
</tr>
<tr>
<td>{@link WhiteWebSdk.isPlayable isPlayable}</td>
<td>Checks whether the room has playback data.</td>
</tr>
<tr>
<td>{@link WhiteVersion WhiteVersion}</td>
<td>Gets the SDK version number.</td>
</tr>
</table>

### Room management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link setWritable setWritable}</td>
<td>Sets whether a user is in interactive mode in the room.</td>
</tr>
<tr>
<td>{@link disconnect disconnect}</td>
<td>Disconnects the user from the live Interactive Whiteboard room.</td>
</tr>
<tr>
<td>{@link setGlobalState setGlobalState}</td>
<td>Modifies the global state of the live Interactive Whiteboard room.</td>
</tr>
<tr>
<td>{@link isWritable isWritable}</td>
<td>Gets whether the local user is in interactive mode in the room.</td>
</tr>
</table>

### Whiteboard tool

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link setMemberState setMemberState}</td>
<td>Modifies the state of the whiteboard tool currently in use.</td>
</tr>
<tr>
<td>{@link MemberState MemberState}</td>
<td>Gets the state of the whiteboard tool currently in use.</td>
</tr>
<tr>
<td>{@link copy copy}</td>
<td>Copies the selected content.</td>
</tr>
<tr>
<td>{@link paste paste}</td>
<td>Pastes the copied content.</td>
</tr>
<tr>
<td>{@link duplicate duplicate}</td>
<td>Duplicates the selected content.</td>
</tr>
<tr>
<td>{@link delete delete}</td>
<td>Deletes the selected content.</td>
</tr>
<tr>
<td>{@link disableSerialization disableSerialization}</td>
<td>Disables/Enables the local serialization.</td>
</tr>
<tr>
<td>{@link redo redo}</td>
<td>Redoes an undone action.</td>
</tr>
<tr>
<td>{@link undo undo}</td>
<td>Undoes an action.</td>
</tr>
<tr>
<td>{@link disableEraseImage disableEraseImage}</td>
<td>Disables the eraser from erasing images on the whiteboard.</td>
</tr>
<tr>
<td>{@link disableDeviceInputs disableDeviceInputs}</td>
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
<td>{@link setViewMode setViewMode}</td>
<td>Sets the view mode of the user.</td>
</tr>
<tr>
<td>{@link setCameraBound setCameraBound}</td>
<td>Sets the boundary of the user's view.</td>
</tr>
<tr>
<td>{@link disableCameraTransform disableCameraTransform}</td>
<td>Disables the user from adjusting the view.</td>
</tr>
<tr>
<td>{@link moveCamera moveCamera}</td>
<td>Adjusts the view.</td>
</tr>
<tr>
<td>{@link moveCameraToContain moveCameraToContain}</td>
<td>Adjusts the view to ensure the complete display of the view rectangle.</td>
</tr>
<tr>
<td>{@link scalePptToFit scalePptToFit}</td>
<td>Adjusts the view (in the specified animation mode) to ensure the complete display of the PPT slide.</td>
</tr>
<tr>
<td>{@link BroadcastState BroadcastState</td>
<td>Gets the view state of the user.</td>
</tr>
</table>

### Scene management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{}{@link insertImage insertImage}</td>
<td>Inserts an image placeholder on the whiteboard.</td>
</tr>
<tr>
<td>{@link completeImageUpload completeImageUpload}</td>
<td>Displays an image in the specified image placeholder.</td>
</tr>
<tr>
<td>{@link SceneState SceneState}</td>
<td>Gets the state of the scenes under the current scene directory.</td>
</tr>
<tr>
<td>{@link SceneMap SceneMap}</td>
<td>Gets the list of scenes under the current scene directory.</td>
</tr>
<tr>
<td>{@link setScenePath setScenePath}</td>
<td>Switches to the specified scene.</td>
</tr>
<tr>
<td>{@link setSceneIndex setSceneIndex}</td>
<td>Switches to the specified scene under the current scene directory.</td>
</tr>
<tr>
<td>{@link putScenes putScenes}</td>
<td>Inserts multiples scenes under the specified scene directory.</td>
</tr>
<tr>
<td>{@link moveScene moveScene}</td>
<td>Moves a scene.</td>
</tr>
<tr>
<td>{@link removeScenes removeScenes}</td>
<td>Deletes a scene or a scene directory.</td>
</tr>
<tr>
<td>{@link cleanCurrentScene cleanCurrentScene}</td>
<td>Clears all contents on the current scene.</td>
</tr>
<tr>
<td>{@link pptNextStep pptNextStep}</td>
<td>Plays the next slide of the PPT file.</td>
</tr>
<tr>
<td>{@link pptPreviousStep pptPreviousStep}</td>
<td>Returns to the previous slide of the PPT file.</td>
</tr>
<tr>
<td>{@link Displayer.scenePathType ScenePathType}</td>
<td>Gets the type of the scene path.</td>
</tr>
<tr>
<td>{@link entireScenes entireScenes}</td>
<td>Gets information about all scenes in the room.</td>
</tr>
<tr>
<td>{@link scenePreview scenePreview}</td>
<td>Gets the preview of the specified scene.</td>
</tr>
<tr>
<td>{@link generateScreenshot generateScreenshot}</td>
<td>Gets the screenshot of the specified scene.</td>
</tr>
<tr>
<td>{@link fillSceneSnapshot fillSceneSnapshot}</td>
<td>Gets the snapshot of the specified scene.</td>
</tr>
</table>

### Whiteboard playback management

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link Player.playbackSpeed playbackSpeed}</td>
<td>Sets the playback speed.</td>
</tr>
<tr>
<td>{@link play play}</td>
<td>Starts the playback of the whiteboard content.</td>
</tr>
<tr>
<td>{@link pause pause}</td>
<td>Pauses the playback of the whiteboard content.</td>
</tr>
<tr>
<td>{@link stop stop}</td>
<td>Stops the playback of the whiteboard content.</td>
</tr>
<tr>
<td>{@link seekToProgressTime seekToProgressTime}</td>
<td>Sets the playback position (ms) of the whiteboard content.</td>
</tr>
<tr>
<td>{@link setObserverMode setObserverMode}</td>
<td>Sets the mode for watching the whiteboard playback.</td>
</tr>
</table>

### Customized events

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link dispatchMagixEvent dispatchMagixEvent}</td>
<td>Sends a custom event.</td>
</tr>
<tr>
<td>{@link addMagixEventListener addMagixEventListener}</td>
<td>Adds a listener for a customized event.</td>
</tr>
<tr>
<td>{@link removeMagixEventListener removeMagixEventListener}</td>
<td>Removes a listener for a customized event.</td>
</tr>
</table>

### Miscellaneous methods

<table>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
<tr>
<td>{@link timeDelay timeDelay}</td>
<td>Sets the delay time for synchronizing the whiteboard contents of the local user to the remote users.</td>
</tr>
<tr>
<td>{@link convertToPointInWorld convertToPointInWorld}</td>
<td>Converts the coordinates of a point on the whiteboard.</td>
</tr>
<tr>
<td>{@link refreshViewSize refreshViewSize}</td>
<td>Refreshes the whiteboard view.</td>
</tr>
</table>

### Event callbacks

<table>
<tr>
<th>Event</th>
<th>Description</th>
</tr>
<tr>
<td>{@link DisplayerCallbacks DisplayerCallbacks}</td>
<td>Reports events of a <code>Displayer</code> object</td>
</tr>
<tr>
<td>{@link RoomCallbacks RoomCallbacks}</td>
<td>Reports events of a live Interactive Whiteboard room</td>
</tr>
<tr>
<td>{@link PlayerCallbacks PlayerCallbacks}</td>
<td>Reports events of whiteboard playback</td>
</tr>
<tr>
<td>{@link PPTTaskCallbacks PPTTaskCallbacks}</td>
<td>Reports the progress and result of a PPT file-conversion task</td>
</tr>
</table>