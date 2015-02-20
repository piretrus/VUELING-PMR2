VUELING.Class.MinimunTimeJourney = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisMinimunTimeJourney = SKYSALES.Util.extendObject(parent);

    thisMinimunTimeJourney.firstDateSelected = '';
    thisMinimunTimeJourney.secondDateSelected = '';
    thisMinimunTimeJourney.elementToListen = '';
    thisMinimunTimeJourney.marketIndexAttrName = '';
    thisMinimunTimeJourney.arrivalTimeAttrName = '';
    thisMinimunTimeJourney.departureTimeAttrName = '';
    thisMinimunTimeJourney.dateFormat = '';
    thisMinimunTimeJourney.PopupId = '';
    thisMinimunTimeJourney.ButtonContinueId = '';
    thisMinimunTimeJourney.ButtonChangeId = '';
    thisMinimunTimeJourney.elementToScroll = '';
    thisMinimunTimeJourney.PopUpClass = '';
    thisMinimunTimeJourney.ParentTag = '';

    thisMinimunTimeJourney.init = function (json) {
        thisMinimunTimeJourney.setSettingsByObject(json);
        thisMinimunTimeJourney.addEvents();
    };

    thisMinimunTimeJourney.addEvents = function () {
        $('[' + thisMinimunTimeJourney.elementToListen + ']').click(thisMinimunTimeJourney.GetDateToValidate);
    };

    thisMinimunTimeJourney.GetDateToValidate = function () {
        var re = /^.{0,19}/;
        var marketindex = $(this).closest('[' + thisMinimunTimeJourney.marketIndexAttrName + ']');
        var valOfMarketIndex = marketindex.attr(thisMinimunTimeJourney.marketIndexAttrName);
        if (valOfMarketIndex == 0) {
            var firstDateLocation = $(this).closest('[' + thisMinimunTimeJourney.arrivalTimeAttrName + ']');
            var firstSelected = firstDateLocation.attr(thisMinimunTimeJourney.arrivalTimeAttrName);
            thisMinimunTimeJourney.firstDateSelected = firstSelected.match(re);
        } else {
            var secondDateLocation = $(this).closest('['+thisMinimunTimeJourney.departureTimeAttrName+']');
            var secondSelected = secondDateLocation.attr(thisMinimunTimeJourney.departureTimeAttrName);
            thisMinimunTimeJourney.secondDateSelected = secondSelected.match(re);
        }
        if (thisMinimunTimeJourney.firstDateSelected && thisMinimunTimeJourney.secondDateSelected) 
            thisMinimunTimeJourney.CompareJorneysDate();
        
    };

    thisMinimunTimeJourney.CompareJorneysDate = function () {

        var firstMarketDateConverted = VUELING.Util.getDateFromFormat(thisMinimunTimeJourney.firstDateSelected, thisMinimunTimeJourney.dateFormat);
        var secondMarketDateConverted = VUELING.Util.getDateFromFormat(thisMinimunTimeJourney.secondDateSelected, thisMinimunTimeJourney.dateFormat);
        var dateFirstMarket = new Date(firstMarketDateConverted);
        var dateSecondMarket = new Date(secondMarketDateConverted);
        var differenceBetweenDates = (dateSecondMarket - dateFirstMarket) / 60000;
        if (differenceBetweenDates <= 60 && differenceBetweenDates >= 0) 
            thisMinimunTimeJourney.ShowPopup();
    };

    thisMinimunTimeJourney.ShowPopup = function () {
        try {
            VUELING.trackingFunction('', 'event93', 'Minimum Time Between Journeys');
        } catch (e) {

        }
        var blockPopUp = new SKYSALES.Class.BlockedPopUp(),
                json = {};
        json.closeElement = $('#'+thisMinimunTimeJourney.ButtonChangeId +',#'+thisMinimunTimeJourney.ButtonContinueId);
        json.properties = { css: { width: '45em' }};
        blockPopUp.init(json);
        $('#' + thisMinimunTimeJourney.ButtonContinueId).click(thisMinimunTimeJourney.scrollTo);
        $('#' + thisMinimunTimeJourney.ButtonChangeId).click(thisMinimunTimeJourney.UnCheckOptions);
        blockPopUp.showCustomClassOnDiv(thisMinimunTimeJourney.PopupId, thisMinimunTimeJourney.PopUpClass, thisMinimunTimeJourney.ParentTag);
        
        return false;
    };

    thisMinimunTimeJourney.scrollTo = function () {
        $('html, body').animate({
            scrollTop: $('#' + thisMinimunTimeJourney.elementToScroll).offset().top
        }, 1500);
    };

    thisMinimunTimeJourney.UnCheckOptions = function () {
        thisMinimunTimeJourney.firstDateSelected = null;
        thisMinimunTimeJourney.secondDateSelected = null;
        var cleanMarket = VUELING.Util.getObjectInstance('availabilityInput');
        cleanMarket.clearAvailabilityTableSelection('[' + thisMinimunTimeJourney.elementToListen + ']');
        $('[' + thisMinimunTimeJourney.elementToListen + '] input:checked').prop("checked", false);

    }

    return thisMinimunTimeJourney;
};