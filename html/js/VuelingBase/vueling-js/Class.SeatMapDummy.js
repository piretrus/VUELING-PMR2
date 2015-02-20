

VUELING.Class.SeatMapDummy = function () {
    var parent = new SKYSALES.Class.SkySales(),
    seatMapDummy = SKYSALES.Util.extendObject(parent);

    seatMapDummy.data_segment = "";
    seatMapDummy.data_journey = "";
    seatMapDummy.SeatPaxSelectedHoverId = "";
    seatMapDummy.SeatPaxSelectedHover = "";
    seatMapDummy.ListPaxs = null;
    seatMapDummy.labelSeat = "";
    seatMapDummy.ContentDummyId = "";
    seatMapDummy.ContentDummy = null;

    seatMapDummy.init = function (json) {
        this.setSettingsByObject(json);
        this.initializeSeatsDetail();
        this.addEvents();
    };

    seatMapDummy.initializeSeatsDetail = function () {
        $("[data-CheckoutPopup='wrapAvionDummy']").not(".hidden").addClass("hidden");
        $("[data-CheckoutPopup='DummyWrapperAvions']").not(".hidden").addClass("hidden");
        $("[data-CheckoutPopup='SeatMapDummy']").not(".hidden").addClass("hidden");
        seatMapDummy.SeatPaxSelectedHover = $("[data-checkoutpopup='" + seatMapDummy.SeatPaxSelectedHoverId + "'][data-journey='" + seatMapDummy.data_journey + "'][data-segment='" + seatMapDummy.data_segment + "']");
        seatMapDummy.ContentDummy = this.getById(seatMapDummy.ContentDummyId);
        $("#wrapSeatMap").hide();
    };
    seatMapDummy.addEvents = function () {
        if (seatMapDummy.data_segment == 0)
            $("[data-checkoutpopup='ButtonShowJourney'][data-journey=" + seatMapDummy.data_journey + "]").click(seatMapDummy.ButtonShowJourneyClick);
        $("[data-checkoutpopup='ButtonShowMap'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "]").click(seatMapDummy.ButtonShowMapClick);
        $("[data-checkoutpopup='SeatDummy'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "]").hover(seatMapDummy.SeatPopupIn, seatMapDummy.SeatPopupOut);
        $("[data-checkoutpopup='SeatNumber'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "]").hover(seatMapDummy.SeatNumberPopupIn, seatMapDummy.SeatNumberPopupOut);
        $("[data-checkoutpopup='SeatNumber'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "]").mousemove(seatMapDummy.SeatNumberPopupMove);
        $("[data-checkoutpopup='ButtonScrollLeft'][data-journey='" + seatMapDummy.data_journey + "']").click(seatMapDummy.ButtonScrollLeftClick);
        $("[data-checkoutpopup='ButtonScrollRight'][data-journey='" + seatMapDummy.data_journey + "']").click(seatMapDummy.ButtonScrollRightClick);
    };

    seatMapDummy.ButtonScrollLeftClick = function (e) {
        var obj = $("[data-CheckoutPopup='ButtonScrollAuto']", e.currentTarget.parentNode);
        var total = obj.scrollLeft() - (obj[0].scrollWidth / seatMapDummy.ListPaxs.length);
        obj.scrollLeft(total);
    };
    seatMapDummy.ButtonScrollRightClick = function (e) {
        var obj = $("[data-CheckoutPopup='ButtonScrollAuto']", e.currentTarget.parentNode);
        var total = obj.scrollLeft() + (obj[0].scrollWidth / seatMapDummy.ListPaxs.length);
        obj.scrollLeft(total);
    };

    seatMapDummy.ButtonShowJourneyClick = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        $("[data-checkoutpopup='DivShowJourney'].selected").removeClass("selected");
        $(e.currentTarget).parent("[data-CheckoutPopup='DivShowJourney']").addClass("selected");
        $("[data-CheckoutPopup='ButtonShowMap']", $(e.currentTarget).parent("[data-CheckoutPopup='DivShowJourney']")).eq(0).click();
    };
    seatMapDummy.ButtonShowMapClick = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        $("[data-checkoutpopup='ButtonShowMap'].selected").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        $("#wrapSeatMap").show();
        $("[data-CheckoutPopup='wrapAvionDummy']").not(".hidden").addClass("hidden");
        $("[data-CheckoutPopup='wrapAvionDummy'].hidden").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);

        $("[data-CheckoutPopup='DummyWrapperAvions']").not(".hidden").addClass("hidden");
        $("[data-CheckoutPopup='DummyWrapperAvions'].hidden").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);

        $("[data-CheckoutPopup='SeatMapDummy']").not(".hidden").addClass("hidden");
        $("[data-CheckoutPopup='SeatMapDummy-avion-thList']").not(".hidden").addClass("hidden");
        $("[data-CheckoutPopup='SeatMapDummy-avion-seatLegendList']").not(".hidden").addClass("hidden");

        $("[data-CheckoutPopup='SeatMapDummy'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "].hidden").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);
        $("[data-CheckoutPopup='SeatMapDummy-avion-thList'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "].hidden").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);
        $("[data-CheckoutPopup='SeatMapDummy-avion-seatLegendList'][data-journey=" + seatMapDummy.data_journey + "][data-segment=" + seatMapDummy.data_segment + "].hidden").removeClass("hidden").css('opacity', 0).show().animate({ opacity: 1 }, 1500);

        $(seatMapDummy.ContentDummy).stop(true).animate({ scrollTop: $(seatMapDummy.ContentDummy).height() }, 1500);
    };

    seatMapDummy.SeatPopupIn = function (e) {
        var seatSelected = e.currentTarget,
            id = parseInt($(seatSelected).data("paxid"));
        if (id >= 0) {
            var routeobj = $("[data-checkoutpopup='SeatMapDummy'][data-journey='" + seatMapDummy.data_journey + "'][data-segment='" + seatMapDummy.data_segment + "']");
            var name = ""
                , seatDesigned = ""
                , passengerInfants = "";
            $.each(seatMapDummy.ListPaxs, function () {
                if (this.data_paxid == id) {
                    name = this.data_paxname;
                    seatDesigned = this.data_seatDesignator;
                    passengerInfants = this.data_passengerInfants;
                }
            });

            $("[data-Description] #paxname", seatMapDummy.SeatPaxSelectedHover).html(name);
            $("[data-Description] #journey", seatMapDummy.SeatPaxSelectedHover).html(routeobj.data("departure-station") + "-" + routeobj.data("arrival-station"));
            $("[data-Description] #seat", seatMapDummy.SeatPaxSelectedHover).html(seatDesigned);

            var posicionRealSeat = $(seatSelected).position();
            $(seatMapDummy.SeatPaxSelectedHover).css({
                position: 'absolute',
                left: (posicionRealSeat.left + 25) + 'px',
                top: (posicionRealSeat.top - 21) + 'px'
            });
            $(seatMapDummy.SeatPaxSelectedHover).removeClass("hidden");
        }
    };
    seatMapDummy.SeatPopupOut = function (e) {
        if (!$(seatMapDummy.SeatPaxSelectedHover).hasClass("hidden"))
            $(seatMapDummy.SeatPaxSelectedHover).addClass("hidden");
    };

    seatMapDummy.SeatNumberPopupIn = function (e) {
        var seatSelected = e.currentTarget,
            id = parseInt($(seatSelected).data("paxid"));
        if (id >= 0) {
            var popup = $("[data-checkoutpopup='SeatNumberPopup']");
            var routeobj = $("[data-checkoutpopup='SeatMapDummy'][data-journey='" + seatMapDummy.data_journey + "'][data-segment='" + seatMapDummy.data_segment + "']"),
                posicionRealSeat = $(seatSelected).position();
            var route = routeobj.data("departure-station") + "-" + routeobj.data("arrival-station")
                , name = ""
                , seatDesigned = ""
                , passengerInfants = "";
            $.each(seatMapDummy.ListPaxs, function () {
                if (this.data_paxid == id - 1) {
                    name = this.data_paxname;
                    seatDesigned = this.data_seatDesignator;
                    passengerInfants = this.data_passengerInfants;
                }
            });

            $("[data-checkoutpopup='paxname']", popup).html(name);
            $("[data-checkoutpopup='content']", popup).html(route + " - " + seatMapDummy.labelSeat + "<strong>" + seatDesigned + "</strong>");
            popup.css("position", "absolute");
            $(popup).removeClass("hidden");
        }
    };
    seatMapDummy.SeatNumberPopupOut = function (e) {
        var seatSelected = e.currentTarget;
        if (!$("[data-checkoutpopup='SeatNumberPopup']").hasClass("hidden"))
            $("[data-checkoutpopup='SeatNumberPopup']").addClass("hidden");
    };
    seatMapDummy.SeatNumberPopupMove = function (e) {
        var popup = $("[data-checkoutpopup='SeatNumberPopup']");
        popup.offset({ top: e.pageY - 25, left: e.pageX + 25 });
    };
    return seatMapDummy;
};