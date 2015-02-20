

VUELING.Util.ChangeSelectedDateErrorCallback = function (market) {
    var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
    availabilityInputInstance.nextWeek[market].click();
};