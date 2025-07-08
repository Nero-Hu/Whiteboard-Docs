import { ComponentType, HTMLAttributes, Consumer } from "react";

export { ComponentType, HTMLAttributes, Consumer } from "react";

/**
 * The version of the current SDK in the string format. For example, `"2.12.11"`.
 */
export declare const WhiteVersion: string;

/**
 * The version of Akko.
 */
export declare const AkkoVersion: any;

/**
 * The user ID of the event trigger.
 */
export declare const AdminObserverId: number;

/**
 * Customized events.
 */
export declare type Event = {
    /**
     * The name of the customized event.
     */
    event: string;
    /**
     * The content of the customized event.
     */
    payload: any;
    /**
     * The user ID of the event trigger. If it is a system event, the user ID is `AdminObserverId`.
     */
    authorId: number;
    /**
     * The scope of the customized event.
     */
    scope: Scope;
    /**
     * The state of the customized event.
     */
    phase: EventPhase;
};

/**
 * The scope of an event.
 */
export declare enum EventScope {
    /**
     * A system event.
     */
    System = 0,
    /**
     * An App event.
     */
    App = 1,
    /**
     * A customized event.
     */
    Custom = 2,
    /**
     * Reserved for future use.
     */
    Magix = 3,
}

/**
 * The state of an event.
 */
export declare enum EventPhase {
    /**
     * The event is dispatched.
     */
    Dispatched = "dispatched",
    /**
     * The event is updated.
     */
    Updated = "updated",
    /**
     * The event is cancelled.
     */
    Canceled = "canceled",
}

/**
 * Reconnection configuration.
 */
export declare type ReconnectionOptions = {
    /**
     * Whether to disable the reconnection mechanism when the user drops offline:
     * - `true`: Disable the reconnection mechanism.
     * - `false`: Enable the reconnection mechanism.
     */
    disableReconnect: boolean;
};


/**
 * The output log level.
 *
 * @since 2.11.8
 *
 * The log level follows the sequence of `error`, `warn`, `info`, and `debug`.
 * When choosing a level, you can also see the logs preceding that level.
 * For example, if you set the log level to `info`, the SDK outputs the logs
 * within levels `error`，`warn`，and `info`.
 * - `error`: Logs at this level mainly report the errors that cause the SDK to
 * fail to complete a task.
 * - `warn`: Logs at this level mainly report the issues that the SDK has
 * encountered but automatically solved. If you call a deprecated method,
 * the SDK does not send warning messages.
 * - `info`: Logs at this level mainly provide information on SDK connection states.
 * - `debug`: Set your log level as `debug` if you want to get the most
 * complete log file. At present, logs at the `debug` level have the same
 * information as those at the `info` level.
 */
export declare type Level = "debug" | "info" | "warn" | "error";

/**
 * Whiteboard drawing performance optimization settings.
 *
 * @since 2.16.48
 *
 */
export declare interface OptimizeOptions {
    /**
     * Sets the refresh interval for whiteboard drawing. See {@link LowTaskAnimationInterval LowTaskAnimationInterval}.
     */
    useLowTaskAnimation: LowTaskAnimationInterval;

    /**
     * Whether to use a single canvas:
     *  - `true`: Use a single canvas and apply floating canvas optimization strategy.
     *  - `false`: (Default) Use two canvases for alternating drawing.
     *
     * By default, the whiteboard uses two canvases for alternating drawing to prevent flickering on some devices during drawing. Using a single canvas for drawing can prevent redrawing and reduce performance consumption.
     */
    useSinglerCanvas: boolean;

    /**
     * The correspondence between the position of the drawing point and the position of the floating canvas. The default is that the drawing point is located at the upper left corner of the floating canvas. See {@link OriginCoordType OriginCoordType}.
     *
     * Only effective when `useSinglerCanvas` is `true`.
     */
    useTopFloatOriginCoord: OriginCoordType;

}

/**
 * The device type.
 */
export declare enum DeviceType {
    /**
     * A desktop device, which supports keyboard and mouse.
     */
    Desktop = "desktop",
    /**
     * A touchscreen device, such as a smartphone or tablet.
     */
    Touch = "touch",
    /**
     * A device that supports keyboard, mouse, and touchscreen/touchpad.
     */
    Surface = "surface",
}

/**
 * View description.
 */
export declare type Camera = {
    /**
     * The X coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    centerX: number;
    /**
     * The Y coordinate of the center of the view in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    centerY: number;
    /**
     * The scale factor of the view.
     */
    scale: number;
};

/**
 * View rectangle description. This type inherits {@link Size} and adds the following members:
 *
 * - **originX**: *number*
 *
 *   The X coordinate of the left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
 * - **originY**: *number*
 *
 *   The Y coordinate of the left corner of the view rectangle in the world coordinate system (taking the center of the initial whiteboard as the origin).
 */
export declare type Rectangle = Size & {
    originX: number;
    originY: number;
};

/**
 * Size description.
 */
export declare type Size = {
    /**
     * The width of the object.
     */
    width: number;
    /**
     * The height of the object.
     */
    height: number;
};

/**
 * Animation mode for switching the view.
 *
 * @since 2.2.2
 */
export declare enum AnimationMode {
    /**
     * (Default) The view switches continuously.
     */
    Continuous = "continuous",
    /**
     * The view switches instantly.
     */
    Immediately = "immediately",
}

/**
 * An array of `React.ComponentType` objects, which is used to package the whiteboard view. The default value is [].
 */
export declare type WrappedComponents = ReadonlyArray<ComponentType<{
}>>;

/**
 * @ignore
 */
export declare const CNode: ComponentType<CNodeProps>;

/**
 * @ignore
 */
export declare type CNodeProps = HTMLAttributes<HTMLDivElement> & {
    context?: any;
    fixedMode?: boolean;
    onRef?: (element: HTMLDivElement | null)=>void;
};

/**
 * Adjusts the refresh interval (in ms) for whiteboard drawing.
 *
 * The lower the refresh interval, the smoother the stroke display, but the higher the performance consumption.
 * The higher the refresh interval, the more laggy the stroke, but the lower the performance consumption.
 *
 * @since 2.16.48
 *
 */
export declare enum LowTaskAnimationInterval {
    /**
     * The default refresh interval aligned to 60 FPS.
     */
    Default = 0,
    /**
     * Ultra-low refresh interval.
     */
    Xs = 20,
    /**
     * Low refresh interval.
     */
    Sm = 40,
    /**
     * Medium refresh interval.
     */
    Md = 60,
    /**
     * High refresh interval.
     */
    Lg = 80,
    /**
     * Ultra-high refresh interval.
     */
    Xl = 120,
}

/**
 * The correspondence between the position of the drawing point and the position of the floating canvas.
 *
 * @since 2.16.48
 *
 * Generates a floating canvas with a size of approximately 256 x 256 px based on the drawing position.
 * When subsequent drawing does not exceed the range of this canvas, the synchronized drawing range will be limited to this floating canvas instead of the entire canvas, reducing performance consumption.
 */
export declare enum OriginCoordType {
    /**
     * The drawing point is located at the top left corner of the floating canvas.
     */
    Default = 0,
    /**
     * The drawing point is located at the top left corner of the floating canvas.
     */
    LeftTop = 7,
    /**
     * The drawing point is located at the bottom left corner of the floating canvas.
     */
    LeftBottom = 1,
    /**
     * The drawing point is located at the top right corner of the floating canvas.
     */
    RightTop = 9,
    /**
     * The drawing point is located at the bottom right corner of the floating canvas.
     */
    RightBottom = 3,
    /**
     * The drawing point is located to the left from the center of the floating canvas.
     */
    LeftCenter = 4,
    /**
     * The drawing point is located to the right from the center of the floating canvas.
     */
    RightCenter = 6,
    /**
     * The drawing point is located at the top center of the floating canvas.
     */
    TopCenter = 8,
    /**
     * The drawing point is located at the bottom center of the floating canvas.
     */
    BottomCenter = 2,
    /**
     * The drawing point is located at the center of the floating canvas.
     */
    Center = 5,
}

/**
 * Custom fonts.
 */
export declare type UserFonts = {
    /**
     * Custom fonts in key-value pairs. The `key` is the font name and the `value` is the URL address of the font file. For example, `"Calibri": "https://your-cdn.com /Calibri.ttf"`.
     */
    [font: string]: string;
};

/**
 * Previews the PowerPoint (PPT) file.
 *
 * This function creates a new page for PPT preview, which is separate from the whiteboard page.
 *
 * @since 2.13.2
 *
 * @param conversionResponse The response for querying the progress of PPT file conversion. See {@link ConversionResponse}.
 * @param container An empty HTML container.
 * @param config Configurations of the preview page. See {@link PreviewConfig}.
 * @param preload Whether to request the resources of the next slide in advance:
 * - true: Request the resources of the next slide in advance. In this case, the response is saved using the browser cache.
 * - false: Do not request the resources of the next slide in advance.
 * @param userFonts Custom fonts. See {@link UserFonts}.
 * @param logger PPT preview logs. Reserved for future use.
 * @param pptPrams Other parameters related to PPT preview. See {@link PptParams}.
 * @param events Events.
 *
 * @returns The EventEmitter object.
 */
export declare function previewPPT(conversionResponse: ConversionResponse, container: HTMLDivElement, config?: PreviewConfig, preload?: boolean, userFonts?: UserFonts, logger?: Logger, pptPrams?: PptParams, events?: EventEmitter): EventEmitter;

/**
 * Cursor.
 */
export declare interface Cursor {
    /**
     * The container of the cursor, which is empty when the cursor is created.
     * You can use the following code to add HTML elements into the container and change the cursor style.
     *
     * @example
     * ```typescript
     * const icon = document.createElement("img");
     * icon.src = "https://my-resources.com/icon.png";
     * cursor.divElement.append(icon);
     * ```
     */
    readonly divElement: HTMLDivElement;

    /**
     * The ID of the user operating the cursor.
     */
    readonly memberId: number;

    /**
     * Information about the user operating the cursor.
     */
    readonly cursorMember: CursorMember;

    /**
     * The X coordinate of the center of the area the cursor is pointing to (taking the upper left corner of the initial whiteboard as the origin).
     */
    readonly x: number;

    /**
     * The Y coordinate of the center of the area the cursor is pointing to (taking the upper left corner of the initial whiteboard as the origin).
     */
    readonly y: number;

    /**
     * The width of the cursor icon.
     */
    readonly width: number;

    /**
     * The height of the cursor icon.
     */
    readonly height: number;

    onCursorMemberChanged:
    /**
     * Occurs when `cursorMember` changes.
     *
     * You can use the following code to listen for this callback:
     * @example
     * ```typescript
     * cursor.onCursorMemberChanged = function(cursorMember) {
     * }
     * ```
     *
     * @param cursorMember The updated `cursorMember`.
     */
    (cursorMember: CursorMember)=>void;

    /**
     * Changes the cursor style using JSX.
     *
     * @example
     * ```typescript
     * cursor.setReactNode(
     *     <img src="https://my-resources.com/icon.png"/>
     * );
     * ```
     * @param reactNode The JSX that describes the cursor style.
     */
    setReactNode(reactNode: any): void;

    /**
     * Changes the cursor description.
     *
     * @param description The cursor description.
     */
    setCursorDescription(description: Partial<CursorDescription>): void;

}

/**
 * Information about the user operating the cursor.
 */
export declare interface CursorMember {
    /**
     * The stroke color selected by the user (in RGB format).
     */
    readonly color: Color;

    /**
     * The whiteboard tool selected by the user.
     */
    readonly appliance: string;

    /**
     * @deprecated Use `userPayload` in {@link JoinRoomParams} instead.
     */
    readonly information: MemberInformation;

}

/**
 * Sets the cursor adapter.
 */
export declare interface CursorAdapter {
    /**
     * Creates the cursor description. This method is called before the user's cursor appears for the first time.
     * @param memberId The ID of the user.
     * @returns Description of the user's cursor.
     */
    createCursor(memberId: number): CursorDescription & {
        reactNode?: any;
    };

    /**
     * Occurs when the cursor appears on the whiteboard.
     * @param cursor The cursor object.
     */
    readonly onAddedCursor: ((cursor: Cursor)=>void) | undefined;

    /**
     * Occurs when the cursor disappears from the whiteboard.
     * @param cursor The cursor object.
     */
    readonly onRemovedCursor: ((cursor: Cursor)=>void) | undefined;

    /**
     * Occurs when the cursor moves on the whiteboard.
     * @param cursor The cursor object.
     * @param positionX The X coordinate of the center of the area the cursor is pointing to (taking the upper left corner of the initial whiteboard as the origin).
     * @param positionY The Y coordinate of the center of the area the cursor is pointing to (taking the upper left corner of the initial whiteboard as the origin).
     */
    readonly onMovingCursor: ((cursor: Cursor, positionX: number, positionY: number)=>void) | undefined;

}

/**
 * Cursor description.
 */
export declare type CursorDescription = {
    /**
     * The X coordinate of the center of the area the cursor is pointing to (taking the upper left corner of the cursor icon as the origin).
     */
    x: number;
    /**
     * The Y coordinate of the center of the area the cursor is pointing to (taking the upper left corner of the cursor icon as the origin).
     */
    y: number;
    /**
     * The width of the cursor icon.
     */
    width: number;
    /**
     * The height of the cursor icon.
     */
    height: number;
};

/**
 * Floating bar configuration.
 */
export declare type FloatBarOptions = {
    /**
     * The color palette of the floating bar.
     */
    colors: ReadonlyArray<Readonly<Color>>;
};

/**
 * Creates a plugin.
 *
 * @param plugins The plugin to be created.
 */
export declare function createPlugins<C_MAP extends Object>(plugins: Readonly<{
    [K: string]: Plugin<any>;
}>): Plugins<C_MAP>;

/**
 * Description of component plugins.
 *
 * Agora supports two kinds of custom plugins: component plugins and invisible plugins.
 */
export declare type Plugin<C = {
}, T = any> = {
    /**
     * The type of the component plugin, which is the unique identifier of the plugin.
     */
    kind?: string;
    /**
     * The style of the component plugin.
     */
    render: ComponentType<PluginProps<C, T>>;
    /**
     * Default attributes.
     */
    defaultAttributes?: T;

    hitTest?:
    /**
     * Hit test, which you can use to define the selectable area of the component plugin for the selection tool.
     *
     * @param plugin The component plugin object.
     * @param x The X coordinate of the center of the selectable area.
     * @param y The Y coordinate of the center of the selectable area.
     * @param selectorRadius The radius of the selectable area.
     *
     * @returns The result of the hit test:
     * - `true`: The hit test succeeds.
     * - `false`: The hit test fails.
     */
     (plugin: PluginInstance<C, T>, x: number, y: number, selectorRadius: number)=>boolean;

    willInterruptEvent?:
    /**
     * Determines whether to interrupt the native events of the component plugin.
     *
     * @param plugin The component plugin object.
     * @param event The native events.
     *
     * @returns Whether to interrupt the native events of the component plugin:
     * - `true`: Interrupt the native events.
     * - `false`: Do not interrupt the native events.
     */
     (plugin: PluginInstance<C, T>, event: NativeEvent)=>boolean;
};

/**
 * Component plugin.
 */
export declare interface Plugins<C_MAP extends Object = {
    [kind: string]: any;
}> {
    /**
     * Description of the component plugin.
     */
    readonly plugins: Readonly<{
        [K: string]: RenderPlugin<any>;
    }>;
    /**
     * Sets the context of the component plugin.
     *
     * @param kind The type of the component plugin.
     * @param context The context of the component plugin.
     */
    setPluginContext<K extends string>(kind: K, context: any): void;
    /**
     * Gets the context of the component plugin.
     * @param kind The type of the component plugin.
     */
    getPluginContext<K extends string>(kind: K): any | undefined;

}

/**
 * Description of invisible plugins.
 *
 * @since 2.10.0
 *
 * Agora supports two kinds of custom plugins: component plugins and invisible plugins. Note that:
 * - An invisible plugin is a global and unique variable in a room; it can have one object only.
 * - An invisible plugin is not visible on the whiteboard view, but its attributes are automatically synchronized in the room.
 */
export declare abstract class InvisiblePlugin<A extends Object> {
    /**
     * The `Displayer` object of the invisible plugin.
     */
    readonly displayer: Displayer;

    /**
     * Event callbacks of the invisible plugin.
     */
    readonly callbacks: Callbacks<InvisibleCallbacks<A>>;

    /**
     * Attributes of the invisible plugin.
     */
    readonly attributes: A;

    /**
     * The constructor of the invisible plugin.
     * @param context The context of the invisible plugin.
     */
    constructor(context: InvisiblePluginContext);

    /**
     * Occurs when the attributes of the invisible plugin are updated.
     * @param attributes The updated attributes.
     */
    onAttributesUpdate(attributes: A): void;

    /**
     * Occurs when the invisible plugin is deleted.
     */
    onDestroy(): void;

    /**
    * Gets the value of one or more attributes of the invisible plugin.
    * @since 2.13.7
    *
    * @param key The key of the attribute.
    */
     getAttributesValue(key: string[] | string): any;

    /**
     * Sets the attributes of the invisible plugin.
     * @param modifyAttributes The attributes of the invisible plugin.
     */
    setAttributes(modifyAttributes: Partial<A>): void;

    /**
     * Updates one or more attributes of the invisible plugin.
     * @since 2.13.7
     *
     * @param keys The key of the attribute.
     * @param value The value of the attribute.
     */
     updateAttributes(keys: string | string[], value: any): void;

    /**
     * Deletes the invisible plugin.
     */
    destroy(): void;

    /**
     * @ignore
     */
    _dispose(shouldCallback: boolean): void;

    private kind: any;

    private _displayer: any;

    private _callbacks: any;

    private enableCallbackUpdate: any;

    private disposer: any;

    private copiedAttributes: any;

    private autorunAttributesUpdate: any;

}

/**
 * The context of the invisible plugin.
 */
export declare type InvisiblePluginContext = {
    /**
     * The type of the invisible plugin.
     */
    kind: string;
    /**
     * The `Displayer` object of the invisible plugin.
     */
    displayer: Displayer;
};


/**
 * Invisible plugin.
 */
export declare type InvisiblePluginClass<K extends string, A extends Object, P extends InvisiblePlugin<A> = InvisiblePlugin<A>> = {
    /**
     * The type of the invisible plugin.
     */
    kind: K;

    onCreate?:
    /**
     * Occurs when the invisible plugin is created.
     * @param plugin The created invisible plugin.
     */
    (plugin: P)=>void;

    onDestroy?:
    /**
     * Occurs when the invisible plugin is deleted.
     * @param plugin The deleted invisible plugin.
     */
    (plugin: P)=>void;
};

/**
 * Callbacks for the invisible plugin.
 */
export declare type InvisibleCallbacks<A extends Object> = {

    onAttributesUpdate:
    /**
     * Occurs when the attributes of the invisible plugin are updated.
     * @param attributes The updated attributes.
     */
    (attributes: A)=>void;

    onDestroy:
    /**
     * Occurs when the invisible plugin is deleted.
     */
     ()=>void;
};

/**
 * Log configuration.
 */
export declare type LoggerOptions = {
    /**
     * The mode for the SDK to report logs at the `debug` level.
     */
    reportDebugLogMode?: LoggerReportMode;
    /**
     * The mode of the SDK to report connection quality data.
     */
    reportQualityMode?: LoggerReportMode;
    /**
     * The log reporting level of the SDK. See {@link Level}.
     */
    reportLevelMask?: Level;
    /**
     * The log printing level of the SDK. See {@link Level}. The default level is `info`.
     */
    printLevelMask?: Level;
};

/**
 * The mode of the SDK to report logs.
 */
export declare enum LoggerReportMode {
    /**
     * (Default) Enable the SDK to report all the time.
     */
    AlwaysReport = "alwaysReport",
    /**
     * Disable the SDK from reporting.
     */
    BanReport = "banReport",
    /**
     * Set the SDK to report according to the console settings in the browser.
     */
    DependsOnRemote = "dependsOnRemote",
}

/**
 * The writing quality setting of the pencil tool.
 */
 export declare enum NewPencilWritingQuality {
    /**
     * High quality.
     */
    Hight = 0,
    /**
     * Medium quality.
     */
    Medium = 1,
    /**
     * Low quality.
     */
    Low = 2,
}

/**
 * Sets the load mode of asynchronous modules.
 *
 * @param mode The load mode of asynchronous modules. See {@link AsyncModuleLoadMode}.
 */
export declare function setAsyncModuleLoadMode(mode: AsyncModuleLoadMode): void;

/**
 * The load mode of an asynchronous module.
 */
export declare enum AsyncModuleLoadMode {
    /**
     * Disables cache, which implies that the module is downloaded from the Internet every time.
     */
    DisableCache = "disableCache",
    /**
     * Caches the module in indexDB in blob form.
     */
    StoreAsBlob = "storeAsBlob",
    /**
     * Caches the module in indexDB in base64 string form.
     */
    StoreAsBase64 = "storeAsBase64",
}

/**
 * The user's view mode.
 */
export declare enum ViewMode {
    /**
     * (Default) Freedom mode.
     *
     * In this mode, the user can freely adjust their own view. Each user's view setting does not affect the view settings of other users.
     *
     * **Note**
     *
     * When there is no host in the room, all users are in `Freedom` view mode by default.
     */
    Freedom = "freedom",
    /**
     * Follower mode.
     *
     * In this mode, the user's view follows the view of the host.
     *
     * **Note**
     * - When one user’s view mode is set as `Broadcaster`, the view mode of the other users in the room (including users that join subsequently) automatically changes to `Follower`.
     * - When a user in `Follower` view mode operates the whiteboard, their view mode automatically switches to `Freedom` mode.
     */
    Follower = "follower",
    /**
     * Host mode.
     *
     * In this mode, the user can freely adjust their view, and every other user in the room can only follow the view of the host.
     *
     * **Note**
     * - Each room can have only one user in `Broadcaster` view mode.
     * - When a user’s view mode is set as `Broadcaster`, the view mode of every other user in the room (including users that join subsequently) is automatically set as `Follower`.
     */
    Broadcaster = "broadcaster",
}

/**
* Rendering modes for drawings on the whiteboard.
*
* @since 2.6.0
*/
export declare enum RenderEngine {
    /**
     * SVG rendering mode.
     * The Interactive Whiteboard Web SDK v2.6.0 or earlier uses SVG rendering mode by default. This mode has better compatibility but poorer performance.
     *
     */
    SVG = "svg",
    /**
     * Canvas rendering mode.
     * As of v2.6.0, the Interactive Whiteboard Web SDK adds canvas rendering mode, which has better performance but poorer compatibility.
     */
    Canvas = "canvas",
}

/**
 * Determines whether the `Displayer` object is a `Room` object.
 *
 * @param displayer The `Displayer` object.
 *
 * @returns Whether the `Displayer` object is a `Room` object:
 * - `true`: The `Displayer` object is a `Room` object.
 * - `false`: The `Displayer` object is not a `Room` object.
 */
export declare function isRoom(displayer: Displayer): boolean;

/**
 * @ignore
 * Determines whether the `Displayer` object is a `Player` object.
 *
 * @param displayer The `Displayer` object.
 *
 * @returns Whether the `Displayer` object is a `Player` object:
 * - `true`: The `Displayer` object is a `Player` object.
 * - `false`: The `Displayer` object is not a `Player` object.
 */
export declare function isPlayer(displayer: Displayer): boolean;

/**
 * Callbacks.
 */
export declare interface Callbacks<CALLBACKS extends {
    [name: string]: any;
}> {
    /**
     * Registers a callback.
     * @param name The callback name.
     * @param listener The callback function.
     */
    on<NAME extends string>(name: NAME, listener: any): void;

    /**
     * Registers a callback that is used only once.
     * @param name The callback name.
     * @param listener The callback function.
     */
    once<NAME extends string>(name: NAME, listener: any): void;

    /**
     * Unregisters a callback.
     * @param name The callback name.
     * @param listener The callback function.
     */
    off<NAME extends string>(name?: NAME, listener?: any): void;

    /**
     * Forwards a registered callback to another `Callbacks` object.
     * @param name The name of the registered callback.
     * @param toCallbacks The `Callbacks` object to which the registered callback is forwarded.
     */
     forwardTo<NAME extends string>(name: NAME, toCallbacks: Callbacks<CALLBACKS>): any;

}

/**
 * The default hotkeys.
 *
 * | Keys              | Action                     |
 * | :--------------------- | :---------------------- |
 * | Backspace or Delete     | Delete the selected object            |
 * | Shift                  | Resize proportionately |
 * | Ctrl + Z or Command + Z | Undo                   |
 * | Ctrl + Y or Command + Y | Redo                   |
 * | Ctrl + C or Command + C | Copy                     |
 * | Ctrl + V or Command + V | Paste                    |
 */
export declare const DefaultHotKeys: Partial<HotKeys>;

/**
 * The action triggered by the hotkey.
 */
export declare type HotKeys = {
    /**
     * Copy and paste.
     */
    duplicate: HotKey;
    /**
     * Copy.
     */
    copy: HotKey;
    /**
     * Paste.
     */
    paste: HotKey;
    /**
     * Undo.
     */
    undo: HotKey;
    /**
     * Redo.
     */
    redo: HotKey;
    /**
     * Delete.
     */
    delete: HotKey;
    /**
     * Lock the zoom level.
     */
    lock: HotKey;
    /**
     * Switch to selection tool (`selector`).
     */
    changeToSelector: HotKey;
    /**
     * Switch to clicker (`clicker`).
     */
    changeToClick: HotKey;
    /**
     * Switch to laser pointer (`laserPointer`).
     */
    changeToLaserPointer: HotKey;
    /**
     * Switch to pen tool (`pencil`).
     */
    changeToPencil: HotKey;
    /**
     * Switch to rectangle tool (`rectangle`).
     */
    changeToRectangle: HotKey;
    /**
     * Switch to ellipse tool (`ellipse`).
     */
    changeToEllipse: HotKey;
    /**
     * Switch to eraser (`eraser`).
     */
    changeToEraser: HotKey;
    /**
     * Switch to text tool（`text`).
     */
     changeToText: HotKey;
    /**
     * Switch to line tool (`straight`).
     */
    changeToStraight: HotKey;
    /**
     * Switch to arrow tool (`arrow`).
     */
    changeToArrow: HotKey;
    /**
     * Switch to hand tool (`hand`).
     */
    changeToHand: HotKey;
};

/**
 * Customized hotkeys.
 */
export declare type HotKey = string | HotKeyDescription | ReadonlyArray<string | HotKeyDescription> | HotKeyChecker;

/**
 * Description of the customized hotkey.
 */
export declare type HotKeyDescription = {
    /**
     * The specified key.
     */
    key: string;
    /**
     * Whether the Alt key is used.
     */
    altKey: boolean | null;
    /**
     * Whether the Ctrl key is used.
     */
    ctrlKey: boolean | null;
    /**
     * Whether the Shift key is used.
     */
    shiftKey: boolean | null;
};

/**
 * The event of the customized hotkey.
 */
export declare type HotKeyEvent = {
    /**
     * The browser event.
     */
    nativeEvent?: KeyboardEvent;
    /**
     * The event of the hotkey:
     * - `KeyDown`: The hotkey is pressed.
     * - `KeyUp`: The hotkey is released.
     */
    kind: "KeyDown" | "KeyUp";
    /**
     * The specified key.
     */
    key: string;
    /**
     * Whether the Alt key is used.
     */
    altKey: boolean;
    /**
     * Whether the Ctrl key is used.
     */
    ctrlKey: boolean;
    /**
     * Whether the Shift key is used.
     */
    shiftKey: boolean;
};

/**
 * The keyboard type.
 */
 export declare enum KeyboardKind {
    /**
     * Mac keyboard.
     */
    Mac = "mac",
    /**
     * Windows keyboard.
     */
    Windows = "windows",
}

/**
 * Hotkey checker.
 *
 * @param event The event of the customized hotkey.
 * @param kind The keyboard type.
 *
 * @returns Whether the hotkey is the customized hotkey:
 * - `true`: The hotkey is the customized hotkey.
 * - `false`: The hotkey is not the customized hotkey.
 */
export declare type HotKeyChecker = (event: HotKeyEvent, kind: KeyboardKind)=>boolean;

/**
 * Creates a `PPTTask` object.
 *
 * After the app server starts a file-conversion task, the app client can create
 * a `PPTTask` object by calling this function and passing in the Task Token and
 * Task UUID obtained from the app server. You can get the progress and result of
 * the file-conversion task through the callbacks for the `PPTTask` object.
 *
 * @param params Parameters of the `PPTTask` object.
 * @returns The created `PPTTask` object.
 */
export declare function createPPTTask(params: PPTTaskParams): PPTTask;

/**
 * Description of the image or dynamic PPT slide output by file conversion.
 */
export declare type PPT = {
    /**
     * The unique identifier (UUID) of the file-conversion task.
     */
    uuid: string;
    /**
     * The type of the file-conversion task.
     */
    kind: PPTKind;
    /**
     * The width of the image or dynamic PPT slide.
     */
    width: number;
    /**
     * The height of the image or dynamic PPT slide.
     */
    height: number;
    /**
     * The list of scenes related to the image or dynamic PPT slide.
     */
    scenes: ReadonlyArray<SceneDefinition>;
};

/**
 * The `PPTTask` interface, which describes the properties of a file-conversion task.
 */
export declare interface PPTTask {
    /**
     * The unique identifier (UUID) of the file-conversion task.
     */
    readonly uuid: string;

    /**
     * The type of the file-conversion task.
     */
    readonly kind: PPTKind;

    /**
     * The callbacks for the file-conversion task.
     */
    readonly callbacks: Callbacks<PPTTaskCallbacks>;

    /**
     * Sets the automatic querying of the real-time state of the file-conversion task. The querying stops once the task succeeds or fails.
     * @returns Description of the output image or dynamic PPT slide, if the method call succeeds.
     */
    checkUtilGet(): Promise<PPT>;

}

/**
 * The type of the file-conversion task.
 */
export declare enum PPTKind {
    /**
     * Dynamic file conversion, which converts a PPTX file to web pages.
     */
    Dynamic = "dynamic",
    /**
     * Static file conversion, which converts a PPT, PPTX, Word, or PDF file to images.
     */
    Static = "static",
}

/**
 * The state of the file-conversion task.
 */
export declare enum PPTTaskStatus {
    /**
     * Conversion is waiting to start.
     */
    Waiting = "Waiting",
    /**
     * Conversion is in progress.
     */
    Converting = "Converting",
}

/**
 * The current step of the file-conversion task.
 *
 * @since 2.10.3
 */
export declare enum PPTTaskStep {
    /**
     * Extracting resources.
     */
    Extracting = "Extracting",
    /**
     * Packaging.
     */
    Packaging = "Packaging",
    /**
     * Generating the preview.
     */
    GeneratingPreview = "GeneratingPreview",
    /**
     * Transcoding media files.
     */
    MediaTranscode = "MediaTranscode",
}

/**
 * The progress details of the file-conversion task.
 */
export declare type PPTTaskProgress = {
    /**
     * The state of the file-conversion task.
     */
    status: PPTTaskStatus;
    /**
     * The current step of the file-conversion task.
     *
     * @since 2.10.3
     */
    currentStep?: PPTTaskStep;
    /**
     * The total number of pages to be converted.
     */
    totalPageSize: number;
    /**
     * The number of pages converted.
     */
    convertedPageSize: number;
    /**
     * The conversion progress (in percentage).
     */
    convertedPercentage: number;
};

/**
 * The parameters of the `PPTTask` object.
 */
export declare type PPTTaskParams = {
    /**
     * The unique identifier (UUID) of the file-conversion task.
     */
    uuid: string;
    /**
     * The data center that processes the file-conversion task.
     * The following values are supported:
     *
     * | `region` | Data center                   | Service area                             |
     * | -------- | ----------------------------- | ---------------------------------------- |
     * | `us-sv`  | Silicon Valley, United States | North America and South America          |
     * | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
     * | `in-mum` | Mumbai, India                 | India                                    |
     * | `eu` | Frankfurt, Europe        | Europe                                   |
     * | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
     */
    region?: string;
    /**
     * The type of the file-conversion task.
     */
    kind: PPTKind;
    /**
     * The Task Token for authentication of the file-conversion task.
     */
    taskToken: string;
    /**
     * The time interval (ms) to automatically query the state of the file-conversion task.
     */
    checkProgressInterval?: number;
    /**
     * The timeout (ms) of the automatic query.
     */
    checkProgressTimeout?: number;
    /**
     * The callbacks for the file-conversion task.
     */
    callbacks?: PPTTaskCallbacks;
};

/**
 * The callbacks for the file-conversion task.
 */
export declare type PPTTaskCallbacks = {
    onProgressUpdated:
    /**
     * Occurs when the conversion progress is updated.
     * @param progress The progress details.
     */
    (progress: PPTTaskProgress)=>void;

    onTaskSuccess:
    /**
     * Occurs when the task succeeds.
     * @param result The image or dynamic PPT slide output by the task. See {@link PPT}.
     */
    (result: PPT)=>void;

    onTaskFail:
    /**
     * Occurs when the task fails.
     * @param error The error message.
     */
    (error: Error)=>void;
};

/**
 * @ignore
 * @deprecated
 */
export declare interface LegacyPPTConverter {
    convert(params: LegacyPPTConvertParams): Promise<LegacyPPT>;

}

/**
 * @ignore
 * @deprecated
 */
export declare type LegacyPPT = {
    uuid: string;
    kind: PPTKind;
    width: number;
    height: number;
    slideURLs: ReadonlyArray<string>;
    scenes: ReadonlyArray<SceneDefinition>;
};

/**
 * @ignore
 * @deprecated
 */
export declare type LegacyPPTConvertParams = {
    url: string;
    kind: PPTKind;
    onProgressUpdated?: (progress: number)=>void;
    checkProgressInterval?: number;
    checkProgressTimeout?: number;
};

/**
 * Resizes the viewable area by the specified scale factor.
 *
 * @param scale The specified scale factor.
 * @returns The actual scale factor.
 */
export declare function contentModeScale(scale: number): ContentMode;

/**
 * Resizes the viewable area proportionately until its longer sides meet with
 * the screen sides perpendicular to them, so that the viewable area is
 * completely displayed on the screen.
 *
 * @returns The actual scale factor.
 */
export declare function contentModeAspectFit(): ContentMode;

/**
 * Resizes the viewable area proportionately until its longer sides meet with
 * the screen sides perpendicular to them, so that the viewable area is
 * completely displayed on the screen.
 * Then, resizes the viewable area by the specified scale factor.
 *
 * @param scale The specified scale factor.
 * @returns The actual scale factor.
 */
export declare function contentModeAspectFitScale(scale: number): ContentMode;

/**
 * Resizes the viewable area proportionately until its longer sides meet with
 * the screen sides perpendicular to them, so that the viewable area is
 * completely displayed on the screen.
 * Then, adds the specified spaces around the viewable area.
 *
 * @param space The specified spaces in pixels.
 * @returns The actual scale factor.
 */
export declare function contentModeAspectFitSpace(space: number): ContentMode;

/**
 * Resizes the viewable area proportionately until its shorter sides meet with
 * the screen sides perpendicular to them, so that the viewable area completely
 * covers the screen.
 *
 * @returns The actual scale factor.
 */
export declare function contentModeAspectFill(): ContentMode;

/**
 * Resizes the viewable area proportionately until its shorter sides meet with
 * the screen sides perpendicular to them, so that the viewable area completely
 * covers the screen.
 * Then, resizes the viewable area by the specified scale factor.
 *
 * @param scale The specified scale factor.
 * @returns The actual scale factor.
 */
export declare function contentModeAspectFillScale(scale: number): ContentMode;

/**
 * The `CameraBound` type is used to set the viewable area.
 *
 * Within the viewable area, the user can flexibly move or zoom the view.
 * When the user tries to move the view beyond the viewable area, the SDK
 * automatically drags the view back into the viewable area.
 *
 */
export declare type CameraBound = {
    /**
     * The resistance coefficient. The value range is [0.0,1.0], and the default is 0.75.
     * The higher the value, the larger the resistance felt by the user when they
     * move or scale up the view beyond the viewable area.
     * - `0.0`: The user feels no resistance when moving or scaling up the view
     * beyond the viewable area. Once the user stops moving or scaling up, the
     * view returns to its original position.
     * - `1.0`: The user cannot move or scale up the view beyond the viewable area.
     */
    damping?: number;
    /**
     * The X coordinate of the center of the viewable area in the
     * world coordinate system (taking the center of the initial whiteboard as the origin).
     * The default value is 0.0.
     */
    centerX?: number;
    /**
     * The Y coordinate of the center of the viewable area in the
     * world coordinate system (taking the center of the initial whiteboard as the origin).
     * The default value is 0.0.
     */
    centerY?: number;
    /**
     * The width (pixels) of the viewable area. The default value is `Infinity`,
     * implying that the viewable area has no boundaries.
     */
    width?: number;
    /**
     * The height (pixels) of the viewable area. The default value is `Infinity`,
     * implying that the viewable area has no boundaries.
     */
    height?: number;
    /**
     * The maximum scale factor of the viewable area.
     * If you do not set this property, there is no upper limit on the scale factor.
     */
    maxContentMode?: ContentMode;
    /**
     * The minimum scale factor of the viewable area.
     * If you do not set this property, there is no lower limit on the scale factor.
     */
    minContentMode?: ContentMode;
};

/**
 * The actual scale factor.
 *
 * @param screenSize The size of the user's screen.
 * @param boundSize The current size of the viewable area.
 * @returns The scale factor calculated based on `screenSize` and `boundSize`.
 */
export declare type ContentMode = (screenSize: Size, boundSize: Size)=>number;

/**
 * The scene path types.
 */
export declare enum ScenePathType {
  /**
   * The queried path does not exist.
   */
  None = "none",
  /**
   * The queried path is the path of a scene directory.
   */
  Dir = "dir",
  /**
   * The queried path is the path of a scene.
   */
  Page = "page",
  /**
   * The path cannot exist because it contains the path of an existing scene.
   *
   * @since 2.14.5
   */
  Conflict = "conflict",
}

/**
 * List of scenes.
 */
export declare type SceneMap = {
    /**
     * The list of scenes under a scene directory.
     */
    [dirPath: string]: WhiteScene[];
};

/**
 * The `Displayer` interface is the basic interface for interactive whiteboard rooms.
 */
export declare interface Displayer<CALLBACKS extends DisplayerCallbacks = DisplayerCallbacks> {
    /**
     * Callbacks. Refer to the following example to set a callback:
     *
     * @example
     * ```typescript
     * // Listens for the onSliceChanged callback
     * function sliceChangeCallback(slice) {
     *
     * }
     *
     * // Registers the callback
     * displayer.callbacks.on("onSliceChanged", sliceChangeCallback);
     *
     * // Unregisters the callback
     * displayer.callbacks.off("onSliceChanged", sliceChangeCallback);
     *
     * // Sets the callback to occur once only
     * displayer.callbacks.once("onSliceChanged", function(slice) {
     *
     * });
     * ```
     */
    readonly callbacks: Callbacks<CALLBACKS>;

    /**
     * The ID of the user.
     *
     * In a live Interactive Whiteboard room, `observerId` is the ID of the local user.
     */
    readonly observerId: number;

    /**
     * The data center, which supports the following values:
     *
     * | `region` | Data center                   | Service area                             |
     * | -------- | ----------------------------- | ---------------------------------------- |
     * | `us-sv`  | Silicon Valley, United States | North America and South America          |
     * | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
     * | `in-mum` | Mumbai, India                 | India                                    |
     * | `eu` | Frankfurt, Europe        | Europe                                   |
     * | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
     */
    readonly region: string;

    /**
     * The unique identifier (UUID) of the current slice.
     */
    readonly slice: string;

    /**
     * The version of the current SDK.
     * @since 2.13.14
     */
     readonly version: string;

    /**
     * The user's device type, which determines how the SDK handles mouse and touch events.
     */
    readonly deviceType: DeviceType;

    /**
     * The user's screen type, which is used to adjust parameters for gesture recognition.
     */
    readonly screenType: ScreenType;

    /**
     * The state of the `Displayer` object.
     */
    readonly state: DisplayerState;

    /**
     * Whether the user currently has write permission:
     *
     * @since 2.10.0
     *
     * - `true`: The user has write permission.
     * - `false`: The user does not have write permission.
     */
    readonly enableWriteNow: boolean;

    /**
     * The hotkeys for the hand tool. The user can use the hand tool to move the page.
     * If you set this property to `undefined`, the hand tool has no hotkeys.
     */
    readonly handToolKey: string | undefined;

    /**
     * Whether to enable the hand tool:
     * - `true`: Enable the hand tool.
     * - `false`: Disable the hand tool.
     */
    handToolActive: boolean;

    /**
     * Whether to disable the highlighted box when another user puts their cursor
     * on an object on the whiteboard:
     *
     * @since 2.12.0
     *
     * - `true`: Disable the highlighted box.
     * - `false`: (Default) Enable the highlighted box.
     *
     * **Note**
     *
     * This property does not affect the highlighted box of the local user.
     */
    disableOthersSelectingBox: boolean;

    /**
     * Whether to disable the user from adjusting (moving or zooming) the view
     * through touchscreen gestures or mousewheel movement:
     * - `true`: Disable the user from adjusting the view.
     * - `false`: (Default) Enable the user to adjust the view.
     *
     * **Note**
     *
     * This method does not affect the `setCameraBound`, `moveCamera`, or `moveCameraToContain` methods.
     */
    disableCameraTransform: boolean;

    /**
     * Refreshes the whiteboard view.
     *
     * When the whiteboardView changes, you need to call this method to refresh the whiteboard view.
     * This method takes effect only when `autoResize` is set to `false`.
     */
    refreshViewSize(): void;

    /**
     * Sets the boundary of the local user's view.
     * @param cameraBound The boundary of the view.
     */
    setCameraBound(cameraBound: CameraBound): void;

    /**
     * Creates a listener object for a scene directory.
     *
     * After the listener object is successfully created, when the scenes and subdirectories in the specified
     * scene directory change, the SDK triggers the callbacks you have registered in {@link ScenesCallbacks ScenesCallbacks} to report the scene events.
     * When you no longer need the created listener, call {@link ScenesCallbacksNode.dispose dispose} to release the listener object.
     *
     * @note
     * - Call this method after joining the whiteboard room.
     * - You can create only one listener object for each scene directory.
     * If you need to create a new listener object, you must call `dispose` to release the created listener object first.
     *
     * @param path The path of the scene directory. If you pass in a scene path, the SDK sets the listened object to its parent scene directory.
     * @param callbacks The callbacks to be listened to. See `ScenesCallbacks`.
     * @returns
     * - The {@link ScenesCallbacksNode ScenesCallbacksNode} object if the method call succeeds.
     * - `null` if the method call fails. The method call can fail because the specified scene directory does not exist.
     */
     createScenesCallback(path: string, callbacks?: Partial<ScenesCallbacks>): ScenesCallbacksNode | null;

    /**
     * Gets the state of the whiteboard tool used by the user.
     *
     * @param memberId The ID of the user.
     * @returns The state of the whiteboard tool used by the user.
     */
    memberState(memberId: number): MemberState;

    /**
     * Adjusts the view.
     *
     * @param camera The view configuration. See {@link Camera}.
     */
    moveCamera(camera: Partial<Camera> & Readonly<{
        animationMode?: AnimationMode;
    }>): void;

    /**
     * Adjusts the view to ensure the complete display of the view rectangle.
     *
     * @param rectangle Configuration of the view rectangle. See {@link Rectangle}.
     */
    moveCameraToContain(rectangle: Rectangle & Readonly<{
        animationMode?: AnimationMode;
    }>): void;

    /**
     * Binds the whiteboard to an HTML container.
     *
     * @param element The HTML container for the whiteboard. You can unbind the
     * whiteboard by setting this parameter to `null`.
     */
    bindHtmlElement(element: HTMLDivElement | null): void;

    /**
     * Gets the specified invisible plugin.
     *
     * @param kind The type of the invisible plugin.
     * @returns The specified invisible plugin.
     */
    getInvisiblePlugin<A extends Object>(kind: string): InvisiblePlugin<A> | null;

    /**
     * Converts the coordinates of a point on the whiteboard.
     *
     * This method converts the coordinates of the screen coordinate system (taking
     * the upper left corner as the origin) to the coordinates of the world
     * coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param point The coordinates of the point in the screen coordinate system.
     * @returns The coordinates of the point in the world coordinate system.
     */
    convertToPointInWorld(point: {
        /**
         * The X coordinate of the point in the screen coordinate system.
         */
        x: number;
        /**
         * The Y coordinate of the point in the screen coordinate system.
         */
        y: number;
    }): {
        /**
         * The X coordinate of the point in the world coordinate system.
         */
        x: number;
        /**
         * The Y coordinate of the point in the world coordinate system.
         */
        y: number;
    };

    /**
     * Generates the preview of the specified scene.
     *
     * @param  scenePath The path of the specified scene.
     * @param  div The div for the preview.
     * @param  width The width of the preview. This parameter is optional since v2.3.8.
     * If you do not set this parameter, it is set to the width of the div for the preview.
     * @param  height The height of the preview. This parameter is optional since v2.3.8.
     * If you do not set this parameter, it is set to the height of the div for the preview.
     */
    scenePreview(scenePath: string, div: HTMLElement, width: number | undefined, height: number | undefined): void;

    /**
     * Generates the screenshot of the specified scene.
     *
     * @param scenePath The path of the scene. You can get the current `scenePath` via `room.state.sceneState.scenePath`.
     * @param width The width of the screenshot.
     * @param height The height of the screenshot.
     * @returns The URL address of the screenshot.
     *
     * **Note**
     *
     * If the scene displays an image or dynamic PPT slide, ensure that the
     * storage server of the image or the PPT slide supports cross-origin resource sharing;
     * otherwise, the image or PPT slide may not be shown in the generated screenshot.
     */
    generateScreenshot(scenePath?: string, width?: number, height?: number): Promise<string>;

    /**
     * Generates the snapshot of the specified scene.
     *
     * @param scenePath The path of the specified scene.
     * @param div The div for the snapshot.
     * @param width The width of the snapshot. This parameter is optional since v2.3.8.
     * If you do not set this parameter, it is set to the width of the div for the snapshot.
     * @param height The height of the snapshot. This parameter is optional since v2.3.8.
     * If you do not set this parameter, it is set to the height of the div for the snapshot.
     */
    fillSceneSnapshot(scenePath: string, div: HTMLElement, width: number, height: number): void;

    /**
     * Generates the snapshot and writes it into the specified CanvasRenderingContext2D object. 
     * @param context The CanvasRenderingContext2D object.
     * @param scenePath The path of the scene. You can get the current `scenePath` via `room.state.sceneState.scenePath`.
     * @param width The width of the snapshot.
     * @param height The height of the snapshot.
     * @param camera The description of the view angle. See {@link Camera Camera}.
     * @param ratio The device pixel ratio. This parameter is optional. If you do not set this parameter, the default value is 1.
     */
     screenshotToCanvas(context: CanvasRenderingContext2D, scenePath: string, width: number, height: number, camera: Camera, ratio?: number): void;

    /**
     * Generates a screen snapshot and writes it into the specified `CanvasRenderingContext2D` object after the images in the target scene have finished loading.
     * 
     * @note 
     *  - This feature is under experimental stage.
     *  - If the images in the target scene fail to load, this function cannot return a screen snapshot. You need to handle the timeout logic yourself.
     *  - If you want to generate a screen snapshot without including images, use {@link screenshotToCanvas}.
     * 
     * @param context The CanvasRenderingContext2D object.
     * @param scenePath The path of the scene. You can get the current `scenePath` via `room.state.sceneState.scenePath`.
     * @param width The width of the snapshot.
     * @param height The height of the snapshot.
     * @param camera The description of the view angle. See {@link Camera Camera}.
     * @param ratio The device pixel ratio. This parameter is optional. If you do not set this parameter, the default value is 1.
     * @param timeout The timeout time (ms) for image loading. The default is never to time out and can only be set to a number greater than `0`. If the image loading time exceeds this value, the SDK proceeds to the next drawing operation without waiting for the image to complete loading.
     */
    screenshotToCanvasAsync(context: CanvasRenderingContext2D, scenePath: string, width: number, height: number, camera: Camera, ratio?: number, timeout?: number): Promise<void>;

    /**
     * Adds a listener for a customized event.
     *
     * You can receive the customized event callback after a successful call of this method.
     *
     * **Note**
     *
     * The SDK triggers only one callback for the customized events with the same name.
     *
     * @param event The name of the customized event to be listened for.
     * @param listener The customized event callback. See {@link EventListener}.
     * If you add multiple callbacks for the same event, the callback added later overrides the one added earlier.
     * @param options Since v2.15.2. Options for setting a custom event listener. See {@link MagixEventListenerOptions}.
     */
    addMagixEventListener(event: string, listener: EventListener, options?: MagixEventListenerOptions): void;

    /**
     * Adds a high-frequency listener for a customized event.
     *
     * You can receive the customized event callback after a successful call of this method.
     *
     * **Note**
     *
     * The SDK triggers only one callback for the customized events with the sane name.
     *
     * @param event The name of the customized event to be listened for.
     * @param listener The customized events callback. See {@link EventsListener}.
     * If you add multiple callbacks for the same event, the callback added later overrides the one added earlier.
     * @param fireInterval The interval (ms) at which the SDK triggers the callback.
     * The minimum interval is 500 ms. The SDK automatically adjusts the value smaller than 500 to 500.
     *
     * @example
     * ```typescript
     * function listener(events) {
     *     for (const event of events) {
     *     }
     * }
     * displayer.addMagixEventListener("my-event", listener, 100);
     * ```
     */
    addMagixEventListener(event: string, listener: EventsListener, fireInterval: number): void;

    /**
     * Removes a listener for a customized event.
     *
     * @param event The name of the event.
     * @param listener The listener you want to remove. If you do not set this parameter, all listeners for the event are removed.
     */
    removeMagixEventListener(event: string, listener?: EventListener): void;

    /**
     * Waits for a customized event.
     *
     * @param filter The event filter.
     * @returns The specified customized event when it occurs.
     */
    waitMagixEvent(filter: EventFilter): Promise<Event>;

    /**
     * Adjusts the view in the specified mode to ensure the complete display of the PPT slide.
     *
     * @since 2.3.18
     *
     * @param animationMode The animation mode for adjusting the view. See {@link AnimationMode}.
     */
    scalePptToFit(animationMode?: AnimationMode): void;

    /**
     * Gets the type of the scene path.
     *
     * @param path The path of the scene.
     * @returns The type of the scene path.
     */
    scenePathType(path: string): ScenePathType;

    /**
     * Gets information about all scenes in the room.
     *
     * @returns Information about all scenes in the room.
     */
    entireScenes(): SceneMap;

    /**
     * Gets the information about a specified scene.
     *
     * @param path The path of a scene. Ensure the scene path stars with `/` and consists of the scene directory and scene name.
     * For example, `/math/classA`.
     *
     * @returns The information about the specified scene. See {@link WhiteScene WhiteScene}.
     */
     getScene(path: string): WhiteScene | undefined;

}

/**
 * `DisplayerState` is used by `Room` objects.
 */
export declare type DisplayerState = {
    /**
     * The global state of the room. See {@link GlobalState}.
     */
    globalState: GlobalState;
    /**
     * The states of all the users in interactive mode (the users who have read and write permissions on the whiteboard).
     */
    roomMembers: ReadonlyArray<RoomMember>;
    /**
     * The state of the current scene.
     */
    sceneState: SceneState;
    /**
     * The state of the current view.
     *
     * @since 2.10.0
     */
    cameraState: CameraState;
};

/**
 * Callbacks for `Displayer` objects.
 */
export declare type DisplayerCallbacks = {

    onEnableWriteNowChanged:
    /**
     * @since 2.10.0
     *
     * Occurs when the user's write permission changes:
     *
     * @param enableWriteNow Whether the user currently has write permission:
     * - `true`: The user has write permission.
     * - `false`: The user does not have write permission.
     */
    (enableWriteNow: boolean)=>void;

    onHandToolActive:
    /**
     * Reports whether the hand tool is enabled.
     * @param active Whether the hand tool is enabled:
     * - `true`: The hand tool is enabled.
     * - `false`: The hand tool is disabled.
     */
     (active: boolean)=>void;

    onSliceChanged:
    /**
     * Occurs when the current slice changes.
     * @param slice The unique identifier (UUID) of the slice.
     */
    (slice: string)=>void;

    onCatchErrorWhenAppendFrame:
    /**
     * Reports the error occurred during the synchronization of a user's operations.
     *
     * @param userId The user ID of the user.
     * @param error An error message.
     */
     (userId: number, error: Error)=>void;

    onCatchErrorWhenRender:
    /**
     * Reports the error occurred in rendering.
     * @param error An error message.
     */
    (error: Error)=>void;

    onRenderDuration:
    /**
     * Reports the rendering duration.
     * @param renderDuration The rendering duration.
     */
    (renderDuration: number)=>void;

    /**
     * Reports the failure of loading background image.
     */
    onBackgroundError: (url: string)=>void;

    /**
     * @ignore
     * Reports the progress of loading the source file when converting it to web pages.
     *
     * @param uuid The unique identifier of the conversion task (Task UUID).
     * @param progress The loading progress. The value range is [0.0, 1.0].
     */
    onPPTLoadProgress:(uuid: string, progress: number)=>void;

    onPPTMediaPlay:
    /**
     * Occurs when a media file in the dynamic PPT slide starts playing.
     * @param shapeId The ID of the shape where the media file is inserted.
     * @param type The type of the media file.
     */
    (shapeId: string, type: MediaType)=>void;

    onPPTMediaPause:
    /**
     * Occurs when a media file in the dynamic PPT slide stops playing.
     * @param shapeId The ID of the shape where the media file is inserted.
     * @param type The type of the media file.
     */
    (shapeId: string, type: MediaType)=>void;
    onPPTMediaPlayError:
    /**
     * Reports exceptions that occur during the playing of the media file in a dynamic PPT slide.
     * @param shapeId The ID of the shape where the media file is inserted.
     * @param type The type of the media file. See MediaType.
     * @param error An error message.
     */
    (shapeId: string, type: MediaType, error: Error)=>void;
};

/**
 * The `Room` interface extends the `Displayer` interface and adds properties
 * for operating a live Interactive Whiteboard room.
 */
export declare interface Room extends Displayer {
  /**
   * Room UUID, the unique identifier of a room.
   */
  readonly uuid: string;

  /**
   * The unique identifier of a user in the room, which is in string format.
   */
  readonly uid: string;

  /**
   * The unique identifier (UUID) of the current session in the room. If you
   * enable the SDK to report logs all the time, this parameter is reported in the logs.
   * If the SDK has not connected to the server when reporting logs, this parameter is shown as `undefined`.
   */
  readonly session: string;

  /**
   * The Room Token for user authentication.
   */
  readonly roomToken: string;

  /**
   * The connection state of the room. See {@link RoomPhase}.
   */
  readonly phase: RoomPhase;

  /**
   * The current timestamp (ms) that is calibrated using the server time.
   * @since 2.13.8
   */
  readonly calibrationTimestamp: number;

  /**
   * The business status of the room.
   */
  readonly state: RoomState;

  /**
   * Whether the user is in interactive mode in the room:
   * - `true`:  In interactive mode, where the user has read and write permissions on the whiteboard.
   * - `false`: In subscription mode, where the user has read-only access to the whiteboard.
   */
  readonly isWritable: boolean;

  /**
   * The number of remaining undoable actions (the number of times {@link undo} can be called).
   */
  readonly canUndoSteps: number;

  /**
   * The number of remaining redoable actions (the number of times {@link redo} can be called).
   */
  readonly canRedoSteps: number;

  /**
   * Whether to disable the user from operating the whiteboard tools through the mouse, keyboard, or touchscreen:
   * - `true`: Disable the user from operating the whiteboard tools.
   * - `false`: Enable the user to operate the whiteboard tools.
   *
   * This method is different from `isWritable`. See [Prohibited operation](https://developer.netless.link/javascript-en/home/disable#Prohibit-device-operation).
   */
  disableDeviceInputs: boolean;

  /**
   * Whether to disable the eraser from erasing images on the whiteboard:
   * - `true`:  Disable the eraser from erasing images.
   * - `false`: Enable the eraser to erase images.
   *
   * @since 2.3.12
   */
  disableEraseImage: boolean;

  /**
   * Whether to disable the local serialization:
   * - `true`:  Disable the local serialization.
   * - `false`: Enable the local serialization.
   *
   * The following methods cannot take effect after the setting of `disableSerialization(true)`:
   * - `redo`
   * - `undo`
   * - `duplicate`
   * - `copy`
   * - `paste`
   *
   * @warning To set `disableSerialization` as `false`, ensure that every user
   * in the room uses one of the following SDKs; otherwise, the application may crash:
   * - Web SDK v2.9.3 or later
   * - Android SDK v2.9.3 or later
   * - iOS SDK v2.9.3 or later
   *
   */
  disableSerialization: boolean;

  /**
   * Sets the delay (ms) for displaying remote whiteboard contents on the local
   * client. The value of `timeDelay` must be equal to or greater than 0. The
   * default value is 0.
   *
   * After you set this parameter, when the local user receives the remote
   * whiteboard contents, the SDK delays displaying the contents based on the
   * value of `timeDelay`.
   *
   * In scenarios with significant audio and video transmission delays, for
   * example, when using a CDN to distribute audio and video streams, you can
   * use this parameter to delay displaying the received remote whiteboard
   * contents, so as to ensure that the whiteboard contents and the audio and
   * video streams are synchronized.
   */
  timeDelay: number;

  /**
    * Whether to use the native clipboard:
    * 
    * - `true`: Use the native clipboard. The whiteboard shortcuts, such as copy and paste in {@link Hotkeys HotKeys}, will be disabled and replaced with the native `copy` and `paste` events.
    * - `false`: (Default) Do not use the native clipboard.
    * 
    * @note This feature requires browser support and user permission to access the clipboard, otherwise it will automatically fall back to a virtual clipboard implementation.
    */
    useNativeClipboard: boolean;

  /**
   * Sets whether a user is in interactive mode in the room.
   *
   * @param isWritable Whether the user is in interactive mode:
   * - `true`: The user is in interactive mode (has read and write permissions on the whiteboard).
   * - `false`: The user is in subscription mode (has read-only access to the whiteboard).
   */
  setWritable(isWritable: boolean): Promise<void>;

  /**
   * Modifies the `globalState` of the live Interactive Whiteboard room.
   *
   * The `globalState` property of the live Interactive Whiteboard room is a public global variable.
   * All users in the room can read the `globalState` property, while users in interactive mode can modify the `globalState` property.
   * The modified `globalState` will be updated to all users in the room immediately.
   *
   * Refer to the following example to modify the `globalState` property:
   *
   * @example
   * ```typescript
   * room.setGlobalState({
   *     foobar: "hello world",
   * });
   * ```
   *
   * Set `globalState` to `undefined` to delete it:
   *
   * @example
   * ```typescript
   * room.setGlobalState({
   *     foobar: undefined,
   * });
   * ```
   *
   * @param modifyState The `globalState` property.
   * @returns The modified `globalState`.
   */
  setGlobalState(modifyState: Partial<GlobalState>): GlobalState;

  /**
   * Modifies the state of the whiteboard tool.
   *
   * A successful call of this method updates the {@link MemberState} of the room immediately.
   *
   * Refer to the following example to modify `MemberState`:
   *
   * @example
   * ```typescript
   * room.setMemberState({
   *     foobar: "hello world",
   * });
   * ```
   *
   * Set `MemberState` to `undefined` to delete it:
   * @example
   *
   * ```typescript
   * room.setMemberState({
   *     foobar: undefined,
   * });
   * ```
   *
   * @param modifyState The state of the whiteboard tool. See {@link MemberState}.
   * @returns The modified state.
   */
  setMemberState(modifyState: Partial<MemberState>): MemberState;

  /**
   * Sets the view mode of the user.
   *
   * In the live Interactive Whiteboard room, you can set one of the following view modes for a user:
   * - `Broadcaster`: Host mode.
   * - `Follower`: Follower mode.
   * - `Freedom`: (Default) Freedom mode.
   *
   * **Note**
   *
   * The view mode setting of a user is affected by the view mode setting of other users in the room as follows:
   * - When there is no host in the room, all users are in `Freedom` view mode by default.
   * - When a user’s view mode is set as `Broadcaster`, the view mode of every other user in the room (including users that join subsequently) is automatically set as 'Follower'.
   * - When a user in `Follower` view mode operates the whiteboard, their view mode automatically switches to `Freedom` mode.
   *
   * @param viewMode The view mode of the user. See {@link ViewMode}.
   */
  setViewMode(viewMode: ViewMode): void;

  /**
   * Switches to the specified scene.
   *
   * A successful call of this method switches the whiteboard scene to the specified scene.
   *
   * **Note**
   *
   * This method call is synchronous.
   *
   * The scene switch may fail due to the following reasons:
   * - The specified scene path is invalid. Ensure the scene path stars with `/`
   * and consists of the scene directory and scene name.
   * - The specified scene does not exist.
   * - The path passed in is the path of the scene directory, not the path of the scene.
   *
   * @param scenePath The path of the scene that you want to switch to. Ensure
   * the scene path stars with `/` and consists of the scene directory and scene name. For example, `/math/classA`.
   */
  setScenePath(scenePath: string): void;

  /**
   * Switches to the specified scene under the current scene directory.
   *
   * A successful call of this method switches the whiteboard scene to the specified scene.
   *
   * **Note**
   *
   * The specified scene must exist in the current scene directory; otherwise, the method call fails.
   *
   * @param index The index of the target scene in the current scene directory.
   */
  setSceneIndex(index: number): void;

  /**
   * Sets the Unix timestamp (ms) for displaying remote whiteboard contents on the local client.
   *
   * @since 2.12.11
   *
   * After you call this method, the SDK displays the received remote whiteboard
   * contents based on the value of `timestamp` you set in this method.
   *
   * In scenarios where users subscribe to audio and video streams and whiteboard
   * contents at the same time, you can obtain time information from the SEI frame
   * attached to the audio and video streams, and call this method to set the local
   * display time for the remote whiteboard contents, so as to ensure audio and
   * video streams and the whiteboard contents are synchronized in real time.
   *
   * @param timestamp The Unix timestamp (ms) for displaying remote whiteboard
   * contents on the local client.
   */
  syncBlockTimestamp(timestamp: number): void;

  /**
   * Cancels the Unix timestamp (ms) for displaying remote whiteboard contents on
   * the local client, which is set by {@link syncBlockTimestamp}.
   * @since 2.13.8
   */
  stopBlockTimestamp(): void;

  /**
   * Sends a custom event.
   *
   * **Note**
   *
   * All users that listen for this event receive the notification.
   *
   * @param event The custom event.
   * @param payload The content of the custom event.
   */
  dispatchMagixEvent(event: string, payload: any): void;

  /**
   * Inserts multiples scenes under the specified scene directory.
   *
   * **Note**
   *
   * This method does not switch the whiteboard scene to any of the newly inserted scenes.
   * You need to call {@link setScenePath} to switch to one of the newly inserted scenes.
   *
   * @param path The path of the scene directory, which must starts with `/`
   * and cannot be the path of a scene. For example, `"/math"`.
   * @param scenes An array of scenes. For the files of a single scene, see {@link SceneDefinition}.
   * @param index The index of the first scene to be inserted under the specified scene directory.
   * The index of a scene under a scene directory starts from 0.
   * - If the specified index number is no greater than the index of an existing scene, the new scenes are put before the existing scene corresponding to the specified index number;
   * - If the index is greater than the index of any existing scene, the new scenes are put after the last existing scene.
   * - If you do not specify the index (because this parameter is optional, you can just omit it), the new scenes are put after the last existing scene.
   *
   */
  putScenes(
    path: string,
    scenes: ReadonlyArray<SceneDefinition>,
    index?: number
  ): void;

  /**
   * Clears all contents on the current scene.
   *
   * @param retainPpt Whether to retain the PPT slide:
   *  - `true`: (Default) Leave the PPT slide on the scene.
   *  - `false`: Clear the PPT slide together with all other contents.
   */
  cleanCurrentScene(retainPpt?: boolean): void;

  /**
   * Deletes a scene or a scene directory.
   *
   * **Note**
   *
   * - There must be at least one scene in the live Interactive Whiteboard room.
   * If you delete all scenes, the SDK automatically creates an initial scene with the path of `/init`.
   * - If you delete the current whiteboard scene, the whiteboard displays the
   * last scene under the current scene directory.
   * - If you delete a scene directory, all scenes under the directory will be deleted.
   * - If you delete the current scene directory, for example, `dirA`, the SDK
   * executes upward recursive logic to locate the new scene:
   *    1. If there is a scene directory after the deleted scene directory
   * under the same directory, for example, `dirB`，the SDK switches the
   * whiteboard scene to the first scene under `dirB` (with the index of 0).
   *    2. If there is no scene directory after the deleted scene directory
   * under the same directory, then the SDK looks for scenes under the directory.
   * If there are scenes under the directory, the SDK switches the whiteboard
   * scene to the first scene (with the index of 0).
   *    3. If there is neither a scene directory after the deleted scene directory
   * nor scenes under the same directory, then the SDK looks for scene directories
   * before the deleted scene directory. If there is a scene directory, for example,
   * `dirC`， before the deleted `dirA`, then the SDK switches the whiteboard
   * scene to the first scene under `dirC` (with the index of 0).
   *
   *  The SDK continues executing upward recursive logic until a new scene is found.
   *
   * @param path The path of a scene or a scene directory. If you pass in the
   * path of a scene directory, this method deletes all scenes under the directory.
   */
  removeScenes(path: string): void;

  /**
   * Moves a scene.
   *
   * After a scene is moved, the path of the scene changes.
   *
   * @param originalPath The original path of the scene to be moved. It cannot
   * be the path of a scene directory.
   * @param targetPath The path of the target scene directory or the target
   * path of the scene under the current directory:
   * - If you pass in the path of the target scene directory, the path of the
   * scene changes, but the name of the scene does not change.
   * - If you pass in the target path of the scene under the current directory,
   * both the path of the scene and the name of the scene change.
   */
  moveScene(originalPath: string, targetPath: string): void;

  /**
   * Exports a scene.
   *
   * @since v2.14.5
   *
   * This method can export all contents of a specified scene, including the image or web page displayed on the scene.
   *
   * After a successful method call, the SDK exports the contents of the specified scene and saves them as a binary file (Blob object).
   *
   * @param scenePath The path of the scene to be exported.
   *
   * @returns The Blob object of the exported scene contents.
   */
  exportScene(scenePath: string): Promise<Blob>;

  /**
   * Imports a scene.
   *
   * @since v2.14.5
   *
   * You can call this method to import the contents of a scene exported by the {@link exportScene} method.
   *
   * @param dir The scene directory to which the scene contents are imported. Ensure that {@link ScenePathType} of the scene directory is not
   * `conflict`；otherwise, the scene cannot be imported. You can use {@link scenePathType} to get the path type of the scene directory.
   *
   * @param payload The Blob object of the scene contents.
   *
   * @returns A {@link SceneDefinition} object, if the method call succeeds. The returned {@link SceneDefinition} object includes `name` of the imported scene.
   * The path of the imported scene is `dir`+ `name`. You can call {@link moveScene} to change the scene path if needed.
   *
   */
  importScene(dir: string, payload: Blob): Promise<SceneDefinition>;

  /**
   * Inserts an image placeholder on the whiteboard.
   *
   * The method sets up and inserts an image placeholder on the whiteboard
   * per `imageInfo` you pass in.
   *
   * You also need to call {@link completeImageUpload} to pass in the URL address
   * of the image to insert and display the image in the placeholder.
   *
   * @param imageInfo The image information. See {@link ImageInformation}.
   */
  insertImage(imageInfo: ImageInformation): void;

  /**
   * Locks an image.
   *
   * When an image is locked, users cannot move or zoom the image.
   *
   * @param uuid The unique identifier (UUID) of the image.
   * @param locked Whether to lock the image:
   * - `true`: Lock the image.
   * - `false`: Do not lock the image.
   */
  lockImage(uuid: string, locked: boolean): void;

  /**
   * Displays an image in the specified image placeholder.
   *
   * The method inserts and displays an online image in the specified image placeholder.
   *
   * **Note**
   *
   * Ensure that you have called {@link insertImage} to insert an image placeholder on the whiteboard.
   *
   * @param uuid The unique identifier of the image, which is the image UUID
   * that you pass in {@link ImageInformation ImageInformation} of the {@link insertImage} method.
   * @param src The URL address of the image. Ensure the application client can
   * access the URL; otherwise, the image cannot be displayed.
   */
  completeImageUpload(uuid: string, src: string): void;

  /**
   * Creates an invisible plugin object.
   *
   * @param pluginClass The class of the invisible plugin.
   * @param attributes The attributes of the invisible plugin.
   * @returns The created invisible plugin object.
   */
  createInvisiblePlugin<
    K extends string,
    A extends Object,
    P extends InvisiblePlugin<A>
  >(
    pluginClass: InvisiblePluginClass<K, A, P>,
    attributes: A
  ): Promise<InvisiblePlugin<A>>;

  /**
   * Inserts a component plugin object to the whiteboard.
   *
   * @param kind The type of the component plugin, which is the unique identifier of the plugin.
   * @param description Description of the component plugin.
   *
   * @returns The unique identifier of the plugin in the room.
   */
  insertPlugin(kind: string, description?: PluginDescription): Identifier;

  /**
   * Deletes a component plugin object.
   *
   * @param identifier The unique identifier of the plugin in the room.
   */
  removePlugin(identifier: Identifier): boolean;

  /**
   * Updates the description of the component plugin object.
   *
   * @param identifier The unique identifier of the plugin in the room.
   * @param description The updated description.
   */
  updatePlugin(identifier: Identifier, description: PluginDescription): boolean;

  /**
   * Gets the attributes of the component plugin object.
   *
   * @param identifier The unique identifier of the plugin in the room.
   */
  getPluginAttributes(identifier: Identifier): any | undefined;

  /**
   * Gets the position of the component plugin object on the whiteboard.
   *
   * @param identifier The unique identifier of the plugin in the room.
   * @returns The rectangle for the component plugin object.
   */
  getPluginRectangle(identifier: string): Rectangle | undefined;

  /**
   * Copies and pastes the selected content into the center of the user view
   * on the whiteboard.
   *
   * **Note**
   * - This method takes effect only when you set {@link disableSerialization} as`false`.
   * - If you call this method multiple times, random offset may occur, which
   * causes the pasted content not to center the user view.
   * @since 2.9.0
   */
  duplicate(): void;

  /**
     * Copies the selected content.
     *

     *
     * **Note**
     * - This method stores the selected content to the memory, but does not paste it to the whiteboard.
     * - This method takes effect only when you set {@link disableSerialization} as `false`.
     * @since 2.9.0
     */
  copy(): void;

  /**
   * Pastes the copied content.
   *
   * **Note**
   * - This method pastes the content copied by the {@link copy} method into the center of the user view on the whiteboard.
   * - This method takes effect only when you set {@link disableSerialization} as `false`.
   * - If you call this method multiple times, random offset may occur, which causes the pasted content not to center the user view.
   * @since 2.9.0
   */
  paste(): void;

  /**
   * Undoes an action.
   *
   * **Note**
   *
   * This method takes effect only when you set {@link disableSerialization} as `false`.
   * @returns The number of remaining undoable actions.
   */
  undo(): number;

  /**
   * Redoes an undone action.
   *
   * **Note**
   *
   * This method takes effect only when you set {@link disableSerialization} as `false`.
   *
   * @returns The number of remaining redoable actions.
   */
  redo(): number;

  /**
   * Clears the undo history, setting the number of undo steps `canUndoSteps` to 0 immediately.
   *
   * @since 2.16.48
   *
   * @param includeRedo Whether to clear the redo history as well:
   * - `true`: (default) Clear the redo history as well.
   * - `false`: Do not clear the redo history.
   */
  clearUndoHistory(includeRedo?: boolean): void;

  /**
   * Deletes the selected content.
   */
  delete(): void;

  /**
   * Locks selected images.
   *
   * @since v2.14.5
   *
   * This method can modify the locking state of selected images.
   * When an image is locked, users cannot move, zoom, or delete the image.
   *
   * @param locked Whether to lock selected images:
   * - true: Lock the images.
   * - false: Unlock the images.
   */
  lockImages(locked: boolean): void;

  /**
   * Moves the selected components to the top layer.
   *
   * @since v2.14.5
   */
  moveSelectedComponentsToTop(): void;

  /**
   * Moves the selected components to the bottom layer.
   *
   * @since v2.14.5
   */
  moveSelectedComponentsToBottom(): void;


  /**
   * Inserts text at a specified position.
   *
   * @param x The X coordinate of the midpoint of the left edge of the first character in the world coordinate system.
   * @param y The Y coordinate of the midpoint of the left edge of the first character in the world coordinate system.
   * @param textContent The initial text. If you do not pass in a value, the content is empty.
   *
   * @returns The identifier of the text in string format.
   */
  insertText(x: number, y: number, textContent?: string): Identifier;

  /**
   * Modifies the specified text.
   *
   * After calling {@link insertText}, you can call this method and pass in the `identifier` returned by the `insertText`
   * method to modify the content of the specified text.
   *
   * @param identifier The identifier of the text, which is the return value of `insertText`.
   * @param textContent The new text.
   */
  updateText(identifier: Identifier, textContent: string): void;

  /**
   * Modifies the font style of the currently selected text.
   *
   * After selecting some text, you can call this method to modify the font size, color, bold style, and italic style of the text.
   *
   * @param format The font style after modification. See {@link TextFormat}.
   */
  updateSelectedText(format: TextFormat): void;

  /**
   * Plays the next slide of the dynamic PPT file.
   *
   * When the current PPT slide finishes playing, the SDK switches to the next
   * scene to play the next PPT slide.
   */
  pptNextStep(): void;

  /**
   * Returns to the previous slide of the dynamic PPT file.
   *
   * When the current PPT slide is rolled back, the SDK switches back to the
   * previous scene to play the previous PPT slide.
   */
  pptPreviousStep(): void;

  /**
   * Disconnects from the live Interactive Whiteboard room.
   *
   * This method allows the user to leave the room and releases all resources
   * related to the room.
   * The user that has left the room must call {@link joinRoom} again to join the room.
   *
   * @returns
   * - The global state of the room, if the method call succeeds.
   * - An error message, if the method call fails.
   */
  disconnect(): Promise<void>;
}

/**
 * The connection state of the room.
 */
export declare enum RoomPhase {
    /**
     * The SDK is connecting to the room on the Interactive Whiteboard server.
     */
    Connecting = "connecting",
    /**
     * The SDK is connected to the room on the Interactive Whiteboard server.
     */
    Connected = "connected",
    /**
     * The SDK is reconnecting to the room on the Interactive Whiteboard server.
     */
    Reconnecting = "reconnecting",
    /**
     * The SDK is disconnecting from the room on the Interactive Whiteboard server.
     */
    Disconnecting = "disconnecting",
    /**
     * The SDK is disconnected from the room on the Interactive Whiteboard server.
     */
    Disconnected = "disconnected",
}

/**
 * The response of the SDK when a user without write permission attempts to write.
 */
export declare enum RoomErrorLevel {
    /**
     * The SDK reports an error.
     */
    ThrowError = "throwError",
    /**
     * The SDK interrupts the user's attempt and prints a warning in the browser console.
     */
    Warn = "warn",
    /**
     * The SDK interrupts the user's attempt but does not report an error or print a warning.
     */
    Ignore = "ignore",
}

/**
 * `RoomCallbacks` contains callbacks for live Interactive Whiteboard rooms.
 *  This type inherits {@link DisplayerCallbacks} and adds the following members:
 * 
 * - **onConnection**: *(duration: number)=>void*
 * 
 *    Occurs when the room is connected, reporting that the WebSocket connection is established and ready to start initialization.
 *    @param duration `duration` The time (ms) for establishing the connection to the room. 
 *
 * - **onPhaseChanged**: *(phase: RoomPhase)=>void*
 *
 *    Occurs when the room connection state changes.
 *    @param phase `phase` The current connection state of the room. See {@link RoomPhase}.
 * - **onRoomStateChanged**: *(modifyState: Partial<RoomState>)=>void*
 *
 *    Occurs when the room state changes.
 *
 *    This callback reports only the room state fields that have changed and returns `null` for the room state fields that have not changed.
 *    @param modifyState `modifyState` The room state that has changed. See {@link RoomState}.
 *
 * - **onDisconnectWithError**: *(error: Error)=>void*
 *
 *    Occurs when the SDK is disconnected from the server.
 *    @param error `error` The error message.
 * 
 * - **onObjectsLimit**: *(limit: number, soft: boolean)=>void*
 * 
 *    Occurs when the number of elements in the whiteboard exceeds the limit.
 *    @param limit `limit` The limit of the number of elements in the whiteboard.
 *    @param soft `soft` Whether it is a soft limit:
 *      - `true`: Soft limit. When the number of elements in the whiteboard exceeds the limit, the SDK will issue a warning, but the whiteboard elements can still be inserted.
 *      - `false`: Hard limit. When the number of elements in the whiteboard exceeds the limit, the SDK will issue a warning, the current element addition operation is invalid, the room state will be rolled back to before the operation, and the backend will kick the user who performs the operation out of the channel.
 *
 * - **onKickedWithReason**: *(reason: string)=>void*
 *
 *    Occurs when the local user is removed from the live Interactive Whiteboard room.
 *    @param reason `reason` The reason why the user is removed from the room.
 *
 *    | `reason`  | Description                         |
 *    | :--------------| :--------------------------- |
 *    | kickByAdmin    | The user is removed by the admin.                   |
 *    | roomDelete     | The room is deleted.             |
 *    | roomZombie     | The room is not active.                    |
 *    | roomBan        | The room is disabled.                   |
 *    | GatewayAdjust  | The gateway is adjusted.                     |
 *    | replaceByOther | The user is replaced by another user.|
 *    | crash          | The server crashes.                  |
 *
 * - **onCanUndoStepsUpdate**: *(canUndoSteps: number)=>void*
 *
 *    Occurs when the number of undoable actions changes.
 *
 *    The SDK triggers this callback every time the local user calls {@link undo}
 * and reports the number of remaining undoable actions.
 *
 *    @param canUndoSteps `canUndoSteps` The number of remaining undoable actions.
 * - **onCanRedoStepsUpdate**: *(canRedoSteps: number)=>void*
 *
 *    Occurs when the number of redoable actions changes.
 *
 *    The SDK triggers this callback every time the local user calls {@link redo}
 * and reports the number of remaining redoable actions.
 *
 *    @param canRedoSteps `canRedoSteps` The number of remaining redoable actions.
 * - **willInterceptKeyboardEvent**: *(event: KeyboardEvent)=>boolean*
 *
 *    Whether to intercept the keyboard event for which you have set a listener:
 *    - `true`: Intercept the keyboard event, which implies that the event does not trigger the callback.
 *    - `false`: Do not intercept the keyboard event.
 * - **onKeyDown**: *(event: KeyboardEvent)=>void*
 *
 *    Occurs when a key is pressed.
 * - **onKeyUp**: *(event: KeyboardEvent)=>void*
 *
 *    Occurs when a key is released.
 */
export declare type RoomCallbacks = DisplayerCallbacks & {
    
    onConnection: (duration: number)=>void;

    onPhaseChanged: (phase: RoomPhase)=>void;

    onRoomStateChanged: (modifyState: Partial<RoomState>)=>void;

    onDisconnectWithError: (error: Error)=>void;

    onObjectsLimit: (limit: number, soft: boolean)=>void;

    onKickedWithReason: (reason: string)=>void;

    onCanUndoStepsUpdate: (canUndoSteps: number)=>void;

    onCanRedoStepsUpdate: (canRedoSteps: number)=>void;

    willInterceptKeyboardEvent: (event: KeyboardEvent)=>boolean;

    onKeyDown: (event: KeyboardEvent)=>void;

    onKeyUp: (event: KeyboardEvent)=>void;
};

/**
 * Definition of a scene.
 */
export declare type SceneDefinition = {
    /**
     * The name of the scene.
     */
    name?: string;
    /**
     * The image or dynamic PPT slide to be displayed in the scene.
     *
     * A scene can display one image or dynamic PPT slide. You can set the width,
     * height, URL address, and preview of the image or dynamic PPT slide in
     * {@link PptDescription}.
     */
    ppt?: PptDescription;
};

/**
 * @ignore
 * The `Player` interface extends the `Displayer` interface and adds properties
 * for managing the playback of whiteboard content.
 */
export declare interface Player extends Displayer {
    /**
     * The unique identifier (UUID) of the room where the playback is recorded.
     */
    readonly roomUUID: string;

    /**
     * The unique identifier (UUID) of the current slice of the playback.
     */
    readonly slice: string;

    /**
     * Whether the playback can start immediately (it might need buffering).
     *
     * @since 2.9.16
     *
     * - `true`: The playback can start immediately.
     * - `false`: The playback cannot start immediately.
     */
    readonly isPlayable: boolean;

    /**
     * The playback phase. See {@link PlayerPhase}.
     */
    readonly phase: PlayerPhase;

    /**
     * The playback state. See {@link PlayerState}.
     */
    readonly state: PlayerState;

    /**
     * The playback position (ms). This property is `0` at the beginning of the playback.
     */
    readonly progressTime: number;

    /**
     * The total duration of the playback (ms).
     */
    readonly timeDuration: number;

    /**
     * The total frames of the playback.
     */
    readonly framesCount: number;

    /**
     * The Unix timestamp (ms) representing the starting UTC time of the playback.
     */
    readonly beginTimestamp: number;

    /**
     * The playback speed. The value must be greater than `0`.
     * When you set this property as `1`, the whiteboard content plays at the original speed.
     */
    playbackSpeed: number;

    /**
     * Starts the playback of the whiteboard content.
     *
     * When the playback pauses, you can call this method to resume the playback.
     */
    play(): void;

    /**
     * Pauses the playback of the whiteboard content.
     */
    pause(): void;

    /**
     * Stops the playback of the whiteboard content.
     *
     * A successful call of this method stops the playback of the whiteboard
     * content and releases all resources related to the `Player` object.
     * If you want to enable the playback again, re-initialize the `Player` object.
     */
    stop(): void;

    /**
     * Seeks to a specified playback position (ms).
     *
     * @since v2.15.0
     *
     * By default, the playback starts from the beginning of the file. You can
     * call this method to start the playback from your specified position.
     *
     * After a successful method call, the SDK returns `PlayerSeekingResult` to report the result of the seek operation.
     *
     * @param progressTime The playback position (ms).
     *
     * @returns The result of the seek operation. See {@link PlayerSeekingResult}.
     */
    seekToProgressTime(progressTime: number): Promise<PlayerSeekingResult>;


    /**
     * Sets the mode for watching the whiteboard playback.
     *
     * @param observerMode The mode for watching the whiteboard playback. See {@link ObserverMode}.
     */
    setObserverMode(observerMode: ObserverMode): void;
}

/**
 * @ignore
 * The phase of the whiteboard playback.
 */
export declare enum PlayerPhase {
    /**
     * The SDK is waiting for the first frame of the playback, which is the initial phase.
     */
    WaitingFirstFrame = "waitingFirstFrame",
    /**
     * The playback is in progress.
     */
    Playing = "playing",
    /**
     * The playback is paused.
     */
    Pause = "pause",
    /**
     * The playback has stopped.
     */
    Stopped = "stop",
    /**
     * The playback has finished.
     */
    Ended = "ended",
    /**
     * The playback is buffering.
     */
    Buffering = "buffering",
}

/**
 * @ignore
 * The state of the `Player` object. This type inherits {@link DisplayerState} and adds the following members:
 * - **observerMode**: *ObserverMode*
 *
 * The mode for watching the whiteboard playback. See {@link ObserverMode}.
 */
export declare type PlayerState = DisplayerState & {
    observerMode: ObserverMode;
};

/**
 * @ignore
 * `PlayerCallbacks` contains callbacks for whiteboard playback. This type
 * inherits {@link DisplayerCallbacks} and adds the following members:
 * - **onIsPlayableChanged**: *(isPlayable: boolean)=>void*
 *
 *    Occurs when the state of `isPlayable` changes.
 *    @param isPlayable `isPlayable` Whether the playback can start immediately:
 *
 *    - `true`: The playback can start immediately.
 *    - `false`: The playback cannot start immediately.
 *
 * - **onPhaseChanged**: *(phase: PlayerPhase)=>void*
 *
 *    Occurs when the playback phase changes.
 *    @param phase `phase` The playback phase.
 * - **onLoadFirstFrame**: *()=>void*
 *
 *    Occurs when the first frame is loaded.
 * - **onPlayerStateChanged**: *(modifyState: Partial<PlayerState>)=>void*
 *
 *    Occurs when the playback state changes.
 *    @param modifyState `modifyState` The playback state.
 * - **onStoppedWithError**: *(error: Error)=>void*
 *
 *    Occurs when an error causes the playback to stop.
 *    @param error `error` The error message.
 * - **onProgressTimeChanged**: *(progressTimestamp: number)=>void*
 *
 *    Occurs when the playback progress changes.
 *    @param progressTimestamp `progressTimestamp` The playback progress.
 */
export declare type PlayerCallbacks = DisplayerCallbacks & {

    onIsPlayableChanged: (isPlayable: boolean)=>void;

    onPhaseChanged: (phase: PlayerPhase)=>void;

    onLoadFirstFrame: ()=>void;

    onPlayerStateChanged: (modifyState: Partial<PlayerState>)=>void;

    onStoppedWithError: (error: Error)=>void;

    onProgressTimeChanged: (progressTimestamp: number)=>void;
};

/**
 * The view state of the local user, including the user information of the host (if any) in the room.
 */
export declare type BroadcastState = {
    /**
     * The view mode of the user.
     */
    mode: ViewMode;
    /**
     * The user ID of the host. This property is `undefined` if there is no host in the room.
     */
    broadcasterId?: number;
};

/**
 * @ignore
 * The mode for watching the whiteboard playback.
 */
export declare enum ObserverMode {
    /**
     * (Default) Follower mode.
     * In this mode, the user watches the playback from one of the following views:
     * - The view of the host, if there is a host in the live Interactive Whiteboard
     * room when the recording is made.
     * - The view of the first user who joins the room in interactive mode, as
     * long as there is no host in the live Interactive Whiteboard room when the
     * recording is made.
     * - The initial view of the whiteboard, as long as there is neither a host
     * nor users in interactive mode in the live Interactive Whiteboard room when
     * the recording is made.
     *
     * **Note**
     *
     * If the user in Follower mode adjusts their view through touch screen
     * gestures, the SDK automatically switches their mode to `freedom`.
     */
    Directory = "directory",
    /**
     * Freedom mode.
     *
     * In this mode, the user can freely adjust their view when watching the playback.
     */
    Freedom = "freedom",
}

/**
 * Information of the users in interactive mode in the live Interactive Whiteboard room.
 */
export declare type RoomMember = {
    /**
     * The member ID of the user.
     *
     * When a user joins the live Interactive Whiteboard room in interactive mode,
     * the SDK assigns a unique member ID for the user.
     */
    memberId: number;
    /**
     * The state of the whiteboard tool currently in use by the user. See {@link MemberState}.
     */
    memberState: MemberState;
    /**
     * The session ID.
     */
    session: string;
    /**
     * The customized user information, which is passed in when the user joins the room. See {@link UserPayload}.
     *
     * @since v2.15.0
     */
     payload: UserPayload;
};

/**
 * Customized user information.
 *
 * - **[key: string]**: *any*
 *
 *   The customized user information in key-value pairs. For example, `"avatar", "https://example.com/user.png"`.
 *
 * - **uid**: *string*
 *
 *   The unique identifier of a user in a string format. The maximum length is 1024 bytes.
 *
 *   Ensure that the `uid` of each user in the same room is unique.
 *
 *   @since v2.15.0
 */
 export declare type UserPayload = {
    [key: string]: any;
} & {
    uid: string;
};

/**
 * All states of a live Interactive Whiteboard room. This type inherits
 * {@link DisplayerState} and adds the following members:
 *
 * - **memberState**: *MemberState*
 *
 *   The state of the whiteboard tool currently in use. See {@link MemberState}.
 * - **broadcastState**: *Readonly<BroadcastState>*
 *
 *   The current state of the view.
 */
export declare type RoomState = DisplayerState & {

    memberState: MemberState;

    broadcastState: Readonly<BroadcastState>;
};

/**
 * The scene state.
 */
export declare type SceneState = {
    /**
     * The list of scenes under the current scene directory.
     */
    scenes: ReadonlyArray<WhiteScene>;
    /**
     * The path of the current scene.
     */
    scenePath: string;
    /**
     * The name of the current scene.
     *
     * @since 2.10.3
     */
    sceneName: string;
    /**
     * The path of the current scene directory.
     *
     * @since 2.10.3
     */
    contextPath: string;
    /**
     * The index of the current scene under its scene directory.
     */
    index: number;
};

/**
 * The Consumer for a `Displayer` object.
 */
export declare const DisplayerConsumer: Consumer<Displayer>;

/**
 * The Consumer for a `Room` object.
 */
export declare const RoomConsumer: Consumer<Room | undefined>;

/**
 * @ignore
 * The Consumer for a `Player` object.
 */
export declare const PlayerConsumer: Consumer<Player | undefined>;

/**
 * The state of the whiteboard tool in a live Interactive Whiteboard room.
 */
export declare type MemberState = {
    /**
     * The name of the whiteboard tool currently in use. See {@link ApplianceNames}.
     */
    currentApplianceName: ApplianceNames;
    /**
     * The stroke color in RGB format. For example, `[0, 0, 255]` represents blue.
     */
    strokeColor: Color;
    /**
     * The stroke color in RGB format. For example, `[0, 0, 255]` represents blue.
     */
    textColor?: Color;
    /**
     * The stroke width.
     */
    strokeWidth: number;
    /**
     * The font size of the text. The Chrome browser automatically adjusts fonts smaller than 12 to 12.
     */
    textSize: number;
    /**
     * Whether to bold the text:
     *
     * - `true`: Bold the text.
     * - `false`: (Default) Do not bold the text.
     */
    bold?: boolean;
    /**
     * Whether to italicize the text:
     *
     * - `true`: Italicize the text.
     * - `false`: (Default) Do not italicize the text.
     */
    italic?: boolean;
    /**
     * Whether to underline the text:
     *
     * - `true`: Underline the text.
     * - `false`: (Default) Do not underline the text.
     */
    underline?: boolean;
    /**
     * Whether to apply strikethrough formatting to the text:
     *
     * - `true`: Apply strikethrough formatting.
     * - `false`: (Default) Do not apply strikethrough formatting.
     */
    lineThrough?: boolean;
    /**
     * Whether to support drawing dotted lines:
     * 
     * - `true`: Support drawing dotted lines.
     * - `false`: (Default) Do not support drawing dotted lines.
     */
     dottedLine?: boolean;
    /**
     * The shape type.
     */
    shapeType?: ShapeType;
    /**
     * Whether to allow directly selecting and editing whiteboard text:
     * 
     * - `true`: Allow directly selecting and editing whiteboard text.
     * - `false`: (Default) Do not allow directly selecting and editing whiteboard text.
     */
     textCanSelectText?: boolean;
    /**
     * Sets the fill color of the graphic element. Only applicable to closed shapes such as circles and rectangles.
     */
    fillColor?: Color;
    /**
     * Sets the default font size for the text tool. If not set, the default is to use `textSize`, which is the last set text size.
     */
    textSizeOverride?: number;
    /**
     * Whether to automatically switch to the selection tool after typing with the text tool:
     *
     * - `true`: Automatically switch.
     * - `false`: (Default) Do not automatically switch.
     */
    textCompleteToSelector?: boolean;
    /**
     * Whether to automatically switch to the selection tool after drawing a rectangle:
     *
     * - `true`: Automatically switch.
     * - `false`: (Default) Do not automatically switch.
     */
    rectangleCompleteToSelector?: boolean;
    /**
     * Whether to automatically switch to the selection tool after drawing a circle:
     *
     * - `true`: Automatically switch.
     * - `false`: (Default) Do not automatically switch.
     */
    ellipseCompleteToSelector?: boolean;
    /**
     * Whether to automatically switch to the selection tool after drawing a straight line:
     *
     * - `true`: Automatically switch.
     * - `false`: (Default) Do not automatically switch.
     */
    straightCompleteToSelector?: boolean;
    /**
     * Whether to automatically switch to the selection tool after drawing an arrow:
     *
     * - `true`: Automatically switch.
     * - `false`: (Default) Do not automatically switch.
     */
    arrowCompleteToSelector?: boolean;
    /**
     * Whether to automatically switch to the selection tool after drawing a triangle, speech balloon, or other shapes:
     *
     * - `true`: Automatically switch.
     * - `false`: (Default) Do not automatically switch.
     */
    shapeCompleteToSelector?: boolean;
};

/**
 * Shape types.
 *
 * @since 2.12.0
 */
 export declare enum ShapeType {
    /**
     * Triangle.
     */
    Triangle = "triangle",
    /**
     * Rhombus.
     */
    Rhombus = "rhombus",
    /**
     * Pentagram.
     */
    Pentagram = "pentagram",
    /**
     * Speech ballon.
     */
    SpeechBalloon = "speechBalloon",
}
/**
 * The name of the whiteboard tool.
 */
export declare enum ApplianceNames {
    /**
     * Selector.
     */
    selector = "selector",
    /**
     * Clicker, which can be used for clicking and selecting content on an HTML5 file.
     */
    clicker = "clicker",
    /**
     * Laser pointer.
     */
    laserPointer = "laserPointer",
    /**
     * Pencil.
     */
    pencil = "pencil",
    /**
     * Rectangle.
     */
    rectangle = "rectangle",
    /**
     * Ellipse.
     */
    ellipse = "ellipse",
    /**
     * Shape.
     */
    shape = "shape",
    /**
     * A pencil eraser used to erase any part of the pencil strokes.
     * This tool only applies to `NewPencil`. You need to set `disableNewPencil` to `false` before using the pencil eraser.
     */
     pencilEraser = "pencilEraser",
     /**    
     * Eraser.
     */
    eraser = "eraser",
    /**
     * Text.
     */
    text = "text",
    /**
     * Straight line.
     */
    straight = "straight",
    /**
     * Arrow.
     */
    arrow = "arrow",
    /**
     * Hand.
     */
    hand = "hand",
}

/**
 * Style configuration of the component plugin.
 */
export declare type PluginProps<C, T> = {
    /**
     * The component plugin object.
     */
    plugin: PluginInstance<C, T>;
    /**
     * The space around the component plugin icon.
     */
    margin: Margin;
    /**
     * The coordinates of the center of the component plugin icon in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    origin: Point;
    /**
     * The size of the component plugin icon.
     */
    size: Size;
    /**
     * The scale factor of the component plugin icon.
     */
    scale: number;
    /**
     * @ignore
     */
    cnode?: any;
};

/**
 * The interface for component plugin objects.
 */
export declare interface PluginInstance<C, A> {
    /**
     * The type of the component plugin, which is the unique identifier of the component plugin.
     */
    readonly kind: string;

    /**
     * The unique identifier of the component plugin object in the room.
     */
    readonly identifier: Identifier;

    /**
     * The customized context of the component plugin.
     */
    readonly context: C;

    /**
     * The X coordinate of the upper left corner of the component plugin object in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    readonly originX: number;

    /**
     * The Y coordinate of the upper left corner of the component plugin object in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    readonly originY: number;

    /**
     * The width of the component plugin object.
     */
    readonly width: number;

    /**
     * The height of the component plugin object.
     */
    readonly height: number;

    /**
     * Whether the component plugin object can be selected:
     * - `true`: The component plugin object can be selected.
     * - `false`: The component plugin object cannot be selected.
     */
    readonly selectable: boolean;

    /**
     * Whether the component plugin object is being dragged:
     * - `true`: The component plugin object is being dragged.
     * - `false`: The component plugin object is not being dragged.
     */
    readonly isDraging: boolean;

    /**
     * Whether the component plugin object is being resized:
     * - `true`: The component plugin object is being resized.
     * - `false`: The component plugin object is not being resized.
     */
    readonly isResizing: boolean;

    /**
     * Whether the component plugin object is being played:
     * - `true`: The component plugin object is being played. In a live
     * Interactive Whiteboard room, this property is always `true`.
     * - `false`: The component plugin object is not being played.
     */
    readonly isPlaying: boolean;

    /**
     * @ignore
     * The Unix timestamp of the current playback position of the component
     * plugin object. This property is always `0` in a live Interactive Whiteboard room.
     */
    readonly playerTimestamp: number;

    /**
     * @ignore
     * The current playback speed of the component plugin object. This property
     * is always `1.0` in a live Interactive Whiteboard room.
     */
    readonly playbackSpeed: number;

    /**
     * The attributes of the component plugin object.
     */
    attributes: A;

    /**
     * Modifies certain attributes of the component plugin object.
     * @param attributes The attributes to be modified.
     */
    putAttributes(attributes: Partial<A>): void;

    /**
     * Deletes certain attributes of the component plugin object.
     * @param keys The attributes to be deleted.
     */
    removeAttributeKeys<K extends string>(...keys: K[]): void;

    /**
     * Modifies the description of the component plugin object.
     * @param keys The description to be modified.
     */
    update(description: PluginDescription<A>): void;

    /**
     * Deletes a component plugin object.
     */
    remove(): void;

}
/**
 * Description of component plugin objects.
 */
export declare type PluginDescription<A = any> = {
    /**
     * The X coordinate of the upper left corner of the component plugin object in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    originX?: number;
    /**
     * The Y coordinate of the upper left corner of the component plugin object in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    originY?: number;
    /**
     * The width of the component plugin object.
     */
    width?: number;
    /**
     * The height of the component plugin object.
     */
    height?: number;
    /**
     * Whether the component plugin object can be selected:
     * - `true`: The component plugin object can be selected.
     * - `false`: The component plugin object cannot be selected.
     */
    selectable?: boolean;
    /**
     * The attributes of the component plugin object.
     */
    attributes?: A;
};

/**
 * Color in RGB format. For example, `[0, 0, 255]` represents blue.
 */
export declare type Color = number[];


/**
 * The `globalState` object is a public global variable.
 *
 * All users in the room can read the `globalState` object, while users in
 * interactive mode can modify the `globalState` object.
 * The modified `globalState` object will be updated to all users in the room immediately.
 */
export declare type GlobalState = {
};

/**
 * Description of the image or dynamic PPT slide.
 *
 * To present the image or dynamic PPT slide on the whiteboard scene, you can
 * configure `PptDescription` when initializing a `WhiteScene` object .
 *
 * The following formats are supported:
 * - Static images in PNG, JPG/JPEG, and WEBP formats, or PNG, JPG/JPEG, and
 * WEBP images which are converted from PPT, PPTX, DOC, DOCX, and PDF files.
 * - Dynamic PPT slides which are converted from PPTX files using the [Agora file conversion service](https://docs.agora.io/en/whiteboard/file_conversion_overview?platform=RESTful).
 *
 * **Note**
 * - You can insert only one image or dynamic PPT slide on a whiteboard scene.
 * - The image or dynamic PPT slide displayed on the whiteboard scene takes the
 * origin of the world coordinate system as the center and cannot be changed,
 * which means you cannot change the position of the image or dynamic PPT slide
 * inside the whiteboard.
 *
 */
export declare type PptDescription = {
    /**
     * The address of the image or dynamic PPT slide. The supported formats are as follows:
     * - For image: The URL address, which can be generated by yourself
     * or by using the Agora file conversion service. For example, `"https://docs-test-xxx.oss-cn-hangzhou.aliyuncs.com/staticConvert/2fdxxxxx67e/1.jpeg"`.
     * - For dynamic PPT slide: The URI address, which is generated by
     * using the Agora file conversion service. For example, `"pptx://cover.herewhite.com/dynamicConvert/6a212c90fa5311ea8b9c074232aaccd4/1.slide"`.
     */
    src: string;
    /**
     * The width (px) of the image or dynamic PPT slide.
     */
    width: number;
    /**
     * The height (px) of the image or dynamic PPT slide.
     */
    height: number;
    /**
     * The URL address of the preview image for the image or dynamic PPT slide.
     * You can get the URL address of the dynamic PPT preview in the `preview` field
     * in [the query result of the file conversion task](https://docs.agora.io/en/whiteboard/whiteboard_file_conversion?platform=RESTful#query-file-conversion-progress-get).
     * For example, "https://docs-test-xxx.oss-cn-hangzhou.aliyuncs.com/dynamicConvert/2fdxxxxx67e/preview/1.png".
     */
    previewURL?: string;
};

/**
 * Image description.
 */
export declare type ImageInformation = {
    /**
     * The unique identifier (UUID) of the image.
     */
    uuid: string;
    /**
     * The X coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    centerX: number;
    /**
     * The Y coordinate of the center of the image in the world coordinate system (taking the center of the initial whiteboard as the origin).
     */
    centerY: number;
    /**
     * The width (px) of the image.
     * If the width of the image is greater than the boundary of the view, then users cannot see the excess part.
     */
    width: number;
    /**
     * The height (px) of the image.
     * If the height of the image is greater than the boundary of the view, then users cannot see the excess part.
     */
    height: number;
    /**
     * Whether the image is locked:
     * - `true`: Locked. When an image is locked, users cannot move or zoom the image.
     * - `false`: Unlocked.
     */
    locked: boolean;
    /**
     * Whether the image can only be resized proportionately.
     *
     * @since  2.12.0
     *
     * - `true`: The image can only be resized proportionately.
     * - `false`: The image can be resized disproportionately.
     */
    uniformScale?: boolean;
    /**
     * Whether to load images in cross-origin mode.
     *
     * @since  2.16.48
     *
     * - `true`: (default) Load images in cross-origin mode.
     * - `false`: Do not load images in cross-origin mode.
     */
    crossOrigin?: boolean | string;
};

/**
 * Configurations for the view rectangle.
 *
 * The view rectangle defines a rectangle area which the view must cover.
 * After you set a view rectangle, the SDK automatically adjusts the view to
 * fully contain the rectangle area, so as to ensure contents within the
 * rectangle area are completely displayed.
 *
 * You can set a rectangle according to the size of the PPT slide or image to
 * be displayed, to ensure the same content is displayed completely on screens
 * of different sizes.
 */
export declare type WorldViewRectangle = {
    /**
     * The X coordinate of the top left corner of the view rectangle in the world
     * coordinate system (taking the center of the initial whiteboard as the origin).
     */
    originX: number;
    /**
     * The Y coordinate of the top left corner of the view rectangle in the world
     * coordinate system (taking the center of the initial whiteboard as the origin).
     */
    originY: number;
    /**
     * The width of the view rectangle.
     *
     * Do not set this property to a value smaller than the width of the area
     * you want to display; otherwise, the user may not see the area completely.
     */
    width: number;
    /**
     * The height of the view rectangle.
     *
     * Do not set this property to a value smaller than the height of the area
     * you want to display; otherwise, the user may not see the area completely.
     */
    height: number;
};

/**
 * Adds a custom icon.
 *
 * @param icons The custom icon.
 */
export declare function injectCustomStyle(icons: UserCursorIcons): void;

/**
 * The cursor name.
 */
export declare enum CursorNames {
    /**
     * Hand.
     */
    Hand = "cursor-hand",
    /**
     * Grasp.
     */
    HandGrasp = "cursor-hand-grasp",
    /**
     * Laser pointer.
     */
    LaserPointer = "cursor-laserPointer",
    /**
     * Selector.
     */
    Selector = "cursor-selector",
    /**
     * Pencil.
     */
    Pencil = "cursor-pencil",
    /**
     * Eraser.
     */
    Eraser = "cursor-eraser",
    /**
     * Rectangle.
     */
    Rectangle = "cursor-rectangle",
    /**
     * Ellipse.
     */
    Ellipse = "cursor-ellipse",
    /**
     * Shape.
     */
    Shape = "cursor-shape",
    /**
     * Straight line.
     */
    Straight = "cursor-straight",
    /**
     * Arrow.
     */
    Arrow = "cursor-arrow",
    /**
     * Text.
     */
    Text = "cursor-text",
    /**
     * A double-headed arrow pointing northwest and southeast.
     */
    Nwse = "cursor-nwse",
    /**
     * A double-headed arrow pointing northeast and southwest.
     */
    Nesw = "cursor-nesw",
    /**
     * A double-headed arrow pointing north and south.
     */
    Ns = "cursor-ns",
    /**
     * A double-headed arrow pointing east and west.
     */
    Ew = "cursor-ew",
}

/**
 * The screen type.
 */
export declare enum ScreenType {
    /**
     * The screen of a desktop device.
     */
    Desktop = "desktop",
    /**
     * The screen of a smartphone.
     */
    Phone = "phone",
    /**
     * The screen of a tablet.
     */
    Pad = "pad",
    /**
     * The screen of a television.
     */
    TV = "tv",
}

/**
 * Configuration for the `WhiteWebSdk` object.
 *
 * **Note**
 *
 * After the `WhiteWebSdk` object is initialized, you cannot call any method in
 * `WhiteWebSdkConfiguration` to modify the configuration of the `WhiteWebSdk` object.
 */
export declare type WhiteWebSdkConfiguration = {
    /**
     * The unique app identifier issued to your Interactive Whiteboard project by Agora.
     * See [Get security credentials for your whiteboard project](https://docs.agora.io/en/whiteboard/enable_whiteboard?platform=Android#get_security_credentials_for_your_whiteboard_project).
     */
    appIdentifier: string;
    /**
     * The data center, which supports the following values:
     *
     * | `region` | Data center                   | Service area                             |
     * | -------- | ----------------------------- | ---------------------------------------- |
     * | `us-sv`  | Silicon Valley, United States | North America and South America          |
     * | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
     * | `in-mum` | Mumbai, India                 | India                                    |
     * | `eu` | Frankfurt, Europe        | Europe                                   |
     * | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
     *
     * **Note**
     *
     * This property must has the same value as the data center you set
     * when [creating the room](https://docs.agora.io/en/whiteboard/whiteboard_room_management?platform=RESTful);
     * otherwise, the SDK fails to connect to the room.
     */
    region?: string;
    /**
     * Whether to use MobX to listen for `displayer.state`:
     * - `true`: Use MobX to listen for `displayer.state`, which turns
     * `displayer.state` into a MobX observable object. See [Creating observable state](https://mobx.js.org/observable-state.html#observable).
     * - `false`: Do not use MobX to listen for `displayer.state`.
     */
    useMobXState?: boolean;
    /**
     * The device type, which determines how the SDK handles mouse and touch events.
     *
     * If you pass in an incorrect value, the SDK may not respond to the device
     * inputs as expected.
     * If you do not pass in a value, the SDK determines the device type using
     * its internal logic.
     */
    deviceType?: DeviceType;
    /**
     * The user's screen type, which is used to adjust parameters for gesture
     * recognition. The default is `Desktop`.
     */
    screenType?: ScreenType;
    /**
     * Rendering modes for drawings on the whiteboard. The default is `Canvas`.
     */
    renderEngine?: RenderEngine;
    /**
     * Custom fonts.
     *
     * To display unconventional fonts in dynamic PPT slides, you
     * need to upload the font file to your app server or a third-party cloud
     * storage and generate a URL address, then pass the URL address to this property
     * when initializing the `WhiteWebSdk` object.
     */
    fonts?: UserFonts;
    /**
     * The hotkey for the hand tool.
     *
     * When you press the hotkey, the whiteboard tool automatically switches to
     * the hand tool (`currentApplianceName="hand"`).
     * Once you release the key, the whiteboard tool switches back to your
     * original tool in use.
     * If you do not set this property, the hotkey switch function is disabled.
     */
    handToolKey?: string;
    /**
     * The font of the characters entered by the text tool (`currentApplianceName="text"`).
     * If you do not set this property, the SDK uses the default font of the browser.
     */
    fontFamily?: string;
    /**
     * Whether to preload all image resources in dynamic PPT slides when loading
     * the homepage of the slides.
     * - `true`: Preload all image resources in dynamic PPT slides when loading
     * the homepage of the slides.
     * - `false`: (Default) Do not preload all image resources in dynamic PPT
     * slides when loading the homepage of the slides.
     *
     * **Note**
     *
     * Agora does not recommend setting `preloadDynamicPPT(true)`, because the
     * setting slows down the PPT display.
     */
    preloadDynamicPPT?: boolean;
    /**
     * SDK log configuration. See {@link LoggerOptions}.
     */
    loggerOptions?: LoggerOptions;
    /**
     * Sets whether to disable tween animation for the new pencil:
     *
     * - `true`: Disable tween animation. This can decrease latency, but cause freezes in the writing or drawing process seen by remote users.
     * - `false`: (Default) Enable tween animation. This allows the SDK to automatically insert frames between keyframes when a user draws or writes with the pencil, so that remote users see a smoother drawing process, but this increases latency.
     *
     * @note This property takes effect only when `disableNewPencil` is set as `false`.
     */
     disableCurveAnimes?: boolean;
     /**
      * Sets whether to disable the stroke effect of the new pencil:
      *
      * - `true`: Disable the stroke effect.
      * - `false`: (Default) Enable the stroke effect.
      *
      * @note This property takes effect only when `disableNewPencil` is set as `false`.
      */
     disableNewPencilStroke?: boolean;
     /**
      * Sets whether to disable image rotation:
      *
      * - `true`: Enable image rotation.This allows users to rotate a selected image by any angle.
      * - `false`: (Default) Disable image rotation.
      */
     disableRotation?: boolean;
    /**
     * Reconnection configuration. The reconnection mechanism is enabled by default.
     *
     * To disable the reconnection mechanism, set `reconnectionOptions` as `false`
     * or `disableReconnect` as `true`.
     */
    reconnectionOptions?: Partial<ReconnectionOptions> | false;
    /**
     * Whether to receive only callbacks of remote user state changes.
     * - `true`: (Default) The local user receives only callbacks of remote user
     * state changes and does not receive callbacks of their own state changes.
     * - `false`: The local user receives callbacks of remote user state changes
     * as well as callbacks of their own state changes.
     *
     */
    onlyCallbackRemoteStateModify?: boolean;
    /**
     * Component plugins.
     */
    plugins?: Plugins;
    /**
     * Invisible plugins.
     */
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    /**
     * An array of `React.ComponentType` objects, which is used to package the
     * whiteboard view. The default value is [].
     *
     * Refer to the following code to package the whiteboard view:
     *
     * @example
     * ```typescript
     * import React from "react";
     *
     * class WrappedComponent extends React.Component {
     *
     *     render() {
     *         return (
     *             <div>
     *                 <span>hello world</span>
     *                 {this.props.children}
     *             </div>
     *         );
     *     }
     * }
     *
     * const whiteWebSdk = new WhiteWebSdk({
     *     appIdentifier: "$APP_IDENTIFIER",
     *     wrappedComponents: [WrappedComponent],
     * });
     * ```
     */
    wrappedComponents?: WrappedComponents;
    /**
     * Configuration for dynamic PPT files. See {@link PptParams}.
     */
    pptParams?: PptParams;
    urlInterrupter?:
    /**
     * Intercepts the URL address of a resource on the whiteboard (for example,
     * an image) and replaces it.
     *
     * For example, you can use the following code to add a suffix for the URL
     * addresses of all images in the return value:
     *
     * @example
     * ```typescript
     * const whiteWebSdk = new WhiteWebSdk({
     *     appIdentifier: "$APP_IDENTIFIER",
     *     urlInterrupter: function(url) {
     *         return url + "?token=bm1n4pisugWrWK";
     *     },
     * });
     * ```
     *
     * @param url The original URL address of the resource.
     * @returns The new URL address.
     */
    (url: string)=>string;
    onWhiteSetupFailed?:
    /**
     * Occurs when the `WhiteWebSdk` object fails to initialize.
     *
     * @example
     * ```typescript
     * const whiteWebSdk = new WhiteWebSdk({
     *     appIdentifier: "$APP_IDENTIFIER",
     *     onWhiteSetupFailed: function(error) {
     *         console.error(error);
     *     },
     * });
     * ```
     * This callback only reports network and authentication errors.
     * If you pass in incorrect parameters, an error message occurs when
     * calling `new WhiteWebSdk({...})`.
     *
     * @param error An error message.
     */
    (error: Error)=>void;
};

/**
 * Basic configuration for {@link Room} objects.
 */
export declare type ConstructRoomParams = {
    /**
     * Sets the cursor adapter.
     * Set to `false` to no longer display internal preset cursors (laser pen, eraser, etc.).
     */
    cursorAdapter?: CursorAdapter | false;
    /**
     * Whether to disable the auto-resize function:
     * - `true`: Disable the auto-resize function. In this case, you need to call
     * `refreshViewSize` every time the size of the view changes.
     * - `false`: (Default) Enable the auto-resize function.
     */
    disableAutoResize?: boolean;
    /**
     * Whether to disable the user from adjusting (moving or zooming) the view
     * through touch screen gestures or mouses:
     * - `true`: Disable the user from adjusting the view.
     * - `false`: (Default) Enable the user to adjust the view.
     *
     * This property does not affect the use of the `setCameraBound`, `moveCamera`,
     * and`moveCameraToContain` methods.
     */
    disableCameraTransform?: boolean;
    /**
     * Invisible plugins.
     */
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    /**
     * An array of `React.ComponentType` objects, which is used to package the
     * whiteboard view. The default value is [].
     */
    wrappedComponents?: WrappedComponents;
    /**
     * Sets the viewable area, within which the user can flexibly move or zoom the view.
     *
     * The default value is `undefined`, implying that the viewable area has no boundaries.
     */
    cameraBound?: CameraBound;
    /**
     * Whether to disable the highlighted box when another user puts their cursor
     * on an object on the whiteboard:
     *
     * @since 2.12.0
     *
     * - `true`: Disable the highlighted box.
     * - `false`: Enable the highlighted box.
     *
     * This property does not affect the highlighted box of the local user.
     */
    disableOthersSelectingBox?: boolean;
    /**
     * Whether to allow zooming the whiteboard by holding down the `command` key and scrolling the mouse wheel.
     *
     * @since 2.16.51
     *
     * - `true`: Allows zooming the whiteboard by holding down the `command` key and scrolling.
     * - `false` (default): Disallows zooming the whiteboard by holding down the `command` key and scrolling.
     *
     * @note
     * - This property is only available on macOS systems.
     * - This property does not affect the zoom behavior of the `control` wheel.
     *
     */
    commandWheelToZoom?: boolean;};

/**
 * Configurations for a {@link Room} object, which are used to join a live
 * Interactive Whiteboard room. This type inherits {@link ConstructRoomParams}
 * and adds the following properties:
 *
 * - **uuid**: *string*
 *
 *   Room UUID, the unique identifier of a room. This property is returned
 * after a room is created successfully.
 * - **uid**: *string*
 *
 *   **Since v2.15.0**
 *   The unique identifier (UID) of a user in a string format. The maximum length is 1024 bytes.
 *   Ensure that the `uid` of each user in the same room is unique.
 *
 * - **region?**: *string*
 *
 *   The data center, which supports the following values:
 *
 *   | `region` | Data center                   | Service area                             |
 *   | -------- | ----------------------------- | ---------------------------------------- |
 *   | `us-sv`  | Silicon Valley, United States | North America and South America          |
 *   | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
 *   | `in-mum` | Mumbai, India                 | India                                    |
 *   | `eu` | Frankfurt, Europe        | Europe                                   |
 *   | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
 *
 *   **Note**
 *   - This property must has the same value as the data center of the live
 * Interactive Whiteboard room to be joined; otherwise, the SDK fails to connect to the room.
 *   - You can set either this property or the `region` property in
 * {@link WhiteWebSdkConfiguration} to set the data center. If you set both,
 * this property overrides the `region` in `WhiteWebSdkConfiguration`.
 * - **roomToken**: *string*
 *
 *   The Room Token for user authentication. See [Token overview](https://docs.agora.io/en/whiteboard/whiteboard_token_overview?platform=Android).
 * - **userPayload?**: *{[key: string]: any;}*
 *
 *   Customized user information. This property can use any data type.
 *
 *   Refer to the following code to enable other users to read the `userPayload`
 * of a specific user, which is set when the user joins the room:
 *
 *   @example
 *   ```javascript
 *   for (var member of room.state.roomMembers) {
 *       console.log(member.userPayload);
 *   }
 *   ```
 * - **isWritable?**: *boolean*
 *
 *    Sets whether the user is in interactive mode in the room.
 *    - `true`： (Default) The user is in interactive mode (has read and write permissions on the whiteboard).
 *    - `false`：The user is in subscription mode (has read-only access to the whiteboard).
 *
 *    This method is different from `disableDeviceInputs`. See [Prohibited operation](https://developer.netless.link/javascript-en/home/disable#Read-only-mode).
 * - **disableDeviceInputs?**: *boolean*
 *
 *    Whether to disable the user from operating the whiteboard tools through the mouse, keyboard, or touchscreen:
 *    - `true`： Disable the user from operating the whiteboard tools.
 *    - `false`：(Default) Enable the user to operate the whiteboard tools.
 *
 *    This method is different from `isWritable`. See [Prohibited operation](https://developer.netless.link/javascript-en/home/disable#Prohibit-device-operation).
 * - **enableDrawPoint?**: *boolean*
 *
 *   Whether to enable the pen tool (`pencil`) to draw a point:
 *   - `true`： Enable the pen tool to draw a point.
 *   - `false`：(Default) Disable the pen tool from drawing a point. In this case,
 * clicking on the whiteboard with the pen tool does not draw a point on the screen.
 *
 *   **Note**
 *
 *   This property takes effect only when `disableNewPencil` is set to `false`.
 *
 * - **disableNewPencil?**: *boolean*
 *
 *   **Since 2.12.5**
 *
 *   Disables/Enables the new pencil:
 *   - `true`: (Default) Disable the new pencil. The SDK applies the old stroke smoothing algorithm to pencil.
 *   - `false`: Enable the new pencil. This allows the SDK to apply the new stroke smoothing algorithm to pencil, which results in smoother, more natural handwriting with a stroke effect.
 *
 *  **Note**
 *
 *   To enable the stroke effect, ensure that every user in the room uses one of the following SDKs:
 *      - Android SDK 2.12.3 or later
 *      - iOS SDK 2.12.3 or later
 *      - Web SDK 2.12.5 or later
 *
 * - **disableMagixEventDispatchLimit?**: *boolean*
 *
 *   **Since v2.15.0**
 *
 *   Whether to disable the frequency limit for sending custom events:
 *   - `true`: Disable the frequency limit. When the frequency limit is disabled, freezes may occur.
 *   - `false`: (Default) Enable the frequency limit. When the frequency limit is enabled, the SDK sends an event every 75 ms.
 *
 * - **disableEraseImage?**: *boolean*
 *
 *    Whether to disable the eraser from erasing images on the whiteboard:
 *    - `true`：Disable the eraser from erasing images.
 *    - `false`：(Default) Enable the eraser to erase images.
 *
 * - **disablePencilWrittingLimitFrequency**?: *boolean*
 *
 *   **Since v2.15.2**
 *
 *   Whether to disable the frequency limit for synchronizing the writing input while using the `pencil` tool:
 *   - `true`: Disable the frequency limit. When the frequency limit is disabled, the writing is synchronized immediately, but CPU consumption can increase.
 *   - `false`: (Default) Enable the frequency limit. When the frequency limit is enabled, the writing synchronization can
 *   be slightly delayed, but CPU consumption is lessened.
 *
 * - **floatBar?**: *boolean | Partial<FloatBarOptions>*
 *
 *    Whether to enable the floating bar when `currentApplianceName` is set to `selector`
 * or `text`:
 *     - `true`： Enable the floating bar.
 *     - `false`：(Default) Disable the floating bar.
 *
 * - **hotKeys?**: *Partial<HotKeys>*
 *
 *   Add custom hotkeys. If you do not set this property, the SDK uses the
 * following default hotkeys:
 *
 *   | Keys              | Action                     |
 *   | :--------------------- | :---------------------- |
 *   | Backspace or Delete     | Delete the selected object            |
 *   | Shift                  | Resize proportionately |
 *   | Ctrl + Z or Command + Z | Undo                   |
 *   | Ctrl + Y or Command + Y | Redo                   |
 *   | Ctrl + C or Command + C | Copy                     |
 *   | Ctrl + V or Command + V | Paste                    |
 *
 *   To disable the default hotkeys, set this property as `{}`.
 * 
 * - **rejectWhenReadonlyErrorLevel?**: *RoomErrorLevel*
 *
 *   The response of the SDK when a user without write permission attempts to write.
 * 
 * - **optimizeOptions?**: **OptimizeOptions**
 * 
 *      @since 2.16.48
 * 
 *      Whiteboard drawing performance optimization options. See {@link OptimizeOptions OptimizeOptions}。
 *
 */
export declare type JoinRoomParams = ConstructRoomParams & {

    uuid: string;

    uid: string;

    region?: string;

    roomToken: string;

    userPayload?: {
        [key: string]: any;
    };

    isWritable?: boolean;

    disableDeviceInputs?: boolean;

    enableDrawPoint?: boolean;

    disableNewPencil?: boolean;

    disableMagixEventDispatchLimit?: boolean;

    disableEraseImage?: boolean;

    disablePencilWrittingLimitFrequency?: boolean;

    newPencilWritingQuality?: NewPencilWritingQuality;

    floatBar?: boolean | Partial<FloatBarOptions>;

    hotKeys?: Partial<HotKeys>;

    rejectWhenReadonlyErrorLevel?: RoomErrorLevel;

    optimizeOptions?: OptimizeOptions;
};

/**
 * @ignore
 * Configurations of the `Player` object, which are used for whiteboard playback.
 * This type inherits {@link ConstructRoomParams} and adds the following properties:
 *
 * - **region?**: *string*
 *
 *   The data center of the `Player` object. This property supports the following values:
 *
 *   | `region` | Data center                   | Service area                             |
 *   | -------- | ----------------------------- | ---------------------------------------- |
 *   | `us-sv`  | Silicon Valley, United States | North America and South America          |
 *   | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
 *   | `in-mum` | Mumbai, India                 | India                                    |
 *   | `eu` | Frankfurt, Europe        | Europe                                   |
 *   | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
 *
 *      **Note**
 *      - If you do not set this property, the SDK uses the `region` set in {@link WhiteWebSdkConfiguration}.
 *      - If you neither set the data center when initialing the `WhiteWebSdk` object nor when creating the `Player` object, the SDK reports an error message.
 * 
 * - **slice?**: *string*
 *
 *   The unique identifier (UUID) of the slice in the playback, which you can
 * get from `room.slice` during the recording.
 *
 *      **Note**
 *      - This property must be passed in together with `room`.
 *      - Passing in this property indicates that only a specific segment is played, so passing in `beginTimestamp` and `duration` is forbidden.
 * 
 * - **room**: *string*
 *
 *    Room UUID, the unique identifier of a room. This property is returned
 * after the room is created successfully.
 *    - If you pass in only this property (without `beginTimestamp` and `duration`), the SDK replays all the recordings of the room.
 *    - If you pass in this property together with `beginTimestamp` and `duration`, the SDK replays the recordings within the specified time range.
 * 
 * - **roomToken**: *string*
 *
 *   The Room Token for user authentication. See [Token overview](https://docs.agora.io/en/whiteboard/whiteboard_token_overview?platform=Android).
 * 
 * - **beginTimestamp?**: *number*
 *
 *   The Unix timestamp (ms) representing the starting UTC time of the playback.
 *
 *   This property must be passed in together with `room` and `duration` and not together with `slice`.
 * 
 * - **duration?**: *number*
 *
 *   The playback duration (ms).
 *
 *   This property must be passed in together with `room` and `beginTimestamp` and not together with `slice`.
 * 
 * - **crops?**: *Array*
 *   
 *   @since  2.16.48
 *
 *   The cropping intervals for playback recording, including the following properties:
 *      - `from`: number. The starting timestamp of the cropping interval.
 *      - `to`: number. The ending timestamp of the cropping interval.
 * 
 * - **alignmentThreshold?**: *number*
 * 
 *   @since  2.16.48
 *
 *   The alignment threshold of the playback timeline. If the difference between the playback time and the external timestamp exceeds this threshold, the playback time will be aligned, in milliseconds. The default value is 600 ms.
 * 
 * - **alignmentInterval?**: *number*
 * 
 *   @since  2.16.48
 *
 *   The alignment duration of the playback timeline. Within this duration, the playback time will be aligned to the external timestamp by playing at a faster speed, in milliseconds. The default value is 3000 ms.
 */ 
export declare type ReplayRoomParams = ConstructRoomParams & {

    region?: string;

    slice?: string;

    room: string;

    roomToken: string;

    beginTimestamp?: number;

    duration?: number;

    crops?: Array<{
        from: number;
        to: number;
    }>;

    alignmentThreshold?: number;

    alignmentInterval?: number;
};

/**
 * @ignore
 * Configurations for checking whether the whiteboard content of a live room can be replayed.
 */
export declare type PlayableCheckingParams = {
    /**
     * The data center of the room to be checked. This property supports the following values:
 *
 *   | `region` | Data center                   | Service area                             |
 *   | -------- | ----------------------------- | ---------------------------------------- |
 *   | `us-sv`  | Silicon Valley, United States | North America and South America          |
 *   | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
 *   | `in-mum` | Mumbai, India                 | India                                    |
 *   | `eu` | Frankfurt, Europe        | Europe                                   |
 *   | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
     */
    region?: string;
    /**
     * Room UUID, the unique identifier of a room. This property is returned after the room is created successfully.
     *
     * - If you pass in only this property (without `beginTimestamp` and `duration`),
     * the SDK replays all the recordings of the room.
     * - If you pass in this property together with `beginTimestamp` and `duration`,
     * the SDK replays the recordings within the specified time range.
     */
    room: string;
    /**
     * The Room Token for user authentication. See [Token overview](https://docs.agora.io/en/whiteboard/whiteboard_token_overview?platform=Android).
     */
    roomToken: string;
    /**
     * The unique identifier (UUID) of the slice in the playback, which you can get from `room.slice` during the recording.
     *
     * **Note**
     * - This property must be passed in together with `room`.
     * - Passing in this property indicates that only a specific segment is played back, so passing in `beginTimestamp` and `duration` is forbidden.
     */
    slice?: string;
    /**
     * The Unix timestamp (ms) representing the starting UTC time of the playback.
     *
     * This property must be passed in together with `room` and `duration` and not together with `slice`.
     */
    beginTimestamp?: number;
    /**
     * The playback duration (ms).
     *
     * This property must be passed in together with `room` and `beginTimestamp` and not together with `slice`.
     */
    duration?: number;
};

/**
 * The `WhiteWebSdk` class initializes a `WhiteWebSdk` object.
 */
export declare class WhiteWebSdk {
    /**
     * The data center, which supports the following values:
     *
     *  | `region` | Data center                   | Service area                             |
     *  | -------- | ----------------------------- | ---------------------------------------- |
     *  | `us-sv`  | Silicon Valley, United States | North America and South America          |
     *  | `sg`     | Singapore                     | Singapore, East Asia, and Southeast Asia |
     *  | `in-mum` | Mumbai, India                 | India                                    |
     *  | `eu` | Frankfurt, Europe        | Europe                                   |
     *  | `cn-hz`  | Hangzhou, China               | Areas not covered by other data centers  |
     *
     * **Note**
     *
     * This property must has the same value as the data center that you set
     * when [creating the room](https://docs.agora.io/en/whiteboard/whiteboard_room_management?platform=RESTful);
     * otherwise, the SDK fails to connect to the room.
     */
    readonly region: string;

    /**
     * The device type, which determines how the SDK handles mouse and touch events.
     */
    readonly deviceType: DeviceType;

    /**
     * The user's screen type, which is used to adjust parameters for gesture recognition.
     */
    readonly screenType: ScreenType;

    /**
     * The rendering mode. See {@link RenderEngine}.
     */
    readonly renderEngine: RenderEngine;

    /**
     * The version of the current SDK.
     * @since 2.13.14
     */
    readonly version: string;

    /**
     * The `WhiteWebSdk` constructor.
     * @param params Construction parameters.
     * @returns The constructed `WhiteWebSdk` object.
     */
    constructor(params: WhiteWebSdkConfiguration);

    /**
     * Joins the live Interactive Whiteboard room.
     *
     * @param params Configurations for the `Room` object. See {@link JoinRoomParams}.
     * @param callbacks Event callbacks of the `Room` object.
     * @returns
     * - The `Room` object, if the method call succeeds. See {@link Room}.
     * - An error message, if the method call fails.
     *
     * @example
     * ```typescript
     * const joinRoomParams = {...};
     * const roomCallbacks = {...};
     *
     * whiteWebSdk.joinRoom(joinRoomParams, roomCallbacks)
     *            .then(function (room) {
     *            })
     *            .catch(function (error) {
     *            });
     * ```
     */
    joinRoom(params: JoinRoomParams, callbacks?: Partial<RoomCallbacks>): Promise<Room>;

    /**
     * @ignore
     * Checks whether the room has playback data.
     *
     * @param params Configurations for the `Player` object. See {@link PlayableCheckingParams}.
     * @returns
     * - `true`, if the method call succeeds.
     * - `false`, if the method call fails.
     */
    isPlayable(params: PlayableCheckingParams): Promise<boolean>;

    /**
     * @ignore
     * Creates a `Player` object, which is used to replay the whiteboard content of a live Interactive Whiteboard room.
     *
     * @param params Configurations for the `Player` object. See {@link ReplayRoomParams}.
     * @param callbacks Event callbacks of the `Player` object.
     * @returns
     * - The `Player` object, if the method call succeeds. See {@link Player}.
     * - An error message, if the method call fails.
     *
     * @example
     * ```typescript
     * const replayRoomParams = {...};
     * const replayCallbacks = {...};
     *
     * whiteWebSdk.replayRoom(replayRoomParams, replayCallbacks)
     *            .then(function (player) {
     *            })
     *            .catch(function (error) {
     *            });
     * ```
     */
    replayRoom(params: ReplayRoomParams, callbacks?: Partial<PlayerCallbacks>): Promise<Player>;

    /**
     * @ignore
     * @deprecated
     */
    pptConverter(roomToken: string): LegacyPPTConverter;


    private static netState: any;

    private whiteLoggerFactory: any;

    private qualityLoggerFactory: any;

    private akkoApp: any;

    private boundless: any;

    private plugins: any;

    private invisiblePlugins: any;

    private wrappedComponents: any;

    private preloadDynamicPPT: any;

    private fonts: any;

    private handToolKey: any;

    private fontFamily: any;

    private useMobXState: any;

    private onlyCallbackRemoteStateModify: any;

    private urlInterrupter: any;

    private pptParams: any;

    private standardizeCameraBound: any;

    private enableReportQuality: any;

    private isCanvasRenderEngineAvailable: any;

    private parseAppIdentifier: any;

    private assertPlugins: any;

    private assertInvisiblePlugins: any;

    private isValidInvisiblePluginClass: any;

    private mergeArray: any;

    private static defaultValue: any;

}

/**
 * The scope of an event.
 */
export declare enum Scope {
    /**
     * A system event.
     */
    System = "system",
    /**
     * An app event.
     */
    App = "app",
    /**
     * A customized event.
     */
    Custom = "custom",
    /**
     * Reserved for future use.
     */
    Magix = "magix",
}

/**
 * The HTTP response returned by the server when you
 * [Query file conversion progress](https://docs.agora.io/cn/whiteboard/whiteboard_file_conversion?platform=RESTful#%E6%9F%A5%E8%AF%A2%E8%BD%AC%E6%8D%A2%E4%BB%BB%E5%8A%A1%E7%9A%84%E8%BF%9B%E5%BA%A6%EF%BC%88get%EF%BC%89).
 */
 export declare type ConversionResponse = {
    /**
     * The unique identifier (UUID) of the file-conversion task.
     */
    uuid: string;
    /**
    * The type of the file-conversion task.
    */
    type: ConversionType;
    /**
    * The status of the file-conversion task.
    */
    status: Status;
    /**
    * The reason why the file-conversion task fails.
    */
    failedReason?: string;
    /**
    * Details about the file-conversion progress.
    */
    progress: Progress;
};

/**
 * Configurations of the PPT preview page.
 */
export declare type PreviewConfig = {
    /**
     * Adds text to the menu on the preview page. See {@link International}.
     */
    international?: International;
 };

/**
 * @ignore
 * Logs.
 */
export declare type Logger<C = {
    [key: string]: any;
}> = LoggerPrinter<C> & {
    context?: Partial<C> & {
        [key: string]: any;
    };
    withContext: <T extends Object>(context: Partial<C> & T)=>Logger<C & T>;
};

/**
 * Configurations for dynamic PPT files.
 */
export declare type PptParams = {
    /** @ignore */
    scheme?: string;
    /**
     * The `AgoraRTCClient` class in the Agora RTC SDK. See {@link RTCClient}.
     */
    rtcClient?: RTCClient;
    /**
     * Whether to enable server-side typesetting for dynamic PPT slides.
     *
     * @since 2.12.0
     *
     * As of February 10, 2021, when converting dynamic PPT slides to HTML
     * web pages, the Agora Interactive Whiteboard server supports typesetting
     * the dynamic PPT slides to ensure the presentation of the text in
     * the dynamic PPT slides is consistent across platforms.
     *
     * **Note**
     *
     * From 2.12.18, the default value of `useServerWrap` is changed from
     * `false` to `true`.
     *
     * - `true`: (Default) Enable server-side typesetting.
     * - `false`: Disable server-side typesetting.
     */
    useServerWrap?: boolean;
};

/**
 * Customized user information.
 * @deprecated Use `userPayload` in {@link JoinRoomParams} instead.
 */
export declare type MemberInformation = {
    id: number;
    session: string;
    payload: any;
};

/**
 * Browser events.
 * - `MouseEvent`: See [MouseEvent](https://developer.mozilla.org/en/docs/Web/API/MouseEvent)。
 * - `WheelEvent`: See [WheelEvent](https://developer.mozilla.org/en/docs/Web/API/WheelEvent)。
 * - `KeyboardEvent`: See [KeyboardEvent](https://developer.mozilla.org/en/docs/Web/API/KeyboardEvent)。
 * - `TouchEvent`: See [TouchEvent](https://developer.mozilla.org/en/docs/Web/API/TouchEvent)。
 */
export declare type NativeEvent = MouseEvent | WheelEvent | KeyboardEvent | TouchEvent;

/**
 * Rendering of the component plugin.
 */
export declare type RenderPlugin<C = {
}, T = any> = {
    /**
     * The type of the component plugin, which is the unique identifier of the component plugin.
     */
    kind: string;
    /**
     * The style of the component plugin.
     */
    render: ComponentType<PluginProps<C, T>>;
    /**
     * The default attributes of the component plugin.
     */
    defaultAttributes?: T;

    hitTest?:
    /**
     * Hit test, which you can use to define the selectable area of the
     * component plugin for the selection tool.
     *
     * @param plugin The component plugin object.
     * @param x The X coordinate of the center of the selectable area.
     * @param y The Y coordinate of the center of the selectable area.
     * @param selectorRadius The radius of the selectable area.
     *
     * @returns The result of the hit test:
     * - `true`: The hit test succeeds.
     * - `false`: The hit test fails.
     */
    (plugin: PluginInstance<C, T>, x: number, y: number, selectorRadius: number)=>boolean;

    willInterruptEvent?:
    /**
     * Determines whether to interrupt the native events of the component plugin.
     *
     * @param plugin The component plugin object.
     * @param event The native events.
     *
     * @returns Whether to interrupt the native events of the component plugin:
     * - `true`: Interrupt the native events.
     * - `false`: Do not interrupt the native events.
     */
    (plugin: PluginInstance<C, T>, event: NativeEvent)=>boolean;
};

/**
 * The text format.
 */
 export declare type TextFormat = {
    /**
     * The stroke color in RGB format. For example, `[0, 0, 255]` represents blue.
     */
    color?: Color;
    /**
     * The font size. The value must be greater than 0.
     */
    fontSize?: number;
    /**
     * Whether to bold the text:
     *
     * - `true`: Bold the text.
     * - `false`: (Default) Do not bold the text.
     */
    bold?: boolean;
    /**
     * Whether to italicize the text:
     *
     * - `true`: Italicize the text.
     * - `false`: (Default) Do not italicize the text.
     */
    italic?: boolean;
    /**
     * Whether to underline the text:
     *
     * - `true`: Underline the text.
     * - `false`: (Default) Do not underline the text.
     */
    underline?: boolean;
    /**
     * Whether to apply strikethrough formatting to the text:
     *
     * - `true`: Apply strikethrough formatting.
     * - `false`: (Default) Do not apply strikethrough formatting.
     */
    lineThrough?: boolean;
};

/**
 * Whiteboard scene.
 */
export declare type WhiteScene = {
    /**
     * The scene name.
     */
    name: string;
    /**
     * The image or dynamic PPT slide to be displayed in the scene. A scene can
     * display one image or dynamic PPT slide. You can set the width,
     * height, URL address, and preview of the image or dynamic PPT slide in
     * {@link PptDescription}.
     */
    ppt?: PptDescription;
};


/**
 * The information about a scene directory.
 */
 export declare interface ScenesCallbacksNode extends Callbacks<ScenesCallbacks> {
    /**
     * The path of the scene directory.
     */
    readonly path: string;
    /**
     * The names of all scenes under the scene directory.
     */
    readonly scenes: ReadonlyArray<string>;
    /**
     * The number of scenes under the scene directory.
     */
    readonly scenesCount: number;
    /**
     * The names of all subdirectories under the scene directory.
     */
    readonly sceneGroups: ReadonlyArray<string>;
    /**
     * The number of subdirectories under the scene directory.
     */
    readonly sceneGroupsCount: number;
    /**
     * Releases the listener object for the scene directory.
     */
    dispose(): void;

}

/**
 * Scene callbacks.
 */
export declare type ScenesCallbacks = {
    /**
     * Occurs when the number of scenes under the specified scene directory changes.
     *
     * @param scenesCallbacks The information about the scene directory. See {@link ScenesCallbacksNode ScenesCallbacksNode}.
     * @param scenesCount The current number of scenes under the specified scene directory.
     */
    onScenesCountUpdate: (scenesCallbacks: ScenesCallbacksNode, scenesCount: number)=>void;
    /**
     * Occurs when a new scene is added to the specified scene directory.
     *
     * @param scenesCallbacks The information about the scene directory. See {@link ScenesCallbacksNode ScenesCallbacksNode}.
     * @param name The name of the new scene.
     */
    onAddScene: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
    /**
     * Occurs when a scene is deleted from the specified scene directory.
     *
     * @param scenesCallbacks The information about the scene directory. See {@link ScenesCallbacksNode ScenesCallbacksNode}.
     * @param name The name of the deleted scene.
     */
    onRemoveScene: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
    /**
     * Occurs when the number of subdirectories under the specified scene directory changes.
     *
     * @param scenesCallbacks The information about the scene directory. See {@link ScenesCallbacksNode ScenesCallbacksNode}.
     * @param sceneGroupsCount The current number of subdirectories under the specified scene directory.
     */
    onScenesGroupCountUpdate: (scenesCallbacks: ScenesCallbacksNode, sceneGroupsCount: number)=>void;
    /**
     * Occurs when a new subdirectory is added to the specified scene directory.
     *
     * @param scenesCallbacks The information about the scene directory. See {@link ScenesCallbacksNode ScenesCallbacksNode}.
     * @param name The name of the new subdirectory.
     */
    onAddSceneGroup: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
    /**
     * Occurs when a subdirectory is deleted from the specified scene directory.
     *
     * @param scenesCallbacks The information about the scene directory. See {@link ScenesCallbacksNode ScenesCallbacksNode}.
     * @param name The name of the deleted subdirectory.
     */
    onRemoveSceneGroup: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
};


/**
 * The listener for an event.
 */
export declare type EventListener = (event: Event)=>void;

/**
 * Options for setting a custom event listener.
 *
 * @since v2.15.2
 */
 export declare type MagixEventListenerOptions = {
    /**
     * The interval (ms) of the SDK triggering custom event callbacks. The default value is 500.
     * The value must be equal to or greater than 500.
     *
     * The SDK triggers the custom event callbacks based on the set value of this parameter.
     */
    fireInterval?: number;
    /**
     * Sets whether to send event callbacks after the Agora server acknowledges the {@link dispatchMagixEvent} method call is successful:
     * - true: Send the event callbacks immediately after the {@link dispatchMagixEvent} method call.
     * - false: (Default) Send the event callbacks after the Agora server acknowledges the {@link dispatchMagixEvent} method call is successful.
     */
    fireSelfEventAfterCommit?: boolean;
};

/**
 * The listener for a group of events.
 */
export declare type EventsListener = (events: Event[])=>void;

/**
 * The filter for an event.
 */
export declare type EventFilter = (event: Event)=>boolean;

/**
 * @since 2.10.0
 *
 * The state of the view. This type inherits {@link Camera} and adds the following properties:
 *
 * - **width**: *number*
 *
 *   The width of the view.
 * - **height**: *number*
 *
 *   The height of the view.
 */
export declare type CameraState = Camera & {
    width: number;
    height: number;
};

/**
 * The type of the media file:
 * - `video`: A video file.
 * - `audio`: An audio file.
 */
export declare type MediaType = "video" | "audio";

/**
 * The result of the seek operation by calling the {@link seekToProgressTime} method.
 *
 * @since v2.15.0
 */
 export declare enum PlayerSeekingResult {
    /**
     * The SDK successfully seeks to the specified playback position.
     */
    Success = "success",
    /**
     * The seek operation is not necessary because the current playback position is the specified playback position.
     */
    SuccessButUnnecessary = "successButUnnecessary",
    /**
     * The seek operation is cancelled because it is overridden by another seek operation.
     */
    Override = "override",
    /**
     * The seek operation is stopped because the player stops.
     */
    Stopped = "stopped",
}

/**
 * The unique identifier of a component plugin.
 */
export declare type Identifier = string;

export declare type PencilOptions = {
    /**
     * Whether to enable the pen tool (`pencil`) to draw a point:
     *  - `true`： Enable the pen tool to draw a point.
     *  - `false`：(Default) Disable the pen tool from drawing a point.
     * In this case, clicking on the whiteboard with the pen tool does not draw a point on the screen.
     *
     *  **Note**
     *
     *  This parameter takes effect only when `disableNewPencil` is set to `false`.
     */
    enableDrawPoint: boolean;
    /**
     * @deprecated
     * Whether to disable the Bézier curve optimization:
     * - `true`: Disable.
     * - `false`: (Default) Enable.
     */
    disableBezier: boolean;
    /**
     * @deprecated
     */
    sparseWidth: number;
    /**
     * @deprecated
     */
    sparseHump: number;
};

/**
 * Margin configuration.
 */
export declare type Margin = {
    /**
     * The top margin in pixels.
     */
    top: number;
    /**
     * The bottom margin in pixels.
     */
    bottom: number;
    /**
     * The left margin in pixels.
     */
    left: number;
    /**
     * The right margin in pixels.
     */
    right: number;
};

/**
 * Coordinates of a point in the world coordinate system (taking the center of the initial whiteboard as the origin).
 */
export declare type Point = {
    /**
     * The X coordinate of the point in the world coordinate system.
     */
    x: number;
    /**
     * The Y coordinate of the point in the world coordinate system.
     */
    y: number;
};

/**
 * Custom icons.
 */
export declare type UserCursorIcons = {
    [key: string]: ReadonlyArray<string>;
};

/** The type of the file-conversion task. */
export declare enum ConversionType {
    /** Dynamic file conversion, which converts a PPTX file to web pages. */
    dynamic = "dynamic",
    /** Static file conversion, which converts a PPT, PPTX, Word, or PDF file to images. */
    static = "static",
  }

/** The state of the file-conversion task. */
export declare enum Status {
    /** Conversion is waiting to start. */
    waiting = "Waiting",
    /** Conversion is in progress. */
    converting = "Converting",
    /** Conversion is finished. */
    finished = "Finished",
    /** Conversion fails. */
    fail = "Fail",
}

/** Details about the file-conversion progress. */
export declare type Progress = {
    /** The total number of pages to be converted. */
    totalPageSize: number;
    /** The number of pages converted. */
    convertedPageSize: number;
    /** The conversion progress (in percentage). */
    convertedPercentage: number;
    /** The generated file. */
    convertedFileList: ConvertedFile[];
    /** The current step of the file-conversion task. */
    currentStep?: CurrentStep;
};

/**
 * This type is used to add text to the menu on the PPT preview page.
 * You can pass in the letters to be displayed, for example, "Next".
 */
export declare type International = {
    /** The text for “the previous page”. */
    prePage?: string;
    /** The text for "the next page". */
    nextPage?: string;
    /** The text for "the previous step". */
    preStep?: string;
    /** The text for "the next step". */
    nextStep?: string;
    /** The text for "jump to". */
    jumpTo?: string;
    /** The text for "display the sidebar". */
    displaySidebar?: string;
    /** The text for "hide the sidebar". */
    hideSidebar?: string;
    /** The text for "display slide notes". */
    displayNote?: string;
    /** The text for "hide slide notes". */
    hideNote?: string;
    /** The text for "page number". */
    pageNumber?: string;
    /** The text for "reset animation of the current slide".*/
    resetCurrentSlideAnimation?: string;
    /** The text for "reset animation of the current PPT file". */
    resetCurrentPPTAnimation?: string;
};

/**
 * @ignore
 * 打印日志。
 */
export declare type LoggerPrinter<C = {
    [key: string]: any;
}> = {
    [L: string]: (...messages: any[])=>void;
};

/**
 * `AgoraRTCClient` is used for bridging the audio mixing method of the Agora
 * RTC SDK and the Interactive Whiteboard SDK.
 *
 * When you use the Agora RTC SDK and Interactive Whiteboard SDK at the same time,
 * and the dynamic PPT slides displayed in the whiteboard contain audio files,
 * you may encounter the issues of low volume and/or echoes when playing the audio in the PPT slides.
 *
 * To solve these issues, you can use the `AgoraRTCClient` type to call the
 * audio mixing method of the Agora RTC SDK to play the audio files in the
 * dynamic PPT slides.
 *
 * **Note**
 *
 * Currently only the Agora RTC SDK for Electron is supported.
 */
export declare type RTCClient = {
    startAudioMixing:
    /**
     * Starts playing and mixing the music file.
     *
     * @param filePath The absolute path or URL address of the music file.
     * @param loopback Whether to only play music files on the local client:
     * - `true`: Only play music files on the local client so that only the local user can hear the music.
     * - `false`: Publish music files to remote clients so that both the local user and remote users can hear the music.
     * @param replace  Whether to replace the audio collected by the microphone with a music file:
     * - `true`:  Replace the audio. Users can only hear music.
     * - `false`: Do not replace the audio. Users can hear both music and audio collected by the microphone.
     * @param cycle    The number of times the music file plays.
     * - &ge; 0: The number of playback times. For example, 0 means that the SDK does not play the music file, while 1 means that the SDK plays the music file once.
     * - -1: Play the music in an indefinite loop.
     * @param callback Occurs when the SDK starts playing and mixing the music file.
     * `state: number` represents the state of playing or mixing the music file.
     * `errorCode: number` represents an error code.
     *
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    (filePath: string, loopback: boolean, replace: boolean, cycle: number, callback?: (state: number, errorCode: number)=>void)=>number;

    stopAudioMixing:
    /**
     * Stops playing or mixing the music file.
     * @param callback Occurs when the SDK stops playing or mixing the music file.
     * `state: number` represents the state of playing or mixing the music file.
     * `errorCode: number` represents an error code.
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     *
     */
    (callback?: (state: number, errorCode: number)=>void)=>number;

    pauseAudioMixing:
    /**
     * Pauses playing and mixing the music file.
     *
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    ()=>number;

    resumeAudioMixing:
    /**
     * Resumes playing and mixing the music file.
     *
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    ()=>number;

    adjustAudioMixingVolume?:
    /**
     * Adjusts the volume of audio mixing.
     *
     * This method adjusts the audio mixing volume for both local playback and publishing (sending to other users).
     *
     * @param volume Audio mixing volume. The value ranges between 0 and 100. The default is 100, indicating the original volume.
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    (volume: number)=>number;

    adjustAudioMixingPlayoutVolume?:
    /**
     * Adjusts the volume of audio mixing for local playback.
     *
     * @param volume Audio mixing volume for local playback. The value ranges between 0 and 100. The default is 100, indicating the original volume.
     *
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    (volume: number)=>number;

    adjustAudioMixingPublishVolume?:
    /**
     * Adjusts the volume of audio mixing for publishing (sending to other users).
     *
     * @param volume Audio mixing volume for remote playback. The value ranges between 0 and 100. The default is 100, indicating the original volume.
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    (volume: number)=>number;

    getAudioMixingPlayoutVolume?:
    /**
     * Gets the audio mixing volume for local playback.
     *
     * @returns
     * - Returns the audio mixing volume for local playback, if the method call is successful. The value range is [0,100].
     * - &lt; 0: Failure.
     */
    ()=>number;

    getAudioMixingPublishVolume?:
    /**
     * Gets the audio mixing volume for publishing.
     *
     * @returns
     * - Returns the audio mixing volume for local playback, if the method call is successful. The value range is [0,100].
     * - &lt; 0: Failure.
     */
    ()=>number;

    getAudioMixingDuration?:
    /**
     * Gets the duration of the music file played by `startAudioMixing`.
     *
     * @returns
     * - Returns the duration (ms), if the method call is successful.
     * - &lt; 0: Failure.
     */
    ()=>number;

    getAudioMixingCurrentPosition?:
    /**
     * Gets the playback position of the music file.
     *
     * @returns
     * - Returns the current playback position (ms), if the method call is successful.
     * - &lt; 0: Failure.
     */
    ()=>number;

    setAudioMixingPosition:
    /**
     *
     * Sets the playback position of the music file to a different starting position (the default plays from the beginning).
     *
     * @param position The playback starting position (ms), which must be an integer.
     * @returns
     * - 0: Success.
     * - &lt; 0: Failure.
     */
    (position: number)=>number;
};

/** The image or dynamic PPT slide generated by file conversion. */
export declare type ConvertedFile = {
    /**
     * The URL address of the image, or the URI address of the dynamic PPT slide.
     */
    conversionFileUrl: string;
    /**
     * The URL address of the preview for the image or dynamic PPT slide.
     */
    preview?: string;
    /**
     * The height (px) of the image or dynamic PPT slide.
     */
    height: number;
    /**
     * The width (px) of the image or dynamic PPT slide.
     */
    width: number;
};

/**
 * @ignore
 */
export declare type EventEmitter = {
};

/** The current step of the file-conversion task. */
export declare enum CurrentStep {
    /**
     * Packaging.
     */
    packaging = "Packaging",
    /**
     * Extracting resources.
     */
    extracting = "Extracting",
    /**
     * Generating the preview.
     */
    generatingPreview = "GeneratingPreview",
    /**
     * Transcoding media files.
     */
    mediaTranscode = "MediaTranscode",
}

