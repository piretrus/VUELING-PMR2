

VUELING.Class.VuelingBusiness = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisVuelingBusiness = SKYSALES.Util.extendObject(parent);

    thisVuelingBusiness.IsLoggedIn = false;
    thisVuelingBusiness.IsAgency = false;
    thisVuelingBusiness.IsCorporate = false;
    thisVuelingBusiness.IsMyvueling = false;

    thisVuelingBusiness.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisVuelingBusiness.initObject = function () { };
    thisVuelingBusiness.addEvents = function () { };

    return thisVuelingBusiness;
};