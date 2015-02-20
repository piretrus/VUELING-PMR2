VUELING.Class.C3Sidebar = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisC3Sidebar = SKYSALES.Util.extendObject(parent);

    thisC3Sidebar.OldBooking = null;
    thisC3Sidebar.CurrentBooking = null;
    thisC3Sidebar.CurrentSelection = null;
    thisC3Sidebar.LabelsForSeats = null;

    thisC3Sidebar.TotalSeatsOld = 0;

    thisC3Sidebar.IdTBodyForNewSeats = null;
    thisC3Sidebar.IdTitleForNewSeats = null;
    thisC3Sidebar.IdTotalSeats = null;

    thisC3Sidebar.LabelsForBags = null;
    thisC3Sidebar.My25 = null;
    thisC3Sidebar.IdTotalBaggage = null;
    thisC3Sidebar.IdbaggageNotPayed = null;
    thisC3Sidebar.IdBaggageNotPayedTitle = null;

    thisC3Sidebar.PenaltyFees = null;

    thisC3Sidebar.Pages = null;
    thisC3Sidebar.SEECode = "SEE";

    thisC3Sidebar.SeatFeeCode = null;
    thisC3Sidebar.BagFeeCode = "BAG";
    thisC3Sidebar.BagBoxCodes = [thisC3Sidebar.BagFeeCode, "SEE"];
    thisC3Sidebar.My25FeeCodes = null;
    thisC3Sidebar.ChangeFlightFeeCode = "CHANG";

    thisC3Sidebar.LabelTotalPrice = null;

    thisC3Sidebar.FeeSSRList = null;

    thisC3Sidebar.IdSeparadorDiscount = null;
    thisC3Sidebar.IdDiscountContent = null;
    thisC3Sidebar.IdDiscountDeparturePrice = null;
    thisC3Sidebar.IdDiscountReturnPriece = null;
    thisC3Sidebar.IdDiscountSubtotalPrice = null;
    thisC3Sidebar.IdDiferenceSeatsContent = null;
    thisC3Sidebar.IdDiferenceSeatsSeparador = null;
    thisC3Sidebar.IdDiferenceSeatsDeparture = null;
    thisC3Sidebar.IdDiferenceSeatsReturn = null;
    thisC3Sidebar.IdControlTotal = null;
    thisC3Sidebar.IdControlSeparadorTotal = null;


    thisC3Sidebar.LabelTotal = null;
    thisC3Sidebar.LabelSubTotal = null;
    thisC3Sidebar.LabelDescuento = null;

    thisC3Sidebar.IdDiferenceBtnExpand = null;
    thisC3Sidebar.IdDiferenceSSRsAndFees = null;
    thisC3Sidebar.IdSpoilageBtnExpand = null;
    thisC3Sidebar.IdSpoilageBodyContent = null;

    thisC3Sidebar.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
        this.initTotalPrice();
    };

    thisC3Sidebar.initTotalPrice = function () {
        var labelTotalPricePage = $("span.prokyon_t_regular");
        if (labelTotalPricePage.length > 0) {
            var isChFlight = labelTotalPricePage.parent().attr("class");
            if (isChFlight.length > 0 && isChFlight.indexOf("changeFlight") == -1)
                labelTotalPricePage.html($("#" + thisC3Sidebar.LabelTotalPrice).html());
        }
    };

    thisC3Sidebar.addEvents = function () {
        thisC3Sidebar.CreatebaseObjects();
        thisC3Sidebar.RegisterEvents();
    };

    thisC3Sidebar.RegisterEvents = function () {
        var seatPage = thisC3Sidebar.GetPageInfo("CHANGESEAT");
        $("#".concat(seatPage.IdControlExpand)).unbind("click").click(thisC3Sidebar.SeatsExpand);
        var seatPage = thisC3Sidebar.GetPageInfo("CHANGEBAGGAGE");
        $("#".concat(seatPage.IdControlExpand)).unbind("click").click(thisC3Sidebar.baggageExpand);
        var seatPage = thisC3Sidebar.GetPageInfo("SPECIALEQUIPMENT");
        $("#".concat(seatPage.IdControlExpand)).unbind("click").click(thisC3Sidebar.specialEquipmentExpand);
        var seatPage = thisC3Sidebar.GetPageInfo("CHANGEINSURANCE");
        $("#".concat(seatPage.IdControlExpand)).unbind("click").click(thisC3Sidebar.insuranceExpand);
        var seatPage = thisC3Sidebar.GetPageInfo("CHANGESELECTCHANGEFLIGHT");
        $("#".concat(seatPage.IdControlExpand)).unbind("click").click(thisC3Sidebar.SelectChangeFlight);
        $("#".concat(seatPage.IdControlDiscountExpand)).unbind("click").click(thisC3Sidebar.discountExpand);
        $("#".concat(thisC3Sidebar.IdDiferenceBtnExpand)).unbind("click").click(thisC3Sidebar.diferenceExpand);
        $("#".concat(thisC3Sidebar.IdSpoilageBtnExpand)).unbind("click").click(thisC3Sidebar.spoilageExpand);
        
    };

    thisC3Sidebar.spoilageExpand = function () {
        var expand = $("#".concat(thisC3Sidebar.IdSpoilageBtnExpand));

        if ($.trim(expand.html()) == "[+]")
        {
            expand.html("[-]");
            $("#".concat(thisC3Sidebar.IdSpoilageBodyContent)).removeClass("hidden");
        }
        else
        {
            expand.html("[+]");
            $("#".concat(thisC3Sidebar.IdSpoilageBodyContent)).addClass("hidden");
        }
    };

    thisC3Sidebar.diferenceExpand = function () {
        var expand = $("#".concat(thisC3Sidebar.IdDiferenceBtnExpand));

        if ($.trim(expand.html()) == "[+]")
        {
            expand.html("[-]");
            $("#".concat(thisC3Sidebar.IdDiferenceSSRsAndFees)).removeClass("hidden");
        }
        else
        {
            expand.html("[+]");
            $("#".concat(thisC3Sidebar.IdDiferenceSSRsAndFees)).addClass("hidden");
        }
    };

    thisC3Sidebar.SeatsExpand = function () {
        var page = thisC3Sidebar.GetPageInfo("CHANGESEAT");
        var expand = $("#".concat(page.IdControlExpand));

        if ($.trim(expand.html()) == "[+]") {
            expand.html("[-]");
            thisC3Sidebar.BoxSidebarShowSeats(page);
        }
        else {
            expand.html("[+]");
            thisC3Sidebar.BoxSidebarHideSeats(page);
        }
    };

    thisC3Sidebar.pageExpand = function (name) {
        var page = thisC3Sidebar.GetPageInfo(name);
        var expand = $("#".concat(page.IdControlExpand));

        if ($.trim(expand.html()) == "[+]") {
            expand.html("[-]");
            thisC3Sidebar.BoxSidebarShow(page);
        }
        else {
            expand.html("[+]");
            thisC3Sidebar.BoxSidebarHide(page);
        }
    };

    thisC3Sidebar.baggageExpand = function () {
        thisC3Sidebar.pageExpand("CHANGEBAGGAGE");

    };

    thisC3Sidebar.specialEquipmentExpand = function () {
        thisC3Sidebar.pageExpand("SPECIALEQUIPMENT");
    };

    thisC3Sidebar.insuranceExpand = function () {
        thisC3Sidebar.pageExpand("CHANGEINSURANCE");
    };

    thisC3Sidebar.SelectChangeFlight = function () {
        var page = thisC3Sidebar.GetPageInfo("CHANGESELECTCHANGEFLIGHT");
        var expand = $("#".concat(page.IdControlExpand));

        if ($.trim(expand.html()) == "[+]") {
            expand.html("[-]");
            thisC3Sidebar.BoxSidebarShowChangeFlight(page);
        }
        else {
            expand.html("[+]");
            thisC3Sidebar.BoxSidebarHideChangeFlight(page);
        }
    };

    thisC3Sidebar.discountExpand = function () {
        var page = thisC3Sidebar.GetPageInfo("CHANGESELECTCHANGEFLIGHT");
        var expand = $("#".concat(page.IdControlDiscountExpand));

        if ($.trim(expand.html()) == "[+]") {
            expand.html("[-]");
            var content = $("#".concat(page.IdControlDiscount));
            content.removeClass("hidden");
            expand.parent().append("<span></span>");
        }
        else {
            expand.html("[+]");
            var content = $("#".concat(page.IdControlDiscount));

            if (!content.hasClass("hidden"))
                content.addClass("hidden");

            expand.parent().find("span").remove();
        }
    };

    thisC3Sidebar.BoxSidebarShow = function (page) {
        var content = $("#".concat(page.IdControlContentOld));
        var btnexpand = $("#".concat(page.IdControlExpand));
        content.removeClass("hidden");
        btnexpand.parent().append("<span></span>");
    };

    thisC3Sidebar.BoxSidebarHide = function (page) {
        var content = $("#".concat(page.IdControlContentOld));
        var btnexpand = $("#".concat(page.IdControlExpand));

        if (!content.hasClass("hidden"))
            content.addClass("hidden");
        btnexpand.parent().find("span").remove();

    };

    thisC3Sidebar.BoxSidebarShowChangeFlight = function (page) {

        var titleNew = $("#".concat(page.IdControlTitleNew));
        var titleOld = $("#".concat(page.IdControlTitleOld));
        var contentNew = $("#".concat(page.IdControlContentNew));
        var contentOld = $("#".concat(page.IdControlContentOld));
        var separadorSubtotal = $("#".concat(page.IdControlSeparadorSubTotal));
        var fareDiference = $("#".concat(page.IdControlFareDifferenceHeader));
        var btnexpand = $("#".concat(page.IdControlExpand));

        titleNew.removeClass("hidden");
        titleOld.removeClass("hidden");
        contentNew.removeClass("hidden");
        contentOld.removeClass("hidden");
        separadorSubtotal.removeClass("hidden");
        fareDiference.removeClass("hidden");
        btnexpand.parent().append("<span></span>");

    };

    thisC3Sidebar.BoxSidebarHideChangeFlight = function (page) {

        var titleNew = $("#".concat(page.IdControlTitleNew));
        var titleOld = $("#".concat(page.IdControlTitleOld));
        var contentNew = $("#".concat(page.IdControlContentNew));
        var contentOld = $("#".concat(page.IdControlContentOld));
        //var separadorSubtotal = $("#".concat(page.IdControlSeparadorSubTotal));
        var fareDiference = $("#".concat(page.IdControlFareDifferenceHeader));
        var btnexpand = $("#".concat(page.IdControlExpand));

        if (!titleNew.hasClass("hidden"))
            titleNew.addClass("hidden");

        if (!titleOld.hasClass("hidden"))
            titleOld.addClass("hidden");

        if (!contentNew.hasClass("hidden"))
            contentNew.addClass("hidden");

        if (!contentOld.hasClass("hidden"))
            contentOld.addClass("hidden");

        //if (!separadorSubtotal.hasClass("hidden"))
        //    separadorSubtotal.addClass("hidden");

        if (!fareDiference.hasClass("hidden"))
            fareDiference.addClass("hidden");

        btnexpand.parent().find("span").remove();

    };

    thisC3Sidebar.BoxSidebarShowSeats = function (page) {

        var contentOld = $("#".concat(page.IdControlTableOld));
        var contentNew = $("#".concat(page.IdControlTableNew));
        var contentDifferenceSeats = $("#".concat(page.IdControlDiferenceSeatsContent));
        var diferenceSeatsSeparador = $("#".concat(page.IdControlDiferenceSeatsSeparador));
        var btnexpand = $("#".concat(page.IdControlExpand));

        contentOld.removeClass("hidden");
        contentNew.removeClass("hidden");
        contentDifferenceSeats.removeClass("hidden");
        diferenceSeatsSeparador.removeClass("hidden");
        btnexpand.parent().append("<span></span>");

    };

    thisC3Sidebar.BoxSidebarHideSeats = function (page) {

        var contentOld = $("#".concat(page.IdControlTableOld));
        var contentNew = $("#".concat(page.IdControlTableNew));
        var contentDifferenceSeats = $("#".concat(page.IdControlDiferenceSeatsContent));
        var diferenceSeatsSeparador = $("#".concat(page.IdControlDiferenceSeatsSeparador));
        var btnexpand = $("#".concat(page.IdControlExpand));

        if (!contentOld.hasClass("hidden"))
            contentOld.addClass("hidden");

        if (!contentNew.hasClass("hidden"))
            contentNew.addClass("hidden");

        if (!contentDifferenceSeats.hasClass("hidden"))
            contentDifferenceSeats.addClass("hidden");

        if (!diferenceSeatsSeparador.hasClass("hidden"))
            diferenceSeatsSeparador.addClass("hidden");

        btnexpand.parent().find("span").remove();

    };

    // End Observers //

    thisC3Sidebar.CreatebaseObjects = function () {
        thisC3Sidebar.CurrentSelection = jQuery.extend(true, {}, thisC3Sidebar.CurrentBooking);
    };

    thisC3Sidebar.ChangeInsurance = function (element, pageCode, isRemove) {
        var codeSpeq = element["Code"];
        var amount = element["Amount"];
        var paxId = element["Pax"];

        var page = thisC3Sidebar.GetPageInfo(pageCode);

        var feeInfo = thisC3Sidebar.GetFeeElementFromFeeSSRList(codeSpeq);

        var equipment = thisC3Sidebar.CreateInsurance(codeSpeq, amount, paxId, feeInfo["Level"]);

        thisC3Sidebar.ProcessData(paxId, page, feeInfo, equipment, isRemove);
    };

    thisC3Sidebar.CreateInsurance = function (code, amount, paxId, level) {
        var insurance = new Object();
        insurance["Code"] = code;
        insurance["Pax"] = paxId;
        insurance["Quantity"] = 1;
        insurance["Amount"] = amount;
        insurance["ActionStatusCode"] = "KK";

        if (level != "BookingPax") {
            var totalSegments = 0;
            $.each(thisC3Sidebar.GetJourneyListInCurrentSelection(), function (index, value) {
                totalSegments += thisC3Sidebar.GetSegmentsListByJourney(value).length;
            });
            if (totalSegments != 0) insurance["Amount"] = amount / totalSegments;
        }

        insurance["PriceToPay"] = insurance["Amount"];
        return insurance;
    };

    //Special Equipment
    thisC3Sidebar.SpecialEquipmentSelect = function (element, pageCode, isRemove) {
        var codeSpeq = element["Code"];
        var amount = element["Amount"];
        var paxId = element["Pax"];

        var page = thisC3Sidebar.GetPageInfo(pageCode);

        var feeInfo = thisC3Sidebar.GetFeeElementFromFeeSSRList(codeSpeq);

        var equipment = thisC3Sidebar.CreateSpecialEquipmentObject(codeSpeq, amount, paxId, feeInfo["Level"]);

        thisC3Sidebar.ProcessData(paxId, page, feeInfo, equipment, isRemove);

    };

    thisC3Sidebar.CreateSpecialEquipmentObject = function (code, amount, paxId, level) {
        var specialEquipment = new Object();
        specialEquipment["Code"] = code;
        specialEquipment["Pax"] = paxId;
        specialEquipment["Quantity"] = 1;
        specialEquipment["Amount"] = amount;
        specialEquipment["ActionStatusCode"] = "KK";

        if (level != "BookingPax") {
            var totalSegments = 0;
            $.each(thisC3Sidebar.GetJourneyListInCurrentSelection(), function (index, value) {
                totalSegments += thisC3Sidebar.GetSegmentsListByJourney(value).length;
            });
            if (totalSegments != 0) specialEquipment["Amount"] = amount / totalSegments;
        }

        specialEquipment["PriceToPay"] = specialEquipment["Amount"];

        return specialEquipment;
    };

    thisC3Sidebar.GetSpecialEquipmentLabel = function (Box, code, isPlural) {
        var result = null;
        var itemIndex = thisC3Sidebar.GetItemIndexInArray(Box.Labels, "Code", code);
        if (itemIndex != -1)
            result = isPlural == true ? Box.Labels[itemIndex]["Plural"] : Box.Labels[itemIndex]["Singular"];
        return result;
    };

    thisC3Sidebar.SpecialEquipmentComparer = function (first, second) {
        if (first != undefined && second != undefined)
            result = first["Code"] == second["Code"] && first["Pax"] == second["Pax"];
        return result;
    };

    //End Special Equipment

    // BAG Insurance


    thisC3Sidebar.InsuranceComparer = function (firstInsurance, secondInsurance) {
        var result = false;
        if (firstInsurance != undefined && secondInsurance != undefined)
            result = firstInsurance["Code"] == secondInsurance["Code"];
        return result;
    };
    // END BAG Insurance

    thisC3Sidebar.CreateSeatObject = function (code, journey, segment, paxId, seatType, price) {
        var seat = new Object();
        seat["Code"] = code;
        seat["Journey"] = journey;
        seat["Segment"] = segment;
        seat["Pax"] = paxId;
        seat["SeatType"] = seatType;
        seat["Amount"] = seat["Amount"] = (price == "" || price == undefined) ? "0" : price;
        return seat;
    };

    thisC3Sidebar.SeatComparer = function (firstSeat, secondSeat) {
        var result = false;
        if (firstSeat != undefined && secondSeat != undefined)
            result = firstSeat["Code"] == secondSeat["Code"] && firstSeat["SeatType"] == secondSeat["SeatType"];
        return result;
    };

    thisC3Sidebar.GetSeatLabel = function (Box, seatType, isPlural, seatType) {
        var result = null;
        var itemIndex = thisC3Sidebar.GetItemIndexInArray(Box.Labels, "Code", code);
        if (itemIndex != -1)
            result = isPlural == true ? Box.Labels[itemIndex]["Plural"] : Box.Labels[itemIndex]["Singular"];
        return result;
    };
    //End Seats

    // End Baggages

    thisC3Sidebar.AddRemoveElementInCurrentSelection = function (paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment) {
        if (page == undefined) return;

        if (!isRemove)
            thisC3Sidebar.AddElementInCurrentSelection(paxId, feeSSRInfo, objecToProcess);
        else
            thisC3Sidebar.DeleteElementInCurrentSelectionNew(paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment);
    };

    thisC3Sidebar.GetSourcesByJourney = function (page) {
        var journeys = new Array();

        var sourcesToPrint = thisC3Sidebar.CSGetSourcesToPrint(page);
        var sourcesOldBooking = thisC3Sidebar.OBGetSourcesToPrint(page);

        var journeysInCurrentSelection = thisC3Sidebar.GetJourneyListInCurrentBooking();
        var journeysInOldSelection = thisC3Sidebar.OBGetJourneyList();

        for (var j = 0; j < journeysInCurrentSelection.length; j++) {
            var journey = new Object();
            journey.Id = j;
            //Current Selection //
            journey.CSElements = thisC3Sidebar.ArrayFilter(sourcesToPrint, "Journey", j);
            journey.CSTotalPriceElements = thisC3Sidebar.ArraySumProperty(journey.CSElements, "Amount");
            journey.CSTotalFare = thisC3Sidebar.GetTotalFare(journeysInCurrentSelection[j]);
            //End Current Selection //

            //Old Booking  //
            journey.OBElements = thisC3Sidebar.ArrayFilter(sourcesOldBooking, "Journey", j);
            journey.OBTotalPriceElements = thisC3Sidebar.ArraySumProperty(journey.OBElements, "Amount");
            journey.OBTotalFare = thisC3Sidebar.GetTotalFare(journeysInOldSelection[j]);
            //End Old Booking //

            journey.DifferentialPrice = (journey.CSTotalPriceElements - journey.OBTotalPriceElements);

            journeys.push(journey);
        }
        return journeys;
    };

    thisC3Sidebar.CalculateDifferentialPrice = function (page) {
        var journeys = thisC3Sidebar.GetSourcesByJourney(page);
        for (var j = 0; j < journeys.length; j++) {
            var total = (journeys[j].DifferentialPrice < 0 ? 0 : journeys[j].DifferentialPrice);

            if (total > 0) {
                $("#" + thisC3Sidebar.IdDiferenceSeatsSeparador).removeClass("hidden");
                $("#" + thisC3Sidebar.IdDiferenceSeatsContent).removeClass("hidden");
            }

            //Sumtotal += total;
            if (j == 0 && total > 0) {
                $("#" + thisC3Sidebar.IdDiferenceSeatsDeparture).html(SKYSALES.Util.convertToLocaleCurrency(total));
                $("#" + thisC3Sidebar.IdDiferenceSeatsDeparture).removeClass("hidden");
                $("#" + thisC3Sidebar.IdDiferenceSeatsDeparture + "Title").removeClass("hidden");
            }
            else if (j == 1 && total > 0) {
                $("#" + thisC3Sidebar.IdDiferenceSeatsReturn).html(SKYSALES.Util.convertToLocaleCurrency(total));
                $("#" + thisC3Sidebar.IdDiferenceSeatsReturn).removeClass("hidden");
                $("#" + thisC3Sidebar.IdDiferenceSeatsReturn + "Title").removeClass("hidden");
            }
        }
    };

    thisC3Sidebar.CalculateDiscountPrice = function (page) {
        var journeys = thisC3Sidebar.GetSourcesByJourney(page);
        var total = 0;
        var totalDiscount = 0;
        for (var j = 0; j < journeys.length; j++) {
            var diffTarifas = Number(Number(journeys[j].CSTotalFare - journeys[j].OBTotalFare).toFixed(2));
            var diffElements = Number(Number(journeys[j].CSTotalPriceElements - journeys[j].OBTotalPriceElements).toFixed(2));

            var discount = 0;

            if (diffTarifas < 0 && diffElements > 0) {
                if (Math.abs(diffTarifas) > Math.abs(diffElements))
                    discount = Math.abs(diffElements);
                else
                    discount = Math.abs(diffTarifas);
            }

            if (diffElements < 0 && diffTarifas > 0) {
                if (Math.abs(diffElements) > Math.abs(diffTarifas))
                    discount += Math.abs(diffTarifas);
                else
                    discount += Math.abs(diffElements);
            }

            totalDiscount += discount;

            var totalJourney = (diffTarifas + diffElements);

            total += totalJourney > 0 ? totalJourney : 0;

            if (j == 0) {
                $("#" + thisC3Sidebar.IdDiscountDeparturePrice).html((discount != 0 ? "-" : "") + SKYSALES.Util.convertToLocaleCurrency(discount));
            }
            else {
                $("#" + thisC3Sidebar.IdDiscountReturnPriece).html((discount != 0 ? "-" : "") + SKYSALES.Util.convertToLocaleCurrency(discount));
            }
        }

        if (totalDiscount == 0) {
            $("#" + thisC3Sidebar.IdSeparadorDiscount).hide();
            $("#" + thisC3Sidebar.IdDiscountContent).hide();
        }
        else {
            $("#" + thisC3Sidebar.IdSeparadorDiscount).show();
            $("#" + thisC3Sidebar.IdDiscountContent).show();
        }

        $("#" + thisC3Sidebar.IdDiscountSubtotalPrice).html("-" + SKYSALES.Util.convertToLocaleCurrency(totalDiscount));

        thisC3Sidebar.CalculateTotalPrice(total);

        if (total >= 0) {
            $("#" + parent.IdControlTotal).removeClass("hidden");
            $("#" + parent.IdControlSeparadorTotal).removeClass("hidden");
        }

    };

    thisC3Sidebar.ProcessData = function (paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment) {
        if (page == undefined) return;

        if (!isRemove)
            thisC3Sidebar.AddElementInCurrentSelection(paxId, feeSSRInfo, objecToProcess);
        else {
            thisC3Sidebar.DeleteElementInCurrentSelectionNew(paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment);
        }

        //var pageFamilyTypes = new Array();
        //for (var i = 0; i < page["FamilyTypes"].length; i++)
        //    pageFamilyTypes.push.apply(pageFamilyTypes, thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType(page["FamilyTypes"][i]["Code"]));

        var pageFamilyTypes = thisC3Sidebar.GetFamilyTypes(page);

        var result = thisC3Sidebar.CalculatePricesAndPrintResultNew(page);
        thisC3Sidebar.PrintResult(page, pageFamilyTypes, result);
        thisC3Sidebar.PrintOriginalDataBooking(page);
    };

    thisC3Sidebar.DeleteElementInCurrentSelectionNew = function (paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment) {
        if (page == undefined) return;
        thisC3Sidebar.CSDeleteElement(paxId, feeSSRInfo["Code"], feeSSRInfo["Type"], feeSSRInfo["Level"], feeSSRInfo["ApplyInAllPaxSegments"] == "true", journey, segment);
        thisC3Sidebar.DeleteMultipleSelection(paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment);
        thisC3Sidebar.DeleteDependsElements(paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment);
    };

    thisC3Sidebar.DeleteMultipleSelection = function (paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment) {
        if (feeSSRInfo["MultipleSelection"] == "false" && feeSSRInfo["Code"] != "SEAT") {
            var familyElements = thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType(feeSSRInfo["FamilyType"]);
            for (var i = 0; i < familyElements.length; i++) {
                thisC3Sidebar.CSDeleteElement(paxId, familyElements[i]["Code"], familyElements[i]["Type"], familyElements[i]["Level"], familyElements[i]["ApplyInAllPaxSegments"] == "true", journey, segment);
            }
        }
    };

    thisC3Sidebar.DeleteDependsElements = function (paxId, page, feeSSRInfo, objecToProcess, isRemove, journey, segment) {
        var familyDependsItems = thisC3Sidebar.GetFeeElementsFromFeeSSRListByDependsFamilyType(feeSSRInfo["FamilyType"]);
        for (var i = 0; i < familyDependsItems.length; i++)
            thisC3Sidebar.CSDeleteElement(paxId, familyDependsItems[i]["Code"], familyDependsItems[i]["Type"], familyDependsItems[i]["Level"], familyDependsItems[i]["ApplyInAllPaxSegments"] == "true", journey, segment);
    };

    thisC3Sidebar.CalculatePricesAndPrintResultNew = function (page) {
        var arraySourcesToPrint = thisC3Sidebar.CSGetSourcesToPrint(page);
        var result = thisC3Sidebar.GroupBy(arraySourcesToPrint);
        result.sort(thisC3Sidebar.DynamicSort("Pax"));
        return result;
    };

    thisC3Sidebar.PrintResult = function (page, familyElements, result) {
        var resultHtml = thisC3Sidebar.GenerateHtml(page, familyElements, result);
        thisC3Sidebar.PrintSelection(resultHtml, page["IdControlContentNew"], page["IdControlSeparador"], page["IdControlTable"]);
        if (result.length == 0) {
            $("#" + page["IdControlTable"]).addClass("hidden");
            $("#" + page["IdControlSeparador"]).addClass("hidden");
        }
    };

    thisC3Sidebar.PrintOriginalDataBooking = function (page) {
        switch (page.Code) {
            case "CHANGESEAT":
                thisC3Sidebar.BoxSidebarShow(page);
                break;
            default:
                break;
        }

    };

    thisC3Sidebar.CalculateTotalPrice = function (calculatedFee) {
        var result = calculatedFee;
        result += thisC3Sidebar.GetPriceToPayInCurrentBooking();
        $("#" + thisC3Sidebar.LabelTotalPrice).html(SKYSALES.Util.convertToLocaleCurrency(result));

        if (result >= 0) {
            $("#" + thisC3Sidebar.IdControlSeparadorTotal).show();
            $("#" + thisC3Sidebar.IdControlTotal).show();
        }
        else {
            $("#" + thisC3Sidebar.IdControlSeparadorTotal).hide();
            $("#" + thisC3Sidebar.IdControlTotal).hide();
        }

        var labelTotalPricePage = $("span.prokyon_t_regular");
        if (labelTotalPricePage.length > 0) {
            labelTotalPricePage.html(SKYSALES.Util.convertToLocaleCurrency(result));
            if ($(".continuetoPaymentText").is(":hidden")) {
                $(".labelContinueButton").addClass("tc_white");
                $(".continuetoPaymentText").show();
            }
            if (result == 0 && $(".continuetoPaymentText").not(":hidden")) {
                $(".labelContinueButton").removeClass("tc_white");
                $(".continuetoPaymentText").hide();
            }
        }
    };

    thisC3Sidebar.PrintSelection = function (resultHtml, boxToPrint, separatorControl, tableControl) {
        $("#" + separatorControl).removeClass("hidden");
        $("#" + tableControl).removeClass("hidden");
        $("#" + boxToPrint).removeClass("hidden");
        $("#" + boxToPrint).empty();
        if (resultHtml != undefined)
            for (var i = 0; i < resultHtml.length; i++) {
                $("#" + boxToPrint).append(resultHtml[i]);
            }
    };

    // Current Selection

    thisC3Sidebar.CSGetSourcesToPrint = function (page) {
        var arraySourcesToPrint = new Array();
        for (var i = 0; i < page["FamilyTypes"].length; i++) {
            var elements = thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType(page["FamilyTypes"][i]["Code"]);
            for (var x = 0; x < elements.length; x++)
                arraySourcesToPrint.push.apply(arraySourcesToPrint, thisC3Sidebar.GetSourcesToPrintNew(elements[x], page["Code"] != "CHANGESEAT"));
        }
        return arraySourcesToPrint;
    };

    thisC3Sidebar.CSDeleteElement = function (paxId, code, type, level, applyInAllPaxSegments, journey, segment) {
        switch (level) {
            case "BookingPax":
                thisC3Sidebar.CSDeleteBookingPaxElement(paxId, code, type);
                break;
            case "JourneySegmentPax":
                thisC3Sidebar.CSDeleteJourneySegmentPaxElement(paxId, code, type, applyInAllPaxSegments, journey, segment);
                break;
        }
    };

    thisC3Sidebar.CSDeleteBookingPaxElement = function (paxId, code, type) {
        switch (type) {
            case "Fee":
                thisC3Sidebar.DeleteFeeBookingPax(paxId, code);
                break;
        }
    };

    thisC3Sidebar.CSDeleteJourneySegmentPaxElement = function (paxId, code, type, applyInAllPaxSegments, journey, segment) {
        switch (type) {
            case "SSR":
                if (applyInAllPaxSegments)
                    thisC3Sidebar.DeleteAllJourneySegmentPassengerSSRByName(paxId, code);
                break;
            case "Fee":
                if (applyInAllPaxSegments)
                    thisC3Sidebar.DeleteAllJourneySegmentPassengerFeeByName(paxId, code);
                else
                    thisC3Sidebar.DeleteFeeToPassenger(journey, segment, paxId, code);
                break;
        }
    };

    thisC3Sidebar.AddElementInCurrentSelection = function (paxId, feeSSRInfo, objectToProcess) {
        switch (feeSSRInfo["Level"]) {
            case "BookingPax":
                thisC3Sidebar.CSAddBookingPaxElement(paxId, feeSSRInfo, objectToProcess);
                break;
            case "JourneySegmentPax":
                thisC3Sidebar.CSAddJourneySegmentPaxElement(paxId, feeSSRInfo, objectToProcess);
                break;
        }
    };

    thisC3Sidebar.CSAddBookingPaxElement = function (paxId, feeSSRInfo, objectToProcess) {
        switch (feeSSRInfo["Type"]) {
            case "Fee":
                thisC3Sidebar.AddFeeBookingPax(paxId, objectToProcess);
                break;
        }
    };

    thisC3Sidebar.CSAddJourneySegmentPaxElement = function (paxId, feeSSRInfo, objectToProcess) {
        switch (feeSSRInfo["Type"]) {
            case "SSR":
                thisC3Sidebar.CSAddSSRJourneySegmentPax(paxId, feeSSRInfo, objectToProcess);
                break;
            case "Fee":
                thisC3Sidebar.CSAddFeeJourneySegmentPax(paxId, objectToProcess);
                break;
        }

    };

    thisC3Sidebar.CSAddSSRJourneySegmentPax = function (paxId, feeSSRInfo, objectToProcess) {

        if (feeSSRInfo["MultipleSelection"] == "false") {
            var familyElements = thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType(feeSSRInfo["FamilyType"]);
            for (var i = 0; i < familyElements.length; i++) {
                thisC3Sidebar.CSDeleteElement(paxId, familyElements[i]["Code"], familyElements[i]["Type"], familyElements[i]["Level"], familyElements[i]["ApplyInAllPaxSegments"] == "true");
            }
        }

        if (feeSSRInfo["ApplyInAllPaxSegments"] == "true")
            thisC3Sidebar.AddSSRInAllJourneySegmentPaxInBooking(paxId, objectToProcess);
        else
            thisC3Sidebar.AddSSRToPassenger(objectToProcess["Journey"], objectToProcess["Segment"], paxId, objectToProcess);
    };

    thisC3Sidebar.forEachSegmentPassenger = function (callback) {
        if (thisC3Sidebar.CurrentSelection != undefined) {
            var oldBookingJourneys = thisC3Sidebar.GetJourneyListInCurrentSelection();
            if (oldBookingJourneys != null)
                for (var j = 0; j < oldBookingJourneys.length; j++) {
                    var segments = thisC3Sidebar.GetSegmentsListByJourney(oldBookingJourneys[j]);
                    if (segments != null)
                        for (var s = 0; s < segments.length; s++) {
                            callback(j, s, segments);
                        }
                }
        }
    };

    thisC3Sidebar.AddSSRInAllJourneySegmentPaxInBooking = function (paxid, SsrObject) {
        thisC3Sidebar.forEachSegmentPassenger(function (j, s, segments) {
            thisC3Sidebar.AddSSRToPassenger(j, s, paxid, SsrObject);
        });
    };

    thisC3Sidebar.DeleteAllJourneySegmentPassengerSSRByName = function (paxid, ssrName) {
        thisC3Sidebar.forEachSegmentPassenger(function (j, s, segments) {
            var passengers = thisC3Sidebar.GetPassengersListBySegment(segments[s]);
            if (passengers != null)
                for (var p = 0; p < passengers.length; p++) {
                    if (p != paxid) continue;
                    for (var ssr = 0; ssr < passengers[p].SSRS.length; ssr++) {
                        if (passengers[p].SSRS[ssr].Code.indexOf(ssrName) != -1)
                            thisC3Sidebar.DeleteSSRToPassenger(j, s, p, ssr);
                    }
                }
        });
    };

    thisC3Sidebar.DeleteAllJourneySegmentPassengerFeeByName = function (paxid, feeName) {
        thisC3Sidebar.forEachSegmentPassenger(function (j, s, segments) {
            var passengers = thisC3Sidebar.GetPassengersListBySegment(segments[s]);
            if (passengers != null)
                for (var p = 0; p < passengers.length; p++) {
                    if (p != paxid) continue;
                    for (var fee = 0; ssr < passengers[p].Fees.length; fee++) {
                        if (passengers[p].Fees[ssr].Code.indexOf(feeName) != -1)
                            thisC3Sidebar.DeleteFeeToPassenger(j, s, p, fee);
                    }
                }
        });
    };

    thisC3Sidebar.CSAddFeeJourneySegmentPax = function (paxId, objectToProcess) {
        //paxId, objectToProcess
        var journey = objectToProcess["Journey"];
        var segment = objectToProcess["Segment"];
        var seatType = objectToProcess["SeatType"];

        var propertiesArray = new Array();
        propertiesArray.push(objectToProcess["Code"]);

        var feeIndex = thisC3Sidebar.ExistsElementByCodeInArray(thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxId].Fees, objectToProcess, propertiesArray);
        if (feeIndex == -1) {
            var _fee = new Object({ Code: objectToProcess["Code"], Amount: objectToProcess["Amount"] });
            thisC3Sidebar.AddItemInArray(thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxId].Fees, _fee);
            feeIndex = thisC3Sidebar.ExistsElementByCodeInArray(thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxId].Fees, _fee, propertiesArray);
        }

        var feeObject = thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxId].Fees[feeIndex];
        feeObject["Amount"] = parseFloat(objectToProcess["Amount"]);
        feeObject.Quantity = 1;
        if (seatType != undefined)
            feeObject["SeatType"] = seatType;
    };

    thisC3Sidebar.DeleteSSRToPassenger = function (journey, segment, paxid, ssrId) {
        thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxid].SSRS.splice(ssrId, 1);
    };

    thisC3Sidebar.AddSSRToPassenger = function (journey, segment, paxid, SsrObject) {
        thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxid].SSRS.push(SsrObject);
    };

    thisC3Sidebar.AddFeeBookingPax = function (paxId, objectToProcess) {
        var propertiesArray = new Array();
        propertiesArray.push("Code");
        propertiesArray.push("Status");

        var feeIndex = thisC3Sidebar.ExistsElementByCodeInArray(thisC3Sidebar.CurrentSelection.Passenger[paxId].Fees, objectToProcess, propertiesArray);
        if (feeIndex == -1) {
            var _fee = new Object({ Code: objectToProcess["Code"], Amount: objectToProcess["Amount"] });
            thisC3Sidebar.AddItemInArray(thisC3Sidebar.CurrentSelection.Passenger[paxId].Fees, _fee);
            feeIndex = thisC3Sidebar.ExistsElementByCodeInArray(thisC3Sidebar.CurrentSelection.Passenger[paxId].Fees, _fee, propertiesArray);
        }

        var feeObject = thisC3Sidebar.CurrentSelection.Passenger[paxId].Fees[feeIndex];
        feeObject["Amount"] = parseFloat(objectToProcess["Amount"]);
        feeObject["ActionStatusCode"] = "KK";
        feeObject.Quantity = 1;
    };

    thisC3Sidebar.DeleteFeeBookingPax = function (paxId, code) {
        var itemIndex = thisC3Sidebar.GetItemIndexInArray(thisC3Sidebar.CurrentSelection.Passenger[paxId].Fees, "Code", code);
        if (itemIndex != -1)
            thisC3Sidebar.CurrentSelection.Passenger[paxId].Fees.splice(itemIndex, 1);
    };

    thisC3Sidebar.DeleteFeeToPassenger = function (journey, segment, paxid, feeId) {
        thisC3Sidebar.CurrentSelection.Journey[journey].Segment[segment].Passenger[paxid].Fees.splice(feeId, 1);
    };

    thisC3Sidebar.GetJourneyListInCurrentSelection = function () {
        var result = new Array();
        if (thisC3Sidebar.CurrentSelection != undefined)
            if (thisC3Sidebar.CurrentSelection.Journey != undefined)
                result.push.apply(result, thisC3Sidebar.CurrentSelection.Journey);
        return result;
    };

    thisC3Sidebar.GetPassengerFeeListInBookingLevelInCurrentSelection = function (feeCode) {
        var result = new Array();
        if (thisC3Sidebar.CurrentSelection != undefined)
            if (thisC3Sidebar.CurrentSelection.Passenger != undefined)
                for (var i = 0; i < thisC3Sidebar.CurrentSelection.Passenger.length; i++) {
                    var fees = thisC3Sidebar.GetFeeListByPassenger(thisC3Sidebar.CurrentSelection.Passenger[i]);

                    var itemIndex = thisC3Sidebar.GetItemIndexInArray(fees, "Code", feeCode);

                    if (itemIndex != -1) {
                        var currFee = $.extend(true, {}, fees[itemIndex]);
                        currFee["Pax"] = i;
                        result.push(currFee);
                    }
                }
        return result;
    };

    thisC3Sidebar.GetFeeListByFeeCodeInCurrentSelection = function (feeCode) {
        var result = new Array();
        thisC3Sidebar.forEachSegmentPassenger(function (j, s, segments) {
            var passengers = thisC3Sidebar.GetPassengersListBySegment(segments[s]);
            if (passengers != null)
                for (var p = 0; p < passengers.length; p++) {
                    var fees = thisC3Sidebar.GetFeeListByPassenger(passengers[p]);
                    if (fees != null)
                        for (var f = 0; f < fees.length; f++) {
                            if (fees[f]["Code"] != feeCode) continue;
                            var currentFee = $.extend(true, {}, fees[f]);
                            currentFee["Journey"] = j;
                            currentFee["Segment"] = s;
                            currentFee["Pax"] = p;
                            currentFee["Quantity"] = 1;
                            result.push(currentFee);
                        };
                }
        });

        return result;
    };

    thisC3Sidebar.GetSSRListBySSRCodeInCurrentSelection = function (SSRCode) {
        var result = new Array();
        thisC3Sidebar.forEachSegmentPassenger(function (j, s, segments) {
            var passengers = thisC3Sidebar.GetPassengersListBySegment(segments[s]);
            if (passengers != null)
                for (var p = 0; p < passengers.length; p++) {
                    var ssrs = thisC3Sidebar.GetSSRListByPassenger(passengers[p]);
                    if (ssrs != null)
                        for (var f = 0; f < ssrs.length; f++) {
                            if (ssrs[f]["Code"].indexOf(SSRCode) == -1) continue;
                            var currentSsr = $.extend(true, {}, ssrs[f]);
                            currentSsr["Journey"] = j;
                            currentSsr["Segment"] = s;
                            currentSsr["Pax"] = p;
                            currentSsr["Quantity"] = 1;
                            result.push(currentSsr);
                        };
                }
        });
        return result;
    };

    //End Current Selection

    //Current Booking

    thisC3Sidebar.GetPenaltyFeesInCurrentBooking = function () {
        var result = 0;
        for (var indexPax = 0; indexPax < thisC3Sidebar.CurrentBooking.Passenger.length; indexPax++)
            for (var indexFee = 0; indexFee < thisC3Sidebar.CurrentBooking.Passenger[indexPax].PenaltyFees.length; indexFee++) {
                if (thisC3Sidebar.CurrentBooking.Passenger[indexPax].PenaltyFees[indexFee].ActionStatusCode != "KK") continue;
                var existsInArray = thisC3Sidebar.ExistsElementByCodeInArray(thisC3Sidebar.PenaltyFees, thisC3Sidebar.CurrentBooking.Passenger[indexPax].PenaltyFees[indexFee], false);
                if (existsInArray != -1)
                    result += parseFloat(thisC3Sidebar.CurrentBooking.Passenger[indexPax].PenaltyFees[indexFee].Amount);
            }
        return result;
    };

    thisC3Sidebar.GetMy25DiscountToApply = function () {
        var my25discountsOldBooking = thisC3Sidebar.GetMy25DiscountsInBooking(thisC3Sidebar.OldBooking);
        var my25discountsCurrentBooking = thisC3Sidebar.GetMy25DiscountsInBooking(thisC3Sidebar.CurrentBooking);
        return Math.abs(my25discountsOldBooking) - Math.abs(my25discountsCurrentBooking);
    };
    thisC3Sidebar.GetMy25DiscountsInBooking = function (booking) {
        var result = 0;
        for (var indexPax = 0; indexPax < booking.Passenger.length; indexPax++) {
            for (var indexFee = 0; indexFee < booking.Passenger[indexPax].Fees.length; indexFee++) {
                if (!thisC3Sidebar.IsMy25FeeCode(booking.Passenger[indexPax].Fees[indexFee].Code)) continue;
                result += parseFloat(booking.Passenger[indexPax].Fees[indexFee].Amount);
            }
        }
        return result;
    };
    
    thisC3Sidebar.IsMy25FeeCode = function (code) {
        var exist = false;
        for (var i = 0; i < thisC3Sidebar.My25FeeCodes.length && !exist; i++) {
            if (thisC3Sidebar.My25FeeCodes[i] == code) exist = true;
        }
        return exist;
    };


    thisC3Sidebar.GetPriceToPayInCurrentBooking = function () {
        var penaltyFeesAmount = thisC3Sidebar.GetPenaltyFeesInCurrentBooking();
        var my25Discount = thisC3Sidebar.GetMy25DiscountToApply();
        var priceToPay = penaltyFeesAmount + my25Discount;
        return priceToPay;
    };

    thisC3Sidebar.GetAvailableSpoilageFee = function (journeyObject) {
        var total = 0;
        if (journeyObject["SpoilageFee"] != undefined)
            total = parseFloat(journeyObject["SpoilageFee"]);
        return total;
    };

    thisC3Sidebar.GetTotalFare = function (journeyObject) {
        var total = 0;
        if (journeyObject["TotalFare"] != undefined)
            total = parseFloat(journeyObject["TotalFare"]);
        return total;
    };

    thisC3Sidebar.GetJourneyListInCurrentBooking = function () {
        var result = new Array();
        if (thisC3Sidebar.CurrentBooking != undefined)
            if (thisC3Sidebar.CurrentBooking.Journey != undefined)
                result.push.apply(result, thisC3Sidebar.CurrentBooking.Journey);
        return result;
    };

    //End Current Booking

    // Old Booking 
    thisC3Sidebar.OBGetSourcesToPrint = function (page) {
        var arraySourcesToPrint = new Array();
        for (var i = 0; i < page["FamilyTypes"].length; i++) {
            var elements = thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType(page["FamilyTypes"][i]["Code"]);
            for (var x = 0; x < elements.length; x++)
                arraySourcesToPrint.push.apply(arraySourcesToPrint, thisC3Sidebar.OBGetSourcesToPrintNew(elements[x]));
        }
        return arraySourcesToPrint;
    };

    thisC3Sidebar.OBGetSourcesToPrintNew = function (SsrFeeObject) {
        var OldBookingItems = new Array();
        switch (SsrFeeObject["Level"]) {
            case ("JourneySegmentPax"):
                {
                    switch (SsrFeeObject["Type"]) {
                        case ("Fee"):
                            {
                                OldBookingItems = thisC3Sidebar.OBGetFeeListByFeeCode(SsrFeeObject["Code"]);
                                break;
                            }
                        case ("SSR"):
                            {
                                OldBookingItems = thisC3Sidebar.OBGetSSRListBySSRCode(SsrFeeObject["Code"]);
                                break;
                            }
                    }
                    break;
                }
            case ("BookingPax"):
                {
                    switch (SsrFeeObject["Type"]) {
                        case ("Fee"):
                            {
                                OldBookingItems = thisC3Sidebar.OBGetPassengerFeeListInBookingLevel(SsrFeeObject["Code"]);
                                break;
                            }
                    }
                    break;
                }
        }
        return OldBookingItems;
    };

    thisC3Sidebar.OBGetJourneyList = function () {
        var result = new Array();
        if (thisC3Sidebar.OldBooking != undefined)
            if (thisC3Sidebar.OldBooking.Journey != undefined)
                result.push.apply(result, thisC3Sidebar.OldBooking.Journey);
        return result;
    };

    thisC3Sidebar.forEachPassengerInJorneyList = function (callback) {
        if (thisC3Sidebar.OldBooking != undefined) {
            var oldBookingJourneys = thisC3Sidebar.OBGetJourneyList();
            if (oldBookingJourneys != null)
                for (var j = 0; j < oldBookingJourneys.length; j++) {
                    var segments = thisC3Sidebar.GetSegmentsListByJourney(oldBookingJourneys[j]);
                    if (segments != null)
                        for (var s = 0; s < segments.length; s++) {
                            var passengers = thisC3Sidebar.GetPassengersListBySegment(segments[s]);
                            if (passengers != null)
                                for (var p = 0; p < passengers.length; p++) {
                                    callback(j, s, p, passengers[p]);
                                }
                        }
                }
        }
    };

    thisC3Sidebar.OBGetFeeListByFeeCode = function (feeCode) {
        var result = new Array();
        thisC3Sidebar.forEachPassengerInJorneyList(function (j, s, p, passenger) {
            var fees = thisC3Sidebar.GetFeeListByPassenger(passenger);
            if (fees != null)
                for (var f = 0; f < fees.length; f++) {
                    if (fees[f]["Code"] != feeCode) continue;
                    var currentFee = $.extend(true, {}, fees[f]);
                    currentFee["Journey"] = j;
                    currentFee["Segment"] = s;
                    currentFee["Pax"] = p;
                    currentFee["Quantity"] = 1;
                    result.push(currentFee);
                }
        });

        return result;
    };

    thisC3Sidebar.OBGetSSRListBySSRCode = function (SSRCode) {
        var result = new Array();
        thisC3Sidebar.forEachPassengerInJorneyList(function (j, s, p, passenger) {
            var ssrs = thisC3Sidebar.GetSSRListByPassenger(passenger);
            if (ssrs != null)
                for (var f = 0; f < ssrs.length; f++) {
                    if (ssrs[f]["Code"].indexOf(SSRCode) == -1) continue;
                    var currentSsr = $.extend(true, {}, ssrs[f]);
                    currentSsr["Journey"] = j;
                    currentSsr["Segment"] = s;
                    currentSsr["Pax"] = p;
                    currentSsr["Quantity"] = 1;
                    result.push(currentSsr);
                }
        });

        return result;
    };

    thisC3Sidebar.OBGetPassengerFeeListInBookingLevel = function (feeCode) {
        var result = new Array();
        if (thisC3Sidebar.OldBooking != undefined)
            if (thisC3Sidebar.OldBooking.Passenger != undefined)
                for (var i = 0; i < thisC3Sidebar.OldBooking.Passenger.length; i++) {
                    var fees = thisC3Sidebar.GetFeeListByPassenger(thisC3Sidebar.CurrentSelection.Passenger[i]);

                    var itemIndex = thisC3Sidebar.GetItemIndexInArray(fees, "Code", feeCode);

                    if (itemIndex != -1) {
                        var currFee = $.extend(true, {}, fees[itemIndex]);
                        result.push(currFee);
                    }
                }
        return result;
    };

    // End Old Booking

    //Common

    thisC3Sidebar.GetFamilyTypes = function (page) {
        var pageFamilyTypes = new Array();
        for (var i = 0; i < page["FamilyTypes"].length; i++)
            pageFamilyTypes.push.apply(pageFamilyTypes, thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType(page["FamilyTypes"][i]["Code"]));
        return pageFamilyTypes;
    };

    thisC3Sidebar.GetSegmentsListByJourney = function (journeyObject) {
        var result = new Array();
        if (journeyObject == undefined) return result;
        if (journeyObject.Segment != null)
            result.push.apply(result, journeyObject.Segment);
        return result;
    };

    thisC3Sidebar.GetPassengersListBySegment = function (segmentObject) {
        var result = new Array();
        if (segmentObject == undefined) return result;
        if (segmentObject.Passenger != undefined)
            result.push.apply(result, segmentObject.Passenger);
        return result;
    };

    thisC3Sidebar.GetFeeListByPassenger = function (passenger) {
        var result = new Array();
        if (passenger == undefined) return result;
        if (passenger.Fees != undefined)
            result.push.apply(result, passenger.Fees);
        return result;
    };

    thisC3Sidebar.GetSSRListByPassenger = function (passenger) {
        var result = new Array();
        if (passenger == undefined) return result;
        if (passenger.SSRS != undefined)
            result.push.apply(result, passenger.SSRS);
        return result;
    };

    thisC3Sidebar.GetSourcesToPrintNew = function (SsrFeeObject, onlyNewItems) {
        var currentSelectionItems;
        switch (SsrFeeObject["Level"]) {
            case ("JourneySegmentPax"):
                {
                    switch (SsrFeeObject["Type"]) {
                        case ("Fee"):
                            {
                                currentSelectionItems = thisC3Sidebar.GetFeeListByFeeCodeInCurrentSelection(SsrFeeObject["Code"]);
                                break;
                            }
                        case ("SSR"):
                            {
                                currentSelectionItems = thisC3Sidebar.GetSSRListBySSRCodeInCurrentSelection(SsrFeeObject["Code"]);
                                break;
                            }
                    }
                    break;
                }
            case ("BookingPax"):
                {
                    switch (SsrFeeObject["Type"]) {
                        case ("Fee"):
                            {
                                currentSelectionItems = thisC3Sidebar.GetPassengerFeeListInBookingLevelInCurrentSelection(SsrFeeObject["Code"]);
                                break;
                            }
                    }
                    break;
                }
        }

        if (onlyNewItems)
            currentSelectionItems = thisC3Sidebar.ArrayFilter(currentSelectionItems, "ActionStatusCode", "KK");

        return currentSelectionItems;
    };

    thisC3Sidebar.GetSourcesToPrint = function (SSRfeeCode) {
        var result = new Array();

        var OldBookingItems = thisC3Sidebar.GetFeeListByFeeCodeInOldBooking(SSRfeeCode);
        var currentSelectionItems = thisC3Sidebar.GetFeeListByFeeCodeInCurrentSelection(SSRfeeCode);

        var OldBookingSSRs = thisC3Sidebar.GetSSRListBySSRCodeInOldBooking(SSRfeeCode);
        var currentSelectionSSRs = thisC3Sidebar.GetSSRListBySSRCodeInCurrentSelection(SSRfeeCode);

        for (var i = 0; i < OldBookingItems.length; i++) {
            var existItemInCurrentSelection = thisC3Sidebar.ExistsElementByCodeInArray(currentSelectionItems, OldBookingItems[i]);
            if (existItemInCurrentSelection != -1) {
                result.push(currentSelectionItems[existItemInCurrentSelection]);
            }
            else {
                result.push(OldBookingItems[i]);
            }
        }
        var itemIndex;
        for (var i = 0; i < currentSelectionItems.length; i++) {
            itemIndex = thisC3Sidebar.ExistsElementByCodeInArray(result, currentSelectionItems[i], false);
            if (itemIndex == -1)
                result.push(currentSelectionItems[i]);
        }

        for (var i = 0; i < currentSelectionSSRs.length; i++) {
            itemIndex = thisC3Sidebar.ExistsElementByCodeInArray(result, currentSelectionSSRs[i], false);
            if (itemIndex == -1)
                result.push(currentSelectionSSRs[i]);
        }

        for (var i = 0; i < OldBookingSSRs.length; i++) {
            if (OldBookingSSRs[i]["Code"].indexOf(thisC3Sidebar.BagFeeCode) != -1) continue;
            itemIndex = thisC3Sidebar.ExistsElementByCodeInArray(result, OldBookingSSRs[i], false);
            if (itemIndex == -1)
                result.push(OldBookingSSRs[i]);
        }
        return result;
    };

    thisC3Sidebar.GroupBy = function (array, properties) {
        var result = new Array();
        for (var i = 0; i < array.length; i++) {
            var element = thisC3Sidebar.GetFeeElementFromFeeSSRList(array[i]["Code"]);
            var groupBy = element["GroupBy"];
            var inAllSegmentPax = element["ApplyInAllPaxSegments"] == "true";
            var groupByPax = element["Level"] == "BookingPax";

            var propertiesArray = new Array();
            propertiesArray.push("Code");
            propertiesArray.push(groupBy);

            var itemIndex = thisC3Sidebar.ExistsElementByCodeInArray(result, array[i], propertiesArray);
            if (itemIndex != -1) {
                if (inAllSegmentPax)
                    result[itemIndex]["Quantity"] = 1;
                else if (groupByPax && result[itemIndex]["Pax"] != array[i]["Pax"])
                    result[itemIndex]["Quantity"] = parseFloat(result[itemIndex]["Quantity"]) + 1;
                else
                    result[itemIndex]["Quantity"] = parseFloat(result[itemIndex]["Quantity"]) + (!isNaN(array[i]["Quantity"]) ? parseFloat(array[i]["Quantity"]) : 1);

                if ((!isNaN(array[i]["Amount"]) ? parseFloat(array[i]["Amount"]) : 0 != 0))
                    result[itemIndex]["Discount"] = parseFloat(result[itemIndex]["Discount"]) + (!isNaN(array[i]["Discount"]) ? parseFloat(array[i]["Discount"]) : 0);
                result[itemIndex]["Amount"] = parseFloat(result[itemIndex]["Amount"]) + (!isNaN(array[i]["Amount"]) ? parseFloat(array[i]["Amount"]) : 0);
                result[itemIndex]["PriceToPay"] = (result[itemIndex]["PriceToPay"] != undefined ? parseFloat(result[itemIndex]["PriceToPay"]) : 0) +
                    (!isNaN(array[i]["PriceToPay"]) ? parseFloat(array[i]["PriceToPay"]) : 0);
            }
            else {
                result.push(array[i]);
            }
        };
        return result;
    };

    thisC3Sidebar.ArrayFilter = function (array, propertyToFilter, valueToFilter) {
        var result = new Array();
        for (var i = 0; i < array.length; i++) {
            if (array[i][propertyToFilter] == valueToFilter) {
                result.push(array[i]);
            }
        };
        return result;
    };

    thisC3Sidebar.ArraySumProperty = function (array, propertyToSum) {
        var result = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i][propertyToSum] != undefined)
                result += parseFloat(array[i][propertyToSum]);
        }
        return result;
    };

    thisC3Sidebar.GroupByType = function (array, groupByPax) {
        var result = new Array();
        for (var i = 0; i < array.length; i++) {
            var itemIndex = thisC3Sidebar.ExistsElementByCodeInArray(result, array[i], true);
            if (itemIndex != -1) {
                result[itemIndex]["Quantity"] += (!isNaN(array[i]["Quantity"]) ? parseFloat(array[i]["Quantity"]) : 1);
                result[itemIndex]["Amount"] = parseFloat(result[itemIndex]["Amount"]) + (!isNaN(array[i]["Amount"]) ? parseFloat(array[i]["Amount"]) : 0);
                result[itemIndex]["PriceToPay"] = (result[itemIndex]["PriceToPay"] != undefined ? parseFloat(result[itemIndex]["PriceToPay"]) : 0) +
                    (!isNaN(array[i]["PriceToPay"]) ? parseFloat(array[i]["PriceToPay"]) : 0);
            }
            else {
                result.push(array[i]);
            }
        };
        return result;
    };

    thisC3Sidebar.ExistsElementByCodeInArray = function (array, item, propertiesArray) {
        var result = -1;
        if (array != undefined)
            for (var i = 0; i < array.length; i++) {
                var allproperties = true;
                for (var p = 0; p < propertiesArray.length; p++) {
                    if (array[i][propertiesArray[p]] != item[propertiesArray[p]]) {
                        allproperties = false;
                        break;
                    }
                }
                if (allproperties) {
                    result = i;
                    break;
                }
            };
        return result;
    };

    thisC3Sidebar.AddItemInArray = function (array, item) {
        array.push(item);
    };

    thisC3Sidebar.ObjectComparer = function (firstItem, secondItem) {
        var result = false;

        var familyType = thisC3Sidebar.GetFeeElementFromFeeSSRList(firstItem["Code"]);

        switch (familyType["FamilyType"]) {
            case thisC3Sidebar.SeatFeeCode:
                result = thisC3Sidebar.SeatComparer(firstItem, secondItem);
                break;
            case thisC3Sidebar.BagFeeCode:
                result = thisC3Sidebar.BagComparer(firstItem, secondItem);
                break;
            case "SPEQ":
                result = thisC3Sidebar.SpecialEquipmentComparer(firstItem, secondItem);
                break;
            case "INSURANCE":
            case "BAGINSURANCE":
                result = thisC3Sidebar.InsuranceComparer(firstItem, secondItem);
                break;

        }

        return result;
    };

    thisC3Sidebar.GenerateHtml = function (page, familyElements, array) {
        var result = new Array();
        switch (page["Code"]) {
            case "CHANGESEAT":
                result = thisC3Sidebar.GetSeatHtml(page, familyElements, array);
                break;
            default:
                result = thisC3Sidebar.GetGenericHtml(page, familyElements, array);
                break;
        }
        return result;
    };

    thisC3Sidebar.GetGenericHtml = function (page, familyElements, items) {
        var htmlArray = new Array();
        var discount = 0;
        var realPrice = 0;
        var subtotal = 0;
        if (items == undefined) return;
        for (var i = 0; i < items.length; i++) {
            var feeInfo = thisC3Sidebar.GetFeeElementFromFeeSSRList(items[i]["Code"]);
            if (feeInfo != undefined) {
                var currentPageProperties = thisC3Sidebar.ArrayFilter(page.FamilyTypes, "Code", feeInfo["FamilyType"]);
                if (currentPageProperties[0] != undefined && currentPageProperties[0]["ShowInThisBox"] == "false") continue;
            }
            var num = 0;
            if (items[i]["Code"].indexOf(thisC3Sidebar.BagFeeCode) != -1) {
                num = items[i]["Code"].substring(items[i]["Code"].indexOf(thisC3Sidebar.BagFeeCode) + thisC3Sidebar.BagFeeCode.length, thisC3Sidebar.BagFeeCode.length + 1);
            }
            else {
                num = items[i]["Quantity"];
            }

            if ((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"]) != 0)
                discount += (isNaN(items[i]["Discount"]) || items[i]["Discount"] == undefined) ? 0 : parseFloat(items[i]["Discount"]);
            realPrice += (isNaN(items[i]["PriceToPay"]) || items[i]["PriceToPay"] == undefined) ? 0 : parseFloat(items[i]["PriceToPay"]);
            subtotal += (isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"]);

            var arrayItem = "<tr><td class='col1' colspan='2' style='display: table-cell;'>" + num + " " + thisC3Sidebar.GetLabel(familyElements, items[i]["Code"], num > 1, items[i]["SeatType"]) + "</td>";
            arrayItem += "<td class='col3 price7' style='display: table-cell;'>" + SKYSALES.Util.convertToLocaleCurrency((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"])) + "</td></tr>";

            htmlArray.push(arrayItem);
        }

        return htmlArray;
    };

    thisC3Sidebar.GetSeatHtml = function (page, familyElements, items) {
        var htmlArray = new Array();
        var discount = 0;
        var realPrice = 0;
        var subtotal = 0;
        if (items != undefined)
            for (var i = 0; i < items.length; i++) {
                var num = 0;
                num = items[i]["Quantity"];

                if ((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"]) != 0)
                    discount += (isNaN(items[i]["Discount"]) || items[i]["Discount"] == undefined) ? 0 : parseFloat(items[i]["Discount"]);

                realPrice += (isNaN(items[i]["PriceToPay"]) || items[i]["PriceToPay"] == undefined) ? 0 : parseFloat(items[i]["PriceToPay"]);
                subtotal += (isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"]);

                if (page["Code"] == "CHANGESEAT") {
                    if (parseFloat(items[i]["Amount"]) > 0) {
                        var arrayItem = "<tr><td class='col1' colspan='2' style='display: table-cell;'>" + num + thisC3Sidebar.GetLabel(familyElements, items[i]["Code"], num > 1, items[i]["SeatType"]) + "</td>";
                        arrayItem += "<td class='col3 price7' style='display: table-cell;'>" + SKYSALES.Util.convertToLocaleCurrency((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"])) + "</td></tr>";
                    }
                    else {
                        var arrayItem = "<tr><td class='col1 tc_green' colspan='2' style='display: table-cell;'>" + num + thisC3Sidebar.GetLabel(familyElements, items[i]["Code"], num > 1, items[i]["SeatType"]) + "</td>";
                        arrayItem += "<td class='col3 price7 tc_green' style='display: table-cell;'>" + SKYSALES.Util.convertToLocaleCurrency((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"])) + "</td></tr>";
                    }
                }
                else {
                    var arrayItem = "<tr><td class='col1' colspan='2' style='display: table-cell;'>" + num + thisC3Sidebar.GetLabel(familyElements, items[i]["Code"], num > 1, items[i]["SeatType"]) + "</td>";
                    arrayItem += "<td class='col3 price7' style='display: table-cell;'>" + SKYSALES.Util.convertToLocaleCurrency((isNaN(items[i]["Amount"]) || items[i]["Amount"] == undefined) ? 0 : parseFloat(items[i]["Amount"])) + "</td></tr>";
                }
                htmlArray.push(arrayItem);
            }

        discount -= parseFloat(thisC3Sidebar.TotalSeatsOld);

        if (discount > 0) {
            var arrayItem = "<tr><td class='col1' colspan='2' style='display: table-cell;'>" + thisC3Sidebar.LabelDescuento + "</td>";
            arrayItem += "<td class='col3 price7' style='display: table-cell;'>" + SKYSALES.Util.convertToLocaleCurrency(discount) + "</td></tr>";
            htmlArray.push(arrayItem);
        }

        subtotal -= parseFloat(thisC3Sidebar.TotalSeatsOld);
        if (subtotal >= 0) {
            if (page["IdControlSubTotal"] != undefined)
                $("#" + page["IdControlSubTotal"]).html(SKYSALES.Util.convertToLocaleCurrency(subtotal));

        }

        //var totalItem = "<tr><td class='col1' colspan='2' style='display: table-cell;'>" + thisC3Sidebar.LabelTotal + "</td>";
        var totalItem = SKYSALES.Util.convertToLocaleCurrency(realPrice);


        $("#" + page["IdControlTotal"]).html(totalItem);
        thisC3Sidebar.CalculateTotalPrice(realPrice);
        return htmlArray;
    };

    thisC3Sidebar.GetLabel = function (familyElements, code, isPlural, type) {
        var result = null;
        var itemIndex = thisC3Sidebar.GetItemIndexInArray(familyElements, "Code", code);

        if (itemIndex != -1)
            if (type != undefined) {
                var itemInLabelIndex = thisC3Sidebar.GetItemIndexInArray(familyElements[itemIndex]["Labels"], "Type", type);
                if (itemInLabelIndex != -1)
                    result = isPlural ? familyElements[itemIndex]["Labels"][itemInLabelIndex]["Plural"] : familyElements[itemIndex]["Labels"][itemInLabelIndex]["Singular"];
            }
            else
                result = isPlural ? familyElements[itemIndex]["Labels"]["Plural"] : familyElements[itemIndex]["Labels"]["Singular"];
        return result;
    };

    thisC3Sidebar.GetPageInfo = function (code) {
        var page = null;
        var itemBoxIndex = thisC3Sidebar.GetItemIndexInArray(thisC3Sidebar.Pages, "Code", code);

        if (itemBoxIndex != -1)
            page = thisC3Sidebar.Pages[itemBoxIndex];
        return page;
    };

    thisC3Sidebar.GetFeeElementFromFeeSSRList = function (code) {
        var element = null;
        var itemIndex = thisC3Sidebar.GetItemIndexInArray(thisC3Sidebar.FeeSSRList, "Code", code);

        if (itemIndex != -1)
            element = thisC3Sidebar.FeeSSRList[itemIndex];
        return element;
    };

    thisC3Sidebar.GetFeeElementsFromFeeSSRListByFamilyType = function (familyCode) {
        var elements = new Array();
        for (var i = 0; i < thisC3Sidebar.FeeSSRList.length; i++) {
            if (thisC3Sidebar.FeeSSRList[i] && thisC3Sidebar.FeeSSRList[i]["FamilyType"] == familyCode)
                elements.push(thisC3Sidebar.FeeSSRList[i]);
        }
        return elements;
    };

    thisC3Sidebar.GetFeeElementsFromFeeSSRListByDependsFamilyType = function (familyCode) {
        var elements = new Array();
        for (var i = 0; i < thisC3Sidebar.FeeSSRList.length; i++) {
            if (thisC3Sidebar.FeeSSRList[i] && thisC3Sidebar.FeeSSRList[i]["FamilyDependsType"] == familyCode)
                elements.push(thisC3Sidebar.FeeSSRList[i]);
        }
        return elements;
    };

    thisC3Sidebar.GetItemIndexInArray = function (array, propertyToCompare, item) {
        var itemBoxIndex = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i][propertyToCompare] == item) {
                itemBoxIndex = i;
                break;
            }
        }
        return itemBoxIndex;
    };

    thisC3Sidebar.DynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };

    thisC3Sidebar.PrintSources = function (page, htmlsources) {
        if (htmlsources.length == 0) {
            $("#" + page["IdControlContentNew"]).hide();
            $("#" + page["IdControlSeparador"]).hide();
            $("#" + page["IdControlTable"]).hide();
        }
        else {
            $("#" + page["IdControlContentNew"]).show();
            $("#" + page["IdControlSeparador"]).show();
            $("#" + page["IdControlTable"]).show();
        }

        $("#" + page["IdControlContentNew"]).empty();
        for (var i = 0; i < htmlsources.length; i++) {
            $("#" + page["IdControlContentNew"]).append(htmlsources[i]);
        }
    };

    //End common

    return thisC3Sidebar;
};