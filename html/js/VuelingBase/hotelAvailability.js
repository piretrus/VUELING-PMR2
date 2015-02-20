/*global $:false, SKYSALES:false, window:false, Option:false, document: false */

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

        thisHotelAvailability.addLongDescription = function(longDescriptionParamObj) {
            var hotelLongdescription = new SKYSALES.Class.ToggleView();
            hotelLongdescription.init(longDescriptionParamObj);
        };

        var HotelKeysControl = function() {
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

