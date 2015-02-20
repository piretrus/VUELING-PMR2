

VUELING.Class.SubmitOnEnterKeyDownClick = function () {
    var parent = new VUELING.Class.SubmitOnEnterKeyDown(),
        thisEnterKeyPressed = SKYSALES.Util.extendObject(parent);

    thisEnterKeyPressed.addEvents = function () {
        parent.addEvents.call(this);
        return true;
    };

    thisEnterKeyPressed.contenedorClickHandler = function (e) {
        if (e.which == 13) {
            thisEnterKeyPressed.boton.click();
        }
    };

    return thisEnterKeyPressed;
};