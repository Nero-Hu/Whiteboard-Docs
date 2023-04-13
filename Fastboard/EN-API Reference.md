This page contains Fastboard iOS API changes starting from v1.1.2 and beyond.

### insertPptx

```swift
public func insertPptx(
    uuid: String,
    url: String,
    title: String,
    completionHandler: ((String)->Void)? = nil
)
```

Inserts and displays a dynamic document in the whiteboard sub-window.

A dynamic document refers to HTML web pages converted from a PPTX document by using the [Agora Interactive Whiteboard file conversion service](https://docs.agora.io/en/interactive-whiteboard/develop/file-conversion-overview#dynamic-file-conversion). The converted files preserve animation effects present in the source document.

After successfully [launching a file conversion task](https://docs.agora.io/en/interactive-whiteboard/reference/whiteboard-api/file-conversion#start-file-conversion) and calling the [Query file conversion progress](https://docs.agora.io/en/interactive-whiteboard/reference/whiteboard-api/file-conversion#query-the-progress-of-a-file-conversion-task) API to get the file conversion result, you can call this method and pass in the obtained file conversion result. After a successful call, the SDK automatically creates a sub-window to insert and display the converted document per page.

**Parameters**

- `uuid`: The task UUID, which is the unique identifier of the file conversion task.
- `url`: The prefix of the address of the generated file.
- `title`: The title of the sub-window.
- `completionHandler`: The callback that reports the call results. Passing in `nil` means not registering the callback.





##### FastRoomPanelItemAssets

Assets for buttons.

```swift
open class FastRoomPanelItemAssets: NSObject {
    @objc
    public init(normalIconColor: UIColor,
                selectedIconColor: UIColor,
                selectedIconBgColor: UIColor,
                highlightColor: UIColor,
                highlightBgColor: UIColor,
                disableColor: UIColor,
                subOpsIndicatorColor: UIColor,
                pageTextLabelColor: UIColor,
                selectedBackgroundCornerradius: CGFloat,
                selectedBackgroundEdgeinset: UIEdgeInsets) {
        self.normalIconColor = normalIconColor
        self.selectedIconColor = selectedIconColor
        self.selectedIconBgColor = selectedIconBgColor
        self.highlightColor = highlightColor
        self.highlightBgColor = highlightBgColor
        self.disableColor = disableColor
        self.subOpsIndicatorColor = subOpsIndicatorColor
        self.pageTextLabelColor = pageTextLabelColor
        self.selectedBackgroundCornerRadius = selectedBackgroundCornerradius
        self.selectedBackgroundEdgeinset = selectedBackgroundEdgeinset
    }

    @objc
    open var selectedBackgroundCornerRadius: CGFloat

    @objc
    open var selectedBackgroundEdgeinset: UIEdgeInsets
    
    @objc
    open var normalIconColor: UIColor
    
    @objc
    open var selectedIconColor: UIColor
    
    @objc
    open var selectedIconBgColor: UIColor
    
    @objc
    open var highlightColor: UIColor
    
    @objc
    open var highlightBgColor: UIColor
    
    @objc
    open var disableColor: UIColor
    
    @objc
    open var subOpsIndicatorColor: UIColor
    
    @objc
    open var pageTextLabelColor: UIColor
}
```

`FastRoomPanelItemAssets` contains the following properties:

- `normalIconColor`: The color of the button icon in the normal state, that is, when the button is not selected.
- `selectedIconColor`: The color of the button icon in the selected state.
- `selectedIconBgColor`: The background color of the button in the selected state.
- `highlightColor`: The color of the button icon in the highlighted state, that is, when the button is clicked.
- `highlightBgColor`: The background color of the button in the highlighted state, that is, when the button is clicked.
- `disableColor`: The color of the button in the unclickable state.
- `subOpsIndicatorColor`: The color of the drop-down button.
- `pageTextLabelColor`: The color of the page number.
- `selectedBackgroundCornerradius`: The radius of the background corner when selected. 
- `selectedBackgroundEdgeinset` : The padding of the background when selected. 

