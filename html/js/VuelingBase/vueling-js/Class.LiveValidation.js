/*
Validacion en tiempo real para inputs y selects. 
Para poner el icono se necesita que cada elemento este dentro de un fieldset.
*/
VUELING.Class.LiveValidation = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisLiveValidation = SKYSALES.Util.extendObject(parent);

    thisLiveValidation.dobMode = false;     //Si se activa se validan los campos de fecha de nacimiento conjuntamente.
    thisLiveValidation.dobClass = "";
    thisLiveValidation.dobValidatorClass = "";
    thisLiveValidation.validateGroupRadioLabelClass = "validateGroupRadioLabel";

    thisLiveValidation.showIcon = true;
    thisLiveValidation.containerId = "";
    thisLiveValidation.validateEmptyFields = false;
    thisLiveValidation.preValidateElements = null;
    thisLiveValidation.elements = null;
    thisLiveValidation.dobElements = null;
    thisLiveValidation.bindBlur = true;
    thisLiveValidation.bindChange = true;
    thisLiveValidation.bindAutocomplete = true;
    thisLiveValidation.excludeValidationClass = "";
    thisLiveValidation.excludeInputTypes = "";

    thisLiveValidation.validIconClass = "";
    thisLiveValidation.invalidIconClass = "";

    thisLiveValidation.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
        this.validateOnLoad();
    };
    
    thisLiveValidation.setVars = function () {
        parent.setVars.call(this);
        this.elements = $('#' + this.containerId)
            .find("input, select")
            .not("." + this.excludeValidationClass)
            .filter(function () {
                if (thisLiveValidation.excludeInputTypes != null || thisLiveValidation.excludeInputTypes != "") {
                    for (var excludedType in thisLiveValidation.excludeInputTypes) {
                        if (this.type === thisLiveValidation.excludeInputTypes[excludedType])
                            return false;
                    }                    
                }
                return true;
            });           
    };

    thisLiveValidation.addEvents = function () {
        parent.addEvents.call(this);
        if (this.bindBlur)
            this.elements.blur(this.validateHandler);
        if (this.bindChange)
            this.elements.change(this.validateHandler);
        if (this.bindAutocomplete)
            this.elements.bind("blur.autocomplete", this.validateHandler);
    };

    thisLiveValidation.validateOnLoad = function () {
        for (var preElement in this.preValidateElements) {
            this.validateHandler(null, $('#' + this.preValidateElements[preElement]), true);
        }
    };
    

    thisLiveValidation.validateHandler = function (e, id, withoutReload) {
        if (id == null || id == "")
            id = this.id;

        if (this.getAttribute(thisLiveValidation.validateGroupRadioLabelClass)) {
            if ($(this.parentElement.parentElement).attr("class").indexOf(thisLiveValidation.excludeValidationClass) !== -1)
                return;
        } else {
        if ($(this.parentElement).attr("class").indexOf(thisLiveValidation.excludeValidationClass) !== -1)
            return;
        }
        var valid = true;
        if ($(this.parentElement).attr("class"). indexOf(thisLiveValidation.dobClass) !== -1) {
            VUELING.Util.validateByElementId("#" + id, thisLiveValidation.validateEmptyFields, true, withoutReload);
            valid = VUELING.Util.validateByElementId("#" + $(this.parentElement).find("." + thisLiveValidation.dobValidatorClass).attr("id"), thisLiveValidation.validateEmptyFields, true, withoutReload);        
        } else {
            valid = VUELING.Util.validateByElementId("#" + id, thisLiveValidation.validateEmptyFields, true, withoutReload);
        }            

        thisLiveValidation.iconSwitch(valid, this);
    };

    thisLiveValidation.iconSwitch = function (valid, element) {
        if (thisLiveValidation.showIcon) {
            var showIconForThisElement = false;
            var elementFielset = null;
            if (element.getAttribute(thisLiveValidation.validateGroupRadioLabelClass)) {
                showIconForThisElement = (element.parentNode.parentNode.nodeName === "FIELDSET");
                elementFielset = element.parentNode.parentNode;
            }
            else {
                showIconForThisElement = (element.parentNode.nodeName === "FIELDSET");
                elementFielset = element.parentNode;
            }

            if (showIconForThisElement) {
            if (!valid) {
                    $(elementFielset).removeClass(thisLiveValidation.validIconClass);
                    $(elementFielset).addClass(thisLiveValidation.invalidIconClass);
            } else {
                    $(elementFielset).removeClass(thisLiveValidation.invalidIconClass);
                if (!thisLiveValidation.validateEmptyFields && element.value == "")
                    return;
                    $(elementFielset).addClass(thisLiveValidation.validIconClass);
                }
            }
        }
    };


    return thisLiveValidation;
};