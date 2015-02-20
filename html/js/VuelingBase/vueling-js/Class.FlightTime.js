

VUELING.Class.FlightTime = function (json) {
    json = json || {};
    var parent = new SKYSALES.Class.SkySales(),
    thisFlightTime = SKYSALES.Util.extendObject(parent);

    thisFlightTime.newFlightTimeButtonId = '';
    thisFlightTime.newFlightTimeCloseButtonId = '';
    thisFlightTime.newFlightTimeId = '';
    thisFlightTime.searchButtonId = '';

    thisFlightTime.departAirport = null;
    thisFlightTime.arriveAirport = null;
    thisFlightTime.planeIcon = null;
    thisFlightTime.flightDuration = null;
    thisFlightTime.flightWithConection = null;
    thisFlightTime.labelFlight = null;
    thisFlightTime.departAirport = null;
    thisFlightTime.departTime = null;
    thisFlightTime.arriveAirport = null;
    thisFlightTime.arriveTime = null;
    thisFlightTime.flightId = null;

    thisFlightTime.flightIdSecondSegment = null;
    thisFlightTime.labelFlightConexion = null;
    thisFlightTime.departAirportSecondSegment = null;
    thisFlightTime.departTimeSecondSegment = null;
    thisFlightTime.arriveAirportSecondSegment = null;
    thisFlightTime.arriveTimeSecondSegment = null;
    thisFlightTime.flightDurationSecondSegment = null;

    thisFlightTime.labelFlightBetweenDays = null;
    thisFlightTime.labelFlightAtNight = null;
    thisFlightTime.labelDate = null;


    thisFlightTime.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisFlightTime.initObject = function () {

        thisFlightTime.newFlightTimeCloseButton = this.getById(thisFlightTime.newFlightTimeCloseButtonId);
        thisFlightTime.newFlightTimeButton = this.getById(thisFlightTime.newFlightTimeButtonId);

        thisFlightTime.blockUI = new SKYSALES.Class.BlockedPopUp();

        json.closeElement = thisFlightTime.newFlightTimeCloseButton;
        json.properties = { css: { width: '550px' } };
        thisFlightTime.blockUI.init(json);

    };

    thisFlightTime.addEvents = function () {
        thisFlightTime.newFlightTimeButton.click(thisFlightTime.openFlightTime);
    };

    thisFlightTime.openFlightTime = function (e) {
        var labeltoshow = thisFlightTime.labelFlightBetweenDays != null ? thisFlightTime.labelFlightBetweenDays : thisFlightTime.labelFlightAtNight;
        if (labeltoshow != null) {
            $("#FlightBetweenDaysDiv").show();
            $("#FlightBetweenDays").html(labeltoshow);
        } else {
            $("#FlightBetweenDaysDiv").hide();
        }

        if (thisFlightTime.flightWithConection == "1") {
            $("#VueloConexion").hide();
            $("#VueloDirecto").show();
            $("#FlightText").html(thisFlightTime.labelFlight + " - " + thisFlightTime.labelDate);
            $("#flightNo").html(thisFlightTime.flightId);
            $("#depStation").html(thisFlightTime.departAirport);
            $("#flightStd").html(thisFlightTime.departTime);
            $("#arrStation").html(thisFlightTime.arriveAirport);
            $("#flightSta").html(thisFlightTime.arriveTime);
            $("#flightTime").html(thisFlightTime.flightDuration);
        } else {
            $("#VueloConexion").show();
            $("#VueloDirecto").hide();
            $("#FlightText").html(thisFlightTime.labelFlightConexion + "<br/>" + thisFlightTime.labelDate);
            $("#flightNo1").html(thisFlightTime.flightId);
            $("#flightNo2").html(thisFlightTime.flightIdSecondSegment);
            $("#Airport1Seg").html(thisFlightTime.departAirport + "<strong>" + thisFlightTime.departTime + "</strong>" + "<span class='tc_greyLight fs_13'> - </span><br/>" + thisFlightTime.arriveAirport + "<strong>" + thisFlightTime.arriveTime + "</strong>");
            $("#Airport2Seg").html(thisFlightTime.departAirportSecondSegment + "<strong>" + thisFlightTime.departTimeSecondSegment + "</strong>" + "<span class='tc_greyLight fs_13'> - </span><br/>" + thisFlightTime.arriveAirportSecondSegment + "<strong>" + thisFlightTime.arriveTimeSecondSegment + "</strong>");
            $("#flightTimeCnx1").html(thisFlightTime.flightDuration);
            $("#flightTimeCnx2").html(thisFlightTime.flightDurationSecondSegment);
        }

        //thisFlightTime.newFlightTimeCloseButtonId
        $("#icoFlightTime").attr("class", thisFlightTime.planeIcon);
        e.preventDefault();
        thisFlightTime.blockUI.show(thisFlightTime.newFlightTimeId);
    };

    return thisFlightTime;
};