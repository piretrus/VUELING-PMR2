VUELING.Class.PassengerContactDataBanner = function ()
{
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);
    var thisObj = $(this);

    thisClass.ActionButton = null;
    thisClass.DataContactSection = null;
    thisClass.ToHide = null;
    thisClass.popUpObjectName = "passengerDataContactPopUp";
    thisClass.blockUI = null;
    thisClass.PopUpClose = null;

    thisClass.init = function (json)
    {
        this.setSettingsByObject(json);
        this.addEvents();

        thisClass.blockUI = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = $(thisClass.PopUpClose);
        thisClass.blockUI.init(json);
    };

    thisClass.addEvents = function ()
    {
        thisClass.GetObjectsCollection();
        thisClass.RegisterEvents();
    };

    thisClass.GetObjectsCollection = function () {
        console.log(thisClass.ToHide);
        thisClass.ObjectsCollection = {
            "ActionButton": $(thisClass.ActionButton),
            "DataContactSection": $(thisClass.DataContactSection),
            "ToHide": $(thisClass.ToHide)
        };
    };

    thisClass.RegisterEvents = function () {

        $(document).ready(function () {
            if (!thisClass.ObjectsCollection["ActionButton"].is(":visible")) {
                thisClass.ObjectsCollection["ToHide"].hide();
                thisClass.ObjectsCollection["DataContactSection"].show();
            } else {
                ($("[data-action='dataPassengerFormAction']").length == 0 && $("[data-action='dataPassengerFormAction']").is(":visible")) ? $("#ItineraryPassengerSeatDetailsDisplay").hide() : $("#ItineraryPassengerSeatDetailsDisplay").show();
                ($("[data-action='dataPassengerFormAction']").length == 0 && $("[data-action='dataPassengerFormAction']").is(":visible")) ? thisClass.ObjectsCollection["DataContactSection"].show() : thisClass.ObjectsCollection["DataContactSection"].hide();
            }

        });

        thisClass.ObjectsCollection["ActionButton"].click(function (e)
        {
            var action = $(this).attr("href");

            thisClass.ObjectsCollection["DataContactSection"].show();
            thisClass.ObjectsCollection["ToHide"].hide();
            thisClass.ObjectsCollection["ToHide"].trigger("click");

            if ($("#icoDetailsReservation").length > 0)
            {
                $("#icoDetailsReservation").hasClass("pulsado") ? $("#icoDetailsReservation").removeClass("pulsado") : $("#icoDetailsReservation").addClass("pulsado");
            }

            if (thisClass.ObjectsCollection["ToHide"].hasClass("hidden"))
            {
                thisClass.ObjectsCollection["ToHide"].removeClass("hidden");
                thisClass.ObjectsCollection["ToHide"].show();
                thisClass.ObjectsCollection["ToHide"].css("display", "block");
            } else {
                thisClass.ObjectsCollection["ToHide"].addClass("hidden");
                thisClass.ObjectsCollection["ToHide"].css("display", "none");
            }

            if (action == "scroll")
            {
                thisClass.ScrollTo(e);
            } else {
                thisClass.ShowPopUp(e);
            }
        });
    };

    thisClass.ScrollTo = function (e)
    {
        $('html, body').animate({
            scrollTop: thisClass.ObjectsCollection["DataContactSection"].offset().top
        }, 1500);
    };

    thisClass.ShowPopUp = function (e)
    {
        e.preventDefault();
        thisClass.blockUI.show("blockUIPopUpForPassengerTravelDocuments");
        return false;
    };

    return thisClass;
};