

VUELING.Class.GeoLocalizationSearch = function () {
    var parent = new VUELING.Class.GeoLocalizationBase(),
        thisGeoLocalization = SKYSALES.Util.extendObject(parent);

    thisGeoLocalization.LabelOrigin = "";

    thisGeoLocalization.init = function (json) {
        parent.init(json);
        if (this.AirportOrigin.val() == thisGeoLocalization.LabelOrigin) {
            this.callAjax();
        }
    };

    thisGeoLocalization.onsuccess = function (data) {
                if (thisGeoLocalization.AirportOrigin.val() == thisGeoLocalization.LabelOrigin) {
                    var vuelingSearcherTemp = VUELING.Util.getObjectInstance("vuelingSearcher");
                    if (data.Mac) {
                        if (thisGeoLocalization.Resource.stationHash[data.Mac] != undefined) {
                            var macName = thisGeoLocalization.Resource.stationHash[data.Mac];
                            thisGeoLocalization.AirportOrigin.val(macName.name);
                            vuelingSearcherTemp.departureStationCodeInput1.val(data.Mac);
                        }
                    }
                    else {
                        if (thisGeoLocalization.Resource.stationHash[data.Airport] != undefined) {
                            var cityName = thisGeoLocalization.Resource.stationHash[data.Airport];
                            thisGeoLocalization.AirportOrigin.val(cityName.name);
                            vuelingSearcherTemp.departureStationCodeInput1.val(data.Airport);
                        }
                    }
                    vuelingSearcherTemp.originInput.change();
                    setTimeout(function () { thisGeoLocalization.AirportOrigin.blur(); vuelingSearcherTemp.destinationInput.val(vuelingSearcherTemp.labelDestination); }, 50);
                }
    };

    return thisGeoLocalization;
};