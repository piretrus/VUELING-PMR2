/*
Name: 
Class CalendarAvailabilityInputBase
Param:
None
Return: 
An instance of CalendarAvailabilityInputBase
Functionality:
Displays the low fare calendar
Notes:
This is the container object that has an array of markets
Class Hierarchy:
SkySales -> CalendarAvailabilityInputBase
*/
VUELING.Class.CalendarAvailabilityInputBase = function () {
    var parent = new SKYSALES.Class.SkySales(),
            thisCalendarAvailabilityBase = SKYSALES.Util.extendObject(parent);

    thisCalendarAvailabilityBase.containerId = 'availabilityInputContainerId';
    thisCalendarAvailabilityBase.container = null;

    thisCalendarAvailabilityBase.templateId = 'availabilityInputTemplateId';
    thisCalendarAvailabilityBase.template = null;

    thisCalendarAvailabilityBase.totalTemplateId = 'totalTemplateId';
    thisCalendarAvailabilityBase.totalTemplate = null;

    thisCalendarAvailabilityBase.totalId = 'totalId';
    thisCalendarAvailabilityBase.total = null;

    thisCalendarAvailabilityBase.marketIndex = 0;
    thisCalendarAvailabilityBase.marketArray = [];
    thisCalendarAvailabilityBase.simpleMarketArray = [];
    thisCalendarAvailabilityBase.marketClass = '';

    thisCalendarAvailabilityBase.requestStartDate = null;
    thisCalendarAvailabilityBase.requestEndDate = null;

    thisCalendarAvailabilityBase.pointsLabelAppend = '';
    thisCalendarAvailabilityBase.pointsSuffix = '';

    thisCalendarAvailabilityBase.monthTabArray = [];

    thisCalendarAvailabilityBase.isAjaxCall = false;
    thisCalendarAvailabilityBase.clickedMarketIndex = 0;
    thisCalendarAvailabilityBase.clickedMarketDate = null;

    thisCalendarAvailabilityBase.errorDisplayPopupId = '';
    thisCalendarAvailabilityBase.errorDisplayPopup = null;

    thisCalendarAvailabilityBase.updateMarketsLinkId = '';
    thisCalendarAvailabilityBase.updateMarketsLink = null;

    thisCalendarAvailabilityBase.continueLinkId = '';
    thisCalendarAvailabilityBase.continueLink = null;

    thisCalendarAvailabilityBase.monthTabsPrefix = '';
    thisCalendarAvailabilityBase.monthTabsPlaceHolderPrefix = '';
    thisCalendarAvailabilityBase.selectedDateId = '';
    thisCalendarAvailabilityBase.flightTimeErrorMessage = '';
    thisCalendarAvailabilityBase.flightDateErrorMessage = '';

    thisCalendarAvailabilityBase.fareSelectors = [];

    thisCalendarAvailabilityBase.showExtraChargesInPrice = false;
    thisCalendarAvailabilityBase.extraChargesInPricePercentage = 0;

    thisCalendarAvailabilityBase.init = function (json) {
        this.setSettingsByObject(json);
        this.initMarketArray();
        this.setVars();
        this.draw();
        this.setVarsAfterDraw(json);
        this.addEvents();
        this.selectInitialDateMarkets();
        this.checkFaresShown();
    };

    thisCalendarAvailabilityBase.setTabsLocation = function () {
        var tab = null, tabPlaceholder = null, i = 0, len = this.marketArray.length;
        //move the month tabs to the right place
        for (i = 0; i < len; i++) {
            tab = this.getById(this.monthTabsPrefix + '_' + i);
            tabPlaceholder = this.getById(this.monthTabsPlaceHolderPrefix + '_' + i);
            if (tab && tabPlaceholder) {
                tabPlaceholder.replaceWith(tab);
                tab.show();
            }
        }
    };
    thisCalendarAvailabilityBase.setVars = function () {
        this.container = this.getById(this.containerId);
        this.template = this.getById(this.templateId);
        this.totalTemplate = this.getById(this.totalTemplateId);
        this.updateMarketsLink = this.getById(this.updateMarketsLinkId);
        this.continueLink = this.getById(this.continueLinkId);
        this.loadingGif = this.getById('loadingGif_' + this.marketIndex);
    };
    thisCalendarAvailabilityBase.initMarketArray = function () {
        var i = 0,
            marketArray = this.marketArray || [],
            len = marketArray.length,
            market = null;

        for (i = 0; i < len; i += 1) {
            market = new VUELING.Class[this.marketClass]();
            market.availabilityInput = this;
            market.marketIndex = i;
            market.containerId = 'market_' + i;
            market.selectedDateContainerId = 'selectedDate_' + i;
            market.requestStartDate = this.requestStartDate;
            market.requestEndDate = this.requestEndDate;
            market.flightTimeErrorMessage = this.flightTimeErrorMessage;
            market.flightDateErrorMessage = this.flightDateErrorMessage;
            market.showExtraChargesInPrice = this.showExtraChargesInPrice;
            market.extraChargesInPricePercentage = this.extraChargesInPricePercentage;
            market.init(marketArray[i]);
            marketArray[i] = market;
        }
    };
    thisCalendarAvailabilityBase.initMonthTabArray = function () {
        var i = 0, monthTabArray = this.monthTabArray || [], len = monthTabArray.length, monthTab = null,
            previousBlockOfMonths = new VUELING.Class.NextBlockOfMonths(),
            nextBlockOfMonths = new VUELING.Class.NextBlockOfMonths();

        for (i = 0; i < len; i += 1) {
            // only allow tabs that are not out of today-to-future - date range
            
            monthTab = new VUELING.Class.MonthTab();
            monthTab.calendarAvailabilityObject = this;
            monthTab.init(monthTabArray[i]);
            monthTabArray[i] = monthTab;
            
        }
        previousBlockOfMonths.calendarAvailabilityObject = this;
        previousBlockOfMonths.init({
            "buttonId": "calendar_previous_" + this.marketIndex,
            "monthDelta": -1
        });

        nextBlockOfMonths.calendarAvailabilityObject = this;
        nextBlockOfMonths.init({
            "buttonId": "calendar_next_" + this.marketIndex,
            "monthDelta": 1
        });
    };
    thisCalendarAvailabilityBase.setVarsAfterDraw = function (data) {
        this.total = this.getById(this.totalId);

        var i = 0,
                marketArray = this.marketArray || [],
                len = marketArray.length,
                market = null;
        for (i = 0; i < len; i += 1) {
            market = marketArray[i];
            market.setVarsAfterDraw();
        }

        // Set css classes by selected fare and currency code
        if (data != "undefined") {
            var additionalClassNames = "";

            if (data.familyFaresData != "undefined" && data.marketArray[this.marketIndex] != "undefined" && data.marketArray[this.marketIndex].selectedFare != "undefined") {
                // Gets FareType from productClass
                if (data.marketArray[this.marketIndex].selectedFare == "") {
                    additionalClassNames += data.familyFaresData[0].FareType;
                } else {
                    for (i = 0; i < data.familyFaresData.length; i++) {
                        if (data.familyFaresData[i].FareType == data.marketArray[this.marketIndex].selectedFare) {
                            additionalClassNames += data.familyFaresData[i].FareType;
                            break;
                        }
                    }
                }
            }
            if (data.selectedCurrency != "undefined" && data.selectedCurrency != "") {
                additionalClassNames += " " + data.selectedCurrency;
            }
            $("table#market_" + this.marketIndex).addClass(additionalClassNames.toLowerCase());

            var calendarContainerId = (this.marketIndex === 0) ? '#outboundFlightCalendar' : '#returnFlightCalendar';
            $(calendarContainerId + " #squareSelectedFareReference").attr('class', 'squareSelected-' + additionalClassNames.toLowerCase());
        }

    };
    thisCalendarAvailabilityBase.addEvents = function () {
        var i = 0,
                marketArray = this.marketArray || [],
                len = marketArray.length,
                market = null;
        for (i = 0; i < len; i += 1) {
            market = marketArray[i];
            market.addEvents();
            this.fareSelectors[i].addEvents();
        }
        SKYSALES.taxAndFeeInclusiveDisplayInitialLoadHandler(this.simpleMarketArray);
    };
    thisCalendarAvailabilityBase.selectInitialDateMarkets = function () {
        var i = 0,
                marketArray = this.marketArray || [],
                len = marketArray.length,
                market = null;
        for (i = 0; i < len; i += 1) {
            market = marketArray[i];
            //when a call is made for one market, keep the date selected for the other market in tact
            if (this.isAjaxCall == "true" && i != this.clickedMarketIndex) {
                var key = market.dateMarketPrefix + i + '_' + market.startYear + '_' + (parseInt(market.inputMonth.val()) - 1) + '_' + market.inputDay.val();
                market.updateFare(key);
            }
            else {
                market.selectInitialDateMarket();
            }
        }
    };
    thisCalendarAvailabilityBase.getHtml = function () {
        var html = this.template.text();
        var i = 0;
        var marketArray = this.marketArray || [];
        var len = marketArray.length;
        var market = marketArray[this.marketIndex];
        var marketHtml = market.getHtml();

        html = html.replace(/\[marketArray\]/, marketHtml);
        return html;
    };
    thisCalendarAvailabilityBase.draw = function () {
        var html = this.getHtml();
        this.container.replaceWith(html);
    };
    thisCalendarAvailabilityBase.updateTotalAmount = function () {
        var totalhtml = this.totalTemplate.text(),
            totalClass = new SKYSALES.Class.CalendarAvailabilityTotals();
        totalClass.marketArray = this.marketArray;
        totalClass.getTotals();
        totalhtml = totalhtml.replace(/\[totalAmount\]/, SKYSALES.Util.formatAmount(totalClass.totalPrice, totalClass.totalPoints, this.pointsLabelAppend, this.pointsSuffix));
        this.total.html(totalhtml);
    };
    thisCalendarAvailabilityBase.initFareSelector = function (data) {

        var i = 0,
            marketArray = this.marketArray || [],
            len = marketArray.length;

        for (i = 0; i < len; i += 1) {
            this.fareSelectors[i] = new VUELING.Class.CalendarFareSelector();
            this.fareSelectors[i].init(data);
        }
    };

    thisCalendarAvailabilityBase.checkFaresShown = function () {
        if (this.showExtraChargesInPrice == true) {
            var objSBSidebar = VUELING.Util.getObjectInstance("SBSidebar");
            if (objSBSidebar != undefined && objSBSidebar != null && typeof objSBSidebar.checkAvailabilityFaresShown == 'function') {
                objSBSidebar.checkAvailabilityFaresShown();
            }
        }
    };
    return thisCalendarAvailabilityBase;
};