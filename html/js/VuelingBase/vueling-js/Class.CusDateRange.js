

VUELING.Class.CusDateRange = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCusDateRange = SKYSALES.Util.extendObject(parent);
    resource = SKYSALES.Util.getResource();

    thisCusDateRange.divId = "";
    thisCusDateRange.openDivId = "";
    thisCusDateRange.closeDivId = "";
    thisCusDateRange.rangeFrom = "";
    thisCusDateRange.rangeTo = "";
    thisCusDateRange.changeMonth = false;
    thisCusDateRange.mindate = "";
    thisCusDateRange.maxdate = "";
    thisCusDateRange.numofMonths = 1;
    thisCusDateRange.fromInput = "";
    thisCusDateRange.toInput = "";
    thisCusDateRange.datedefault = "";
    thisCusDateRange.infoEl = "";
    thisCusDateRange.hideTrigger = "";
    thisCusDateRange.defaultDateSelected = false;

    thisCusDateRange.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisCusDateRange.setVars = function () {
        thisCusDateRange.divId = this.getById(this.divId);
        thisCusDateRange.openDivId = this.getById(this.openDivId);
        thisCusDateRange.closeDivId = this.getById(this.closeDivId);
        thisCusDateRange.rangeFrom = this.rangeFrom;
        thisCusDateRange.rangeTo = this.rangeTo;
        thisCusDateRange.changeMonth = (this.changeMonth == 'true') ? true : thisCusDateRange.changeMonth;
        thisCusDateRange.mindate = this.mindate;
        thisCusDateRange.maxdate = this.maxdate;
        thisCusDateRange.numofMonths = this.numofMonths;
        thisCusDateRange.fromInput = this.getById(this.fromInput);
        thisCusDateRange.toInput = this.getById(this.toInput);
        thisCusDateRange.datedefault = this.datedefault;
        thisCusDateRange.infoEl = (this.infoEl).split("|");
        thisCusDateRange.hideTrigger = this.getById(this.hideTrigger);
    };

    thisCusDateRange.addEvents = function () {
        thisCusDateRange.openDivId.click(function () {
            thisCusDateRange.divId.show();
            thisCusDateRange.locale();
            thisCusDateRange.calendarRange();
            return false;
        });
        thisCusDateRange.closeDivId.click(function () {
            thisCusDateRange.divId.hide();
            return false;
        });

        var dDate = new Date();
        var dMonth = dDate.getMonth() + 1;
        dMonth = ((dMonth.toString()).length == 1) ? "0" + dMonth : dMonth;
        var defDate = dDate.getDate() + thisCusDateRange.datedefault + '/' + dMonth + '/' + dDate.getFullYear();

        thisCusDateRange.defaultDateSelected = true;
        if ($(thisCusDateRange.fromInput).val() == "") {
            $(thisCusDateRange.fromInput).val(defDate);
            thisCusDateRange.defaultDateSelected = false;
        }
        if ($(thisCusDateRange.toInput).val() == "") {
            $(thisCusDateRange.toInput).val(defDate);
            thisCusDateRange.defaultDateSelected = false;
        }
        if (thisCusDateRange.defaultDateSelected) {
            thisCusDateRange.updateInputValue(thisCusDateRange.rangeFrom, $(thisCusDateRange.fromInput).val());
            thisCusDateRange.updateInputValue(thisCusDateRange.rangeTo, $(thisCusDateRange.toInput).val());
        }
    };

    thisCusDateRange.calendarRange = function () {
        $(function () {
            var dates = $("#" + thisCusDateRange.rangeFrom + ", #" + thisCusDateRange.rangeTo).datepicker({
                changeMonth: thisCusDateRange.changeMonth,
                minDate: thisCusDateRange.mindate,
                dateFormat: 'dd/mm/yy',
                maxDate: thisCusDateRange.maxdate,
                numberOfMonths: parseInt(thisCusDateRange.numofMonths),
                onSelect: function (selectedDate) {
                    var option = this.id == thisCusDateRange.rangeFrom ? "minDate" : "maxDate",
                    instance = $(this).data("datepicker"),
                    date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                    dates.not(this).datepicker("option", option, date);
                    thisCusDateRange.updateInputValue(this.id, selectedDate);
                    if (option == 'maxDate')
                        thisCusDateRange.divId.hide();
                }
            });
            if (thisCusDateRange.defaultDateSelected) {
                $("#" + thisCusDateRange.rangeFrom).datepicker("setDate", $(thisCusDateRange.fromInput).val());
                $("#" + thisCusDateRange.rangeTo).datepicker("setDate", $(thisCusDateRange.toInput).val());
            }
        });
    };

    thisCusDateRange.updateInputValue = function (id, selectedDate) {
        var inputid = (id == thisCusDateRange.rangeFrom) ? thisCusDateRange.fromInput : thisCusDateRange.toInput;
        var selectedDateInt = thisCusDateRange.formatDateToCompare(selectedDate);
        var fromDateInt = ($(thisCusDateRange.fromInput).val() != "") ? thisCusDateRange.formatDateToCompare($(thisCusDateRange.fromInput).val()) : 0;
        var toDateInt = ($(thisCusDateRange.toInput).val() != "") ? thisCusDateRange.formatDateToCompare($(thisCusDateRange.toInput).val()) : 0;

        if (id == thisCusDateRange.rangeFrom) {
            if (selectedDateInt > toDateInt || toDateInt == 0)
                $(thisCusDateRange.toInput).val(selectedDate);
        } else {
            if (selectedDateInt < fromDateInt || fromDateInt == 0)
                $(thisCusDateRange.fromInput).val(selectedDate);
        }
        $(inputid).val(selectedDate);
        $("#" + thisCusDateRange.infoEl[0]).val(thisCusDateRange.infoEl[1] + " " + $(thisCusDateRange.fromInput).val() + " " + thisCusDateRange.infoEl[2] + " " + $(thisCusDateRange.toInput).val());
        $(thisCusDateRange.hideTrigger).val(true);
    };

    thisCusDateRange.formatDateToCompare = function (d) {
        var seldate = d.split("/");
        var seldatestr = parseInt(seldate[2] + seldate[1] + seldate[0]);
        return seldatestr;
    };

    thisCusDateRange.locale = function () {
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
    };

    return thisCusDateRange;
};