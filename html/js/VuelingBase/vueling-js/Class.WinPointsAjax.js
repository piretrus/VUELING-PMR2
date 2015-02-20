


VUELING.Class.WinPointsAjax = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisWinPointsAjax = SKYSALES.Util.extendObject(parent);

    thisWinPointsAjax.containerId = "";
    thisWinPointsAjax.container = null;
    thisWinPointsAjax.containerVipId = "";
    thisWinPointsAjax.containerVip = null;
    thisWinPointsAjax.url = "";
    thisWinPointsAjax.errorMessageHtml = "";

    thisWinPointsAjax.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        //this.addEvents();
        this.doCallAjax();
    };

    thisWinPointsAjax.setVars = function () {
        this.container = this.getById(this.containerId);
        this.containerVip = this.getById(this.containerVipId);
    };

    thisWinPointsAjax.doCallAjax = function () {
        $.ajax({
            url: this.url,
            //data: "",
            success: this.updateWinPointsHandler,
            error: this.updateErrorWinPointsHandler,
            dataType: "html",
            timeout: 15000
        });
    };

    thisWinPointsAjax.updateWinPointsHandler = function (data) {
        thisWinPointsAjax.updateWinPoints(data);
    };

    thisWinPointsAjax.updateErrorWinPointsHandler = function () {
        thisWinPointsAjax.updateErrorWinPoints();
    };

    thisWinPointsAjax.updateWinPoints = function (data) {
        this.container.html(data);
        this.containerVip.html($(data).text() * 2);
    };

    thisWinPointsAjax.updateErrorWinPoints = function () {
        this.container.html(this.errorMessageHtml);
    };

    return thisWinPointsAjax;
};