

VUELING.Class.KeepSessionAlive = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisKeepSessionAlive = SKYSALES.Util.extendObject(parent);

    thisKeepSessionAlive.KeepSessionAliveFrequency = '';
    thisKeepSessionAlive.KeepSessionAliveExecutionTimes = '';
    thisKeepSessionAlive.KeepSessionAliveUrl = '';

    thisKeepSessionAlive.KeepSessionAliveExecutionTimesCounter = 0;
    thisKeepSessionAlive.timer = null;

    thisKeepSessionAlive.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents()
    };

    thisKeepSessionAlive.addEvents = function () {
        if (this.KeepSessionAliveFrequency && this.KeepSessionAliveExecutionTimes)
            thisKeepSessionAlive.timer = setInterval(thisKeepSessionAlive.CallKeepSessionAlive, thisKeepSessionAlive.KeepSessionAliveFrequency * 1000)
    };

    thisKeepSessionAlive.CallKeepSessionAlive = function () {
        VUELING.trackingFunction('', 'event75', 'Mantener sesión viva página pago');
        $.ajax({
            url: thisKeepSessionAlive.KeepSessionAliveUrl
        });

        thisKeepSessionAlive.KeepSessionAliveExecutionTimesCounter++;

        if (thisKeepSessionAlive.KeepSessionAliveExecutionTimesCounter >= thisKeepSessionAlive.KeepSessionAliveExecutionTimes) {
            clearInterval(thisKeepSessionAlive.timer);
        }
    };

    return thisKeepSessionAlive;
};