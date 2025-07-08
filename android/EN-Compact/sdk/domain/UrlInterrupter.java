package com.herewhite.sdk.domain;

/**
 * @deprecated This interface is deprecated. Use the {@link com.herewhite.sdk.CommonCallback#urlInterrupter(String) urlInterrupter} method in {@link com.herewhite.sdk.CommonCallback CommonCallback} instead.
 */
public interface UrlInterrupter {
    /**
     * Intercepts an image URL address.
     *
     * @param sourceUrl The original URL address of an image.
     *
     * @return The URL address that you specify to replace the original one. Ensure that you set the return value.
     */
    String urlInterrupter(String sourceUrl);
}
