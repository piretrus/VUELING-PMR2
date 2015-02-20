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
    SKYSALES.initializeNewObject(paramObject);
};
$(document).ready(SKYSALES.HotelAvailability.initializeHotels);