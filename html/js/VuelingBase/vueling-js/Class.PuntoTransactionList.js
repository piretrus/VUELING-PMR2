

VUELING.Class.PuntoTransactionList = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisPuntoTransactionList = SKYSALES.Util.extendObject(parent);
    thisPuntoTransactionList.spanId = '';
    thisPuntoTransactionList.spanText = '';
    thisPuntoTransactionList.calendarFromId = '';
    thisPuntoTransactionList.calendarFromBtnId = '';
    thisPuntoTransactionList.calendarFrom = null;
    thisPuntoTransactionList.calendarFromBtn = null;
    thisPuntoTransactionList.calendarUntilId = '';
    thisPuntoTransactionList.calendarUntilBtnId = '';
    thisPuntoTransactionList.calendarUntilBtn = null;
    thisPuntoTransactionList.calendarUntil = null;

    thisPuntoTransactionList.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisPuntoTransactionList.addEvents = function () {

        thisPuntoTransactionList.calendarFrom = $("#" + thisPuntoTransactionList.calendarFromId);
        thisPuntoTransactionList.calendarUntil = $("#" + thisPuntoTransactionList.calendarUntilId);
        thisPuntoTransactionList.calendarFromBtn = $("#" + thisPuntoTransactionList.calendarFromBtnId);
        thisPuntoTransactionList.calendarUntilBtn = $("#" + thisPuntoTransactionList.calendarUntilBtnId);

        $(thisPuntoTransactionList.calendarUntil).datepicker({ dateFormat: 'dd/mm/yy', maxDate: 0 });
        $(thisPuntoTransactionList.calendarFrom).datepicker({ dateFormat: 'dd/mm/yy', maxDate: 0 });

        thisPuntoTransactionList.calendarFromBtn.click(
            function () {
                thisPuntoTransactionList.calendarFrom.datepicker("show");
                return false;
            });
        
        thisPuntoTransactionList.calendarUntilBtn.click(
            function () {
                thisPuntoTransactionList.calendarUntil.datepicker("show");
                return false;
            });

        var resource = SKYSALES.Util.getResource();
        $.datepicker.regional['vy'] = {
            closeText: resource.datePickerInfo.closeText,
            prevText: resource.datePickerInfo.prevText,
            nextText: resource.datePickerInfo.nextText,
            currentText: resource.datePickerInfo.currentText,
            monthNames: resource.dateCultureInfo.monthNames,
            monthNamesShort: resource.dateCultureInfo.monthNamesShort,
            dayNames: resource.dateCultureInfo.dayNames,
            dayNamesShort: resource.dateCultureInfo.dayNamesShort,
            dayNamesMin: resource.dateCultureInfo.dayNamesMin
        };
        $.datepicker.setDefaults($.datepicker.regional['vy']);
        
        $(document).ready(thisPuntoTransactionList.onWindowReady);
    };

    thisPuntoTransactionList.onWindowReady = function () {
        var d = new Date();
        var strDate = '';

        var strvar = d.getDate();
        if (strvar < 10) {
            strvar = "0" + strvar;
        }
        strDate = strvar + "/";

        strvar = d.getMonth() + 1;
        if (strvar < 10) {
            strvar = "0" + strvar;
        }
        strDate = strDate + strvar + "/" + d.getFullYear() + ' ';

        strvar = d.getHours();
        if (strvar < 10) {
            strvar = "0" + strvar;
        }
        strDate = strDate + strvar + ':';

        strvar = d.getMinutes();
        if (strvar < 10) {
            strvar = "0" + strvar;
        }
        strDate = strDate + strvar + ':';

        strvar = d.getSeconds();
        if (strvar < 10) {
            strvar = "0" + strvar;
        }
        strDate = strDate + strvar;

        thisPuntoTransactionList.spanText = thisPuntoTransactionList.spanText + ' ' + strDate;
        $(thisPuntoTransactionList.spanId).html(thisPuntoTransactionList.spanText);
    };

    return thisPuntoTransactionList;
};