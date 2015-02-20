/*
Name: 
Class ScrollPage
Param: 
None
Return: 
an instance of ScrollPage
Functionality: 
The object that initializes the ScrollPage control
Notes: 
The ScrollPage is sent down to the browser via JSON that is created in the XSLT file.
The XSLT creates a new SKYSALES.availabilityInput.dateMarketLowestFareList and then the 
SKYSALES.availabilityInput.init function calls the SKYSALES.availabilityInput.initLowestPriceSelection which will
select the radio button sent down as the lowest fare control id.This class also attemps to call 
taxAndFeeInclusiveDisplayDataRequestHandler that is in TaxAndFeeInclusiveDisplay.js
*/

VUELING.Class.ScrollPage = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisScrollPage = SKYSALES.Util.extendObject(parent);
    thisScrollPage.elementId = '';
    thisScrollPage.showFormButton = null;

    thisScrollPage.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.addEvents();
    };
    thisScrollPage.addEvents = function () {
        this.getById(thisScrollPage.elementId).click(this.scrollPageClickHandler);
    };

    thisScrollPage.scrollPageClickHandler = function () {
        var basicChecked = false;
        var radioBasicFares = $('#' + thisScrollPage.elementId);
        basicChecked = radioBasicFares.is(':checked');
        if (basicChecked == true) {
            $('html,body').animate({
                scrollTop: $('#' + thisScrollPage.elementId).offset().top
            }, 500);
        }
    };


    return thisScrollPage;
};