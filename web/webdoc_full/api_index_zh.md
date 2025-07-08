声网通过全球部署的虚拟网络，提供可以灵活搭配的 API 组合，提供稳定可靠、功能丰富的实时互动白板。
- {@link WhiteWebSdk WhiteWebSdk} 类提供初始化互动白板 SDK、加入互动白板实时房间、创建白板回放的主要方法。
- {@link Room Room} 接口提供管理互动白板实时房间的方法。
- {@link Player Player} 接口提供控制白板回放的方法。
- {@link Displayer Displayer} 接口为 {@link Room Room} 接口和 {@link Player Player} 接口的父接口。{@link Room Room} 和 {@link Player Player} 对象都可以调用该接口中的方法。



### SDK 初始化

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link WhiteWebSdk WhiteWebSdk}</td>
<td>初始化 {@link WhiteWebSdk WhiteWebSdk} 实例</td>
</tr>
<tr>
<td>{@link Callbacks Callbacks}</td>
<td>设置事件回调</td>
</tr>
<tr>
<td>{@link joinRoom joinRoom}</td>
<td>加入互动白板实时房间并设置房间事件回调</td>
</tr>
<tr>
<td>{@link replayRoom replayRoom}</td>
<td>创建互动白板回放房间并设置回放事件回调</td>
</tr>
<tr>
<td>{@link WhiteWebSdk.isPlayable isPlayable}</td>
<td>查看房间是否有回放数据</td>
</tr>
<tr>
<td>{@link WhiteVersion WhiteVersion}</td>
<td>查询 SDK 版本号</td>
</tr>
</table>

### 实时房间管理

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link setWritable setWritable}</td>
<td>设置用户是否为互动模式</td>
</tr>
<tr>
<td>{@link disconnect disconnect}</td>
<td>断开用户与实时房间的连接</td>
</tr>
<tr>
<td>{@link setGlobalState setGlobalState}</td>
<td>修改房间的全局状态</td>
</tr>
<tr>
<td>{@link isWritable isWritable}</td>
<td>获取用户是否为互动模式</td>
</tr>
</table>

### 白板工具设置

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link setMemberState setMemberState}</td>
<td>修改房间的白板工具状态</td>
</tr>
<tr>
<td>{@link MemberState MemberState}</td>
<td>获取白板工具状态</td>
</tr>
<tr>
<td>{@link copy copy}</td>
<td>复制选中内容</td>
</tr>
<tr>
<td>{@link paste paste}</td>
<td>粘贴复制的内容</td>
</tr>
<tr>
<td>{@link duplicate duplicate}</td>
<td>复制并粘贴选中的内容</td>
</tr>
<tr>
<td>{@link delete delete}</td>
<td>删除选中的内容</td>
</tr>
<tr>
<td>{@link disableSerialization disableSerialization}</td>
<td>开启/禁止本地序列化</td>
</tr>
<tr>
<td>{@link redo redo}</td>
<td>重做</td>
</tr>
<tr>
<td>{@link undo undo}</td>
<td>撤销上一步操作</td>
</tr>
<tr>
<td>{@link disableEraseImage disableEraseImage}</td>
<td>关闭/开启橡皮擦擦除图片功能</td>
</tr>
<tr>
<td>{@link disableDeviceInputs disableDeviceInputs}</td>
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
<td>{@link setViewMode setViewMode}</td>
<td>切换视角模式</td>
</tr>
<tr>
<td>{@link setCameraBound setCameraBound}</td>
<td>设置视角边界</td>
</tr>
<tr>
<td>{@link disableCameraTransform disableCameraTransform}</td>
<td>禁止/允许用户调整（移动或缩放）视角</td>
</tr>
<tr>
<td>{@link moveCamera moveCamera}</td>
<td>调整视角</td>
</tr>
<tr>
<td>{@link moveCameraToContain moveCameraToContain}</td>
<td>调整视角以完整显示视觉矩形中的内容</td>
</tr>
<tr>
<td>{@link scalePptToFit scalePptToFit}</td>
<td>调整视角以完整显示 PPT 的内容（指定动画模式）</td>
</tr>
<tr>
<td>{@link BroadcastState BroadcastState}</td>
<td>获取用户的视角状态</td>
</tr>
</table>

### 场景管理

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link insertImage insertImage}</td>
<td>插入图片占位符</td>
</tr>
<tr>
<td>{@link completeImageUpload completeImageUpload}</td>
<td>展示图片</td>
</tr>
<tr>
<td>{@link SceneState SceneState}</td>
<td>获取当前场景目录下的场景状态</td>
</tr>
<tr>
<td>{@link createScenesCallback createScenesCallback}</td>
<td>创建场景目录的监听器对象</td>
</tr>
<tr>
<td>{@link SceneMap SceneMap}</td>
<td>获取当前场景目录下的场景列表</td>
</tr>
<tr>
<td>{@link getScene getScene}</td>
<td>获取指定场景的信息</td>
</tr>
<tr>
<td>{@link setScenePath setScenePath}</td>
<td>切换至指定的场景</td>
</tr>
<tr>
<td>{@link setSceneIndex setSceneIndex}</td>
<td>切换至当前场景目录下的指定场景</td>
</tr>
<tr>
<td>{@link putScenes putScenes}</td>
<td>在指定场景目录下插入多个场景</td>
</tr>
<tr>
<td>{@link moveScene moveScene}</td>
<td>移动场景</td>
</tr>
<tr>
<td>{@link exportScene exportScene}</td>
<td>导出场景</td>
</tr>
<tr>
<td>{@link importScene importScene}</td>
<td>导入场景</td>
</tr>
<tr>
<td>{@link removeScenes removeScenes}</td>
<td>删除场景或者场景目录</td>
</tr>
<tr>
<td>{@link cleanCurrentScene cleanCurrentScene}</td>
<td>清除当前场景的所有内容</td>
</tr>
<tr>
<td>{@link lockImages lockImages}</td>
<td>锁定选中图片</td>
</tr>
<tr>
<td>{@link insertText insertText}</td>
<td>在指定位置插入文字</td>
</tr>
<tr>
<td>{@link updateText updateText}</td>
<td>修改指定的文字</td>
</tr>
<tr>
<td>{@link updateSelectedText updateSelectedText}</td>
<td>修改当前被选中文字的字体样式</td>
</tr>
<tr>
<td>{@link pptNextStep pptNextStep}</td>
<td>播放动态 PPT 下一页</td>
</tr>
<tr>
<td>{@link pptPreviousStep pptPreviousStep}</td>
<td>返回动态 PPT 上一页</td>
</tr>
<tr>
<td>{@link Displayer.scenePathType scenePathType}</td>
<td>查询场景路径类型</td>
</tr>
<tr>
<td>{@link entireScenes entireScenes}</td>
<td>获取当前房间内所有场景的信息</td>
</tr>
<tr>
<td>{@link scenePreview scenePreview}</td>
<td>获取指定场景的预览图</td>
</tr>
<tr>
<td>{@link generateScreenshot generateScreenshot}</td>
<td>获取指定场景的截图</td>
</tr>
<tr>
<td>{@link fillSceneSnapshot fillSceneSnapshot}</td>
<td>获取指定场景的屏幕快照</td>
</tr>
</table>

### 回放管理

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link Player.playbackSpeed playbackSpeed}</td>
<td>设置白板回放的倍速</td>
</tr>
<tr>
<td>{@link play play}</td>
<td>开始白板回放</td>
</tr>
<tr>
<td>{@link pause pause}</td>
<td>暂停白板回放</td>
</tr>
<tr>
<td>{@link stop stop}</td>
<td>停止白板回放</td>
</tr>
<tr>
<td>{@link seekToProgressTime seekToProgressTime}</td>
<td>设置白板回放的播放位置</td>
</tr>
<tr>
<td>{@link setObserverMode setObserverMode}</td>
<td>设置白板回放的查看模式</td>
</tr>
</table>

### 自定义事件

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link dispatchMagixEvent dispatchMagixEvent}</td>
<td>发送自定义事件</td>
</tr>
<tr>
<td>{@link addMagixEventListener addMagixEventListener}</td>
<td>注册自定义事件监听</td>
</tr>
<tr>
<td>{@link removeMagixEventListener removeMagixEventListener}</td>
<td>移除自定义事件监听</td>
</tr>
</table>

### 其他方法

<table>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
<tr>
<td>{@link timeDelay timeDelay}</td>
<td>设置白板同步延时</td>
</tr>
<tr>
<td>{@link convertToPointInWorld convertToPointInWorld}</td>
<td>转换白板上点的坐标</td>
</tr>
<tr>
<td>{@link refreshViewSize refreshViewSize}</td>
<td>刷新白板的界面</td>
</tr>
<tr>
<td>{@link createPPTTask createPPTTask}</td>
<td>创建 <code>PPTTask</code> 对象</td>
</tr>
</table>

### 事件回调

<table>
<tr>
<th>事件</th>
<th>描述</th>
</tr>
<tr>
<td>{@link DisplayerCallbacks DisplayerCallbacks}</td>
<td><code>Displayer</code> 对象的事件回调</td>
</tr>
<tr>
<td>{@link RoomCallbacks RoomCallbacks}</td>
<td>白板房间的事件回调</td>
</tr>
<tr>
<td>{@link PlayerCallbacks PlayerCallbacks}</td>
<td>白板回放的事件回调</td>
</tr>
<tr>
<td>{@link PPTTaskCallbacks PPTTaskCallbacks}</td>
<td>文档转换任务的进度和结果回调</td>
</tr>
</table>