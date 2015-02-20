

VUELING.Class.DonationPaymentFee = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisDonationPaymentFee = SKYSALES.Util.extendObject(parent);

    thisDonationPaymentFee.SideBarObj = null;
    thisDonationPaymentFee.CustomPaymentTypesObj = null;
    thisDonationPaymentFee.DCCHandlerObj = null;
    thisDonationPaymentFee.checkboxDonationId = '';
    thisDonationPaymentFee.PaymentMethodsList = null;
    thisDonationPaymentFee.CloneOfPaymentfeesHash = null;
    thisDonationPaymentFee.DonationFeeAmount = 0;
    thisDonationPaymentFee.amountDues = new Array();
    thisDonationPaymentFee.PayPalLabelText = '';
    thisDonationPaymentFee.DonationLabelSideBar = '';
    thisDonationPaymentFee.HiddenFieldsPrfecixId = '';
    thisDonationPaymentFee.DonationFeeCode = '';
    thisDonationPaymentFee.paymentMethodsSelector = '';
    thisDonationPaymentFee.PayPalTabSelector = '';
    thisDonationPaymentFee.IdealTabSelector = '';
    thisDonationPaymentFee.PrePaidText = '';
    thisDonationPaymentFee.PayPalText = '';
    thisDonationPaymentFee.ExternalIdealText = '';
    thisDonationPaymentFee.IdealText = '';
    thisDonationPaymentFee.PaymethodCodeVisaVueling = '';
    thisDonationPaymentFee.DropDownStoredPaymentsId = '';
    thisDonationPaymentFee.SelectorForTabs = '';
    thisDonationPaymentFee.PaymentMethodTypeForStoredPayments = '';
    thisDonationPaymentFee.SelectorForPaypalLabels = '';
    thisDonationPaymentFee.OriginalQuotedAmount = 0;
    thisDonationPaymentFee.OriginalQuotedAmountFormatted = '';
    thisDonationPaymentFee.StoredPaymentsSelector = '';
    thisDonationPaymentFee.StoredPaymentsWithoutNickSelector = '';
    thisDonationPaymentFee.WasDonationChecked = '';
    thisDonationPaymentFee.TotalAmountWithDonationFee = 0;
    thisDonationPaymentFee.InitAmountSideBar = 0;


    thisDonationPaymentFee.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();

        if (thisDonationPaymentFee.WasDonationChecked == "true") {
            thisDonationPaymentFee.checkboxDonation.attr("checked", "checked");
        }
    };

    thisDonationPaymentFee.setVars = function () {
        parent.setVars.call(this);
        this.checkboxDonation = this.getById(this.checkboxDonationId);
        thisDonationPaymentFee.SideBarObj = VUELING.Util.getObjectInstance("SBSidebar");
        thisDonationPaymentFee.CustomPaymentTypesObj = VUELING.Util.getObjectInstance("paymentTypes");
        thisDonationPaymentFee.DCCHandlerObj = VUELING.Util.getObjectInstance("DCCHandler");
        if (thisDonationPaymentFee.SideBarObj != null) {
            thisDonationPaymentFee.SideBarObj.pricePerPaxSpan = $("#SBSidebarPaymentView_pricePerPax");
        }

        thisDonationPaymentFee.CloneOfPaymentfeesHash = thisDonationPaymentFee.ClonePaymentFeeHashObject(thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.paymentFeeHash);

        $.each(thisDonationPaymentFee.PaymentMethodsList, function (index, value) {
            var id = thisDonationPaymentFee.HiddenFieldsPrfecixId + value.Code.replace(thisDonationPaymentFee.PrePaidText, thisDonationPaymentFee.PayPalText).replace(thisDonationPaymentFee.ExternalIdealText, thisDonationPaymentFee.IdealText).replace(":", "_") + "_AMT";
            thisDonationPaymentFee.amountDues.push(parseFloat($("#" + id).val()));
        });

        if (thisDonationPaymentFee.WasDonationChecked == "true") {
            //Guardamos el valor original de las propiedades
            thisDonationPaymentFee.OriginalQuotedAmount = parseFloat(thisDonationPaymentFee.TotalAmountWithDonationFee) + parseFloat(thisDonationPaymentFee.DonationFeeAmount);
            thisDonationPaymentFee.OriginalQuotedAmountFormatted = SKYSALES.Util.convertToLocaleCurrency(thisDonationPaymentFee.OriginalQuotedAmount);
            if (thisDonationPaymentFee.SideBarObj != null) {
                thisDonationPaymentFee.InitAmountSideBar = thisDonationPaymentFee.SideBarObj.servicesPricesArray["initServiceAmount"] - parseFloat(thisDonationPaymentFee.DonationFeeAmount);
            }


        } else {
            //Guardamos el valor original de las propiedades
            thisDonationPaymentFee.OriginalQuotedAmount = thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount;
            thisDonationPaymentFee.OriginalQuotedAmountFormatted = thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted;
            if (thisDonationPaymentFee.SideBarObj != null) {
                thisDonationPaymentFee.InitAmountSideBar = thisDonationPaymentFee.SideBarObj.servicesPricesArray["initServiceAmount"];
            }

        }


    };
    thisDonationPaymentFee.addEvents = function () {
        this.checkboxDonation.change(thisDonationPaymentFee.checkBoxDonationHandler);
    };

    thisDonationPaymentFee.checkBoxDonationHandler = function () {
        var checkBoxValue = thisDonationPaymentFee.SearchOnPaymentMethodRows();
        var amountOnFeeHash;
        var quotedAmount;
        if (
            (thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "false")
            ||
            (!thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "true")
        ) {
            thisDonationPaymentFee.CloneOfPaymentfeesHash = thisDonationPaymentFee.ClonePaymentFeeHashObject(thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.paymentFeeHash);
            //Modificamos los hidden fields para cada tipo de pago con los valores con el fee de donación agregado
            thisDonationPaymentFee.ModifyHiddenFields();

            //Modificamos el Fee Hash con los valores con el Fee de donación incluido
            thisDonationPaymentFee.ModifyPaymentFeeHashWithFeeDonation();

            //Comprobamos si se ha chequeado algun método de pago
            if (checkBoxValue != null) {
                amountOnFeeHash = parseFloat(thisDonationPaymentFee.getPaymentFeeAmountFromHash(checkBoxValue));
                thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount = amountOnFeeHash;
                thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted = thisDonationPaymentFee.FormatAmount(amountOnFeeHash);
            } else {
                quotedAmount = parseFloat(thisDonationPaymentFee.TotalAmountWithDonationFee);
                thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount = parseFloat(quotedAmount.toFixed(2));
                thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted = thisDonationPaymentFee.FormatAmount(quotedAmount.toFixed(2));
            }
            //Añadimos servicio al SideBar con el Fee de donación o lo quitamos 
            if (thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "false") {
                thisDonationPaymentFee.SideBarObj.setService(thisDonationPaymentFee.DonationFeeCode, { pay: { desc: thisDonationPaymentFee.DonationLabelSideBar, num: 1, price: parseFloat(thisDonationPaymentFee.DonationFeeAmount) } });
            } else if (!thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "true") {
                thisDonationPaymentFee.SideBarObj.servicesPricesArray["initServiceAmount"] = thisDonationPaymentFee.InitAmountSideBar;
                thisDonationPaymentFee.SideBarObj.removeService(thisDonationPaymentFee.DonationFeeCode);
            }

            //Modficamos los labels de los tipos de pago
            thisDonationPaymentFee.ModifyLabelsOnPaymentMethodRows();

        } else if (
            (!thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "false")
            ||
            (thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "true")
        ) {
            //Volvemos a modificar los valores de los hidden por los originales
            thisDonationPaymentFee.ResetHiddenFieldsToOriginalValues();

            //Volvemos a poner el FeeHash tal y como estaba originalmente
            thisDonationPaymentFee.RevertpaymentFeeHashToOriginal();

            //Actualizamos los campos necesarios para modificar el total del botón de pago
            if (checkBoxValue != null) {
                if (checkBoxValue != thisDonationPaymentFee.PayPalText) {
                    amountOnFeeHash = parseFloat(thisDonationPaymentFee.getPaymentFeeAmountFromHash(checkBoxValue));
                    thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount = amountOnFeeHash;
                    thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted = thisDonationPaymentFee.FormatAmount(amountOnFeeHash);
                } else {
                    thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount = thisDonationPaymentFee.amountDues[0];
                    thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted = thisDonationPaymentFee.FormatAmount(thisDonationPaymentFee.amountDues[0]);
                }
            } else {
                quotedAmount = parseFloat(thisDonationPaymentFee.OriginalQuotedAmount);
                thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount = parseFloat(quotedAmount.toFixed(2));
                thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted = thisDonationPaymentFee.FormatAmount(quotedAmount.toFixed(2));
            }
            //Eliminamos el servicio al SideBar con el Fee de donación y actualizamos el del fee tarjeta
            if (!thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "false") {
                thisDonationPaymentFee.SideBarObj.removeService(thisDonationPaymentFee.DonationFeeCode);
            } else if (thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "true") {
                thisDonationPaymentFee.SideBarObj.setService(thisDonationPaymentFee.DonationFeeCode, { pay: { desc: thisDonationPaymentFee.DonationLabelSideBar, num: 1, price: parseFloat(thisDonationPaymentFee.DonationFeeAmount) } });
            }

            //Modficamos los labels de los tipos de pago
            thisDonationPaymentFee.RevertLabelsOnPaymentMethodRows();
        }

        //Si se ha chequeado un método de pago tenemos que lanzar el método updatePayment y lanzar el DCC
        if (checkBoxValue != null) {
            thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.updatePaymentFee(checkBoxValue, amountOnFeeHash);
            thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.activatePaymentFees(thisDonationPaymentFee.GetPaymentFromArrayHash(checkBoxValue));
            var id = thisDonationPaymentFee.HiddenFieldsPrfecixId + checkBoxValue.replace(":", "_") + "_ACCTNO";
            if ($("#" + id).val() != "") {
                thisDonationPaymentFee.DCCHandlerObj.tryDCCProcess();
            }
        } else {
            thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.activatePaymentFees({});
        }
        //Volvemos a poner el valor original en quoted amount por si se cambia de pestaña con el valor de donación sumado si esta marcado el check
        thisDonationPaymentFee.ResetTotalAmountToOriginal();
        //Actualizar el precio total sin descuento
        thisDonationPaymentFee.UpdateTotalAmountWithoutDiscount(thisDonationPaymentFee.SideBarObj);
    };

    thisDonationPaymentFee.FormatAmount = function (amount) {
        return SKYSALES.Util.convertToLocaleCurrency(amount).trim().replace(' ', '');
    };

    thisDonationPaymentFee.ResetTotalAmountToOriginal = function () {

        var total = thisDonationPaymentFee.OriginalQuotedAmount;
        if (thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "false") {
            total += parseFloat(thisDonationPaymentFee.DonationFeeAmount);
        }
        else if (!thisDonationPaymentFee.checkboxDonation.is(':checked') && thisDonationPaymentFee.WasDonationChecked == "true") {
            total -= parseFloat(thisDonationPaymentFee.DonationFeeAmount);
        }
        if (total != thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount) {
            thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmount = total;
            thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.quotedAmountFormatted = thisDonationPaymentFee.FormatAmount(total);
        }
    };

    thisDonationPaymentFee.UpdateTotalAmountWithoutDiscount = function (sidebarObj) {
        var servicesTotalAmount = 0;
        for (var i in sidebarObj.servicesPricesArray) {
            servicesTotalAmount += sidebarObj.servicesPricesArray[i];
        };
        var totalAmount = servicesTotalAmount + sidebarObj.totalFlightsAmount + sidebarObj.totalSpecialServicesAmount + sidebarObj.totalSpecialFareChargesAmount;
        sidebarObj.totalPricePromoVY.html(thisDonationPaymentFee.FormatAmount(totalAmount.toFixed(2)));
    };

    thisDonationPaymentFee.ResetHiddenFieldsToOriginalValues = function () {
        $.each(thisDonationPaymentFee.PaymentMethodsList, function (index, value) {
            var id = thisDonationPaymentFee.HiddenFieldsPrfecixId + value.Code.replace(thisDonationPaymentFee.PrePaidText, thisDonationPaymentFee.PayPalText).replace(thisDonationPaymentFee.ExternalIdealText, thisDonationPaymentFee.IdealText).replace(":", "_") + "_AMT";
            $("#" + id).val(thisDonationPaymentFee.amountDues[index]);
        });
    };

    thisDonationPaymentFee.ModifyHiddenFields = function () {
        $.each(thisDonationPaymentFee.PaymentMethodsList, function (index, value) {
            var id = thisDonationPaymentFee.HiddenFieldsPrfecixId + value.Code.replace(thisDonationPaymentFee.PrePaidText, thisDonationPaymentFee.PayPalText).replace(thisDonationPaymentFee.ExternalIdealText, thisDonationPaymentFee.IdealText).replace(":", "_") + "_AMT";
            var amount = parseFloat($("#" + id).val()) + parseFloat(thisDonationPaymentFee.DonationFeeAmount);
            $("#" + id).val(amount.toFixed(2));
        });
    };

    thisDonationPaymentFee.ModifyPaymentFeeHashWithFeeDonation = function () {
        $.each(thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.paymentFeeHash, function (index, value) {
            for (var i = 0; i < thisDonationPaymentFee.PaymentMethodsList.length; i++) {
                if (value.key == thisDonationPaymentFee.PaymentMethodsList[i].Code) {
                    value.amount = parseFloat(thisDonationPaymentFee.PaymentMethodsList[i].FeeAmount);
                    value.amountFormatted = thisDonationPaymentFee.FormatAmount(thisDonationPaymentFee.PaymentMethodsList[i].FeeAmount);
                    value.total = parseFloat(thisDonationPaymentFee.PaymentMethodsList[i].TotalAmountToPay);
                    value.totalFormatted = thisDonationPaymentFee.FormatAmount(thisDonationPaymentFee.PaymentMethodsList[i].TotalAmountToPay);
                    break;
                }
            }
        });
    };

    thisDonationPaymentFee.RevertpaymentFeeHashToOriginal = function () {
        $.each(thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.paymentFeeHash, function (index, value) {
            value.amount = thisDonationPaymentFee.CloneOfPaymentfeesHash[index].amount;
            value.amountFormatted = thisDonationPaymentFee.CloneOfPaymentfeesHash[index].amountFormatted;
            value.total = thisDonationPaymentFee.CloneOfPaymentfeesHash[index].total;
            value.totalFormatted = thisDonationPaymentFee.CloneOfPaymentfeesHash[index].totalFormatted;
        });
    };

    thisDonationPaymentFee.SearchOnPaymentMethodRows = function () {
        var checkBoxValue = null;
        //Miramos si la pestaña de PayPal o IDeal estan activas
        if ($("#" + thisDonationPaymentFee.PayPalTabSelector).hasClass(thisDonationPaymentFee.SelectorForTabs)) {
            checkBoxValue = thisDonationPaymentFee.PayPalText;
        }
        if ($("#" + thisDonationPaymentFee.IdealTabSelector).hasClass(thisDonationPaymentFee.SelectorForTabs)) {
            checkBoxValue = thisDonationPaymentFee.ExternalIdealText;
        }
        if (checkBoxValue == null) {
            $("." + thisDonationPaymentFee.paymentMethodsSelector).each(function (index) {
                var checkbox = $(this).find("input:first");
                if (checkbox.is(":checked")) {
                    checkBoxValue = checkbox.val();
                }
            });
        }
        if (checkBoxValue == thisDonationPaymentFee.PaymentMethodTypeForStoredPayments) checkBoxValue = $("#" + thisDonationPaymentFee.DropDownStoredPaymentsId).find(":selected").val();
        if (checkBoxValue != null) checkBoxValue = checkBoxValue.split("-")[0];
        return checkBoxValue;
    };

    thisDonationPaymentFee.modifyCardLabels = function () {
        //Modicación labels de tipos de tarjeta en skin VuelingBase
        $("." + thisDonationPaymentFee.paymentMethodsSelector).each(function (index) {
            var idPaymentMethod = $(this).find("input:first").val();
            var paymentMethod = thisDonationPaymentFee.GetPaymentFromArrayHash(idPaymentMethod);
            if (paymentMethod != null) {
                var label = $(this).find("label:first");
                var childrenhtml = label.children().detach();
                var paymentMethodLabel;
                if (paymentMethod.key == thisDonationPaymentFee.PaymethodCodeVisaVueling) {
                    paymentMethodLabel = label.text();
                } else {
                    paymentMethodLabel = label.text().split('(')[0];
                }
                if (paymentMethod.key != thisDonationPaymentFee.PaymethodCodeVisaVueling && parseFloat(paymentMethod.amount) != 0) {
                    paymentMethodLabel += "(+" + thisDonationPaymentFee.FormatAmount(paymentMethod.amount) + ")";
                }
                label.text(paymentMethodLabel);
                label.append(childrenhtml);
            }
        });
    };

    thisDonationPaymentFee.modifyPaypalLabels = function () {
        //Modificación Label Paypal
        var paymentMethod = thisDonationPaymentFee.GetPaymentFromArrayHash(thisDonationPaymentFee.PrePaidText);
        $("#" + thisDonationPaymentFee.SelectorForPaypalLabels).text(thisDonationPaymentFee.PayPalLabelText + thisDonationPaymentFee.FormatAmount(paymentMethod.amount));
    };

    thisDonationPaymentFee.RevertLabelsOnPaymentMethodRows = function () {

        thisDonationPaymentFee.modifyCardLabels();
        thisDonationPaymentFee.modifyPaypalLabels();

        //Modificación Labels tarjetas guardadas en VuelingBaseMember
        $("." + thisDonationPaymentFee.paymentMethodsSelector).each(function (index) {
            var input = $(this).find("input:first").val();
            var paymentMethod = thisDonationPaymentFee.GetPaymentFromArrayHash(input.split("-")[0]);
            if (paymentMethod != null) {
                var label = $(this).find("#" + thisDonationPaymentFee.StoredPaymentsSelector + ":first");
                if (label.length == 0) {
                    label = $(this).find("#" + thisDonationPaymentFee.StoredPaymentsWithoutNickSelector + ":first");
                }
                var paymentMethodLabel;
                if (paymentMethod.key == thisDonationPaymentFee.PaymethodCodeVisaVueling) {
                    paymentMethodLabel = label.text();
                } else {
                    paymentMethodLabel = label.text().split('(')[0];
                }
                if (paymentMethod.key != thisDonationPaymentFee.PaymethodCodeVisaVueling && parseFloat(paymentMethod.amount) != 0) {
                    paymentMethodLabel += "(+" + thisDonationPaymentFee.FormatAmount(paymentMethod.amount) + ")";
                }
                label.text(paymentMethodLabel);
            }
        });
        //Modificación del drop down de tarjetas en VuelingBaseMember
        $("#" + thisDonationPaymentFee.DropDownStoredPaymentsId).children("option").each(function (index) {
            var idPaymentMethod = $(this).val();
            var paymentMethod = thisDonationPaymentFee.GetPaymentFromArrayHash(idPaymentMethod);
            if (paymentMethod != null) {
                var paymentMethodLabel;
                if (paymentMethod.key == thisDonationPaymentFee.PaymethodCodeVisaVueling) {
                    paymentMethodLabel = $(this).text();
                } else {
                    paymentMethodLabel = $(this).text().split('(')[0];
                }
                if (paymentMethod.key != thisDonationPaymentFee.PaymethodCodeVisaVueling && parseFloat(paymentMethod.amount) != 0) {
                    paymentMethodLabel += "(+" + thisDonationPaymentFee.FormatAmount(paymentMethod.amount) + ")";
                }
                $(this).text(paymentMethodLabel);
            }
        });

    };

    thisDonationPaymentFee.ModifyLabelsOnPaymentMethodRows = function () {

        thisDonationPaymentFee.modifyCardLabels();
        thisDonationPaymentFee.modifyPaypalLabels();

        //Modificación Labels tarjetas guardadas en VuelingBaseMember
        $("." + thisDonationPaymentFee.paymentMethodsSelector).each(function (index) {
            var input = $(this).find("input:first").val();
            var paymentMethod = thisDonationPaymentFee.GetPaymentFromArray(input.split("-")[0]);
            if (paymentMethod != null) {
                var label = $(this).find("#" + thisDonationPaymentFee.StoredPaymentsSelector + ":first");
                if (label.length == 0) {
                    label = $(this).find("#" + thisDonationPaymentFee.StoredPaymentsWithoutNickSelector + ":first");
                }
                var paymentMethodLabel;
                if (paymentMethod.key == thisDonationPaymentFee.PaymethodCodeVisaVueling) {
                    paymentMethodLabel = label.text();
                } else {
                    paymentMethodLabel = label.text().split('(')[0];
                }
                if (paymentMethod.Description != thisDonationPaymentFee.PaymethodCodeVisaVueling && parseFloat(paymentMethod.FeeAmount) != 0) {
                    paymentMethodLabel += "(+" + thisDonationPaymentFee.FormatAmount(paymentMethod.FeeAmount) + ")";
                }
                label.text(paymentMethodLabel);
            }
        });
        //Modificación del drop down de tarjetas en VuelingBaseMember
        $("#" + thisDonationPaymentFee.DropDownStoredPaymentsId).children("option").each(function (index) {
            var idPaymentMethod = $(this).val();
            var paymentMethod = thisDonationPaymentFee.GetPaymentFromArray(idPaymentMethod);
            if (paymentMethod != null) {
                var paymentMethodLabel = paymentMethod.Name;
                if (paymentMethod.Description != thisDonationPaymentFee.PaymethodCodeVisaVueling && parseFloat(paymentMethod.FeeAmount) != 0) {
                    paymentMethodLabel += " (+" + thisDonationPaymentFee.FormatAmount(paymentMethod.FeeAmount) + ")";
                }
                $(this).text(paymentMethodLabel);
            }
        });
    };

    thisDonationPaymentFee.GetPaymentFromArrayHash = function (idPaymentMethod) {
        var paymentMethod;
        idPaymentMethod = idPaymentMethod.replace("PayPal", "PrePaid");
        $.each(thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.paymentFeeHash, function (index, value) {
            if (value.key == idPaymentMethod) {
                paymentMethod = value;
            }
        });
        return paymentMethod;
    };

    thisDonationPaymentFee.GetPaymentFromArray = function (idPaymentMethod) {
        var paymentMethod;
        $.each(thisDonationPaymentFee.PaymentMethodsList, function (index, value) {
            if (value.Code == idPaymentMethod) {
                paymentMethod = value;
            }
        });
        return paymentMethod;
    };

    thisDonationPaymentFee.getPaymentFeeAmountFromHash = function (key) {
        var amount = 0;
        key = key.replace("PayPal", "PrePaid");
        $.each(thisDonationPaymentFee.CustomPaymentTypesObj.paymentFees.paymentFeeHash, function (index, value) {
            if (key.indexOf(value.key) == 0) /*value.key == key)*/ {
                amount = value.total;
            }
        });
        return amount;
    };

    thisDonationPaymentFee.ClonePaymentFeeHashObject = function (obj) {
        if (obj == null || typeof obj !== 'object') {
            return obj;
        }
        var temp = obj.constructor();
        for (var key in obj) {
            temp[key] = thisDonationPaymentFee.ClonePaymentFeeHashObject(obj[key]);
        }
        return temp;
    };


    return thisDonationPaymentFee;
};