

VUELING.Class.CarHotelItinerary = function (json) {
    json = json || {};

    var parent = SKYSALES.Class.Resource(),
            thisCarHotelItinerary = SKYSALES.Util.extendObject(parent);

    thisCarHotelItinerary.hotelAndCarParameters = null;

    thisCarHotelItinerary.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisCarHotelItinerary.addEvents = function () {
        thisCarHotelItinerary.initObject();
    };

    thisCarHotelItinerary.initObject = function () {
       
        thisCarHotelItinerary.hotelAndCarParameters.parameters.ExternalServiceType = thisCarHotelItinerary.hotelAndCarParameters.PageConfirmationHotel;

        $.ajax({
            url: thisCarHotelItinerary.hotelAndCarParameters.url + '\\GetHtmlWhiteLabel',
            data: thisCarHotelItinerary.hotelAndCarParameters.parameters,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                $('#BookCarHotel_HotelAjax').html(data);
                $('#ItineraryHotelsCars').hide();
            },
            timeout: 25000
        });

        thisCarHotelItinerary.hotelAndCarParameters.parameters.ExternalServiceType = thisCarHotelItinerary.hotelAndCarParameters.PageConfirmationCar;
        $.ajax({
            url: thisCarHotelItinerary.hotelAndCarParameters.url + '\\GetHtmlWhiteLabel',
            data: thisCarHotelItinerary.hotelAndCarParameters.parameters,
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                $('#BookCarHotel_CarAjax').html(data);
                $('#ItineraryHotelsCars').hide();
            },
            timeout: 25000
        });
    };

    return thisCarHotelItinerary;
};