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

    General Notes:
        This is the base file for the other aos JavaScript files.
        
    JsLint Status:
        Pass - JsLint Edition 2009-08-31
        
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
        AosBase is the Aos Base class.
    Notes:
        It seperates all aos classes from non aos classes.
        If the object is an AosBase its part of Aos.
    Class Hierarchy:
        SkySales -> AosBase
*/
if (!SKYSALES.Class.AosBase)
{
    SKYSALES.Class.AosBase = function ()
    {   
        var parent = new SKYSALES.Class.SkySales();
        var thisAosBase = SKYSALES.Util.extendObject(parent);
        thisAosBase.addOptions = SKYSALES.Class.AosBase.prototype.addOptions;
        return thisAosBase;
    };
    
    SKYSALES.Class.AosBase.prototype.addOptions = function (dropDown, optionList) 
    {
        var i = 0;
        if (dropDown && dropDown.options)
        {
            for (i = 0; i < optionList.length; i += 1)
            {
                dropDown.options[dropDown.options.length] = optionList[i];
            }
        }
    };
}

/*
    Name: 
        Class PaymentPassThroughBase
    Param:
        None
    Return: 
        An instance of PaymentPassThroughBase
    Functionality:
        This is the base class for payment pass through.
    Notes:
        Payment pass through is when a payment method is entered in to the system,
        and then passed directly to the collecting party.
        The payment method is not charged by SkySales.
        An example of payment pass through is holding a hotel room with a credit card.
        The credit card is not charged, but the card data is sent to the hotel provider.
    Class Hierarchy:
        SkySales -> AosBase -> PaymentPassThroughBase
*/
if (SKYSALES.Class.PaymentPassThroughBase === undefined)
{
    SKYSALES.Class.PaymentPassThroughBase = function ()
    {   
        var passThroughBase = new SKYSALES.Class.AosBase();
        var thisPassThroughBase = SKYSALES.Util.extendObject(passThroughBase);
        
        thisPassThroughBase.showHideId = '';
        thisPassThroughBase.showHide = null;
        
        thisPassThroughBase.setSettingsByObject = function (jsonObject)
        {
            passThroughBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisPassThroughBase.hasOwnProperty(propName))
                {
                    thisPassThroughBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisPassThroughBase.setVars = function ()
        {
            passThroughBase.setVars.call(this);
            thisPassThroughBase.showHide = this.getById(thisPassThroughBase.showHideId);
        };
        
        thisPassThroughBase.addEvents = function ()
        {
            passThroughBase.addEvents.call(this);
            var changeCount = 0;
            var toggleChange = function ()
            {
                if ((changeCount % 2) === 0)
                {
                    thisPassThroughBase.hide();
                }
                else
                {
                    thisPassThroughBase.show();
                }
                changeCount += 1;
            };
            thisPassThroughBase.showHide.change(toggleChange);
        };
        
        thisPassThroughBase.init = function (paramObj)
        {
            passThroughBase.init.call(this, paramObj);
            thisPassThroughBase.addEvents();
        };
        return thisPassThroughBase;
    };
}

/*
    Name: 
        Class SortByBase
    Param:
        None
    Return: 
        An instance of SortByBase
    Functionality:
        This is the base class for sorting aos availability results.
    Notes:
        The sort by select box is populated based on values from aos, 
        this is good because new sort by methods from travel commerce are automatically consumed,
        this is bad because the text in the select box is not changable.
    Class Hierarchy:
        SkySales -> AosBase -> SortByBase
*/
if (SKYSALES.Class.SortByBase === undefined)
{
    SKYSALES.Class.SortByBase = function ()
    {   
        var sortByBase = new SKYSALES.Class.AosBase();
        var thisSortByBase = SKYSALES.Util.extendObject(sortByBase);
        
        thisSortByBase.optionArray = [];
        thisSortByBase.selectedId = '';
        thisSortByBase.select = null;
        thisSortByBase.sortedBy = "";
        
        thisSortByBase.setSettingsByObject = function (jsonObject)
        {
            sortByBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisSortByBase.hasOwnProperty(propName))
                {
                    thisSortByBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisSortByBase.populateSortBySelect = function ()
        {
            var optionTextArray = thisSortByBase.optionArray;
            var i = 0;
            var selectBox = thisSortByBase.select.get(0);
            var text = '';
            var value = '';
            var charIndex = 0;
            var textOrig = '';
            var character = '';
            var optionArray = [];
            if (selectBox)
            {
                for (i = 0; i < optionTextArray.length; i += 1)
                {
                    text = '';
                    textOrig = optionTextArray[i];
                    for (charIndex = 0; charIndex < textOrig.length; charIndex += 1)
                    {
                        character = textOrig.charAt(charIndex);
                        if (character.search(/^[A-Z]$/) > -1)
                        {
                            character = ' ' + character;
                        }
                        text += character;
                    }
                    value = optionTextArray[i];
                    optionArray[optionArray.length] = new Option(text, value, false, false);
                }
                thisSortByBase.addOptions(selectBox, optionArray);
                thisSortByBase.select.val(thisSortByBase.sortedBy);
            }
        };
        
        thisSortByBase.init = function (paramObj)
        {
            sortByBase.init.call(this, paramObj);
            thisSortByBase.populateSortBySelect();
            //this.addEvents();
        };
        
        thisSortByBase.setVars = function ()
        {
            sortByBase.setVars.call(this);
            thisSortByBase.select = this.getById(thisSortByBase.selectedId);
        };
        return thisSortByBase;
    };
}

/*
    Name: 
        Class PageBase
    Param:
        None
    Return: 
        An instance of PageBase
    Functionality:
        Provides paging for aos availability
    Notes:
        The aos paging uses a template from the XSLT file.
        This template does not use the SkySales standard of using [memberName] to 
        represent a variable that needs to be swapped out in the template.
        It uses -memberName-.
    Class Hierarchy:
        SkySales -> AosBase -> PageBase
*/
if (SKYSALES.Class.PageBase === undefined)
{
    SKYSALES.Class.PageBase = function ()
    {
        var pageBase = new SKYSALES.Class.AosBase();
        var thisPageBase = SKYSALES.Util.extendObject(pageBase);
        
        thisPageBase.pageNumber = 1;
        thisPageBase.pageSize = 10;
        thisPageBase.totalCount = 50;
        thisPageBase.pageContainerId = '';
        thisPageBase.pageContainer = null;
        thisPageBase.previous = 'Previous';
        thisPageBase.next = 'Next';
        thisPageBase.pageNodeId = '';
        thisPageBase.pageNode = null;
        thisPageBase.currentPageClass = 'buttonSelected';
        thisPageBase.pageNumberId = '';
        var pageNumber = null;
        thisPageBase.pageInputClass = 'pageInput';
        thisPageBase.pageEventClass = 'pageEvent';
        thisPageBase.hoverClass = 'hover';
        thisPageBase.clientName = '';
        thisPageBase.buttonPrefix = '';
        thisPageBase.inputPrefix = '';
        
        var nameDel = "$";
        
        thisPageBase.setSettingsByObject = function (jsonObject)
        {
            pageBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisPageBase.hasOwnProperty(propName))
                {
                    thisPageBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisPageBase.pageMin = function (totalPageCount)
        {
            var retVal = 1;
            var lowerBoundMaximumVal = 1;
            var lowerBoundFromOffset = 1;
            if (thisPageBase.pageNumber >= 5)
            {
                lowerBoundMaximumVal = totalPageCount - 9;
                lowerBoundFromOffset = thisPageBase.pageNumber - 4;
                if (lowerBoundMaximumVal > lowerBoundFromOffset)
                {
                    retVal = lowerBoundFromOffset;
                }
                else if (lowerBoundMaximumVal < 1)
                {
                    retVal = 1;
                }
                else
                {
                    retVal = lowerBoundMaximumVal;
                }
            }
            return retVal;
        };
        
        thisPageBase.pageMax = function (pageMinVal, totalPageCount)
        {
            var retVal = pageMinVal + 9;
            if (retVal > totalPageCount)
            {
                retVal = totalPageCount;
            }
            return retVal;
        };
        
        thisPageBase.drawPage = function ()
        {
            var pageNodeOrig = thisPageBase.pageNode.html();
            var html = '';
            var i = 0;
            if (!thisPageBase.pageSize)
            {
                thisPageBase.pageSize = 1;
            }
            var pageNumberReplacement = /-pageNumber-/g;
            var pageNumberValueReplacement = /-pageNumberValue-/g;
            var totalPageCount = Math.ceil(thisPageBase.totalCount / thisPageBase.pageSize);
            var pageNumHtml = '';
            var pageMinVal = thisPageBase.pageMin(totalPageCount);
            var pageMaxVal = thisPageBase.pageMax(pageMinVal, totalPageCount);
            
            if (totalPageCount > 1)
            {
                if (thisPageBase.pageNumber > 1)
                {
                    html = pageNodeOrig.replace(pageNumberReplacement, thisPageBase.previous);
                    html = html.replace(pageNumberValueReplacement, thisPageBase.pageNumber - 1);
                }
                
                for (i = pageMinVal; i <= pageMaxVal; i += 1)
                {
                    pageNumHtml = pageNodeOrig.replace(pageNumberReplacement, i);
                    if (thisPageBase.pageNumber === i)
                    {
                        pageNumHtml = pageNumHtml.replace(/-activeClass-/g, thisPageBase.currentPageClass);
                    }
                    else
                    {
                        pageNumHtml = pageNumHtml.replace(/-activeClass-/g, '');
                    }
                    pageNumHtml = pageNumHtml.replace(pageNumberValueReplacement, i);
                    html += pageNumHtml;
                }
                
                if (thisPageBase.pageNumber < totalPageCount)
                {
                    html += pageNodeOrig.replace(pageNumberReplacement, thisPageBase.next);
                    html = html.replace(pageNumberValueReplacement, thisPageBase.pageNumber + 1);
                }
                
                thisPageBase.pageContainer.html(html);
            }
        };
        
        thisPageBase.setVars = function (paramObj)
        {
            pageBase.setVars.call(this);
            thisPageBase.pageContainer = this.getById(thisPageBase.pageContainerId);
            thisPageBase.pageNode = this.getById(thisPageBase.pageNodeId);
            pageNumber = this.getById(thisPageBase.pageNumberId);
        };
        
        thisPageBase.updateHandler = function ()
        {
            var pageNumberId = this.id.replace(thisPageBase.buttonPrefix, thisPageBase.inputPrefix);
            var pageNumberObj = thisPageBase.getById(pageNumberId);
            var goToPage = pageNumberObj.val();
            pageNumber.val(goToPage);
            thisPageBase.sendRequest();
        };
        
        thisPageBase.sendRequest = function ()
        {
            var param = thisPageBase.clientName + nameDel + 'UpdatePage';
            /*jslint nomen: false */
            window.__doPostBack(param);
            /*jslint nomen: true */
        };
        
        thisPageBase.addEvents = function ()
        {
            var pageEvents = $('.' + thisPageBase.pageEventClass, thisPageBase.pageContainer);
            pageEvents.click(thisPageBase.updateHandler);
        };
        
        thisPageBase.init = function (paramObj)
        {
            pageBase.init.call(this, paramObj);
            thisPageBase.drawPage();
            thisPageBase.addEvents();
        };
        return thisPageBase;
    };
}

/*
    Name: 
        Class GroupBase
    Param:
        None
    Return: 
        An instance of GroupBase
    Functionality:
        Provides grouping for aos availability
    Notes:
        The aos availability items are grouped to be easer to select from in the UI
        Such as the activities are grouped by date
    Class Hierarchy:
        SkySales -> AosBase -> GroupBase
*/
if (SKYSALES.Class.GroupBase === undefined)
{
    SKYSALES.GroupBase = function ()
    {   
        var groupBase = new SKYSALES.Class.AosBase();
        var thisGroupBase = SKYSALES.Util.extendObject(groupBase);
        
        thisGroupBase.setSettingsByObject = function (jsonObject)
        {
            groupBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisGroupBase.hasOwnProperty(propName))
                {
                    thisGroupBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisGroupBase.init = function (paramObj)
        {
            groupBase.init.call(this, paramObj);
            this.addEvents();
        };
        return thisGroupBase;
    };
}

/*
    Name: 
        Class AvailableItemBase
    Param:
        None
    Return: 
        An instance of AvailableItemBase
    Functionality:
        Base class for an aos available item
    Notes:
    Class Hierarchy:
        SkySales -> AosBase -> AvailableItemBase
*/
if (SKYSALES.Class.AvailableItemBase === undefined)
{
    SKYSALES.Class.AvailableItemBase = function ()
    {   
        var aosBase = new SKYSALES.Class.AosBase();
        var thisItemBase = SKYSALES.Util.extendObject(aosBase);

        thisItemBase.setSettingsByObject = function (jsonObject)
        {
            aosBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisItemBase.hasOwnProperty(propName))
                {
                    thisItemBase[propName] = jsonObject[propName];
                }
            }
        };

        thisItemBase.init = function (paramObj)
        {
            aosBase.init.call(this, paramObj);
            this.addEvents();
        };
        
        return thisItemBase;
    };
}

/*
    Name: 
        Class AosSearch
    Param:
        None
    Return: 
        An instance of AosSearch
    Functionality:
        Base class for an aos search
    Notes:
        Provides the basic functionality for searching for aos availability
        that all of the aos categories use.
    Class Hierarchy:
        SkySales -> AosBase -> AosSearch
*/
if (SKYSALES.Class.AosSearch === undefined)
{
    SKYSALES.Class.AosSearch = function ()
    {   
        var aosBase = new SKYSALES.Class.AosBase();
        var thisAosSearch = SKYSALES.Util.extendObject(aosBase);
        
        thisAosSearch.locationInfo = SKYSALES.Util.getResource().locationInfo;
        thisAosSearch.locationId = '';
        thisAosSearch.locationDropDownId = '';
        
        thisAosSearch.sourceCodeInfo = SKYSALES.Util.getResource().sourceInfo;
        thisAosSearch.sourceCodeId = '';
        thisAosSearch.sourceCodeDropDownId = '';
        
        thisAosSearch.startDateId = '';
        thisAosSearch.startDayId = '';
        thisAosSearch.startMonthYearId = '';
        thisAosSearch.startMonthCount = 1;
        
        thisAosSearch.endDateId = '';
        thisAosSearch.endDayId = '';
        thisAosSearch.endMonthYearId = '';
        thisAosSearch.endMonthCount = 1;
        
        thisAosSearch.dateFormat = SKYSALES.datepicker.datePickerFormat;
        thisAosSearch.dateDelimiter = SKYSALES.datepicker.datePickerDelimiter;
        
        var locationArray = [];
        var location = '';
        var locationDropDown = '';
        
        var sourceCodeArray = [];
        var sourceCode = '';
        var sourceCodeDropDown = '';
        
        var startDate = '';
        var startDay = '';
        var startMonthYear = '';
        
        var endDate = '';
        var endDay = '';
        var endMonthYear = '';
        
        thisAosSearch.setSettingsByObject = function (jsonObject)
        {
            aosBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisAosSearch.hasOwnProperty(propName))
                {
                    thisAosSearch[propName] = jsonObject[propName];
                }
            }
        };
        
        thisAosSearch.addEvents = function ()
        {
            var startDatePickerManager = new SKYSALES.Class.DatePickerManager();
            startDatePickerManager.isAOS = true;
            startDatePickerManager.yearMonth = startMonthYear;
            startDatePickerManager.day = startDay;
            startDatePickerManager.linkedDate = startDate;
            startDatePickerManager.init();
            
            var endDatePickerManager = new SKYSALES.Class.DatePickerManager();
            endDatePickerManager.isAOS = true;
            endDatePickerManager.yearMonth = endMonthYear;
            endDatePickerManager.day = endDay;
            endDatePickerManager.linkedDate = endDate;
            endDatePickerManager.init();
            
            locationDropDown.change(thisAosSearch.setTextValues);
            location.change(thisAosSearch.setDropDownValues);
            
            sourceCodeDropDown.change(thisAosSearch.setTextValues);
            sourceCode.change(thisAosSearch.setDropDownValues);
        };
        thisAosSearch.populate = function ()
        {
            var startMonthYearOptions = thisAosSearch.getMonthYearOptions(thisAosSearch.startMonthCount);
            thisAosSearch.addOptions(startMonthYear.get(0), startMonthYearOptions);
            
            var endMonthYearOptions = thisAosSearch.getMonthYearOptions(thisAosSearch.endMonthCount);
            thisAosSearch.addOptions(endMonthYear.get(0), endMonthYearOptions);

            var locationOptions = thisAosSearch.getLocationOptions();
            thisAosSearch.addOptions(locationDropDown.get(0), locationOptions);
            
            var sourceCodeOptions = thisAosSearch.getSourceCodeOptions();
            thisAosSearch.addOptions(sourceCodeDropDown.get(0), sourceCodeOptions);
            
        };
        thisAosSearch.getLocationOptions = function ()
        {
            var location = null;
            var i = 0;
            var locationOptions = [];
            for (i = 0; i < locationArray.length; i += 1)
            {
                location = locationArray[i];
                locationOptions[locationOptions.length] = new Option(location.desc, location.code, false, false);
            }
            return locationOptions;
        };
        thisAosSearch.getSourceCodeOptions = function ()
        {
            var sourceCode = null;
            var i = 0;
            var sourceCodeOptions = [];
            for (i = 0; i < sourceCodeArray.length; i += 1)
            {
                sourceCode = sourceCodeArray[i];
                sourceCodeOptions[sourceCodeOptions.length] = new Option(sourceCode.desc, sourceCode.code, false, false);
            }
            return sourceCodeOptions;
        };
        thisAosSearch.getMonthYearOptions = function (monthCount)
        {
            var monthYearOptions = [];
            var curdate = new Date();
            curdate.setDate(1);
            var i = 0;
            var value = '';
            var text = '';
            var resource = SKYSALES.Util.getResource();
            for (i = 0; i < monthCount; i += 1)
            {
                value = parseInt(curdate.getMonth() + 1, 10) + thisAosSearch.dateDelimiter + curdate.getFullYear();
                if (resource.dateCultureInfo.monthNames)
                {
                    text =  resource.dateCultureInfo.monthNames[curdate.getMonth()] + ' ' + curdate.getFullYear();
                    monthYearOptions[monthYearOptions.length] = new Option(text, value);
                    curdate.setMonth(curdate.getMonth() + 1);
                }
            }
            return monthYearOptions;
        };
        thisAosSearch.setTextValues = function ()
        {
            location.val(locationDropDown.val());
            sourceCode.val(sourceCodeDropDown.val());
        };
        thisAosSearch.setDropDownValues = function ()
        {
            var startDateObj = thisAosSearch.parseDate(startDate.val());
            startDay.val(startDateObj.getDate());
            var month = startDateObj.getMonth() + 1;
            startMonthYear.val(month + thisAosSearch.dateDelimiter + startDateObj.getFullYear());
            
            var endDateObj = thisAosSearch.parseDate(endDate.val());
            endDay.val(endDateObj.getDate());
            month = endDateObj.getMonth() + 1;
            endMonthYear.val(month + thisAosSearch.dateDelimiter + endDateObj.getFullYear());
            
            locationDropDown.val(location.val());
            sourceCodeDropDown.val(sourceCode.val());
        };
        thisAosSearch.parseDate = function (dateStr)
        {
            var day = '';
            var month = '';
            var year = '';
            var date = new Date();
            var dateData = '';
            var formatChar = '';
            var datePickerArray = [];
            var i = 0;
            var isoResult = SKYSALES.Util.parseIsoDate(dateStr);

            if (isoResult)
            {
                date = isoResult;
            }
            else if (dateStr.indexOf(thisAosSearch.dateDelimiter) > -1)
            {
                datePickerArray = dateStr.split(thisAosSearch.dateDelimiter);
                for (i = 0; i < thisAosSearch.dateFormat.length; i += 1)
                {
                    dateData = datePickerArray[i];
                    if (dateData.charAt(0) === '0')
                    {
                        dateData = dateData.substring(1);
                    }
                    formatChar = thisAosSearch.dateFormat.charAt(i);
                    switch (formatChar)
                    {
                    case 'm': 
                        month = dateData; 
                        break;
                    case 'd': 
                        day = dateData; 
                        break;
                    case 'y': 
                        year = dateData; 
                        break;
                    }
                }
                
                date = new Date(year, month - 1, day);
            }
            return date;
        };
        thisAosSearch.setVars = function ()
        {
            aosBase.setVars.call(this);
            locationArray = thisAosSearch.locationInfo.LocationList;
            if (!locationArray)
            {
                locationArray = [];
            }
            
            location = this.getById(thisAosSearch.locationId);
            locationDropDown = this.getById(thisAosSearch.locationDropDownId);
            
            sourceCodeArray = thisAosSearch.sourceCodeInfo.SourceList;
            if (!sourceCodeArray)
            {
                sourceCodeArray = [];
            }
            
            sourceCode = this.getById(thisAosSearch.sourceCodeId);
            sourceCodeDropDown = this.getById(thisAosSearch.sourceCodeDropDownId);
        
            startDate = this.getById(thisAosSearch.startDateId);
            startDay = this.getById(thisAosSearch.startDayId);
            startMonthYear = this.getById(thisAosSearch.startMonthYearId);
        
            endDate = this.getById(thisAosSearch.endDateId);
            endDay = this.getById(thisAosSearch.endDayId);
            endMonthYear = this.getById(thisAosSearch.endMonthYearId);
        };
        thisAosSearch.init = function (paramObj)
        {
            aosBase.init.call(this, paramObj);
            this.populate();
            this.addEvents();
            this.setDropDownValues();
        };
        return thisAosSearch;
    };
}

/*
    Name: 
        Class Aos
    Param:
        None
    Return: 
        An instance of Aos
    Functionality:
        Base class for an aos availability
    Notes:
        Provides the basic functionality for aos availability results.
        Shows and hides the results you wish to see
    Class Hierarchy:
        SkySales -> AosBase -> Aos
*/
if (SKYSALES.Class.Aos === undefined)
{
    SKYSALES.Class.Aos = function ()
    {   
        var aosBase = new SKYSALES.Class.AosBase();
        var thisAos = SKYSALES.Util.extendObject(aosBase);

        thisAos.showText = '';
        thisAos.hideText = '';
        thisAos.showHideTextEventId = '';
        thisAos.showHideImgEventId = '';
        thisAos.showHideImgUp = '';
        thisAos.showHideImgDown = '';
        
        var showHideDiv = null;
        var showHideImgLink = '';
        var showHideTextLink = '';
        
        thisAos.setSettingsByObject = function (jsonObject)
        {
            aosBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisAos.hasOwnProperty(propName))
                {
                    thisAos[propName] = jsonObject[propName];
                }
            }
        };
        
        thisAos.showFunction = function ()
        {
            showHideDiv.show();
            showHideTextLink.html(thisAos.hideText);
            showHideImgLink.attr('src', thisAos.showHideImgUp);
        };
        thisAos.hideFunction = function ()
        {
            showHideDiv.hide();
            showHideTextLink.html(thisAos.showText);
            showHideImgLink.attr('src', thisAos.showHideImgDown);
        };
        thisAos.addEvents = function ()
        {
            showHideImgLink.attr('src', this.showHideImgDown);
            showHideTextLink.html(this.showText);
            showHideDiv.hide();
            
            showHideTextLink.toggle(this.showFunction, this.hideFunction);
            showHideImgLink.toggle(this.showFunction, this.hideFunction);
        };
        thisAos.setVars = function ()
        {
            aosBase.setVars.call(this);
            showHideDiv = this.getById(this.containerId);
            showHideImgLink = this.getById(this.showHideImgEventId);
            showHideTextLink = this.getById(this.showHideTextEventId);
        };
        thisAos.init = function (paramObj)
        {
            aosBase.init.call(this, paramObj);
            this.addEvents();
        };
        return thisAos;
    };
}

/*
    Name: 
        Class Page
    Param:
        None
    Return: 
        An instance of Page
    Functionality:
        The object that initializes the aos paging
    Notes:
        A Page object is created every time a div appears in the dom that has a class of page
        <div class="page" ></div>
        There should be one instance of this object for every aos control in the view.
    Class Hierarchy:
        SkySales -> AosBase -> PageBase -> Page
*/
if (SKYSALES.Class.Page === undefined)
{
    SKYSALES.Class.Page = function ()
    {
        var thisPage = this;
        var Page = function ()
        {
            var pageBase = new SKYSALES.Class.PageBase();
            var thisPage = SKYSALES.Util.extendObject(pageBase);
            return thisPage;
        };
        thisPage.addPage = function (pageParamObj)
        {
            var page = new Page();
            page.init(pageParamObj);
        };
        return thisPage;
    };
    SKYSALES.Class.Page.initializePages = function ()
    {
        var paramObject = {
            objNameBase: 'page',
            objType: 'Page',
            selector: 'div.page'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.Page.initializePages);
}

/*
    Name: 
        Class TermsAndConditionsBase
    Param:
        None
    Return: 
        An instance of TermsAndConditionsBase
    Functionality:
        The base class for the terms and conditions
    Notes:
        Uses AJAX to retrieve the terms and conditions,
        and then injects them into the dom
    Class Hierarchy:
        SkySales -> AosBase -> TermsAndConditionsBase
*/
if (SKYSALES.Class.TermsAndConditionsBase === undefined)
{
    SKYSALES.Class.TermsAndConditionsBase = function ()
    {   
        var termsBase = new SKYSALES.Class.AosBase();
        var thisTermsBase = SKYSALES.Util.extendObject(termsBase);
        
        thisTermsBase.showHideId = '';
        thisTermsBase.showHide = null;
        thisTermsBase.inputId = '';
        thisTermsBase.input = null;
        thisTermsBase.url = '';
        thisTermsBase.clientName = '';
        var termsInfo = {};
        var nameDel = "$";
        
        
        thisTermsBase.setSettingsByObject = function (jsonObject)
        {
            termsBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            
            {
                if (thisTermsBase.hasOwnProperty(propName))
                {
                    thisTermsBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisTermsBase.setVars = function ()
        {
            termsBase.setVars.call(this);
            thisTermsBase.showHide = this.getById(thisTermsBase.showHideId);
            thisTermsBase.input = this.getById(thisTermsBase.inputId);
        };
        
        thisTermsBase.sendRequest = function ()
        {
            //$.get did not work in IE7
            $.post(thisTermsBase.url, termsInfo, thisTermsBase.updateDom);
        };
        
        thisTermsBase.updateDom = function (data)
        {
            if (thisTermsBase.container)
            {
                thisTermsBase.container.html(data);
                thisTermsBase.show('slow');
            }
        };
        
        thisTermsBase.showTermsAndConditions = function ()
        {
            var inputName = thisTermsBase.input.attr('name');
            inputName = thisTermsBase.clientName + nameDel + inputName;
            termsInfo[inputName] = 1;
            termsInfo[thisTermsBase.clientName + nameDel + "AjaxControlPrefix"] = thisTermsBase.clientName;
            /*jslint nomen: false */
            termsInfo.__EVENTTARGET = thisTermsBase.clientName + nameDel + 'OnTermsAndConditions';
            /*jslint nomen: true */
            thisTermsBase.sendRequest();
        };
        
        thisTermsBase.addEvents = function ()
        {
            termsBase.addEvents.call(this);
            thisTermsBase.showHide.click(thisTermsBase.showTermsAndConditions);
        };
        
        thisTermsBase.init = function (paramObj)
        {
            termsBase.init.call(this, paramObj);
            thisTermsBase.addEvents();
        };
        return thisTermsBase;
    };
}

/*
    Name: 
        Class PaymentTypeBase
    Param:
        None
    Return: 
        An instance of PaymentTypeBase
    Functionality:
        The base class for the payment type
    Notes:
    Class Hierarchy:
        SkySales -> AosBase -> PaymentTypeBase
*/
if (SKYSALES.Class.PaymentTypeBase === undefined)
{
    SKYSALES.Class.PaymentTypeBase = function ()
    {   
        var paymentTypeBase = new SKYSALES.Class.AosBase();
        var thisPaymentTypeBase = SKYSALES.Util.extendObject(paymentTypeBase);
        
        thisPaymentTypeBase.vendorCode = '';
        thisPaymentTypeBase.paymentTypeArray = [];
        
        thisPaymentTypeBase.setSettingsByObject = function (jsonObject)
        {
            paymentTypeBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisPaymentTypeBase.hasOwnProperty(propName))
                {
                    thisPaymentTypeBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisPaymentTypeBase.setVars = function ()
        {
            paymentTypeBase.setVars.call(this);
        };
        
        thisPaymentTypeBase.addEvents = function ()
        {
            paymentTypeBase.addEvents.call(this);
        };
        
        thisPaymentTypeBase.init = function (paramObj)
        {
            paymentTypeBase.init.call(this, paramObj);
            thisPaymentTypeBase.addEvents();
        };
        return thisPaymentTypeBase;
    };
}

/*
    Name: 
        Class AosPaxTypeBase
    Param:
        None
    Return: 
        An instance of AosPaxTypeBase
    Functionality:
        The base class for the aos pax type
    Notes:
        The aos pax types can be different from the booking pax types
    Class Hierarchy:
        SkySales -> AosPaxTypeBase
*/
if (SKYSALES.Class.AosPaxTypeBase === undefined)
{
    SKYSALES.Class.AosPaxTypeBase = function ()
    {
        var parent = new SKYSALES.Class.SkySales();
        var thisAosPaxTypeBase = SKYSALES.Util.extendObject(parent);

        thisAosPaxTypeBase.containerId = '';
        
        thisAosPaxTypeBase.container = null;
        
        thisAosPaxTypeBase.setSettingsByObject = function (jsonObject)
        {
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisAosPaxTypeBase.hasOwnProperty(propName))
                {
                    thisAosPaxTypeBase[propName] = jsonObject[propName];
                }
            }
        };
        
        thisAosPaxTypeBase.addEvents = function () {};
        thisAosPaxTypeBase.init = function (paramObj)
        {
            this.setSettingsByObject(paramObj);
            this.setVars();
        };
        thisAosPaxTypeBase.setVars = function ()
        {
            thisAosPaxTypeBase.container = this.getById(this.containerId);
        };
        thisAosPaxTypeBase.addOptions = function (dropDown, optionList)
        {
            var i = 0;
            if (dropDown)
            {
                for (i = 0; i < optionList.length; i += 1)
                {
                    dropDown.options[dropDown.options.length] = optionList[i];
                }
            }
        };
        return thisAosPaxTypeBase;
    };
}

/*
    Name: 
        Class CancelBase
    Param:
        None
    Return: 
        An instance of CancelBase
    Functionality:
        The base class for the aos calcelation
    Notes:
        Wires up the cancel button
    Class Hierarchy:
        SkySales -> AosBase -> CancelBase
*/
if (SKYSALES.Class.CancelBase === undefined)
{
    SKYSALES.Class.CancelBase = function ()
    {
        var aosBase = new SKYSALES.Class.AosBase();
        var thisCancelBase = SKYSALES.Util.extendObject(aosBase);
        thisCancelBase.cancelLinkId = '';
        thisCancelBase.cancelInputId = '';
        thisCancelBase.cancelButtonName = '';
        
        thisCancelBase.container = null;
        thisCancelBase.cancelLink = '';
        thisCancelBase.cancelInput = '';
        
        thisCancelBase.policiesToggleViewParams = null;
        thisCancelBase.policiesToggleView = null;
        thisCancelBase.descriptionToggleViewParams = null;
        thisCancelBase.descriptionToggleView = null;
        
        thisCancelBase.setSettingsByObject = function (jsonObject)
        {
            aosBase.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisCancelBase.hasOwnProperty(propName))
                {
                    thisCancelBase[propName] = jsonObject[propName];
                }
            }
        };
        thisCancelBase.cancel = function ()
        {
            thisCancelBase.cancelInput.val('1');
            /*jslint nomen: false */
            window.__doPostBack(thisCancelBase.cancelButtonName);
            /*jslint nomen: true */
        };
        thisCancelBase.addEvents = function ()
        {
            aosBase.addEvents.call(this);
            
            if (thisCancelBase.cancelLink)
            {
                thisCancelBase.cancelLink.click(thisCancelBase.cancel);
            }
            if (thisCancelBase.cancelInput)
            {
                thisCancelBase.cancelInput.click(thisCancelBase.cancel);
            }
        };
        thisCancelBase.init = function (paramObj)
        {
            aosBase.init.call(this, paramObj);
            thisCancelBase.addEvents();
        };
        thisCancelBase.getById = function (id)
        {
            return document.getElementById(id);
        };
        thisCancelBase.setVars = function ()
        {
            aosBase.setVars.call(this);
            var cancelLink = thisCancelBase.getById(thisCancelBase.cancelLinkId);
            var cancelInput = thisCancelBase.getById(thisCancelBase.cancelInputId);
            
            if (null !== this.policiesToggleViewParams)
            {
                thisCancelBase.policiesToggleView = new SKYSALES.Class.ToggleView();
                this.policiesToggleView.init(this.policiesToggleViewParams);
            }
            
            if (null !== this.descriptionToggleViewParams)
            {
                thisCancelBase.descriptionToggleView = new SKYSALES.Class.ToggleView();
                this.descriptionToggleView.init(this.descriptionToggleViewParams);
            }
            
            if (cancelLink)
            {
                thisCancelBase.cancelLink = $(cancelLink);
            }
            if (cancelInput)
            {
                thisCancelBase.cancelInput = $(cancelInput);
            }
        };
        return thisCancelBase;
    };
}
