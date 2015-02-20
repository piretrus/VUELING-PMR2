

VUELING.Class.SeatMapExpressCheckOutServices = function () {
    var parent = new VUELING.Class.SeatMapExpress(),
        thisSeatMapExpress = SKYSALES.Util.extendObject(parent);

    thisSeatMapExpress.init = function (json) {
        parent.init(json);
    };

    parent.LoadSetting = function () {
        if (this.familyFaresSettings.ServicesOutboundFlight.AsientoDuo == 'Included' ||
            this.familyFaresSettings.ServicesReturnFlight.AsientoDuo == 'Included') {
            this.seatMapFrontDiv.addClass('blockDuo');
            $("#" + thisSeatMapExpress.seatMapId + " .legendDuo").show();
            $("#" + thisSeatMapExpress.seatMapId + " .legendOptimum").hide();
            $("#" + thisSeatMapExpress.seatMapId + " .legendXL").hide();
            this.seatMapBackLink.hide();
            this.seatMapBackDiv.hide();
            this.seatMapFrontDiv.show();
        }
        else {
            this.seatMapFrontDiv.addClass('blockNonDuo');
            $("#" + thisSeatMapExpress.seatMapId + " .legendDuo").hide();

            if (this.familyFaresSettings.ServicesOutboundFlight.AsientoOptimum != 'Included' &&
                this.familyFaresSettings.ServicesReturnFlight.AsientoOptimum != 'Included') {
                this.seatMapFrontDiv.addClass('blockNonOptimum');
                $("#" + thisSeatMapExpress.seatMapId + " .legendOptimum").hide();
            }
            if (this.familyFaresSettings.ServicesOutboundFlight.AsientoXL != 'Included' &&
                this.familyFaresSettings.ServicesReturnFlight.AsientoXL != 'Included') {
                this.seatMapFrontDiv.addClass('blockNonXL');
                $("#" + thisSeatMapExpress.seatMapId + " .legendXL").hide();
            }
        }
    };

    return thisSeatMapExpress;
};