

VUELING.Class.FancyOptionForPayment = function () {
    var parent = new VUELING.Class.FancyOptionBase();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.create = function (id) {
        var thisElement = $('input[type="radio"]#' + id);
        var thisElementParent = thisElement.parent();
        $('.deleteIpad', thisElementParent).remove();
        thisElementParent.addClass('iradio').addClass('iradio--bullet');
        var theText = thisElementParent.find('label').text();
        var theSpan = thisElementParent.find('span').detach();
        thisElementParent.find('label').remove();
        var content = '<label for="' + id + '">' +
                          '<div class="iradio__content">' +
                              theSpan.append(theSpan.clone()).html() +
                              '<div class="iradio__content__text tc_black fs_12">' + theText + '</div>' +
                          '</div>' +
                      '</label>';

        thisElementParent.append(content);
    };

    return thisClass;
};