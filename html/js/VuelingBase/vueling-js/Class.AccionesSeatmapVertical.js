VUELING.Class.AccionesSeatmapVertical = function () {
    var parent = new SKYSALES.Class.SkySales();
    var thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.casco = null;
    thisClass.scroll = null;
    thisClass.lengueta = null;
    thisClass.planeModel = null;
    thisClass.isDragging = false;
    thisClass.id = '';

    thisClass.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();

        thisClass.id = thisClass.casco.attr('id');
    };

    thisClass.addEvents = function () {
        this.scroll.draggable({ containment: "parent", axis: "y" });
        this.scroll.on("drag", this.onDrag);
        this.scroll.on("dragstop", this.onDragStop);

        this.casco.on("scroll", this.onScroll);
    };

    thisClass.onDrag = function (event, ui) {
        thisClass.isDragging = true;
    };

    thisClass.onDragStop = function (event, ui) {
        thisClass.casco.animate({ scrollTop: thisClass.GetTopFromDrag(ui.position.top) }, 500);
        thisClass.isDragging = false;
    };

    thisClass.onScroll = function () {
        var thirdScroll = parseInt((thisClass.casco[0].scrollHeight - thisClass.casco.height()) / 3);
        var minScroll = thirdScroll;
        var maxScroll = thirdScroll * 2;
        var scrollTop = thisClass.casco.scrollTop();
        if (scrollTop > minScroll && scrollTop < maxScroll) {
            thisClass.lengueta.addClass("hiddenScroll");
            thisClass.showScrolls(true, true);
        }
        if (scrollTop <= minScroll) {
            thisClass.lengueta.removeClass("hiddenScroll");
            thisClass.scroll.removeClass("avion_mini__scroll_tras").addClass("avion_mini__scroll_del");
            thisClass.showScrolls(false, true);
        }
        if (scrollTop >= maxScroll) {
            thisClass.lengueta.removeClass("hiddenScroll");
            thisClass.scroll.removeClass("avion_mini__scroll_del").addClass("avion_mini__scroll_tras");
            thisClass.showScrolls(true, false);
        }

        if (!thisClass.isDragging)
            thisClass.scroll.css('top', thisClass.GetTopFromScroll(scrollTop) + 'px');
    };

    thisClass.GetTopFromScroll = function (top) {
        var cascoHeight = thisClass.casco[0].scrollHeight;
        var scrollHeight = thisClass.scroll.parent().height() + thisClass.scroll.height();

        var topFromScroll = parseInt(top / cascoHeight * scrollHeight);
        return topFromScroll;
    };

    thisClass.GetTopFromDrag = function (top) {
        var cascoHeight = thisClass.casco[0].scrollHeight;
        var scrollHeight = thisClass.scroll.parent().height() + thisClass.scroll.height();

        var topFromDrag = parseInt(top / scrollHeight * cascoHeight);
        return topFromDrag;
    };

    thisClass.showScrolls = function (up, down) {
        var idUp = thisClass.id.replace('casco', '#scrollUp');
        var idDown = thisClass.id.replace('casco', '#scrollDown');

        if (up)
            $(idUp).show();
        else
            $(idUp).hide();

        if (down)
            $(idDown).show();
        else
            $(idDown).hide();
    };

    return thisClass;
};