/*
Name: 
Class MonthTab
Param:
None
Return: 
An instance of MonthTab
Functionality:
Stores information for month tabs in the low fare calendar
Notes:
This is used to make the ajax call to load a different month in the low fare calendar
Class Hierarchy:
SkySales -> MonthTab
*/
VUELING.Class.MonthTab = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisMonthTab = SKYSALES.Util.extendObject(parent);

    thisMonthTab.requestBeginDateMonth = '';
    thisMonthTab.requestBeginDateYear = '';
    thisMonthTab.requestMarketIndex = '';
    thisMonthTab.tabIndex = '';
    thisMonthTab.clientIDPrefix = '';
    thisMonthTab.hiddenFieldId = '';
    thisMonthTab.tabLink = null;
    thisMonthTab.hiddenField = null;
    thisMonthTab.calendarAvailabilityObject = null;
    thisMonthTab.errorDisplayPopup = null;
    thisMonthTab.updateAllMarkets = false;
    thisMonthTab.outboundContainerId = '';
    thisMonthTab.outboundContainer = null;
    thisMonthTab.inboundContainerId = '';
    thisMonthTab.inboundContainer = null;

    thisMonthTab.faresDropDownPrefix = 'faresDropDown_';
    thisMonthTab.faresDropDown = '';

    thisMonthTab.init = function (json) {
        this.setSettingsByObject(json);
        this.initErrorPopup();
        this.setVars();
        this.addEvents();
    };
    thisMonthTab.initErrorPopup = function () {
        this.errorDisplayPopup = new SKYSALES.Class.BlockedPopUp();
    };
    thisMonthTab.setVars = function () {
        var tabLinkId = 'tabLink_' + this.requestMarketIndex + '_' + this.requestBeginDateMonth + '_' + this.requestBeginDateYear;

        thisMonthTab.tabLink = this.getById(tabLinkId);
        thisMonthTab.hiddenField = this.getById(this.hiddenFieldId);
        thisMonthTab.outboundContainer = this.getById(this.outboundContainerId);
        thisMonthTab.inboundContainer = this.getById(this.inboundContainerId);
        thisMonthTab.loadingGif = this.getById('loadingGif_' + this.requestMarketIndex);

        thisMonthTab.faresDropDown = this.getById(this.faresDropDownPrefix + this.requestMarketIndex);
    };
    thisMonthTab.addEvents = function () {
        if (thisMonthTab.pastCurrentMonth()) {
            this.tabLink.unbind("click");
            this.tabLink.click(this.updateLowFareMonthHandler);
        } else {
            thisMonthTab.disable();
        }
    };

    thisMonthTab.pastCurrentMonth = function () {
        var requestDate = new Date(thisMonthTab.requestBeginDateYear, thisMonthTab.requestBeginDateMonth - 1, 2, 1, 0, 0, 0);
        var now = new Date(); now = new Date(now.getFullYear(), now.getMonth(), 1, 1, 0, 0, 0);
        return requestDate > now;
    };

    thisMonthTab.disable = function () {
        var availYear = 'availYear', availMonth = 'availMonth', disabledYear = 'fullYear', disabledMonth = 'fullMonth';
        this.tabLink.unbind("click").find('.'.concat(availYear)).addClass(disabledYear).removeClass(availYear).end().find('.'.concat(availMonth)).addClass(disabledMonth).removeClass(availMonth).end().children().andSelf().css('cursor', 'default');
    };

    thisMonthTab.getSelectedTabs = function (container) {
        var data = [];
        var monthHash = new Array();
        for (var item in thisMonthTab.calendarAvailabilityObject.monthTabArray) {
            if (!thisMonthTab.calendarAvailabilityObject.monthTabArray.hasOwnProperty(item)) continue;
            item = thisMonthTab.calendarAvailabilityObject.monthTabArray[item];
            // this is required if we have more markets than visible calendars, so that if calendar is not visible we still get proper market array back from server
            if (typeof (monthHash[item.requestMarketIndex]) == 'undefined') {
                monthHash[item.requestMarketIndex] = '0';
            }
            // if selected tab is not '0' - we can shortcut as there is only one selected tab per market
            if (monthHash[item.requestMarketIndex] == '0' && typeof (container.data('market-month-'.concat(item.requestMarketIndex))) != 'undefined') {
                monthHash[item.requestMarketIndex] = container.data('market-month-'.concat(item.requestMarketIndex));
            }
        }
        // data for JSON tab array
        for (var index in monthHash) {
            if (monthHash.hasOwnProperty(index)) data.push(monthHash[index]);
        }

        return data;
    };
    thisMonthTab.updateLowFareMonthHandler = function () {
        var data = [],
            ajaxJson = {},
            year = thisMonthTab.requestBeginDateYear,
            month = parseInt(thisMonthTab.requestBeginDateMonth, 10) - 1,
            selectedDate = new Date(year, month, 1),
            selectedDateString = $.datepicker.formatDate("m/d/yy", selectedDate),
            selectedFareVal = thisMonthTab.faresDropDown.val();

        thisMonthTab.isSelected = true;
        lastorfirst = (thisMonthTab.requestMarketIndex == 0) ? 1 : 0;
        sumorrest = (thisMonthTab.requestMarketIndex == 0) ? parseInt(thisMonthTab.requestBeginDateMonth) - 1 : parseInt(thisMonthTab.requestBeginDateMonth);
        tabDate = new Date(thisMonthTab.requestBeginDateYear, sumorrest, lastorfirst, 0, 0, 0, 0);

        var areEqualsJourneyOriginAndDestination = false;

        var availabilityInput = VUELING.Util.getObjectInstance('availabilityInput');
        if (availabilityInput != null) {
            areEqualsJourneyOriginAndDestination = availabilityInput.AreEqualsJourneyOriginAndDestination();
        }

        var inorder = SKYSALES.Util.DatesAreInOrder(thisMonthTab.requestMarketIndex, tabDate, areEqualsJourneyOriginAndDestination);
        if (inorder || thisMonthTab.updateAllMarkets) {
            var $container = $('body:first');
            // store selected month indices somewhere globally. I cannot use hidden field as it is designed for day market and not for month market
            $container.data('market-month-'.concat(thisMonthTab.requestMarketIndex), thisMonthTab.tabIndex);
            data = thisMonthTab.getSelectedTabs($container);

            thisMonthTab.toggleSpinner();

            ajaxJson = {
                "tabs": data,
                "clickedMarketIndex": thisMonthTab.requestMarketIndex,
                "selectedFare": selectedFareVal,
                "clientIDPrefix": thisMonthTab.clientIDPrefix,
                "selectedDate": selectedDateString
            };
            SKYSALES.Util.ScheduleSelectedDate(thisMonthTab.requestMarketIndex, tabDate);
            $.post('CalendarAvailabilityAjax-resource.aspx', ajaxJson, thisMonthTab.updateCalendarAvailability);
        } else {
            if (!SKYSALES.Util.IsChangingFlight()) {
                thisMonthTab.errorDisplayPopup.show("blockUIPopUpForInvalidOutbound");
                thisMonthTab.calendarAvailabilityObject.continueLink.unbind("click");
                thisMonthTab.calendarAvailabilityObject.continueLink.click(thisMonthTab.errorDisplayPopup.close);
                thisMonthTab.calendarAvailabilityObject.updateMarketsLink.unbind("click");
                thisMonthTab.calendarAvailabilityObject.updateMarketsLink.bind("click", thisMonthTab.updateAllMarketsHandler);
            } else {
                var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
                availabilityInputInstance.displayDatesOutOfOrderError();
            }
        }
    };
    thisMonthTab.toggleSpinner = function () {
        thisMonthTab.loadingGif.find('#loadCalendarMonth').show()
        thisMonthTab.loadingGif.find('#loadCalendarDay').hide()
        thisMonthTab.loadingGif.toggle();

    };
    thisMonthTab.updateCalendarAvailability = function (data) {
        var newData = $(data),
            calendarInfoData = newData.find('#calendarJson'),
            calendarInfoJson = SKYSALES.Json.parse(calendarInfoData.html()),
            calendarAvailabilityObj = null;

        calendarInfoData.remove();
        if (thisMonthTab.requestMarketIndex == 0)
            newData.find('#monthTabs_1').remove();
        else
            newData.find('#monthTabs_0').remove();

        calendarInfoJson.marketIndex = thisMonthTab.requestMarketIndex;
        html = newData.html();

        //add the new html and clear out the old stuff
        if (thisMonthTab.requestMarketIndex == 0) {
            thisMonthTab.getById('outboundFlightCalendar').replaceWith(html);
        }
        else {
            thisMonthTab.getById('returnFlightCalendar').replaceWith(html);
        }

        calendarAvailabilityObj = new VUELING.Class.CalendarAvailabilityInput();
        calendarAvailabilityObj = calendarAvailabilityObj.init(calendarInfoJson);
        //this.scheduleContainer.html('');
        thisMonthTab.toggleSpinner();
        /*if (thisMonthTab.requestMarketIndex == 0)
        thisMonthTab.getById('outboundFlightCalendar').removeClass('hidden');
        else
        thisMonthTab.getById('returnFlightCalendar').removeClass('hidden');
        */
        thisMonthTab.updateAllMarkets = false;
        if ($.browser.msie && $.browser.version < 8) {
            $('.wrap_availability').each(function () {
                if ($(this).html() == '') $(this).remove();
            });
        }
    };
    //make sure that the selected tab is after the outgoing date or before the inbound date
    thisMonthTab.checkDateSelection = function () {
        if (thisMonthTab.calendarAvailabilityObject.marketArray.length < 2) return true; // one way flight - no need to do the validation for markets consistency
        var tabDate, index = 0, otherMarketDate = null, market = null;
        tabDate = new Date(thisMonthTab.requestBeginDateYear, thisMonthTab.requestBeginDateMonth - 1, 1, 0, 0, 0, 0);
        for (index = 0; index < thisMonthTab.calendarAvailabilityObject.marketArray.length; index += 1) {
            if (index == thisMonthTab.requestMarketIndex) {
                continue;
            }
            market = thisMonthTab.calendarAvailabilityObject.marketArray[index];

            var dateSplitted = market.selectedDate.split("_");
            otherMarketDate = (dateSplitted.length == 3) ? new Date(dateSplitted[0], dateSplitted[1], dateSplitted[2]) : new Date(market.startYear, market.startMonth, 1, 0, 0, 0, 0);;

            if (
                (thisMonthTab.requestMarketIndex > index && tabDate >= otherMarketDate) ||
                (thisMonthTab.requestMarketIndex < index && tabDate <= otherMarketDate)
                ) {
                return true;
            }
            return false;
        }
        return false;
    };
    thisMonthTab.updateAllMarketsHandler = function () {

        var monthTabArray = thisMonthTab.calendarAvailabilityObject.monthTabArray || [],
        clickedTabDate = new Date(thisMonthTab.requestBeginDateYear, thisMonthTab.requestBeginDateMonth - 1, 1, 0, 0, 0, 0),
        formattedDate = $.datepicker.formatDate("yy-mm-dd", clickedTabDate),
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
        if (vuelingSearcher != null) {
            vuelingSearcher.onDepartureDateSelect(formattedDate, false);
            vuelingSearcher.onReturnDateSelect(formattedreturnDate);
        }
        var searchFlight = null;
        for (ins in SKYSALES.Instance) {
            if (ins.indexOf("newSearchFlightSearch") != -1) {
                searchFlight = SKYSALES.Instance[ins];
                break;
            }
        }

        window.scrollTo(0, 0);
        if (searchFlight != null)
            searchFlight.openSearcher();
    };
    return thisMonthTab;
};