

VUELING.Class.DeprecatedBrowserAdvice = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisDeprecatedBrowserAdvice = SKYSALES.Util.extendObject(parent);

    thisDeprecatedBrowserAdvice.adviceId = "";
    thisDeprecatedBrowserAdvice.closeButtonId = "";
    thisDeprecatedBrowserAdvice.adviceWidth = "";
    thisDeprecatedBrowserAdvice.cookieName = "";
    thisDeprecatedBrowserAdvice.cookieExpiration = "";

    thisDeprecatedBrowserAdvice.init = function (json) {
        this.setSettingsByObject(json);

        try {
            var isIE = $.browser.msie,
            browserVersion = parseInt($.browser.version, 10),
            cookie = VUELING.Util.Cookies.getCookie(thisDeprecatedBrowserAdvice.cookieName);

            if (isIE && browserVersion < 8 && !cookie) {
                VUELING.Util.Cookies.setCookie(thisDeprecatedBrowserAdvice.cookieName, 1, thisDeprecatedBrowserAdvice.cookieExpiration, "localhost");
                var json = {},
                blockUI = new SKYSALES.Class.BlockedPopUp();
                json.closeElement = $(thisDeprecatedBrowserAdvice.closeButtonId);
                if (thisDeprecatedBrowserAdvice.adviceWidth)
                    json.properties = { css: { width: thisDeprecatedBrowserAdvice.adviceWidth + 'px' } };
                blockUI.init(json);
                blockUI.show(this.adviceId);
            }
        }
        catch (err) { }
    };

    return thisDeprecatedBrowserAdvice;
};