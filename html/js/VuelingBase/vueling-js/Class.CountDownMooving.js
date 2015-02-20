

VUELING.Class.CountDownMooving = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisCountDownMooving = SKYSALES.Util.extendObject(parent);

    thisCountDownMooving.MoovingDateTimeUTC = '';
    thisCountDownMooving.MoovingDateTimeLocal = null;
    thisCountDownMooving.MoovingDateTimeclockHourId = '';
    thisCountDownMooving.MoovingDateTimeclockMinId = '';
    thisCountDownMooving.MoovingDateTimeclockSecId = '';

    thisCountDownMooving.CountDown = null;

    thisCountDownMooving.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
    };

    thisCountDownMooving.initObject = function () {
        if (thisCountDownMooving.MoovingDateTimeUTC != '')
            thisCountDownMooving.MoovingDateTimeLocal = new Date(thisCountDownMooving.MoovingDateTimeUTC + " UTC");

        thisCountDownMooving.CountDown = new VUELING.Class.CountDown();
        thisCountDownMooving.CountDown.init(
            {
                "DateTimeLocal": thisCountDownMooving.MoovingDateTimeLocal,
                "DateTimeclockHourId": thisCountDownMooving.MoovingDateTimeclockHourId,
                "DateTimeclockMinId": thisCountDownMooving.MoovingDateTimeclockMinId,
                "DateTimeclockSecId": thisCountDownMooving.MoovingDateTimeclockSecId
            });

        if (thisCountDownMooving.MoovingDateTimeLocal != null) {
            thisCountDownMooving.CountDown.addCountDown();
        }
    };

    return thisCountDownMooving;
};