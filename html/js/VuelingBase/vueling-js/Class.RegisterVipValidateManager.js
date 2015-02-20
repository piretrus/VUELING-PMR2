

VUELING.Class.RegisterVipValidateManager = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisRegisterVipValidateManager = SKYSALES.Util.extendObject(parent);

    thisRegisterVipValidateManager.RegisterSubmitButtonId = '';
    thisRegisterVipValidateManager.RegisterValidateContainerId = '';
    thisRegisterVipValidateManager.LoginVipSubmitButtonId = '';
    thisRegisterVipValidateManager.LoginVipValidateContainerId = '';
    thisRegisterVipValidateManager.FullContainerId = '';

    thisRegisterVipValidateManager.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisRegisterVipValidateManager.addEvents = function () {
        $('#' + thisRegisterVipValidateManager.RegisterSubmitButtonId).click(function () {
            $('#errorMsg').remove();
            SKYSALES.Util.cleanValidateBySelector('#' + thisRegisterVipValidateManager.FullContainerId);
            return SKYSALES.Util.validateBySelector('#' + thisRegisterVipValidateManager.RegisterValidateContainerId);
        });

        $('#' + thisRegisterVipValidateManager.LoginVipSubmitButtonId).click(function () {
            $('#errorMsg').remove();
            SKYSALES.Util.cleanValidateBySelector('#' + thisRegisterVipValidateManager.FullContainerId);
            return SKYSALES.Util.validateBySelector('#' + thisRegisterVipValidateManager.LoginVipValidateContainerId);
        });
    };

    return thisRegisterVipValidateManager;
};