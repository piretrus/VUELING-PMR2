VUELING.Class.SelectSeatC3 = function (visualizationType) {
    var parent = null;
    switch (visualizationType) {
        case "Horizontal":
            parent = VUELING.Class.SelectSeatBaseHorizontal();
            break;
        case "Vertical":
            parent = VUELING.Class.SelectSeatBaseVertical();
            break;
    }
    var thisselectSeatC3 = SKYSALES.Util.extendObject(parent);

    //#region Properties

    thisselectSeatC3.SelectedSeatsHolderName = "SelectedSeatsHolder";
    thisselectSeatC3.SelectedSeatsHolderObj = null;

    thisselectSeatC3.AddingServicesToBookingName = "AddingServicesToBooking";
    thisselectSeatC3.AddingServicesToBookingObj = null;

    thisselectSeatC3.labelMustChooseInfantSeat = '';
    thisselectSeatC3.PaymentAmount = '';

    thisselectSeatC3.PricePref = '';
    thisselectSeatC3.PriceXl = '';
    thisselectSeatC3.PriceOPT = '';
    thisselectSeatC3.PriceBAS = '';
    //#endregion Properties

    thisselectSeatC3.freeSeatsPriorityBoarding = 0;
    thisselectSeatC3.freeSeatsXL = 0;
    thisselectSeatC3.freeSeatsOptimum = 0;
    thisselectSeatC3.freeSeatsBasic = 0;

    thisselectSeatC3.pricingModeEnum = { SEAT_DATA_PRICE: "dataPriceAttribute", CUSTOM_PRICE_MODEL: "customPriceDataModel" };
    thisselectSeatC3.SeatsAssignedDataModel = [];
    thisselectSeatC3.PricingMode = thisselectSeatC3.pricingModeEnum.SEAT_DATA_PRICE;
    thisselectSeatC3.PricingCustomDataModel = [];
    
    thisselectSeatC3.init = function (json) {
        parent.init.call(this, json);
    };

    thisselectSeatC3.initObjects = function () {
        parent.initObjects.call(this);
        this.SelectedSeatsHolderObj = VUELING.Util.getObjectInstance(this.SelectedSeatsHolderName);
        $("div.seats-section").removeClass('sectionSelected');
        thisselectSeatC3.PricingCustomDataModel = this.PricingCustomDataModel;
        thisselectSeatC3.SeatsAssignedDataModel = this.SeatsAssignedDataModel;
    };

    thisselectSeatC3.addEvents = function () {
        parent.addEvents.call(this);
        var self = this;
        this.SelectedSeatsHolderObj.addNoSelectedSeatsObserver(function () { self.cleanSideBar(); });
        this.SelectedSeatsHolderObj.addRemoveAllSelectedSeatsObserver(function () { self.ResetAllPaxAllSeat(); });
        this.addTotalAmountChangedObserver(this.updateContinueButtomText);
        this.EventsForAssignSeats();
        this.EventsForFieldset();
        this.EventsForButtonsPaxSections();
        this.EventsForPayedSeatsHeader();
    };

    //#region Events

    thisselectSeatC3.EventsForAssignSeats = function () {
        var self = this;
        $("a[data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").unbind("click", function (e) { self.SeatAssignHandler(e); });
        $("a[data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").bind("click", function (e) { self.SeatAssignHandler(e); });
    };

    thisselectSeatC3.EventsForFieldset = function () {
        var self = this;
        $("[data-listpaxli][data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").click(function (e) { self.InPaxSelectednHandler(e); });
    };

    thisselectSeatC3.EventsForPayedSeatsHeader = function () {
        $('#seatsPayedHeader').click(function () {
            $(this).parents('table').find('td').toggle();

            var btnHeaderExpand = $(this).find(".btn_expand");
            var btnExpandText = btnHeaderExpand.text();
            btnHeaderExpand.text(btnExpandText == "[-]" ? "[+]" : "[-]");
        });
    };
    //#endregion Events

    thisselectSeatC3.InPaxSelectednHandler = function (e) {
        this.ChangeSegmentAndJourney();
        parent.InPaxSelectednHandler.call(this, e);

        this.ShowOrHideA319();

        var sb = "";
        sb += this.labelSeatPlural + " ";
        if (this.data_journey == 0)
            sb += this.labeloutboundFlight + ": ";
        else
            sb += this.labelreturnFlight + ": ";
        sb += "<strong>" + this.RouteName + "</strong>";
        $("#dvRoute").html(sb);
        $("#dvRoute").removeClass("hidden");

        $("[data-promo]").not(".hidden").addClass("hidden");
        if (this.Tarifa == "Basic") {
            if (this.PricePref != "") {
                this.ChangePriceDivShowcase("PREFPriceDiv", this.PricePref);
                this.ChangePriceDivShowcase("XLPriceDiv", this.PriceXl);
                this.ChangePriceDivShowcase("OPTPriceDiv", this.PriceOPT);
                this.ChangePriceDivShowcase("BASPriceDiv", this.PriceBAS);
            }

            this.ChangeFreeSeats();
        } else if (this.Tarifa == "Optima") {
            if (this.PricePref != "") {
                this.ChangePriceDivShowcase("dvPricePref", this.PricePref);
                this.ChangePriceDivShowcase("dvPriceXl", this.PriceXl);
            }
            $("#dvPromoOptima").removeClass("hidden");

            this.ChangeFreeSeats();
        } else if (this.Tarifa == "Excellence") {
            $("#dvPromoExcellence").removeClass("hidden");
        }
    };

    thisselectSeatC3.buttonsPaxSectionsHandler = function (e) {
        $("[data-listpaxli][data-passenger-id='0'][idjourney='" + this.data_journey + "'][idsegment='" + this.data_segment + "']").click();
    };

    thisselectSeatC3.buttonsPaxSectionsSelecting = function (originJourney, originSegment) {

        if (this.data_journey != originJourney || (this.data_journey == originJourney && this.data_segment != originSegment)) {
            $("div[data-id-part='head'][data-journey='" + originJourney + "'][data-segment='" + originSegment + "']").addClass("hidden");
            $("ul[data-id-part='head-avion-thList']").addClass("hidden");
            $("ul[data-id-part='head-avion-seatLegendList']").addClass("hidden");

            $("div[data-id-part='head'][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);
            $("ul[data-id-part='head-avion-thList'][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);
            $("ul[data-id-part='head-avion-seatLegendList'][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);

        }

        if ($("div[data-route][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").hasClass("hidden")) {
            var secondSegmente = 0;
            if (this.data_segment == 0)
                secondSegmente = 1;
            $("div[data-route][data-journey='" + this.data_journey + "'][data-segment='" + secondSegmente + "']").addClass("hidden");
            $("div[data-route][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").removeClass("hidden");
        }
        parent.buttonsPaxSectionsSelecting.call(this, originJourney, originSegment);
    };

    thisselectSeatC3.SeatAssignHandler = function (e) {
        if ($(e.currentTarget).attr("data_assignable") == "true") {
            var seat = e.currentTarget;
            var seatInfants = $(seat).attr('data_original_ico');
            var paxInfants = this.paxObjectSelected.data('passenger-infants');
            if (paxInfants > 0 && seatInfants.indexOf('bebe') < 0)
                this.ShowMessageAlertInfantSeat(e);
            else {
                var data_journey = this.data_journey;
                var data_seg = this.data_segment;
                var data_paxid = this.paxObjectSelected.attr("data_paxid");

                parent.SeatAssignHandler.call(this, e);
                this.MoveScrollBarToSelectedPax();

                if (this.Tarifa == "Basic" && this.paxObjectSelected.attr('data_delete') != "") {
                    var linkDelete = '<a href="#" class="seatButton">' + this.labelDelete + '</a>';
                    var self = this;
                    $('[data-Element="passengerFieldButton"][idJourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_paxid + ']').find('.seatInfo').append(linkDelete);
                    $(".seatInfo[data_paxid='" + data_paxid + "'][data_journey='" + data_journey + "'][data_segment='" + data_seg + "'] a.seatButton").click(function (e) { self.PaxSeatDelete(e); });
                }
                this.ChangeTypeSeat(e.currentTarget);
                this.SelectedSeatsHolderObj.addCurrentSeat(seat);
            }

            this.OnTotalAmountChanged(total);
        }
    };

    thisselectSeatC3.ChangeTypeSeat = function (seat) {
        var type = $(seat).attr("data_seat_type").toLowerCase();
        if (type == "optimum") type = "basic";
        $("[data-typeSeat].sectionSelected").removeClass("sectionSelected");
        $("[data-typeSeat='" + type + "']").addClass("sectionSelected");
    };

    thisselectSeatC3.UpdateCurrentSelectedSeats = function (seats, showTooltip) {
        var self = this;
        $.each(seats, function (i, seat) {
            self.SelectedSeatsHolderObj.removeCurrentSeat(seat);
        });
    };

    thisselectSeatC3.updateContinueButtomText = function (total) {
        var labelOptionalText = $("#SeatSelectionViewChangeSeatView_LinkButtonSubmit span#optionalButtonText");
        if (labelOptionalText != null)
            total > 0 ?
                labelOptionalText.removeClass('hidden') :
                labelOptionalText.addClass('hidden');

    };

    //eventos cuando el precio total a pagar a cambiado
    var totalAmountChangedObservers = [];

    thisselectSeatC3.addTotalAmountChangedObserver = function (observer) {
        if (observer && typeof (observer) == "function") {
            totalAmountChangedObservers.push(observer);
        }
    };

    thisselectSeatC3.updateTotalSideBar = function (total) {
        if (!(typeof (total) == "number") || !isNaN(total)) {
            var amountAssignedSeats = this.SelectedSeatsHolderObj.AmountAssignedSeats;
            var amountNewSelectedSeats = this.SelectedSeatsHolderObj.getAmountSeatsList(
                this.SelectedSeatsHolderObj.CurrentSelectedSeats);
            total = amountNewSelectedSeats - amountAssignedSeats + this.AddingServicesToBookingObj.ChangeFlightsBalanceDue;
        }
        if (total < 0) {
            total = 0;
        }

        var formattedPrice = SKYSALES.Util.convertToLocaleCurrency(total);
        var priceClass = SKYSALES.Util.getPriceClass(formattedPrice);
        var totalElement = $('#' + this.AddingServicesToBookingObj.total);
        var totalPay = $('#' + this.AddingServicesToBookingObj.totalPay);
        totalElement.html(formattedPrice);
        totalElement.attr("class", priceClass);
        totalElement.parent().show();
        totalPay.html(total);

        var addingServices = this.AddingServicesToBookingObj;
        var serviceId = "seatsPayed";
        var tableID = 'id' + addingServices.services + 'Table' + serviceId;

        $('#' + this.AddingServicesToBookingObj.div + ' .sepTotalPrice').show();

        this.OnTotalAmountChanged(total);
    };

    thisselectSeatC3.OnTotalAmountChanged = function (total) {
        $.each(totalAmountChangedObservers, function (index, event) {
            try {
                event(total);
            } catch (e) {
                console.error('Error executing: %s. Error: %s', event, e);
            }
        });
    };

    thisselectSeatC3.ChangeFreeSeats = function () {
        if (this.freeSeatsPriorityBoarding > 0)
            $('.freeSeatsPriorityBoarding .cantidad').html(this.freeSeatsPriorityBoarding);
        if (this.freeSeatsXL > 0)
            $('.freeSeatsXL .cantidad').html(this.freeSeatsXL);
        if (this.freeSeatsOptimum > 0)
            $('.freeSeatsOptimum .cantidad').html(this.freeSeatsOptimum);
        if (this.freeSeatsBasic > 0)
        $('.freeSeatsBasic .cantidad').html(this.freeSeatsBasic);
    };

    thisselectSeatC3.GetSeatPrice = function (seat) {
        switch (this.PricingMode) {
            case this.pricingModeEnum.CUSTOM_PRICE_MODEL:
                return thisselectSeatC3.GetSeatPriceFromModel(seat);
            default:
                return parent.GetSeatPrice(seat);
        }
    };
    
    thisselectSeatC3.GetSeatPriceFromModel = function (seat) {
        
        var defaultOverridePrice = thisselectSeatC3.GetDefaultOverridePrice(seat.attributes.seat_group);
        
        if (!defaultOverridePrice) {
            return parent.GetSeatPrice(seat);
        }
        
        var originalSeatPrice = thisselectSeatC3.GetOriginalSeatPrice(seat);
        
        if (originalSeatPrice) {
            var newSeatPrice = parent.GetSeatPrice(seat);
            return (parseFloat(newSeatPrice) > parseFloat(originalSeatPrice)) ? originalSeatPrice : newSeatPrice;
        }
        else {
            return defaultOverridePrice;
        }

    };
    
    thisselectSeatC3.GetDefaultOverridePrice = function (seatGroup) {
        var seatGroupsToOverride = this.PricingCustomDataModel;
        if (seatGroup != undefined && seatGroupsToOverride != undefined) {
            for (var i = 0; i < seatGroupsToOverride.length; i++) {
                if (seatGroupsToOverride[i].SeatGroup == seatGroup.value) {
                    return seatGroupsToOverride[i].Price;
                }
            }
        }
        return null;
    };

    thisselectSeatC3.GetOriginalSeatPrice = function (seat) {
        var dataModel = this.SeatsAssignedDataModel;
        if (dataModel != undefined && dataModel.length > 0) {
            for (var i = 0; i < dataModel.length; i++) {
                if (dataModel[i].JourneyNumber == seat.attributes.data_journey.value
                    && dataModel[i].SegmentNumber == seat.attributes.data_segment.value
                    && dataModel[i].PaxNumber == seat.attributes.data_paxid.value) {
                    return dataModel[i].SeatPrice;
                }
            }
        }

        return null;
    };
    
    return thisselectSeatC3;
};

VUELING.Class.SelectSeatC3Horizontal = function () {
    var parent = VUELING.Class.SelectSeatC3("Horizontal"),
       thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.EventsForButtonsPaxSections = function () {
        var self = this;
        $("a[data-PaxButton][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").click(function (e) { self.buttonsPaxSectionsHandler(e); });
    };

    thisClass.ChangeSegmentAndJourney = function () {
        var obj = $("[data-listpaxflight].sectionSelected [data-route]").not(".hidden");
        var journey = parseInt(obj.attr("data-journey"));
        var segment = parseInt(obj.attr("data-segment"));
        this.buttonsPaxSectionsSelecting(journey, segment);
    };

    return thisClass;
};

VUELING.Class.SelectSeatC3Vertical = function () {
    var parent = VUELING.Class.SelectSeatC3("Vertical"),
       thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.EventsForButtonsPaxSections = function () {
        var self = this;
        $("#colVuelta div").first().click(function (e) { $(this).parent().find("a").first().click(); e.preventDefault(); });
        $("#colIda div").first().click(function (e) { $(this).parent().find("a").first().click(); e.preventDefault(); });
        $("a[data-PaxButton][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").click(function (e) { self.buttonsPaxSectionsHandler(e); });
    };

    thisClass.ChangeSegmentAndJourney = function () {
        var obj = $("[data-listpaxflight].sectionSelected a[data-paxbutton].selected");
        var journey = parseInt(obj.attr("data-journey"));
        var segment = parseInt(obj.attr("data-segment"));
        this.buttonsPaxSectionsSelecting(journey, segment);
    };

    return thisClass;
};