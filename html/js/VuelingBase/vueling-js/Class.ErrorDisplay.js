VUELING.Class.ErrorDisplay = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.ObjectsCollection = null;
    thisClass.Button = null;
    thisClass.GoTo = null;
    thisClass.Error = null;

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();

    };

    thisClass.addEvents = function () {
        thisClass.GetObjectsCollection();
        thisClass.RegisterEvents();
    };

    thisClass.GetObjectsCollection = function () {
        thisClass.ObjectsCollection = {
            "Button": $(thisClass.Button),
            "GoTo": $(thisClass.GoTo)
        };
    };

    thisClass.RegisterEvents = function () {
        $(thisClass.ObjectsCollection["Button"]).click(function (e) {
            e.preventDefault();

            if ($("#btnDetailsReservation").length > 0 && !$("#btnDetailsReservation").hasClass("pulsado")) {
                $("#btnDetailsReservation").trigger("click");
            }
            $('html, body').animate({
                scrollTop: thisClass.ObjectsCollection["GoTo"].offset().top
            }, 1500);
            return false;
        });
    };

    return thisClass;
};