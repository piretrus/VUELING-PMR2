

VUELING.Class.PushSellDates = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisPushSellDates = SKYSALES.Util.extendObject(parent);

    thisPushSellDates.url = "";
    thisPushSellDates.route = "";
    thisPushSellDates.dateOutbound = "";
    thisPushSellDates.dateReturn = "";

    thisPushSellDates.init = function (json) {
        this.setSettingsByObject(json);
        this.doCallAjax();
    };

    thisPushSellDates.doCallAjax = function () {
        var data = "route=" + thisPushSellDates.route + "&dateOutbound=" + thisPushSellDates.dateOutbound + "&dateReturn=" + thisPushSellDates.dateReturn;

        $.ajax({
            type: "GET",
            dataType: "jsonp",
            data: data,
            cache: true,
            url: thisPushSellDates.url,
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.readyState != 4 || jqXHR.status != 200) {
                    console.log("error: " + errorThrown);
                }
            }
        });
    };

    return thisPushSellDates;
};