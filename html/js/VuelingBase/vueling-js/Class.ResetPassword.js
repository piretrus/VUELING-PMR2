

VUELING.Class.ResetPassword = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisResetPassword = SKYSALES.Util.extendObject(parent);

    thisResetPassword.password = "";
    thisResetPassword.passwordFieldId = "";

    thisResetPassword.passwordField = null;

    thisResetPassword.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
    };
    thisResetPassword.setVars = function () {
        if (thisResetPassword.passwordFieldId != "") {
            thisResetPassword.passwordField = $("#" + thisResetPassword.passwordFieldId);
            thisResetPassword.passwordField.val(thisResetPassword.password);
        }
    };
    return thisResetPassword;
};