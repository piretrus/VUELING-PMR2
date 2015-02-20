VUELING.Class.PassengerContactDataBannerMyVueling = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);
    var templateRow;

    thisClass.ActionButton = null;
    thisClass.DataContactSection = null;
    thisClass.ToHide = null;
    thisClass.popUpObjectName = "passengerDataContactPopUp";
    thisClass.blockUI = null;
    thisClass.PopUpClose = null;
    thisClass.TemplateObject = null;
    thisClass.SubmitSelector = null;
    thisClass.FormToSend = "blockUIPopUpForPassengerTravelDocuments";
    thisClass.InputSelectors = null;
    thisClass.InputNames = null;
    thisClass.Texts = null;

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();

        templateRow = $(thisClass.TemplateObject).clone().get(0).outerHTML;
        
        thisClass.blockUI = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = $(thisClass.PopUpClose);
        thisClass.blockUI.init(json);
    };

    thisClass.addEvents = function () {
        thisClass.GetObjectsCollection();
        thisClass.RegisterEvents();
    };

    thisClass.GetObjectsCollection = function () {
        thisClass.ObjectsCollection = {
            "ActionButton": $(thisClass.ActionButton),
            "DataContactSection": $(thisClass.DataContactSection),
            "ToHide": $(thisClass.ToHide),
            "Inputs": $(thisClass.InputSelectors),
            "SubmitButton": $(thisClass.SubmitSelector)
        };
    };

    thisClass.replaceAll = function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

    thisClass.FillForm = function(pnr, fn) {
        var sUrl = "/PassengerTravelDocumentForm.aspx";
        var sData = "pnr=" + pnr;
        $("[name='pnr']").val(pnr);
        $.ajax({
            url: sUrl,
            data: sData,
            success: function (data) {

                var newForm = "";
                $("#VariableRowsForPassengers").find(thisClass.TemplateObject).remove();
                for (var i = 0; i < data.length; i++) {
                    newFormRow = templateRow;
                    for (var k in data[i]) {
                        newFormRow = thisClass.replaceAll("#" + k + "#", data[i][k], newFormRow);
                        newFormRow = thisClass.replaceAll("#Position#", (i+1), newFormRow);
                    }
                    newForm += newFormRow;
                }


                $("#VariableRowsForPassengers").append(newForm);
                $("#VariableRowsForPassengers").find(thisClass.TemplateObject + ":last-child").addClass("sectionRowBorder--last");

                if (typeof (fn) == "function") {
                    fn();
                }               
            },
            error: function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            },
            dataType: "json",
            timeout: 15000
        });


    };

    thisClass.ValidateInput = function (type, value) {
        var re = "";
        switch (type) {
            case "email":
                re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                break;
            case "prefix":
                re = /^(\+)?\d{2,}$/;
                break;
            case "phone":
                re = /^(\+)?\d{9,}$/;
                break;
        }
        
        return re.test(value) || value == "";
    };

    thisClass.GetInputNameByType = function (type) {
        var result = null;

        for (var i = 0; i < thisClass.InputNames.length; i++) {
            if (thisClass.InputNames[i]["code"] == type) {
                result = thisClass.InputNames[i];
                break;
            }
        }
        return result ? result["name"] : "";
    };

    thisClass.GetInputTypeByName = function (name) {
        var result = null;

        for (var i = 0; i < thisClass.InputNames.length; i++) {
            if (thisClass.InputNames[i]["name"] == name) {
                result = thisClass.InputNames[i];
                break;
            }
        }
        return result ? result["code"] : "";
    };

    thisClass.ValidateNotEquals = function (type, obj, printError) {
        if (type == "prefix") return true;

        var name = thisClass.GetInputNameByType(type);
        var selector = "[name='" + name + "']";
        var errorFound = false;

        thisClass.ObjectsCollection["Inputs"].filter(selector).not(obj).each(function () {
            var checkObj = $(this);
            var withSameValue = thisClass.ObjectsCollection["Inputs"].filter(selector).filter(function () { return ($(this).val() == checkObj.val() && $(this).val() != ""); });

            if (withSameValue.length > 1) {
                if (printError) {
                    $(checkObj).parent().addClass("check--FAIL");
                    withSameValue.parent().addClass("check--FAIL");
                    $(checkObj).closest("[data-template-row]").find("[data-error-type='TravelDocumentDuplicatedEmail']").removeClass("hidden");
                }
                errorFound = true;
            } else {
                thisClass.ObjectsCollection["Inputs"].filter(selector).each(function () {
                    $(this).parent().removeClass("check--FAIL");
                    withSameValue.parent().removeClass("check--FAIL");
                    $(checkObj).closest("[data-template-row]").find("[data-error-type='TravelDocumentDuplicatedEmail']").addClass("hidden");
                });
            }
            return !errorFound;
        });

        return !errorFound;
    };

    thisClass.ValidateDataIsFilled = function (type, obj, printError) {
        var rowWithInputs = $(obj).closest(".colRow2");
        var filledIn = rowWithInputs.find("input[type!='hidden']").filter(function () { return $(this).val() != ""; });

        if (filledIn.length > 0 && filledIn.length < 3) {
            if (printError)
                rowWithInputs.find("input[type!='hidden']").parent().addClass("check--FAIL");

            return false;
        } else {
            rowWithInputs.find("input[type!='hidden']").parent().removeClass("check--FAIL");
            return true;
        }

    };

    thisClass.Validate = function (obj, printError) {
        var value = $(obj).val();
        var type = thisClass.GetInputTypeByName($(obj).attr("name"));
        var name = thisClass.GetInputNameByType(type);
        var ErrorFormatType = "";

        switch (type) {
            case "phone":
            case "prefix":
                ErrorFormatType = "TravelDocumentBadPhoneFormat";
                break;
            case "email":
                ErrorFormatType = "TravelDocumentBadEmailFormat";
                break;
        }

        if (!thisClass.ValidateInput(type, value)) {
            $(obj).parent().addClass("validacion check--FAIL");
            $(obj).closest("[data-template-row]").find("[data-error-type='" + ErrorFormatType + "']").removeClass("hidden");
            return false;
        } else {
            $(obj).parent().removeClass("validacion check--FAIL");
            $(obj).parent().addClass("validacion check--OK");
            $(obj).closest("[data-template-row]").find("[data-error-type='" + ErrorFormatType + "']").addClass("hidden");
        }

        if (!thisClass.ValidateNotEquals(type, $(obj), true)) {
            return false;
        }

        if (!thisClass.ValidateDataIsFilled(type, $(obj), printError)) {
            return false;
        }

        return true;

    };

    thisClass.RegisterEvents = function () {
        thisClass.ObjectsCollection["ActionButton"].click(function (e) {
            e.preventDefault();

            var pnr = $(this).parent().parent().parent().parent().parent().siblings("[name='PnrToShowInPopUp']").val();

            if (thisClass.ObjectsCollection["DataContactSection"])
                thisClass.ObjectsCollection["DataContactSection"].show();
            if (thisClass.ObjectsCollection["ToHide"])
                thisClass.ObjectsCollection["ToHide"].hide();

            thisClass.FillForm(pnr, function () {

                thisClass.ObjectsCollection = {
                    "Inputs": $(thisClass.InputSelectors)
                };

                thisClass.ObjectsCollection["Inputs"].change(function () {
                    thisClass.Validate(this, false);
                });

                $("#VariableRowsForPassengers").find(thisClass.TemplateObject + ":last-child").addClass("sectionRowBorder--last");

                thisClass.ShowPopUp(e);
            });
            return false;

        });

        thisClass.ObjectsCollection["SubmitButton"].click(function (e) {
            var isValid = true;

            thisClass.ObjectsCollection["Inputs"].each(function () {
                isValid = thisClass.Validate(this, true);
                return isValid;
            });

            if (!isValid) {
                e.preventDefault();
                return false;
            }

            if (thisClass.FormToSend != null && isValid) {
                SKYSALES.Util.ValidateAndAppendToSkySalesAndPostBack(thisClass.FormToSend, this);
                return false;
            }

        });
    };

    thisClass.ShowPopUp = function (e) {
        thisClass.blockUI.show("blockUIPopUpForPassengerTravelDocuments");
        return false;
    };

    return thisClass;
};