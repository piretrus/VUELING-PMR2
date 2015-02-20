

VUELING.Util.ChangeSelectedDate = function (market, date) {
    var dateSelected;
    if (typeof date === 'string')
        dateSelected = date;
    else {
        var year = date.getFullYear(),
            day = date.getDate().toString(),
            month = (date.getMonth() + 1).toString();
        if (month.length == 1) month = '0' + month;
        if (day.length == 1) day = '0' + day;
        dateSelected = month + "/" + day + "/" + year;
    }

    var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
    if (availabilityInputInstance != null) {
        var dateMarketLowestFare_sameMarket;
        var dateSelected_Date = new Date(dateSelected + " 23:59:59");
        var isDateSelectedWithFlights = false;

        for (var i in availabilityInputInstance.dateMarketLowestFareArray) {
            var dateMarketLowestFare = availabilityInputInstance.dateMarketLowestFareArray[i];

            if (dateMarketLowestFare.marketIndex == market) {
                dateMarketLowestFare_sameMarket = dateMarketLowestFare;

                var depDate_Date = new Date(dateMarketLowestFare.deptDate + " 23:59:59");
                if (depDate_Date >= dateSelected_Date) {
                    if ($('#' + dateMarketLowestFare.tabLink.attr('id')).is('a')) { // Tiene Vuelos: me quedo con el primer día que tenga vuelos (así me ahorro llamar a la cache)
                        isDateSelectedWithFlights = true;
                        dateSelected = dateMarketLowestFare.deptDate;
                        break;
                    }
                }
            }
        }
        if (isDateSelectedWithFlights) {
            SKYSALES.Util.ScheduleSelectedDate(market, dateSelected);
            dateMarketLowestFare_sameMarket.deptDate = dateSelected;
            dateMarketLowestFare_sameMarket.toggleSpinner();
            dateMarketLowestFare_sameMarket.setupAjaxAndSendRequest();
        } else {
            var vuelingSearcherInstance = VUELING.Util.getObjectInstance('vuelingSearcher');
            if (vuelingSearcherInstance != null) {
                // Preparamos para llamar a la Cache, para saber el próximo día de la ruta que tiene vuelos
                var origin = availabilityInputInstance.marketArray[market].marketDepartCode;
                var destination = availabilityInputInstance.marketArray[market].marketArriveCode;

                SKYSALES.Util.ScheduleSelectedDate(market, dateSelected);
                if (vuelingSearcherInstance.checkRoutesAndPromoUniversalData == undefined || vuelingSearcherInstance.checkRoutesAndPromoUniversalData.data[origin] == undefined ||
                   (vuelingSearcherInstance.checkRoutesAndPromoUniversalData.data[origin] != undefined && vuelingSearcherInstance.checkRoutesAndPromoUniversalData.data[origin][destination] == undefined)) {
                    var myDate = dateSelected.split("/");
                    var month = myDate[0];
                    var year = myDate[2];

                    if (market == 0)
                        vuelingSearcherInstance.checkRoutesAndPromoUniversal(month, year, origin, destination, "VUELING.Util.ChangeSelectedDateDepartureCallbackOk", "VUELING.Util.ChangeSelectedDateDepartureErrorCallback");
                    else
                        vuelingSearcherInstance.checkRoutesAndPromoUniversal(month, year, origin, destination, "VUELING.Util.ChangeSelectedDateReturnCallbackOk", "VUELING.Util.ChangeSelectedDateReturnErrorCallback");
                } else {
                    // Ya se ha llamado anteriormente a la Cache, entonces no es necesario volver a llamarla, porque tenemos la información en la Instancia de vuelingSearcher
                    VUELING.Util.ChangeSelectedDateCallbackOk(market);
                }
            } else {
                // No puedo acceder a la cache paso a la siguiente semana directamente, porque los días del MarketLowestFare tampoco tienen vuelos
                availabilityInputInstance.nextWeek[market].click();
            }
        }
    }
};