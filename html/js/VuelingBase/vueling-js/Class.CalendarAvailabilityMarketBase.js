/*
Name: 
Class CalendarAvailabilityMarketBase
Param:
None
Return: 
An instance of CalendarAvailabilityMarketBase
Functionality:
Represents a single calendar in the low fare calendar view
Notes:
                
Class Hierarchy:
SkySales -> CalendarAvailabilityMarketBase
*/
VUELING.Class.CalendarAvailabilityMarketBase = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCalendarAvailabilityMarketBase = SKYSALES.Util.extendObject(parent);

    thisCalendarAvailabilityMarketBase.containerId = '';
    thisCalendarAvailabilityMarketBase.container = null;
    thisCalendarAvailabilityMarketBase.calendarContainer = null;
    thisCalendarAvailabilityMarketBase.selectedDateContainerId = '';
    thisCalendarAvailabilityMarketBase.selectedDateContainer = null;
    thisCalendarAvailabilityMarketBase.templateId = 'marketTemplateId';
    thisCalendarAvailabilityMarketBase.template = null;
    thisCalendarAvailabilityMarketBase.selectedDateTemplateId = 'selectedDateTemplateId';
    thisCalendarAvailabilityMarketBase.selectedDateTemplate = null;
    thisCalendarAvailabilityMarketBase.noFlightsTemplateId = 'noFlightsTemplateId';
    thisCalendarAvailabilityMarketBase.noFlightsTemplate = null;
    var availabilityInputContentId = this.availabilityInputContentBaseId + (parseInt(this.marketIndex) + 1);

    thisCalendarAvailabilityMarketBase.availabilityInput = null;
    thisCalendarAvailabilityMarketBase.dateMarketHash = {};
    thisCalendarAvailabilityMarketBase.marketIndex = -1;
    thisCalendarAvailabilityMarketBase.departureStation = '';
    thisCalendarAvailabilityMarketBase.arrivalStation = '';
    thisCalendarAvailabilityMarketBase.goingOutLabel = '';
    thisCalendarAvailabilityMarketBase.comingBackLabel = '';
    thisCalendarAvailabilityMarketBase.selectedDateMarket = null;
    thisCalendarAvailabilityMarketBase.selectedDate = '';
    thisCalendarAvailabilityMarketBase.selectedClass = 'selected';
    thisCalendarAvailabilityMarketBase.dateMarketPrefix = 'date_';

    thisCalendarAvailabilityMarketBase.inputDayId = '';
    thisCalendarAvailabilityMarketBase.inputDay = null;
    thisCalendarAvailabilityMarketBase.inputMonthId = '';
    thisCalendarAvailabilityMarketBase.inputMonth = null;

    thisCalendarAvailabilityMarketBase.startYear = '';
    thisCalendarAvailabilityMarketBase.startMonth = '';
    thisCalendarAvailabilityMarketBase.startDay = '';
    thisCalendarAvailabilityMarketBase.startDate = '';
    thisCalendarAvailabilityMarketBase.firstBlockDate = '';

    thisCalendarAvailabilityMarketBase.selectedFare = '';

    thisCalendarAvailabilityMarketBase.endYear = '';
    thisCalendarAvailabilityMarketBase.endMonth = '';
    thisCalendarAvailabilityMarketBase.endDay = '';
    thisCalendarAvailabilityMarketBase.endDate = '';
    thisCalendarAvailabilityMarketBase.lastBlockDate = '';
    thisCalendarAvailabilityMarketBase.requestStartDate = null;
    thisCalendarAvailabilityMarketBase.requestEndDate = null;
    thisCalendarAvailabilityMarketBase.monthTabs = null;
    thisCalendarAvailabilityMarketBase.monthTabContainerPrefix = '';
    thisCalendarAvailabilityMarketBase.calendarLinkIdPrefix = 'backToScheduleDisplay_';
    thisCalendarAvailabilityMarketBase.calendarLinkId = '';
    thisCalendarAvailabilityMarketBase.flightTimeErrorMessage = '';
    thisCalendarAvailabilityMarketBase.flightDateErrorMessage = '';

    thisCalendarAvailabilityMarketBase.showExtraChargesInPrice = false;
    thisCalendarAvailabilityMarketBase.extraChargesInPricePercentage = 0;

    thisCalendarAvailabilityMarketBase.init = function (json) {

        this.setSettingsByObject(json);
        this.setVars();
        this.initStartDate();
        this.initEndDate();
        this.initFirstBlockDate();
        this.initLastBlockDate();
        this.initDateMarketHash();
    };

    thisCalendarAvailabilityMarketBase.setVars = function () {
        thisCalendarAvailabilityMarketBase.template = this.getById(this.templateId);
        thisCalendarAvailabilityMarketBase.inputDay = this.getById(this.inputDayId);
        thisCalendarAvailabilityMarketBase.inputMonth = this.getById(this.inputMonthId);
        thisCalendarAvailabilityMarketBase.noFlightsTemplate = this.getById(this.noFlightsTemplateId);
        thisCalendarAvailabilityMarketBase.monthTabs = this.getById(this.monthTabContainerPrefix + '_' + this.marketIndex);
        thisCalendarAvailabilityMarketBase.loadingGif = this.getById('loadingGif_' + this.marketIndex);
        //thisCalendarAvailabilityMarketBase.validationErrorReadAlong = this.getById('errorDiv');
        thisCalendarAvailabilityMarketBase.validationErrorReadAlong = new SKYSALES.ValidationErrorReadAlong();
        thisCalendarAvailabilityMarketBase.calendarLinkId = thisCalendarAvailabilityMarketBase.calendarLinkIdPrefix + this.marketIndex;
        thisCalendarAvailabilityMarketBase.calendarLink = this.getById(this.calendarLinkId);
        thisCalendarAvailabilityMarketBase.journeyIndex = this.marketIndex;

        thisCalendarAvailabilityMarketBase.showExtraChargesInPrice = this.showExtraChargesInPrice;
        thisCalendarAvailabilityMarketBase.extraChargesInPricePercentage = this.extraChargesInPricePercentage;

    };

    thisCalendarAvailabilityMarketBase.setVarsAfterDraw = function () {
        thisCalendarAvailabilityMarketBase.container = this.getById(this.containerId);
        thisCalendarAvailabilityMarketBase.selectedDateContainer = this.getById(this.selectedDateContainerId);
        thisCalendarAvailabilityMarketBase.selectedDateTemplate = this.getById(this.selectedDateTemplateId);

        var dateMarketHash = this.dateMarketHash || {},
                key = '',
                dateMarket = null;

        for (key in dateMarketHash) {
            if (dateMarketHash.hasOwnProperty(key)) {
                dateMarket = dateMarketHash[key];
                if (dateMarket) {
                    dateMarket.setVarsAfterDraw();
                }
            }
        }


    };
    thisCalendarAvailabilityMarketBase.addEvents = function () {
        this.container.click(this.updateFareHandler);
        this.calendarLink.click(this.backToScheduleDisplayHandler);
    };
    thisCalendarAvailabilityMarketBase.getDateMarketKey = function (eventInfo) {
        var target = eventInfo.target,
            dateMarketKey = target.id;

        if (dateMarketKey === "") {
            dateMarketKey = $(target).parent('a').attr('id') || '';
        }
        return dateMarketKey;
    };
    thisCalendarAvailabilityMarketBase.dateMarketKeyToDate = function (dateMarketKey) {
        //dateMarketKey format: date_0_2012_2_21
        var keyArray = dateMarketKey.split('_'),
            year = keyArray[2],
            month = keyArray[3],
            day = keyArray[4],
            date = new Date(year, month, day);

        return date;
    };
    thisCalendarAvailabilityMarketBase.setSelectedDate = function (dateMarketKey) {
        var date = this.dateMarketKeyToDate(dateMarketKey);

        VUELING.selectedDate = date;
    };
    thisCalendarAvailabilityMarketBase.displayDatesOutOfOrderError = function () {
        var errorMsgText = this.flightDateErrorMessage,
            validationErrorListId = this.validationErrorReadAlong.getValidationErrorListId(),
            readAlongDivId = this.getById(validationErrorListId).attr('id');

        if (readAlongDivId === undefined) {
            this.validationErrorReadAlong.addValidationErrorDiv();
            this.validationErrorReadAlong.addCloseEvent();
        }
        this.getById(validationErrorListId).html(errorMsgText);
        this.validationErrorReadAlong.show();
        SKYSALES.Util.anchorToErrorMsg();
    };
    thisCalendarAvailabilityMarketBase.clickScheduleDate = function (dateMarketKey) {
        var marketIndex = this.marketIndex,
            dayId = 'dayTab_' + marketIndex + '_3',
            dayTab = this.getById(dayId),
            calendarContainer = {},
            calendarContainerId = '',
            availabilityInput = this.availabilityInput,
            marketArray = availabilityInput.marketArray,
            journeyIndex = parseInt(marketIndex, 10),
            departureDate = this.deptDate,
            datesAreInOrder = true;

        this.setSelectedDate(dateMarketKey);
        var dateMarket = dateMarketKey.split("_");
        var dateMarketSelected = new Date(dateMarket[2], dateMarket[3], dateMarket[4], 23, 59, 59);

        var availabilityInputInstance = VUELING.Util.getObjectInstance("availabilityInput");

        if (marketIndex == 0) {
            availabilityInput = new VUELING.Class.AvailabilityInput();
            var advanceDaysHold = parseInt(availabilityInputInstance.advanceDaysHold);
            SKYSALES.Util.ValidateHold(dateMarketSelected, advanceDaysHold, availabilityInputInstance.journeysDateMarketDataModelList);
        }
        SKYSALES.Util.ScheduleSelectedDate(marketIndex, dateMarketSelected);

        var areEqualsJourneyOriginAndDestination = false;

        availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
        if (availabilityInputInstance != null) {
            areEqualsJourneyOriginAndDestination = availabilityInputInstance.AreEqualsJourneyOriginAndDestination();
        }

        if (SKYSALES.Util.MarketSize() > 1)
            datesAreInOrder = SKYSALES.Util.DatesAreInOrder(journeyIndex, dateMarketSelected, areEqualsJourneyOriginAndDestination);

        if (!datesAreInOrder) {
            if (journeyIndex == 0 && !SKYSALES.Util.IsChangingFlight()) { // Solo en el caso de estar cambiando la Ida se quiere cambiar automáticamente también la vuelta, si las fechas no están en el orden correcto.
                this.validationErrorReadAlong.hide();
                VUELING.Util.ChangeSelectedDate(1, dateMarketSelected);
                VUELING.Util.ChangeSelectedDate(0, dateMarketSelected);
            } else {
                this.displayDatesOutOfOrderError();
            }
        } else {
            this.validationErrorReadAlong.hide();
            calendarContainerId = (marketIndex === 0) ? 'outboundFlightCalendar' : 'returnFlightCalendar';
            calendarContainer = this.getById(calendarContainerId);
            if ($(dayTab).is('a')) {
                dayTab.click();
            } else {
                var hayVuelta = (SKYSALES.Util.MarketSize() > 1);

                var formattedDate = $.datepicker.formatDate("yy-mm-dd", dateMarketSelected);

                SKYSALES.Util.ScheduleSelectedDate(journeyIndex, dateMarketSelected);
                var vuelingSearcher = VUELING.Util.getObjectInstance("vuelingSearcher");
                if (vuelingSearcher != undefined) {
                    if (hayVuelta && journeyIndex > 0) {
                        vuelingSearcher.onReturnDateSelect(formattedDate);
                    } else {
                        vuelingSearcher.onDepartureDateSelect(formattedDate);
                    }

                    var searchFlight = VUELING.Util.getObjectInstance('newSearchFlightSearch');

                    $('div.marketSection').hide();
                    searchFlight.searchButton.click();
                    SKYSALES.Util.ScheduleSelectedDate(journeyIndex, dateMarketSelected);

                    return false;
                }
                else {
                    if (SKYSALES.Util.IsChangingFlight()) {
                        SKYSALES.Util.ScheduleSelectedDate(journeyIndex, dateMarketSelected);
                        VUELING.Util.ChangeSelectedDate(journeyIndex, dateMarketSelected);
                        $(calendarContainer).remove();
                    }
                    return true
                }
            }
        }
    };

    thisCalendarAvailabilityMarketBase.backToScheduleDisplay = function () {
        var journeyIndexString = this.journeyIndex,
            journeyIndex = parseInt(journeyIndexString, 10),
            calendarContainerId = '',
            calendarContainer = {},
            scheduleContainerId = '',
            scheduleContainer = {};

        if (journeyIndex === 0) {
            calendarContainerId = 'outboundFlightCalendar';
            scheduleContainerId = 'outboundFlight';
        } else {
            calendarContainerId = 'returnFlightCalendar';
            scheduleContainerId = 'returnFlight';
        }
        calendarContainer = this.getById(calendarContainerId);
        calendarContainer.remove();
        this.monthTabs.remove();
        scheduleContainer = this.getById(scheduleContainerId);
        scheduleContainer.show();
    };
    thisCalendarAvailabilityMarketBase.backToScheduleDisplayHandler = function () {
        thisCalendarAvailabilityMarketBase.backToScheduleDisplay();
    };
    thisCalendarAvailabilityMarketBase.toggleSpinner = function () {
        this.loadingGif.find('#loadCalendarDay').show()
        this.loadingGif.find('#loadCalendarMonth').hide()
        this.loadingGif.toggle();
    };
    thisCalendarAvailabilityMarketBase.updateFareEvent = function (eventInfo) {

        var dateMarketKey = this.getDateMarketKey(eventInfo);

        if (dateMarketKey.length > thisCalendarAvailabilityMarketBase.dateMarketPrefix.length)
            this.clickScheduleDate(dateMarketKey);
    };

    thisCalendarAvailabilityMarketBase.updateFareHandler = function (eventInfo) {
        thisCalendarAvailabilityMarketBase.updateFareEvent(eventInfo);
    };
    thisCalendarAvailabilityMarketBase.updateFare = function (dateMarketKey) {
        var dateMarket = this.dateMarketHash[dateMarketKey],
                html = '',
                price = ',',
                priceWithCharges = ',',
                points = ',',
                amount = '',
                day = -1,
                month = -1;

        if (dateMarket && (dateMarket.price > 0 || dateMarket.points > 0)) {
            this.deactivateAllDateMarkets();
            dateMarket.activate();
            thisCalendarAvailabilityMarketBase.selectedDateMarket = dateMarket;
            html = this.selectedDateTemplate.text();
            html = html.replace(/\[formattedDate\]/, dateMarket.formattedDate);
            price = dateMarket.getFormattedPrice();
            points = SKYSALES.Util.convertToLocaleInteger(dateMarket.points);
            amount = SKYSALES.Util.formatAmount(price, points, dateMarket.pointsLabelAppend, dateMarket.pointsSuffix);
            html = html.replace(/\[amount\]/, amount);
            if (this.showExtraChargesInPrice) {

                var formatedPriceWithCharge = dateMarket.getFormattedPriceWithCharges();
                html = html.replace(/\[amountWithCharges\]/, formatedPriceWithCharge);
            }
            this.selectedDateContainer.html(html);
            month = parseInt(dateMarket.month, 10) + 1;
            this.inputMonth.val(month);
            day = parseInt(dateMarket.day, 10);
            this.inputDay.val(day);
            this.availabilityInput.updateTotalAmount();
        }
    };

    thisCalendarAvailabilityMarketBase.selectInitialDateMarket = function () {
        var keyPrefix = this.dateMarketPrefix + this.marketIndex + '_',
            key = '',
            availabilityInput = this.availabilityInput,
            selectedDateId = availabilityInput.selectedDateId;

        if (selectedDateId === '') {
            key = keyPrefix + this.selectedDate;
        } else {
            key = keyPrefix + selectedDateId;
        }
        this.updateFare(key);
    };

    thisCalendarAvailabilityMarketBase.deactivateAllDateMarkets = function () {
        var selectedClass = this.selectedClass,
                dateMarketHash = this.dateMarketHash || {},
                key = '',
                dateMarket = null;

        for (key in dateMarketHash) {
            if (dateMarketHash.hasOwnProperty(key)) {
                dateMarket = dateMarketHash[key];
                dateMarket.deactivate(selectedClass);
            }
        }
    };

    thisCalendarAvailabilityMarketBase.initStartDate = function () {
        //start date set to the beginning of the month
        thisCalendarAvailabilityMarketBase.startDate = new Date(this.startYear, this.startMonth, 1);
    };

    thisCalendarAvailabilityMarketBase.initEndDate = function () {
        //end date set to the end of the month
        thisCalendarAvailabilityMarketBase.endDate = new Date(this.endYear, this.endMonth, this.getDaysInMonth(this.endMonth + 1, this.endYear));
    };

    thisCalendarAvailabilityMarketBase.initFirstBlockDate = function () {
        var startDate = this.startDate,
                newTime,
                dayOfWeek = (startDate.getDay() - 1 < 0) ? 6 : startDate.getDay() - 1,
                firstBlockDate = new Date();

        newTime = this.addDays(startDate, (dayOfWeek) * -1);
        firstBlockDate.setTime(newTime);
        thisCalendarAvailabilityMarketBase.firstBlockDate = firstBlockDate;
    };

    thisCalendarAvailabilityMarketBase.initLastBlockDate = function () {
        var endDate = this.endDate,
            dayOfWeek = endDate.getDay(),
            daysToAdd = (7 - (dayOfWeek - 1) > 7) ? 7 : 7 - (dayOfWeek - 1),
            newTime = 0,
            lastBlockDate = new Date();

        newTime = this.addDays(endDate, daysToAdd);
        lastBlockDate.setTime(newTime);
        thisCalendarAvailabilityMarketBase.lastBlockDate = lastBlockDate;
    };

    thisCalendarAvailabilityMarketBase.getMarketHashKey = function (date) {
        date = date || new Date();
        var key = this.dateMarketPrefix + this.marketIndex + '_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate();

        return key;
    };

    thisCalendarAvailabilityMarketBase.initDateMarketHash = function () {
        var date = new Date(),
            stopDate = this.lastBlockDate,
            dateMarketHash = this.dateMarketHash || {},
            key = '',
            newTime = 0,
            dateMarket = null;

        date.setTime(this.firstBlockDate.getTime());
        while (date <= stopDate) {
            key = this.getMarketHashKey(date);
            dateMarket = new SKYSALES.Class.CalendarAvailabilityDateMarket();
            dateMarket.market = this;
            dateMarketHash[key] = dateMarketHash[key] || {};
            dateMarket.init(dateMarketHash[key]);
            dateMarket.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            dateMarket.availableClass = this.availableClass;
            dateMarket.showExtraChargesInPrice = this.showExtraChargesInPrice;
            dateMarket.extraChargesInPricePercentage = this.extraChargesInPricePercentage;

            dateMarketHash[key] = dateMarket;
            newTime = this.addDays(date, 1);
            date.setTime(newTime);
        }
    };

    thisCalendarAvailabilityMarketBase.getMonthName = function (month, longName) {
        month = parseInt(month, 10);
        var monthName = '',
                resource = null,
                monthNames = null;
        resource = SKYSALES.Util.getResource();
        if (longName) {
            monthNames = resource.dateCultureInfo.monthNames;
        }
        else {
            monthNames = resource.dateCultureInfo.monthNamesShort;
        }
        if (monthNames.length > month) {
            monthName = monthNames[month];
        }
        return monthName;
    };

    thisCalendarAvailabilityMarketBase.getDayNameArray = function () {
        var resource = null,
                dayNames = null;
        resource = SKYSALES.Util.getResource();
        dayNames = resource.dateCultureInfo.dayNames || [];
        return dayNames;
    };

    thisCalendarAvailabilityMarketBase.supplantDayNames = function (html) {
        var dayNameArray = this.getDayNameArray(),
                i = 0,
                len = dayNameArray.length,
                dayNameRegex = null,
                dayNameStr = '',
                dayName = '';
        for (i = 0; i < len; i += 1) {
            dayName = dayNameArray[i];
            dayNameStr = '\\[daysOfWeek' + i + '\\]';
            dayNameRegex = new RegExp(dayNameStr, "g");
            html = html.replace(dayNameRegex, dayName);
        }
        return html;
    };

    thisCalendarAvailabilityMarketBase.supplantTabMonthsAndYears = function (html) {
        //hard coded at 6 months
        for (i = 1; i <= 6; i += 1) {
            yearStr = '\\[startDateYearPlus_' + i + '\\]';
            monthStr = '\\[startDateMonthPlus_' + i + '\\]';
            newDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + i, this.startDate.getDate());
            yearStrRegex = new RegExp(yearStr);
            monthStrRegex = new RegExp(monthStr);
            html = html.replace(yearStrRegex, newDate.getFullYear());
            html = html.replace(monthStrRegex, this.getMonthName(newDate.getMonth()));
        }
        return html;
    };
    thisCalendarAvailabilityMarketBase.getHtml = function () {
        var html = '';
        if (this.startYear) {
            html = this.template.text();
        } else {
            html = this.noFlightsTemplate.text();
        }
        html = this.supplant(html);

        return html;
    };
    thisCalendarAvailabilityMarketBase.supplant = function (html) {
        html = html || '';
        var monthName = this.getMonthName(this.startMonth, true), initDateMarket = this.dateMarketHash[this.dateMarketPrefix + this.marketIndex + '_' + this.selectedDate],
                marketHtml = '', marketDirection = '', marketLabel = '', marketClassName = '';

        html = html.replace(/\[startDateMonth\]/, monthName);
        html = html.replace(/\[startDateYear\]/, this.startYear);
        html = html.replace(/\[marketIndex\]/g, this.marketIndex);
        html = html.replace(/\[departureStation\]/, this.departureStation);
        html = html.replace(/\[arrivalStation\]/, this.arrivalStation);

        if (this.marketIndex == 0) {
            marketDirection = "GoingOut";
            marketClassName = "outbound";
            marketLabel = this.goingOutLabel;
        }
        else {
            marketDirection = "GoingIn";
            marketClassName = "return";
            marketLabel = this.comingBackLabel;
        }
        html = html.replace(/\[iconDirection\]/, "icon" + marketDirection);
        html = html.replace(/\[marketDirection\]/, marketLabel);
        html = html.replace(/\[marketClassName\]/, marketClassName);
        html = html.replace(/\[formattedSelectedDate\]/, this.formattedDate);
        html = html.replace(/\[selectedDateMonth\]/, monthName);
        html = this.supplantDayNames(html);
        html = this.supplantTabMonthsAndYears(html);
        marketHtml = this.getMarketHtml();

        html = html.replace(/\[dateMarketHash\]/, marketHtml);

        return html;
    };

    thisCalendarAvailabilityMarketBase.getMarketHtml = function () {
        var html = '',
            htmlArray = [],
            date = new Date(),
            stopDate = this.lastBlockDate,
            dateMarketHash = this.dateMarketHash || {},
            key = '',
            newTime = 0,
            dateMarket = null,
            dateMarketHtml = '',
            currentDayInWeek = 0,
            rowHtmlArray = []; //create an array of htmls equivalent to the rows in the table

        date.setTime(this.firstBlockDate.getTime());

        while (date < stopDate) {
            key = this.getMarketHashKey(date);
            dateMarket = dateMarketHash[key];
            dateMarketHtml = dateMarket.getHtml();
            htmlArray.push(dateMarketHtml);
            newTime = this.addDays(date, 1);
            date.setTime(newTime);
            currentDayInWeek++;
            if (currentDayInWeek > 7) { currentDayInWeek = currentDayInWeek % 7; }
            if (currentDayInWeek === 7) {
                html = htmlArray.join('');
                rowHtmlArray.push(html);
                htmlArray.length = 0;
            }
        }

        html = '<tr>' + rowHtmlArray.join('</tr><tr>') + '</tr>';

        return html;
    };

    thisCalendarAvailabilityMarketBase.addDays = function (origDate, numDays) {
        // does not work for DST           var time = origDate.getTime() + (numDays * 24 * 60 * 60 * 1000);
        var timezoneOffset = origDate.getTimezoneOffset(), time = origDate.getTime() + (numDays * 24 * 60 * 60 * 1000);
        origDate.setTime(time);
        if (origDate.getTimezoneOffset() != timezoneOffset) {
            time = origDate.getTime() + (origDate.getTimezoneOffset() - timezoneOffset) * 60000;
        }
        return time;
    };

    thisCalendarAvailabilityMarketBase.getDaysInMonth = function daysInMonth(month, year) {
        //day 0 is the last day of the previous month
        return new Date(year, month, 0).getDate();
    };

    thisCalendarAvailabilityMarketBase.getDateMarketArray = function () {
        var dateMarketHash = this.dateMarketHash || {},
                key = '',
                dateMarket = null,
                dateMarketArray = [];

        for (key in dateMarketHash) {
            if (dateMarketHash.hasOwnProperty(key)) {
                dateMarket = dateMarketHash[key];
                dateMarketArray.push(dateMarket);
            }
        }
        return dateMarketArray;
    };

    return thisCalendarAvailabilityMarketBase;
};