package com.herewhite.sdk.domain;

import com.google.gson.annotations.SerializedName;

/**
 * Font file configurations. This class is similar to the `@font-face` attribute in CSS.
 *
 * @since 2.11.2
 */
public class FontFace extends WhiteObject {

    /**
     * @param name The font name. This parameter is equivalent to the `font-family` field in CSS.
     * @param src  The path to the font file. This parameter is equivalent to the `src` field in CSS. The supported format is `url()`, where you can fill in the URL to a remote font file location, for example, `url("https://white-pan.oss-cn-shanghai.aliyuncs.com/Pacifico-Regular.ttf")`.
     *
     */
    public FontFace(String name, String src) {
        this.fontFamily = name;
        this.src = src;
    }

    //@SerializedName("font-family")
    private String fontFamily;
    private String src;

    /**
     * Gets the font style.
     *
     * @return The font style.
     */
    public String getFontStyle() {
        return fontStyle;
    }

    /**
     * Sets the font style.
     *
     * @param fontStyle The font style. This parameter is equivalent to the `font-style` field in CSS, and can be set to:
     * - `normal`：(Default) Normal.
     * - `italic`：Italic.
     */
    public void setFontStyle(String fontStyle) {
        this.fontStyle = fontStyle;
    }

    /**
     * Gets the font weight.
     *
     * @return The font weight.
     */
    public String getFontWeight() {
        return fontWeight;
    }

    /**
     * Sets the font weight.
     *
     * @param fontWeight The font weight. This parameter is equivalent to the `font-weight` field in CSS.
     */
    public void setFontWeight(String fontWeight) {
        this.fontWeight = fontWeight;
    }

    /**
     * Gets the range of Unicode code points to be used by the font.
     *
     * @return The range of Unicode code points to be used by the font.
     */
    public String getUnicodeRange() {
        return unicodeRange;
    }

    /**
     * Sets the range of Unicode code points to be used by the font.
     *
     * @param unicodeRange The range of Unicode code points to be used by the font. This parameter is equivalent to the `unicode-range` field in CSS.
     */
    public void setUnicodeRange(String unicodeRange) {
        this.unicodeRange = unicodeRange;
    }

    //@SerializedName("font-style")
    private String fontStyle;
    //@SerializedName("font-weight")
    private String fontWeight;
    //@SerializedName("unicode-range")
    private String unicodeRange;
}
