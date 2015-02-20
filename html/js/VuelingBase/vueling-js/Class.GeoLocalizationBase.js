

VUELING.Class.GeoLocalizationBase = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisGeoLocalization = SKYSALES.Util.extendObject(parent);

    thisGeoLocalization.IpGeoLocalization = "";
    thisGeoLocalization.UrlGeoLocalization = "";
    thisGeoLocalization.AirportOriginId = "";

    thisGeoLocalization.AirportOrigin = null;
    thisGeoLocalization.Resource = SKYSALES.Util.getResource();

    thisGeoLocalization.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
    };

    thisGeoLocalization.setVars = function () {
        if (this.AirportOriginId != "")
            this.AirportOrigin = $("#" + this.AirportOriginId);
    };

    thisGeoLocalization.callback = function (data) {
    };

    thisGeoLocalization.onsuccess = function (data) {
    };

    thisGeoLocalization.callAjax = function () {
        var self = this;
        var data = { "ip": this.IpGeoLocalization };
        $.ajax({
            cache: true,
            url: this.UrlGeoLocalization + "/GetNearlyAirport_ByIP_Ajax",
            data: data,
            type: "GET",
            jsonpCallback: "callback",
            contentType: "application/javascript",
            dataType: "jsonp",
            error: function () {
            },
            success: function (data) {
                self.onsuccess(data);
            }
        });
    };

    return thisGeoLocalization;
};