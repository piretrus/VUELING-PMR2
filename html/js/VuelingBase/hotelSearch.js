/*global $:false, SKYSALES:false, window:false, document:false */

if (SKYSALES.Class.HotelSearch === undefined)
{
    /*
    class HotelSearch
    */
    SKYSALES.Class.HotelSearch = function ()
    {
        var thisHotelSearch = this;
        var hotelSearchArray = [];
        var paxTypeControls = [];

        
        /*
        HotelSearch extends Aos
        */
        var HotelSearch = function ()
        {
            var aosSearch = new SKYSALES.Class.AosSearch();
            var thisHotelSearch = SKYSALES.Util.extendObject(aosSearch);
            
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
            
            
            thisHotelSearch.setSettingsByObject = function (jsonObject)
            {
                aosSearch.setSettingsByObject.call(this, jsonObject);
                
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisHotelSearch.hasOwnProperty(propName))
                    {
                        thisHotelSearch[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisHotelSearch.populate = function ()
            {
                aosSearch.populate.call(this);
                
                var roomOptions = this.populateOptions(thisHotelSearch.roomCount, 1);
                thisHotelSearch.addOptions(roomsDropDown.get(0), roomOptions);
                
                var sourceCodeOptions = this.populateSourceCodeOptions();
                thisHotelSearch.addOptions(sourceCodeDropDown.get(0), sourceCodeOptions);
            };
            
            thisHotelSearch.setVars = function ()
            {
                aosSearch.setVars.call(this);
                
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
                aosSearch.setTextValues.call(this);
                
                rooms.val(roomsDropDown.val());
                sourceCode.val(sourceCodeDropDown.val());
            };
            
            thisHotelSearch.setDropDownValues = function ()
            {
                aosSearch.setDropDownValues.call(this);
                
                roomsDropDown.val(rooms.val());
                sourceCodeDropDown.val(sourceCode.val());
            };
            
            thisHotelSearch.addEvents = function ()
            {
                aosSearch.addEvents.call(this);
                
                rooms.change(thisHotelSearch.setDropDownValues);
                roomsDropDown.change(thisHotelSearch.setTextValues);
                
                sourceCode.change(thisHotelSearch.setDropDownValue);
                sourceCodeDropDown.change(thisHotelSearch.setTextValues);
            };
            
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

        thisHotelSearch.addPaxTypeControl = function (paxTypeParamObj)
        {
            var paxTypeControl = new PaxTypeControl();
            paxTypeControl.init(paxTypeParamObj);
            paxTypeControls[paxTypeControls.length] = paxTypeControl;
        };
        
        thisHotelSearch.addHotelSearch = function (hotelParamObj)
        {
            var hotelSearch = new HotelSearch();
            hotelSearch.init(hotelParamObj);
            hotelSearchArray[hotelSearchArray.length] = hotelSearch;
        };
        
        return thisHotelSearch;
    };
    
    
    
    SKYSALES.Class.HotelSearch.initializeHotels = function ()
    {
        var paramObject = {
            objNameBase: 'hotelSearch',
            objType: 'HotelSearch',
            selector: 'div.hotelSearchContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.HotelSearch.initializeHotels);
}

