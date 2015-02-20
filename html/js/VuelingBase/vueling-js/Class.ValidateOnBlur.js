

VUELING.Class.ValidateOnBlur = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisValidateOnBlur = SKYSALES.Util.extendObject(parent);

    thisValidateOnBlur.contenedorId = '';
    thisValidateOnBlur.validateEmptyFields = true;
    thisValidateOnBlur.validateCheckboxes = true;
    thisValidateOnBlur.preValidateElements = null;
    thisValidateOnBlur.dobRootId = '';
    thisValidateOnBlur.dobValidator = '';

    thisValidateOnBlur.inputs = "input,select";
    thisValidateOnBlur.elements = null;

    thisValidateOnBlur.validClass = '';

    thisValidateOnBlur.setVars = function () {
        parent.setVars.call(this);
        this.elements = $('#' + this.contenedorId).find(this.inputs);
    };

    thisValidateOnBlur.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
        this.validateOnLoad();
    };

    thisValidateOnBlur.addEvents = function () {
        parent.addEvents.call(this);
        $(this.elements).change(this.onBlurHandler);
        $(this.elements).blur(this.onBlurHandler);
        $(this.elements).bind("blur.autocomplete", this.onBlurHandler);
    };

    thisValidateOnBlur.validateOnLoad = function () {
        for (id in this.preValidateElements) {
            $('#' + this.preValidateElements[id]).blur();
        }
    }

    thisValidateOnBlur.onBlurHandler = function (e, id, withoutReload) {
        if (id == null) {
            id = this.id;
        }
        VUELING.Util.validateByElementId("#" + id, thisValidateOnBlur.validateEmptyFields, thisValidateOnBlur.validateCheckboxes, withoutReload);
    };
    return thisValidateOnBlur;
};