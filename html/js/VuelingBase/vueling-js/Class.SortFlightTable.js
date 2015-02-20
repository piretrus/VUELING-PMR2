

VUELING.Class.SortFlightTable = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisSortFlightTable = SKYSALES.Util.extendObject(parent);

    thisSortFlightTable.availabilityTableId = '';
    thisSortFlightTable.dropDownListSorterId = '';
    thisSortFlightTable.dropDownListSorterClass = '';
    thisSortFlightTable.combosWithTables = new Array();
    thisSortFlightTable.connectionsAbTestingOption = '';
    thisSortFlightTable.routecellLegendClass = '';
    thisSortFlightTable.markets = [];
    thisSortFlightTable.Labels = [];

    thisSortFlightTable.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.InitialSort();
    };

    thisSortFlightTable.setVars = function () {
        parent.setVars.call(this);
        $("." + this.dropDownListSorterClass).each(function (key, value) {
            var counter = thisSortFlightTable.combosWithTables.length;
            thisSortFlightTable.combosWithTables[counter] = new Array();
            thisSortFlightTable.combosWithTables[counter][0] = $(value).closest("table");
            thisSortFlightTable.combosWithTables[counter][1] = $(value);
        });
    };

    thisSortFlightTable.addEvents = function () {
        parent.addEvents.call(this);
        for (var i = 0; i < this.combosWithTables.length; i++) {
            $("body").delegate("#" + this.combosWithTables[i][1].attr("id"), 'change', { tableId: this.combosWithTables[i][0].attr("id") }, thisSortFlightTable.SortHandler);
            $(this.combosWithTables[i][1]).click(function () {
                $('.connectInfo div.connectInfoItem').hide();
            });
        }
    };

    thisSortFlightTable.SortHandler = function (e) {
        thisSortFlightTable.Sort($("#" + e.data.tableId), $(this).val());
    };

    thisSortFlightTable.Sort = function (table, type) {
        switch (type) {
            case 'departureTimeSort':
                this.SortDepartureTime(table);
                break;
            case 'arrivalTimeSort':
                this.SortDepartureTime(table);
                this.SortArrivalTime(table);
                break;
            case 'minorPriceSort':
                this.SortDepartureTime(table);
                this.SortMinorPrice(table);
                break;
            case 'durationSort':
                this.SortDepartureTime(table);
                this.SortDuration(table);
                break;
            case 'directFlightsSort':
                this.SortDepartureTime(table);
                this.SortDirectFlightsFirst(table);
                break;
        }
    };

    thisSortFlightTable.SortDepartureTime = function (table) {
        var tbody = $('tbody', table);
        var rows = $('tr', tbody);
        var compare_rows = function (a, b) {
            var dateA = thisSortFlightTable.GetDateFromISO(a.getAttribute('departureTime'));
            var dateB = thisSortFlightTable.GetDateFromISO(b.getAttribute('departureTime'));
            if (dateA > dateB) {
                return 1;
            }
            if (dateA < dateB) {
                return -1;
            }
            return 0;
        };
        rows.sort(compare_rows).appendTo(tbody);
    };

    thisSortFlightTable.SortArrivalTime = function (table) {
        var tbody = $('tbody', table);
        var rows = $('tr', tbody);
        var compare_rows = function (a, b) {
            var dateA = thisSortFlightTable.GetDateFromISO(a.getAttribute('arrivalTime'));
            var dateB = thisSortFlightTable.GetDateFromISO(b.getAttribute('arrivalTime'));
            if (dateA > dateB) {
                return 1;
            }
            if (dateA < dateB) {
                return -1;
            }
            return 0;
        };
        rows.sort(compare_rows).appendTo(tbody);
    };

    thisSortFlightTable.SortMinorPrice = function (table) {
        var tbody = $('tbody', table);
        var rows = $('tr', tbody);
        var compare_rows = function (a, b) {
            var keyA = parseFloat($(a.getAttribute('basicPriceRoute'), a).text().replace(',', '.'));
            var keyB = parseFloat($(b.getAttribute('basicPriceRoute'), b).text().replace(',', '.'));
            if (keyA > keyB) {
                return 1;
            }
            if (keyA < keyB) {
                return -1;
            }
            var dateA = thisSortFlightTable.GetDateFromISO(a.getAttribute('departureTime'));
            var dateB = thisSortFlightTable.GetDateFromISO(b.getAttribute('departureTime'));
            if (dateA > dateB) {
                return 1;
            }
            if (dateA < dateB) {
                return -1;
            }
            return 0;
        };
        rows.sort(compare_rows).appendTo(tbody);
    };

    thisSortFlightTable.SortDuration = function (table) {
        var tbody = $('tbody', table);
        var rows = $('tr', tbody);
        var compare_rows = function (a, b) {
            var durationA = parseInt(a.getAttribute('duration'));
            var durationB = parseInt(b.getAttribute('duration'));
            if (durationA > durationB) {
                return 1;
            }
            if (durationA < durationB) {
                return -1;
            }
            return 0;
        };
        rows.sort(compare_rows).appendTo(tbody);
    };

    thisSortFlightTable.SortDirectFlightsFirst = function (table) {
        var tbody = $('tbody', table);
        var rows = $('tr', tbody);
        var compare_rows = function (a, b) {
            var keyA = parseInt(a.getAttribute('connectionFlight'));
            var keyB = parseInt(b.getAttribute('connectionFlight'));
            if (keyA > keyB) {
                return 1;
            }
            if (keyA < keyB) {
                return -1;
            }
            var dateA = thisSortFlightTable.GetDateFromISO(a.getAttribute('departureTime'));
            var dateB = thisSortFlightTable.GetDateFromISO(b.getAttribute('departureTime'));
            if (dateA > dateB) {
                return 1;
            }
            if (dateA < dateB) {
                return -1;
            }
            return 0;
        };
        rows.sort(compare_rows).appendTo(tbody);
    };

    thisSortFlightTable.GetDateFromISO = function (dateString) {
        var datesplit = dateString.split(/\D/);
        return new Date(Date.UTC(datesplit[0], --datesplit[1] || '', datesplit[2] || '', datesplit[3] || '', datesplit[4] || '', datesplit[5] || '', datesplit[6] || ''));
    };

    thisSortFlightTable.InitialSort = function () {
        for (var i = 0; i < this.combosWithTables.length; i++) {
            if (thisSortFlightTable.connectionsAbTestingOption != undefined && thisSortFlightTable.connectionsAbTestingOption != '') {
                thisSortFlightTable.AbTestingSort(this.combosWithTables[i][0], thisSortFlightTable.connectionsAbTestingOption);
            } else {
                var selectedOptionInCombo = ((this.combosWithTables[i][1][0] != undefined) ? this.combosWithTables[i][1][0].options[0].value : "departureTimeSort");
                thisSortFlightTable.Sort(this.combosWithTables[i][0], selectedOptionInCombo);
            }
        }
    };

    /* ABTesting Connections Reorder */
    thisSortFlightTable.AbTestingSort = function (table, type) {
        switch (type) {
            case "DepartureTimeAscending":
                thisSortFlightTable.Sort(table, "departureTimeSort");
                break;
            case "TwoConnectionsHour":
                this.TwoConnectionsHour(table);
                break;
            case "ConnectionLowestPriceFirst":
                this.DirectFirstConnectionLowestPriceFirst(table);
                break;
        }
    };

    thisSortFlightTable.DirectFirstConnectionLowestPriceFirst = function (table) {
        var arrayOrdered = new Array();
        var tableSources = thisSortFlightTable.ArrayFilter(thisSortFlightTable.markets, "marketIndex", table.attr("marketindex"));
        if (tableSources == undefined || tableSources.length == 0) return false;

        // Primero colocamos los vuelos directos //
        var directJourneys = thisSortFlightTable.ArrayFilter(tableSources[0].journeys, "connectionFlight", "0");
        if (directJourneys != undefined && directJourneys.length > 0)
            if (directJourneys.length == 1) {
                arrayOrdered.push(directJourneys[0]);
            } else {
                arrayOrdered.push.apply(arrayOrdered, directJourneys.sort(thisSortFlightTable.SortByDepartureTimeAsc));
            }

        // Segundo las conexiones //
        var connectionJourneys = thisSortFlightTable.ArrayFilter(tableSources[0].journeys, "connectionFlight", "1");
        var recommendedConnection = thisSortFlightTable.GetRecommendedConnection(connectionJourneys);
        var connectionsFiltered = thisSortFlightTable.RemoveElementFromArray(connectionJourneys, recommendedConnection);

        if (recommendedConnection != undefined)
            arrayOrdered.push(recommendedConnection);

        if (connectionsFiltered != undefined)
            if (connectionsFiltered.length == 1) {
                arrayOrdered.push(connectionsFiltered[0]);
            } else {
                arrayOrdered.push.apply(arrayOrdered, connectionsFiltered.sort(thisSortFlightTable.SortByDepartureTimeAsc == 0 ? thisSortFlightTable.SortBArrivalTimeAsc : thisSortFlightTable.SortByDepartureTimeAsc));
            }

        if (arrayOrdered.length != 0) {
            $.each(arrayOrdered, function () {
                $("#" + table.attr("id")).append($("[connectionflight='" + this.connectionFlight + "'][departuretime='" + this.departureTime + "'][arrivaltime='" + this.arrivalTime + "'][duration='" + this.duration + "']"));
            });
        }

        if (recommendedConnection != undefined) {
            var connectionsPrice = connectionsFiltered.sort(thisSortFlightTable.SortByPrice);
            var isTheShortestConnectionByPrice = false;
            if (connectionsPrice != undefined && connectionsPrice.length > 0) {
                if (connectionsPrice[0].basicPriceRoute == recommendedConnection.basicPriceRoute)
                    isTheShortestConnectionByPrice = true;
            }

            if (isTheShortestConnectionByPrice) {
                thisSortFlightTable.PrintLoestPriceLowestConnection(table, recommendedConnection);
            } else {
                thisSortFlightTable.PrintLowestPriceOnly(table, recommendedConnection);
            }

        }
        return false;
    };

    thisSortFlightTable.PrintLowestPriceOnly = function (table, flight) {
        var label = thisSortFlightTable.ArrayFilter(thisSortFlightTable.Labels, "id", "bestPrice");
        if (label == undefined) return false;
        var element = $("#" + table.attr("id")).find("[connectionflight='" + flight.connectionFlight + "'][departuretime='" + flight.departureTime + "'][arrivaltime='" + flight.arrivalTime + "'][duration='" + flight.duration + "']").find("." + thisSortFlightTable.routecellLegendClass);
        element.find("[data-icon]").addClass("ico_mas_economico");
        element.find("[data-text]").html(label[0].text);
        element.removeClass("hidden");
    };

    thisSortFlightTable.PrintLowestConnectionOnly = function (table, flight) {
        var label = thisSortFlightTable.ArrayFilter(thisSortFlightTable.Labels, "id", "lowConnectionTime");
        if (label == undefined) return false;
        var element = $(table).find("[connectionflight='" + flight.connectionFlight + "'][departuretime='" + flight.departureTime + "'][arrivaltime='" + flight.arrivalTime + "'][duration='" + flight.duration + "']").find("." + thisSortFlightTable.routecellLegendClass);
        element.find("[data-icon]").addClass("ico_menor_tiempo");
        element.find("[data-text]").html(label[0].text);
        element.removeClass("hidden");
    };

    thisSortFlightTable.PrintLoestPriceLowestConnection = function (table, flight) {
        var label = thisSortFlightTable.ArrayFilter(thisSortFlightTable.Labels, "id", "bestPriceAndlowConnectionTime");
        if (label == undefined) return false;
        var element = $("#" + table.attr("id")).find("[connectionflight='" + flight.connectionFlight + "'][departuretime='" + flight.departureTime + "'][arrivaltime='" + flight.arrivalTime + "'][duration='" + flight.duration + "']").find("." + thisSortFlightTable.routecellLegendClass);
        element.find("[data-icon]").addClass("ico_mas_economico_menor_tiempo");
        element.find("[data-text]").html(label[0].text);
        element.removeClass("hidden");
    };

    thisSortFlightTable.TwoConnectionsHour = function (table) {
        var arrayOrdered = new Array();
        var arrayToHide = new Array();
        var tableSources = thisSortFlightTable.ArrayFilter(thisSortFlightTable.markets, "marketIndex", table.attr("marketindex"));
        if (tableSources == undefined || tableSources.length == 0) return false;
        var distinctTimes = thisSortFlightTable.GetDistinctTimes(tableSources[0].journeys);

        var directFlights = thisSortFlightTable.ArrayFilter(tableSources[0].journeys, "connectionFlight", "0");
        var connectionFlights = thisSortFlightTable.ArrayFilter(tableSources[0].journeys, "connectionFlight", "1");

        if (distinctTimes == undefined || distinctTimes.length == 0) return false;
        for (var i = 0; i < distinctTimes.length; i++) {
            var directFlightsByTime = thisSortFlightTable.ArrayFilter(directFlights, "departureTime", distinctTimes[i]);
            if (directFlightsByTime != undefined && directFlightsByTime.length > 0)
                $.merge(arrayOrdered, directFlightsByTime);
            var connectionFlightsByTime = thisSortFlightTable.ArrayFilter(connectionFlights, "departureTime", distinctTimes[i]);
            if (connectionFlightsByTime != undefined && connectionFlightsByTime.length > 0)
                if (connectionFlightsByTime.length <= 2) {
                    $.merge(arrayOrdered, connectionFlightsByTime);
                } else {
                    for (var x = 0; x < connectionFlightsByTime.length; x++) {
                        if (x <= 1) {
                            arrayOrdered.push(connectionFlightsByTime[x]);
                        } else {
                            arrayToHide.push(connectionFlightsByTime[x]);
                        }
                    }
                }
        }

        var connectionLowestPrice = null;
        var connectionsReordered = connectionFlights.sort(thisSortFlightTable.SortByPrice);
        for (var i = 0; i < connectionsReordered.length; i++) {
            if (!thisSortFlightTable.ExistElementInArray(arrayToHide, connectionsReordered[i])) {
                connectionLowestPrice = connectionsReordered[i];
                break;
            }
        }

        var connectionLowestConnectionTime = null;
        var connectionsTimeReordered = connectionFlights.sort(thisSortFlightTable.SortByConnectionDuration);
        for (var i = 0; i < connectionsTimeReordered.length; i++) {
            if (!thisSortFlightTable.ExistElementInArray(arrayToHide, connectionsTimeReordered[i])) {
                connectionLowestConnectionTime = connectionsTimeReordered[i];
                break;
            }
        }

        if (arrayOrdered.length != 0) {
            $.each(arrayOrdered, function () {
                $("#" + table.attr("id")).append($("[connectionflight='" + this.connectionFlight + "'][departuretime='" + this.departureTime + "'][arrivaltime='" + this.arrivalTime + "'][duration='" + this.duration + "']"));
            });

            $.each(arrayToHide, function () {
                $("#" + table.attr("id")).find("[connectionflight='" + this.connectionFlight + "'][departuretime='" + this.departureTime + "'][arrivaltime='" + this.arrivalTime + "'][duration='" + this.duration + "']").addClass("hidden");
            });
        }

        var isTheSameflight = thisSortFlightTable.FlightComparer(connectionLowestPrice, connectionLowestConnectionTime);
        if (isTheSameflight) {
            thisSortFlightTable.PrintLoestPriceLowestConnection(table, connectionLowestPrice);
        } else {
            thisSortFlightTable.PrintLowestPriceOnly(table, connectionLowestPrice);
            thisSortFlightTable.PrintLowestConnectionOnly(table, connectionLowestConnectionTime);
        }
    };

    thisSortFlightTable.GetDistinctTimes = function (marketArray) {
        var unique = {};
        var distinct = [];
        for (var i in marketArray) {
            if (typeof (unique[marketArray[i].departureTime]) == "undefined") {
                distinct.push(marketArray[i].departureTime);
            }
            unique[marketArray[i].departureTime] = 0;
        }
        return distinct.sort(function (a, b) {
            var aDate = thisSortFlightTable.GetDateFromISO(a);
            var bDate = thisSortFlightTable.GetDateFromISO(b);
            return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
        });
    };

    thisSortFlightTable.RemoveElementFromArray = function (array, elementToRemove) {
        var arrayFiltered = new Array();
        if (array == undefined || array.length == 0) return arrayFiltered;
        for (var i = 0; i < array.length; i++) {
            if (!thisSortFlightTable.FlightComparer(elementToRemove, array[i]))
                arrayFiltered.push(array[i]);
        }
        return arrayFiltered;
    };

    thisSortFlightTable.GetRecommendedConnection = function (connections) {
        var flight = undefined;
        if (connections == undefined || connections.length == 0) return flight;
        var connectionJourneyLowestPrice = connections.sort(thisSortFlightTable.SortByPrice);
        if (connectionJourneyLowestPrice != undefined && connectionJourneyLowestPrice.length != 0)
            flight = connectionJourneyLowestPrice[0];
        return flight;
    };

    thisSortFlightTable.SortByDepartureTimeAsc = function (a, b) {
        var aDate = thisSortFlightTable.GetDateFromISO(a.departureTime);
        var bDate = thisSortFlightTable.GetDateFromISO(b.departureTime);
        return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
    };

    thisSortFlightTable.SortBArrivalTimeAsc = function (a, b) {
        var aDate = thisSortFlightTable.GetDateFromISO(a.arrivalTime);
        var bDate = thisSortFlightTable.GetDateFromISO(b.arrivalTime);
        return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
    };

    thisSortFlightTable.SortByPrice = function (a, b) {
        var aPrice = parseInt(a.basicPriceRoute);
        var bPrice = parseInt(b.basicPriceRoute);
        return ((aPrice < bPrice) ? -1 : ((aPrice > bPrice) ? 1 : thisSortFlightTable.SortByTotalFlightDuration(a, b)));
    };

    thisSortFlightTable.SortByTotalFlightDuration = function (a, b) {
        var aDuration = thisSortFlightTable.GetDateFromISO(a.arrivalTime) - thisSortFlightTable.GetDateFromISO(a.departureTime);
        var bDuration = thisSortFlightTable.GetDateFromISO(b.arrivalTime) - thisSortFlightTable.GetDateFromISO(b.departureTime);
        return ((aDuration < bDuration) ? -1 : ((aDuration > bDuration) ? 1 : thisSortFlightTable.SortByConnectionDuration(a, b)));
    };

    thisSortFlightTable.SortByConnectionDuration = function (a, b) {
        var aDuration = parseInt(a.duration);
        var bDuration = parseInt(b.duration);
        return ((aDuration < bDuration) ? -1 : ((aDuration > bDuration) ? 1 : 0));
    };

    thisSortFlightTable.FlightComparer = function (first, second) {

        if (first.departureTime == second.departureTime
            && first.arrivalTime == second.arrivalTime
            && first.duration == second.duration
            && first.connectionFlight == second.connectionFlight
            && first.basicPriceRoute == second.basicPriceRoute)
            return true;
        return false;
    };

    thisSortFlightTable.ArrayFilter = function (array, propertyToFilter, valueToFilter) {
        var result = new Array();
        for (var i = 0; i < array.length; i++) {
            if (array[i][propertyToFilter] == valueToFilter) {
                result.push(array[i]);
            }
        };
        return result;
    };

    thisSortFlightTable.ExistElementInArray = function (array, element) {
        var result = false;
        for (var i = 0; i < array.length; i++) {
            if (thisSortFlightTable.FlightComparer(array[i], element)) {
                result = true;
                break;
            }
        }
        return result;
    };

    return thisSortFlightTable;
}