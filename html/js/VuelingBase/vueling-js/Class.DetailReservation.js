


VUELING.Class.DetailReservation = function () {
    var parent = SKYSALES.Class.SkySales(),
        detailReservation = SKYSALES.Util.extendObject(parent);

    //#region Properties

    detailReservation.btnDetailsReservationId = "btnDetailsReservation";
    detailReservation.btnDetailsReservationObj = null;

    detailReservation.dvDetailsReservationContentId = "dvDetailsReservationContent";
    detailReservation.dvDetailsReservationContentObj = null;

    detailReservation.icoDetailsReservationId = "icoDetailsReservation";
    detailReservation.icoDetailsReservationObj = null;

    //#endregion Properties

    detailReservation.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();
    };

    detailReservation.initObjects = function () {
        detailReservation.btnDetailsReservationObj = this.getById(detailReservation.btnDetailsReservationId);
        detailReservation.dvDetailsReservationContentObj = this.getById(detailReservation.dvDetailsReservationContentId);
        detailReservation.icoDetailsReservationObj = this.getById(detailReservation.icoDetailsReservationId);
    };

    detailReservation.addEvents = function () {
        detailReservation.EventsForButtonDetailsReservation();
    };

    //#region Events

    detailReservation.EventsForButtonDetailsReservation = function () {
        $(detailReservation.btnDetailsReservationObj).unbind('click', detailReservation.ButtonDetailsReservation).bind('click', detailReservation.ButtonDetailsReservation);
    };

    //#endregion Events

    detailReservation.ButtonDetailsReservation = function (e) {
        e.preventDefault();
        
        if (!$(detailReservation.dvDetailsReservationContentObj).is(":visible")) {
            $(detailReservation.dvDetailsReservationContentObj).removeClass("hidden");
            $(detailReservation.icoDetailsReservationObj).addClass("pulsado");
            $(detailReservation.dvDetailsReservationContentObj).css("display", "block");
        } else {
            $(detailReservation.dvDetailsReservationContentObj).addClass("hidden");
            $(detailReservation.icoDetailsReservationObj).removeClass("pulsado");
            $(detailReservation.dvDetailsReservationContentObj).css("display", "none");
        }
    };

    return detailReservation;
};