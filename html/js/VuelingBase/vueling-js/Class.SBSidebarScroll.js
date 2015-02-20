

VUELING.Class.SBSidebarScroll = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisSBSidebarScroll = SKYSALES.Util.extendObject(parent);

    thisSBSidebarScroll.anclaId = "";
    thisSBSidebarScroll.ancla = null;
    thisSBSidebarScroll.containerId = "";
    thisSBSidebarScroll.container = null;
    thisSBSidebarScroll.scroll_footerH_element = null;
    thisSBSidebarScroll.scroll_selectAside = null;
    thisSBSidebarScroll.scroll_selectArticle = null;
    thisSBSidebarScroll.scroll_foot_element = null;
    thisSBSidebarScroll.bodyId = "";

    thisSBSidebarScroll.init = function (json) {
        this.setSettingsByObject(json);
        this.initializePage();
        this.addEvents();
        thisSBSidebarScroll.scrollHandler();
    };

    thisSBSidebarScroll.setSettingsByObject = function (json) {
        parent.setSettingsByObject.call(this, json);
    };

    thisSBSidebarScroll.initializePage = function () {
        thisSBSidebarScroll.ancla = this.getById(this.anclaId);
        thisSBSidebarScroll.container = this.getById(this.containerId);
        thisSBSidebarScroll.scroll_selectAside = $('#selectAside');
        thisSBSidebarScroll.scroll_selectArticle = $('#' + thisSBSidebarScroll.bodyId);
    };

    thisSBSidebarScroll.resizeSidebar = function() {
        var height = $('#selectArticle').height();
        if (!height) //Because of the services page.
            height = $('#personalizeArticle').height();
        $('#selectAside').height(height);
    };

    thisSBSidebarScroll.addEvents = function () {
        if (VUELING.Util.IsAppleDevice()) {
            $(window).resize(thisSBSidebarScroll.resizeSidebar);
            thisSBSidebarScroll.resizeSidebar();
        }
        $(window).bind("scroll", thisSBSidebarScroll.scrollHandler);
    };

    thisSBSidebarScroll.scrollHandler = function (e) {
        if (($.browser.msie && $.browser.version < 9) || VUELING.Util.IsAppleDevice())
            return;

        if (thisSBSidebarScroll.ancla.size() > 0) {
            var offset = thisSBSidebarScroll.ancla.offset();
            var selectAside = thisSBSidebarScroll.scroll_selectAside.outerHeight(true);
            var selectArticle = thisSBSidebarScroll.scroll_selectArticle.outerHeight(true);
            var submitBottomOffset = thisSBSidebarScroll.scroll_foot_element.offset();
            var maxscrollposition = submitBottomOffset.top + thisSBSidebarScroll.scroll_foot_element.height();
            var offsetTop = offset.top - 30;
            if ($(window).scrollTop() > offsetTop && selectArticle > selectAside) // check if it's necessary to move the element
            {
                if ($(window).height() - thisSBSidebarScroll.scroll_footerH_element - thisSBSidebarScroll.container.outerHeight(true) > 0 || maxscrollposition - ($(window).scrollTop() + thisSBSidebarScroll.container.outerHeight()) > 5) { //let's move it
                    thisSBSidebarScroll.container.css('position', 'fixed');
                    thisSBSidebarScroll.container.css('top', '10px');
                } else { // fix element at the bottom
                    thisSBSidebarScroll.container.css('position', 'fixed');
                    thisSBSidebarScroll.container.css('top', maxscrollposition - ($(window).scrollTop() + thisSBSidebarScroll.container.outerHeight()) + 'px');
                }
            } else {
                thisSBSidebarScroll.container.css('position', 'relative');
                thisSBSidebarScroll.container.css('top', '0px');
            }
        }
    };

    return thisSBSidebarScroll;
};