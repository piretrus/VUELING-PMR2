

VUELING.Class.LoadQuickSearch = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisLoadQuickSearch = SKYSALES.Util.extendObject(parent);

    thisLoadQuickSearch.url = "";
    thisLoadQuickSearch.placeHolderId = "";

    thisLoadQuickSearch.placeHolder = null;

    thisLoadQuickSearch.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisLoadQuickSearch.setVars = function () {
        thisLoadQuickSearch.placeHolder = this.getById(thisLoadQuickSearch.placeHolderId);
    };

    thisLoadQuickSearch.addEvents = function () {
        $(thisLoadQuickSearch.placeHolder).load(thisLoadQuickSearch.url + ' #validQuickSearch');
    };

    return thisLoadQuickSearch;
};