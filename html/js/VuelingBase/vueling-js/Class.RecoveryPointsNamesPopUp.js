

VUELING.Class.RecoveryPointsNamesPopUp = function () {

    var parent = new SKYSALES.Class.SkySales(),
    thisRecoveryPointsNamesPopUp = SKYSALES.Util.extendObject(parent);

    thisRecoveryPointsNamesPopUp.rowClickedBeforeOpenDialog = null;
    thisRecoveryPointsNamesPopUp.DialogName = "RecoveryPointsNamesPopUp";
    thisRecoveryPointsNamesPopUp.DisclaimerAccepted = false;
    thisRecoveryPointsNamesPopUp.blockUI = null;
    thisRecoveryPointsNamesPopUp.onClick = null;

    thisRecoveryPointsNamesPopUp.init = function (json) {

        this.setSettingsByObject(json);

        var acceptDialogName = 'Accept' + thisRecoveryPointsNamesPopUp.DialogName;
        var cancelDialogName = 'Cancel' + thisRecoveryPointsNamesPopUp.DialogName;
        var closeDialogName = 'Close' + thisRecoveryPointsNamesPopUp.DialogName;

        thisRecoveryPointsNamesPopUp.blockUI = new SKYSALES.Class.BlockedPopUp();
        var jsonBlockUI = {};
        jsonBlockUI.closeElement = $('[data-object="' + closeDialogName + '"]');
        jsonBlockUI.properties = { css: { width: '681px' } };
        thisRecoveryPointsNamesPopUp.blockUI.init(jsonBlockUI);
        $('[data-object="' + acceptDialogName + '"]').click(thisRecoveryPointsNamesPopUp.acceptDialog);
        $('[data-object="' + cancelDialogName + '"]').click(thisRecoveryPointsNamesPopUp.cancelDialog);
        thisRecoveryPointsNamesPopUp.showDialog();
    };

    thisRecoveryPointsNamesPopUp.removeDialogRequirement = function () {
        thisRecoveryPointsNamesPopUp.DisclaimerAccepted = true;
        $('[data-object="' + thisRecoveryPointsNamesPopUp.DialogName + '"]').removeAttr("data-object");
    };

    thisRecoveryPointsNamesPopUp.showDialog = function () {
        thisRecoveryPointsNamesPopUp.blockUI.show(thisRecoveryPointsNamesPopUp.DialogName);
    };

    thisRecoveryPointsNamesPopUp.acceptDialog = function (e) {
        thisRecoveryPointsNamesPopUp.blockUI.close();
        thisRecoveryPointsNamesPopUp.removeDialogRequirement();
    };

    thisRecoveryPointsNamesPopUp.cancelDialog = function (e) {
        thisRecoveryPointsNamesPopUp.blockUI.close();
    };

    return thisRecoveryPointsNamesPopUp;
};