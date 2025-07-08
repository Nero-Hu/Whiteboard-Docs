package com.herewhite.sdk.domain;

import java.util.concurrent.TimeUnit;

/**
 * Configuration of the `Player` instance.
 */
public class PlayerConfiguration extends WhiteObject {
    private String room;
    private String roomToken;
    private String slice;
    private Long beginTimestamp;
    private Long duration;
    private CameraBound cameraBound;
    private Long step = 500L;

    /**
     * Gets the data center of the `Player` instance.
     *
     * @return The data center of the `Player` instance. See {@link Region Region}.
     */
    public Region getRegion() {
        return region;
    }

    /**
     * Sets the data center of the `Player` instance.
     *
     * @note If you do not set the data center, the SDK uses the region set in {@link com.herewhite.sdk.WhiteSdkConfiguration WhiteSdkConfiguration}.
     *
     * @param region The data center of the `Player` instance. See {@link Region Region}.
     */
    public void setRegion(Region region) {
        this.region = region;
    }

    private Region region;

    /**
     * The `PlayerConfiguration` constructor, for initializing a `PlayerConfiguration` object.
     *
     * @param room The unique identifier of the room, which must be the same as the one set in `roomParams` parameter of the `joinRoom` method.
     * @param roomToken The Room Token for authentication, which must be generated using the room UUID above.
     */
    public PlayerConfiguration(String room, String roomToken) {
        this.room = room;
        this.roomToken = roomToken;
    }

    /**
     * Gets the viewable area of the local user.
     *
     * @return The viewable area of the local user. See {@link CameraBound CameraBound}.
     */
    public CameraBound getCameraBound() {
        return cameraBound;
    }

    /**
     * Sets the viewable area of the local user.
     *
     * @param cameraBound The viewable area of the local user. See {@link CameraBound CameraBound}.
     */
    public void setCameraBound(CameraBound cameraBound) {
        this.cameraBound = cameraBound;
    }

    /**
     * Sets the frequency that the SDK reports the current playback position callback.
     *
     * @param duration The time interval between two playback position callbacks. By default, the SDK reports the current playback position every 0.5 seconds.
     * @param timeUnit The unit of the `duration` parameter. The default value is `MILLISECONDS`. For all supported values, see [TimeUnit](https://www.android-doc.com/reference/java/util/concurrent/TimeUnit.html).
     */
    public void setStep(Long duration, TimeUnit timeUnit) {
        this.step = TimeUnit.MILLISECONDS.convert(duration, timeUnit);
    }


    /// @cond test
    /**
     * Hidden in documentation.
     */
    private String mediaURL;
    /// @endcond

    /**
     * Gets the unique identifier of the room to be replayed.
     *
     * @return The unique identifier of the room to be replayed.
     */
    public String getRoom() {
        return room;
    }

    /**
     * Sets the unique identifier of the room to be replayed.
     *
     * @param room The unique identifier of the room to be replayed, which must be the same as the one set in `roomParams` parameter of the `joinRoom` method.
     */
    public void setRoom(String room) {
        this.room = room;
    }

    /**
     * Gets the Room Token of the room to be replayed.
     *
     * @return The Room Token for authentication.
     */
    public String getRoomToken() {
        return roomToken;
    }

    /**
     * Sets the Room Token of the room to be replayed.
     *
     * @return The Room Token for authentication, which must be generated using the room UUID you set for this `Player` instance.
     */
    public void setRoomToken(String roomToken) {
        this.roomToken = roomToken;
    }

    /// @cond test
    /**
     * Hidden in documentation
     *
     * @return
     */
    public String getSlice() {
        return slice;
    }
    /// @endcond

    /// @cond test
    /**
     * Hidden in documentation
     *
     * @return
     */
    public void setSlice(String slice) {
        this.slice = slice;
    }
    /// @endcond

    /**
     * Gets the Unix timestamp (ms) representing the starting UTC time of the playback.
     *
     * This method call returns a Unix timestamp in milliseconds.
     * You can convert the Unix timestamp to UTC time. For example, if the return value is `1615370614269`, the UTC time is 2021-03-10 18:03:34 GMT+0800.
     *
     * @return The Unix timestamp (ms) representing the starting UTC time of the playback.
     */
    public Long getBeginTimestamp() {
        return beginTimestamp;
    }

    /***
     * Sets the Unix timestamp (ms) representing the starting UTC time of the playback.
     *
     * @param beginTimestamp The Unix timestamp (ms) representing the starting UTC time of the playback. For example, if want to set the staring UTC time of the playback as 2021-03-10 18:03:34 GMT+0800, you need to pass in `1615370614269`.
     */
    public void setBeginTimestamp(Long beginTimestamp) {
        this.beginTimestamp = beginTimestamp;
    }

    /**
     * Gets the playback duration (ms).
     *
     * @return The playback duration (ms).
     */
    public Long getDuration() {
        return duration;
    }

    /**
     * Sets the playback duration (ms).
     *
     * @param duration The playback duration (ms).
     */
    public void setDuration(Long duration) {
        this.duration = duration;
    }

    /// @cond test
    /**
     * Hidden in documentation
     * @return
     */
    public String getMediaURL() {
        return mediaURL;
    }
    /// @endcond

    /// @cond test
    /**
     * Hidden in documentation
     * @param mediaURL
     */
    public void setMediaURL(String mediaURL) {
        this.mediaURL = mediaURL;
    }
    /// @endcond
}
