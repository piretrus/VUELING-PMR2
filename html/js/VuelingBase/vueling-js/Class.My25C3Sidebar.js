

VUELING.Class.My25C3Sidebar = function () {
    var parent = SKYSALES.Class.SkySales(),
       thisMy25C3Sidebar = SKYSALES.Util.extendObject(parent);

    //thisMy25C3Sidebar.UrlUpdateSidebarMy25 = '';
    //thisMy25C3Sidebar.HasMy25 = '';
    //thisMy25C3Sidebar.HasBookingMy25Applied = false;
    //thisMy25C3Sidebar.DivToUpdateId = '';
    //thisMy25C3Sidebar.DivToUpdate = null;
    thisMy25C3Sidebar.LastSeletedKeys = '';
    thisMy25C3Sidebar.SidebarBaseInstance = null;
    thisMy25C3Sidebar.ChangeFlightInstance = null;

    thisMy25C3Sidebar.init = function () {
        thisMy25C3Sidebar.GetSidebarBaseInstance();
    };

    thisMy25C3Sidebar.GetSidebarBaseInstance = function () {
        thisMy25C3Sidebar.SidebarBaseInstance = VUELING.Util.getObjectInstance("C3Sidebar");
    };

    thisMy25C3Sidebar.GetChangeFlightInstance = function () {
        thisMy25C3Sidebar.ChangeFlightInstance = VUELING.Util.getObjectInstance("ChangeFlight");
    };

    thisMy25C3Sidebar.registerObservers = function () {
        var availabilityInstance = VUELING.Util.getObjectInstance("availabilityInput");
        if (availabilityInstance)
            availabilityInstance.addObserver(thisMy25C3Sidebar.update);

        //TODO: Valdiar si es el sitio correcto donde llamar a esta función para repintar la barra lateral
        var instanceOfchangeFlight = VUELING.Util.getObjectInstance('ChangeFlight');
        if (instanceOfchangeFlight)
            thisMy25C3Sidebar.initSidebar(instanceOfchangeFlight);
    };
    thisMy25C3Sidebar.initSidebar = function (instanceOfchangeFlight) {
        var checkedOutbound = $(".availabilitySection").not(".hidden").children('#availabilityTable0').find('input[type="radio"]:checked').not('disabled').parent();
        var isCheckedOutbound = checkedOutbound.length > 0;
        var checkedInbound = $(".availabilitySection").not(".hidden").children('#availabilityTable1').find('input[type="radio"]:checked').not('disabled').parent();
        var isCheckedInbound = checkedInbound.length > 0;
        var nummarkets = 0;
        if (isCheckedOutbound) nummarkets++;
        if (isCheckedInbound) nummarkets++;
 
        if (instanceOfchangeFlight) {
            if (isCheckedOutbound || isCheckedInbound)
                instanceOfchangeFlight.My25DiscountAmount = parseFloat(thisMy25C3Sidebar.SidebarBaseInstance.CurrentBooking.TotalMy25DiscountAmount);
            if (isCheckedOutbound)
                instanceOfchangeFlight.CallSelected(checkedOutbound, nummarkets);
            if (isCheckedInbound)
                instanceOfchangeFlight.CallSelected(checkedInbound, nummarkets);
        }        
    };


    thisMy25C3Sidebar.update = function () {
        if (thisMy25C3Sidebar.SidebarBaseInstance != undefined)
            if (thisMy25C3Sidebar.SidebarBaseInstance.My25.HasMy25 == "true") {
                var markets = $(".availabilityBody tbody tr td[class^='price'] input:checked:enabled"),
                keys = [],
                totalNumberMarkets = $("div.availabilitySection.marketSection div.availabilitySection.availabilitySection:not(div.hidden)").length;

                if (totalNumberMarkets > markets.length) return;
                if (markets.length > 0) {
                    keys = thisMy25C3Sidebar.GetKeys(markets, totalNumberMarkets);
                    var keyDelimiter = ',';
                    var flightKeys = keys.join(keyDelimiter);
                    var params = {
                        "flightKeys": flightKeys,
                        "numberOfMarkets": totalNumberMarkets,
                        "keyDelimeter": keyDelimiter
                    };
                    if (thisMy25C3Sidebar.LastSeletedKeys != flightKeys) {
                        thisMy25C3Sidebar.LastSeletedKeys = flightKeys;
                        $.ajax({
                            type: "GET",
                            async: true,
                            dataType: "json",
                            data: params,
                            url: thisMy25C3Sidebar.SidebarBaseInstance.My25.UrlUpdateSidebarMy25,
                            success: function (data) {
                                thisMy25C3Sidebar.updateMessages(data);
                                thisMy25C3Sidebar.updateSidebar(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {

                            }
                        });
                    }
                }
            }
    };

    thisMy25C3Sidebar.GetKeys = function (markets, totalNumberMarkets) {
        var keys = [];
        for (var a = 0; a < totalNumberMarkets; a++) {
            keys[a] = "undefined";
        }
        $(markets).each(function (i) {
            if (this.name.indexOf('market') > 0) {
                var marketNum = this.name.substr(this.name.indexOf('market') + 6, this.name.indexOf('market') + 7);
                if (marketNum > 0) {
                    keys[marketNum - 1] = $(this).val();
                }
            }
        });
        return keys;
    };

    thisMy25C3Sidebar.updateMessages = function (data) {
        var thisPromoVYScheduleSelect = VUELING.Util.getObjectInstance('promoVYScheduleSelect');
        if (thisPromoVYScheduleSelect) {
            if (data.Status != "") {
                thisPromoVYScheduleSelect.promoVYCode = data.BonusCode;
                thisPromoVYScheduleSelect.promoVYIsBonus = data.IsBono;
                thisPromoVYScheduleSelect.errorCodeResponse = data.ErrorCode;
                thisPromoVYScheduleSelect.statusResponse = data.Status;
                thisPromoVYScheduleSelect.OutboundSegmentStatus = data.OutboundSegmentStatus;
                thisPromoVYScheduleSelect.InboundSegmentStatus = data.InboundSegmentStatus;
                thisPromoVYScheduleSelect.TravelType = data.TravelType;
                thisPromoVYScheduleSelect.promoVYScheduleSelectShow();
            }
        }
    };

    thisMy25C3Sidebar.updateSidebar = function (data) {
        if (data && thisMy25C3Sidebar.SidebarBaseInstance && data.IsBono == "true") {

            if (data.InboundSegmentStatus == "OK" && data.OutboundSegmentStatus == "OK") {
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageOk);
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.icon).removeClass('icoAlert_small').addClass('icoPromoCode');
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).addClass('iconx').removeClass('iconx0').removeClass('icon-bf').removeClass('ico-bf-AlertCommentSmall');
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).removeClass('tc_red').addClass('tc_green');
            } else if (data.InboundSegmentStatus != "OK" && data.OutboundSegmentStatus != "OK") {
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageKo);
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.icon).removeClass('icoPromoCode').addClass('icoAlert_small');
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).removeClass('iconx').addClass('iconx0').addClass('icon-bf').addClass('ico-bf-AlertCommentSmall');
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).removeClass('tc_green').addClass('tc_red');
            } else if (data.OutboundSegmentStatus == "OK") {
                if (data.TravelType == 'ONEWAY') {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageOk);
                } else if (data.TravelType == 'ROUNDTRIP') {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageWarningOutbound);
                } else {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageWarningMCfirst);
                }
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.icon).removeClass('icoAlert_small').addClass('icoPromoCode');
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).removeClass('tc_red').addClass('tc_green');
            } else if (data.InboundSegmentStatus == "OK") {
                if (data.TravelType == 'ONEWAY') {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageOk);
                } else if (data.TravelType == 'ROUNDTRIP') {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageWarningInbound);
                } else {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25MessageWarningMCsecond);
                }
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.icon).removeClass('icoAlert_small').addClass('icoPromoCode');
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlMessage).removeClass('tc_red').addClass('tc_green');
            }
            

            if (data.DiscountsDifference != 0) {
                var prefix = '';
                if (data.DiscountsDifference > 0) {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlDiscountMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25DiscountLostMessage);
                    prefix = '+';
                } else {
                    $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlDiscountMessage).html(thisMy25C3Sidebar.SidebarBaseInstance.My25.My25DiscountMessage);
                }
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.controlDiscount).html(prefix + SKYSALES.Util.convertToLocaleCurrency(data.DiscountsDifference));
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.divContentDiscount).show();
            }
            else {
                $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.divContentDiscount).hide();
            }
            //actualizar total en la barra lateral
            thisMy25C3Sidebar.updateSidebarTotal(data);
            $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.divSeparador).show();
            $("#" + thisMy25C3Sidebar.SidebarBaseInstance.My25.divContent).show();
        }
    };

    thisMy25C3Sidebar.updateSidebarTotal = function (data) {
        thisMy25C3Sidebar.GetChangeFlightInstance();
        if (thisMy25C3Sidebar.ChangeFlightInstance) {
            thisMy25C3Sidebar.ChangeFlightInstance.My25DiscountAmount = parseFloat(data.DiscountsDifference);
            thisMy25C3Sidebar.ChangeFlightInstance.WriteBarDifferencePlusChangeFlight();
        }

    };

    return thisMy25C3Sidebar;
};