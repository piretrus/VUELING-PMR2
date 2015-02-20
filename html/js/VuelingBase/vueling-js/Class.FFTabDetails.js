

VUELING.Class.FFTabDetails = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisFFTabDetails = SKYSALES.Util.extendObject(parent);

    thisFFTabDetails.FFTabBasic = '';
    thisFFTabDetails.FFTabIdBasic = '';
    thisFFTabDetails.FFDivBasic = '';
    thisFFTabDetails.FFDivIdBasic = '';

    thisFFTabDetails.FFTabOptima = '';
    thisFFTabDetails.FFTabIdOptima = '';
    thisFFTabDetails.FFDivOptima = '';
    thisFFTabDetails.FFDivIdOptima = '';

    thisFFTabDetails.FFTabExc = '';
    thisFFTabDetails.FFTabIdExc = '';
    thisFFTabDetails.FFDivExc = '';
    thisFFTabDetails.FFDivIdExc = '';

    thisFFTabDetails.FFTopDescription = '';
    thisFFTabDetails.FFTopTitle = '';

    thisFFTabDetails.outboundFlightFareTypeRecommendation = '';
    thisFFTabDetails.returnFlightFareTypeRecommendation = '';
    thisFFTabDetails.fareRecommendedOutboundFlightDisplayMode = '';
    thisFFTabDetails.fareRecommendedReturnFlightDisplayMode = '';

    thisFFTabDetails.fareRecommendedDisplayModes = {
        DontShow: 'DontShow',
        WithDescription: 'WithDescription',
        WithBanner: 'WithBanner',
        WithDescriptionAndBanner: 'WithDescriptionAndBanner'
    };

    thisFFTabDetails.IsMooving = false;

    thisFFTabDetails.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisFFTabDetails.initObject = function () {
        thisFFTabDetails.FFTabBasic = this.getById(thisFFTabDetails.FFTabIdBasic);
        thisFFTabDetails.FFDivBasic = this.getById(thisFFTabDetails.FFDivIdBasic);

        thisFFTabDetails.FFTabOptima = this.getById(thisFFTabDetails.FFTabIdOptima);
        thisFFTabDetails.FFDivOptima = this.getById(thisFFTabDetails.FFDivIdOptima);

        thisFFTabDetails.FFTabExc = this.getById(thisFFTabDetails.FFTabIdExc);
        thisFFTabDetails.FFDivExc = this.getById(thisFFTabDetails.FFDivIdExc);

        thisFFTabDetails.SetFareRecomendation(0, thisFFTabDetails.fareRecommendedOutboundFlightDisplayMode,
            "feeDescription-" + thisFFTabDetails.outboundFlightFareTypeRecommendation.toLowerCase(),
            thisFFTabDetails.FFTopTitle, thisFFTabDetails.FFTopDescription);

        thisFFTabDetails.SetFareRecomendation(1, thisFFTabDetails.fareRecommendedReturnFlightDisplayMode,
            "feeDescription-" + thisFFTabDetails.returnFlightFareTypeRecommendation.toLowerCase(),
            thisFFTabDetails.FFTopTitle, thisFFTabDetails.FFTopDescription);

        thisFFTabDetails.SetTabBanners(0, thisFFTabDetails.outboundFlightFareTypeRecommendation, thisFFTabDetails.fareRecommendedOutboundFlightDisplayMode);
        thisFFTabDetails.SetTabBanners(1, thisFFTabDetails.returnFlightFareTypeRecommendation, thisFFTabDetails.fareRecommendedReturnFlightDisplayMode);
    };

    thisFFTabDetails.SetFareRecomendation = function (marketIndex, fareRecommendedDisplayMode, ffTopClass, ffTopTitle, ffTopDescription) {

        var tableSelector = "table#availabilityTable" + marketIndex + " ";

        $(tableSelector + '#topTableFeeDescription th > div').removeClass("feeDescription-basic");
        $(tableSelector + '#topTableFeeDescription th > div').removeClass("feeDescription-optima");
        $(tableSelector + '#topTableFeeDescription th > div').removeClass("feeDescription-excellence");
        $(tableSelector + '#topTableFeeDescription th > div').addClass(ffTopClass);
        if (fareRecommendedDisplayMode == thisFFTabDetails.fareRecommendedDisplayModes.WithDescription
            || fareRecommendedDisplayMode == thisFFTabDetails.fareRecommendedDisplayModes.WithDescriptionAndBanner) {
            if (thisFFTabDetails.IsMooving != true) {
                $(tableSelector + '#topTableFeeDescription p.textSection').html("<strong class='feeName'>" + ffTopTitle + "</strong>" + ffTopDescription);
            } else {
                $(tableSelector + '#topTableFeeDescription p.textSection').html("<strong>" + ffTopTitle + "</strong>" + ffTopDescription);
            }
        } else if (fareRecommendedDisplayMode != thisFFTabDetails.fareRecommendedDisplayModes.WithDescription
            || fareRecommendedDisplayMode != thisFFTabDetails.fareRecommendedDisplayModes.WithDescriptionAndBanner) {
            $(tableSelector + 'span#wrap_dropDownListSorter-' + marketIndex).appendTo('table[marketindex=' + marketIndex + '] tr.tabsFee .tableHeaderLinkSection');
            $(tableSelector + 'span.wrap_dropDownListSorters').addClass("marginBottom16");
            $(tableSelector + 'tr#topTableFeeDescription div.feeDescription-bar').addClass("hidden");
        }
    };

    thisFFTabDetails.SetTabBanners = function (marketIndex, fareTypeRecommendation, fareRecommendedDisplayMode) {
        var tableSelector = "table#availabilityTable" + marketIndex + " ";
        if ($(tableSelector + "tr input[type='radio']").length == 0) return;

        $(tableSelector + ".iconLang.icofeeClaim").remove();
        if (fareTypeRecommendation != ''
            && fareTypeRecommendation != 'Basic'
            && (fareRecommendedDisplayMode == thisFFTabDetails.fareRecommendedDisplayModes.WithBanner
                || fareRecommendedDisplayMode == thisFFTabDetails.fareRecommendedDisplayModes.WithDescriptionAndBanner)) {
            $(tableSelector + "th.tab" + fareTypeRecommendation + " a.tabFee").append('<span class="iconLang icofeeClaim hidden"></span>');
        }
    };


    thisFFTabDetails.addEventsAppleMobile = function () {
        $("a#closeDivTarifaIpad").show();


        thisFFTabDetails.FFTabBasic.click(
            function () {
                thisFFTabDetails.FFDivBasic.fadeIn(500);
            }
        );
        thisFFTabDetails.FFTabOptima.click(
            function () {
                thisFFTabDetails.FFDivOptima.fadeIn(500);
            }
        );
        thisFFTabDetails.FFTabExc.click(
            function () {
                thisFFTabDetails.FFDivExc.fadeIn(500);
            }
        );
        $("a#closeDivTarifaIpad").click(
            function () {
                thisFFTabDetails.FFDivBasic.hide();
                thisFFTabDetails.FFDivOptima.hide();
                thisFFTabDetails.FFDivExc.hide();
            }
        );
    };
    thisFFTabDetails.addEvents = function () {
        if (VUELING.Util.IsAppleDevice()) {
            thisFFTabDetails.addEventsAppleMobile();

        } else { $("a#closeDivTarifaIpad").hide(); };


        thisFFTabDetails.FFTabBasic.parent().hover(
            function () {
                thisFFTabDetails.FFDivBasic.fadeIn(500);
                thisFFTabDetails.BlurOnSortSelects();
                thisFFTabDetails.HideConnectInfoLayer();
            }, function () {
                thisFFTabDetails.FFDivBasic.hide();
            }
        );

        thisFFTabDetails.FFTabOptima.parent().hover(
            function () {
                thisFFTabDetails.FFDivOptima.fadeIn(500);
                thisFFTabDetails.BlurOnSortSelects();
                thisFFTabDetails.HideConnectInfoLayer();
            }, function () {
                thisFFTabDetails.FFDivOptima.hide();
            }
        );

        thisFFTabDetails.FFTabExc.parent().hover(
            function () {
                thisFFTabDetails.FFDivExc.fadeIn(500);
                thisFFTabDetails.BlurOnSortSelects();
                thisFFTabDetails.HideConnectInfoLayer();
            }, function () {
                thisFFTabDetails.FFDivExc.hide();
            }
        );

        this.thisFFHoverTableEvent();
    };

    thisFFTabDetails.HideConnectInfoLayer = function() {
        $(".connectInfo .connectInfoItem").css("display", "none");
    };

    thisFFTabDetails.BlurOnSortSelects = function () {
        var selects = $(".blurOnDialog");
        for (var i = 0; i < selects.length; i++) {
            selects[i].blur();
        }
    };

    thisFFTabDetails.thisFFHoverTableEvent = function () {
        $('table.availabilityBody tr td:nth-child(2):not(.fareNotAllowed)').hover(
            function () {
                if (thisFFTabDetails.IsMooving != true) {
                    $(this).addClass('price-basic');
                }
            },
            function () {
                if (!$(this).hasClass('selected') && thisFFTabDetails.IsMooving != true)
                    $(this).removeClass('price-basic');
            }
        );


        $('table.availabilityBody tr td:nth-child(3):not(.fareNotAllowed)').hover(
            function () {
                if (thisFFTabDetails.IsMooving != true) {
                    $(this).addClass('price-optima');
                }
            },
            function () {
                if (!$(this).hasClass('selected') && thisFFTabDetails.IsMooving != true)
                    $(this).removeClass('price-optima');
            }
        );

        $('table.availabilityBody tr td:nth-child(4):not(.fareNotAllowed)').hover(
            function () {
                if (thisFFTabDetails.IsMooving != true) {
                    $(this).addClass('price-excellence');
                }
            },
            function () {
                if (!$(this).hasClass('selected') && thisFFTabDetails.IsMooving != true)
                    $(this).removeClass('price-excellence');
            }
        );
    };

    return thisFFTabDetails;
};