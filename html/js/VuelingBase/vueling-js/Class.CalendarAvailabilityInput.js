/*
Name: 
Class CalendarAvailabilityInput
Param:
None
Return: 
An instance of CalendarAvailabilityInput
Functionality:
Displays the low fare calendar
Notes:
This is the container object that has an array of markets
Class Hierarchy:
SkySales -> CalendarAvailabilityInputBase -> CalendarAvailabilityInput
*/
VUELING.Class.CalendarAvailabilityInput = function () {
    var parent = new VUELING.Class.CalendarAvailabilityInputBase(),
        thisCalendarAvailabilityInput = SKYSALES.Util.extendObject(parent);

    thisCalendarAvailabilityInput.init = function (json) {
        this.setSettingsByObject(json);
        parent.marketClass = 'CalendarAvailabilityMarket';
        this.initMarketArray();
        this.setVars();
        this.draw();
        this.setVarsAfterDraw(json);
        this.initMonthTabArray();
        this.initFareSelector(json);
        this.addEvents();
        this.selectInitialDateMarkets();
        this.setTabsLocation();
        this.checkFaresShown();
    };

    return thisCalendarAvailabilityInput;
};