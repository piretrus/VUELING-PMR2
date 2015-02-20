

VUELING.Class.C3SidebarSpecialEquipment = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisC3SidebarSpecialEquipment = SKYSALES.Util.extendObject(parent);

    thisC3SidebarSpecialEquipment.SidebarBaseInstance = null;

    thisC3SidebarSpecialEquipment.init = function () {
        this.GetSidebarBaseInstance();
        this.RegisterObservers();
    };

    thisC3SidebarSpecialEquipment.GetSidebarBaseInstance = function () {
        thisC3SidebarSpecialEquipment.SidebarBaseInstance = VUELING.Util.getObjectInstance("C3Sidebar");
    };

    thisC3SidebarSpecialEquipment.RegisterObservers = function () {
        var specialEq = VUELING.Util.getObjectInstanceAllStartWith("ChangeSpecialEquipmentInput");
        $.each(specialEq, function (index, item) {
            item.addSpecialEquipmentChangeObserver(thisC3SidebarSpecialEquipment.SpecialEquipmentSelect);
        });
    };

    thisC3SidebarSpecialEquipment.SpecialEquipmentSelect = function (element, pageCode, isRemove) {
        if (thisC3SidebarSpecialEquipment.SidebarBaseInstance == undefined) return;
        var codeSpeq = element["Code"];
        var amount = element["Amount"];
        var paxId = element["Pax"];

        var page = thisC3SidebarSpecialEquipment.SidebarBaseInstance.GetPageInfo(pageCode);

        var feeInfo = thisC3SidebarSpecialEquipment.SidebarBaseInstance.GetFeeElementFromFeeSSRList(codeSpeq);

        var equipment = thisC3SidebarSpecialEquipment.CreateSpecialEquipmentObject(codeSpeq, amount, paxId, feeInfo["Level"]);

        thisC3SidebarSpecialEquipment.ProcessData(paxId, page, feeInfo, equipment, isRemove);
    };

    thisC3SidebarSpecialEquipment.CreateSpecialEquipmentObject = function (code, amount, paxId, level) {
        var specialEquipment = new Object();
        specialEquipment["Code"] = code;
        specialEquipment["Pax"] = paxId;
        specialEquipment["Quantity"] = 1;
        specialEquipment["Amount"] = amount;
        specialEquipment["ActionStatusCode"] = "KK";

        if (level != "BookingPax") {
            var totalSegments = 0;
            $.each(thisC3SidebarSpecialEquipment.SidebarBaseInstance.GetJourneyListInCurrentSelection(), function (index, value) {
                totalSegments += thisC3SidebarSpecialEquipment.SidebarBaseInstance.GetSegmentsListByJourney(value).length;
            });
            if (totalSegments != 0) specialEquipment["Amount"] = amount / totalSegments;
        }
        return specialEquipment;
    };

    thisC3SidebarSpecialEquipment.ProcessData = function (paxId, page, feeInfo, insuranceObj, isRemove) {
        thisC3SidebarSpecialEquipment.SidebarBaseInstance.AddRemoveElementInCurrentSelection(paxId, page, feeInfo, insuranceObj, isRemove);
        // Get all items
        var sourcesToPrint = thisC3SidebarSpecialEquipment.SidebarBaseInstance.CSGetSourcesToPrint(page);

        // Get only new items
        var newSpecialEquipment = thisC3SidebarSpecialEquipment.SidebarBaseInstance.ArrayFilter(sourcesToPrint, "ActionStatusCode", "KK");

        // Agrouping
        var newSpecialEquipmentAgrouped = thisC3SidebarSpecialEquipment.SidebarBaseInstance.GroupBy(newSpecialEquipment, feeInfo["GroupBy"])

        //Get types to show in sidebar
        var familyElements = thisC3SidebarSpecialEquipment.SidebarBaseInstance.GetFamilyTypes(page);

        var subTotal = thisC3SidebarSpecialEquipment.SidebarBaseInstance.ArraySumProperty(newSpecialEquipmentAgrouped, "Amount");

        thisC3SidebarSpecialEquipment.SidebarBaseInstance.CalculateTotalPrice(subTotal);

        //get html
        var htmlnewInsurances = thisC3SidebarSpecialEquipment.SidebarBaseInstance.GenerateHtml(page, familyElements, newSpecialEquipmentAgrouped.sort(thisC3SidebarSpecialEquipment.SidebarBaseInstance.DynamicSort("Pax")));
        thisC3SidebarSpecialEquipment.SidebarBaseInstance.PrintSources(page, htmlnewInsurances);
    };
    return thisC3SidebarSpecialEquipment;
};