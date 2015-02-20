

VUELING.Class.CarTrawlerItinerary = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCarTrawler = SKYSALES.Util.extendObject(parent);
    resource = SKYSALES.Util.getResource();

    thisCarTrawler.endPoint = null;;
    thisCarTrawler.requestReturnBooking = null;
    thisCarTrawler.requestFleet = null;
    thisCarTrawler.returnBookingRequestType = null;
    thisCarTrawler.fleetRequestType = null;
    thisCarTrawler.modelCar = null;
    thisCarTrawler.requestTimeout = null;
    thisCarTrawler.infoBookingCar = null;
    thisCarTrawler.bookingConfirmed = false;
    thisCarTrawler.getBookingRetries = 0;
    thisCarTrawler.copies = null;
    thisCarTrawler.retries = 0;
    thisCarTrawler.timeout = null;
    thisCarTrawler.culture = null;
    thisCarTrawler.urlProxyCarTrawler = null;
    thisCarTrawler.codetablesRequestType = null;
    thisCarTrawler.otacodetables = null;
    thisCarTrawler.failLink = null;

    thisCarTrawler.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        $(document).ready(function () {
            thisCarTrawler.setDatePicker();
            if (thisCarTrawler.infoBookingCar == '')
                thisCarTrawler.setCodetables();
            thisCarTrawler.GetBooking();
        });
    };

    thisCarTrawler.setDatePicker = function (){
        $.datepicker.regional['vy'] = {
            closeText: resource.datePickerInfo.closeText,
            prevText: resource.datePickerInfo.prevText,
            nextText: resource.datePickerInfo.nextText,
            currentText: resource.datePickerInfo.currentText,
            monthNames: resource.dateCultureInfo.monthNames,
            monthNamesShort: resource.dateCultureInfo.monthNamesShort,
            dayNames: resource.dateCultureInfo.dayNames,
            dayNamesShort: resource.dateCultureInfo.dayNamesShort,
            dayNamesMin: resource.dateCultureInfo.dayNamesMin,
            dateFormat: resource.datePickerInfo.datePickerFormat
        };
        $.datepicker.setDefaults($.datepicker.regional['vy']);
    };

    thisCarTrawler.retry = function () {
        if (thisCarTrawler.getBookingRetries < 3) {
            thisCarTrawler.getBookingRetries++;
            thisCarTrawler.bookingConfirmed = false;
            thisCarTrawler.GetBooking();
        }
    };

    thisCarTrawler.GetBooking = function () {

        $.ajax({
            url: thisCarTrawler.endPoint + thisCarTrawler.returnBookingRequestType,
            data: { "msg": JSON.stringify(thisCarTrawler.requestReturnBooking) },
            type: "GET",
            jsonpCallback: "callback",
            contentType: "application/javascript",
            dataType: "jsonp",
            timeout: thisCarTrawler.requestTimeout,
            error: function () {
                thisCarTrawler.retry();
                if (!thisCarTrawler.bookingConfirmed) {
                    $('#msgCartralwer').html(thisCarTrawler.copies.msgErrorNoBooking + "<br /> " + thisCarTrawler.copies.msgErrorNoBooking2 + "<br />" + "<a href=" + thisCarTrawler.failLink + "  " + " target='_blank' >" + thisCarTrawler.copies.msgErrorSearchLink + "</>");
                    $('#carsDeclined').show();
                    $('#carsConfirmation').hide();
                }
            },
            success: function (data) {

                if (data != null && data[0].Success) {

                    var vehRetResRSCore = data[0].VehRetResRSCore;

                    if (vehRetResRSCore.VehReservation["@Status"] == "Confirmed") {

                        thisCarTrawler.getBookingRetries = 0;
                        thisCarTrawler.bookingConfirmed = true;

                        var datePickup = new Date(vehRetResRSCore.VehReservation.VehSegmentCore.VehRentalCore["@PickUpDateTime"])
                        var dateReturn = new Date(vehRetResRSCore.VehReservation.VehSegmentCore.VehRentalCore["@ReturnDateTime"])
                        var formattedDatePickup = $.datepicker.formatDate("dd MM yy", datePickup);
                        var formattedDateReturn = $.datepicker.formatDate("dd MM yy", dateReturn);

                        var timePickup = vehRetResRSCore.VehReservation.VehSegmentCore.VehRentalCore["@PickUpDateTime"].split("T")[1].substring(0, 5);
                        var timeReturn = vehRetResRSCore.VehReservation.VehSegmentCore.VehRentalCore["@ReturnDateTime"].split("T")[1].substring(0, 5);

                        var days = Math.ceil(((dateReturn - datePickup) / (1000 * 60 * 60 * 24)));

                        $('#imgLogoEmpresa').attr('src', vehRetResRSCore.VehReservation.VehSegmentCore.TPA_Extensions.VendorPictureURL);
                        $('#imgLogoEmpresa').attr('alt', vehRetResRSCore.VehReservation.VehSegmentCore.Vendor["@CompanyShortName"]);

                        $('#pickupLocation').text(vehRetResRSCore.VehReservation.VehSegmentCore.VehRentalCore.PickUpLocation["@Name"]);
                        $('#pickupDate').text(formattedDatePickup + " (" + timePickup + ")");
                        $('#returnLocation').text(vehRetResRSCore.VehReservation.VehSegmentCore.VehRentalCore.ReturnLocation["@Name"]);
                        $('#returnDate').text(formattedDateReturn + " (" + timeReturn + ")");

                        var totalPrice = vehRetResRSCore.VehReservation.VehSegmentCore.TPA_Extensions.Insurance.RentalInfo["@Cost"];
                        var priceperDay = parseFloat(Math.round((totalPrice / days) * 100) / 100).toFixed(2);

                        $('#priceTotalCar').text(SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(totalPrice));
                        $('#priceDayCar').text(SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(priceperDay));

                        if (thisCarTrawler.infoBookingCar != '') {
                            $('#imgLogoCar').attr('src', thisCarTrawler.infoBookingCar.urlImage);
                            $('#descriptionCar').text(thisCarTrawler.infoBookingCar.description);
                        }
                        else
                        {
                            thisCarTrawler.modelCar = vehRetResRSCore.VehReservation.VehSegmentCore.Vehicle.VehMakeModel["@Code"];
                            thisCarTrawler.FleetCar();
                        }

                       $('#imgLogoCar').attr('alt', vehRetResRSCore.VehReservation.VehSegmentCore.Vehicle.VehMakeModel["@Name"]);
                       $('#modelCar').text(vehRetResRSCore.VehReservation.VehSegmentCore.Vehicle.VehMakeModel["@Name"]);
                    }
                    else
                    {
                        thisCarTrawler.retry();
                    }
                }
                else {
                    thisCarTrawler.retry();
                }

                if (!thisCarTrawler.bookingConfirmed) {
                    if (data[0].Errors) {
                        var errors = data[0].Errors;
                        var msg = "";

                        $.each(errors, function (indexParent, error) {
                            switch (error.Type) {
                                case 280:
                                    $('#msgCartralwer').html(thisCarTrawler.copies.msgErrorUnavailableCars + "<br /> " + thisCarTrawler.copies.msgErrorNoBooking2 + "<br />" + "<a href=" + thisCarTrawler.failLink + "  " + "  target='_blank' >" + thisCarTrawler.copies.msgErrorSearchLink + "</>");
                                    break;
                                default:
                                    $('#msgCartralwer').html(thisCarTrawler.copies.msgErrorNoBooking + "<br /> " + thisCarTrawler.copies.msgErrorNoBooking2 + "<br />" + "<a href=" + thisCarTrawler.failLink + "  " + "  target='_blank' >" + thisCarTrawler.copies.msgErrorSearchLink + "</>");
                            }
                        });
                    }
                    else {
                        $('#msgCartralwer').html(thisCarTrawler.copies.msgErrorNoBooking + "<br /> " + thisCarTrawler.copies.msgErrorNoBooking2 + "<br />" + "<a href=" + thisCarTrawler.failLink + "  " + "  target='_blank'>" + thisCarTrawler.copies.msgErrorSearchLink + "</>");
                    }
                    $('#carsConfirmation').hide();
                    $('#carsDeclined').show();
                }
                else {
                    $('#carsDeclined').hide();
                    $('#carsConfirmation').show();
                }
            }
        });

    };

    thisCarTrawler.FleetCar = function () {

        thisCarTrawler.requestFleet.FleetGroup["@Code"] = thisCarTrawler.modelCar;

        $.ajax({
            url: thisCarTrawler.endPoint + thisCarTrawler.fleetRequestType,
            data: { "msg": JSON.stringify(thisCarTrawler.requestFleet) },
            type: "GET",
            jsonpCallback: "callback",
            contentType: "application/javascript",
            dataType: "jsonp",
            timeout: thisCarTrawler.requestTimeout,
            error: function () {

            },
            success: function (data) {
                if (data != null && data[0].Success) {

                    var fleet = data[0].Fleet;

                    $('#imgLogoCar').attr('src', fleet.FleetGroup.Vehicle.PictureURL);
                    var size = thisCarTrawler.getSizeCar(fleet.FleetGroup.Vehicle.VehClass["@Size"]);
                    $('#descriptionCar').text(size + " " + fleet.FleetGroup.Vehicle["@PassengerQuantity"] + thisCarTrawler.copies.passengers + "," + fleet.FleetGroup.Vehicle["@TransmissionType"])
                }

            }
        });

    };

    thisCarTrawler.increaseRetries = function () {
        thisCarTrawler.retries++;
    }

    thisCarTrawler.getSizeCar = function (numsize) {
        var result = "";

        while (thisCarTrawler.otacodetables == null && thisCarTrawler.retries < 5) {
            clearTimeout(thisCarTrawler.timeout);
            thisCarTrawler.timeout = setTimeout(thisCarTrawler.increaseRetries, 200);
        }

        thisCarTrawler.retries = 0;
        if (thisCarTrawler.otacodetables != null) {
            $.each(thisCarTrawler.otacodetables, function (i, size) {
                if (size.value == numsize.toString())
                    result = size.label;
            });
        }

        return result;
    };

    thisCarTrawler.setCodetables = function () {

        var url = thisCarTrawler.urlProxyCarTrawler + thisCarTrawler.codetablesRequestType + thisCarTrawler.culture + "&callback=?";

        $.getJSON(url, function (data) {
            thisCarTrawler.otacodetables = data;
        });
    };

    return thisCarTrawler;

};