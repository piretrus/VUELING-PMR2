


VUELING.Class.MyVuelingCustomMenu = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisMyVuelingCustomMenu = SKYSALES.Util.extendObject(parent);

    thisMyVuelingCustomMenu.idMenu = "";
    thisMyVuelingCustomMenu.Menu = "";
    thisMyVuelingCustomMenu.clpulsado = "";


    thisMyVuelingCustomMenu.init = function (json) {
        this.setSettingsByObject(json);
        thisMyVuelingCustomMenu.Menu = this.getById(thisMyVuelingCustomMenu.idMenu);
        thisMyVuelingCustomMenu.formatMenu();
    };

    thisMyVuelingCustomMenu.formatMenu = function () {
        var elmSel = $(thisMyVuelingCustomMenu.Menu).find('li.' + thisMyVuelingCustomMenu.clpulsado);
        if ($(elmSel).find("." + thisMyVuelingCustomMenu.clpulsado).size() > 0) {
            $(elmSel).find("." + thisMyVuelingCustomMenu.clpulsado).each(function () {
                if ($(this).is(":hidden")) {
                    $(this).parent().parent().show();
                };
            });
        }
    };
    return thisMyVuelingCustomMenu;
};