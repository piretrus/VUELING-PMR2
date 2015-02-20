

VUELING.Class.ResendItinerary = function (json) {
    json = json || {};
    var parent = SKYSALES.Class.Resource(),
            thisResendItinerary = SKYSALES.Util.extendObject(parent);

    thisResendItinerary.buttonId = "";
    thisResendItinerary.InputEmailId = "";
    thisResendItinerary.EmailOk = "";
    thisResendItinerary.EmailKo = "";
    thisResendItinerary.EmailInvalid = "";
    thisResendItinerary.button = null;

    thisResendItinerary.init = function (json) {
        this.setSettingsByObject(json);
        this.initObject();
        this.addEvents();
    };

    thisResendItinerary.initObject = function () {
        this.button = this.getById(thisResendItinerary.buttonId);
    };

    thisResendItinerary.addEvents = function () {
        this.button.click(thisResendItinerary.MyClick);
    };

    thisResendItinerary.MyClick = function (e) {
        if ($("input[name='" + thisResendItinerary.InputEmailId + "']").val().indexOf('@', 0) != -1 || $("input[name='" + thisResendItinerary.InputEmailId + "']").val().indexOf('.', 0) != -1) {
            $.ajax({
                url: "ResendItineraryAjax.aspx",
                data: "showp=0&mail=" + $("input[name='" + thisResendItinerary.InputEmailId + "']").val(),
                success: function (data) {
                    if (data == "true") {
                        alert(thisResendItinerary.EmailOk);
                        $("input[name='" + thisResendItinerary.InputEmailId + "']").val('');
                    } else {
                        alert(thisResendItinerary.EmailKo);
                    }
                },
                error: function () { alert(thisResendItinerary.EmailKo); },
                dataType: "html",
                timeout: 15000
            });
        } else {
            alert(thisResendItinerary.EmailInvalid);
        }
    };

    return thisResendItinerary;
};