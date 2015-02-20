

VUELING.Class.PushAjax = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisPushAjax = SKYSALES.Util.extendObject(parent);

    thisPushAjax.divWaitingIdFirst = "";
    thisPushAjax.divWaitingIdSecond = "";
    thisPushAjax.divUsersViewingIdFirst = "";
    thisPushAjax.spanUsersViewingIdFirst = "";
    thisPushAjax.divUsersViewingIdSecond = "";
    thisPushAjax.spanUsersViewingIdSecond = "";
    thisPushAjax.divLastBookingId = "";
    thisPushAjax.spanLastBookingId = "";
    thisPushAjax.url = "";
    thisPushAjax.mode = "";
    thisPushAjax.originName = "";
    thisPushAjax.destinationName = "";
    thisPushAjax.minutes = "";
    thisPushAjax.hour = "";
    thisPushAjax.hours = "";
    thisPushAjax.minimumNumUsers = "";
    thisPushAjax.closeButtonId = "";

    thisPushAjax.init = function (json) {
        this.setSettingsByObject(json);
        this.setHandlers();
        this.doCallAjax();
    };

    thisPushAjax.setHandlers = function () {
        $("#" + this.closeButtonId).click(function () {
            $("#" + thisPushAjax.divLastBookingId).hide();
        });
    };

    thisPushAjax.doCallAjax = function () {

        this.showWaitings();

        $.ajax({
            type: "GET",
            url: this.url,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            success: function (data) { thisPushAjax.successAjaxCall(data); },
            error: function () { thisPushAjax.errorPushAjax(); }
        });
    };

    thisPushAjax.successAjaxCall = function (data) {
        this.hideWaitings();

        if (data.FirstNumOfUsers > this.minimumNumUsers) {
            $("#" + this.spanUsersViewingIdFirst).text(data.FirstNumOfUsers);
            $("#" + this.divUsersViewingIdFirst).show();
        }

        if (this.mode == 'R') {
            if (data.SecondNumOfUsers > this.minimumNumUsers) {
                $("#" + this.spanUsersViewingIdSecond).text(data.SecondNumOfUsers);
                $("#" + this.divUsersViewingIdSecond).show();
            }
        }

        if (data.LastRouteSell != null) {

            var hours = data.LastRouteSell.split("-")[0].split(":")[1];
            var minutes = data.LastRouteSell.split("-")[1].split(":")[1];

            if (hours == 0) {
                $("#" + this.spanLastBookingId).text(" " + minutes + " " + this.minutes);
            }

            if (hours == 1) {
                $("#" + this.spanLastBookingId).text(" " + hours + " " + this.hour + " " + minutes + " " + this.minutes);
            }

            if (hours > 1) {
                $("#" + this.spanLastBookingId).text(" " + hours + " " + this.hours + " " + minutes + " " + this.minutes);
            }

            $("#" + this.divLastBookingId).show();

            setTimeout(function () {
                $("#" + thisPushAjax.divLastBookingId).fadeOut(2000);
            }, 3000);
        }

    };

    thisPushAjax.errorAjaxCall = function () {
        this.hideWaitings();
    };

    thisPushAjax.showWaitings = function () {
        $("#" + this.divWaitingIdFirst).show();
        if (this.mode == 'R') {
            $("#" + this.divWaitingIdSecond).show();
        }
    };

    thisPushAjax.hideWaitings = function () {
        $("#" + this.divWaitingIdFirst).hide();
        if (this.mode == 'R') {
            $("#" + this.divWaitingIdSecond).hide();
        }
    };

    return thisPushAjax;
};