

VUELING.Class.PromoVYAndMY25 = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisPromoVYMY25 = SKYSALES.Util.extendObject(parent);

    thisPromoVYMY25.PromoVYRadioID = null;
    thisPromoVYMY25.MY25RadioID = null;

    thisPromoVYMY25.PromoVYFrameID = null;
    thisPromoVYMY25.MY25FrameID = null;
    thisPromoVYMY25.infoMy25LinkID = null;
    thisPromoVYMY25.infoMy25PopUpID = null;
    thisPromoVYMY25.infoMy25PopUpCloseID = null;
    
    thisPromoVYMY25.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisPromoVYMY25.addEvents = function () {
        $('[data-object="' + thisPromoVYMY25.PromoVYFrameID + '"]').click(thisPromoVYMY25.TipoPromoClick);
        $('[data-object="' + thisPromoVYMY25.MY25FrameID + '"]').click(thisPromoVYMY25.TipoPromoClick);
      
        $(thisPromoVYMY25.infoMy25LinkID).live("click", thisPromoVYMY25.showPopUpInfoMy25Handler);
        thisPromoVYMY25.initPopupInfoMy25();
    };

    thisPromoVYMY25.TipoPromoClick = function (e) {
        var id = e.currentTarget.id;
        var frameName;
        if (id == 'PromoVY') {
            $('[data-object="' + thisPromoVYMY25.PromoVYFrameID + '"]').addClass('sectionBorderSelected');
            $('[data-object="' + thisPromoVYMY25.MY25FrameID + '"]').removeClass('sectionBorderSelected');
            $('[data-object="' + thisPromoVYMY25.MY25RadioID + '"]').attr('checked', false);
            $('[data-object="' + thisPromoVYMY25.PromoVYRadioID + '"]').attr('checked', true);
            frameName = $('#PromoVY').attr('data-object');
        }
        else if (id == 'MY25') {
            $('[data-object="' + thisPromoVYMY25.MY25FrameID + '"]').addClass('sectionBorderSelected');
            $('[data-object="' + thisPromoVYMY25.PromoVYFrameID + '"]').removeClass('sectionBorderSelected');
            $('[data-object="' + thisPromoVYMY25.PromoVYRadioID + '"]').attr('checked', false);
            $('[data-object="' + thisPromoVYMY25.MY25RadioID + '"]').attr('checked', true);
            frameName = $('#MY25').attr('data-object');
        }
        $('.promoVYverified').attr('data-object', frameName);
    };

    thisPromoVYMY25.initPopupInfoMy25 = function () {
        var json = {};
        thisPromoVYMY25.infoMy25PopUp = new SKYSALES.Class.BlockedPopUp();
        json.closeElement = $(thisPromoVYMY25.infoMy25PopUpCloseID);
        thisPromoVYMY25.infoMy25PopUp.init(json);
    };
    
    thisPromoVYMY25.showPopUpInfoMy25Handler = function () {
        thisPromoVYMY25.infoMy25PopUp.show(thisPromoVYMY25.infoMy25PopUpID);
    };
  
    return thisPromoVYMY25;
};