/*
Name: 
Class ChangeWeek
Param: 
None
Return: 
an instance of ChangeWeek
Functionality: 
The object that initializes the ChangeWeek control
Notes: 
The ChangeWeek is sent down to the browser via JSON that is created in the XSLT file.
The XSLT creates a new SKYSALES.availabilityInput.dateMarketLowestFareList and then the 
SKYSALES.availabilityInput.init function calls the SKYSALES.availabilityInput.initLowestPriceSelection which will
select the radio button sent down as the lowest fare control id.This class also attemps to call 
taxAndFeeInclusiveDisplayDataRequestHandler that is in TaxAndFeeInclusiveDisplay.js
*/
VUELING.Class.ChangeWeek = function (json) {
    var parent = new SKYSALES.Class.SkySales(),
        thisChangeWeek = SKYSALES.Util.extendObject(parent);

    thisChangeWeek.tripMarketIndex = '';
    thisChangeWeek.marketIndex = '';
    thisChangeWeek.dateMarketIndex = '';
    thisChangeWeek.lowestFareControlId = "";
    thisChangeWeek.lowestFareControl = null;
    thisChangeWeek.arrivalStation = "";
    thisChangeWeek.departureStation = "";
    thisChangeWeek.deptDate = "";
    thisChangeWeek.hiddenFieldIdPrefix = "";
    thisChangeWeek.hiddenField1 = null;
    thisChangeWeek.tabLink = null;
    thisChangeWeek.availabilityInput = null;
    thisChangeWeek.hiddenField2 = null;
    thisChangeWeek.errorPopup = null;
    thisChangeWeek.continueLinkId = "";
    thisChangeWeek.continueLink = null;
    thisChangeWeek.updateMarketsLinkId = "";
    thisChangeWeek.updateMarketsLink = null;
    thisChangeWeek.outboundDivId = "";
    thisChangeWeek.inboundDivId = "";
    thisChangeWeek.fare = "";
    thisChangeWeek.changeWeekButton = "";
    thisChangeWeek.outboundId = 'outboundDate';
    thisChangeWeek.inboundId = 'inboundDate';
    thisChangeWeek.advanceDaysHold = -1;
    thisChangeWeek.validationErrorReadAlong = new SKYSALES.ValidationErrorReadAlong();

    thisChangeWeek.init = function (paramObject) {
        this.setSettingsByObject(paramObject);
        this.setVars();
        this.initErrorPopup();
        this.addEvents();
    };
    thisChangeWeek.setVars = function () {
        thisChangeWeek.lowestFareControl = this.getById(this.lowestFareControlId);
        thisChangeWeek.tabLink = this.getById("dayTab_" + this.marketIndex + "_" + this.dateMarketIndex);
        thisChangeWeek.continueLink = this.getById(this.continueLinkId);
        thisChangeWeek.updateMarketsLink = this.getById(this.updateMarketsLinkId);

        thisChangeWeek.hiddenField1 = this.getById(this.hiddenFieldIdPrefix + "1");
        thisChangeWeek.hiddenField2 = this.getById(this.hiddenFieldIdPrefix + "2");
        thisChangeWeek.outbound = this.getById(this.outboundId);
        thisChangeWeek.inbound = this.getById(this.inboundId);
    };
    thisChangeWeek.initErrorPopup = function () {
        var json = {};

        thisChangeWeek.errorPopup = new SKYSALES.Class.BlockedPopUp();
        json.closeElement = $("#blockUIPopUpForInvalidOutbound .blockUIPopUpClose");
        thisChangeWeek.errorPopup.init(json);
    };
    thisChangeWeek.addEvents = function () {
        this.changeWeekButton.click(this.changeWeekClickHandler);
    };
    thisChangeWeek.updateAllMarketsHandler = function () {
        var dateMarketArray = thisChangeWeek.availabilityInput.dateMarketLowestFareArray || [],
            len = dateMarketArray.length,
            i = 0,
            currentDateMarket = null,
            thisMarketDate = null,
            otherMarketDate = null,
            foundMarketTab = false;

        thisChangeWeek.errorPopup.close();
        $('#LinkButtonNextWeek1').click();
        $('#dayTab_0_6').click();
    };
    //callback function for ajax request
    thisChangeWeek.updateTabs = function (data) {
        var jsonString = "",
            parsedJson = null,
            availabilityInput = null,
            returnedData = $(data),
            monthAjax = {},
            i = 0,
            marketIndexString = this.marketIndex,
            marketIndex = parseInt(marketIndexString),
            journeyIndex = marketIndex,
            allFares = [],
            faresForThisMarket = [],
            deptDate = VUELING.Util.parseDate(this.deptDate),
            selectedDate = new Date(new Date(new Date(deptDate.setHours(23)).setMinutes(59)).setSeconds(59)),
            selectedDateString = $.datepicker.formatDate("dd/mm/yy", selectedDate),
            isOutbound = true;

        if (journeyIndex === 0) {
            isOutbound = true;
        } else {
            isOutbound = false;
        }
        jsonString = $(returnedData[0]).html(); // returnedData.find("#jsonContent").html();
        parsedJson = SKYSALES.Json.parse(jsonString);

        if (parsedJson.JourneysSellKeysWaiveChangeFee) {
            var changeFlight = VUELING.Util.getObjectInstance("ChangeFlight");
            if (changeFlight) {
                changeFlight.JourneysSellKeysWaiveChangeFee = parsedJson.JourneysSellKeysWaiveChangeFee;
            }
        }

        //updating schedules - only do it if the calendar does not exist, if it does then then you're updating the wrong market
        if (marketIndex === 0) {
            this.getById(this.outboundDivId).replaceWith(returnedData.find('#' + this.outboundDivId));
        } else if (marketIndex === 1) {
            this.getById(this.inboundDivId).replaceWith(returnedData.find('#' + this.inboundDivId));
        }
        //the user has selected a date, you have populated the schedule html for that date and market, now initial it for events etc.
        availabilityInput = new VUELING.Class.AvailabilityInput();
        var availabilityInputInstance = VUELING.Util.getObjectInstance("availabilityInput");
        availabilityInput.advanceDaysHold = parseInt(availabilityInputInstance.advanceDaysHold);
        availabilityInput.journeysDateMarketDataModel = availabilityInputInstance.journeysDateMarketDataModel;
        availabilityInput.journeysDateMarketDataModelList = availabilityInputInstance.journeysDateMarketDataModelList;

        thisChangeWeek.advanceDaysHold = availabilityInput.advanceDaysHold;

        availabilityInput.init(parsedJson);
        SKYSALES.initializeAosAvailability();
        //reselect other market fares if necessary
        if (availabilityInput.otherSelectedMarketValue != '' && availabilityInput.otherSelectedMarketIndex != '') {
            $("input[name$='market" + (parseInt(availabilityInput.otherSelectedMarketIndex) + 1) + "'][value='" + availabilityInput.otherSelectedMarketValue + "']").trigger('click');
        }
        for (i = 0; i < 2; i += 1) {
            monthAjax = new VUELING.Class.MonthAjax();
            monthAjax.marketIndex = i;
            monthAjax.flightTimeErrorMessage = this.availabilityInput.flightTimeErrorMessage;
            monthAjax.flightDateErrorMessage = this.availabilityInput.flightDateErrorMessage;
            monthAjax.init();
        }
        this.toggleSpinner();
        if (isOutbound) {
            this.getById(this.outboundDivId).removeClass('hidden');
            this.outbound.html(selectedDateString);
            SKYSALES.taxAndFeeScheduleSelectDefaultDisplayHandler(0, selectedDateString);
        } else {
            this.getById(this.inboundDivId).removeClass('hidden');
            this.inbound.html(selectedDateString);
            SKYSALES.taxAndFeeScheduleSelectDefaultDisplayHandler(1, selectedDateString);
        }

        var resiFamNumApplyAlertObj = VUELING.Util.getObjectInstance("resiFamNumApplyAlert");
        if (resiFamNumApplyAlertObj != null)
            resiFamNumApplyAlertObj.showOrHideAlert();

        SKYSALES.Util.ValidateHold(deptDate, this.advanceDaysHold, this.journeysDateMarketDataModelList);

        var changeFlight = VUELING.Util.getObjectInstance('ChangeFlight');
        if (changeFlight != undefined && changeFlight != null) {
            changeFlight.EventsForNotFlightExcellenceSelected();
        }
    };
    //callback function for ajax request
    thisChangeWeek.updateTabsHandler = function (data) {
        thisChangeWeek.updateTabs(data);
    };
    thisChangeWeek.toggleSpinner = function () {
        var loadingGif = this.getById('loadingGif_' + thisChangeWeek.marketIndex);
        loadingGif.find('#loadCalendarDay').show()
        loadingGif.find('#loadCalendarMonth').hide()
        loadingGif.toggle();
    };
    //check to see if this tab selection is allowed
    thisChangeWeek.changeWeekClick = function (e) {
        var availabilityInput = this.availabilityInput,
            dateMarketArray = availabilityInput.dateMarketLowestFareArray || [],
            marketArray = availabilityInput.marketArray,
            numberOfMarkets = SKYSALES.Util.MarketSize(),
            len = dateMarketArray.length,
            i = 0,
            otherMarketTabs = null,
            thisMarketDate = null,
            otherMarketDate = null,
            otherMarketHiddenField = null,
            marketIndex = parseInt(this.marketIndex);

        var dayDifference = SKYSALES.Util.DayDifference(), mustChange = false, deptDayManual = "";

        var arrowId = $(e.target).attr('id');
        var previousWeekDirection = arrowId.indexOf("previousWeekArrow") == 0;
        var nextWeekDirection = arrowId.indexOf("nextWeekArrow") == 0;

        if (marketIndex === 0) {
            otherMarketHiddenField = this.hiddenField2;
            if (dayDifference < 7 && dayDifference > 3 && nextWeekDirection) {
                mustChange = true;
                deptDayManual = new Date($('#dateselected0').val());
                deptDayManual.setDate(deptDayManual.getDate() + dayDifference);
            }
        } else {
            otherMarketHiddenField = this.hiddenField1;
            if (dayDifference < 7 && dayDifference > 3 && previousWeekDirection) {
                mustChange = true;
                deptDayManual = new Date($('#dateselected1').val() + " 23:59:59");
                deptDayManual.setDate(deptDayManual.getDate() - dayDifference);
            }
        }

        // find the tab currently selected in the other market       
        otherMarketTabs = $.grep(dateMarketArray, function (e) { return e.marketIndex != this.marketIndex && e.dateMarketIndex == otherMarketHiddenField.val() - 1; });
        if (!mustChange) {
            thisMarketDate = new Date(this.deptDate);
            thisMarketDate.setHours(23, 59, 59);
        } else
            thisMarketDate = new Date(deptDayManual);
        var datesInOrder = true;
        if (numberOfMarkets > 1) {

            var areEqualsJourneyOriginAndDestination = false;

            var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
            if (availabilityInputInstance != null) {
                areEqualsJourneyOriginAndDestination = availabilityInputInstance.AreEqualsJourneyOriginAndDestination();
            }

            datesInOrder = SKYSALES.Util.DatesAreInOrder(marketIndex, thisMarketDate, areEqualsJourneyOriginAndDestination);
        }

        if (!isNaN(thisMarketDate.getTime()) && datesInOrder) {
            if (otherMarketTabs.length > 0) {
                otherMarketDate = new Date(otherMarketTabs[0].deptDate);
                if ((marketIndex === 0 &&
                    thisMarketDate <= otherMarketDate) ||
                    (marketIndex === 1 &&
                    thisMarketDate >= otherMarketDate)) {
                    //set hidden field and postback
                    if (marketIndex === 0) {
                        this.hiddenField1.val(parseInt(this.dateMarketIndex) + 1);
                    } else {
                        this.hiddenField2.val(parseInt(this.dateMarketIndex) + 1);
                    }
                }
            }
            this.toggleSpinner();
            SKYSALES.Util.ScheduleSelectedDate(marketIndex, thisMarketDate);
            this.validationErrorReadAlong.hide();
            this.setupAjaxAndSendRequest(deptDayManual);
        } else {
            //show the block UI
            this.continueLink.unbind("click");
            this.continueLink.click(this.errorPopup.close);
            this.updateMarketsLink.unbind("click");
            this.updateMarketsLink.click(this.updateAllMarketsHandler);
            this.errorPopup.show("blockUIPopUpForInvalidOutbound");
        }

        var my25C3ErrorMessageObject = VUELING.Util.getObjectInstance("my25C3Messages");
        if (my25C3ErrorMessageObject)
            my25C3ErrorMessageObject.update();
        else {
            var promoVYScheduleSelectObject = VUELING.Util.getObjectInstance("promoVYScheduleSelect");
            if (promoVYScheduleSelectObject != null || promoVYScheduleSelectObject != undefined)
                promoVYScheduleSelectObject.update();
        }
       

    };
    //check to see if this tab selection is allowed
    thisChangeWeek.changeWeekClickHandler = function (e) {
        thisChangeWeek.changeWeekClick(e);
    };
    thisChangeWeek.getClickedDate = function (deptDayManual) {
        var calendarSelectedDate = VUELING.selectedDate,
            clickedDay = 0,
            clickedMonth = -1,
	    clickedYear = 0,
            clickedDateString = '';

        if (calendarSelectedDate) {
            clickedDate = calendarSelectedDate;
            delete VUELING.selectedDate;
        } else {
            clickedDate = VUELING.Util.parseDate(this.deptDate);
            if (clickedDate < new Date()) {
                clickedDate = new Date();
            }
        }
        if (deptDayManual != "") {
            clickedDay = deptDayManual.getDate();
            clickedMonth = deptDayManual.getMonth() + 1;
            clickedYear = deptDayManual.getFullYear();
        } else {
            clickedDay = clickedDate.getDate();
            clickedMonth = clickedDate.getMonth() + 1;
            clickedYear = clickedDate.getFullYear();
        }
        clickedDateString = clickedMonth + ' ' + clickedDay + ' ' + clickedYear;

        return clickedDateString;
    };
    thisChangeWeek.setupAjaxAndSendRequest = function (deptDayManual) {
        var market1 = $("input[name$='market1']:radio:checked:visible").val(),
            market2 = $("input[name$='market2']:radio:checked:visible").val(),
            clickedDateString = this.getClickedDate(deptDayManual),
            ajaxRequest = {
                "market1": market1,
                "market2": market2,
                "clickedMarketIndex": this.marketIndex,
                "clickedCalendarDate": clickedDateString,
                "HiddenFieldTabIndex1": this.hiddenField1.val(),
                "HiddenFieldTabIndex2": this.hiddenField2.val(),
                "clientId": this.availabilityInput.clientId,
                "inChangeFlow": this.availabilityInput.inChangeFlow
            };

        $.post('AvailabilityInputAjax-resource.aspx', ajaxRequest, this.updateTabsHandler);
    };
    return thisChangeWeek;
};