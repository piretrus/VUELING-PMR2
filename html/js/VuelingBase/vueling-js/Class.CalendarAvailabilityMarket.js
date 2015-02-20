/*
Name: 
Class CalendarAvailabilityMarket
Param:
None
Return: 
An instance of CalendarAvailabilityMarket
Functionality:
Represents a single calendar in the low fare calendar view
Notes:
                
Class Hierarchy:
SkySales -> CalendarAvailabilityMarketBase -> CalendarAvailabilityMarket
*/
VUELING.Class.CalendarAvailabilityMarket = function () {
    var parent = new VUELING.Class.CalendarAvailabilityMarketBase(),
            thisCalendarAvailabilityMarket = SKYSALES.Util.extendObject(parent);

    thisCalendarAvailabilityMarket.availableClass = 'availableFare';

    thisCalendarAvailabilityMarket.updateFareHandler = function (eventInfo) {
        thisCalendarAvailabilityMarket.updateFareEvent(eventInfo);
    };

    return thisCalendarAvailabilityMarket;
};