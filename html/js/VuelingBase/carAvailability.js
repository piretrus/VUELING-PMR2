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
        This is the base file for car availability
        
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

/*global $: false, SKYSALES: false, window: false, Option: false, document: false, alert: false */

if (SKYSALES.Class.CarAvailability === undefined)
{
    /*
    Class CarAvailability
    */
    SKYSALES.Class.CarAvailability = function ()
    {
        var thisCarAvailability = this;
        var carArray = [];
        var carKeysControl = '';
        var carItemKeysArray = [];
        /*
        CarAvailability extends Aos
        */
        var Car = function ()
        {
            var aos = SKYSALES.Class.Aos();
            var thisCar = SKYSALES.Util.extendObject(aos);
            
            thisCar.setSettingsByObject = function (jsonObject)
            {
                aos.setSettingsByObject.call(this, jsonObject);
                
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisCar.hasOwnProperty(propName))
                    {
                        thisCar[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisCar.showFunction = function ()
            {
                aos.showFunction.call(this);
            };
            
            thisCar.addEvents = function ()
            {
                aos.addEvents.call(this);
            };
            
            thisCar.setVars = function ()
            {
                aos.setVars.call(this);
            };
            
            return thisCar;
        };
        
        thisCarAvailability.addCar = function (carParamObj)
        {
            var car = new Car();
            car.init(carParamObj);
            carArray[carArray.length] = car;
        };
        
        var CarKeysControl = function ()
        {
            var aos = new SKYSALES.Class.Aos();
            var thisCarKeysControl = SKYSALES.Util.extendObject(aos);
            
            thisCarKeysControl.carEstablishmentKeyId = '';
            var carEstablishmentKey = '';
            
            thisCarKeysControl.carItemKeyId = '';
            var carItemKey = '';
            
            thisCarKeysControl.seperator = '';
            
            thisCarKeysControl.setSettingsByObject = function (jsonObject)
            {
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisCarKeysControl.hasOwnProperty(propName))
                    {
                        thisCarKeysControl[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisCarKeysControl.setVars = function ()
            {
                carEstablishmentKey = this.getById(thisCarKeysControl.carEstablishmentKeyId);
                carItemKey = this.getById(thisCarKeysControl.carItemKeyId);
            };
            
            thisCarKeysControl.addEvents = function ()
            {
                var x;
                for (x in carItemKeysArray)
                {
                    if (x !== undefined)
                    {
                        var carKeyInfo = carItemKeysArray[x];
                        thisCarKeysControl.radioInput = this.getById(carKeyInfo.radioKeyId);
                        if (thisCarKeysControl.radioInput !== undefined)
                        {
                            thisCarKeysControl.radioInput.change(thisCarKeysControl.changeKeyValues);
                        }
                    }
                }
            };
            
            thisCarKeysControl.changeKeyValues = function (target)
            {
                var keysString = this.value;
                if (keysString !== undefined)
                {
                    var keysArray = keysString.split(thisCarKeysControl.seperator);
                    if (keysArray[0] !== undefined)
                    {
                        carEstablishmentKey.val(keysArray[0]);
                    }
                    if (keysArray[1] !== undefined)
                    {
                        carItemKey.val(keysArray[1]);
                    }
                }
            };
            
            return thisCarKeysControl;
        };
        
        thisCarAvailability.addCarKey = function (carKeyParamObj)
        {
            carItemKeysArray[carItemKeysArray.length] = carKeyParamObj;
        };
        
        thisCarAvailability.addKeysControl = function (carKeyControlParamObj)
        {
            var lCarKeysControl = new CarKeysControl();
            lCarKeysControl.init(carKeyControlParamObj);
            carKeysControl = lCarKeysControl;
        };
        
        var SortBy = function ()
        {
            var sortByBase = new SKYSALES.Class.SortByBase();
            var thisSortBy = SKYSALES.Util.extendObject(sortByBase);
            return thisSortBy;
        };
        
        thisCarAvailability.addSortBy = function (sortByParamObj)
        {
            var sortBy = new SortBy();
            sortBy.init(sortByParamObj);
        };
        
        return thisCarAvailability;
    };
    
    SKYSALES.Class.CarAvailability.initializeCars = function ()
    {
        var paramObject = {
            objNameBase: 'carAvailability',
            objType:    'CarAvailability',
            selector:   'div.carAvailabilityContainer '
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    
    $(document).ready(SKYSALES.Class.CarAvailability.initializeCars);
}

var carSelected_validation = function ()
{
    var selectedRadioButton = $(":radio:checked[name='radio_group_car']");
    if (selectedRadioButton.length > 0)
    {
        return true;
    }
    else
    {
        alert("Please select a vehicle before clicking continue");
        return false;
    }
};
