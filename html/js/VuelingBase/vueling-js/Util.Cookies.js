// ------------------------------------------------------------------
// Utility functions for parsing in VUELING.Util.getDateFromFormat()
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// VUELING.Util.getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the 
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------

VUELING.Util.InputFilters.numeric = function (code) {
    return (48 <= code && code <= 57) || (96 <= code && code <= 105);
};

VUELING.Util.InputFilters.whiteSpace = function (code) {
    return code == 32;
};

VUELING.Util.InputFilters.specialKeys = function (code) {
    return (33 <= code && code <= 46) || (16 <= code && code <= 20) || code == 8 || code == 9 || code == 46;
};

VUELING.Util.InputFilters.arrows = function (code) {
    return (37 <= code && code <= 40);
};

VUELING.Util.InputFilters.copyPaste = function (event) {
    return event.ctrlKey && event.keyCode == 86;
};

VUELING.Util.Cookies = {};
VUELING.Util.Cookies.setCookie = function (c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + parseInt(exdays));
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + ";path=/";
};

VUELING.Util.Cookies.getCookie = function (c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
};

SKYSALES.Util.MoovingCountPassengersCallback = function (data) {
    var passengersCount = VUELING.Util.getObjectInstance("moovingPassengersCount");
    passengersCount.countPassengersCallback(data);
};

SKYSALES.Util.MoovingCountPassengersErrorCallback = function (jqXHR, textStatus, errorThrown) {
    var passengersCount = VUELING.Util.getObjectInstance("moovingPassengersCount");
    passengersCount.countPassengersErrorCallback();
};

SKYSALES_Util_checkRoutesAndPromoUniversalDepartureCallback = function (data) {
    var searcher = VUELING.Util.getObjectInstance("vuelingSearcher");
    searcher.checkRoutesAndPromoUniversalDepartureCallback(data);
};

SKYSALES_Util_checkRoutesAndPromoUniversalReturnCallback = function (data) {
    var searcher = VUELING.Util.getObjectInstance("vuelingSearcher");
    searcher.checkRoutesAndPromoUniversalReturnCallback(data);
};

SKYSALES_Util_checkRoutesAndPromoUniversalDepartureErrorCallback = function (origin, destination) {
    var searcher = VUELING.Util.getObjectInstance("vuelingSearcher");
    searcher.checkRoutesAndPromoUniversalDepartureErrorCallback(origin, destination);
};

SKYSALES_Util_checkRoutesAndPromoUniversalReturnErrorCallback = function (origin, destination) {
    var searcher = VUELING.Util.getObjectInstance("vuelingSearcher");
    searcher.checkRoutesAndPromoUniversalReturnErrorCallback(origin, destination);
};
