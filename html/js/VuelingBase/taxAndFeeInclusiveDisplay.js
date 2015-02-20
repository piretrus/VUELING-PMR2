/*global $ SKYSALES window */

SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler = function taxAndFeeInclusiveDisplayDataRequestHandler(keys, markets, marketinfo)
{
    var keyDelimiter = ',';
    var params = {flightKeys: keys.join(keyDelimiter), numberOfMarkets: markets, keyDelimeter: keyDelimiter};
    var addAllUpPricingEvents = function ()
    {
        if (SKYSALES.common)
        {
            SKYSALES.common.stripeTables();
        }
        var allUpPricingToggleView = new SKYSALES.Class.ToggleView();
        var allUpPricingToggleViewJson = {
            "elementId": "allUpPricing",
            "hideId": "closeTotalPrice",
            "showId": "taxAndFeeInclusiveTotal"
        };
        allUpPricingToggleView.init(allUpPricingToggleViewJson);
    };
    
    var updateTaxAndFeeInclusiveDivBodyHandler = function (data)
    {
        data = "<div>" + data + "</div>";
        if (window.$)
        {
            $('#taxAndFeeInclusiveDivBody').remove();
            $('#taxAndFeeInclusiveDivHeader').after($(data).find('#taxAndFeeInclusiveDivBody'));
            
            if (markets === 1)
            {
                $('table#taxesAndFeesInclusiveDisplay_2').hide();
            }
        }
        addAllUpPricingEvents();
    };
    
    $.get('TaxAndFeeInclusiveDisplayAjax-resource.aspx',
    params,
    updateTaxAndFeeInclusiveDivBodyHandler);
};

