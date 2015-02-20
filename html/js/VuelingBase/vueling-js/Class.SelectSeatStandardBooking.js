VUELING.Class.SelectSeatStandardBooking = function (visualizationType) {
    var parent = null;
    switch (visualizationType) {
        case "Horizontal":
            parent = VUELING.Class.SelectSeatBaseHorizontal();
            break;
        case "Vertical":
            parent = VUELING.Class.SelectSeatBaseVertical();
            break;
    }
    var selectSeatStandardBooking = SKYSALES.Util.extendObject(parent);

    //#region Properties

    selectSeatStandardBooking.SelectedSeatsHolderName = "SelectedSeatsHolder";
    selectSeatStandardBooking.SelectedSeatsHolderObj = null;

    selectSeatStandardBooking.SideBarName = "SBSidebar";
    selectSeatStandardBooking.SideBarObj = null;
    
    selectSeatStandardBooking.labelMustChooseInfantSeat = '';
    selectSeatStandardBooking.seatClickedEvent = '';

    selectSeatStandardBooking.familyFaresSettingsName = "FamilyFaresSettings";
    selectSeatStandardBooking.PetInputName = 'petInput';
    selectSeatStandardBooking.addPetPopupId = '';
    selectSeatStandardBooking.cancelSeatId = '';

    selectSeatStandardBooking.familyFaresSettingsObj = null;
    selectSeatStandardBooking.PetInputObj = null;
    selectSeatStandardBooking.addPetPopup = null;
    selectSeatStandardBooking.cancelSeat = null;

    selectSeatStandardBooking.PricePref = '';
    selectSeatStandardBooking.PriceXl = '';
    selectSeatStandardBooking.PriceOPT = '';
    selectSeatStandardBooking.PriceBAS = '';

    //#endregion Properties

    selectSeatStandardBooking.initObjects = function () {
        parent.initObjects.call(this);
        this.addPetPopup = this.getById(this.addPetPopupId);
        this.cancelSeat = this.getById(this.cancelSeatId);

        this.SelectedSeatsHolderObj = VUELING.Util.getObjectInstance(this.SelectedSeatsHolderName);
        this.familyFaresSettingsObj = VUELING.Util.getObjectInstance(this.familyFaresSettingsName);
        this.SideBarObj = VUELING.Util.getObjectInstance(this.SideBarName);
    };

    selectSeatStandardBooking.addEvents = function () {
        parent.addEvents.call(this);
        if (this.SelectedSeatsHolderObj != null) {
            var self = this;
            this.SelectedSeatsHolderObj.addNoSelectedSeatsObserver(function() { self.cleanSideBar(); });
            this.SelectedSeatsHolderObj.addRemoveAllSelectedSeatsObserver(function () { self.ResetAllPaxAllSeat(); });
        }
        this.EventsForFieldset();
        this.EventsForButtonsPaxSections();
        this.EventsForAssignSeats();
    };

    //#region Events

    selectSeatStandardBooking.EventsForAssignSeats = function () {
        var self = this;
        $("a[data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").unbind("click");
        $("a[data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").click(function (e) { self.SeatAssignHandler(e); });
    };

    selectSeatStandardBooking.EventsForButtonsPaxSections = function () {
        var self = this;
        $("a[data-PaxButton][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").click(function (e) { self.buttonsPaxSectionsHandler(e); });
    };

    //#endregion Events

    selectSeatStandardBooking.ChangeSegmentAndJourney = function () {
        var obj = $("[data-listpaxflight].sectionSelected a[data-paxbutton].selected");
        var journey = parseInt(obj.attr("data-journey"));
        var segment = parseInt(obj.attr("data-segment"));
        this.buttonsPaxSectionsSelecting(journey, segment);
    };

    selectSeatStandardBooking.buttonsPaxSectionsHandler = function (e) {
        $("[data-listpaxli][data-passenger-id='0'][idjourney='" + this.data_journey + "'][idsegment='" + this.data_segment + "']").click();
    };

    selectSeatStandardBooking.buttonsPaxSectionsSelecting = function (originJourney, originSegment) {

        if (this.data_journey != originJourney || (this.data_journey == originJourney && this.data_segment != originSegment)) {
            $("div[data-id-part='head']").addClass("hidden");
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

    selectSeatStandardBooking.SeatAssignHandler = function (e) {
        if ($(e.currentTarget).attr("data_assignable") == "true") {
            this.seatClickedEvent = e;
            var paxId = $(this.paxObjectSelected).attr("data_paxid");
            this.GetPetInput();

            if (this.PetInputObj.PassengerHasPet(paxId)) {
                this.addPetPopup.show(this.addPetPopupId);

                var self = this;
                $('#okSeatPopUpLk').unbind('click');
                $('#cancelSeatPetPopUpLk').unbind('click');
                $('#okSeatPopUpLk').click(function (e) { self.ClosePetMsgClickEventHandler(e); });
                $('#cancelSeatPetPopUpLk').bind('click', { seatClickedEvent: this.seatClickedEvent, paxId: paxId }, function (e) { self.CancelPassengerPet(e); });

            } else {
                this.SeatAssing(e);
            }
        }
    };

    selectSeatStandardBooking.ScrollToNextContent = function () {
        if (this.Tarifa == "Basic") {
            if ($("#carsCarrouselOpacityController").length > 0)
                $('html, body').animate({ scrollTop: $("#carsCarrouselOpacityController").offset().top }, 1000);
            else
                $('html, body').animate({ scrollTop: $("#baggageTab").offset().top }, 1000);
        }
        else {
            if ($("#carsCarrouselOpacityController").length > 0)
                $('html, body').animate({ scrollTop: $("#carsCarrouselOpacityController").offset().top }, 1000);
            else
                $('html, body').animate({ scrollTop: $("#CONTROLGROUPSERVICES_BaggageViewServicesView").offset().top }, 1000);
        }
    };

    selectSeatStandardBooking.SeatAssing = function (e) {
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

            if (this.Tarifa == "Basic") {
                var linkDelete = '<a href="#" class="seatButton">' + this.labelDelete + '</a>';
                var self = this;
                $('[data-Element="passengerFieldButton"][idJourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_paxid + ']').find('.seatInfo').append(linkDelete);
                $(".seatInfo[data_paxid='" + data_paxid + "'][data_journey='" + data_journey + "'][data_segment='" + data_seg + "'] a.seatButton").click(function (e) { self.PaxSeatDelete(e); });
            }

            this.ChangeTypeSeat(seat);
            this.ShowMessageAlertInfantSeatClose();
            this.SelectedSeatsHolderObj.addCurrentSeat(seat);
            this.updateSideBar();
        }
    };

    selectSeatStandardBooking.ChangeTypeSeat = function (seat) {
        var type = $(seat).attr("data_seat_type").toLowerCase();
        if (type == "optimum") type = "basic";
        $("[data-typeSeat].sectionSelected").removeClass("sectionSelected");
        $("[data-typeSeat='" + type + "']").addClass("sectionSelected");
    };

    selectSeatStandardBooking.UpdateCurrentSelectedSeats = function (seats, showTooltip) {
        var self = this;
        $.each(seats, function (i, seat) {
            self.SelectedSeatsHolderObj.removeCurrentSeat(seat);
        });
        this.updateSideBar(showTooltip);
    };

    selectSeatStandardBooking.cleanSideBar = function () {
        this.SideBarObj.removeService('seats');
    };

    selectSeatStandardBooking.updateSideBar = function (showTooltip) {
        var selectedSeats = this.GetSeatsGroupByType(this.SelectedSeatsHolderObj.CurrentSelectedSeats);
        this.SideBarObj.setService('seats', selectedSeats, this.labelSeatPlural);
        if (showTooltip == undefined || showTooltip == true)
            this.SideBarObj.displayServiceTooltip('seats', this.labelSeatPlural);
    };

    selectSeatStandardBooking.initAddPetPopup = function () {
        if (this.addPetPopupId != '') {
            this.addPetPopup = new SKYSALES.Class.BlockedPopUp();
            var json = {};
            json.closeElement = $('#' + this.addPetPopupId + ' .blockUIPopUpClose');
            this.addPetPopup.init(json);
            var self = this;
            $('#' + this.addPetPopupId + ' .blockUIPopUpClose').click(function (e) { self.closePetMsgClickEventHandler(e); });
        }
    };

    selectSeatStandardBooking.ClosePetMsgClickEventHandler = function () {
        this.addPetPopup.close();
        this.ScrollToSeatMap();
    };

    selectSeatStandardBooking.CancelPassengerPet = function (e) {
        this.addPetPopup.close();
        this.GetPetInput();
        this.PetInputObj.PassengerCancelPet(e.data.paxId);
        this.SeatAssing(e.data.seatClickedEvent);
        this.ScrollToSeatMap();
    };

    selectSeatStandardBooking.GetPetInput = function () {
        if (this.PetInputObj == null)
            this.PetInputObj = VUELING.Util.getObjectInstance(this.PetInputName);
    };

    return selectSeatStandardBooking;
};

VUELING.Class.SelectSeatStandardBookingHorizontal = function () {
    var parent = VUELING.Class.SelectSeatStandardBooking("Horizontal"),
       thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.init = function (json) {
        parent.init.call(this, json);
        this.initAddPetPopup();
    };

    thisClass.EventsForFieldset = function () {
        var self = this;
        $("[data-listpaxli][data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").click(function (e) { self.InPaxSelectednHandler(e); });
    };

    thisClass.InPaxSelectednHandler = function (e) {
        var button = e.currentTarget;
        var dataPaxId = $(button).attr("data-passenger-id");
        var data_segment = $(button).attr("idsegment");
        var data_journey = $(button).attr("idjourney");
        var activate = $("[data-listpaxli][data-passenger-id='" + dataPaxId + "'][idsegment='" + data_segment + "'][idjourney='" + data_journey + "']").attr("data-activate");
        if (activate == "1")
            $("[data-listpaxli][data-passenger-id='" + dataPaxId + "'][idsegment='" + data_segment + "'][idjourney='" + data_journey + "']").removeAttr("data-activate");
        else {
            this.ChangeSegmentAndJourney();
            parent.InPaxSelectednHandler.call(this, e);
        }

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

            this.ChangePriceDivShowcase("PREFPriceDiv", this.PricePref);
            this.ChangePriceDivShowcase("XLPriceDiv", this.PriceXl);
            this.ChangePriceDivShowcase("OPTPriceDiv", this.PriceOPT);
            this.ChangePriceDivShowcase("BASPriceDiv", this.PriceBAS);

        } else if (this.Tarifa == "Optima") {

            this.ChangePriceDivShowcase("dvPricePref", this.PricePref);
            this.ChangePriceDivShowcase("dvPriceXl", this.PriceXl);


            $("#dvPromoOptima").removeClass("hidden");
        } else if (this.Tarifa == "Excellence") {
            $("#dvPromoExcellence").removeClass("hidden");
        }
    };

    return thisClass;
};

VUELING.Class.SelectSeatStandardBookingVertical = function () {
    var parent = VUELING.Class.SelectSeatStandardBooking("Vertical"),
       thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.init = function (json) {
        parent.init.call(this, json);
        this.initAddPetPopup();
        $('div[data-id-part="head"]').first().removeClass('hidden');
    };

    thisClass.EventsForFieldset = function () {
        var self = this;
        $("#colVuelta div").first().click(function (e) { $(this).parent().find("a").first().click(); e.preventDefault(); });
        $("#colIda div").first().click(function (e) { $(this).parent().find("a").first().click(); e.preventDefault(); });
        $("a[data-PaxButton][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").click(function (e) { self.InPaxSelectednHandler(e); });
        $("[data-listpaxli][data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").click(function (e) { self.InPaxSelectednHandler(e); });
    };

    thisClass.InPaxSelectednHandler = function (e) {
        var button = e.currentTarget;
        var dataPaxId = $(button).attr("data-passenger-id");
        var data_segment = $(button).attr("idsegment");
        var data_journey = $(button).attr("idjourney");
        var activate = $("[data-listpaxli][data-passenger-id='" + dataPaxId + "'][idsegment='" + data_segment + "'][idjourney='" + data_journey + "']").attr("data-activate");
        if (activate == "1")
            $("[data-listpaxli][data-passenger-id='" + dataPaxId + "'][idsegment='" + data_segment + "'][idjourney='" + data_journey + "']").removeAttr("data-activate");
        else {
            this.ChangeSegmentAndJourney();
            parent.InPaxSelectednHandler.call(this, e);
        }

        this.ShowOrHideA319();

        $("[data-promo]").not(".hidden").addClass("hidden");
        if (this.Tarifa == "Basic") {

            this.ChangePriceDivShowcase("PREFPriceDiv", this.PricePref);
            this.ChangePriceDivShowcase("XLPriceDiv", this.PriceXl);
            this.ChangePriceDivShowcase("OPTPriceDiv", this.PriceOPT);
            this.ChangePriceDivShowcase("BASPriceDiv", this.PriceBAS);

        } else if (this.Tarifa == "Optima") {

            this.ChangePriceDivShowcase("dvPricePref", this.PricePref);
            this.ChangePriceDivShowcase("dvPriceXl", this.PriceXl);


            $("#dvPromoOptima").removeClass("hidden");
        } else if (this.Tarifa == "Excellence") {
            $("#dvPromoExcellence").removeClass("hidden");
        }
    };

    return thisClass;
};
