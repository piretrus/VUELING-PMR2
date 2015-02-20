
VUELING.Class.My25C3Messages = function () {
    var parent = SKYSALES.Class.SkySales(),
       thisMy25C3Messages = SKYSALES.Util.extendObject(parent);

    thisMy25C3Messages.UrlUpdateMessages = '';
    thisMy25C3Messages.MessageSpanId = '';
    thisMy25C3Messages.MessageSpan = null;
    thisMy25C3Messages.MessageApplyCorrectlyRT = '';
    thisMy25C3Messages.MessageApplyCorrectlyOW = '';
    thisMy25C3Messages.ChangeOneJourneyAndNoApply = '';
    thisMy25C3Messages.ChangeTwoJourneysAndNoApplyOutbound = '';
    thisMy25C3Messages.ChangeTwoJourneysAndNoApplyInbound = '';
    thisMy25C3Messages.ChangeTwoJourneysAndNoApplyFirstJourneyMC = '';
    thisMy25C3Messages.ChangeTwoJourneysAndNoApplySecondJourneyMC = '';
    thisMy25C3Messages.CanChangeBonoRT = '';
    thisMy25C3Messages.CanChangeBonoOW = '';
    thisMy25C3Messages.IsChangingFirstJourney = '';
    thisMy25C3Messages.IsChangingLastJourney = '';
    thisMy25C3Messages.IsOneWayBooking = '';
    thisMy25C3Messages.IsBookingMulticiCity = '';
    thisMy25C3Messages.JourneysAffectedByMy25 = '';
    thisMy25C3Messages.IsValidForMy25NewOutboundDate = '';
    thisMy25C3Messages.IsValidForMy25NewInboundDate = '';
    thisMy25C3Messages.My25BonoCode = '';
    thisMy25C3Messages.divToToggle = '';
    thisMy25C3Messages.classShowInput = '';
    thisMy25C3Messages.ChangeBonoId = '';
    thisMy25C3Messages.ChangeBono = null;
    thisMy25C3Messages.BoxBorderId = '';
    thisMy25C3Messages.BoxBorder = null;
    thisMy25C3Messages.ContainerMessageId = '';
    thisMy25C3Messages.ContainerMessage = null;


    thisMy25C3Messages.init = function (json) {
        this.setSettingsByObject(json);
        thisMy25C3Messages.MessageSpan = $('.' + thisMy25C3Messages.MessageSpanId);
        thisMy25C3Messages.ChangeBono = $('.' + thisMy25C3Messages.ChangeBonoId);
        thisMy25C3Messages.BoxBorder = $('.' + thisMy25C3Messages.BoxBorderId);
        thisMy25C3Messages.ContainerMessage = $('.' + thisMy25C3Messages.ContainerMessageId);
        this.addEvents();
    };

    thisMy25C3Messages.addEvents = function () {
        if (thisMy25C3Messages.classShowInput != "" && thisMy25C3Messages.divToToggle != "") {
            $('.' + thisMy25C3Messages.classShowInput).click(function (event) {
                event.preventDefault();
                if ($(this).hasClass('pulsado')) {
                    $('.' + thisMy25C3Messages.classShowInput).removeClass('pulsado');
                    $('.' + thisMy25C3Messages.divToToggle).hide();
                }
                else {
                    $('.' + thisMy25C3Messages.classShowInput).addClass('pulsado');
                    $('.' + thisMy25C3Messages.divToToggle).show();
                }
            });
        }
    };

    thisMy25C3Messages.update = function () {
        $.ajax({
            type: "GET",
            async: true,
            dataType: "json",
            url: thisMy25C3Messages.UrlUpdateMessages,
            success: function (data) {
                thisMy25C3Messages.IsChangingFirstJourney = data.IsChangingFirstJourney;
                thisMy25C3Messages.IsChangingLastJourney = data.IsChangingLastJourney;
                thisMy25C3Messages.IsOneWayBooking = data.IsOneWayBooking;
                thisMy25C3Messages.IsBookingMulticiCity = data.IsBookingMulticiCity;
                thisMy25C3Messages.JourneysAffectedByMy25 = data.JourneysAffectedByMy25;
                thisMy25C3Messages.IsValidForMy25NewOutboundDate = data.IsValidForMy25NewOutboundDate;
                thisMy25C3Messages.IsValidForMy25NewInboundDate = data.IsValidForMy25NewInboundDate;
                thisMy25C3Messages.My25BonoCode = data.My25BonoCode;
                thisMy25C3Messages.MessageApplyCorrectlyRT = thisMy25C3Messages.MessageApplyCorrectlyRT.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.MessageApplyCorrectlyOW = thisMy25C3Messages.MessageApplyCorrectlyOW.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.ChangeOneJourneyAndNoApply = thisMy25C3Messages.ChangeOneJourneyAndNoApply.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.ChangeTwoJourneysAndNoApplyOutbound = thisMy25C3Messages.ChangeTwoJourneysAndNoApplyOutbound.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.ChangeTwoJourneysAndNoApplyInbound = thisMy25C3Messages.ChangeTwoJourneysAndNoApplyInbound.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.ChangeTwoJourneysAndNoApplyFirstJourneyMC = thisMy25C3Messages.ChangeTwoJourneysAndNoApplyFirstJourneyMC.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.ChangeTwoJourneysAndNoApplySecondJourneyMC = thisMy25C3Messages.ChangeTwoJourneysAndNoApplySecondJourneyMC.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.CanChangeBonoRT = thisMy25C3Messages.CanChangeBonoRT.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.CanChangeBonoOW = thisMy25C3Messages.CanChangeBonoOW.replace('{{BONOCODE}}', thisMy25C3Messages.My25BonoCode);
                thisMy25C3Messages.updateCallback();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    };

    thisMy25C3Messages.updateCallback = function () {
        if (thisMy25C3Messages.IsOneWayBooking == 'true') {
            if (thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'true') {
                thisMy25C3Messages.showBonoApplyed();
            } else {
                thisMy25C3Messages.showCanChangeBono();
            }
        } else {
            //Los dos primeros casos son comunes, si se cambia toda la reserva y aplica el bono a toda o no aplica
            if (thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsChangingLastJourney == 'true'
                    && thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'true' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'true') {
                thisMy25C3Messages.showBonoApplyed();
            } else if (thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsChangingLastJourney == 'true'
                && thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'false' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'false') {
                thisMy25C3Messages.showCanChangeBono();
            } else {
                //El bono My25 anterior aplicaba a toda la reserva
                if (thisMy25C3Messages.JourneysAffectedByMy25 == 'Both') {
                    //se cambia solo el primero y aplica correctamente
                    if (thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsChangingLastJourney == 'false' 
                        && thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'true') {
                        thisMy25C3Messages.showBonoApplyed();
                    } else if (thisMy25C3Messages.IsChangingFirstJourney == 'false' && thisMy25C3Messages.IsChangingLastJourney == 'true' 
                        && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'true') {
                        // se cambia el segunda y aplica correctamente
                        thisMy25C3Messages.showBonoApplyed();
                    } else {
                        // se cambia uno de los dos y no aplica sobre ese cambio
                        if ((thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsChangingLastJourney == 'false'
                                && thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'false')
                            ||
                            (thisMy25C3Messages.IsChangingFirstJourney == 'false' && thisMy25C3Messages.IsChangingLastJourney == 'true'
                                && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'false')) {
                            thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeOneJourneyAndNoApply);
                        } else if (thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsChangingLastJourney == 'true') {
                            if (thisMy25C3Messages.IsBookingMulticiCity = 'false') {
                                //se cambian los dos y no aplica a la ida
                                if (thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'false' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'true') {
                                    thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeTwoJourneysAndNoApplyOutbound);
                                } else if (thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'true' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'false') {
                                    //se cambian los dos y no aplica a la vuelta
                                    thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeTwoJourneysAndNoApplyInbound);
                                }
                            } else {
                                //Solo aplica al segundo journey
                                if (thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'false' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'true') {
                                    thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeTwoJourneysAndNoApplySecondJourneyMC);
                                } else if (thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'true' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'false') {
                                    //solo aplica al primer journey
                                    thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeTwoJourneysAndNoApplyFirstJourneyMC);
                                }
                            }
                        }
                    }
                } else if (thisMy25C3Messages.JourneysAffectedByMy25 == 'Outbound') {
                    //El bono My25 anterior aplicaba solo a la ida
                    if (thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'true') {
                        thisMy25C3Messages.showBonoApplyed();
                    } else if (thisMy25C3Messages.IsChangingFirstJourney == 'true' && thisMy25C3Messages.IsValidForMy25NewOutboundDate == 'false') {
                        thisMy25C3Messages.showCanChangeBono();
                    } else {
                        thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeOneJourneyAndNoApply);
                    }

                } else if (thisMy25C3Messages.JourneysAffectedByMy25 == 'Inbound') {
                    //El bono My25 anterior aplicaba solo a la vuelta
                    if (thisMy25C3Messages.IsChangingLastJourney == 'true' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'true') {
                        thisMy25C3Messages.showBonoApplyed();
                    } else if (thisMy25C3Messages.IsChangingLastJourney == 'true' && thisMy25C3Messages.IsValidForMy25NewInboundDate == 'false') {
                        thisMy25C3Messages.showCanChangeBono();
                    } else {
                        thisMy25C3Messages.showCantchangeBono(thisMy25C3Messages.ChangeOneJourneyAndNoApply);
                    }
                } else {
                    //Eliminamos el mensaje
                    thisMy25C3Messages.ContainerMessage.hide();
                }
            }
        }
    };

    thisMy25C3Messages.showBonoApplyed = function () {
        var message = "";
        if (thisMy25C3Messages.IsOneWayBooking == 'true')
            message = thisMy25C3Messages.MessageApplyCorrectlyOW;
        else
            message = thisMy25C3Messages.MessageApplyCorrectlyRT;
            
        thisMy25C3Messages.BoxBorder.removeClass('styleBox_red').removeClass('styleBox_yellow').addClass('styleBox_green');
        thisMy25C3Messages.MessageSpan.text(message);
        thisMy25C3Messages.BoxBorder.children('div .icon').removeClass('icoError_big').removeClass('icoMsgInfo').addClass('icoConfirm_big');
        thisMy25C3Messages.BoxBorder.children('div .paddingLeft60').children('.fs_12').removeClass('tc_red');
        thisMy25C3Messages.ChangeBono.hide();
    };

    thisMy25C3Messages.showCanChangeBono = function () {
        var message = "";
        if (thisMy25C3Messages.IsOneWayBooking == 'true')
            message = thisMy25C3Messages.CanChangeBonoOW;
        else
            message = thisMy25C3Messages.CanChangeBonoRT;
        
        thisMy25C3Messages.BoxBorder.removeClass('styleBox_green').removeClass('styleBox_yellow').addClass('styleBox_red');
        thisMy25C3Messages.MessageSpan.text(message);
        thisMy25C3Messages.BoxBorder.children('div .icon').removeClass('icoConfirm_big').removeClass('icoMsgInfo').addClass('icoError_big');
        thisMy25C3Messages.BoxBorder.children('div .paddingLeft60').children('.fs_12').addClass('tc_red');
        thisMy25C3Messages.ChangeBono.show();
    };

    thisMy25C3Messages.showCantchangeBono = function (messageToShow) {
        thisMy25C3Messages.BoxBorder.removeClass('styleBox_green').removeClass('styleBox_red').addClass('styleBox_yellow');
        thisMy25C3Messages.MessageSpan.text(messageToShow);
        thisMy25C3Messages.BoxBorder.children('div .icon').removeClass('icoConfirm_big').removeClass('icoError_big').addClass('icoMsgInfo');
        thisMy25C3Messages.BoxBorder.children('div .paddingLeft60').children('.fs_12').removeClass('tc_red');
        thisMy25C3Messages.ChangeBono.hide();
    };

    return thisMy25C3Messages;
};