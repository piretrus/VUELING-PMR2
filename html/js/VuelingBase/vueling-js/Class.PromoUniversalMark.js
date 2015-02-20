


VUELING.Class.PromoUniversalMark = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisPromoUniversalMark = SKYSALES.Util.extendObject(parent);

    thisPromoUniversalMark.promoUniversalInputId = '';
    thisPromoUniversalMark.promoUniversalInputValuePrefix = '';

    thisPromoUniversalMark.init = function (json) {
        this.setSettingsByObject(json);
    };

    thisPromoUniversalMark.checkIsPromoUniversal = function (rowClicked) {
        var promoUniversalHiddenField = $("#" + this.promoUniversalInputId);
        if (promoUniversalHiddenField.length > 0) {

            var promoInputValue = promoUniversalHiddenField.val();
            var isPromoUniversal = (rowClicked.find(".icoPromoUniversal").length > 0);

            var clickedMarketTableId = $(rowClicked).parents('table').attr('id');
            var clickedMarketIndex = (parseInt(clickedMarketTableId.substring(clickedMarketTableId.length - 1)) + 1).toString();

            if (promoInputValue && promoInputValue.indexOf(this.promoUniversalInputValuePrefix) != -1) {
                var strPrefixIndex = promoInputValue.indexOf(this.promoUniversalInputValuePrefix) + this.promoUniversalInputValuePrefix.length;
                var marketsSaved = promoInputValue.substring(strPrefixIndex, promoInputValue.length + strPrefixIndex);

                if (marketsSaved.indexOf(clickedMarketIndex) == -1) { // Clicked market index is not present in input value                                        
                    if (isPromoUniversal)
                        marketsSaved += clickedMarketIndex;
                }
                else {
                    if (!isPromoUniversal) {
                        marketsSaved = marketsSaved.replace(clickedMarketIndex, "");
                    }
                }

                // Generates input value
                var marketsSavedSplitted = marketsSaved.split('');
                if (marketsSavedSplitted.length > 0) {
                    marketsSavedSplitted.sort();
                    promoInputValue = this.promoUniversalInputValuePrefix + marketsSavedSplitted.join('');
                }
                else {
                    promoInputValue = '';
                }

            }
            else {
                if (isPromoUniversal) {
                    promoInputValue = this.promoUniversalInputValuePrefix + clickedMarketIndex;
                }
            }

            promoUniversalHiddenField.val(promoInputValue);
        }
    }

    return thisPromoUniversalMark;
};