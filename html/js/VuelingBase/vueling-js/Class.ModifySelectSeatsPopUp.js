

VUELING.Class.ModifySelectSeatsPopUp = function () {
    var parent = SKYSALES.Class.SkySales(),
            modifySelectSeatsPopUp = SKYSALES.Util.extendObject(parent);

    modifySelectSeatsPopUp.ManageButtons = VUELING.Util.getObjectInstance("ManageButtonsAndTooltipsByPaxsChecks");

    modifySelectSeatsPopUp.hrefSeatSelection = '';
    modifySelectSeatsPopUp.hrefBoardingCardGeneration = '';

    modifySelectSeatsPopUp.IdMasterButton = '';
    modifySelectSeatsPopUp.IdMasterLink = '';
    modifySelectSeatsPopUp.IdSlaveLink = '';
    modifySelectSeatsPopUp.IdSlaveButton = '';

    modifySelectSeatsPopUp.SelectSeatTitle = '';
    modifySelectSeatsPopUp.BoardingCardGenerationTitle = '';
    modifySelectSeatsPopUp.NextTitle = '';

    modifySelectSeatsPopUp.checkNamePrefix = '';
    modifySelectSeatsPopUp.checkSelectAllPaxTrayectos = '';

    modifySelectSeatsPopUp.DivOriginInfoToolTipMaster = '';
    modifySelectSeatsPopUp.DivOriginInfoToolTipSlave = '';

    modifySelectSeatsPopUp.SelectFollowMessageID = '';
    modifySelectSeatsPopUp.SelectNewSeatMessageID = '';
    modifySelectSeatsPopUp.SelectFollowMessageSlaveID = '';

    modifySelectSeatsPopUp.ToolTipGenerateBoardingCardMessageClass = '';
    modifySelectSeatsPopUp.ToolTipSelectSeatMessageClass = '';


    modifySelectSeatsPopUp.infoLinkId = '';
    modifySelectSeatsPopUp.infoLinkCloseButtonId = '';
    modifySelectSeatsPopUp.infoBoxId = '';
    modifySelectSeatsPopUp.forcedWidth = '500px';
    modifySelectSeatsPopUp.checkNamePrefix = '';
    modifySelectSeatsPopUp.selectAllPaxsLinkId = '';

    modifySelectSeatsPopUp.infoLink = null;
    modifySelectSeatsPopUp.infoLinkCloseButton = null;
    modifySelectSeatsPopUp.blockUI = null;
    modifySelectSeatsPopUp.newSearchCloseButton = null;
    modifySelectSeatsPopUp.selectAllPaxsLink = '';

    modifySelectSeatsPopUp.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    modifySelectSeatsPopUp.initObject = function () {

        modifySelectSeatsPopUp.ManageButtons = new VUELING.Class.ManageButtonsAndTooltipsByPaxsChecks();

        modifySelectSeatsPopUp.ManageButtons.hrefSeatSelection = modifySelectSeatsPopUp.hrefSeatSelection;
        modifySelectSeatsPopUp.ManageButtons.hrefBoardingCardGeneration = modifySelectSeatsPopUp.hrefBoardingCardGeneration;

        modifySelectSeatsPopUp.ManageButtons.MasterDivToolTipId = modifySelectSeatsPopUp.DivOriginInfoToolTipMaster;
        modifySelectSeatsPopUp.ManageButtons.MasterSpanId = modifySelectSeatsPopUp.IdMasterButton;
        modifySelectSeatsPopUp.ManageButtons.MasterLinkId = modifySelectSeatsPopUp.IdMasterLink;

        modifySelectSeatsPopUp.ManageButtons.SlaveDivToolTipId = modifySelectSeatsPopUp.DivOriginInfoToolTipSlave;
        modifySelectSeatsPopUp.ManageButtons.SlaveLinkId = modifySelectSeatsPopUp.IdSlaveLink;
        modifySelectSeatsPopUp.ManageButtons.SlaveSpanId = modifySelectSeatsPopUp.IdSlaveButton;

        modifySelectSeatsPopUp.ManageButtons.SelectSeatTitle = modifySelectSeatsPopUp.SelectSeatTitle;
        modifySelectSeatsPopUp.ManageButtons.BoardingCardGenerationTitle = modifySelectSeatsPopUp.BoardingCardGenerationTitle;
        modifySelectSeatsPopUp.ManageButtons.NextTitle = modifySelectSeatsPopUp.NextTitle;

        modifySelectSeatsPopUp.ManageButtons.checkNamePrefix = modifySelectSeatsPopUp.checkNamePrefix;
        modifySelectSeatsPopUp.ManageButtons.checkSelectAllPaxTrayectos = modifySelectSeatsPopUp.checkSelectAllPaxTrayectos;

        modifySelectSeatsPopUp.ManageButtons.SelectFollowMessageID = modifySelectSeatsPopUp.SelectFollowMessageID;
        modifySelectSeatsPopUp.ManageButtons.SelectNewSeatMessageID = modifySelectSeatsPopUp.SelectNewSeatMessageID;
        modifySelectSeatsPopUp.ManageButtons.SelectFollowMessageSlaveID = modifySelectSeatsPopUp.SelectFollowMessageSlaveID;

        modifySelectSeatsPopUp.ManageButtons.ToolTipGenerateBoardingCardMessageClass = modifySelectSeatsPopUp.ToolTipGenerateBoardingCardMessageClass;
        modifySelectSeatsPopUp.ManageButtons.ToolTipSelectSeatMessageClass = modifySelectSeatsPopUp.ToolTipSelectSeatMessageClass;


        modifySelectSeatsPopUp.infoLink = $("." + modifySelectSeatsPopUp.infoLinkId);
        modifySelectSeatsPopUp.infoLinkCloseButton = $("#" + modifySelectSeatsPopUp.infoLinkCloseButtonId);

        modifySelectSeatsPopUp.selectAllPaxsLink = $("#" + modifySelectSeatsPopUp.selectAllPaxsLinkId);

        modifySelectSeatsPopUp.blockUI = new SKYSALES.Class.BlockedPopUp();
        var json = {};

        json.closeElement = $('.blockUIPopUpClose');

        json.properties = { css: { width: modifySelectSeatsPopUp.forcedWidth } };
        modifySelectSeatsPopUp.blockUI.init(json);
    };

    modifySelectSeatsPopUp.addEvents = function () {
        $(modifySelectSeatsPopUp.infoLink).live("click", function (e) {
            modifySelectSeatsPopUp.openInfoBox(e);
        });

        if ($(modifySelectSeatsPopUp.selectAllPaxsLink) != '' && $(modifySelectSeatsPopUp.selectAllPaxsLink) != undefined) {

            $(modifySelectSeatsPopUp.selectAllPaxsLink).live("click", function (e) {
                modifySelectSeatsPopUp.checkAllPaxs(e);
                modifySelectSeatsPopUp.infoLinkCloseButton.trigger('click');
            });
        }
    };


    modifySelectSeatsPopUp.openInfoBox = function (e) {

        var checkCount = $("input[name*='" + modifySelectSeatsPopUp.checkNamePrefix + "'][type='checkbox']").length;
        var checksDisabledCount = $("input[name*='" + modifySelectSeatsPopUp.checkNamePrefix + "'][type='checkbox']:disabled").length;

        if (checkCount == checksDisabledCount)
            return;

        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;

        $("#ModifySeatsDIV").hide();
        $("#SelectSeatsDIV").hide();

        modifySelectSeatsPopUp.blockUI.show(modifySelectSeatsPopUp.infoBoxId);
        if ($("input[name*='" + modifySelectSeatsPopUp.checkNamePrefix + "'][type='checkbox']:checked").length == 0) {
            $("#ModifySeatsDIV").hide();
            $("#SelectSeatsDIV").show();
        } else {
            $("#ModifySeatsDIV").show();
            $("#SelectSeatsDIV").hide();
        }
    };

    modifySelectSeatsPopUp.checkAllPaxs = function (e) {
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        $("input[name*='" + modifySelectSeatsPopUp.checkNamePrefix + "'][type='checkbox']:not(:disabled)").attr("checked", "checked");
        modifySelectSeatsPopUp.ManageButtons.EnableDesableButtonsByPaxsChecks();
    };

    return modifySelectSeatsPopUp;
};