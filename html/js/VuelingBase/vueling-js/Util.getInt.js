
VUELING.Util._getInt = function (str, i, minlength, maxlength) {
    for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);
        if (token.length < minlength) { return null; }
        if (VUELING.Util._isInteger(token)) { return token; }
    }
    return null;
};