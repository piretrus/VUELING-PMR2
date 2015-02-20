

VUELING.Class.PwdResetExternalPopUp = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisPwdResetExternalPopUp = SKYSALES.Util.extendObject(parent);

    thisPwdResetExternalPopUp.PasswordResetControlName = '';
    thisPwdResetExternalPopUp.linkPopUpId = '';
    thisPwdResetExternalPopUp.linkPopUp = null;

    thisPwdResetExternalPopUp.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisPwdResetExternalPopUp.setVars = function () {
        parent.setVars.call(this);
        thisPwdResetExternalPopUp.linkPopUp = $('#' + thisPwdResetExternalPopUp.linkPopUpId);
    };

    thisPwdResetExternalPopUp.addEvents = function () {
        thisPwdResetExternalPopUp.linkPopUp.click(thisPwdResetExternalPopUp.LaunchPopUp);
    };

    thisPwdResetExternalPopUp.LaunchPopUp = function () {
        var controlName = thisPwdResetExternalPopUp.PasswordResetControlName != ''
            ? thisPwdResetExternalPopUp.PasswordResetControlName
            : 'passwordReset';
        for (ins in SKYSALES.Instance) {
            if (ins.substring(0, controlName.length) === controlName) {
                SKYSALES.Instance[ins].State = 2;
                SKYSALES.Instance[ins].UpdateControl();
                var blockPopUp = new SKYSALES.Class.BlockedPopUp(),
                json = {};
                json.closeElement = $("#blockUIPopUpForLogin .blockUIPopUpClose");
                json.properties = { css: { width: '45em' } };
                blockPopUp.init(json);
                $("#blockUIPopUpForLogin #PuntoLogo").hide();
                $("#blockUIPopUpForLogin #MyVuelingLogo").show();
                $("#blockUIPopUpForLogin #RegistryDivPunto").hide();
                $("#blockUIPopUpForLogin #RegistryDivMyVueling").show();
                $("#blockUIPopUpForLogin #linkTextPunto").hide();
                $("#blockUIPopUpForLogin #linkTextMy").show();
                $("#programID").get(0).value = "MyVueling";
                blockPopUp.show("blockUIPopUpForLogin");
                break;
            }
        }
    };

    return thisPwdResetExternalPopUp;
};