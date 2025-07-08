package com.herewhite.sdk.domain;

/**
 * `WindowDocsEvent` 类，用于定义文档操作事件。
 */
public class WindowDocsEvent {
    /**
     * 上一页。
     */
    public static WindowDocsEvent PrevPage = new WindowDocsEvent("prevPage");
    /**
     * 下一页。
     */
    public static WindowDocsEvent NextPage = new WindowDocsEvent("nextPage");
    /**
     * 上一步。
     */
    public static WindowDocsEvent PrevStep = new WindowDocsEvent("prevStep");
    /**
     * 下一步。
     */
    public static WindowDocsEvent NextStep = new WindowDocsEvent("nextStep");

    /**
     * 文档事件。
     */
    private String event;

    /**
     * 事件参数。仅当 `event` 为 `jumpToPage` 时需要传入，用于指定期望跳转的页码。
     */
    private Options options = new Options();

    public WindowDocsEvent(String event) {
        this.event = event;
    }

    /**
     * @param event 文档事件。包括以下几种：
     *                - `prevPage`: 上一页。
     *                - `nextPage`: 下一页。
     *                - `prevStep`: 上一步。
     *                - `nextStep`: 下一步。
     *                - `jumpToPage`: 跳转至页码。
     * @param options 事件参数。仅当 `event` 为 `jumpToPage` 时需要传入，用于指定期望跳转的页码。
     */
    public WindowDocsEvent(String event, Options options) {
        this.event = event;
        this.options = options;
    }

    /**
     * 跳转至页码。
     *
     * @param page 期望跳转的页码。
     */
    public static WindowDocsEvent JumpToPage(Integer page) {
        Options options = new Options();
        options.page = page;
        return new WindowDocsEvent("jumpToPage", options);
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public Options getOptions() {
        return options;
    }

    public void setOptions(Options options) {
        this.options = options;
    }

    public static class Options extends WhiteObject {
        private Integer page;

        public Options() {}

        public Integer getPage() {
            return page;
        }

        public void setPage(Integer page) {
            this.page = page;
        }
    }
}
