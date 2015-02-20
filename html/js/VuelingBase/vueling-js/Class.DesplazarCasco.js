

VUELING.Class.DesplazarCasco = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.journey = null;
    thisClass.segment = null;
    thisClass.identifier = null;
    thisClass.delay = 500;

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.identifier = this.journey + '_' + this.segment;
        this.addEvents();
    };

    thisClass.addEvents = function () {
        var self = this;
        $('#scrollUp_' + this.identifier).click(function () {
            $('#casco_' + self.identifier).animate({
                scrollTop: 0
            }, self.delay);
        });
        $('#scrollDown_' + this.identifier).click(function () {
            $('#casco_' + self.identifier).animate({
                scrollTop: $('#casco_' + self.identifier + ' table#Y').height()
            }, self.delay);
        });
    };

    return thisClass;
    };