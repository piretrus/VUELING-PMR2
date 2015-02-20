

VUELING.Class.C3NotEnoughPointsController = function () {

    var selectors = {
        mainPanel: 'div.c3nep-main',
        currentlyBookedPoints: '.c3nep-main .currently-booked-points',
        totalNewPoints: '.c3nep-main .total-new-points',
        pointsNeeded: '.c3nep-main .points-difference',
        allPriceRadioButtons: 'td.price input:radio:',
        visiblePriceRadioButtons: 'td.price input:radio:visible',
        checkedPriceRadioButtons: 'td.price input:radio:checked:visible',
        enoughPointsPanel: '.c3nep-main .enough-balance',
        notEnoughPointsPanel: '.c3nep-main .not-enough-balance',
        pointsToBuy: '.c3nep-main .points-to-buy',
        actionButton: '.action-button',
        neededPointsTextBox: '.c3nep-main .not-enough-balance input:hidden'
    };

    var priceAttr = "flight-price-in-points";

    var parent = new SKYSALES.Class.SkySales(),
        self = SKYSALES.Util.extendObject(parent);

    self.totalUserPoints = "";
    self.totalCurrentlyUsedPoints = "";
    self.totalNewPoints = "";
    self.minimumNeededFarePoints = "";
    self.paxMultiplier = "";

    self.mainPanel = null;
    self.currentlyBookedPointsLabels = null;
    self.totalNewPointsLabels = null;
    self.pointsNeededLabels = null;
    self.pointsToBuyLabels = null;
    self.enoughPointsPanel = null;
    self.notEntoughPointsPanel = null;
    self.allPriceRadioButtons = null;
    self.neededPointsTextBox = null;

    jQuery.fn.setVisible = function (visibility) {
        this.each(function() {
            if (visibility)
                $(this).show();
            else
                $(this).hide();
        });
    }

    self.init = function (json) {
        self.setSettingsByObject(json);
        self.setVars();
        self.addEvents();
        self.refreshValues();
    };

    self.setVars = function () {
        self.mainPanel = jQuery(selectors.mainPanel);
        self.currentlyBookedPointsLabels = jQuery(selectors.currentlyBookedPoints);
        self.totalNewPointsLabels = jQuery(selectors.totalNewPoints);
        self.pointsNeededLabels = jQuery(selectors.pointsNeeded);
        self.pointsToBuyLabels = jQuery(selectors.pointsToBuy);
        self.allPriceRadioButtons = jQuery(selectors.allPriceRadioButtons);
        self.neededPointsTextBox = jQuery(selectors.neededPointsTextBox);
        self.enoughPointsPanel = jQuery(selectors.enoughPointsPanel);
        self.notEnoughPointsPanel = jQuery(selectors.notEnoughPointsPanel);

    };

    self.addEvents = function () {
        // No events needed, all is managed from Availability's events
    };

    self.getCheckedRadioPrices = function () {
        var price = 0;
        jQuery(selectors.checkedPriceRadioButtons)
            .each(function() {
                // var rdioId = $(this).attr('id');
                var label = $(this).closest('td').find('label');
                price += parseInt(label.attr(priceAttr));
            });
        return price;
    }

    self.allFlightsChecked = function() {
        var visibleRadios = $(selectors.visiblePriceRadioButtons).length;
        var checkedRadios = $(selectors.checkedPriceRadioButtons).length;
        // >= just in case! should be at most equal
        return ($.isNumeric(checkedRadios) && $.isNumeric(visibleRadios) && (checkedRadios >= visibleRadios));
    }

    self.refreshValues = function () {

        self.minimumNeededFarePoints = self.getCheckedRadioPrices();;
        
        var difference = self.minimumNeededFarePoints * self.paxMultiplier;

        self.totalNewPoints = (parseInt(self.totalCurrentlyUsedPoints) + difference);

        var neededPoints = difference - self.totalUserPoints;

        self.currentlyBookedPointsLabels.html(self.totalCurrentlyUsedPoints);
        self.totalNewPointsLabels.html(self.totalNewPoints);
        self.pointsNeededLabels.html(difference);
        self.pointsToBuyLabels.html(neededPoints);
        self.neededPointsTextBox.val(neededPoints);
        self.enoughPointsPanel.setVisible(self.shouldIShowEnoughPanel());
        self.notEnoughPointsPanel.setVisible(self.shouldIShowNotEnoughPanel());
        self.mainPanel.setVisible(self.shouldIShowEnoughPanel() || self.shouldIShowNotEnoughPanel());
    };

    self.shouldIShowEnoughPanel = function() {
        return (parseInt(self.minimumNeededFarePoints) > 0
            && parseInt(self.totalUserPoints) >= parseInt(self.minimumNeededFarePoints) * parseInt(self.paxMultiplier));
    };

    self.shouldIShowNotEnoughPanel = function () {
        return (parseInt(self.minimumNeededFarePoints) > 0
            && parseInt(self.totalUserPoints) < parseInt(self.minimumNeededFarePoints) * parseInt(self.paxMultiplier));
    };

    self.scrollToPanelOrToThis = function (defaultScrollFunction) {
        if (self.allFlightsChecked() && (self.shouldIShowEnoughPanel() || self.shouldIShowNotEnoughPanel()))
            self.scrollToPanel();
        else if (jQuery.isFunction(defaultScrollFunction))
            defaultScrollFunction();
    };

    self.scrollToPanel = function () {
        var scrollPosition = (self.enoughPointsPanel.is(':visible'))
                                ? self.enoughPointsPanel.offset().top - 50
                                : self.notEnoughPointsPanel.offset().top - 50;
        if ($.isNumeric(scrollPosition) && scrollPosition != 0)
            $("html, body").animate({ scrollTop: scrollPosition }, 1000);
    };

    return self;

}