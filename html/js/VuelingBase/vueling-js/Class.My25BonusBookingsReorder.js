

VUELING.Class.My25BonusBookingsReorder = function () {
    var parent = SKYSALES.Class.SkySales(),
    thisMy25BonusBookingsReorder = SKYSALES.Util.extendObject(parent);

    thisMy25BonusBookingsReorder.Flights = null;
    thisMy25BonusBookingsReorder.GridBodyId = null;
    thisMy25BonusBookingsReorder.NextPageButton = null;
    thisMy25BonusBookingsReorder.CurrentPage = 1;
    thisMy25BonusBookingsReorder.ItemsPerPage = null;

    thisMy25BonusBookingsReorder.ControlReorderByDate = null;
    thisMy25BonusBookingsReorder.ControlReorderByDiscount = null;

    thisMy25BonusBookingsReorder.init = function (json) {
        this.setSettingsByObject(json);
        this.addEvents();
    };

    thisMy25BonusBookingsReorder.addEvents = function () {
        $('[data-page]').click(thisMy25BonusBookingsReorder.PaginationByNum);
        $('#' + thisMy25BonusBookingsReorder.NextPageButton).click(thisMy25BonusBookingsReorder.PaginationBynext);
        $('#' + thisMy25BonusBookingsReorder.ControlReorderByDate).click(thisMy25BonusBookingsReorder.ShortByDate);
        $('#' + thisMy25BonusBookingsReorder.ControlReorderByDiscount).click(thisMy25BonusBookingsReorder.ShortByDiscount);
    };

    thisMy25BonusBookingsReorder.PaginationByNum = function (e) {
        thisMy25BonusBookingsReorder.CurrentPage = parseInt($(e.currentTarget).attr("data-page"));
        thisMy25BonusBookingsReorder.Paginate(thisMy25BonusBookingsReorder.CurrentPage);
    };

    thisMy25BonusBookingsReorder.PaginationBynext = function () {
        thisMy25BonusBookingsReorder.CurrentPage += 1;
        thisMy25BonusBookingsReorder.Paginate(thisMy25BonusBookingsReorder.CurrentPage);
    };

    thisMy25BonusBookingsReorder.Paginate = function (page) {
        $('[data-page]').attr("class", "");
        $("[data-page='" + page + "'").attr("class", "pulsado");
        var arrayItems = thisMy25BonusBookingsReorder.GetElementByPage(page);
        thisMy25BonusBookingsReorder.PrintRowsInGrid(arrayItems);
        thisMy25BonusBookingsReorder.ShowHideNextButton(page);
    };

    thisMy25BonusBookingsReorder.ShowHideNextButton = function (page) {
        if ($("[data-page='" + (page + 1) + "']").length != 0)
            $("#" + thisMy25BonusBookingsReorder.NextPageButton).show();
        else
            $("#" + thisMy25BonusBookingsReorder.NextPageButton).hide();
    };

    thisMy25BonusBookingsReorder.GetElementByPage = function (page) {
        var arrayByPage = new Array();

        var initItem = page * parseInt(thisMy25BonusBookingsReorder.ItemsPerPage);

        for (var i = (initItem - parseInt(thisMy25BonusBookingsReorder.ItemsPerPage)) ; i < initItem; i++) {
            if (thisMy25BonusBookingsReorder.Flights[i] != undefined)
                arrayByPage.push(thisMy25BonusBookingsReorder.Flights[i]);
        }
        return arrayByPage;
    };

    // Short By Date //
    thisMy25BonusBookingsReorder.ShortByDate = function (e) {
        var ascending = $(e.currentTarget).hasClass("icoArrowOrderUp");
        if (ascending) {
            thisMy25BonusBookingsReorder.Flights.sort(thisMy25BonusBookingsReorder.ArrayShortDateDesc);
            $(e.currentTarget).removeClass("icoArrowOrderUp").addClass("icoArrowOrderDown");
        }
        else {
            thisMy25BonusBookingsReorder.Flights.sort(thisMy25BonusBookingsReorder.ArrayShortDateAsc);
            $(e.currentTarget).removeClass("icoArrowOrderDown").addClass("icoArrowOrderUp");
        }
        thisMy25BonusBookingsReorder.CurrentPage = 1;
        thisMy25BonusBookingsReorder.Paginate(1);
    };

    thisMy25BonusBookingsReorder.ArrayShortDateDesc = function (firstElement, SecondElement) {
        var firstItemDate = new Date(firstElement.NonFormatDepartureDate);
        var secondItemDate = new Date(SecondElement.NonFormatDepartureDate);
        return ((firstItemDate > secondItemDate) ? -1 : ((firstItemDate < secondItemDate) ? 1 : 0));
    };

    thisMy25BonusBookingsReorder.ArrayShortDateAsc = function (firstElement, SecondElement) {
        var firstItemDate = new Date(firstElement.NonFormatDepartureDate);
        var secondItemDate = new Date(SecondElement.NonFormatDepartureDate);
        return ((firstItemDate < secondItemDate) ? -1 : ((firstItemDate > secondItemDate) ? 1 : 0));
    };
    // End By Date //

    // Short By Discount //
    thisMy25BonusBookingsReorder.ShortByDiscount = function (e) {
        var ascending = $(e.currentTarget).hasClass("icoArrowOrderUp");
        if (ascending) {
            thisMy25BonusBookingsReorder.Flights.sort(thisMy25BonusBookingsReorder.ArrayShortDiscountDesc);
            $(e.currentTarget).removeClass("icoArrowOrderUp").addClass("icoArrowOrderDown");
        }
        else {
            thisMy25BonusBookingsReorder.Flights.sort(thisMy25BonusBookingsReorder.ArrayShortDiscountAsc);
            $(e.currentTarget).removeClass("icoArrowOrderDown").addClass("icoArrowOrderUp");
        }
        thisMy25BonusBookingsReorder.CurrentPage = 1;
        thisMy25BonusBookingsReorder.Paginate(1);
    };

    thisMy25BonusBookingsReorder.ArrayShortDiscountDesc = function (firstElement, SecondElement) {
        return ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? 1 : 0));
    };

    thisMy25BonusBookingsReorder.ArrayShortDiscountAsc = function (firstElement, SecondElement) {
        return ((parseFloat(firstElement.Discount) < parseFloat(SecondElement.Discount)) ? -1 : ((parseFloat(firstElement.Discount) > parseFloat(SecondElement.Discount)) ? 1 : 0));
    };
    // End By Discount //
    thisMy25BonusBookingsReorder.PrintRowsInGrid = function (arrayItems) {
        $("#" + thisMy25BonusBookingsReorder.GridBodyId + "tr").remove();
        var html = "";
        for (var i in arrayItems) {
            html += thisMy25BonusBookingsReorder.GetRowHtml(arrayItems[i], (parseInt(i) % 2) == 1);
        }
        $("#" + thisMy25BonusBookingsReorder.GridBodyId).html(html);
    };

    thisMy25BonusBookingsReorder.GetRowHtml = function (item, isGreyRow) {
        var htmlItem = "<tr class='" + (isGreyRow ? "greyRow" : "") + "'>"
        + "<td class='bono-table-num-field'>" + item.RecordLocator + "</td>"
        + "<td>" + item.DepartureDate + " - " + item.ReturnDate + "</td>"
        + "<td>" + item.FlightDetails + "</td>"
        + "<td class='txt_greenCell'>" + SKYSALES.Util.convertToLocaleCurrency(item.Discount) + "</td>"
        + "</tr>";
        return htmlItem;
    };

    return thisMy25BonusBookingsReorder;
};