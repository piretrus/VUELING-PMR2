VUELING.Class.MoverCasco = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.PlaneModel = null;

    thisClass.init = function (json) {
        this.setSettingsByObject(json);

        $('.casco').each(function () {
            var thisCasco = $(this);
            var thisParent = thisCasco.parents('div[data-id-part="head"]');
            var thisScroll = thisParent.find('.img__asientos__avion_mini__scroll ');
            var thisLengueta = thisParent.find('.avion_mini__scroll_lengueta');

            SKYSALES.Util.createObject('AccionesSeatmapVertical' + $(this).attr('id'), 'VUELING.Class.AccionesSeatmapVertical', { casco: thisCasco, scroll: thisScroll, lengueta: thisLengueta, planeModel: thisClass.PlaneModel });
        });
    };

    return thisClass;
};