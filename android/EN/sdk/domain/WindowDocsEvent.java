package com.herewhite.sdk.domain;

/**
 * The `WindowDocsEvent` class. Used to define events for controling docs.
 */
public class WindowDocsEvent {
    /**
     * Previous page.
     */
    public static WindowDocsEvent PrevPage = new WindowDocsEvent("prevPage");
    /**
     * Next page.
     */
    public static WindowDocsEvent NextPage = new WindowDocsEvent("nextPage");
    /**
     * Previous step.
     */
    public static WindowDocsEvent PrevStep = new WindowDocsEvent("prevStep");
    /**
     * Next step.
     */
    public static WindowDocsEvent NextStep = new WindowDocsEvent("nextStep");

    /**
     * Docs event.
     */
    private String event;

    /**
     * The options of the event. Needed only when `event` is `jumpToPage`, specifying the target page you want to jump to.
     */
    private Options options = new Options();

    public WindowDocsEvent(String event) {
        this.event = event;
    }

    /**
     * @param event Docs event, including the following:
     *                - `prevPage`: Previous page.
     *                - `nextPage`: Next page.
     *                - `prevStep`: Previous step.
     *                - `nextStep`: Next step.
     *                - `jumpToPage`: Jump to page.
     * @param options The options of the event. Needed only when `event` is `jumpToPage`, specifying the target page you want to jump to.
     */
    public WindowDocsEvent(String event, Options options) {
        this.event = event;
        this.options = options;
    }

    /**
     * Jumps to a specified page of a doc.
     *
     * @param page The target page you want to jump to.
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
