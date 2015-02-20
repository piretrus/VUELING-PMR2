/*
Name: 
Class ExcellenceDisclaimerDialog
Param:
None
Return: 
An instance of ExcellenceDisclaimerDialog
Functionality:
The object that initializes the ExcellenceDisclaimerDialog control dialog
Notes:
The ExcellenceDisclaimerDialog prompt a dialog that ask the user for disclaimer the Excellence Fare privileges
when the user attempt to change to Optima fare.
Class Hierarchy:
AvailabilityInput
*/

VUELING.Class.ExcellenceDisclaimerDialog = function () {

    var parent = new SKYSALES.Class.SkySales(),
    thisExcellenceDisclaimerDialog = SKYSALES.Util.extendObject(parent);

    thisExcellenceDisclaimerDialog.rowClickedBeforeOpenDialog = null;
    thisExcellenceDisclaimerDialog.DialogName = "ExcellenceDisclaimerDialog";
    thisExcellenceDisclaimerDialog.DisclaimerAccepted = false;
    thisExcellenceDisclaimerDialog.blockUI = null;
    thisExcellenceDisclaimerDialog.onClick = null;

    thisExcellenceDisclaimerDialog.init = function (json) {

        this.setSettingsByObject(json);

        var acceptDialogName = 'Accept' + thisExcellenceDisclaimerDialog.DialogName;
        var cancelDialogName = 'Cancel' + thisExcellenceDisclaimerDialog.DialogName;
        var closeDialogName = 'Close' + thisExcellenceDisclaimerDialog.DialogName;

        thisExcellenceDisclaimerDialog.blockUI = new SKYSALES.Class.BlockedPopUp();
        var jsonBlockUI = {};
        jsonBlockUI.closeElement = $('[data-object="' + closeDialogName + '"]');
        jsonBlockUI.properties = { css: { width: '681px' } };
        thisExcellenceDisclaimerDialog.blockUI.init(jsonBlockUI);
        $('[data-object="' + acceptDialogName + '"]').click(thisExcellenceDisclaimerDialog.acceptDialog);
        $('[data-object="' + cancelDialogName + '"]').click(thisExcellenceDisclaimerDialog.cancelDialog);

    };

    thisExcellenceDisclaimerDialog.removeDialogRequirement = function () {
        thisExcellenceDisclaimerDialog.DisclaimerAccepted = true;
        $('[data-object="' + thisExcellenceDisclaimerDialog.DialogName + '"]').removeAttr("data-object");
    };

    thisExcellenceDisclaimerDialog.showDialog = function (onClickEvent) {
        thisExcellenceDisclaimerDialog.onClick = onClickEvent;
        thisExcellenceDisclaimerDialog.blockUI.show(thisExcellenceDisclaimerDialog.DialogName);
    };

    thisExcellenceDisclaimerDialog.acceptDialog = function (e) {
        thisExcellenceDisclaimerDialog.blockUI.close();
        thisExcellenceDisclaimerDialog.removeDialogRequirement();
        thisExcellenceDisclaimerDialog.onClick(thisExcellenceDisclaimerDialog.rowClickedBeforeOpenDialog);
    };

    thisExcellenceDisclaimerDialog.cancelDialog = function (e) {
        thisExcellenceDisclaimerDialog.blockUI.close();
    };

    return thisExcellenceDisclaimerDialog;
};