VUELING.Class.PassengerContactData = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.ObjectsCollection = null;
    thisClass.InputSelectors = null;
    thisClass.SubmitSelector = null;
    thisClass.UnblockForm = null;
    thisClass.InputNames = null;
    thisClass.Error = null;
    thisClass.FormToSend = null;
    thisClass.Texts = null;

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();

    };

    thisClass.addEvents = function () {
        thisClass.GetObjectsCollection();
        thisClass.RegisterEvents();
    };

    thisClass.GetObjectsCollection = function () {
        thisClass.ObjectsCollection = {
            "Inputs": $(thisClass.InputSelectors),
            "SubmitButton": $(thisClass.SubmitSelector),
            "UnblockForm": $(thisClass.UnblockForm)
        };


    };

    thisClass.RegisterEvents = function () {
        $(document).ready(function () {
            if ($("#PnrHasTravelDocumentData").val() == "true" && ($("#TravelDocsMustBlockForm").length <= 0 && $("#TravelDocsMustBlockForm").val() != "false")) {
                thisClass.ObjectsCollection["Inputs"].prop("disabled", true);
                thisClass.ObjectsCollection["SubmitButton"].hide();
                thisClass.ObjectsCollection["UnblockForm"].show();
            }
        });

        thisClass.ObjectsCollection["UnblockForm"].click(function() {
            thisClass.ObjectsCollection["Inputs"].prop("disabled", false);
            thisClass.ObjectsCollection["SubmitButton"].show();
            thisClass.ObjectsCollection["UnblockForm"].hide();
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

        thisClass.ObjectsCollection["Inputs"].change(function () {
            thisClass.Validate(this, false);
        });
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

    thisClass.ValidateNotEquals = function (type, obj, printError) {
        if (type == "prefix") return true;

        var name = thisClass.GetInputNameByType(type);
        var selector = "[name='" + name + "']";
        var errorFound = false;

        thisClass.ObjectsCollection["Inputs"].filter(selector).not(obj).each(function () {
            var checkObj = $(this);
            var withSameValue = thisClass.ObjectsCollection["Inputs"].filter(selector).filter(function () { return ($(this).val() == checkObj.val() && $(this).val() != ""); });

            if (withSameValue.length > 1) {
                if (printError)
                {
                    $(checkObj).parent().addClass("check--FAIL");
                    withSameValue.parent().addClass("check--FAIL");
                    $(checkObj).closest("[data-template-row]").find("[data-error-type='TravelDocumentDuplicatedEmail']").removeClass("hidden");
                }
                errorFound = true;
            } else {
                thisClass.ObjectsCollection["Inputs"].filter(selector).each(function() {
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

        switch(type)
        {
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



    return thisClass;
};