

VUELING.Class.ValidateOnBlurIcon = function () {
    var parent = new VUELING.Class.ValidateOnBlur(),
        thisValidateOnBlurIcon = SKYSALES.Util.extendObject(parent);

    var baseOnBlurHandler = thisValidateOnBlurIcon.onBlurHandler;

    thisValidateOnBlurIcon.onBlurHandler = function () {
        var valid = true;
        var element = this;
        if (element.id.indexOf(thisValidateOnBlurIcon.dobRootId) > -1) {
            element = document.getElementById(thisValidateOnBlurIcon.dobValidator);
        }
        baseOnBlurHandler(window.event, element.id, true);
        if (element.type == "checkbox" && !thisValidateOnBlurIcon.validateCheckboxes)
        { return; }
        var onBlurParent = element.parentElement;
        if (onBlurParent.id == "DobFieldSet") {
            for (var i = 0; i < onBlurParent.childNodes.length; i++) {
                var onBlurDropElement = onBlurParent.childNodes[i];
                if (onBlurDropElement.classList.contains("validationError") || onBlurDropElement.value == "none") {
                    valid = false;
                    break;
                }
            }
        }
        if (!valid || $('#' + element.id).hasClass("validationError")) {
            $('#' + element.id).parent().removeClass(thisValidateOnBlurIcon.validClass);
        } else {
            $('#' + element.id).parent().addClass(thisValidateOnBlurIcon.validClass);
        }
    };

    thisValidateOnBlurIcon.formValidation = function () {
        for (var i = 0; i < thisValidateOnBlurIcon.elements.count() ; i++) {
            VUELING.Util.validateByElementId(
                '#' + thisValidateOnBlurIcon.elements[i],
                thisValidateOnBlurIcon.validateEmptyFields,
                thisValidateOnBlurIcon.validateCheckboxes,
                true);
        }
    };

    return thisValidateOnBlurIcon;
};