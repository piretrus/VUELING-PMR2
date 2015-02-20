VUELING.Class.BuyPointsManagePacks = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisBuyPoints = SKYSALES.Util.extendObject(parent);

    thisBuyPoints.buttonsElement = null;
    thisBuyPoints.buttonsResetPackElement = null;
    thisBuyPoints.labelTotalPointsElement = null;
    thisBuyPoints.labelTotalMoneyElement = null;
    thisBuyPoints.buttonSubmitElement = null;
    thisBuyPoints.remainingPointsSpan = null;
    thisBuyPoints.pointsSelectedSpan = null;
    thisBuyPoints.notEnoughPointsMessageDiv = null;

    thisBuyPoints.buttonsName = "";
    thisBuyPoints.labelAmountPackPointsName = "";
    thisBuyPoints.labelAmountPackPriceName = "";
    thisBuyPoints.buttonsResetPackName = "";
    
    thisBuyPoints.labelTotalPointsId = "";
    thisBuyPoints.labelTotalMoneyId = "";
    thisBuyPoints.hiddenAmountPackId = "";
    thisBuyPoints.buttonSubmitId = "";
    thisBuyPoints.remainingPointsId = "";
    thisBuyPoints.pointsSelectedId = "";
    thisBuyPoints.notEnoughPointsMessageId = "";

    thisBuyPoints.totalPointsBoughtThisYear = 0;
    thisBuyPoints.maxPointsPurchasableInYear = 0;
    thisBuyPoints.totalPointsCanStillBuy = 0;
    thisBuyPoints.pointsNeeded = 0;
    thisBuyPoints.maxAmountPacks = "";

    thisBuyPoints.hasPointsClass = "has-points";
    thisBuyPoints.hasMaxPointsClass = "has-maxpoints";

    thisBuyPoints.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        thisBuyPoints.blockButtonsTotalAmount();
    };

    thisBuyPoints.setVars = function () {
        this.buttonsElement = $("a[id^='" + thisBuyPoints.buttonsName + "']");
        this.buttonsResetPackElement = $("a[id^='" + thisBuyPoints.buttonsResetPackName + "']");
        this.labelTotalPointsElement = $("#" + thisBuyPoints.labelTotalPointsId);
        this.labelTotalMoneyElement = $("#" + thisBuyPoints.labelTotalMoneyId);
        this.buttonSubmitElement = $("#" + thisBuyPoints.buttonSubmitId);
        this.remainingPointsSpan = $("#" + thisBuyPoints.remainingPointsId);
        this.pointsSelectedSpan = $("#" + thisBuyPoints.pointsSelectedId);
        this.notEnoughPointsMessageDiv = $("#" + thisBuyPoints.notEnoughPointsMessageId);

        thisBuyPoints.totalPointsCanStillBuy = thisBuyPoints.maxPointsPurchasableInYear - thisBuyPoints.totalPointsBoughtThisYear;

        thisBuyPoints.remainingPointsSpan.text(thisBuyPoints.pointsNeeded);
        if (thisBuyPoints.pointsNeeded == 0) thisBuyPoints.notEnoughPointsMessageDiv.css("display", "none");
    };

    thisBuyPoints.addEvents = function () {
        var buttonsAdd = this.buttonsElement.filter (function () {
            return this.id.indexOf("_ADD") != -1;
        });
        if (buttonsAdd != null) buttonsAdd.on("click", thisBuyPoints.managePoints);

        if (this.buttonSubmitElement != null) this.buttonSubmitElement.on("click", thisBuyPoints.validate);
        if (this.buttonsResetPackElement != null) this.buttonsResetPackElement.on("click", thisBuyPoints.resetPoints);
    };

    thisBuyPoints.managePoints = function (e) {
        var currentBtn = $(e.currentTarget)

        var buttonValue = parseInt(currentBtn.attr("amount"));
        var feecode = currentBtn.attr("feeCode");
        var packs = currentBtn.attr("value") == "+" ? 1 : -1;

        thisBuyPoints.totalPointsCanStillBuy -= buttonValue;
        var totalPointsLabel = thisBuyPoints.updateCurrentLabel(feecode, packs);
        thisBuyPoints.updateCurrentInput(feecode, totalPointsLabel);
        thisBuyPoints.updateRemainingPointsSpan(buttonValue);

        var labelPrice = parseFloat(currentBtn.attr("feePrice"));
        thisBuyPoints.updateTotals(labelPrice, buttonValue);
        thisBuyPoints.setAmountPacksPrice(feecode, labelPrice);
        thisBuyPoints.updateClass(currentBtn[0].parentElement.parentElement, totalPointsLabel);

        thisBuyPoints.blockButtonsTotalAmount();
    };

    thisBuyPoints.resetPoints = function (e) {
        var currentResetBtn = $(e.currentTarget);
        var feecode = currentResetBtn.attr("feeCode");

        var currentLabel = $('#' + thisBuyPoints.labelAmountPackPointsName + "_" + feecode);
        var btnPoints = $('#' + thisBuyPoints.buttonsName + "_" + feecode + "_ADD");
        var points = parseInt(btnPoints.attr("amount"));
        var labelPrice = btnPoints.attr("feePrice");
        var labelvalue = parseInt(currentLabel.text());

        if (labelvalue != 0) {
            var totalPointsLabel = thisBuyPoints.updateCurrentLabel(feecode, -labelvalue);
            thisBuyPoints.updateCurrentInput(feecode, totalPointsLabel);
            thisBuyPoints.updateRemainingPointsSpan(-labelvalue*points);

            $('#' + thisBuyPoints.buttonsName + "_" + feecode + "_SUB").off("click");
            if (labelvalue == thisBuyPoints.maxAmountPacks) $('#' + thisBuyPoints.buttonsName + "_" + feecode + "_ADD").on("click", function (e) { thisBuyPoints.managePoints(e) });
            thisBuyPoints.updateClass(currentResetBtn[0].parentElement.parentElement, 0);

            var pointsDiff = points * labelvalue;
            thisBuyPoints.totalPointsCanStillBuy += pointsDiff;

            thisBuyPoints.updateTotals(-labelvalue * labelPrice, -(pointsDiff));
            thisBuyPoints.setAmountPacksPrice(feecode, -labelvalue * labelPrice);

            thisBuyPoints.blockButtonsTotalAmount();
        }
    };

    thisBuyPoints.updateCurrentInput = function (feecode, amount) {
        var idPoints = "#" + thisBuyPoints.hiddenAmountPackId + "_" + feecode
        if (!isNaN(amount)) $(idPoints).val(amount);
    };

    thisBuyPoints.updateCurrentLabel = function (feecode, packs) {
        var idPoints = "#" + thisBuyPoints.labelAmountPackPointsName + "_" + feecode
        var currentLabel = $(idPoints);
        var amount = parseInt(currentLabel.text());
        if (!isNaN(amount)) currentLabel.text(amount + packs);
        
        return amount + packs;
    };

    thisBuyPoints.updateTotals = function (price, points) {
        var currentPoints = parseInt(thisBuyPoints.labelTotalPointsElement.text());
        var currentMoney = SKYSALES.Util.convertLocaleCurrencyToDecimal(thisBuyPoints.labelTotalMoneyElement.text());

        if (isNumber(currentPoints + points) && isNumber(currentMoney + price)) {
            var totalMoney = currentMoney + price;
            totalMoney = SKYSALES.Util.convertToLocaleCurrency(totalMoney);
            thisBuyPoints.labelTotalMoneyElement.text(totalMoney);
            thisBuyPoints.labelTotalPointsElement.text(currentPoints + points);
        }
    };

    thisBuyPoints.updateClass = function (parentElement, buttonValue) {
        var className = "buyPoints_row_modules"
        var element = $(parentElement);

        if (buttonValue == 0) parentElement.className = className;
        else if (buttonValue >= 1 && buttonValue <= parseInt(thisBuyPoints.maxAmountPacks) - 1) element.addClass(thisBuyPoints.hasPointsClass);
        else if (buttonValue == thisBuyPoints.maxAmountPacks && !element.hasClass(thisBuyPoints.hasMaxPointsClass))
            element.addClass(thisBuyPoints.hasMaxPointsClass);
    };

    thisBuyPoints.updateRemainingPointsSpan = function (text) {
        var pointsToBuy = parseInt(text);
        thisBuyPoints.pointsNeeded -= pointsToBuy;

        thisBuyPoints.remainingPointsSpan.text(thisBuyPoints.pointsNeeded);

        if (parseInt(thisBuyPoints.pointsNeeded) > 0) thisBuyPoints.notEnoughPointsMessageDiv.css("display", "");
        else thisBuyPoints.notEnoughPointsMessageDiv.css("display", "none");
    }

    thisBuyPoints.blockCurrentFeeCodeAddSubtractButton = function (currentBtn, buttonValue, feecode, labelValue) {
        if (buttonValue > 0) {
            if (labelValue >= thisBuyPoints.maxAmountPacks) currentBtn.off("click");
            if (labelValue == 1)  $('#' + thisBuyPoints.buttonsName + "_" + feecode + "_SUB").on("click", function (e) { thisBuyPoints.managePoints(e) });
        }
        if (buttonValue < 0) {
            if (labelValue == 0) currentBtn.off("click");
            if (labelValue == 4)  $('#' + thisBuyPoints.buttonsName + "_" + feecode + "_ADD").on("click", function(e) { thisBuyPoints.managePoints(e) });
        }
    };

    thisBuyPoints.blockButtonsTotalAmount = function () {
        thisBuyPoints.buttonsElement.each(function (index, item) {
            var buttonValue = parseInt($(this).attr("amount"));
            var element = $(this).parent().parent();

            if (thisBuyPoints.totalPointsCanStillBuy < buttonValue) {
                $(this).off("click");
                if (!element.hasClass(thisBuyPoints.hasMaxPointsClass))
                    element.addClass(thisBuyPoints.hasMaxPointsClass);
            }
            else if (thisBuyPoints.managePackPoints(buttonValue, $(this)))  $(this).off("click");
            else {
                var events = $(this).data("events");
                if (events == null || events.click == null) {
                    $(this).on("click", thisBuyPoints.managePoints);
                    if (element.hasClass(thisBuyPoints.hasMaxPointsClass))
                        element.removeClass(thisBuyPoints.hasMaxPointsClass);
                }
            }
        })
    };

    thisBuyPoints.managePackPoints = function (buttonValue, currentBtn) {
        var feecode = currentBtn.attr("feeCode");
        var buttonAdd = currentBtn.attr("value") == "+" ? true : false;
        var currentLabel = $('#' + thisBuyPoints.labelAmountPackPointsName + "_" + feecode);
        var labelValue = parseInt(currentLabel.text());

        if ((buttonAdd && labelValue >= thisBuyPoints.maxAmountPacks) || (!buttonAdd && labelValue == 0)) {
            thisBuyPoints.updateClass(currentBtn[0].parentElement.parentElement, labelValue);
            return true;
        }

        return false;
    };

    thisBuyPoints.setAmountPacksPrice = function (feeCode, price) {
        var id = thisBuyPoints.labelAmountPackPriceName + '_' + feeCode;
        var element = $('#'.concat(id));
        var amount = SKYSALES.Util.convertLocaleCurrencyToDecimal(element.text());
        if (!isNaN(amount + price)) {
            amount += price;
            amount = SKYSALES.Util.convertToLocaleCurrency(amount);

            element.text(amount);
        }
    };

    thisBuyPoints.LaunchBuyPointsPopUp = function () {
        var blockPopUp = new SKYSALES.Class.BlockedPopUp(),
                json = {};
        json.closeElement = $("#blockUIPopUpForBuyPoints .blockUIPopUpClose");
        json.properties = { css: { width: '45em' } };
        blockPopUp.init(json);
        blockPopUp.show("blockUIPopUpForBuyPoints");
    };

    thisBuyPoints.validate = function () {
        var isValid = SKYSALES.Util.validate(this);
        if (!isValid) return false;
        if (parseInt(thisBuyPoints.pointsNeeded) <= 0) return true;
        
        thisBuyPoints.pointsSelectedSpan.text(thisBuyPoints.remainingPointsSpan.text());

        thisBuyPoints.LaunchBuyPointsPopUp();
        return false;
    }

    return thisBuyPoints;
};