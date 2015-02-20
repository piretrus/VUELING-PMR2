

VUELING.Class.MoovingMobileView = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisMoovingMobileView = SKYSALES.Util.extendObject(parent);

    thisMoovingMobileView.moovingMobileLinkCloseButton = null;
    thisMoovingMobileView.moovingMobileLinkCloseButtonId = '';
    thisMoovingMobileView.moovingMobileBox = null;
    thisMoovingMobileView.moovingMobileBoxId = '';
    thisMoovingMobileView.moovingMobileLinkContinueButton = null;
    thisMoovingMobileView.moovingMobileLinkContinueButtonId = '';

    thisMoovingMobileView.blockUI = null;

    thisMoovingMobileView.setSettingsByObject = function (json) {
        parent.setSettingsByObject.call(this, json);
    };

    thisMoovingMobileView.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.initPopupMobileView();

        if (VUELING.Util.IsMobile()) {
            thisMoovingMobileView.blockUI.show(thisMoovingMobileView.moovingMobileBoxId);

            var container = thisMoovingMobileView.moovingMobileBoxId + "Box";
            $('.' + container).addClass("sectionBorder_lightBox_responsive");
        }
    };

    thisMoovingMobileView.setVars = function () {
        parent.setVars.call(this);
        this.moovingMobileLinkCloseButton = this.getById(this.moovingMobileLinkCloseButtonId);
        this.moovingMobileLinkContinueButton = this.getById(this.moovingMobileLinkContinueButtonId);
        this.moovingMobileBox = this.getById(this.moovingMobileBoxId);
    };

    thisMoovingMobileView.initPopupMobileView = function () {
        thisMoovingMobileView.blockUI = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = this.moovingMobileLinkContinueButton;
        
        json.properties = { css: { top: '70px', left: '4%', width: '92%' } };
        this.blockUI.init(json);
    };

    return thisMoovingMobileView;
}