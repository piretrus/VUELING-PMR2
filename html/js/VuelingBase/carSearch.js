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
        This file deals with aos cars.
        This file is an extension of the aos.js file with just the extra code for cars.
        
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



/*global $: false, SKYSALES: false, Option: false, document: false */
if (SKYSALES.Class.CarSearch === undefined)
{
    /*
    class CarSearch
    */
    SKYSALES.Class.CarSearch = function ()
    {
        var thisCarSearch = this;
        var carSearchArray = [];
        
        /*
        CarSearch extends AosSearch
        */    
        var CarSearch = function ()
        {
            var aosSearch = new SKYSALES.Class.AosSearch();
            var thisCarSearch = SKYSALES.Util.extendObject(aosSearch);
            
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
            
            
            thisCarSearch.setSettingsByObject = function (jsonObject)
            {
                aosSearch.setSettingsByObject.call(this, jsonObject);
                
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisCarSearch.hasOwnProperty(propName))
                    {
                        thisCarSearch[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisCarSearch.populate = function ()
            {
                aosSearch.populate.call(this);
                
                var locationOptions = aosSearch.getLocationOptions();
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
                aosSearch.setVars.call(this);
                
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
                aosSearch.setTextValues.call(this);
                
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
                aosSearch.setDropDownValues.call(this);
                
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
                aosSearch.addEvents.call(this);
                
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
        
        thisCarSearch.addCarSearch = function (carParamObj)
        {
            var carSearch = new CarSearch();
            carSearch.init(carParamObj);
            carSearchArray[carSearchArray.length] = carSearch;
        };
        
        return thisCarSearch;
    };
    
    SKYSALES.Class.CarSearch.initializeCars = function ()
    {
        var paramObject = {
            objNameBase: 'carSearch',
            objType:     'CarSearch',
            selector:    'div.carSearchContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.CarSearch.initializeCars);
}
