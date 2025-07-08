package com.herewhite.sdk;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.util.Base64;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.herewhite.sdk.domain.AnimationMode;
import com.herewhite.sdk.domain.CameraBound;
import com.herewhite.sdk.domain.CameraConfig;
import com.herewhite.sdk.domain.EventListener;
import com.herewhite.sdk.domain.FrequencyEventListener;
import com.herewhite.sdk.domain.Point;
import com.herewhite.sdk.domain.Promise;
import com.herewhite.sdk.domain.RectangleConfig;
import com.herewhite.sdk.domain.SDKError;
import com.herewhite.sdk.domain.Scene;
import com.herewhite.sdk.domain.WhiteObject;
import com.herewhite.sdk.domain.WhiteScenePathType;
import com.herewhite.sdk.internal.Logger;

import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import androidx.annotation.ColorInt;
import androidx.annotation.VisibleForTesting;
import wendu.dsbridge.OnReturnValue;

/**
 * The `Displayer` class, which is the parent class of the {@link com.herewhite.sdk.Room Room} class and the {@link com.herewhite.sdk.Player Player} class.
 * The `Room` class and the `Player` class can both inherit the methods of the `Displayer` class.
 */
public class Displayer {
    protected final static Gson gson = new Gson();
    @ColorInt
    private int backgroundColor = Color.WHITE;

    protected final JsBridgeInterface bridge;
    protected String uuid;
    protected int densityDpi;
    private Handler handler;

    @VisibleForTesting
    ConcurrentHashMap<String, EventListener> eventListenerMap = new ConcurrentHashMap<>();
    @VisibleForTesting
    ConcurrentHashMap<String, FrequencyEventListener> frequencyEventListenerMap = new ConcurrentHashMap<>();

    /// @cond test
    /**
     *Hidden in documentation
     */
    public Displayer(String uuid, JsBridgeInterface bridge, int densityDpi) {
        this.uuid = uuid;
        this.bridge = bridge;
        this.densityDpi = densityDpi;
    }
    /// @endcond

    private Handler getHandler() {
        if (handler == null) {
            handler = new Handler(Looper.getMainLooper());
        }
        return handler;
    }

    protected void post(Runnable runnable) {
        getHandler().post(runnable);
    }

    /**
     * Sends message in string format to the iframe plugin.
     *
     * @since 2.11.4
     *
     * @param string The message in string format.
     */
    public void postIframeMessage(String string) {
        bridge.callHandler("displayer.postMessage", new Object[]{string});
    }

    /**
     * Sends message in key-value format to the iframe plugin.
     *
     * @since 2.11.4
     *
     * @param object The message in key-value format, which must be a subclass of {@link com.herewhite.sdk.domain.WhiteObject WhiteObject}.
     *
     */
    public void postIframeMessage(WhiteObject object) {
        bridge.callHandler("displayer.postMessage", new Object[]{object});
    }

    /**
     * Gets the type of the scene path.
     *
     * This method returns the scene type for the scene path that you specify in the method.
     *
     * @param path    The path of the scene.
     * @param promise The `Promise<WhiteScenePathType>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}.
     * You can get the call result of `getScenePathType` through this interface:
     * - The global state of the room, if the method call succeeds. See {@link com.herewhite.sdk.domain.WhiteScenePathType WhiteScenePathType}.
     * - An error message, if the method call fails.
     *
     */
    public void getScenePathType(String path, final Promise<WhiteScenePathType> promise) {
        bridge.callHandler("displayer.scenePathType", new Object[]{path}, new OnReturnValue<String>() {
            @Override
            public void onValue(String retValue) {
                WhiteScenePathType type = gson.fromJson(retValue, WhiteScenePathType.class);
                promise.then(type);
            }
        });
    }


    /**
     * Gets information about all scenes in the room.
     *
     * @param promise The `Promise<Map<String, Scene[]>>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}.
     * You can get the call result of `getEntireScenes` through this interface:
     * - The information about all scenes in the room, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void getEntireScenes(final Promise<Map<String, Scene[]>> promise) {
        bridge.callHandler("displayer.entireScenes", new OnReturnValue<JSONObject>() {
            @Override
            public void onValue(JSONObject retValue) {
                Type type = new TypeToken<Map<String, Scene[]>>() {
                }.getType();
                Map<String, Scene[]> map = gson.fromJson(String.valueOf(retValue), type);
                promise.then(map);
            }
        });
    }

    /**
     * Refreshes the whiteboard view.
     *
     * When the `WhiteboardView` changes, you need to call this method to refresh the whiteboard view.
     *
     */
    public void refreshViewSize() {
        bridge.callHandler("displayer.refreshViewSize", new Object[]{});
    }

    /**
     * Adjusts the view in `Continuous` mode to ensure the complete display of the PPT slide.
     *
     * @since 2.4.22
     */
    public void scalePptToFit() {
        bridge.callHandler("displayer.scalePptToFit", new Object[]{});
    }

    /**
     * Adjusts the view in the specified mode to ensure the complete display of the PPT slide.
     *
     * @since 2.4.28
     *
     * @param mode The animation mode for adjusting the view. See {@link com.herewhite.sdk.domain.AnimationMode AnimationMode}.
     */
    public void scalePptToFit(AnimationMode mode) {
        String modeString = gson.fromJson(gson.toJson(mode), String.class);
        bridge.callHandler("displayer.scalePptToFit", new Object[]{modeString});
    }

    /**
     * Adds a listener for a customized event.
     *
     * You can receive the customized event callback after a successful call of this method.
     *
     * @note The SDK triggers only one callback for customized events with the same name.
     *
     * @param eventName The name of the event.
     * @param eventListener The customized event callback. See {@link com.herewhite.sdk.domain.EventListener EventListener}.
     * If you add multiple callbacks for the same event, the callback added later overrides the one added earlier.
     *
     */
    public void addMagixEventListener(String eventName, EventListener eventListener) {
        this.eventListenerMap.put(eventName, eventListener);
        bridge.callHandler("displayer.addMagixEventListener", new Object[]{eventName});
    }

    /**
     * Adds a listener for a customized high-frequency event.
     *
     * You can receive the customized event callback after a successful call of this method.
     *
     * @note The SDK triggers only one callback for customized events with the same name.
     *
     * @param eventName     The name of the event.
     * @param eventListener The customized event callback. See {@link com.herewhite.sdk.domain.FrequencyEventListener FrequencyEventListener}.
     * If you add multiple callbacks for the same event, the callback added later overrides the one added earlier.
     * @param fireInterval  The interval (ms) at which the SDK triggers the callback. The minimum interval is 500 ms. The SDK automatically adjusts values smaller than 500 to 500.
     */
    public void addHighFrequencyEventListener(String eventName, FrequencyEventListener eventListener, Integer fireInterval) {
        if (fireInterval < 500) {
            fireInterval = 500;
        }
        this.frequencyEventListenerMap.put(eventName, eventListener);
        bridge.callHandler("displayer.addHighFrequencyEventListener", new Object[]{eventName, fireInterval});
    }

    /**
     * Removes a listener for a customized event.
     *
     * @param eventName The name of the event.
     */
    public void removeMagixEventListener(String eventName) {
        this.eventListenerMap.remove(eventName);
        this.frequencyEventListenerMap.remove(eventName);
        bridge.callHandler("displayer.removeMagixEventListener", new Object[]{eventName});
    }

    /**
     * Converts the coordinates of a point on the whiteboard.
     *
     * This method converts the coordinates of the Android internal coordinate system (taking the upper left corner as the origin) to the coordinates of the world coordinate system (taking the center of the initial whiteboard as the origin).
     *
     * @param x The X coordinate of the point in the Android internal coordinate system.
     * @param y The Y coordinate of the point in the Android internal coordinate system.
     * @param promise The `Promise<Point>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}.
     * You can get the call result of `convertToPointInWorld` through this interface:
     * - The new coordinates, if the method call succeeds. See {@link com.herewhite.sdk.domain.Point Point}.
     * - An error message, if the method call fails.
     */
    public void convertToPointInWorld(double x, double y, final Promise<Point> promise) {
        bridge.callHandler("displayer.convertToPointInWorld", new Object[]{x, y}, new OnReturnValue<Object>() {
            @Override
            public void onValue(Object o) {
                try {
                    promise.then(gson.fromJson(String.valueOf(o), Point.class));
                } catch (AssertionError a) {
                    throw a;
                } catch (JsonSyntaxException e) {
                    Logger.error("An JsonSyntaxException occurred while parse json from convertToPointInWorld", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                } catch (Throwable e) {
                    Logger.error("An exception occurred in convertToPointInWorld promise then method", e);
                    promise.catchEx(new SDKError(e.getMessage()));
                }
            }
        });
    }

    /**
     * Sets the boundary of the local user's view.
     *
     * @since 2.5.0
     *
     * @param bound The boundary of the view. See {@link com.herewhite.sdk.domain.CameraBound CameraBound}.
     */
    public void setCameraBound(CameraBound bound) {
        this.bridge.callHandler("displayer.setCameraBound", new Object[]{bound});
    }

    /**
     * Sets the background color of the whiteboard.
     *
     * @since 2.4.14
     *
     * @deprecated This method is deprecated. Use the Android native method [setBackgroundColor](https://developer.android.com/reference/android/view/View#setBackgroundColor(int)) instead.
     *
     * @note This method applies to the local user's whiteboard only and does not change the background color of other users' whiteboards.
     *
     * @param intColor The background color of the whiteboard in RGBA hex value.
     * The alpha channel does not have a value that makes the whiteboard transparent.
     */
    @Deprecated
    public void setBackgroundColor(@ColorInt int intColor) {
        Float[] rgba = hexSplit(intColor);
        this.bridge.callHandler("displayer.setBackgroundColor", rgba);
        backgroundColor = intColor;
    }

    private static Float[] hexSplit(@ColorInt int color) {
        Float r = Float.valueOf((color >> 16) & 0xff);
        Float g = Float.valueOf((color >> 8) & 0xff);
        Float b = Float.valueOf((color) & 0xff);
        Float a = Float.valueOf(((color >> 24) & 0xff) / 255.0f);
        return new Float[]{r, g, b, a};
    }

    /**
     * Gets the background color of the whiteboard.
     *
     * @since 2.4.0
     *
     * @deprecated This method is deprecated.
     *
     * @return The background color of the whiteboard in RGB hex value.
     */
    public int getBackgroundColor() {
        return backgroundColor;
    }

    /**
     * Gets the preview of the specified scene.
     *
     * @since 2.3.0
     *
     * @param scenePath The path of the scene.
     * @param promise   The `Promise<Bitmap>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}.
     * You can get the call result of `getScenePreviewImage` through this interface:
     * - The preview of the specified scene, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void getScenePreviewImage(String scenePath, final Promise<Bitmap> promise) {
        this.bridge.callHandler("displayerAsync.scenePreview", new Object[]{scenePath}, new OnReturnValue<String>() {
            @Override
            public void onValue(String retValue) {
                Bitmap bitmap = null;
                try {
                    bitmap = transformBase64toBitmap(retValue);
                } catch (Exception e) {
                    promise.catchEx(new SDKError(e.getMessage()));
                }
                if (bitmap != null) {
                    promise.then(bitmap);
                }
            }
        });
    }

    /**
     * Gets the screenshot of the specified scene.
     *
     * @since 2.3.0
     *
     * @param scenePath The path of the scene.
     * @param promise   The `Promise<Bitmap>` interface instance. See {@link com.herewhite.sdk.domain.Promise Promise}.
     * You can get the call result of `getSceneSnapshotImage` through this interface:
     * - The screenshot of the scene, if the method call succeeds.
     * - An error message, if the method call fails.
     */
    public void getSceneSnapshotImage(String scenePath, final Promise<Bitmap> promise) {
        this.bridge.callHandler("displayerAsync.sceneSnapshot", new Object[]{scenePath}, new OnReturnValue<String>() {
            @Override
            public void onValue(String retValue) {
                Bitmap bitmap = null;
                try {
                    bitmap = transformBase64toBitmap(retValue);
                } catch (Exception e) {
                    promise.catchEx(new SDKError(e.getMessage()));
                }
                if (bitmap != null) {
                    promise.then(bitmap);
                }
            }
        });
    }

    private Bitmap transformBase64toBitmap(String base64String) {
        final String pureBase64Encoded = base64String.substring(base64String.indexOf(",") + 1);
        final byte[] decodedBytes = Base64.decode(pureBase64Encoded, Base64.DEFAULT);
        BitmapFactory.Options opts = new BitmapFactory.Options();
        opts.inDensity = densityDpi;
        return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length, opts);
    }

    /**
     * Disables the user from adjusting the view.
     *
     * @since 2.11.0
     *
     * This method disables the user from moving or zooming the view through touch-screen gestures.
     *
     * @param disable Whether to disable the user from adjusting the view:
     * - `true`: Disable the user from adjusting the view.
     * - `false`: (Default) Enable the user to adjust the view.
     */
    public void disableCameraTransform(Boolean disable) {
        bridge.callHandler("displayer.setDisableCameraTransform", new Object[]{disable});
    }

    /**
     * Adjusts the view.
     *
     * @since 2.2.0
     *
     * @param camera Settings of the view. See {@link com.herewhite.sdk.domain.CameraConfig CameraConfig}.
     */
    public void moveCamera(CameraConfig camera) {
        this.bridge.callHandler("displayer.moveCamera", new Object[]{camera});
    }

    /**
     * Adjusts the view to ensure the complete display of the view rectangle.
     *
     * @since 2.2.0
     *
     * @param rectangle Settings of the view rectangle. See {@link com.herewhite.sdk.domain.RectangleConfig RectangleConfig}.
     */
    public void moveCameraToContainer(RectangleConfig rectangle) {
        this.bridge.callHandler("displayer.moveCameraToContain", new Object[]{rectangle});
    }
}
