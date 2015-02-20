

VUELING.Class.ShowHideSideBarDetails = function () {
    var parent = new SKYSALES.Class.SkySales(),
        showHideSideBarDetails = SKYSALES.Util.extendObject(parent);

    showHideSideBarDetails.showFlightsDetailsId = "";
    showHideSideBarDetails.showFlightsClassToToggle = "";

    showHideSideBarDetails.init = function (json) {
        this.setSettingsByObject(json);
        this.initializeSeatsDetail();
        this.addEvents();
    };


    showHideSideBarDetails.initializeSeatsDetail = function () {
        $('.' + showHideSideBarDetails.showFlightsClassToToggle).hide();
        $('#' + showHideSideBarDetails.showFlightsDetailsId + ' span').text(' [+]');
    };

    showHideSideBarDetails.addEvents = function () {

        $('#' + showHideSideBarDetails.showFlightsDetailsId).click(function () {
            if ($('.' + showHideSideBarDetails.showFlightsClassToToggle).is(":visible")) {
                $('.' + showHideSideBarDetails.showFlightsClassToToggle).hide();
                $('#' + showHideSideBarDetails.showFlightsDetailsId + ' span').text(' [+]');
            } else {
                $('.' + showHideSideBarDetails.showFlightsClassToToggle).show();
                $('#' + showHideSideBarDetails.showFlightsDetailsId + ' span').text(' [-]');
            };
        });
    };

    return showHideSideBarDetails;
};