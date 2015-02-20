

VUELING.Class.MoovingVoucherView = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisMoovingVoucherView = SKYSALES.Util.extendObject(parent);

    thisMoovingVoucherView.voucherValueId = "";
    thisMoovingVoucherView.voucherValue = "";
    thisMoovingVoucherView.voucherTotalValue = "";
    //thisMoovingVoucherView.voucherPAXValue = "";

    thisMoovingVoucherView.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.resetVoucherValue();
    };

    thisMoovingVoucherView.setSettingsByObject = function (json) {
        parent.setSettingsByObject.call(this, json);
    };

    thisMoovingVoucherView.setVars = function () {
        thisMoovingVoucherView.voucherValue = this.getById(this.voucherValueId);
    };

    thisMoovingVoucherView.resetVoucherValue = function () {
        thisMoovingVoucherView.voucherValue.text(0);
    };

    thisMoovingVoucherView.showTotalValue = function () {
        thisMoovingVoucherView.voucherValue.text(thisMoovingVoucherView.voucherTotalValue);
    };

    
    //    thisMoovingVoucherView.voucherValue.text(thisMoovingVoucherView.voucherPAXValue);
    

    return thisMoovingVoucherView;
};