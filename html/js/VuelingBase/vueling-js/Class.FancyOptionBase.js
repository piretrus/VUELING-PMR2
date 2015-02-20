

VUELING.Class.FancyOptionBase = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.init = function (params) {
        if (!VUELING.Util.IsiPad())
            return;
        if (params.ids)
            for (var i = 0; i < params.ids.length; i++)
                this.create(params.ids[i]);
        if (params.id)
            this.create(params.id);
    };

    thisClass.create = function (id) {

    };

    return thisClass;
}