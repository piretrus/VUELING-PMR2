

VUELING.Class.FillAgencyUsername = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisFillAgencyUsername = SKYSALES.Util.extendObject(parent);

    thisFillAgencyUsername.username = "";
    thisFillAgencyUsername.usernameFieldId = "";

    thisFillAgencyUsername.usernameField = null;

    thisFillAgencyUsername.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
    };
    thisFillAgencyUsername.setVars = function () {
        if (thisFillAgencyUsername.usernameFieldId != "") {
            thisFillAgencyUsername.usernameField = $("#" + thisFillAgencyUsername.usernameFieldId);
            thisFillAgencyUsername.usernameField.val(thisFillAgencyUsername.username);
        }
    };
    return thisFillAgencyUsername;
};