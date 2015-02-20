

VUELING.Class.SubmitOnEnterKeyDown = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisEnterKeyPressed = SKYSALES.Util.extendObject(parent);

    thisEnterKeyPressed.contenedorId = '';
    thisEnterKeyPressed.botonId = '';

    thisEnterKeyPressed.inputs = "input,select";
    thisEnterKeyPressed.elements = null;
    thisEnterKeyPressed.boton = null;

    thisEnterKeyPressed.setVars = function () {
        parent.setVars.call(this);
        thisEnterKeyPressed.elements = $('#' + thisEnterKeyPressed.contenedorId).find(thisEnterKeyPressed.inputs);
        thisEnterKeyPressed.boton = this.getById(thisEnterKeyPressed.botonId);
    };

    thisEnterKeyPressed.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
    };

    thisEnterKeyPressed.addEvents = function () {
        parent.addEvents.call(this);
        $(this.elements).keydown(this.contenedorClickHandler);
    };

    thisEnterKeyPressed.contenedorClickHandler = function (e) {
        if (e.which == 13) {
            var isValid = thisEnterKeyPressed.boton[0].onclick();
            if (isValid === true) {
                window.location = thisEnterKeyPressed.boton[0].href;
            }
        }
    };

    return thisEnterKeyPressed;
};