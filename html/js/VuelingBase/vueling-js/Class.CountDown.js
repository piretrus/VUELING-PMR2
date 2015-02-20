

VUELING.Class.CountDown = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisCountDown = SKYSALES.Util.extendObject(parent);

    thisCountDown.DateTimeLocal = null;
    thisCountDown.DateTimeclockHourId = '';
    thisCountDown.DateTimeclockMinId = '';
    thisCountDown.DateTimeclockSecId = '';
    thisCountDown.DateTimeclockDayId = '';
    thisCountDown.DateTimeclockHour = null;
    thisCountDown.DateTimeclockMin = null;
    thisCountDown.DateTimeclockSec = null;
    thisCountDown.DateTimeclockDay = null;
    thisCountDown.MoreThanOneDay = false;

    thisCountDown.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
    };

    thisCountDown.initObject = function () {
        thisCountDown.DateTimeclockHour = this.getById(thisCountDown.DateTimeclockHourId);
        thisCountDown.DateTimeclockMin = this.getById(thisCountDown.DateTimeclockMinId);
        thisCountDown.DateTimeclockSec = this.getById(thisCountDown.DateTimeclockSecId);
        thisCountDown.DateTimeclockDay = this.getById(thisCountDown.DateTimeclockDayId);
    };

    thisCountDown.addCountDown = function () {
        if (thisCountDown.MoreThanOneDay) {
            thisCountDown.DateTimeclockDay.epiclock({ mode: 'countdown', target: thisCountDown.DateTimeLocal, format: 'v' });
            $("#"+thisCountDown.DateTimeclockDayId+"Cont").show();
        }
        thisCountDown.DateTimeclockHour.epiclock({ mode: 'countdown', target: thisCountDown.DateTimeLocal, format: 'x' });
        thisCountDown.DateTimeclockMin.epiclock({ mode: 'countdown', target: thisCountDown.DateTimeLocal, format: 'i' });
        thisCountDown.DateTimeclockSec.epiclock({ mode: 'countdown', target: thisCountDown.DateTimeLocal, format: 's' });
    };

    return thisCountDown;
};