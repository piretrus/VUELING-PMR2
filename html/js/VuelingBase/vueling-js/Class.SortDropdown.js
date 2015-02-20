

VUELING.Class.SortDropdown = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisSortDropdown = SKYSALES.Util.extendObject(parent);

    thisSortDropdown.dropdowns = '';
    thisSortDropdown.selecttext = '';

    thisSortDropdown.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisSortDropdown.initObject = function () {
        for (var i in thisSortDropdown.dropdowns) {
            thisSortDropdown.sortObject(thisSortDropdown.dropdowns[i]);
        }
    };

    thisSortDropdown.addEvents = function () {

    };

    thisSortDropdown.sortObject = function (object) {
        var my_options = $("#" + object + " option");

        my_options.sort(function (a, b) {
            if (a.text > b.text) return 1;
            else if (a.text < b.text) return -1;
            else return 0
        });
        $("#" + object).empty().append(my_options).prepend("<option value=''>" + thisSortDropdown.selecttext + "</option>").val("");
    };

    return thisSortDropdown;
};