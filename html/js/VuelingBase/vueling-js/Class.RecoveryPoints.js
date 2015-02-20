

VUELING.Class.RecoveryPoints = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisRecoveryPoints = SKYSALES.Util.extendObject(parent);

    thisRecoveryPoints.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisRecoveryPoints.addEvents = function () {
        $('#fromPromotionalCode').hide();

        $('input[name="recoverPoints"]').change(function () {
            var selected = $(this).val();
            $('#fromBooking').hide();
            $('#fromPromotionalCode').hide();
            $('#' + selected).show();
        });
    }

    return thisRecoveryPoints;
};