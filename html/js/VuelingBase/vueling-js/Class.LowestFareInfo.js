/*
Name: 
Class LowestFareInfo
Param: 
None
Return: 
an instance of LowestFareInfo
Functionality: 
The object that initializes the LowestFareInfo control
Notes: 
The LowestFareInfo is sent down to the browser via JSON that is created in the XSLT file.
The XSLT creates a new SKYSALES.availabilityInput.dateMarketLowestFareList and then the 
SKYSALES.availabilityInput.init function calls the SKYSALES.availabilityInput.initLowestPriceSelection which will
select the radio button sent down as the lowest fare control id.This class also attemps to call 
taxAndFeeInclusiveDisplayDataRequestHandler that is in TaxAndFeeInclusiveDisplay.js
*/
VUELING.Class.LowestFareInfo = function (json) {
    var parent = new SKYSALES.Class.SkySales(),
        thisLowestFareInfo = SKYSALES.Util.extendObject(parent);

    thisLowestFareInfo.advanceDaysHold = -1; //-1 => se puede bloquear todos los días.
    thisLowestFareInfo.tripMarketIndex = '';
    thisLowestFareInfo.marketIndex = '';
    thisLowestFareInfo.dateMarketIndex = '';
    thisLowestFareInfo.lowestFareControlId = "";
    thisLowestFareInfo.lowestFareControl = null;
    thisLowestFareInfo.arrivalStation = "";
    thisLowestFareInfo.departureStation = "";
    thisLowestFareInfo.deptDate = "";
    thisLowestFareInfo.hiddenFieldIdPrefix = "";
    thisLowestFareInfo.hiddenField1 = null;
    thisLowestFareInfo.tabLink = null;
    thisLowestFareInfo.availabilityInput = null;
    thisLowestFareInfo.hiddenField2 = null;
    thisLowestFareInfo.errorPopup = null;
    thisLowestFareInfo.continueLinkId = "";
    thisLowestFareInfo.continueLink = null;
    thisLowestFareInfo.updateMarketsLinkId = "";
    thisLowestFareInfo.updateMarketsLink = null;
    thisLowestFareInfo.outboundDivId = "";
    thisLowestFareInfo.inboundDivId = "";
    thisLowestFareInfo.outboundId = 'outboundDate';
    thisLowestFareInfo.inboundId = 'inboundDate';
    thisLowestFareInfo.validationErrorReadAlong = new SKYSALES.ValidationErrorReadAlong();
    thisLowestFareInfo.showExtraChargesInPrice = false;
    thisLowestFareInfo.ajaxResource = 'AvailabilityInputAjax-resource.aspx'; //ByDefault
    thisLowestFareInfo.IsChangeFlight = false;

    thisLowestFareInfo.init = function (paramObject) {
        this.setSettingsByObject(paramObject);
        this.setVars();
        this.initErrorPopup();
        this.addEvents();
        this.selectDateMarketLowestFare();
    };
    thisLowestFareInfo.setVars = function () {
        thisLowestFareInfo.lowestFareControl = this.getById(this.lowestFareControlId);
        thisLowestFareInfo.tabLink = this.getById("dayTab_" + this.marketIndex + "_" + this.dateMarketIndex);
        thisLowestFareInfo.continueLink = this.getById(this.continueLinkId);
        thisLowestFareInfo.updateMarketsLink = this.getById(this.updateMarketsLinkId);

        thisLowestFareInfo.hiddenField1 = this.getById(this.hiddenFieldIdPrefix + "1");
        thisLowestFareInfo.hiddenField2 = this.getById(this.hiddenFieldIdPrefix + "2");
        thisLowestFareInfo.outbound = this.getById(this.outboundId);
        thisLowestFareInfo.inbound = this.getById(this.inboundId);
    };
    thisLowestFareInfo.initErrorPopup = function () {
        thisLowestFareInfo.errorPopup = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = $("#blockUIPopUpForInvalidOutbound .blockUIPopUpClose");
        thisLowestFareInfo.errorPopup.init(json);
    };
    thisLowestFareInfo.addEvents = function () {
        this.tabLink.unbind();
        this.tabLink.filter('a').click(this.tabClickHandler);
    };
    thisLowestFareInfo.updateAllMarketsHandler = function () {
        var dateMarketArray = thisLowestFareInfo.availabilityInput.dateMarketLowestFareArray || [],
            len = dateMarketArray.length,
            i = 0, currentDateMarket = null,
            thisMarketDate = null,
            otherMarketDate = null,
            foundMarketTab = false;

        thisLowestFareInfo.errorPopup.close();
        thisMarketDate = new Date(thisLowestFareInfo.deptDate);
        //find corresponding tab for date clicked in other market
        for (i = 0; i < len; i++) {
            currentDateMarket = dateMarketArray[i];
            if (currentDateMarket.marketIndex == thisLowestFareInfo.marketIndex) { continue };
            otherMarketDate = new Date(currentDateMarket.deptDate);
            if (otherMarketDate.getTime() == thisMarketDate.getTime()) {
                if (thisLowestFareInfo.marketIndex == 0) {
                    thisLowestFareInfo.hiddenField2.val(parseInt(currentDateMarket.dateMarketIndex) + 1);
                    thisLowestFareInfo.hiddenField1.val(parseInt(thisLowestFareInfo.dateMarketIndex) + 1);
                } else {
                    thisLowestFareInfo.hiddenField1.val(parseInt(currentDateMarket.dateMarketIndex) + 1);
                    thisLowestFareInfo.hiddenField2.val(parseInt(thisLowestFareInfo.dateMarketIndex) + 1);
                }
                foundMarketTab = true;
                break;
            };
        }
        //set hidden field and postback
        if (foundMarketTab) {
            thisLowestFareInfo.setupAjaxAndSendRequest();
        }
    };
    thisLowestFareInfo.updateTabs = function (data) {
        var jsonString = '',
            parsedJson = null,
            availabilityInput = null,
            returnedData = $(data),
            journeyTabs = {},
            newJourneyTabs = returnedData.find('.availabilitySection'),
            monthAjax = {},
            i = 0,
            journeyIndexString = this.marketIndex,
            journeyIndex = parseInt(journeyIndexString, 10),
            allFares = [],
            faresForThisMarket = [],
            selectedDate = new Date(VUELING.Util.parseDate(this.deptDate)),
            selectedDateString = $.datepicker.formatDate("dd/mm/yy", selectedDate),
            isOutbound = true,
            calendarContainerId = '',
            outboundDivId = this.outboundDivId,
            inboundDivId = this.inboundDivId;

        if (returnedData.length == 0)
            return; // nothing to do

        if (journeyIndex === 0) {
            isOutbound = true;
        } else {
            isOutbound = false;
        }
        if (isOutbound) {
            calendarContainerId = 'outboundFlightCalendar';
        } else {
            calendarContainerId = 'returnFlightCalendar';
        }
        calendarContainer = this.getById(calendarContainerId);
        calendarContainer.remove();

        jsonString = $(returnedData[0]).html(); // returnedData.find("#jsonContent").html();
        parsedJson = SKYSALES.Json.parse(jsonString);
        parsedJson.journeyIndex = journeyIndex;
        parsedJson.journeyDate = selectedDate;

        if (parsedJson.JourneysSellKeysWaiveChangeFee) {
            var changeFlight = VUELING.Util.getObjectInstance("ChangeFlight");
            if (changeFlight) {
                changeFlight.JourneysSellKeysWaiveChangeFee = parsedJson.JourneysSellKeysWaiveChangeFee;
            }
        }

        //updating schedules - only do it if the calendar does not exist, if it does then then you're updating the wrong market
        if (isOutbound) {
            journeyTabs = this.getById(outboundDivId);
            journeyTabs.attr('id', outboundDivId);
            journeyTabs.replaceWith(newJourneyTabs);
        } else {
            journeyTabs = this.getById(inboundDivId);
            journeyTabs.attr('id', inboundDivId);
            journeyTabs.replaceWith(newJourneyTabs);
        }
        //the user has selected a date, you have populated the schedule html for that date and market, now initial it for events etc.
        availabilityInput = new VUELING.Class.AvailabilityInput();

        this.updateAvailabilityInstace(parsedJson);

        parsedJson.advanceDaysHold = this.advanceDaysHold;
        availabilityInput.init(parsedJson);
        availabilityInput.availabilityObservers = thisLowestFareInfo.availabilityInput.availabilityObservers;
        //reselect other market fares if necessary
        if (availabilityInput.otherSelectedMarketValue != '' &&
            availabilityInput.otherSelectedMarketIndex != '') {
            $("input[name$='market" + (parseInt(availabilityInput.otherSelectedMarketIndex) + 1) + "'][value='" + availabilityInput.otherSelectedMarketValue + "']").trigger('click');
        }
        for (i = 0; i < 2; i += 1) {
            monthAjax = new VUELING.Class.MonthAjax();
            monthAjax.marketIndex = i;
            monthAjax.flightTimeErrorMessage = this.availabilityInput.flightTimeErrorMessage;
            monthAjax.flightDateErrorMessage = this.availabilityInput.flightDateErrorMessage;
            monthAjax.init();
        }
        thisLowestFareInfo.toggleSpinner();
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
        if (resiFamNumApplyAlertObj != null) {
            resiFamNumApplyAlertObj.showOrHideAlert();
        }

        for (var i in parsedJson.FlightTimeArray) {
            FlightTime = new VUELING.Class.FlightTime();
            FlightTime.init(parsedJson.FlightTimeArray[i]);
        }

        $('.showContent', newJourneyTabs).click(SKYSALES.aosAvailabilityShow);
        $('.hideContent', newJourneyTabs).click(SKYSALES.aosAvailabilityHide);

        var changeFlight = VUELING.Util.getObjectInstance('ChangeFlight');
        if (changeFlight != undefined && changeFlight != null) {
            changeFlight.EventsForNotFlightExcellenceSelected();
        }

        var sortFlightTable = VUELING.Util.getObjectInstance('SortFlightTable');
        if (sortFlightTable != undefined && sortFlightTable != null) {
            for (var i = 0; i < sortFlightTable.markets.length; i++) {
                if (sortFlightTable.markets[i].marketIndex == parsedJson.SortFlightTableMarkets.markets[0].marketIndex) {
                    sortFlightTable.markets[i].journeys = parsedJson.SortFlightTableMarkets.markets[0].journeys;
                }
            }
            sortFlightTable.InitialSort();
        }
    };

    thisLowestFareInfo.updateAvailabilityInstace = function (parsedJson) {
        var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
        for (var pj in parsedJson.dateMarketLowestFareList) {
            var itemPJ = parsedJson.dateMarketLowestFareList[pj];
            for (var aii in availabilityInputInstance.dateMarketLowestFareArray) {
                var itemAII = availabilityInputInstance.dateMarketLowestFareArray[aii];
                if (itemPJ.marketIndex == itemAII.marketIndex && itemPJ.dateMarketIndex == itemAII.dateMarketIndex) {
                    itemAII.deptDate = itemPJ.deptDate;
                    itemAII.tabLink = this.getById("dayTab_" + itemAII.marketIndex + "_" + itemAII.dateMarketIndex);
                    break;
                }
            }
            for (var aii in availabilityInputInstance.dateMarketLowestFareList) {
                var itemAII = availabilityInputInstance.dateMarketLowestFareList[aii];
                if (itemPJ.marketIndex == itemAII.marketIndex && itemPJ.dateMarketIndex == itemAII.dateMarketIndex) {
                    itemAII.deptDate = itemPJ.deptDate;
                    break;
                }
            }
        }
        for (var pj in parsedJson.marketArray) {
            var itemPJ = parsedJson.marketArray[pj];
            for (var aii in availabilityInputInstance.marketArray) {
                var itemAII = availabilityInputInstance.marketArray[aii];
                if (itemPJ.directionLabel == itemAII.directionLabel) {
                    itemAII.marketDepartDate = itemPJ.marketDepartDate;
                    var myDate = itemPJ.marketDepartDate.split("/");
                    itemAII.marketDepartDateFormatted = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
                    break;
                }
            }
        }
        // TODO: quedaría pendiente revisar el resto de propiedades de la Instacia de AvailabilityInput, por ahora refresco las más importantes
    };

    //callback function for ajax request
    thisLowestFareInfo.updateTabsHandler = function (data) {
        thisLowestFareInfo.updateTabs(data);
    };

    thisLowestFareInfo.toggleSpinner = function () {
        var loadingGif = this.getById('loadingGif_' + thisLowestFareInfo.marketIndex);
        loadingGif.find('#loadCalendarDay').show();
        loadingGif.find('#loadCalendarMonth').hide();
        loadingGif.toggle();

    };
    //check to see if this tab selection is allowed
    thisLowestFareInfo.tabClick = function () {
        var availabilityInput = this.availabilityInput,
            dateMarketArray = availabilityInput.dateMarketLowestFareArray || [],
            marketArray = availabilityInput.marketArray,
            numberOfMarkets = SKYSALES.Util.MarketSize(),
            len = dateMarketArray.length,
            i = 0,
            thisMarketDate = new Date(this.deptDate),
            otherJourneyDate = null,
            otherMarketHiddenField = null,
            journeyIndex = parseInt(this.marketIndex, 10),
            departureDate = this.deptDate,
            otherJourneyDateIndex = 0,
            datesAreInOrder = true,
            dateJourneyIndex = parseInt(this.dateMarketIndex, 10),
            dateJourneyNumber = dateJourneyIndex + 1;

        if (thisMarketDate !== null) {
            if (numberOfMarkets > 1) {

                var areEqualsJourneyOriginAndDestination = false;

                var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
                if (availabilityInputInstance != null) {
                    areEqualsJourneyOriginAndDestination = availabilityInputInstance.AreEqualsJourneyOriginAndDestination();
                }

                datesAreInOrder = SKYSALES.Util.DatesAreInOrder(journeyIndex, departureDate, areEqualsJourneyOriginAndDestination);
                if (!datesAreInOrder) {
                    if (journeyIndex == 0 && !thisLowestFareInfo.IsChangeFlight) { // Solo en el caso de estar cambiando la Ida se quiere cambiar automáticamente también la vuelta, si las fechas no están en el orden correcto.
                        thisLowestFareInfo.validationErrorReadAlong.hide();
                        VUELING.Util.ChangeSelectedDate(1, departureDate);

                        SKYSALES.Util.ScheduleSelectedDate(journeyIndex, departureDate);
                        this.toggleSpinner();
                        this.setupAjaxAndSendRequest();
                    } else {
                        availabilityInput.displayDatesOutOfOrderError();
                    }
                } else {
                    SKYSALES.Util.ScheduleSelectedDate(journeyIndex, departureDate);
                    this.toggleSpinner();
                    this.setupAjaxAndSendRequest();
                    thisLowestFareInfo.validationErrorReadAlong.hide();
                }
            } else if (numberOfMarkets == 1) {
                SKYSALES.Util.ScheduleSelectedDate(journeyIndex, departureDate);
                this.toggleSpinner();
                this.setupAjaxAndSendRequest();
                thisLowestFareInfo.validationErrorReadAlong.hide();
            } else {
                //show the block UI
                this.continueLink.unbind("click");
                this.continueLink.click(this.errorPopup.close);
                this.updateMarketsLink.unbind("click");
                this.updateMarketsLink.click(this.updateAllMarketsHandler);
                this.errorPopup.show("blockUIPopUpForInvalidOutbound");
            }

            if (availabilityInput.isMooving == true) {
                var thisMoovingVoucher = VUELING.Util.getObjectInstanceAllStartWith('moovingVoucherView_');
                for (var i = 0; i < thisMoovingVoucher.length; i++) {
                    thisMoovingVoucher[i].resetVoucherValue();
                }
            }
        }
    };

    //check to see if this tab selection is allowed
    thisLowestFareInfo.tabClickHandler = function () {
        thisLowestFareInfo.tabClick();
        $(".availabilityBody tbody tr").removeClass("alt-multicity");
    };
    thisLowestFareInfo.getClickedDate = function () {
        var calendarSelectedDate = VUELING.selectedDate,
            clickedDay = 0,
            clickedMonth = -1,
            clickedYear = 0,
            clickedDateString = '',
            journeyIndex = parseInt(this.marketIndex, 10);

        if (calendarSelectedDate) {
            this.deptDate = clickedDate = calendarSelectedDate;
            delete VUELING.selectedDate;
        } else {
            this.deptDate = clickedDate = VUELING.Util.parseDate(this.deptDate + " 23:59:59");
        }
        SKYSALES.Util.ScheduleSelectedDate(journeyIndex, clickedDate);
        clickedDay = clickedDate.getDate();
        clickedMonth = clickedDate.getMonth() + 1;
        clickedYear = clickedDate.getFullYear();
        clickedDateString = clickedMonth + ' ' + clickedDay + ' ' + clickedYear;
        if (this.marketIndex == 0)
            SKYSALES.Util.ValidateHold(clickedDate, this.advanceDaysHold, this.journeysDateMarketDataModelList);
        return clickedDateString;
    };

    thisLowestFareInfo.setupAjaxAndSendRequest = function () {

        var market1 = $("input[name$='market1']:radio:checked:visible").val(),
            market2 = $("input[name$='market2']:radio:checked:visible").val(),
            clickedDateString = this.getClickedDate(),
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

        $.post(this.ajaxResource, ajaxRequest, this.updateTabsHandler)
        .done(function () {
            var my25C3ErrorMessageObject = VUELING.Util.getObjectInstance("my25C3Messages");
            if (!thisLowestFareInfo.IsChangeFlight || !my25C3ErrorMessageObject) {
                var promoVYScheduleSelectObject = VUELING.Util.getObjectInstance("promoVYScheduleSelect");
                if (promoVYScheduleSelectObject != null || promoVYScheduleSelectObject != undefined)
                    promoVYScheduleSelectObject.update();
            }
            else {
                if (my25C3ErrorMessageObject)
                    my25C3ErrorMessageObject.update();
            }
        });
    };
    thisLowestFareInfo.selectDateMarketLowestFare = function () {
        var lowestFare = this.lowestFareControl || {};

        if (lowestFare) {
            //lowestFare.attr('checked', 'true'); ST 08.12.2011 No fare selected on load
            //do i need to assign lowest fare back to thisLowestFareInfo.lowestFareControl?
        }
    };

    thisLowestFareInfo.IsChangeFlight = function () {
        return (VUELING.Util.getObjectInstance("ChangeFlight") != null) ? true : false;
    };
    return thisLowestFareInfo;
};
