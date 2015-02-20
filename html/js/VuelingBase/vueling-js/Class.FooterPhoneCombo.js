

VUELING.Class.FooterPhoneCombo = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisFooterPhoneCombo = SKYSALES.Util.extendObject(parent);

    thisFooterPhoneCombo.phoneNumber = "";
    thisFooterPhoneCombo.phoneCombo = "";
    thisFooterPhoneCombo.phoneInfo = "";
    thisFooterPhoneCombo.phoneInfoHtml = "";

    thisFooterPhoneCombo.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisFooterPhoneCombo.addEvents = function () {

        $('#' + thisFooterPhoneCombo.phoneCombo).change(function () {
            var selected = $(this).val();
            var phoneInfo = thisFooterPhoneCombo.phoneInfo[selected];
            $('#' + thisFooterPhoneCombo.phoneNumber).html(phoneInfo.phoneNumber);
            $('#' + thisFooterPhoneCombo.phoneInfoHtml + " p").first().html(phoneInfo.phoneInfoFirst);
            $('#' + thisFooterPhoneCombo.phoneInfoHtml + " p").last().html(phoneInfo.phoneInfoLast);
        });
    };
    return thisFooterPhoneCombo;
};