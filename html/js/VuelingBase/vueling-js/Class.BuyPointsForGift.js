

    VUELING.Class.BuyPointsForGift = function() {
    var parent = new SKYSALES.Class.SkySales(),
        buyPoints = SKYSALES.Util.extendObject(parent);

    buyPoints.pointsForCurrentUserHeaderId = "";
    buyPoints.pointsForCurrentUserControlId = "";
    buyPoints.pointsForOtherUserHeaderId = "";
    buyPoints.pointsForOtherUserControlId = "";
    buyPoints.receiverEmailControlId = "";
    buyPoints.giftPointsWrapperId = "";
    buyPoints.giftPointsExplinationWrapperId = "";
    buyPoints.receiverMessageControlId = "";
    buyPoints.characterCountWrapperId = "";

    buyPoints.messageMaxLength = 0;

    buyPoints.pointsForCurrentUserHeaderElement = null;
    buyPoints.pointsForCurrentUserElement = null;
    buyPoints.pointsForOtherUserHeaderElement = null;
    buyPoints.pointsForOtherUserElement = null;
    buyPoints.receiverEmailElement = null;
    buyPoints.giftPointsWrapperElement = null;
    buyPoints.giftPointsExplinationWrapperElement = null;
    buyPoints.receiverMessageElement = null;
    buyPoints.characterCountElement = null;

    buyPoints.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    buyPoints.setVars = function () {
        this.pointsForCurrentUserHeaderElement = jQuery('#' + this.pointsForCurrentUserHeaderId);
        this.pointsForCurrentUserElement = jQuery('#' + this.pointsForCurrentUserControlId);
        this.pointsForOtherUserHeaderElement = jQuery('#' + this.pointsForOtherUserHeaderId);
        this.pointsForOtherUserElement = jQuery('#' + this.pointsForOtherUserControlId);
        this.receiverEmailElement = jQuery('#' + this.receiverEmailControlId);
        this.giftPointsWrapperElement = jQuery('#' + this.giftPointsWrapperId);
        this.giftPointsExplinationWrapperElement = jQuery('#' + this.giftPointsExplinationWrapperId);
        this.receiverMessageElement = jQuery('#' + this.receiverMessageControlId);
        this.characterCountElement = jQuery('#' + this.characterCountWrapperId);
    };

    buyPoints.addEvents = function () {
        this.pointsForCurrentUserElement.on('click', this.toggleGiftPointsWrapperVisibility);
        this.pointsForOtherUserElement.on('click', this.toggleGiftPointsWrapperVisibility);
        jQuery(document).ready(this.toggleGiftPointsWrapperVisibility);
        this.receiverMessageElement.on('keyup paste focus', this.countCharacters);
    };

    buyPoints.toggleGiftPointsWrapperVisibility = function () {
        var pointsForCurrentUserChecked = buyPoints.pointsForCurrentUserElement.is(':checked');
        if (pointsForCurrentUserChecked) {
            buyPoints.pointsForCurrentUserHeaderElement.addClass('pulsado');
            buyPoints.pointsForOtherUserHeaderElement.removeClass('pulsado');
            buyPoints.giftPointsWrapperElement.hide();
            buyPoints.giftPointsExplinationWrapperElement.hide();
            SKYSALES.Util.removeAttribute(buyPoints.receiverEmailElement, 'required');
            SKYSALES.Util.removeAttribute(buyPoints.receiverEmailElement, 'validationtype');
        } else {
            buyPoints.pointsForCurrentUserHeaderElement.removeClass('pulsado');
            buyPoints.pointsForOtherUserHeaderElement.addClass('pulsado');
            SKYSALES.Util.setAttribute(buyPoints.receiverEmailElement, 'required', 'true');
            SKYSALES.Util.setAttribute(buyPoints.receiverEmailElement, 'validationtype', 'email');
            buyPoints.giftPointsWrapperElement.show();
            buyPoints.giftPointsExplinationWrapperElement.show();
        }
    };

    buyPoints.countCharacters = function () {
        var ctl = $(this);
        var limit = buyPoints.messageMaxLength;
        var chars = ctl.val().length;
        if (chars > limit) {
            ctl.val(ctl.val().substr(0, limit));
            chars = limit;
        }
        buyPoints.characterCountElement.html('(' + chars + '/' + limit + ')');
    };

    return buyPoints;
};