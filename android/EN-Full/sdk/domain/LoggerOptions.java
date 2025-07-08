package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * The output log options.
 */
public class LoggerOptions extends WhiteObject {

    /**
     * The output log level.
     *
     * @since 2.11.10
     *
     * The log level follows the sequence of `error`, `warn`, `info`, and `debug`. When choosing a level, you can also see the logs preceding that level.
     *
     * For example, if you set the log level to `info`, the SDK outputs the logs within levels `error`，`warn`，and `info`.
     */
    public enum Level {
        /**
         * Logs of the `debug` level.
         *
         * Set your log level as `debug` if you want to get the most complete log file.
         *
         * @note
         * At present, logs at the `debug` level have the same information as those at the `info` level.
         */
        debug,
        /**
         * Logs of the `info` level.
         *
         * Logs at this level mainly provide information on SDK connection states.
         */
        info,
        /**
         * Logs of the `warn` level.
         *
         * Logs at this level mainly report the issues that the SDK has encountered but automatically solved.
         *
         * @note
         * If you call a deprecated method, the SDK does not send warning messages.
         */
        warn,
        /**
         * Logs of the `error` level.
         *
         * Logs at this level mainly report the errors that cause the SDK to fail to complete a task.
         */
        error,
    }

    /**
     * The mode of the SDK to report information.
     *
     * @since 2.11.10
     */
    public enum ReportMode {
        /**
         * (Default) Enable the SDK to report information all the time.
         */
        @SerializedName("alwaysReport")
        always,
        /**
         * Disable the SDK from reporting information.
         */
        @SerializedName("banReport")
        ban,
    }

    private Boolean disableReportLog;

    /**
     * Gets whether log reporting is disabled.
     *
     * @return Whether log reporting is disabled:
     * - `true`: Log reporting is disabled.
     * - `false`: Log reporting is enabled.
     */
    public Boolean getDisableReportLog() {
        return disableReportLog;
    }

    /**
     * Disables/Enables log reporting.
     *
     * @deprecated This method is deprecated. Use {@link #getReportDebugLogMode() getReportDebugLogMode},
     * {@link #getReportQualityMode() getReportQualityMode}, and {@link #getReportLevelMask() getReportLevelMask}.
     *
     * @param disableReportLog Whether to disable log reporting:
     *  - `true`: Disable the SDK from reporting logs.
     *  - `false`: (Default) Enable the SDK to report logs.
     */
    public void setDisableReportLog(Boolean disableReportLog) {
        if (disableReportLog) {
            setReportDebugLogMode(ReportMode.ban);
            setReportQualityMode(ReportMode.ban);
        }
    }

    /**
     * Gets the printing level of the log.
     *
     * @return The printing level of the log. See {@link Level Level}.
     */
    public Level getPrintLevelMask() {
        return printLevelMask;
    }

    /**
     * Sets the log printing level of the SDK.
     *
     * @since 2.11.10
     *
     * This method specifies the log level that the SDK prints in the WebView.
     *
     * @param printLevelMask The log printing level of the SDK. The default level is `info`. See {@link Level Level}.
     */
    public void setPrintLevelMask(Level printLevelMask) {
        this.printLevelMask = printLevelMask;
    }

    /**
     * Gets the log reporting level of the SDK.
     *
     * @return The log reporting level of the SDK. See {@link Level Level}.
     */
    public Level getReportLevelMask() {
        return reportLevelMask;
    }

    /**
     * Sets the log reporting level of the SDK.
     *
     * @since 2.11.10
     *
     * This method specifies the log level that the SDK reports to the Agora Interactive Whiteboard server.
     *
     * @param reportLevelMask The log reporting level of the SDK. The default level is `info`. See {@link Level Level}.
     */
    public void setReportLevelMask(Level reportLevelMask) {
        this.reportLevelMask = reportLevelMask;
    }

    /**
     * Gets the mode for the SDK to report logs.
     *
     * @return The mode for the SDK to report logs. See {@link ReportMode ReportMode}.
     */
    public ReportMode getReportDebugLogMode() {
        return reportDebugLogMode;
    }

    /**
     * Sets the mode for the SDK to report logs.
     *
     * @since 2.11.10
     *
     * @param reportDebugLogMode The mode for the SDK to report logs. The default value is `always`. See {@link ReportMode ReportMode}.
     */
    public void setReportDebugLogMode(ReportMode reportDebugLogMode) {
        this.reportDebugLogMode = reportDebugLogMode;
    }

    /**
     * Gets the mode for the SDK to report connection quality data.
     *
     * @return The mode for the SDK to report connection quality data. See {@link ReportMode ReportMode}.
     */
    public ReportMode getReportQualityMode() {
        return reportQualityMode;
    }

    /**
     * Sets the mode for the SDK to report connection quality data.
     *
     * @since 2.11.10
     *
     * The connection quality data includes connection duration and connection stability.
     *
     * @param reportQualityMode The mode for the SDK to report connection quality data. The default value is `always`. See {@link ReportMode ReportMode}.
     */
    public void setReportQualityMode(ReportMode reportQualityMode) {
        this.reportQualityMode = reportQualityMode;
    }

    private Level printLevelMask;
    private Level reportLevelMask;
    private ReportMode reportDebugLogMode;
    private ReportMode reportQualityMode;
}
