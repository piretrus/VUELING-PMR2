

VUELING.Class.C3SidebarInsurance = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisC3SidebarInsurance = SKYSALES.Util.extendObject(parent);

    thisC3SidebarInsurance.SidebarBaseInstance = null;

    thisC3SidebarInsurance.init = function () {
        this.GetSidebarBaseInstance();
        this.RegisterObservers();
    };

    thisC3SidebarInsurance.GetSidebarBaseInstance = function () {
        thisC3SidebarInsurance.SidebarBaseInstance = VUELING.Util.getObjectInstance("C3Sidebar");
    };

    thisC3SidebarInsurance.RegisterObservers = function () {
        var baggages = VUELING.Util.getObjectInstanceAllStartWith("ChangeBaggageInput");
        $.each(baggages, function (index, item) {
            item.addInsuranceChangedObserver(thisC3SidebarInsurance.ChangeInsurance);
        });
        var insuranceInstance = VUELING.Util.getObjectInstanceAllStartWith("SSRInsuraceInputChange");
        $.each(insuranceInstance, function (index, item) {
            item.addInsurancesChangeObserver(thisC3SidebarInsurance.ChangeInsurance);
        });
    };

    thisC3SidebarInsurance.ChangeInsurance = function (insurance, pageCode, isRemove) {
        if (thisC3SidebarInsurance.SidebarBaseInstance == undefined) return;
        var amount = insurance["Amount"];
        var pax = insurance["Pax"];
        var code = insurance["Code"];

        var page = thisC3SidebarInsurance.SidebarBaseInstance.GetPageInfo(pageCode);
        var feeInfo = thisC3SidebarInsurance.SidebarBaseInstance.GetFeeElementFromFeeSSRList(code);
        var insuranceObj = thisC3SidebarInsurance.CreateInsuranceObject(code, pax, amount);

        thisC3SidebarInsurance.ProcessData(parseFloat(pax), page, feeInfo, insuranceObj, isRemove);
    };

    thisC3SidebarInsurance.CreateInsuranceObject = function (code, paxId, amount) {
        var insurance = new Object();
        insurance["Pax"] = parseFloat(paxId);
        insurance["Code"] = code;
        insurance["Amount"] = amount;
        insurance["Quantity"] = 1;
        insurance["PriceToPay"] = insurance["Amount"];
        insurance["ActionStatusCode"] = "KK";
        return insurance;
    };

    thisC3SidebarInsurance.ProcessData = function (paxId, page, feeInfo, insuranceObj, isRemove) {

        thisC3SidebarInsurance.SidebarBaseInstance.AddRemoveElementInCurrentSelection(paxId, page, feeInfo, insuranceObj, isRemove);
        // Get all items
        var sourcesToPrint = thisC3SidebarInsurance.SidebarBaseInstance.CSGetSourcesToPrint(page);

        // Get only new items
        var newInsurances = thisC3SidebarInsurance.SidebarBaseInstance.ArrayFilter(thisC3SidebarInsurance.SidebarBaseInstance.GroupBy(sourcesToPrint, feeInfo["GroupBy"]), "ActionStatusCode", "KK");

        //Get types to show in sidebar
        var familyElements = thisC3SidebarInsurance.SidebarBaseInstance.GetFamilyTypes(page);

        var subTotal = thisC3SidebarInsurance.SidebarBaseInstance.ArraySumProperty(newInsurances, "Amount");

        thisC3SidebarInsurance.SidebarBaseInstance.CalculateTotalPrice(subTotal);

        //get html
        var htmlnewInsurances = thisC3SidebarInsurance.SidebarBaseInstance.GenerateHtml(page, familyElements, newInsurances.sort(thisC3SidebarInsurance.SidebarBaseInstance.DynamicSort("Code")));
        thisC3SidebarInsurance.SidebarBaseInstance.PrintSources(page, htmlnewInsurances);
    };

    return thisC3SidebarInsurance;
};