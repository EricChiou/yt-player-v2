export interface DeviceInfo {
  mobile: boolean;
  ios: boolean;
  android: boolean;
  chrome: boolean;
  safari: boolean;
  firefox: boolean;
  ie: boolean;
  edge: boolean;
  webView: boolean;
}

export const getDeviceInfo = (): DeviceInfo | null => {
  if (!window.navigator || !window.navigator.userAgent) {
    return null;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  return {
    mobile: /(ipod|ipad|iphone|android|mobile)/.test(userAgent),
    ios: /(ipod|ipad|iphone)/.test(userAgent),
    android: /(android)/.test(userAgent),
    chrome: /(chrome)/.test(userAgent) && !/(edg)/.test(userAgent),
    safari: /(safari)/.test(userAgent) && !/(chrome)/.test(userAgent),
    firefox: /(firefox)/.test(userAgent),
    ie: /(msie)/.test(userAgent),
    edge: /(edge|trident|edg)/.test(userAgent),
    webView: /(fbav|line|wv|iab|webview)/.test(userAgent),
  };
};
