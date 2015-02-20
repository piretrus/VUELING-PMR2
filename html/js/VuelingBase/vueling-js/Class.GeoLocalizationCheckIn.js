

VUELING.Class.GeoLocalizationCheckIn = function () {
    var parent = new VUELING.Class.GeoLocalizationBase(),
        thisGeoLocalization = SKYSALES.Util.extendObject(parent);

    thisGeoLocalization.DefaultValue = "";

    thisGeoLocalization.init = function (json) {
        parent.init(json);
        if (this.AirportOrigin.val() == thisGeoLocalization.DefaultValue) {
            this.callAjax();
        }
    };

    thisGeoLocalization.onsuccess = function (data) {
                if (thisGeoLocalization.AirportOrigin.val() == thisGeoLocalization.DefaultValue) {
                    thisGeoLocalization.AirportOrigin.val(data.Airport);
                }
    };

    return thisGeoLocalization;

};