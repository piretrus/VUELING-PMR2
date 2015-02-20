/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

/*
    Dependencies:
        This file depends on other JavaScript files to be there at run time.
        
        jquery.js:
            $ is a jquery variable
        common.js:
            SKYSALES namespace is used to avoid name collisions.
        TaxAndFeeInclusiveDisplay.js
            Calls taxAndFeeInclusiveDisplayDataRequestHandler
    
    General Notes:
        This JavaScript is used with the AvailabilityInput control
        
    JsLint Status:
        Pass - JsLint Edition 2009-09-29
        
        + Strict whitespace
        + Assume a browser 
        + Disallow undefined variables
        + Disallow leading _ in identifiers
        + Disallow == and !=
        + Disallow ++ and --
        + Disallow bitwise operators
        + Disallow . in RegExp literals
        + Disallow global var
        Indentation 4
        
*/

/*
    Name: 
        Class AvailabilityInput
    Param:
        None
    Return: 
        An instance of AvailabilityInput
     Functionality:
        The object that initializes the AvailabilityInput control
    Notes:
        The journeyInfoList is set down to the browser via JSON that is created in the XSLT file.
        The XSLT creates a new SKYSALES.Class.AvailabilityInput and then sets the SKYSALES.availabilityInput.journeyInfoList
        property to an array of JourneyInfo objects. It then calls SKYSALES.availabilityInput.init
        This class also attemps to call taxAndFeeInclusiveDisplayDataRequestHandler that is in TaxAndFeeInclusiveDisplay.js
    Class Hierarchy:
        AvailabilityInput
*/

/*global $: false, jQuery: false, window: false, SKYSALES: false */

if (SKYSALES.Class.AvailabilityInput === undefined)
{
    SKYSALES.Class.AvailabilityInput = function ()
    {
        var parent = new SKYSALES.Class.SkySales(),
        thisAvailabilityInput = SKYSALES.Util.extendObject(parent);

        thisAvailabilityInput.detailsLinks = null;
        thisAvailabilityInput.journeyInfoArray = [];
        thisAvailabilityInput.dateMarketLowestFareArray = [];

        thisAvailabilityInput.getPriceItineraryInfo = function ()
        {
            if (undefined !== SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler)
            {
                var markets = $("#selectMainBody .availabilityTable tr td[class^='fareCol'] :radio[checked]"),
                keys = [];

                $(markets).each(function (i)
                {
                    keys[i] = $(this).val();
                });

                SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler(keys, markets.length);
            }
        };
        thisAvailabilityInput.addGetPriceItineraryInfoEvents = function ()
        {
            $("#selectMainBody #availabilityTable0 tr td[class^='fareCol'] :radio").each(
                function ()
                {
                    $(this).click(
                        function ()
                        {
                            thisAvailabilityInput.getPriceItineraryInfo();
                        });
                });
            $("#selectMainBody #availabilityTable1 tr td[class^='fareCol'] :radio").each(
                function ()
                {
                    $(this).click(
                        function ()
                        {
                            thisAvailabilityInput.getPriceItineraryInfo();
                        });
                });
        };
        thisAvailabilityInput.ajaxEquipmentProperties = function ()
        {

        };
        thisAvailabilityInput.addEquipmentPropertiesAjaxEvent = function ()
        {
            $(this).click(thisAvailabilityInput.ajaxEquipmentProperties);
        };
        thisAvailabilityInput.addEquipmentPropertiesAjaxEvents = function ()
        {
            thisAvailabilityInput.detailsLinks.each(thisAvailabilityInput.addEquipmentPropertiesAjaxEvent);
        };
        thisAvailabilityInput.addEvents = function ()
        {
            thisAvailabilityInput.addGetPriceItineraryInfoEvents();
            thisAvailabilityInput.addEquipmentPropertiesAjaxEvents();
        };
        thisAvailabilityInput.setVars = function ()
        {
            thisAvailabilityInput.detailsLinks = $('.showContent');
        };
        thisAvailabilityInput.initJourneyInfoContainers = function ()
        {
            var i = 0,
            journeyInfoList = this.journeyInfoList,
            journeyInfo = null;
            for (i = 0; i < journeyInfoList.length; i += 1)
            {
                journeyInfo = new SKYSALES.Class.JourneyInfo();
                journeyInfo.init(journeyInfoList[i]);
                thisAvailabilityInput.journeyInfoArray[thisAvailabilityInput.journeyInfoArray.length] = journeyInfo;
            }
        };
        thisAvailabilityInput.initLowestPriceSelection = function ()
        {
            var dateMarketLowestFareInfo = null,
            dateMarketLowestFareList = this.dateMarketLowestFareList,
            i = 0;
            for (i = 0; i < dateMarketLowestFareList.length; i += 1)
            {
                dateMarketLowestFareInfo = new SKYSALES.Class.LowestFareInfo();
                dateMarketLowestFareInfo.init(dateMarketLowestFareList[i]);
                thisAvailabilityInput.dateMarketLowestFareArray[thisAvailabilityInput.dateMarketLowestFareArray.length] = dateMarketLowestFareInfo;
            }
        };
        thisAvailabilityInput.init = function ()
        {
            thisAvailabilityInput.initJourneyInfoContainers();
            thisAvailabilityInput.initLowestPriceSelection();
            if (SKYSALES.taxAndFeeInclusiveDisplayDataRequestHandler)
            {
                thisAvailabilityInput.setVars();
                thisAvailabilityInput.addEvents();
                thisAvailabilityInput.getPriceItineraryInfo();
            }
        };
        return thisAvailabilityInput;
    };
}

/*
    Name: 
        Class LowestFareInfo
    Param: 
        None
    Return: 
        an instance of LowestFareInfo
    Functionality: 
        The object that initializes the LowestFareInfo control
    Notes: 
        The LowestFareInfo is sent down to the browser via JSON that is created in the XSLT file.
        The XSLT creates a new SKYSALES.availabilityInput.dateMarketLowestFareList and then the 
        SKYSALES.availabilityInput.init function calls the SKYSALES.availabilityInput.initLowestPriceSelection which will
        select the radio button sent down as the lowest fare control id.This class also attemps to call 
        taxAndFeeInclusiveDisplayDataRequestHandler that is in TaxAndFeeInclusiveDisplay.js
    Class Hierarchy: 
        AvailabilityInput
*/

SKYSALES.Class.LowestFareInfo = function (json)
{
    var parent = new SKYSALES.Class.SkySales(),
    thisLowestFareInfo = SKYSALES.Util.extendObject(parent);

    thisLowestFareInfo.tripMarketIndex = '';
    thisLowestFareInfo.marketIndex = '';
    thisLowestFareInfo.dateMarketIndex = '';
    thisLowestFareInfo.lowestFareControlId = "";
    thisLowestFareInfo.lowestFareControl = null;

    thisLowestFareInfo.init = function (paramObject)
    {
        this.setSettingsByObject(paramObject);
        this.setVars();
        this.addEvents();
        this.selectDateMarketLowestFare();
    };
    thisLowestFareInfo.setVars = function ()
    {
        thisLowestFareInfo.lowestFareControl = this.getById(thisLowestFareInfo.lowestFareControlId);
    };
    thisLowestFareInfo.setSettingsByObject = function (jsonObject)
    {
        var propName = '';
        for (propName in jsonObject)
        {
            if (thisLowestFareInfo.hasOwnProperty(propName))
            {
                thisLowestFareInfo[propName] = jsonObject[propName];
            }
        }
    };
    thisLowestFareInfo.selectDateMarketLowestFare = function ()
    {
        if (thisLowestFareInfo.lowestFareControl !== null)
        {
            thisLowestFareInfo.lowestFareControl.attr("checked", "checked");
        }
    };
    return thisLowestFareInfo;
};

/*
    Name: 
        Class JourneyInfo
    Param:
        None
    Return: 
        An instance of JourneyInfo
     Functionality:
        The object that represents the journey information on the AvailabilityInput control
    Notes:
        When the user clicks a link to view more details about the flight it gets the data and shows it in a floating div.
        It uses AJAX to get data about the equipment that the journey will use.
        The AJAX response sends the equipment data in the form of a JSON object.
    Class Hierarchy:
        AvailabilityInput
*/
SKYSALES.Class.JourneyInfo = function (json)
{
    var parent = new SKYSALES.Class.SkySales(),
    thisJourneyInfo = SKYSALES.Util.extendObject(parent);
    thisJourneyInfo.equipmentInfoUri = 'EquipmentPropertiesDisplayAjax-resource.aspx';
    thisJourneyInfo.key = '';
    thisJourneyInfo.journeyContainerId = "";
    thisJourneyInfo.activateJourneyId = "";
    thisJourneyInfo.activateJourney = null;
    thisJourneyInfo.deactivateJourneyId = "";
    thisJourneyInfo.deactivateJourney = null;
    thisJourneyInfo.journeyContainer = null;
    thisJourneyInfo.legInfoArray = [];
    thisJourneyInfo.clientName = 'EquipmentPropertiesDisplayControlAjax';
    
    thisJourneyInfo.init = function (paramObject)
    {
        this.setSettingsByObject(paramObject);
        this.setVars();
        this.addEvents();
    };
    thisJourneyInfo.setVars = function ()
    {
        thisJourneyInfo.journeyContainer = this.getById(thisJourneyInfo.journeyContainerId);
        thisJourneyInfo.activateJourney = this.getById(thisJourneyInfo.activateJourneyId);
        thisJourneyInfo.deactivateJourney = this.getById(thisJourneyInfo.deactivateJourneyId);
    };
    thisJourneyInfo.addEvents = function ()
    {
        thisJourneyInfo.activateJourney.click(thisJourneyInfo.show);
        thisJourneyInfo.deactivateJourney.click(thisJourneyInfo.hide);
    };
    thisJourneyInfo.setSettingsByObject = function (jsonObject)
    {
        var propName = '';
        for (propName in jsonObject)
        {
            if (thisJourneyInfo.hasOwnProperty(propName))
            {
                thisJourneyInfo[propName] = jsonObject[propName];
            }
        }
    };
    thisJourneyInfo.showWithDataHandler = function (data)
    {
        thisJourneyInfo.showWithData(data);
    };
    thisJourneyInfo.showWithData = function (data)
    {
        var legInfoStr = $(data).html(),
        legInfoJson = SKYSALES.Json.parse(legInfoStr),
        legInfoHash = legInfoJson.legInfo,
        legInfo = null,
        prop = '',
        propertyContainer = null,
        propertyHtml = '',
        equipmentPropertyArray = null,
        i = 0,
        equipmentProperty = null;
        for (prop in legInfoHash)
        {
            if (legInfoHash.hasOwnProperty(prop))
            {
                propertyHtml = '';
                legInfo = legInfoHash[prop];
                if (legInfo.legIndex !== undefined)
                {
                    propertyContainer = this.getById('propertyContainer_' + thisJourneyInfo.key);
                    equipmentPropertyArray = legInfo.equipmentPropertyArray;
                    for (i = 0; i < equipmentPropertyArray.length; i += 1)
                    {
                        equipmentProperty = equipmentPropertyArray[i];
                        propertyHtml += '<div>' + equipmentProperty.name + ': ' + equipmentProperty.value + '<\/div>';
                    }
                    propertyContainer.html(propertyHtml);
                }
            }
        }
        this.journeyContainer.show('slow');
    };
    thisJourneyInfo.show = function ()
    {
        var legInfoArray = thisJourneyInfo.legInfoArray,
        legInfo = null,
        postHash = {},
        prop = '',
        i = 0,
        propName = thisJourneyInfo.clientName;
        for (i = 0; i < legInfoArray.length; i += 1)
        {
            legInfo = legInfoArray[i];
            for (prop in legInfo)
            {
                if (legInfo.hasOwnProperty(prop))
                {
                    postHash[propName + '$legInfo_' + prop + '_' + i] = legInfo[prop];
                }
            }
        }
        $.post(thisJourneyInfo.equipmentInfoUri, postHash, thisJourneyInfo.showWithDataHandler);
    };
    thisJourneyInfo.hide = function ()
    {
        thisJourneyInfo.journeyContainer.hide();
    };
    return thisJourneyInfo;
};
