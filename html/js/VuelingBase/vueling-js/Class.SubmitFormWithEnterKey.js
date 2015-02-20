

VUELING.Class.SubmitFormWithEnterKey = function () {
    var parent = SKYSALES.Class.SkySales(),
            thisSubmitFormWithEnterKey = SKYSALES.Util.extendObject(parent);

    thisSubmitFormWithEnterKey.submitKeyId = '';
    thisSubmitFormWithEnterKey.inputIds = [];

    thisSubmitFormWithEnterKey.submitKey = null;
    thisSubmitFormWithEnterKey.inputs = [];

    thisSubmitFormWithEnterKey.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisSubmitFormWithEnterKey.initObject = function () {
        thisSubmitFormWithEnterKey.submitKey = document.getElementById(thisSubmitFormWithEnterKey.submitKeyId);
    };

    thisSubmitFormWithEnterKey.addEvents = function () {
        var isIEbrowser = $.browser.msie;
        for (var i = 0, ii = thisSubmitFormWithEnterKey.inputIds.length; i < ii; i++) {
            document.getElementById(thisSubmitFormWithEnterKey.inputIds[i]).onkeydown = function (e) {
                if (isIEbrowser) {
                    expectedKeyCode = event.keyCode;
                } else {
                    expectedKeyCode = e.keyCode;
                }
                if (expectedKeyCode === 13) {
                    if (thisSubmitFormWithEnterKey.submitKey)
                        thisSubmitFormWithEnterKey.submitKey.click();
                }
                return true;
            };
        }
    };

    return thisSubmitFormWithEnterKey;
};