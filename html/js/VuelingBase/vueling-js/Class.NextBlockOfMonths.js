/*
Name: 
Class NextBlockOfMonths
Param:
None
Return: 
An instance of NextBlockOfMonths
Functionality:
Stores information for month tabs in the low fare calendar
Notes:
This is used to make the ajax call to load a different month in the low fare calendar
Class Hierarchy:
SkySales -> NextBlockOfMonths
*/
VUELING.Class.NextBlockOfMonths = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisNextBlockOfMonths = SKYSALES.Util.extendObject(parent);

    thisNextBlockOfMonths.requestBeginDateMonth = '';
    thisNextBlockOfMonths.requestBeginDateYear = '';
    thisNextBlockOfMonths.requestMarketIndex = '';
    thisNextBlockOfMonths.tabIndex = '';
    // When the arrow button is clicked, the tabs will move by this many months:
    thisNextBlockOfMonths.monthDelta = 0;
    thisNextBlockOfMonths.clientIDPrefix = '';
    thisNextBlockOfMonths.hiddenFieldId = '';
    thisNextBlockOfMonths.tabLink = null;
    thisNextBlockOfMonths.hiddenField = null;
    thisNextBlockOfMonths.calendarAvailabilityObject = null;
    thisNextBlockOfMonths.errorDisplayPopup = null;
    thisNextBlockOfMonths.updateAllMarkets = false;
    thisNextBlockOfMonths.outboundContainerId = '';
    thisNextBlockOfMonths.outboundContainer = null;
    thisNextBlockOfMonths.inboundContainerId = '';
    thisNextBlockOfMonths.inboundContainer = null;
    thisNextBlockOfMonths.buttonId = '';

    thisNextBlockOfMonths.faresDropDownPrefix = 'faresDropDown_';
    thisNextBlockOfMonths.faresDropDown = '';

    thisNextBlockOfMonths.init = function (json) {
        this.setSettingsByObject(json);
        this.initErrorPopup();
        this.setVars();
        this.addEvents();
    };
    thisNextBlockOfMonths.initErrorPopup = function () {
        this.errorDisplayPopup = new SKYSALES.Class.BlockedPopUp();
    };
    thisNextBlockOfMonths.setVars = function () {
        var journeyIndex = this.calendarAvailabilityObject.marketIndex,
            tabLinkId = 'tabLink_' + journeyIndex + '_' + this.requestBeginDateMonth + '_' + this.requestBeginDateYear;

        thisNextBlockOfMonths.requestMarketIndex = journeyIndex;
        thisNextBlockOfMonths.tabLink = this.getById(tabLinkId);
        thisNextBlockOfMonths.hiddenField = this.getById(this.hiddenFieldId);
        thisNextBlockOfMonths.outboundContainer = this.getById(this.outboundContainerId);
        thisNextBlockOfMonths.inboundContainer = this.getById(this.inboundContainerId);
        thisNextBlockOfMonths.loadingGif = this.getById('loadingGif_' + this.requestMarketIndex);
        thisNextBlockOfMonths.nextButton = this.getById(this.buttonId);

        thisNextBlockOfMonths.faresDropDown = this.getById(this.faresDropDownPrefix + this.requestMarketIndex);
    };
    thisNextBlockOfMonths.addEvents = function () {
        this.nextButton.unbind("click");
        this.nextButton.click(this.updateBlockOfMonthsHandler);
    };
    thisNextBlockOfMonths.getSelectedTabs = function (container) {
        var data = [],
            monthHash = [];

        for (var item in thisNextBlockOfMonths.calendarAvailabilityObject.monthTabArray) {
            if (!thisNextBlockOfMonths.calendarAvailabilityObject.monthTabArray.hasOwnProperty(item)) continue;
            item = thisNextBlockOfMonths.calendarAvailabilityObject.monthTabArray[item];
            // this is required if we have more markets than visible calendars, so that if calendar is not visible we still get proper market array back from server
            if (typeof (monthHash[item.requestMarketIndex]) == 'undefined') {
                monthHash[item.requestMarketIndex] = '0';
            }
            // if selected tab is not '0' - we can shortcut as there is only one selected tab per market
            if (monthHash[item.requestMarketIndex] == '0' && typeof (container.data('market-month-'.concat(item.requestMarketIndex))) != 'undefined') {
                monthHash[item.requestMarketIndex] = container.data('market-month-'.concat(item.requestMarketIndex));
            }
            $.post('CalendarAvailabilityAjax-resource.aspx', {
                tabs: data,
                clickedMarketIndex: thisNextBlockOfMonths.requestMarketIndex,
                clientIDPrefix: thisNextBlockOfMonths.clientIDPrefix
            }, thisNextBlockOfMonths.updateCalendarAvailability);
        }
        // data for JSON tab array
        for (var index in monthHash) {
            if (monthHash.hasOwnProperty(index)) {
                data.push(monthHash[index]);
            }
        }
        return data;
    }
    thisNextBlockOfMonths.updateBlockOfMonthsHandler = function (e) {
        var data = [],
            ajaxJson = {},
            calendarAvailabilityObject = thisNextBlockOfMonths.calendarAvailabilityObject,
            journeyIndex = calendarAvailabilityObject.marketIndex,
            journeyArray = calendarAvailabilityObject.marketArray,
            journey = journeyArray[journeyIndex],
            selectedDate = new Date(journey.startYear, journey.startMonth, 1),
            selectedDate = new Date(new Date(selectedDate).setMonth(selectedDate.getMonth() + thisNextBlockOfMonths.monthDelta)),
            selectedDateString = $.datepicker.formatDate("m/d/yy", selectedDate),
            selectedFareVal = thisNextBlockOfMonths.faresDropDown.val();

        if (selectedDate < new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0))
            return;

        thisNextBlockOfMonths.isSelected = true;
        data = ['0', '1'];

        var areEqualsJourneyOriginAndDestination = false;

        var availabilityInput = VUELING.Util.getObjectInstance('availabilityInput');
        if (availabilityInput != null) {
            areEqualsJourneyOriginAndDestination = availabilityInput.AreEqualsJourneyOriginAndDestination();
        }

        var datesinOrder = SKYSALES.Util.DatesAreInOrder(journeyIndex, selectedDate, areEqualsJourneyOriginAndDestination);
        if (datesinOrder) {
            thisNextBlockOfMonths.toggleSpinner();
            ajaxJson = {
                tabs: data,
                selectedFare: selectedFareVal,
                clickedMarketIndex: journeyIndex + '',
                clientIDPrefix: 'ControlGroupCalendarScheduleSelectView_CalendarAvailabilityInputScheduleSelectView',
                "selectedDate": selectedDateString
            };
            $.post('CalendarAvailabilityAjax-resource.aspx', ajaxJson, thisNextBlockOfMonths.updateCalendarAvailability);
        } else {
            if (!SKYSALES.Util.IsChangingFlight()) {
                thisNextBlockOfMonths.errorDisplayPopup.show("blockUIPopUpForInvalidOutbound");
                thisNextBlockOfMonths.calendarAvailabilityObject.continueLink.unbind("click");
                thisNextBlockOfMonths.calendarAvailabilityObject.continueLink.click(thisNextBlockOfMonths.errorDisplayPopup.close);
                thisNextBlockOfMonths.calendarAvailabilityObject.updateMarketsLink.unbind("click");
                document.getElementById(thisNextBlockOfMonths.calendarAvailabilityObject.updateMarketsLinkId).onclick = function () {
                    thisNextBlockOfMonths.updateAllMarketsHandler(selectedDate);
                }
            } else {
                var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
                availabilityInputInstance.displayDatesOutOfOrderError();
            }
        }
    };

    thisNextBlockOfMonths.updateAllMarketsHandler = function (clickedTabDate) {
        var formattedDate = $.datepicker.formatDate("yy-mm-dd", clickedTabDate),
        returnDate = clickedTabDate;

        returnDate.setDate(clickedTabDate.getDate() + 7);
        var formattedreturnDate = $.datepicker.formatDate("yy-mm-dd", returnDate);

        var vuelingSearcher = null;
        for (var ins in SKYSALES.Instance) {
            if (ins.indexOf("vuelingSearcher") != -1) {
                vuelingSearcher = SKYSALES.Instance[ins];
                break;
            }
        }
        vuelingSearcher.onDepartureDateSelect(formattedDate, false);
        vuelingSearcher.onReturnDateSelect(formattedreturnDate);

        var searchFlight = null;
        for (ins in SKYSALES.Instance) {
            if (ins.indexOf("newSearchFlightSearch") != -1) {
                searchFlight = SKYSALES.Instance[ins];
                break;
            }
        }

        window.scrollTo(0, 0);
        searchFlight.openSearcher();
    };
    thisNextBlockOfMonths.toggleSpinner = function () {
        thisNextBlockOfMonths.loadingGif.find('#loadCalendarMonth').show()
        thisNextBlockOfMonths.loadingGif.find('#loadCalendarDay').hide()
        thisNextBlockOfMonths.loadingGif.toggle();
    };
    thisNextBlockOfMonths.updateCalendarAvailability = function (data) {
        var newData = $(data),
            calendarInfoData = newData.find('#calendarJson'),
            calendarInfoJson = SKYSALES.Json.parse(calendarInfoData.html()),
            calendarAvailabilityObj = null,
            journeyIndex = thisNextBlockOfMonths.calendarAvailabilityObject.marketIndex;

        journeyIndex = parseInt(journeyIndex, 10);
        thisNextBlockOfMonths.calendarAvailabilityObject.marketIndex = journeyIndex;
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
            thisNextBlockOfMonths.getById('outboundFlightCalendar').replaceWith(html);
        } else {
            thisNextBlockOfMonths.getById('returnFlightCalendar').replaceWith(html);
        }
        calendarAvailabilityObj = new VUELING.Class.CalendarAvailabilityInput();
        calendarAvailabilityObj = calendarAvailabilityObj.init(calendarInfoJson);
        thisNextBlockOfMonths.toggleSpinner();
        thisNextBlockOfMonths.updateAllMarkets = false;
        if ($.browser.msie && $.browser.version < 8) {
            $('.wrap_availability').each(function () {
                if ($(this).html() == '') $(this).remove();
            });
        }
    };

    return thisNextBlockOfMonths;
};