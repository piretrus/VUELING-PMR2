

VUELING.Class.FancyOption = function() {
    var parent = new VUELING.Class.FancyOptionBase();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.create = function(id) {
        var thisElement = $('input[type="radio"]#' + id);
        var thisElementParent = thisElement.parent();
        thisElement.detach();
        var span = thisElementParent.wrap('<span class="iradio iradio--bullet iradio--187w" />').parent();
        thisElementParent.attr('class', '');
        span.prepend(thisElement);
    };

    return thisClass;
};