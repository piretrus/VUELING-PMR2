

VUELING.Class.MoovingSBSideBar = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisMoovingSBSideBar = SKYSALES.Util.extendObject(parent);

    thisMoovingSBSideBar.anclaId = "";
    thisMoovingSBSideBar.containerId = "";
    thisMoovingSBSideBar.bodyId = "";

    thisMoovingSBSideBar.sBSidebarScroll = null;

    thisMoovingSBSideBar.init = function (json) {
        this.setSettingsByObject(json);
        this.initializePage();
    };

    thisMoovingSBSideBar.initializePage = function () {
        thisMoovingSBSideBar.sBSidebarScroll = new VUELING.Class.SBSidebarScroll();
        thisMoovingSBSideBar.sBSidebarScroll.init(
            {
                "anclaId": thisMoovingSBSideBar.anclaId,
                "containerId": thisMoovingSBSideBar.containerId,
                "bodyId": thisMoovingSBSideBar.bodyId,
                "scroll_foot_element": $('.footSb, .footer'),
                "scroll_footerH_element": $('div.footer').outerHeight(true)
            });
    };

    return thisMoovingSBSideBar;
};