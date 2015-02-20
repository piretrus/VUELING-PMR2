

VUELING.Class.SeatMapExpressWithOutMap = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisSeatMapExpress = SKYSALES.Util.extendObject(parent);

    thisSeatMapExpress.seatArrowUpLinkId = '';
    thisSeatMapExpress.seatArrowUpLink = null;
    thisSeatMapExpress.seatArrowDownLinkId = '';
    thisSeatMapExpress.seatArrowDownLink = null;
    thisSeatMapExpress.showSeatRow = 3;
    thisSeatMapExpress.seatRowPrefijo = '';
    thisSeatMapExpress.positionSeatRow = 0;
    thisSeatMapExpress.seatRowCount = 0;
    thisSeatMapExpress.topScrollCss = '';

    thisSeatMapExpress.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisSeatMapExpress.setVars = function () {
        parent.setVars.call(this);

        this.seatArrowUpLink = this.getById(this.seatArrowUpLinkId);
        this.seatArrowDownLink = this.getById(this.seatArrowDownLinkId);

        this.positionSeatRow += this.showSeatRow - 1;

        //thisSeatMapExpress.SeatArrowDownLink_OnClick();
        //thisSeatMapExpress.SeatArrowUpLink_OnClick();
    };



    thisSeatMapExpress.addEvents = function () {
        parent.addEvents.call(this);
        thisSeatMapExpress.seatArrowUpLink.click(function (event) { thisSeatMapExpress.SeatArrowUpLink_OnClick(event) });
        thisSeatMapExpress.seatArrowDownLink.click(function (event) { thisSeatMapExpress.SeatArrowDownLink_OnClick(event) });
    };

    thisSeatMapExpress.SeatArrowUpLink_OnClick = function (event) {
        if (this.positionSeatRow - (this.showSeatRow - 1) > 0) {
            $('[id^=' + this.seatRowPrefijo + ']').hide();

            var rest = 0;
            if ((this.positionSeatRow == this.seatRowCount - 1) && (this.seatRowCount % this.showSeatRow > 0))
                rest = this.seatRowCount % this.showSeatRow;
            else
                rest = this.showSeatRow;

            this.positionSeatRow = this.positionSeatRow - rest;

            for (var i = this.positionSeatRow; i >= this.positionSeatRow - (this.showSeatRow - 1) ; i--) {
                $("#" + this.seatRowPrefijo + i).show();
            };

            this.seatArrowDownLink.removeClass(this.topScrollCss);
            if (this.positionSeatRow - (this.showSeatRow - 1) == 0) {
                this.seatArrowUpLink.addClass(this.topScrollCss);
            }
        }
    };

    thisSeatMapExpress.SeatArrowDownLink_OnClick = function (event) {
        if (this.positionSeatRow < this.seatRowCount - 1) {
            $('[id^=' + this.seatRowPrefijo + ']').hide();

            for (var i = 1; i <= this.showSeatRow; i++) {
                if (this.positionSeatRow + 1 < this.seatRowCount) {
                    this.positionSeatRow++;
                    $("#" + this.seatRowPrefijo + this.positionSeatRow).show();
                }
            };

            this.seatArrowUpLink.removeClass(this.topScrollCss);
            if (this.positionSeatRow == this.seatRowCount - 1) {
                this.seatArrowDownLink.addClass(this.topScrollCss);
            }
        }
    };

    return thisSeatMapExpress;
};