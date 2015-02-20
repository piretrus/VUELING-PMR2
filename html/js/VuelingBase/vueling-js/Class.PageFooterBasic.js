

VUELING.Class.PageFooterBasic = function () {
    var parent = SKYSALES.Class.SkySales(),
          thisPageFooterBasic = SKYSALES.Util.extendObject(parent);

    thisPageFooterBasic.infoLinkId = '';
    thisPageFooterBasic.infoLinkCloseButtonId = '';
    thisPageFooterBasic.infoBoxId = '';

    thisPageFooterBasic.infoLink = null;
    thisPageFooterBasic.infoLinkCloseButton = null;
    thisPageFooterBasic.blockUI = null;
    thisPageFooterBasic.newSearchCloseButton = null;

    thisPageFooterBasic.setPopUpContent = null;

    thisPageFooterBasic.popUpContentLinks = [];
    thisPageFooterBasic.popUpContents = [];
    thisPageFooterBasic.popUpContainer = '';

    thisPageFooterBasic.setPopUpContent = function (i) {
        $(thisPageFooterBasic.popUpContainer).html($(thisPageFooterBasic.popUpContents[i]).html());
    };

    thisPageFooterBasic.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisPageFooterBasic.initObject = function () {
        thisPageFooterBasic.infoLink = this.getById(thisPageFooterBasic.infoLinkId);
        thisPageFooterBasic.infoLinkCloseButton = this.getById(thisPageFooterBasic.infoLinkCloseButtonId);
        thisPageFooterBasic.blockUI = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = thisPageFooterBasic.infoLinkCloseButton;
        json.properties = { css: { width: '550px' } };
        thisPageFooterBasic.blockUI.init(json);
        if (thisPageFooterBasic.popUpContainer != null) {
            thisPageFooterBasic.infoLink.bind("click", function () {
                thisPageFooterBasic.setPopUpContent(0);
            });
        }
    };

    thisPageFooterBasic.addEvents = function () {
        $(thisPageFooterBasic.infoLink).click(function (e) {
            thisPageFooterBasic.openInfoBox(e);
        });
    };

    thisPageFooterBasic.openInfoBox = function (e) {
        e.preventDefault();
        thisPageFooterBasic.blockUI.show(thisPageFooterBasic.infoBoxId);
    };

    return thisPageFooterBasic;
};