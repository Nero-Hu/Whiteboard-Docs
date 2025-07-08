package com.herewhite.sdk.domain;

import java.util.Map;

/** 多窗口模式下，小窗应用的相关信息。*/
public class WindowAppSyncAttrs {
    /** 小窗应用类型。 */
    private String kind;
    /** 小窗应用可选数据源。 */
    private String src;
    /** 小窗应用参数。 */
    private Object options;
    /** 小窗应用可选状态。 */
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
