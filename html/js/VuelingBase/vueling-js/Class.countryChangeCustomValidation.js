

VUELING.Class.countryChangeCustomValidation = function () {
    var parent = SKYSALES.Class.SkySales(),
            thiscountryChangeCustomValidation = SKYSALES.Util.extendObject(parent);

    thiscountryChangeCustomValidation.DocumentId = "";
    thiscountryChangeCustomValidation.CountryId = "";
    thiscountryChangeCustomValidation.ValidateRequiredCode = "";
    thiscountryChangeCustomValidation.CountryIdElement = "";
    thiscountryChangeCustomValidation.DocumentIdElement = "";

    thiscountryChangeCustomValidation.init = function (json) {
        this.setSettingsByObject(json);
        thiscountryChangeCustomValidation.CountryIdElement = this.getById(thiscountryChangeCustomValidation.CountryId);
        thiscountryChangeCustomValidation.DocumentIdElement = this.getById(thiscountryChangeCustomValidation.DocumentId);
        thiscountryChangeCustomValidation.CountryIdElement.change(this.ValidateIfRequired);
    };

    thiscountryChangeCustomValidation.ValidateIfRequired = function () {
        var selectedCountry = thiscountryChangeCustomValidation.CountryIdElement.val();
        if (selectedCountry != thiscountryChangeCustomValidation.ValidateRequiredCode) {
            SKYSALES.Util.removeAttribute(thiscountryChangeCustomValidation.DocumentIdElement, 'validationtype');
        } else {
            SKYSALES.Util.setAttribute(thiscountryChangeCustomValidation.DocumentIdElement, 'required', 'true');
            SKYSALES.Util.setAttribute(thiscountryChangeCustomValidation.DocumentIdElement, 'validationtype', 'NIF,CIF,NIE,DNI');
        }

    };
    return thiscountryChangeCustomValidation;
};