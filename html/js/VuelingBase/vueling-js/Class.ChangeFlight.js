

VUELING.Class.ChangeFlight = function () {
    var parent = SKYSALES.Class.SkySales(),
        changeFlight = SKYSALES.Util.extendObject(parent);

    //#region Properties

    changeFlight.KeyDelimiter = '';
    changeFlight.IsMixtas = '';
    changeFlight.IsBuyWithPoints = '';
    changeFlight.TaxesOutboundJourney = '';
    changeFlight.TaxesReturnJourney = '';
    changeFlight.PointsCurrencyDisplay = '';
    changeFlight.TotalAmountControlId = '';
    changeFlight.FlightTypeSelected = '';
    changeFlight.PaxsCount = 0;
    changeFlight.FeeChangeAmount = '';
    changeFlight.ContentTable = 'changeFlightTable';
    changeFlight.separadorChangeFlight = 'separadorChangeFlight';
    changeFlight.CambioVuelo1Label = '';
    changeFlight.CambioVuelo2Label = '';
    changeFlight.Diferencia1Label = '';
    changeFlight.Diferencia1TaxesLabel = '';
    changeFlight.Diferencia2TaxesLabel = '';
    changeFlight.Diferencia2Label = '';
    changeFlight.ChangeFromPointToEuroNewAmount = '';
    changeFlight.ChangeFromPointToEuroNewAmountVuelo1 = '';
    changeFlight.ChangeFromPointToEuroNewAmountVuelo2 = '';
    changeFlight.ReturnFareType = '';
    changeFlight.DepartureFareType = '';
    changeFlight.JourneysSellKeysWaiveChangeFee = null;
    changeFlight.CargoCambioBebe = '';
    changeFlight.IsResiFamNum = '';
    changeFlight.My25DiscountAmount = 0;
    changeFlight.PrecioIda = 0;
    changeFlight.PrecioVuelta = 0;

    //#endregion Properties

    changeFlight.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();
    };

    changeFlight.initObjects = function () {
        //changeFlight.FlightTypeSelected = $("input[name='changeFlight']:checked")[0].id.toLowerCase();
    };

    changeFlight.addEvents = function () {
        changeFlight.EventsForNotFlightExcellenceSelected();
    };

    //#region Events

    changeFlight.EventsForNotFlightExcellenceSelected = function () {
        $('[data-id="NotFlightExcellenceSelected_MessageLink"]').click(changeFlight.MessageOpen);
        $('[data-id="NotFlightExcellenceSelected_MessageClose"]').click(changeFlight.MessageClose);
    };

    //#endregion Events


    changeFlight.CallSelected = function (fligthTarget) {
        changeFlight.WriteBarCambioVuelo(fligthTarget);
        if (this.IsResiFamNum == true) {
            changeFlight.DiscountAjaxResidents(fligthTarget);
        }
        else {
            changeFlight.WriteBarDiference(fligthTarget);
        }
    };

    changeFlight.DiscountAjaxResidents = function(link) {

        var flightkeys = $("input", link).val();
        var changingJourneyIndex = ($(link).parents("#availabilityTable0").length > 0) ? 0 : 1;
        var delimeter = ',';
        var datas = "flightKeys=" + flightkeys + "&changingJourneyIndex=" + changingJourneyIndex + "&delimeter=" + delimeter;
        $.ajax({
            type: "GET",
            dataType: "json",
            data: datas,
            url: "AjaxDesgloseResidents-resource.aspx",
            success: function (data) {
                changeFlight.WriteBarDesglose(data, changingJourneyIndex);
                changeFlight.WriteBarDifferencePlusChangeFlight(link);
            }
        });
    };

    changeFlight.WriteBarDesglose = function (data, changingJourneyIndex) {

                var id = "changeFlightSelected" + changingJourneyIndex;
                var idTaxes = "changeFlightSelectedTaxes" + changingJourneyIndex;
                var idDiscount = "changeFlightSelectedDiscount" + changingJourneyIndex;
                var convertFare = SKYSALES.Util.convertLocaleCurrencyToDecimal(data.Fare);

                $('#' + id).remove();
                $('#' + idTaxes).remove();
                $('#' + idDiscount).remove();

                    var sb = '';
                    sb += '<tr id=' + id + '>';
                    if (data.IsMulticity === true) {
                        sb += '     <td class="col1" colspan="2" style="display: table-cell;">' + data.FareLabelMulticity + '</td>';
        } else if (changingJourneyIndex === 0) {
                        sb += '     <td class="col1" colspan="2" style="display: table-cell;">' + data.FareLabelDeparture + '</td>';
                    } else {
                        sb += '     <td class="col1" colspan="2" style="display: table-cell;">' + data.FareLabelArrival + '</td>';
                    }
                    sb += '     <td class="col3 price7" style="display: table-cell;" data-object="price">' + data.Fare + '</td>';
                    sb += '</tr>';
                    if (convertFare != 0) {
                        sb += '<tr id=' + idDiscount + '>';
                        sb += '     <td class="col1 tc_green" colspan="2" style="display: table-cell;">' + data.DiscountLabel + '</td>';
                        sb += '     <td class="col3 price7 tc_green" style="display: table-cell;" data-object="price">' + data.Discount + '</td>';
                        sb += '</tr>';
                        sb += '<tr id=' + idTaxes + '>';
                        sb += '     <td class="col1" colspan="2" style="display: table-cell;">' + data.TaxesLabel + '</td>';
                        sb += '     <td class="col3 price7" style="display: table-cell;" data-object="price">' + data.Taxes + '</td>';
                        sb += '</tr>';
                    }

                    if (!data.isFirstFlight) {
                                sb = $("#selectchangeflightNotPayed").html() + sb;
                            } else {
                                sb += $("#selectchangeflightNotPayed").html();
                            }

                            $("#selectchangeflightNotPayed").html(sb);

                            $("#" + changeFlight.separadorChangeFlight).show();
                            $("#" + changeFlight.ContentTable).show();

    };

    changeFlight.WriteBarDiference = function (link) {
        // Regex: Selects numbers, commas, dots and blank spaces, globally => "/\d|,|\.| */g"
        var paternOnlyPrice = /\d|,|\.| */g;
        var text = changeFlight.PaxsCount + " ";
        var textTaxes = changeFlight.PaxsCount + " ";
        var price = $("label", link).html();
        var taxesPrice = $("label", link).attr("taxes-flight-price");
        if (taxesPrice === undefined) {
            taxesPrice = 0;
        }
        var difTaxes;
        var isPointsPrice = price.indexOf(changeFlight.PointsCurrencyDisplay) > 1;
        var priceNumber;
        if(!isPointsPrice) {
            priceNumber = SKYSALES.Util.convertLocaleCurrencyToDecimal(price);
        } else {
            priceNumber = SKYSALES.Util.convertLocaleCurrencyToDecimal(price.replace(".",""));
        }
        var isFirstFlight = $(link).parents("#availabilityTable0").length > 0;
        var id = "changeFlightSelected0";
        if (isFirstFlight) {
            text += changeFlight.Diferencia1Label;
            textTaxes += changeFlight.Diferencia1TaxesLabel;
            difTaxes = parseFloat(taxesPrice) - parseFloat(changeFlight.TaxesOutboundJourney);
            changeFlight.PrecioIda = parseFloat(priceNumber);
        } else {
            text += changeFlight.Diferencia2Label;
            textTaxes += changeFlight.Diferencia2TaxesLabel;
            id = "changeFlightSelected1";
            difTaxes = parseFloat(taxesPrice) - parseFloat(changeFlight.TaxesReturnJourney);
            changeFlight.PrecioVuelta = parseFloat(priceNumber);
        }
        
        if (difTaxes < 0) {
            difTaxes = 0;
        }

        $('#' + id).remove();
        $('#' + id + 'Taxes').remove();

        var sb = '';
        sb += '<tr id="' + id + '">';
        sb += '    <td class="col1" colspan="2" style="display: table-cell;">' + text + '</td>';
        //td diferencia ida/vuelta
        if (isPointsPrice) {
            sb += '    <td class="col3 price7" style="display: table-cell;" data-object="pointsPrice">' + changeFlight.PaxsCount * priceNumber + ' ' + changeFlight.PointsCurrencyDisplay + '</td>';
        } else {
            sb += '    <td class="col3 price7" style="display: table-cell;" data-object="price">' + SKYSALES.Util.convertToLocaleCurrency(changeFlight.PaxsCount * priceNumber) + '</td>';
        }
        sb += '</tr>';

        // Solo habrá diferencia de tasas en vuelos comprados por puntos, para los normales, va todo incluido en el precio del cambio.
        if (isPointsPrice && difTaxes > 0) {
            sb += '<tr id="' + id + 'Taxes">';
            sb += '    <td class="col1" colspan="2" style="display: table-cell;">' + textTaxes + '</td>';
            //td diferencia ida/vuelta
            sb += '    <td class="col3 price7" style="display: table-cell;" data-object="price">' + SKYSALES.Util.convertToLocaleCurrency(changeFlight.PaxsCount * difTaxes) + '</td>';
            sb += '</tr>';
        }

        if (!isFirstFlight)
            sb = $("#selectchangeflightNotPayed").html() + sb;
        else
            sb += $("#selectchangeflightNotPayed").html();
        $("#selectchangeflightNotPayed").html(sb);

        $("#" + changeFlight.separadorChangeFlight).show();
        $("#" + changeFlight.ContentTable).show();

        changeFlight.WriteBarDifferencePlusChangeFlight(link);
    };

    changeFlight.WriteBarCambioVuelo = function (link) {
        var text = changeFlight.PaxsCount + " ";

        var isFirstFlight = $(link).parents("#availabilityTable0").length > 0;
        var paternOnlyPrice = /\d|,|\.| */g;
        var price = changeFlight.FeeChangeAmount;
        if (isFirstFlight && changeFlight.DepartureFareType == "Excellence") {
            price = "0";
        } else if (!isFirstFlight && changeFlight.ReturnFareType == "Excellence") {
            price = "0";
        }

        var priceNumber = SKYSALES.Util.convertLocaleCurrencyToDecimal(price);

        var payForInfantChangeFee = false;

        var selectedRadio = $("input[type='radio']", link);
        if (selectedRadio) {
            var selectedSellKey = selectedRadio.val().split('|')[1];
            if ($.inArray(selectedSellKey, changeFlight.JourneysSellKeysWaiveChangeFee) > -1) {
                priceNumber = "0";
                payForInfantChangeFee = true;
            }
        }

        var isFirstFlight = $(link).parents("#availabilityTable0").length > 0;
        if ($(link).hasClass("exctd"))
            priceNumber = "0";
        var id = "changeFlightSelectedTop0";
        if (isFirstFlight) {
            text += changeFlight.CambioVuelo1Label;
        } else {
            text += changeFlight.CambioVuelo2Label;
            id = "changeFlightSelectedTop1";
        }
        $('#' + id).remove();
        $("tr[id$='_infant']").remove();

        var sb = '';
        sb += '<tr id="' + id + '">';
        sb += '    <td class="col1" colspan="2" style="display: table-cell;">' + text + '</td>';
        //td cambio de ida/vuelta 
        sb += '    <td class="col3 price7" style="display: table-cell;" data-object="price">' + SKYSALES.Util.convertToLocaleCurrency(priceNumber) + '</td>';
        sb += '</tr>';
        if (!isFirstFlight)
            sb = $("#selectchangeflightPayed").html() + sb;
        else
            sb += $("#selectchangeflightPayed").html();


        var changeJourneysToAddingServicesToBooking = VUELING.Util.getObjectInstance('ChangeJourneysToAddingServicesToBooking');
        if (changeJourneysToAddingServicesToBooking.NumInfants > 0) {
            var numInfants = changeJourneysToAddingServicesToBooking.NumInfants,
                infantPenaltyFee = changeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney,
                markets = $('div.marketSection .availabilitySection:not(:hidden)').size();
            if (payForInfantChangeFee) {
                infantPenaltyFee = 0;
            }

            var infantPenaltyFeeTotal = SKYSALES.Util.convertToLocaleCurrency(numInfants * infantPenaltyFee * markets);
            sb += '<tr id="' + id + '_infant">';
            sb += '    <td class="col1" colspan="2" style="display: table-cell;">' + numInfants + " " + changeFlight.CargoCambioBebe + '</td>';
            sb += '    <td class="col3 price7" style="display: table-cell;" data-object="price">' + infantPenaltyFeeTotal + '</td>';
            sb += '</tr>';
        }

        $("#selectchangeflightPayed").html(sb);

        $("#" + changeFlight.separadorChangeFlight).show();
        $("#" + changeFlight.ContentTable).show();
    };

    changeFlight.WriteBarForPointToMoneyCase = function (link) {
        var price = $("label", link).html();
        var priceNumber = SKYSALES.Util.convertLocaleCurrencyToDecimal(price);

        $("#FareDifferenceHeader").html('<span><strong><table width="100%"><tr><td class="col1 paddingTop10" colspan="2" style="display: table-cell;padding-left: 0px;padding-right: 0px;padding-bottom: 0px;font-size: 11px;">' + changeFlight.ChangeFromPointToEuroNewAmount + '</td><td class="col3 price7 paddingTop10" style="display: table-cell;padding-left: 0px;padding-right: 0px;padding-bottom: 0px;font-size: 11px;">' + SKYSALES.Util.convertToLocaleCurrency(changeFlight.PaxsCount * (changeFlight.PrecioIda + changeFlight.PrecioVuelta)) + '</td></tr></table></strong></span>');

        $("#changeFlightSelected0 td:first").html(changeFlight.PaxsCount + " " + changeFlight.ChangeFromPointToEuroNewAmountVuelo1);
        $("#changeFlightSelected1 td:first").html(changeFlight.PaxsCount + " " + changeFlight.ChangeFromPointToEuroNewAmountVuelo2);
    };

    changeFlight.WriteBarDifferencePlusChangeFlight = function (link) {

        var paternOnlyPrice = /\d|,|\.| */g;
        var labelprice = $("label", link).html();
        var isPointsPrice = labelprice.indexOf(changeFlight.PointsCurrencyDisplay) > 1;
        var price = 0;
        var pointsPrice = 0;
        $('#selectchangeflightNotPayed tr td[data-object="price"]').each(function (i, item) {
            var strTxt = $(item).html().substring(0, $(item).html().length - 5);
            var fStrTxt = $(item).html().substring($(item).html().length - 5, $(item).html().length);
            var priceWithSymboltxt = strTxt.replace(".", "") + $.trim(fStrTxt.replace(",", "."));
            var pricetxt = SKYSALES.Util.convertLocaleCurrencyToDecimal(priceWithSymboltxt);
            price += parseFloat(pricetxt);
        });
        $('#selectchangeflightPayed tr td[data-object="price"]').each(function (i, item) {
            var strTxt = $(item).html().substring(0, $(item).html().length - 5);
            var fStrTxt = $(item).html().substring($(item).html().length - 5, $(item).html().length);
            var priceWithSymboltxt = strTxt.replace(".", "") + $.trim(fStrTxt.replace(",", "."));
            var pricetxt = SKYSALES.Util.convertLocaleCurrencyToDecimal(priceWithSymboltxt);
            price += parseFloat(pricetxt);
        });
        
        if (isPointsPrice) {
            $('#selectchangeflightNotPayed tr td[data-object="pointsPrice"]').each(function (i, item) {
                var strTxt = $(item).html().substring(0, $(item).html().length - 5);
                var fStrTxt = $(item).html().substring($(item).html().length - 5, $(item).html().length);
                var priceWithSymboltxt = strTxt.replace(".", "") + $.trim(fStrTxt.replace(",", "."));
                var pricetxt = SKYSALES.Util.convertLocaleCurrencyToDecimal(priceWithSymboltxt);
                pointsPrice += parseFloat(pricetxt);
            });
        }

        $('#selectchangeflightTotalselectchangeflight').html(SKYSALES.Util.convertToLocaleCurrency(price));
        if (isPointsPrice) {
            $('#selectchangeflightTotalselectchangeflightforpoints').show();
        } else {
            $('#selectchangeflightTotalselectchangeflightforpoints').hide();
        }
        $('#selectchangeflightTotalselectchangeflightpoints').html(pointsPrice + ' ' + changeFlight.PointsCurrencyDisplay);

        //My25 Le descontamos o sumamos el descuento de my 25
        price += changeFlight.My25DiscountAmount;

        if (changeFlight.TotalAmountControlId == '') {
            $('#C3SidebarInfoTypeSelectChangeViewaddingServicesToBookingTotal').html(SKYSALES.Util.convertToLocaleCurrency(price));
            if (isPointsPrice) {
                $('#C3SidebarInfoTypeSelectChangeViewaddingServicesToBookingPointsTotal').html(pointsPrice + ' ' + changeFlight.PointsCurrencyDisplay);
            }
        }
        else {
            $('#' + changeFlight.TotalAmountControlId + 'addingServicesToBookingTotal').html(SKYSALES.Util.convertToLocaleCurrency(price));
        }

        if (price >= 0) {
            $("#totalSeparador").removeClass("hidden");
            $("#total").removeClass("hidden");
            if (price > 0) {
                $(".bt_link.first").show();
                $(".bt_link.second span").hide();
            } else {
                $(".bt_link.first").hide();
                $(".bt_link.second span").show();
            }
        }
        
        if (parseInt(pointsPrice) >= 0 && isPointsPrice) {
            //$("#totalSeparador").removeClass("hidden");
            $("#pointsTotal").removeClass("hidden");
            if (pointsPrice > 0) {
                $(".bt_link.first").show();
                $(".bt_link.second span").hide();
            } else {
                $(".bt_link.first").hide();
                $(".bt_link.second span").show();
            }
        }

    };

    changeFlight.CallSelectedResp = function (data) {
        var amounts = data.replace("<div>", "").replace("</div>", "").split("|");
        var changeJourneysToAddingServicesToBooking = VUELING.Util.getObjectInstance('ChangeJourneysToAddingServicesToBooking');
        changeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney[0] = parseFloat(amounts[0]);
        changeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney[1] = parseFloat(amounts[2]);
        changeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney[0] = parseFloat(amounts[1]);
        changeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney[1] = parseFloat(amounts[3]);
        changeJourneysToAddingServicesToBooking.TotalChangeFee = 0;
        changeJourneysToAddingServicesToBooking.initialize();
    };

    changeFlight.MessageOpen = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        $('[data-id="NotFlightExcellenceSelected_Message"]').addClass("hidden");
        $('[data-id="NotFlightExcellenceSelected_Message"]', $(e.currentTarget)).removeClass("hidden");
    };
    changeFlight.MessageClose = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        $('[data-id="NotFlightExcellenceSelected_Message"]').addClass("hidden");
        e.stopPropagation();
    };

    return changeFlight;
};
