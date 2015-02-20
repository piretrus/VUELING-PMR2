(function() {
    window.JSBaseType = {};
    var JSBaseType = window.JSBaseType;

    JSBaseType.Object = {};

    JSBaseType.Object.extendObject = function (o) {
        var F = function () { };
        F.prototype = o;
        return new F();
    };
})();