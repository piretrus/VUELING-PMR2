/*
Name:
Class InvoiceDataInput
Param:
clientId (String):  The clientId of the SkySales control
sectionId (String):  The id of the form input DIV
noDataSectionId (String):  The id of the "add data" DIV
newEntry (Boolean):  Boolean value indicating whether or not the data represents a new entry (true) or existing data (false)
modifyLinkId (String):  The id of the hyperlink object in the subheader "modificar datos"
toggleEditMode (String):  The mode of the toggle state of the control. Possible values "preview" and "edit"
buttonDivId (String):  The id of the DIV containing the submit and cancel buttons on the form
showFormButtonId (String):  The id of the hyperlink "Anadir datos de facturacion" (add data)
copyDataDivId (String):  The id of the DIV containing the link and description of the "Copiar los datos" (copy contact data) link
useContactDataLinkId (String):  The id of the hyperlink "Copiar los datos"
cancelContactDataLinkId (String):  The id of the hyperlink "Cancel" for ADD data on the input form
cancelEditLinkId (String):  The id of the hyperlink "Cancel" for the EDIT data on the input form
defaultContactData (Object):  An object/array containing the default data for the user containing the following items:
name (String):  Default NAME value for user (New Skies FIRST and LAST name value for contact)
dniNif (String):  Default DNI/NIF value for user
address (String):  Default ADDRESS value for user (New Skies ADDRESS1 value for Address TypeCode = 'H')
postalCode (String):  Default POSTAL CODE value for user (New Skies POSTALCODE value for Address TypeCode = 'H')
city (String):  Default CITY value for user (New Skies CITY value for Address TypeCode = 'H')
countryCode (String):  Default COUNTRY CODE value for user (New Skies COUNTRYCODE value for Address TypeCode = 'H')
email (String):  Default EMAIL value for user (New Skies EMAIL value for Email TypeCode = 'P')
existingValues (Object):  An object/array containing the existing invoice data for the user containing the following items:
name (String):  Default NAME value for user (New Skies FIRSTNAME value for DocTypeCode = 'I')
dniNif (String):  Default DNI/NIF value for user (New Skies DOCNUMBER value for DocTypeCode = 'INV')
address (String):  Default ADDRESS value for user (New Skies ADDRESS1 value for Address Type"a.Code = 'I')
postalCode (String):  Default POSTAL CODE value for user (New Skies POSTALCODE value for Address TypeCode = 'I')
city (String):  Default CITY value for user (New Skies CITY value for Address TypeCode = 'I')
countryCode (String):  Default COUNTRY CODE value for user (New Skies COUNTRYCODE value for Address TypeCode = 'I')
email (String):  Default EMAIL value for user (New Skies EMAIL value for Email TypeCode = 'I')
Return:
An instance of InvoiceDataInput
Functionality:
Handles the Invoice Data input (Datos de Facturacion) for the DatosDeFacturacion control.  Toggle between "add data" (show input form) when no 
data is preseent, or toggling between existing data and data entry/edit forms.  
TODO:  Look into using one (or a combination) of the following classes from the VUELING namespace: ShowEditForm, ToggleViewCustom, DisplayTextbox, AttributeToggleBase, ElementDataToggle, ElementAttributeToggle
Class Hierarchy:
SkySales -> VUELING -> InvoiceDataInput
Original Author:
Ryan Lifferth
*/
VUELING.Class.InvoiceDataInput = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisInvoiceDataInput = SKYSALES.Util.extendObject(parent);
    thisInvoiceDataInput.clientId = '';
    thisInvoiceDataInput.sectionId = '';
    thisInvoiceDataInput.noDataSectionId = '';
    thisInvoiceDataInput.newEntry = false;
    thisInvoiceDataInput.modifyLinkId = '';
    thisInvoiceDataInput.toggleEditMode = '';
    thisInvoiceDataInput.buttonDivId = '';
    thisInvoiceDataInput.showFormButtonId = '';
    thisInvoiceDataInput.copyDataDivId = '';
    thisInvoiceDataInput.useContactDataLinkId = '';
    thisInvoiceDataInput.cancelContactDataLinkId = '';
    thisInvoiceDataInput.cancelEditLinkId = '';
    thisInvoiceDataInput.defaultContactData = {};
    thisInvoiceDataInput.existingValues = {};

    // vars of prepopulated/local vars or objects to be populated using id values (getById)
    thisInvoiceDataInput.inputs = "input[type='text'],input[type='radio'],select";
    thisInvoiceDataInput.sectionDiv = null;
    thisInvoiceDataInput.noDataSectionDiv = null;
    thisInvoiceDataInput.modifyLink = null;
    thisInvoiceDataInput.elements = null;
    thisInvoiceDataInput.buttonDiv = null;
    thisInvoiceDataInput.showFormButton = null;
    thisInvoiceDataInput.copyDataDiv = null;
    thisInvoiceDataInput.useContactDataLink = null;
    thisInvoiceDataInput.cancelContactDataLink = null;
    thisInvoiceDataInput.cancelEditLink = null;
    thisInvoiceDataInput.cancelLink = null;

    // Init method for this class
    thisInvoiceDataInput.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.stylizeSelectBoxes();
        this.addEvents();
        this.initToggle();
    };

    // Set additional variables needed for this class
    thisInvoiceDataInput.setVars = function () {
        parent.setVars.call(this);
        this.modifyLink = this.getById(this.modifyLinkId);
        this.useContactDataLink = this.getById(this.useContactDataLinkId);
        this.cancelContactDataLink = this.getById(this.cancelContactDataLinkId);
        this.cancelEditLink = this.getById(this.cancelEditLinkId);
        this.elements = $('#' + this.sectionId).find(this.inputs);
        this.buttonDiv = this.getById(this.buttonDivId);
        this.copyDataDiv = this.getById(this.copyDataDivId);
        this.sectionDiv = this.getById(this.sectionId);
        this.noDataSectionDiv = this.getById(this.noDataSectionId);
        this.showFormButton = this.getById(this.showFormButtonId);
    };

    // Stylize the select box (dropdown list of countries)
    thisInvoiceDataInput.stylizeSelectBoxes = function () {
        
    };

    // Add events for the links objects on the control
    thisInvoiceDataInput.addEvents = function () {
        parent.addEvents.call(this);
        this.useContactDataLink.click(this.populateWithContactDataClickHandler);
        this.cancelContactDataLink.click(this.cancelContactDataClickHander);
        this.cancelEditLink.click(this.cancelContactDataClickHander);

        this.modifyLink.click(this.toggleEditClickHandler);
        this.showFormButton.click(this.showFormClickHandler);
    };

    thisInvoiceDataInput.populateWithContactDataClickHandler = function () {
        thisInvoiceDataInput.populateWithContactData();
        return false;
    };
    thisInvoiceDataInput.populateWithContactData = function () {
        var clientId = this.clientId,
            defaultContactData = this.defaultContactData;

        this.getById(clientId + '_TextBoxInvoiceName').val(defaultContactData.name);
        this.getById(clientId + '_TextBoxInvoiceDniNif').val(defaultContactData.dniNif);
        this.getById(clientId + '_TextBoxInvoiceAddress1').val(defaultContactData.address);
        this.getById(clientId + '_TextBoxInvoicePostalCode').val(defaultContactData.postalCode);
        this.getById(clientId + '_TextBoxInvoiceCity').val(defaultContactData.city);
        this.getById(clientId + '_DropDownListInvoiceCountryCode').val(defaultContactData.countryCode);
        //        $('#' + clientId + '_DropDownListInvoiceCountryCode-button span.ui-selectmenu-status').text($('#' + clientId + '_DropDownListInvoiceCountryCode option:selected').text());
        this.getById(clientId + '_TextBoxInvoiceEmail').val(defaultContactData.email);
    }


    thisInvoiceDataInput.cancelContactDataClickHander = function () {
        thisInvoiceDataInput.cancelAndClearContactData();
        return false;
    };

    thisInvoiceDataInput.cancelAndClearContactData = function () {
        var clientId = this.clientId;

        if ($('#' + clientId + '_TextBoxInvoiceName').is(":visible") != true) {
            return;
        }

        // First get the existing values (if first time then all values will be blank, else will grab previous saved data)
        var existingName = '',
            existingDniNif = '',
            existingAddress1 = '',
            existingPostalCode = '',
            existingCity = '',
            existingCountryCode = '',
            existingEmail = '';

        // if there is data to roll back to, use it
        if (thisInvoiceDataInput.newEntry != true) {
            existingName = thisInvoiceDataInput.existingValues.name;
            existingDniNif = thisInvoiceDataInput.existingValues.dniNif;
            existingAddress1 = thisInvoiceDataInput.existingValues.address;
            existingPostalCode = thisInvoiceDataInput.existingValues.postalCode;
            existingCity = thisInvoiceDataInput.existingValues.city;
            existingCountryCode = thisInvoiceDataInput.existingValues.countryCode;
            existingEmail = thisInvoiceDataInput.existingValues.email;
        }

        // Reset the values
        this.getById(clientId + '_TextBoxInvoiceName').val(existingName);
        this.getById(clientId + '_TextBoxInvoiceDniNif').val(existingDniNif);
        this.getById(clientId + '_TextBoxInvoiceAddress1').val(existingAddress1);
        this.getById(clientId + '_TextBoxInvoicePostalCode').val(existingPostalCode);
        this.getById(clientId + '_TextBoxInvoiceCity').val(existingCity);
        this.getById(clientId + '_DropDownListInvoiceCountryCode').val(existingCountryCode);
        //        $('#' + clientId + '_DropDownListInvoiceCountryCode-button span.ui-selectmenu-status').text($('#' + clientId + '_DropDownListInvoiceCountryCode option:selected').text());
        this.getById(clientId + '_TextBoxInvoiceEmail').val(existingEmail);

        // Go back to either preview mode or new entry mode
        if (thisInvoiceDataInput.newEntry != true) {
            thisInvoiceDataInput.toggleEditMode = 'preview';
            $('#' + thisInvoiceDataInput.sectionId).find(".toggleditPlaceHolder").addClass("noInput");
            thisInvoiceDataInput.buttonDiv.hide();
            thisInvoiceDataInput.copyDataDiv.hide();
            $(thisInvoiceDataInput.elements).toggleEdit(thisInvoiceDataInput.toggleEditMode);
        }
        else {
            thisInvoiceDataInput.sectionDiv.hide();
            thisInvoiceDataInput.noDataSectionDiv.show();
        }
    }


    thisInvoiceDataInput.toggleEditClickHandler = function () {
        if (thisInvoiceDataInput.toggleEditMode == 'preview') {
            thisInvoiceDataInput.toggleEditMode = 'edit';
            $('#' + thisInvoiceDataInput.sectionId).find(".noInput").removeClass("noInput").addClass('toggleditPlaceHolder');
            thisInvoiceDataInput.buttonDiv.show();
            thisInvoiceDataInput.copyDataDiv.show();
        }
        else {
            thisInvoiceDataInput.toggleEditMode = 'preview';
            $('#' + thisInvoiceDataInput.sectionId).find(".toggleditPlaceHolder").addClass("noInput");
            thisInvoiceDataInput.buttonDiv.hide();
            thisInvoiceDataInput.copyDataDiv.hide();
        }
        $(thisInvoiceDataInput.elements).toggleEdit(thisInvoiceDataInput.toggleEditMode);
    };

    // Initialize the TOGGLE function
    thisInvoiceDataInput.initToggle = function () {

        var previewSpan = null,
            toggleEditArgs = {
                eventsEnabled: false,
                copyCss: false,
                onpreview: function (e, ui) {

                    ui.preview.removeClass().addClass('txtEdit');

                    //hide the styled dropdowns as well as the real dropdown
                    if (ui.element[0].localName === 'select') {
                        ui.element.siblings('a').hide();
                    }

                },
                onedit: function (e, ui) {
                    //rewrap the preview value so we can manipulate 

                    ui.element.parent().children('span').contents().filter(function () { return this.nodeType != 1; }).wrap("<span class='unwrapText'/>");
                    ui.element.show();

                    ui.element.parent().find('span.unwrapText').hide();

                    //hide real dropdowns, show styled ones (if exists)
                    if (ui.element[0].localName === 'select') {
                        if (ui.element.siblings('a').length > 0) {
                            ui.element.siblings('a').show();
                            ui.element.hide();
                        }
                    }
                }
            };

        if (thisInvoiceDataInput.elements !== null) {
            if (thisInvoiceDataInput.toggleEditMode != 'edit') {
                $(thisInvoiceDataInput.elements)
                    .toggleEdit(toggleEditArgs)
                    .toggleEdit('preview');

                thisInvoiceDataInput.toggleEditMode = 'preview';
                thisInvoiceDataInput.buttonDiv.hide();
                thisInvoiceDataInput.copyDataDiv.hide();
            }
        }
    };

    thisInvoiceDataInput.showFormClickHandler = function () {
        thisInvoiceDataInput.showInputForm();
        return false;
    };

    thisInvoiceDataInput.showInputForm = function () {

        // Hide the #NoDatosDeFacturacion DIV
        thisInvoiceDataInput.noDataSectionDiv.hide();

        // Show the #DatosDeFacturacionEdit DIV
        thisInvoiceDataInput.sectionDiv.show();

    }

    return thisInvoiceDataInput;
};