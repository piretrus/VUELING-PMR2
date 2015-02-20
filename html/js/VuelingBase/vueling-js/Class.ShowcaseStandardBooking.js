

VUELING.Class.ShowcaseStandardBooking = function () {
    var parent = new SKYSALES.Class.SkySales(),
    thisShowcaseStandardBooking = SKYSALES.Util.extendObject(parent);

    thisShowcaseStandardBooking.btnPaySeatsId = '';
    thisShowcaseStandardBooking.btnNoChooseSeatsId = '';
    thisShowcaseStandardBooking.SelectedSeatsHolderName = "SelectedSeatsHolder";

    thisShowcaseStandardBooking.btnPaySeats = '';
    thisShowcaseStandardBooking.btnNoChooseSeats = '';
    thisShowcaseStandardBooking.SelectedSeatsHolderObj = '';

    thisShowcaseStandardBooking.inputValidationField = '';
    thisShowcaseStandardBooking.inputValidationFieldId = '';

    thisShowcaseStandardBooking.seatDivContainerId = '';
    thisShowcaseStandardBooking.seatDivContainer = '';
    thisShowcaseStandardBooking.seatTabContainerId = '';
    thisShowcaseStandardBooking.seatTabContainer = '';

    thisShowcaseStandardBooking.SSRInsuraceInputName = 'SSRInsuraceInput';
    thisShowcaseStandardBooking.SSRInsuraceInputObj = null;

    thisShowcaseStandardBooking.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.initObjects();
        this.addEvents();
    };

    thisShowcaseStandardBooking.setVars = function () {
    };

    thisShowcaseStandardBooking.initObjects = function () {
        thisShowcaseStandardBooking.btnPaySeats = $("#" + thisShowcaseStandardBooking.btnPaySeatsId);
        thisShowcaseStandardBooking.btnNoChooseSeats = $("#" + thisShowcaseStandardBooking.btnNoChooseSeatsId);
        thisShowcaseStandardBooking.inputValidationField = $("#" + thisShowcaseStandardBooking.inputValidationFieldId);
        thisShowcaseStandardBooking.seatDivContainer = $("#" + thisShowcaseStandardBooking.seatDivContainerId);
        thisShowcaseStandardBooking.seatTabContainer = $("#" + thisShowcaseStandardBooking.seatTabContainerId);
    };

    thisShowcaseStandardBooking.addEvents = function () {
        thisShowcaseStandardBooking.btnPaySeats.click(thisShowcaseStandardBooking.ShowSeatMap);

        if (thisShowcaseStandardBooking.btnNoChooseSeats != null)
            thisShowcaseStandardBooking.btnNoChooseSeats.click(thisShowcaseStandardBooking.ShowSeatMapNoChooseSeats);
    };

    thisShowcaseStandardBooking.getSSRInsuraceInputObject = function () {
        for (var ins in SKYSALES.Instance) {
            if (ins.substring(0, thisShowcaseStandardBooking.SSRInsuraceInputName.length) === thisShowcaseStandardBooking.SSRInsuraceInputName) {
                thisShowcaseStandardBooking.SSRInsuraceInputObj = SKYSALES.Instance[ins];
                break;
            }
        }
    };

    thisShowcaseStandardBooking.ShowSeatMap = function () {
        var btnSection = $("div.seats-section");
        var btnSectionNoSeats = $("div.noseats-section");
        if ($(btnSection).hasClass('sectionSelected')) {
            $('div#seatMap').addClass("hidden");
            $(btnSection).removeClass('sectionSelected');
            $(thisShowcaseStandardBooking.inputValidationField).val("");
        } else {
            $('div#seatMap').removeClass("hidden");
            $(btnSection).addClass('sectionSelected');
            if (btnSectionNoSeats != null)
                $(btnSectionNoSeats).removeClass('sectionSelected');
            $('html, body').animate({ scrollTop: $("#seatMap").offset().top }, 1000);
            $(thisShowcaseStandardBooking.inputValidationField).val("true");
            $(thisShowcaseStandardBooking.inputValidationField).focus().blur();
            if ($(thisShowcaseStandardBooking.seatDivContainer).hasClass("styleBox_red")) {
                $(thisShowcaseStandardBooking.seatDivContainer).removeClass("styleBox_red");
                $(thisShowcaseStandardBooking.seatTabContainer).find("p").removeClass("styleBox_red");
            }
            thisShowcaseStandardBooking.getSSRInsuraceInputObject();
            if (thisShowcaseStandardBooking.SSRInsuraceInputObj && thisShowcaseStandardBooking.SSRInsuraceInputObj.IsSEAclicked) {
                $('[data-object="MessageAnulacionTotal"]').show();
            }
        }

        if ($('div#seatMap').find('div[data-id-part=head]').not(".hidden").find("a[data_column=40]").length > 0) {
            thisShowcaseStandardBooking.ShowA321Plane();
            thisShowcaseStandardBooking.HiddenA319Plane();
            thisShowcaseStandardBooking.HiddenA320Plane();

        }
        else if ($('div#seatMap').find('div[data-id-part=head]').not(".hidden").find("a[data_column=31]").length > 0) {
            thisShowcaseStandardBooking.ShowA320Plane();
            thisShowcaseStandardBooking.HiddenA319Plane();
            thisShowcaseStandardBooking.HiddenA321Plane();

        } else {
            thisShowcaseStandardBooking.ShowA319Plane();
            thisShowcaseStandardBooking.HiddenA320Plane();
            thisShowcaseStandardBooking.HiddenA321Plane();

        }


    };

    thisShowcaseStandardBooking.ShowSeatMapNoChooseSeats = function () {
        var btnSectionNoSeats = $("div.noseats-section");
        var btnSection = $("div.seats-section");
        if ($(btnSectionNoSeats).hasClass('sectionSelected')) {
            $(thisShowcaseStandardBooking.inputValidationField).val("");
            $(btnSectionNoSeats).removeClass('sectionSelected');
        } else {
            thisShowcaseStandardBooking.removeSelectedSeats();
            $(thisShowcaseStandardBooking.inputValidationField).val("true");
            $(thisShowcaseStandardBooking.inputValidationField).focus().blur();
            $('div#seatMap').addClass("hidden");
            $(btnSectionNoSeats).addClass('sectionSelected');
            $(btnSection).removeClass('sectionSelected');
            if ($(thisShowcaseStandardBooking.seatDivContainer).hasClass("styleBox_red")) {
                $(thisShowcaseStandardBooking.seatDivContainer).removeClass("styleBox_red");
                $(thisShowcaseStandardBooking.seatTabContainer).find("p").removeClass("styleBox_red");
            }

            if ($("#carsCarrouselOpacityController").length > 0)
                $('html, body').animate({ scrollTop: $("#carsCarrouselOpacityController").offset().top }, 1000);
            else
                $('html, body').animate({ scrollTop: $("#baggageTab").offset().top }, 1000);
        }
    };

    thisShowcaseStandardBooking.removeSelectedSeats = function () {
        if (!thisShowcaseStandardBooking.SelectedSeatsHolderObj) {
            thisShowcaseStandardBooking.SelectedSeatsHolderObj = VUELING.Util.getObjectInstance(thisShowcaseStandardBooking.SelectedSeatsHolderName);
        }
        thisShowcaseStandardBooking.SelectedSeatsHolderObj.RemoveAllSelectedSeats();
        $(thisShowcaseStandardBooking.inputValidationField).val("");
    };

    thisShowcaseStandardBooking.ShowA321Plane = function () {
        $("p#descA321").removeClass('hidden');
    };

    thisShowcaseStandardBooking.ShowA320Plane = function () {
        $("p#descA320").removeClass('hidden');
    };

    thisShowcaseStandardBooking.ShowA319Plane = function () {
        $('p#descA319').removeClass('hidden');
    };

    thisShowcaseStandardBooking.HiddenA321Plane = function () {
        $("p#descA321").addClass('hidden');
    };

    thisShowcaseStandardBooking.HiddenA320Plane = function () {
        $("p#descA320").addClass('hidden');
    };

    thisShowcaseStandardBooking.HiddenA319Plane = function () {
        $("p#descA319").addClass('hidden');
    };

    return thisShowcaseStandardBooking;
};