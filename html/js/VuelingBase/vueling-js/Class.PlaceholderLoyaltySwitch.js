


VUELING.Class.PlaceholderLoyaltySwitch = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisPlaceholder = SKYSALES.Util.extendObject(parent);

    thisPlaceholder.myVuelingText = "";
    thisPlaceholder.iberiaPlusText = "";
    thisPlaceholder.checkboxMyVuelingId = "";
    thisPlaceholder.chekcboxIberiaId = "";
    thisPlaceholder.inputId = "";

    thisPlaceholder.checkboxMyVueling = null;
    thisPlaceholder.checkboxIberia = null;
    thisPlaceholder.input = null;

    thisPlaceholder.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
        thisPlaceholder.switchHandler.call(this);
    };

    thisPlaceholder.setVars = function () {
        parent.setVars.call(this);
        this.checkboxMyVueling = $("#" + this.checkboxMyVuelingId);
        this.checkboxIberia = $("#" +  this.chekcboxIberiaId);
        this.input = $("#" + this.inputId);
    };

    thisPlaceholder.addEvents = function () {
        parent.addEvents.call(this);
        this.checkboxMyVueling.change(thisPlaceholder.switchHandler);
        this.checkboxIberia.change(thisPlaceholder.switchHandler);
    };

    thisPlaceholder.switchHandler = function (e) {
        if (thisPlaceholder.checkboxMyVueling.is(":checked")) {
            thisPlaceholder.input.attr("placeholder", thisPlaceholder.myVuelingText);
            thisPlaceholder.input.unbind("focus");
        } else if (thisPlaceholder.checkboxIberia.is(":checked")) {
            thisPlaceholder.input.focus(thisPlaceholder.preventCopyIbPlusData);
            thisPlaceholder.input.attr("placeholder", thisPlaceholder.iberiaPlusText);
            thisPlaceholder.preventCopyIbPlusData();
        }
    };

    thisPlaceholder.preventCopyIbPlusData = function () {
        var dataPax = VUELING.Util.getObjectInstance('dataPassenger');
        if (dataPax != null) {
            if (dataPax.chkPassenger.is(":checked")) {
                dataPax.diableEvents();
                dataPax.chkPassenger.attr('checked', false); 
            }
        }
    };

    return thisPlaceholder;
};