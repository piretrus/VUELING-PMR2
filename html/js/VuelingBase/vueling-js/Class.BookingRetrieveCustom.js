

VUELING.Class.BookingRetrieveCustom = function () {
    var parent = SKYSALES.Class.SkySales(),
      thisBookingRetrieve = SKYSALES.Util.extendObject(parent);

    thisBookingRetrieve.searchoOpt1 = "";
    thisBookingRetrieve.searchoOpt2 = "";
    thisBookingRetrieve.coctactEmailContainer = "";
    thisBookingRetrieve.originContainer = "";
    thisBookingRetrieve.linkButtonRetrieve = "";
    thisBookingRetrieve.origin = "";
    thisBookingRetrieve.coctactEmail = "";
    thisBookingRetrieve.confirmationNumber = "";
    thisBookingRetrieve.divDormFieldOriginInfoToolTip = '';
    thisBookingRetrieve.icoOriginInfo = '';

    thisBookingRetrieve.init = function (json) {
        this.setSettingsByObject(json);
        this.initObjects();
        this.addEvents();
    };
    thisBookingRetrieve.initObjects = function () {
        thisBookingRetrieve.DivDormFieldOriginInfoToolTip = this.getById(thisBookingRetrieve.divDormFieldOriginInfoToolTip);
        thisBookingRetrieve.IcoOriginInfo = this.getById(thisBookingRetrieve.icoOriginInfo);
        thisBookingRetrieve.SearchoOpt1 = this.getById(thisBookingRetrieve.searchoOpt1);
        thisBookingRetrieve.SearchoOpt2 = this.getById(thisBookingRetrieve.searchoOpt2);
        thisBookingRetrieve.LinkButtonRetrieve = this.getById(thisBookingRetrieve.linkButtonRetrieve);
        thisBookingRetrieve.CoctactEmailContainer = this.getById(thisBookingRetrieve.coctactEmailContainer);
        thisBookingRetrieve.OriginContainer = this.getById(thisBookingRetrieve.originContainer);
        thisBookingRetrieve.validationFilter = thisBookingRetrieve.confirmationNumber + "|" + thisBookingRetrieve.origin;

    };

    thisBookingRetrieve.addEvents = function () {
        thisBookingRetrieve.SearchoOpt1.change(thisBookingRetrieve.setSearchOptionControls);
        thisBookingRetrieve.SearchoOpt2.change(thisBookingRetrieve.setSearchOptionControls);
        thisBookingRetrieve.LinkButtonRetrieve.off("click").on("click", function () {
            var self = VUELING.Util.getObjectInstance('bookingRetrieveCustom');
            return SKYSALES.Util.validate(this, null, self.validationFilter);
        });

        thisBookingRetrieve.IcoOriginInfo.hover(
            function () {
                thisBookingRetrieve.DivDormFieldOriginInfoToolTip.show();
            },
            function () {
                thisBookingRetrieve.DivDormFieldOriginInfoToolTip.hide();
            }
        );

    };
    thisBookingRetrieve.setSearchOptionControls = function () {
        var self = VUELING.Util.getObjectInstance('bookingRetrieveCustom');
        if (self.SearchoOpt1.attr('checked')) {
            self.CoctactEmailContainer.hide();
            self.OriginContainer.show();
            self.validationFilter = self.confirmationNumber + "|" + self.origin;
        }
        if (self.SearchoOpt2.attr('checked')) {
            self.CoctactEmailContainer.show();
            self.OriginContainer.hide();
            self.validationFilter = self.confirmationNumber + "|" + self.coctactEmail;
        }
    };
    return thisBookingRetrieve;
};