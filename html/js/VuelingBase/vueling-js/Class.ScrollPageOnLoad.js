/*
Name: Class.ScrollPageOnLoad
Param: None
Return: an instance of ScrollPageOnLoad
Functionality: Scrolls down the page to the selected element
*/

VUELING.Class.ScrollPageOnLoad = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisScrollPage = SKYSALES.Util.extendObject(parent);
    thisScrollPage.elementId = '';
    thisScrollPage.extraFunction = '';

    thisScrollPage.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        if ($('#' + thisScrollPage.elementId).length > 0)
            thisScrollPage.doScroll();
    };

    thisScrollPage.doScroll = function () {
        $('html,body').animate({
            scrollTop: $('#' + thisScrollPage.elementId).offset().top
        }, 500);
        if (thisScrollPage.extraFunction)
            thisScrollPage.extraFunction();
    };


    return thisScrollPage;
};