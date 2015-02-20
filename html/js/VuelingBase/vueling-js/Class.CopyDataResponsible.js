


VUELING.Class.CopyDataResponsible = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisCopyDataResponsible = SKYSALES.Util.extendObject(parent);

    thisCopyDataResponsible.inputFirstNameOrigin = null;
    thisCopyDataResponsible.inputLastNameOrigin = null;
    thisCopyDataResponsible.inputFirstLastNameOrigin = null;
    thisCopyDataResponsible.inputSecondLastNameOrigin = null;
    thisCopyDataResponsible.inputEmailOrigin = null;
    thisCopyDataResponsible.inputPhoneOrigin = null;
    thisCopyDataResponsible.inputCountryOrigin = null;
    thisCopyDataResponsible.inputCityOrigin = null;

    thisCopyDataResponsible.inputFirstNameDestination = null;
    thisCopyDataResponsible.inputLastNameDestination = null;
    thisCopyDataResponsible.inputFirstLastNameDestination = null;
    thisCopyDataResponsible.inputSecondLastNameDestination = null;
    thisCopyDataResponsible.inputEmailDestination = null;
    thisCopyDataResponsible.inputPhoneDestination = null;
    thisCopyDataResponsible.inputCountryDestination = null;
    thisCopyDataResponsible.inputCityDestination = null;
    thisCopyDataResponsible.chkResponsible = null;

    thisCopyDataResponsible.chkResponsibleId = "";
    thisCopyDataResponsible.firstNameOriginId = "";
    thisCopyDataResponsible.lastNameOriginId = "";
    thisCopyDataResponsible.firstLastNameOriginId = "";
    thisCopyDataResponsible.secondLastNameOriginId = "";
    thisCopyDataResponsible.emailOriginId = "";
    thisCopyDataResponsible.phoneOriginId = "";
    thisCopyDataResponsible.countryOriginId = "";
    thisCopyDataResponsible.cityOriginId = "";

    thisCopyDataResponsible.firstNameDestinationId = "";
    thisCopyDataResponsible.lastNameDestinationId = "";
    thisCopyDataResponsible.firstLastNameDestinationId = "";
    thisCopyDataResponsible.secondLastNameDestinationId = "";
    thisCopyDataResponsible.emailDestinationId = "";
    thisCopyDataResponsible.phoneDestinationId = "";
    thisCopyDataResponsible.countryDestinationId = "";
    thisCopyDataResponsible.cityDestinationId = "";
    thisCopyDataResponsible.idPassenger = "";

    thisCopyDataResponsible.isRES = false;

    thisCopyDataResponsible.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisCopyDataResponsible.setVars = function () {
        parent.setVars.call(this);

        this.chkResponsible = this.getById(this.chkResponsibleId);

        this.inputFirstNameOrigin = this.getById(this.firstNameOriginId);
        this.inputFirstNameDestination = this.getById(this.firstNameDestinationId);

        this.inputLastNameOrigin = this.getById(this.lastNameOriginId);
        this.inputEmailOrigin = this.getById(this.emailOriginId);
        this.inputPhoneOrigin = this.getById(this.phoneOriginId);
        this.inputCountryOrigin = this.getById(this.countryOriginId);
        this.inputCityOrigin = this.getById(this.cityOriginId);

        this.inputLastNameDestination = this.getById(this.lastNameDestinationId);
        this.inputEmailDestination = this.getById(this.emailDestinationId);
        this.inputPhoneDestination = this.getById(this.phoneDestinationId);
        this.inputCountryDestination = this.getById(this.countryDestinationId);
        this.inputCityDestination = this.getById(this.cityDestinationId);

        if (this.isRES === true)
        {
            this.inputFirstLastNameOrigin = this.getById(this.firstLastNameOriginId);
            this.inputSecondLastNameOrigin = this.getById(this.secondLastNameOriginId);
            this.inputFirstLastNameDestination = this.getById(this.firstLastNameDestinationId);
            this.inputSecondLastNameDestination = this.getById(this.secondLastNameDestinationId);
        }
    };

    thisCopyDataResponsible.addEvents = function () {
        if (thisCopyDataResponsible.chkResponsible != null)
            thisCopyDataResponsible.chkResponsible.on("click", thisCopyDataResponsible.checkResponsibleClick);

        if (this.isRES == true)
            thisCopyDataResponsible.setEventsForBuildSurnames();
    };

    thisCopyDataResponsible.checkResponsibleClick = function (e) {
        var checked = thisCopyDataResponsible.chkResponsible.is(":checked");
        thisCopyDataResponsible.disableEvents();
        if (checked) {
            thisCopyDataResponsible.setData();
            thisCopyDataResponsible.setEventsInputs();
        }
        else thisCopyDataResponsible.clearData();
    };

    thisCopyDataResponsible.clearData = function () {
        thisCopyDataResponsible.CopyDataResponsible(this.inputFirstNameDestination, "");
        thisCopyDataResponsible.CopyDataResponsible(this.inputLastNameDestination, "");

        if (this.isRES === true) {
            thisCopyDataResponsible.CopyDataResponsible(this.inputFirstLastNameDestination, "");
            thisCopyDataResponsible.CopyDataResponsible(this.inputSecondLastNameDestination, "");
        }

        thisCopyDataResponsible.CopyDataResponsible(this.inputEmailDestination, "");
        thisCopyDataResponsible.CopyDataResponsible(this.inputPhoneDestination, "");
        thisCopyDataResponsible.CopyDataResponsible(this.inputCountryDestination, "");
        thisCopyDataResponsible.CopyDataResponsible(this.inputCityDestination, "");
    };

    thisCopyDataResponsible.CopyDataResponsible = function (destination, textObj) {
        destination.val(textObj);
        textObj != "" ? destination.change() : this.updateClassValidation(destination);
    };

    thisCopyDataResponsible.setData = function (e, index) {
        thisCopyDataResponsible.CopyDataResponsible(this.inputFirstNameDestination, this.inputFirstNameOrigin.val());
        this.CopyDataResponsible(this.inputLastNameDestination, this.inputLastNameOrigin.val());

        if (this.isRES === true) {
            this.CopyDataResponsible(this.inputFirstLastNameDestination, this.inputFirstLastNameOrigin.val());
            this.CopyDataResponsible(this.inputSecondLastNameDestination, this.inputSecondLastNameOrigin.val());
        }

        this.CopyDataResponsible(this.inputEmailDestination, this.inputEmailOrigin.val());
        this.CopyDataResponsible(this.inputPhoneDestination, this.inputPhoneOrigin.val());
        this.CopyDataResponsible(this.inputCountryDestination, this.inputCountryOrigin.val());
        this.CopyDataResponsible(this.inputCityDestination, this.inputCityOrigin.val());
    };

    thisCopyDataResponsible.setEventsInputs = function () {
        this.inputFirstNameDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
        this.inputFirstNameOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputFirstNameDestination, thisCopyDataResponsible.inputFirstNameOrigin.val()); });
        this.inputFirstNameOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputFirstNameDestination, thisCopyDataResponsible.inputFirstNameOrigin.val()); });

        this.inputLastNameDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
        this.inputLastNameOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputLastNameDestination, thisCopyDataResponsible.inputLastNameOrigin.val()); });
        this.inputLastNameOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputLastNameDestination, thisCopyDataResponsible.inputLastNameOrigin.val()); });

        if (this.isRES === true) {
            this.inputFirstLastNameDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
            this.inputFirstLastNameOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputFirstLastNameDestination, thisCopyDataResponsible.inputFirstLastNameOrigin.val()); });
            this.inputFirstLastNameOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputFirstLastNameDestination, thisCopyDataResponsible.inputFirstLastNameOrigin.val()); });

            this.inputSecondLastNameDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
            this.inputSecondLastNameOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputSecondLastNameDestination, thisCopyDataResponsible.inputSecondLastNameOrigin.val()); });
            this.inputSecondLastNameOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputSecondLastNameDestination, thisCopyDataResponsible.inputSecondLastNameOrigin.val()); });
        }

        this.inputEmailDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
        this.inputEmailOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputEmailDestination, thisCopyDataResponsible.inputEmailOrigin.val()); });
        this.inputEmailOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputEmailDestination, thisCopyDataResponsible.inputEmailOrigin.val()); });

        this.inputPhoneDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
        this.inputPhoneOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputPhoneDestination, thisCopyDataResponsible.inputPhoneOrigin.val()); });
        this.inputPhoneOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputPhoneDestination, thisCopyDataResponsible.inputPhoneOrigin.val()); });

        this.inputCountryDestination.on("focus", function () { thisCopyDataResponsible.InputContactChange(); });
        this.inputCountryOrigin.on("change", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputCountryDestination, thisCopyDataResponsible.inputCountryOrigin.val()); });

        this.inputCityDestination.on("keyup", function () { thisCopyDataResponsible.InputContactChange(); });
        this.inputCityOrigin.on("keyup", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputCityDestination, thisCopyDataResponsible.inputCityOrigin.val()); });
        this.inputCityOrigin.on("change.autocomplete", function () { thisCopyDataResponsible.CopyDataResponsible(thisCopyDataResponsible.inputCityDestination, thisCopyDataResponsible.inputCityOrigin.val()); });
    };

    thisCopyDataResponsible.setEventsForBuildSurnames = function () {
        thisCopyDataResponsible.inputFirstLastNameDestination.on("keyup", function () { thisCopyDataResponsible.BuildSurnames(); });
        thisCopyDataResponsible.inputFirstLastNameDestination.on("change.autocomplete", function () { thisCopyDataResponsible.BuildSurnames(); });
        thisCopyDataResponsible.inputSecondLastNameDestination.on("keyup", function () { thisCopyDataResponsible.BuildSurnames(); });
        thisCopyDataResponsible.inputSecondLastNameDestination.on("change.autocomplete", function () { thisCopyDataResponsible.BuildSurnames(); });
    };

    thisCopyDataResponsible.BuildSurnames = function () {
        var inputBuilded = thisCopyDataResponsible.inputFirstLastNameDestination.val() + ' ' + thisCopyDataResponsible.inputSecondLastNameDestination.val();
        thisCopyDataResponsible.inputLastNameDestination.val(inputBuilded);
    };

    thisCopyDataResponsible.InputContactChange = function () {
        thisCopyDataResponsible.disableEvents();
        thisCopyDataResponsible.chkResponsible.attr('checked', false);
    };

    thisCopyDataResponsible.disableEvents = function (e) {
        this.inputFirstNameDestination.off("keyup");
        this.inputFirstNameOrigin.off("keyup");
        this.inputFirstNameOrigin.off("change.autocomplete");

        this.inputLastNameDestination.off("keyup");
        this.inputLastNameOrigin.off("keyup");
        this.inputLastNameOrigin.off("change.autocomplete");

        if (this.isRES === true) {
            this.inputFirstLastNameDestination.off("keyup");
            this.inputFirstLastNameOrigin.off("keyup");
            this.inputFirstLastNameOrigin.off("change.autocomplete");

            this.inputSecondLastNameDestination.off("keyup");
            this.inputSecondLastNameOrigin.off("keyup");
            this.inputSecondLastNameOrigin.off("change.autocomplete");

            thisCopyDataResponsible.setEventsForBuildSurnames();
        }

        this.inputEmailDestination.off("keyup");
        this.inputEmailOrigin.off("keyup");
        this.inputEmailOrigin.off("change.autocomplete");

        this.inputPhoneDestination.off("keyup");
        this.inputPhoneOrigin.off("keyup");
        this.inputPhoneOrigin.off("change.autocomplete");

        this.inputCountryDestination.off("focus");
        this.inputCountryOrigin.off("change");

        this.inputCityDestination.off("keyup");
        this.inputCityOrigin.off("keyup");
        this.inputCityOrigin.off("change.autocomplete");
    };

    thisCopyDataResponsible.updateClassValidation = function (element) {
        if (element) {
            // elimino los iconos de Check
            thisCopyDataResponsible.removeStyles(element[0].parentElement, "check--OK");
            thisCopyDataResponsible.removeStyles(element[0].parentElement, "check--FAIL");
            // elimino el borde rojo del textBox 
            thisCopyDataResponsible.removeStyles(element[0], "validationError");
            //elimina el texto de Error
            if (element[0].parentElement.children[1] != undefined) {
                element[0].parentElement.children[1].outerText = "";
            }
            // elimina el estilo de error del label
            thisCopyDataResponsible.removeStyles(element[0].parentElement.parentElement.parentElement.children[0], "validationErrorLabel");
        }
    };

    thisCopyDataResponsible.removeStyles = function (element, withoutstyle) {
        if (element && element.classList.contains(withoutstyle))
            element.classList.remove(withoutstyle);
    };

    return thisCopyDataResponsible;
};