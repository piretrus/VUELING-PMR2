



VUELING.Class.ImageFallback = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisImageFallback = SKYSALES.Util.extendObject(parent);

    thisImageFallback.imgId = "";
    thisImageFallback.img = null;

    thisImageFallback.imgUrlFirstFallback = "";
    thisImageFallback.imgUrlSecondFallback = "";

    thisImageFallback.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
        this.setOnErrors();
    };
    
    thisImageFallback.setVars = function () {
        parent.setVars.call(this);
        this.img = document.getElementById(this.imgId);
    };

    thisImageFallback.addEvents = function () {
        parent.addEvents.call(this);
    };

    thisImageFallback.setOnErrors = function () {
        this.img.onerror = this.firstOnError;
        this.img.src = this.img.src;
    };

    thisImageFallback.firstOnError = function () {
        this.onerror = thisImageFallback.secondOnError;
        this.src = thisImageFallback.imgUrlFirstFallback;
    };

    thisImageFallback.secondOnError = function () {
        this.onerror = null;
        this.src = thisImageFallback.imgUrlSecondFallback;
    };

    return thisImageFallback;
};