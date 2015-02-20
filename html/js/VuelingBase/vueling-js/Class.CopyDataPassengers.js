VUELING.Class.CopyDataPassengers = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisCopyDataPassengers = SKYSALES.Util.extendObject(parent);

    thisCopyDataPassengers.inputArrayFromName = null;
    thisCopyDataPassengers.inputArrayFromSurname = null;
    thisCopyDataPassengers.inputArrayFromFirstSurname = null;
    thisCopyDataPassengers.inputArrayFromSecondSurname = null;
    thisCopyDataPassengers.inputArrayFromEmail = null;
    thisCopyDataPassengers.selectArrayFromComAut = null;
    thisCopyDataPassengers.selectArrayFromResiMuniCode = null;
    thisCopyDataPassengers.inputArrayFromFamNumCert = null;
    thisCopyDataPassengers.inputArrayFromTitle = null;
    thisCopyDataPassengers.inputArrayOfCombos = null;

    thisCopyDataPassengers.firstNameTag = "";
    thisCopyDataPassengers.lastNameTag = "";    
    thisCopyDataPassengers.firstLastNameTag = "";
    thisCopyDataPassengers.secondLastNameTag = "";
    thisCopyDataPassengers.emailNameTag = "";
    thisCopyDataPassengers.comAutTag = "";
    thisCopyDataPassengers.resiMuniCodeTag = "";
    thisCopyDataPassengers.famNumCertTag = "";
    thisCopyDataPassengers.titleNameTag = "";

    thisCopyDataPassengers.inputToNameId = "";
    thisCopyDataPassengers.inputToSurNameId = "";
    thisCopyDataPassengers.inputToFirstSurNameId = "";
    thisCopyDataPassengers.inputToSecondSurNameId = "";
    thisCopyDataPassengers.inputEmailId = "";
    thisCopyDataPassengers.selectComAutId = "";
    thisCopyDataPassengers.selectResiMuniCodeId = "";
    thisCopyDataPassengers.inputFamNumCertId = "";
    thisCopyDataPassengers.inputToTitleId = "";

    thisCopyDataPassengers.inputToName = "";
    thisCopyDataPassengers.inputToSurName = "";
    thisCopyDataPassengers.inputToFirstSurName = "";
    thisCopyDataPassengers.inputToSecondSurName = "";
    thisCopyDataPassengers.inputEmail = "";
    thisCopyDataPassengers.selectToComAut = "",
    thisCopyDataPassengers.selectToResiMuniCode = "",
    thisCopyDataPassengers.inputToFamNumCert = "";
    thisCopyDataPassengers.radioToTitle= "";

    thisCopyDataPassengers.cmbPassengerId = "";
    thisCopyDataPassengers.idPassenger = "";
    thisCopyDataPassengers.chkPassengerId = "";
    thisCopyDataPassengers.copyText = "";
    thisCopyDataPassengers.cmbPassenger = null;
    thisCopyDataPassengers.chkPassenger = null;

    thisCopyDataPassengers.adultClass = "";
    thisCopyDataPassengers.childClass = "";
    thisCopyDataPassengers.infantClass = "";
    thisCopyDataPassengers.adultText = "";
    thisCopyDataPassengers.childText = "";
    thisCopyDataPassengers.infantText = "";

    thisCopyDataPassengers.isContact = false;           // Solo se permite la copia de adultos  
    thisCopyDataPassengers.copyEmail = true;
    thisCopyDataPassengers.isRES = false;
    thisCopyDataPassengers.tagRadioTitles = ""; 

    thisCopyDataPassengers.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.addEventsToPersonTypeRadios();
        if (this.isRES == true) {
            $(thisCopyDataPassengers.inputToSurName).parents("div:eq(1)").hide();
        }

        if (this.inputToName.val() == "" && (this.inputToSurName.val() == "" || (this.inputToFirstSurName.val() == ""
            && this.inputToSecondSurName.val() == "")) && this.inputEmail.val() == "") {
       if (this.isContact && (this.cmbPassenger != null && this.cmbPassenger.children().length > 1)) {
                this.cmbPassenger.val(1);
                this.CmbPassengerChange();
            } else if (this.isContact && (this.chkPassenger != null)) {
                this.chkPassenger.prop("checked", true);
                this.ChkPassengerClick();
            }
        }
    };

    thisCopyDataPassengers.setVars = function () {
        parent.setVars.call(this);
        this.inputToName =  $('#' + this.inputToNameId);
        this.inputToSurName = $('#' + this.inputToSurNameId);
        this.inputToFirstSurName = $('#' + this.inputToFirstSurNameId);
        this.inputToSecondSurName = $('#' + this.inputToSecondSurNameId);
        this.inputEmail = $('#' + this.inputEmailId);
        this.selectToComAut = $('#' + this.selectComAutId);
        this.selectToResiMuniCode = $('#' + this.selectResiMuniCodeId);
        this.inputToFamNumCert = $('#' + this.inputFamNumCertId);
        this.radioToTitle = $('[name="' + this.inputToTitleId + '"]');
        this.inputArrayOfCombos = $('.cmbCopy');

        if (this.cmbPassengerId != "") {
            this.cmbPassenger = $('#' + this.cmbPassengerId);
            this.fillCombo();
        }

        if (this.chkPassengerId != "") {
            this.chkPassenger = $('#' + this.chkPassengerId);
        }

        if (this.tagRadioTitles != "") {
            this.tagRadioTitles = $(this.tagRadioTitles);
        }
        
        var inputs = $(".txtEdit").find("input");
        this.inputArrayFromName = inputs.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.firstNameTag) != -1;
        });
        this.inputArrayFromSurname = inputs.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.lastNameTag) != -1;
        });
        this.inputArrayFromFirstSurname = inputs.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.firstLastNameTag) != -1;
        });
        this.inputArrayFromSecondSurname = inputs.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.secondLastNameTag) != -1;
        });
        if (this.copyEmail) {
            this.inputArrayFromEmail = inputs.filter(function () {
                return this.id.indexOf(thisCopyDataPassengers.emailNameTag) != -1;
            });
        }
        this.inputArrayFromFamNumCert = inputs.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.famNumCertTag) != -1;
        });

        var selects = $(".txtEdit").find("select");
        this.selectArrayFromResiMuniCode = selects.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.resiMuniCodeTag) != -1;
        });
        this.selectArrayFromComAut = selects.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.comAutTag) != -1;
        });
        SKYSALES.Util.setAttribute(this.inputToName, "nameorsurname", "true");
        SKYSALES.Util.setAttribute(this.inputToSurName, "nameorsurname", "true");
        this.inputArrayFromTitle = inputs.filter(function () {
            return this.id.indexOf(thisCopyDataPassengers.titleNameTag) != -1;
        });
        if (this.isRES == true) {
            SKYSALES.Util.setAttribute(this.inputToFirstSurName, "nameorsurname", "true");
            SKYSALES.Util.setAttribute(this.inputToSecondSurName, "nameorsurname", "true");
        }
    };

    thisCopyDataPassengers.fillCombo = function () {
        var paxes = null;
        var adultCount = $(".formPax." + this.adultClass).size();
        var childCount = $(".formPax." + this.childClass).size();
        var infantCount = $(".formPax." + this.infantClass).size();
        if (!this.isContact) {
            paxes = $(".formPax");
        } else {
            paxes = $("." + this.adultClass);
        }

        for (var i = 0; i < paxes.length; i++) {
            if ((i + 1) != thisCopyDataPassengers.idPassenger) {
                var paxText = "";
                var paxCssClass = $(paxes[i]).attr("class");
                if (paxCssClass.indexOf(this.childClass) > -1) {
                    paxText = this.childText + " " + ((i - adultCount) + 1);
                } else if (paxCssClass.indexOf(this.infantClass) > -1) {
                    paxText = this.infantText + " " + ((i - (adultCount + childCount)) + 1);
                } else {
                    paxText = this.adultText + " " + (i + 1);
                }

                this.cmbPassenger.append($("<option/>", {
                    value: i + 1,
                    text: paxText
                }));
            }
        }
    };

    thisCopyDataPassengers.addEvents = function () {
        if(thisCopyDataPassengers.cmbPassenger != null)
            thisCopyDataPassengers.cmbPassenger.on("change", thisCopyDataPassengers.CmbPassengerChange);
        if (thisCopyDataPassengers.cmbPassenger != null)
            thisCopyDataPassengers.cmbPassenger.on("focus", thisCopyDataPassengers.CmbPassengerFocus);
        if (thisCopyDataPassengers.chkPassenger != null)
            thisCopyDataPassengers.chkPassenger.on("click", thisCopyDataPassengers.ChkPassengerClick);

        if (this.isRES == true) {
            if (thisCopyDataPassengers.inputToFirstSurName != null) {
                thisCopyDataPassengers.inputToFirstSurName.on("keyup." + thisCopyDataPassengers.idPassenger, function () {
                    thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
                });
                thisCopyDataPassengers.inputToFirstSurName.on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
                    thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
                });
            }

            if (thisCopyDataPassengers.inputToSecondSurName != null) {
                thisCopyDataPassengers.inputToSecondSurName.on("keyup." + thisCopyDataPassengers.idPassenger, function () {
                    thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
                });
                thisCopyDataPassengers.inputToSecondSurName.on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
                    thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
                });
            }
        }
    };

    thisCopyDataPassengers.CmbPassengerChange = function (e) {
        var index = parseInt(thisCopyDataPassengers.cmbPassenger.val());
        thisCopyDataPassengers.diableEvents();
        if (index > 0) {
            thisCopyDataPassengers.SetCopyEvents(this, index);
        }
    };
    
    thisCopyDataPassengers.CmbPassengerFocus = function (e) {
        this.selectedIndex = -1;
    };
    
    thisCopyDataPassengers.ChkPassengerClick = function (e) {
        var checked = thisCopyDataPassengers.chkPassenger.is(":checked");
        thisCopyDataPassengers.diableEvents();
        if (checked) {
            thisCopyDataPassengers.SetCopyEvents(this, 1);
        };
    };

    thisCopyDataPassengers.addEventsToPersonTypeRadios = function (e) {
            $('.personTypeId').change(function(item) {
                var blockId = $(item.currentTarget).attr('datablock');
                var value = $(item.currentTarget).val();
                thisCopyDataPassengers.RemoveChangeEvents();
                shouldUpdateRadioBlock(blockId, value);
                thisCopyDataPassengers.addEventsToPersonTypeRadios();
            });
    };
 
    thisCopyDataPassengers.RemoveChangeEvents = function (e) {
        $('.personTypeId').off("change");
    };

    function shouldUpdateRadioBlock(indexArrayChanged, radioSelectedValue) {
        var arrayOfCombos = thisCopyDataPassengers.inputArrayOfCombos;
        
        if (arrayOfCombos.length == 1) {
            if (thisCopyDataPassengers.chkPassenger != null) {
                if (thisCopyDataPassengers.chkPassenger.is(":checked")) {
                    updateRadios(radioSelectedValue, indexArrayChanged);
                }
            }
        } else {
            for (var i = 0; i < arrayOfCombos.length; i++) {
                if ($(arrayOfCombos[i]).val() == indexArrayChanged) {
                    var arrayToChangeIndex = i + 1;
                    updateRadios(radioSelectedValue, arrayToChangeIndex);
                    shouldUpdateRadioBlock(i + 2, radioSelectedValue);
                }
            }
        }
    };

    function updateRadios(radioSelectedValue, blockOfRadiosToChange) {
        var tag = thisCopyDataPassengers.tagRadioTitles.selector + blockOfRadiosToChange;
        var arrayFrom = $('[name="' + tag + '"]');
        $(arrayFrom).filter('[value=' + radioSelectedValue + ']').attr('checked', 'checked');
        $(arrayFrom).blur();
       
    }
    
    thisCopyDataPassengers.SetCopyEvents = function (e, index) {
        //FirstNameCopy
        if ($(thisCopyDataPassengers.inputArrayFromName[index - 1]))
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToName, $(thisCopyDataPassengers.inputArrayFromName[index - 1]).val());
        thisCopyDataPassengers.inputToName.data("eventIndex", index - 1);
        $(thisCopyDataPassengers.inputArrayFromName[index - 1]).on("keyup." + thisCopyDataPassengers.idPassenger, function () {
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToName, this.value);
        });
        $(thisCopyDataPassengers.inputArrayFromName[index - 1]).on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToName, this.value);
        });
        thisCopyDataPassengers.inputToName.on("keydown." + thisCopyDataPassengers.idPassenger, thisCopyDataPassengers.InputPassengerChange);

        if (this.isRES == true) {

            //FirstLastNameCopy
            if ($(thisCopyDataPassengers.inputArrayFromFirstSurname[index - 1]))
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToFirstSurName, $(thisCopyDataPassengers.inputArrayFromFirstSurname[index - 1]).val());
            thisCopyDataPassengers.inputToFirstSurName.data("eventIndex", index - 1);
            $(thisCopyDataPassengers.inputArrayFromFirstSurname[index - 1]).on("keyup." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToFirstSurName, this.value);
                thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
            });
            $(thisCopyDataPassengers.inputArrayFromFirstSurname[index - 1]).on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToFirstSurName, this.value);
                thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
            });
            thisCopyDataPassengers.inputToFirstSurName.on("keydown." + thisCopyDataPassengers.idPassenger, thisCopyDataPassengers.InputPassengerChange);

            //SecondLastNameCopy           
            if ($(thisCopyDataPassengers.inputArrayFromSecondSurname[index - 1]))
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToSecondSurName, $(thisCopyDataPassengers.inputArrayFromSecondSurname[index - 1]).val());
            thisCopyDataPassengers.inputToSecondSurName.data("eventIndex", index - 1);
            $(thisCopyDataPassengers.inputArrayFromSecondSurname[index - 1]).on("keyup." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToSecondSurName, this.value);
                thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
            });
            $(thisCopyDataPassengers.inputArrayFromSecondSurname[index - 1]).on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToSecondSurName, this.value);
                thisCopyDataPassengers.BuildSurnames(thisCopyDataPassengers.inputToFirstSurName, thisCopyDataPassengers.inputToSecondSurName, thisCopyDataPassengers.inputToSurName);
            });
            thisCopyDataPassengers.inputToSecondSurName.on("keydown." + thisCopyDataPassengers.idPassenger, thisCopyDataPassengers.InputPassengerChange);
        }
        else {
            //LastNameCopy
            if ($(thisCopyDataPassengers.inputArrayFromSurname[index - 1]))
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToSurName, $(thisCopyDataPassengers.inputArrayFromSurname[index - 1]).val());
            thisCopyDataPassengers.inputToSurName.data("eventIndex", index - 1);
            $(thisCopyDataPassengers.inputArrayFromSurname[index - 1]).on("keyup." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToSurName, this.value);
            });
            $(thisCopyDataPassengers.inputArrayFromSurname[index - 1]).on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToSurName, this.value);
            });
            thisCopyDataPassengers.inputToSurName.on("keydown." + thisCopyDataPassengers.idPassenger, thisCopyDataPassengers.InputPassengerChange);
        }

        //EmailCopy
        if (thisCopyDataPassengers.copyEmail) {
            if ($(thisCopyDataPassengers.inputArrayFromEmail[index - 1]))
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputEmail, $(thisCopyDataPassengers.inputArrayFromEmail[index - 1]).val());
            thisCopyDataPassengers.inputEmail.data("eventIndex", index - 1);
            $(thisCopyDataPassengers.inputArrayFromEmail[index - 1]).on("keyup." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputEmail, this.value);
            });
            $(thisCopyDataPassengers.inputArrayFromEmail[index - 1]).on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
                thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputEmail, this.value);
            });
            thisCopyDataPassengers.inputEmail.on("keydown." + thisCopyDataPassengers.idPassenger, thisCopyDataPassengers.InputPassengerChange);
        }

        //FamNumCert
        if ($(thisCopyDataPassengers.inputArrayFromFamNumCert[index - 1]))
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToFamNumCert, $(thisCopyDataPassengers.inputArrayFromFamNumCert[index - 1]).val());
        thisCopyDataPassengers.inputToFamNumCert.data("eventIndex", index - 1);
        $(thisCopyDataPassengers.inputArrayFromFamNumCert[index - 1]).on("keyup." + thisCopyDataPassengers.idPassenger, function () {
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToFamNumCert, this.value);
        });
        $(thisCopyDataPassengers.inputArrayFromFamNumCert[index - 1]).on("change.autocomplete." + thisCopyDataPassengers.idPassenger, function () {
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.inputToFamNumCert, this.value);
        });
        thisCopyDataPassengers.inputToFamNumCert.on("keydown." + thisCopyDataPassengers.idPassenger, thisCopyDataPassengers.InputPassengerChange);

        //Comunidad Autonoma
        if ($(thisCopyDataPassengers.selectArrayFromComAut[index - 1]))
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.selectToComAut, $(thisCopyDataPassengers.selectArrayFromComAut[index - 1]).val());
        $(this.selectToComAut).on("focus", function () {
            thisCopyDataPassengers.InputPassengerChange();
        });
        $(this.selectArrayFromComAut[index - 1]).on("change", function () {
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.selectToComAut, $(thisCopyDataPassengers.selectArrayFromComAut[index - 1]).val());
        });

        //Municipio
        if ($(thisCopyDataPassengers.selectArrayFromResiMuniCode[index - 1]))
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.selectToResiMuniCode, $(thisCopyDataPassengers.selectArrayFromResiMuniCode[index - 1]).val());
        $(this.selectToResiMuniCode).on("focus", function () {
            thisCopyDataPassengers.InputPassengerChange();
        });
        $(this.selectArrayFromResiMuniCode[index - 1]).on("change", function () {
            thisCopyDataPassengers.CopyDataPassenger(thisCopyDataPassengers.selectToResiMuniCode, $(thisCopyDataPassengers.selectArrayFromResiMuniCode[index - 1]).val());
        });
        
        //TitleRadioCopy 
        var posielement = index - 1;
        var tag = thisCopyDataPassengers.tagRadioTitles.selector + posielement;
        var arrayFrom = $('[name="' + tag + '"]');
        var elemetSelected = arrayFrom.filter(':checked').val();
        thisCopyDataPassengers.RemoveChangeEvents();
        if (elemetSelected != null) {
            thisCopyDataPassengers.radioToTitle.filter('[value=' + elemetSelected + ']').attr('checked', 'checked');
            thisCopyDataPassengers.radioToTitle.filter(':checked').change();
        } else {
            thisCopyDataPassengers.radioToTitle.filter(':checked').attr('checked', false);
        }
        thisCopyDataPassengers.radioToTitle.blur();
        thisCopyDataPassengers.addEventsToPersonTypeRadios();
        
    };

    thisCopyDataPassengers.BuildSurnames = function (firstLastName, secondLastName, surNames) {
        var inputBuilded = $(firstLastName).val() + ' ' + $(secondLastName).val();
        surNames.val(inputBuilded);
    };

    thisCopyDataPassengers.CopyDataPassenger = function (destination, textObj) {
        destination.val(textObj);
        textObj != "" ? destination.change() : this.updateClassValidation(destination);
    };

    thisCopyDataPassengers.InputPassengerChange = function (e) {

        if (thisCopyDataPassengers.cmbPassenger != null) {
            thisCopyDataPassengers.diableEvents();
            thisCopyDataPassengers.cmbPassenger.val('0');
            $('.cmbCopy').each(function () {
                if (this.selectedIndex == thisCopyDataPassengers.idPassenger)
                    this.selectedIndex = 0;
            });
        }
        else
        {
            thisCopyDataPassengers.diableEvents();
            thisCopyDataPassengers.chkPassenger.attr('checked', false);
        }
    };

    thisCopyDataPassengers.diableEvents = function (e) {
        var firstNameIndex = thisCopyDataPassengers.inputToName.data("eventIndex");
        if (firstNameIndex !== undefined) {
            $(thisCopyDataPassengers.inputArrayFromName[firstNameIndex]).off("keyup." + thisCopyDataPassengers.idPassenger);
            $(thisCopyDataPassengers.inputArrayFromName[firstNameIndex]).off("change.autocomplete." + thisCopyDataPassengers.idPassenger);
            thisCopyDataPassengers.inputToName.off("keydown." + thisCopyDataPassengers.idPassenger);
        }

        var lastNameIndex = thisCopyDataPassengers.inputToSurName.data("eventIndex");
        if (lastNameIndex !== undefined) {
            $(thisCopyDataPassengers.inputArrayFromSurname[lastNameIndex]).off("keyup." + thisCopyDataPassengers.idPassenger);
            $(thisCopyDataPassengers.inputArrayFromSurname[lastNameIndex]).off("change.autocomplete." + thisCopyDataPassengers.idPassenger);
            thisCopyDataPassengers.inputToSurName.off("keydown." + thisCopyDataPassengers.idPassenger);
        }

        var firstLastNameIndex = thisCopyDataPassengers.inputToFirstSurName.data("eventIndex");
        if (firstLastNameIndex !== undefined) {
            $(thisCopyDataPassengers.inputArrayFromFirstSurname[firstLastNameIndex]).off("keyup." + thisCopyDataPassengers.idPassenger);
            $(thisCopyDataPassengers.inputArrayFromFirstSurname[firstLastNameIndex]).off("change.autocomplete." + thisCopyDataPassengers.idPassenger);
            thisCopyDataPassengers.inputToFirstSurName.off("keydown." + thisCopyDataPassengers.idPassenger);
        }

        var secondLastNameIndex = thisCopyDataPassengers.inputToSecondSurName.data("eventIndex");
        if (secondLastNameIndex !== undefined) {
            $(thisCopyDataPassengers.inputArrayFromSecondSurname[secondLastNameIndex]).off("keyup." + thisCopyDataPassengers.idPassenger);
            $(thisCopyDataPassengers.inputArrayFromSecondSurname[secondLastNameIndex]).off("change.autocomplete." + thisCopyDataPassengers.idPassenger);
            thisCopyDataPassengers.inputToSecondSurName.off("keydown." + thisCopyDataPassengers.idPassenger);
        }

        if (thisCopyDataPassengers.copyEmail) {
            var emailIndex = thisCopyDataPassengers.inputEmail.data("eventIndex");
            if (emailIndex !== undefined) {
                $(thisCopyDataPassengers.inputArrayFromEmail[emailIndex]).off("keyup." + thisCopyDataPassengers.idPassenger);
                $(thisCopyDataPassengers.inputArrayFromEmail[emailIndex]).off("change.autocomplete." + thisCopyDataPassengers.idPassenger);
                thisCopyDataPassengers.inputEmail.off("keydown." + thisCopyDataPassengers.idPassenger);
            }
        }

        var famNumCertIndex = thisCopyDataPassengers.inputToFamNumCert.data("eventIndex");
        if (famNumCertIndex !== undefined) {
            $(thisCopyDataPassengers.inputArrayFromFamNumCert[famNumCertIndex]).off("keyup." + thisCopyDataPassengers.idPassenger);
            $(thisCopyDataPassengers.inputArrayFromFamNumCert[famNumCertIndex]).off("change.autocomplete." + thisCopyDataPassengers.idPassenger);
            thisCopyDataPassengers.inputToFamNumCert.off("keydown." + thisCopyDataPassengers.idPassenger);
        }

        var comAutIndex = thisCopyDataPassengers.selectToComAut.data("eventIndex");
        if (comAutIndex !== undefined) {
            $(thisCopyDataPassengers.selectToComAut).off("focus");
            $(this.selectArrayFromComAut[comAutIndex - 1]).off("change");
        }

        var resiMuniCodeIndex = thisCopyDataPassengers.selectToResiMuniCode.data("eventIndex");
        if (resiMuniCodeIndex !== undefined) {
            $(thisCopyDataPassengers.selectToResiMuniCode).off("focus");
            $(this.selectArrayFromResiMuniCode[resiMuniCodeIndex - 1]).off("change");
        }
    };

    thisCopyDataPassengers.updateClassValidation = function (element) {
        if (element[0]) {
            // elimino los iconos de Check
            thisCopyDataPassengers.removeStyles(element[0].parentElement, "check--OK");
            thisCopyDataPassengers.removeStyles(element[0].parentElement, "check--FAIL");
            // elimino el borde rojo del textBox 
            thisCopyDataPassengers.removeStyles(element[0], "validationError");
            //elimina el texto de Error
            if (element[0].parentElement.children[1] != undefined) {
                element[0].parentElement.children[1].outerText = "";
            }
            // elimina el estilo de error del label
            thisCopyDataPassengers.removeStyles(element[0].parentElement.parentElement.parentElement.children[0], "validationErrorLabel");
        }
    };

    thisCopyDataPassengers.removeStyles = function (element, withoutstyle) {
        if (element.classList && element.classList.contains(withoutstyle))
            element.classList.remove(withoutstyle);
    };

    return thisCopyDataPassengers;
};