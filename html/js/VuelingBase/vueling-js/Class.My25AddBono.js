VUELING.Class.My25AddBono = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisMy25AddBono = SKYSALES.Util.extendObject(parent);

    //#region Properties

    thisMy25AddBono.Sidebar = null;
    thisMy25AddBono.Passanger = null;
    thisMy25AddBono.Beneficiaries = null;
    thisMy25AddBono.TypesBono = null;
    thisMy25AddBono.ContentNewBeneficiary = null;
    thisMy25AddBono.FormatDate = null;
    thisMy25AddBono.LimitBeneficiaries = null;
    thisMy25AddBono.IsError = null;

    thisMy25AddBono.labelTipoBonoFieldsetId = null;
    thisMy25AddBono.labelTipoBonoId = null;
    thisMy25AddBono.labelIsMyCheckId = null;
    thisMy25AddBono.labelDateInitId = null;
    thisMy25AddBono.labelDateInitCaducityId = null;
    thisMy25AddBono.labelDateInitOtherDateContentId = null;
    thisMy25AddBono.labelConditionsId = null;
    thisMy25AddBono.labelConditionsCloseId = null;
    thisMy25AddBono.labelDatepickerId = null;
    thisMy25AddBono.labelDateInitBonoOption1Description = null;
    thisMy25AddBono.labelDateInitOtherDateId = null;
    thisMy25AddBono.labelDateInitOtherDateHiddenId = null;
    thisMy25AddBono.labelbtnAddBeneficies = null;
    thisMy25AddBono.labelAddBeneficiariesJS = null;
    thisMy25AddBono.labelBeneficiaryHiddenTemp = null;
    thisMy25AddBono.labelbtBuyMy25 = null;
    thisMy25AddBono.labelbtnAddBeneficiesId = null;

    thisMy25AddBono.msgBeneficiaryNameRequired = null;
    thisMy25AddBono.msgBeneficiaryLastNameRequired = null;
    thisMy25AddBono.msgBeneficiaryMailRequired = null;
    thisMy25AddBono.msgBeneficiaryMailFormatError = null;

    thisMy25AddBono.msgBeneficiaryReplyMailRequired = null;
    thisMy25AddBono.msgBeneficiaryReplyMailNotEqual = null;
    thisMy25AddBono.msgBeneficiaryReplyMailFormatError = null;

    thisMy25AddBono.msgMy25StartDateRequired = null;
    thisMy25AddBono.sBSidebarScroll = null;
    thisMy25AddBono.anclaId = null;
    thisMy25AddBono.containerId = null;
    thisMy25AddBono.bodyId = null;
    thisMy25AddBono.urlImageCalendar = null;
    thisMy25AddBono.SubmitButtonId = null;

    thisMy25AddBono.buttonSubmitId = null;
    thisMy25AddBono.whenSelectInitDateSelectedInputFilterToValidate = null;
    thisMy25AddBono.dateInitId = null;
    //for PopUp
    thisMy25AddBono.infoLinkId = '';
    thisMy25AddBono.infoLinkCloseButtonId = '';
    thisMy25AddBono.infoBoxId = '';
    thisMy25AddBono.waitingHours = 12;
    thisMy25AddBono.forcedWidth = '500px';
    thisMy25AddBono.infoLink = null;
    thisMy25AddBono.infoLinkCloseButton = null;
    thisMy25AddBono.blockUI = null;
    thisMy25AddBono.newSearchCloseButton = null;
    //ValidateAddBeneficiary
    thisMy25AddBono.objectNameBeneficiesEmail = null;
    thisMy25AddBono.idBeneficiesEmail = null;
    thisMy25AddBono.overlaps = null;
    thisMy25AddBono.emailsPopupShown = new Array();
    thisMy25AddBono.objectNameBeneficiaryLastname = '';
    thisMy25AddBono.objectNameBeneficiaryName = '';

    //#endregion Properties

    thisMy25AddBono.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();
    };

    thisMy25AddBono.initObjects = function () {
        thisMy25AddBono.InitDatepicker(thisMy25AddBono.labelDatepickerId + ":not(.notactivate)");
        for (var i in thisMy25AddBono.Beneficiaries)
            thisMy25AddBono.ShowDateInit(parseInt(i) + 1);
        thisMy25AddBono.ContentNewBeneficiary = $(thisMy25AddBono.labelBeneficiaryHiddenTemp).html();
        thisMy25AddBono.Sidebar = VUELING.Util.getObjectInstance('My25SidebarAddBono');
        if (thisMy25AddBono.IsError == "true")
            SKYSALES.Util.validate($(thisMy25AddBono.labelbtBuyMy25)[0]);

        thisMy25AddBono.sBSidebarScroll = new VUELING.Class.SBSidebarScroll();
        thisMy25AddBono.sBSidebarScroll.init(
        {
            "anclaId": thisMy25AddBono.anclaId,
            "containerId": thisMy25AddBono.containerId,
            "bodyId": thisMy25AddBono.bodyId,
            "scroll_foot_element": $('.footSb, .footerSb'),
            "scroll_footerH_element": $('div.footerSb').outerHeight(true)
        });
        thisMy25AddBono.sBSidebarScroll.scrollHandler();
        $(thisMy25AddBono.labelTipoBonoFieldsetId + " input:checked").parent().parent().addClass("sectionBorderSelected");
        thisMy25AddBono.InitPopupMessage();
    };

    thisMy25AddBono.InitPopupMessage = function () {
        thisMy25AddBono.infoLink = this.getById(thisMy25AddBono.infoLinkId);
        thisMy25AddBono.infoLinkCloseButton = this.getById(thisMy25AddBono.infoLinkCloseButtonId);
        thisMy25AddBono.blockUI = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = thisMy25AddBono.infoLinkCloseButton;
        json.properties = { css: { width: thisMy25AddBono.forcedWidth } };
        thisMy25AddBono.blockUI.init(json);
        thisMy25AddBono.infoLink.click(
            function() {
                thisMy25AddBono.blockUI.close();
            }
        );
    };

    thisMy25AddBono.addEvents = function () {
        $(thisMy25AddBono.buttonSubmitId).unbind('click').click(thisMy25AddBono.OnSubmitClick);
        $(thisMy25AddBono.SubmitButtonId).unbind('click').click(thisMy25AddBono.OnSubmitClick);
        $(thisMy25AddBono.labelTipoBonoFieldsetId).unbind('click').click(thisMy25AddBono.TipoBonoClick);
        $(thisMy25AddBono.labelTipoBonoFieldsetId).click(thisMy25AddBono.Sidebar.RowClick);
        $(thisMy25AddBono.labelIsMyCheckId).unbind('click').click(thisMy25AddBono.IsMyCheckClick);
        $(thisMy25AddBono.labelDateInitId).unbind('click').click(thisMy25AddBono.DateInitClick);
        $(thisMy25AddBono.labelConditionsCloseId).unbind('click').click(thisMy25AddBono.ConditionsCloseClick);
        $(thisMy25AddBono.labelbtnAddBeneficies).unbind('click').click(thisMy25AddBono.BeneficiesAddClick);
        for (var i in thisMy25AddBono.Beneficiaries) {
            $('#btnAddBeneficies_btBuyMy25_Email' + Number(i + 1) + ",#btnAddBeneficies_btBuyMy25_Phone" + Number(i + 1)).unbind('keypress').keypress(thisMy25AddBono.InputsRestrictKeydown);
            $('#btnAddBeneficies_btBuyMy25_Email' + Number(i + 1) + ",#btnAddBeneficies_btBuyMy25_Phone" + Number(i + 1)).unbind('change').change(thisMy25AddBono.InputsRestrictChange);
        }

        $('#btBuyMy25_Name0, #btBuyMy25_LastName0, #btBuyMy25_Email0, #btBuyMy25_EmailReply0').unbind('change').change(thisMy25AddBono.IsMyChange);

        //$(thisMy25AddBono.labelDateInitId).click(thisMy25AddBono.ValidateAddBeneficiary);
        $(thisMy25AddBono.objectNameBeneficiaryLastname).change(thisMy25AddBono.ValidateDontRepeatBeneficiaryOnChange);

    };

    //#region Events

    thisMy25AddBono.ValidateDontRepeatBeneficiaryOnChange = function(e) {
        var target = $(e.target);
        var lastnameToCompare = target.val();
        var inputNameTocompare = target.parent().parent().parent().find(thisMy25AddBono.objectNameBeneficiaryName);
        var nameToCompare = inputNameTocompare.val();
        var numBeneficiary = target.attr('data-beneficiary');
        if (lastnameToCompare && lastnameToCompare != '' && nameToCompare && nameToCompare!='') {
            var inputsNameToValidate = $(thisMy25AddBono.objectNameBeneficiaryName + ':not([data-beneficiary="' + numBeneficiary + '"]):not([data-beneficiary="[NumBeneficiary]"])');
            var inputsLastnameToValidate = $(thisMy25AddBono.objectNameBeneficiaryLastname + ':not([data-beneficiary="' + numBeneficiary + '"]):not([data-beneficiary="[NumBeneficiary]"])');
            if (inputsNameToValidate.length == inputsLastnameToValidate.length) {
                for (var i = 0; i < inputsNameToValidate.length; i++) {
                    var name = $(inputsNameToValidate[i]).val();
                    var lastname = $(inputsLastnameToValidate[i]).val();
                    if (name == nameToCompare && lastname == lastnameToCompare) {
                        //Lanzamos el popup
                        thisMy25AddBono.OpenMessage();
                        //Limpiamos el formulario
                        target.parent().parent().parent().find(":input[type='text']").not("[readonly]").val('');
                        break;
                    }
                }
            }
            
        } 
    };
    
    thisMy25AddBono.ValidateDontRepeatBeneficiaryOnSubmitClick = function () {
        var inputsNameToValidate = $(thisMy25AddBono.objectNameBeneficiaryName + ':not([data-beneficiary="[NumBeneficiary]"])');
        var inputsLastnameToValidate = $(thisMy25AddBono.objectNameBeneficiaryLastname + ':not([data-beneficiary="[NumBeneficiary]"])');
        var arrayNames = new Array();
        if (inputsNameToValidate.length == inputsLastnameToValidate.length) {
            for (var i = 0; i < inputsNameToValidate.length; i++) {
                arrayNames.push({ name: $(inputsNameToValidate[i]).val(), lastname: $(inputsLastnameToValidate[i]).val() });
            }
            return !thisMy25AddBono.hasDuplicates(arrayNames);
        }
        return true;
    };
    thisMy25AddBono.hasDuplicates = function (array) {
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            for (var j = 0; j < array.length; j++) {
                var itemToCompare = array[j];
                if (i != j && item.name == itemToCompare.name && item.lastname == itemToCompare.lastname)
                    return true;
            }
        }
        return false;
    };


    thisMy25AddBono.BeneficiesAddClick = function (e) {
        if (e != undefined)
            e.preventDefault();
        if (thisMy25AddBono.Beneficiaries != undefined && thisMy25AddBono.Beneficiaries.length > parseInt(thisMy25AddBono.LimitBeneficiaries) - 1)
            $(thisMy25AddBono.labelbtnAddBeneficiesId).addClass("hidden");
        if (SKYSALES.Util.validateMY25AddBono(this)) {
            if (thisMy25AddBono.Beneficiaries[thisMy25AddBono.Beneficiaries.length - 1] == undefined
                || thisMy25AddBono.Beneficiaries[thisMy25AddBono.Beneficiaries.length - 1] == null)
                thisMy25AddBono.Beneficiaries.length--;
            var id = thisMy25AddBono.Beneficiaries.length + 1;
            var fecha = new Date();
            var sDate = fecha.getMonth() + "/" + fecha.getDate() + "/" + fecha.getYear();
            var sDateAddMonth = fecha.getMonth() + "/" + fecha.getDate() + "/" + fecha.getYear();
            var bene = {
                DateAddMonths: sDateAddMonth,
                DateInitSelected: "",
                DateInit: "1",
                DateInitOtherDate: "",
                Email: "",
                EmailReply: "",
                IsMy: "false",
                LastName: "",
                Name: "",
                NumBeneficiary: id,
                Phone: "",
                Type: thisMy25AddBono.TypesBono[0].Typology,
            };
            thisMy25AddBono.Beneficiaries.push(bene);
            $('fieldset legend a').addClass("hidden");
            var sb = thisMy25AddBono.ContentNewBeneficiary;
            
            sb = thisMy25AddBono.replaceAll(sb, "[NumBeneficiary]", id);
            sb = thisMy25AddBono.replaceAll(sb, "notactivate", "");
            $(thisMy25AddBono.labelAddBeneficiariesJS).append(sb);
            $(thisMy25AddBono.labelTipoBonoId + '[data-beneficiary="' + id + '"]')[0].click();
            $(thisMy25AddBono.labelDateInitId + '[data-beneficiary="' + id + '"]')[0].click();
            thisMy25AddBono.addEvents();
            $(thisMy25AddBono.labelTipoBonoFieldsetId).click(thisMy25AddBono.Sidebar.RowClick);
            thisMy25AddBono.SetBeneficiaryAttributes(id);
            thisMy25AddBono.InitDatepicker($(thisMy25AddBono.labelDatepickerId + '[data-beneficiary="' + id + '"]'));
            thisMy25AddBono.ShowDateInit(thisMy25AddBono.Beneficiaries.length);
            thisMy25AddBono.Sidebar.ShowAllBonos();
            $('[data-object="btnBeneficiaryDelete"][data-beneficiary="' + id + '"]').click(thisMy25AddBono.BeneficiaryDeleteClick);
            $('#btnAddBeneficies_btBuyMy25_Name' + id)[0].focus();
            setTimeout(function () { $('html, body').animate({ scrollTop: $('fieldset[data-beneficiary="' + id + '"]').offset().top }, 400); }, 100);
        }
    };

    thisMy25AddBono.BeneficiaryDeleteClick = function (e) {
        if (e != undefined)
            e.preventDefault();
        if (thisMy25AddBono.Beneficiaries[thisMy25AddBono.Beneficiaries.length - 1] == undefined
            || thisMy25AddBono.Beneficiaries[thisMy25AddBono.Beneficiaries.length - 1] == null)
            thisMy25AddBono.Beneficiaries.length--;
        var idBeneficiary = thisMy25AddBono.Beneficiaries.length;
        $('fieldset[data-beneficiary="' + idBeneficiary + '"]').remove();
        thisMy25AddBono.Beneficiaries.splice(parseInt(idBeneficiary) - 1, 1);
        thisMy25AddBono.Sidebar.ShowAllBonos();
        if (thisMy25AddBono.Beneficiaries.length <= parseInt(thisMy25AddBono.LimitBeneficiaries))
            $(thisMy25AddBono.labelbtnAddBeneficiesId).removeClass("hidden");
        $('fieldset[data-beneficiary="' + parseInt(idBeneficiary - 1) + '"] legend a').removeClass("hidden");
    };

    thisMy25AddBono.SetBeneficiaryAttributes = function (idBeneficiary) {
        var emailReply = 'btnAddBeneficies_btBuyMy25_Email' + idBeneficiary;
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_Name' + idBeneficiary), 'required', 'true');
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_Name' + idBeneficiary), 'requirederror', thisMy25AddBono.msgBeneficiaryNameRequired);

        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_LastName' + idBeneficiary), 'required', 'true');
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_LastName' + idBeneficiary), 'requirederror', thisMy25AddBono.msgBeneficiaryLastNameRequired);

        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_Email' + idBeneficiary), 'required', 'true');
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_Email' + idBeneficiary), 'requirederror', thisMy25AddBono.msgBeneficiaryMailRequired);
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_Email' + idBeneficiary), 'validationtype', 'Email');
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_Email' + idBeneficiary), 'validationtypeerror', thisMy25AddBono.msgBeneficiaryMailFormatError);

        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary), 'required', 'true');
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary), 'requirederror', thisMy25AddBono.msgBeneficiaryReplyMailRequired);
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary), 'validationtype', 'Email');
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary), 'validationtypeerror', thisMy25AddBono.msgBeneficiaryReplyMailFormatError);
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary), 'equalsinput', emailReply);
        SKYSALES.Util.setAttribute(jQuery('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary), 'equalsinputerror', thisMy25AddBono.msgBeneficiaryReplyMailNotEqual);
    };


    thisMy25AddBono.TipoBonoClick = function (e) {
        var idBeneficiary = $(e.currentTarget).data("beneficiary");
        var type = $(thisMy25AddBono.labelTipoBonoId, e.currentTarget).val();
        var ben = thisMy25AddBono.FindBeneficiary(idBeneficiary);
        ben.Type = type;
        $(thisMy25AddBono.labelTipoBonoId, e.currentTarget)[0].checked = true;
        $('[data-object="TipoBonoFieldset"][data-beneficiary="' + idBeneficiary + '"]').removeClass("sectionBorderSelected");
        $(e.currentTarget).addClass("sectionBorderSelected");

        thisMy25AddBono.ShowDateInit(idBeneficiary);
    };

    thisMy25AddBono.IsMyCheckClick = function (e) {
        var idBeneficiary = $(e.currentTarget).data('beneficiary');

        var name = "";
        var lastName = "";
        var email = "";
        var emailReply = "";

        if ($(e.currentTarget)[0].checked) {
            name = $("#btBuyMy25_Name0").val();
            lastName = $("#btBuyMy25_LastName0").val();
            email = $("#btBuyMy25_Email0").val();
            emailReply = $("#btBuyMy25_EmailReply0").val();

            $('#btnAddBeneficies_btBuyMy25_Name' + idBeneficiary).attr("disabled", "");
            $('#btnAddBeneficies_btBuyMy25_LastName' + idBeneficiary).attr("disabled", "");
        } else {
            $('#btnAddBeneficies_btBuyMy25_Name' + idBeneficiary).removeAttr("disabled");
            $('#btnAddBeneficies_btBuyMy25_LastName' + idBeneficiary).removeAttr("disabled");
        }
        $('#btnAddBeneficies_btBuyMy25_Name' + idBeneficiary).val(name);
        $('#btnAddBeneficies_btBuyMy25_LastName' + idBeneficiary).val(lastName);
        $('#btnAddBeneficies_btBuyMy25_Email' + idBeneficiary).val(email);
        $('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary).val(emailReply);

    };

    thisMy25AddBono.DateInitClick = function (e) {
        var idBeneficiary = $(e.currentTarget).data('beneficiary');
        thisMy25AddBono.ShowDateInit(idBeneficiary);
        thisMy25AddBono.AddEventForShowDatepicker(idBeneficiary);
    };

    thisMy25AddBono.IsMyChange = function (e) {
        var obj = $(thisMy25AddBono.labelIsMyCheckId + ":checked");
        if (obj.length > 0) {
            var idBeneficiary = $(obj).data("beneficiary");
            $('#btnAddBeneficies_btBuyMy25_Name' + idBeneficiary).val($("#btBuyMy25_Name0").val());
            $('#btnAddBeneficies_btBuyMy25_LastName' + idBeneficiary).val($("#btBuyMy25_LastName0").val());
            $('#btnAddBeneficies_btBuyMy25_Email' + idBeneficiary).val($("#btBuyMy25_Email0").val());
            $('#btnAddBeneficies_btBuyMy25_EmailReply' + idBeneficiary).val($("#btBuyMy25_EmailReply0").val());
        }
    };

    //#endregion Events

    thisMy25AddBono.InitDatepicker = function (obj) {
        var resource = SKYSALES.Util.getResource();
        $.datepicker.regional['vy'] = {
            closeText: resource.datePickerInfo.closeText,
            prevText: resource.datePickerInfo.prevText,
            nextText: resource.datePickerInfo.nextText,
            currentText: resource.datePickerInfo.currentText,
            monthNames: resource.dateCultureInfo.monthNames,
            monthNamesShort: resource.dateCultureInfo.monthNamesShort,
            dayNames: resource.dateCultureInfo.dayNames,
            dayNamesShort: resource.dateCultureInfo.dayNamesShort,
            dayNamesMin: resource.dateCultureInfo.dayNamesMin,
            dateFormat: resource.datePickerInfo.datePickerFormat,
            minDate: 0,
            maxDate: '+3M',
        };
        $.datepicker.setDefaults($.datepicker.regional['vy']);
        $(obj).datepicker({
            showButtonPanel: true,
            firstDay: 1,
            minDate: new Date(),
            buttonImage: thisMy25AddBono.urlImageCalendar,
            showOn: "button",
            buttonImageOnly: true,
            dateFormat: 'DD dd MM yy',
            onSelect: function (selectedDate) {
                var idBeneficiary = $(this).data("beneficiary");
                var bene = thisMy25AddBono.FindBeneficiary(idBeneficiary);

                var day = $(this).datepicker('getDate').getDate();
                var month = $(this).datepicker('getDate').getMonth() + 1;
                var year = $(this).datepicker('getDate').getFullYear();
                var fullDate = month + "/" + day + "/" + year;

                bene.DateInitSelected = fullDate;
                thisMy25AddBono.ShowDateInit(idBeneficiary);
                $(thisMy25AddBono.labelDateInitOtherDateHiddenId + idBeneficiary).val(fullDate);
                //$('#btnAddBeneficies_btBuyMy25_DateInitOtherDate' + idBeneficiary).blur(SKYSALES.Util.validate(this));
            }
        });
        $.datepicker._gotoToday = function (id) {
            this._selectDate(id)
        }
    };

    thisMy25AddBono.ShowDateInit = function (idBeneficiary) {
        var bene = thisMy25AddBono.FindBeneficiary(idBeneficiary);
        if (bene != undefined) {
            var typeBono = thisMy25AddBono.FindTypeBono(bene.Type);
            var dateInitOtherDate = jQuery('#btnAddBeneficies_btBuyMy25_DateInitOtherDate' + idBeneficiary);
            var value = $(thisMy25AddBono.labelDateInitId + '[data-beneficiary="' + idBeneficiary + '"]:checked').attr("value");
            if (value == "2") {
                var fecha = new Date();
                if (bene.DateInitSelected != "")
                    fecha = new Date(bene.DateInitSelected);
                if (typeBono != undefined)
                    fecha.setMonth(fecha.getMonth() + Number(typeBono.AddTime));
                else
                    fecha.setMonth(fecha.getMonth() + 3);
                bene.DateAddMonths = thisMy25AddBono.ShowDateWithFormat(fecha, thisMy25AddBono.FormatDate);
                var dateFormated = thisMy25AddBono.labelDateInitBonoOption1Description.replace("{0}", bene.DateAddMonths);

                $(thisMy25AddBono.labelDateInitCaducityId + '[data-beneficiary="' + idBeneficiary + '"][value="1"]').addClass("hidden").css("display", "");
                $(thisMy25AddBono.labelDateInitCaducityId + '[data-beneficiary="' + idBeneficiary + '"][value="2"] strong').html(dateFormated);
                $(thisMy25AddBono.labelDateInitCaducityId + '[data-beneficiary="' + idBeneficiary + '"][value="2"]').removeClass("hidden").css("display", "block");
                $(thisMy25AddBono.labelDateInitOtherDateContentId + '[data-beneficiary="' + idBeneficiary + '"]').removeClass("hidden");
                SKYSALES.Util.setAttribute(dateInitOtherDate, 'required', 'true');
                SKYSALES.Util.setAttribute(dateInitOtherDate, 'requirederror', thisMy25AddBono.msgMy25ExpireDateRequired);
            } else {
                var fecha = new Date();
                if (typeBono != undefined)
                    fecha.setMonth(fecha.getMonth() + Number(typeBono.AddTime));
                else
                    fecha.setMonth(fecha.getMonth() + 3);
                bene.DateAddMonths = thisMy25AddBono.ShowDateWithFormat(fecha, thisMy25AddBono.FormatDate);

                $(thisMy25AddBono.labelDateInitCaducityId + '[data-beneficiary="' + idBeneficiary + '"][value="2"]').addClass("hidden").css("display", "");
                $(thisMy25AddBono.labelDateInitCaducityId + '[data-beneficiary="' + idBeneficiary + '"][value="1"] strong').html(thisMy25AddBono.labelDateInitBonoOption1Description.replace("{0}", bene.DateAddMonths));
                $(thisMy25AddBono.labelDateInitCaducityId + '[data-beneficiary="' + idBeneficiary + '"][value="1"]').removeClass("hidden").css("display", "block");
                $(thisMy25AddBono.labelDateInitOtherDateContentId + '[data-beneficiary="' + idBeneficiary + '"]').addClass("hidden");
                SKYSALES.Util.setAttribute(dateInitOtherDate, 'required', 'false');
            }
        }
    };

    thisMy25AddBono.AddEventForShowDatepicker = function (idBeneficiary) {
        $(thisMy25AddBono.dateInitId + idBeneficiary).click(function () {
            $(this).next().datepicker("show");
        });
    };

    thisMy25AddBono.FindBeneficiary = function (idBeneficiary) {
        var item = undefined;
        for (var i in thisMy25AddBono.Beneficiaries)
            if (thisMy25AddBono.Beneficiaries[i].NumBeneficiary == idBeneficiary) {
                item = thisMy25AddBono.Beneficiaries[i];
                break;
            }
        return item;
    };
    thisMy25AddBono.FindTypeBono = function (typology) {
        var item = undefined;
        for (var i in thisMy25AddBono.TypesBono)
            if (thisMy25AddBono.TypesBono[i].Typology == typology) {
                item = thisMy25AddBono.TypesBono[i];
                break;
            }
        return item;
    };
    thisMy25AddBono.replaceAll = function (text, replace, by) {
        while (text.indexOf(replace) >= 0)
            text = text.replace(replace, by);
        return text;
    };
    thisMy25AddBono.InputsRestrictKeydown = function (e) {
        var keyCode = ('which' in e) ? e.which : e.keyCode;
        return (keyCode != 35);
    };
    thisMy25AddBono.InputsRestrictChange = function (e) {
        $(this).val(thisMy25AddBono.replaceAll($(this).val(), "#", ""));
    };
    thisMy25AddBono.ShowDateWithFormat = function (date, format) {
        format = thisMy25AddBono.replaceAll(format, "MM", "mm");
        format = thisMy25AddBono.replaceAll(format, "yyyy", "yy");
        return $.datepicker.formatDate(format, date);
    };

    thisMy25AddBono.GetValidationOnBlurInstance = function () {
        var validationOnBlurInstances = VUELING.Util.getObjectInstanceAllStartWith("validateOnBlur");
        if (validationOnBlurInstances.length != 0)
            return validationOnBlurInstances[0];
        return null;
    };

    thisMy25AddBono.OnSubmitClick = function () {
        var validatorOnBlurInstance = thisMy25AddBono.GetValidationOnBlurInstance();
        var result = thisMy25AddBono.ValidateDateInputs(validatorOnBlurInstance);

        if (result) {
            result = thisMy25AddBono.ValidateDontRepeatBeneficiaryOnSubmitClick();
            if(!result)
                thisMy25AddBono.OpenMessage();
        }
        if (result) {
            return SKYSALES.Util.validate(this);
        }
        else {
            return false;
        }
    };

    thisMy25AddBono.ValidateDateInputs = function (validatorOnBlurInstance) {

        var arrayInputsToValidate = new Array();
        var result = true;
        for (var num = 0; num < thisMy25AddBono.Beneficiaries.length; num++) {
            var value = $(thisMy25AddBono.labelDateInitId + '[data-beneficiary="' + thisMy25AddBono.Beneficiaries[num].NumBeneficiary + '"]:checked').attr("value");
            if (value == "2") {
                var resultInputsFilter = "";

                for (var i = 0; i < arrayInputsToValidate.length; i++) {
                    if (i == 0) {
                        resultInputsFilter += "[id='" + arrayInputsToValidate[i] + "']";
                    }
                    else {
                        resultInputsFilter += "," + "[id='" + arrayInputsToValidate[i] + "']";
                    }
                }

                if (arrayInputsToValidate.length != 0)
                    validatorOnBlurInstance.inputs = thisMy25AddBono.whenSelectInitDateSelectedInputFilterToValidate += ":not(" + resultInputsFilter + ")";

                if ($(thisMy25AddBono.dateInitId + thisMy25AddBono.Beneficiaries[num].NumBeneficiary).val() == '') {
                    $(thisMy25AddBono.dateInitId + thisMy25AddBono.Beneficiaries[num].NumBeneficiary).blur(validatorOnBlurInstance.onBlurHandler);
                    $(thisMy25AddBono.dateInitId + thisMy25AddBono.Beneficiaries[num].NumBeneficiary).blur();
                    result = result && false;
                }
            }
            else {
                arrayInputsToValidate.push(thisMy25AddBono.dateInitId + thisMy25AddBono.Beneficiaries[num].NumBeneficiary);
            }
        }
        return result;
    }

    //Validamos que no se solapen los bonos para un mismo email de beneficiario
    thisMy25AddBono.ValidateAddBeneficiary = function (e) {
        var result = false;
        var id = $(e.currentTarget).data("beneficiary");
        var beneSelected = thisMy25AddBono.FindBeneficiary(id);
        if ($(thisMy25AddBono.idBeneficiesEmail + id).val().length > 0) {
            beneSelected.Email = $.trim($(thisMy25AddBono.idBeneficiesEmail + id).val());
            var showEmail = thisMy25AddBono.FindMessageShownForEmail(beneSelected.Email);
            if (showEmail) {
                //Seleccionamos todos los beneficiarios con el email seleccionado
                var ids = new Array();
                for (var i in thisMy25AddBono.Beneficiaries) {
                    var emailSelected = $(thisMy25AddBono.objectNameBeneficiesEmail + '[data-beneficiary=' + thisMy25AddBono.Beneficiaries[i].NumBeneficiary + ']').val();
                    if (emailSelected == beneSelected.Email && thisMy25AddBono.Beneficiaries[i].NumBeneficiary != beneSelected.NumBeneficiary)
                        ids.push(thisMy25AddBono.Beneficiaries[i].NumBeneficiary);
                }
                //Calculamos todos los Everywhere y no Everywhere excluyendo el actual beneficiario
                var typeEverywhere = 0;
                var typeNotEverywhere = 0;
                if (ids.length > 0)
                    for (var i in ids) {
                        var b = thisMy25AddBono.FindBeneficiary(ids[i]);
                        if (b.NumBeneficiary != id) {
                            if (thisMy25AddBono.overlaps.indexOf(b.Type) >= 0)
                                typeEverywhere++;
                            else
                                typeNotEverywhere++;
                        }
                    }
                //Verificamos si tenemos algún Everywhere para mostrar o no el popup
                if (thisMy25AddBono.overlaps.indexOf(beneSelected.Type) >= 0) {
                    if (typeNotEverywhere > 0 || typeEverywhere > 0)
                        result = true;
                } else {
                    if (typeEverywhere > 0)
                        result = true;
                }
            }

            if (result) {
                thisMy25AddBono.OpenMessage();
                //Añadimos el email al registro de popups mostrados
                thisMy25AddBono.emailsPopupShown.push(beneSelected.Email);
            }
        }
    };
    //validamos si ya se ha mostrado el popup al email seleccionado
    thisMy25AddBono.FindMessageShownForEmail = function (email) {
        var showEmail = true;
        for (var i = 0; i < thisMy25AddBono.emailsPopupShown.length; i++)
            if (thisMy25AddBono.emailsPopupShown[i] == email) {
                showEmail = false;
                break;
            }
        return showEmail;
    };
    //muestra popup de solapación
    thisMy25AddBono.OpenMessage = function () {
        thisMy25AddBono.blockUI.show(thisMy25AddBono.infoBoxId);
    };

    //Validamos que no se solapen los bonos para un mismo email de beneficiario
    thisMy25AddBono.ValidateAddBeneficiary = function (e) {
        var result = false;
        var id = $(e.currentTarget).data("beneficiary");
        var beneSelected = thisMy25AddBono.FindBeneficiary(id);
        if ($(thisMy25AddBono.idBeneficiesEmail + id).val().length > 0) {
            beneSelected.Email = $.trim($(thisMy25AddBono.idBeneficiesEmail + id).val());
            var showEmail = thisMy25AddBono.FindMessageShownForEmail(beneSelected.Email);
            if (showEmail) {
                //Seleccionamos todos los beneficiarios con el email seleccionado
                var ids = new Array();
                for (var i in thisMy25AddBono.Beneficiaries) {
                    var emailSelected = $(thisMy25AddBono.objectNameBeneficiesEmail + '[data-beneficiary=' + thisMy25AddBono.Beneficiaries[i].NumBeneficiary + ']').val();
                    if (emailSelected == beneSelected.Email && thisMy25AddBono.Beneficiaries[i].NumBeneficiary != beneSelected.NumBeneficiary)
                        ids.push(thisMy25AddBono.Beneficiaries[i].NumBeneficiary);
                }
                //Calculamos todos los Everywhere y no Everywhere excluyendo el actual beneficiario
                var typeEverywhere = 0;
                var typeNotEverywhere = 0;
                if (ids.length > 0)
                    for (var i in ids) {
                        var b = thisMy25AddBono.FindBeneficiary(ids[i]);
                        if (b.NumBeneficiary != id) {
                            if (thisMy25AddBono.overlaps.indexOf(b.Type) >= 0)
                                typeEverywhere++;
                            else
                                typeNotEverywhere++;
                        }
                    }
                //Verificamos si tenemos algún Everywhere para mostrar o no el popup
                if (thisMy25AddBono.overlaps.indexOf(beneSelected.Type) >= 0) {
                    if (typeNotEverywhere > 0 || typeEverywhere > 0)
                        result = true;
                } else {
                    if (typeEverywhere > 0)
                        result = true;
                }
            }

            if (result) {
                thisMy25AddBono.OpenMessage();
                //Añadimos el email al registro de popups mostrados
                thisMy25AddBono.emailsPopupShown.push(beneSelected.Email);
            }
        }
    };
    //validamos si ya se ha mostrado el popup al email seleccionado
    thisMy25AddBono.FindMessageShownForEmail = function (email) {
        var showEmail = true;
        for (var i = 0; i < thisMy25AddBono.emailsPopupShown.length; i++)
            if (thisMy25AddBono.emailsPopupShown[i] == email) {
                showEmail = false;
                break;
            }
        return showEmail;
    };
    //muestra popup de solapación
    thisMy25AddBono.OpenMessage = function () {
        thisMy25AddBono.blockUI.show(thisMy25AddBono.infoBoxId);
    };

    return thisMy25AddBono;
};