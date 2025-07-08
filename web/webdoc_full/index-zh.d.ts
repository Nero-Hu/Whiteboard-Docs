import { ComponentType, HTMLAttributes, Consumer } from "react";

export { ComponentType, HTMLAttributes, Consumer } from "react";


/**
 * 当前 SDK 的版本号，格式为字符串，如 `"2.12.11"`。
 */
export declare const WhiteVersion: string;

/**
 * Akko 的版本。
 */
export declare const AkkoVersion: any;

/**
 * 系统事件触发者的用户 ID。
 */
export declare const AdminObserverId: number;

/**
 * 自定义事件。
 */
export declare type Event = {
    /**
     * 自定义事件的名称。
     */
    event: string;
    /**
     * 自定义事件的内容。
     */
    payload: any;
    /**
     * 事件触发者的用户 ID，若是系统事件，则为 AdminObserverId。
     */
    authorId: number;
    /**
     * 自定义事件的范围。
     */
    scope: Scope;
    /**
     * 自定义事件的状态。
     */
    phase: EventPhase;
};

/**
 * 事件的范围。
 */
export declare enum EventScope {
    /**
     * 系统事件。
     */
    System = 0,
    /**
     * App 事件。
     */
    App = 1,
    /**
     * 自定义事件。
     */
    Custom = 2,
    /**
     * 预留参数。
     */
    Magix = 3,
}

/**
 * 事件的状态。
 */
export declare enum EventPhase {
    /**
     * 事件已发送。
     */
    Dispatched = "dispatched",
    /**
     * 事件已更新。
     */
    Updated = "updated",
    /**
     * 事件已取消。
     */
    Canceled = "canceled",
}

/**
 * 断线重连设置。
 */
export declare type ReconnectionOptions = {
    /**
     * 是否关闭断线重连：
     * - `true`: 关闭断线重连。
     * - `false`: 开启断线重连。
     */
    disableReconnect: boolean;
};


/**
 * 日志等级。
 *
 * @since 2.11.8
 *
 * 日志级别由高到低的排序为 `error`，`warn`，`info`，和 `debug`。选择一个级别，你就可以看到不低于该级别的所有日志信息。
 * 例如，选择 `info` 级别，就可以看到 `error`、`warn`、`info` 级别的所有日志信息。
 * - `error`：报错日志，表明出现了直接导致 SDK 无法正常运行的错误。
 * - `warn`：警告日志。当传入的参数不符合 SDK 要求时，SDK 会自动调整并发出警告。如果调用废弃 API，SDK 不会发出警告信息。
 * - `info`：信息日志，主要为连接状态。
 * - `debug`：调试日志，最详细的日志，目前内容与 `info` 一致。
 */
export declare type Level = "debug" | "info" | "warn" | "error";

/**
 * 白板绘制性能优化设置。
 * 
 * @since  2.16.48
 * 
 */
export declare interface OptimizeOptions {
    /**
     * 设置白板绘制的刷新间隔。详见 {@link LowTaskAnimationInterval LowTaskAnimationInterval}。
     */
    useLowTaskAnimation: LowTaskAnimationInterval;

    /**
     * 是否使用单个画布：
     *  - `true`：使用单个画布，应用浮动画布优化策略。
     *  - `false`：（默认）使用双画布交替绘制。
     * 
     * 白板默认使用两个画布交替绘制以避免在部分设备上绘制时可能出现的画面闪烁现象，使用单个画布绘制可以避免重绘，降低性能消耗。
     */
    useSinglerCanvas: boolean;

    /**
     * 浮动画布生成的位置和绘制点的对应关系，默认为绘制点位于浮动画布的左上角。详见 {@link OriginCoordType OriginCoordType}。
     * 
     * 仅在 `useSinglerCanvas` 为 `true` 时生效。
     */
    useTopFloatOriginCoord: OriginCoordType;

}


/**
 * 设备类型。
 */
export declare enum DeviceType {
    /**
     * 桌面设备，即使用键盘和鼠标的设备。
     */
    Desktop = "desktop",
    /**
     * 触碰板设备，例如智能手机、平板电脑。
     */
    Touch = "touch",
    /**
     * 同时支持键盘、鼠标、触碰板的设备。
     */
    Surface = "surface",
}

/**
 * 视角的描述。
 */
export declare type Camera = {
    /**
     * 视角的中心点在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标。
     */
    centerX: number;
    /**
     * 视角的中心点在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标。
     */
    centerY: number;
    /**
     * 视角的缩放比例。
     */
    scale: number;
};

/**
 * 视觉矩形的描述。该类继承 {@link Size} 且包含以下成员：
 *
 * - **originX**: *number*
 *
 *    视觉矩形左上角原点在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标。
 * - **originY**: *number*
 *
 *    视觉矩形左上角原点在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标。
 *
 */
export declare type Rectangle = Size & {
    originX: number;
    originY: number;
};

/**
 * 尺寸大小。
 */
export declare type Size = {
    /**
     * 宽度。
     */
    width: number;
    /**
     * 高度。
     */
    height: number;
};

/**
 * 移动或缩放视角时的动画模式。
 *
 * @since 2.2.2
 */
export declare enum AnimationMode {
    /**
     * （默认）渐变模式。
     */
    Continuous = "continuous",
    /**
     * 瞬间切换模式。
     */
    Immediately = "immediately",
}

/**
 * 由 `React.ComponentType` 类型组成的数组，用于包装白板的界面。默认值为 []。
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
 * 调整白板绘制的刷新间隔 (ms)。
 * 
 * 刷新间隔越低，笔迹显示越流畅，性能消耗越大；刷新间隔越高，笔迹越卡，性能消耗越少。
 * 
 * @since  2.16.48
 * 
 */
export declare enum LowTaskAnimationInterval {
    /**
     * 默认为对其到 60 FPS 的刷新间隔。
     */
    Default = 0,
    /**
     * 超低刷新间隔。
     */
    Xs = 20,
    /**
     * 低刷新间隔。
     */
    Sm = 40,
    /**
     * 中等刷新间隔。
     */
    Md = 60,
    /**
     * 高刷新间隔。
     */
    Lg = 80,
    /**
     * 超高刷新间隔。
     */
    Xl = 120,
}

/**
 * 浮动画布生成的位置和绘制点的对应关系。
 * 
 * @since  2.16.48
 * 
 * 根据绘制位置生成一个大小约为 256 x 256 px 的浮动画布，后续绘制不超过该画布的范围时，同步绘制笔迹的范围会限定在这个浮动画布中，而不是同步整个画布，从而降低性能消耗。
 */
export declare enum OriginCoordType {
    /**
     * 默认为绘制点位于浮动画布的左上角。
     */
    Default = 0,
    /**
     * 绘制点位于浮动画布的左上角。
     */
    LeftTop = 7,
    /**
     * 绘制点位于浮动画布的左下角。
     */
    LeftBottom = 1,
    /**
     * 绘制点位于浮动画布的右上角。
     */
    RightTop = 9,
    /**
     * 绘制点位于浮动画布的右下角。
     */
    RightBottom = 3,
    /**
     * 绘制点位于浮动画布的左侧居中。
     */
    LeftCenter = 4,
    /**
     * 绘制点位于浮动画布的右侧居中。
     */
    RightCenter = 6,
    /**
     * 绘制点位于浮动画布的顶部中间。
     */
    TopCenter = 8,
    /**
     * 绘制点位于浮动画布的底部中间。
     */
    BottomCenter = 2,
    /**
     * 绘制点位于浮动画布的中心点。
     */
    Center = 5,
}

/**
 * 自定义字体。
 */
export declare type UserFonts = {
    /**
     * `key-value` 键值对，`key` 为字体名称，`value` 为字体的 URL 地址，例如 `"Calibri": "https://your-cdn.com/Calibri.ttf"`。
     */
    [font: string]: string;
};

// /**
//  * 预览 PPT 文件。
//  *
//  * 该方法会创建一个独立于白板的新页面，用于预览 PPT 文件。
//  *
//  * @since 2.13.2
//  *
//  * @param conversionResponse 轮询 PPT 转换进度的响应内容。详见 {@link ConversionResponse}。
//  * @param container 空的 HTML 元素容器。
//  * @param config 预览页面的配置。详见 {@link PreviewConfig}。
//  * @param preload 是否提前请求下一页 PPT 的资源：
//  * - true：提前请求下一页 PPT 的资源。如果提前请求，响应内容会通过浏览器的缓存进行存储。
//  * - false：不提前请求下一页 PPT 的资源。
//  * @param userFonts 用户传入的自定义字体。详见 {@link UserFonts}。
//  * @param logger PPT 预览的日志。预留参数，暂不支持。
//  * @param pptPrams PPT 预览的其他参数。详见 {@link PptParams}。
//  * @param events 事件。
//  *
//  * @returns EventEmitter 对象。
//  */
// export declare function previewPPT(conversionResponse: ConversionResponse, container: HTMLDivElement, config?: PreviewConfig, preload?: boolean, userFonts?: UserFonts, logger?: Logger, pptPrams?: PptParams, events?: EventEmitter): EventEmitter;

/**
 * 光标。
 */
export declare interface Cursor {
    /**
     * 光标的容器，在创建之初为空。
     * 你可以通过如下代码向容器中添加 HTML 元素，以改变光标的外观。
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
     * 光标所属用户的 ID。
     */
    readonly memberId: number;

    /**
     * 光标所属用户的信息。
     */
    readonly cursorMember: CursorMember;

    /**
     * 光标指示区域中心的 X 轴坐标（以白板左上角为原点）。
     */
    readonly x: number;

    /**
     * 光标指示区域中心的 Y 轴坐标（以白板左上角为原点）。
     */
    readonly y: number;

    /**
     * 光标图形的宽度。
     */
    readonly width: number;

    /**
     * 光标图形的高度。
     */
    readonly height: number;

    onCursorMemberChanged:
    /**
     * `cursorMember` 改变后的回调。
     *
     * 你可以用如下代码监听该回调：
     * @example
     * ```typescript
     * cursor.onCursorMemberChanged = function(cursorMember) {
     *      // cursorMember 改变了
     * }
     * ```
     *
     * @param cursorMember 更新后的 `cursorMember`。
     */
    (cursorMember: CursorMember)=>void;

    /**
     * 通过注入 JSX 结构来改变光标的外观。
     *
     * @example
     * ```typescript
     * cursor.setReactNode(
     *     <img src="https://my-resources.com/icon.png"/>
     * );
     * ```
     * @param reactNode 描述光标外观的 JSX。
     */
    setReactNode(reactNode: any): void;

    /**
     * 修改光标的描述。
     *
     * @param description 光标的描述。
     */
    setCursorDescription(description: Partial<CursorDescription>): void;

}

/**
 * 光标所属用户的信息。
 */
export declare interface CursorMember {
    /**
     * 用户选择的颜色（RGB 格式）。
     */
    readonly color: Color;

    /**
     * 用户选择的白板工具。
     */
    readonly appliance: string;

    /**
     * @deprecated 已废弃。请改用 {@link JoinRoomParams} 中的 `userPayload`。
     */
    readonly information: MemberInformation;

}

/**
 * 设置鼠标的光标适配器。
 */
export declare interface CursorAdapter {
    /**
     * 创建光标的描述。该方法在用户光标首次出现之前会被调用。
     * @param memberId 用户 ID。
     * @returns 用户光标的描述。
     */
    createCursor(memberId: number): CursorDescription & {
        reactNode?: any;
    };

    /**
     * 光标出现在白板上的回调。
     * @param cursor 光标对象。
     */
    readonly onAddedCursor: ((cursor: Cursor)=>void) | undefined;

    /**
     * 光标从白板上消失的回调。
     * @param cursor 光标对象。
     */
    readonly onRemovedCursor: ((cursor: Cursor)=>void) | undefined;

    /**
     * 光标在白板上移动的回调。
     * @param cursor 光标对象。
     * @param positionX 光标指示区域中心的 X 轴坐标（以白板左上角为原点）。
     * @param positionY 光标指示区域中心的 Y 轴坐标（以白板左上角为原点）。
     */
    readonly onMovingCursor: ((cursor: Cursor, positionX: number, positionY: number)=>void) | undefined;

}

/**
 * 光标的描述。
 */
export declare type CursorDescription = {
    /**
     * 光标指示区域中心的 X 轴坐标（以光标图形的左上角为原点）。
     */
    x: number;
    /**
     * 光标指示区域中心的 Y 轴坐标（以光标图形的左上角为原点）。
     */
    y: number;
    /**
     * 光标图形的宽。
     */
    width: number;
    /**
     * 光标图形的高。
     */
    height: number;
};

/**
 * 悬浮条的配置参数。
 */
export declare type FloatBarOptions = {
    /**
     * 悬浮条调色盘的颜色列表。
     */
    colors: ReadonlyArray<Readonly<Color>>;
};

/**
 * 创建插件。
 *
 * @param plugins 创建的插件。
 */
export declare function createPlugins<C_MAP extends Object>(plugins: Readonly<{
    [K: string]: Plugin<any>;
}>): Plugins<C_MAP>;

/**
 * 组件插件的描述。Agora 支持的自定义插件包括组件插件和不可见插件。
 */
export declare type Plugin<C = {
}, T = any> = {
    /**
     * 组件插件的类型，即该组件插件的唯一识别符。
     */
    kind?: string;
    /**
     * 组件插件的外观。
     */
    render: ComponentType<PluginProps<C, T>>;
    /**
     * 属性的默认值。
     */
    defaultAttributes?: T;

    hitTest?:
    /**
     * 碰撞检测。你可以通过碰撞检测定义组件插件可以被选择工具选中的区域。
     *
     * @param plugin 组件插件对象。
     * @param x 可选中区域的中心点的 X 轴坐标。
     * @param y 可选中区域的中心点的 Y 轴坐标。
     * @param selectorRadius 可选中区域的半径。
     *
     * @returns 碰撞检测的结果：
     * - `true`：检测成功。
     * - `false`：检测失败。
     */
    (plugin: PluginInstance<C, T>, x: number, y: number, selectorRadius: number)=>boolean;

    willInterruptEvent?:
    /**
     * 设置是否拦截该组件插件的原生事件。
     *
     * @param plugin 组件插件对象。
     * @param event 原生事件。
     *
     * @returns 是否拦截该组件插件的原生事件：
     * - `true`：拦截。
     * - `false`：不拦截。
     */
     (plugin: PluginInstance<C, T>, event: NativeEvent)=>boolean;
};

/**
 * 组件插件。
 */
export declare interface Plugins<C_MAP extends Object = {
    [kind: string]: any;
}> {
    /**
     * 组件插件的描述。
     */
    readonly plugins: Readonly<{
        [K: string]: RenderPlugin<any>;
    }>;
    /**
     * 设置组件插件的上下文。
     *
     * @param kind 组件插件的类型。
     * @param context 组件插件的上下文。
     */
    setPluginContext<K extends string>(kind: K, context: any): void;
    /**
     * 获取组件插件的上下文。
     * @param kind 组件插件的类型。
     */
    getPluginContext<K extends string>(kind: K): any | undefined;

}

/**
 * 不可见插件的描述。
 *
 * @since 2.10.0
 *
 * Agora 支持的自定义插件包括组件插件和不可见插件。二者的主要区别有：
 * - 不可见插件全局唯一，只能建立一个对象。
 * - 不可见插件不会显示在白板界面上，但它的 attributes 状态会在全房间自动同步。
 */
export declare abstract class InvisiblePlugin<A extends Object> {
    /**
     * 不可见插件的 `Displayer` 对象。
     */
    readonly displayer: Displayer;

    /**
     * 不可见插件的事件回调。
     */
    readonly callbacks: Callbacks<InvisibleCallbacks<A>>;

    /**
     * 不可见插件的属性。
     */
    readonly attributes: A;

    /**
     * 不可见插件的构造函数。
     * @param context 不可见插件的上下文。
     */
    constructor(context: InvisiblePluginContext);

    /**
     * 不可见插件属性更新的回调。
     * @param attributes 更新的 attributes。
     */
    onAttributesUpdate(attributes: A): void;

    /**
     * 不可见插件删除的回调。
     */
    onDestroy(): void;

    /**
    * 获取不可见插件属性的值。
    * @since 2.13.7
    *
    * @param key 属性对应的 key。
    */
    getAttributesValue(key: string[] | string): any;

    /**
     * 设置不可见插件的属性。
     * @param modifyAttributes 不可见插件的属性。
     */
    setAttributes(modifyAttributes: Partial<A>): void;

    /**
     * 更新不可见插件的属性。
     * @since 2.13.7
     *
     * @param keys 单个或多个属性对应的 key。
     * @param value 属性的值。
     */
    updateAttributes(keys: string | string[], value: any): void;

    /**
     * 删除不可见插件。
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

    private isEnableUpdateAttributes: any;

}

/**
 * 不可见插件的上下文。
 */
export declare type InvisiblePluginContext = {
    /**
     * 不可见插件的类型。
     */
    kind: string;
    /**
     * 不可见插件的 `Displayer` 对象。
     */
    displayer: Displayer;
};


/**
 * 不可见插件。
 */
export declare type InvisiblePluginClass<K extends string, A extends Object, P extends InvisiblePlugin<A> = InvisiblePlugin<A>> = {
    /**
     * 插件的类型。
     */
    kind: K;

    onCreate?:
    /**
     * 创建插件对象的回调。
     * @param plugin 创建的插件对象。
     */
    (plugin: P)=>void;

    onDestroy?:
    /**
     * 删除插件对象的回调。
     * @param plugin 删除的插件对象。
     */
    (plugin: P)=>void;
};

/**
 * 不可见插件的回调事件。
 */
export declare type InvisibleCallbacks<A extends Object> = {

    onAttributesUpdate:
    /**
     * 不可见插件属性更新的回调。
     * @param attributes 更新的插件属性。
     */
    (attributes: A)=>void;

    onDestroy:
    /**
     * 删除不可见插件的回调。
     */
     ()=>void;
};

/**
 * 日志的配置参数。
 */
export declare type LoggerOptions = {
    /**
     * SDK 上报 `debug` 等级日志的模式。
     */
    reportDebugLogMode?: LoggerReportMode;
    /**
     * SDK 上报连接质量数据的模式。
     */
    reportQualityMode?: LoggerReportMode;
    /**
     * 日志上报等级，详见 {@link Level}。
     */
    reportLevelMask?: Level;
    /**
     * 日志打印等级，详见 {@link Level}。默认等级为 `info`。
     */
    printLevelMask?: Level;
};

/**
 * SDK 上报日志的模式。
 */
export declare enum LoggerReportMode {
    /**
     * （默认）允许 SDK 一直上报。
     */
    AlwaysReport = "alwaysReport",
    /**
     * 禁止 SDK 上报。
     */
    BanReport = "banReport",
    /**
     * 让 SDK 根据浏览器的控制台配置进行上报。
     */
    DependsOnRemote = "dependsOnRemote",
}

/**
 * 铅笔工具的书写质量设置。
 */
 export declare enum NewPencilWritingQuality {
    /**
     * 高质量。
     */
    Hight = 0,
    /**
     * 中质量。
     */
    Medium = 1,
    /**
     * 低质量。
     */
    Low = 2,
}


/**
 * 设置异步模块的加载模式。
 *
 * @param mode 异步模块的加载模式，详见 {@link AsyncModuleLoadMode}。
 */
export declare function setAsyncModuleLoadMode(mode: AsyncModuleLoadMode): void;

/**
 * 异步模块的加载模式。
 */
export declare enum AsyncModuleLoadMode {
    /**
     * 禁止缓存，每次加载模块的时候都从网上下载。
     */
    DisableCache = "disableCache",
    /**
     * 将模块以 blob 的形式缓存在 indexDB。
     */
    StoreAsBlob = "storeAsBlob",
    /**
     * 将模块以 base64 字符串的形式缓存在 indexDB。
     */
    StoreAsBase64 = "storeAsBase64",
}

/**
 * 用户的视角模式。
 */
export declare enum ViewMode {
    /**
     * （默认）自由模式。
     *
     * 该模式下用户可以主动调整视角，不受其他用户视角模式设置的影响，也不会影响其他用户的视角模式设置。
     *
     * **Note**
     * 当房间内不存在视角为主播模式的用户时，所有用户的视角都默认为自由模式。
     */
    Freedom = "freedom",
    /**
     * 跟随模式。
     *
     * 该模式下用户的视角会跟随主播的视角。
     *
     * **Note**
     * - 当一个用户的视角设置为主播模式后，房间内其他所有用户（包括新加入房间的用户）的视角会被自动设置为跟随模式。
     * - 跟随模式的用户进行白板操作时，其视角会自动切换为自由模式。
     */
    Follower = "follower",
    /**
     * 主播模式。
     *
     * 该模式下用户可以主动调整视角，并将自己的视角同步给房间内所有其他用户。
     *
     * **Note**
     * - 每个房间只能有一个主播模式视角的用户。
     * - 当一个用户的视角设置为主播模式后，房间内所有其他用户（包括新加入房间的用户）的视角会被自动设置为跟随模式。
     */
    Broadcaster = "broadcaster",
}

/**
* 白板上绘画的渲染模式。
*
* @since 2.6.0
*/
export declare enum RenderEngine {
    /**
     * SVG 渲染模式。
     * 2.6.0 及之前版本的互动白板 SDK 默认使用的渲染模式，该模式兼容性较好，但性能较差。
     *
     */
    SVG = "svg",
    /**
     * Canvas 渲染模式。
     * 2.6.0 版本起，互动白板 SDK 新增 `canvas` 渲染模式，该模式性能较好，但兼容性较差。
     */
    Canvas = "canvas",
}

/**
 * 判断 `Displayer` 对象是否为 `Room` 对象。
 *
 * @param displayer `Displayer` 对象。
 *
 * @returns `Displayer` 对象是否为 `Room` 对象：
 * - `true`：该 `Displayer` 对象是 `Room` 对象。
 * - `false`：该 `Displayer` 对象不是 `Room` 对象。
 */
export declare function isRoom(displayer: Displayer): boolean;

/**
 * 判断 `Displayer` 对象是否为 `Player` 对象。
 *
 * @param displayer `Displayer` 对象。
 *
 * @returns 该 `Displayer` 对象是否为 `Player` 对象：
 * - `true`：该 `Displayer` 对象是 `Player` 对象。
 * - `false`：该 `Displayer` 对象不是 `Player` 对象。
 */
export declare function isPlayer(displayer: Displayer): boolean;

/**
 * 回调。
 */
 export declare interface Callbacks<CALLBACKS extends {
    [name: string]: any;
}> {
    /**
     * 注册一个回调。
     * @param name 回调名。
     * @param listener 回调函数。
     */
    on<NAME extends string>(name: NAME, listener: any): void;

    /**
     * 注册只使用一次的回调。
     * @param name 回调名。
     * @param listener 回调函数。
     */
    once<NAME extends string>(name: NAME, listener: any): void;

    /**
     * 注销回调。
     * @param name 回调名。
     * @param listener 回调函数。
     */
    off<NAME extends string>(name?: NAME, listener?: any): void;

    /**
     * 将注册的回调转到另一个 `Callbacks` 对象。
     * @param name 注册回调的名称。
     * @param toCallbacks 转到的 `Callbacks` 对象。
     */
    forwardTo<NAME extends string>(name: NAME, toCallbacks: Callbacks<CALLBACKS>): any;
}

/**
 * 默认的快捷键。
 *
 * | 键盘按键                | 效果                     |
 * | :--------------------- | :---------------------- |
 * | Backspace 或 Delete     | 删除所选对象              |
 * | Shift                  | 锁定放缩长宽比，令其等比放缩 |
 * | Ctrl + Z 或 Command + Z | 撤回                     |
 * | Ctrl + Y 或 Command + Y | 重做                    |
 * | Ctrl + C 或 Command + C | 复制                     |
 * | Ctrl + V 或 Command + V | 粘贴                    |
 */
export declare const DefaultHotKeys: Partial<HotKeys>;

/**
 * 快捷键对应的效果。
 */
export declare type HotKeys = {
    /**
     * 复制并粘贴。
     */
    duplicate: HotKey;
    /**
     * 复制。
     */
    copy: HotKey;
    /**
     * 粘贴。
     */
    paste: HotKey;
    /**
     * 撤回。
     */
    undo: HotKey;
    /**
     * 重做。
     */
    redo: HotKey;
    /**
     * 删除。
     */
    delete: HotKey;
    /**
     * 锁定缩放比例。
     */
    lock: HotKey;
    /**
     * 切换到选择工具（`selector`）。
     */
    changeToSelector: HotKey;
    /**
     * 切换到点选工具 (`clicker`)。
     */
     changeToClick: HotKey;
    /**
     * 切换到激光笔（`laserPointer`）。
     */
    changeToLaserPointer: HotKey;
    /**
     * 切换到铅笔工具（`pencil`）。
     */
    changeToPencil: HotKey;
    /**
     * 切换到矩形工具（`rectangle`）。
     */
    changeToRectangle: HotKey;
    /**
     * 切换到椭圆工具（`ellipse`）。
     */
    changeToEllipse: HotKey;
    /**
     * 切换到橡皮工具（`eraser`）。
     */
    changeToEraser: HotKey;
    /**
     * 切换到文字工具（`text`）。
     */
     changeToText: HotKey;
    /**
     * 切换到直线工具（`straight`）。
     */
    changeToStraight: HotKey;
    /**
     * 切换到箭头工具（`arrow`）。
     */
    changeToArrow: HotKey;
    /**
     * 切换到抓手工具（`hand`）。
     */
    changeToHand: HotKey;
};

/**
 * 自定义快捷键。
 */
export declare type HotKey = string | HotKeyDescription | ReadonlyArray<string | HotKeyDescription> | HotKeyChecker;

/**
 * 自定义快捷键的描述。
 */
export declare type HotKeyDescription = {
    /**
     * 指定的键。
     */
    key: string;
    /**
     * 是否使用 Alt 键。
     */
    altKey: boolean | null;
    /**
     * 是否使用 Ctrl 键。
C */
    ctrlKey: boolean | null;
    /**
     * 是否使用 Shift 键。
     */
    shiftKey: boolean | null;
};

/**
 * 自定义快捷键的事件。
 */
export declare type HotKeyEvent = {
    /**
     * 浏览器的原生事件。
     */
    nativeEvent?: KeyboardEvent;
    /**
     * 快捷键的事件类型。
     * - `KeyDown`：键被按下。
     * - `KeyUp`：键被松开。
     */
    kind: "KeyDown" | "KeyUp";
    /**
     * 指定的键。
     */
    key: string;
    /**
     * 是否使用 Alt 键。
     */
    altKey: boolean;
    /**
     * 是否使用 Ctrl 键。
     */
    ctrlKey: boolean;
    /**
     * 是否使用 Shift 键。
     */
    shiftKey: boolean;
};

/**
 * 键盘类型。
 */
 export declare enum KeyboardKind {
    /**
     * Mac 电脑的键盘。
     */
    Mac = "mac",
    /**
     * Windows 电脑的键盘。
     */
    Windows = "windows",
}

/**
 * 快捷键检查器。
 *
 * @param event 自定义快捷键的事件。
 * @param kind 键盘的类型。
 *
 * @returns 是否为指定的快捷键：
 * - `true`：是指定的快捷键。
 * - `false`：不是指定的快捷键。
 */
export declare type HotKeyChecker = (event: HotKeyEvent, kind: KeyboardKind)=>boolean;

// /**
//  * 创建 `PPTTask` 对象。
//  *
//  * 在 app 服务端发起文档转换任务后，app 客户端可以调用该方法，并传入从 app 服务端获取的 Task Token 和 Task UUD，创建 `PPTTask` 对象。你可以从 `PPTTask` 对象的回调中获取转换任务的进度和转换结果。
//  *
//  * @param params `PPTTask` 对象的参数。
//  * @returns 创建的 `PPTTask` 对象。
//  */
// export declare function createPPTTask(params: PPTTaskParams): PPTTask;

// /**
//  * 文档转换生成的图片或动态 PPT 页的描述。
//  */
// export declare type PPT = {
//     /**
//      * 文档转换任务的 UUID，即转换任务的唯一识别符。
//      */
//     uuid: string;
//     /**
//      * 文档转换任务的类型。
//      */
//     kind: PPTKind;
//     /**
//      * 图片或动态 PPT 页的宽。
//      */
//     width: number;
//     /**
//      * 图片或动态 PPT 页的高。
//      */
//     height: number;
//     /**
//      * 图片或动态 PPT 页的场景列表。
//      */
//     scenes: ReadonlyArray<SceneDefinition>;
// };

// /**
//  * `PPTTask` 接口，描述文档转换任务的属性。
//  */
// export declare interface PPTTask {
//     /**
//      * 文档转换任务的 UUID，即转换任务的唯一识别符。
//      */
//     readonly uuid: string;

//     /**
//      * 文档转换任务的类型。
//      */
//     readonly kind: PPTKind;

//     /**
//      * 文档转换任务的回调。
//      */
//     readonly callbacks: Callbacks<PPTTaskCallbacks>;

//     /**
//      * 设置自动轮询，获取文档转换任务的实时状态。当转换任务状态为成功或失败时，自动轮询停止。
//      * @returns 如果方法调用成功，会返回转换生成的图片或动态 PPT 页的描述。
//      */
//     checkUtilGet(): Promise<PPT>;

// }

// /**
//  * 文档转换任务的类型。
//  */
// export declare enum PPTKind {
//     /**
//      * 动态文档转换，即把 PPTX 文件转换为网页。
//      */
//     Dynamic = "dynamic",
//     /**
//      * 静态文档转换，即把 PPT、PPTX、Word、PDF 等格式的文件转换成静态图。
//      */
//     Static = "static",
// }

// /**
//  * 文档转换任务的状态。
//  */
// export declare enum PPTTaskStatus {
//     /**
//      * 等待转换。
//      */
//     Waiting = "Waiting",
//     /**
//      * 正在转换。
//      */
//     Converting = "Converting",
// }

// /**
//  * 文档转换任务当前的步骤。
//  *
//  * @since 2.10.3
//  */
// export declare enum PPTTaskStep {
//     /**
//      * 提取资源。
//      */
//     Extracting = "Extracting",
//     /**
//      * 打包。
//      */
//     Packaging = "Packaging",
//     /**
//      * 生成预览图。
//      */
//     GeneratingPreview = "GeneratingPreview",
//     /**
//      * 媒体文件转换。
//      */
//     MediaTranscode = "MediaTranscode",
// }

// /**
//  * 文档转换任务的进度详情。
//  */
// export declare type PPTTaskProgress = {
//     /**
//      * 转换任务的状态。
//      */
//     status: PPTTaskStatus;
//     /**
//      * 转换任务当前的步骤。
//      *
//      * @since 2.10.3
//      */
//     currentStep?: PPTTaskStep;
//     /**
//      * 待转换的总页数。
//      */
//     totalPageSize: number;
//     /**
//      * 已转换的页数。
//      */
//     convertedPageSize: number;
//     /**
//      * 转换进度（百分比）。
//      */
//     convertedPercentage: number;
// };

// /**
//  * `PPTTask` 对象的参数。
//  */
// export declare type PPTTaskParams = {
//     /**
//      * 转换任务的 UUID，即转换任务的唯一识别符。
//      */
//     uuid: string;
//     /**
//      * 处理该转换任务的数据中心。支持传入以下值：
//      *
//      * | `region` | 数据中心 | 服务区                         |
//      * | -------- | -------- | ------------------------------ |
//      * | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
//      * | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
//      * | `in-mum` | 印度孟买 | 印度                           |
//      * | `eu` | 欧洲（法兰克福） | 欧洲                           |
//      * | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
//      */
//     region?: string;
//     /**
//      * 转换任务的类型。
//      */
//     kind: PPTKind;
//     /**
//      * 转换任务的 Task Token，用于文件转换任务的鉴权。
//      */
//     taskToken: string;
//     /**
//      * 轮询转换任务状态的时间间隔（毫秒）。
//      */
//     checkProgressInterval?: number;
//     /**
//      * 轮询的超时时间（毫秒）。
//      */
//     checkProgressTimeout?: number;
//     /**
//      * 转换任务的回调函数。
//      */
//     callbacks?: PPTTaskCallbacks;
// };

// /**
//  * 文档转换任务的回调。
//  */
// export declare type PPTTaskCallbacks = {
//     onProgressUpdated:
//     /**
//      * 转换进度更新回调。
//      * @param progress 进度详情。
//      */
//     (progress: PPTTaskProgress)=>void;
//     onTaskSuccess:
//     /**
//      * 转换任务成功回调。
//      * @param result 该转换任务生成的图片或动态 PPT。详见 {@link PPT}。
//      */
//     (result: PPT)=>void;
//     onTaskFail:
//     /**
//      * 转换任务失败回调。
//      * @param error 发生的错误。
//      */
//     (error: Error)=>void;
// };

// /**
//  * @ignore
//  * @deprecated
//  */
// export declare interface LegacyPPTConverter {
//     convert(params: LegacyPPTConvertParams): Promise<LegacyPPT>;

// }

// /**
//  * @ignore
//  * @deprecated
//  */
// export declare type LegacyPPT = {
//     uuid: string;
//     kind: PPTKind;
//     width: number;
//     height: number;
//     slideURLs: ReadonlyArray<string>;
//     scenes: ReadonlyArray<SceneDefinition>;
// };

// /**
//  * @ignore
//  * @deprecated
//  */
// export declare type LegacyPPTConvertParams = {
//     url: string;
//     kind: PPTKind;
//     onProgressUpdated?: (progress: number)=>void;
//     checkProgressInterval?: number;
//     checkProgressTimeout?: number;
// };

/**
 * 按指定的比例缩放视角边界。
 *
 * @param scale 指定的缩放比例。
 * @returns 实时缩放比例。
 */
export declare function contentModeScale(scale: number): ContentMode;

/**
 * 等比例缩放视角，使视角边界的长边正好顶住与其垂直的屏幕的两边，以保证在屏幕上完整展示视角边界。
 * @returns 实时缩放比例。
 */
export declare function contentModeAspectFit(): ContentMode;

/**
 * 等比例缩放视角，使视角边界的长边正好顶住与其垂直的屏幕的两边，以保证在屏幕上完整展示视角边界；在此基础上，再将视角边界缩放指定的倍数。
 *
 * @param scale 在等比例缩放的基础上再缩放视角边界的倍数。
 * @returns 实时缩放比例。
 */
export declare function contentModeAspectFitScale(scale: number): ContentMode;

/**
 * 等比例缩放视角，使视角边界的长边正好顶住与其垂直的屏幕的两边；在此基础上，在视角边界的四周填充指定的空白空间。
 *
 * @param space 在等比例缩放的基础上再填充的空白空间，单位为像素。
 * @returns 实时缩放比例。
 */
export declare function contentModeAspectFitSpace(space: number): ContentMode;

/**
 * 等比例缩放视角，使视角边界的短边正好顶住与其垂直的屏幕的两边，以保证视角边界铺满屏幕。
 *
 * @returns 视角的实时缩放比例。
 */
export declare function contentModeAspectFill(): ContentMode;

/**
 * 等比例缩放视角，使视角边界的短边正好顶住与其垂直的屏幕的两边，以保证视角边界铺满屏幕；在此基础上再将视角边界缩放指定的倍数。
 *
 * @param scale 在等比例缩放的基础上再缩放视角边界的倍数。
 * @returns 视角的实时缩放比例。
 */
export declare function contentModeAspectFillScale(scale: number): ContentMode;

/**
 * `CameraBound` 类型用于设置视角边界。
 *
 * 视角边界是白板上用户可以看见的部分。在视角边界内，用户可以自由移动和缩放视角。视角如果超出了视角边界的范围，会被 SDK 拉回视角边界内。
 *
 */
export declare type CameraBound = {
    /**
     * 用户将视角移出视角边界时感受到的阻力大小。取值范围为 [0.0,1.0]，默认值为 0.75。取值越大，用户感受到的阻力越大。
     * - `0.0`: 用户将视角移出视角边界时，完全感受不到阻力，但当其手指离开屏幕时，视角会恢复到原位。
     * - `1.0`: 用户完全无法将视角移出视角边界。
     *
     */
    damping?: number;
    /**
     * 视角边界的中心点在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标，默认值是 0.0。
     */
    centerX?: number;
    /**
     * 视角边界的中心点在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标，默认值是 0.0。
     */
    centerY?: number;
    /**
     * 视角边界的宽度，单位为像素。默认值是 `Infinity`，表示没有限制。
     */
    width?: number;
    /**
     * 视角边界的高度，单位为像素。默认值是 `Infinity`，表示没有限制。
     */
    height?: number;
    /**
     * 视角边界的最大缩放比例。如果不填，则表示视角缩放没有上限。
     */
    maxContentMode?: ContentMode;
    /**
     * 视角边界的最小缩放比例。如果不填，则表示视角缩放没有下限。
     */
    minContentMode?: ContentMode;
};

/**
 * 实时缩放比例。
 *
 * @param screenSize 屏幕的尺寸。
 * @param boundSize 视角边界的尺寸。
 * @returns 根据 `screenSize` 和 `boundSize` 计算出来的缩放比例。
 */
export declare type ContentMode = (screenSize: Size, boundSize: Size)=>number;

/**
 * 场景路径的类型。
 */
 export declare enum ScenePathType {
    /**
     * 该场景不存在。
     */
    None = "none",
    /**
     * 场景目录。
     */
    Dir = "dir",
    /**
     * 场景。
     */
    Page = "page",
    /**
     * 该路径中包含已有场景的路径，无法存在。
     *
     * @since 2.14.5
     */
    Conflict = "conflict",
}

/**
 * 场景列表。
 */
export declare type SceneMap = {
    /**
     * 某一场景目录下的所有场景。
     */
    [dirPath: string]: WhiteScene[];
};

/**
 * `Displayer` 接口是白板房间的基础接口。
 */
export declare interface Displayer<CALLBACKS extends DisplayerCallbacks = DisplayerCallbacks> {
    /**
     * 回调函数。你可以通过如下方式设置回调函数：
     *
     * @example
     * ```typescript
     * // 监听到 onSliceChanged 回调
     * function sliceChangeCallback(slice) {
     *
     * }
     *
     * // 注册回调函数
     * displayer.callbacks.on("onSliceChanged", sliceChangeCallback);
     *
     * // 注销回调函数
     * displayer.callbacks.off("onSliceChanged", sliceChangeCallback);
     *
     * // 仅仅回调一次
     * displayer.callbacks.once("onSliceChanged", function(slice) {
     *
     * });
     * ```
     */
    readonly callbacks: Callbacks<CALLBACKS>;

    /**
     * 用户 ID。
     * - 在实时房间中，指本地用户的用户 ID。
     * - 在回放房间中:
     *   - 当用户的 `ObserverMode` 为 `Directory` 时，`observerId` 为被跟随的用户的用户 ID。
     *   - 当用户的 `ObserverMode` 为 `Freedom` 时，为 `AdminObserverId`。
     */
    readonly observerId: number;

    /**
     * 数据中心。支持传入以下值：
     *
     * | `region` | 数据中心 | 服务区                         |
     * | -------- | -------- | ------------------------------ |
     * | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
     * | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
     * | `in-mum` | 印度孟买 | 印度                           |
     * | `eu` | 欧洲（法兰克福） | 欧洲                           |
     * | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
     */
    readonly region: string;

    /**
     * 当前所处分片的 UUID。
     */
    readonly slice: string;

    /**
     * 当前 SDK 的版本。
     * @since 2.13.14
     */
    readonly version: string;

    /**
     * 该客户端的设备类型，决定 SDK 如何处理鼠标事件和触碰事件。
     */
    readonly deviceType: DeviceType;

    /**
     * 用户的屏幕类型，用于调整手势识别参数。
     */
    readonly screenType: ScreenType;

    /**
     * `Displayer` 对象的状态。
     */
    readonly state: DisplayerState;

    /**
     * 用户当前是否有写的权限:
     *
     * @since 2.10.0
     *
     * - `true`：有写的权限。
     * - `false`：没有写的权限。
     */
    readonly enableWriteNow: boolean;

    /**
     * 抓手工具的快捷键。用户可以使用抓手工具拖动页面。如果设为 `undefined`，表示不启用快捷键功能。
     */
    readonly handToolKey: string | undefined;

    /**
     * 报告抓手工具是否启用:
     * - `true`：启用抓手工具。
     * - `false`：不启用抓手工具。
     */
    handToolActive: boolean;

    /**
     * 是否隐藏其他人的鼠标移动到白板组件上时显示的高亮框。
     *
     * @since 2.12.0
     *
     * - `true`：隐藏高亮框。
     * - `false`：（默认）不隐藏高亮框。
     *
     * **Note**
     *
     * 该属性不影响自己的高亮框显示。
     */
    disableOthersSelectingBox: boolean;

    /**
     * 是否禁止用户通过触屏手势或鼠标滚轮调整视角（即移动或缩放视角）：
     * - `true`：禁止用户调整视角。
     * - `false`：（默认）允许用户调整视角。
     *
     * **Note**
     *
     * 该属性不影响 `setCameraBound`、`moveCamera`、`moveCameraToContain` 方法的使用。
     */
    disableCameraTransform: boolean;

    /**
     * 刷新白板的界面。
     *
     * 当白板的 view 发生改变时，需要手动调用该方法刷新白板的界面。
     * 该方法仅在 `autoResize` 为 `false` 时生效。
     */
    refreshViewSize(): void;

    /**
     * 设置用户的视角边界。
     * @param cameraBound 视角边界。
     */
    setCameraBound(cameraBound: CameraBound): void;

    /**
     * 创建场景目录的监听器对象。
     *
     * 成功创建监听器对象后，当指定场景目录下的场景、子场景目录发生变化时，SDK 会触发你在 {@link ScenesCallbacks ScenesCallbacks} 中实现的回调。
     * 当不再需要使用已创建的监听器时，需要调用 {@link ScenesCallbacksNode.dispose dispose} 来释放该监听器对象。
     *
     * @note
     * - 该方法需要在加入白板房间后调用。
     * - 对于每个场景目录，仅支持创建一个监听器对象。如果需要创建新的监听器对象，必须先调用 `dispose` 释放已创建的监听器对象。
     *
     * @param path 场景目录的路径。如果你传入的是场景路径，SDK 会将监听对象设置为其父场景目录。
     * @param callbacks 需要监听的回调。详见 `ScenesCallbacks`。
     * @returns
     * - 方法调用成功时，返回 {@link ScenesCallbacksNode ScenesCallbacksNode} 对象。
     * - 方法调用失败时，返回 `null`。方法调用失败可能是因为指定的场景目录不存在。
     *
     */
     createScenesCallback(path: string, callbacks?: Partial<ScenesCallbacks>): ScenesCallbacksNode | null;

    /**
     * 获取房间内指定用户的白板工具状态。
     *
     * @param memberId 指定用户的 ID。
     * @returns 指定用户的白板工具状态。
     */
    memberState(memberId: number): MemberState;

    /**
     * 调整视角。
     *
     * @param camera 视角的参数配置，详见 {@link Camera}。
     */
    moveCamera(camera: Partial<Camera> & Readonly<{
        animationMode?: AnimationMode;
    }>): void;

    /**
     * 调整视角，以保证完整显示视觉矩形。
     *
     * @param rectangle 视觉矩形的参数设置，详见 [Rectangle](/api-ref/whiteboard/javascript/enums/cursornames.html#rectangle)。
     */
    moveCameraToContain(rectangle: Rectangle & Readonly<{
        animationMode?: AnimationMode;
    }>): void;

    /**
     * 将白板绑定到 HTML 元素上。
     *
     * @param element 用于容纳白板的 HTML 元素容器。若为 `null`，表示解除对白板的绑定。
     */
    bindHtmlElement(element: HTMLDivElement | null): void;

    /**
     * 获取指定的不可见插件。
     *
     * @param kind 不可见插件的类型。
     * @returns 指定的不可见插件。
     */
    getInvisiblePlugin<A extends Object>(kind: string): InvisiblePlugin<A> | null;

    /**
     * 转换白板上点的坐标。
     *
     * 该方法可以将屏幕坐标系（以屏幕左上角为原点，横轴为 X 轴，正方向向右，纵轴为 Y 轴，正方向向下）
     * 中的坐标转换为世界坐标系（以白板初始化时的中点为原点，横轴为 X 轴，正方向向右，纵轴为 Y 轴，正方向向下）
     * 中的坐标。
     *
     * @param point 点在屏幕坐标系中的坐标。
     * @returns 点在世界坐标系中的坐标。
     */
    convertToPointInWorld(point: {
        /**
         * 点在屏幕坐标系上的 X 轴坐标。
         */
        x: number;
        /**
         * 点在屏幕坐标系上的 Y 轴坐标。
         */
        y: number;
    }): {
        /**
         * 点在世界坐标系上的 X 轴坐标。
         */
        x: number;
        /**
         * 点在世界坐标系上的 Y 轴坐标。
         */
        y: number;
    };

    /**
     * 生成特定场景的预览图。
     *
     * @param  scenePath 特定场景的路径。
     * @param  div 用于显示预览内容的 div。
     * @param  width 预览图的宽度。自 2.3.8 起，该参数为可选参数，如果不填，则默认为展示预览内容的 div 的宽度。
     * @param  height 预览图的高度。自 2.3.8 起，该参数为可选参数，如果不填，则默认为展示预览内容的 div 的高度。
     */
    scenePreview(scenePath: string, div: HTMLElement, width: number | undefined, height: number | undefined): void;

    /**
     * 生成特定场景的截图。
     * @param scenePath 特定场景的路径。
     * @param width 截图的宽度。
     * @param height 截图的高度
     * @returns 截图的 URL 地址。
     *
     * **Note**
     *
     * 如果场景中展示了图片或动态 PPT 幻灯片，请确保该图片或 PPT 幻灯片的存储服务器支持跨域资源共享；否则，生成的截图中可能不会显示该图片或 PPT 幻灯片。
     */
    generateScreenshot(scenePath?: string, width?: number, height?: number): Promise<string>;

    /**
     * 生成特定场景的屏幕快照。
     * @param scenePath 特定场景的路径。
     * @param div 用于显示屏幕快照的 div。
     * @param width 屏幕快照的宽度。自 2.3.8 起，该参数为可选参数，如果不填，则默认为展示屏幕快照的 div 的宽度。
     * @param height 屏幕快照的高度。自 2.3.8 起，该参数为可选参数，如果不填，则默认为展示屏幕快照的 div 的高度。
     */
    fillSceneSnapshot(scenePath: string, div: HTMLElement, width: number, height: number): void;

    /**
     * 生成屏幕快照，并写入指定的 CanvasRenderingContext2D 对象中。
     * @param context CanvasRenderingContext2D 对象。
     * @param scenePath 场景的路径。你可以通过 `room.state.sceneState.scenePath` 获取当前场景。
     * @param width 屏幕快照的宽度。
     * @param height 屏幕快照的高度。
     * @param camera 视角的描述。
     * @param ratio 设备像素比。该参数为可选参数，如果不填，则默认值为 1。
     */
     screenshotToCanvas(context: CanvasRenderingContext2D, scenePath: string, width: number, height: number, camera: Camera, ratio?: number): void;

    /**
     * 等待目标场景的图片加载完成后生成屏幕快照，写入指定的 `CanvasRenderingContext2D` 对象中。
     * 
     * @note 
     *  - 该功能处于实验阶段。
     *  - 如果目标场景的图片无法完成加载，则该函数无法返回屏幕快照，你需要自行处理超时逻辑。
     *  - 如果你希望生成的屏幕快照不包含图片，请使用 {@link screenshotToCanvas}。
     * 
     * @param context CanvasRenderingContext2D 对象。
     * @param scenePath 场景的路径。你可以通过 `room.state.sceneState.scenePath` 获取当前场景。
     * @param width 屏幕快照的宽度。
     * @param height 屏幕快照的高度。
     * @param camera 视角的描述。详见 {@link Camera Camera}。
     * @param ratio 设备像素比。该参数为可选参数，如果不填，则默认值为 1。
     * @param timeout 图片加载的超时时间 (ms)，默认为永不超时，只能设为大于 `0` 的数。图片的加载时间超过该值后，SDK 会直接进行下一步绘制操作，而不会等待图片加载完成。
     */
    screenshotToCanvasAsync(context: CanvasRenderingContext2D, scenePath: string, width: number, height: number, camera: Camera, ratio?: number, timeout?: number): Promise<void>;

     /**
     * 注册自定义事件监听。
     *
     * 成功注册后，你可以接收到对应的自定义事件通知。
     *
     * **Note**
     *
     * 对于同名的自定义事件，SDK 仅支持触发一个回调。
     *
     * @param event 想要监听的自定义事件名称。
     * @param listener 自定义事件回调，详见 {@link EventListener}。如果添加多个同名的事件回调，则之前添加的回调会被覆盖。
     * @param options 自从 v2.15.2。 自定义事件监听设置选项。详见 {@link MagixEventListenerOptions}。
     */
    addMagixEventListener(event: string, listener: EventListener, options?: MagixEventListenerOptions): void;

    /**
     * 注册高频自定义事件监听。
     *
     * 成功注册后，你可以接收到对应的自定义事件通知。
     *
     * **Note**
     *
     * 对于同名的自定义事件，SDK 仅支持触发一个回调。
     *
     * @param event 想要监听的自定义事件名称。
     * @param listener 自定义事件回调，详见 {@link EventsListener}。如果添加多个同名的事件回调，则之前添加的回调会被覆盖。
     * @param fireInterval SDK 触发回调的频率，单位为毫秒。该参数最小值为 500 ms，如果设置为低于该值会被重置为 500 ms。
     *
     * @example
     * ```typescript
     * function listener(events) {
     *     // events 是一个数组
     *     for (const event of events) {
     *         // 回调事件 event
     *     }
     * }
     * displayer.addMagixEventListener("my-event", listener, 100);
     * ```
     */
    addMagixEventListener(event: string, listener: EventsListener, fireInterval: number): void;

    /**
     * 移除自定义事件监听。
     *
     * @param event 想要移除监听的自定义事件名称。
     * @param listener 要移除的监听。若不传，该自定义事件之下的所有监听器将全部注销。
     */
    removeMagixEventListener(event: string, listener?: EventListener): void;

    /**
     * 等待特定的自定义事件发生。
     *
     * @param filter 事件过滤器。
     * @returns 当特定自定义事件发生时，返回该事件。
     */
    waitMagixEvent(filter: EventFilter): Promise<Event>;

    /**
     * 根据指定的动画模式调整视角，以保证完整显示 PPT 的内容。
     *
     * @since 2.3.18
     *
     * @param animationMode 视角调整时的动画模式，详见 {@link AnimationMode}。
     */
    scalePptToFit(animationMode?: AnimationMode): void;

    /**
     * 查询场景路径类型。
     *
     * @param path 场景的路径。请确保场景路径以 `/` 开头，并且由场景目录和场景名构成，例如，`/math/classA`。
     * @returns 场景路径的类型。
     */
    scenePathType(path: string): ScenePathType;

    /**
     * 获取当前房间内所有场景的信息。
     *
     * @returns 当前房间内所有场景的信息。
     */
    entireScenes(): SceneMap;

    /**
     * 获取指定场景的信息。
     *
     * @param path 场景的路径。请确保场景路径以 `/` 开头，并且由场景目录和场景名构成，例如，`/math/classA`。
     * @returns 场景信息。详见 {@link WhiteScene WhiteScene}。
     */
     getScene(path: string): WhiteScene | undefined;

}

/**
 * `DisplayerState` 是 `Room` 对象和 `Player` 对象共有的类型。
 */
export declare type DisplayerState = {
    /**
     * 房间的全局状态。详见 {@link GlobalState}。
     */
    globalState: GlobalState;
    /**
     * 房间内所有互动模式（具有读写权限）用户的状态。
     */
    roomMembers: ReadonlyArray<RoomMember>;
    /**
     * 当前场景的状态。
     */
    sceneState: SceneState;
    /**
     * 当前视角的状态。
     *
     * @since 2.10.0
     */
    cameraState: CameraState;
};

/**
 * `Displayer` 对象的回调。
 */
export declare type DisplayerCallbacks = {

    onEnableWriteNowChanged:
    /**
     * 用户的可写权限发生改变的回调。
     *
     * @since 2.10.0
     * @param enableWriteNow 用户当前是否有写的权限：
     * - `true`：有写的权限。
     * - `false`：没有写的权限。
     */
    (enableWriteNow: boolean)=>void;

    onHandToolActive:
    /**
     * 抓手工具的启用状态发生改变的回调。
     * @param active 抓手工具是否启用:
     * - `true`：启用。
     * - `false`：不启用。
     */
     (active: boolean)=>void;

    onSliceChanged:
    /**
     * 所处分片发生改变的回调。
     * @param slice 所处分片的 UUID。
     */
    (slice: string)=>void;

    onCatchErrorWhenAppendFrame:
    /**
     * 同步用户行为发生错误的回调。
     *
     * @param userId 该用户的用户 ID。
     * @param error 错误信息。
     */
     (userId: number, error: Error)=>void;

    onCatchErrorWhenRender:
    /**
     * 渲染发生错误回调。
     * @param error 错误信息。
     */
    (error: Error)=>void;

    onRenderDuration:
    /**
     * 渲染时长回调。
     * @param renderDuration 渲染时长。
     */
    (renderDuration: number)=>void;

    /**
     * 加载背景图片失败回调。 
     */
    onBackgroundError: (url: string)=>void;

    /**
     * @ignore
     * PPT 文件转网页时，预加载 PPT 文件的进度回调。
     *
     * @param uuid 转换任务的 UUID。
     * @param progress 加载进度，取值范围为 [0.0, 1.0]。
     */
    onPPTLoadProgress: (uuid: string, progress: number)=>void;

    onPPTMediaPlay:
    /**
     * 播放动态 PPT 中媒体文件的回调。
     * @param shapeId 插入媒体文件的 shape 对象的 ID。
     * @param type 媒体文件的类型。
     */
    (shapeId: string, type: MediaType)=>void;

    onPPTMediaPause:
    /**
     * 暂停播放动态 PPT 中媒体文件的回调。
     * @param shapeId 插入媒体文件的 shape 对象的 ID。
     * @param type 媒体文件的类型。
     */
    (shapeId: string, type: MediaType)=>void;
    onPPTMediaPlayError:
    /**
     * 动态 PPT 中的媒体文件播放出错回调。
     * @param shapeId 插入媒体文件的 shape 对象的 ID。
     * @param type 媒体文件的类型。
     * @param error 错误提示。
     */
    (shapeId: string, type: MediaType, error: Error)=>void;
};

/**
 * `Room` 接口继承了 `Displayer` 接口，并且增加了用于操作互动白板实时房间的属性。
 */
export declare interface Room extends Displayer {
    /**
     * 房间的 UUID，即房间的唯一标识符。
     */
    readonly uuid: string;

    /**
     * 房间内用户的唯一标识符，字符串格式。
     */
    readonly uid: string;

    /**
     * 房间当前 session 的 UUID。如果开启了自动日志上报功能，日志中会上报该参数。如果上报时尚未与服务器建立连接，则为 `undefined`。
     */
    readonly session: string;

    /**
     * 房间的 Room Token，用于加入房间时的用户鉴权。
     */
    readonly roomToken: string;

    /**
     * 房间的连接状态，详见 {@link RoomPhase}。
     */
    readonly phase: RoomPhase;

    /**
     * 与服务器时钟校准后的当前时间戳，单位为毫秒。
     * @since 2.13.8
     */
    readonly calibrationTimestamp: number;

    /**
     * 房间的业务状态，详见[管理房间业务状态](/doc/whiteboard/javascript/whiteboard-sdk/basic-features/manage-room-status)。
     */
    readonly state: RoomState;

    /**
     * 用户在当前房间是否为互动模式：
     * - `true`： 互动模式，即对白板具有读写权限。
     * - `false`：订阅模式，即对白板具有只读权限。
     */
    readonly isWritable: boolean;

    /**
     * 可撤销次数。即此时此刻，还可以调用多少次 {@link undo} 方法。
     */
    readonly canUndoSteps: number;

    /**
     * 可重做次数。即此时此刻，还可以调用多少次 {@link redo} 方法。
     */
    readonly canRedoSteps: number;

    /**
     * 是否禁止用户通过鼠标、键盘、触摸屏幕操作白板工具。
     * - `true`： 禁止用户操作白板工具。
     * - `false`：允许用户操作白板工具。
     *
     * 该方法与 `isWritable` 的区别详见[《禁止设备操作｜禁止操作》](https://developer.netless.link/javascript-zh/home/disable#禁止设备操作)。
     */
    disableDeviceInputs: boolean;

    /**
     * 是否关闭橡皮擦擦除图片功能。
     * - `true`： 关闭橡皮擦擦除图片功能。
     * - `false`：启用橡皮擦擦除图片功能。
     *
     * @since 2.3.12
     */
    disableEraseImage: boolean;

    /**
     * 是否禁止本地序列化。
     * - `true`： 禁止本地序列化。
     * - `false`：允许本地序列化。
     *
     * 设置 `disableSerialization(true)` 后，以下方法将不生效：
     * - `redo`
     * - `undo`
     * - `duplicate`
     * - `copy`
     * - `paste`
     *
     * @warning 如果要设置 `disableSerialization(false)`，必须确保同一房间内所有用户使用的 SDK 满足以下版本要求，否则会导致 app 客户端崩溃：
     * - Web SDK 2.9.3 或之后版本
     * - Android SDK 2.9.3 或之后版本
     * - iOS SDK 2.9.3 或之后版本
     *
     */
    disableSerialization: boolean;

    /**
     * 设置本地显示远端白板内容的延时，单位为毫秒，默认值为 0。取值大于等于 0。
     *
     * 设置该参数后，当本地用户接收到远端白板内容后，SDK 会根据你设置的 `timeDelay` 的值延迟显示白板内容。
     *
     * 在音视频传输延时较大的场景中，如使用 CDN 推送音视频流时，你可以使用该参数延迟显示接收到的远端白板内容，以确保白板内容与音视频同步。
     */
    timeDelay: number;

    /**
     * 是否使用原生剪贴板：
     * 
     * - `true`：使用原生剪贴板。白板快捷键，即 {@link Hotkeys HotKeys} 里的复制和粘贴将失效，改为使用原生的 `copy` 和 `paste` 事件。
     * - `false`：（默认）不使用原生剪贴板。
     * 
     * @note 此功能需要浏览器支持以及用户授予剪贴板权限，否则将自动回退到虚拟剪贴板实现。
     */
    useNativeClipboard: boolean;

    /**
     * 设置用户在房间中是否为互动模式。
     *
     * @param isWritable 用户在房间中是否为互动模式：
     * - `true`：互动模式，即具有读写权限。
     * - `false`：订阅模式，即具有只读权限。
     */
    setWritable(isWritable: boolean): Promise<void>;

    /**
     * 修改互动白板实时房间的公共全局状态（`globalState` 属性）。
     *
     * 实时房间的 `globalState` 属性为公共全局变量，房间内所有用户看到的都是相同的 `globalState`，所有互动模式用户都可以读写。修改 `globalState` 属性会立即生效并同步给所有用户。
     *
     *
     * 你可以通过如下方法修改该属性：
     *
     * @example
     * ```typescript
     * room.setGlobalState({
     *     foobar: "hello world",
     * });
     * ```
     *
     * 如果要删除该字段，可以将它设为 `undefined`：
     *
     * @example
     * ```typescript
     * room.setGlobalState({
     *     foobar: undefined,
     * });
     * ```
     *
     * @param modifyState 房间公共全局状态。
     * @returns 修改后的房间公共全局状态。
     */
    setGlobalState(modifyState: Partial<GlobalState>): GlobalState;

    /**
     * 修改房间内的白板工具状态。
     *
     * 调用该方法会立刻更新房间的 {@link MemberState}。
     *
     * 你可以通过如下方法修改该字段：
     *
     * @example
     * ```typescript
     * room.setMemberState({
     *     foobar: "hello world",
     * });
     * ```
     *
     * 如果要删除该字段，可以将它设为 `undefined`：
     * @example
     *
     * ```typescript
     * room.setMemberState({
     *     foobar: undefined,
     * });
     * ```
     *
     * @param modifyState 需要修改的白板工具状态，详见 {@link MemberState}。
     * @returns 修改后的白板工具状态，
     */
    setMemberState(modifyState: Partial<MemberState>): MemberState;

    /**
     * 切换视角模式。
     *
     * 互动白板实时房间支持对用户设置以下视角模式：
     * - `Broadcaster`: 主播模式。
     * - `Follower`：跟随模式。
     * - `Freedom`：（默认）自由模式。
     *
     * **Note**
     *
     * 该方法的设置会影响房间内所有用户的视角模式：
     * - 当房间内不存在主播模式的用户时，所有用户的视角都默认为自由模式。
     * - 当一个用户的视角设置为主播模式后，房间内其他所有用户（包括新加入房间的用户）的视角会被自动设置为跟随模式。
     * - 当跟随模式的用户进行白板操作时，其视角会自动切换为自由模式。
     *
     * @param viewMode 视角模式，详见 {@link ViewMode}。
     */
    setViewMode(viewMode: ViewMode): void;

    /**
     * 切换至指定的场景。
     *
     * 该方法调用成功后，房间内的所有用户看到的白板都会切换到指定场景。
     *
     * **Note**
     *
     * 该方法为同步调用。
     *
     * 场景切换失败可能有以下原因：
     * - 路径不合法，请确保场景路径以 "/"，由场景目录和场景名构成。
     * - 场景路径对应的场景不存在。
     * - 传入的路径是场景目录的路径，而不是场景路径。
     *
     * @param scenePath 想要切换到的场景路径。请确保场景路径以 "/" 开头并且由场景目录和场景名构成，如 `/math/classA`。
     */
    setScenePath(scenePath: string): void;

    /**
     * 切换至当前场景目录下的指定场景。
     *
     * 方法调用成功后，房间内的所有用户看到的白板都会切换到指定场景。
     *
     * **Note**
     *
     * 指定的场景必须在当前场景目录中，否则方法调用会失败。
     *
     * @param index 目标场景在当前场景目录下的索引号。
     */
    setSceneIndex(index: number): void;

    /**
     * 设置本地显示远端白板内容的 Unix 时间戳（ms）。
     *
     * @since 2.12.11
     *
     * 调用该方法后，SDK 会根据你设置的 `timestamp` 的值显示接收到的远端白板内容。
     *
     * 在同时订阅音视频流和白板内容的场景中，你可以从音视频流附带的 SEI 帧中获取时间信息，并调用该方法设置远端白板内容在本地的显示时间，以确保音视频流和白板内容实时同步。
     *
     * @param timestamp 远端白板内容在本地显示的 Unix 时间戳，单位为毫秒。
     */
    syncBlockTimestamp(timestamp: number): void;

    /**
     * 取消 {@link syncBlockTimestamp} 方法设置的本地显示远端白板内容的时间。
     * @since 2.13.8
     */
    stopBlockTimestamp(): void;

    /**
     * 发送自定义事件。
     *
     * **Note**
     *
     * 所有注册监听该事件的用户都会收到通知。
     *
     * @param event 自定义事件的名称。
     * @param payload 自定义事件的内容。
     */
    dispatchMagixEvent(event: string, payload: any): void;

    /**
     * 在指定场景目录下插入多个场景。
     *
     * **Note**
     *
     * 调用该方法插入多个场景后不会切换到新插入的场景。如果要切换至新插入的场景，需要调用 {@link setScenePath}。
     *
     * @param path 指定场景目录的地址，必须以 `/` 开头，不能为场景路径。
     * @param scenes 由多个场景构成的数组。单个场景的字段详见 {@link SceneDefinition}。
     * @param index 待插入的多个场景中，第一个场景在该场景目录的索引号。场景的索引号从 0 开始。
     * - 如果传入的索引号小于或等于该场景目录下现有场景的索引号，新插入的场景会排在传入索引号对应场景的前面。
     * - 如果传入的索引号大于该场景目录下现有场景的索引号，新插入的场景会排在现有场景的最后。
     * - 如果不传入索引号（该参数为选填），新插入的场景会排在现有场景的最后。
     */
    putScenes(path: string, scenes: ReadonlyArray<SceneDefinition>, index?: number): void;

    /**
     * 清理当前场景的所有内容。
     *
     * @param retainPpt 是否保留 PPT 页面：
     *  - `true`：（默认）保留 PPT 页面。
     *  - `false`：连 PPT 页面一起清空。
     */
    cleanCurrentScene(retainPpt?: boolean): void;

    /**
     * 删除场景或者场景目录。
     *
     * **Note**
     *
     * - 互动白板实时房间内必须至少有一个场景。当删除所有的场景后，SDK 会自动生成一个路径为 `/init` 初始场景（房间初始化时的默认场景）。
     * - 如果删除白板当前所在场景，白板会展示被删除场景所在场景目录的最后一个场景
     * - 如果删除的是场景目录，则该场景目录下的所有场景都会被删除。
     * - 如果删除的是当前场景所在的场景目录，例如 `dirA`，SDK 会执行向上递归逻辑选择新的场景作为当前场景，规则如下：
     *    1. 如果当前场景目录路径下还有其他场景目录，例如 `dirB`，排在被删除的场景目录 `dirA` 后面，则将场景切换至
     *    `dirB` 中的第一个场景（index 为 0）。
     *    2. 如果当前场景目录路径下 `dirA` 后不存在场景目录，则查看当前场景目录路径下是否存在场景；
     *    如果存在，则将场景切换至当前场景目录路径下的第一个场景（index 为 0）。
     *    3. 如果当前场景目录路径下 `dirA` 后没有场景目录，也不存在任何场景，则查看 `dirA` 前面是否存在场景目录 `dirC`；如果存在，则选择 `dirC` 中的第一个场景（index 为 0）。
     *    4. 以上都不满足，则继续向上递归执行该逻辑。
     *
     * @param path 场景路径或场景目录路径。如果传入的是场景目录，则会删除该场景目录下的所有场景。
     */
    removeScenes(path: string): void;

    /**
     * 移动场景。
     *
     * 成功移动场景后，场景路径也会改变。
     *
     * @param originalPath 需要移动的场景的原路径。必须为场景路径，不能是场景目录的路径。
     * @param targetPath 目标场景目录的路径或目标场景的路径：
     * - 当 `targetPath`设置为目标场景目录时，表示将指定场景移至其他场景目录中，场景路径会发生改变，但是场景名称不变。
     * - 当 `targetPath`设置为目标场景路径时，表示改变指定场景在当前场景目录的位置，场景路径和场景名都会发生改变。
     */
    moveScene(originalPath: string, targetPath: string): void;

    /**
     * 导出场景。
     *
     * @since v2.14.5
     *
     * 该方法导出指定场景中的所有内容，包括场景中展示的图片或网页。
     *
     * 成功调用该方法后，SDK 会导出指定场景的内容并保存为 Blob 对象。
     *
     * @param scenePath 需要导出的场景路径。
     *
     * @returns 导出场景内容的 Blob 对象。
     */
     exportScene(scenePath: string): Promise<Blob>;


     /**
      * 导入场景。
      *
      * @since v2.14.5
      *
      * 你可以调用该方法将通过 {@link exportScene} 导出的场景内容导入指定的场景目录中。
      *
      * @param dir 场景要导入的场景目录。确保该场景目录的 {@link ScenePathType} 不为 `conflict`；否则，场景将无法导入。
      * 你可以通过 {@link scenePathType} 查询路径类型。
      *
      * @param payload 场景内容的 Blob 对象。
      *
      * @returns 方法调用成功后，返回 {@link SceneDefinition} 对象，其中包含导入场景的 `name`。导入场景的路径即为 `dir`+ `name`。
      * 如果需要修改场景路径，可以调用 {@link moveScene}。
      *
      */
     importScene(dir: string, payload: Blob): Promise<SceneDefinition>;

    /**
     * 插入图片占位符。
     *
     * SDK 会根据你传入的 `imageInfo` 在白板上设置并插入图片占位符。
     *
     * 调用该方法后，还需要调用 {@link completeImageUpload} 传入图片的 URL 地址，以在该占位符插入并展示图片。
     *
     * @param imageInfo 图片信息，详见 {@link ImageInformation}。
     */
    insertImage(imageInfo: ImageInformation): void;

    /**
     * 锁定图片。
     *
     * 图片被锁定后，用户无法移动或缩放图片。
     *
     * @param uuid 指定图片的 UUID。
     * @param locked 是否锁定图片：
     * - `true`: 锁定。
     * - `false`: 不锁定。
     */
    lockImage(uuid: string, locked: boolean): void;

    /**
     * 在指定的图片占位符展示图片。
     *
     * 该方法可以将指定的网络图片插入并展示到指定的图片占位符。
     *
     * **Note**
     *
     * 调用该方法前，请确保你已经调用 {@link insertImage} 方法在白板上插入了图片占位符。
     *
     * @param uuid 指定图片的 UUID, 即在 {@link insertImage} 方法的 {@link ImageInformation ImageInformation} 中传入的图片 UUID。
     * @param src 图片的 URL 地址。请确保 app 客户端能够访问该 URL，否则图片无法正常展示。
     */
    completeImageUpload(uuid: string, src: string): void;

    /**
     * 创建不可见插件对象。
     *
     * @param pluginClass 不可见插件的类。
     * @param attributes 不可见插件的属性。
     * @returns 创建的不可见插件对象。
     */
    createInvisiblePlugin<K extends string, A extends Object, P extends InvisiblePlugin<A>>(pluginClass: InvisiblePluginClass<K, A, P>, attributes: A): Promise<InvisiblePlugin<A>>;

    /**
     * 在白板中插入组件插件对象。
     *
     * @param kind 组件插件的类型，是组件的唯一标识符。
     * @param description 组件插件的描述。
     *
     * @returns 组件插件对象在房间内的唯一标识符。
     */
    insertPlugin(kind: string, description?: PluginDescription): Identifier;

    /**
     * 删除组件插件对象。
     *
     * @param identifier 组件插件对象在房间内的唯一标识符。
     */
    removePlugin(identifier: Identifier): boolean;

    /**
     * 修改组件插件对象的描述。
     *
     * @param identifier 组件插件对象在房间内的唯一标识符。
     * @param description 组件插件对象的新描述。
     */
    updatePlugin(identifier: Identifier, description: PluginDescription): boolean;

    /**
     * 获取组件插件对象的属性。
     *
     * @param identifier 组件插件对象在房间内的唯一标识符。
     */
    getPluginAttributes(identifier: Identifier): any | undefined;

    /**
     * 获取组件插件对象在白板上的位置信息。
     *
     * @param identifier 组件插件对象在房间内的唯一标识符。
     * @returns 组件插件对象的矩形。
     */
    getPluginRectangle(identifier: string): Rectangle | undefined;

    /**
     * 复制选中的内容并粘贴到白板上（用户当前视角的中心）。
     *
     * **Note**
     * - 该方法仅当 {@link disableSerialization} 设为 `false` 时生效。
     * - 多次调用该方法时，不能保证粘贴的内容每次都在用户当前的视角中心，可能会出现随机偏移。
     *
     * @since 2.9.0
     */
    duplicate(): void;

    /**
     * 复制选中内容。
     *
     * **Note**
     * - 该方法会将选中的内容存储到内存中，不会粘贴到白板中。
     * - 该方法仅当 {@link disableSerialization} 设为 `false` 时生效。
     *
     * @since 2.9.0
     */
    copy(): void;

    /**
     * 粘贴复制的内容。
     *
     * **Note**
     * - 该方法会将 {@link copy} 方法复制的内容粘贴到白板上（用户当前视角的中心）。
     * - 该方法仅当 {@link disableSerialization} 设为 `false` 时生效。
     * - 多次调用该方法时，不能保证粘贴的内容每次都在用户当前的视角中心，可能会出现随机偏移。
     *
     * @since 2.9.0
     */
    paste(): void;

    /**
     * 撤销上一步操作。
     *
     * **Note**
     *
     * 该方法仅当 {@link disableSerialization} 设为 `false` 时生效。
     * @returns 剩余的可撤销次数。
     */
    undo(): number;

    /**
     * 重做，即回退撤销操作。
     *
     * **Note**
     *
     * 该方法仅当 {@link disableSerialization} 设为 `false` 时生效。
     *
     * @returns 剩余的可重做次数。
     */
    redo(): number;

    /**
     * 清空可撤回的操作历史记录, 令可撤回次数 `canUndoSteps` 立刻等于 0。
     *
     * @since  2.16.48
     * 
     * @param includeRedo 是否同时清空重做的记录：
     * - `true`：（默认）同时清空重做记录。
     * - `false`：不同时清空重做记录。
     */
    clearUndoHistory(includeRedo?: boolean): void;

    /**
     * 删除选中的内容。
     */
    delete(): void;

    /**
     * 锁定选中图片。
     *
     * @since v2.14.5
     *
     * 该方法可以修改当前选中图片的锁定状态。当图片被锁定时，用户无法移动、放缩或删除该图片。
     *
     * @param locked 是否锁定图片:
     * - true：锁定图片。
     * - false：不锁定图片。
     */
    lockImages(locked: boolean): void;

    /**
     * 移动选中的组件到顶层。
     *
     * @since v2.14.5
     */
    moveSelectedComponentsToTop(): void;

    /**
     * 移动选中的组件到底层。
     *
     * @since v2.14.5
     */
    moveSelectedComponentsToBottom(): void;

    /**
     * 在指定位置插入文字。
     *
     * @param x 第一个文字左侧边的中点在世界坐标系中的 X 轴坐标。
     * @param y 第一个文字左侧边的中点在世界坐标系中的 Y 轴坐标。
     * @param textContent 初始的文字内容，不传则为空。
     *
     * @returns 文字的标识符，字符串格式。
     */
     insertText(x: number, y: number, textContent?: string): Identifier;

    /**
     * 修改指定文字的内容。
     *
     * 调用 {@link insertText} 方法后，你可以调用该方法并传入 `insertText` 方法返回的 `Identifier`，修改指定文字的内容。
     *
     * @param identifier 文字的标识符，为 {@link insertText} 的返回值。
     * @param textContent 修改后的文字内容。
     */
    updateText(identifier: Identifier, textContent: string): void;

    /**
     * 修改当前被选中文字的字体样式。
     *
     * 选中文字后，你可以调用该方法修改字体大小、颜色、是否加粗、是否斜体等样式。
     *
     * @param format 修改后的字体样式。详见 {@link TextFormat}。
     */
    updateSelectedText(format: TextFormat): void;

    /**
     * 播放动态 PPT 下一页。
     *
     * 当前 PPT 页面的动画已全部执行完成时，SDK 会将场景切换至下一页 PPT。
     */
    pptNextStep(): void;

    /**
     * 返回动态 PPT 上一页。
     *
     * 当前 PPT 页面的动画全部回退完成时，SDK 会将场景切回至上一页 PPT。
     */
    pptPreviousStep(): void;

    /**
     * 断开与互动白板实时房间对象的连接。
     *
     * 该方法会让用户离开房间，并且把与当前房间对象相关的所有资源释放掉。如果要再次加入房间，需要重新调用 {@link joinRoom}。
     *
     * @returns
     * - 如果方法调用成功，则返回房间的全局状态。
     * - 如果方法调用失败，则返回错误信息。
     */
    disconnect(): Promise<void>;

}

/**
 * 房间连接状态。
 */
export declare enum RoomPhase {
    /**
     * 连接中。
     */
    Connecting = "connecting",
    /**
     * 已连接。
     */
    Connected = "connected",
    /**
     * 正在重连。
     */
    Reconnecting = "reconnecting",
    /**
     * 正在断开连接。
     */
    Disconnecting = "disconnecting",
    /**
     * 已断开连接。
     */
    Disconnected = "disconnected",
}

/**
 * 没有可写权限的用户进行写操作时，SDK 的应对方式。
 */
export declare enum RoomErrorLevel {
    /**
     * 直接报错。
     */
    ThrowError = "throwError",
    /**
     * 拦截该操作，并在浏览器的控制台打印警告。
     */
    Warn = "warn",
    /**
     * 拦截该操作，但不报错也不打印警告。
     */
    Ignore = "ignore",
}

/**
 * `RoomCallbacks` 包含白板房间的事件回调。该类型继承 {@link DisplayerCallbacks} 并增加以下成员：
 * 
 * - **onConnection**: *(duration: number)=>void*
 * 
 *    房间连接成功回调，报告已经建立 WebSocket 连接，将要进入初始化阶段。
 *    @param duration `duration` 建立连接的时间，单位是毫秒。
 *
 * - **onPhaseChanged**: *(phase: RoomPhase)=>void*
 *
 *    房间连接状态发生变化的回调。
 *    @param phase `phase` 房间的连接状态，详见 {@link RoomPhase}。你可以阅读[管理房间连接状态](/doc/whiteboard/javascript/whiteboard-sdk/basic-features/manage-room-phase)了解更多信息。
 * - **onRoomStateChanged**: *(modifyState: Partial<RoomState>)=>void*
 *
 *    房间状态属性发生变化回调。
 *
 *    该回调仅返回发生变化的房间状态属性，未发生变化的房间状态字段均为空。
 *    @param modifyState `modifyState` 发生变化的房间状态属性，详见 {@link RoomState}。
 *
 * - **onDisconnectWithError**: *(error: Error)=>void*
 *
 *    白板 SDK 与白板服务器连接中断回调。
 *    @param error `error` 错误信息。
 *
 * - **onObjectsLimit**: *limit: number, soft: boolean)=>void*
 * 
 *    白板中的元素数量超过限制回调。
 *   @param limit `limit` 白板中的元素数量限制。
 *   @param soft `soft` 是否为软限制：
 *      - `true`：软限制。当白板中的元素数量超过限制时，SDK 会发出警告，但仍可以插入白板元素。
 *      - `false`：硬限制。当白板中的元素数量超过限制时，SDK 会发出警告，本次添加元素操作无效，房间状态会被强制回退至操作前，且后端会将进行本次操作的用户踢出频道。
 * - **onKickedWithReason**: *(reason: string)=>void*
 *
 *    用户被服务器移出房间回调。
 *    @param reason `reason` 用户被移出房间的原因。
 *
 *    | `reason` 字段 | 描述                          |
 *    | :--------------| :--------------------------- |
 *    | kickByAdmin    | 被管理员踢出                   |
 *    | roomDelete     | 房间被删除                     |
 *    | roomZombie     | 房间不活跃                     |
 *    | roomBan        | 房间被封禁                     |
 *    | GatewayAdjust  | 网关调整                       |
 *    | replaceByOther | 被另一个用户顶替，当前用户被迫下线 |
 *    | crash          | 服务器崩溃                     |
 *
 * - **onCanUndoStepsUpdate**: *(canUndoSteps: number)=>void*
 *
 *    可撤销次数发生变化回调。
 *
 *    当本地用户调用 {@link undo} 撤销上一步操作时，会触发该回调，报告剩余的可撤销次数。
 *
 *    @param canUndoSteps `canUndoSteps` 剩余的可撤销次数。
 * - **onCanRedoStepsUpdate**: *(canRedoSteps: number)=>void*
 *
 *    可重做次数发生变化回调。
 *
 *    当本地用户调用 {@link undo} 重做上一步操作时，会触发该回调，报告剩余的可重做次数。
 *
 *    @param canRedoSteps `canRedoSteps` 剩余的可重做次数。
 * - **willInterceptKeyboardEvent**: *(event: KeyboardEvent)=>boolean*
 *
 *    是否拦截监听的键盘事件：
 *    - `true`: 拦截。拦截后，该键盘事件不会触发回调。
 *    - `false`: 不拦截。
 * - **onKeyDown**: *(event: KeyboardEvent)=>void*
 *
 *    键盘按下事件回调。
 * - **onKeyUp**: *(event: KeyboardEvent)=>void*
 *
 *    键盘松开事件回调。
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
 * 场景定义。
 */
export declare type SceneDefinition = {
    /**
     * 场景名称。
     */
    name?: string;
    /**
     * 在场景中展示的图片或动态 PPT。每个场景中可以展示一张图片或一页动态 PPT，你可以通过 `PptDescription` 设置待插入图片或动态 PPT 的宽、高、资源地址或预览图等。详见 {@link PptDescription}。
     */
    ppt?: PptDescription;
};

/**
 * `Player` 接口继承 `Displayer` 接口，并且增加用于操作白板回放的属性。
 */
export declare interface Player extends Displayer {
    /**
     * 回放录像所属房间的 UUID。
     */
    readonly roomUUID: string;

    /**
     * 当前录像所属分片的 UUID。
     */
    readonly slice: string;

    /**
     * 是否能立即播放（可能会缓冲）。
     *
     * @since 2.9.16
     *
     * - `true`：可以立即播放。
     * - `false`：不能立即播放。
     */
    readonly isPlayable: boolean;

    /**
     * 回放的阶段，详见 {@link PlayerPhase}。
     */
    readonly phase: PlayerPhase;

    /**
     * 回放的状态，详见 {@link PlayerState}。
     */
    readonly state: PlayerState;

    /**
     * 回放的进度，单位为毫秒。录像开始时为 `0`。
     */
    readonly progressTime: number;

    /**
     * 回放的总时长，单位为毫秒。
     */
    readonly timeDuration: number;

    /**
     * 回放的总帧数。
     */
    readonly framesCount: number;

    /**
     * 回放的起始时间（Unix 时间戳，单位为毫秒）。
     */
    readonly beginTimestamp: number;

    /**
     * 回放的播放倍速。取值必须大于 `0`，设为 `1` 表示按原速播放。
     */
    playbackSpeed: number;

    /**
     * 开始白板回放。
     *
     * 暂停回放后，可以调用该方法继续回放。
     */
    play(): void;

    /**
     * 暂停白板回放。
     */
    pause(): void;

    /**
     * 停止白板回放。
     *
     * 白板回放停止后，`Player` 资源会被释放。如果想要重新播放，需要重新初始化 `Player` 对象。
     */
    stop(): void;

    /**
     * 跳转到指定回放位置。
     *
     * @since v2.15.0
     *
     * 白板回放的起始时间点为 0，你可以调用该方法，跳转到指定的回放位置。
     *
     * 成功调用该方法后，SDK 会返回 `PlayerSeekingResult`，报告定位回放的结果。
     *
     * @param progressTime 指定的回放位置，单位为毫秒。
     * @returns 定位回放的结果。详见 {@link PlayerSeekingResult}。
     */
    seekToProgressTime(progressTime: number): Promise<PlayerSeekingResult>;

    /**
     * 设置白板回放的观看模式。
     *
     * @param observerMode 白板回放的观看模式，详见 {@link ObserverMode}。
     */
    setObserverMode(observerMode: ObserverMode): void;
}

/**
 * 白板回放的阶段。
 */
export declare enum PlayerPhase {
    /**
     * 正在等待白板回放的第一帧。这是白板回放的初始阶段。
     */
    WaitingFirstFrame = "waitingFirstFrame",
    /**
     * 白板回放正在进行。
     */
    Playing = "playing",
    /**
     * 白板回放已暂停。
     */
    Pause = "pause",
    /**
     * 白板回放已停止。
     */
    Stopped = "stop",
    /**
     * 白板回放已结束。
     */
    Ended = "ended",
    /**
     * 白板回放正在缓存。
     */
    Buffering = "buffering",
}

/**
 * `Player` 对象的状态。该类型继承 {@link DisplayerState} 且包含以下成员：
 * - **observerMode**: *ObserverMode*
 *
 * 白板回放的观看模式，详见 {@link ObserverMode}。
 */
export declare type PlayerState = DisplayerState & {
    observerMode: ObserverMode;
};

/**
 * `PlayerCallbacks` 包含白板回放的事件回调。该类型继承 {@link DisplayerCallbacks} 且包含以下成员：
 *
 * - **onIsPlayableChanged**: *(isPlayable: boolean)=>void*
 *
 *    `isPlayable` 发生改变的回调。
 *    @param isPlayable `isPlayable` 是否能立即播放：
 *
 *    - `true`：可以立即播放。
 *    - `false`：不能立即播放。
 *
 * - **onPhaseChanged**: *(phase: PlayerPhase)=>void*
 *
 *    回放阶段发生改变的回调。
 *    @param phase `phase` 回放阶段。
 * - **onLoadFirstFrame**: *()=>void*
 *
 *    首帧加载完成的回调。
 * - **onPlayerStateChanged**: *(modifyState: Partial<PlayerState>)=>void*
 *
 *    回放状态发生改变的回调。
 *    @param modifyState `modifyState` 回放状态。
 * - **onStoppedWithError**: *(error: Error)=>void*
 *
 *    出错导致回放暂停的回调。
 *    @param error `error` 错误信息。
 * - **onProgressTimeChanged**: *(progressTimestamp: number)=>void*
 *
 *    回放进度发生改变的回调。
 *    @param progressTimestamp `progressTimestamp` 回放进度。
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
 * 视角状态，包含视角为主播模式的用户信息。
 */
export declare type BroadcastState = {
    /**
     * 用户的视角模式。
     */
    mode: ViewMode;
    /**
     * 主播模式用户的用户 ID。若没有主播模式的用户，则为 `undefined`。
     */
    broadcasterId?: number;
};

/**
 * 白板回放的观看模式。
 */
export declare enum ObserverMode {
    /**
     * （默认）跟随模式。
     * 在跟随模式下，用户观看白板回放时的视角跟随规则如下：
     * - 如果录制的实时房间中有主播，则跟随主播的视角。
     * - 如果录制的实时房间中没有主播，即跟随用户 ID 最小的具有读写权限用户（即房间内的第一个互动模式的用户）的视角。
     * - 如果录制的实时房间中既没有主播，也没有读写权限的用户，则以白板初始化时的视角（中心点在世界坐标系的原点，缩放比例为 1.0）观看回放。
     *
     * **Note**
     *
     * 在跟随模式下，如果用户通过触屏手势调整了视角，则会自动切换到自由模式。
     */
    Directory = "directory",
    /**
     * 自由模式。
     *
     * 在自由模式下，用户观看回放时可以自由调整视角。
     */
    Freedom = "freedom",
}

/**
 * 实时房间内互动模式（具有读写权限）用户的信息。
 */
export declare type RoomMember = {
    /**
     * 用户 ID。
     *
     * 在用户加入互动白板实时房间时，会自动分配用户 ID，用于标识房间内的用户。同一房间中的每个用户具有唯一的用户 ID。
     */
    memberId: number;
    /**
     * 用户所有的白板工具状态，详见 {@link MemberState}。
     */
    memberState: MemberState;
    /**
     * 当前的 session ID。
     */
    session: string;
    /**
     * 自定义用户信息，在用户加入房间时传入。详见 {@link UserPayload}。
     *
     * @since v2.15.0
     */
    payload: UserPayload;
};

/**
 * 自定义用户信息。
 *
 * - **[key: string]**: *any*
 *
 *   key-value 结构的自定义用户信息，例如，`"avatar", "https://example.com/user.png"`。
 *
 * - **uid**: *string*
 *
 *   用户标识，字符串格式，不能超过 1024 字节。
 *
 *   请确保同一房间内每个用户 `uid` 的唯一性。
 *
 *   @since v2.15.0
 */
export declare type UserPayload = {
    [key: string]: any;
} & {
    uid: string;
};

/**
 * 互动白板实时房间的所有状态。该类继承 {@link DisplayerState} 且包含以下成员：
 *
 * - **memberState**: *MemberState*
 *
 *   当前使用的白板工具，详见 {@link MemberState}。
 * - **broadcastState**: *Readonly<BroadcastState>*
 *
 *   当前的视角状态。
 */
export declare type RoomState = DisplayerState & {
    memberState: MemberState;
    broadcastState: Readonly<BroadcastState>;
};

/**
 * 场景状态。
 */
export declare type SceneState = {
    /**
     * 当前场景目录下所有场景的列表。
     */
    scenes: ReadonlyArray<WhiteScene>;
    /**
     * 当前场景的路径。
     */
    scenePath: string;
    /**
     * 当前场景的名称。
     *
     * @since 2.10.3
     */
    sceneName: string;
    /**
     * 当前场景所属场景目录的路径。
     *
     * @since 2.10.3
     */
    contextPath: string;
    /**
     * 当前场景在所属场景目录中的索引号。
     */
    index: number;
};

/**
 * `Displayer` 对象的 Consumer。
 */
export declare const DisplayerConsumer: Consumer<Displayer>;

/**
 * `Room` 对象的 Consumer。
 */
export declare const RoomConsumer: Consumer<Room | undefined>;

/**
 * `Player` 对象的 Consumer。
 */
export declare const PlayerConsumer: Consumer<Player | undefined>;

/**
 * 互动白板实时房间的白板工具状态。
 */
export declare type MemberState = {
    /**
     * 当前使用的白板工具名称，详见 {@link ApplianceNames}。
     */
    currentApplianceName: ApplianceNames;
    /**
     * 绘制线条的颜色，为 RGB 格式，例如 `[0, 0, 255]` 表示蓝色。
     */
    strokeColor: Color;
    /**
     * 字体颜色，为 RGB 格式，例如 `[0, 0, 255]` 表示蓝色。
     */
    textColor?: Color;
    /**
     * 绘制线条的粗细。
     */
    strokeWidth: number;
    /**
     * 字体大小，取值必须大于 0。Chrome 浏览器对于小于 12 的字体会自动调整为 12。
     */
    textSize: number;
    /**
     * 是否加粗：
     *
     * - `true`：加粗。
     * - `false`：（默认）不加粗。
     */
    bold?: boolean;
    /**
     * 是否使用斜体：
     *
     * - `true`：使用斜体。
     * - `false`：（默认）不使用斜体。
     *
     */
    italic?: boolean;
    /**
     * 是否加下划线：
     *
     * - `true`：加下划线。
     * - `false`：（默认）不加下划线。
     */
    underline?: boolean;
    /**
     * 是否加删除线：
     *
     * - `true`：加删除线。
     * - `false`：（默认）不加删除线。
     */
    lineThrough?: boolean;
    /**
     * 是否支持绘制虚线（仅限铅笔工具）：
     * 
     * - `true`：支持绘制虚线。
     * - `false`：（默认）不支持绘制虚线。
     */
    dottedLine?: boolean;
    /**
     * 绘制图形的类型。
     */
    shapeType?: ShapeType;
    /**
     * 是否允许直接选择并编辑文字：
     * 
     * - `true`：允许直接选择并编辑文字。
     * - `false`：（默认）不允许直接选择并编辑文字。 
     */
    textCanSelectText?: boolean;
    /**
     * 设置图形元素的填充色。仅适用于圆、矩形等封闭图形。
     */
    fillColor?: Color;
    /**
     * 设置文本工具的默认字体大小。如果不设置则默认使用 `textSize`，即上一次设置的文字大小。
     */
    textSizeOverride?: number;
    /**
     * 是否在使用文字工具打完字后自动切到选择工具：
     *
     * - `true`：自动切换。
     * - `false`：（默认）不自动切换。
     */
    textCompleteToSelector?: boolean;
    /**
     * 是否在画完矩形后自动切到选择工具：
     *
     * - `true`：自动切换。
     * - `false`：（默认）不自动切换。
     */
    rectangleCompleteToSelector?: boolean;
    /**
     * 是否在画完圆形后自动切到选择工具：
     *
     * - `true`：自动切换。
     * - `false`：（默认）不自动切换。
     */
    ellipseCompleteToSelector?: boolean;
    /**
     * 是否在画完直线后自动切到选择工具：
     *
     * - `true`：自动切换。
     * - `false`：（默认）不自动切换。
     */
    straightCompleteToSelector?: boolean;
    /**
     * 是否在画完箭头后自动切到选择工具：
     *
     * - `true`：自动切换。
     * - `false`：（默认）不自动切换。
     */
    arrowCompleteToSelector?: boolean;
    /**
     * 是否在画完三角、气泡等图形后自动切到选择工具：
     *
     * - `true`：自动切换。
     * - `false`：（默认）不自动切换。
     */
    shapeCompleteToSelector?: boolean;
};

/**
 * 图形的种类。
 *
 * @since 2.12.0
 */
 export declare enum ShapeType {
    /**
     * 三角形。
     */
    Triangle = "triangle",
    /**
     * 菱形。
     */
    Rhombus = "rhombus",
    /**
     * 五角星。
     */
    Pentagram = "pentagram",
    /**
     * 对话气泡。
     */
    SpeechBalloon = "speechBalloon",
}

/**
 * 白板工具名称。
 */
export declare enum ApplianceNames {
    /**
     * 选择工具。
     */
    selector = "selector",
    /**
     * 点选工具。目前主要用于点击和选择 HTML5 文件上的内容。
     */
    clicker = "clicker",
    /**
     * 激光笔。
     */
    laserPointer = "laserPointer",
    /**
     * 铅笔。
     */
    pencil = "pencil",
    /**
     * 矩形工具。
     */
    rectangle = "rectangle",
    /**
     * 椭圆工具。
     */
    ellipse = "ellipse",
    /**
     * 图形工具。
     */
    shape = "shape",
    /**
     * 用于擦除局部铅笔笔迹的橡皮工具。该工具仅对 NewPencil 生效，使用前需要先设置 disableNewPencil 为 false。
     */
    pencilEraser = "pencilEraser",
     /**
     * 橡皮工具。
     */
    eraser = "eraser",
    /**
     * 文字工具。
     */
    text = "text",
    /**
     * 直线工具。
     */
    straight = "straight",
    /**
     * 箭头工具。
     */
    arrow = "arrow",
    /**
     * 抓手工具。
     */
    hand = "hand",
}

/**
 * 组件插件的外观设置。
 */
export declare type PluginProps<C, T> = {
    /**
     * 组件插件对象。
     */
    plugin: PluginInstance<C, T>;
    /**
     * 组件插件图标周围的空白。
     */
    margin: Margin;
    /**
     * 组件插件图标的中心点在世界坐标系中（以白板初始化时的中心点为原点的坐标系）的坐标。
     */
    origin: Point;
    /**
     * 组件插件图标的大小。
     */
    size: Size;
    /**
     * 组件插件图标的缩放比例。
     */
    scale: number;
    /**
     * @ignore
     */
    cnode?: any;
};

/**
 * 组件插件对象的接口。
 */
export declare interface PluginInstance<C, A> {
    /**
     * 组件插件的类型，是组件插件的唯一标识符。
     */
    readonly kind: string;

    /**
     * 组件插件对象在房间内的唯一标识符。
     */
    readonly identifier: Identifier;

    /**
     * 自定义的组件插件上下文。
     */
    readonly context: C;

    /**
     * 组件插件对象的左上角在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标。
     */
    readonly originX: number;

    /**
     * 组件插件对象的左上角在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标。
     */
    readonly originY: number;

    /**
     * 组件插件对象的宽。
     */
    readonly width: number;

    /**
     * 组件插件对象的高。
     */
    readonly height: number;

    /**
     * 能否选中组件插件对象：
     * - `true`：能选中组件插件对象。
     * - `false`：不能选中组件插件对象。
     */
    readonly selectable: boolean;

    /**
     * 是否正在拖拽组件插件对象。
     * - `true`：在拖拽。
     * - `false`：不在拖拽。
     *
     */
    readonly isDraging: boolean;

    /**
     * 是否正在改变组件插件对象的大小。
     * - `true`：在改变。
     * - `false`：不在改变。
     */
    readonly isResizing: boolean;

    /**
     * 是否正在播放组件插件对象。
     * - `true`：在播放。在白板实时房间内，取值一直为 `true`。
     * - `false`：不在播放。
     */
    readonly isPlaying: boolean;

    /**
     * 组件插件对象当前播放位置的 Unix 时间戳（若为实时房间，则恒为 0）。
     */
    readonly playerTimestamp: number;

    /**
     * 组件插件对象当前的播放速率倍率（若为实时房间，则恒为 `1.0`）。
     */
    readonly playbackSpeed: number;

    /**
     * 组件插件对象的属性。
     */
    attributes: A;

    /**
     * 修改组件插件属性中的部分字段。
     * @param attributes 要修改的字段。
     */
    putAttributes(attributes: Partial<A>): void;

    /**
     * 删除组件插件属性中的部分字段。
     * @param keys 要删除的字段。
     */
    removeAttributeKeys<K extends string>(...keys: K[]): void;

    /**
     * 修改组件插件对象的描述。
     * @param description 要修改的描述。
     */
    update(description: PluginDescription<A>): void;

    /**
     * 删除组件插件对象。
     */
    remove(): void;

}
/**
 * 组件插件对象的描述。
 */
export declare type PluginDescription<A = any> = {
    /**
     * 组件插件对象的左上角在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标。
     */
    originX?: number;
    /**
     * 组件插件对象的左上角在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标。
     */
    originY?: number;
    /**
     * 组件插件对象的宽。
     */
    width?: number;
    /**
     * 组件插件对象的高。
     */
    height?: number;
    /**
     * 能否选中组件插件对象：
     * - `true`：能选中。
     * - `false`：不能选中。
     */
    selectable?: boolean;
    /**
     * 组件插件对象的属性。
     */
    attributes?: A;
};

/**
 * 颜色，RGB 格式。例如， `[0, 0, 255]` 代表蓝色。
 */
export declare type Color = number[];


/**
 * 实时房间的公共全局变量。
 *
 * 房间内所有用户看到的都是相同的 `globalState`，所有互动模式用户都可以读写。修改 `globalState` 属性会立即生效并同步给所有用户。
 */
export declare type GlobalState = {
};

/**
 * 图片或动态 PPT 页的描述。
 *
 * 你可以在初始化 `WhiteScene` 时配置 `PptDescription`，以在白板上插入图片或动态 PPT。
 *
 * 支持的图片或动态 PPT 格式包括：
 * - PNG、JPG/JPEG、WEBP 格式的图片，或由 PPT、PPTX、DOC、DOCX、PDF 格式的文件转换成 PNG、JPG/JPEG、WEBP 格式的图片。
 * - 使用 [文档转换功能](/doc/whiteboard/javascript/whiteboard-sdk/advanced-features/convert-files)转换过的 PPTX 文件。
 *
 * **Note**
 * - 一个场景只能插入一张图片或动态 PPT 页。
 * - 插入的图片或动态 PPT 页的中心点坐标默认为世界坐标系的原点。图片或动态 PPT 页插入场景后，你无法改变它在白板上的位置。
 */
export declare type PptDescription = {
    /**
     * 图片或动态 PPT 页的地址，支持的格式如下：
     * - 图片：URL 地址，可以是你自己生成的 URL 地址，也可以是通过文档转换功能生成的 URL 地址，例如，`"https://docs-test-xxx.oss-cn-hangzhou.aliyuncs.com/staticConvert/2fdxxxxx67e/1.jpeg"`。
     * - 动态 PPT 页：通过文档转换功能生成的 URI 地址，例如，`"pptx://cover.herewhite.com/dynamicConvert/6a212c90fa5311ea8b9c074232aaccd4/1.slide"`。
     */
    src: string;
    /**
     * 图片或动态 PPT 在白板中的宽度，单位为像素。
     */
    width: number;
    /**
     * 图片或动态 PPT 在白板中的高度，单位为像素。
     */
    height: number;
    /**
     * 图片或动态 PPT 预览图的 URL 地址。动态 PPT 预览图的 URL 地址可以从[查询转换任务进度](/doc/whiteboard/restful/whiteboard-sdk/restful-wb/operations/get-v5-projector-tasks-uuid)中的 `previews` 字段获取，例如，"https://docs-test-xxx.oss-cn-hangzhou.aliyuncs.com/dynamicConvert/2fdxxxxx67e/preview/1.png"。
     */
    previewURL?: string;
};

/**
 * 图片的描述。
 */
export declare type ImageInformation = {
    /**
     * 图片的 UUID，即图片在互动白板实时房间中的唯一标识符。
     */
    uuid: string;
    /**
     * 图片的中心在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标。
     */
    centerX: number;
    /**
     * 图片的中心在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标。
     */
    centerY: number;
    /**
     * 图片的宽度，单位为像素。如果图片的宽度超出视角的边界，用户将看不到超出部分。
     */
    width: number;
    /**
     * 图片的高度，单位为像素。如果图片的高度超出视角的边界，用户将看不到超出部分。
     */
    height: number;
    /**
     * 图片是否被锁定。
     * - `true`: 图片被锁定。锁定一张图片后，用户无法移动或缩放该图片。
     * - `false`: 图片没有被锁定。
     */
    locked: boolean;
    /**
     * 图片是否只能等比放缩。
     *
     * @since  2.12.0
     *
     * - `true`: 只能等比缩放。
     * - `false`: 可以非等比缩放。
     */
    uniformScale?: boolean;
    /**
     * 是否以跨域方式加载图片。
     *
     * @since  2.16.48
     *
     * - `true`: （默认）以跨域方式加载图片。
     * - `false`: 不以跨域方式加载图片。
     */
    crossOrigin?: boolean | string;
};

/**
 * 配置视觉矩形。
 *
 * 视觉矩形是用户的视角必须容纳的区域。设置好视觉矩形后，SDK 会自动将视角会调整到刚好可以完整展示视觉矩形所表示的范围。
 *
 * 你可以根据要展示的 PPT 幻灯片或图像的尺寸设置视觉矩形，以确保相同的内容在不同尺寸的屏幕上都可以完整显示。
 */
export declare type WorldViewRectangle = {
    /**
     * 视觉矩形左上角在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 X 轴坐标。
     */
    originX: number;
    /**
     * 视觉矩形左上角在世界坐标系（以白板初始化时的中心点为原点的坐标系）中的 Y 轴坐标。
     */
    originY: number;
    /**
     * 视觉矩形的宽度。
     *
     * 视觉矩形的宽度不能小于实际展示内容的宽度，否则用户将看不见超出的部分。
     */
    width: number;
    /**
     * 视觉矩形的高度。
     *
     * 视觉矩形的高度不能小于实际展示内容的宽度，否则用户将看不见超出的部分。
     */
    height: number;
};

/**
 * 添加自定义的图标。
 *
 * @param icons 自定义的图标。
 */
export declare function injectCustomStyle(icons: UserCursorIcons): void;

/**
 * 光标名称。
 */
export declare enum CursorNames {
    /**
     * 张开的手。
     */
    Hand = "cursor-hand",
    /**
     * 握紧的手。
     */
    HandGrasp = "cursor-hand-grasp",
    /**
     * 激光笔。
     */
    LaserPointer = "cursor-laserPointer",
    /**
     * 选择器。
     */
    Selector = "cursor-selector",
    /**
     * 铅笔。
     */
    Pencil = "cursor-pencil",
    /**
     * 橡皮擦。
     */
    Eraser = "cursor-eraser",
    /**
     * 矩形。
     */
    Rectangle = "cursor-rectangle",
    /**
     * 椭圆。
     */
    Ellipse = "cursor-ellipse",
    /**
     * 图形。
     */
    Shape = "cursor-shape",
    /**
     * 直线。
     */
    Straight = "cursor-straight",
    /**
     * 箭头。
     */
    Arrow = "cursor-arrow",
    /**
     * 文字。
     */
    Text = "cursor-text",
    /**
     * 指向西北和东南的双向箭头。
     */
    Nwse = "cursor-nwse",
    /**
     * 指向东北和西南的双向箭头。
     */
    Nesw = "cursor-nesw",
    /**
     * 指向南北的双向箭头。
     */
    Ns = "cursor-ns",
    /**
     * 指向东西的双向箭头。
     */
    Ew = "cursor-ew",
    /**
     * 旋转箭头。
     *
     * @since v2.16.0
     */
    Rotation = "cursor-rotation",
    /**
     * 不可点区域的默认光标。
     */
     Ban = "ban",
}

/**
 * 屏幕类型。
 */
export declare enum ScreenType {
    /**
     * 桌面设备的屏幕。
     */
    Desktop = "desktop",
    /**
     * 智能手机的屏幕。
     */
    Phone = "phone",
    /**
     * 平板电脑的屏幕。
     */
    Pad = "pad",
    /**
     * 电视的屏幕。
     */
    TV = "tv",
}

/**
 * `WhiteWebSdk` 对象的配置。
 *
 * **Note**
 *
 * 成功初始化 `WhiteWebSdk` 后，无法再调用 `WhiteWebSdkConfiguration` 中的任何方法修改 `WhiteWebSdk` 的配置。
 */
export declare type WhiteWebSdkConfiguration = {
    /**
     * 白板项目的唯一标识。详见[获取互动白板项目的安全密钥](/doc/whiteboard/javascript/whiteboard-sdk/get-started/enable-service#获取互动白板项目的安全密钥)。
     */
    appIdentifier: string;
    /**
     * 数据中心，支持传入以下值：
     *
     * | `region` | 数据中心 | 服务区                         |
     * | -------- | -------- | ------------------------------ |
     * | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
     * | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
     * | `in-mum` | 印度孟买 | 印度                           |
     * | `eu` | 欧洲（法兰克福） | 欧洲                           |
     * | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
     *
     * **Note**
     *
     * 该方法设置的数据中心必须与[创建房间](/doc/whiteboard/restful/whiteboard-sdk/restful-wb/operations/post-v5-rooms)时设置的数据中心一致；否则，SDK 将无法连接到房间。
     */
    region?: string;
    /**
     * 是否用 MobX 监听 `displayer.state`：
     * - `true`：用 MobX 监听 `displayer.state`。此时 `displayer.state` 会变成 MobX observable object，详见 [Creating observable state](https://mobx.js.org/observable-state.html#observable)。
     * - `false`：不用 MobX 监听 `displayer.state`。
     */
    useMobXState?: boolean;
    /**
     * 该客户端的设备类型，决定 SDK 如何处理鼠标事件和触碰事件。
     *
     * 如果填写错误，会导致 SDK 对设备输入的响应行为不符合预期。如果不填，SDK 会根据内在逻辑自动判断设备的类型。
     */
    deviceType?: DeviceType;
    /**
     * 该客户端的屏幕类型，用于调整手势识别参数。默认为 `Desktop`。
     */
    screenType?: ScreenType;
    /**
     * 白板上绘画的渲染模式。默认为 `Canvas`。
     */
    renderEngine?: RenderEngine;
    /**
     * 自定义字体。
     *
     * 为显示动态 PPT 中的非常规字体，你需要先将字体文件上传到自己的业务服务器或云存储中并生成 URL 地址，然后在初始化 `WhiteWebSdk` 时，将 URL 地址传给 `fonts` 属性。详见 {@link UserFonts}。
     */
    fonts?: UserFonts;
    /**
     * 抓手工具对应的快捷键。
     *
     * 按下该键时，会自动切换成抓手工具（`currentApplianceName="hand"`）；松开后，切回原来的工具。如果不传，则关闭该快捷键功能。
     */
    handToolKey?: string;
    /**
     * 文字工具（`currentApplianceName="text"`）的字体。若不传，SDK 会使用浏览器的默认字体。
     */
    fontFamily?: string;
    /**
     * 是否在加载动态 PPT 首页时，一次性加载动态 PPT 中的所有图片资源：
     * - `true`：一次性加载所有动态 PPT。
     * - `false`: （默认）不一次性加载所有动态 PPT。
     *
     * **Note**
     *
     * Agora 不推荐设置 `preloadDynamicPPT(true)`，这样会使 PPT 显示缓慢。
     */
    preloadDynamicPPT?: boolean;
    /**
     * SDK 上报日志的选项，详见 {@link LoggerOptions}。
     */
    loggerOptions?: LoggerOptions;
    /**
     * 是否关闭新铅笔工具（`pencil`）的补间动画功能：
     * - `true`：关闭补间动画功能。关闭该功能后，会缩短延时，但远端用户看到的笔迹绘制过程可能出现卡顿。
     * - `false`：（默认）开启补间动画功能。开启后，当本地用户使用 `pencil` 在白板上绘制或书写时，SDK 会自动在关键帧之间插入帧，使远端用户看到的书写或绘制过程更加流畅，但会因此增加延时。
     *
     * @note 该属性仅在 `disableNewPencil` 设为 `fasle` 时生效。
     */
     disableCurveAnimes?: boolean;
     /**
      * 是否关闭新铅笔的笔锋效果：
      *
      * - `true`：关闭笔锋效果。
      * - `false`：（默认）开启笔锋效果。
      *
      * @note 该属性仅在 `disableNewPencil` 设为 `fasle` 时生效。
      */
     disableNewPencilStroke?: boolean;
     /**
      * 是否关闭图片旋转：
      *
      * - `true`：禁止图片旋转。
      * - `false`：（默认）开启图片旋转。开启后，可对选中的图片任意旋转。
      *
      */
     disableRotation?: boolean;
    /**
     * 断线重连设置。默认开启自动断线重连。
     *
     * 如果要关闭断线重连，你可以将 `reconnectionOptions` 设为 `false` 或将 `disableReconnect` 设为 `true`。
     * 详见[《实时房间状态管理》](https://developer.netless.link/document-zh/home/room-state-management)。
     */
    reconnectionOptions?: Partial<ReconnectionOptions> | false;
    /**
     * 是否开启仅接收远端用户状态改变回调：
     * - `true`：（默认）开启。开启该功能后，本地用户仅会接收到远端用户状态改变的回调，自身状态的改变不会触发回调。
     * - `false`：关闭。关闭该功能后，本地用户会接收到远端用户状态改变的回调，也会接收到自身状态改变的回调。
     *
     */
    onlyCallbackRemoteStateModify?: boolean;
    /**
     * 组件插件。
     */
    plugins?: Plugins;
    /**
     * 不可见插件。
     */
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    /**
     * 由 `React.ComponentType` 类型组成的数组，用于包装白板的界面。默认值为 []。
     *
     * 你可以使用如下代码对白板的界面进行自定义包装：
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
    // /**
    //  *
    //  * 动态 PPT 专用参数。详见 {@link PptParams}。
    //  */
    // pptParams?: PptParams;
    urlInterrupter?:
    /**
     * 将白板中图片等资源的 URL 拦截并替换。
     *
     * 例如，你可以使用如下代码给所有图片的 URL 增加尾缀：
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
     * @param url 图片等资源原来的 URL。
     * @returns 替换后的 URL。
     */
    (url: string)=>string;
    onWhiteSetupFailed?:
    /**
     * `WhiteWebSdk` 初始化失败的回调。
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
     * 该回调仅用于网络或鉴权失败时的错误处理。如果是因为参数原因初始化失败，会在调用 `new WhiteWebSdk({...})` 时提示发生错误。
     *
     * @param error 错误信息。
     */
    (error: Error)=>void;
};

/**
 * {@link Room} 对象和 {@link Room} 对象共用的参数配置。
 */
export declare type ConstructRoomParams = {
    /**
     * 设置鼠标的光标适配器，详见 [《鼠标光标适配器》](https://developer.netless.link/javascript-zh/home/cursor-adapter)。
     * 设置为 `false` 将不再显示内部预设光标 (激光笔、橡皮擦等)。
     */
    cursorAdapter?: CursorAdapter | false;
    /**
     * 是否关闭自动适配尺寸功能。
     * - `true`：关闭自动适配尺寸功能。关闭后，如果视角的尺寸发生改变，必须主动调用 `refreshViewSize` 来保证适配。
     * - `false`：（默认）启用自动适配尺寸功能。
     */
    disableAutoResize?: boolean;
    /**
     * 是否禁止用户通过触屏手势或鼠标滚轮移动或缩放调整视角。
     * - `true`：禁止用户调整视角。
     * - `false`：（默认）允许用户调整视角。
     *
     * 该属性不会影响 `setCameraBound`、`moveCamera`、`moveCameraToContain` 方法的使用。
     */
    disableCameraTransform?: boolean;
    /**
     * 不可见插件列表。
     */
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    /**
     * 由 `React.ComponentType` 类型组成的数组，用于自定义包装白板的界面。默认值为 []。
     */
    wrappedComponents?: WrappedComponents;
    /**
     * 设置视角边界，即用户可以自由移动视角的范围。默认值为 `undefined`，表示视角没有任何限制。
     */
    cameraBound?: CameraBound;
    /**
     * 是否隐藏其他人的鼠标移动到白板组件上时显示的高亮框。
     *
     * @since 2.12.0
     *
     * - `true`：隐藏其他人的高亮框。
     * - `false`：显示其他人的高亮框。
     *
     * 该属性不影响自己的高亮框显示。
     */
    disableOthersSelectingBox?: boolean;
    /**
     * 是否允许按住 `command` 键并滑动鼠标滚轮来放大或缩小白板。
     * 
     * @since 2.16.51
     *
     * - `true`：允许按住 `command` 键并滚动来放大缩小白板。
     * - `false`：(默认)不允许按住 `command` 键并滚动来放大缩小白板。
     *
     * @note
     * - 该属性仅使用于 macOS 系统。
     * - 该属性不影响 `control` 滚轮的放大缩小行为。
     * 
     */
    commandWheelToZoom?: boolean;
};

/**
 * {@link Room} 对象的参数设置，用于加入互动白板实时房间。该类型继承 {@link ConstructRoomParams} 且包含以下属性：
 *
 * - **uuid**: *string*
 *
 *   房间的 UUID，即房间的唯一标识符。成功创建房间后会返回该属性。
 *
 * - **uid**: *string*
 *
 *   用户的 UID，即用户的唯一标识符，字符串格式，不能超过 1024 字节。请确保同一房间内每个用户 `uid` 的唯一性。
 *
 * - **region?**: *string*
 *
 *   连接的数据中心，支持传入以下值：
 *
 *   | `region` | 数据中心 | 服务区                         |
 *   | -------- | -------- | ------------------------------ |
 *   | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
 *   | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
 *   | `in-mum` | 印度孟买 | 印度                           |
 *   | `eu` | 欧洲（法兰克福） | 欧洲                           |
 *   | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
 *
 *   **Note**
 *   - 该属性必须与要加入的互动白板实时房间所在数据中心一致，否则无法加入房间。
 *   - 该属性与 {@link WhiteWebSdkConfiguration} 中的 `region` 作用相同，二者只需要设置其中一个。如果同时设置，该属性会覆盖 `WhiteWebSdkConfiguration` 中的 `region`。
 * - **roomToken**: *string*
 *
 *   房间的 Room Token，用于加入房间时的用户鉴权。详见[互动白板 Token 概述](/doc/whiteboard/javascript/whiteboard-sdk/overview/concepts#token)。
 * - **userPayload?**: *{[key: string]: any;}*
 *
 *   自定义用户信息。该属性可以是任意类型的数据结构。
 *
 *   房间内其他用户可以通过如下代码读取特定用户在加入房间时设置的 `userPayload`：
 *
 * @example
 * ```javascript
 * for (var member of room.state.roomMembers) {
 *     // 读取房间内某个用户的 userPayload 字段
 *     console.log(member.userPayload);
 * }
 * ```
 * - **isWritable?**: *boolean*
 *
 *    用户在房间中是否为互动模式（具有读写权限）。
 *    - `true`： （默认）互动模式，即具有读写权限。
 *    - `false`：订阅模式，即具有只读权限。
 *
 *    该方法与 `disableDeviceInputs` 的区别详见 [《只读模式｜禁止操作》](https://developer.netless.link/javascript-zh/home/disable#只读模式)。
 * - **disableDeviceInputs?**: *boolean*
 *
 *    是否禁止用户通过鼠标、键盘、触摸屏幕操作白板工具。
 *    - `true`： 禁止用户操作白板工具。
 *    - `false`：（默认）允许用户操作白板工具。
 *
 *    该方法与 `isWritable` 的区别详见[《禁止设备操作｜禁止操作》](https://developer.netless.link/javascript-zh/home/disable#禁止设备操作)。
 * - **enableDrawPoint?**: *boolean*
 *
 *   是否允许使用铅笔工具（`pencil`）画点。
 *   - `true`： 允许。
 *   - `false`：（默认）不允许。此时使用铅笔工具单击白板绘制的点不会保留在屏幕上。
 *
 *   **Note**
 *
 *   该属性只有在 `disableNewPencil` 设为 `false` 时生效。
 *
 * - **disableNewPencil?**: *boolean*
 *
 *   **自从：2.12.5**
 *
 *   关闭/开启新铅笔工具：
 *   - `true`:（默认）关闭新铅笔工具。
 *   - `false`: 开启新铅笔工具。开启后，SDK 会对铅笔工具（`pencil`）应用新版笔迹平滑算法，使书写笔迹更加流畅自然，并带有笔锋效果。
 *
 *  **Note**
 *
 *   为正常显示笔迹，在开启新铅笔前，请确保该房间内的所有用户使用如下 SDK：
 *      - Android SDK 2.12.3 或更高版本
 *      - iOS SDK 2.12.3 或更高版本
 *      - Web SDK 2.12.5 或更高版本
 *
 * - **disableMagixEventDispatchLimit?**: *boolean*
 *
 *   **自从：2.15.0**
 *
 *   是否关闭发送自定义事件的频率限制：
 *   - `true`：关闭频率限制。可能会出现卡顿。
 *   - `false`：（默认）开启频率限制。开启后，SDK 每隔 75 ms 发送一个事件。
 *
 * - **disableEraseImage?**: *boolean*
 *
 *    是否禁止橡皮擦除白板上的图片：
 *    - `true`： 禁止擦除。
 *    - `false`：（默认）允许擦除。
 *
 * - **disablePencilWrittingLimitFrequency**?: *boolean*
 *
 *   **自从：2.15.2**
 *
 *   使用 `pencil` 书写时，是否关闭笔迹同步的频率限制：
 *   - `true`：关闭频率限制。笔迹会立即同步，但是可能会增加 CPU 性能消耗。
 *   - `false`：（默认）开启频率限制。笔迹同步会有轻微延迟，但是可以降低 CPU 性能消耗。
 *
 * - **floatBar?**: *boolean | Partial<FloatBarOptions>*
 *
 *    当 `currentApplianceName` 设为 `selector` 或 `text` 时，是否出现浮动条：
 *     - `true`： 出现浮动条。
 *     - `false`：（默认）不出现浮动条。
 *
 * - **hotKeys?**: *Partial<HotKeys>*
 *
 *    添加自定义快捷键。若不传，则使用**默认快捷键键**方案，具体如下：
 *
 *    | 键盘按键                | 效果                     |
 *    | :--------------------- | :---------------------- |
 *    | Backspace 或 Delete     | 删除所选对象              |
 *    | Shift                  | 锁定放缩长宽比，令其等比放缩 |
 *    | Ctrl + Z 或 Command + Z | 撤回                     |
 *    | Ctrl + Y 或 Command + Y | 重做                    |
 *    | Ctrl + C 或 Command + C | 复制                     |
 *    | Ctrl + V 或 Command + V | 粘贴                    |
 *
 *    如果你想关闭快捷键功能，可以将该属性的其值设为 `{}`。
 * 
 * - **rejectWhenReadonlyErrorLevel?**: *RoomErrorLevel*
 *
 *    没有可写权限的用户进行写操作时，SDK 的应对方式。
 *
 * - **optimizeOptions?**: **OptimizeOptions**
 * 
 *    @since  2.16.48
 * 
 *    白板绘制性能优化选项。详见 {@link OptimizeOptions OptimizeOptions}。
 * 
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
 * `Player` 对象的参数配置，用于白板回放。该类型继承 {@link ConstructRoomParams} 且增加以下属性：
 *
 * - **region?**: *string*
 *
 *   `Player` 对象所在的数据中心。支持传入以下值：
 *
 *     | `region` | 数据中心 | 服务区                         |
 *     | -------- | -------- | ------------------------------ |
 *     | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
 *     | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
 *     | `in-mum` | 印度孟买 | 印度                           |
 *     | `eu` | 欧洲（法兰克福） | 欧洲                           |
 *     | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
 *
 *      **Note**
 *      - 如果你不设置该属性，SDK 会使用 {@link WhiteWebSdkConfiguration} 中 `region` 的值。
 *      - 如果在初始化 `WhiteWebSdk` 对象和创建 `Player` 对象时都没有设置数据中心，SDK 会报错。
 * 
 * - **slice?**: *string*
 *
 *   回放的录像片段的 UUID。你可以在房间录制的时候从 `room.slice` 获取。
 *
 *      **Note**
 *      - 该属性需要和 `room` 同时传入。
 *      - 传入该属性表明只回放特定片段，因此禁止再传入 `beginTimestamp` 和 `duration`。
 * 
 * - **room**: *string*
 *
 *    回放房间的 UUID，即房间的唯一标识符。成功创建房间后会返回该值。
 *    - 如果只传该属性，不传 `beginTimestamp` 和 `duration`，则表明回放该房间的所有录像片段。
 *    - 如果同时传入该属性和 `beginTimestamp` 和 `duration`，则表明回放该房间在对应时间范围内的所有录像片段。
 * 
 * - **roomToken**: *string*
 *
 *   房间的 Room Token，用于加入房间时的用户鉴权。详见[互动白板 Token 概述](/doc/whiteboard/javascript/whiteboard-sdk/overview/concepts#token)。
 * 
 * - **beginTimestamp?**: *number*
 *
 *   白板回放的起始时间（单位为毫秒的 Unix 时间戳）。
 *
 *   该属性必须和 `room`、`duration` 一起使用，而且使用时禁止传入 `slice`。
 * 
 * - **duration?**: *number*
 *
 *   白板回放的时长（毫秒）。
 *
 *   该属性必须和 `room`、`beginTimestamp` 一起使用，而且使用时禁止传入 `slice`。
 * 
 * - **crops?**: *Array*
 *   
 *   @since  2.16.48
 *
 *   回放录像裁剪区间，包含以下属性：
 *      - `from`: number。裁剪区间起点时间戳。
 *      - `to`: number。裁剪区间终点时间戳。
 * 
 * - **alignmentThreshold?**: *number*
 * 
 *   @since  2.16.48
 *
 *   回放时间轴对齐阈值, 超过此阈值会对齐回放播放器时间, 单位 ms, 默认值为 600 ms。 
 * 
 * - **alignmentInterval?**: *number*
 * 
 *   @since  2.16.48
 *
 *   回放时间轴对齐时长, 即在此段时间内，将回放时间通过倍速播放对齐到外部时间戳, 单位 ms, 默认值为 3000 ms。
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
    alignmentInterval?: number;};

/**
 * 检查白板房间是否可以回放的参数配置。
 */
export declare type PlayableCheckingParams = {
    /**
     * 当前房间所在的数据中心，支持传入以下值：
     *
     * | `region` | 数据中心 | 服务区                         |
     * | -------- | -------- | ------------------------------ |
     * | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
     * | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
     * | `in-mum` | 印度孟买 | 印度                           |
     * | `eu` | 欧洲（法兰克福） | 欧洲                           |
     * | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
     */
    region?: string;
    /**
     * 房间的 UUID，即房间的唯一标识符。成功创建房间后会返回该值。
     *
     * - 如果只传该属性，不传 `beginTimestamp` 和 `duration`，则表明回放该房间的所有录像片段。
     * - 如果同时传入该属性和 `beginTimestamp`、`duration`，则表明回放该房间在对应时间范围内的所有录像片段。
     */
    room: string;
    /**
     * 房间的 Room Token，用于加入房间时的用户鉴权。详见[互动白板 Token 概述](/doc/whiteboard/javascript/whiteboard-sdk/overview/concepts#token)。
     */
    roomToken: string;
    /**
     * 回放的录像片段的 UUID。你可以在房间录制的时候从 `room.slice` 获取。
     *
     * **Note**
     * - 该属性需要和 `room` 同时传入。
     * - 传入该属性表明只回放特定片段，因此禁止再传入 `beginTimestamp` 和 `duration`。
     */
    slice?: string;
    /**
     * 回放的起始时间（单位为毫秒的 Unix 时间戳）。
     *
     * 该属性必须和 `room`、`duration` 一起使用，而且使用时禁止传入 `slice`。
     */
    beginTimestamp?: number;
    /**
     * 回放的时长（毫秒）。
     *
     * 该属性必须和 `room`、`beginTimestamp` 一起使用，而且使用时禁止传入 `slice`。
     */
    duration?: number;
};

/**
 * `WhiteWebSdk` 类用于初始化 `WhiteWebSdk` 对象。
 */
export declare class WhiteWebSdk {
    /**
     * 连接的数据中心。支持传入以下值：
     *
     * | `region` | 数据中心 | 服务区                         |
     * | -------- | -------- | ------------------------------ |
     * | `us-sv`  | 美国硅谷 | 北美洲、南美洲                 |
     * | `sg`     | 新加坡   | 新加坡、东亚、东南亚           |
     * | `in-mum` | 印度孟买 | 印度                           |
     * | `eu` | 欧洲（法兰克福） | 欧洲                           |
     * | `cn-hz`  | 中国杭州 | 其他数据中心服务区未覆盖的地区 |
     *
     * **Note**
     *
     * 该方法设置的数据中心必须与[创建房间](/doc/whiteboard/restful/whiteboard-sdk/restful-wb/operations/post-v5-rooms)时设置的数据中心一致；否则，SDK 将无法连接到房间。
     */
    readonly region: string;

    /**
     * 该客户端的设备类型，决定 SDK 如何处理鼠标事件和触碰事件。
     */
    readonly deviceType: DeviceType;

    /**
     * 用户的屏幕类型，用于调整手势识别参数。
     */
    readonly screenType: ScreenType;

    /**
     * 渲染模式，详见 {@link RenderEngine}。
     */
    readonly renderEngine: RenderEngine;

    /**
     * 当前 SDK 的版本。
     * @since 2.13.14
     */
    readonly version: string;

    /**
     * `WhiteWebSdk` 的构造函数。
     * @param params 构造参数。
     * @returns 构造的 `WhiteWebSdk` 对象。
     */
    constructor(params: WhiteWebSdkConfiguration);

    /**
     * 加入互动白板实时房间。
     *
     * @param params 互动白板实时房间的参数配置，详见 {@link JoinRoomParams}。
     * @param callbacks 实时房间的事件回调。
     * @returns
     * - 如果方法调用成功，则返回房间对象，详见 {@link Room}。
     * - 如果方法调用失败，则返回错误信息。
     *
     * @example
     * ```typescript
     * const joinRoomParams = {...};
     * const roomCallbacks = {...};
     *
     * whiteWebSdk.joinRoom(joinRoomParams, roomCallbacks)
     *            .then(function (room) {
     *                // 加入房间成功，拿到 room 对象
     *            })
     *            .catch(function (error) {
     *                // 加入房间失败，拿到 error 对象
     *            });
     * ```
     */
    joinRoom(params: JoinRoomParams, callbacks?: Partial<RoomCallbacks>): Promise<Room>;

    /**
     * 查看房间是否有回放数据。
     *
     * @param params 检查白板房间是否可以回放的参数配置，详见 {@link PlayableCheckingParams}。
     * @returns
     * - 如果方法调用成功，则返回 `true`。
     * - 如果方法调用失败，则返回 `false`。
     */
    isPlayable(params: PlayableCheckingParams): Promise<boolean>;

    /**
     * 创建 `Player` 对象，用于互动白板实时房间的回放。
     *
     * @param params `Player` 对象的参数配置，详见 {@link ReplayRoomParams}。
     * @param callbacks `Player` 对象的事件回调。
     * @returns
     * - 如果方法调用成功，则返回房间对象，详见 {@link Player}。
     * - 如果方法调用失败，则返回错误信息。
     *
     * @example
     * ```typescript
     * const replayRoomParams = {...};
     * const replayCallbacks = {...};
     *
     * whiteWebSdk.replayRoom(replayRoomParams, replayCallbacks)
     *            .then(function (player) {
     *                // 回放成功，拿到 player 对象
     *            })
     *            .catch(function (error) {
     *                // 回放失败，拿到 error 对象
     *            });
     * ```
     */
    replayRoom(params: ReplayRoomParams, callbacks?: Partial<PlayerCallbacks>): Promise<Player>;

    // /**
    //  * @ignore
    //  * @deprecated 已废弃。
    //  */
    // pptConverter(roomToken: string): LegacyPPTConverter;


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

    private disableCurveAnimes: any;

    private disableRotation: any;

    private useMobXState: any;

    private onlyCallbackRemoteStateModify: any;

    private urlInterrupter: any;

    // private pptParams: any;

    private standardizeUserPayload: any;

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
 * 组件插件的唯一标识符。
 */
export declare type Identifier = string;

/**
 * 事件的范围。
 */
export declare enum Scope {
    /**
     * 系统事件。
     */
    System = "system",
    /**
     * App 事件。
     */
    App = "app",
    /**
     * 自定义事件。
     */
    Custom = "custom",
    /**
     * 预留参数。
     */
    Magix = "magix",
}


// /**
//  * 调用[查询转换任务进度](/doc/whiteboard/restful/whiteboard-sdk/restful-wb/operations/get-v5-projector-tasks-uuid)接口时，服务端返回的 HTTP 响应内容。
//  */
// export declare type ConversionResponse = {
//     /**
//      * 转换任务的 UUID，即转换任务的唯一识别符。
//      */
//     uuid: string;
//     /**
//     * 转换任务的类型。
//     */
//     type: ConversionType;
//     /**
//     * 转换任务的状态。
//     */
//     status: Status;
//     /**
//     * 转换失败的原因。
//     */
//     failedReason?: string;
//     /**
//     * 转换任务的进度详情。
//     */
//     progress: Progress;
// };

/**
 * PPT 预览页面的配置。
 */
 export declare type PreviewConfig = {
    /**
     * 给预览页面的菜单栏添加界面文字。详见 {@link International}。
     */
    international?: International;
 };

/**
 * @ignore
 * 日志。
 */
export declare type Logger<C = {
    [key: string]: any;
}> = LoggerPrinter<C> & {
    context?: Partial<C> & {
        [key: string]: any;
    };
    withContext: <T extends Object>(context: Partial<C> & T)=>Logger<C & T>;
};

// /**
//  * 动态 PPT 文件的参数设置。
//  */
//  export declare type PptParams = {
//     /** @ignore */
//     scheme?: string;
//     /**
//      * Agora RTC SDK 的 `AgoraRTCClient` 类，详见 {@link RTCClient}。
//      */
//     rtcClient?: RTCClient;
//     /**
//      * 是否开启服务端排版功能。
//      *
//      * @since 2.12.0
//      *
//      * 自 2021 年 2 月 10 日起，对于将 PPTX 文件转换为 HTML 网页的动态转换任务，Agora 互动白板服务端支持对 PPTX 文件进行排版，以确保 PPTX 文件的文本在各个平台上的呈现保持一致。
//      *
//      * **Note**
//      *
//      * 自 2.12.18 版本起，`useServerWrap` 的默认值由关闭改为开启。
//      *
//      * - `true`：（默认）开启。
//      * - `false`：关闭。
//      */
//     useServerWrap?: boolean;
// };

/**
 * 自定义用户信息。
 * @deprecated 已废弃。请改用 {@link JoinRoomParams} 中的 `userPayload`。
 */
export declare type MemberInformation = {
    id: number;
    session: string;
    payload: any;
};

/**
 * 浏览器的原生事件。
 * - `MouseEvent`：鼠标事件，详见 [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)。
 * - `WheelEvent`：滚轮事件，详见 [WheelEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent)。
 * - `KeyboardEvent`：键盘事件，详见 [KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)。
 * - `TouchEvent`：触摸事件，详见 [TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)。
 */
export declare type NativeEvent = MouseEvent | WheelEvent | KeyboardEvent | TouchEvent;

/**
 * 组件插件的渲染。
 */
export declare type RenderPlugin<C = {
}, T = any> = {
    /**
     * 组件插件类型，为该组件插件的唯一识别符。
     */
    kind: string;
    /**
     * 组件插件的外观。
     */
    render: ComponentType<PluginProps<C, T>>;
    /**
     * 组件插件属性的默认值。
     */
    defaultAttributes?: T;

    hitTest?:
    /**
     * 碰撞检测。你可以通过碰撞检测定义组件插件可以被选择工具选中的区域。
     *
     * @param plugin 组件插件对象。
     * @param x 可选中区域的中心点的 X 轴坐标。
     * @param y 可选中区域的中心点的 Y 轴坐标。
     * @param selectorRadius 可选中区域的半径。
     *
     * @returns 碰撞检测的结果：
     * - `true`：检测成功。
     * - `false`：检测失败。
     */
    (plugin: PluginInstance<C, T>, x: number, y: number, selectorRadius: number)=>boolean;

    willInterruptEvent?:
    /**
     * 设置是否拦截该组件插件的原生事件。
     *
     * @param plugin 组件插件对象。
     * @param event 原生事件。
     *
     * @returns 是否拦截该组件插件的原生事件：
     * - `true`：拦截。
     * - `false`：不拦截。
     */
    (plugin: PluginInstance<C, T>, event: NativeEvent)=>boolean;
};

/**
 * 字体样式。
 */
export declare type TextFormat = {
    /**
     * 颜色，RGB 格式。例如，`[0, 0, 255]` 代表蓝色。
     */
    color?: Color;
    /**
     * 字体大小，取值必须大于 0。
     */
    fontSize?: number;
    /**
     * 是否加粗：
     *
     * - `true`：加粗。
     * - `false`：（默认）不加粗。
     */
    bold?: boolean;
    /**
     * 是否使用斜体：
     *
     * - `true`：使用斜体。
     * - `false`：（默认）不使用斜体。
     */
    italic?: boolean;
    /**
     * 是否加下划线：
     *
     * - `true`：加下划线。
     * - `false`：（默认）不加下划线。
     */
    underline?: boolean;
    /**
     * 是否加删除线：
     *
     * - `true`：加删除线。
     * - `false`：（默认）不加删除线。
     */
    lineThrough?: boolean;
};

/**
 * 白板场景。
 */
export declare type WhiteScene = {
    /**
     * 场景名称。
     */
    name: string;
    /**
     * 在场景中展示的图片或动态 PPT。每个场景中可以展示一张图片或一页动态 PPT，你可以通过 {@link PptDescription} 设置待插入图片或动态 PPT 的宽、高、资源地址或预览图等。
     */
    ppt?: PptDescription;
};

/**
 * 场景目录的信息。
 */
export declare interface ScenesCallbacksNode extends Callbacks<ScenesCallbacks> {
    /**
     * 场景目录的路径。
     */
    readonly path: string;
    /**
     * 场景目录下所有场景的名称。
     */
    readonly scenes: ReadonlyArray<string>;
    /**
     * 场景目录下场景的数量。
     */
    readonly scenesCount: number;
    /**
     * 场景目录下所有子场景目录的名称。
     */
    readonly sceneGroups: ReadonlyArray<string>;
    /**
     * 场景目录下子场景目录的数量。
     */
    readonly sceneGroupsCount: number;
    /**
     * 释放监听器对象。
     */
    dispose(): void;

}

/**
 * 场景回调。
 */
export declare type ScenesCallbacks = {
    /**
     * 指定场景目录下场景数量发生变化回调。
     *
     * @param scenesCallbacks 场景目录的信息。详见 {@link ScenesCallbacksNode ScenesCallbacksNode}。
     * @param scenesCount 指定场景目录下当前的场景数量。
     */
    onScenesCountUpdate: (scenesCallbacks: ScenesCallbacksNode, scenesCount: number)=>void;
    /**
     * 新增场景回调。
     *
     * @param scenesCallbacks 场景目录的信息。详见 {@link ScenesCallbacksNode ScenesCallbacksNode}。
     * @param name 新增场景的场景名称。
     */
    onAddScene: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
    /**
     * 删除场景回调。
     *
     * @param scenesCallbacks 场景目录的信息。详见 {@link ScenesCallbacksNode ScenesCallbacksNode}。
     * @param name 被删除场景的场景名称。
     */
    onRemoveScene: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
    /**
     * 指定场景目录下子场景目录数量发生变化回调。
     *
     * @param scenesCallbacks 场景目录的信息。详见 {@link ScenesCallbacksNode ScenesCallbacksNode}。
     * @param sceneGroupsCount 指定场景目录下当前子场景目录的数量。
     */
    onScenesGroupCountUpdate: (scenesCallbacks: ScenesCallbacksNode, sceneGroupsCount: number)=>void;
    /**
     * 新增子场景目录回调。
     *
     * @param scenesCallbacks 场景目录的信息。详见 {@link ScenesCallbacksNode ScenesCallbacksNode}。
     * @param name 新增的子场景目录的名称。
     */
    onAddSceneGroup: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
    /**
     * 删除子场景目录回调。
     *
     * @param scenesCallbacks 场景目录的信息。详见 {@link ScenesCallbacksNode ScenesCallbacksNode}。
     * @param name 被删除的子场景目录的名称。
     */
    onRemoveSceneGroup: (scenesCallbacks: ScenesCallbacksNode, name: string)=>void;
};


/**
 * 事件监听器。
 */
export declare type EventListener = (event: Event)=>void;

/**
 * 自定义事件监听选项。
 *
 * @since v2.15.2
 */
export declare type MagixEventListenerOptions = {
    /**
     * SDK 触发自定义事件回调的间隔，单位为毫秒，默认值为 500。取值必须 ≥ 500。
     *
     * SDK 会根据该参数的值周期性触发自定义事件回调。
     */
    fireInterval?: number;
    /**
     * 设置是否待服务器确认 {@link dispatchMagixEvent} 方法调用成功后再发送事件回调：
     * - true：调用 {@link dispatchMagixEvent} 后立即触发事件回调。
     * - false：（默认）待服务器确认事件发送成功后再发送事件回调。
     */
    fireSelfEventAfterCommit?: boolean;
};

/**
 * 事件组监听器。
 */
export declare type EventsListener = (events: Event[])=>void;

/**
 * 事件过滤器。
 */
export declare type EventFilter = (event: Event)=>boolean;

/**
 * @since 2.10.0
 *
 * 视角状态。该类型继承 {@link Camera} 且增加以下属性：
 *
 * - **width**: *number*
 *
 *   视角的宽。
 * - **height**: *number*
 *
 *   视角的高。
 */
export declare type CameraState = Camera & {
    width: number;
    height: number;
};

/**
 * 媒体文件的类型。
 * - `video`：视频文件。
 * - `audio`：音频文件。
 */
export declare type MediaType = "video" | "audio";

/**
 * 调用 {@link seekToProgressTime} 定位回放的结果。
 *
 * @since v2.15.0
 */
 export declare enum PlayerSeekingResult {
    /**
     * 成功跳转至指定播放位置。
     */
    Success = "success",
    /**
     * 当前播放位置已经是指定播放位置，无需跳转。
     */
    SuccessButUnnecessary = "successButUnnecessary",
    /**
     * 跳转操作被另一个跳转操作覆盖，因此被取消。
     */
    Override = "override",
    /**
     * 跳转操作因播放器停止而终止。
     */
    Stopped = "stopped",
}

/**
 * 空白区域的设置。
 */
export declare type Margin = {
    /**
     * 上方的空白，单位为像素。
     */
    top: number;
    /**
     * 下方的空白，单位为像素。
     */
    bottom: number;
    /**
     * 左边的空白，单位为像素。
     */
    left: number;
    /**
     * 右边的空白，单位为像素。
     */
    right: number;
};

/**
 * 世界坐标系（以白板初始化时的中心点为原点的坐标系）的点坐标。
 */
export declare type Point = {
    /**
     * 点在世界坐标系中的 X 轴坐标。
     */
    x: number;
    /**
     * 点在世界坐标系中的 Y 轴坐标。
     */
    y: number;
};

/**
 * 用户自定义图标。
 */
export declare type UserCursorIcons = {
    [key: string]: ReadonlyArray<string>;
};

/** 文档转换任务的类型。 */
export declare enum ConversionType {
    /** 动态文档转换，即把 PPTX 文件转换为网页。 */
    dynamic = "dynamic",
    /** 静态文档转换，即把 PPT、PPTX、Word、PDF 等格式的文件转换成静态图。 */
    static = "static",
  }

/** 文档转换任务的状态。 */
export declare enum Status {
    /** 等待转换。 */
    waiting = "Waiting",
    /** 正在转换。 */
    converting = "Converting",
    /** 完成转换。 */
    finished = "Finished",
    /** 转换失败。 */
    fail = "Fail",
}

/** 文档转换任务的进度详情。 */
export declare type Progress = {
    /** 总页数。 */
    totalPageSize: number;
    /** 已转换的页数。 */
    convertedPageSize: number;
    /** 转换进度的百分比。 */
    convertedPercentage: number;
    /** 转换后生成的图片或动态 PPT 页。 */
    convertedFileList: ConvertedFile[];
    /** 转换任务当前的步骤。 */
    currentStep?: CurrentStep;
};

/**
 * `International` 类，用于添加 PPT 预览菜单栏的界面文字。你可以直接传入要展示的文字，例如 “Next”。
 */
export declare type International = {
    /** “上一页”的界面文字。 */
    prePage?: string;
    /** “下一页”的界面文字。 */
    nextPage?: string;
    /** “上一步”的界面文字。 */
    preStep?: string;
    /** “下一步”的界面文字。 */
    nextStep?: string;
    /** “跳转到”的界面文字。 */
    jumpTo?: string;
    /** “显示侧边栏”的界面文字。 */
    displaySidebar?: string;
    /** “隐藏侧边栏”的界面文字。 */
    hideSidebar?: string;
    /** “显示 PPT 备注”的界面文字。 */
    displayNote?: string;
    /** “隐藏 PPT 备注”的界面文字。 */
    hideNote?: string;
    /** “页码”的界面文字。 */
    pageNumber?: string;
    /** “重置当前 PPT 页的动画”的界面文字。 */
    resetCurrentSlideAnimation?: string;
    /** “重置当前 PPT 文件的动画”的界面文字。 */
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
 * `AgoraRTCClient` 类用于桥接 Agora RTC SDK 的混音方法和白板 SDK。
 *
 * 当用户同时使用音视频功能和互动白板，且在互动白板中展示的动态 PPT 包含音频文件时，可能遇到以下问题：
 * - 播放 PPT 内的音频时声音很小。
 * - 播放 PPT 内的音频时有回声。
 *
 * 为解决上述问题，你可以使用 `AgoraRTCClient` 类调用 Agora RTC SDK 的混音方法播放动态 PPT 中的音频文件。
 *
 * **Note**
 *
 * 目前仅支持 Electron 平台的 Agora RTC SDK.
 */
export declare type RTCClient = {
    startAudioMixing:
    /**
     * 开始播放音乐文件及混音。
     *
     * @param filePath 指定需要混音的本地或在线音频文件的绝对路径。
     * @param loopback 是否只有本地用户可以听到混音后的音频流：
     * - `true`：只有本地可以听到混音的音频流。
     * - `false`：本地和对方都可以听到混音的音频流。
     * @param replace  是否播放麦克风采集的音频：
     * - `true`： 只播放音频文件，不播放麦克风采集的音频。
     * - `false`: 将音频文件和麦克风采集的音频混音后播放。
     * @param cycle    音乐文件的播放次数。
     * - &ge; 0: 播放次数。例如，`0` 表示不播放；`1` 表示播放 `1` 次。
     * - -1: 无限循环播放。
     * @param callback 开始播放音乐文件及混音的回调。其中 `state: number` 为音乐文件及混音的播放状态，
     * `errorCode: number` 为错误码。
     *
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    (filePath: string, loopback: boolean, replace: boolean, cycle: number, callback?: (state: number, errorCode: number)=>void)=>number;

    stopAudioMixing:
    /**
     * 停止播放音乐文件及混音。
     * @param callback 停止播放音乐文件及混音的回调。其中 `state: number` 为音乐文件及混音的播放状态，
     * `errorCode: number` 为错误码。
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     *
     */
    (callback?: (state: number, errorCode: number)=>void)=>number;

    pauseAudioMixing:
    /**
     * 暂停播放音乐文件及混音。
     *
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    ()=>number;

    resumeAudioMixing:
    /**
     * 恢复播放音乐文件及混音。
     *
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    ()=>number;

    adjustAudioMixingVolume?:
    /**
     * 调节音乐文件的播放音量。
     *
     * 该方法调节混音里伴奏在本端和远端播放的音量。
     *
     * @param volume 伴奏在本端和远端播放的音量。取值范围为 0 到 100 间的整数，默认为 100，即保持原始文件音量。
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    (volume: number)=>number;

    adjustAudioMixingPlayoutVolume?:
    /**
     * 调节音乐文件的本地播放音量。
     *
     * @param volume 音乐文件在本端播放的音量。取值范围为 0 到 100 间的整数，默认为 100，即保持原始文件音量。
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    (volume: number)=>number;

    adjustAudioMixingPublishVolume?:
    /**
     * 调节音乐文件的远端播放音量。
     *
     * @param volume 音乐文件在远端播放的音量。取值范围为 0 到 100 间的整数，默认为 100，即保持原始文件音量。
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    (volume: number)=>number;

    getAudioMixingPlayoutVolume?:
    /**
     * 获取音乐文件的本地播放音量。
     *
     * @returns
     * - 方法调用成功则返回音量值，取值范围为 0 到 100 间的整数。
     * - &lt; 0：方法调用失败。
     */
    ()=>number;

    getAudioMixingPublishVolume?:
    /**
     * 获取音乐文件的远端播放音量。
     *
     * @returns
     * - 方法调用成功则返回音量值，取值范围为 0 到 100 间的整数。
     * - &lt; 0：方法调用失败。
     */
    ()=>number;

    getAudioMixingDuration?:
    /**
     * 获取指定音乐文件的总时长。
     *
     * @returns
     * - 方法调用成功则返回总时长，单位为毫秒。
     * - &lt; 0：方法调用失败。
     */
    ()=>number;

    getAudioMixingCurrentPosition?:
    /**
     * 获取音乐文件的播放进度。
     *
     * @returns
     * - 方法调用成功则返回播放进度，单位为毫秒。
     * - &lt; 0：方法调用失败。
     */
    ()=>number;

    setAudioMixingPosition:
    /**
     * 设置音乐文件的播放位置。
     *
     * 该方法可以设置音频文件的播放位置，这样你可以根据实际情况播放文件，而不是非得从头到尾播放一个文件。
     *
     * @param position 设置的播放位置，单位为毫秒，取值必须为整数。
     * @returns
     * - 0：方法调用成功。
     * - &lt; 0：方法调用失败。
     */
    (position: number)=>number;
};

/** 转换后生成的图片或动态 PPT 页。 */
export declare type ConvertedFile = {
    /**
     * 图片的 URL 地址或动态 PPT 页的 URI 地址。
     */
    conversionFileUrl: string;
    /**
     * 图片或动态 PPT 预览图的 URL 地址。
     */
    preview?: string;
    /**
     * 图片或动态 PPT 页在白板中的高度，单位为像素。
     */
    height: number;
    /**
     * 图片或动态 PPT 页在白板中的宽度，单位为像素。
     */
    width: number;
};

/**
 * @ignore
 */
 export declare type EventEmitter = {
};

/** 文档转换任务当前的步骤。 */
export declare enum CurrentStep {
    /**
     * 打包。
     */
    packaging = "Packaging",
    /**
     * 提取资源。
     */
    extracting = "Extracting",
    /**
     * 生成预览图。
     */
    generatingPreview = "GeneratingPreview",
    /**
     * 媒体文件转换。
     */
    mediaTranscode = "MediaTranscode",
}

