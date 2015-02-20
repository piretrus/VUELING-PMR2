

VUELING.Class.ResiFamNumApplyAlert = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisResiFamNumApplyAlert = SKYSALES.Util.extendObject(parent);

    thisResiFamNumApplyAlert.divId = "";
    thisResiFamNumApplyAlert.div = "";
    thisResiFamNumApplyAlert.availabilitiesClass = "availabilityBody";

    thisResiFamNumApplyAlert.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        setTimeout(function () { thisResiFamNumApplyAlert.showOrHideAlert(); }, 0);
    };

    thisResiFamNumApplyAlert.setVars = function () {
        thisResiFamNumApplyAlert.div = this.getById(this.divId);
    };

    thisResiFamNumApplyAlert.addEvents = function () {
    };

    thisResiFamNumApplyAlert.showOrHideAlert = function () {
        var hasFlights = false;
        $('.' + thisResiFamNumApplyAlert.availabilitiesClass).each(function () {
            if ($('input', this).length > 0) {
                thisResiFamNumApplyAlert.div.show();
                hasFlights = true;
                return;
            }
        });

        if (hasFlights == false)
            thisResiFamNumApplyAlert.div.hide();
    };

    return thisResiFamNumApplyAlert;
};