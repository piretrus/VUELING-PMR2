

VUELING.Class.ManageToolTip = function () {
    var parent = SKYSALES.Class.SkySales(), manageToolTip = SKYSALES.Util.extendObject(parent);

    manageToolTip.DivToolTipId = '';
    manageToolTip.SpanTooltipId = '';
    manageToolTip.LinkId = '';
    manageToolTip.SpanId = '';

    manageToolTip.init = function (json) {
        this.setSettingsByObject(json);
    };

    manageToolTip.StartShowinTooltip = function () {
        $('#' + manageToolTip.LinkId).on({
            mouseenter: function () {
                $('#' + manageToolTip.DivToolTipId).show();
            },
            mouseleave: function () {
                $('#' + manageToolTip.DivToolTipId).hide();
            }
        });
    };

    manageToolTip.setSpanTooltipText = function (text) {
        $('#' + manageToolTip.SpanTooltipId).text(text);
    };

    manageToolTip.setSpanText = function (text) {
        $('#' + manageToolTip.SpanId).text(text);
    };

    manageToolTip.disabledLinkBotton = function () {
        $('#' + manageToolTip.LinkId).removeAttr("href");
        $('#' + manageToolTip.LinkId).on();
        $('#' + manageToolTip.LinkId).parent().fadeTo(0, 0.5);
    };

    manageToolTip.enabledLinkBotton = function (href, text) {
        $('#' + manageToolTip.LinkId).parent().fadeTo(0, 1);
        $('#' + manageToolTip.LinkId).attr("href", href);
        if (text != '')
            $('#' + manageToolTip.SpanId).text(text);
        $('#' + manageToolTip.LinkId).off();
    };

    return manageToolTip;
};