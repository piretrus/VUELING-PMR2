

VUELING.Class.MemberLogoutPopUp = function () {
    var parent = new SKYSALES.Class.SkySales(),
     thisMemberLogout = SKYSALES.Util.extendObject(parent);

    thisMemberLogout.LinkAgencyId = '';
    thisMemberLogout.LinkCorporateId = '';
    thisMemberLogout.ClosePopupId = '';
    thisMemberLogout.LinkCancelId = '';
    thisMemberLogout.PopupId = '';
    thisMemberLogout.InputHiddenId = '';
    thisMemberLogout.TxtForAgency = '';
    thisMemberLogout.TxtForCorp = '';

    thisMemberLogout.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisMemberLogout.addEvents = function() {
        $('#' + thisMemberLogout.LinkAgencyId).click(thisMemberLogout.ClickLinkAgency);
        $('#' + thisMemberLogout.LinkCorporateId).click(thisMemberLogout.ClickLinkCorporate);
    };

    thisMemberLogout.ClickLinkAgency = function () {
        $('#' + thisMemberLogout.InputHiddenId).val('T');
        $('#' + thisMemberLogout.TxtForCorp).hide();
        $('#' + thisMemberLogout.TxtForAgency).show();
        thisMemberLogout.InitializePopUp();
    };

    thisMemberLogout.ClickLinkCorporate = function () {
        $('#' + thisMemberLogout.InputHiddenId).val('C');
        $('#' + thisMemberLogout.TxtForAgency).hide();
        $('#' + thisMemberLogout.TxtForCorp).show();
        thisMemberLogout.InitializePopUp();
    };

    thisMemberLogout.InitializePopUp = function() {

        var blockPopUp = new SKYSALES.Class.BlockedPopUp();
        var json = {};
        json.closeElement = $("#" + thisMemberLogout.ClosePopupId+", #"+thisMemberLogout.LinkCancelId);
        json.properties = { css: { width: '45em' } };
        blockPopUp.init(json);
        blockPopUp.show(thisMemberLogout.PopupId);
        return false;
    };

    return thisMemberLogout;
};