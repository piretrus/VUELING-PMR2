

VUELING.Class.SBSidebar = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisSBSidebar = SKYSALES.Util.extendObject(parent);

    thisSBSidebar.staticUrl = "";
    thisSBSidebar.anclaId = "";
    thisSBSidebar.containerId = "";
    thisSBSidebar.container = null;
    thisSBSidebar.modifyLinkId = "";
    thisSBSidebar.changeCurrencyLinkId = "";
    thisSBSidebar.changeCurrencyShowHideId = "";
    thisSBSidebar.toggleButtonId = "";
    thisSBSidebar.toggleButtonClassToShowOnOpen = "";
    thisSBSidebar.toggleButtonClassToShowOnClose = "";
    thisSBSidebar.showFlightsDetailsId = "";
    thisSBSidebar.showFlightsClassToToggle = "";
    thisSBSidebar.bodyId = "";
    thisSBSidebar.servicesTableId = "";
    thisSBSidebar.servicesTable = null;
    thisSBSidebar.servicesTotalPriceId = "";
    thisSBSidebar.servicesTotalPrice = null;
    thisSBSidebar.servicesPopUpTitle = "";
    thisSBSidebar.servicesPopUpText = "";
    thisSBSidebar.totalFlightsAmount = 0;
    thisSBSidebar.totalServicesAmount = 0;
    thisSBSidebar.totalSpecialServicesAmount = 0;
    thisSBSidebar.totalSpecialFareChargesAmount = 0;
    thisSBSidebar.totalBaggagesAmount = 0;
    thisSBSidebar.totalPriceSpanId = "";
    thisSBSidebar.totalPriceSpan = null;
    thisSBSidebar.totalPromoVYDiscount = 0;
    thisSBSidebar.pricePerPaxSpanId = "";
    thisSBSidebar.pricePerPaxSpan = null;
    thisSBSidebar.totalPaxCount = 0;
    thisSBSidebar.ifPaymentWithDebitCardCurrencySpanId = "";
    thisSBSidebar.defaultInitialHtml = "";

    thisSBSidebar.servicesPricesArray = [];
    thisSBSidebar.PaymentTypesArray = [];
    thisSBSidebar.totalPaymentTypeSelectedAmount = 0;

    thisSBSidebar.showExtraChargesIncludedInPrice = false;
    thisSBSidebar.IsDetailVisible = false;

    thisSBSidebar.sBSidebarScroll = null;

    thisSBSidebar.totalDiscountPromoVYId = "";
    thisSBSidebar.totalPricePromoVYId = "";
    thisSBSidebar.totalDiscountPromoVY = null;
    thisSBSidebar.totalPricePromoVY = null;
    thisSBSidebar.Step = "";
    thisSBSidebar.IsActivePromoVY = false;
    thisSBSidebar.DiscountAmount = 0;
    thisSBSidebar.ShowDiscountAmount = false;
    thisSBSidebar.TotalAnulacionTotal = null;
    thisSBSidebar.labelAnulacionTotalContainer = null;
    thisSBSidebar.BackupAnulacionTotal = null;
    thisSBSidebar.TotalUM = 0;
    thisSBSidebar.PriceTarifas = 0;

    thisSBSidebar.amountBeforeDiscount = -1;

    thisSBSidebar.setExternalService = null;
    thisSBSidebar.hasExternalServices = false;

    thisSBSidebar.setSettingsByObject = function (json) {
        parent.setSettingsByObject.call(this, json);
    };

    thisSBSidebar.init = function (json) {
        this.setSettingsByObject(json);
        this.initializePage();
        this.addEvents();
        thisSBSidebar.scrollHandler();

        if (thisSBSidebar.IsDetailVisible == false) {
            if ($('.' + thisSBSidebar.showFlightsClassToToggle, thisSBSidebar.container).is(":visible")) {
                $('.' + thisSBSidebar.showFlightsClassToToggle, thisSBSidebar.container).hide();
                $('#' + thisSBSidebar.showFlightsDetailsId + ' span', thisSBSidebar.container).text(' [+]');
            }
        }

        if (thisSBSidebar.totalServicesAmount > 0)
            thisSBSidebar.servicesPricesArray['initServiceAmount'] = thisSBSidebar.totalServicesAmount;

        if (thisSBSidebar.totalServicesAmount == 0)
            thisSBSidebar.servicesTable.parent().hide();

        thisSBSidebar.initializePaymentTypeSelected();
        thisSBSidebar.defaultInitialHtml = thisSBSidebar.container.html();
    };

    thisSBSidebar.initializePaymentTypeSelected = function () {
        var data;
        try {
            data = window.top.name ? JSON.parse(window.top.name) : {};
        } catch (e) {
            data = {};
        };
        if (data.PaymentTypeSelected != undefined && data.PaymentTypeSelected != null && data.PaymentTypeSelected != "") {
            $("#" + data.PaymentTypeSelected).click();
        } else {
            if (this.PaymentTypesArray.length > 0)
                $("#" + this.PaymentTypesArray[0].radioId).click();
        }
    };

    thisSBSidebar.initializePage = function () {
        thisSBSidebar.ancla = this.getById(this.anclaId);
        thisSBSidebar.container = this.getById(this.containerId);
        thisSBSidebar.servicesTable = this.getById(this.servicesTableId);
        thisSBSidebar.servicesTotalPrice = this.getById(this.servicesTotalPriceId);
        thisSBSidebar.totalPriceSpan = this.getById(this.totalPriceSpanId);
        thisSBSidebar.totalDiscountPromoVY = this.getById(this.totalDiscountPromoVYId);
        thisSBSidebar.totalPricePromoVY = this.getById(this.totalPricePromoVYId);

        thisSBSidebar.sBSidebarScroll = new VUELING.Class.SBSidebarScroll();
        thisSBSidebar.sBSidebarScroll.init(
            {
                "anclaId": thisSBSidebar.anclaId,
                "containerId": thisSBSidebar.containerId,
                "bodyId": thisSBSidebar.bodyId,
                "scroll_foot_element": $('.footSb, .footerSb'),
                "scroll_footerH_element": $('div.footerSb').outerHeight(true)
            });

        if ($('#' + thisSBSidebar.modifyLinkId, thisSBSidebar.container).length == 0)
            thisSBSidebar.modifyLinkId = "";

        for (var i = 0; i < this.PaymentTypesArray.length; i += 1) {
            if (this.PaymentTypesArray[i].radioId != "")
                this.PaymentTypesArray[i].radioObject = $("#" + this.PaymentTypesArray[i].radioId);
        }
    };

    thisSBSidebar.addEvents = function () {
        if (thisSBSidebar.modifyLinkId != "") {
            $('#' + thisSBSidebar.modifyLinkId, thisSBSidebar.container).live("click", function (event) {
                event.preventDefault();
                $('#newSearch').click();
                $('html, body').css({ scrollTop: 0 });
            });
        }

        $('#' + thisSBSidebar.toggleButtonId, thisSBSidebar.container).live("click", function () {
            if ($('.' + thisSBSidebar.toggleButtonClassToShowOnOpen, thisSBSidebar.container).is(":visible"))
                thisSBSidebar.toggleButtonClose();
            else
                thisSBSidebar.toggleButtonOpen();
        });

        $('.showContent', thisSBSidebar.container).live("click", function (event) {
            $(this).parent().find('div.hideShow').show('slow');
        });

        $('.hideContent', thisSBSidebar.container).live("click", function (event) {
            $(this).parent().parent('.hideShow').hide('slow');
        });

        $('#' + thisSBSidebar.showFlightsDetailsId, thisSBSidebar.container).live("click", function (event) {
            event.preventDefault();
            if ($('.' + thisSBSidebar.showFlightsClassToToggle, thisSBSidebar.container).is(":visible")) {
                $('.' + thisSBSidebar.showFlightsClassToToggle, thisSBSidebar.container).hide();
                $('#' + thisSBSidebar.showFlightsDetailsId + ' span', thisSBSidebar.container).text(' [+]');
            }
            else {
                $('.' + thisSBSidebar.showFlightsClassToToggle, thisSBSidebar.container).show();
                $('#' + thisSBSidebar.showFlightsDetailsId + ' span', thisSBSidebar.container).text(' [-]');
            }
            thisSBSidebar.scrollHandler();
        });

        $('#' + thisSBSidebar.changeCurrencyLinkId, thisSBSidebar.container).live("click", function (event) {
            event.preventDefault();
            if ($('#' + thisSBSidebar.changeCurrencyShowHideId, thisSBSidebar.container).is(":visible"))
                $('#' + thisSBSidebar.changeCurrencyShowHideId, thisSBSidebar.container).hide();
            else
                $('#' + thisSBSidebar.changeCurrencyShowHideId, thisSBSidebar.container).show();
            thisSBSidebar.scrollHandler();
        });

        for (var i = 0; i < thisSBSidebar.PaymentTypesArray.length; i += 1) {
            $('#' + thisSBSidebar.PaymentTypesArray[i].radioId, thisSBSidebar.container).live("click", function (event) {
                if (!$(this).parent().hasClass('selected')) { // Si hago click en la que está seleccionada no hago nada
                    for (var i = 0; i < thisSBSidebar.PaymentTypesArray.length; i += 1) {
                        $('#' + thisSBSidebar.PaymentTypesArray[i].radioId, thisSBSidebar.container).parent().removeClass('selected');
                    }
                    $(this).parent().addClass('selected');
                    thisSBSidebar.guardarNuevoTipoDePagoSeleccionado($(this));
                    thisSBSidebar.recalcularTiposDePago_ForRadioButton($(this));
                    thisSBSidebar.checkAvailabilityFaresShown();
                }
            });
        }
    };

    thisSBSidebar.checkAvailabilityFaresShown = function () {
        if (thisSBSidebar.showExtraChargesIncludedInPrice) {
            var data;
            try {
                data = window.top.name ? JSON.parse(window.top.name) : {};
            } catch (e) {
                data = {};
            };

            if (data != null && data.PaymentTypeSelected != undefined && data.PaymentTypeSelected != null && data.PaymentTypeSelected != "") {
                if (data.PaymentTypeSelected.indexOf("CREDITO") != -1) {
                    // LowestFareInfo (day tabs) daily view
                    if ($("#outboundFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").size() > 0) {
                        $("#outboundFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabel").hide();
                        $("#outboundFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").show();
                    }

                    // AvailabilityInput daily view
                    if ($("#outboundFlight .availabilityBody td.price label[id$='LabelWithCharges']").size() > 0) {
                        $("#outboundFlight .availabilityBody td.price label[id$='Label']").hide();
                        $("#outboundFlight .availabilityBody td.price:not(.incompatibleFlight) label[id$='LabelWithCharges']").show();
                    }

                    // Calendar view
                    if ($("#outboundFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").size() > 0) {
                        $("#outboundFlightCalendar table.calendarAvailBody td span.calendarPriceLabel").hide();
                        $("#outboundFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").show();
                    }

                    if ($('#returnFlight').size() > 0) {
                        // LowestFareInfo (day tabs) daily view
                        if ($("#returnFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").size() > 0) {
                            $("#returnFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabel").hide();
                            $("#returnFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").show();
                        }

                        // AvailabilityInput daily view
                        if ($("#returnFlight .availabilityBody td.price label[id$='LabelWithCharges']").size() > 0) {
                            $("#returnFlight .availabilityBody td.price label[id$='Label']").hide();
                            $("#returnFlight .availabilityBody td.price:not(.incompatibleFlight) label[id$='LabelWithCharges']").show();
                        }
                    }

                    if ($('#returnFlightCalendar').size() > 0) {
                        // Calendar view
                        if ($("#returnFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").size() > 0) {
                            $("#returnFlightCalendar table.calendarAvailBody td span.calendarPriceLabel").hide();
                            $("#returnFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").show();
                        }
                    }
                }
                else if (data.PaymentTypeSelected.indexOf("DEBITO") != -1) {
                    // LowestFareInfo (day tabs) daily view
                    if ($("#outboundFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").size() > 0) {
                        $("#outboundFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabel").show();
                        $("#outboundFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").hide();
                    }

                    // AvailabilityInput daily view
                    if ($("#outboundFlight .availabilityBody td.price label[id$='LabelWithCharges']").size() > 0) {
                        $("#outboundFlight .availabilityBody td.price label[id$='Label']").show();
                        $("#outboundFlight .availabilityBody td.price label[id$='LabelWithCharges']").hide();
                    }

                    // Calendar view
                    if ($("#outboundFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").size() > 0) {
                        $("#outboundFlightCalendar table.calendarAvailBody td span.calendarPriceLabel").show();
                        $("#outboundFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").hide();
                    }

                    if ($('#returnFlight').size() > 0) {
                        // LowestFareInfo (day tabs) daily view
                        if ($("#returnFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").size() > 0) {
                            $("#returnFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabel").show();
                            $("#returnFlight table[id^='availabilityInputContent_'] .availDay #tabsPriceLabelWithCharges").hide();
                        }

                        // AvailabilityInput daily view
                        if ($("#returnFlight .availabilityBody td.price label[id$='LabelWithCharges']").size() > 0) {
                            $("#returnFlight .availabilityBody td.price label[id$='Label']").show();
                            $("#returnFlight .availabilityBody td.price label[id$='LabelWithCharges']").hide();
                        }
                    }

                    if ($('#returnFlightCalendar').size() > 0) {
                        // Calendar view
                        if ($("#returnFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").size() > 0) {
                            $("#returnFlightCalendar table.calendarAvailBody td span.calendarPriceLabel").show();
                            $("#returnFlightCalendar table.calendarAvailBody td span.calendarPriceLabelWithCharges").hide();
                        }
                    }
                }
            }
        }
    };

    thisSBSidebar.guardarNuevoTipoDePagoSeleccionado = function ($tipoPagoSelected) {
        var data;
        try {
            data = window.top.name ? JSON.parse(window.top.name) : {};
        } catch (e) {
            data = {};
        };

        data.PaymentTypeSelected = $tipoPagoSelected.attr('id');
        window.top.name = JSON.stringify(data);
    };

    thisSBSidebar.recalcularTiposDePago = function (totalAmount, recalcularTiposDePago) {
        if (totalAmount > 0 || recalcularTiposDePago == true) { // Si no tengo totalAmount es porque se está ejecutando en la llamada Ajax del ScheduleSelect, entonces no tengo que recalcular los tipos de pago porque ya están calculados
            // Actualizar los totales a pagar para cada uno de los tipos de pago
            for (var i = 0; i < thisSBSidebar.PaymentTypesArray.length; i += 1) {
                var $iTipoPago = $('#' + thisSBSidebar.PaymentTypesArray[i].radioId, thisSBSidebar.container);
                var iFeePercent = parseFloat($iTipoPago.attr('typeofpayment-data-feepercent'));
                var totalAmountParsed = parseFloat(totalAmount);

                if (iFeePercent == 0) { // No es porcentual
                    var iFeeAmount = parseFloat($iTipoPago.attr('typeofpayment-data-feeamount'));
                    $iTipoPago.attr('typeofpayment-data-totalamounttopay', totalAmountParsed + iFeeAmount);
                } else { // Sí es porcentual
                    var iFeeAmount = (iFeePercent * totalAmount);
                    $iTipoPago.attr('typeofpayment-data-feeamount', iFeeAmount);
                    $iTipoPago.attr('typeofpayment-data-totalamounttopay', totalAmountParsed + iFeeAmount);
                }
            }

            // Actualizar las diferencias entre los radio buttons
            var data;
            try {
                data = window.top.name ? JSON.parse(window.top.name) : {};
            } catch (e) {
                data = {};
            };
            if (data.PaymentTypeSelected != undefined && data.PaymentTypeSelected != null && data.PaymentTypeSelected != "") {
                $tipoPagoSelected = $("#" + data.PaymentTypeSelected);
                thisSBSidebar.recalcularTiposDePago_ForRadioButton($tipoPagoSelected);
            }
        }
    };

    thisSBSidebar.recalcularTiposDePago_ForRadioButton = function ($tipoPagoSelected) {
        if ($tipoPagoSelected.length == 1) {
            var selectedTotalAmountToPay = $tipoPagoSelected.attr('typeofpayment-data-totalamounttopay');
            var selectedCode = $tipoPagoSelected.attr('typeofpayment-data-code');
            var selectedIsBestOption = $tipoPagoSelected.attr('typeofpayment-data-isbestoption');
            var selectedFeePercent = $tipoPagoSelected.attr('typeofpayment-data-feepercent');
            var selectedFeeAmount = $tipoPagoSelected.attr('typeofpayment-data-feeamount');
            var totalPromoVYDiscount = thisSBSidebar.totalPromoVYDiscount;

            thisSBSidebar.totalPaymentTypeSelectedAmount = parseFloat(selectedFeeAmount);

            for (var i = 0; i < thisSBSidebar.PaymentTypesArray.length; i += 1) {
                var iTotalAmountToPay = $('#' + thisSBSidebar.PaymentTypesArray[i].radioId, thisSBSidebar.container).attr('typeofpayment-data-totalamounttopay');
                var iCode = $('#' + thisSBSidebar.PaymentTypesArray[i].radioId, thisSBSidebar.container).attr('typeofpayment-data-code');
                var differencePrice = parseFloat(iTotalAmountToPay) - parseFloat(selectedTotalAmountToPay);

                var newDiffPriceToShow = "";
                if (differencePrice == 0 || Math.abs(differencePrice) < 0.001) {
                    // Quitar la diferencia de precio
                }
                else {
                    if (differencePrice > 0) {
                        newDiffPriceToShow += "+";
                    }
                    newDiffPriceToShow += SKYSALES.Util.convertToLocaleCurrency(differencePrice);
                }
                $('label[for="' + thisSBSidebar.PaymentTypesArray[i].radioId + '"]', thisSBSidebar.container).find('strong').html(newDiffPriceToShow);
                if (iCode == "DEBITO") {
                    $("#" + thisSBSidebar.ifPaymentWithDebitCardCurrencySpanId).html(newDiffPriceToShow + "<i></i>");
                }
            }

            $("#" + thisSBSidebar.totalPriceSpanId).html(SKYSALES.Util.convertToLocaleCurrency(selectedTotalAmountToPay));

            if (thisSBSidebar.totalPaxCount > 1 && thisSBSidebar.pricePerPaxSpan != null) {
                var totalPricePerPax = selectedTotalAmountToPay / thisSBSidebar.totalPaxCount;
                thisSBSidebar.pricePerPaxSpan.html(SKYSALES.Util.convertToLocaleCurrency(totalPricePerPax));
            }

            if (selectedCode == 'DEBITO' || $("#" + thisSBSidebar.ifPaymentWithDebitCardCurrencySpanId).html() == "<i></i>") {
                $(".showWhenCredito").hide();
                $(".showWhenDebito").show();
                $(".posBottom_whenDebito").addClass("posBottom");
                $(".posBottom_whenCredito").removeClass("posBottom");
                $(".marginTop4_whenDebito").addClass("marginTop4");
            } else {
                $(".showWhenDebito").hide();
                $(".showWhenCredito").show();
                $(".posBottom_whenDebito").removeClass("posBottom");
                $(".posBottom_whenCredito").addClass("posBottom");
                $(".marginTop4_whenDebito").removeClass("marginTop4");
            }

        }
    };

    thisSBSidebar.toggleButtonOpen = function () {
        $('.' + thisSBSidebar.toggleButtonClassToShowOnOpen).show();
        $('.' + thisSBSidebar.toggleButtonClassToShowOnClose).hide();
        $('img', $('#' + thisSBSidebar.toggleButtonId)).attr('src', thisSBSidebar.staticUrl + 'skysales/images/VuelingBase/buttonToggleClose.png');
        $('.' + thisSBSidebar.showFlightsClassToToggle).show();
        $('#' + thisSBSidebar.showFlightsDetailsId + ' span').text(' [-]');

        thisSBSidebar.scrollHandler();
    };

    thisSBSidebar.toggleButtonClose = function () {
        $('.' + thisSBSidebar.toggleButtonClassToShowOnOpen).hide();
        $('.' + thisSBSidebar.toggleButtonClassToShowOnClose).show();
        $('img', $('#' + thisSBSidebar.toggleButtonId)).attr('src', thisSBSidebar.staticUrl + 'skysales/images/VuelingBase/buttonToggleOpen.png');
        thisSBSidebar.scrollHandler();
    };

    thisSBSidebar.scrollHandler = function () {
        thisSBSidebar.sBSidebarScroll.scrollHandler();
    };

    thisSBSidebar.lastFlightSelectedKeys = "";
    thisSBSidebar.lastFlightAjaxCall = null;
    thisSBSidebar.flightSelected = function (keys, markets, marketinfo) {
        var keyDelimiter = ',',
            params = {
                "flightKeys": keys.join(keyDelimiter),
                "numberOfMarkets": markets,
                "keyDelimeter": keyDelimiter
            };

        if (keys.join(keyDelimiter) != thisSBSidebar.lastFlightSelectedKeys) {
            if (thisSBSidebar.lastFlightAjaxCall != null) {
                thisSBSidebar.lastFlightAjaxCall.abort();
                thisSBSidebar.lastFlightAjaxCall = null;
            }
            thisSBSidebar.lastFlightAjaxCall = $.get('TaxAndFeeInclusiveDisplayAjax-resource.aspx', params, thisSBSidebar.updateflights);
            thisSBSidebar.lastFlightSelectedKeys = keys.join(keyDelimiter);
        }
    };

    thisSBSidebar.updateflights = function (data) {
        var thisPromoVYScheduleSelect = VUELING.Util.getObjectInstance('promoVYScheduleSelect');
        var status;
        var errorCode;
        var outboundSegmentStatus;
        var inboundSegmentStatus;
        var traveltype;

        var currencyCombo = $('#' + thisSBSidebar.changeCurrencyShowHideId + ' select', thisSBSidebar.container);
        var dataHtml = $(data);
        $('#' + thisSBSidebar.changeCurrencyShowHideId + ' select', dataHtml).replaceWith(currencyCombo);
        thisSBSidebar.container.html(dataHtml.html());

        if (thisPromoVYScheduleSelect) {
            status = dataHtml.find("span#statusPromoVY").text();
            errorCode = dataHtml.find("span#codeErrorPromoVY").text();
            outboundSegmentStatus = dataHtml.find("span#OutboundSegmentStatusPromoVY").text();
            inboundSegmentStatus = dataHtml.find("span#InboundSegmentStatusPromoVY").text();
            traveltype = dataHtml.find("span#TravelTypePromoVY").text();
            if (status != "") {
                thisPromoVYScheduleSelect.errorCodeResponse = errorCode;
                thisPromoVYScheduleSelect.statusResponse = status;
                thisPromoVYScheduleSelect.OutboundSegmentStatus = outboundSegmentStatus;
                thisPromoVYScheduleSelect.InboundSegmentStatus = inboundSegmentStatus;
                thisPromoVYScheduleSelect.TravelType = traveltype;
                thisPromoVYScheduleSelect.promoVYScheduleSelectShow();
            }
        }

        thisSBSidebar.scrollHandler();
        thisSBSidebar.initializePaymentTypeSelected();
    };

    thisSBSidebar.showScheduleSelectDefaultDisplay = function (journeyIndex, selectedDateString) {
        // Solamente llamar si no hay vuelos seleccionados (esto solo aplica si es Ida y Vuelta)
        var markets = $("#selectPage .availabilityBody tbody tr td[class^='price'] input:checked");
        if (markets.length == 0) {
            var currencyComboHtml = $('#' + thisSBSidebar.changeCurrencyShowHideId + ' select', thisSBSidebar.container).html();
            thisSBSidebar.container.html(thisSBSidebar.defaultInitialHtml);
            $('#' + thisSBSidebar.changeCurrencyShowHideId + ' select', thisSBSidebar.container).html(currencyComboHtml);
            if (journeyIndex == 0)
                $('#outboundDateSBSidebar', thisSBSidebar.container).html(selectedDateString);
            else
                $('#inboundDateSBSidebar', thisSBSidebar.container).html(selectedDateString);
            thisSBSidebar.defaultInitialHtml = thisSBSidebar.container.html();
            thisSBSidebar.scrollHandler();
        }
    };

    thisSBSidebar.setService = function (serviceId, serviceLines, popUpServiceAdded) {
        if (serviceId == "insurancesSEA") {
            serviceLines['SEA']['price'] = thisSBSidebar.GetAnulacionTotalAmount();
        }

        var htmlTrs = "",
            totalServicePrice = 0,
            ssrDescription = "",
            textDescription = "";
        for (var i in serviceLines) {
            if (serviceLines[i]['price'] > 0) {
                if (serviceLines[i]['desc'].indexOf('|') >= 0) {
                    textDescription = serviceLines[i]['desc'].split('|');
                    ssrDescription = (serviceLines[i]['num'] > 1) ? textDescription[1] : textDescription[0];
                } else {
                    ssrDescription = serviceLines[i]['desc'];
                }
                htmlTrs += "<tr class='serviceRow" + serviceId + "'>" +
                           "<td class='col1'>" +
                           "<div class='wrap_TravelServices'>" +
                           serviceLines[i]['num'] + " " + ssrDescription +
                           "</div>" +
                           "</td>" +
                           "<td class='col3 price7'>" + SKYSALES.Util.convertToLocaleCurrency(serviceLines[i]['price']) + "</td>" +
                           "</tr>";

                totalServicePrice += serviceLines[i]['price'];
            }
        }

        if (totalServicePrice == 0) {
            thisSBSidebar.removeService(serviceId);
            return;
        }

        if ($('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).length > 0) {
            $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).hide();
            $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).first().before(htmlTrs);
            $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).not(':visible').remove();
        }
        else {
            $('tr:last', thisSBSidebar.servicesTable).before(htmlTrs);
        }

        thisSBSidebar.servicesPricesArray[serviceId] = totalServicePrice;
        if (thisSBSidebar.IsActivePromoVY && serviceLines['pay'] !== undefined) {
            if (serviceLines['pay']['amountBeforeDiscount'] !== undefined) {
                thisSBSidebar.amountBeforeDiscount = serviceLines['pay']['amountBeforeDiscount'];
            }
        }

        if (serviceId != "insurancesSEA" && thisSBSidebar.servicesPricesArray['insurancesSEA'] != undefined) {
            var SEAAmount = thisSBSidebar.GetAnulacionTotalAmount();
            thisSBSidebar.servicesPricesArray['insurancesSEA'] = SEAAmount;
            $('.serviceRowinsurancesSEA td.col3').html(SKYSALES.Util.convertToLocaleCurrency(SEAAmount));
        }

        thisSBSidebar.updateTotalPrice();
        thisSBSidebar.scrollHandler();
    };

    thisSBSidebar.setExternalService = function (serviceId, serviceLines, popUpServiceAddded) {

        var htmlTrs = "",
        totalServicePrice = 0,
        ssrDescription = "",
        textDescription = "";

        for (var i in serviceLines) {
            if (serviceLines[i]['desc'].indexOf('|') >= 0) {
                textDescription = serviceLines[i]['desc'].split('|');
                ssrDescription = (serviceLines[i]['num'] > 1) ? textDescription[1] : textDescription[0];
            } else {
                ssrDescription = serviceLines[i]['desc'];
            }
            htmlTrs += "<tr class='serviceRow" + serviceId + "'>" +
                        "<td class='col1'>" +
                        "<div class='wrap_TravelServices'>" +
                        " " + ssrDescription +
                        "</div>" +
                        "</td>" +
                        "<td class='col3 price7'>" + SKYSALES.Util.convertToLocaleCurrency(serviceLines[i]['price']) + "</td>" +
                        "</tr>";

            totalServicePrice += serviceLines[i]['price'];
        }

        thisSBSidebar.servicesPricesArray[serviceId] = totalServicePrice;

        if ($('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).length > 0) {
            $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).hide();
            $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).first().before(htmlTrs);
            $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).not(':visible').remove();
        }
        else {
            $('tr:last', thisSBSidebar.servicesTable).before(htmlTrs);
        }

        thisSBSidebar.hasExternalServices = true;
        thisSBSidebar.updateTotalPrice();
    };

    thisSBSidebar.GetAnulacionTotalAmount = function () {
        var price = 0;

        var totalTarifa = thisSBSidebar.PriceTarifas;
        var totalUM = thisSBSidebar.TotalUM;
        var totalPET = 0;
        var totalSEAT = 0;
        var totalBAG = 0;
        var totalSPEQ = 0;
        var totalSAS = 0;
        var percent = 8;

        for (var item in thisSBSidebar.servicesPricesArray) {
            switch (item) {
                case "bags":
                    totalBAG = thisSBSidebar.servicesPricesArray[item];
                    break;
                case "pets":
                    totalPET = thisSBSidebar.servicesPricesArray[item];
                    break;
                case "seats":
                    totalSEAT = thisSBSidebar.servicesPricesArray[item];
                    break;
                case "speqs":
                    totalSPEQ = thisSBSidebar.servicesPricesArray[item];
                    break;
                case "insuranceMissedFlight":
                    totalSAS = thisSBSidebar.servicesPricesArray[item];
                    break;
            }
        }
        price = (totalTarifa + totalSEAT + totalBAG + totalSPEQ + totalPET + totalUM) * (percent / 100);
        price = Math.round(price * Math.pow(10, 2)) / Math.pow(10, 2);

        return price;
    };

    thisSBSidebar.displayServiceTooltip = function (serviceId, popUpServiceAdded) {
        var textPopupServiceAdded = popUpServiceAdded;
        if (popUpServiceAdded.indexOf('|') >= 0) {
            var textTrim = popUpServiceAdded.split('|');
            textPopupServiceAdded = textTrim[0];
        }
        var randomId = 'tooltip_' + Math.round(Math.random() * 1000);
        var htmlTooltip = '<div id="' + randomId + '" class="sectionBorder_layerSmall layerSmallServices tooltip tooltipCopy">' +
                          '<div class="layerArrow"></div>' +
                          '<p class="fw_800 tc_black">' + thisSBSidebar.servicesPopUpTitle.replace('{{serviceName}}', textPopupServiceAdded) + '<p>' +
                          '<p class="marginBottom0">' + thisSBSidebar.servicesPopUpText.replace('{{serviceName}}', textPopupServiceAdded) + '</p>' +
                          '<div class="clearFix"></div>' +
                          '</div>';
        var tooltipDiv = $(htmlTooltip);

        $('.tooltipCopy').remove(); //remove any other tooltips
        var serviceRowAdded = $('.serviceRow' + serviceId, thisSBSidebar.servicesTable).first();
        $('.wrap_TravelServices', serviceRowAdded).append(tooltipDiv);
        tooltipDiv.show();
        setTimeout('$("#' + randomId + '").fadeOut("slow")', 6000);
    };

    thisSBSidebar.displayCustomServiceTooltip = function (serviceId, title, text) {

        var randomId = 'tooltip_' + Math.round(Math.random() * 1000);
        var htmlTooltip = '<div id="' + randomId + '" class="sectionBorder_layerSmall layerSmallServices tooltip tooltipCopy">' +
                          '<div class="layerArrow"></div>' +
                          '<p class="fw_800 tc_black">' + title + '<p>' +
                          '<p class="marginBottom0">' + text + '</p>' +
                          '<div class="clearFix"></div>' +
                          '</div>';
        var tooltipDiv = $(htmlTooltip);

        $('.tooltipCopy').remove(); //remove any other tooltips
        var serviceRowAdded = $('.serviceRow' + serviceId, thisSBSidebar.servicesTable).first();
        $('.wrap_TravelServices', serviceRowAdded).append(tooltipDiv);
        tooltipDiv.show();
        setTimeout('$("#' + randomId + '").fadeOut("slow")', 6000);
    };

    thisSBSidebar.removeService = function (serviceId, updatePrice) {
        $('tr.serviceRow' + serviceId, thisSBSidebar.servicesTable).remove();

        if (thisSBSidebar.servicesPricesArray[serviceId] !== undefined)
            delete thisSBSidebar.servicesPricesArray[serviceId];

        updatePrice = typeof updatePrice !== 'undefined' ? updatePrice : true;
        if (updatePrice == true) {
            if (serviceId != "insurancesSEA" && thisSBSidebar.servicesPricesArray['insurancesSEA'] != undefined) {
                var SEAAmount = thisSBSidebar.GetAnulacionTotalAmount();
                thisSBSidebar.servicesPricesArray['insurancesSEA'] = SEAAmount;
                $('.serviceRowinsurancesSEA td.col3').html(SKYSALES.Util.convertToLocaleCurrency(SEAAmount));
            }

            thisSBSidebar.updateTotalPrice();
            thisSBSidebar.scrollHandler();
        }
    };

    thisSBSidebar.updateTotalPrice = function () {
        var servicesTotalAmount = 0;

            for (var i in thisSBSidebar.servicesPricesArray) {
                servicesTotalAmount += thisSBSidebar.servicesPricesArray[i];
            }

        if (servicesTotalAmount == 0 && !thisSBSidebar.hasExternalServices)
            thisSBSidebar.servicesTable.parent().hide();
        else
            thisSBSidebar.servicesTable.parent().show();

        thisSBSidebar.updateTotalPriceRender(servicesTotalAmount);

        if (thisSBSidebar.IsActivePromoVY) {
            if (thisSBSidebar.Step === 'Services') {
                var sBSidebarPromoVY = new VUELING.Class.SBSidebarPromoVY();
                var jsonServicesSelected = sBSidebarPromoVY.GetServicesSelected(thisSBSidebar.servicesPricesArray);

                $.ajax({
                    type: "POST",
                    async: true,
                    url: "CalculatePromoVYDiscountAjax-resource.aspx",
                    data: { "jsonServicesSelected": JSON.stringify(jsonServicesSelected) },
                    success: function (response) {
                        thisSBSidebar.totalPromoVYDiscount = response.DesglosePromoVY.TotalDiscount;
                        if (response.DesglosePromoVY.ShowDiscountAmount === true && thisSBSidebar.totalPromoVYDiscount < response.DesglosePromoVY.DiscountAmount)
                            thisSBSidebar.totalDiscountPromoVY.html(SKYSALES.Util.convertToLocaleCurrency(-response.DesglosePromoVY.DiscountAmount));
                        else
                            thisSBSidebar.totalDiscountPromoVY.html(SKYSALES.Util.convertToLocaleCurrency(-thisSBSidebar.totalPromoVYDiscount));
                        thisSBSidebar.updateTotalPricePromoVYRender(servicesTotalAmount);
                        thisSBSidebar.updateTotalPriceRender(servicesTotalAmount, true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    },
                    dataType: "json"
                });
            }
            else if (thisSBSidebar.Step === 'Payment') {
                thisSBSidebar.updateTotalPricePromoVYRender(servicesTotalAmount);
                thisSBSidebar.updateTotalPromoVYDiscountRender();
            }
        };
    };

    thisSBSidebar.updateTotalPricePromoVYRender = function (servicesTotalAmount) {
        if (thisSBSidebar.Step === 'Payment' && thisSBSidebar.servicesPricesArray['payment'] !== undefined)
            var totalAmount = servicesTotalAmount + thisSBSidebar.totalFlightsAmount + thisSBSidebar.totalSpecialServicesAmount + thisSBSidebar.totalSpecialFareChargesAmount + thisSBSidebar.amountBeforeDiscount - thisSBSidebar.servicesPricesArray['payment'];
        else
            var totalAmount = servicesTotalAmount + thisSBSidebar.totalFlightsAmount + thisSBSidebar.totalSpecialServicesAmount + thisSBSidebar.totalSpecialFareChargesAmount;

        thisSBSidebar.totalPricePromoVY.html(SKYSALES.Util.convertToLocaleCurrency(totalAmount.toFixed(2)));
    };

    thisSBSidebar.updateTotalPromoVYDiscountRender = function () {
        if (thisSBSidebar.servicesPricesArray['payment'] !== undefined)
            var totalPromoVYDiscount = thisSBSidebar.totalPromoVYDiscount + (thisSBSidebar.amountBeforeDiscount - thisSBSidebar.servicesPricesArray['payment']);
        else
            var totalPromoVYDiscount = thisSBSidebar.totalPromoVYDiscount;

        thisSBSidebar.totalDiscountPromoVY.html(SKYSALES.Util.convertToLocaleCurrency(-totalPromoVYDiscount));
    };

    thisSBSidebar.updateTotalPriceRender = function (servicesTotalAmount, recalcularTiposDePago) {
        var totalAmount = servicesTotalAmount + thisSBSidebar.totalFlightsAmount - thisSBSidebar.totalPromoVYDiscount + thisSBSidebar.totalSpecialServicesAmount + thisSBSidebar.totalSpecialFareChargesAmount;

        if (thisSBSidebar.IsActivePromoVY)
            totalAmount = totalAmount.toFixed(3);
        
        thisSBSidebar.recalcularTiposDePago(totalAmount, recalcularTiposDePago);
        totalAmount = parseFloat(totalAmount) + parseFloat(thisSBSidebar.totalPaymentTypeSelectedAmount);

        if (totalAmount < 0)
            totalAmount = 0;

        thisSBSidebar.servicesTotalPrice.html(SKYSALES.Util.convertToLocaleCurrency(servicesTotalAmount));
        thisSBSidebar.totalPriceSpan.html(SKYSALES.Util.convertToLocaleCurrency(totalAmount));

        if (thisSBSidebar.totalPaxCount > 1 && thisSBSidebar.pricePerPaxSpan != null) {
            var totalPricePerPax = totalAmount / thisSBSidebar.totalPaxCount;
            thisSBSidebar.pricePerPaxSpan.html(SKYSALES.Util.convertToLocaleCurrency(totalPricePerPax));
        }
    };

    return thisSBSidebar;
};