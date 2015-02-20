


VUELING.Class.ChangeInvoiceRequest = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisChangeInvoiceRequest = SKYSALES.Util.extendObject(parent);

    thisChangeInvoiceRequest.rbRequestInvoiceReservationId = '';
    thisChangeInvoiceRequest.divRequestInvoiceReservationId = '';
    thisChangeInvoiceRequest.rbRequestInvoiceBuyPointsId = '';
    thisChangeInvoiceRequest.divRequestInvoiceBuyPointsId = '';

    thisChangeInvoiceRequest.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        $('#' + thisChangeInvoiceRequest.divRequestInvoiceReservationId).show();
        $('#' + thisChangeInvoiceRequest.divRequestInvoiceBuyPointsId).hide();
    };

    thisChangeInvoiceRequest.addEvents = function () {
        $('#' + thisChangeInvoiceRequest.rbRequestInvoiceReservationId).change(function () {
            $('#' + thisChangeInvoiceRequest.divRequestInvoiceReservationId).show();
            $('#' + thisChangeInvoiceRequest.divRequestInvoiceBuyPointsId).hide();
        });

        $('#' + thisChangeInvoiceRequest.rbRequestInvoiceBuyPointsId).click(function () {
            $('#' + thisChangeInvoiceRequest.divRequestInvoiceBuyPointsId).show();
            $('#' + thisChangeInvoiceRequest.divRequestInvoiceReservationId).hide();
        });
    };

    return thisChangeInvoiceRequest;
};