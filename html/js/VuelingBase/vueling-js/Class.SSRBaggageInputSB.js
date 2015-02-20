

VUELING.Class.SSRBaggageInputSB = function () {
    var parent = new SKYSALES.Class.SkySales(),
    ssrBaggageInputSB = SKYSALES.Util.extendObject(parent);

    ssrBaggageInputSB.DivBaggageInputId = "";
    ssrBaggageInputSB.HiddenControlId = "";
    ssrBaggageInputSB.SelectBagButtonId = "";
    ssrBaggageInputSB.SelectHandBagButtonId = "";
    ssrBaggageInputSB.divBagsNoBasicId = "";
    ssrBaggageInputSB.divSelectedBagId = "";
    ssrBaggageInputSB.FareType = "";
    ssrBaggageInputSB.labelButtonCancel = "";
    ssrBaggageInputSB.labelSelectMaletas = "";

    ssrBaggageInputSB.SSRInsuraceInputName = 'SSRInsuraceInput';
    ssrBaggageInputSB.SSRInsuraceInputObj = null;

    ssrBaggageInputSB.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents(); ssrBaggageInputSB
        if (ssrBaggageInputSB.FareType == 'Basic')
            ssrBaggageInputSB.ShowHideDivBaggageInput($("#" + ssrBaggageInputSB.divSelectedBagId).hasClass("sectionSelected"));
    };

    ssrBaggageInputSB.addEvents = function () {
        $("#" + ssrBaggageInputSB.SelectBagButtonId).click(ssrBaggageInputSB.SelectBagButtonClick);
        $("#" + ssrBaggageInputSB.SelectHandBagButtonId).click(ssrBaggageInputSB.SelectHandBagButtonClick);
    };

    ssrBaggageInputSB.getSSRInsuraceInputObject = function () {
        for (var ins in SKYSALES.Instance) {
            if (ins.substring(0, ssrBaggageInputSB.SSRInsuraceInputName.length) === ssrBaggageInputSB.SSRInsuraceInputName) {
                ssrBaggageInputSB.SSRInsuraceInputObj = SKYSALES.Instance[ins];
                break;
            }
        }
    };

    ssrBaggageInputSB.SelectBagButtonClick = function (e) {
        $("#" + ssrBaggageInputSB.HiddenControlId).attr('checked', false);
        ssrBaggageInputSB.ShowHideDivBaggageInput(true);

        ssrBaggageInputSB.getSSRInsuraceInputObject();
        if (ssrBaggageInputSB.SSRInsuraceInputObj && ssrBaggageInputSB.SSRInsuraceInputObj.IsSEAclicked) {
            $('[data-object="MessageAnulacionTotal"]').show();
        }
        return false;
    };

    ssrBaggageInputSB.SelectHandBagButtonClick = function () {
        $("#" + ssrBaggageInputSB.HiddenControlId).attr('checked', true);
        ssrBaggageInputSB.ShowHideDivBaggageInput(false);
        $('[data-object="' + ssrBaggageInputSB.labelButtonCancel + '"]').click();
        $('[data-object="' + ssrBaggageInputSB.labelSelectMaletas + '"]').val("BAG0").trigger("change");
        return false;
    };

    ssrBaggageInputSB.ShowHideDivBaggageInput = function (show) {
        if (show) {
            $("#" + ssrBaggageInputSB.DivBaggageInputId).removeClass("hidden");
            $("#" + ssrBaggageInputSB.DivBaggageInputId).slideDown("fast");
            $('html, body').animate({ scrollTop: $('#' + ssrBaggageInputSB.DivBaggageInputId).offset().top }, 400);
        }
        else {
            $("#" + ssrBaggageInputSB.DivBaggageInputId).slideUp("fast");
            $("#" + ssrBaggageInputSB.DivBaggageInputId).addClass("hidden");
        }
    };
    return ssrBaggageInputSB;
};