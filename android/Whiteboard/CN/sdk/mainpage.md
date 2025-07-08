声网通过全球部署的虚拟网络，提供可以灵活搭配的 API 组合，提供稳定可靠、功能丰富的实时互动白板。
- {@link com.herewhite.sdk.WhiteSdk WhiteSdk} 类提供初始化互动白板 SDK、加入互动白板实时房间、创建白板回放的主要方法。
- {@link com.herewhite.sdk.Room Room} 类提供管理互动白板实时房间的方法。
- {@link com.herewhite.sdk.Player Player} 类提供控制白板回放的方法。
- {@link com.herewhite.sdk.Displayer Displayer} 类为 {@link com.herewhite.sdk.Room Room} 类和 {@link com.herewhite.sdk.Player Player} 类的父类。{@link com.herewhite.sdk.Room Room} 和 {@link com.herewhite.sdk.Player Player} 实例都可以调用该类中的方法。



### SDK 初始化

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration) WhiteSdk} [1/4]</td>
<td>初始化 {@link com.herewhite.sdk.WhiteSdk WhiteSdk} 实例</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, @Nullable CommonCallback commonCallback) WhiteSdk} [2/4]</td>
<td>初始化 {@link com.herewhite.sdk.WhiteSdk WhiteSdk} 实例（设置回调）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.WhiteSdk(JsBridgeInterface bridge, Context context, WhiteSdkConfiguration whiteSdkConfiguration, @Nullable CommonCallback commonCallback, @Nullable AudioMixerBridge audioMixerBridge) WhiteSdk} [4/4]</td>
<td>初始化 {@link com.herewhite.sdk.WhiteSdk WhiteSdk} 实例（设置回调和混音）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.setCommonCallbacks(CommonCallback commonCallback) setCommonCallbacks}</td>
<td>设置通用事件回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.joinRoom(RoomParams roomParams, Promise<Room> roomPromise) joinRoom} [1/2]</td>
<td>加入互动白板实时房间</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.joinRoom(RoomParams roomParams, RoomListener roomListener, Promise<Room> roomPromise) joinRoom} [2/2]</td>
<td>加入互动白板实时房间并设置房间事件回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.createPlayer(PlayerConfiguration playerConfiguration, Promise<Player> playerPromise) createPlayer} [1/2]</td>
<td>创建互动白板回放房间</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.createPlayer(PlayerConfiguration playerConfiguration, PlayerListener listener, Promise<Player> playerPromise) createPlayer} [2/2]</td>
<td>创建互动白板回放房间并设置回放事件回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.isPlayable(PlayerConfiguration playerConfiguration, Promise<Boolean> playablePromise) isPlayable}</td>
<td>查看房间是否有回放数据</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.setupFontFaces(FontFace[] fontFaces) setupFontFaces}</td>
<td>声明在本地白板中可用的字体</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.loadFontFaces(FontFace[] fontFaces, Promise<JSONObject> loadPromise) loadFontFaces}</td>
<td>声明并预加载在本地白板中可用的字体</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.updateTextFont(String[] names) updateTextFont}</td>
<td>设置在本地白板中输入文字时使用的字体</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.releaseRoom() releaseRoom} [2/2]</td>
<td>释放互动白板实时房间实例并删除 `RoomListener` 回调。</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.releasePlayer() releasePlayer} [1/2]</td>
<td>释放回放房间实例并删除 `PlayerListener` 回调。</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.Version() Version}</td>
<td>查询 SDK 版本号</td>
</tr>
</table>

### 通用事件

<table>
<tr>
<th>事件</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.throwError(Object args) throwError}</td>
<td>出现未捕获的全局错误回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.urlInterrupter(String sourceUrl) urlInterrupter}</td>
<td>拦截图片 URL 回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.onPPTMediaPlay() onPPTMediaPlay}</td>
<td>动态 PPT 中的音视频开始播放回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.onPPTMediaPause() onPPTMediaPause}</td>
<td>动态 PPT 中的音视频暂停播放回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.onMessage(JSONObject object) onMessage}</td>
<td>接收到网页发送的消息回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.CommonCallback.sdkSetupFail(SDKError error) sdkSetupFail}</td>
<td>SDK 初始化失败回调</td>
</tr>
</table>

### 实时房间管理

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getObserverId() getObserverId}</td>
<td>获取用户 ID</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setWritable(boolean writable, @Nullable Promise<Boolean> promise) setWritable}</td>
<td>设置用户是否为互动模式</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableOperations(boolean disableOperations) disableOperations}</td>
<td>允许/禁止白板响应用户任何操作</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disconnect() disconnect}</td>
<td>断开连接</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setGlobalState(GlobalState globalState) setGlobalState}</td>
<td>修改房间的全局状态</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getDisconnectedBySelf() getDisconnectedBySelf}</td>
<td>获取用户是否主动断开连接</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getWritable() getWritable}</td>
<td>获取用户是否为互动模式</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getGlobalState() getGlobalState} [1/2]</td>
<td>获取房间的全局状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getGlobalState(Promise<GlobalState> promise) getGlobalState} [2/2]</td>
<td>获取房间的全局状态（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomMembers() getRoomMembers} [1/2]</td>
<td>获取房间的用户列表（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomMembers(Promise<RoomMember[]> promise) getRoomMembers} [2/2]</td>
<td>获取房间的用户列表（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomPhase() getRoomPhase} [1/2]</td>
<td>获取房间的连接状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomPhase(Promise<RoomPhase> promise) getRoomPhase} [2/2]</td>
<td>获取房间的连接状态（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomState() getRoomState} [1/2]</td>
<td>获取房间的所有状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getRoomState(Promise<RoomState> promise) getRoomState} [2/2]</td>
<td>获取房间的所有状态（异步方法）</td>
</tr>
</table>

### 白板工具设置

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setMemberState(MemberState memberState) setMemberState}</td>
<td>修改房间的白板工具状态</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getMemberState() getMemberState} [1/2]</td>
<td>获取白板工具状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getMemberState(Promise<MemberState> promise getMemberState) getMemberState} [2/2]</td>
<td>获取白板工具状态（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.copy() copy}</td>
<td>复制选中内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.paste() paste}</td>
<td>粘贴复制的内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.duplicate() duplicate}</td>
<td>复制并粘贴选中的内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.deleteOperation() deleteOperation}</td>
<td>删除选中的内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableSerialization(boolean disable) disableSerialization}</td>
<td>开启/禁止本地序列化</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.redo() redo}</td>
<td>重做</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.undo() undo}</td>
<td>撤销上一步操作</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableEraseImage(boolean disable) disableEraseImage}</td>
<td>关闭/开启橡皮擦擦除图片功能</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableDeviceInputs(boolean disableOperations) disableDeviceInputs}</td>
<td>禁止/允许用户操作白板工具</td>
</tr>
</table>

### 视角操作

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setViewMode(ViewMode viewMode) setViewMode}</td>
<td>切换视角模式</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.setCameraBound(CameraBound bound) setCameraBound}</td>
<td>设置视角边界</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.disableCameraTransform(Boolean disable) disableCameraTransform}</td>
<td>禁止/允许用户调整视角</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.moveCamera(CameraConfig camera) moveCamera}</td>
<td>调整视角</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.moveCameraToContainer(RectangleConfig rectangle) moveCameraToContainer}</td>
<td>调整视角以完整显示视觉矩形中的内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.scalePptToFit() scalePptToFit}</td>
<td>调整视角以完整显示 PPT 的内容（渐变模式）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.scalePptToFit(AnimationMode mode) scalePptToFit}</td>
<td>调整视角以完整显示 PPT 的内容（指定动画模式）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.scaleIframeToFit scaleIframeToFit}</td>
<td>调整视角以完整显示 H5 课件的内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.disableCameraTransform(boolean disableCameraTransform) disableCameraTransform}</td>
<td>禁止/允许用户调整（移动或缩放）视角</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getBroadcastState() getBroadcastState} [1/2]</td>
<td>获取用户的视角状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getBroadcastState(Promise<BroadcastState> promise) getBroadcastState} [2/2]</td>
<td>获取用户的视角状态（异步方法）</td>
</tr>
</table>


### 场景管理

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.insertImage(ImageInformation imageInfo) insertImage} [1/2]</td>
<td>插入图片占位符</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.completeImageUpload(String uuid, String url) completeImageUpload}</td>
<td>展示图片</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.insertImage(ImageInformationWithUrl imageInformationWithUrl) insertImage} [2/2]</td>
<td>插入并展示图片</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.insertText insertText}</td>
<td>在指定位置插入文字</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getScene getScene}</td>
<td>获取指定场景的信息</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getSceneState() getSceneState} [1/2]</td>
<td>获取当前场景目录下的场景状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getSceneState(Promise<SceneState> promise) getSceneState} [2/2]</td>
<td>获取当前场景目录下的场景状态（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getScenes() getScenes} [1/2]</td>
<td>获取当前场景目录下的场景列表（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getScenes(Promise<Scene[]> promise) getScenes} [2/2]</td>
<td>获取当前场景目录下的场景列表（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setScenePath(String path) setScenePath} [1/2]</td>
<td>切换至指定的场景（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setScenePath(String path, Promise<Boolean> promise) setScenePath} [2/2]</td>
<td>切换至指定的场景（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setSceneIndex(Integer index, @Nullable Promise<Boolean> promise) setSceneIndex} [1/2]</td>
<td>切换至当前场景目录下的指定场景</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.putScenes(String dir, Scene[] scenes, int index) putScenes}</td>
<td>在指定场景目录下插入多个场景</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.moveScene(String sourcePath, String targetDirOrPath) moveScene}</td>
<td>移动场景</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.removeScenes(String dirOrPath) removeScenes}</td>
<td>删除场景或者场景目录</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.cleanScene(boolean retainPpt) cleanScene}</td>
<td>清除当前场景的所有内容</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.pptNextStep() pptNextStep}</td>
<td>播放动态 PPT 下一页</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.pptPreviousStep() pptPreviousStep}</td>
<td>返回动态 PPT 上一页</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getScenePathType(String path, Promise<WhiteScenePathType> promise) getScenePathType}</td>
<td>查询场景路径类型</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getEntireScenes(Promise<Map<String, Scene[]>> promise) getEntireScenes}</td>
<td>获取当前房间内所有场景的信息</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getScenePreviewImage(String scenePath, Promise<Bitmap> promise) getScenePreviewImage}</td>
<td>获取指定场景的预览图</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.getSceneSnapshotImage(String scenePath, Promise<Bitmap> promise) getSceneSnapshotImage}</td>
<td>获取指定场景的截图</td>
</tr>
</table>

### 回放管理

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.setPlaybackSpeed(double playbackSpeed) setPlaybackSpeed}</td>
<td>设置白板回放的倍速</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.play() play}</td>
<td>开始白板回放</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.pause() pause}</td>
<td>暂停白板回放</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.stop() stop}</td>
<td>停止白板回放</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.seekToScheduleTime(long seekTime) seekToScheduleTime}</td>
<td>设置白板回放的播放位置</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.setObserverMode(PlayerObserverMode mode) setObserverMode}</td>
<td>设置白板回放的查看模式</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlaybackSpeed() getPlaybackSpeed}</td>
<td>获取白板回放的倍速（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlaybackSpeed(Promise<Double> promise) getPlaybackSpeed}</td>
<td>获取白板回放的倍速（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerPhase() getPlayerPhase}</td>
<td>获取白板回放的阶段（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPhase(Promise<PlayerPhase> promise) getPhase}</td>
<td>获取白板回放的阶段（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerState() getPlayerState}</td>
<td>获取白板回放的状态（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerState(Promise<PlayerState> promise) getPlayerState}</td>
<td>获取白板回放的状态（异步方法）</td>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerTimeInfo() getPlayerTimeInfo}</td>
<td>获取白板回放的时间信息（同步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.getPlayerTimeInfo(Promise<PlayerTimeInfo> promise) getPlayerTimeInfo}</td>
<td>获取白板回放的时间信息（异步方法）</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.addPlayerListener addPlayerListener}</td>
<td>添加白板回放的回调</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Player.removePlayerListener removePlayerListener}</td>
<td>删除白板回放的回调</td>
</tr>
</table>

### 自定义事件

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.dispatchMagixEvent(AkkoEvent eventEntry) dispatchMagixEvent}</td>
<td>发送自定义事件</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.addMagixEventListener(String eventName, EventListener eventListener) addMagixEventListener}</td>
<td>注册自定义事件监听</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.addHighFrequencyEventListener(String eventName, FrequencyEventListener eventListener, Integer fireInterval) addHighFrequencyEventListener}</td>
<td>注册高频自定义事件监听</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.removeMagixEventListener(String eventName) removeMagixEventListener}</td>
<td>移除自定义事件监听</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.dispatchDocsEvent(WindowDocsEvent docsEvent, Promise<Boolean> promise) dispatchDocsEvent}</td>
<td>发送文档操作事件</td>
</tr>

</table>

### iframe 插件交互

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.postIframeMessage(String string) postIframeMessage}</td>
<td>向 iframe 插件发送字符串信息</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.postIframeMessage(WhiteObject object) postIframeMessage}</td>
<td>向 iframe 插件发送 key-value 格式的信息</td>
</tr>
</table>

### 其他方法

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.debugInfo(Promise<JSONObject> promise) debugInfo}</td>
<td>获取调试日志信息</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.setTimeDelay() setTimeDelay}</td>
<td>设置白板同步延时</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Room.getTimeDelay() getTimeDelay}</td>
<td>获取白板同步延时</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.convertToPointInWorld(double x, double y, Promise<Point> promise) convertToPointInWorld}</td>
<td>转换白板上点的坐标</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.Displayer.refreshViewSize() refreshViewSize}</td>
<td>刷新白板的界面</td>
</tr>
<tr>
<td>{@link com.herewhite.sdk.WhiteSdk.prepareWhiteConnection(Context context, ConnectionPrepareParam param) prepareWhiteConnection}</td>
<td>提前选择线路以加快首次加入白板房间时的连接速度。</td>
</tr>
</table>