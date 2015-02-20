VUELING.Class.SelectSeatBase = function () {
    var parent = SKYSALES.Class.SkySales(),
        selectSeatBase = SKYSALES.Util.extendObject(parent);

    //#region Properties

    selectSeatBase.seatMapId = '';
    selectSeatBase.numSegmentsJourney = '';
    selectSeatBase.numPaxsJourney = '';
    selectSeatBase.iconseat = '';
    selectSeatBase.seatId = '';
    selectSeatBase.paxObjectSelected = '';
    selectSeatBase.SeatPaxSelectedHoverInfantId = '';
    selectSeatBase.arraySeatPax = {};
    selectSeatBase.arraySeatPaxOrigNotChange = {};
    selectSeatBase.data_segment = '';
    selectSeatBase.data_journey = '';
    selectSeatBase.labelSeatAssigned = '';
    selectSeatBase.jsonSeatAssign = '';
    selectSeatBase.jsonSeatAutoAssign = '';
    selectSeatBase.arrayAutoAssignSeatPax = {};
    selectSeatBase.typeSeatText = {};
    selectSeatBase.escaparateDynamic = false;
    selectSeatBase.actualDataSeatType = '';
    selectSeatBase.listTypeTextSeat = [];
    selectSeatBase.showFreeSeats = false;
    selectSeatBase.SeatTypePaxId = '';
    selectSeatBase.SeatTypeTarget = '';
    selectSeatBase.Tarifa = '';
    selectSeatBase.NumTotalJourneys = '';
    selectSeatBase.TextSeleccionarAsientosTrayectoSiguiente = '';
    selectSeatBase.SeatPaxSelectedHoverId = '';
    selectSeatBase.labelSeatSingular = "";
    selectSeatBase.labelSeatPlural = "";
    selectSeatBase.labelnoNumSeat = "";
    selectSeatBase.typePaxSelected = "";
    selectSeatBase.labelDelete = "";
    selectSeatBase.RouteName = "";
    selectSeatBase.labeloutboundFlight = "";
    selectSeatBase.labelreturnFlight = "";
    selectSeatBase.PlaneModel = null;

    //#endregion Properties

    selectSeatBase.init = function (json) { };

    selectSeatBase.initObjects = function () {
        this.arraySeatPaxOrigNotChange = this.arraySeatPax.slice();

        var firstPaxId = this.getFirstPaxId();
        this.paxObjectSelected = $("input[id='typeRadioPax_" + firstPaxId + "_" + this.data_journey + "_" + this.data_segment + "']");

        var jsonAssing = $("#" + this.jsonSeatAssign + this.data_journey + this.data_segment);
        jsonAssing.val("{arraySeatPax:" + JSON.stringify(this.arraySeatPax) + "}");

        this.AddAssignedSeats();
        if (!this.escaparateDynamic || this.HaveAnySeatPax()) {
            this.ShowSeatMap();
            if (this.Tarifa == 'Basic') {
                this.SelectSeatSection();
                var instanceOfShowcase = VUELING.Util.getObjectInstance('ShowcaseStandardBooking');
                if (instanceOfShowcase != null) {
                    $(instanceOfShowcase.inputValidationField).val("true");
                }
            }
            this.ShowButtonContinue();
        }
        window.scrollTo(0, 0);

        //Inicializar los botones (deshabilitados)
        var allSeatAssigned = this.AllSeatPaxAssigned();
        if (!allSeatAssigned) {
            $(".ToolTipGenerateBoardingCardMessage").hide();
            $(".ToolTipSelectSeatMessage").show();
        }

        this.CheckSeatMapCorrectSeats();
    };

    selectSeatBase.addEvents = function () {
        this.EventsForListPaxDelete();
        this.EventsForSeatsSelectedPopup();
        this.EventsForAlertsInfant();
    };

    //#region Events

    selectSeatBase.EventsForButtonsSection = function () {
        var self = this;
        $("a[id=paySeats]").click(function (e) { self.SeatMapShowHandler(e); });

        if (this.showFreeSeats)
            $("#noChooseSeats").hover(this.seatTypeSelectorHandlerIn, this.seatTypeSelectorHandlerOut);
    };

    selectSeatBase.EventsForAlertsInfant = function () {
        var self = this;
        $("[data-id-part][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "'] [data-mapplane]").mouseleave(function (e) { self.ShowMessageAlertInfantSeatClose(e); });
        $("#SeatPaxSelectedHoverInfant[data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "'] #SeatPaxSelectedHoverInfantButton").click(function (e) { self.ShowMessageAlertInfantSeatClose(e); });
    };

    selectSeatBase.EventsForListPaxDelete = function () {
        var self = this;
        $(".seatInfo[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'] a.seatButton").click(function (e) { self.PaxSeatDelete(e); });
    };

    selectSeatBase.EventsForSeatsSelectedPopup = function () {
        var self = this;
        $("[data-mapplane] a[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'][data-paxname!='']").hover(function (e) { self.SeatPaxSelectedPopupHoverIn(e); }, function (e) { self.SeatPaxSelectedPopupHoverOut(e); });
    };

    selectSeatBase.RemoveEventAutoAssign = function () {
        $("#noChooseSeats").unbind("click");
    };

    //#endregion Events

    selectSeatBase.SeatMapShowHandler = function (e) { };

    selectSeatBase.SeatPaxSelectedPopupHoverIn = function (e) {
        var seatSelected = e.currentTarget,
            $seatSelected = $(seatSelected),
            name = $seatSelected.attr("data-paxname");
        if (name && (!$seatSelected.hasClass("icoSeatOpacity") && $seatSelected.attr("class").indexOf("select") != -1)) {
            var route = $("[data-Route][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").data("route"),
                seatDesigned = $(seatSelected).attr("data_column") + $(seatSelected).attr("data_row"),
                posicionRealSeat = $(seatSelected).position(),
                tooltipObject = $("#" + this.SeatPaxSelectedHoverId + "[data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']")[0], posLeftAdjustment = 21,
                popUpWidth = $(tooltipObject).find(".detailSeatLayer").width(),
                popUpInnerContainer = $(tooltipObject).find(".detailSeatLayer"),
                seatTable = $(e.currentTarget).parents("table"),
                tableContainer = $(e.currentTarget).parents(".avion");

            if (typeof (tooltipObject) != 'undefined') {

                $("[data-Description] #paxname", tooltipObject).html(name);
                $("[data-Description] #journey", tooltipObject).html(route);
                $("[data-Description] #seat", tooltipObject).html(seatDesigned);

                if (popUpInnerContainer.hasClass("detailSeatLayer--izq")) {
                    popUpInnerContainer.attr("class", "detailSeatLayer layerSelect");
                }

                // Display popup to the left
                if ((seatTable.offset().left + $(e.currentTarget).position().left + popUpWidth) > (tableContainer.offset().left + tableContainer.width())) {
                    posLeftAdjustment -= (popUpWidth + 54);
                    popUpInnerContainer.attr("class", "detailSeatLayer detailSeatLayer--izq layerSelect");
                }

                $(tooltipObject).css({
                    position: 'absolute',
                    left: (posicionRealSeat.left + posLeftAdjustment) + 'px',
                    top: (posicionRealSeat.top - 21) + 'px'
                });
                $(tooltipObject).removeClass("hidden");
            }
        }
    };

    selectSeatBase.SeatPaxSelectedPopupHoverOut = function (e) {
        var tooltipObject = $("#" + this.SeatPaxSelectedHoverId + "[data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']")[0];
        if ($(tooltipObject).is(":hidden"))
            $(tooltipObject).addClass("hidden");
    };

    selectSeatBase.ShowMessageAlertInfantSeat = function (e) { };

    selectSeatBase.ShowMessageAlertInfantSeatClose = function () {
        var tooltipObject = $("#" + this.SeatPaxSelectedHoverInfantId + "[data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']")[0];
        $(tooltipObject).addClass("hidden");
    };

    selectSeatBase.buttonsPaxSectionsSelecting = function (originJourney, originSegment) {
        $("a[data-paxbutton].selected").removeClass("selected");
        $("a[data-paxbutton][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").addClass("selected");
        if (this.data_journey != originJourney) {
            $("[data-listpaxflight='" + originJourney + "']").removeClass("sectionSelected");
            $("[data-listpaxflight='" + this.data_journey + "']").addClass("sectionSelected");
        }
    };

    selectSeatBase.InPaxSelectednHandler = function (e) { };

    selectSeatBase.UpdatePaxsList = function (seat, passengerId) {
        var textAppend = this.GetSeatDescription(seat);
        if (textAppend)
            $('[data-Element="passengerFieldButton"][idJourney=' + this.data_journey + '][idSegment=' + this.data_segment + '][data-passenger-id=' + passengerId + ']').find('.seatInfo .labelSeat').append(textAppend);
    };

    selectSeatBase.GetSeatDescription = function (seat) {
        var seatType = this.getDataSeatType(seat);
        return this.GetTypeTextSeatDescription(seatType);
    };

    selectSeatBase.AddAssignedSeats = function () { };

    selectSeatBase.SetIconOriginalPassangeMenu = function (dataColumn, dataRow, paxId) {
        var seattype = this.GetIcoToShow(dataColumn, dataRow);
        $('[data-Element="passengerFieldButton"][idJourney=' + this.data_journey + '][idSegment=' + this.data_segment + '][data-passenger-id=' + paxId + ']').find('.seatInfo').html(seattype);
    };

    selectSeatBase.SeatAssignHandler = function (e) {
        var seat = e.currentTarget;
        if (seat.getAttribute("data_assignable") == "true") {
            var dataColumn = $(seat).attr("data_column");
            var dataRow = $(seat).attr("data_row");
            var paxId = $(this.paxObjectSelected).attr("data_paxid");
            var self = this;
            $("[data-mapplane] a[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'][data_row='" + dataRow + "'][data_column='" + dataColumn + "']").hover(function (e) { self.SeatPaxSelectedPopupHoverIn(e); }, function (e) { self.SeatPaxSelectedPopupHoverOut(e); });

            if (this.PaxHaveSeats()) {
                var seatInfoRaddioButton = this.GetSeatFromPaxRadioButton(this.paxObjectSelected);
                this.RemoveActualSeat(seatInfoRaddioButton);
            }
            $(seat).attr("data_assignable", "false");
            $(seat).attr("data-PaxName", this.paxObjectSelected.data("paxname"));
            $(seat).attr("data_paxId", paxId);

            this.SetIconOriginalPassangeMenu(dataColumn, dataRow, paxId);
            this.UpdatePaxsList(seat, paxId);
            this.AddNewSeatSelected(seat);
            this.SetNextPaxSelected(paxId);

            var _seat = new Object();
            _seat["price"] = this.GetSeatPrice(seat);
            _seat["segment"] = seat.getAttribute("data_segment");
            _seat["journey"] = seat.getAttribute("data_journey");
            _seat["paxId"] = seat.getAttribute("data_paxid");
            _seat["data_seat_type"] = seat.getAttribute("data_seat_type");


            this.NotifyNewSeatSelection(_seat, false);
        }
    };
    
    selectSeatBase.GetSeatPrice = function (seat) {
        return seat.getAttribute("data_price");
    };

    selectSeatBase.RepaintSeatMap = function (typePax) {
        if (typePax == "ADT") {
            var seatList = $('div[data-mapplane]').find('a[data_journey=' + this.data_journey + '][data_segment=' + this.data_segment + '][data_assignable=false]');
            this.PaintNormalSeatMap(seatList);
        } else if (typePax == "CHD") {
            var seatListCHD = $('div[data-mapplane]').find('a[data_journey=' + this.data_journey + '][data_segment=' + this.data_segment + '][data_assignable=true]');
            this.PaintChildSeatMap(seatListCHD);
        }
    };

    selectSeatBase.PaintNormalSeatMap = function (seatList) {
        $(seatList).each(function (i, item) {
            var ico = $(item).attr('data_child_ico');
            if ((ico.indexOf("icoSeatOpacity") > 0 || ico.indexOf("vacio") > 0) && $(item).attr('childmodified') == "true") {
                var ico2 = $(item).attr('data_original_ico');
                $(item).attr('class', ico2);
                $(item).attr('data_assignable', true);
                $(item).attr('childModified', false);
            }
        });
    };

    selectSeatBase.PaintChildSeatMap = function (seatList) {
        $(seatList).each(function (i, item) {
            var ico = $(item).attr('data_child_ico');
            if (ico.indexOf("icoSeatOpacity") > 0 || ico.indexOf("vacio") > 0) {
                $(item).attr('data_assignable', false);
                $(item).attr('childModified', true);
            }
            $(item).attr('class', ico);
        });
    };

    selectSeatBase.CheckSeatMapCorrectSeats = function () { };

    selectSeatBase.SetNextPaxSelected = function (paxIdActual) { };

    selectSeatBase.MoveScrollBarToSelectedPax = function () { };

    selectSeatBase.ChangePriceDivShowcase = function (idDiv, precio) {
        var pattern = /[0-9,.]+/;
        if ($("#" + idDiv).length > 0) {
            var str = $("#" + idDiv).html();
            var matches = str.match(pattern);
            str = str.replace(matches[0], precio);
            $("#" + idDiv).html(str);
        }
    };

    selectSeatBase.ScrollToNextContent = function () { };

    selectSeatBase.ActualizarPaxMenu = function (seat) {
        var codseat = seat.data_column + seat.data_row;
        $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').attr('data_row', seat.data_row);
        $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').attr('data_column', seat.data_column);
        $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').attr('data_seatassign', codseat);
        //$('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').text(codseat);
        $('input.typeRadio[data_journey=' + seat.data_journey + '][data_segment=' + seat.data_seg + '][data_paxid=' + seat.data_pax + ']').attr('data_seatassign', codseat);
    };

    selectSeatBase.IsSeatNotSelected = function (column, row) {
        var typeIco = $('div[data-mapplane]').find('a[data_row=' + row + '][data_column=' + column + '][data_journey=' + this.data_journey + '][data_segment=' + this.data_segment + ']').attr('class');
        return typeIco.indexOf("select") == -1;
    };

    selectSeatBase.GetIcoToShow = function (column, row) {
        var seat = $('div[data-mapplane]').find('a[data_row=' + row + '][data_column=' + column + '][data_journey=' + this.data_journey + '][data_segment=' + this.data_segment + ']')[0];
        var tipoasiento = this.getDataSeatType(seat);
        for (var i = 0; i < this.listTypeTextSeat.length; i++) {
            if (this.listTypeTextSeat[i].type === tipoasiento) {
                tipoasiento = this.listTypeTextSeat[i].icoListPax;
                break;
            }
        }
        var res = '<h5 class="' + tipoasiento + '"></h5>';
        return res;
    };

    selectSeatBase.GetTextToShow = function (seattype) {
        var seattext = '';
        if (seattype.indexOf("icoRoundSeat_duo") != -1)
            return this.typeSeatText['icoRoundSeat_duo'];
        else if (seattype.indexOf("icoRoundSeat_xl") != -1)
            return this.typeSeatText['icoRoundSeat_xl'];
        else if (seattype.indexOf("icoRoundSeat_basic") != -1)
            return this.typeSeatText['icoRoundSeat_basic'];
        else if (seattype.indexOf("icoRoundSeat_bebe") != -1)
            return this.typeSeatText['icoRoundSeat_bebe'];
        return seattext;
    };

    selectSeatBase.GetTypeTextSeatDescription = function (seattype) {
        for (var i = 0; i < this.listTypeTextSeat.length; i++) {
            var seatTypeDesc = this.listTypeTextSeat[i];
            if (seatTypeDesc["type"] == seattype)
                return seatTypeDesc["descripcionPlu"];
        }
        return '';
    };

    selectSeatBase.GetSeatFromPaxRadioButton = function (e) {
        return $("a[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'][data_row='" + e.attr("data_row") + "'][data_column='" + e.attr("data_column") + "']");
    };

    selectSeatBase.PaxHaveSeats = function () {
        if (this.paxObjectSelected.attr("data_seatassign") != "") return true;
        return false;
    };

    selectSeatBase.AddNewSeatSelected = function (seat) { };

    selectSeatBase.AssignToArrayForm = function (seat) {
        var itemOld = "";
        var self = this;
        $.each(this.arraySeatPax, function (i, item) {
            if (item.data_pax == self.paxObjectSelected.attr("data_paxid") && item.data_journey == self.data_journey && item.data_seg == self.data_segment) {
                itemOld = self.GetOriginalSeatSelected(item, itemOld, false);

                item.data_row = seat.getAttribute("data_row");
                item.data_column = seat.getAttribute("data_column");
                item.data_price = self.CalculatePriceOnChangeSeat(seat.getAttribute("data_price"), item);
                item.data_type = seat.getAttribute("data_seat_type");
            }
        });
    };

    selectSeatBase.DeleteSeatPaxToArrayForm = function (paxId) {
        var self = this;
        $.each(this.arraySeatPax, function (i, item) {
            if (item.data_pax == paxId && item.data_journey == self.data_journey && item.data_seg == self.data_segment) {
                item.data_row = "";
                item.data_column = "";
                item.data_price = "";
                item.data_type = "";
                item.data_seat_type = "";
            }
        });
        $("#" + this.jsonSeatAssign + this.data_journey + this.data_segment).val("{arraySeatPax:" + JSON.stringify(this.arraySeatPax) + "}");
    };

    selectSeatBase.ResetAllPaxAllSeat = function () {
        var self = this;
        var items = $("input[type='radio'][data_seatassign!=''][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]");
        items.each(function (i, item) {
            self.PaxSeatDeleteByPaxId($(item).attr("data_paxid"));
        });
        $("[data-paxbutton][data-journey='0'][data-segment='0']").first().click();
        $("input[id=*typeRadioPax_]").first().click();
    };

    selectSeatBase.getDataSeatType = function () {
        if (seat.getAttribute("data_seat_type") != undefined) return seat.getAttribute("data_seat_type");
        else return seat.data_type;
    };

    selectSeatBase.GetOriginalSeatSelected = function (item, itemOld, isAutoAssign) {
        if (!isAutoAssign && item.data_column != "" && itemOld == "") {
            itemOld = JSON.parse(JSON.stringify(item));
            var seatOrig = this.GetSeatFromSegRowColumn(item.data_row, item.data_column);
            itemOld.data_type = seatOrig.getAttribute("data_seat_type");
            itemOld.data_price = seatOrig.getAttribute("data_price");
        }
        return itemOld;
    };

    selectSeatBase.getDataSeatType = function (seat) {
        try {
            return seat.getAttribute("data_seat_type");
        }
        catch (err) {
            return seat.data_seat_type;
        }
    };

    selectSeatBase.CalculatePriceOnChangeSeat = function (price, seat) {
        if (this.NotChangeType(seat)) return 0;
        return price;
    };

    selectSeatBase.NotChangeType = function (seat) {
        $.each(this.arraySeatPax, function (i, item) {
            if (seat.data_type == item.data_type) return true;
        });
        return false;
    };

    selectSeatBase.RemoveActualSeat = function (seats) {
        var self = this;
        $.each(seats, function (i, seat) {
            var iconClass = seat.getAttribute("data_original_ico");
            if (iconClass == self.iconseat["Asiento_bloqueado"]) {
                iconClass = self.iconseat["Asiento_filas_Delanteras_posteriores"];
            }
            self.SeatIconAssign(seat, iconClass);
            $(seat).attr("data_assignable", "true");
            $(seat).attr("data-PaxName", "");
            $(seat).attr("data_paxId", "");
            $(seat).unbind("hover");
            if ($(seat).attr("data_nchild") != 'True') {
                if ($(seat).attr("data_seat_type") != "XL" && $(seat).attr("data_seat_type") != "PriorityBoarding") {
                    $(seat).attr("data_child_ico", $(seat).attr("data_child_ico").replace("icoSeatOpacity", ""));
                }
                $(seat).attr("data_child_ico", $(seat).attr("data_child_ico").replace("vacio", ""));
            }


        });
    };

    selectSeatBase.SeatIconAssign = function (seat, iconClass) {
        seat.setAttribute("class", iconClass);
        //For Ie8
        seat.className = iconClass;
    };

    selectSeatBase.ChangeLabelPaxSeat = function (seat) {
        var seatDesignator = seat.getAttribute("data_column") + seat.getAttribute("data_row");
        var data_journey = this.data_journey;
        var data_seg = this.data_segment;
        var data_paxid = this.paxObjectSelected.attr("data_paxid");
        var res = '<span class="numSeat">' + seatDesignator + '</span>';

        $('[data-Element="passengerFieldButton"][idJourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_paxid + ']').find('.seatInfo .labelSeat').before(res);
        $("#" + this.jsonSeatAssign + data_journey + data_seg).val("{arraySeatPax:" + JSON.stringify(this.arraySeatPax) + "}");

        this.paxObjectSelected.attr("data_journey", seat.getAttribute("data_journey"));
        this.paxObjectSelected.attr("data_segment", seat.getAttribute("data_segment"));
        this.paxObjectSelected.attr("data_row", seat.getAttribute("data_row"));
        this.paxObjectSelected.attr("data_column", seat.getAttribute("data_column"));
        this.paxObjectSelected.attr("data_seatassign", seatDesignator);
    };

    selectSeatBase.PaxSeatDelete = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        var button = e.currentTarget;
        var dataPaxId = $(button).parent().attr("data_paxid");
        var data_segment = $(button).parent().attr("data_segment");
        var data_journey = $(button).parent().attr("data_journey");
        $("[data-listpaxli][data-passenger-id='" + dataPaxId + "'][idsegment='" + data_segment + "'][idjourney='" + data_journey + "']").attr("data-activate", "1");
        this.PaxSeatDeleteByPaxId(dataPaxId);
    };

    selectSeatBase.PaxSeatDeleteByPaxId = function (paxId) {
        var dataJourney = this.data_journey;
        var dataSeg = this.data_segment;
        var input = this.GetPassengerByPaxId(paxId);
        var dataRow = $(input).attr("data_row");
        var dataColumn = $(input).attr("data_column");

        var seats = $("a[data_assignable='false'][data_journey='" + dataJourney + "'][data_segment='" + dataSeg + "'][data_row='" + dataRow + "'][data_column='" + dataColumn + "']");

        this.DeleteSeatPaxToArrayForm(paxId);

        this.UpdateCurrentSelectedSeats(seats, false);

        this.RemoveActualSeat(seats);

        input.attr("data_seatassign", "");
        input.attr("data_row", "");
        input.attr("data_column", "");

        var seatInfo = input.parent().find(".seatInfo");
        $(seatInfo).html('<strong>' + this.labelnoNumSeat + '</strong>');

        var _seat = new Object();
        //_seat["price"] = seat.getAttribute("data_price");
        _seat["segment"] = dataSeg;
        _seat["journey"] = dataJourney;
        _seat["paxId"] = paxId;

        this.NotifyNewSeatSelection(_seat, true);
        $("#typeRadioPax_" + paxId + "_" + dataJourney + "_" + dataSeg).click();
    };

    //A sobreescribir por los hijos cuando se elimina el asiento asignado
    selectSeatBase.UpdateCurrentSelectedSeats = function (seats, showTooltip) { };

    selectSeatBase.GetSeatFromSegRowColumn = function (row, column) {
        return $("a[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'][data_row='" + row + "'][data_column='" + column + "']")[0];
    };

    selectSeatBase.HaveAnySeatPax = function () {
        var haveAnySeatPax = false;
        for (var i = 0; i < this.arraySeatPax.length; i++) {
            var seat = this.arraySeatPax[i];
            var codseat = seat.data_column + seat.data_row;
            if (codseat != "") {
                haveAnySeatPax = true;
                break;
            }
        }
        return haveAnySeatPax;
    };

    selectSeatBase.AllSeatPaxAssigned = function () {
        var result = true;
        for (var i = 0; i < this.arraySeatPax.length; i++) {
            var seat = this.arraySeatPax[i];
            var codseat = seat.data_column + seat.data_row;
            if (codseat == "") {
                result = false;
                break;
            }
        }
        return result;
    };

    selectSeatBase.SetLabelText = function (idContainer, idLbl) {
        //obtengo texto del mensaje
        var labelId = "div#" + idLbl;
        var valueHtml = $(labelId).html();

        var spanId = "span#" + idContainer;
        $(spanId).html(valueHtml);
    };

    selectSeatBase.IsEveryPaxSeatAssigned = function () {
        if ($("input[id*='typeRadioPax']").length == this.numSegmentsJourney * this.numPaxsJourney) {
            var assigned = true;
            $("input[id*='typeRadioPax']").each(function () {
                var attr = $(this).attr("data_seatassign");
                if (attr == '' || attr == undefined) {
                    assigned = false;
                }

            });

            return assigned;
        }
        else return false;
    };

    selectSeatBase.AllSeatsSelectedForCurrentSegment = function (segmentIndex) {
        var assigned = true;
        $("input[id*='typeRadioPax']").each(function () {
            var attr = $(this).attr("data_seatassign");
            var seg = $(this).attr("data_segment");
            if (seg == segmentIndex && (attr == '' || attr == undefined)) {
                assigned = false;
            }

        });

        return assigned;
    };

    selectSeatBase.seatTypeSelectorHandlerIn = function (e) {
        $(this).find("#SeatSelectionInfoToolTip").show();
    };

    selectSeatBase.seatTypeSelectorHandlerOut = function (e) {
        $(this).find("#SeatSelectionInfoToolTip").hide();
    };

    selectSeatBase.SetSectionEnabled = function (enable, divId) {
        if (enable) {
            //habilito la seccion
            if ($(divId).hasClass('disabledPiece'))
                $(divId).removeClass('disabledPiece');
            if ($(divId).hasClass('nohover'))
                $(divId).removeClass('nohover');

            //habilito el boton 
            var btnSection = $(divId).find('a[id=' + 'btAdd' + ']');
            if (btnSection.hasClass('disableButton'))
                btnSection.removeClass('disableButton');

            //vinculo el evento click de la seccion
            var self = this;
            $(divId).click(function (e) { self.SeatMapShowHandler(e); });
            btnSection.attr("href", "#");
        }
        else {
            //deshabilito la seccion
            if (!$(divId).hasClass('disabledPiece'))
                $(divId).addClass('disabledPiece');
            if (!$(divId).hasClass('nohover'))
                $(divId).addClass('nohover');

            //deshabilito el boton
            var btnSection = $(divId).find('a[id=' + 'btAdd' + ']');
            if (!btnSection.hasClass('disableButton'))
                btnSection.addClass('disableButton');

            //desvinculo el evento click de la seccion
            btnSection.removeAttr("href");
            $(divId).unbind('click');
        }
    };

    selectSeatBase.SetListPaxEnabled = function (enable) {
        if (enable) {
            //fieldset
            var self = this;
            $("fieldset[id*='expressSeatRowIda']").each(
                function () {
                    $(this).removeClass("checked");
                    $(this).click(function (e) { self.InPaxSelectednHandler(e); });
                });
            $("fieldset[data-passenger-id='0']").addClass("checked");
            //input
            $("input[id*='typeRadioPax']").each(
                function () {
                    if ($(this).find("disabled"))
                        $(this).removeAttr("disabled");
                });
            $('input[data_journey="0"][data_segment="0"][data_paxid="0"]').click();
            this.paxObjectSelected = $("input[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "']:first-child:checked");
        }
        else {
            //fieldset
            $("fieldset[id*='expressSeatRowIda']").each(
                function () {
                    $(this).unbind('click');
                });
            //input
            $("input[id*='typeRadioPax']").each(
                function () {
                    if ($(this).find("checked"))
                        $(this).removeAttr("checked");
                    $(this).attr("disabled", "disabled");
                });
        }
    };

    selectSeatBase.ScrollToSeatMap = function () {
        var scrollPosition = $('#' + this.seatMapId).offset().top;
        $('html, body').animate({ scrollTop: scrollPosition }, 400);
    };

    selectSeatBase.GetPassengerByPaxId = function (paxId) {
        var passenger = $("input[id*='typeRadioPax'][data_paxid=" + paxId + "][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]");
        return passenger;
    };

    selectSeatBase.PassengerHasSeatAssigned = function (paxId) {
        var passenger = this.GetPassengerByPaxId(paxId);
        var dataSeatAssing = passenger.attr("data_seatassign");
        var result = typeof dataSeatAssing !== 'undefined' && dataSeatAssing !== false && dataSeatAssing != "";
        return result;
    };

    selectSeatBase.GetSeatsGroupByType = function (seats) {
        var seatList = [];
        var seatItem;
        var self = this;
        seats = seats.sort(function (item1, item2) {
            var type1 = self.GetTypeTextSeatDescription(item1.Type).toLowerCase();
            var type2 = self.GetTypeTextSeatDescription(item2.Type).toLowerCase();
            return ((type1 < type2) ? -1 : ((type1 > type2) ? 1 : 0));
        });
        $.each(seats, function (index, item) {
            var seatType = item.Type;
            var price = item.Price;
            if (seatList[seatType]) {
                seatItem = seatList[seatType];
                seatItem['num']++;
                seatItem['price'] += price;
            } else {
                seatItem = [];
                seatItem['num'] = 1;
                seatItem['desc'] = self.GetTypeTextSeatDescription(seatType);
                seatItem['price'] = price;
                seatList[seatType] = seatItem;
            }
        });
        return seatList;
    };

    selectSeatBase.AddLabelNoNumSeat = function (seatInfo) {
        $(seatInfo).html('<span class="no numSeat">' + this.labelnoNumSeat + '</span>');
    };

    selectSeatBase.getFirstPaxId = function () { };

    //#region Visual Functions for seatmap and showcase
    selectSeatBase.ShowSeatMap = function () {
        $('#' + this.seatMapId).removeClass('hidden');
    };

    selectSeatBase.HiddenSeatMap = function () {
        $('#' + this.seatMapId).addClass('hidden');
    };

    selectSeatBase.SelectSeatSection = function (tarifa) {
        tarifa = tarifa || 'Basic';
        if (tarifa == 'Basic') {
            $("div.seats-section").addClass('sectionSelected');
        }
        $("div.#paySeats div.seatPiece").removeClass('disableButton');
    };

    selectSeatBase.DeselectSeatSection = function () {
        $("div.seats-section").removeClass('sectionSelected');
    };

    selectSeatBase.SelectNoSeatSection = function () {
        $("div.noseats-section").addClass('sectionSelected');
        $("div.#paySeats div.seatPiece").addClass('disableButton');
    };

    selectSeatBase.DeselectNoSeatSection = function () {
        $("div.noseats-section").removeClass('sectionSelected');
    };

    selectSeatBase.ShowButtonContinue = function () {
        $("div#generateTicketsButton").removeClass('hidden');
    };

    selectSeatBase.HideButtonContinue = function () {
        $("div#generateTicketsButton").addClass('hidden');
    };

    selectSeatBase.ShowA320Plane = function () {
        $("p#descA320").removeClass('hidden');
    };

    selectSeatBase.ShowA319Plane = function () {
        $('p#descA319').removeClass('hidden');
    };

    selectSeatBase.ShowA321Plane = function () {
        $('p#descA321').removeClass('hidden');
    };

    selectSeatBase.HiddenA320Plane = function () {
        $("p#descA320").addClass('hidden');
    };

    selectSeatBase.HiddenA319Plane = function () {
        $("p#descA319").addClass('hidden');
    };

    selectSeatBase.HiddenA321Plane = function () {
        $("p#descA321").addClass('hidden');
    };
    //#endregion

    var selectedSeatsObservers = [];

    selectSeatBase.addSelectedSeatObserver = function (observer) {
        if (observer && typeof (observer) == "function") {
            selectedSeatsObservers.push(observer);
        }
    };

    selectSeatBase.NotifyNewSeatSelection = function (seat, isRemove) {
        $.each(selectedSeatsObservers, function (index, event) {
            try {
                event(seat, "CHANGESEAT", isRemove);
            } catch (e) {
                console.error('Error executing: %s. Error: %s', event, e);
            }
        });
    };

    selectSeatBase.ShowOrHideA319 = function () {
        if (this.PlaneModel == "320") {
            this.ShowA320Plane();
            this.HiddenA319Plane();
            this.HiddenA321Plane();
        }
        else if (this.PlaneModel == "319") {
            this.ShowA319Plane();
            this.HiddenA320Plane();
            this.HiddenA321Plane();
        }
        else if (this.PlaneModel == "321") {
            this.ShowA321Plane();
            this.HiddenA319Plane();
            this.HiddenA320Plane();
        }
    };

    return selectSeatBase;
};

VUELING.Class.SelectSeatBaseHorizontal = function () {
    var parent = VUELING.Class.SelectSeatBase(),
        thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();

        $("input[id^='typeRadioPax_0_']").first().click();
    };

    thisClass.ShowMessageAlertInfantSeat = function (e) {
        var posicionRealSeat = { left: 0, top: 0 },
            leftModifier = 0,
            topModifier = 0,
            tooltipObject = $("#" + this.SeatPaxSelectedHoverInfantId + "[data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']")[0],
            popUpWidth = $(tooltipObject).find(".detailSeatLayer").width(),
            popUpInnerContainer = $(tooltipObject).find(".detailSeatLayer"),
            seatTable = $(e.currentTarget).parents("table"),
            tableContainer = $(e.currentTarget).parents(".avion");

        if (popUpInnerContainer.hasClass("detailSeatLayer--izq")) {
            popUpInnerContainer.attr("class", "detailSeatLayer layerAlert");
        }

        // Display popup to the left
        if ((tableContainer.length > 0) && (seatTable.offset().left + $(e.currentTarget).position().left + popUpWidth + 20) > (tableContainer.offset().left + tableContainer.width())) {
            leftModifier -= (popUpWidth + 74);
            popUpInnerContainer.attr("class", "detailSeatLayer detailSeatLayer--izq layerAlert");
        }

        posicionRealSeat = $(e.currentTarget).position();
        leftModifier += 21;
        topModifier = -21;

        $(tooltipObject).css({
            position: 'absolute',
            left: (posicionRealSeat.left + leftModifier) + 'px',
            top: (posicionRealSeat.top + topModifier) + 'px',
            'z-index': 1000
        });
        $(tooltipObject).removeClass("hidden");
    };

    thisClass.InPaxSelectednHandler = function (e) {
        var fieldset = e.currentTarget;
        this.paxObjectSelected = $(fieldset).find('input');
        var paxNum = this.paxObjectSelected.attr("data_paxid");
        var typePax = this.paxObjectSelected.attr('pax_type');

        $("fieldset[data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").attr("data-Element", "passengerFieldButton");
        this.paxObjectSelected.addClass("checked");

        $("input[type='radio'][data_paxid]:checked").removeAttr("checked");
        $("input[type='radio'][data_paxid=" + paxNum + "][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").attr("checked", "checked");
        $("li[data-listpaxli]").removeClass("pulsado");
        $("li[data-listpaxli][data-passenger-id=" + paxNum + "][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").addClass("pulsado");

        if (this.typePaxSelected != typePax && !($("#noChooseSeats").hasClass("sectionSelected")))
            this.RepaintSeatMap(typePax);
        this.typePaxSelected = typePax;
    };

    thisClass.AddAssignedSeats = function () {
        var self = this;
        $.each(this.arraySeatPax, function (i, seat) {
            if (seat.data_type.toLowerCase() != "xl")
                $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", "icon icoRoundSeat_select");
            else
                $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", "icon icoRoundSeat_select_xl");
            self.UpdatePaxsList(seat, seat.data_pax);
        });
    };

    thisClass.CheckSeatMapCorrectSeats = function () {
        var seatList = $('div[data-mapplane]').find('a[data_assignable=true]');
        $(seatList).each(function (i, item) {
            var ico = $(item).attr('class');
            if (ico.indexOf("icoSeatOpacity") > 0)
                $(item).attr('data_assignable', false);
        });
    };

    thisClass.SetNextPaxSelected = function (paxIdActual) {
        var paxid = eval(paxIdActual) + 1;
        var itemOld = "";
        $("fieldset[data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").each(function (i, item) {
            if (itemOld != "" && paxIdActual == itemOld.getAttribute("data-passenger-id")) {
                try {
                    item.click();
                } catch (e) {//fix safari
                    var a = item;
                    var evObj = document.createEvent('MouseEvents');
                    evObj.initMouseEvent('click', true, true, window);
                    a.dispatchEvent(evObj);
                }
            }
            itemOld = item;
        });
        if (paxid < this.arraySeatPax.length) {
            $("input[type='radio'][data_paxid=" + paxid + "][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").attr("checked", "checked");
        }
        else {
            var seg = this.data_segment + 1,
                jou = this.data_journey;
            if ($('[data-route][data-journey="' + jou + '"][data-segment="' + seg + '"]').length <= 0) {
                seg = 0;
                jou++;
            }
            if (jou < parseInt(this.NumTotalJourneys)) {
                $('input[data_journey="' + jou + '"][data_segment="' + seg + '"][data_paxid="0"]').click();
            } else {
                this.ScrollToNextContent();
            }
        }
    };

    thisClass.MoveScrollBarToSelectedPax = function () {
        var paxid = $(this.paxObjectSelected).attr("data_paxid");
        if (paxid > 3) {
            var itemLi = $("[data-route][data-journey=" + this.data_journey + "][data-segment=" + this.data_segment + "] [class='scrollDefault'] [data-listpaxli][data-passenger-id=" + (paxid - 1) + "]").first();
            var itemHeight = itemLi.height() +
            parseFloat(itemLi.cssUnit("margin-top")[0]) +
            parseFloat(itemLi.cssUnit("border-top-width")[0]) +
            parseFloat(itemLi.cssUnit("border-bottom-width")[0]) +
            parseFloat(itemLi.cssUnit("padding-top")[0]) +
            parseFloat(itemLi.cssUnit("padding-bottom")[0]);

            $("[data-route][data-journey=" + this.data_journey + "][data-segment=" + this.data_segment + "] [class='scrollDefault']").animate({ scrollTop: (itemHeight * (paxid - 3)) });
        }
    };

    thisClass.AddNewSeatSelected = function (seat) {
        var typeSeat = "icoRoundSeat_select";
        if ($(seat).attr("data_seat_type").toLowerCase() == "xl")
            typeSeat = "icoRoundSeat_select_xl";
        this.SeatIconAssign(seat, "icon " + typeSeat);
        this.AssignToArrayForm(seat);
        this.ChangeLabelPaxSeat(seat);
    };

    thisClass.getFirstPaxId = function () {
        var section = $('div.sectionSolid').not('.hidden').not('.colHalf_1').not('.colHalf_2').find('div.contentScroll').first();
        var inputPax = $(section).find('input').first();
        var paxid = $(inputPax).attr('data_paxid');
        return paxid;
    };

    return thisClass;
};

VUELING.Class.SelectSeatBaseVertical = function () {
    var parent = VUELING.Class.SelectSeatBase(),
        thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();
    };

    thisClass.ShowMessageAlertInfantSeat = function (e) {
        var posicionRealSeat = { left: 0, top: 0 },
            leftModifier = 0,
            topModifier = 0,
            tooltipObject = $("#" + this.SeatPaxSelectedHoverInfantId + "[data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']")[0],
            popUpWidth = $(tooltipObject).find(".detailSeatLayer").width(),
            popUpInnerContainer = $(tooltipObject).find(".detailSeatLayer");

        if (popUpInnerContainer.hasClass("detailSeatLayer--izq")) {
            popUpInnerContainer.attr("class", "detailSeatLayer layerAlert");
        }

        var realSeat = $(e.currentTarget).closest('td');
        posicionRealSeat = realSeat.position();
        posicionRealSeat.left = posicionRealSeat.left + realSeat.width();
        posicionRealSeat.top = posicionRealSeat.top;
        leftModifier = 21;
        topModifier = -4;

        // Display popup to the left
        var column = $(e.currentTarget).attr("data_row");
        if (column === 'D' || column === 'E' || column === 'F') {
            leftModifier -= (popUpWidth + 74);
            popUpInnerContainer.attr("class", "detailSeatLayer detailSeatLayer--izq layerAlert");
        }

        $(tooltipObject).css({
            position: 'absolute',
            left: (posicionRealSeat.left + leftModifier) + 'px',
            top: (posicionRealSeat.top + topModifier) + 'px',
            'z-index': 1000
        });
        $(tooltipObject).removeClass("hidden");
    };

    thisClass.InPaxSelectednHandler = function (e) {
        var fieldset = e.currentTarget;
        this.paxObjectSelected = $(fieldset).find('input');
        var paxNum = this.paxObjectSelected.attr("data_paxid");
        var typePax = this.paxObjectSelected.attr('pax_type');

        $("fieldset[data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").attr("data-Element", "passengerFieldButton");
        this.paxObjectSelected.addClass("checked");

        $("input[type='radio'][data_paxid=" + paxNum + "][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").attr("checked", "checked");
        $("li[data-listpaxli]").removeClass("pulsado");
        $("li[data-listpaxli][data-passenger-id=" + paxNum + "][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").addClass("pulsado");

        if (this.typePaxSelected != typePax && !($("#noChooseSeats").hasClass("sectionSelected")))
            this.RepaintSeatMap(typePax);
        this.typePaxSelected = typePax;
    };

    thisClass.AddAssignedSeats = function () {
        var self = this;
        $.each(this.arraySeatPax, function (i, seat) {
            $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", "asiento ocupado");
            self.UpdatePaxsList(seat, seat.data_pax);
        });
    };

    thisClass.CheckSeatMapCorrectSeats = function () {
        $('div[data-mapplane] a[data_assignable=true].vacio').each(function () { $(this).attr('data_assignable', false); });
    };

    thisClass.SetNextPaxSelected = function (paxIdActual) {
        var paxid = eval(paxIdActual) + 1;
        var itemOld = "";
        $("fieldset[data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").each(function (i, item) {
            if (itemOld != "" && paxIdActual == itemOld.getAttribute("data-passenger-id")) {
                try {
                    item.click();
                } catch (e) {//fix safari
                    var a = item;
                    var evObj = document.createEvent('MouseEvents');
                    evObj.initMouseEvent('click', true, true, window);
                    a.dispatchEvent(evObj);
                }
            }
            itemOld = item;
        });
        if (paxid < this.arraySeatPax.length) {
            $("input[type='radio'][data_paxid=" + paxid + "][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").attr("checked", "checked");
            this.paxObjectSelected = $("input[type='radio'][data_paxid=" + paxid + "][data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]");
        }
        else {
            var seg = this.data_segment + 1,
                jou = this.data_journey;
            if ($('[data-route][data-journey="' + jou + '"][data-segment="' + seg + '"]').length <= 0) {
                seg = 0;
                jou++;
            }
            if (jou < parseInt(this.NumTotalJourneys)) {
                $('input[data_journey="' + jou + '"][data_segment="' + seg + '"][data_paxid="0"]').click();
                $('a[data-paxbutton][data-journey="' + jou + '"][data-segment="' + seg + '"]').click();
            } else {
                this.ScrollToNextContent();
            }
        }
    };

    thisClass.MoveScrollBarToSelectedPax = function () {
        var paxid = $(this.paxObjectSelected).attr("data_paxid");
        var paxElement = $('li[data-passenger-id="' + paxid + '"][idsegment="' + this.data_segment + '"][idjourney="' + this.data_journey + '"]');
        var paxParent = paxElement.parents('div.contentScroll');
        var pos = paxElement.offset().top - paxParent.offset().top;
        paxParent.animate({ scrollTop: pos });
    };

    thisClass.AddNewSeatSelected = function (seat) {
        this.SeatIconAssign(seat, "asiento ocupado");
        this.AssignToArrayForm(seat);
        this.ChangeLabelPaxSeat(seat);
    };

    thisClass.getFirstPaxId = function () {
        var section = $('div[data-journey="' + this.data_journey + '"][data-segment="' + this.data_segment + '"][data-id-part="head"]').first();
        var inputPax = $(section).find('input').first();
        var paxid = $(inputPax).attr('data_paxid');
        return paxid;
    };

    return thisClass;
};
