


VUELING.Util.validateByElementId = function (idString, validateEmptyFields, validateCheckboxes, withouReload) {
    var validate = null;
    if (idString !== undefined) {
        // run validation on the form elements
        var elementContent = $.trim($(idString).val());
        if (!$(idString).is(':checkbox') || ($(idString).is(':checkbox') && validateCheckboxes)) {
            if (elementContent != '' || (elementContent == '' && validateEmptyFields)) {
                validate = new SKYSALES.Validate(null, '', SKYSALES.errorsHeader, null);
                var currentValidation = validate.runByElementId(idString);
                return (withouReload) ? currentValidation : validate.outputErrors(false);
            }
        }
    }
    return true;
};