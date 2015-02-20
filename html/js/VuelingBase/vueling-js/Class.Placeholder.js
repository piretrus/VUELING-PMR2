

VUELING.Class.Placeholder = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisPlaceholder = SKYSALES.Util.extendObject(parent);

    thisPlaceholder.init = function () {
        $('input').each(function () {
            var placeholder = $(this).data('placeholder.validation');
            if (placeholder)
                $(this).attr('placeholder', placeholder);
        });
    };

    return thisPlaceholder;
};