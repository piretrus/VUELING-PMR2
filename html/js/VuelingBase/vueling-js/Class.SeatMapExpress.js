

VUELING.Class.SeatMapExpress = function () {
    var parent = new VUELING.Class.SeatMapExpressWithOutMap(),
        thisSeatMapExpress = SKYSALES.Util.extendObject(parent);

    
    thisSeatMapExpress.showSeatRow = 4;
    thisSeatMapExpress.familyFaresSettings = null;
    thisSeatMapExpress.seatMapBackLinkId = '';
    thisSeatMapExpress.seatMapBackLink = null;
    thisSeatMapExpress.seatMapFrontLinkId = '';
    thisSeatMapExpress.seatMapFrontLink = null;
    thisSeatMapExpress.seatMapBackDivId = '';
    thisSeatMapExpress.seatMapBackDiv = null;
    thisSeatMapExpress.seatMapFrontDivId = '';
    thisSeatMapExpress.seatMapFrontDiv = null;
    thisSeatMapExpress.seatMapId = "";

    thisSeatMapExpress.init = function (json) {
        parent.init.call(this, json)
        this.LoadSetting();
    };

    thisSeatMapExpress.setVars = function () {
        parent.setVars.call(this);

        this.seatMapBackLink = this.getById(this.seatMapBackLinkId);
        this.seatMapFrontLink = this.getById(this.seatMapFrontLinkId);
        this.seatMapBackDiv = this.getById(this.seatMapBackDivId);
        this.seatMapFrontDiv = this.getById(this.seatMapFrontDivId);

        this.familyFaresSettings = VUELING.Util.getObjectInstance('FamilyFaresSettings');
    };

    thisSeatMapExpress.LoadSetting = function () {
        $("#" + thisSeatMapExpress.seatMapId + " .legendDuo").hide();
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
            if (this.familyFaresSettings.ServicesOutboundFlight.AsientoDuo == 'NotPossible'
                && (this.familyFaresSettings.ServicesReturnFlight.AsientoDuo == 'NotPossible'
                    || this.familyFaresSettings.ServicesReturnFlight.AsientoDuo == '')) {
                this.seatMapFrontDiv.addClass('blockNonDuo');
            }
            if (this.familyFaresSettings.ServicesOutboundFlight.AsientoOptimum == 'NotPossible'
                && (this.familyFaresSettings.ServicesReturnFlight.AsientoOptimum == 'NotPossible'
                    || this.familyFaresSettings.ServicesReturnFlight.AsientoOptimum == '')) {
                this.seatMapFrontDiv.addClass('blockNonOptimum');
            }
            if (this.familyFaresSettings.ServicesOutboundFlight.AsientoXL == 'NotPossible'
                && (this.familyFaresSettings.ServicesReturnFlight.AsientoXL == 'NotPossible'
                    || this.familyFaresSettings.ServicesReturnFlight.AsientoXL == '')) {
                this.seatMapFrontDiv.addClass('blockNonXL');
            }
        }
    };


    thisSeatMapExpress.addEvents = function () {
        parent.addEvents.call(this);
        
        thisSeatMapExpress.seatMapBackLink.click(function (event) { thisSeatMapExpress.SeatMapBackLink_OnClick(event) });
        thisSeatMapExpress.seatMapFrontLink.click(function (event) { thisSeatMapExpress.SeatMapFrontLink_OnClick(event) });
    };

    thisSeatMapExpress.SeatMapBackLink_OnClick = function (event) {
        this.seatMapFrontDiv.hide();
        this.seatMapBackDiv.show();
    };
    thisSeatMapExpress.SeatMapFrontLink_OnClick = function (event) {
        this.seatMapBackDiv.hide();
        this.seatMapFrontDiv.show();
    };

    return thisSeatMapExpress;
};