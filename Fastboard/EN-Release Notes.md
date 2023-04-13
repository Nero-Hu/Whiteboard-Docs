## v1.1.2

v1.1.2 was released on October 28, 2022. 

#### New features

This release provides the following new features:

**Insert dynamic documents**

This release adds the  [`insertPptx`](https://docs.agora.io/en/interactive-whiteboard/reference/uikit-sdk#insertpptx) method to insert and display a dynamic document in the whiteboard sub-window.

**Custom UI elements**

This release provides new style options for the whiteboard panel and control bar: 

- `FastRoomPanelItemAsset`: 
  - `selectedBackgroundCornerradius`: The radius of the background corner when selected. 
  - `selectedBackgroundEdgeinset` : The padding of the background when selected. 
	<div class="alert info">If you are migrating from v1.1.0 and earlier, you can set <code>selectedBackgroundCornerradius</code> to <code>0</code> and set <code>selectedBackgroundEdgeinset</code> to <code>UIEdgeInsetsZero</code>.</div>

- `FastRoomControlBarAssets`:  
  
  - `backgroundColor`: The background color of the control bar. 
  - `borderColor`: The color of the control bar border. 
  - `effectStyle`: A ground glass effect. See [UIBlurEffect](https://developer.apple.com/documentation/uikit/uiblureffect). 

#### Improvements

This release modified the default eraser behavior. The eraser now does not erase pictures by default. 

#### Fixed issue

This release fixed the display error that occurred when setting the background color of the teaching aids in operating systems earlier than iOS 13. 