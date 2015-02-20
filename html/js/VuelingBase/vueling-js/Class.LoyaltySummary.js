

VUELING.Class.LoyaltySummary = function () {
    var parent = new SKYSALES.Class.SkySales(),
            thisLoyaltySummary = SKYSALES.Util.extendObject(parent);

    thisLoyaltySummary.ParentContainerClass = '';
    thisLoyaltySummary.PointsContainerId = '';
    thisLoyaltySummary.PointsContainer = null;
    thisLoyaltySummary.LoyaltyContextContainerId = '';
    thisLoyaltySummary.LoyaltyContextContainer = null;
    thisLoyaltySummary.SaldoContainerId = '';
    thisLoyaltySummary.SaldoContainer = null;
    thisLoyaltySummary.PointsWinContainerId = '';
    thisLoyaltySummary.PointsWinContainer = null;
    thisLoyaltySummary.SaldoContainerShowMore = '';
    thisLoyaltySummary.SaldoContainerShowOnly = '';
    thisLoyaltySummary.LoyaltyWinPointsHiddenInputId = '';
    thisLoyaltySummary.LoyaltyWinPointsHiddenInput = null;
    thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInputId = '';
    thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInput = null;

    thisLoyaltySummary.VipFeaturesContainerButtonId = '';
    thisLoyaltySummary.VipFeaturesContainerButton = null;
    thisLoyaltySummary.VipFeaturesContainerId = '';
    thisLoyaltySummary.VipFeaturesContainer = null;
    thisLoyaltySummary.CloseVipFeatures = '';

    thisLoyaltySummary.PointsWinVipContainerId = '';
    thisLoyaltySummary.PointsWinVipContainer = null;
    thisLoyaltySummary.VipFeatureToHideId = '';
    thisLoyaltySummary.VipFeatureToHide = null;

    thisLoyaltySummary.IconNoIberiaStyle = '';
    thisLoyaltySummary.IconIberiaStyle = '';
    thisLoyaltySummary.IconIBVYId = '';
    thisLoyaltySummary.IconIBVY = null;
    thisLoyaltySummary.IconIBVY2Id = '';
    thisLoyaltySummary.IconIBVY2 = null;

    thisLoyaltySummary.ContactContactContainerId = '';
    thisLoyaltySummary.ContactPassengersContainerId = '';
    thisLoyaltySummary.ContactPassengersContainer = null;

    thisLoyaltySummary.ContactCheckboxLoyaltyProgramPrefix = '';
    thisLoyaltySummary.ContactRadioProgramPuntoPrefix = '';
    thisLoyaltySummary.ContactRadioProgramIberiaPlusPrefix = '';

    thisLoyaltySummary.ShowWinPointsFlag = false;

    thisLoyaltySummary.ProgramLevel = '';
    thisLoyaltySummary.staticUrl = '';

    thisLoyaltySummary.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.setDefaultView();
        if (thisLoyaltySummary.CloseVipFeatures == 'true') {
            thisLoyaltySummary.ClosingVipFeatures();
        }
    };
    thisLoyaltySummary.setVars = function () {
        // vars
        thisLoyaltySummary.VipFeaturesContainerButton = $("#" + thisLoyaltySummary.VipFeaturesContainerButtonId);
        thisLoyaltySummary.VipFeaturesContainer = $("#" + thisLoyaltySummary.VipFeaturesContainerId);
        thisLoyaltySummary.PointsWinVipContainer = $("#" + thisLoyaltySummary.PointsWinVipContainerId);
        thisLoyaltySummary.VipFeatureToHide = $("#" + thisLoyaltySummary.VipFeatureToHideId);
        thisLoyaltySummary.IconIBVY = $("#" + thisLoyaltySummary.IconIBVYId);
        thisLoyaltySummary.IconIBVY2 = $("#" + thisLoyaltySummary.IconIBVY2Id);

        thisLoyaltySummary.PointsContainer = $("#" + thisLoyaltySummary.PointsContainerId, "." + thisLoyaltySummary.ParentContainerClass);
        thisLoyaltySummary.LoyaltyContextContainer = $("#" + thisLoyaltySummary.LoyaltyContextContainerId, thisLoyaltySummary.PointsContainer);
        thisLoyaltySummary.SaldoContainer = $("#" + thisLoyaltySummary.SaldoContainerId, thisLoyaltySummary.LoyaltyContextContainer);
        thisLoyaltySummary.PointsWinContainer = $("#" + thisLoyaltySummary.PointsWinContainerId, thisLoyaltySummary.LoyaltyContextContainer);

        thisLoyaltySummary.LoyaltyWinPointsHiddenInput = $("input[id=" + thisLoyaltySummary.LoyaltyWinPointsHiddenInputId + "]", thisLoyaltySummary.PointsWinContainer);
        thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInput = $("input[id=" + thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInputId + "]", thisLoyaltySummary.PointsWinContainer);

        thisLoyaltySummary.ContactContactContainerId = 'contactArticle';
        thisLoyaltySummary.ContactPassengersContainerId = 'passengers';
        thisLoyaltySummary.ContactPassengersContainer = $("#" + thisLoyaltySummary.ContactContactContainerId + " " + "#" + thisLoyaltySummary.ContactPassengersContainerId);

        thisLoyaltySummary.ContactCheckboxLoyaltyProgramPrefix = 'checkboxLoyaltyProgram';
        thisLoyaltySummary.ContactRadioProgramPuntoPrefix = 'radioProgramPunto';
        thisLoyaltySummary.ContactRadioProgramIberiaPlusPrefix = 'radioProgramIberiaPlus';
    };
    thisLoyaltySummary.addEvents = function () {
        // events
        $(thisLoyaltySummary.PointsContainer).bind("LoyaltyClickUpdate", function () { thisLoyaltySummary.CalculateLoyaltySummary(); });
        thisLoyaltySummary.VipFeaturesContainerButton.click(thisLoyaltySummary.vipFeaturesContainerButtonClick);
    };

    thisLoyaltySummary.vipFeaturesContainerButtonClick = function () {
        thisLoyaltySummary.VipFeaturesContainer.toggle("fast", function () {
            if (thisLoyaltySummary.VipFeaturesContainer.is(':visible')) {
                $('img', $('#' + thisLoyaltySummary.VipFeaturesContainerButtonId)).attr('src', thisLoyaltySummary.staticUrl + 'skysales/images/VuelingBase/buttonToggleClose.png');
            } else {
                $('img', $('#' + thisLoyaltySummary.VipFeaturesContainerButtonId)).attr('src', thisLoyaltySummary.staticUrl + 'skysales/images/VuelingBase/buttonToggleOpen.png');
            }
        });
    };

    thisLoyaltySummary.setDefaultView = function () {
        // default init
        var isPunto = false;
        if (thisLoyaltySummary.LoyaltyWinPointsHiddenInput.length) {
            if (thisLoyaltySummary.LoyaltyWinPointsHiddenInput.val() == 'true') {
                isPunto = true;
            }
        }
        var isIberiaPlus = false;
        if (thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInput.length) {
            if (thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInput.val() == 'true') {
                isIberiaPlus = true;
            }
        }

        if (isPunto || !isIberiaPlus) {
            thisLoyaltySummary.ChangeLoyaltySummaryView(true);
        }
        else {
            thisLoyaltySummary.ChangeLoyaltySummaryView(false);
        }

        thisLoyaltySummary.CalculateLoyaltySummary();
    };

    thisLoyaltySummary.ClosingVipFeatures = function () {
        if (thisLoyaltySummary.VipFeaturesContainer.is(":visible")) {
            thisLoyaltySummary.vipFeaturesContainerButtonClick();
        }
    };

    thisLoyaltySummary.CalculateLoyaltySummary = function () {
        if (thisLoyaltySummary.LoyaltyContextContainer.length) {
            var numberOfNoLoyalty = 0;
            var numberOfLoyaltyPunto = 0;
            var numberOfLoyaltyIberiaPlus = 0;
            var checkboxesLoyalties = thisLoyaltySummary.ContactPassengersContainer.find("input[id^=" + thisLoyaltySummary.ContactCheckboxLoyaltyProgramPrefix + "]");

            $.each(checkboxesLoyalties, function () {
                if (this.checked == true) {
                    var formPax = $(this).parents(".formPax")[0];
                    var radioPunto = $("input[id^=" + thisLoyaltySummary.ContactRadioProgramPuntoPrefix + "]", formPax)[0]
                    var radioIberia = $("input[id^=" + thisLoyaltySummary.ContactRadioProgramIberiaPlusPrefix + "]", formPax)[0]
                    if (radioPunto.checked == true) {
                        numberOfLoyaltyPunto++;
                    }
                    else if (radioIberia.checked == true) {
                        numberOfLoyaltyIberiaPlus++;
                    }
                }
                else {
                    numberOfNoLoyalty++;
                }
            });

            var showSummary = false;
            if (checkboxesLoyalties.length == 0) {
                //Si no estamos en la pagina de Contact
                var isPunto = thisLoyaltySummary.LoyaltyWinPointsHiddenInput.val();
                var isIberiaPlus = thisLoyaltySummary.LoyaltyWinPointsIberiaPlusHiddenInput.val();

                if ((typeof isPunto == 'undefined') && (typeof isIberiaPlus == 'undefined')) {
                    showSummary = false;
                }
                else if (isPunto || !isIberiaPlus) {
                    showSummary = true;
                }
            }
            else {
                //Si estamos en la pagina de Contact se usan los radiobuttons para definir le estado de la caja.
                if (numberOfLoyaltyPunto == 0 && numberOfLoyaltyIberiaPlus == 0) {
                    showSummary = false;
                }
                else if (numberOfLoyaltyPunto >= 1 || numberOfLoyaltyIberiaPlus == 0) {
                    showSummary = true;
                }
            }
            thisLoyaltySummary.ChangeLoyaltySummaryView(showSummary);
        }
    };

    thisLoyaltySummary.ChangeLoyaltySummaryView = function (showPunto) {
        if (showPunto != thisLoyaltySummary.ShowWinPointsFlag) {
            thisLoyaltySummary.ShowWinPointsFlag = showPunto;
            if (showPunto == true) {
                thisLoyaltySummary.PointsWinContainer.show();
                thisLoyaltySummary.SaldoContainer.toggleClass(thisLoyaltySummary.SaldoContainerShowOnly + " " + thisLoyaltySummary.SaldoContainerShowMore);
                if (thisLoyaltySummary.ProgramLevel == 'VIP') {
                    thisLoyaltySummary.IconIBVY.removeClass(thisLoyaltySummary.IconIberiaStyle);
                    thisLoyaltySummary.IconIBVY.addClass(thisLoyaltySummary.IconNoIberiaStyle);
                    thisLoyaltySummary.IconIBVY2.show();
                    thisLoyaltySummary.LoyaltyContextContainer.show();
                    thisLoyaltySummary.PointsWinVipContainer.show();
                    thisLoyaltySummary.VipFeatureToHide.show();
                }
            }
            else {
                thisLoyaltySummary.PointsWinContainer.hide();
                thisLoyaltySummary.SaldoContainer.toggleClass(thisLoyaltySummary.SaldoContainerShowMore + " " + thisLoyaltySummary.SaldoContainerShowOnly);
                if (thisLoyaltySummary.ProgramLevel == 'VIP') {
                    thisLoyaltySummary.IconIBVY.removeClass(thisLoyaltySummary.IconNoIberiaStyle);
                    thisLoyaltySummary.IconIBVY.addClass(thisLoyaltySummary.IconIberiaStyle);
                    thisLoyaltySummary.IconIBVY2.hide();
                    thisLoyaltySummary.LoyaltyContextContainer.hide();
                    thisLoyaltySummary.PointsWinVipContainer.hide();
                    thisLoyaltySummary.VipFeatureToHide.hide();
                }
            }
        }
    };

    return thisLoyaltySummary;
};