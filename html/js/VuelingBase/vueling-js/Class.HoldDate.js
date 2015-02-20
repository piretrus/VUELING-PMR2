

VUELING.Class.HoldDate = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisHoldDate = SKYSALES.Util.extendObject(parent);

    thisHoldDate.HoldDateTimeUTC = '';
    thisHoldDate.HoldDateTimeText = '';
    thisHoldDate.HoldDateTimeDayText = '';
    thisHoldDate.HoldDateTimeMonthText = '';
    thisHoldDate.HoldDateTimeYearText = '';
    thisHoldDate.HoldDateTimeHourText = '';
    thisHoldDate.HoldDateTimeLabelId = '';
    thisHoldDate.HoldDateTimeLabel = null;
    thisHoldDate.HoldDateTimeLocal = null;
    thisHoldDate.HoldDateTimeclockHourId = '';
    thisHoldDate.HoldDateTimeclockMinId = '';
    thisHoldDate.HoldDateTimeclockSecId = '';
    thisHoldDate.HoldDateTimeclockDayId = '';
    thisHoldDate.HoldStatusLabelId = '';
    thisHoldDate.HoldStatusLabel = null;
    thisHoldDate.HoldStatusExpirationDateText = '';
    thisHoldDate.HoldStatusExpirationHourText = '';

    thisHoldDate.CountDown = null;

    thisHoldDate.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisHoldDate.initObject = function () {
        thisHoldDate.HoldDateTimeLabel = this.getById(thisHoldDate.HoldDateTimeLabelId);
        thisHoldDate.HoldStatusLabel = this.getById(thisHoldDate.HoldStatusLabelId);

        if (thisHoldDate.HoldDateTimeUTC != '')
            thisHoldDate.HoldDateTimeLocal = new Date(thisHoldDate.HoldDateTimeUTC + " UTC");

        
        
        thisHoldDate.CountDown = new VUELING.Class.CountDown();
        thisHoldDate.CountDown.init(
            {
                "DateTimeLocal": thisHoldDate.HoldDateTimeLocal,
                "DateTimeclockHourId": thisHoldDate.HoldDateTimeclockHourId,
                "DateTimeclockMinId": thisHoldDate.HoldDateTimeclockMinId,
                "DateTimeclockSecId": thisHoldDate.HoldDateTimeclockSecId,
                "DateTimeclockDayId": thisHoldDate.HoldDateTimeclockDayId,
                "MoreThanOneDay": thisHoldDate.CheckIsMoreThanOneDay()
            });

        if (thisHoldDate.HoldDateTimeLocal != null) {
            thisHoldDate.SetHoldDateTimeText();
            thisHoldDate.CountDown.addCountDown();

            if (thisHoldDate.HoldStatusLabel != null) {
                thisHoldDate.SetHoldStatusText();
            }
        }
    };

    thisHoldDate.addEvents = function () {
    };

    thisHoldDate.SetHoldDateTimeText = function () {
        var text = thisHoldDate.HoldDateTimeText;
        if (thisHoldDate.HoldDateTimeDayText != '')
            text = text.replace(thisHoldDate.HoldDateTimeDayText, thisHoldDate.HoldDateTimeLocal.getDate());
        if (thisHoldDate.HoldDateTimeMonthText != '')
            text = text.replace(thisHoldDate.HoldDateTimeMonthText, SKYSALES.Resource.dateCultureInfo.monthNames[thisHoldDate.HoldDateTimeLocal.getMonth()]);
        if (thisHoldDate.HoldDateTimeYearText != '')
            text = text.replace(thisHoldDate.HoldDateTimeYearText, thisHoldDate.HoldDateTimeLocal.getFullYear());
        if (thisHoldDate.HoldDateTimeHourText != '') 
            text = text.replace(thisHoldDate.HoldDateTimeHourText, thisHoldDate.CheckLengthClockText(thisHoldDate.HoldDateTimeLocal.getHours()) + ':' + thisHoldDate.CheckLengthClockText(thisHoldDate.HoldDateTimeLocal.getMinutes()));
        thisHoldDate.HoldDateTimeLabel.html(text);
    };

    thisHoldDate.SetHoldStatusText = function() {
        var text = thisHoldDate.HoldStatusLabel.html();
        if (text != null) {
            if (thisHoldDate.HoldStatusExpirationDateText != '')
                text = text.replace(thisHoldDate.HoldStatusExpirationDateText, thisHoldDate.HoldDateTimeLocal.toLocaleDateString());
            if (thisHoldDate.HoldStatusExpirationHourText != '') 
                text = text.replace(thisHoldDate.HoldStatusExpirationHourText, thisHoldDate.CheckLengthClockText(thisHoldDate.HoldDateTimeLocal.getHours()) + ':' + thisHoldDate.CheckLengthClockText(thisHoldDate.HoldDateTimeLocal.getMinutes()));
            thisHoldDate.HoldStatusLabel.html(text);
        }
    };
    
    thisHoldDate.CheckLengthClockText = function(str)
    {
        return str.toString().length == 2 ? str : "0" + str;
    };

    thisHoldDate.CheckIsMoreThanOneDay = function() {
        var t1 = new Date();
        var dif = thisHoldDate.HoldDateTimeLocal.getTime() - t1.getTime();
        var t1tot2 = dif / 1000;
        var sbd = Math.abs(t1tot2);
        return (sbd > 86400);       
    };

    return thisHoldDate;
};