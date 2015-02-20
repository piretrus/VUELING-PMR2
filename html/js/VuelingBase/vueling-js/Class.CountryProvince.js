

VUELING.Class.CountryProvince = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCountryProvince = SKYSALES.Util.extendObject(parent);

    thisCountryProvince.selectCountriesId = '';
    thisCountryProvince.selectCountries = null;
    thisCountryProvince.selectProvincesId = '';
    thisCountryProvince.selectProvinces = null;
    thisCountryProvince.countryCode = '';
    thisCountryProvince.inputCIFId = '';
    thisCountryProvince.inputCIF = null;

    thisCountryProvince.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.SelectCountries_Change(null);
    };

    thisCountryProvince.setVars = function () {
        parent.setVars.call(this);
        this.selectCountries = this.getById(this.selectCountriesId);
        this.selectProvinces = this.getById(this.selectProvincesId);

        if (this.inputCIFId != "" && this.inputCIFId != undefined)
            this.inputCIF = this.getById(this.inputCIFId);
    };

    thisCountryProvince.addEvents = function () {
        parent.addEvents.call(this);
        thisCountryProvince.selectCountries.change(function (event) { thisCountryProvince.SelectCountries_Change(event) });
    };

    thisCountryProvince.SelectCountries_Change = function (event) {
        if (this.selectCountries.val() == this.countryCode) {
            this.selectProvinces.removeAttr("disabled");
            SKYSALES.Util.setAttribute(thisCountryProvince.selectProvinces, 'required', 'true');
            if (this.inputCIF != null && this.inputCIF != undefined) {
                SKYSALES.Util.setAttribute(thisCountryProvince.inputCIF, 'required', 'true');
                SKYSALES.Util.setAttribute(thisCountryProvince.inputCIF, 'validationtype', 'NIF,CIF,NIE');
            }
        }
        else {
            this.selectProvinces.attr("disabled", "disabled");
            this.selectProvinces.val("");
            SKYSALES.Util.removeAttribute(thisCountryProvince.selectProvinces, 'required');
            this.selectProvinces.blur();
            if (this.inputCIF != null && this.inputCIF != undefined) {
                SKYSALES.Util.setAttribute(thisCountryProvince.inputCIF, 'required', 'true');
                SKYSALES.Util.setAttribute(thisCountryProvince.inputCIF, 'maxlength', '20');
                SKYSALES.Util.removeAttribute(thisCountryProvince.inputCIF, 'validationtype');
            }
        }
    };

    return thisCountryProvince;
};