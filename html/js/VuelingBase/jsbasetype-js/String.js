JSBaseType.String = function (text) {
    var newString = new String(text);
    thisString = JSBaseType.Object.extendObject(newString);

    thisString.format = function () {
        var formatted = newString;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    return thisString;
};
