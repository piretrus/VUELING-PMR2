

VUELING.Class.C3SidebarSeats = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisC3SidebarSeats = SKYSALES.Util.extendObject(parent);

    thisC3SidebarSeats.SidebarBaseInstance = null;
    thisC3SidebarSeats.SeatFeeCode = "SEAT";

    thisC3SidebarSeats.init = function (json) {
        this.GetSidebarBaseInstance();
        this.RegisterObservers();
    };

    thisC3SidebarSeats.GetSidebarBaseInstance = function () {
        thisC3SidebarSeats.SidebarBaseInstance = VUELING.Util.getObjectInstance("C3Sidebar");
    };

    thisC3SidebarSeats.RegisterObservers = function () {
        thisC3SidebarSeats.RegisterSeatMapObserver();
    };

    thisC3SidebarSeats.RegisterSeatMapObserver = function () {
        var seatmaps = VUELING.Util.getObjectInstanceAllStartWith("selectSeat");
        $.each(seatmaps, function (index, item) {
            item.addSelectedSeatObserver(thisC3SidebarSeats.SelectSeat);
        });
    };

    thisC3SidebarSeats.SelectSeat = function (seat, pageCode, isRemove) {
        var price = seat["price"];
        var segment = seat["segment"];
        var journey = seat["journey"];
        var paxId = seat["paxId"];
        var seatType = seat["data_seat_type"];

        var page = thisC3SidebarSeats.SidebarBaseInstance.GetPageInfo(pageCode);
        var feeInfo = thisC3SidebarSeats.SidebarBaseInstance.GetFeeElementFromFeeSSRList(thisC3SidebarSeats.SeatFeeCode);
        var seat = thisC3SidebarSeats.SidebarBaseInstance.CreateSeatObject(thisC3SidebarSeats.SeatFeeCode, journey, segment, paxId, seatType, price);
        thisC3SidebarSeats.ProcessData(paxId, page, feeInfo, seat, isRemove, journey, segment);
    };

    thisC3SidebarSeats.ProcessData = function (paxId, page, feeInfo, seat, isRemove, journey, segment) {
        //Añadimos/Eliminamos elemento en la seleccion
        thisC3SidebarSeats.SidebarBaseInstance.AddRemoveElementInCurrentSelection(paxId, page, feeInfo, seat, isRemove, journey, segment);

        var TotalSeatsNewSelection = thisC3SidebarSeats.SidebarBaseInstance.CSGetSourcesToPrint(page);

        TotalSeatsNewSelection = thisC3SidebarSeats.SidebarBaseInstance.GroupBy(TotalSeatsNewSelection, feeInfo["GroupBy"]);

        var familyElements = thisC3SidebarSeats.SidebarBaseInstance.GetFamilyTypes(page);
        var htmlNewSelectionSeats = thisC3SidebarSeats.GetNewSelectionSeats(page, TotalSeatsNewSelection, familyElements);
        thisC3SidebarSeats.PrintSelection(htmlNewSelectionSeats, page["IdControlContentNew"], page["IdControlTitleNew"], page["IdControlTable"], page["IdControlSeparador"]);

        thisC3SidebarSeats.SidebarBaseInstance.CalculateDifferentialPrice(page);
        thisC3SidebarSeats.SidebarBaseInstance.CalculateDiscountPrice(page);
    };

    thisC3SidebarSeats.PrintSelection = function (resultHtml, boxToPrint, boxTitleControl, boxTable, boxSeparator) {
        $("#" + boxTitleControl).removeClass("hidden");
        $("#" + boxToPrint).removeClass("hidden");
        $("#" + boxTable).removeClass("hidden");
        $("#" + boxSeparator).removeClass("hidden");
        $("#" + boxToPrint).empty();
        if (resultHtml != undefined)
            for (var i = 0; i < resultHtml.length; i++) {
                $("#" + boxToPrint).append(resultHtml[i]);
            }
    };

    thisC3SidebarSeats.GetNewSelectionSeats = function (page, items, familyElements) {
        var htmlArray = new Array();
        var discount = 0;
        var realPrice = 0;
        var subtotal = 0;
        if (items != undefined)
            for (var i = 0; i < items.length; i++) {
                if (items[i].Code == "SEA") continue;
                //if (page.FamilyTypes[1]["ShowInThisBox"] != "true" && page.FamilyTypes[1]["ShowInThisBox"] != undefined) continue;

                var cssColor = "";
                var seatObject = $('a[data_segment="' + items[i].Segment + '"][data_journey="' + items[i].Journey + '"][data_paxid="' + items[i].Pax + '"]');
                if ($(seatObject).attr("data_price") == "0")
                    cssColor = " tc_green";
                var arrayItem = "<tr><td class='col1" + cssColor + "' colspan='2' style='display: table-cell;'>" + items[i]["Quantity"] + thisC3SidebarSeats.SidebarBaseInstance.GetLabel(familyElements, items[i]["Code"], parseFloat(items[i]["Quantity"]) > 1, items[i]["SeatType"]) + "</td>";
                arrayItem += "<td class='col3 price7" + cssColor + "' style='display: table-cell;'>" + SKYSALES.Util.convertToLocaleCurrency((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"])) + "</td></tr>";
                htmlArray.push(arrayItem);
            }
        return htmlArray;
    };

    return thisC3SidebarSeats;

};