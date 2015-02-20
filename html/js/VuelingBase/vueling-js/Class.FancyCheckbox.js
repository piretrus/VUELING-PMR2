

VUELING.Class.FancyCheckbox = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.init = function (params) {
        if (!VUELING.Util.IsiPad())
            return;
        if(params.ids)
            for (var i = 0; i < params.ids.length; i++)
                create(params.ids[i], params.valueOn, params.valueOff);
        if(params.id)
            create(params.id, params.valueOn, params.valueOff);
    };

    var create = function (id, valueOn, valueOff) {
        var thisInput = $('input[type="checkbox"]#' + id);
        thisInput.parent('fieldset').addClass('icheck');
        thisInput.addClass('icheck__input');
        var thisLabel = $('label[for="' + id + '"]');
        thisLabel.addClass('icheck__label');
        var content = '<div class="icheck__label__switch txtAlignTop">' +
            '<span class="icheck__label__switch__content">' +
            '<span class="icheck__label__switch__content__inner" valueon="' + valueOn + '" valueoff="' + valueOff + '"></span> ' +
            '<span class="icheck__label__switch__content__round"></span>' +
            '</span>' +
            '</div>' +
            '<div class="icheck__label__txt">' + thisLabel.html() + '</div>';
        thisLabel.html(content);
    };

    return thisClass;
}