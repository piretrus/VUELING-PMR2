

VUELING.Class.ManageButtonsAndTooltipsByPaxsChecks = function () {
    var parent = SKYSALES.Class.SkySales(), ManageButtonsAndTooltipsByPaxsChecks = SKYSALES.Util.extendObject(parent);

    ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster = VUELING.Util.getObjectInstance("ManageToolTip");
    ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave = VUELING.Util.getObjectInstance("ManageToolTip");

    ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster = new VUELING.Class.ManageToolTip();
    ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave = new VUELING.Class.ManageToolTip();

    ManageButtonsAndTooltipsByPaxsChecks.hrefSeatSelection = '';
    ManageButtonsAndTooltipsByPaxsChecks.hrefBoardingCardGeneration = '';

    ManageButtonsAndTooltipsByPaxsChecks.MasterDivToolTipId = '';
    ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId = '';
    ManageButtonsAndTooltipsByPaxsChecks.MasterLinkId = '';

    ManageButtonsAndTooltipsByPaxsChecks.SlaveDivToolTipId = '';
    ManageButtonsAndTooltipsByPaxsChecks.SlaveLinkId = '';
    ManageButtonsAndTooltipsByPaxsChecks.SlaveSpanId = '';

    ManageButtonsAndTooltipsByPaxsChecks.SelectSeatTitle = '';
    ManageButtonsAndTooltipsByPaxsChecks.BoardingCardGenerationTitle = '';
    ManageButtonsAndTooltipsByPaxsChecks.NextTitle = '';

    ManageButtonsAndTooltipsByPaxsChecks.checkNamePrefix = '';
    ManageButtonsAndTooltipsByPaxsChecks.checkSelectAllPaxTrayectos = '';

    ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageID = '';
    ManageButtonsAndTooltipsByPaxsChecks.SelectNewSeatMessageID = '';
    ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageSlaveID = '';

    ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass = '';
    ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass = '';

    ManageButtonsAndTooltipsByPaxsChecks.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    ManageButtonsAndTooltipsByPaxsChecks.addEvents = function () {
        $(document).on("click", "input[name*='" + ManageButtonsAndTooltipsByPaxsChecks.checkNamePrefix + "'][type='checkbox']", ManageButtonsAndTooltipsByPaxsChecks.EnableDesableButtonsByPaxsChecks);
        $(document).on("click", "input[name='" + ManageButtonsAndTooltipsByPaxsChecks.checkSelectAllPaxTrayectos + "'][type='checkbox']", ManageButtonsAndTooltipsByPaxsChecks.SelectAll);
    };

    ManageButtonsAndTooltipsByPaxsChecks.EnableDesableButtonsByPaxsChecks = function () {
        var asignados = false;
        var noAsignados = false;

        $("input[name*='" + ManageButtonsAndTooltipsByPaxsChecks.checkNamePrefix + "'][type='checkbox']:checked").each(function () {
            if (($(this).val() == "") || ($(this).val() == undefined)) {
                noAsignados = true;
            } else if (($(this).val() != "") || ($(this).val() != undefined)) {
                asignados = true;
            }
        });

        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass).hide();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass).hide();

        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.DivToolTipId = ManageButtonsAndTooltipsByPaxsChecks.MasterDivToolTipId;
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.LinkId = ManageButtonsAndTooltipsByPaxsChecks.MasterLinkId;
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.SpanId = ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId;

        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.DivToolTipId = ManageButtonsAndTooltipsByPaxsChecks.SlaveDivToolTipId;
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.LinkId = ManageButtonsAndTooltipsByPaxsChecks.SlaveLinkId;
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.SpanId = ManageButtonsAndTooltipsByPaxsChecks.SlaveSpanId;

        var text = $("#" + ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId).text();

        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.setSpanText(text);

        if ((asignados) && (!noAsignados)) {
            ManageButtonsAndTooltipsByPaxsChecks.generarTargetasEmbarque();
        }
        else if ((!asignados) && (noAsignados)) {
            ManageButtonsAndTooltipsByPaxsChecks.escojerAsientos();
        }
        else if ((asignados) && (noAsignados)) {
            ManageButtonsAndTooltipsByPaxsChecks.continuar();
        }
        else if ((!asignados) && (!noAsignados)) {
            ManageButtonsAndTooltipsByPaxsChecks.showTooltip();
        }
    };

    ManageButtonsAndTooltipsByPaxsChecks.generarTargetasEmbarque = function () {
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.enabledLinkBotton(ManageButtonsAndTooltipsByPaxsChecks.hrefBoardingCardGeneration, ManageButtonsAndTooltipsByPaxsChecks.BoardingCardGenerationTitle);
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.enabledLinkBotton(ManageButtonsAndTooltipsByPaxsChecks.hrefBoardingCardGeneration, ManageButtonsAndTooltipsByPaxsChecks.BoardingCardGenerationTitle);

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId).attr("Generation", "true");

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectNewSeatMessageID).show();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass).show();

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageID).hide();
        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageSlaveID).hide();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass).hide();
    };

    ManageButtonsAndTooltipsByPaxsChecks.escojerAsientos = function () {
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.enabledLinkBotton(ManageButtonsAndTooltipsByPaxsChecks.hrefSeatSelection, ManageButtonsAndTooltipsByPaxsChecks.SelectSeatTitle);
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.enabledLinkBotton(ManageButtonsAndTooltipsByPaxsChecks.hrefSeatSelection, ManageButtonsAndTooltipsByPaxsChecks.SelectSeatTitle);

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId).attr("Generation", "false");

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageID).show();
        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageSlaveID).show();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass).show();

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectNewSeatMessageID).hide();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass).hide();
    };

    ManageButtonsAndTooltipsByPaxsChecks.continuar = function () {
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.enabledLinkBotton(ManageButtonsAndTooltipsByPaxsChecks.hrefSeatSelection, ManageButtonsAndTooltipsByPaxsChecks.NextTitle);
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.enabledLinkBotton(ManageButtonsAndTooltipsByPaxsChecks.hrefSeatSelection, ManageButtonsAndTooltipsByPaxsChecks.NextTitle);

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId).attr("Generation", "false");

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageID).show();
        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectFollowMessageSlaveID).show();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass).show();

        $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectNewSeatMessageID).hide();
        $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass).hide();
    };

    ManageButtonsAndTooltipsByPaxsChecks.showTooltip = function () {
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.disabledLinkBotton();
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.disabledLinkBotton();

        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipMaster.StartShowinTooltip();
        ManageButtonsAndTooltipsByPaxsChecks.ManageToolTipSlave.StartShowinTooltip();

        if ($("#" + ManageButtonsAndTooltipsByPaxsChecks.MasterSpanId).attr("Generation") == "true") {
            $("#" + ManageButtonsAndTooltipsByPaxsChecks.SelectNewSeatMessageID).hide();
            $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass).show();
            $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass).hide();
        } else {
            $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipGenerateBoardingCardMessageClass).hide();
            $("." + ManageButtonsAndTooltipsByPaxsChecks.ToolTipSelectSeatMessageClass).show();
        }
    };

    return ManageButtonsAndTooltipsByPaxsChecks;
};