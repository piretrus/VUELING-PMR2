

VUELING.Class.NotificationPopUp = function () {

    var parent = new SKYSALES.Class.SkySales(),
    thisNotificationPopUp = SKYSALES.Util.extendObject(parent);

    thisNotificationPopUp.rowClickedBeforeOpenDialog = null;
    thisNotificationPopUp.DialogName = null;
    thisNotificationPopUp.DisclaimerAccepted = false;
    thisNotificationPopUp.blockUI = null;
    thisNotificationPopUp.onClick = null;

    thisNotificationPopUp.init = function (json) {

        this.setSettingsByObject(json);

        var acceptDialogName = 'Accept' + thisNotificationPopUp.DialogName;
        var cancelDialogName = 'Cancel' + thisNotificationPopUp.DialogName;
        var closeDialogName = 'Close' + thisNotificationPopUp.DialogName;

        thisNotificationPopUp.blockUI = new SKYSALES.Class.BlockedPopUp();
        var jsonBlockUI = {};
        jsonBlockUI.closeElement = $('[data-object="' + closeDialogName + '"]');
        jsonBlockUI.properties = { css: { width: '681px' } };
        thisNotificationPopUp.blockUI.init(jsonBlockUI);
        $('[data-object="' + acceptDialogName + '"]').click(thisNotificationPopUp.acceptDialog);
        $('[data-object="' + cancelDialogName + '"]').click(thisNotificationPopUp.cancelDialog);
        thisNotificationPopUp.showDialog();
    };

    thisNotificationPopUp.removeDialogRequirement = function () {
        thisNotificationPopUp.DisclaimerAccepted = true;
        $('[data-object="' + thisNotificationPopUp.DialogName + '"]').removeAttr("data-object");
    };

    thisNotificationPopUp.showDialog = function () {
        thisNotificationPopUp.blockUI.show(thisNotificationPopUp.DialogName);
    };

    thisNotificationPopUp.acceptDialog = function (e) {
        thisNotificationPopUp.blockUI.close();
        thisNotificationPopUp.removeDialogRequirement();
    };

    thisNotificationPopUp.cancelDialog = function (e) {
        thisNotificationPopUp.blockUI.close();
    };

    return thisNotificationPopUp;
};