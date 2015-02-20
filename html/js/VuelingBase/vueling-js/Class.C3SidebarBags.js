

VUELING.Class.C3SidebarBags = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisC3SidebarBags = SKYSALES.Util.extendObject(parent);

    thisC3SidebarBags.SidebarBaseInstance = null;

    thisC3SidebarBags.init = function () {
        this.GetSidebarBaseInstance();
        thisC3SidebarBags.RegisterObservers();
    };

    thisC3SidebarBags.RegisterObservers = function () {
        thisC3SidebarBags.RegisterBagsObserver();
    };

    thisC3SidebarBags.GetSidebarBaseInstance = function () {
        thisC3SidebarBags.SidebarBaseInstance = VUELING.Util.getObjectInstance("C3Sidebar");
    };

    thisC3SidebarBags.RegisterBagsObserver = function () {
        var baggages = VUELING.Util.getObjectInstanceAllStartWith("ChangeBaggageInput");
        $.each(baggages, function (index, item) {
            item.addBaggageChangedObserver(thisC3SidebarBags.SelectBaggage);
        });
    };

    thisC3SidebarBags.SelectBaggage = function (element, pageCode, isRemove) {
        if (thisC3SidebarBags.SidebarBaseInstance == undefined) return;
        var paxId = element["paxId"];
        var page = thisC3SidebarBags.SidebarBaseInstance.GetPageInfo(pageCode);
        var feeInfo = thisC3SidebarBags.SidebarBaseInstance.GetFeeElementFromFeeSSRList(element["Code"]);

        var selectedBag = thisC3SidebarBags.CreateBagObject(element["Code"], element["price"], paxId);

        thisC3SidebarBags.ProcessData(paxId, page, feeInfo, selectedBag, isRemove);
    };

    thisC3SidebarBags.CreateBagObject = function (code, amount, paxId) {
        var bag = new Object();
        bag["Code"] = code;
        bag["Quantity"] = 1;
        bag["Pax"] = paxId;
        bag["ActionStatusCode"] = "KK";

        var totalSegments = 0;
        $.each(thisC3SidebarBags.SidebarBaseInstance.GetJourneyListInCurrentSelection(), function (index, value) {
            totalSegments += thisC3SidebarBags.SidebarBaseInstance.GetSegmentsListByJourney(value).length;
        });

        bag["Amount"] = amount;
        if (totalSegments != 0) bag["Amount"] = amount / totalSegments;
        bag["PriceToPay"] = bag["Amount"];

        return bag;
    };

    thisC3SidebarBags.ProcessData = function (paxId, page, feeInfo, selectedBag, isRemove) {

        thisC3SidebarBags.SidebarBaseInstance.AddRemoveElementInCurrentSelection(paxId, page, feeInfo, selectedBag, isRemove);
        // Get all items
        var sourcesToPrint = thisC3SidebarBags.SidebarBaseInstance.CSGetSourcesToPrint(page);

        // Get only new items
        var newBags = thisC3SidebarBags.SidebarBaseInstance.ArrayFilter(thisC3SidebarBags.SidebarBaseInstance.GroupBy(sourcesToPrint, feeInfo["GroupBy"]), "ActionStatusCode", "KK");

        //Get types to show in sidebar
        var familyElements = thisC3SidebarBags.SidebarBaseInstance.GetFamilyTypes(page);

        var subTotal = thisC3SidebarBags.SidebarBaseInstance.ArraySumProperty(newBags, "Amount");

        thisC3SidebarBags.SidebarBaseInstance.CalculateTotalPrice(subTotal);

        var htmlnewBags = thisC3SidebarBags.SidebarBaseInstance.GenerateHtml(page, familyElements, newBags.sort(thisC3SidebarBags.SidebarBaseInstance.DynamicSort("Code")));
        thisC3SidebarBags.SidebarBaseInstance.PrintSources(page, htmlnewBags);
    };

    return thisC3SidebarBags;
};