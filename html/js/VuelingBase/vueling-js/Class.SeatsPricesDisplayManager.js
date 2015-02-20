

VUELING.Class.SeatsPricesDisplayManager = function () {
    var parent = SKYSALES.Class.SkySales();
    var seatsPricesDisplayManager = SKYSALES.Util.extendObject(parent);

    seatsPricesDisplayManager.SepTotalPriceDiv = "sepTotalPriceDiv";
    seatsPricesDisplayManager.TotalAmountDivId = "totalPrice";
    seatsPricesDisplayManager.SeatSelectionDivId = "seatSelection";
    seatsPricesDisplayManager.SeatNewSelectionDivId = "newSeatSelection";

    seatsPricesDisplayManager.TotalAmount = 0;
    seatsPricesDisplayManager.TotalAmountSeatsAssigned = 0;
    seatsPricesDisplayManager.ListSeatsAssigned = [];
    seatsPricesDisplayManager.ListRemainSeatsAssigned = [];
    seatsPricesDisplayManager.ListNewSeatSelection = [];
    seatsPricesDisplayManager.ListOriginalSeatSelection = [];
    seatsPricesDisplayManager.SeatTypes = [];
    seatsPricesDisplayManager.SeatTypesDescription = [];

    function SeatSelection(seatType, journeyIndex, segmentIndex, paxId, seatPrice) {
        this.SeatType = seatType;
        this.JourneyIndex = journeyIndex;
        this.SegmentIndex = segmentIndex;
        this.PaxId = paxId;
        this.SeatPrice = seatPrice;
    };

    seatsPricesDisplayManager.init = function (json) {
        seatsPricesDisplayManager.setSettingsByObject(json);
        seatsPricesDisplayManager.FillRemainSeatsAssigned();
        seatsPricesDisplayManager.PrintSeatAssigned();
        seatsPricesDisplayManager.PrintNewSeatsSelection();
        seatsPricesDisplayManager.UpdateTotalAmount();
    };

    seatsPricesDisplayManager.ClearSeatSelection = function () {
        seatsPricesDisplayManager.ListRemainSeatsAssigned = [];
        seatsPricesDisplayManager.ListNewSeatSelection = [];
        seatsPricesDisplayManager.UpdateNewSeatSelection();
    };

    seatsPricesDisplayManager.NewSeatSelection = function (seatType, journeyIndex, segmentIndex, paxId, seatPrice) {
        seatsPricesDisplayManager.AddSeatInput(seatType, journeyIndex, segmentIndex, paxId, seatPrice);
        seatsPricesDisplayManager.UpdateNewSeatSelection();
    };

    seatsPricesDisplayManager.AddSeatInput = function (seatType, journeyIndex, segmentIndex, paxId, seatPrice) {
        var newSeatSelection = new SeatSelection(seatType, journeyIndex, segmentIndex, paxId, seatPrice);
        var alreadyExists = false;

        for (var i = 0; i < seatsPricesDisplayManager.ListNewSeatSelection.length; i++) {
            var seatSelection = seatsPricesDisplayManager.ListNewSeatSelection[i];
            if (seatSelection.JourneyIndex == journeyIndex && seatSelection.SegmentIndex == segmentIndex && seatSelection.PaxId == paxId) {
                seatsPricesDisplayManager.ListNewSeatSelection[i] = newSeatSelection;
                alreadyExists = true;
                break;
            }
        }

        if (!alreadyExists)
            seatsPricesDisplayManager.ListNewSeatSelection.push(newSeatSelection);

        seatsPricesDisplayManager.UpdateRemainSeatsAssigned();
    };

    seatsPricesDisplayManager.DeleteArraySeatsInput = function (arraySeatsInput) {
        $.each(arraySeatsInput, function (i, seatInput) {
            seatsPricesDisplayManager.DeleteSeatInput(seatInput);
        });
        seatsPricesDisplayManager.FillRemainSeatsAssigned();
        seatsPricesDisplayManager.UpdateNewSeatSelection();
    };

    seatsPricesDisplayManager.DeleteSeatInput = function (seatInput) {
        var journeyIndex = $(seatInput).attr('data_journey');
        var segmentIndex = $(seatInput).attr('data_segment');
        var paxId = $(seatInput).attr('data_paxid');

        for (var i = 0; i < seatsPricesDisplayManager.ListNewSeatSelection.length; i++) {
            var seatSelection = seatsPricesDisplayManager.ListNewSeatSelection[i];
            if (seatSelection.JourneyIndex == journeyIndex && seatSelection.SegmentIndex == segmentIndex && seatSelection.PaxId == paxId) {
                seatsPricesDisplayManager.ListNewSeatSelection.splice(i, 1);
                break;
            }
        }
    };

    seatsPricesDisplayManager.UpdateNewSeatSelection = function () {
        $("#" + seatsPricesDisplayManager.SeatNewSelectionDivId + " tbody").html("");
        seatsPricesDisplayManager.PrintNewSeatsSelection();
        seatsPricesDisplayManager.UpdateTotalAmount();
    };

    seatsPricesDisplayManager.FillRemainSeatsAssigned = function () {
        seatsPricesDisplayManager.ListRemainSeatsAssigned = seatsPricesDisplayManager.ListSeatsAssigned.slice(0);
        seatsPricesDisplayManager.UpdateRemainSeatsAssigned();
    };

    seatsPricesDisplayManager.UpdateRemainSeatsAssigned = function () {
        for (var i = 0; i < seatsPricesDisplayManager.ListNewSeatSelection.length; i++) {
            var seatNewSelection = seatsPricesDisplayManager.ListNewSeatSelection[i];

            for (var j = 0; j < seatsPricesDisplayManager.ListRemainSeatsAssigned.length; j++) {
                var seatRemainAssigned = seatsPricesDisplayManager.ListRemainSeatsAssigned[j];
                if (seatRemainAssigned.JourneyIndex == seatNewSelection.JourneyIndex
                    && seatRemainAssigned.SegmentIndex == seatNewSelection.SegmentIndex
                    && seatRemainAssigned.PaxId == seatNewSelection.PaxId) {
                    seatsPricesDisplayManager.ListRemainSeatsAssigned.splice(j, 1);
                }
            }
        }
    };

    seatsPricesDisplayManager.PrintSeatAssigned = function () {
        if (seatsPricesDisplayManager.ListOriginalSeatSelection.length == 0)
            $("#" + seatsPricesDisplayManager.SeatSelectionDivId).hide();
        else {
            $("#" + seatsPricesDisplayManager.SeatSelectionDivId).show();
            seatsPricesDisplayManager.PrintSeats(seatsPricesDisplayManager.ListOriginalSeatSelection, seatsPricesDisplayManager.SeatSelectionDivId);
        }
    };

    seatsPricesDisplayManager.PrintNewSeatsSelection = function () {
        if (seatsPricesDisplayManager.ListNewSeatSelection.length == 0)
            $("#" + seatsPricesDisplayManager.SeatNewSelectionDivId).hide();
        else {
            $("#" + seatsPricesDisplayManager.SeatNewSelectionDivId).show();
            seatsPricesDisplayManager.PrintSeats(seatsPricesDisplayManager.ListNewSeatSelection, seatsPricesDisplayManager.SeatNewSelectionDivId);
        }
        seatsPricesDisplayManager.PrintRemainSeatsAssigned();
    };

    seatsPricesDisplayManager.PrintRemainSeatsAssigned = function () {
        seatsPricesDisplayManager.PrintSeats(seatsPricesDisplayManager.ListRemainSeatsAssigned, seatsPricesDisplayManager.SeatNewSelectionDivId);
    };

    seatsPricesDisplayManager.PrintSeats = function (arraySeats, tableId) {
        var dictSeatSelectionBySeatType = seatsPricesDisplayManager.GroupDictionarySeatSelectionBySeatType(arraySeats);

        for (var seatType in dictSeatSelectionBySeatType) {
            var arrayByType = dictSeatSelectionBySeatType[seatType];
            var totalAmount = seatsPricesDisplayManager.GetTotalAmountArraySeatSelection(arrayByType);
            var seatDescription = seatsPricesDisplayManager.GetSeatDescriptionByType(seatType);
            seatsPricesDisplayManager.AppedHtmlToTable(tableId, arrayByType.length, seatDescription, totalAmount);
        }
    };

    seatsPricesDisplayManager.GetSeatDescriptionByType = function (seatType) {
        var result = "";

        for (var i = 0; i < seatsPricesDisplayManager.SeatTypesDescription.length; i++) {
            if (seatsPricesDisplayManager.SeatTypesDescription[i][seatType] != undefined) {
                result = seatsPricesDisplayManager.SeatTypesDescription[i][seatType];
                break;
            }
        }
        return result;
    };

    seatsPricesDisplayManager.AppedHtmlToTable = function (tableId, quantity, description, amount) {
        $("#" + tableId + " tbody").append("<tr>" +
            "<td class='col1' colspan='2'>" +
            quantity +
            " " +
            description +
            "</td>" +
            "<td class='col3 price6'>" + SKYSALES.Util.convertToLocaleCurrency(amount.toString()) + "</td>" +
            "</tr>");
    };

    seatsPricesDisplayManager.UpdateTotalAmount = function () {
        if (seatsPricesDisplayManager.ListSeatsAssigned.length == 0 && seatsPricesDisplayManager.ListNewSeatSelection.length == 0)
            $("#" + seatsPricesDisplayManager.SepTotalPriceDiv).hide();
        else
            $("#" + seatsPricesDisplayManager.SepTotalPriceDiv).show();

        seatsPricesDisplayManager.TotalAmount = seatsPricesDisplayManager.CalculateTotalAmount();
        $("#" + seatsPricesDisplayManager.TotalAmountDivId).html(SKYSALES.Util.convertToLocaleCurrency(seatsPricesDisplayManager.TotalAmount.toString()));
    };

    seatsPricesDisplayManager.CalculateTotalAmount = function () {

        var losasientosqueyatengo = seatsPricesDisplayManager.ListSeatsAssigned;
        var losnuevosasientos = seatsPricesDisplayManager.ListNewSeatSelection;
        var losasientosoriginales = seatsPricesDisplayManager.ListOriginalSeatSelection;

        var lsaLength = losasientosqueyatengo.length;
        var lnaLength = losnuevosasientos.length;
        var laoLength = losasientosoriginales.length;
        var arrayToRun = losasientosoriginales;
        
        if (lsaLength > lnaLength && lsaLength > laoLength) {
            arrayToRun = losasientosqueyatengo;
        }
        if (lnaLength > lsaLength && lnaLength > laoLength) {
            arrayToRun = losnuevosasientos;
        }
        if (laoLength > lnaLength && laoLength > lsaLength) {
            arrayToRun = losasientosoriginales;
        }
        
        var totalAmount = seatsPricesDisplayManager.GetTotalAmountInArrays(arrayToRun, losasientosqueyatengo, losnuevosasientos, losasientosoriginales);
              
        if (totalAmount < 0)
            totalAmount = 0;

        return totalAmount;
    };

    seatsPricesDisplayManager.GetTotalAmount = function () {
        return seatsPricesDisplayManager.TotalAmount;
    };
    
    seatsPricesDisplayManager.GetTotalAmountInArrays = function (arrayToRun, losasientosqueyatengo, losnuevosasientos, losasientosoriginales) {
        
        var totalAssigned = new Array();
        for (var i = 0; i < losasientosqueyatengo.length; i++) {
            if (totalAssigned[losasientosqueyatengo[i].JourneyIndex] == undefined)
                totalAssigned[losasientosqueyatengo[i].JourneyIndex] = 0;
            totalAssigned[losasientosqueyatengo[i].JourneyIndex] += losasientosqueyatengo[i].SeatPrice;
        }

        var totalNew = new Array();
        for (var i = 0; i < losnuevosasientos.length; i++) {
            if (totalNew[losnuevosasientos[i].JourneyIndex] == undefined)
                totalNew[losnuevosasientos[i].JourneyIndex] = 0;
            totalNew[losnuevosasientos[i].JourneyIndex] += losnuevosasientos[i].SeatPrice;
        }

        var totalOriginal = new Array();
        for (var i = 0; i < losasientosoriginales.length; i++) {
            if (totalOriginal[losasientosoriginales[i].JourneyIndex] == undefined)
                totalOriginal[losasientosoriginales[i].JourneyIndex] = 0;
            totalOriginal[losasientosoriginales[i].JourneyIndex] += losasientosoriginales[i].SeatPrice;
        }
        
        var totalTotal = new Array();

        for (var i = 0; i < arrayToRun.length; i++) {
            var tN = totalAssigned[arrayToRun[i].JourneyIndex] != undefined ? totalAssigned[arrayToRun[i].JourneyIndex] : 0;
            if (totalNew[arrayToRun[i].JourneyIndex] != undefined && totalNew[arrayToRun[i].JourneyIndex] != tN) tN = totalNew[arrayToRun[i].JourneyIndex];
            var tO = totalOriginal[arrayToRun[i].JourneyIndex] != undefined ? totalOriginal[arrayToRun[i].JourneyIndex] : 0;
            totalTotal[arrayToRun[i].JourneyIndex] = tN - tO;
        }
        
        var totalAmount = 0;
        for (var totals in totalTotal) {
            if (totalTotal[totals] > 0)
                totalAmount += totalTotal[totals];
        }
        return totalAmount;
    };
    

    seatsPricesDisplayManager.GroupDictionarySeatSelectionBySeatType = function (arraySeatsSelection) {
        var dict = {};

        for (var i = 0; i < seatsPricesDisplayManager.SeatTypes.length; i++) {
            var seatType = seatsPricesDisplayManager.SeatTypes[i];
            var arrayBySeatType = seatsPricesDisplayManager.GetArraySeatsSelectionBySeatType(arraySeatsSelection, seatType);
            if (arrayBySeatType.length > 0)
                dict[seatType] = arrayBySeatType;
        }

        return dict;
    };

    seatsPricesDisplayManager.GetArraySeatsSelectionBySeatType = function (arraySeatsSelection, seatType) {
        var arrayBySeatType = [];

        for (var i = 0; i < arraySeatsSelection.length; i++) {
            if (arraySeatsSelection[i].SeatType == seatType) {
                arrayBySeatType.push(arraySeatsSelection[i]);
            }
        }

        return arrayBySeatType;
    };

    seatsPricesDisplayManager.GetTotalAmountArraySeatSelection = function (arraySeatSelection) {
        var totalAmount = 0;

        for (var i = 0; i < arraySeatSelection.length; i++) {
            totalAmount += arraySeatSelection[i].SeatPrice;
        }

        return totalAmount;
    };

    return seatsPricesDisplayManager;
};