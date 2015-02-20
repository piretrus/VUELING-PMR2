

VUELING.Class.FocusFirstElement = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisFocusFirstElement = SKYSALES.Util.extendObject(parent);

    thisFocusFirstElement.contenedorId = '';

    thisFocusFirstElement.inputs = "input,select";
    thisFocusFirstElement.element = null;

    thisFocusFirstElement.setVars = function () {
        parent.setVars.call(this);
        this.element = $('#' + this.contenedorId).find(this.inputs).not(':hidden').first();
    };

    thisFocusFirstElement.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
    };

    thisFocusFirstElement.addEvents = function () {
        parent.addEvents.call(this);
        $(this.element).focus();
    };

    return thisFocusFirstElement;
};