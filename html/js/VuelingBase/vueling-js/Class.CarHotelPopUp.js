

VUELING.Class.CarHotelPopUp = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisCarHotelPopUp = SKYSALES.Util.extendObject(parent);

    thisCarHotelPopUp.carHotelPopUpObjectName = "HotelsPopUp";

    thisCarHotelPopUp.init = function () {
        this.changeText();
        this.autoOpen();
    };

    thisCarHotelPopUp.changeText = function () {
        var intro = $("#hotelscars_title").text();
        var route = $(".detalleRuta")[1].innerHTML;
        var title = intro.replace('{0}', route);
        $("#hotelscars_title").html(title.replace(new RegExp("\\(.+?\\):", ""), ""));

        thisCarHotelPopUp.showTitle();
    };

    thisCarHotelPopUp.autoOpen = function () {
        var myObject = null;
        for (var ins in SKYSALES.Instance) {
            if (ins.substring(0, thisCarHotelPopUp.carHotelPopUpObjectName.length) === thisCarHotelPopUp.carHotelPopUpObjectName) {
                myObject = SKYSALES.Instance[ins];
                break;
            }
        }

        myObject.openInfoBox();
    };

    thisCarHotelPopUp.showTitle = function () {
        $("#hotelscars_title").show("fast");
    };

    return thisCarHotelPopUp;
};