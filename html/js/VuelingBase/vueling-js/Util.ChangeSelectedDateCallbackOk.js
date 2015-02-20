

VUELING.Util.ChangeSelectedDateCallbackOk = function (market) {
    var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
    var vuelingSearcherInstance = VUELING.Util.getObjectInstance('vuelingSearcher');

    var origin = availabilityInputInstance.marketArray[market].marketDepartCode;
    var destination = availabilityInputInstance.marketArray[market].marketArriveCode;
    var dateSelected_Date = new Date(availabilityInputInstance.marketArray[market].marketDepartDate + " 23:59:59");

    var dateSelectedWithFlights = vuelingSearcherInstance.checkRoutesDayMarkets(dateSelected_Date, origin, destination);
    while (!dateSelectedWithFlights) {
        dateSelected_Date.setTime(dateSelected_Date.getTime() + (1 * 24 * 60 * 60 * 1000)); // Add 1 day
        dateSelectedWithFlights = vuelingSearcherInstance.checkRoutesDayMarkets(dateSelected_Date, origin, destination);
    }
    var year = dateSelected_Date.getFullYear(),
        day = dateSelected_Date.getDate().toString(),
        month = (dateSelected_Date.getMonth() + 1).toString();
    if (month.length == 1) month = '0' + month;
    if (day.length == 1) day = '0' + day;
    var dateSelected = month + "/" + day + "/" + year;

    var dateMarketLowestFare_sameMarket;
    for (var i in availabilityInputInstance.dateMarketLowestFareArray) {
        var dateMarketLowestFare = availabilityInputInstance.dateMarketLowestFareArray[i];
        if (dateMarketLowestFare.marketIndex == market) {
            dateMarketLowestFare_sameMarket = dateMarketLowestFare;
            break;
        }
    }
    if (dateMarketLowestFare_sameMarket) {
        SKYSALES.Util.ScheduleSelectedDate(market, dateSelected);
        dateMarketLowestFare_sameMarket.deptDate = dateSelected;
        dateMarketLowestFare_sameMarket.toggleSpinner();
        dateMarketLowestFare_sameMarket.setupAjaxAndSendRequest();
    } else {
        availabilityInputInstance.nextWeek[market].click();
    }
};