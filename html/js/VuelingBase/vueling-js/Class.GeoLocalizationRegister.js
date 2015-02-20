

VUELING.Class.GeoLocalizationRegister = function () {
    var parent = new VUELING.Class.GeoLocalizationBase(),
        thisGeoLocalization = SKYSALES.Util.extendObject(parent);

    thisGeoLocalization.init = function (json) {
        parent.init(json);
        if (!this.AirportOrigin.val()) {
            this.callAjax();
        }
    };

    thisGeoLocalization.onsuccess = function (data) {
                if (!thisGeoLocalization.AirportOrigin.val()) {
                    if (data.Airport) {
                        thisGeoLocalization.AirportOrigin.val(data.Airport);
                    }
                }
    };

    return thisGeoLocalization;
};