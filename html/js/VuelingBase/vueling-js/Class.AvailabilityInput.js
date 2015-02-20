/*
Name: 
Class AvailabilityInput
Param:
None
Return: 
An instance of AvailabilityInput
Functionality:
The object that initializes the AvailabilityInput control
Notes:
The journeyInfoList is set down to the browser via JSON that is created in the XSLT file.
The XSLT creates a new SKYSALES.Class.AvailabilityInput and then sets the SKYSALES.availabilityInput.journeyInfoList
property to an array of JourneyInfo objects. It then calls SKYSALES.availabilityInput.init
This class also attemps to call taxAndFeeInclusiveDisplayDataRequestHandler that is in TaxAndFeeInclusiveDisplay.js
Class Hierarchy:
AvailabilityInput
*/

VUELING.Class.AvailabilityInput = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisAvailabilityInput = SKYSALES.Util.extendObject(parent);

    thisAvailabilityInput.advanceDaysHold = -1; //-1 => se puede bloquear todos los días.
    thisAvailabilityInput.isOneFare = false;
    thisAvailabilityInput.isMooving = false;
    thisAvailabilityInput.inChangeFlow = false;
    thisAvailabilityInput.detailsLinks = null;
    thisAvailabilityInput.journeyInfoArray = [];
    thisAvailabilityInput.journeyInfoList = [];
    thisAvailabilityInput.journeysDateMarketDataModel = [];
    thisAvailabilityInput.journeysDateMarketDataModelList = [];

    thisAvailabilityInput.dateMarketLowestFareList = [];
    thisAvailabilityInput.dateMarketLowestFareArray = [];
    thisAvailabilityInput.marketArray = [];
    thisAvailabilityInput.fFTabDetailsList = [];
    thisAvailabilityInput.isChangeFlight = false;
    thisAvailabilityInput.originFlight = [];

    thisAvailabilityInput.blockPriceCheckboxId = '';
    thisAvailabilityInput.blockPriceCheckbox = null;

    thisAvailabilityInput.blockPriceLinkText = '';
    thisAvailabilityInput.continueLinkText = '';

    thisAvailabilityInput.selectedMarketIndex = -1;
    thisAvailabilityInput.otherSelectedMarketIndex = '';
    thisAvailabilityInput.otherSelectedMarketValue = '';

    thisAvailabilityInput.flightTimeErrorMessage = 'Time selection error.';
    thisAvailabilityInput.flightDateErrorMessage = 'Date selection error.';
    thisAvailabilityInput.flightNumberSelectsErrorMessage = 'No selected flight.';
    thisAvailabilityInput.flightNumberSelectsErrorMessagePlural = 'No selected flight.';
    thisAvailabilityInput.flightNoAvailableErrorMessage = 'No available flights.';

    thisAvailabilityInput.flightToContinueNoFlightSelected = 'No selected flight.';
    thisAvailabilityInput.flight1 = 'No selected flight.';
    thisAvailabilityInput.flight2 = 'No selected flight.';
    thisAvailabilityInput.flightToContinueNoFlight1 = 'No selected flight.';
    thisAvailabilityInput.flightToContinueNoFlight2 = 'No selected flight.';
    thisAvailabilityInput.flightToContinueNoIda = 'No selected flight.';
    thisAvailabilityInput.flightToContinueNoVuelta = 'No selected flight.';

    thisAvailabilityInput.isMulticity = false;
    thisAvailabilityInput.isBuyWithPointsChangeToMoney = false;

    thisAvailabilityInput.holdPriceInfoPopup = null;
    thisAvailabilityInput.holdPriceInfoLink = null;
    thisAvailabilityInput.holdPriceInfoConditionsPopup = null;
    thisAvailabilityInput.holdPriceInfoConditionsLink = null;
    thisAvailabilityInput.validationErrorReadAlong = null;

    thisAvailabilityInput.submitButton = null;
    thisAvailabilityInput.validateMarketDays = true;

    thisAvailabilityInput.promoUniversalUrl = '';
    thisAvailabilityInput.promoUniversalTimeout = '';
    thisAvailabilityInput.textoPromoUniversal = '';
    thisAvailabilityInput.promoUniversalMarkInstance = null;

    thisAvailabilityInput.clientId = '';
    thisAvailabilityInput.nextWeekBaseId = 'LinkButtonNextWeek';
    thisAvailabilityInput.previousWeekBaseId = 'LinkButtonPreviousWeek';
    thisAvailabilityInput.nextWeek = [];
    thisAvailabilityInput.previousWeek = [];

    thisAvailabilityInput.nextWeekArrowBaseId = 'nextWeekArrow';
    thisAvailabilityInput.previousWeekArrowBaseId = 'previousWeekArrow';
    thisAvailabilityInput.nextWeekArrows = [];
    thisAvailabilityInput.previousWeekArrows = [];

    thisAvailabilityInput.isIE7OrLess = false;

    thisAvailabilityInput.journeyIndex = 0;
    thisAvailabilityInput.journeyDate = null;
    thisAvailabilityInput.showExtraChargesInPrice = false;

    thisAvailabilityInput.departureStationCodeId1 = "";
    thisAvailabilityInput.arrivalStationCodeId1 = "";
    thisAvailabilityInput.departureStationCodeId2 = "";
    thisAvailabilityInput.arrivalStationCodeId2 = "";

    thisAvailabilityInput.departureStationCodeInput1 = null;
    thisAvailabilityInput.arrivalStationCodeInput1 = null;
    thisAvailabilityInput.departureStationCodeInput2 = null;
    thisAvailabilityInput.arrivalStationCodeInput2 = null;

    thisAvailabilityInput.ajaxResource = 'AvailabilityInputAjax-resource.aspx'; //ByDefault

    thisAvailabilityInput.excellenceDisclaimerDialog = null;

    thisAvailabilityInput.availabilityObservers = [];

    thisAvailabilityInput.addObserver = function (observer) {
        if (observer && typeof (observer) == "function") {
            thisAvailabilityInput.availabilityObservers.push(observer);
        }
    };

    thisAvailabilityInput.NotifyToObservers = function () {
        $.each(thisAvailabilityInput.availabilityObservers, function (index, event) {
            try {
                event();
            } catch (e) {
                console.error('Error executing: %s. Error: %s', event, e);
            }
        });
    };

    thisAvailabilityInput.getPriceItineraryInfo = function () {
        if (SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler) {
            var markets = $("#selectPage .availabilityBody tbody tr td[class^='price'] input:checked"),
                    keys = [],
                    totalNumberMarkets = $("div.availabilitySection.marketSection").length;

            if (markets.length > 0) {
                for (a = 0; a < totalNumberMarkets; a++) {
                    keys[a] = "undefined";
                }

                $(markets).each(function (i) {
                    if (this.name.indexOf('market') > 0) {
                        var marketNum = this.name.substr(this.name.indexOf('market') + 6, this.name.indexOf('market') + 7);
                        if (marketNum > 0) {
                            keys[marketNum - 1] = $(this).val();
                        }
                    }
                });
                SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler(keys, markets.length, this.marketArray);
            } else {
                if (this.isOneFare) SKYSALES.taxAndFeeInclusiveDisplayInitialLoadHandler(this.marketArray);
            }
            if (this.isOneFare) if (arguments.length == 0) SKYSALES.atAGlanceControlScrollEvent('div.atAGlanceContainer');
        }
    };

    thisAvailabilityInput.showPreselectedFares = function (keyArray) {
        var keyIndex = 0;
        for (keyIndex = 0; keyIndex < keyArray.length; keyIndex += 1) {
            if (keyArray[keyIndex] !== null) {
                this.getById(keyArray[keyIndex]).click();
            }
        }
    };

    thisAvailabilityInput.displayError = function (errorMsgText) {
       var validationErrorListId = this.validationErrorReadAlong.getValidationErrorListId(),
            readAlongDivId = this.getById(validationErrorListId).attr('id');

        if (readAlongDivId === undefined) {
            this.validationErrorReadAlong.addValidationErrorDiv();
            this.validationErrorReadAlong.addCloseEvent();
        }
        this.getById(validationErrorListId).html(errorMsgText);
        this.validationErrorReadAlong.show();
    };

    thisAvailabilityInput.displayDatesOutOfOrderError = function () {
        thisAvailabilityInput.displayError(this.flightDateErrorMessage);
        SKYSALES.Util.anchorToErrorMsg();
    };

    thisAvailabilityInput.GetDateObject = function (dateString) {
        var reggie = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
        var dateArray = reggie.exec(dateString);
        var dateObject = new Date((+dateArray[3]), (+dateArray[2]) - 1, (+dateArray[1]), (+dateArray[4]), (+dateArray[5]), 0);
        return dateObject;
    }

    thisAvailabilityInput.showedMarketSize = function () {
        var markets_firstFlight = $("#availabilityTable0.availabilityBody tbody tr td input");
        var markets_secondtFlight = $("#availabilityTable1.availabilityBody tbody tr td input");
        var result = 0;
        if (markets_firstFlight.length > 0)
            result++;
        if (markets_secondtFlight.length > 0)
            result++;
        return result;
    };

    thisAvailabilityInput.IsChangeFlight = function () {
        return (VUELING.Util.getObjectInstance("ChangeFlight") != null || thisAvailabilityInput.isMooving) ? eval(thisAvailabilityInput.isChangeFlight) : false;
    };

    thisAvailabilityInput.validateMarketDates = function () {
        var selected_markets = $(".availabilityBody tbody tr td input:checked");
        var count_markets = SKYSALES.Util.MarketSizeWithHiddenAvailability();
        var count_markets_showed = SKYSALES.Util.MarketSize();
        var selectedDepartureDates = [];
        var selectedArrivalDates = [];
        var len = 0;
        var isValid = true;
        var errorMsgText = thisAvailabilityInput.flightTimeErrorMessage;
        var i = 0;
        var changingFlight = thisAvailabilityInput.IsChangeFlight();
        var origins = thisAvailabilityInput.originFlight[0];

        thisAvailabilityInput.validationErrorReadAlong.hide();
        if (count_markets == selected_markets.length || (selected_markets.length > 0 && count_markets_showed == selected_markets.length) && SKYSALES.Util.AllMarketsShownHaveAvailability()) {
            if (count_markets > 1) {
                if (changingFlight) {
                    if (!(origins.changeOutboundFlight && origins.changeReturnFlight)) {
                        if (origins.changeOutboundFlight) {
                            selectedDepartureDates[0] = thisAvailabilityInput.getSelectedDateTime(0, selected_markets[0]);
                            selectedDepartureDates[1] = thisAvailabilityInput.GetDateObject(origins.returnDepartureDate + " " + origins.returnDepartureTime);
                            selectedArrivalDates[0] = thisAvailabilityInput.getArrivalSelectedDate(0, selected_markets[0]);
                            selectedArrivalDates[1] = thisAvailabilityInput.GetDateObject(origins.returnArrivalDate + " " + origins.returnArrivalTime);
                        }
                        else {
                            selectedDepartureDates[0] = thisAvailabilityInput.GetDateObject(origins.outboundDepartureDate + " " + origins.outboundDepartureTime);
                            selectedDepartureDates[1] = thisAvailabilityInput.getSelectedDateTime(1, selected_markets[selected_markets.length - 1]);
                            selectedArrivalDates[0] = thisAvailabilityInput.GetDateObject(origins.outboundArrivalDate + " " + origins.outboundArrivalTime);
                            selectedArrivalDates[1] = thisAvailabilityInput.getArrivalSelectedDate(1, selected_markets[selected_markets.length - 1]);
                        }
                    }
                }
                if (selectedDepartureDates.length == 0) {
                    $.each(selected_markets, function (index, element) {
                        selectedDepartureDates[index] = thisAvailabilityInput.getSelectedDateTime(index, element);
                        selectedArrivalDates[index] = thisAvailabilityInput.getArrivalSelectedDate(index, element);
                    });
                }
                len = selectedDepartureDates.length;
                for (i = 0; i < len - 1; i++) {
                    isValid = isValid && selectedDepartureDates[i] < selectedDepartureDates[i + 1];
                }
                if (isValid && count_markets == 2 && selectedArrivalDates.length > 0 && selectedDepartureDates.length > 1) {
                    var firstJourneyArrivalDate = selectedArrivalDates[0];
                    var secondJourneyDepartureDate = selectedDepartureDates[1];

                    if (firstJourneyArrivalDate > secondJourneyDepartureDate)
                        isValid = false;
                }
            } else if (count_markets == 1) {
                isValid = true;
            } else {
                isValid = false;
                errorMsgText = thisAvailabilityInput.flightNoAvailableErrorMessage;
            }
        }
        else {
            isValid = false;
            var isFirstFlightChangeAndSelected = thisAvailabilityInput.IsFirstFlightChangeAndSelected(changingFlight, origins);
            var isSecondFlightChangeAndSelected = thisAvailabilityInput.IsSecondFlightChangeAndSelected(changingFlight, origins);

            if (thisAvailabilityInput.isMulticity == true) {
                if (!isFirstFlightChangeAndSelected && !isSecondFlightChangeAndSelected) {
                    errorMsgText = thisAvailabilityInput.flightToContinueNoFlightSelected;
                }
                else if (!isFirstFlightChangeAndSelected && isSecondFlightChangeAndSelected) {
                    errorMsgText = thisAvailabilityInput.flightToContinueNoFlight1;
                }
                else if (isFirstFlightChangeAndSelected && !isSecondFlightChangeAndSelected) {
                    errorMsgText = thisAvailabilityInput.flightToContinueNoFlight2;
                }
                else {
                    errorMsgText = thisAvailabilityInput.flightToContinueNoFlightSelected;
                }
            }
            else if (count_markets == 2) {
                if (!isFirstFlightChangeAndSelected && !isSecondFlightChangeAndSelected) {
                    errorMsgText = thisAvailabilityInput.flightNumberSelectsErrorMessagePlural;
                }
                else if (!isFirstFlightChangeAndSelected && isSecondFlightChangeAndSelected) {
                    errorMsgText = thisAvailabilityInput.flightToContinueNoIda;
                }
                else if (isFirstFlightChangeAndSelected && !isSecondFlightChangeAndSelected) {
                    errorMsgText = thisAvailabilityInput.flightToContinueNoVuelta;
                }
                else {
                    errorMsgText = thisAvailabilityInput.flightNumberSelectsErrorMessagePlural;
                }
            }
            else {
                errorMsgText = thisAvailabilityInput.flightNumberSelectsErrorMessage;
            }
        }

        if (!changingFlight && count_markets_showed != count_markets) {
            if (selected_markets.length < count_markets) {
                var depSelected = $("#availabilityTable0 tbody tr td input:checked").length > 0;
                errorMsgText = !depSelected ? thisAvailabilityInput.flightToContinueNoIda : thisAvailabilityInput.flightToContinueNoVuelta;
            }
            else {
                errorMsgText = thisAvailabilityInput.flightToContinueNoIda;
            }
            isValid = false;
        }
        if (!isValid) {
            var readAlongDivId = thisAvailabilityInput.getById(thisAvailabilityInput.validationErrorReadAlong.getValidationErrorListId()).attr('id');
            if (readAlongDivId === undefined || ($.browser.msie && parseInt($.browser.version) < 9)) {
                thisAvailabilityInput.validationErrorReadAlong.addValidationErrorDiv();
                thisAvailabilityInput.validationErrorReadAlong.addCloseEvent();
            }
            // We need to track when these errors ocurr. Call a TrackingEvent.
            if (errorMsgText == thisAvailabilityInput.flightNumberSelectsErrorMessage || errorMsgText == thisAvailabilityInput.flightNumberSelectsErrorMessagePlural) {
                VUELING.trackingFunction('', 'event11', 'Falta vuelo ida o vuelta falta STV. ');
            }
            if (errorMsgText == thisAvailabilityInput.flightTimeErrorMessage) {
                VUELING.trackingFunction('', 'event10', 'Ida antes de la vuelta STV. ');
            }
            thisAvailabilityInput.getById(thisAvailabilityInput.validationErrorReadAlong.getValidationErrorListId()).html(errorMsgText);
            thisAvailabilityInput.validationErrorReadAlong.show();
            SKYSALES.Util.anchorToErrorMsg();
        }
        return isValid;
    };

    thisAvailabilityInput.IsFirstFlightChangeAndSelected = function (changingFlight, origins) {
        var isFirstFlightSelected = $("#availabilityTable0.availabilityBody tbody tr td input:checked").length > 0;
        if (!changingFlight)
            return isFirstFlightSelected;
        else
            return origins.changeOutboundFlight && isFirstFlightSelected || !origins.changeOutboundFlight;
    };

    thisAvailabilityInput.IsSecondFlightChangeAndSelected = function (changingFlight, origins) {
        var isSecondFlightSelected = $("#availabilityTable1.availabilityBody tbody tr td input:checked").length > 0;
        if (!changingFlight)
            return isSecondFlightSelected;
        else
            return origins.changeReturnFlight && isSecondFlightSelected || !origins.changeReturnFlight;
    };

    thisAvailabilityInput.clickValidateMulticityWaitingTime = function (rowSelected, itemSelected) {
        var thisMulticity12h = VUELING.Util.getObjectInstance('multicity12hInput');
        if (thisMulticity12h.IsMultiCity) {
            if (itemSelected.parent().hasClass("alt-multicity"))
                thisMulticity12h.openInfoBox();
            else {
                var sel1 = $("#availabilityTable0 tbody tr td input:checked");
                var sel2 = $("#availabilityTable1 tbody tr td input:checked");
                if (sel1.length > 0) sel1 = sel1[0];
                if (sel2.length > 0) sel2 = sel2[0];
                if (rowSelected.indexOf("0") >= 0) sel2 = undefined;
                else sel1 = undefined;

                var selecteds;
                if (sel1 != undefined && sel2 == undefined) selecteds = $("#availabilityTable1 tbody tr td input");
                else if (sel2 != undefined && sel1 == undefined) selecteds = $("#availabilityTable0 tbody tr td input");

                $(".availabilityBody tbody tr").removeClass("alt-multicity");
                selecteds.each(function (i, item) {
                    var reggie1 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}).*(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
                    var reggie2 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
                    var dateArray1 = reggie1.exec($((sel1 ? sel1 : item)).val());
                    var dateArray2 = reggie2.exec($((sel2 ? sel2 : item)).val());
                    var date1 = new Date((+dateArray1[8]), (+dateArray1[6]) - 1, (+dateArray1[7]), (+dateArray1[9]), (+dateArray1[10]), 0);
                    var date2 = new Date((+dateArray2[3]), (+dateArray2[1]) - 1, (+dateArray2[2]), (+dateArray2[4]), (+dateArray2[5]), 0);
                    var minutes1 = (Math.round(date1 / (1000 * 60))) - thisMulticity12h.timeZoneDifferenceArrive;
                    var minutes2 = (Math.round(date2 / (1000 * 60))) - thisMulticity12h.timeZoneDifferenceDeparture;
                    if ((minutes2 - minutes1) < thisMulticity12h.waitingHours * 60)
                        $(item).parent().parent().addClass("alt-multicity");
                });

                if ($("#availabilityTable0 tbody tr td input:checked").length > 0 || $("#availabilityTable1 tbody tr td input:checked").length > 0) {
                    var tableSelected = "availabilityTable0";
                    if ($("#availabilityTable0 tbody tr td input:checked").length > 0)
                        tableSelected = "availabilityTable1";

                    var tableSelectTr = $("#" + tableSelected + " tbody tr");
                    if (tableSelectTr.length > 0 && tableSelectTr.not('.alt-multicity').length <= 0) {
                        var thisAvailabilityInput = VUELING.Util.getObjectInstance('availabilityInput');
                        var divmsgs = "#" + thisAvailabilityInput.ErrorDivId;
                        if ($("#errorMsg").length > 0)
                            $("#errorMsg").remove();

                        var msg = thisMulticity12h.MessageErrorNotAvailable;
                        if (this.departureStationCodeInput2.val() == this.arrivalStationCodeInput1.val() &&
                            $.inArray(this.departureStationCodeInput2.val(), thisMulticity12h.HubStations) >= 0) {
                            msg = thisMulticity12h.MessageErrorNotAvailablePopUpWithBCN;
                        }
                        $(divmsgs).before('<div id="errorMsg" class="sectionBorder"><div class="icon icoMsgError floatLeft"></div><div id="validationErrorMultcity12h" class="content_colRight">' + msg + '</div><div class="clearBoth"></div><div class="clearFix"></div></div>');
                        $("html, body").animate({ scrollTop: $("form").offset().top }, 100);
                    }
                }

            }
        }
    };

    thisAvailabilityInput.validateMulticityWaitingTime = function () {
        var thisMulticity12h = VUELING.Util.getObjectInstance('multicity12hInput');
        var isValid = true;
        if (thisMulticity12h.IsMultiCity) {
            var date1 = new Date();
            var date2 = new Date();
            var selected_markets = $(".availabilityBody tbody tr td input:checked");
            var reggie1 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}).*(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
            var reggie2 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
            var changingFlight = thisAvailabilityInput.IsChangeFlight();
            var origins = thisAvailabilityInput.originFlight[0];
            if (!changingFlight || (origins.changeOutboundFlight && origins.changeReturnFlight)) {
                var dateArray1 = reggie1.exec($(selected_markets[0]).val());
                var dateArray2 = reggie2.exec($(selected_markets[selected_markets.length - 1]).val());
                date1 = new Date((+dateArray1[8]), (+dateArray1[6]) - 1, (+dateArray1[7]), (+dateArray1[9]), (+dateArray1[10]), 0);
                date2 = new Date((+dateArray2[3]), (+dateArray2[1]) - 1, (+dateArray2[2]), (+dateArray2[4]), (+dateArray2[5]), 0);
            }
            else {
                if (!origins.changeOutboundFlight && origins.changeReturnFlight) {
                    var dateArray2 = reggie2.exec($(selected_markets[selected_markets.length - 1]).val());
                    date2 = new Date((+dateArray2[3]), (+dateArray2[1]) - 1, (+dateArray2[2]), (+dateArray2[4]), (+dateArray2[5]), 0);
                    date1 = thisAvailabilityInput.GetDateObject(origins.outboundArrivalDate + " " + origins.outboundArrivalTime);
                }
                else if (origins.changeOutboundFlight && !origins.changeReturnFlight) {
                    var dateArray1 = reggie1.exec($(selected_markets[0]).val());
                    date1 = new Date((+dateArray1[8]), (+dateArray1[6]) - 1, (+dateArray1[7]), (+dateArray1[9]), (+dateArray1[10]), 0);
                    date2 = thisAvailabilityInput.GetDateObject(origins.returnDepartureDate + " " + origins.returnDepartureTime);
                }
            }

            var minutes1 = (Math.round(date1 / (1000 * 60))) - thisMulticity12h.timeZoneDifferenceArrive;
            var minutes2 = (Math.round(date2 / (1000 * 60))) - thisMulticity12h.timeZoneDifferenceDeparture;
            if ((minutes2 - minutes1) < thisMulticity12h.waitingHours * 60) {
                thisMulticity12h.openInfoBox();
                isValid = false;
            }
        }
        return isValid;
    };

    thisAvailabilityInput.getSelectedDateTime = function (index, element) {
        var regex = /(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/]20\d\d\s\d\d:\d\d/, matchArray = [], selectedDate = null, selectedTime = null;
        matchArray = regex.exec($(element).val()) || [];
        if (matchArray.length > 0) {
            return new Date(matchArray[0]);
        }
        else return null;
    };

    thisAvailabilityInput.getArrivalSelectedDate = function (index, element) {
        var regex = /(0[1-9]|1[012])[\/](0[1-9]|[12][0-9]|3[01])[\/]20\d\d\s\d\d:\d\d/g, matchArray = [];

        var value = $(element).val();

        matchArray = value.match(regex) || [];
        if (matchArray.length > 1) {
            return new Date(matchArray[matchArray.length - 1]);
        }
        else return null;
    };

    thisAvailabilityInput.updateFareSelectedHandler = function (eventInfo) {

        var rowClicked = $(eventInfo.currentTarget);
        if (!thisAvailabilityInput.excellenceDisclaimerDialog.DisclaimerAccepted
            && rowClicked.data('object') == thisAvailabilityInput.excellenceDisclaimerDialog.DialogName) {
            $("input:radio", rowClicked).removeAttr("checked");
            thisAvailabilityInput.excellenceDisclaimerDialog.rowClickedBeforeOpenDialog = rowClicked;
            thisAvailabilityInput.excellenceDisclaimerDialog.showDialog(thisAvailabilityInput.updateFare);
            thisAvailabilityInput.NotifyToObservers();
            return false;
        }
        else {
            thisAvailabilityInput.updateFare(rowClicked);
            thisAvailabilityInput.NotifyToObservers();
            return true;
        }
    };

    thisAvailabilityInput.updateFare = function (rowClicked) {

        var instanceOfchangeFlight = VUELING.Util.getObjectInstance('ChangeFlight');
        if (instanceOfchangeFlight != null) {
            instanceOfchangeFlight.CallSelected(rowClicked, thisAvailabilityInput.marketArray.length);
        }


        var id = this.id || '',
            table = '#' + $(rowClicked).parents('table').attr('id');

        if (thisAvailabilityInput.isMooving == true) {
            var thisMoovingVoucher = VUELING.Util.getObjectInstanceAllStartWith('moovingVoucherView_');
            for (var i = 0; i < thisMoovingVoucher.length; i++) {
                thisMoovingVoucher[i].showTotalValue();
            }
        }

        if (!rowClicked.parent().hasClass("alt-multicity")) {
            $(table + ' td.price').removeClass("selected");
            rowClicked.addClass("selected");
            if (thisAvailabilityInput.isMooving != true)
                $(table + ' td.price').not('.selected').removeClass("price-basic price-optima price-excellence");
            rowClicked.find("input:radio").attr("checked", true); // select the radio button when the row is clicked
            thisAvailabilityInput.updateFareSelected(id, rowClicked);
            thisAvailabilityInput.blockAvailabilityTableLogic(rowClicked, table);

            if (thisAvailabilityInput.validationErrorReadAlong.isVisible()) {
                thisAvailabilityInput.scrollToError();
            }
            else {
                thisAvailabilityInput.scrollToNextMarket(rowClicked);
            }

            var clickedDate = thisAvailabilityInput.dateMarketLowestFareArray[3].deptDate + " 23:59:59";
            var itemSelected = $(rowClicked).parents('table').context.childNodes[2].defaultValue;
            SKYSALES.Util.ValidateHold(clickedDate, thisAvailabilityInput.advanceDaysHold, thisAvailabilityInput.journeysDateMarketDataModelList);

            thisAvailabilityInput.clickValidateMulticityWaitingTime(table, rowClicked);
            thisAvailabilityInput.checkAdvanceReturnDay();
        }
        else {
            if (!$("#validationErrorMultcity12h").length) {
                var thisMulticity12h = VUELING.Util.getObjectInstance('multicity12hInput');
                if (thisMulticity12h.IsMultiCity)
                    rowClicked.find("input:radio").attr("checked", false); // select the radio button when the row is clicked
                thisMulticity12h.openInfoBox();
            }
            else {
                rowClicked.find("input:radio").attr("checked", false);
            }
        }
    };

    thisAvailabilityInput.checkAdvanceReturnDay = function () {
        var isFirstFlightSelected = $("#availabilityTable0.availabilityBody tbody tr td input:checked").length > 0;
        var isSecondFlightSelected = $("#availabilityTable1.availabilityBody tbody tr td input:checked").length > 0;
        var refresh = true;
        var dateDeparture = SKYSALES.Util.ScheduleSelectedDate(0, null);
        var dateReturn = SKYSALES.Util.ScheduleSelectedDate(1, null);
        if (isFirstFlightSelected == true & isSecondFlightSelected == false) {
            if ((dateDeparture.getDate() == dateReturn.getDate()) && (dateDeparture.getMonth() == dateReturn.getMonth())) {
                var arrivalReturnDates = [];
                var departureDate = [];
                $.each($("#availabilityTable1.availabilityBody tbody tr td input"), function (index, element) {
                    arrivalReturnDates[index] = thisAvailabilityInput.getSelectedDateTime(index, element);
                });
                $.each($("#availabilityTable0.availabilityBody tbody tr td input:checked"), function (index, element) {
                    departureDate[index] = thisAvailabilityInput.getArrivalSelectedDate(index, element);
                });
                if (departureDate.length > 0) {
                    for (var i = 0; i < arrivalReturnDates.length; i++) {

                        if ((arrivalReturnDates[i].getTime() + 120 * 60000) > departureDate[0].getTime()) {
                            refresh = false;
                        }
                    }
                }
                if (refresh == true) {
                    var tomorrow = SKYSALES.Util.ScheduleSelectedDate(0, null);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    VUELING.Util.ChangeSelectedDate(1, tomorrow);
                }
            }
        }
    };

    thisAvailabilityInput.updateFareSelectedHandler_OneFare = function (eventInfo) {
        var rowClicked = $(eventInfo.currentTarget),
            id = this.id || '',
            table = '#' + $(rowClicked).parents('table').attr('id');

        if (thisAvailabilityInput.isMooving == true) {
            var thisMoovingVoucher = VUELING.Util.getObjectInstanceAllStartWith('moovingVoucherView_');
            for (var i = 0; i < thisMoovingVoucher.length; i++) {
                thisMoovingVoucher[i].showTotalValue();
            }
        }
        
        var instanceOfchangeFlight = VUELING.Util.getObjectInstance('ChangeFlight');
        if (instanceOfchangeFlight != null) {
            instanceOfchangeFlight.CallSelected(rowClicked, thisAvailabilityInput.marketArray.length);
            if (thisAvailabilityInput.isBuyWithPointsChangeToMoney == 'true') {
                instanceOfchangeFlight.WriteBarForPointToMoneyCase(rowClicked);
            }
            thisAvailabilityInput.NotifyToObservers();
        }

        if (!rowClicked.hasClass("alt-multicity")) {
            rowClicked.find("input:radio").attr("checked", true); // select the radio button when the row is clicked
            rowClicked.addClass("selected");
            rowClicked.siblings().removeClass("selected");
            thisAvailabilityInput.updateFareSelected(id, rowClicked);

            // If the C3NotEnoughPointsPanel is present, it must refresh and scroll to the panel 
            var c3NepPanel = VUELING.Util.getObjectInstance("C3NotEnoughPointsController");
            if (c3NepPanel != null) {
                c3NepPanel.refreshValues();
                c3NepPanel.scrollToPanelOrToThis(function () {
                    thisAvailabilityInput.scrollToNextMarket(rowClicked);
                });
            } else {
                thisAvailabilityInput.scrollToNextMarket(rowClicked);
            }
            thisAvailabilityInput.clickValidateMulticityWaitingTime(table, rowClicked);

        } else {
            var thisMulticity12h = VUELING.Util.getObjectInstance('multicity12hInput');
            if (thisMulticity12h.IsMultiCity)
                rowClicked.find("input:radio").attr("checked", false); // select the radio button when the row is clicked
            thisMulticity12h.openInfoBox();
        }
    };
    
    thisAvailabilityInput.updateFareSelected = function (id, rowClicked) {

        this.getPriceItineraryInfo(true);
        this.updateFareRules(id);

        if (this.promoUniversalMarkInstance != null && this.promoUniversalMarkInstance.checkIsPromoUniversal) {
            this.promoUniversalMarkInstance.checkIsPromoUniversal(rowClicked);
        }

    };

    thisAvailabilityInput.scrollToNextMarket = function (rowClicked) {
        var nextMarket = rowClicked.parents("div.availabilitySection").nextAll("div.availabilitySection").filter(":visible"),
        scrollPosition = 0,
        selected_markets = $(".availabilityBody tbody tr td input:checked"),
        count_markets = $(".availabilityBody").length;
        var count_markets_showed = thisAvailabilityInput.showedMarketSize();

        //if the first market has just been selected, scroll to the second market
        if (nextMarket.length > 0) {
            scrollPosition = nextMarket.offset().top;
            $('html, body').animate({ scrollTop: scrollPosition }, 400);
        } else if (count_markets == selected_markets.length || (selected_markets.length > 0 && count_markets_showed == selected_markets.length)) {
            if (thisAvailabilityInput.isMooving == true) {
                scrollPosition = $(".footSb").offset().top - 200;
                $("html, body").animate({ scrollTop: scrollPosition }, 1000);
            }
            else
                $("html, body").animate({ scrollTop: $("#scheduleSelectSubmitButton").offset().top }, 1000);
        }

    };

    thisAvailabilityInput.scrollToError = function () {
        SKYSALES.Util.anchorToErrorMsg();
    };

    thisAvailabilityInput.updateFareRuleSelected = function (id) {
        this.updateFareRules(id);
    };

    thisAvailabilityInput.updateFareRules = function (id) {
        var regex = /(RadioButtonMkt[0-9]+Fare[0-9]+)$/,
                matchArray = [],
                fareId = '',
                fareRuleKey = '',
                journeyInfoArray = this.journeyInfoArray || [],
                journeyInfoIndex = 0,
                journeyInfoLength = journeyInfoArray.length,
                journeyInfo = null,
                fareArray = null,
                fareArrayIndex = 0,
                fareArrayLength = 0,
                fare = null,
                fareRuleContainer = SKYSALES.Util.getFareRuleContainer();

        if (fareRuleContainer && id) {
            matchArray = regex.exec(id) || [];
            if (matchArray.length > 1) {
                fareId = matchArray[1];

                journeyLoop: for (journeyInfoIndex = 0; journeyInfoIndex < journeyInfoLength; journeyInfoIndex += 1) {
                    journeyInfo = journeyInfoArray[journeyInfoIndex];
                    fareArray = journeyInfo.fareArray || [];
                    fareArrayLength = fareArray.length;
                    for (fareArrayIndex = 0; fareArrayIndex < fareArrayLength; fareArrayIndex += 1) {
                        fare = fareArray[fareArrayIndex];
                        if (fareId === fare.fareId) {
                            fareRuleKey = fare.fareRuleKey;
                            if (fareRuleKey) {
                                fareRuleContainer.updateFareRule(journeyInfo.marketIndex, fareRuleKey);
                            }
                            break journeyLoop;
                        }
                    }
                }
            }
        }
    };

    thisAvailabilityInput.addGetPriceItineraryInfoEvents = function (selectedMarketIndex) {
        if (this.isOneFare) $("table[id^='availabilityTable" + selectedMarketIndex + "'] > tbody > tr > td[class^='price'] > input").parent().parent().unbind('click', this.updateFareSelectedHandler_OneFare).bind('click', this.updateFareSelectedHandler_OneFare);
        else $("table[id^='availabilityTable" + selectedMarketIndex + "'] > tbody > tr > td:not(.fareNotAllowed)[class^='price'] > input").parent().unbind('click', this.updateFareSelectedHandler).bind('click', this.updateFareSelectedHandler);
    };
    thisAvailabilityInput.ajaxEquipmentProperties = function () {
    };
    thisAvailabilityInput.addEquipmentPropertiesAjaxEvent = function () {
        $(this).click(thisAvailabilityInput.ajaxEquipmentProperties);
    };
    thisAvailabilityInput.addEquipmentPropertiesAjaxEvents = function () {
        thisAvailabilityInput.detailsLinks.each(thisAvailabilityInput.addEquipmentPropertiesAjaxEvent);
    };
    thisAvailabilityInput.blockPriceCheckboxHandler = function () {
        if (thisAvailabilityInput.blockPriceCheckbox.is(':checked')) {
            thisAvailabilityInput.submitButton.html("<span class='bt_link'>" + thisAvailabilityInput.blockPriceLinkText + "</span><span class='brillo'></span>");
        }
        else {
            var textbutton = thisAvailabilityInput.continueLinkText.split("|");
            thisAvailabilityInput.submitButton.html("<span class='bt_link'><span class='tc_white'>" + textbutton[0] + "</span> " + textbutton[1] + "</span><span class='brillo'></span>");
        }
    };
    thisAvailabilityInput.addBlockCheckboxEvents = function () {
        if (thisAvailabilityInput.blockPriceCheckbox) {
            thisAvailabilityInput.blockPriceCheckbox.change(this.blockPriceCheckboxHandler);
        }
    };
    thisAvailabilityInput.showHoldPriceInfoHandler = function () {
        thisAvailabilityInput.holdPriceInfoPopup.show('blockUIPopUpForHold');
    };
    thisAvailabilityInput.hideHoldPriceInfoHandler = function () {
        thisAvailabilityInput.holdPriceInfoPopup.hide('blockUIPopUpForHold');
    };
    thisAvailabilityInput.showHoldPriceInfoConditionsHandler = function () {
        thisAvailabilityInput.holdPriceInfoConditionsPopup.show('blockUIPopUpForHoldConditions');
    };
    thisAvailabilityInput.addEvents = function (data) {

        var selectedMarketIndex = (data != null && data.selectedMarketIndex != undefined) ? data.selectedMarketIndex : "";

        this.addGetPriceItineraryInfoEvents(selectedMarketIndex);
        this.addEquipmentPropertiesAjaxEvents();
        this.addBlockCheckboxEvents();
        if (this.validateMarketDays) {
            this.submitButton.click(function () { return thisAvailabilityInput.clickFunction(this); });
        }
        this.holdPriceInfoLink.click(this.showHoldPriceInfoHandler);
        this.holdPriceInfoConditionsLink.click(this.showHoldPriceInfoConditionsHandler);
        this.availabilityBodyMouseEvents(selectedMarketIndex);
    };

    thisAvailabilityInput.clickFunction = function (dom) {
        var resp = thisAvailabilityInput.validateMarketDates();
        var scrollPosition = $("#errorDiv").offset().top;
        if (resp)
            resp = thisAvailabilityInput.validateMulticityWaitingTime();
        if (resp && !SKYSALES.Util.validate(dom)) {
            resp = false;
            thisAvailabilityInput.validationErrorReadAlong.show();
            $('html, body').animate({ scrollTop: scrollPosition }, 1000);
        }
        return resp;
    };

    thisAvailabilityInput.availabilityBodyMouseEvents = function (selectedMarketIndex) {
        if (VUELING.Util.IsiPad()) return;
        var tableAvailability = $("table[id^='availabilityTable" + selectedMarketIndex + "'].availabilityBody tr");
        $(tableAvailability).unbind("mouseover").mouseover(function () {
            $(this).addClass("alt");
        });
        $(tableAvailability).unbind("mouseout").mouseout(function () {
            $(this).removeClass("alt");
        });
    };

    thisAvailabilityInput.setVars = function () {
        var i = 0,
            nextWeekId = '',
            previousWeekId = '',
            nextWeekArrowId = '',
            previousWeekArrowId = '',
            isIE = $.browser.msie,
            browserVersion = parseInt($.browser.version, 10),
            journeyDates = null;

        VUELING.journeyDates = VUELING.journeyDates || [];
        journeyDates = VUELING.journeyDates;

        if (isIE && browserVersion < 8) {
            thisAvailabilityInput.isIE7OrLess = true;
        }
        thisAvailabilityInput.detailsLinks = $('.showContent');
        thisAvailabilityInput.blockPriceCheckbox = this.getById(thisAvailabilityInput.blockPriceCheckboxId);
        thisAvailabilityInput.blockPriceLink = this.getById(thisAvailabilityInput.blockPriceLinkId);
        thisAvailabilityInput.submitButton = $('a[id$=LinkButtonSubmit]:last');
        thisAvailabilityInput.validationErrorReadAlong = new SKYSALES.ValidationErrorReadAlong();
        thisAvailabilityInput.initHoldPriceInfoPopup();
        thisAvailabilityInput.initHoldPriceInfoConditionsPopup();
        thisAvailabilityInput.holdPriceInfoLink = $('#blockPriceInfoLink');
        thisAvailabilityInput.holdPriceInfoConditionsLink = $('#blockPriceInfoConditionsLink');

        for (i = 0; i < 2; i += 1) {
            nextWeekId = this.nextWeekBaseId + i;
            nextWeekArrowId = this.nextWeekArrowBaseId + i;
            previousWeekId = this.previousWeekBaseId + i;
            previousWeekArrowId = this.previousWeekArrowBaseId + i;
            thisAvailabilityInput.nextWeek[i] = this.getById(nextWeekId);
            thisAvailabilityInput.nextWeekArrows[i] = this.getById(nextWeekArrowId);
            thisAvailabilityInput.previousWeek[i] = this.getById(previousWeekId);
            thisAvailabilityInput.previousWeekArrows[i] = this.getById(previousWeekArrowId);
        }
        if (this.journeyDate && journeyDates.length == 0) {
            SKYSALES.Util.ScheduleSelectedDate(this.journeyIndex, this.journeyDate);
        }
        thisAvailabilityInput.promoUniversalMarkInstance = VUELING.Util.getObjectInstance('PromoUniversalMark');

    };

    thisAvailabilityInput.initHoldPriceInfoPopup = function () {
        var json = {};

        thisAvailabilityInput.holdPriceInfoPopup = new SKYSALES.Class.BlockedPopUp();
        json.closeElement = $('#blockUIPopUpForHold .blockUIPopUpClose');
        thisAvailabilityInput.holdPriceInfoPopup.init(json);
    };

    thisAvailabilityInput.initHoldPriceInfoConditionsPopup = function () {
        var json = {};

        thisAvailabilityInput.holdPriceInfoConditionsPopup = new SKYSALES.Class.BlockedPopUp();
        json.closeElement = $('#blockUIPopUpForHoldConditions .blockUIPopUpClose');
        thisAvailabilityInput.holdPriceInfoConditionsPopup.init(json);
    };

    thisAvailabilityInput.initJourneyInfoContainers = function () {
        var i = 0,
                journeyInfoList = this.journeyInfoList,
                journeyInfo = null;

        for (i = 0; i < journeyInfoList.length; i += 1) {
            journeyInfo = new SKYSALES.Class.JourneyInfo();
            journeyInfo.init(journeyInfoList[i]);
            thisAvailabilityInput.journeyInfoArray[thisAvailabilityInput.journeyInfoArray.length] = journeyInfo;
        }
    };
    // outbound is one journey
    // inbound is another journey
    thisAvailabilityInput.initChangeWeekButtonsForOneJourney = function (journeyIndex, marketFares) {

        if (marketFares.length < 7)
            return;

        var nextWeek = this.nextWeek[journeyIndex],
            nextWeekArrow = this.nextWeekArrows[journeyIndex],
            previousWeek = this.previousWeek[journeyIndex],
            previousWeekArrow = this.previousWeekArrows[journeyIndex],
            nextChangeWeek = {},
            previousChangeWeek = {},
            firstFare = marketFares[0],
            lastFare = marketFares[6],
            initJson = {},

            firstDate = VUELING.Util.parseDate(firstFare.deptDate),
            previousDate = firstDate,
            firstDateInt = firstDate.getDate(),
            previousDateInt = firstDateInt - 4,
            previousDateString = '',

            lastDate = VUELING.Util.parseDate(lastFare.deptDate),
            nextDate = lastDate,
            lastDateInt = lastDate.getDate(),
            nextDateInt = lastDateInt + 4,
            nextDateString = '',
            yesterday;

        yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (previousDate < yesterday) {
            previousWeekArrow.hide();
        }
        else {
            previousWeekArrow.show();
        }

        previousDate.setDate(previousDateInt);
        previousDateString = $.datepicker.formatDate("mm/dd/yy", previousDate);
        firstFare.deptDate = previousDateString;
        firstFare.changeWeekButton = previousWeek;
        firstFare.availabilityInput = this;
        previousChangeWeek = new VUELING.Class.ChangeWeek();
        previousChangeWeek.init(firstFare);

        nextDate.setDate(nextDateInt);
        nextDateString = $.datepicker.formatDate("mm/dd/yy", nextDate);
        lastFare.deptDate = VUELING.Util.parseDate(nextDateString);
        lastFare.changeWeekButton = nextWeek;
        lastFare.availabilityInput = this;
        nextChangeWeek = new VUELING.Class.ChangeWeek();
        nextChangeWeek.init(lastFare);
    };

    thisAvailabilityInput.initChangeWeekButtons = function () {
        var allFares = this.dateMarketLowestFareList,
            numberOfDates = allFares.length,
            journeyIndex = 0,
            marketFares = [],
            numberOfMarkets = 2,
            beginningOfMarketDateIndex = 0,
            endOfMarketDateIndex = 7,
            selectedMarketIndex = this.selectedMarketIndex;

        if (selectedMarketIndex > -1) {
            this.initChangeWeekButtonsForOneJourney(selectedMarketIndex, allFares);
        } else {
            if (numberOfDates === 7) {
                numberOfMarkets = 1;
            }
            for (journeyIndex = 0; journeyIndex < numberOfMarkets; journeyIndex += 1) {
                marketFares = allFares.slice(beginningOfMarketDateIndex, endOfMarketDateIndex);
                this.initChangeWeekButtonsForOneJourney(journeyIndex, marketFares);
                beginningOfMarketDateIndex += 7;
                endOfMarketDateIndex += 7;
            }
        }
    };

    thisAvailabilityInput.initLowestPriceSelection = function () {
        var dateMarketLowestFareInfo = null,
            dateMarketLowestFareList = this.dateMarketLowestFareList,
            i = 0,
            json = {},
            selectedMarketIndex = this.selectedMarketIndex;

        for (i = 0; i < dateMarketLowestFareList.length; i += 1) {
            dateMarketLowestFareInfo = new VUELING.Class.LowestFareInfo();
            dateMarketLowestFareInfo.IsChangeFlight = this.isChangeFlight;
            json = dateMarketLowestFareList[i];
            if (selectedMarketIndex > -1) {
                json.marketIndex = selectedMarketIndex;
            }
            json.advanceDaysHold = this.advanceDaysHold;
            dateMarketLowestFareInfo.init(json);
            dateMarketLowestFareInfo.ajaxResource = thisAvailabilityInput.ajaxResource;
            dateMarketLowestFareInfo.availabilityInput = this;
            thisAvailabilityInput.dateMarketLowestFareArray[thisAvailabilityInput.dateMarketLowestFareArray.length] = dateMarketLowestFareInfo;
        }

        var c3NepPanel = VUELING.Util.getObjectInstance("C3NotEnoughPointsController");
        if (c3NepPanel != null)
            c3NepPanel.refreshValues();
    };

    thisAvailabilityInput.clearAvailabilityTableSelection = function (availabilityTableId) {
        $(availabilityTableId + ' tbody td:not(.routeCell) input[type=radio]:checked').prop("checked", false);
        $(availabilityTableId + ' td.price').removeClass("price-basic price-optima price-excellence");
        //Actualizamos la barra lateral ya que hemos eliminado la seleccion de tarifas diferentes
        thisAvailabilityInput.getPriceItineraryInfo();
    };

    thisAvailabilityInput.getAvailabilityTableSelectionValue = function (availabilityTableId) {
        var availabilityTableSelectionValue = $(availabilityTableId + ' tbody td:not(.routeCell) input[type=radio]:checked').val();
        return availabilityTableSelectionValue;
    };

    thisAvailabilityInput.IsError = "";
    thisAvailabilityInput.familyFareDontMatchErrorText = "";
    thisAvailabilityInput.ErrorDivId = "errorDiv";
    thisAvailabilityInput.FirstClick = false;
    thisAvailabilityInput.displayFaresDontMatchErrorText = function () {
        thisAvailabilityInput.displayError(this.familyFareDontMatchErrorText);
    };

    thisAvailabilityInput.finalizeError = function () {
        this.validationErrorReadAlong.hide();
    };

    thisAvailabilityInput.blockAvailabilityTableLogic = function (rowClicked, table) {

        var fare = ($(rowClicked).hasClass('basictd') ? "basic" : ($(rowClicked).hasClass('optimatd') ? "optima" : "excellence")),
            blocktable = (table == '#availabilityTable0') ? '#availabilityTable1' : '#availabilityTable0';

        if ($(rowClicked).is('.colBasicFee, .colOptimaFee, .colExcellenceFee')) {
            // clicked on a disabled field
            $(table + ' tbody td').removeClass('colBasicFee colOptimaFee colExcellenceFee');
            thisAvailabilityInput.clearAvailabilityTableSelection(blocktable);
            // Display error div            
            this.displayFaresDontMatchErrorText();
        } else if ($('#' + thisAvailabilityInput.ErrorDivId).is(":visible")) {
            thisAvailabilityInput.finalizeError();
        }

        // clears table disabled rows
        $(blocktable + ' tbody td').removeClass('colBasicFee colOptimaFee colExcellenceFee');

        switch (fare) {
            case "basic":
                $(blocktable + ' tbody td:not(.routeCell,.basictd)').addClass('colBasicFee');
                break;
            case "optima":
                $(blocktable + ' tbody td:not(.routeCell,.optimatd,.exctd)').addClass('colOptimaFee');
                break;
            case "excellence":
                $(blocktable + ' tbody td:not(.routeCell,.optimatd,.exctd)').addClass('colExcellenceFee');
                break;
        };

        thisAvailabilityInput.blockAvailabilityIncompatibleFlights(rowClicked, table);
    };

    thisAvailabilityInput.incompatibleFlightsErrorText = "";
    thisAvailabilityInput.blockAvailabilityIncompatibleFlights = function (rowClicked, table) {
        if (this.IsChangeFlight() || SKYSALES.Util.MarketSize() == 1)
            return;

        if ($(rowClicked).is('.incompatibleFlight')) {
            // clicked on a disabled field
            var blocktable = (table == '#availabilityTable0') ? '#availabilityTable1' : '#availabilityTable0';
            $('.incompatibleFlightText', table).remove();
            if ($("td.price label[id$='LabelWithCharges']", table).size() > 0) {
                $('.incompatibleFlight', table).children(':not(label)').show();
                $('.incompatibleFlight', table).children("label[id$='LabelWithCharges']").show();
            }
            else {
                $('.incompatibleFlight', table).children().show();
            }
            $('.incompatibleFlight', table).removeClass('incompatibleFlight');
            thisAvailabilityInput.clearAvailabilityTableSelection(blocktable);
            if (table == '#availabilityTable1')
                $('html, body').animate({ scrollTop: 300 }, 400);
        }

        var otherMarketInputs;
        var otherMarketTable;
        if (table == '#availabilityTable0') {
            otherMarketTable = $('#availabilityTable1');
            otherMarketInputs = $("#availabilityTable1 tbody tr td input");
        }
        else {
            otherMarketTable = $('#availabilityTable0');
            otherMarketInputs = $("#availabilityTable0 tbody tr td input");
        }

        //Show original tags and remove incompatibleFlight on the other market
        if ($("td.price label[id$='LabelWithCharges']", otherMarketTable).size() > 0) {
            $('.incompatibleFlight', otherMarketTable).children(':not(label)').show();
            $('.incompatibleFlight', otherMarketTable).children("label[id$='LabelWithCharges']").show();
        }
        else {
            $('.incompatibleFlight', otherMarketTable).children().show();
        }
        $('.incompatibleFlightText', otherMarketTable).remove();
        $('.incompatibleFlight', otherMarketTable).removeClass('incompatibleFlight');

        //Check incompatibleFlight on the other market
        var checkedVal = $("input", rowClicked).val();
        var reggie1 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}).*(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
        var reggie2 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
        var dateArray1 = reggie1.exec(checkedVal);
        var dateArray2 = reggie2.exec(checkedVal);
        var clickedArrivalDate = new Date((+dateArray1[8]), (+dateArray1[6]) - 1, (+dateArray1[7]), (+dateArray1[9]), (+dateArray1[10]), 0);
        var clickedDepartureDate = new Date((+dateArray2[3]), (+dateArray2[1]) - 1, (+dateArray2[2]), (+dateArray2[4]), (+dateArray2[5]), 0);

        otherMarketInputs.each(function (i, item) {
            var reggie1 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}).*(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
            var reggie2 = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
            var dateArray1 = reggie1.exec($(item).val());
            var dateArray2 = reggie2.exec($(item).val());
            var itemArrivalDate = new Date((+dateArray1[8]), (+dateArray1[6]) - 1, (+dateArray1[7]), (+dateArray1[9]), (+dateArray1[10]), 0);
            var itemDepartureDate = new Date((+dateArray2[3]), (+dateArray2[1]) - 1, (+dateArray2[2]), (+dateArray2[4]), (+dateArray2[5]), 0);

            if ((clickedDepartureDate <= itemDepartureDate && clickedArrivalDate >= itemDepartureDate) ||
                (clickedDepartureDate <= itemArrivalDate && clickedArrivalDate >= itemArrivalDate)) {
                //Flights overlapping
                $(item).parent().addClass('incompatibleFlight').children().hide();
                $(item).parent().prepend("<span class='incompatibleFlightText'>" + thisAvailabilityInput.incompatibleFlightsErrorText + "</span>");
            }
        });
    };

    thisAvailabilityInput.init = function (json) {
        this.setSettingsByObject(json);
        this.initJourneyInfoContainers();
        if (SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler) {
            this.setVars();
            this.addEvents(json);
        }
        //mark the radio buttons of the lowest fares as checked
        this.initLowestPriceSelection(); //ST 08.12.2011 No fare selected on load
        this.initChangeWeekButtons();
        //get itinerary price based on lowest fares checked
        if (SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler) {
            this.getPriceItineraryInfo();
        }

        if (!this.isOneFare) {
            this.initFFTabDetails();
            this.initColumnFF();
        }
        this.checkFaresShown();

        thisAvailabilityInput.departureStationCodeInput1 = this.getById(thisAvailabilityInput.departureStationCodeId1);
        thisAvailabilityInput.arrivalStationCodeInput1 = this.getById(thisAvailabilityInput.arrivalStationCodeId1);
        thisAvailabilityInput.departureStationCodeInput2 = this.getById(thisAvailabilityInput.departureStationCodeId2);
        thisAvailabilityInput.arrivalStationCodeInput2 = this.getById(thisAvailabilityInput.arrivalStationCodeId2);

        if (thisAvailabilityInput.isMulticity == "true" || thisAvailabilityInput.isMulticity == true)
            thisAvailabilityInput.isMulticity = true;
        else
            thisAvailabilityInput.isMulticity = false;

        this.hideComboSortFlights();

        SKYSALES.Util.ValidateHold(thisAvailabilityInput.dateMarketLowestFareArray[3].deptDate + " 23:59:59", this.advanceDaysHold, this.journeysDateMarketDataModelList);

        if (SKYSALES.Util.createObject) {
            thisAvailabilityInput.excellenceDisclaimerDialog = VUELING.Util.getObjectInstance('excellenceDisclaimerDialog');
        }

    };

    thisAvailabilityInput.initColumnFF = function () {
        var markets = $('#selectPage td.price input:checked');
        if (markets.length > 1) {
            markets.each(function (i) {
                thisAvailabilityInput.blockAvailabilityTableLogic($(this).parent(), '#' + $(this).parents('table').attr('id'));
            });
        } else if (markets.length == 1) {
            thisAvailabilityInput.blockAvailabilityTableLogic(markets.parent(), '#' + markets.parents('table').attr('id'));
        }
    };



    thisAvailabilityInput.hideComboSortFlights = function () {
        var p = 0,
            cf = this.IsChangeFlight();

        $.each($("table.availabilityBody[marketindex]"), function () {
            if (($("table.availabilityBody[marketindex='" + p + "']" + " tr[basicpriceroute]").length < 2) || cf == true ) {
                $("span#wrap_dropDownListSorter-" + p).css("display", "none");
                $("table.availabilityBody[marketindex='" + p + "'] tr#topTableFeeDescription th p.textSection").css("padding-left", "0");
            }
            ++p;
        });
    };

    thisAvailabilityInput.initFFTabDetails = function () {

        var fFTabDetails = null,
            fFTabDetailsList = this.fFTabDetailsList,
            json = {};

        for (i = 0; i < fFTabDetailsList.length; i += 1) {
            fFTabDetails = new VUELING.Class.FFTabDetails();
            json = fFTabDetailsList[i];
            fFTabDetails.init(json);
        }
    };

    thisAvailabilityInput.checkFaresShown = function () {
        if (this.showExtraChargesInPrice == true) {
            var objSBSidebar = VUELING.Util.getObjectInstance("SBSidebar");
            if (objSBSidebar != undefined && objSBSidebar != null && typeof objSBSidebar.checkAvailabilityFaresShown == 'function') {
                objSBSidebar.checkAvailabilityFaresShown();
            }
        }
    };

    thisAvailabilityInput.AreEqualsJourneyOriginAndDestination = function () {
        if (thisAvailabilityInput.isMulticity == false)
            return false;

        var origin1 = thisAvailabilityInput.departureStationCodeInput1.val();
        var destination1 = thisAvailabilityInput.arrivalStationCodeInput1.val();

        var origin2 = thisAvailabilityInput.departureStationCodeInput2.val();
        var destination2 = thisAvailabilityInput.arrivalStationCodeInput2.val();

        if (origin1 == '' || origin2 == '' || destination1 == '' || destination2 == '')
            return false;

        if (origin1 == origin2 && destination1 == destination2)
            return true;

        return false;
    };

    return thisAvailabilityInput;
};
