

VUELING.Class.MoovingPassengersCount = function (json) {
    json = json || {};
    var parent = SKYSALES.Class.Resource(),
    thisMoovingPassengerCount = SKYSALES.Util.extendObject(parent);

    thisMoovingPassengerCount.passengersId = "";
    thisMoovingPassengerCount.passengers = null;
    thisMoovingPassengerCount.totalPassengersId = "";
    thisMoovingPassengerCount.totalPassengers = null;
    thisMoovingPassengerCount.totalPassengersUrl = "";
    thisMoovingPassengerCount.totalPassengersTimeout = 5000;

    thisMoovingPassengerCount.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
    };

    thisMoovingPassengerCount.initObject = function () {
        thisMoovingPassengerCount.passengers = this.getById(thisMoovingPassengerCount.passengersId);
        thisMoovingPassengerCount.totalPassengers = this.getById(thisMoovingPassengerCount.totalPassengersId);
        thisMoovingPassengerCount.checkTotalPassengers();
    };

    thisMoovingPassengerCount.checkTotalPassengers = function () {

        $.ajax({
            url: thisMoovingPassengerCount.totalPassengersUrl + "/TotalMovedPaxNumber",
            type: "GET",
            jsonpCallback: "callback",
            contentType: "application/javascript",
            dataType: "jsonp",
            success: function (data) {
                SKYSALES.Util.MoovingCountPassengersCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                SKYSALES.Util.MoovingCountPassengersErrorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    };

    thisMoovingPassengerCount.countPassengersCallback = function (data) {
        thisMoovingPassengerCount.totalPassengers.text(data);
        thisMoovingPassengerCount.passengers.show();
        if (data == 0)
            thisMoovingPassengerCount.passengers.hide();
    };

    thisMoovingPassengerCount.countPassengersErrorCallback = function () {
        thisMoovingPassengerCount.passengers.hide();
    };

    return thisMoovingPassengerCount;
};