VUELING.Class.PromoUniversalOffer = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisPromoUniversalOffer = SKYSALES.Util.extendObject(parent);

    thisPromoUniversalOffer.Content = null;
    thisPromoUniversalOffer.DataIdButtonClose = null;

    thisPromoUniversalOffer.init = function (json) {
        this.setSettingsByObject(json);
        this.Initilize();
        this.addEvents();
    };

    thisPromoUniversalOffer.Initilize = function () {
        if (window.addEventListener) {
            window.addEventListener('scroll', thisPromoUniversalOffer.MoveScroll, false);
        } else {
            window.attachEvent('onscroll', thisPromoUniversalOffer.MoveScroll);
        }
    };

    thisPromoUniversalOffer.addEvents = function () {
        $('#' + thisPromoUniversalOffer.Content + ' [data-id="' + thisPromoUniversalOffer.DataIdButtonClose + '"]').click(thisPromoUniversalOffer.CloseOffer);
    };

    thisPromoUniversalOffer.CloseOffer = function (e) {
        $('#' + thisPromoUniversalOffer.Content).parent().remove();
    };

    thisPromoUniversalOffer.MoveScroll = function () {
        if (window.XMLHttpRequest) {
            var offset = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
            document.getElementById(thisPromoUniversalOffer.Content).className = (offset > 180 ? 'wrapper_pushBox--fixed' : '');
        }
    };

    return thisPromoUniversalOffer;
};