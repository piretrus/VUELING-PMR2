

VUELING.Class.CheckinExpress = function () {
    var parent = SKYSALES.Class.SkySales(), checkinExpress = SKYSALES.Util.extendObject(parent);

    checkinExpress.ManageButtons = VUELING.Util.getObjectInstance("ManageButtonsAndTooltipsByPaxsChecks");

    checkinExpress.CheckinExpressWarning = VUELING.Util.getObjectInstance("CheckinExpressWarning");

    checkinExpress.hrefSeatSelection = '';
    checkinExpress.hrefBoardingCardGeneration = '';

    checkinExpress.IdGenerateTicketMasterDiv = '';
    checkinExpress.IdServicesSlaveDiv = '';
    checkinExpress.IdSelectSeatMasterDiv = '';
    checkinExpress.IdSelectSeatSlaveDiv = '';

    checkinExpress.IdIcoDropDownLink = '';

    checkinExpress.IdMasterButton = '';
    checkinExpress.IdSlaveButton = '';
    checkinExpress.IdMasterLink = '';
    checkinExpress.IdSlaveLink = '';

    checkinExpress.idTablePaxSeats = '';
    checkinExpress.idTablePaxNames = '';

    checkinExpress.classButtonId = '';
    checkinExpress.classTypeCheck = '';

    checkinExpress.SelectSeatTitle = '';
    checkinExpress.BoardingCardGenerationTitle = '';
    checkinExpress.NextTitle = '';

    checkinExpress.checkNamePrefix = '';
    checkinExpress.checkSelectAllPaxTrayectos = '';

    checkinExpress.DivOriginInfoToolTipMaster = '';
    checkinExpress.DivOriginInfoToolTipSlave = '';

    checkinExpress.SelectFollowMessageID = '';
    checkinExpress.SelectNewSeatMessageID = '';
    checkinExpress.SelectFollowMessageSlaveID = '';

    checkinExpress.paxCount = '';
    checkinExpress.existsAtLeastOneSeatDesignatorEmpty = '';
    checkinExpress.isAllSeatDesignatorEmpty = '';

    checkinExpress.ToolTipGenerateBoardingCardMessageClass = '';
    checkinExpress.ToolTipSelectSeatMessageClass = '';

    checkinExpress.allJourneysHasExeptions = '';
    checkinExpress.journeyIdaHasExeptions = '';
    checkinExpress.journeyVueltaHasExeptions = '';

    checkinExpress.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    checkinExpress.initObject = function () {
        checkinExpress.ManageWarningMessages();

        //Inicialización objeto ManageButtons
        checkinExpress.ManageButtons = new VUELING.Class.ManageButtonsAndTooltipsByPaxsChecks();

        checkinExpress.ManageButtons.hrefSeatSelection = checkinExpress.hrefSeatSelection;
        checkinExpress.ManageButtons.hrefBoardingCardGeneration = checkinExpress.hrefBoardingCardGeneration;

        checkinExpress.ManageButtons.MasterDivToolTipId = checkinExpress.DivOriginInfoToolTipMaster;
        checkinExpress.ManageButtons.MasterSpanId = checkinExpress.IdMasterButton;
        checkinExpress.ManageButtons.MasterLinkId = checkinExpress.IdMasterLink;

        checkinExpress.ManageButtons.SlaveDivToolTipId = checkinExpress.DivOriginInfoToolTipSlave;
        checkinExpress.ManageButtons.SlaveLinkId = checkinExpress.IdSlaveLink;
        checkinExpress.ManageButtons.SlaveSpanId = checkinExpress.IdSlaveButton;

        checkinExpress.ManageButtons.SelectSeatTitle = checkinExpress.SelectSeatTitle;
        checkinExpress.ManageButtons.BoardingCardGenerationTitle = checkinExpress.BoardingCardGenerationTitle;
        checkinExpress.ManageButtons.NextTitle = checkinExpress.NextTitle;

        checkinExpress.ManageButtons.checkNamePrefix = checkinExpress.checkNamePrefix;
        checkinExpress.ManageButtons.checkSelectAllPaxTrayectos = checkinExpress.checkSelectAllPaxTrayectos;

        checkinExpress.ManageButtons.SelectFollowMessageID = checkinExpress.SelectFollowMessageID;
        checkinExpress.ManageButtons.SelectNewSeatMessageID = checkinExpress.SelectNewSeatMessageID;
        checkinExpress.ManageButtons.SelectFollowMessageSlaveID = checkinExpress.SelectFollowMessageSlaveID;

        checkinExpress.ManageButtons.ToolTipGenerateBoardingCardMessageClass = checkinExpress.ToolTipGenerateBoardingCardMessageClass;
        checkinExpress.ManageButtons.ToolTipSelectSeatMessageClass = checkinExpress.ToolTipSelectSeatMessageClass;

        checkinExpress.ManageButtons.EnableDesableButtonsByPaxsChecks();

        checkinExpress.ShowHideCheckSelectAllChecks();
        checkinExpress.BalanceTablesHeight();
        $(".ToolTipSelectSeatMessage").show();
    };

    checkinExpress.addEvents = function () {
        $(document).on("click", "input[name*='" + checkinExpress.checkNamePrefix + "'][type='checkbox']", checkinExpress.ManageButtons.EnableDesableButtonsByPaxsChecks);
        $(document).on("click", "input[name='" + checkinExpress.checkSelectAllPaxTrayectos + "'][type='checkbox']", checkinExpress.SelectAll);
        $("a[id=icoDropDownLink]").click(checkinExpress.ShowSeatMapHandler);
    };

    checkinExpress.ManageWarningMessages = function () {

        var checksCheckedCount = $("input[name*='" + checkinExpress.checkNamePrefix + "'][type='checkbox']:checked").length;
        if (checksCheckedCount == 0) {
            $("#" + checkinExpress.SelectNewSeatMessageID).hide();
        }

        var checksValueEmptyCount = 0;
        var checksValueNotEmptyCount = 0;

        var checksCount = $("input[name*='" + checkinExpress.checkNamePrefix + "'][type='checkbox']").length;
        var checks = $("#" + checkinExpress.idTablePaxSeats + " input[type='checkbox']");

        $(checks).each(function () {
            if ($.trim($(this).val()) != "") checksValueNotEmptyCount += 1;
            else checksValueEmptyCount += 1;
        });

        if (checkinExpress.allJourneysHasExeptions == "false" && checksValueEmptyCount > 0) {
            checkinExpress.CheckinExpressWarning.showContent(checkinExpress.journeyIdaHasExeptions, checkinExpress.journeyVueltaHasExeptions);
        }

        if (checksCount == 0) {
            $("#" + checkinExpress.IdGenerateTicketMasterDiv).hide();
            $("#" + checkinExpress.IdServicesSlaveDiv).hide();
            $("#" + checkinExpress.IdSelectSeatMasterDiv).hide();
            $("#" + checkinExpress.IdSelectSeatSlaveDiv).hide();
            $("#" + checkinExpress.SelectNewSeatMessageID).hide();
            $("#" + checkinExpress.checkSelectAllPaxTrayectos).parent().hide();

            return;
        }

        if (checksValueEmptyCount == checksCount) {
            $(":checkbox").each(function () {
                if (this.name.toString().indexOf(checkinExpress.checkNamePrefix) !== -1 && this.disabled != true)
                    this.checked = true;
            });
        }

        if (checksValueNotEmptyCount == checksCount) {
            $(":checkbox").each(function () {
                if (this.name.toString().indexOf(checkinExpress.checkNamePrefix) !== -1 && this.disabled != true)
                    this.checked = true;
            });
        }
    };

    checkinExpress.SelectAll = function () {
        var checkedStatus = this.checked;

        $(":checkbox").each(function () {
            if (this.name.toString().indexOf(checkinExpress.checkNamePrefix) !== -1 && this.disabled != true)
                this.checked = checkedStatus;
        });

        checkinExpress.ManageButtons.EnableDesableButtonsByPaxsChecks();
    };

    checkinExpress.ShowHideCheckSelectAllChecks = function () {

        var checksCount = $("input[name*='" + checkinExpress.checkNamePrefix + "'][type='checkbox']").length;
        var checksCheckedCount = $("input[name*='" + checkinExpress.checkNamePrefix + "'][type='checkbox']:checked").length;

        if (checkinExpress.isAllSeatDesignatorEmpty == "true" && checksCount == checksCheckedCount)
            return;

        var checksDisabledCount = $("input[name*='" + checkinExpress.checkNamePrefix + "'][type='checkbox']:disabled").length;

        if (checksCount == checksDisabledCount) {
            $('#' + checkinExpress.checkSelectAllPaxTrayectos).parent().hide();
        } else if (checkinExpress.paxCount > 3) {
            var checksEnabledCount = checksCount - checksDisabledCount;

            if (checkinExpress.existsAtLeastOneSeatDesignatorEmpty == "true" || checksEnabledCount != checksCount) {
                $('#' + checkinExpress.checkSelectAllPaxTrayectos).attr('checked', false);
            }
        }
    };

    checkinExpress.ShowSeatMapHandler = function (e) {
        if ($('div#wrapAvionCheckin').hasClass('hidden')) {
            checkinExpress.ShowSeatMap();
        }
        else {
            checkinExpress.HiddenSeatMap();
        }
        checkinExpress.ChangeIcoDropDownLink();
        return false;
    };

    checkinExpress.ShowSeatMap = function () {
        $('div#wrapSeatMap').attr('class', 'marginTop10');
        $('div#wrapAvionCheckin').removeClass('hidden');
    };

    checkinExpress.HiddenSeatMap = function () {
        $('div#wrapSeatMap').attr('class', 'marginTop10 hidden');
        $('div#wrapAvionCheckin').addClass('hidden');
    };

    checkinExpress.ChangeIcoDropDownLink = function () {
        var scrollPosition;
        if ($('a#icoDropDownLink').hasClass('active')) {
            $('a#icoDropDownLink').attr('class', 'icoDropDownLink');
            // scrollPosition = $('#mainBody').offset().top;
        } else {
            $('a#icoDropDownLink').attr('class', 'icoDropDownLink active');
            scrollPosition = $('#icoDropDownLink').offset().top;
        }
        $('html, body').animate({ scrollTop: scrollPosition }, 400);
    };

    checkinExpress.BalanceTablesHeight = function () {
        $("#" + checkinExpress.idTablePaxSeats + " tr").each(function (i, el) {
            if (i <= 1) return;

            var heightPaxSeat = $(this).height();
            var heightPaxName = $("#" + checkinExpress.idTablePaxNames + " tr").eq(i).height();

            if (VUELING.Util.IsIe() && VUELING.Util.IsIe() <= 8)
            {
                if ($('td', this).length == 0)
                    return;

                $('td', this).each(function (itd, eltd) {
                    heightPaxSeat = $(this).outerHeight();
                    if ($(this).attr('rowspan') != undefined) {
                        heightPaxSeat = Math.ceil(heightPaxSeat / $(this).attr('rowspan'));
                        return false;
                    }
                });
            }

            if (heightPaxSeat == heightPaxName)
                return;

            if (heightPaxSeat > heightPaxName)
                $("#" + checkinExpress.idTablePaxNames + " tr").eq(i).height(heightPaxSeat);
            else
                $(this).height(heightPaxName);
        });
    };

    return checkinExpress;
};