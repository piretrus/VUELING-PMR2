VUELING.Class.SelectSeatCheckin = function (visualizationType) {
    var parent = null;
    switch (visualizationType) {
        case "Horizontal":
            parent = VUELING.Class.SelectSeatBaseHorizontal();
            break;
        case "Vertical":
            parent = VUELING.Class.SelectSeatBaseVertical();
            break;
    }
    var selectSeatCheckin = SKYSALES.Util.extendObject(parent);

    //#region Properties
    selectSeatCheckin.ManageToolTipMaster = new VUELING.Class.ManageToolTip();
    selectSeatCheckin.ManageToolTipSlave = new VUELING.Class.ManageToolTip();

    selectSeatCheckin.CheckinSeatsPricesManager = VUELING.Util.getObjectInstance("SeatsPricesDisplayManager");

    selectSeatCheckin.arrayNewSeatSelection = {};
    selectSeatCheckin.BehaviorMaster = '';
    selectSeatCheckin.DivOriginInfoToolTipMaster = '';
    selectSeatCheckin.SpanTooltipMaster = '';
    selectSeatCheckin.IdMasterLink = '';
    selectSeatCheckin.IdMasterButton = '';
    selectSeatCheckin.DivOriginInfoToolTipSlave = '';
    selectSeatCheckin.SpanTooltipSlave = '';
    selectSeatCheckin.IdSlaveLink = '';
    selectSeatCheckin.IdSlaveButton = '';
    selectSeatCheckin.TextSeleccionarAsientosVuelta = '';
    selectSeatCheckin.ToolTipMessageSeleccionarAsientosVuelta = '';
    selectSeatCheckin.ToolTipMessageGenerarTarjetasEmbarque = '';
    selectSeatCheckin.ToolTipMessageContinuarPago = '';
    selectSeatCheckin.FollowingWithPaymentBTN = '';
    selectSeatCheckin.SelectMessageUnderButtonID = '';
    selectSeatCheckin.SelectMessageUnderButtonSlaveID = '';
    selectSeatCheckin.GenerateBoardingCardMessageMaster = "";
    selectSeatCheckin.GenerateBoardingCardMessageSlave = "";
    selectSeatCheckin.TextSeleccionarAsientosTrayectoSiguiente = '';
    selectSeatCheckin.IsLastJourney = '';
    selectSeatCheckin.btnNoChooseSeatsId = '';
    selectSeatCheckin.btnPaySeatsId = '';
    selectSeatCheckin.btnNoChooseSeats = '';
    selectSeatCheckin.btnPaySeats = '';

    //#endregion Properties

    selectSeatCheckin.init = function (json) {
        parent.init.call(this, json);
    };

    selectSeatCheckin.initObject = function () {
        parent.initObject.call(this);
        this.EnableDesableButtons();
        this.checkAmountAndUpdateTexts();
        var jsonAssing = $("#" + this.jsonSeatAssign + this.paxObjectSelected.attr("data_journey") + this.paxObjectSelected.attr("data_segment"));
        jsonAssing.val("{arraySeatPax:" + JSON.stringify(this.arrayNewSeatSelection) + "}");
    };

    selectSeatCheckin.addEvents = function () {
        parent.addEvents.call(this);
        this.EventsForAssignSeats();
        this.EventsForFieldset();
        this.EventsForButtonsPaxSections();
        this.EventsForListPaxDelete();
        this.EventsForPaySeatsAndFreeSeatsSection();
        this.EventsOnInit();
    };

    //#region Events

    selectSeatCheckin.EventsForPaySeatsAndFreeSeatsSection = function () {
        this.EventsForPaySeatsSection();
        this.EventsForFreeSeatsSection();
    };

    selectSeatCheckin.EventsForPaySeatsSection = function () {
        var self = this;
        this.btnPaySeats = $('#' + this.btnPaySeatsId);
        this.btnPaySeats.click(function (e) { self.ShowSeatMap(e); });
    };

    selectSeatCheckin.EventsForFreeSeatsSection = function () {
        var self = this;
        if (this.showFreeSeats) {
            if ($('#' + this.btnNoChooseSeatsId).length > 0) {
                this.btnNoChooseSeats = $('#' + this.btnNoChooseSeatsId);
                this.btnNoChooseSeats.click(function (e) { self.SeatAutoAssignHandler(e); });
            }
        }
    };

    selectSeatCheckin.EventsForAssignSeats = function () {
        var self = this;
        $("a[data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").unbind("click");
        $("a[data_journey=" + this.data_journey + "][data_segment=" + this.data_segment + "]").click(function (e) { self.SeatAssignHandler(e); });
    };

    selectSeatCheckin.EventsForFieldset = function () {
        var self = this;
        $("[data-listpaxli][data-passenger-id][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]").click(function (e) { self.InPaxSelectednHandler(e); });
    };

    selectSeatCheckin.EventsForButtonsPaxSections = function () {
        var self = this;
        $("a[data-PaxButton][data-journey='" + this.data_journey + "'][data-segment='" + this.data_segment + "']").click(function (e) { self.buttonsPaxSectionsHandler(e); });
    };

    selectSeatCheckin.EventsForListPaxDelete = function () {
        var self = this;
        $(".seatInfo[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'] a.seatButton").unbind("click");
        $(".seatInfo[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'] a.seatButton").click(function (e) { self.PaxSeatDelete(e); });
    };

    selectSeatCheckin.EventsOnInit = function () {
        this.ScrollToSeatMap();
    };
    //#endregion Events

    selectSeatCheckin.SeatAutoAssignHandler = function (e) {
        //Control en caso de conexión solo limpiamos una vez
        if (this.data_segment == 0) {
            this.CheckinSeatsPricesManager.ClearSeatSelection();
        }

        $('div#iconSeatMap').attr("class", "icon icoSeat_grey marginRight5 floatLeft marginTop10");

        this.SetLabelText("lblContainerPaxListSeatMap", "textAleatorio");

        if ($("span#lblContainerPaxListSeatMap").hasClass("fs_14")) {
            $("span#lblContainerPaxListSeatMap").removeClass("fs_14");
            $("span#lblContainerPaxListSeatMap").addClass("fs_13");
        };

        this.ScrollToSeatMap();
        this.ShowSeatMap();
        this.DeselectSeatSection();
        this.SelectNoSeatSection();

        this.btnPaySeats.unbind("click");

        this.ShowBtnMejorarAsientos();
        this.AutoAssignSeat();

        var self = this;
        $.each(this.iconseat, function (i, item) {
            var classCss = self.iconseat[i];
            $("." + classCss.replace(" ", ".") + "[id*='seat'][data_journey='" + self.data_journey + "'][data_segment='" + self.data_segment + "']").addClass("icoSeatOpacity");
        });
        $("a[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "'][data_assignable=true]").unbind("click");
        $(".icon.icoRoundSeat_select[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "']").removeClass("icoSeatOpacity");
        $(".icon.icoRoundSeat_select_xl[data_journey='" + this.data_journey + "'][data_segment='" + this.data_segment + "']").removeClass("icoSeatOpacity");

        //bloqueo el listado de pasajeros
        this.SetListPaxEnabled(false);

        this.actualDataSeatType = 'free';
        //Control en caso de conexión solo limpiamos una vez
        if (this.numSegmentsJourney == (this.data_segment + 1))
            this.RemoveEventAutoAssign();
        this.ShowBtnSelect();
        this.EnableDesableButtons();
        this.updateTextButtons();
    };

    selectSeatCheckin.DeleteSpanNoSeatSelectedAndSeatAssign = function (data_journey, data_seg, data_pax) {
        this.DeleteSpanNoSeatSelected(data_journey, data_seg, data_pax);
        this.DeleteSpanSeatAssign(data_journey, data_seg, data_pax);
    };

    selectSeatCheckin.DeleteSpanSeatAssign = function (data_journey, data_seg, data_pax) {
        $('[data-Element="passengerFieldButton"][idjourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_pax + ']').find('div.seatInfo').find('span.numSeat').remove();
        $('[data-Element="passengerFieldButton"][idjourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_pax + ']').find('div.seatInfo').find('h5').remove();
        $('[data-Element="passengerFieldButton"][idjourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_pax + ']').find('div.seatInfo').find('a.seatButton').remove();
    };

    selectSeatCheckin.ActualizarPaxMenuAutoAssign = function (seatInfoTmp, index) {
        this.arraySeatPax[index].isAutoAssign = "true";
        this.arraySeatPax[index].data_column = seatInfoTmp.getAttribute("data_column");
        this.arraySeatPax[index].data_row = seatInfoTmp.getAttribute("data_row");
        this.arraySeatPax[index].data_price = 0;
        this.arraySeatPax[index].data_type = seatInfoTmp.getAttribute("data_seat_type");
    };

    selectSeatCheckin.RollBackAutoAssignSeats = function () {
        var self = this;
        $.each(this.arrayAutoAssignSeatPax, function (i, seat) {
            var iconToShow = '<span class="floatLeft marginRight4"></span>';
            $('[data-Element="passengerFieldButton"][idJourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('span.col3').html(iconToShow);
            var textToShow = '<span class="seatsPositionName fs_10 txtAlignMiddle displayTableCell"></span>';
            $('[data-Element="passengerFieldButton"][idJourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('span.col3').append(textToShow);

            //Check en los iconos del seatmap.
            var tipoAsiento = $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("data_original_ico");
            $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", tipoAsiento);
            $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("data_assignable", "true");

            for (var i = 0; i < self.arraySeatPax.length; i++) {
                if (self.arraySeatPax[i].data_pax == seat.data_pax) {
                    self.arraySeatPax[i].isAutoAssign = "false";
                    self.arraySeatPax[i].data_row = "";
                    self.arraySeatPax[i].data_column = "";
                }

                $("#" + self.jsonSeatAssign + self.data_journey + self.data_segment).val("{arraySeatPax:" + JSON.stringify(self.arraySeatPax) + "}");

                $('[data-Element="passengerFieldButton"][idJourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').attr('data_row', '');
                $('[data-Element="passengerFieldButton"][idJourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').attr('data_column', '');
                $('[data-Element="passengerFieldButton"][idJourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').attr('data_seatassign', '');
                $('[data-Element="passengerFieldButton"][idJourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div#labelSeatAssigned').text('');
            }
            var seatInfo = $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo');
            self.AddLabelNoNumSeat(seatInfo);
        });

        var seats = $("a[class^='icon icoRoundSeat_']");
        $.each(seats, function (i, s) {
            var icoori = $(s).attr('data_original_ico');
            var icooselected = $(s).attr('class').indexOf("_select");
            if (icooselected == -1)
                $(s).attr('class', icoori);
        });

        this.EventsForAssignSeats();

    };

    selectSeatCheckin.MejorarAsientoHandler = function (e) {
        this.RollBackAutoAssignSeats();

        this.EventsForAssignSeats();
        this.EventsForFreeSeatsSection();

        $('div#AsientoAleatorio').addClass('hidden');
        window.scrollTo(0, 0);
        $("a[id=MejorarAsiento]").unbind("click");
        $("#wantToSelectSeat").unbind("click");
        this.CheckinSeatsPricesManager.ClearSeatSelection();
        $("#" + this.IdMasterLink).parent().removeClass("disableButton");

        this.SetLabelText("lblContainerPaxListSeatMap", "textNoAleatorio");

        this.ShowSeatMap();
        this.DeselectNoSeatSection();
        this.SelectSeatSection();
        this.AssignFirstPax();
        $("#WebCheckinExpressMasterLink").parent().addClass('disableButton');
    };

    selectSeatCheckin.ShowBtnMejorarAsientos = function () {
        var self = this;
        $('div#AsientoAleatorio').removeClass('hidden');
        $("a[id=MejorarAsiento]").click(function (e) { self.MejorarAsientoHandler(e); });
        $("#wantToSelectSeat").click(function (e) { self.MejorarAsientoHandler(e); });
    };

    selectSeatCheckin.PaxSeatDelete = function (e) {
        parent.PaxSeatDelete.call(this, e);
        this.EnableDesableButtons();
    };

    selectSeatCheckin.EnableDesableButtons = function () {
        this.ManageToolTipMaster.DivToolTipId = this.DivOriginInfoToolTipMaster;
        this.ManageToolTipMaster.SpanTooltipId = this.SpanTooltipMaster;
        this.ManageToolTipMaster.LinkId = this.IdMasterLink;
        this.ManageToolTipMaster.SpanId = this.IdMasterButton;

        this.ManageToolTipSlave.DivToolTipId = this.DivOriginInfoToolTipSlave;
        this.ManageToolTipSlave.SpanTooltipId = this.SpanTooltipSlave;
        this.ManageToolTipSlave.LinkId = this.IdSlaveLink;
        this.ManageToolTipSlave.SpanId = this.IdSlaveButton;

        var allSeatPaxAssigned = this.AllSeatPaxAssigned();
        var isEveryPaxSeatAssigned = this.IsEveryPaxSeatAssigned();
        var isLastJourney = this.IsLastJourney;


        if (!allSeatPaxAssigned && !isEveryPaxSeatAssigned && !isLastJourney) {
            if (this.NumTotalJourneys > 2) {
                this.seleccionarAsientosTrayectoSiguiente();
            }
            else {
                this.seleccionarAsientosVuelta();
            }
        }
        else if (allSeatPaxAssigned && isEveryPaxSeatAssigned && !isLastJourney) {
            if (this.NumTotalJourneys > 2) {
                this.seleccionarAsientosTrayectoSiguiente();
            }
            else {
                this.seleccionarAsientosVuelta();
            }
            this.ManageToolTipMaster.enabledLinkBotton(this.BehaviorMaster, '');
            this.ManageToolTipSlave.enabledLinkBotton(this.BehaviorMaster, '');
        }
        else if (!allSeatPaxAssigned && !isEveryPaxSeatAssigned && isLastJourney) {
            var totalAmount = this.GetTotalAmount();

            if (totalAmount > 0) {
                this.continuarConElPago();
            } else if (totalAmount == 0) {
                this.generarTarjetasDeEmbarque();
            }
        }
        else if (allSeatPaxAssigned) {
            this.ManageToolTipMaster.enabledLinkBotton(this.BehaviorMaster, '');
            this.ManageToolTipSlave.enabledLinkBotton(this.BehaviorMaster, '');
        }
    };

    selectSeatCheckin.seleccionarAsientosVuelta = function () {
        this.ManageToolTipMaster.setSpanText(this.TextSeleccionarAsientosVuelta);
        this.ManageToolTipSlave.setSpanText(this.TextSeleccionarAsientosVuelta);

        this.ManageToolTipMaster.disabledLinkBotton();
        this.ManageToolTipSlave.disabledLinkBotton();

        this.ManageToolTipMaster.StartShowinTooltip();
        this.ManageToolTipSlave.StartShowinTooltip();

        this.ManageToolTipMaster.setSpanTooltipText(this.ToolTipMessageSeleccionarAsientosVuelta);
        this.ManageToolTipSlave.setSpanTooltipText(this.ToolTipMessageSeleccionarAsientosVuelta);
    };

    selectSeatCheckin.seleccionarAsientosTrayectoSiguiente = function () {
        this.ManageToolTipMaster.setSpanText(this.TextSeleccionarAsientosTrayectoSiguiente);
        this.ManageToolTipSlave.setSpanText(this.TextSeleccionarAsientosTrayectoSiguiente);

        this.ManageToolTipMaster.disabledLinkBotton();
        this.ManageToolTipSlave.disabledLinkBotton();

        this.ManageToolTipMaster.StartShowinTooltip();
        this.ManageToolTipSlave.StartShowinTooltip();

        this.ManageToolTipMaster.setSpanTooltipText(this.ToolTipMessageSeleccionarAsientosVuelta);
        this.ManageToolTipSlave.setSpanTooltipText(this.ToolTipMessageSeleccionarAsientosVuelta);
    };

    selectSeatCheckin.continuarConElPago = function () {
        this.ManageToolTipMaster.disabledLinkBotton();
        this.ManageToolTipSlave.disabledLinkBotton();

        this.ManageToolTipMaster.StartShowinTooltip();
        this.ManageToolTipSlave.StartShowinTooltip();

        this.ManageToolTipMaster.setSpanTooltipText(this.ToolTipMessageContinuarPago);
        this.ManageToolTipSlave.setSpanTooltipText(this.ToolTipMessageContinuarPago);

        $('#' + this.IdSlaveButton).text(this.FollowingWithPaymentBTN);
        $('#' + this.IdMasterButton).text(this.FollowingWithPaymentBTN);

        //$('#' + this.SelectMessageUnderButtonID).show();
        if ($("div#generateTicketsButton").hasClass("hidden")) {
            $('#' + this.SelectMessageUnderButtonID).hide();
        }
        else {
            $('#' + this.SelectMessageUnderButtonID).show();
        }
        $('#' + this.SelectMessageUnderButtonSlaveID).show();
    };

    selectSeatCheckin.generarTarjetasDeEmbarque = function () {
        this.ManageToolTipMaster.disabledLinkBotton();
        this.ManageToolTipSlave.disabledLinkBotton();

        this.ManageToolTipMaster.StartShowinTooltip();
        this.ManageToolTipSlave.StartShowinTooltip();

        this.ManageToolTipMaster.setSpanTooltipText(this.ToolTipMessageGenerarTarjetasEmbarque);
        this.ManageToolTipSlave.setSpanTooltipText(this.ToolTipMessageGenerarTarjetasEmbarque);

        $('#' + this.IdMasterButton).text(this.GenerateBoardingCardMessageMaster);
        $('#' + this.IdSlaveButton).text(this.GenerateBoardingCardMessageSlave);

        $('#' + this.SelectMessageUnderButtonID).hide();
        $('#' + this.SelectMessageUnderButtonSlaveID).hide();
    };

    selectSeatCheckin.checkAmountAndUpdateTexts = function () {
        if (this.IsLastJourney) {
            var totalAmount = this.GetTotalAmount();

            if (totalAmount > 0 && this.IsEveryPaxSeatAssigned()) {
                $('#' + this.IdSlaveButton).text(this.FollowingWithPaymentBTN);
                $('#' + this.IdMasterButton).text(this.FollowingWithPaymentBTN);

                // Caso "Continuar con el pago"
                if ($("div#generateTicketsButton").hasClass("hidden")) {
                    $('#' + this.SelectMessageUnderButtonID).hide();
                }
                else {
                    $('#' + this.SelectMessageUnderButtonID).show();
                }
                $('#' + this.SelectMessageUnderButtonSlaveID).show();
            } else if (totalAmount == 0) {
                $('#' + this.IdMasterButton).text(this.GenerateBoardingCardMessageMaster);
                $('#' + this.IdSlaveButton).text(this.GenerateBoardingCardMessageSlave);

                $('#' + this.SelectMessageUnderButtonID).hide();
                $('#' + this.SelectMessageUnderButtonSlaveID).hide();
            }
            this.EnableDesableButtons()
        }
    };


    selectSeatCheckin.updateTextButtons = function () {
        this.checkAmountAndUpdateTexts();
    };

    selectSeatCheckin.GetTotalAmount = function () {
        return this.CheckinSeatsPricesManager.GetTotalAmount();
    };

    selectSeatCheckin.ShowBtnSelect = function () {
        $('div#generateTicketsButton').removeClass('hidden');

        if (this.GetTotalAmount() > 0 && this.IsLastJourney) {
            $('#' + this.SelectMessageUnderButtonID).show();
        }
    };

    selectSeatCheckin.HiddenBtnSelect = function () {
        $('div#generateTicketsButton').addClass('hidden');
    };

    selectSeatCheckin.CleanSeatmapOfPaxAssignedTemporaly = function () {
        $.each(this.arrayAutoAssignSeatPax, function (i, pax) {
            var seat = $('a[data_paxid="' + pax.data_pax + '"]');
            var seatSegment = $(seat).attr("data_segment");
            if (seat.length > 0 && seatSegment == pax.data_seg) {
                seat.attr('data_assignable', 'true');
                var dataicoorig = seat.attr('data_original_ico');
                seat.attr('class', dataicoorig);
            }
        });
    };

    selectSeatCheckin.InPaxSelectednHandler = function (e) {
        this.ChangeSegmentAndJourney();
        parent.InPaxSelectednHandler.call(this, e);
    };

    selectSeatCheckin.ChangeSegmentAndJourney = function () {
        var obj = $("[data-listpaxflight].sectionSelected [data-route]").not(".hidden");
        var journey = parseInt(obj.attr("data-journey"));
        var segment = parseInt(obj.attr("data-segment"));
        this.buttonsPaxSectionsSelecting(journey, segment);
    };

    selectSeatCheckin.buttonsPaxSectionsHandler = function (e) {
        $("[data-listpaxli][data-passenger-id='0'][idjourney='" + this.data_journey + "'][idsegment='" + this.data_segment + "']").click();
    };

    selectSeatCheckin.buttonsPaxSectionsSelecting = function (originJourney, originSegment) {
        parent.buttonsPaxSectionsSelecting.call(this, originJourney, originSegment);
    };

    selectSeatCheckin.ShowSeatMap = function () {
        parent.ShowSeatMap.call(this);
        this.ShowBtnSelect();
        this.SelectSeatSection(this.Tarifa);
        this.DeselectNoSeatSection();
        this.ScrollToSeatMap();
        this.ShowOrHideA319();
        this.AssignFirstPax();
    };

    selectSeatCheckin.HiddenSeatMap = function () {
        parent.HiddenSeatMap.call(this);
        this.HiddenBtnSelect();
    };

    selectSeatCheckin.SeatAssignHandler = function (e) {
        if ($(e.currentTarget).attr("data_assignable") == "true") {
            parent.SeatAssignHandler.call(this, e);

            var seatInput = e.currentTarget;

            var seatType = $(seatInput).attr('data_seat_type');
            var journeyIndex = $(seatInput).attr('data_journey');
            var segmentIndex = $(seatInput).attr('data_segment');
            var paxId = $(seatInput).attr('data_paxid');
            var sPrice = $(seatInput).attr('data_price') == "" ? 0 : $(seatInput).attr('data_price');
            var seatPrice = parseFloat(sPrice);
            var nextSegment = parseInt(segmentIndex) + 1;

            this.CheckinSeatsPricesManager.NewSeatSelection(seatType, journeyIndex, segmentIndex, paxId, seatPrice);

            /*if (this.Tarifa == "Basic") {
                var linkDelete = '';//'<a href="#" class="seatButton">' + this.labelDelete + '</a>';
                $('[data-Element="passengerFieldButton"][idJourney=' + journeyIndex + '][idSegment=' + segmentIndex + '][data-passenger-id=' + paxId + ']').find('.seatInfo').append(linkDelete);
                var self = this;
                $(".seatInfo[data_paxid='" + paxId + "'][data_journey='" + journeyIndex + "'][data_segment='" + segmentIndex + "'] a.seatButton").click(function (e) { self.PaxSeatDelete(e); });
            }*/

            if ($("div.avion[data-segment=" + nextSegment + "]").size() > 0 && this.AllSeatsSelectedForCurrentSegment(segmentIndex)) {
                $('html, body').animate({ scrollTop: $("div.avion[data-segment=" + nextSegment + "]").offset().top - 100 }, 1000);
            }
            this.updateTextButtons();
            this.EnableDesableButtons();           
        }
    };

    selectSeatCheckin.SeatMapShowHandler = function (e) {
        var div = e.currentTarget;
        if (div.attributes["data-seat-type"] != undefined && div.attributes["data-seat-type"].value != 'free' && this.actualDataSeatType == 'free') {
            this.actualDataSeatType = div.attributes["data-seat-type"].value;
        }

        parent.SeatMapShowHandler.call(this, e);
    };

    selectSeatCheckin.UpdateCurrentSelectedSeats = function (seats, showTooltip) {
        this.CheckinSeatsPricesManager.DeleteArraySeatsInput(seats);
    };

    selectSeatCheckin.ScrollToSeatMap = function () {
        if (!VUELING.Util.IsIe() || VUELING.Util.IsIe() > 8)
            parent.ScrollToSeatMap.call(this);
    };

    selectSeatCheckin.AssignFirstPax = function () {
        var firstPaxId = this.getFirstPaxId();
        this.paxObjectSelected = $("input[id='typeRadioPax_" + firstPaxId + "_" + this.data_journey + "_" + this.data_segment + "']");
        $(this.paxObjectSelected).attr("checked", "checked");
        var lifirstPax = $("li[data-passenger-id=" + firstPaxId + "][idjourney=" + this.data_journey + "][idsegment=" + this.data_segment + "]");
        $(lifirstPax).click();
    };

    return selectSeatCheckin;
};

VUELING.Class.SelectSeatCheckinHorizontal = function () {
    var parent = VUELING.Class.SelectSeatCheckin("Horizontal"),
       thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.DeleteSpanNoSeatSelected = function (data_journey, data_seg, data_pax) {
        //borramos span de no hay asiento seleccionado y lo eliminamos
        $('[data-Element="passengerFieldButton"][idjourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_pax + ']').find('div.seatInfo').find('span.no.numSeat').remove();
    };

    thisClass.AutoAssignSeat = function () {
        this.CleanSeatmapOfPaxAssignedTemporaly();
        var self = this;
        $.each(this.arrayAutoAssignSeatPax, function (i, seat) {
            if (self.IsSeatNotSelected(seat.data_column, seat.data_row)) {

                self.DeleteSpanNoSeatSelectedAndSeatAssign(seat.data_journey, seat.data_seg, seat.data_pax);

                //añadimos span con numero de asiento
                var spanNumSeat = '<span class="numSeat">' + seat.data_column + seat.data_row + '</span>';
                $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo').append(spanNumSeat);

                //añadimos icono y texto descriptivo
                var seattype = self.GetIcoToShow(seat.data_column, seat.data_row);
                $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo').append(seattype);
                var tipoasiento = $('a[data_journey=' + seat.data_journey + '][data_segment=' + seat.data_seg + '][data_row=' + seat.data_row + '][data_column=' + seat.data_column + ']').attr("data_seat_type");
                var text = self.GetTypeTextSeatDescription(tipoasiento);
                $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo').find('h5').text(text);
            }

            if (seat.data_type.toLowerCase() != "xl")
                $("a[data_journey=" + seat.data_journey + "][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", "icon icoRoundSeat_select");
            else
                $("a[data_journey=" + seat.data_journey + "][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", "icon icoRoundSeat_select_xl");
            $("a[data_journey=" + seat.data_journey + "][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("data_assignable", "false");
            var itemOld = "", item = "";
            var isAutoAssign = true;
            var arraySeatPaxLength = self.arraySeatPax.length;
            for (var i = 0; i < arraySeatPaxLength; i++) {
                item = self.arraySeatPax[i];

                itemOld = self.GetOriginalSeatSelected(item, itemOld, isAutoAssign);
                if (self.arraySeatPax[i].data_pax == seat.data_pax) {
                    var seatInfoTmp = self.GetSeatFromSegRowColumn(seat.data_row, seat.data_column);
                    self.ActualizarPaxMenuAutoAssign(seatInfoTmp, i);
                }
            }

            $("#" + self.jsonSeatAssign + self.data_journey + self.data_segment).val("{arraySeatPax:" + JSON.stringify(self.arraySeatPax) + "}");
            //self.SetServices(true);
            self.ActualizarPaxMenu(seat);

            var seatType = seat.data_type;
            var journeyIndex = seat.data_journey;
            var segmentIndex = seat.data_seg;
            var paxId = seat.data_pax;
            var seatPrice = parseFloat(seat.data_price);

            self.CheckinSeatsPricesManager.NewSeatSelection(seatType, journeyIndex, segmentIndex, paxId, seatPrice);
        });
    };

    return thisClass;
};

VUELING.Class.SelectSeatCheckinVertical = function () {
    var parent = VUELING.Class.SelectSeatCheckin("Vertical"),
       thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.DeleteSpanNoSeatSelected = function (data_journey, data_seg, data_pax) {
        //borramos span de no hay asiento seleccionado y lo eliminamos
        $('[data-Element="passengerFieldButton"][idjourney=' + data_journey + '][idSegment=' + data_seg + '][data-passenger-id=' + data_pax + ']').find('div.seatInfo').empty();
    };

    thisClass.AutoAssignSeat = function () {
        this.CleanSeatmapOfPaxAssignedTemporaly();
        var self = this;
        $.each(this.arrayAutoAssignSeatPax, function (i, seat) {
            if (self.IsSeatNotSelected(seat.data_column, seat.data_row)) {

                self.DeleteSpanNoSeatSelectedAndSeatAssign(seat.data_journey, seat.data_seg, seat.data_pax);

                //añadimos span con numero de asiento
                var spanNumSeat = '<span class="numSeat">' + seat.data_column + seat.data_row + '</span>';
                $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo').append(spanNumSeat);

                //añadimos icono y texto descriptivo
                var seattype = self.GetIcoToShow(seat.data_column, seat.data_row);
                $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo').append(seattype);
                var tipoasiento = $('a[data_journey=' + seat.data_journey + '][data_segment=' + seat.data_seg + '][data_row=' + seat.data_row + '][data_column=' + seat.data_column + ']').attr("data_seat_type");
                var text = self.GetTypeTextSeatDescription(tipoasiento);
                $('[data-Element="passengerFieldButton"][idjourney=' + seat.data_journey + '][idSegment=' + seat.data_seg + '][data-passenger-id=' + seat.data_pax + ']').find('div.seatInfo').find('h5').text(text);
            }

            $("a[data_journey='" + seat.data_journey + "'][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("class", "asiento ocupado");
            self.UpdatePaxsList(seat, seat.data_pax);
            $("a[data_journey=" + seat.data_journey + "][data_segment='" + seat.data_seg + "'][data_row='" + seat.data_row + "'][data_column='" + seat.data_column + "']").attr("data_assignable", "false");
            var itemOld = "", item = "";
            var isAutoAssign = true;
            var arraySeatPaxLength = self.arraySeatPax.length;
            for (var i = 0; i < arraySeatPaxLength; i++) {
                item = self.arraySeatPax[i];

                itemOld = self.GetOriginalSeatSelected(item, itemOld, isAutoAssign);
                if (self.arraySeatPax[i].data_pax == seat.data_pax) {
                    var seatInfoTmp = self.GetSeatFromSegRowColumn(seat.data_row, seat.data_column);
                    self.ActualizarPaxMenuAutoAssign(seatInfoTmp, i);
                }
            }

            $("#" + self.jsonSeatAssign + self.data_journey + self.data_segment).val("{arraySeatPax:" + JSON.stringify(self.arraySeatPax) + "}");
            //self.SetServices(true);
            self.ActualizarPaxMenu(seat);

            var seatType = seat.data_type;
            var journeyIndex = seat.data_journey;
            var segmentIndex = seat.data_seg;
            var paxId = seat.data_pax;
            var seatPrice = parseFloat(seat.data_price);

            self.CheckinSeatsPricesManager.NewSeatSelection(seatType, journeyIndex, segmentIndex, paxId, seatPrice);
        });
    };

    return thisClass;
};
