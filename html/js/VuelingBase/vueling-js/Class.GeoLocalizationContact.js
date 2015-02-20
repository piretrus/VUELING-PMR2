

VUELING.Class.GeoLocalizationContact = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisGeoLocalization = SKYSALES.Util.extendObject(parent);

    thisGeoLocalization.IpGeoLocalization = "";
    thisGeoLocalization.UrlGeoLocalization = "";
    thisGeoLocalization.CountryId = "";
    thisGeoLocalization.CityId = "";

    thisGeoLocalization.Country = null;
    thisGeoLocalization.City = null;
    thisGeoLocalization.Resource = SKYSALES.Util.getResource();

    thisGeoLocalization.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        if (!this.City.val() && !this.Country.val()) {
            this.callAjax();
        }
    };

    thisGeoLocalization.setVars = function () {
        if (this.CountryId != "")
            this.Country = $("#" + this.CountryId);
        if (this.CityId != "")
            this.City = $("#" + this.CityId);
    };

    thisGeoLocalization.callback = function (data) {
    };

    thisGeoLocalization.callAjax = function () {
        var data = { "ip": this.IpGeoLocalization };
        $.ajax({
            cache: true,
            url: this.UrlGeoLocalization + "/GetNearlyCity_ByIP_Ajax",
            data: data,
            type: "GET",
            jsonpCallback: "callback",
            contentType: "application/javascript",
            dataType: "jsonp",
            error: function () {
            },
            success: function (data) {
                if (!thisGeoLocalization.City.val() && !thisGeoLocalization.Country.val()) {
                    if (data.CountryCode) {
                        thisGeoLocalization.Country.val(data.CountryCode);
                    }
                    
                    //    thisGeoLocalization.City.val(data.City);
                    
                }
            }
        });
    };

    return thisGeoLocalization;

};