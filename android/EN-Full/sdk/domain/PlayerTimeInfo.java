package com.herewhite.sdk.domain;

/**
 * The time information of the `Player` instance.
 */
public class PlayerTimeInfo {

    private long scheduleTime;
    private long timeDuration;
    private int framesCount;
    private long beginTimestamp;

    /**
     * The `PlayerTimeInfo` constructor.
     * @param scheduleTime The current playback position (ms).
     * @param timeDuration The total duration (ms) of the playback.
     * @param framesCount Reserved.
     * @param beginTimestamp The Unix timestamp (ms) indicating when the playback started.
     */
    public PlayerTimeInfo(long scheduleTime, long timeDuration, int framesCount, long beginTimestamp) {
        this.scheduleTime = scheduleTime;
        this.timeDuration = timeDuration;
        this.framesCount = framesCount;
        this.beginTimestamp = beginTimestamp;
    }

    /**
     * Gets the current playback position.
     *
     * @return The current playback position (ms).
     */
    public long getScheduleTime() {
        return scheduleTime;
    }

    /**
     * Gets the total duration of the playback.
     *
     * @return The total duration (ms) of the playback.
     */
    public long getTimeDuration() {
        return timeDuration;
    }

    /// @cond test
    /**
     * Hidden in documentation.
     */
    public int getFramesCount() {
        return framesCount;
    }
    /// @endcond

    /**
     * Gets the Unix timestamp (ms) indicating when the playback started.
     *
     * This method call returns a Unix timestamp in milliseconds.
     * You can convert the Unix timestamp to UTC time. For example, if the return value is `1615370614269`, the UTC time is 2021-03-10 18:03:34 GMT+0800.
     *
     * @return The Unix timestamp (ms).
     */
    public long getBeginTimestamp() {
        return beginTimestamp;
    }
}
