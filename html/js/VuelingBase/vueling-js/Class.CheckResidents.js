
VUELING.Class.CheckResidents = function (json) {
    json = json || {};
    var parent = SKYSALES.Class.Resource(),
    thisCheckResidents = SKYSALES.Util.extendObject(parent);

    thisCheckResidents.clientId = "";

    thisCheckResidents.codeValidationId = "";
    thisCheckResidents.codeValidation = null;
    thisCheckResidents.code000positivoId = "";
    thisCheckResidents.code000positivo = null;
    thisCheckResidents.code000negativoId = "";
    thisCheckResidents.code000negativo = null;
    thisCheckResidents.code001OKId = "";
    thisCheckResidents.code001OK = null;
    thisCheckResidents.code001KOId = "";
    thisCheckResidents.code001KO = null;
    thisCheckResidents.code002Id = "";
    thisCheckResidents.code002 = null;
    thisCheckResidents.code003004Id = "";
    thisCheckResidents.code003004 = null;

    thisCheckResidents.residentsButtonId = "";
    thisCheckResidents.residentsButton = null;
    thisCheckResidents.retriesSectionId = "";
    thisCheckResidents.retriesSection = null;
    thisCheckResidents.RetriesSectionSingularText = "";
    thisCheckResidents.RetriesSectionPluralText = "";
    thisCheckResidents.ResidentsList = null;
    thisCheckResidents.IsFirstTime = true;
    thisCheckResidents.ChildsWithoutNifContained = null;
    thisCheckResidents.InfantsContained = null;
    thisCheckResidents.IsResidentsButtonClick = false;

    thisCheckResidents.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisCheckResidents.initObject = function () {
        thisCheckResidents.codeValidation = this.getById(thisCheckResidents.codeValidationId);
        thisCheckResidents.code000positivo = this.getById(thisCheckResidents.code000positivoId);
        thisCheckResidents.code000negativo = this.getById(thisCheckResidents.code000negativoId);
        thisCheckResidents.code001OK = this.getById(thisCheckResidents.code001OKId);
        thisCheckResidents.code001KO = this.getById(thisCheckResidents.code001KOId);
        thisCheckResidents.code002 = this.getById(thisCheckResidents.code002Id);
        thisCheckResidents.code003004 = this.getById(thisCheckResidents.code003004Id);
        thisCheckResidents.residentsButton = this.getById(thisCheckResidents.residentsButtonId);
        thisCheckResidents.retriesSection = this.getById(thisCheckResidents.retriesSectionId);

        thisCheckResidents.checkResidentsOnSARA();
    };

    thisCheckResidents.addEvents = function () {
        thisCheckResidents.residentsButton.click(function () {
            thisCheckResidents.IsResidentsButtonClick = true;

            var validate = SKYSALES.Util.validate(this);
            if (!validate) return;

            thisCheckResidents.checkResidentsOnSARA();
        });
    };

    thisCheckResidents.checkResidentsOnSARA = function () {
        thisCheckResidents.showOnlyValidationBox();
        var jsonResidentsForValidation = thisCheckResidents.getResidentsForValidation();

        $.ajax({
            type: "POST",
            async: true,
            url: "CheckResidentsUpdateBookingItineraryAjax-resource.aspx",
            data: {
                "jsonResidentsForValidation": JSON.stringify(jsonResidentsForValidation)
            },
            success: function (data) {
                    thisCheckResidents.hideAll();
                    thisCheckResidents.IsFirstTime = data.IsFirstTime;
                
                    switch (data.Code) {
                        case "000":
                            if (data.AllowsRetries) {
                                thisCheckResidents.showResidentsTableByCode(data, thisCheckResidents.code000positivo);
                                if (data.RetriesCount == 1)
                                    thisCheckResidents.retriesSection[0].innerHTML = thisCheckResidents.RetriesSectionSingularText;
                                else
                                    thisCheckResidents.retriesSection[0].innerHTML = thisCheckResidents.RetriesSectionPluralText;

                                thisCheckResidents.code000positivo.show();
                            }
                            else {
                                thisCheckResidents.showResidentsTableByCode(data, thisCheckResidents.code000negativo);
                                thisCheckResidents.code000negativo.show();
                            }
                            break;
                        case "001":
                            if (thisCheckResidents.ChildsWithoutNifContained || thisCheckResidents.InfantsContained) {
                                thisCheckResidents.code001KO.show();
                            } else {
                                thisCheckResidents.code001OK.show();
                            }
                            break;
                        case "002":
                            thisCheckResidents.code002.show();                          
                            break;
                        case "003":
                            thisCheckResidents.code003004.show();
                            break;
                    case "005":
                        //Si se han validado los casos 000 y los residentes tienen varios casos
                        //Mostramos la tabla de residentes correspondiente al 'ResponseCode' de cada residente
                        thisCheckResidents.showResidentsTableByCode(data, thisCheckResidents.code000negativo);
                        thisCheckResidents.code000negativo.show();

                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                thisCheckResidents.hideAll();
                thisCheckResidents.IsFirstTime = false;
                thisCheckResidents.code003004.show();
            },
            dataType: "json"
        });
    };

    thisCheckResidents.getResidentsForValidation = function () {
        var result = {
            ResidentsForValidation: []
        };

        if (thisCheckResidents.IsFirstTime === true) {
            result.ResidentsForValidation = thisCheckResidents.ResidentsList;
        }
        else {
            var residentArray = [];

            for (var i = 0; i < thisCheckResidents.ResidentsList.length; i++) {
                var resident = thisCheckResidents.ResidentsList[i];

                //Obtenemos todos los inputs referentes al residente
                var residentInput = $("input[id*=" + thisCheckResidents.clientId + "_" + resident.PassengerID + "]");

                if (resident.IsInfant === false) {
                    if (residentInput.length > 0) {
                        var documentIdNumber = residentInput[0].value;
                        var firstName = residentInput[1].value;
                        var lastName = residentInput[2].value;
                        var secondLastName = residentInput[3].value;

                        //Guardamos en el array los residentes modificados con los nuevos datos para validar a SARA
                        if ((resident.DocumentIdNumber != documentIdNumber) || (resident.FirstName != firstName) || (resident.LastName != lastName) || (resident.SecondLastName != secondLastName) || thisCheckResidents.IsResidentsButtonClick === true) {
                            residentArray.push({
                                DocumentIdNumber: documentIdNumber,
                                FirstName: firstName,
                                LastName: lastName,
                                SecondLastName: secondLastName,
                                PassengerID: resident.PassengerID,
                                IsInfant: resident.IsInfant
                            });
                        }
                    }
                }
            }

            //Introducimos todos los residentes modificados en el array 'ResidentsForValidation'
            for (var i = 0; i < residentArray.length; i++) {
                result.ResidentsForValidation.push(residentArray[i]);
            }
        }

        thisCheckResidents.IsResidentsButtonClick = false;

        return result;
    };

    thisCheckResidents.showResidentsTableByCode = function (data, divId) {

        //Limpiamos el array 'ResidentsList' para enviar a SARA solamente los residentes con caso 000
        thisCheckResidents.ResidentsList = [];

        $.each(data.ResidentsListResponse, function (i, item) {

            if (item.DocumentIdNumber !== "") {
                //Ocultamos todas las filas del residente
                $("tr[id*=" + thisCheckResidents.clientId + "_" + item.PassengerID + "]").hide();

                //Mostramos la fila del residente correspondiente a su 'ResponseCode'
                if ((item.ResponseCode === "000" && !data.AllowsRetries))
                    $('#' + divId.attr('id')).find('#' + thisCheckResidents.clientId + '_' + item.PassengerID + '_003').show();
                else
                    $('#' + divId.attr('id')).find('#' + thisCheckResidents.clientId + '_' + item.PassengerID + '_' + item.ResponseCode).show();
            
                //Actualizamos labels e inputs values si no estamos en la página de Residentes
                $("strong[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_NIF]").text(item.DocumentIdNumber);
                $("td[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_FirstName]").text(item.FirstName);
                $("td[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_LastName]").text(item.LastName);
                $("td[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_SecondLastName]").text(item.SecondLastName);

                $("input[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_NIF]").attr("value", item.DocumentIdNumber);
                $("input[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_FirstName]").attr("value", item.FirstName);
                $("input[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_LastName]").attr("value", item.LastName);
                $("input[id=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_SecondLastName]").attr("value", item.SecondLastName);

                //Caso 000: Guardamos en un array el residente para saber que se puede enviar a SARA
                if (item.ResponseCode === "000") {
                    thisCheckResidents.ResidentsList.push({
                        DocumentIdNumber: item.DocumentIdNumber,
                        FirstName: item.FirstName,
                        LastName: item.LastName,
                        SecondLastName: item.SecondLastName,
                        PassengerID: item.PassengerID,
                        IsInfant: item.IsInfant
                    });

                    //Si se habían enviado DNIs duplicados limpiamos los campos del DNI
                    if (data.IsDocumentIdNumberDuplicated) {
                        $("input[id*=" + thisCheckResidents.clientId + "_" + item.PassengerID + "_NIF]").val('');
                    }
                    
                    $('#' + thisCheckResidents.code000positivo.attr('id')).find('#' + thisCheckResidents.clientId + "_" + item.PassengerID + "_LastName").attr("surnamesid", "ItineraryView_surnames" + item.PassengerID);
                    $('#' + thisCheckResidents.code000positivo.attr('id')).find('#' + thisCheckResidents.clientId + "_" + item.PassengerID + "_SecondLastName").attr("surnamesid", "ItineraryView_surnames" + item.PassengerID);
                }
            }
        });
    };

    thisCheckResidents.showOnlyValidationBox = function () {
        //Mostramos la caja que informa que se está realizando la validación
        thisCheckResidents.hideAll();
        thisCheckResidents.codeValidation.show();
    }

    thisCheckResidents.hideAll = function () {
        thisCheckResidents.codeValidation.hide();
        thisCheckResidents.code000positivo.hide();
        thisCheckResidents.code000negativo.hide();
        thisCheckResidents.code001OK.hide();
        thisCheckResidents.code001KO.hide();
        thisCheckResidents.code002.hide();
        thisCheckResidents.code003004.hide();
    };

    return thisCheckResidents;
};

VUELING.Class.CheckResidentsResult = function (json) {
    json = json || {};
    var parent = SKYSALES.Class.Resource(),
    thisCheckResidentsResult = SKYSALES.Util.extendObject(parent);

    thisCheckResidentsResult.clientId = "";

    thisCheckResidentsResult.codeValidationId = "";
    thisCheckResidentsResult.codeValidation = null;
    thisCheckResidentsResult.code000Id = "";
    thisCheckResidentsResult.code000 = null;
    thisCheckResidentsResult.code000BoxInformativoId = "";
    thisCheckResidentsResult.code000BoxInformativo = null;
    thisCheckResidentsResult.code001OKId = "";
    thisCheckResidentsResult.code001OK = null;
    thisCheckResidentsResult.code002Id = "";
    thisCheckResidentsResult.code002 = null;
    thisCheckResidentsResult.code003004Id = "";
    thisCheckResidentsResult.code003004 = null;

    thisCheckResidentsResult.ResidentsList = null;
    thisCheckResidentsResult.IsErrorProduced = false;
    thisCheckResidentsResult.ChildsWithoutNifContained = null;
    thisCheckResidentsResult.InfantsContained = null;

    thisCheckResidentsResult.init = function (json) {
        this.setSettingsByObject(json);
        if (thisCheckResidentsResult.IsErrorProduced === true) {
            thisCheckResidentsResult.showResidentsBookingDetailsAndStaticCheckInOnline("col_1-2-3-4", false);
            return;
        }
        this.initObject();
        this.addEvents();
    };

    thisCheckResidentsResult.initObject = function () {
        thisCheckResidentsResult.codeValidation = this.getById(thisCheckResidentsResult.codeValidationId);
        thisCheckResidentsResult.code000 = this.getById(thisCheckResidentsResult.code000Id);
        thisCheckResidentsResult.code000BoxInformativo = this.getById(thisCheckResidentsResult.code000BoxInformativoId);
        thisCheckResidentsResult.code001OK = this.getById(thisCheckResidentsResult.code001OKId);
        thisCheckResidentsResult.code002 = this.getById(thisCheckResidentsResult.code002Id);
        thisCheckResidentsResult.code003004 = this.getById(thisCheckResidentsResult.code003004Id);

        thisCheckResidentsResult.checkResidentsOnSARA();
    };

    thisCheckResidentsResult.addEvents = function () {

    };

    thisCheckResidentsResult.checkResidentsOnSARA = function () {

        var jsonResidentsForValidation = thisCheckResidentsResult.getResidentsForValidation();

        $.ajax({
            type: "POST",
            async: true,
            url: "CheckResidentsUpdateBookingCheckResidentsResultAjax-resource.aspx",
            data: {
                "jsonResidentsForValidation": JSON.stringify(jsonResidentsForValidation)
            },
            success: function (data) {
                thisCheckResidentsResult.hideAll();

                switch (data.Code) {
                    case "000":
                        thisCheckResidentsResult.showResidentsTableByCode(data, thisCheckResidentsResult.code000);
                        thisCheckResidentsResult.code000.show();
                        thisCheckResidentsResult.code000BoxInformativo.show();
                        thisCheckResidentsResult.showResidentsBookingDetailsAndStaticCheckInOnline("col_1-2-3", true);
                        break;
                    case "001":
                        if (thisCheckResidentsResult.ChildsWithoutNifContained || thisCheckResidentsResult.InfantsContained) {
                            thisCheckResidentsResult.showResidentsTableByCode(data, thisCheckResidentsResult.code000);
                            thisCheckResidentsResult.code000.show();
                            thisCheckResidentsResult.code000BoxInformativo.show();
                        } else {
                            thisCheckResidentsResult.code001OK.show();
                        }
                        thisCheckResidentsResult.showResidentsBookingDetailsAndStaticCheckInOnline("col_1-2-3", true);
                        break;
                    case "002":
                        thisCheckResidentsResult.showResidentsTableCheckResidents(data, thisCheckResidentsResult.code002);
                        thisCheckResidentsResult.showResidentsBookingDetailsAndStaticCheckInOnline("col_1-2-3-4", false);
                        thisCheckResidentsResult.code002.show();
                        break;
                    case "003":
                        thisCheckResidentsResult.code003004.show();
                        break;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                thisCheckResidentsResult.hideAll();
                thisCheckResidentsResult.code003004.show();
                thisCheckResidentsResult.showResidentsBookingDetailsAndStaticCheckInOnline("col_1-2-3-4", false);
            },
            dataType: "json"
        });
    };

    thisCheckResidentsResult.getResidentsForValidation = function () {
        var result = {
            ResidentsForValidation: thisCheckResidentsResult.ResidentsList
        };

        return result;
    };

    thisCheckResidentsResult.showResidentsTableCheckResidents = function (data, divId) {
        $.each(data.ResidentsListResponse, function (i, item) {
            if (item.DocumentIdNumber !== "") {
                //Ocultamos todas las filas del residente
                $("tr[id*=" + thisCheckResidentsResult.clientId + "_" + item.PassengerID + "]").hide();

                //Mostramos la fila del residente correspondiente a su 'ResponseCode'
                $('#' + divId.attr('id')).find('#' + thisCheckResidentsResult.clientId + '_' + item.PassengerID + '_' + item.ResponseCode).show();
            }
        });
    };

    thisCheckResidentsResult.showResidentsTableByCode = function (data, divId) {
        $.each(data.ResidentsListResponse, function (i, item) {
            if (item.DocumentIdNumber !== "") {
                //Ocultamos todas las filas del residente
                $("tr[id*=" + thisCheckResidentsResult.clientId + "_" + item.PassengerID + "]").hide();

                //Mostramos la fila del residente correspondiente a su 'ResponseCode'
                if (item.ResponseCode === "000")
                    $('#' + divId.attr('id')).find('#' + thisCheckResidentsResult.clientId + '_' + item.PassengerID + '_003').show();
                else
                    $('#' + divId.attr('id')).find('#' + thisCheckResidentsResult.clientId + '_' + item.PassengerID + '_' + item.ResponseCode).show();
            }
        });
    };

    thisCheckResidentsResult.showResidentsBookingDetailsAndStaticCheckInOnline = function (bookingDetailsClass, showCheckInOnline) {
        $('#' + thisCheckResidentsResult.clientId + '_Dots').show();
        $('#bookingDetailsCheckResidentsResult').attr("class", bookingDetailsClass);
        $('#bookingDetailsCheckResidentsResult').show();
        if (showCheckInOnline)
            $('#checkinOnlineCheckResidentsResult').show();
        else
            $('#checkinOnlineCheckResidentsResult').hide();
    };

    thisCheckResidentsResult.hideAll = function () {
        thisCheckResidentsResult.codeValidation.hide();
        thisCheckResidentsResult.code000.hide();
        thisCheckResidentsResult.code000BoxInformativo.hide();
        thisCheckResidentsResult.code001OK.hide();
        thisCheckResidentsResult.code002.hide();
        thisCheckResidentsResult.code003004.hide();
    };

    return thisCheckResidentsResult;
};

VUELING.Class.CheckResidentsC3 = function (json) {
    json = json || {};
    var parent = SKYSALES.Class.Resource(),
    thisCheckResidentsC3 = SKYSALES.Util.extendObject(parent);

    thisCheckResidentsC3.ResidentsList = null;

    thisCheckResidentsC3.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
    };

    thisCheckResidentsC3.initObject = function () {
        thisCheckResidentsC3.checkResidentsOnSARA();
    };

    thisCheckResidentsC3.checkResidentsOnSARA = function () {

        var jsonResidentsForValidation = thisCheckResidentsC3.getResidentsForValidation();

        $.ajax({
            type: "POST",
            async: true,
            url: "CheckResidentsUpdateBookingChangeItineraryAjax-resource.aspx",
            data: {
                "jsonResidentsForValidation": JSON.stringify(jsonResidentsForValidation)
            },
            dataType: "json"
        });
    };

    thisCheckResidentsC3.getResidentsForValidation = function () {
        var result = {
            ResidentsForValidation: thisCheckResidentsC3.ResidentsList
        };

        return result;
    };

    return thisCheckResidentsC3;
};