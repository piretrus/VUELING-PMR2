

VUELING.Class.PromoVYScheduleSelect = function (json) {
    json = json || {};
    var parent = new SKYSALES.Class.SkySales(),
        thisPromoVYScheduleSelect = SKYSALES.Util.extendObject(parent);

    thisPromoVYScheduleSelect.promoVYSystemError = "";
    thisPromoVYScheduleSelect.promoVYAllowed = "";
    thisPromoVYScheduleSelect.promoVYCode = "";
    thisPromoVYScheduleSelect.promoVYIsBonus = null;
    thisPromoVYScheduleSelect.OutboundSegmentStatus = null;
    thisPromoVYScheduleSelect.InboundSegmentStatus = null;
    thisPromoVYScheduleSelect.TravelType = null;
    thisPromoVYScheduleSelect.errorCodeResponse = "";
    thisPromoVYScheduleSelect.statusResponse = "";
    thisPromoVYScheduleSelect.promoVYMinPaxRestriction = "";
    thisPromoVYScheduleSelect.promoVYMaxPaxRestriction = "";
    thisPromoVYScheduleSelect.promoVYDeptDayRestriction = "";
    thisPromoVYScheduleSelect.promoVYDeptMonthRestriction = "";
    thisPromoVYScheduleSelect.promoVYReturnDayRestriction = "";
    thisPromoVYScheduleSelect.promoVYReturnMonthRestriction = "";
    thisPromoVYScheduleSelect.promoVYAdvancedDayRestriction = "";
    thisPromoVYScheduleSelect.promoVYAppliedMessage = "";
    thisPromoVYScheduleSelect.promoVYMy25AppliedMessage = null;
    thisPromoVYScheduleSelect.PromoCodeMY25AppliedSelectedFlightsMessage = null;
    thisPromoVYScheduleSelect.promoVYErrorMessagesArray = [];
    thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray = [];
    thisPromoVYScheduleSelect.promoVYverified = "";
    thisPromoVYScheduleSelect.promoVYunverified = "";
    thisPromoVYScheduleSelect.promoVYerror = "";
    thisPromoVYScheduleSelect.promoVYappliedSpan = "";
    thisPromoVYScheduleSelect.promoVYerrorSpan = "";
    thisPromoVYScheduleSelect.classShowInput = "";
    thisPromoVYScheduleSelect.buttonClass = "";
    thisPromoVYScheduleSelect.divToToggle = "";
    thisPromoVYScheduleSelect.nameSelectedFareInput0 = "";
    thisPromoVYScheduleSelect.nameSelectedFareInput1 = "";
    thisPromoVYScheduleSelect.promoVYMy25CodeItalySuffix = "";
    thisPromoVYScheduleSelect.promoVYMy25CodeSpainSuffix = "";
    thisPromoVYScheduleSelect.RefreshOnLoad = "true";
    thisPromoVYScheduleSelect.isValidMy25ForPassenger = "";

    thisPromoVYScheduleSelect.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisPromoVYScheduleSelect.initObject = function () {
        if (thisPromoVYScheduleSelect.RefreshOnLoad == "true")
        thisPromoVYScheduleSelect.promoVYScheduleSelectCallback();
    };

    thisPromoVYScheduleSelect.addEvents = function () {
        if (thisPromoVYScheduleSelect.classShowInput != "" && thisPromoVYScheduleSelect.divToToggle != "") {
            $('.' + thisPromoVYScheduleSelect.classShowInput).click(function (event) {
                event.preventDefault();
                if ($(this).hasClass('pulsado')) {
                    $('.' + thisPromoVYScheduleSelect.classShowInput).removeClass('pulsado');
                    $('.' + thisPromoVYScheduleSelect.divToToggle).hide();
                }
                else {
                    $('.' + thisPromoVYScheduleSelect.classShowInput).addClass('pulsado');
                    $('.' + thisPromoVYScheduleSelect.divToToggle).show();
                }
            });
        }

        if (thisPromoVYScheduleSelect.buttonClass != "") {
            $('.' + thisPromoVYScheduleSelect.buttonClass).click(function () { thisPromoVYScheduleSelect.isSelectedFare() });
        }
    };

    thisPromoVYScheduleSelect.isSelectedFare = function () {
        var availabilityInputObj = VUELING.Util.getObjectInstance('availabilityInput');
        if (availabilityInputObj != null) {
            var flightKey = new Array();
            flightKey[0] = availabilityInputObj.getAvailabilityTableSelectionValue('#availabilityTable0');
            flightKey[1] = availabilityInputObj.getAvailabilityTableSelectionValue('#availabilityTable1');

            if (flightKey[0] != undefined)
                $("input[name$='" + thisPromoVYScheduleSelect.nameSelectedFareInput0 + "']").val(flightKey[0]);

            if (flightKey[1] != undefined)
                $("input[name$='" + thisPromoVYScheduleSelect.nameSelectedFareInput1 + "']").val(flightKey[1]);
            }
    };

    thisPromoVYScheduleSelect.promoVYScheduleSelectCallback = function () {
        thisPromoVYScheduleSelect.promoVYScheduleSelectShow();
    };

    thisPromoVYScheduleSelect.promoVYScheduleSelectShow = function () {
        if (thisPromoVYScheduleSelect.promoVYIsBonus == "true") {
            thisPromoVYScheduleSelect.My25Show();
        }
        else {
            thisPromoVYScheduleSelect.promoVYShow();
        }
    };

    thisPromoVYScheduleSelect.promoVYShow = function () {
        if (thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'verified' || thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'unverified') {
            thisPromoVYScheduleSelect.validPromoVY();
        } else if (thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'notpromovy' || thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'erroneous') {
            thisPromoVYScheduleSelect.invalidPromoVY(thisPromoVYScheduleSelect.errorCodeResponse);
        } else {
            $('.' + thisPromoVYScheduleSelect.promoVYunverified).eq(1).show();
            $('.' + thisPromoVYScheduleSelect.promoVYverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYerror).hide();
        }
    };

    thisPromoVYScheduleSelect.update = function () {
        $.ajax({
            type: "GET",
            async: true,
            dataType: "json",
            url: "SearchPromoVYAjax-resource.aspx",
            success: function (data) {
                thisPromoVYScheduleSelect.promoVYAllowed = data.PromoVYAllowed;
                thisPromoVYScheduleSelect.promoVYCode = data.PromoVYCode;
                thisPromoVYScheduleSelect.promoVYIsBonus = data.promoVYIsBonus;
                thisPromoVYScheduleSelect.OutboundSegmentStatus = data.OutboundSegmentStatus;
                thisPromoVYScheduleSelect.InboundSegmentStatus = data.InboundSegmentStatus;
                thisPromoVYScheduleSelect.TravelType = data.TravelType;
                thisPromoVYScheduleSelect.errorCodeResponse = data.PromoVYResponse.ErrorCode;
                thisPromoVYScheduleSelect.statusResponse = data.PromoVYResponse.Status;
                thisPromoVYScheduleSelect.promoVYMinPaxRestriction = data.PromoVYRestrictions.PromoVYMinPax;
                thisPromoVYScheduleSelect.promoVYMaxPaxRestriction = data.PromoVYRestrictions.PromoVYMaxPax;
                thisPromoVYScheduleSelect.promoVYDeptDayRestriction = data.PromoVYRestrictions.PromoVYDeptDay;
                thisPromoVYScheduleSelect.promoVYDeptMonthRestriction = data.PromoVYRestrictions.PromoVYDeptMonth;
                thisPromoVYScheduleSelect.promoVYReturnDayRestriction = data.PromoVYRestrictions.PromoVYReturnDay;
                thisPromoVYScheduleSelect.promoVYReturnMonthRestriction = data.PromoVYRestrictions.PromoVYReturnMonth;
                thisPromoVYScheduleSelect.promoVYAdvancedDayRestriction = data.PromoVYRestrictions.PromoVYAdvancedDay;
                thisPromoVYScheduleSelect.promoVYScheduleSelectCallback();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    };

    thisPromoVYScheduleSelect.validPromoVY = function () {
        var message = "";
        message = thisPromoVYScheduleSelect.promoVYAppliedMessage.replace("{{PROMOCODE}}", thisPromoVYScheduleSelect.promoVYCode);

        $(".promoCode").addClass("styleBox_green");
        $(".promoCode").removeClass("styleBox_red");
        $(".promoCode").removeClass("styleBox_yellow");

        $('.' + thisPromoVYScheduleSelect.promoVYappliedSpan).html(message);
        $('.' + thisPromoVYScheduleSelect.promoVYunverified).hide();
        $('.' + thisPromoVYScheduleSelect.promoVYverified).show();
        $('.' + thisPromoVYScheduleSelect.promoVYerror).hide();
    };

    //Init messages My25//
    thisPromoVYScheduleSelect.My25Show = function () {
        if ((thisPromoVYScheduleSelect.errorCodeResponse.toLowerCase() != 'notalljourneysarevalid')
            && (thisPromoVYScheduleSelect.errorCodeResponse.toLowerCase() != 'invalidflightdate')
            && (thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'verified' || thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'unverified')
            && thisPromoVYScheduleSelect.isValidMy25ForPassenger !='false') {
            thisPromoVYScheduleSelect.validMy25();
        }
        else if (thisPromoVYScheduleSelect.errorCodeResponse.toLowerCase() == 'invalidflightdate') {
            thisPromoVYScheduleSelect.ErroneousMy25();
        }
        else if (thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'erroneous' || thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'notpromovy' || thisPromoVYScheduleSelect.isValidMy25ForPassenger=='false') {
            thisPromoVYScheduleSelect.ErroneousMy25();
        }
        else if (thisPromoVYScheduleSelect.statusResponse.toLowerCase() == 'unverifiedwithwarnings' || thisPromoVYScheduleSelect.errorCodeResponse.toLowerCase() == 'notalljourneysarevalid') {
            if (thisPromoVYScheduleSelect.TravelType == 'ONEWAYTRIP') {
                thisPromoVYScheduleSelect.ErroneousMy25();
            } else {
                thisPromoVYScheduleSelect.UnverifiedWithWarnigsMy25();
            }
        }
        else {
            $('.' + thisPromoVYScheduleSelect.promoVYunverified).eq(1).show();
            $('.' + thisPromoVYScheduleSelect.promoVYverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYerror).hide();
        }
    };

    thisPromoVYScheduleSelect.validMy25 = function () {

        var message = null;
        if (thisPromoVYScheduleSelect.IsAtLeastAFlightSelected()) {
            message = thisPromoVYScheduleSelect.PromoCodeMY25AppliedSelectedFlightsMessage;
        } else {
            message = thisPromoVYScheduleSelect.promoVYMy25AppliedMessage;
        }
        if (message != null)
            thisPromoVYScheduleSelect.pintMessageMy25(message, false, false);
    };

    thisPromoVYScheduleSelect.ErroneousMy25 = function () {
        var messageResult = null;
        var errorCode = null;
        if (thisPromoVYScheduleSelect.isValidMy25ForPassenger == 'false') {
            errorCode = "invalidPassengerName";
        } else {
        if (thisPromoVYScheduleSelect.TravelType == 'ONEWAYTRIP')
            errorCode = thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase();
        else
            errorCode = thisPromoVYScheduleSelect.errorCodeResponse.toLowerCase();
        }
        
        switch (errorCode) {
            case "invalidPassengerName":
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidMy25ForPassengerName;
                break;
            case "invalidreservedate":
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidReserveDate;
                break;
            case "invalidcode":
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidCode;
                break;
            case "invalidflightdate":
                if (thisPromoVYScheduleSelect.TravelType == 'ONEWAYTRIP')
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidFlightDateOW;
                else
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidFlightDate;
                break;
            case "invalidroute":
                if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeItalySuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteItaly;
                }
                else if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeSpainSuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteSpain;
                }
                break;
            case "validbasicandoptimafaretype":
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.ValidBasicAndOptimaFareTypeOther;
        };
        if (messageResult != null)
            thisPromoVYScheduleSelect.pintMessageMy25(messageResult, true, false);
    };

    thisPromoVYScheduleSelect.UnverifiedWithWarnigsMy25 = function () {
        var messageResult = null;
        if (thisPromoVYScheduleSelect.errorCodeResponse.toLowerCase() == 'notalljourneysarevalid') {
            if (thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase() == 'invalidroute' || thisPromoVYScheduleSelect.InboundSegmentStatus.toLowerCase() == 'invalidroute')
                messageResult = thisPromoVYScheduleSelect.getInvalidRoutesMessagesMy25();
            if (messageResult == null)
                if (thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase() == 'invalidflightdate' || thisPromoVYScheduleSelect.InboundSegmentStatus.toLowerCase() == 'invalidflightdate')
                    messageResult = thisPromoVYScheduleSelect.getDateMessagesMy25();
            if (messageResult == null)
                if (thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase() == 'invalidfare' || thisPromoVYScheduleSelect.InboundSegmentStatus.toLowerCase() == 'invalidfare')
                    messageResult = thisPromoVYScheduleSelect.getInvalidFaresMy25();
        }

        if (messageResult != null)
            thisPromoVYScheduleSelect.pintMessageMy25(messageResult, false, true);
    };

    thisPromoVYScheduleSelect.getDateMessagesMy25 = function () {
        var messageResult = null;
        if (thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase() == 'invalidflightdate')
            if (thisPromoVYScheduleSelect.TravelType.toLowerCase() == 'multicity') {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidFlightDateOutboundMulticity;
            }
            else {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidFlightDateOutbound;
            }
        if (thisPromoVYScheduleSelect.InboundSegmentStatus.toLowerCase() == 'invalidflightdate')
            if (thisPromoVYScheduleSelect.TravelType.toLowerCase() == 'multicity') {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidFlightDateInboundMulticity;
            }
            else {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidFlightDateInbound;
            }
        return messageResult;
    };

    thisPromoVYScheduleSelect.getInvalidRoutesMessagesMy25 = function () {
        var messageResult = null;
        if (thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase() == 'invalidroute') {
            if (thisPromoVYScheduleSelect.TravelType.toLowerCase() == 'multicity') {
                if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeItalySuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteItalyOutboundMulticity;
                }
                else if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeSpainSuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteSpainOutboundMulticity;
                }
            }
            else {
                if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeItalySuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteItaly;
                }
                else if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeSpainSuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteSpain;
                }
            }
        }
        else if (thisPromoVYScheduleSelect.InboundSegmentStatus.toLowerCase() == 'invalidroute') {
            if (thisPromoVYScheduleSelect.TravelType.toLowerCase() == 'multicity') {
                if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeItalySuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteItalyInboundMulticity;
                }
                else if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeSpainSuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteSpainInboundMulticity;
                }
            }
            else {
                if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeItalySuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteItaly;
                }
                else if (thisPromoVYScheduleSelect.promoVYCode.indexOf(thisPromoVYScheduleSelect.promoVYMy25CodeSpainSuffix) != -1) {
                    messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.InvalidRouteSpain;
                }
            }
        }
        return messageResult;
    };

    thisPromoVYScheduleSelect.getInvalidFaresMy25 = function () {
        var messageResult = null;
        if (thisPromoVYScheduleSelect.OutboundSegmentStatus.toLowerCase() == 'invalidfare') {
            if (thisPromoVYScheduleSelect.TravelType.toLowerCase() == 'multicity') {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.ValidBasicAndOptimaFareTypeOutboundMulticity;
            }
            else {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.ValidBasicAndOptimaFareTypeOutbound;
            }
        }
        else if (thisPromoVYScheduleSelect.InboundSegmentStatus.toLowerCase() == 'invalidfare') {
            if (thisPromoVYScheduleSelect.TravelType.toLowerCase() == 'multicity') {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.ValidBasicAndOptimaFareTypeInboundMulticity;
            }
            else {
                messageResult = thisPromoVYScheduleSelect.promoVYMy25ErrorMessagesArray.ValidBasicAndOptimaFareTypeInbound;
            }
        }
        return messageResult;
    };

    thisPromoVYScheduleSelect.pintMessageMy25 = function (message, isError, isWarning) {
        var messageResult = thisPromoVYScheduleSelect.MesageTextReplaceMy25(message);
        if (isError) {
            $(".promoCode").addClass("styleBox_red");
            $(".promoCode").removeClass("styleBox_yellow");
            $(".promoCode").removeClass("styleBox_green");

            $('[data-object="IconMy25"]').addClass("icoError_big");
            $('[data-object="IconMy25"]').removeClass("icoComment_big");

            $('.' + thisPromoVYScheduleSelect.promoVYerrorSpan).html(messageResult);
            $('.' + thisPromoVYScheduleSelect.promoVYunverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYerror).show();
        }
        else if (isWarning) {
            $(".promoCode").removeClass("styleBox_green");
            $(".promoCode").removeClass("styleBox_red");
            $(".promoCode").addClass("styleBox_yellow");

            $('[data-object="IconMy25"]').removeClass("icoError_big");
            $('[data-object="IconMy25"]').addClass("icoComment_big");

            $('.' + thisPromoVYScheduleSelect.promoVYerrorSpan).html(messageResult);
            $('.' + thisPromoVYScheduleSelect.promoVYunverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYerror).show();
        }
        else {
            $(".promoCode").addClass("styleBox_green");
            $(".promoCode").removeClass("styleBox_red");
            $(".promoCode").removeClass("styleBox_yellow");

            $('.' + thisPromoVYScheduleSelect.promoVYappliedSpan).html(messageResult);
            $('.' + thisPromoVYScheduleSelect.promoVYunverified).hide();
            $('.' + thisPromoVYScheduleSelect.promoVYverified).show();
            $('.' + thisPromoVYScheduleSelect.promoVYerror).hide();
        }

        //if (thisPromoVYScheduleSelect.RefreshOnLoad == "false") {
        //    $("." + thisPromoVYScheduleSelect.classShowInput).hide();
        //} else {
        //    $("." + thisPromoVYScheduleSelect.classShowInput).show();
        //}

    };

    thisPromoVYScheduleSelect.MesageTextReplaceMy25 = function (message) {
        if (message != null) {
            message = message.replace("{{PROMOCODE}}", thisPromoVYScheduleSelect.promoVYCode);
            message = message.replace("{{DEPTDAY}}", thisPromoVYScheduleSelect.promoVYDeptDayRestriction);
            message = message.replace("{{DEPTMONTH}}", thisPromoVYScheduleSelect.promoVYDeptMonthRestriction);
            message = message.replace("{{RETURNDAY}}", thisPromoVYScheduleSelect.promoVYReturnDayRestriction);
            message = message.replace("{{RETURNMONTH}}", thisPromoVYScheduleSelect.promoVYReturnMonthRestriction);
            message = message.replace("{{ADVANCEDAY}}", thisPromoVYScheduleSelect.promoVYAdvancedDayRestriction);
            message = message.replace("{{MINPAX}}", thisPromoVYScheduleSelect.promoVYMinPaxRestriction);
            message = message.replace("{{MAXPAX}}", thisPromoVYScheduleSelect.promoVYMaxPaxRestriction);
        }
        return message;
    };

    thisPromoVYScheduleSelect.invalidPromoVY = function (codeError) {
        var message = "";
        message = this.promoVYErrorMessagesArray[codeError];
        if (message != "" && message != undefined) {
            message = message.replace("{{PROMOCODE}}", thisPromoVYScheduleSelect.promoVYCode);
            message = message.replace("{{DEPTDAY}}", thisPromoVYScheduleSelect.promoVYDeptDayRestriction);
            message = message.replace("{{DEPTMONTH}}", thisPromoVYScheduleSelect.promoVYDeptMonthRestriction);
            message = message.replace("{{RETURNDAY}}", thisPromoVYScheduleSelect.promoVYReturnDayRestriction);
            message = message.replace("{{RETURNMONTH}}", thisPromoVYScheduleSelect.promoVYReturnMonthRestriction);
            message = message.replace("{{ADVANCEDAY}}", thisPromoVYScheduleSelect.promoVYAdvancedDayRestriction);
            message = message.replace("{{MINPAX}}", thisPromoVYScheduleSelect.promoVYMinPaxRestriction);
            message = message.replace("{{MAXPAX}}", thisPromoVYScheduleSelect.promoVYMaxPaxRestriction);
        } else {
            message = thisPromoVYScheduleSelect.promoVYSystemError;
        }
        $(".promoCode").addClass("styleBox_red");
        $(".promoCode").removeClass("styleBox_yellow");
        $(".promoCode").removeClass("styleBox_green");

        $('[data-object="IconMy25"]').addClass("icoError_big");
        $('[data-object="IconMy25"]').removeClass("icoComment_big");

        $('.' + thisPromoVYScheduleSelect.promoVYerrorSpan).html(message);
        $('.' + thisPromoVYScheduleSelect.promoVYunverified).hide();
        $('.' + thisPromoVYScheduleSelect.promoVYverified).hide();
        $('.' + thisPromoVYScheduleSelect.promoVYerror).show();
    };

    thisPromoVYScheduleSelect.IsAtLeastAFlightSelected = function () {
        var markets = $(".availabilityBody tbody tr td[class^='price'] input:checked");
        if (markets.length > 0) {
            return true;
        }
        return false;
    };

    return thisPromoVYScheduleSelect;
};