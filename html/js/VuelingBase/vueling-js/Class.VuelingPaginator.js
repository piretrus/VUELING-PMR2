

VUELING.Class.VuelingPaginator = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisvuelingPaginator = SKYSALES.Util.extendObject(parent);

    thisvuelingPaginator.totalPages = 0;
    thisvuelingPaginator.buttons = 0;
    thisvuelingPaginator.currentPage = 0;
    thisvuelingPaginator.lowerLimit = 0;
    thisvuelingPaginator.upperLimit = 0;
    thisvuelingPaginator.container = "";
    thisvuelingPaginator.containerId = "";
    thisvuelingPaginator.eventSubmit = "";
    thisvuelingPaginator.setCurrent = 0;

    thisvuelingPaginator.init = function (json) {
        this.setSettingsByObject(json);
        thisvuelingPaginator.container = this.getById(thisvuelingPaginator.containerId);
        thisvuelingPaginator.currentPage = thisvuelingPaginator.lowerLimit = thisvuelingPaginator.upperLimit = Math.min(thisvuelingPaginator.setCurrent, thisvuelingPaginator.totalPages);

        for (var b = 1; b < thisvuelingPaginator.buttons && b < thisvuelingPaginator.totalPages;) {
            if (thisvuelingPaginator.lowerLimit > 1)
                thisvuelingPaginator.lowerLimit--; b++;
            if (b < thisvuelingPaginator.buttons && thisvuelingPaginator.upperLimit < thisvuelingPaginator.totalPages)
                thisvuelingPaginator.upperLimit++; b++;
        }

        if (thisvuelingPaginator.totalPages <= thisvuelingPaginator.buttons) {
            thisvuelingPaginator.lowerLimit = 1;
            thisvuelingPaginator.upperLimit = thisvuelingPaginator.totalPages;
        }

        if (thisvuelingPaginator.setCurrent < (thisvuelingPaginator.buttons / 2) + 1 && thisvuelingPaginator.totalPages >= thisvuelingPaginator.buttons) {
            thisvuelingPaginator.lowerLimit = 1;
            thisvuelingPaginator.upperLimit = thisvuelingPaginator.buttons;
        }

        for (var i = thisvuelingPaginator.lowerLimit; i <= thisvuelingPaginator.upperLimit; i++) {
            if (i == thisvuelingPaginator.currentPage) $(thisvuelingPaginator.container).append('<a class="pulsado">' + i + '</a> ');
            else $(thisvuelingPaginator.container).append('<a href="javascript:void(0);" onclick="javascript:__doPostBack(\'' + thisvuelingPaginator.eventSubmit + '\',' + i + ');">' + i + '</a> ');
        }
    };
    return thisvuelingPaginator;
};