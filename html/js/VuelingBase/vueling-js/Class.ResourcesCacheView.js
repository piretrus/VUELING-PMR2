

VUELING.Class.ResourcesCacheView = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisResourcesCacheView = SKYSALES.Util.extendObject(parent);

    thisResourcesCacheView.ServerSelectId = '';
    thisResourcesCacheView.ResourcesCacheKeySelectId = '';
    thisResourcesCacheView.HttpCacheKeySelectId = '';
    thisResourcesCacheView.ResultDivId = '';
    thisResourcesCacheView.HttpCacheGetResultLinkId = '';
    thisResourcesCacheView.ResourcesCacheGetResultLinkId = '';

    thisResourcesCacheView.ServerSelect = null;
    thisResourcesCacheView.ResourcesCacheKeySelect = null;
    thisResourcesCacheView.HttpCacheKeySelect = null;
    thisResourcesCacheView.ResultDiv = null;
    thisResourcesCacheView.HttpCacheGetResultLink = null;
    thisResourcesCacheView.ResourcesCacheGetResultLink = null;

    thisResourcesCacheView.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents()
    };

    thisResourcesCacheView.setVars = function () {
        if (this.ServerSelectId != "")
            this.ServerSelect = $("#" + this.ServerSelectId);

        if (this.ResourcesCacheKeySelectId != "")
            this.ResourcesCacheKeySelect = $("#" + this.ResourcesCacheKeySelectId);

        if (this.HttpCacheKeySelectId != "")
            this.HttpCacheKeySelect = $("#" + this.HttpCacheKeySelectId);

        if (this.ResultDivId != "")
            this.ResultDiv = $("#" + this.ResultDivId);

        if (this.HttpCacheGetResultLinkId != "")
            this.HttpCacheGetResultLink = $("#" + this.HttpCacheGetResultLinkId);

        if (this.ResourcesCacheGetResultLinkId != "")
            this.ResourcesCacheGetResultLink = $("#" + this.ResourcesCacheGetResultLinkId);
    };

    thisResourcesCacheView.addEvents = function () {
        if (this.HttpCacheGetResultLink)
            this.HttpCacheGetResultLink.click(thisResourcesCacheView.GetHttpCacheKey);

        if (this.ResourcesCacheGetResultLink)
            this.ResourcesCacheGetResultLink.click(thisResourcesCacheView.GetResourcesCacheKey);
    };

    thisResourcesCacheView.GetResourcesCacheKey = function (e) {
        e.preventDefault();
        var method = $(thisResourcesCacheView.ResourcesCacheKeySelect).val();

        if (thisResourcesCacheView.HttpCacheKeySelect)
            $(thisResourcesCacheView.HttpCacheKeySelect.find("option")[0]).attr("selected", "selected");

        thisResourcesCacheView.getMethodResultWrapper("GetResourcesCache", method);
    };

    thisResourcesCacheView.GetHttpCacheKey = function (e) {
        e.preventDefault();
        var method = $(thisResourcesCacheView.HttpCacheKeySelect).val();

        if (thisResourcesCacheView.ResourcesCacheKeySelect)
            $(thisResourcesCacheView.ResourcesCacheKeySelect.find("option")[0]).attr("selected", "selected");

        thisResourcesCacheView.getMethodResultWrapper("GetHttpCache", method);
    };

    thisResourcesCacheView.getMethodResultWrapper = function (type, method) {
        var serverId = thisResourcesCacheView.getSelectedServerId();

        if (!method.length)
            return;

        thisResourcesCacheView.clearResultDiv();

        if (!method.length)
            return;

        thisResourcesCacheView.clearResultDiv();

        if (serverId == "all") {
            thisResourcesCacheView.ServerSelect.find("option").each(function () {
                var serverId = $(this).val(),
                    serverName = $(this).html();
                if (!isNaN(parseFloat(serverId))) {
                    var textareaId = thisResourcesCacheView.createResultTextarea(type + "." + method, serverName);
                    thisResourcesCacheView.getMethodResult(type, method, serverId, function (data) { $("#" + textareaId).val(VUELING.Util.htmlDecode(data)); });
                }
            });
        }
        else {
            var serverName = thisResourcesCacheView.getSelectedServerName(),
                textareaId = thisResourcesCacheView.createResultTextarea(type + "." + method, serverName);
            thisResourcesCacheView.getMethodResult(type, method, serverId, function (data) {
                $("#" + textareaId).val(VUELING.Util.htmlDecode(data));
            });
        }
    };

    thisResourcesCacheView.createResultTextarea = function (methodName, serverId) {
        var textarea = document.createElement('textarea'),
            p = document.createElement('p'),
            label = document.createElement('label'),
            id = 'textarea_' + Math.round(Math.random() * 10000);

        $(textarea).attr('id', id)
            .attr('rows', 10)
            .css('width', '100%')
            .val("Waiting for response...");

        if (methodName);
        $(label).append(methodName);

        if (serverId)
            $(label).append(" (" + serverId + ")");

        $(p).append(label).append(textarea);
        this.ResultDiv.append(p);

        return id;
    };

    thisResourcesCacheView.clearResultDiv = function () {
        this.ResultDiv.html('');
    };

    thisResourcesCacheView.getSelectedServerId = function () {
        return this.ServerSelect.val();
    };

    thisResourcesCacheView.getSelectedServerName = function () {
        return this.ServerSelect.find("option:selected").html();
    };

    thisResourcesCacheView.getMethodResult = function (type, method, serverId, callback) {
        $.ajax({
            url: "ResourcesCacheView-resource.aspx?member=" + serverId,
            cache: false,
            dataType: "text",
            success: callback,
            data: {
                "__EVENTARGUMENT": type,
                "HttpCacheKey": method,
                "ResourcesCacheKey": method
            }
        });
    };

    return thisResourcesCacheView;
};