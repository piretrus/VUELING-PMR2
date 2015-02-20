
VUELING.Class.CompleteContactInformation = function (json) {
    json = json || {};
    var parent = SKYSALES.Class.Resource(),
    thisCompleteContactInformation = SKYSALES.Util.extendObject(parent);

    thisCompleteContactInformation.nameSpaceId = "";
    thisCompleteContactInformation.CompleteContactInformationFormId = "";
    thisCompleteContactInformation.CompleteContactInformationForm = null;
    thisCompleteContactInformation.CompleteContactInformationFormOKId = "";
    thisCompleteContactInformation.CompleteContactInformationFormOK = null;
    thisCompleteContactInformation.CompleteContactInformationButtonId = "";
    thisCompleteContactInformation.CompleteContactInformationButton = null;
    thisCompleteContactInformation.Token = "";
    thisCompleteContactInformation.RecordLocator = "";
    thisCompleteContactInformation.Mail = "";
    thisCompleteContactInformation.PassengerDocumentEmpty = "";
    thisCompleteContactInformation.PassengerDocumentNotValid = "";
    thisCompleteContactInformation.PassengerList = null;
    thisCompleteContactInformation.PassengerInfantsList = null;
    thisCompleteContactInformation.IsCommitedContact = false;

    thisCompleteContactInformation.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisCompleteContactInformation.initObject = function () {
        thisCompleteContactInformation.CompleteContactInformationForm = this.getById(thisCompleteContactInformation.CompleteContactInformationFormId);
        thisCompleteContactInformation.CompleteContactInformationFormOK = this.getById(thisCompleteContactInformation.CompleteContactInformationFormOKId);
        thisCompleteContactInformation.CompleteContactInformationButton = this.getById(thisCompleteContactInformation.CompleteContactInformationButtonId);
    };

    thisCompleteContactInformation.addEvents = function () {

        //Evento para validar el tipo de documento
        for (var i = 0; i < thisCompleteContactInformation.PassengerList.length; i++) {
            var documentType = this.getById(thisCompleteContactInformation.nameSpaceId + thisCompleteContactInformation.PassengerList[i].PassengerID + "_DropDownListDocumentType");

            documentType.change(thisCompleteContactInformation.changeValidateTypeOfDocument);
        }

        //Evento para validar el tipo de documento para infants
        for (var i = 0; i < thisCompleteContactInformation.PassengerInfantsList.length; i++) {
            var index = i + 1;
            var documentType = this.getById(thisCompleteContactInformation.nameSpaceId + "INF" + index + "_DropDownListDocumentType");

            documentType.change(thisCompleteContactInformation.changeValidateTypeOfDocument);
        }

        //Evento para el click del botón
        thisCompleteContactInformation.CompleteContactInformationButton.click(function () {
            var validate = SKYSALES.Util.validate(this);
            if (!validate) return;

            if (thisCompleteContactInformation.IsCommitedContact === false) {
                thisCompleteContactInformation.commitContact();
            }
            else {
                thisCompleteContactInformation.CompleteContactInformationFormOK.hide();
                thisCompleteContactInformation.CompleteContactInformationForm.show();
            }
        });
    };

    thisCompleteContactInformation.changeValidateTypeOfDocument = function () {
        var removeAttribute = SKYSALES.Util.removeAttribute;
        var name = $(this).attr('name');
        $("fieldset[name*=" + name + "_FieldSetDocument]").removeClass('validacion');
        var documentNumberText = $("#" + name + "_TextBoxDocumentNumber");
        removeAttribute(documentNumberText, "validationtype");
        removeAttribute(documentNumberText, "validationtypeerror");
        removeAttribute(documentNumberText, "required");
        removeAttribute(documentNumberText, "requirederror");
        var value = $(this).val();

        if (value.indexOf("DNI") > -1 || value.indexOf("NIE") > -1) {
            $("fieldset[name*=" + name + "_FieldSetDocument]").addClass('validacion');
            var setAttribute = SKYSALES.Util.setAttribute;
            setAttribute(documentNumberText, "validationtype", "NIF,NIE");
            setAttribute(documentNumberText, "validationtypeerror", thisCompleteContactInformation.PassengerDocumentNotValid);
            setAttribute(documentNumberText, "required", "true");
            setAttribute(documentNumberText, "requirederror", thisCompleteContactInformation.PassengerDocumentEmpty);
        } else if (value.indexOf("P") > -1) {
            $("fieldset[name*=" + name + "_FieldSetDocument]").addClass('validacion');
            var setAttribute = SKYSALES.Util.setAttribute;
            setAttribute(documentNumberText, "required", "true");
            setAttribute(documentNumberText, "requirederror", thisCompleteContactInformation.PassengerDocumentEmpty);
        }
    };

    thisCompleteContactInformation.commitContact = function () {
        var jsonCompleteContactInformation = thisCompleteContactInformation.getCompleteContactInformation();
        var jsonPassengerInfantsList = thisCompleteContactInformation.getPassengerInfantsList();

        $.ajax({
            type: "POST",
            async: true,
            url: "CompleteContactInformationCommitAjax-resource.aspx",
            data: {
                "Token": thisCompleteContactInformation.Token,
                "RecordLocator": thisCompleteContactInformation.RecordLocator,
                "Mail": thisCompleteContactInformation.Mail,
                "jsonCompleteContactInformation": JSON.stringify(jsonCompleteContactInformation),
                "jsonPassengerInfantsList": JSON.stringify(jsonPassengerInfantsList)
            },
            success: function (data) {
                thisCompleteContactInformation.IsCommitedContact = data.IsCommitedContact;

                if (data.IsDocumentNumberDuplicated) {
                    $("input[type='text']").val('');
                } else {
                    thisCompleteContactInformation.CompleteContactInformationForm.hide();
                    thisCompleteContactInformation.CompleteContactInformationFormOK.show();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            },
            dataType: "json"
        });
    };

    thisCompleteContactInformation.getCompleteContactInformation = function () {
        var result = {
            PassengerListArray: []
        };

        for (var i = 0; i < thisCompleteContactInformation.PassengerList.length; i++) {
            var documentType = $("select[id*=" + thisCompleteContactInformation.nameSpaceId + thisCompleteContactInformation.PassengerList[i].PassengerID + "_DropDownListDocumentType]");
            var documentNumber = $("input[id*=" + thisCompleteContactInformation.nameSpaceId + thisCompleteContactInformation.PassengerList[i].PassengerID + "_TextBoxDocumentNumber]");
     
            if (documentType.length > 0 && documentNumber.length > 0) {
                thisCompleteContactInformation.PassengerList[i].DocumentType = documentType[0].value;
                thisCompleteContactInformation.PassengerList[i].DocumentNumber = documentNumber[0].value;                
            }
        }

        result.PassengerListArray = thisCompleteContactInformation.PassengerList;

        return result;
    };

    thisCompleteContactInformation.getPassengerInfantsList = function () {
        var result = {
            PassengerInfantsListArray: []
        };

        for (var i = 0; i < thisCompleteContactInformation.PassengerInfantsList.length; i++) {
            var index = i + 1;
            var documentType = $("select[id*=" + thisCompleteContactInformation.nameSpaceId + "INF" + index + "_DropDownListDocumentType]");
            var documentNumber = $("input[id*=" + thisCompleteContactInformation.nameSpaceId + "INF" + index + "_TextBoxDocumentNumber]");

            if (documentType.length > 0 && documentNumber.length > 0) {
                thisCompleteContactInformation.PassengerInfantsList[i].DocumentType = documentType[0].value;
                thisCompleteContactInformation.PassengerInfantsList[i].DocumentNumber = documentNumber[0].value;
            }
        }

        result.PassengerInfantsListArray = thisCompleteContactInformation.PassengerInfantsList;

        return result;
    };

    return thisCompleteContactInformation;
};