

VUELING.Class.My25MyVueling = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisMy25MyVueling = SKYSALES.Util.extendObject(parent);

    thisMy25MyVueling.ItemsPerPage = 10;
    thisMy25MyVueling.Pages = [];
    thisMy25MyVueling.Tabs = [];
    thisMy25MyVueling.LastBonusBuyedCode = null;
    thisMy25MyVueling.Bonus = [];
    thisMy25MyVueling.BookingsPurchased = [];

    thisMy25MyVueling.CurrentBonusDateOrderType = null;
    thisMy25MyVueling.CurrentBonusPriceOrderType = null;
    thisMy25MyVueling.AllBonusDateOrderType = null;
    thisMy25MyVueling.AllBonusPriceOrderType = null;


    thisMy25MyVueling.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisMy25MyVueling.addEvents = function () {
        thisMy25MyVueling.AddTabEvents();
        thisMy25MyVueling.AddPaginatorEvents();
        thisMy25MyVueling.AddReorderPagination();
        thisMy25MyVueling.AddClickEventsToGrid();
    };
    
    thisMy25MyVueling.AddClickEventsToGrid = function () {
        $('.table-padding tr').click(function (event) {
            if (event.target.type !== 'checkbox') {
                var checkbox = $(this).find('input:checkbox');
                if (checkbox && checkbox.is(':checked'))
                    checkbox.removeAttr('checked');
                else
                    checkbox.attr('checked', 'checked');

                checkbox.triggerHandler("click");

            }
        });
    };

    thisMy25MyVueling.AddTabEvents = function () {
        $.each(thisMy25MyVueling.Tabs, function (index, tab) {
            $("#" + tab.Id).click(thisMy25MyVueling.changeTab);
        });
    };

    thisMy25MyVueling.AddPaginatorEvents = function () {
        $.each(thisMy25MyVueling.Pages, function (index, page) {
            $("[data-" + page.PaginatorItemsSelector + "]").bind("click", { pageId: page.Id }, thisMy25MyVueling.Paginate);
        });
    };

    thisMy25MyVueling.AddReorderPagination = function () {
        $.each(thisMy25MyVueling.Pages, function (index, page) {
            if (page.DateReorderControl != null)
                $("#" + page.DateReorderControl).bind("click", { pageId: page.Id, orderBy: "date" }, thisMy25MyVueling.Reorder);
            if (page.PriceReorderControl)
                $("#" + page.PriceReorderControl).bind("click", { pageId: page.Id, orderBy: "discount" }, thisMy25MyVueling.Reorder);
            if (page.NextButtonId != null)
                $("#" + page.NextButtonId).bind("click", { pageId: page.Id }, thisMy25MyVueling.Next);
            if (page.AddRemoveBonusSelector != null)
                $("[" + page.AddRemoveBonusSelector + "]").bind("click", { pageId: page.Id }, thisMy25MyVueling.AddRemoveBonusInSelection);
            if (page.ShowMoreBonusControlId != null)
                $("#" + page.ShowMoreBonusControlId).bind("click", { pageId: page.Id, action: "show" }, thisMy25MyVueling.ShowHideMoreBonus);
            if (page.HideBonusControlId != null)
                $("#" + page.HideBonusControlId).bind("click", { pageId: page.Id, action: "hide" }, thisMy25MyVueling.ShowHideMoreBonus);

        });
    };

    thisMy25MyVueling.ShowHideMoreBonus = function (e) {
        var action = (e.data).action;
        var pageId = (e.data).pageId;

        var page = thisMy25MyVueling.GetPage(pageId);
        page.CurrentPage = action == "show" ? (parseFloat(page.CurrentPage) + 1) : (parseFloat(page.CurrentPage) - 1);

        thisMy25MyVueling.RedisplayBonusGrid(page);
        thisMy25MyVueling.AddClickEventsToGrid();
    };

    thisMy25MyVueling.RedisplayBonusGrid = function (page) {
        var itemsArray = new Array();

        var hideShowMoreBonus = thisMy25MyVueling.Bonus.length <= (page.CurrentPage * page.ItemsPerPage);

        if (!hideShowMoreBonus)
            $("#" + page.ShowMoreBonusControlId).show();
        else
            $("#" + page.ShowMoreBonusControlId).hide();

        if (page.CurrentPage > 1)
            $("#" + page.HideBonusControlId).show();
        else
            $("#" + page.HideBonusControlId).hide();


        for (var i = 0; (i < thisMy25MyVueling.Bonus.length && i < (page.CurrentPage * page.ItemsPerPage)) ; i++) {
            itemsArray.push(thisMy25MyVueling.Bonus[i]);
        }

        var html = thisMy25MyVueling.GetBonusGridHtml(itemsArray);
        $("#" + page.GridBody + " tr").remove();
        $("#" + page.GridBody).html(html);
        $("#" + page.GridBody + " tr").last().addClass("last");

        var originalPage = thisMy25MyVueling.GetPage("AllBonus");
        thisMy25MyVueling.RebindChecksEvent(originalPage);
    };

    thisMy25MyVueling.GetBonusGridHtml = function (itemsArray) {
        var html = "";

        for (var i = 0; i < itemsArray.length; i++) {
            //active first-row
            var isSelected = thisMy25MyVueling.IsSelectedBonus(itemsArray[i].Code);
            html += "<tr class='table-row " + (i == 0 ? "first-row" : "") + " " + (isSelected ? "active" : "") + "'>";
            html += "<td class='table-col table-col1'>";
            html += "<input type='checkbox' name='bono' class='typeCheck floatNone marginRight5' value='" + itemsArray[i].Code + "' " + (isSelected ? "checked" : "") + ">";
            html += "<label class='fw_800'>" + itemsArray[i].Code + "</label></td>";
            html += "<td class='table-col table-col2'>";
            html += "<span class='" + itemsArray[i].PromoBonoTypeIcon + "'></span>";
            html += "</td>";
            html += "<td class='table-col table-col3'>" + itemsArray[i].InitialDate + " - " + itemsArray[i].EndDate + "</td>";
            html += "<td class='table-col table-col-last'>";
            html += "<span class='icon-bf ico-bf-confirm_small tc_green fw_800 fs_12'>" + SKYSALES.Util.convertToLocaleCurrency(itemsArray[i].TotalDiscount) + "</span>";
            html += "</td>";
            html += "</tr>";
        }
        return html;
    };

    thisMy25MyVueling.RebindChecksEvent = function (page) {
        $("[" + page.AddRemoveBonusSelector + "]").bind("click", { pageId: page.Id }, thisMy25MyVueling.AddRemoveBonusInSelection);
    };

    thisMy25MyVueling.AddRemoveBonusInSelection = function (e) {
        var pageId = (e.data).pageId;
        var orderby = (e.data).orderBy;
        var page = thisMy25MyVueling.GetPage(pageId);

        var bonusCode = $(e.currentTarget).val();
        var addBonus = $(e.currentTarget).is(':checked');

        if (addBonus) {
            var itemIndex = thisMy25MyVueling.GetBonusIndex(page.BonusCodeSelected, bonusCode);
            if (itemIndex == -1) {
                var item = new Object();
                item.Code = bonusCode;
                page.BonusCodeSelected.push(item);
                $(e.currentTarget).closest('tr').addClass("active");
            }
        }
        else if (!addBonus) {
            var index = thisMy25MyVueling.GetBonusIndex(page.BonusCodeSelected, bonusCode);
            if (index != -1)
                page.BonusCodeSelected.splice(index, 1);
            $(e.currentTarget).closest('tr').removeClass("active");
        }

        if (page.TotalDiscountSumSelectedsBonus != undefined) {
            var totalDiscounted = 0;
            for (var i = 0; i < page.BonusCodeSelected.length; i++) {
                var bonusIndex = thisMy25MyVueling.GetBonusIndex(thisMy25MyVueling.Bonus, page.BonusCodeSelected[i].Code);
                if (bonusIndex != -1)
                    totalDiscounted += parseFloat(thisMy25MyVueling.Bonus[bonusIndex].TotalDiscount);
            };
            $("#" + page.TotalDiscountSumSelectedsBonus).html(SKYSALES.Util.convertToLocaleCurrency(totalDiscounted));
        }

        var totalPages = 0;
        for (var i = 0; i < page.BonusCodeSelected.length; i++) {
            totalPages += thisMy25MyVueling.GetSources(page.BonusCodeSelected[i].Code).length;
        }

        thisMy25MyVueling.RedisplayPagionation(Math.ceil(totalPages / 10));

        thisMy25MyVueling.Paginate(e);

        thisMy25MyVueling.ShowOrHideBonusDetailsGrid(e);
        
        
    };


    thisMy25MyVueling.ShowOrHideBonusDetailsGrid = function (e) {

        var pageId = (e.data).pageId;
        var page = thisMy25MyVueling.GetPage(pageId);

        var rowCount = $('#' + page.GridBody + ' tr').size();
        if (rowCount == 0) {
            if ($("#contentBonusNotApplied").hasClass('hidden')) {
                $("#contentBonusNotApplied").addClass('show');
                $("#contentBonusNotApplied").removeClass('hidden');
            }
            $("#contentGridPagination").addClass('hidden');
        }
        else {
            if ($("#contentGridPagination").hasClass('hidden')) {
                $("#contentGridPagination").removeClass('hidden');
            }
            if ($("#contentBonusNotApplied").hasClass('show')) {
                $("#contentBonusNotApplied").addClass('hidden');
                $("#contentBonusNotApplied").removeClass('show');
            }
        }

    };

    thisMy25MyVueling.Reorder = function (e) {
        var pageId = (e.data).pageId;
        var orderby = (e.data).orderBy;

        var page = thisMy25MyVueling.GetPage(pageId);

        if ($(e.currentTarget).hasClass('old-order')) {
            $(e.currentTarget).removeClass('old-order');
        }
        else {
            $(e.currentTarget).addClass('old-order');
        }

        page.orderby = orderby;
        page.DateOrderType = $("#" + page.DateReorderControl).hasClass("old-order") ? "asc" : "desc";
        page.PriceOrderType = $("#" + page.PriceReorderControl).hasClass("old-order") ? "asc" : "desc";

        thisMy25MyVueling.Paginate(e);
    };

    thisMy25MyVueling.Next = function (e) {
        var pageId = (e.data).pageId;
        var orderby = (e.data).orderBy;

        var page = thisMy25MyVueling.GetPage(pageId);
        page.CurrentPage = parseFloat(page.CurrentPage) + 1;
        thisMy25MyVueling.Paginate(e);
    };

    thisMy25MyVueling.Paginate = function (e) {
        var bonusCodeArray = new Array();

        var pageId = (e.data).pageId;
        var page = thisMy25MyVueling.GetPage(pageId);

        page.CurrentPage = !isNaN(parseFloat($(e.currentTarget).text())) ? parseFloat($(e.currentTarget).text()) : parseFloat(page.CurrentPage);

        var items = thisMy25MyVueling.GetElementsByPage(page, page.CurrentPage);
        var html = thisMy25MyVueling.GetRowsHtml(items);
        thisMy25MyVueling.ChangeButtonPage(page.PaginatorItemsSelector, page.CurrentPage, page.NextButtonId);

        thisMy25MyVueling.PrintResult(html, page.GridBody);
    };

    thisMy25MyVueling.changeTab = function (e) {
        var tabName = e.currentTarget.id;
        for (var i = 0; i < thisMy25MyVueling.Tabs.length; i++) {
            if (thisMy25MyVueling.Tabs[i].Id == tabName) {
                $("#" + thisMy25MyVueling.Tabs[i].Id).addClass(thisMy25MyVueling.Tabs[i].OnActiveCssClassTab);
                $("#" + thisMy25MyVueling.Tabs[i].AssociatedContentId).show();
            }
            else {
                $("#" + thisMy25MyVueling.Tabs[i].Id).removeClass(thisMy25MyVueling.Tabs[i].OnActiveCssClassTab);
                $("#" + thisMy25MyVueling.Tabs[i].AssociatedContentId).hide();
            }
        }
    };

    thisMy25MyVueling.GetElementsByPage = function (page, pageNum) {

        var arraySources = new Array();
        var arrayByPage = new Array();

        var initItem = pageNum * parseInt(thisMy25MyVueling.ItemsPerPage);

        $.each(page.BonusCodeSelected, function (index, bonuscode) {
            arraySources.push.apply(arraySources, thisMy25MyVueling.GetSources(bonuscode.Code));
        });

        thisMy25MyVueling.ShortItemsArray(arraySources, page);

        for (var i = (initItem - parseInt(thisMy25MyVueling.ItemsPerPage)) ; i < initItem; i++) {
            if (arraySources[i] != undefined)
                arrayByPage.push(arraySources[i]);
        }

        return arrayByPage;
    };

    thisMy25MyVueling.GetSources = function (bonusCode) {
        var result = new Array();
        for (var i = 0; i < thisMy25MyVueling.BookingsPurchased.length; i++) {
            if (thisMy25MyVueling.BookingsPurchased[i].PromoBonoCode == bonusCode)
                result.push(thisMy25MyVueling.BookingsPurchased[i]);
        }
        return result;
    };

    thisMy25MyVueling.GetRowsHtml = function (items) {
        var generatedHtml = "";
        for (var i = 0; i < items.length; i++) {
            generatedHtml += "<tr class=" + ((i % 2) == 1 ? "greyRow" : "") + ">";
            generatedHtml += "<td class='bono-table-num-field'>" + items[i].RecordLocator + "</td>";
            generatedHtml += "<td>" + items[i].DepartureDate + " - " + items[i].ReturnDate + "</td>";
            generatedHtml += "<td>" + items[i].FlightDetails;
            generatedHtml += "</td>";
            generatedHtml += "<td class='txt_greenCell'>";
            generatedHtml += "<span class='icon-bf ico-bf-confirm_small'>" + SKYSALES.Util.convertToLocaleCurrency(items[i].Discount) + "</span>";
            generatedHtml += "</td></tr>";
        }
        return generatedHtml;
    };

    thisMy25MyVueling.ChangeButtonPage = function (selector, pageNum, nextButtonSelector) {
        $("[data-" + selector + "]").removeClass("pulsado");
        $("[data-" + selector + "='" + pageNum + "']").addClass("pulsado");
        if ($("[data-" + selector + "='" + (pageNum + 1) + "']").length != 0) {
            $("#" + nextButtonSelector).show();
        }
        else {
            $("#" + nextButtonSelector).hide();
        }
    };

    thisMy25MyVueling.PrintResult = function (html, tableId) {
        $("#" + tableId + "tr").remove();
        $("#" + tableId).html(html);
    };

    thisMy25MyVueling.RedisplayPagionation = function (pageNum) {
        var page = thisMy25MyVueling.GetPage("AllBonus");
        $("#" + page.paginationControlId + " span").remove();

        var html = "<span class='numPage'>";
        for (var i = 1; i <= pageNum; i++) {
            html += "<a href='javascript:void(0);' data-" + page.PaginatorItemsSelector + "='" + i + "'>" + i + "</a>";
        }
        html += "</span>";
        $("#" + page.paginationControlId).prepend(html);
        $("[data-" + page.PaginatorItemsSelector + "]").bind("click", { pageId: page.Id }, thisMy25MyVueling.Paginate);
    };

    // Rorder //

    thisMy25MyVueling.ShortItemsArray = function (array, page) {
        if (page.orderby == "date") {
            array.sort(function (a, b) { return thisMy25MyVueling.ArrayShortDate(a, b, page) });
        }
        else if (page.orderby == "discount") {
            array.sort(function (a, b) { return thisMy25MyVueling.ArrayShortDiscount(a, b, page); });
        }

    };

    thisMy25MyVueling.ArrayShortDate = function (firstElement, SecondElement, page) {
        var firstItemDate = new Date(firstElement.NonFormatDepartureDate);
        var secondItemDate = new Date(SecondElement.NonFormatDepartureDate);
        return page.DateOrderType == "desc" ?
        ((firstItemDate > secondItemDate) ? -1 : ((firstItemDate < secondItemDate) ? 1 :
        page.PriceOrderType == "asc" ?
        ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? 1 : 0)) :
        ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? 1 : 0)))) :
        ((firstItemDate < secondItemDate) ? -1 : ((firstItemDate > secondItemDate) ? 1 :
        page.PriceOrderType == "asc" ?
        ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? 1 : 0)) :
        ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? 1 : 0))));
    };

    thisMy25MyVueling.ArrayShortDiscount = function (firstElement, SecondElement, page) {
        var firstItemDate = new Date(firstElement.NonFormatDepartureDate);
        var secondItemDate = new Date(SecondElement.NonFormatDepartureDate);

        return page.PriceOrderType == "desc" ?
               ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? -1 : (parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? 1 :
               (page.PriceOrderType == "desc" ?
               ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? -1 : (parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount))) : 0)) :
               ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount))) ? 1 :
               (page.DateOrderType == "desc" ?
               ((firstItemDate > secondItemDate) ? -1 : ((firstItemDate) < secondItemDate)) : 0));
    };

    thisMy25MyVueling.GetPage = function (pageId) {
        var page;
        for (var i = 0; i < thisMy25MyVueling.Pages.length; i++) {
            if (thisMy25MyVueling.Pages[i].Id == pageId) {
                page = thisMy25MyVueling.Pages[i];
                break;
            }
        }
        return page;
    };

    thisMy25MyVueling.GetBonusIndex = function (array, code) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i]["Code"] == code) {
                index = i;
                break;
            }
        }
        return index;
    };

    thisMy25MyVueling.IsSelectedBonus = function (bonusCode) {
        var page = thisMy25MyVueling.GetPage("AllBonus");
        return thisMy25MyVueling.GetBonusIndex(page.BonusCodeSelected, bonusCode) != -1;
    };
    return thisMy25MyVueling;
};
