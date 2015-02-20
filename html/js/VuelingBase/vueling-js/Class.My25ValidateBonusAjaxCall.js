

VUELING.Class.My25ValidateBonusAjaxCall = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisMy25ValidateBonusAjaxCall = SKYSALES.Util.extendObject(parent);

    thisMy25ValidateBonusAjaxCall.TriggerControlId = null;
    thisMy25ValidateBonusAjaxCall.InputControlId = null;
    thisMy25ValidateBonusAjaxCall.ParamName = null;
    thisMy25ValidateBonusAjaxCall.LoadingPopupId = null;
    thisMy25ValidateBonusAjaxCall.SeparatorControlId = null;
    thisMy25ValidateBonusAjaxCall.Page = null;
    thisMy25ValidateBonusAjaxCall.ResultContentId = null;
    thisMy25ValidateBonusAjaxCall.ResultContentErrorId = null;
    thisMy25ValidateBonusAjaxCall.PageToRedirect = null;
    //controlsBonusDetails//
    thisMy25ValidateBonusAjaxCall.BonusDetailsBeneficiaryNameId = null;
    thisMy25ValidateBonusAjaxCall.BonusDetailsType = null;
    thisMy25ValidateBonusAjaxCall.BonusDetailsDuration = null;
    thisMy25ValidateBonusAjaxCall.BonusDetailsStartDate = null;
    thisMy25ValidateBonusAjaxCall.BonusDetailsEndDate = null;
    thisMy25ValidateBonusAjaxCall.BonusDetailsCode = null;
    thisMy25ValidateBonusAjaxCall.BonusIconId = null;
    thisMy25ValidateBonusAjaxCall.BonusExpiredDl = null;
    thisMy25ValidateBonusAjaxCall.BonusExpiredSpanId = null;
    thisMy25ValidateBonusAjaxCall.BonusTitleExpiredSpanId = null;

    thisMy25ValidateBonusAjaxCall.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisMy25ValidateBonusAjaxCall.addEvents = function () {
        $("#" + thisMy25ValidateBonusAjaxCall.TriggerControlId).bind("click", thisMy25ValidateBonusAjaxCall.ValidateBonusClick);
    };

    thisMy25ValidateBonusAjaxCall.ValidateBonus = function (e) {
        $.ajax({
            type: "POST",
            async: true,
            dataType: "json",
            url: thisMy25ValidateBonusAjaxCall.Page,
            data: { bonusCode: $("#" + thisMy25ValidateBonusAjaxCall.InputControlId).val() },
            beforeSend: thisMy25ValidateBonusAjaxCall.ShowLoadingPopUp,
            success: function (data) {
                thisMy25ValidateBonusAjaxCall.FillBonusDetails(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                thisMy25ValidateBonusAjaxCall.HideLoadingPopUp();
            }
        });
    };


    thisMy25ValidateBonusAjaxCall.showAjaxResult = function (isError) {

        $("#" + thisMy25ValidateBonusAjaxCall.SeparatorControlId).show();
        $("#" + thisMy25ValidateBonusAjaxCall.SeparatorControlId).show();
        if (!isError) {
            $("#" + thisMy25ValidateBonusAjaxCall.ResultContentId).show();
            $("#" + thisMy25ValidateBonusAjaxCall.ResultContentErrorId).hide();

        } else {
            $("#" + thisMy25ValidateBonusAjaxCall.ResultContentId).hide();
            $("#" + thisMy25ValidateBonusAjaxCall.ResultContentErrorId).show();
        }
        thisMy25ValidateBonusAjaxCall.HideLoadingPopUp();
    };

    thisMy25ValidateBonusAjaxCall.ShowLoadingPopUp = function () {
        $("#" + thisMy25ValidateBonusAjaxCall.LoadingPopupId).toggle();
    };

    thisMy25ValidateBonusAjaxCall.HideLoadingPopUp = function () {
        $("#" + thisMy25ValidateBonusAjaxCall.LoadingPopupId).toggle();
    };

    thisMy25ValidateBonusAjaxCall.ValidateBonusClick = function (e) {
        thisMy25ValidateBonusAjaxCall.ValidateBonus(e);
    };

    thisMy25ValidateBonusAjaxCall.FillBonusDetails = function (data) {
        if (data == undefined || data.IsLogged == "false") {
            window.location = thisMy25ValidateBonusAjaxCall.PageToRedirect;
            return;
        }
        if (data.IsExpired == "true") {
            $("#" + thisMy25ValidateBonusAjaxCall.BonusExpiredDl).addClass("tc_red");
            $("#" + thisMy25ValidateBonusAjaxCall.BonusExpiredSpanId).removeClass("hidden");
            $("#" + thisMy25ValidateBonusAjaxCall.BonusTitleExpiredSpanId).removeClass("hidden");
        }
        else {
            $("#" + thisMy25ValidateBonusAjaxCall.BonusExpiredDl).removeClass("tc_red");
            $("#" + thisMy25ValidateBonusAjaxCall.BonusExpiredSpanId).addClass("hidden");
            $("#" + thisMy25ValidateBonusAjaxCall.BonusTitleExpiredSpanId).addClass("hidden");
        }

        $("#" + thisMy25ValidateBonusAjaxCall.BonusDetailsBeneficiaryNameId).html(data.Beneficiary.Name);
        $("#" + thisMy25ValidateBonusAjaxCall.BonusDetailsType).html(data.Type);
        $("#" + thisMy25ValidateBonusAjaxCall.BonusDetailsDuration).html(' ' + data.MonthsDuration);
        $("#" + thisMy25ValidateBonusAjaxCall.BonusDetailsStartDate).html(data.InitialDate);
        $("#" + thisMy25ValidateBonusAjaxCall.BonusDetailsEndDate).html(data.EndDate);
        $("#" + thisMy25ValidateBonusAjaxCall.BonusDetailsCode).html(data.BonusCode);
        $("#" + thisMy25ValidateBonusAjaxCall.BonusIconId).attr("class", data.BonusImage);
        thisMy25ValidateBonusAjaxCall.showAjaxResult(data.BonusCode == "");
    };
    return thisMy25ValidateBonusAjaxCall;
};