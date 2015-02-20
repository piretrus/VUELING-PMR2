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
        aos.js
            Provides the base aos functionality

    General Notes:
        This file deals with aos activities.
        This file is an extension of the aos.js file with just the extra code for activities.
        
    JsLint Status:
        Pass - JsLint Edition 2009-09-01
        
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

/*global $: false, SKYSALES: false, window: false, Option: false, document: false */

/*
    Name: 
        Class AosBase
    Param:
        None
    Return: 
        An instance of AosBase
     Functionality:
        The object that initializes the ActivitySearch control
    Notes:
        A FlightSearchContainer object is created every time a div appears in the dom that has a class of activitySearchContainer
        <div class="activitySearchContainer" ></div>
        There should be one instance of this object for every ActivitySearch  control in the view.
    Class Hierarchy:
        SkySales -> AosBase -> AosSearch -> ActivitySearch
*/
if (SKYSALES.Class.ActivitySearch === undefined)
{
    SKYSALES.Class.ActivitySearch = function ()
    {
        var thisActivitySearch = this;
        var activitySearchArray = [];

        var ActivitySearch = function ()
        {
            var aosSearch = new SKYSALES.Class.AosSearch();
            var thisActivitySearch = SKYSALES.Util.extendObject(aosSearch);
            return thisActivitySearch;
        };
        thisActivitySearch.addActivitySearch = function (activityParamObj)
        {
            var activitySearch = new ActivitySearch();
            activitySearch.init(activityParamObj);
            activitySearchArray[activitySearchArray.length] = activitySearch;
        };
        var SortBy = function ()
        {
            var sortByBase = new SKYSALES.Class.SortByBase();
            var thisSortBy = SKYSALES.Util.extendObject(sortByBase);
            return thisSortBy;
        };
        thisActivitySearch.addSortBy = function (sortByParamObj)
        {
            var sortBy = new SortBy();
            sortBy.init(sortByParamObj);
        };
        return thisActivitySearch;
    };
    SKYSALES.Class.ActivitySearch.initializeActivitys = function ()
    {
        var paramObject = {
            objNameBase: 'activitySearch',
            objType: 'ActivitySearch',
            selector: 'div.activitySearchContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.ActivitySearch.initializeActivitys);
}

/*
    Name: 
        Class ActivityAvailability
    Param:
        None
    Return: 
        An instance of ActivityAvailability
     Functionality:
        The object that initializes the Activity control
    Notes:
        A FlightSearchContainer object is created every time a div appears in the dom that has a class of activityContainer
        <div class="activityContainer" ></div>
        There should be one instance of this object for every ActivityAvailability  control in the view.
        
        Activity, AvailableItem, Group, and sortBy are inner classes that should probably be broken out.
    Class Hierarchy:
        SkySales -> AosBase -> Aos -> ActivityAvailability
*/
if (SKYSALES.Class.ActivityAvailability === undefined)
{
    SKYSALES.Class.ActivityAvailability = function ()
    {
        var thisActivityAvailability = this;
        var activityArray = [];
        var groupArray = [];
        var availableItemArray = [];

        var Activity = function ()
        {
            var aos = new SKYSALES.Class.Aos();
            var thisActivity = SKYSALES.Util.extendObject(aos);
            
            thisActivity.groupArray = [];
            thisActivity.groupSelectId = '';
            
            var groupSelect = null;
            
            thisActivity.setSettingsByObject = function (jsonObject)
            {
                aos.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisActivity.hasOwnProperty(propName))
                    {
                        thisActivity[propName] = jsonObject[propName];
                    }
                }
            };
            thisActivity.hideAllGroups = function ()
            {
                var groupIndex = 0;
                var id = '';
                var group = null;
                for (groupIndex = 0; groupIndex < thisActivity.groupArray.length; groupIndex += 1)
                {
                    id = thisActivity.groupArray[groupIndex];
                    group = this.getById(id);
                    $('select', group).val(0);
                    group.hide();
                }
            };
            thisActivity.updateGroupHandler = function ()
            {
                thisActivity.updateGroup();
            };
            thisActivity.updateGroup = function ()
            {
                this.hideAllGroups();
                var id = groupSelect.val();
                this.getById(id).show();
            };
            thisActivity.showFunction = function ()
            {
                aos.showFunction.call(this);
                thisActivity.updateGroup();
            };
            thisActivity.addEvents = function ()
            {
                aos.addEvents.call(this);
                groupSelect.change(this.updateGroupHandler);
            };
            thisActivity.setVars = function ()
            {
                aos.setVars.call(this);
                groupSelect = this.getById(thisActivity.groupSelectId);
            };
            thisActivity.addGroup = function (group)
            {
                thisActivity.groupArray[thisActivity.groupArray.length] = group;
            };
            return thisActivity;
        };
        thisActivityAvailability.addActivity = function (activityParamObj)
        {
            var activity = new Activity();
            activity.init(activityParamObj);
            activityArray[activityArray.length] = activity;
        };
        var Group = function ()
        {
            var groupBase = new SKYSALES.GroupBase();
            var thisGroup = SKYSALES.extendObject(groupBase);          
            return thisGroup;
        };
        thisActivityAvailability.addGroup = function (groupParamObj)
        {
            var group = new Group();
            group.init(groupParamObj);
            availableItemArray[groupArray.length] = group;
        };
        var SortBy = function ()
        {
            var sortByBase = new SKYSALES.Class.SortByBase();
            var thisSortBy = SKYSALES.Util.extendObject(sortByBase);          
            return thisSortBy;
        };
        thisActivityAvailability.addSortBy = function (sortByParamObj)
        {
            var sortBy = new SortBy();
            sortBy.init(sortByParamObj);
        };
        var AvailableItem = function ()
        {
            var availableItemBase = new SKYSALES.Class.AvailableItemBase();
            var thisAvailableItem = SKYSALES.Util.extendObject(availableItemBase);
            
            thisAvailableItem.quantityMax = 5;
            thisAvailableItem.quantityId = '';
            thisAvailableItem.quantity = null;
            thisAvailableItem.soldOutId = '';
            thisAvailableItem.soldOut = null;
            
            thisAvailableItem.setSettingsByObject = function (jsonObject)
            {
                availableItemBase.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisAvailableItem.hasOwnProperty(propName))
                    {
                        thisAvailableItem[propName] = jsonObject[propName];
                    }
                }
            };
            thisAvailableItem.getQuantityOptions = function ()
            {
                var i = 0;
                var quantityOptions = [];
                if (thisAvailableItem.quantityMax === -1)
                {
                    thisAvailableItem.quantityMax = 10;
                }
                for (i = 1; i <= thisAvailableItem.quantityMax; i += 1)
                {
                    quantityOptions[quantityOptions.length] = new Option(i, i, false, false);
                }
                return quantityOptions;
            };
            thisAvailableItem.populateQuantity = function ()
            {
                var quantityOptions = this.getQuantityOptions();
                this.addOptions(this.quantity.get(0), quantityOptions);
            };
            thisAvailableItem.setVars = function ()
            {
                availableItemBase.setVars.call(this);
                thisAvailableItem.quantity = $(window.document.getElementById(thisAvailableItem.quantityId));
                thisAvailableItem.soldOut = $(window.document.getElementById(thisAvailableItem.soldOutId));
            };
            thisAvailableItem.showSoldOut = function ()
            {
                thisAvailableItem.soldOut.hide();
                if (thisAvailableItem.quantityMax === 0)
                {
                    thisAvailableItem.quantity.hide();
                    thisAvailableItem.soldOut.show();
                }
            };
            thisAvailableItem.init = function (paramObj)
            {
                availableItemBase.init.call(this, paramObj);
                this.populateQuantity();
                this.showSoldOut();
            };
            return thisAvailableItem;
        };
        thisActivityAvailability.addAvailableItem = function (availableItemParamObj)
        {
            var availableItem = new AvailableItem();
            availableItem.init(availableItemParamObj);
            availableItemArray[availableItemArray.length] = availableItem;
        };
        return thisActivityAvailability;
    };
    SKYSALES.Class.ActivityAvailability.initializeActivitys = function ()
    {
        var paramObject = {
            objNameBase: 'activityAvailability',
            objType: 'ActivityAvailability',
            selector: 'div#activityContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.ActivityAvailability.initializeActivitys);
}