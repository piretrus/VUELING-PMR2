


VUELING.Class.WorkBenchBackupAudit = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisChangeInvoiceRequest = SKYSALES.Util.extendObject(parent);

    thisChangeInvoiceRequest.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        thisChangeInvoiceRequest.identXmls();
        thisChangeInvoiceRequest.resize();
    };

    thisChangeInvoiceRequest.identXmls = function () {
        $('input[type=text], textarea').each(function () {
            var text = vkbeautify.xml($(this).val());
            $(this).val(text);
        });
    };

    thisChangeInvoiceRequest.resize = function () {
        $('input[type=text], textarea').each(function () {
            thisChangeInvoiceRequest.resizeHeight($(this));
        });
    };

    thisChangeInvoiceRequest.resizeHeight = function (element) {
        if (!$(element).prop('scrollTop')) {
            do {
                var b = $(element).prop('scrollHeight');
                var h = $(element).height();
                $(element).height(h - 5);
            }
            while (b && (b != $(element).prop('scrollHeight')));
        };
        $(element).height($(element).prop('scrollHeight'));
    };

    return thisChangeInvoiceRequest;
};