
VUELING.Class.FamilyFaresSettings = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisFamilyFaresSettings = SKYSALES.Util.extendObject(parent);

    thisFamilyFaresSettings.FareTypeOutboundFlight = "";
    thisFamilyFaresSettings.FareTypeReturnFlight = "";
    thisFamilyFaresSettings.ServicesReturnFlight = {};
    thisFamilyFaresSettings.ServicesReturnFlight.Vuelo = "";
    thisFamilyFaresSettings.ServicesReturnFlight.PuntosVueling = "";
    thisFamilyFaresSettings.ServicesReturnFlight.PuntosIberia = "";
    thisFamilyFaresSettings.ServicesReturnFlight.ClickAndFly = "";
    thisFamilyFaresSettings.ServicesReturnFlight.AdelantaTuVuelo = "";
    thisFamilyFaresSettings.ServicesReturnFlight.UnaMaleta = "";
    thisFamilyFaresSettings.ServicesReturnFlight.AsientoBasic = "";
    thisFamilyFaresSettings.ServicesReturnFlight.AsientoOptimum = "";
    thisFamilyFaresSettings.ServicesReturnFlight.AsientoXL = "";
    thisFamilyFaresSettings.ServicesReturnFlight.AsientoDuo = "";
    thisFamilyFaresSettings.ServicesReturnFlight.EspacioRack = "";
    thisFamilyFaresSettings.ServicesReturnFlight.EmbarquePreferente = "";
    thisFamilyFaresSettings.ServicesReturnFlight.FlexibilidadCambios = "";
    thisFamilyFaresSettings.ServicesReturnFlight.Reembolso = "";
    thisFamilyFaresSettings.ServicesReturnFlight.MostradoresDedicados = "";
    thisFamilyFaresSettings.ServicesReturnFlight.Snack = "";
    thisFamilyFaresSettings.ServicesOutboundFlight = {};
    thisFamilyFaresSettings.ServicesOutboundFlight.Vuelo = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.PuntosVueling = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.PuntosIberia = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.ClickAndFly = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.AdelantaTuVuelo = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.UnaMaleta = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.AsientoBasic = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.AsientoOptimum = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.AsientoXL = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.AsientoDuo = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.EspacioRack = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.EmbarquePreferente = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.FlexibilidadCambios = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.Reembolso = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.MostradoresDedicados = "";
    thisFamilyFaresSettings.ServicesOutboundFlight.Snack = "";

    thisFamilyFaresSettings.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisFamilyFaresSettings.initObject = function () { };
    thisFamilyFaresSettings.addEvents = function () { };

    return thisFamilyFaresSettings;
};