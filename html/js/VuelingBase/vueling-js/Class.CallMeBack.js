VUELING.Class.CallMeBack = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisCallMeBack = SKYSALES.Util.extendObject(parent);

    thisCallMeBack.ChatButtonID = '';
    thisCallMeBack.CallButtonID = '';
    thisCallMeBack.OcultLink = '';
    thisCallMeBack.TextBoxCallID_Name = '';
    thisCallMeBack.TextBoxCallID_Phone = '';
    thisCallMeBack.TextBoxCallID_Prefix = '';
    thisCallMeBack.CloseLinkID = '';
    thisCallMeBack.GeneralDivID = '';
    thisCallMeBack.FormDivID = '';
    thisCallMeBack.FormChatID = '';
    thisCallMeBack.FormCallID = '';
    thisCallMeBack.FormInCallID = '';
    thisCallMeBack.DotsLineID = '';
    thisCallMeBack.IsActive = false;
    thisCallMeBack.FlightCodes = [];
    thisCallMeBack.FlightDepartures = [];
    thisCallMeBack.FlightArrivals = [];
    thisCallMeBack.FlightDepartureDates = [];
    thisCallMeBack.FlightArrivalsDates = [];
    thisCallMeBack.IsMultiCity = false;
    thisCallMeBack.numPax = 0;
    thisCallMeBack.TypePax = [];
    thisCallMeBack.HasInfant = false;
    thisCallMeBack.language = '';
    thisCallMeBack.languageId = 0;
    thisCallMeBack.UrlSetCallMeBack = '';
    thisCallMeBack.UrlAnboto = '';
    thisCallMeBack.FareTypes = [];
    thisCallMeBack.AreConnection = [];
    thisCallMeBack.FarePrices = [];
    thisCallMeBack.CallBlockDiv = '';
    thisCallMeBack.timeout = 0;
    thisCallMeBack.validationLabelPrefix = '';
    thisCallMeBack.FormPhoneNum = '';


    thisCallMeBack.init = function (json) {
        this.setSettingsByObject(json);
        this.initforms();
        this.addEvents();
    };

    thisCallMeBack.addEvents = function () {
        $('#' + thisCallMeBack.ChatButtonID).click(thisCallMeBack.initChat);
        $('#' + thisCallMeBack.OcultLink).click(thisCallMeBack.OcultCallMeBack);
        $('#' + thisCallMeBack.CloseLinkID).click(thisCallMeBack.CloseCallMeBack);
    };

    thisCallMeBack.initChat = function () { };

    thisCallMeBack.initCall = function () {

        var PaxName = $('#' + thisCallMeBack.TextBoxCallID_Name).val();
        var prefix = $('#' + thisCallMeBack.TextBoxCallID_Prefix).val();
        var PhoneNum = $('#' + thisCallMeBack.TextBoxCallID_Phone).val();

        if (PaxName != '' && prefix != '' && PhoneNum != '') {
            $('#CallMeBackView_LinkButtonDiv').addClass('hidden');
            var jsonDatas = {
                FlightCodes: [],
                FlightDepartures: [],
                FlightArrivals: [],
                FlightDepartureDates: [],
                FlightArrivalsDates: [],
                IsMultiCity: false,
                numPax: 0,
                TypePax: [],
                HasInfant: false,
                language: '',
                PaxName: '',
                PhoneNum: '',
                FareTypes: [],
                AreConnection: [],
                PassengerInfos: [],
                FarePrices: []
            };

            for (var i in thisCallMeBack.FlightCodes) {

                var codeItem = thisCallMeBack.FlightCodes[i];
                jsonDatas.FlightCodes.push(codeItem);
            }

            for (var i in thisCallMeBack.FlightDepartures) {
                var departureItem = thisCallMeBack.FlightDepartures[i];
                jsonDatas.FlightDepartures.push(departureItem);
            }
            for (var i in thisCallMeBack.FlightArrivals) {
                var arrivalItem = thisCallMeBack.FlightArrivals[i];
                jsonDatas.FlightArrivals.push(arrivalItem);
            }
            for (var i in thisCallMeBack.FlightDepartureDates) {
                var departureDateItem = thisCallMeBack.FlightDepartureDates[i];
                jsonDatas.FlightDepartureDates.push(departureDateItem);
            }
            for (var i in thisCallMeBack.FlightArrivalsDates) {

                var arrivalDateItem = thisCallMeBack.FlightArrivalsDates[i];
                jsonDatas.FlightArrivalsDates.push(arrivalDateItem);
            }
            var isMultiCityItem = thisCallMeBack.IsMultiCity;
            jsonDatas.IsMultiCity = isMultiCityItem;

            var numPaxItem = thisCallMeBack.numPax;
            jsonDatas.numPax = numPaxItem;

            for (var i in thisCallMeBack.TypePax) {
                var typePaxItem = thisCallMeBack.TypePax[i];
                jsonDatas.TypePax.push(typePaxItem);
            }
            var hasInfantItem = thisCallMeBack.HasInfant;
            jsonDatas.HasInfant = hasInfantItem;

            var languageItem = thisCallMeBack.language;
            jsonDatas.language = languageItem;

            var paxNameItem = PaxName;
            jsonDatas.PaxName = paxNameItem;

            var phoneNumItem = prefix + PhoneNum;
            jsonDatas.PhoneNum = phoneNumItem;

            for (var i in thisCallMeBack.FareTypes) {
                var fareTypeItem = thisCallMeBack.FareTypes[i];
                jsonDatas.FareTypes.push(fareTypeItem);
            }

            for (var i in thisCallMeBack.AreConnection) {
                var connectionItem = thisCallMeBack.AreConnection[i];
                jsonDatas.AreConnection.push(connectionItem);
            }

            var paxInfo = thisCallMeBack.passengerInfo();

            for (var i in paxInfo) {
                var passengerInfoItem = paxInfo[i];
                jsonDatas.PassengerInfos.push(passengerInfoItem);
            }

            for (var i in thisCallMeBack.FarePrices) {
                var farePriceItem = thisCallMeBack.FarePrices[i];
                jsonDatas.FarePrices.push(farePriceItem);
            }

            var datas = JSON.stringify(jsonDatas);
            $.ajax({
                type: "POST",
                url: thisCallMeBack.UrlSetCallMeBack + "/SetCallMeBack",
                contentType: "application/json",
                data: datas,
                timeout:thisCallMeBack.timeout,
                dataType: "text",
                cache : false,
                success: function (data) {
                        $('#' + thisCallMeBack.FormCallID).addClass('hidden');
                        $('#' + thisCallMeBack.FormInCallID).removeClass('hidden');
                },
                error: function (a, b, c) {
                    $('#CallMeBackView_LinkButtonDiv').removeClass('hidden');
                }
        });
        }
    };

    thisCallMeBack.passengerInfo = function () {
        var paxName = Array();
        var paxLastName = Array();
        var infantName = Array();
        var infantLastName = Array();
        var paxInfo = Array();
        var j = 0;
        var textBoxPaxName = '';
        var textBoxPaxLastName = '';
        var textBoxInfantName = '';
        var textBoxInfantLastName = '';

        for (var i = 0; i < thisCallMeBack.numPax; i++) {
            textBoxPaxName = $('#ControlGroupMainContact_PassengerInputViewContactView_TextBoxFirstName_' + i).val();
            textBoxPaxLastName = $('#ControlGroupMainContact_PassengerInputViewContactView_TextBoxLastName_' + i).val();
            textBoxInfantName=$('#ControlGroupMainContact_PassengerInputViewContactView_TextBoxFirstName_' + j + '_' + j).val();
            textBoxInfantLastName = $('#ControlGroupMainContact_PassengerInputViewContactView_TextBoxLastName_' + j + '_' + j).val();

            if ((textBoxPaxName != "" && textBoxPaxLastName != "") && (textBoxPaxName != undefined && textBoxPaxLastName != undefined)) {
                paxName[i] = textBoxPaxName;
                paxLastName[i] = textBoxPaxLastName;
            }
            if (thisCallMeBack.HasInfant) {
                if ((textBoxInfantName != "" && textBoxInfantLastName != "") && (textBoxInfantName != undefined && textBoxInfantLastName != undefined)) {
                    infantName[j] = textBoxInfantName;
                    infantLastName[j] = textBoxInfantLastName;
                }
                j++;
            }
        }
        if (paxName.length > 0 && paxLastName.length > 0) {
            paxInfo[0] = paxName;
            paxInfo[1] = paxLastName;
               }
        if (infantName.length > 0 && infantLastName.length > 0) {
            paxInfo[2] = infantName;
            paxInfo[3] = infantLastName;

        }
        return paxInfo;
    };

    thisCallMeBack.initforms = function () {

        thisCallMeBack.IsPosibleCall();
        thisCallMeBack.IsPosibleChat();
    };

    thisCallMeBack.IsPosibleCall = function () {

        var ContactPhone = $('#ControlGroupMainContact_ControlGroupContactControls_ContactInputView_TextBoxHomePhone').val();

        if (ContactPhone != "" && ContactPhone != null) {
            $('#' + thisCallMeBack.TextBoxCallID_Phone).val(ContactPhone);
        }

        $.ajax({
            type: "GET",
            dataType: "text",
            timeout: thisCallMeBack.timeout,
            contentType: "application/json",
            url: thisCallMeBack.UrlSetCallMeBack + "/IsPosibleCallMeBack",
            cache : false,
            error: function (a, b, c) {
                $('#' + thisCallMeBack.CallBlockDiv).addClass('hidden');
                $('#' + thisCallMeBack.DotsLineID).addClass('hidden');
            },
            success: function (data) {
                if (data === "true") {
                    $('#' + thisCallMeBack.GeneralDivID).removeClass('hidden');
                    $('#' + thisCallMeBack.CallBlockDiv).removeClass('hidden');
                    $('#' + thisCallMeBack.DotsLineID).removeClass('hidden');
                }

            }
        });

    };

    thisCallMeBack.IsPosibleChat = function () {

        var url = thisCallMeBack.UrlAnboto + "&customer=chat&output=json&callback=?&charset=utf-8&action=HAY_AGENTES_DISPONIBLES&lang=" + thisCallMeBack.languageId;

        $.getJSON(url, function (data) {

            var dataResponse = data.response.value === 'YES';
                if (dataResponse) {
                    $('#' + thisCallMeBack.GeneralDivID).removeClass('hidden');
                    $('#' + thisCallMeBack.FormChatID).removeClass('hidden');
                    $('#' + thisCallMeBack.DotsLineID).removeClass('hidden');
                } else{
                    $('#' + thisCallMeBack.DotsLineID).addClass('hidden');
                }
            }
        );
    };

    thisCallMeBack.OcultCallMeBack = function () {

        $('#' + thisCallMeBack.FormDivID).toggleClass('hidden');
    };

    thisCallMeBack.CloseCallMeBack = function () {
        $('#' + thisCallMeBack.GeneralDivID).addClass('hidden');
    };

    thisCallMeBack.ValidatePrefix= function() {
        var prefix = $('#' + thisCallMeBack.TextBoxCallID_Prefix).val();
        if (/^\u002B{1}?[0-9]{1,3}$/.test(prefix)) {
            return true;
        }
        $('#' + thisCallMeBack.TextBoxCallID_Prefix).addClass('validationError');
        $('<p>').addClass('validationErrorDescription').text(thisCallMeBack.validationLabelPrefix).appendTo('#' + thisCallMeBack.FormPhoneNum);
        return false;
    }

    thisCallMeBack.OnfocusPrefix = function(element) {
        if (element.value == element.defaultValue) element.value = '';
    }

    thisCallMeBack.OnBlurPrefix = function(element) {
        if (element.value == '') element.value = element.defaultValue;
    }
    return thisCallMeBack;
};
