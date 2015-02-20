/*
Name: 
Class MonthAjax
Param:
None
Return: 
An instance of MonthAjax
Functionality:
Manages Month Ajax on ScheduleSelect page
Notes:
This is used to make the ajax call to load a different month on the ScheduleSelect page
Class Hierarchy:
SkySales -> thisMonthAjax
*/
VUELING.Class.MonthAjax = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisMonthAjax = SKYSALES.Util.extendObject(parent);

    thisMonthAjax.marketIndex = 0;
    thisMonthAjax.calendarIconBaseId = 'calendar_icon_';
    thisMonthAjax.calendarLinkBaseId = 'calendar_link_';
    thisMonthAjax.availabilityInputContentBaseId = 'availabilityInputContent_';
    thisMonthAjax.outboundContainerId = 'outboundFlight';
    thisMonthAjax.inboundContainerId = 'returnFlight';
    thisMonthAjax.monthTab = {};
    thisMonthAjax.ajaxDivDisplayId = 'outboundFlightCalendar';
    thisMonthAjax.marketContainer = {};
    thisMonthAjax.scheduleContainerBaseId = 'availabilityTable';
    thisMonthAjax.automaticLaunch = 0;
    thisMonthAjax.flightTimeErrorMessage = '';
    thisMonthAjax.flightDateErrorMessage = '';

    thisMonthAjax.familyFaresData = [];
    thisMonthAjax.submitSelectedFare = false;
    thisMonthAjax.singleFareAvailable = "";

    thisMonthAjax.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars(json);
        this.addEvents();
    };
    thisMonthAjax.setVars = function (data) {
        var calendarIconId = this.calendarIconBaseId + this.marketIndex,
            calendarLinkId = this.calendarLinkBaseId + this.marketIndex,
            scheduleContainerId = this.scheduleContainerBaseId + this.marketIndex,
            availabilityInputContentId = this.availabilityInputContentBaseId + (parseInt(this.marketIndex) + 1);

        thisMonthAjax.scheduleContainer = this.getById(scheduleContainerId);
        thisMonthAjax.calendarIcon = this.getById(calendarIconId);
        thisMonthAjax.calendarLink = this.getById(calendarLinkId);
        thisMonthAjax.loadingGif = this.getById('loadingGif_' + this.marketIndex);

        thisMonthAjax.availabilityInputContentcalendar_icon_ = this.getById(availabilityInputContentId);
        if (this.marketIndex === 0) {
            thisMonthAjax.marketContainer = this.getById(this.outboundContainerId);
        } else {
            thisMonthAjax.marketContainer = this.getById(this.inboundContainerId);
        }
        if (thisMonthAjax.automaticLaunch == 1) {
            thisMonthAjax.calendarIconClick();
        }

        if (typeof (data) != "undefined") {
            if (typeof (data.familyFaresData) != "undefined") thisMonthAjax.familyFaresData = data.familyFaresData;
            if (typeof (data.submitSelectedFare) != "undefined") thisMonthAjax.submitSelectedFare = (data.submitSelectedFare == "true");
            if (typeof (data.singleFareAvailable) != "undefined") thisMonthAjax.singleFareAvailable = data.singleFareAvailable;
        }

    };
    thisMonthAjax.updateCalendarAvailability = function (data) {
        var newData = $(data),
            html = '',
            calendarInfoData = newData.find('#calendarJson'),
            calendarInfoJson = SKYSALES.Json.parse(calendarInfoData.html()),
            calendarAvailabilityObj = null;

        calendarInfoData.remove();
        this.marketContainer.hide();

        if (this.marketIndex == 0)
            newData.find('#monthTabs_1').remove();
        else
            newData.find('#monthTabs_0').remove();

        calendarInfoJson.marketIndex = this.marketIndex;
        calendarInfoJson.flightTimeErrorMessage = this.flightTimeErrorMessage;
        calendarInfoJson.flightDateErrorMessage = this.flightDateErrorMessage;
        html = newData.html();

        //add the new html and clear out the old stuff
        this.marketContainer.after(html);
        //        thisMonthAjax.inboundContainer.siblings('.sepDotsGrey').remove();
        //        thisMonthAjax.inboundContainer.remove();
        //        thisMonthAjax.outboundContainer.remove();

        thisMonthAjax.toggleSpinner();
        calendarAvailabilityObj = new VUELING.Class.CalendarAvailabilityInput();
        calendarAvailabilityObj = calendarAvailabilityObj.init(calendarInfoJson);
        if ($.browser.msie && $.browser.version < 8) {
            $('.wrap_availability').each(function () {
                if ($(this).html() == '') $(this).remove();
            });
        }
    };
    thisMonthAjax.updateCalendarAvailabilityHandler = function (data) {
        thisMonthAjax.updateCalendarAvailability(data);
    };
    thisMonthAjax.calendarIconClick = function () {
        thisMonthAjax.toggleSpinner();
        var postJson = {
            tabs: [0, 0],
            clickedMarketIndex: this.marketIndex,
            //selectedFare: "", // se pasa vacío para forzar al calendario a mostrar la tarifa Basic por defecto
            selectedFare: (thisMonthAjax.submitSelectedFare) ? thisMonthAjax.getSelectedFareType() : "",  // muestra el calendario en la tarifa seleccionada en vista diaria
            clientIDPrefix: 'ControlGroupCalendarScheduleSelectView_CalendarAvailabilityInputScheduleSelectView'
        };

        $.post('CalendarAvailabilityAjax-resource.aspx', postJson, this.updateCalendarAvailabilityHandler);
    };
    thisMonthAjax.calendarIconClickHandler = function () {
        $('#currencyConverter').hide();
        thisMonthAjax.calendarIconClick();
    };
    thisMonthAjax.toggleSpinner = function () {
        thisMonthAjax.loadingGif.find('#loadCalendarMonth').show()
        thisMonthAjax.loadingGif.find('#loadCalendarDay').hide()
        thisMonthAjax.loadingGif.toggle();
    };
    thisMonthAjax.addEvents = function () {
        this.calendarIcon.unbind("click");
        this.calendarLink.unbind("click");

        this.calendarIcon.click(this.calendarIconClickHandler);
        this.calendarLink.click(this.calendarIconClickHandler);
    };
    thisMonthAjax.getSelectedFareType = function () {

        var selectedFareType = "",
            selectedValue = thisMonthAjax.scheduleContainer.find("input:radio:checked").val();

        if (typeof selectedValue != "undefined" && selectedValue.indexOf("~") != -1) {
            var valueSplitted = selectedValue.split("~");
            if (valueSplitted.length > 3) {
                for (var f in thisMonthAjax.familyFaresData) {
                    var fare = thisMonthAjax.familyFaresData[f];
                    arr = new Array();
                    if ($.inArray(valueSplitted[4], fare.FareRule) >= 0)
                        selectedFareType = fare.FareType;
                }
            }
        }

        if (thisMonthAjax.submitSelectedFare && selectedFareType == "") {
            selectedFareType = thisMonthAjax.singleFareAvailable;
        }

        return selectedFareType;

    };
    return thisMonthAjax;
};