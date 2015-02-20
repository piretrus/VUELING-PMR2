

VUELING.Class.RequestInvoiceBase = function (useMail) {
    var parent = new SKYSALES.Class.SkySales(),
        thisRequestInvoice = SKYSALES.Util.extendObject(parent);

    thisRequestInvoice.proformaInvoiceURL = '';
    thisRequestInvoice.dateFormatFirstFlightDate = '';
    thisRequestInvoice.actualStep = '';
    thisRequestInvoice.actualStep = '';
    thisRequestInvoice.countryProvince = null;

    thisRequestInvoice.previewInvoiceDivId = '';
    thisRequestInvoice.previewInvoiceDiv = null;
    thisRequestInvoice.previewInvoiceLinkId = '';
    thisRequestInvoice.previewInvoiceLink = null;

    thisRequestInvoice.inputPNRId = '';
    thisRequestInvoice.inputPNR = null;

    if (useMail) {
        thisRequestInvoice.inputEmailBuyerId = '';
        thisRequestInvoice.inputEmailBuyer = null;
    } else {
    thisRequestInvoice.inputFirstFlightDateId = '';
    thisRequestInvoice.inputFirstFlightDate = null;
    }

    thisRequestInvoice.inputFirstNameId = '';
    thisRequestInvoice.inputFirstName = null;
    thisRequestInvoice.inputLastNameId = '';
    thisRequestInvoice.inputLastName = null;
    thisRequestInvoice.inputCIFId = '';
    thisRequestInvoice.inputCIF = null;
    thisRequestInvoice.inputAddressId = '';
    thisRequestInvoice.inputAddress = null;
    thisRequestInvoice.inputCityId = '';
    thisRequestInvoice.inputCity = null;
    thisRequestInvoice.inputPhoneId = '';
    thisRequestInvoice.inputPhone = null;
    thisRequestInvoice.inputPostalCodeId = '';
    thisRequestInvoice.inputPostalCode = null;
    thisRequestInvoice.inputEmailId = '';
    thisRequestInvoice.inputEmail = null;
    thisRequestInvoice.inputEmailRepeatId = '';
    thisRequestInvoice.inputEmailRepeat = null;
    thisRequestInvoice.selectLanguagesId = '';
    thisRequestInvoice.selectLanguages = null;
    thisRequestInvoice.selectProvincesId = '';
    thisRequestInvoice.selectProvinces = null;
    thisRequestInvoice.selectCountriesId = '';
    thisRequestInvoice.selectCountries = null;

    thisRequestInvoice.actualStepId = '';
    thisRequestInvoice.actualStep = null;
    thisRequestInvoice.step1DivId = '';
    thisRequestInvoice.step1Div = null;
    thisRequestInvoice.step1and2DivId = '';
    thisRequestInvoice.step1and2Div = null;
    thisRequestInvoice.step2DivId = '';
    thisRequestInvoice.step2Div = null;

    thisRequestInvoice.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.SetValidationMethod();
    };

    thisRequestInvoice.setVars = function () {
        parent.setVars.call(this);

        this.previewInvoiceDiv = this.getById(this.previewInvoiceDivId);
        this.previewInvoiceLink = this.getById(this.previewInvoiceLinkId);

        this.inputPNR = this.getById(this.inputPNRId);
        if (useMail) {
            this.inputEmailBuyer = this.getById(this.inputEmailBuyerId);
        } else {
        this.inputFirstFlightDate = this.getById(this.inputFirstFlightDateId);
        }

        this.inputFirstName = this.getById(this.inputFirstNameId);
        this.inputLastName = this.getById(this.inputLastNameId);
        this.inputCIF = this.getById(this.inputCIFId);
        this.inputAddress = this.getById(this.inputAddressId);
        this.inputCity = this.getById(this.inputCityId);
        this.inputPhone = this.getById(this.inputPhoneId);
        this.inputPostalCode = this.getById(this.inputPostalCodeId);
        this.inputEmail = this.getById(this.inputEmailId);
        this.inputEmailRepeat = this.getById(this.inputEmailRepeatId);
        this.selectLanguages = this.getById(this.selectLanguagesId);
        this.selectProvinces = this.getById(this.selectProvincesId);
        this.selectCountries = this.getById(this.selectCountriesId);
        this.step1Div = this.getById(this.step1DivId);
        this.step1and2Div = this.getById(this.step1and2DivId);
        this.step2Div = this.getById(this.step2DivId);
        this.actualStep = this.getById(this.actualStepId);

        this.countryProvince = new VUELING.Class.CountryProvince();
        var json =
        {
            "selectCountriesId": this.selectCountriesId,
            "selectProvincesId": this.selectProvincesId,
            "inputCIFId": this.inputCIFId,
            "countryCode": "ES"
        };
        this.countryProvince.init(json);
    };

    thisRequestInvoice.SetValidationMethod = function () {
        if (this.actualStep.val() == "1") {
            SKYSALES.Util.setAttribute(this.inputPNR, 'required', 'true');

            if (useMail) {
                SKYSALES.Util.setAttribute(this.inputEmailBuyer, 'required', 'true');
            } else {
                SKYSALES.Util.setAttribute(this.inputFirstFlightDate, 'required', 'true');
            }

            SKYSALES.Util.removeAttribute(this.inputFirstName, 'required');
            SKYSALES.Util.removeAttribute(this.inputAddress, 'required');
            SKYSALES.Util.removeAttribute(this.inputCity, 'required');
            SKYSALES.Util.removeAttribute(this.inputPhone, 'required');
            SKYSALES.Util.removeAttribute(this.inputPostalCode, 'required');
            SKYSALES.Util.removeAttribute(this.inputEmail, 'required');
            SKYSALES.Util.removeAttribute(this.inputEmailRepeat, 'required');
            SKYSALES.Util.removeAttribute(this.selectLanguages, 'required');
            SKYSALES.Util.removeAttribute(this.selectCountries, 'required');
            SKYSALES.Util.removeAttribute(this.inputCIF, 'required');
            SKYSALES.Util.removeAttribute(this.selectProvinces, 'required');
        }
        else if (this.actualStep.val() == "2") {
            SKYSALES.Util.removeAttribute(this.inputPNR, 'required');
            if (useMail) {
                SKYSALES.Util.removeAttribute(this.inputEmailBuyer, 'required');
            } else {
                SKYSALES.Util.removeAttribute(this.inputFirstFlightDate, 'required');
            }

            SKYSALES.Util.setAttribute(this.inputFirstName, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputAddress, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputCity, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputPhone, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputPostalCode, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputEmail, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputEmailRepeat, 'required', 'true');
            SKYSALES.Util.setAttribute(this.inputCIF, 'required', 'true');
            SKYSALES.Util.setAttribute(this.selectLanguages, 'required', 'true');
            SKYSALES.Util.setAttribute(this.selectCountries, 'required', 'true');
        }
    };

    thisRequestInvoice.addEvents = function () {
        parent.addEvents.call(this);

        var self = this;
        this.inputPNR.change(function (event) { self.Inputs_Change(event); });
        this.inputAddress.change(function (event) { self.Inputs_Change(event); });

        if (useMail) {
            this.inputEmailBuyer.change(function (event) { self.Inputs_Change(event); });
        } else {
            this.inputFirstFlightDate.change(function (event) { self.Inputs_Change(event); });
        }
        this.inputFirstName.change(function (event) { self.Inputs_Change(event); });
        this.inputLastName.change(function (event) { self.Inputs_Change(event); });
        this.inputCIF.change(function (event) { self.Inputs_Change(event); });
        this.inputPhone.change(function (event) { self.Inputs_Change(event); });
        this.inputPostalCode.change(function (event) { self.Inputs_Change(event); });
        this.inputCity.change(function (event) { self.Inputs_Change(event); });
        this.selectLanguages.change(function (event) { self.Inputs_Change(event); });
    };
    thisRequestInvoice.Inputs_Change = function (event) {
        if (this.inputPNR.val() != '' && this.inputAddress.val() != '' 
            && ((this.inputFirstFlightDate.val() != '' && !useMail) || (this.inputEmailBuyer.val() != '' && useMail))
            && this.inputFirstName.val() != '' && this.inputPhone.val() != ''
            && this.inputPostalCode.val() != '' && this.selectLanguages.val() != '' && this.inputCity.val() != '') {

            var condition = useMail;
            var dateBooking;
            if (!condition) {
            var datetime = VUELING.Util.getDateFromFormat(this.inputFirstFlightDate.val(), this.dateFormatFirstFlightDate);
            if (datetime > 0) {
                    dateBooking = new Date(datetime);
                    condition = true;
            }
        }

            if (condition) {
            var url = this.proformaInvoiceURL;
            url += "?pnr=" + this.inputPNR.val();
            url += "&address=" + this.inputAddress.val();
                if (useMail) {
                    url += "&emailbuyer=" + this.inputEmailBuyer.val();
                } else {
                    url += "&bookingDate=" + dateBooking.getUTCFullYear() + "-" + (dateBooking.getUTCMonth() + 1) + "-" + dateBooking.getUTCDate();
                }

            url += "&nameClient=" + this.inputFirstName.val()
            if (this.inputLastName.val() != '')
                url += " " + this.inputLastName.val();

            if (this.inputCIF.val() != '')
                url += "&NIF=" + this.inputCIF.val();

            if (this.inputPhone.val() != '')
                url += "&phone=" + this.inputPhone.val();
            url += "&postalCode=" + this.inputPostalCode.val();
            url += "&language=" + this.selectLanguages.val();
            url += "&location=" + this.inputCity.val();

            this.previewInvoiceLink.attr('href', encodeURI(url));
            this.previewInvoiceDiv.removeClass('hidden');
            }
        }
        else {
            this.previewInvoiceLink.attr('href', '#');
            this.previewInvoiceDiv.addClass('hidden');
        }
    };

    return thisRequestInvoice;
};