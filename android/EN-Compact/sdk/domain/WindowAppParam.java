package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

import java.util.UUID;

/**
 * The `WindowAppParam` class. Used to construct the `WindowAppParam` object.
 */
public class WindowAppParam {
    public static final String KIND_DOCSVIEWER = "DocsViewer";
    public static final String KIND_MEDIAPLAYER = "MediaPlayer";
    public static final String KIND_SLIDE = "Slide";

    private String kind;
    private Options options;
    private Attributes attributes;

    public WindowAppParam(String kind, Options options, Attributes attributes) {
        this.kind = kind;
        this.options = options;
        this.attributes = attributes;
    }

    public static WindowAppParam createDocsViewerApp(String scenePath, Scene[] scenes, String title) {
        DocOptions options = new DocOptions(scenePath, scenes, title);
        return new WindowAppParam(KIND_DOCSVIEWER, options, null);
    }

    public static WindowAppParam createMediaPlayerApp(String src, String title) {
        PlayerOptions options = new PlayerOptions(title);
        PlayerAttributes attributes = new PlayerAttributes(src);
        return new WindowAppParam(KIND_MEDIAPLAYER, options, attributes);
    }

    public static WindowAppParam createSlideApp(String scenePath, Scene[] scenes, String title) {
        SlideOptions options = new SlideOptions(scenePath, scenes, title);
        return new WindowAppParam(KIND_SLIDE, options, null);
    }

    /**
     * Constructs the parameters used to add PPT slides in whiteboard.
     * @param taskUuid The task UUID of the conversion task.
     * @param prefixUrl URL begins with http or https, such as https://convertcdn.netless.link/dynamicConvert. Notice that the URL does not end with `/`.
     * @param title The title of the window, which is used to display the inserted docs.
     * @return The `WindowAppParam` object.
     */
    public static WindowAppParam createSlideApp(String taskUuid, String prefixUrl, String title) {
        if (!prefixUrl.startsWith("http")) {
            throw new IllegalArgumentException("params error, check taskUuid and prefixUrl");
        }
        return new WindowAppParam(
                KIND_SLIDE,
                new ProjectorOptions(String.format("/%s/%s", taskUuid, UUID.randomUUID()), title),
                new ProjectorAttributes(taskUuid, prefixUrl)
        );
    }

    public String getKind() {
        return kind;
    }

    public Options getOptions() {
        return options;
    }

    public Attributes getAttributes() {
        return attributes;
    }

    private static class DocOptions extends Options {
        private final String scenePath;
        private final Scene[] scenes;

        public DocOptions(String scenePath, Scene[] scenes, String title) {
            super(title);
            this.scenePath = scenePath;
            this.scenes = scenes;
        }
    }

    private static class SlideOptions extends Options {
        private final String scenePath;
        private final Scene[] scenes;

        public SlideOptions(String scenePath, Scene[] scenes, String title) {
            super(title);
            this.scenePath = scenePath;
            this.scenes = scenes;
        }

        public SlideOptions(String scenePath, String title) {
            super(title);
            this.scenePath = scenePath;
            this.scenes = null;
        }
    }

    private static class PlayerOptions extends Options {
        public PlayerOptions(String title) {
            super(title);
        }
    }

    private static class PlayerAttributes extends Attributes {
        private final String src;

        public PlayerAttributes(String src) {
            this.src = src;
        }
    }

    public static class ProjectorOptions extends Options {
        private final String scenePath;

        public ProjectorOptions(String scenePath, String title) {
            super(title);
            this.scenePath = scenePath;
        }
    }

    public static class ProjectorAttributes extends Attributes {
        @SerializedName("taskId")
        private final String taskUuid;
        @SerializedName("url")
        private final String prefixUrl;

        public ProjectorAttributes(String taskUuid, String prefixUrl) {
            this.taskUuid = taskUuid;
            this.prefixUrl = prefixUrl;
        }
    }


    public static class Options extends WhiteObject {
        private String title;

        public Options(String title) {
            this.title = title;
        }
    }

    public static class Attributes extends WhiteObject {

    }
}
