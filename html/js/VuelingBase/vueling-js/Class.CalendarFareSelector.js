/*
Name: 
Class CalendarAvailabilityInput
Param:
None
Return: 
An instance of CalendarAvailabilityInput
Functionality:
Displays the low fare calendar
Notes:
This is the container object that has an array of markets
Class Hierarchy:
SkySales -> CalendarAvailabilityInputBase -> CalendarAvailabilityInput
*/
VUELING.Class.CalendarFareSelector = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCalendarFareSelector = SKYSALES.Util.extendObject(parent);

    thisCalendarFareSelector.marketIndex = -1,
    thisCalendarFareSelector.selectedDate = '',

    thisCalendarFareSelector.fareSelected = '',
    thisCalendarFareSelector.faresDropDownPrefix = 'faresDropDown_';
    thisCalendarFareSelector.faresDropDown = '';

    thisCalendarFareSelector.disableFareSelector = false;

    thisCalendarFareSelector.init = function (json) {
        this.setVars(json);
        thisCalendarFareSelector.setInitialState();
    };

    thisCalendarFareSelector.setVars = function (data) {
        this.marketIndex = data.marketIndex;

        var dateSplitted = data.marketArray[this.marketIndex].selectedDate.split("_");
        this.selectedDate = (dateSplitted.length == 3) ? new Date(dateSplitted[0], dateSplitted[1], dateSplitted[2]) : null;

        thisCalendarFareSelector.loadingGif = this.getById('loadingGif_' + this.marketIndex);

        thisCalendarFareSelector.faresDropDown = this.getById(this.faresDropDownPrefix + this.marketIndex);
        thisCalendarFareSelector.setSelectedFare(data.marketArray[this.marketIndex].selectedFare);
        thisCalendarFareSelector.disableFareSelector = (data.isChangeFlight == "true");
    };

    thisCalendarFareSelector.addEvents = function () {
        thisCalendarFareSelector.faresDropDown.unbind('change').change(thisCalendarFareSelector.changeFareType);
    };

    thisCalendarFareSelector.changeFareType = function () {

        var selectedFareVal = thisCalendarFareSelector.getSelectedFare();
        var selectedDateString = $.datepicker.formatDate("m/d/yy", thisCalendarFareSelector.selectedDate);

        thisCalendarFareSelector.toggleSpinner();

        ajaxJson = {
            "tabs": [0, 1],
            "clickedMarketIndex": thisCalendarFareSelector.marketIndex,
            "selectedFare": selectedFareVal,
            "selectedDate": selectedDateString
        };
        $.post('CalendarAvailabilityAjax-resource.aspx', ajaxJson, thisCalendarFareSelector.updateCalendarAvailability);
    };

    thisCalendarFareSelector.getSelectedFare = function () {
        return this.faresDropDown.val();
    };

    thisCalendarFareSelector.setSelectedFare = function (value) {
        return this.faresDropDown.val(value);
    };

    thisCalendarFareSelector.updateCalendarAvailability = function (data) {

        var newData = $(data),
            calendarInfoData = newData.find('#calendarJson'),
            calendarInfoJson = SKYSALES.Json.parse(calendarInfoData.html()),
            calendarAvailabilityObj = null,
            journeyIndex = thisCalendarFareSelector.marketIndex;

        journeyIndex = parseInt(journeyIndex, 10);

        calendarInfoData.remove();
        if (journeyIndex === 0) {
            newData.find('#monthTabs_1').remove();
        } else {
            newData.find('#monthTabs_0').remove();
        }
        calendarInfoJson.marketIndex = journeyIndex;
        html = newData.html();

        //add the new html and clear out the old stuff
        if (journeyIndex === 0) {
            thisCalendarFareSelector.getById('outboundFlightCalendar').replaceWith(html);
        } else {
            thisCalendarFareSelector.getById('returnFlightCalendar').replaceWith(html);
        }
        calendarAvailabilityObj = new VUELING.Class.CalendarAvailabilityInput();
        calendarAvailabilityObj = calendarAvailabilityObj.init(calendarInfoJson);
        thisCalendarFareSelector.toggleSpinner();

        thisCalendarFareSelector.updateAllMarkets = false;
        if ($.browser.msie && $.browser.version < 8) {
            $('.wrap_availability').each(function () {
                if ($(this).html() == '') $(this).remove();
            });
        }
    };

    thisCalendarFareSelector.toggleSpinner = function () {
        thisCalendarFareSelector.loadingGif.find('#loadCalendarMonth').show()
        thisCalendarFareSelector.loadingGif.find('#loadCalendarDay').hide()
        thisCalendarFareSelector.loadingGif.toggle();
    };

    thisCalendarFareSelector.setInitialState = function () {
        if (thisCalendarFareSelector.disableFareSelector) {
            $("#" + thisCalendarFareSelector.faresDropDownPrefix + thisCalendarFareSelector.marketIndex).parent().hide();
        }
    };

    return thisCalendarFareSelector;
};