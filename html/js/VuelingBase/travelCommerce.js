/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/
/*

--------------------------------------------------------------------------------------------------------------------------------------------------
aos.js
--------------------------------------------------------------------------------------------------------------------------------------------------
    
*/


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
        Pass - JsLint Edition 2009-09-21
        
*/

/*jslint white: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true  */
/*global window: false, SKYSALES: true, $: false, document: false, alert: false, Option: false */

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
            var pageNumberObj = this.getById(pageNumberId);
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
            if (dateStr.indexOf(thisAosSearch.dateDelimiter) > -1)
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

/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    activity.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/

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
        
*/

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
SKYSALES.Class.ActivitySearch = function ()
{
    var parent = new SKYSALES.Class.AosSearch();
    var thisActivitySearch = SKYSALES.Util.extendObject(parent);
    
    return thisActivitySearch;
};

//var SortBy = function ()
//        {
//            var sortByBase = new SKYSALES.Class.SortByBase();
//            var thisSortBy = SKYSALES.Util.extendObject(sortByBase);
//            return thisSortBy;
//        };
//        thisActivitySearch.addSortBy = function (sortByParamObj)
//        {
//            var sortBy = new SortBy();
//            sortBy.init(sortByParamObj);
//        };

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
            thisActivity.updateGroup = function ()
            {
                thisActivity.hideAllGroups();
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
                groupSelect.change(thisActivity.updateGroup);
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


/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    hotel.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/
/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

/*extern $ SKYSALES */

SKYSALES.HotelAvailability = function ()
{
    var thisHotelAvailability = this;
    var hotelArray = [];
    /*
        Hotel extends Aos
    */
    var Hotel = function ()
    {
        var aos = new SKYSALES.Aos();
        var thisHotel = SKYSALES.extendObject(aos);
        return thisHotel;
    };
    thisHotelAvailability.addHotel = function (hotelParamObj)
    {
        var hotel = new Hotel();
        hotel.init(hotelParamObj);
        hotelArray[hotelArray.length] = hotel;
    };
};
SKYSALES.HotelAvailability.initializeHotels = function ()
{
    var paramObject = {
        objNameBase: 'hotelAvailability',
        objType: 'HotelAvailability',
        selector: 'div.aosContainer'
    };
    SKYSALES.Util.initializeNewObject(paramObject);
};
$(document).ready(SKYSALES.HotelAvailability.initializeHotels);


/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    hotelAvailability.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/
if (SKYSALES.Class.HotelAvailability === undefined)
{
    /*
    Class HotelAvailability
    */
    SKYSALES.Class.HotelAvailability = function ()
    {
        var thisHotelAvailability = this;
        var hotelArray = [];
        var hotelKeysControl = '';
        var hotelRoomKeysArray = [];

        /*
        HotelAvailability extends Aos
        */
        
        var Hotel = function ()
        {
            var aos = new SKYSALES.Class.Aos();
            var thisHotel = SKYSALES.Util.extendObject(aos);
            
            thisHotel.setSettingsByObject = function (jsonObject)
            {
                aos.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisHotel.hasOwnProperty(propName))
                    {
                        thisHotel[propName] = jsonObject[propName];
                    }
                }
            };

            return thisHotel;
        };
        
        thisHotelAvailability.addHotel = function (hotelParamObj)
        {
            var hotel = new Hotel();
            hotel.init(hotelParamObj);
            hotelArray[hotelArray.length] = hotel;
        };

        thisHotelAvailability.addLongDescription = function (longDescriptionParamObj) 
        {
            var hotelLongdescription = new SKYSALES.Class.ToggleView();
            hotelLongdescription.init(longDescriptionParamObj);
        };

        var HotelKeysControl = function () 
        {
            var aos = new SKYSALES.Class.Aos();
            var thisHotelKeysControl = SKYSALES.Util.extendObject(aos);

            thisHotelKeysControl.hotelKeyId = '';
            var hotelKey = '';

            thisHotelKeysControl.hotelRoomKeyId = '';
            var hotelRoomKey = '';

            thisHotelKeysControl.seperator = '';

            thisHotelKeysControl.setSettingsByObject = function (jsonObject)
            {
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisHotelKeysControl.hasOwnProperty(propName))
                    {
                        thisHotelKeysControl[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisHotelKeysControl.setVars = function ()
            {
                hotelKey = this.getById(thisHotelKeysControl.hotelKeyId);
                hotelRoomKey = this.getById(thisHotelKeysControl.hotelRoomKeyId);
            };
            
            thisHotelKeysControl.addEvents = function ()
            {
                var x;
                for (x in hotelRoomKeysArray)
                {
                    if (x !== undefined)
                    {
                        var hotelKeyInfo = hotelRoomKeysArray[x];
                        thisHotelKeysControl.radioInput = this.getById(hotelKeyInfo.radioKeyId);
                        if (thisHotelKeysControl.radioInput !== undefined)
                        {
                            thisHotelKeysControl.radioInput.change(thisHotelKeysControl.changeKeyValues);
                        }
                    }
                }
            };

            thisHotelKeysControl.changeKeyValues = function (target)
            {
                var keysString = this.value;
                if (keysString !== undefined)
                {
                    var keysArray = keysString.split(thisHotelKeysControl.seperator);
                    if (keysArray[0] !== undefined)
                    {
                        hotelKey.val(keysArray[0]);
                    }
                    if (keysArray[1] !== undefined)
                    {
                        hotelRoomKey.val(keysArray[1]);
                    }
                }
            };

            return thisHotelKeysControl;
        };
        
        thisHotelAvailability.addHotelKey = function (hotelKeyParamObj)
        {
            hotelRoomKeysArray[hotelRoomKeysArray.length] = hotelKeyParamObj;
        };
        
        thisHotelAvailability.addKeyControls = function (hotelKeyControlParamObj)
        {
            var localHotelKeysControl = new HotelKeysControl();
            localHotelKeysControl.init(hotelKeyControlParamObj);
            hotelKeysControl = localHotelKeysControl;
        };
        
        var SortBy = function ()
        {
            var sortByBase = new SKYSALES.Class.SortByBase();
            var thisSortBy = SKYSALES.Util.extendObject(sortByBase);
            return thisSortBy;
        };
        
        thisHotelAvailability.addSortBy = function (sortByParamObj)
        {
            var sortBy = new SortBy();
            sortBy.init(sortByParamObj);
        };

        return thisHotelAvailability;
    };
    SKYSALES.Class.HotelAvailability.initializeHotels = function ()
    {
        var paramObject = {
            objNameBase: 'hotelAvailability',
            objType:    'HotelAvailability',
            selector:   'div.hotelAvailabilityContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.HotelAvailability.initializeHotels);
}




/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    hotelQuote.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/
/*extern $ SKYSALES window Option */
if (SKYSALES.Class.HotelQuote === undefined)
{
    /*
    class HotelQuote
    */
    SKYSALES.Class.HotelQuote = function ()
    {
        var thisHotelQuote = this;
        var hotel = '';
       
        /*
        HotelQuote extends Aos
        */
        
        var Hotel = function ()
        {
            var aos = new SKYSALES.Class.Aos();
            var thisHotel = SKYSALES.Util.extendObject(aos);
            
            thisHotel.setSettingsByObject = function (jsonObject)
            {
                aos.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisHotel.hasOwnProperty(propName))
                    {
                        thisHotel[propName] = jsonObject[propName];
                    }
                }
            };
            
            return thisHotel;
        };
            
        thisHotelQuote.addHotel = function (hotelParamObj)
        {
            var thisHotel = new Hotel();
            hotel.init(hotelParamObj);
            hotel = thisHotel;
        };
       
        return thisHotelQuote;
    };
    
    SKYSALES.Class.HotelQuote.initializeHotel = function ()
    {
        var paramObject = {
            objNameBase: 'hotelQuote',
            objType:    'HotelQuote',
            selector:   'div.hotelQuoteContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.HotelQuote.initializeHotel);
}


/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    hotelSearch.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/

/*
HotelSearch extends Aos
*/
SKYSALES.Class.HotelSearch = function ()
{
    var parent = new SKYSALES.Class.AosSearch();
    var thisHotelSearch = SKYSALES.Util.extendObject(parent);
    
    var rooms = '';
    var roomsDropDown = '';
    thisHotelSearch.roomsDropDownId = '';
    thisHotelSearch.roomCount = 1;
    thisHotelSearch.roomsId = '';
    var sourceCode = '';
    var sourceCodeDropDown = '';
    thisHotelSearch.sourceCodeDropDownId = '';
    thisHotelSearch.sourceCodeId = '';
    thisHotelSearch.sourceCodeInfo = [];
    var paxTypeControls = [];
    
    thisHotelSearch.populate = function ()
    {
        parent.populate.call(this);
        
        var roomOptions = this.populateOptions(thisHotelSearch.roomCount, 1);
        thisHotelSearch.addOptions(roomsDropDown.get(0), roomOptions);
        
        var sourceCodeOptions = this.populateSourceCodeOptions();
        thisHotelSearch.addOptions(sourceCodeDropDown.get(0), sourceCodeOptions);
    };
    
    thisHotelSearch.setVars = function ()
    {
        parent.setVars.call(this);
        
        rooms = this.getById(thisHotelSearch.roomsId);
        roomsDropDown = this.getById(thisHotelSearch.roomsDropDownId);
        
        sourceCode = this.getById(thisHotelSearch.sourceCodeId);
        sourceCodeDropDown = this.getById(thisHotelSearch.sourceCodeDropDownId);
    };
    
    thisHotelSearch.populateOptions = function (max, min)
    {
        min = min || 0;
        var options = [];
        var i = min;

        for (i = min; i <= max; i += 1)
        {
            options[options.length] = new window.Option(i, i);
        }
        
        return options;
    };
    
    thisHotelSearch.populateSourceCodeOptions = function ()
    {
        var options = [];
        var x;
        for (x in thisHotelSearch.sourceCodeInfo)
        {
            if (x !== undefined)
            {
                var token = thisHotelSearch.sourceCodeInfo[x];
                options[options.length] = new window.Option(token.Value, token.Code);
            }
        }
        
        return options;
    };

    thisHotelSearch.setTextValues = function ()
    {
        parent.setTextValues.call(this);
        
        rooms.val(roomsDropDown.val());
        sourceCode.val(sourceCodeDropDown.val());
    };
    
    thisHotelSearch.setDropDownValues = function ()
    {
        parent.setDropDownValues.call(this);
        
        roomsDropDown.val(rooms.val());
        sourceCodeDropDown.val(sourceCode.val());
    };
    
    thisHotelSearch.addEvents = function ()
    {
        parent.addEvents.call(this);
        
        rooms.change(thisHotelSearch.setDropDownValues);
        roomsDropDown.change(thisHotelSearch.setTextValues);
        
        sourceCode.change(thisHotelSearch.setDropDownValue);
        sourceCodeDropDown.change(thisHotelSearch.setTextValues);
    };
    
    thisHotelSearch.addPaxTypeControl = function (paxTypeParamObj)
    {
        var paxTypeControl = new PaxTypeControl();
        paxTypeControl.init(paxTypeParamObj);
        paxTypeControls[paxTypeControls.length] = paxTypeControl;
    };
    
//    thisHotelSearch.addHotelSearch = function (hotelParamObj)
//    {
//        var hotelSearch = new HotelSearch();
//        hotelSearch.init(hotelParamObj);
//        hotelSearchArray[hotelSearchArray.length] = hotelSearch;
//    };
    
    return thisHotelSearch;
};
        
        /*
        class PaxTypeControl
        */
        var PaxTypeControl = function ()
        {
            var aosBase = new SKYSALES.Class.AosPaxTypeBase();
            var thisPaxTypeControl = SKYSALES.Util.extendObject(aosBase);
            
            thisPaxTypeControl.controlId = '';
            var control = '';
            var paxTypeDropDownControl = '';
            thisPaxTypeControl.dropDownControlId = '';
            thisPaxTypeControl.paxInfoMaxQuantity = '';
            thisPaxTypeControl.paxInfoQuantity = '';
            
            thisPaxTypeControl.setSettingsByObject = function (jsonObject)
            {
                aosBase.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                
                for (propName in jsonObject)
                {
                    if (thisPaxTypeControl.hasOwnProperty(propName))
                    {
                        thisPaxTypeControl[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisPaxTypeControl.init = function (paramObj)
            {
                aosBase.init.call(this, paramObj);
                
                this.populate();
                this.addEvents();
                thisPaxTypeControl.setTextValues();
            };
            
            thisPaxTypeControl.setVars = function ()
            {
                aosBase.setVars.call(this);
                
                control = this.getById(thisPaxTypeControl.controlId);
                paxTypeDropDownControl = this.getById(thisPaxTypeControl.dropDownControlId);
            };
            
            thisPaxTypeControl.populate = function ()
            {
                var paxTypeOptions = this.populateOptions();
                thisPaxTypeControl.addOptions(paxTypeDropDownControl.get(0), paxTypeOptions);
            };
            
            thisPaxTypeControl.populateOptions = function ()
            {
                var options = [];
                var i = 0;
                
                if (thisPaxTypeControl.paxInfoMaxQuantity > 0)
                {
                    for (i = 0; i <= thisPaxTypeControl.paxInfoMaxQuantity; i += 1)
                    {
                        var selectedOption = thisPaxTypeControl.paxInfoQuantity === i;
                        options[options.length] = new window.Option(i, i, selectedOption, selectedOption);
                    }
                }
                
                return options;
            };
            
            thisPaxTypeControl.setTextValues = function ()
            {
                control.val(paxTypeDropDownControl.val());
            };
            
            thisPaxTypeControl.setDropDownValues = function ()
            {
                paxTypeDropDownControl.val(control.val());
            };
            
            thisPaxTypeControl.addEvents = function ()
            {
                aosBase.addEvents.call(this);
                
                control.change(thisPaxTypeControl.setDropDownValues);
                paxTypeDropDownControl.change(thisPaxTypeControl.setTextValues);
            };
            
            return thisPaxTypeControl;
        };
    
    
    
//    SKYSALES.Class.HotelSearch.initializeHotels = function ()
//    {
//        var paramObject = {
//            objNameBase: 'hotelSearch',
//            objType: 'HotelSearch',
//            selector: 'div.hotelSearchContainer'
//        };
//        SKYSALES.Util.initializeNewObject(paramObject);
//    };
//    $(document).ready(SKYSALES.Class.HotelSearch.initializeHotels);




/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    insurance.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/
if (!SKYSALES.Class.InsuranceAvailability)
{
    /*
    Class InsuranceAvailability
    */
    SKYSALES.Class.InsuranceAvailability = function ()
    {
        var thisInsuranceAvailability = this;
        var insuranceArray = [];

        thisInsuranceAvailability.addInsurance = function (insuranceParamObj)
        {
            var insurance = new SKYSALES.Class.Insurance();
            insurance.init(insuranceParamObj);
            insuranceArray[insuranceArray.length] = insurance;
        };
        
        thisInsuranceAvailability.addInsurance = function (insuranceParamObj)
        {
            var insurance = new SKYSALES.Class.Insurance();
            insurance.init(insuranceParamObj);
            insuranceArray[insuranceArray.length] = insurance;
        };
        
        return thisInsuranceAvailability;
    };
    SKYSALES.Class.InsuranceAvailability.initializeInsurances = function ()
    {
        var paramObject = {
            objNameBase: 'insuranceAvailability',
            objType: 'InsuranceAvailability',
            selector: 'div.insuranceContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
}
    
SKYSALES.Class.Insurance = function ()
{
    var parent = new SKYSALES.Class.Aos();
    var thisInsurance = SKYSALES.Util.extendObject(parent);
    
    thisInsurance.showHideCheckBoxId = '';
    thisInsurance.passengerCount = 0;
    thisInsurance.passengerIndex = -1;
    thisInsurance.clientId = 0;
    thisInsurance.requiredArray = [];
    thisInsurance.requestFailMessage = 'Please enter all passenger data first';
    thisInsurance.autoRequest = false;
    thisInsurance.insurancePolicyContainerId = '';
    thisInsurance.passengerControlId = '';
    thisInsurance.url = '';
    thisInsurance.controlGroupId = '';
    thisInsurance.passengerDataContainer = 'passengerInputContent';
    thisInsurance.waitImgId = '';
    
    thisInsurance.showHideCheckBox = '';
    thisInsurance.passengerInfo = {};
    thisInsurance.nameDel = "$";
    thisInsurance.idDel = "_";
    thisInsurance.hideRequestMessage = false;
    thisInsurance.inputArray = {};
    thisInsurance.insurancePolicyContainer = {};
    thisInsurance.waitImg = null;
    
    thisInsurance.init = function (json)
    {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };
    
    thisInsurance.show = function ()
    {
        parent.show.call(this);
        this.showHideCheckBox.attr('checked', 'checked');    
    };
    thisInsurance.hide = function ()
    {
        parent.hide.call(this);
        this.insurancePolicyContainer.html('');
        this.showHideCheckBox.removeAttr('checked');
    };
    thisInsurance.showHideHandler = function ()
    {
        thisInsurance.showHide();
    };
    thisInsurance.showHide = function ()
    {
        var isChecked = this.showHideCheckBox.is(':checked');
        if (isChecked)
        {
            this.validateRequest();
        }
        else
        {
            this.hide();
        }
    };
    thisInsurance.setSettingsByObject = function (jsonObject)
    {
        parent.setSettingsByObject.call(this, jsonObject);
        var propName = '';
        for (propName in jsonObject)
        {
            if (thisInsurance.hasOwnProperty(propName))
            {
                thisInsurance[propName] = jsonObject[propName];
            }
        }
    };
    thisInsurance.addEvents = function ()
    {
        var i = 0;
        var passengerIndex = 0;
        var prop = '';
        var requiredIndex = '';
        var requiredInputId = '';
        this.hide();
        this.showHideCheckBox.click(this.showHideHandler);
        
        if (this.autoRequest === true)
        {
            for (i = 0; i < this.requiredArray.length; i += 1)
            {
                requiredInputId = this.requiredArray[i];
                if (this.passengerIndex > -1)
                {
                    for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
                    {
                        prop = this.getPropId(requiredIndex, this.passengerIndex);
                        this.getById(prop).blur(this.validateAutoRequestHandler);
                    }
                }
                else
                {
                    passengerLoop:
                    for (passengerIndex = 0; passengerIndex <= this.passengerCount; passengerIndex += 1)
                    {
                        for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
                        {
                            prop = this.getPropId(requiredIndex, passengerIndex);
                            this.getById(prop).blur(this.validateAutoRequestHandler);
                            prop = this.getInfantPropId(requiredIndex, passengerIndex);
                            this.getById(prop).blur(this.validateAutoRequestHandler);
                        }
                    }
                }
            }
        }
    };
    thisInsurance.filterHandler = function ()
    {
        var retVal = true;
        if ($(this).hasClass('notInsuranceInput'))
        {
            retVal = false;
        }
        return retVal;
    };
    thisInsurance.setVars = function ()
    {
        parent.setVars.call(this);
        
        thisInsurance.showHideCheckBox = this.getById(this.showHideCheckBoxId);
        if (thisInsurance.autoRequest === true)
        {
            thisInsurance.inputArray = $('#' + this.passengerDataContainer + ' :input');
            thisInsurance.inputArray = this.inputArray.filter(this.filterHandler);
        }
        thisInsurance.insurancePolicyContainer = this.getById(this.insurancePolicyContainerId);
        thisInsurance.waitImg = this.getById(this.waitImgId);
    };
    thisInsurance.validateAutoRequestHandler = function ()
    {
        thisInsurance.validateAutoRequest();
    };
    thisInsurance.validateAutoRequest = function ()
    {
        this.hideRequestMessage = true;
        this.validateRequest();
        this.hideRequestMessage = false;
    };
    thisInsurance.getPropName = function (requiredIndex, passengerIndex)
    {
        var prop = this.controlGroupId + this.nameDel + this.passengerControlId + this.nameDel + this.requiredArray[requiredIndex] + this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.getInfantPropName = function (requiredIndex, passengerIndex)
    {
        var prop = this.getPropName(requiredIndex, passengerIndex);
        prop += this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.getPropId = function (requiredIndex, passengerIndex)
    {
        var prop = 'CONTROLGROUPPASSENGER_PassengerInputViewPassengerView' + this.idDel + this.requiredArray[requiredIndex] + this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.getInfantPropId = function (requiredIndex, passengerIndex)
    {
        var prop = this.getPropId(requiredIndex, passengerIndex);
        prop += this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.validateProperty = function (prop)
    {
        var isValid = true;
        if (this.passengerInfo.hasOwnProperty(prop))
        {
            if (!this.passengerInfo[prop])
            {
                isValid = false;
            }
        }
        return isValid;
    };
    thisInsurance.validateRequest = function ()
    {
        var isValid = true;
        var passengerIndex = 0;
        var requiredIndex = 0;
        var prop = '';
        this.populatePassengerInfo();
        
        if (this.passengerIndex > -1)
        {
            for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
            {
                prop = this.getPropName(requiredIndex, this.passengerIndex);
                if (!this.validateProperty(prop))
                {
                    isValid = false;
                    break;
                }
            }
        }
        else
        {
            passengerLoop:
            for (passengerIndex = 0; passengerIndex <= this.passengerCount; passengerIndex += 1)
            {
                for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
                {
                    prop = this.getPropName(requiredIndex, passengerIndex);
                    if (!this.validateProperty(prop))
                    {
                        isValid = false;
                        break passengerLoop;
                    }
                    prop = this.getInfantPropName(requiredIndex, passengerIndex);
                    if (!this.validateProperty(prop))
                    {
                        isValid = false;
                        break passengerLoop;
                    }
                }
            }
        }
        if (isValid === true)
        {
            this.sendRequest();
        }
        else
        {
            this.reset();
            if (this.hideRequestMessage === false)
            {
                window.alert(this.requestFailMessage);
            }
        }
    };
    thisInsurance.reset = function ()
    {
        thisInsurance.hide();
    };
    thisInsurance.setPassengerInfoPropertyHandler = function ()
    {
        var input = $(this);
        thisInsurance.setPassengerInfoProperty(input);
    };
    thisInsurance.setPassengerInfoProperty = function (input)
    {
        var name = input.attr('name');
        if (name)
        {
            name = name.substring(name.lastIndexOf(this.nameDel) + 1, name.length);
            name = this.controlGroupId + this.nameDel + this.passengerControlId + this.nameDel + name;
        }
        var val = input.val();
        this.passengerInfo[name] = val;
    };
    thisInsurance.getClientName = function ()
    {
        return this.clientId.replace(this.idDel, this.nameDel);
    };
    thisInsurance.populatePassengerInfo = function ()
    {
        this.inputArray.each(this.setPassengerInfoPropertyHandler);
        //passengerInfo[thisInsurance.controlGroupId + nameDel + 'ButtonSubmit'] = 'Continue';
        this.passengerInfo[thisInsurance.controlGroupId + this.nameDel + this.clientId + this.nameDel + 'passengerNumber'] = window.parseInt(this.passengerIndex, 10);
        /*jslint nomen: false */
        this.passengerInfo.__EVENTTARGET = this.controlGroupId + this.nameDel + 'ButtonSubmit';
        /*jslint nomen: true */
    };
    thisInsurance.updateDomHandler = function (data)
    {
        thisInsurance.updateDom(data);
    };
    thisInsurance.updateDom = function (data)
    {
        this.insurancePolicyContainer.html(data);
        this.parseDomObjects(data);
        this.waitImg.hide();
        this.show();
    };
    thisInsurance.parseDomObjects = function (data)
    {
        var paramNodeFunction = function (index)
        {
            var paramNodeValue = $(this).val();
            //paramNodeValue = paramNodeValue.replace(/\'/g, '"');
            var parsedJsonObject = SKYSALES.Json.parse(paramNodeValue);
            var funRef = null;
            var refName = '';
            var refArray = [];
            var i = 0;
            var refIndex = 0;
            var arrayRegex = /^([a-zA-Z0-9]+)\[(\d+)\]$/;
            var matchArray = [];
            if (parsedJsonObject.method !== undefined)
            {
	            funRef = thisInsurance;
	            if (parsedJsonObject.method.name.indexOf('.') > -1)
	            {
		            refArray = parsedJsonObject.method.name.split('.');
		            for (i = 0; i < refArray.length; i += 1)
		            {
			            refName = refArray[i];
			            matchArray = refName.match(arrayRegex);
			            if ((matchArray) && (matchArray.length > 0))
			            {
				            refName = matchArray[1];
				            refIndex = matchArray[2];
				            refIndex = parseInt(refIndex, 10);
				            funRef = funRef[refName][refIndex];
			            }
			            else
			            {
				            funRef = funRef[refName];
			            }
		            }
	            }
	            else
	            {
		            funRef = funRef[parsedJsonObject.method.name];
	            }
            	
	            if (funRef)
	            {
		            funRef(parsedJsonObject.method.paramJsonObject);
	            }
            }
        };
        $("object.jsObject > param", $(data)).each(paramNodeFunction);
    };
    thisInsurance.sendRequest = function ()
    {
        this.waitImg.show();
        //$.get did not work in IE7
        $.post(this.url, this.passengerInfo, this.updateDomHandler);
    };
    
    thisInsurance.addAvailableItem = function (availableItemParamObj)
    {
        var availableItem = new SKYSALES.Class.AvailableItem();
        availableItem.init(availableItemParamObj);
    };
    
    thisInsurance.addTermsAndConditions = function (availableItemParamObj)
    {
        var terms = new SKYSALES.Class.TermsAndConditions();
        terms.init(availableItemParamObj);
    };
    
    return thisInsurance;
};

/*
    AvailableItem extends AvailableItemBase
*/
SKYSALES.Class.AvailableItem = function ()
{
    var availableItemBase = new SKYSALES.Class.AvailableItemBase();
    var thisAvailableItem = SKYSALES.Util.extendObject(availableItemBase);
    
    thisAvailableItem.showHideCheckBoxId = '';
    
    var input = null;
    var showHideCount = 0;
    
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
    thisAvailableItem.addEvents = function ()
    {
        var showHideHandler = function ()
        {
            if ((showHideCount % 2) === 0)
            {
                thisAvailableItem.show();
            }
            else
            {
                thisAvailableItem.hide();
            }
            showHideCount = showHideCount + 1;
        };
        input.click(showHideHandler);
    };
    thisAvailableItem.setVars = function ()
    {
        availableItemBase.setVars.call(this);
        input = this.getById(thisAvailableItem.showHideCheckBoxId);
    };
    return thisAvailableItem;
};

/*
    TermsAndConditions extends TermsAndConditionsBase
*/
SKYSALES.Class.TermsAndConditions = function ()
{
    var termsAndConditionsBase = new SKYSALES.Class.TermsAndConditionsBase();
    var thisTerms = SKYSALES.Util.extendObject(termsAndConditionsBase);
    
    return thisTerms;
};
        
$(window.document).ready(SKYSALES.Class.InsuranceAvailability.initializeInsurances);


/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    carSearch.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/

SKYSALES.Class.CarSearch = function ()
{
    var parent = new SKYSALES.Class.AosSearch();
    var thisCarSearch = SKYSALES.Util.extendObject(parent);
    
    //car search specific items
    thisCarSearch.categoryInfo = [];
    thisCarSearch.categoryId = '';
    thisCarSearch.categoryDropDownId = '';
    var category = '';
    var categoryDropDown = '';
    
    thisCarSearch.doorsInfo = [];
    thisCarSearch.doorsId = '';
    thisCarSearch.doorsDropDownId = '';
    var doors = '';
    var doorsDropDown = '';
    
    thisCarSearch.carTypesInfo = [];
    thisCarSearch.carTypesId = '';
    thisCarSearch.carTypesDropDownId = '';
    var carTypes = '';
    var carTypesDropDown = '';
    
    thisCarSearch.transmissionsInfo = [];
    thisCarSearch.transmissionsId = '';
    thisCarSearch.transmissionsDropDownId = '';
    var transmissions = '';
    var transmissionsDropDown = '';
    
    thisCarSearch.vendorsInfo = [];
    thisCarSearch.vendorsId = '';
    thisCarSearch.vendorSelectId = '';
    var vendors = '';
    var vendorsDropDown = '';
    
    thisCarSearch.locationDropOffId = '';
    thisCarSearch.locationDropOffDropDownId = '';
    var locationDropOff = '';
    var locationDropOffDropDown = '';
    
    thisCarSearch.pickUpTimeInfo = [];
    thisCarSearch.pickUpTimeId = '';
    thisCarSearch.pickUpTimeDropDownId = '';
    var pickUpTime = '';
    var pickUpTimeDropDown = '';
    
    thisCarSearch.dropOffTimeInfo = [];
    thisCarSearch.dropOffTimeId = '';
    thisCarSearch.dropOffTimeDropDownId = '';
    var dropOffTime = '';
    var dropOffTimeDropDown = '';
    
    var sourceCode = '';
    var sourceCodeDropDown = '';
    thisCarSearch.sourceCodeDropDownId = '';
    thisCarSearch.sourceCodeId = '';
    thisCarSearch.sourceCodeInfo = [];
    
    var airConditioning = '';
    var airConditioningDropDown = '';
    thisCarSearch.airConditioningDropDownId = '';
    thisCarSearch.airConditioningId = '';
    thisCarSearch.airConditioningInfo = [];
    
    thisCarSearch.populate = function ()
    {
        parent.populate.call(this);
        
        var locationOptions = this.getLocationOptions();
        thisCarSearch.addOptions(locationDropOffDropDown.get(0), locationOptions);
        
        var categoryOptions = this.getCarOptions(thisCarSearch.categoryInfo);
        thisCarSearch.addOptions(categoryDropDown.get(0), categoryOptions);
        
        var doorOptions = this.getCarOptions(thisCarSearch.doorsInfo);
        thisCarSearch.addOptions(doorsDropDown.get(0), doorOptions);
        
        var carTypesOptions = this.getCarOptions(thisCarSearch.carTypesInfo);
        thisCarSearch.addOptions(carTypesDropDown.get(0), carTypesOptions);
        
        var transmissionsOptions = this.getCarOptions(thisCarSearch.transmissionsInfo);
        thisCarSearch.addOptions(transmissionsDropDown.get(0), transmissionsOptions);
        
        var vendorsOptions = this.getCarVendorOptions(thisCarSearch.vendorsInfo);
        thisCarSearch.addOptions(vendorsDropDown.get(0), vendorsOptions);
        
        var airConditioningOptions = this.getCarOptions(thisCarSearch.airConditioningInfo);
        thisCarSearch.addOptions(airConditioningDropDown.get(0), airConditioningOptions);
        
        var pickUpTimeOptions = this.getCarOptions(thisCarSearch.pickUpTimeInfo);
        thisCarSearch.addOptions(pickUpTimeDropDown.get(0), pickUpTimeOptions);
        
        var dropOffTimeOptions = this.getCarOptions(thisCarSearch.dropOffTimeInfo);
        thisCarSearch.addOptions(dropOffTimeDropDown.get(0), dropOffTimeOptions);
        
        var sourceCodeOptions = this.populateSourceCodeOptions();
        thisCarSearch.addOptions(sourceCodeDropDown.get(0), sourceCodeOptions);
    }; 
    
    thisCarSearch.setVars = function ()
    {
        parent.setVars.call(this);
        
        locationDropOff = this.getById(thisCarSearch.locationDropOffId);
        locationDropOffDropDown = this.getById(thisCarSearch.locationDropOffDropDownId);
        
        category = this.getById(thisCarSearch.categoryId);
        categoryDropDown = this.getById(thisCarSearch.categoryDropDownId);
        
        doors = this.getById(thisCarSearch.doorsId);
        doorsDropDown = this.getById(thisCarSearch.doorsDropDownId);
        
        carTypes = this.getById(thisCarSearch.carTypesId);
        carTypesDropDown = this.getById(thisCarSearch.carTypesDropDownId);
        
        transmissions = this.getById(thisCarSearch.transmissionsId);
        transmissionsDropDown = this.getById(thisCarSearch.transmissionsDropDownId);
        
        vendors = this.getById(thisCarSearch.vendorsId);
        vendorsDropDown = this.getById(thisCarSearch.vendorSelectId);
        
        pickUpTime = this.getById(thisCarSearch.pickUpTimeId);
        pickUpTimeDropDown = this.getById(thisCarSearch.pickUpTimeDropDownId);
        
        dropOffTime = this.getById(thisCarSearch.dropOffTimeId);
        dropOffTimeDropDown = this.getById(thisCarSearch.dropOffTimeDropDownId);
        
        sourceCode = this.getById(thisCarSearch.sourceCodeId);
        sourceCodeDropDown = this.getById(thisCarSearch.sourceCodeDropDownId);
        
        airConditioning = this.getById(thisCarSearch.airConditioningId);
        airConditioningDropDown = this.getById(thisCarSearch.airConditioningDropDownId);
        
    };
    
    thisCarSearch.setTextValues = function ()
    {
        parent.setTextValues.call(this);
        
        locationDropOff.val(locationDropOffDropDown.val());
        category.val(categoryDropDown.val());
        doors.val(doorsDropDown.val());
        carTypes.val(carTypesDropDown.val());
        transmissions.val(transmissionsDropDown.val());
        vendors.val(vendorsDropDown.val());
        pickUpTime.val(pickUpTimeDropDown.val());
        dropOffTime.val(dropOffTimeDropDown.val());
        sourceCode.val(sourceCodeDropDown.val());
        airConditioning.val(airConditioningDropDown.val());
    };
    
    thisCarSearch.setDropDownValues = function ()
    {
        parent.setDropDownValues.call(this);
        
        locationDropOffDropDown.val(locationDropOff.val());
        categoryDropDown.val(category.val());
        doorsDropDown.val(doors.val());
        carTypesDropDown.val(carTypes.val());
        transmissionsDropDown.val(transmissions.val());
        vendorsDropDown.val(vendors.val());
        pickUpTimeDropDown.val(pickUpTime.val());
        dropOffTimeDropDown.val(dropOffTime.val());
        sourceCodeDropDown.val(sourceCode.val());
        airConditioningDropDown.val(airConditioning.val());
    };
    
    thisCarSearch.addEvents = function ()
    {
        parent.addEvents.call(this);
        
        locationDropOff.change(thisCarSearch.setDropDownValues);
        locationDropOffDropDown.change(thisCarSearch.setTextValues);
        
        category.change(thisCarSearch.setDropDownValues);
        categoryDropDown.change(thisCarSearch.setTextValues);
        
        doors.change(thisCarSearch.setDropDownValues);
        doorsDropDown.change(thisCarSearch.setTextValues);
        
        carTypes.change(thisCarSearch.setDropDownValues);
        carTypesDropDown.change(thisCarSearch.setTextValues);
        
        transmissions.change(thisCarSearch.setDropDownValues);
        transmissionsDropDown.change(thisCarSearch.setTextValues);
        
        vendors.change(thisCarSearch.setDropDownValues);
        vendorsDropDown.change(thisCarSearch.setTextValues);
        //update the location list for a particular vendor
        vendorsDropDown.change(thisCarSearch.doPostBack);
        
        pickUpTime.change(thisCarSearch.setDropDownValues);
        pickUpTimeDropDown.change(thisCarSearch.setTextValues);
        
        dropOffTime.change(thisCarSearch.setDropDownValues);
        dropOffTimeDropDown.change(thisCarSearch.setTextValues);
        
        sourceCode.change(thisCarSearch.setDropDownValue);
        sourceCodeDropDown.change(thisCarSearch.setTextValues);
        
        airConditioning.change(thisCarSearch.setDropDownValues);
        airConditioningDropDown.change(thisCarSearch.setTextValues);
    };
    
    thisCarSearch.doPostBack = function ()
    {
        __doPostBack('');
    };
    
    thisCarSearch.getCarOptions = function (tokenArray)
    {
        var x;
        var optionsArray = [];
        var token = "";
        for (x in tokenArray)
        {
            if (x !== undefined)
            {
                token = tokenArray[x].ParameterTokenOption;
                optionsArray[optionsArray.length] = new Option(token.Value, token.Code, false, false);
            }
        }
        return optionsArray;
    };
    
    thisCarSearch.getCarVendorOptions = function (vendorsArray)
    {
        var x;
        var optionsArray = [];
        var vendor = '';
        
        for (x in vendorsArray)
        {
            if (x !== undefined)
            {
                vendor = vendorsArray[x];
                optionsArray[optionsArray.length] = new Option(vendor.Description, vendor.VendorCode.Value);
            }
        }
        return optionsArray;
    };
    
    thisCarSearch.populateSourceCodeOptions = function ()
    {
        var options = [];
        var x;
        for (x in thisCarSearch.sourceCodeInfo)
        {
            if (x !== undefined)
            {
                var token = thisCarSearch.sourceCodeInfo[x];
                options[options.length] = new Option(token.Value, token.Code);
            }
        }
        
        return options;
    };

    thisCarSearch.addSourceCodeOptions = function ()
    {
    
    };
    
    return thisCarSearch;
};

/*

    --------------------------------------------------------------------------------------------------------------------------------------------------
    paymentPassThrough.js
    --------------------------------------------------------------------------------------------------------------------------------------------------
    
*/
if (SKYSALES.Class.PaymentPassThroughControl === undefined)
{
    /*
    Class PaymentPassThroughControl
    */
    SKYSALES.Class.PaymentPassThroughControl = function ()
    {
        var thisPaymentPassThroughControl = this;
        var paymentPassThroughArray = [];
        thisPaymentPassThroughControl.paymentTypeArray = [];
        /*
            PaymentPassThrough extends PaymentPassThroughBase
        */
        var PaymentPassThrough = function ()
        {
            var paymentPassThroughBase = new SKYSALES.Class.PaymentPassThroughBase();
            var thisPaymentPassThrough = SKYSALES.Util.extendObject(paymentPassThroughBase);
            
            thisPaymentPassThrough.paymentInputContainerId = 'paymentInputContent';
            thisPaymentPassThrough.paymentInputContainer = {};
            thisPaymentPassThrough.paymentCardTypeId = '';
            thisPaymentPassThrough.paymentCardType = {};
            thisPaymentPassThrough.paymentCardNumberId = '';
            thisPaymentPassThrough.paymentCardNumber = {};
            thisPaymentPassThrough.paymentExpirationDateMonthId = '';
            thisPaymentPassThrough.paymentExpirationDateMonth = {};
            thisPaymentPassThrough.paymentExpirationDateYearId = '';
            thisPaymentPassThrough.paymentExpirationDateYear = {};
            thisPaymentPassThrough.paymentCardHolderNameId = '';
            thisPaymentPassThrough.paymentCardHolderName = {};
            thisPaymentPassThrough.autoFillId = '';
            thisPaymentPassThrough.autoFill = '';
            thisPaymentPassThrough.vendorCode = '';
            thisPaymentPassThrough.paymentTypeArray = [];
            thisPaymentPassThrough.cardTypeId = '';
            thisPaymentPassThrough.cardType = {};
            thisPaymentPassThrough.cardNumberId = '';
            thisPaymentPassThrough.cardNumber = {};
            thisPaymentPassThrough.expYearId = '';
            thisPaymentPassThrough.expYear = {};
            thisPaymentPassThrough.expYearCount = 10;
            thisPaymentPassThrough.expMonthId = '';
            thisPaymentPassThrough.expMonth = {};
            thisPaymentPassThrough.expDateId = '';
            thisPaymentPassThrough.expDate = {};
            thisPaymentPassThrough.cardHolderNameId = '';
            thisPaymentPassThrough.cardHolderName = {};
            
            thisPaymentPassThrough.setSettingsByObject = function (jsonObject)
            {
                paymentPassThroughBase.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisPaymentPassThrough.hasOwnProperty(propName))
                    {
                        thisPaymentPassThrough[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisPaymentPassThrough.setVars = function ()
            {
                paymentPassThroughBase.setVars.call(this);
                thisPaymentPassThrough.paymentInputContainer =  this.getById(thisPaymentPassThrough.paymentInputContainerId);
                thisPaymentPassThrough.paymentCardType =  this.getById(thisPaymentPassThrough.paymentCardTypeId);
                thisPaymentPassThrough.paymentCardNumber =  this.getById(thisPaymentPassThrough.paymentCardNumberId);
                thisPaymentPassThrough.paymentExpirationDateMonth =  this.getById(thisPaymentPassThrough.paymentExpirationDateMonthId);
                thisPaymentPassThrough.paymentExpirationDateYear =  this.getById(thisPaymentPassThrough.paymentExpirationDateYearId);
                thisPaymentPassThrough.paymentCardHolderName =  this.getById(thisPaymentPassThrough.paymentCardHolderNameId);
                thisPaymentPassThrough.autoFill = this.getById(thisPaymentPassThrough.autoFillId);
                thisPaymentPassThrough.cardType = this.getById(thisPaymentPassThrough.cardTypeId);
                thisPaymentPassThrough.cardNumber = this.getById(thisPaymentPassThrough.cardNumberId);
                thisPaymentPassThrough.expYear = this.getById(thisPaymentPassThrough.expYearId);
                thisPaymentPassThrough.expMonth = this.getById(thisPaymentPassThrough.expMonthId);
                thisPaymentPassThrough.expDate = this.getById(thisPaymentPassThrough.expDateId);
                thisPaymentPassThrough.cardHolderName = this.getById(thisPaymentPassThrough.cardHolderNameId);
                if (thisPaymentPassThroughControl.paymentTypeArray[thisPaymentPassThrough.vendorCode] !== undefined)
                {
                    thisPaymentPassThrough.paymentTypeArray = thisPaymentPassThroughControl.paymentTypeArray[thisPaymentPassThrough.vendorCode].paymentTypeArray;
                }
            };
            
            thisPaymentPassThrough.updateExpDate = function ()
            {
                var currentDate = new Date();
                var year = thisPaymentPassThrough.expYear.val();
                if (!year)
                {
                    year = currentDate.getFullYear();
                }
                var month = thisPaymentPassThrough.expMonth.val();
                if (!month)
                {
                    month = currentDate.getMonth();
                }
                //var expDate = new Date(year, month - 1);
                thisPaymentPassThrough.expDate.val(year + '-' + month + '-01');
            };
            
            thisPaymentPassThrough.autoFillForm = function ()
            {
                if (this.checked)
                {
                    var cardType = thisPaymentPassThrough.paymentCardType.val();
                    if (cardType)
                    {
                        cardType = cardType.replace(/ExternalAccount:/, '');
                        thisPaymentPassThrough.cardType.val(cardType);
                        thisPaymentPassThrough.cardNumber.val(thisPaymentPassThrough.paymentCardNumber.val());
                        thisPaymentPassThrough.expYear.val(thisPaymentPassThrough.paymentExpirationDateYear.val());
                        thisPaymentPassThrough.expMonth.val(thisPaymentPassThrough.paymentExpirationDateMonth.val());
                        thisPaymentPassThrough.cardHolderName.val(thisPaymentPassThrough.paymentCardHolderName.val());
                        thisPaymentPassThrough.updateExpDate();
                    }
                }
            };
            
            thisPaymentPassThrough.addEvents = function ()
            {
                paymentPassThroughBase.addEvents.call(this);
                thisPaymentPassThrough.expYear.change(thisPaymentPassThrough.updateExpDate);
                thisPaymentPassThrough.expMonth.change(thisPaymentPassThrough.updateExpDate);
                thisPaymentPassThrough.autoFill.click(thisPaymentPassThrough.autoFillForm);
            };
            
            thisPaymentPassThrough.populateCardTypeDropDown = function ()
            {
                var selectBox = thisPaymentPassThrough.cardType.get(0);
                //var paymentTypeArray = thisPaymentPassThrough.paymentTypeArray;
                var optionArray = [];
                var text = '';
                var value = '';
                var paymentType = {};
                var i = 0;
                if (selectBox)
                {
                    for (i = 0; i < thisPaymentPassThrough.paymentTypeArray.length; i += 1)
                    {
                        paymentType = thisPaymentPassThrough.paymentTypeArray[i];
                        if ((paymentType !== undefined) && (paymentType.paymentTypeCode !== undefined))
                        {
                            value = paymentType.paymentTypeCode;
                            text = paymentType.description;
                            optionArray[optionArray.length] = new Option(text, value, false, false);
                        }
                    }
                    thisPaymentPassThrough.addOptions(selectBox, optionArray);
                }
            };
            
            thisPaymentPassThrough.populateExpYearDropDown = function ()
            {
                var selectBox = thisPaymentPassThrough.expYear.get(0);
                //var paymentTypeArray = thisPaymentPassThrough.paymentTypeArray;
                var optionArray = [];
                var i = 0;
                var currentDate = new Date();
                var year = currentDate.getFullYear();
                if (selectBox)
                {
                    for (i = 0; i < thisPaymentPassThrough.expYearCount; i += 1)
                    {
                        optionArray[optionArray.length] = new Option(year, year, false, false);
                        year += 1;
                    }
                    thisPaymentPassThrough.addOptions(selectBox, optionArray);
                }
            };
            
            thisPaymentPassThrough.init = function (paramObj)
            {
                paymentPassThroughBase.init.call(this, paramObj);
                thisPaymentPassThrough.addEvents();
                thisPaymentPassThrough.populateExpYearDropDown();
            };
            
            return thisPaymentPassThrough;
        };
        thisPaymentPassThroughControl.addPaymentPassThrough = function (activityParamObj)
        {
            var paymentPassThrough = new PaymentPassThrough();
            paymentPassThrough.init(activityParamObj);
            paymentPassThroughArray[paymentPassThroughArray.length] = paymentPassThrough;
            paymentPassThrough.populateCardTypeDropDown();
        };
        
        /*
            PaymentType extends PaymentTypeBase
        */
        var PaymentType = function ()
        {
            var paymentTypeBase = new SKYSALES.Class.PaymentTypeBase();
            var thisPaymentType = SKYSALES.Util.extendObject(paymentTypeBase);
            return thisPaymentType;
        };
        thisPaymentPassThroughControl.addPaymentType = function (activityParamObj)
        {
            var paymentType = new PaymentType();
            paymentType.init(activityParamObj);
            thisPaymentPassThroughControl.paymentTypeArray[paymentType.vendorCode] = paymentType;
        };
        return thisPaymentPassThroughControl;
    };
    SKYSALES.Class.PaymentPassThroughControl.initializePaymentPassThroughControl = function ()
    {
        var paramObject = {
            objNameBase: 'paymentPassThroughControl',
            objType: 'PaymentPassThroughControl',
            selector: 'div.paymentPassThroughContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.PaymentPassThroughControl.initializePaymentPassThroughControl);
}