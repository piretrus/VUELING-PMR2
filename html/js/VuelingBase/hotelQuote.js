/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/
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