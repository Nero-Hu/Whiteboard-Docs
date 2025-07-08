package com.herewhite.sdk.domain;

import java.util.Map;

/** Information about the window app in multi-window mode. */
public class WindowAppSyncAttrs {
    /** Type of the window app. */
    private String kind;
    /** Optional data source for the window app. */
    private String src;
    /** Parameters for the window app. */
    private Object options;
    /** Optional state for the window app. */
    private Object state;

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public Object getOptions() {
        return options;
    }

    public void setOptions(Object options) {
        this.options = options;
    }

    public Object getState() {
        return state;
    }

    public void setState(Object state) {
        this.state = state;
    }

    public String getTitle() {
        if (options instanceof Map) {
            return (String) ((Map) options).get("title");
        }
        return null;
    }
}
