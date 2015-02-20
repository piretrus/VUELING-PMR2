

VUELING.Class.LoginCheckin = function () {
    var parent = SKYSALES.Class.SkySales(),
    loginCheckin = SKYSALES.Util.extendObject(parent);

    loginCheckin.DivDormFieldOriginInfoToolTip = '';
    loginCheckin.IcoOriginInfo = '';
    loginCheckin.IdInputPNR = '';


    loginCheckin.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    loginCheckin.initObject = function () {
        loginCheckin.DivDormFieldOriginInfoToolTip = this.getById(loginCheckin.DivDormFieldOriginInfoToolTip);
        loginCheckin.IcoOriginInfo = this.getById(loginCheckin.IcoOriginInfo);
        loginCheckin.IdInputPNR = this.getById(loginCheckin.IdInputPNR);
    };

    loginCheckin.addEvents = function () {
        loginCheckin.IcoOriginInfo.hover(
            function () {
                loginCheckin.DivDormFieldOriginInfoToolTip.show();
            },
            function () {
                loginCheckin.DivDormFieldOriginInfoToolTip.hide();
            }
        );

        loginCheckin.IdInputPNR.blur(loginCheckin.TrimPNR);
    };

    loginCheckin.TrimPNR = function (e) {
        var PNRText = loginCheckin.IdInputPNR.val();
        var PNRFixed = $.trim(PNRText);
        $(loginCheckin.IdInputPNR).val(PNRFixed);
    };

    return loginCheckin;
};