

VUELING.Class.CarTrawler = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCarTrawler = SKYSALES.Util.extendObject(parent);
        resource = SKYSALES.Util.getResource();
        

    thisCarTrawler.requestAvailability = null;
    thisCarTrawler.requestPreBooking = null;
    thisCarTrawler.endPoint = null;
    thisCarTrawler.secureEndPoint = null;
    thisCarTrawler.availabilityRequestType = null;
    thisCarTrawler.preBookingRequestType = null;
    thisCarTrawler.responseAvailability = null;
    thisCarTrawler.responsePrebooking = null;
    thisCarTrawler.Reference = [];
    thisCarTrawler.TotalPrices = [];
    thisCarTrawler.SideBarObj = null;
    thisCarTrawler.requestConditions = null;
    thisCarTrawler.infoPreBookingCar = null;
    thisCarTrawler.idSelectedCar = null;
    thisCarTrawler.culture = null;
    thisCarTrawler.urlProxyCarTrawler = null;
    thisCarTrawler.locationRequestType = null;
    thisCarTrawler.codetablesRequestType = null;
    thisCarTrawler.locations = null;
    thisCarTrawler.otacodetables = null;
    thisCarTrawler.staticUrl = null;
    thisCarTrawler.intervalMinutes = null;
    thisCarTrawler.locationCode = null;
    thisCarTrawler.requestTimeout = null;
    thisCarTrawler.copies = null;
    thisCarTrawler.retries = 0;
    thisCarTrawler.timeout = null;
    thisCarTrawler.vendorModel = null;
    thisCarTrawler.cartrawlerCultureRequestType = null;

    thisCarTrawler.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();

        $(document).ready(function () {
            thisCarTrawler.initCulture();
        });
    };

    thisCarTrawler.setVars = function () {
        parent.setVars.call(this);
        thisCarTrawler.SideBarObj = VUELING.Util.getObjectInstance("SBSidebar");
    }

    thisCarTrawler.addEvents = function () {
        $("#btnloadUpdatePanel").click(thisCarTrawler.loadUpdateSearchPanel);
        $("#btnUpdateAvailability").click(thisCarTrawler.UpdateAvailability);
        $("#btnCanceUpdate").click(thisCarTrawler.CancelUpdate);
    };

    thisCarTrawler.initCulture = function ()
    {
        var url = thisCarTrawler.urlProxyCarTrawler + thisCarTrawler.cartrawlerCultureRequestType + thisCarTrawler.culture + "&callback=?";

        $.getJSON(url, function (data) {
            thisCarTrawler.requestAvailability["@PrimaryLangID"] = data;
            thisCarTrawler.requestPreBooking["@PrimaryLangID"] = data;

            thisCarTrawler.initSearcher();
            thisCarTrawler.RequestAvailability(false);
        });

    };

    thisCarTrawler.initSearcher = function ()
    {

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

        var vehRentalCore = thisCarTrawler.requestPreBooking.VehResRQCore.VehRentalCore;

        if (vehRentalCore != null) {

            thisCarTrawler.setCodetables();
            thisCarTrawler.setLocations();

            var timePickup = vehRentalCore["@PickUpDateTime"].split("T")[1].substring(0, 5);
            var timeReturn = vehRentalCore["@ReturnDateTime"].split("T")[1].substring(0, 5);

            thisCarTrawler.setAvailabilityHours(timePickup, timeReturn);

            var datePickup = $.datepicker.formatDate("DD, dd MM", new Date(vehRentalCore["@PickUpDateTime"]));
            var dateReturn = $.datepicker.formatDate("DD, dd MM", new Date(vehRentalCore["@ReturnDateTime"]));

            $('#dtPickup').datepicker({ dateFormat: "yy-mm-dd", defaultDate: new Date(vehRentalCore["@PickUpDateTime"]), minDate: new Date(vehRentalCore["@PickUpDateTime"]), onSelect: thisCarTrawler.UpdateAvailability }, $.datepicker.regional['vy']).data('pickup', vehRentalCore["@PickUpDateTime"]);
            $('#dtReturn').datepicker({ dateFormat: "yy-mm-dd", defaultDate: new Date(vehRentalCore["@ReturnDateTime"]), minDate: new Date(vehRentalCore["@PickUpDateTime"]), onSelect: thisCarTrawler.UpdateAvailability }, $.datepicker.regional['vy']).data('return', vehRentalCore["@ReturnDateTime"]);


            $('#dtPickup').datepicker('setDate', new Date(vehRentalCore["@PickUpDateTime"]));
            $('#dtReturn').datepicker('setDate', new Date(vehRentalCore["@ReturnDateTime"]));

            $("#imgDPickerPickup").on('click', function() {
                $("#dtPickup").datepicker('show');
            });

            $("#imgDPickerReturn").on('click', function() {
                $("#dtReturn").datepicker('show');
            });

            $('#txtDatePickup').val(datePickup);
            $('#txtDateReturn').val(dateReturn);

            $('#pickupLocation').data('iata', vehRentalCore.PickUpLocation["@LocationCode"]);
            $('#returnLocation').data('iata', vehRentalCore.PickUpLocation["@LocationCode"]);

            $.each(resource.stationInfo.StationList, function (i, station) {
                if (station.code == thisCarTrawler.locationCode)
                {
                    $('#carsCarrouselTitle').text(station.name);
                    $('#carsSearcherTitle').text(station.name);
                    $('#carsConfirmTitle').text(station.name);
                }
            });
        }


        $("#pickupLocation").keydown(function (e) {
            var keyCode = e.keyCode ? e.keyCode : e.which;
            if (keyCode === 13) {
                e.stopPropagation();
                return false;
            }
        });

        $("#returnLocation").keydown(function (e) {
            var keyCode = e.keyCode ? e.keyCode : e.which;
            if (keyCode === 13) {
                e.stopPropagation();
                return false;
            }
        });

        $("#pickupLocation").off("keydown");
        $("#returnLocation").off("keydown");

    };

    thisCarTrawler.RequestAvailability = function(update)
    {
        $.ajax({
            url: thisCarTrawler.endPoint + thisCarTrawler.availabilityRequestType,
            data: { "msg": JSON.stringify(thisCarTrawler.requestAvailability) },
            type: "GET",
            jsonpCallback: "callback",
            contentType: "application/javascript",
            dataType: "jsonp",
            timeout: thisCarTrawler.requestTimeout,
            error: function (x, t, m) {
                if(update)
                {
                    alert(thisCarTrawler.copies.msgErrorLocation);
                    thisCarTrawler.setDefaultValues();
                    $('#divLoading').hide();
                    $('#divOverlay').hide();
                }
            },
            success: function (data) {
                if (data != null){
                    if(data[0].Success) {
                        thisCarTrawler.responseAvailability = data[0].VehAvailRSCore;
                        var vehAvailRSCore = thisCarTrawler.responseAvailability;
                        if (vehAvailRSCore != null) {
                            thisCarTrawler.RenderTemplates(vehAvailRSCore, update);
                        }
                    }
                    else if(data[0].Errors && update)
                    {
                        var errors = data[0].Errors;
                        var msg = "";

                        $.each(errors, function (indexParent, error) {
                            switch(error.Type) {
                                case 227:
                                    msg += thisCarTrawler.copies.msgWarnSearch;
                                    break;
                                case 10003:
                                    msg += thisCarTrawler.copies.msgWarnSearch;
                                    break;
                                case 10004:
                                    msg += thisCarTrawler.copies.msgErrorLocation;
                                    thisCarTrawler.setDefaultValues();
                                    break;
                                case 10035:
                                    msg += thisCarTrawler.copies.msgWarnSearch;
                                    break;
                                default:
                                    msg += thisCarTrawler.copies.msgErrorLocation;
                                    thisCarTrawler.setDefaultValues();
                            }
                        });

                        alert(msg);
                        $('#divLoading').hide();
                        $('#divOverlay').hide();
                    }
                }
            }
        });
    };

    thisCarTrawler.RenderTemplates = function (vehAvailRSCore,update)
    {
        $('#multiCarrousel').empty().unslick();
        $('#singleCarrousel').empty().unslick();
        $('#multiCarrousel').data('initialized', false);
        $('#singleCarrousel').data('initialized', false);

        var vehVendorAvails = vehAvailRSCore.VehVendorAvails;

        if (!(vehVendorAvails instanceof Array)) { vehVendorAvails = [vehAvailRSCore.VehVendorAvails.VehVendorAvail]; };
       
        $.each(vehVendorAvails, function (indexParent, vendor) {
            var vehAvails = vendor.VehAvails;
            if (!(vendor.VehAvails instanceof Array)) { vehAvails = [vendor.VehAvails]; };
            $.each(vehAvails, function (index, veh) {
                var id = new JSBaseType.String("{0}_{1}").format(indexParent, index);
                $('#multiCarrousel').append(thisCarTrawler.getCarMultipleTemplate(id, veh, vendor.Vendor, vendor.Info));
                $("#linkCar_" + id).click(thisCarTrawler.showCarsSearcher);
                $('#singleCarrousel').append(thisCarTrawler.getCarSingleTemplate(id, veh, vendor.Vendor, vendor.Info));
                thisCarTrawler.Reference[id] = veh.VehAvailCore.Reference;
                thisCarTrawler.TotalPrices[id] = veh.VehAvailCore.TotalCharge["@RateTotalAmount"];
                $('#booking_' + id).click(thisCarTrawler.PreBooking);
            });
        });

        // Ordenar los DIVs de los coches según el valor del OrberBy indicado por CarTrawler
        var $multiCarrousel = $('#multiCarrousel'),
	        $multiCarrouselLi = $multiCarrousel.children('li');
        $multiCarrouselLi.sort(function (a, b) {
            var an = parseInt(a.getAttribute('orderby')),
                bn = parseInt(b.getAttribute('orderby'));
            if (an > bn) { return -1; }
            if (an < bn) { return 1; }
            return 0;
        });
        $multiCarrouselLi.detach().appendTo($multiCarrousel);

        var $singleCarrousel = $('#singleCarrousel'),
	        $singleCarrouselLi = $singleCarrousel.children('li');
        $singleCarrouselLi.sort(function (a, b) {
            var an = parseInt(a.getAttribute('orderby')),
                bn = parseInt(b.getAttribute('orderby'));
            if (an > bn) { return -1; }
            if (an < bn) { return 1; }
            return 0;
        });
        $singleCarrouselLi.detach().appendTo($singleCarrousel);
        

        if (!update) {
            thisCarTrawler.showCarrousel();
            var locationPickup =  thisCarTrawler.responseAvailability.VehRentalCore.PickUpLocation["@Name"];
            var locationReturn =  thisCarTrawler.responseAvailability.VehRentalCore.ReturnLocation["@Name"];
            $("#pickupLocation").val(locationPickup);
            $("#returnLocation").val(locationReturn);
        }
        else
        {
            thisCarTrawler.showUpdateCars();
            $('#divLoading').hide();
            $('#divOverlay').hide();
        }
    };

    thisCarTrawler.setDefaultValues = function ()
    {
        if ($('#returnLocation').data('iataOld') != null){
            var location = $.grep(thisCarTrawler.locations, function (e) { return e.value == $('#returnLocation').data('iataOld'); });
            $("#returnLocation").val(location[0].label);
        }
        if ($('#pickupLocation').data('iataOld') != null) {
            var location = $.grep(thisCarTrawler.locations, function (e) { return e.value == $('#pickupLocation').data('iataOld'); });
            $("#pickupLocation").val(location[0].label);
        }
    };

    thisCarTrawler.showCarrousel = function () {

        $('#carsCarrousel').show();

        var slickContainer = $('#multiCarrousel');
        slickContainer.slick({
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            rtl: true,
            draggable:false,
            slide: 'li',
            speed: 0,
            variableWidth: true,
            onAfterChange: function () {
                var initialized = $('#multiCarrousel').data('initialized');
                if (!initialized) {
                    $('#multiCarrousel').data('initialized', true);
                    this.options.speed = this.defaults.speed;
                    if (thisCarTrawler.requestPreBooking.IdCarSelected != null && thisCarTrawler.requestPreBooking.IdCarSelected != "")
                    {
                        thisCarTrawler.idSelectedCar = thisCarTrawler.requestPreBooking.IdCarSelected;
                        thisCarTrawler.showConfirmationBox();
                        $('#carsCarrousel').hide();
                    }
                    $('#carsCarrouselOpacityController').css('opacity', 1);
                }
            }
        });

        slickContainer.getSlick().oldGetLeft = slickContainer.getSlick().getLeft;
        slickContainer.getSlick().getLeft = function (position) {
            return this.oldGetLeft(position) - 14;
        }

        slickContainer.slickGoTo(2);
    };

    thisCarTrawler.showCarsSearcher = function () {
        var isInitialized = $('#singleCarrousel').data('initialized');

        if (isInitialized && $('#singleCarrousel').slickGetOption('speed') !== 0) {
            $('#singleCarrousel').slickSetOption('speed', 0, true);
        }

        if ($(this).attr("vehid") != undefined)
            thisCarTrawler.idSelectedCar = $(this).attr("vehid");

        var indexCar = parseInt($('li[vehid=' + thisCarTrawler.idSelectedCar + ']').attr("index"));
        thisCarTrawler.vendorModel = $('li[vehid=' + thisCarTrawler.idSelectedCar + ']').attr("vendormodel");

        $('#carsCarrousel').hide();
        $('#carsSearcher').show();

        if (!isInitialized) {
            $('#carsSearcher').css('opacity', 0);
            $('#singleCarrousel').slick({
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                rtl: true,
                draggable:false,
                slide: 'li',
                speed: 0,
                variableWidth: true,
                onAfterChange: function () {
                    var initialized = $('#singleCarrousel').data('initialized');
                    if (!initialized) {
                        $('#singleCarrousel').data('initialized', true);
                        $('#singleCarrousel>.slick-prev').on('click', thisCarTrawler.UpdateSelecteCar);
                        $('#singleCarrousel>.slick-next').on('click', thisCarTrawler.UpdateSelecteCar);
                        $('#carsSearcher').css('opacity', 1);
                    }

                    this.options.speed = this.defaults.speed;
                }
            });
        }
        
        $('#singleCarrousel').slickGoTo(parseInt($('#singleCarrousel>div>div').children('li').length) - 3 - indexCar);
    };

    thisCarTrawler.getCarMultipleTemplate = function (id, veh, vendor, info) {

        var visibleLayer = new JSBaseType.String('<div id="containerVendor_{0}" class="carsSectionSliderContent"> <div class="sectionPiece"><div class="carsSectionSliderContent_logo"><img src="{1}" alt="{2}" width="88" height="35"></div><div class="carsSectionSliderContent_wrapperLegend">{3}</div><div class="carsSectionSliderContent_car"><img src="{4}" alt="{5}" width="132" height="71"></div><div class="carsSectionSliderContent_description">{6}/ {7}, {8}</div><div class="carsSectionSliderContent_model"><strong>{5}</strong></div><div class="carsSectionSliderContent_price"><span class="carsSectionSliderContent_priceNum">{9}€</span><span>/ {10}</span></div><div class="carsSectionSliderContent_callAction"><div class="wrap_btSmall_plus"><a id="linkCar_{0}" vehid="{0}" href="javascript:;" class="boton_vp bt_yellow btSmall"><span class="bt_link">{11}</span></a></div></div></div></div>');

        var totalCharge = veh.VehAvailCore.TotalCharge["@RateTotalAmount"];
        var totalChargeFormatted = SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(totalCharge);

        var days = veh.VehAvailCore.TPA_Extensions.Duration["@Days"];

        var sizeCar = thisCarTrawler.getSizeCar(veh.VehAvailCore.Vehicle.VehClass["@Size"]);

        var dailyCharge = parseFloat(Math.round((totalCharge / days) * 100) / 100).toFixed(2);
        var dailyChargeFormatted = SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(dailyCharge);

        var freeAditionalDriver = thisCarTrawler.isfreeDriver(veh.VehAvailCore.TPA_Extensions.SpecialOffers) ? '<div class="carsSectionSliderContent_legend"><span>' + thisCarTrawler.copies.freeDriver + '</span></div>' : "";
        
        var labelPassengers = veh.VehAvailCore.Vehicle["@PassengerQuantity"] + " " + thisCarTrawler.copies.passengers;

        var vendorPictureURL = info.TPA_Extensions.VendorPictureURL["#text"];
        var vendorPictureURL_Chromed = vendorPictureURL.replace("/vendor/", "/vendor/chrome/");

        var templateVisibleLayer = visibleLayer.format
            (id,
            vendorPictureURL_Chromed,
            vendor["@CompanyShortName"],
            freeAditionalDriver,
            veh.VehAvailCore.Vehicle.PictureURL,
            veh.VehAvailCore.Vehicle.VehMakeModel["@Name"],
            sizeCar,
            labelPassengers,
            veh.VehAvailCore.Vehicle["@TransmissionType"],
            dailyChargeFormatted,
            thisCarTrawler.copies.priceDay,
            thisCarTrawler.copies.addCar);

        var vendorModel = veh.VehAvailCore.Vehicle.VehMakeModel["@Name"] + "_" + vendor["@Code"];

        var template = new JSBaseType.String('<li dir="ltr" vehid="{0}" vendormodel="{1}" orderby="{3}" class="liSlider">{2}</li>');

        var formmatedTemplate = template.format(id, vendorModel, templateVisibleLayer, veh.VehAvailCore.TPA_Extensions.OrderBy["@Index"]);

        return formmatedTemplate;
    };

    thisCarTrawler.getCarSingleTemplate = function (id, veh, vendor, info) {

        var visibleLayer = new JSBaseType.String('<div class="carsSectionSliderContent"><div class="colRow2 gutterDottedLine gutterDottedLine--15 sectionTable"><div class="column_9 sectionTable_cell sectionTable_cell--top"><div class="colRow3"><div class="column_4"><div class="carsSectionSliderContent_logo"><img src="{1}" alt="{2}" width="132" height="71" /></div><div class="carsSectionSliderContent_car"><img src="{3}" alt="{4}" width="132" height="71" /></div></div><div class="column_8">{5}<div class="carsSectionSliderContent_description">{6}/ {7}, {8}</div><div class="carsSectionSliderContent_model"><strong>{4}</strong></div><ul class="carsSectionItemsList"><li><span class="itemsList_icon"><img src="{16}skysales/images/VuelingBase/cars/itemList_icons_r1_c1.png" height="20" width="19" /></span><span class="itemsList_iconLabel">{9}</span></li><li><span class="itemsList_icon"><img src="{16}skysales/images/VuelingBase/cars/itemList_icons_r1_c3.png" height="20" width="19" /></span><span class="itemsList_iconLabel">{10}</span></li><li><span class="itemsList_icon"><img src="{16}skysales/images/VuelingBase/cars/itemList_icons_r1_c5.png" height="20" width="19" /></span><span class="itemsList_iconLabel">{11}</span></li><li><span class="itemsList_icon"><img src="{16}skysales/images/VuelingBase/cars/itemList_icons_r1_c7.png" height="20" width="19" /></span><span class="itemsList_iconLabel">{12}</span></li>{13}</ul></div></div></div><div class="column_3 sectionTable_cell sectionTable_cell--top carsSectionSliderContent_colPrice"><div class="carsSectionSliderContent_subprice"><span>{14}<i>€</i></span> / {17}</div><div class="carsSectionSliderContent_price">{18} <span>{15}<i>€</i></span></div><div class="carsSectionSliderContent_callAction"><div class="wrap_btSmall_plus"><a href="javascript:;" id="booking_{0}" vehid="{0}" class="boton_vp bt_yellow btSmall"><span class="bt_link">{19}</span></a></div></div></div></div></div>');

        var totalCharge = veh.VehAvailCore.TotalCharge["@RateTotalAmount"];
        var totalChargeFormatted = SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(totalCharge);

        var days = veh.VehAvailCore.TPA_Extensions.Duration["@Days"];

        var dailyCharge = parseFloat(Math.round((totalCharge / days) * 100) / 100).toFixed(2);
        var dailyChargeFormatted = SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(dailyCharge);

        var freeAditionalDriver = thisCarTrawler.isfreeDriver(veh.VehAvailCore.TPA_Extensions.SpecialOffers) ? '<div class="carsSectionSliderContent_legend"><span>' + thisCarTrawler.copies.freeDriver + '</span></div>' : "";
        
        var sizeCar = thisCarTrawler.getSizeCar(veh.VehAvailCore.Vehicle.VehClass["@Size"]);

        var labelPassengers = veh.VehAvailCore.Vehicle["@PassengerQuantity"] + " " + thisCarTrawler.copies.passengers;

        var transmissionTypeShort = thisCarTrawler.getTransmisionTypeShort(veh.VehAvailCore.Vehicle["@TransmissionType"]);
       
        var vendorModel = veh.VehAvailCore.Vehicle.VehMakeModel["@Name"] + "_" + vendor["@Code"];

        var aircondition = veh.VehAvailCore.Vehicle["@AirConditionInd"].toString() === "true" ? '<li vendormodel=' + vendorModel + '><span class="itemsList_icon"><img src="' + thisCarTrawler.staticUrl + 'skysales/images/VuelingBase/cars/itemList_icons_r1_c9.png" height="20" width="19" /></span><span class="itemsList_iconLabel">AC</span></li>' : "";

        var vendorPictureURL = info.TPA_Extensions.VendorPictureURL["#text"];
        var vendorPictureURL_Chromed = vendorPictureURL.replace("/vendor/", "/vendor/chrome/");

        /*
         Template(
         #identificador
         #imagenproveedor
         #nombreproveedor
         #imagencoche
         #modelocoche
	     #conductoradicional
         #tamañocoche
         #cantidadpasajeros
         #tranmisioncoche
	     #modelocoche
         #cantidadpasajeros
         #cantidadmaletas
         #cantidadpuertas
         #tranmisioncoche
         #aireacondicionado
         #costepordia
         #costetotal
         #urlstatic)
        */
        var templateVisibleLayer = visibleLayer.format
            (id,
            vendorPictureURL_Chromed,
            vendor["@CompanyShortName"],
            veh.VehAvailCore.Vehicle.PictureURL,
            veh.VehAvailCore.Vehicle.VehMakeModel["@Name"],
            freeAditionalDriver,
            sizeCar,
            labelPassengers,
            veh.VehAvailCore.Vehicle["@TransmissionType"],
            veh.VehAvailCore.Vehicle["@PassengerQuantity"],
            veh.VehAvailCore.Vehicle["@BaggageQuantity"],
            veh.VehAvailCore.Vehicle.VehType["@DoorCount"],
            transmissionTypeShort,
            aircondition,
            dailyChargeFormatted,
            totalChargeFormatted,
            thisCarTrawler.staticUrl,
            thisCarTrawler.copies.priceDay,
            thisCarTrawler.copies.totalPrice,
            thisCarTrawler.copies.addCar);


        var template = new JSBaseType.String('<li dir="ltr" vehid="{0}" vendormodel="{1}" orderby="{3}" class="liSlider">{2}</li>');

        var formmatedTemplate = template.format(id, vendorModel, templateVisibleLayer, veh.VehAvailCore.TPA_Extensions.OrderBy["@Index"]);

        return formmatedTemplate;
    };

    thisCarTrawler.getTransmisionTypeShort = function (transmission)
    {
        if (transmission == "Automatic")
            return "AUT";

        return "MAN";
    };

    thisCarTrawler.increaseRetries = function () {
        thisCarTrawler.retries++;
    }

    thisCarTrawler.getSizeCar = function (numsize)
    {
        var result = "";        

        while (thisCarTrawler.otacodetables == null && thisCarTrawler.retries < 5)
        {
            clearTimeout(thisCarTrawler.timeout);
            thisCarTrawler.timeout = setTimeout(thisCarTrawler.increaseRetries, 200);
        }

        thisCarTrawler.retries = 0;
        if(thisCarTrawler.otacodetables != null){
            $.each(thisCarTrawler.otacodetables, function (i, size) {
                if (size.value == numsize.toString())
                    result = size.label;
            });
        }

        return result;
    };

    thisCarTrawler.isfreeDriver = function (offers)
    {
        var result = false;

        if (offers != null) {
            $.each(offers, function (i, offer) {
                if (offer["@Type"].toString() === "free_additional_driver")
                    result = true;
            });
        }

        return result;
    };

    thisCarTrawler.UpdateSelecteCar = function () {

        var index = parseInt($('#singleCarrousel>div>div').children('li').length) - 3 - $('#singleCarrousel').slickCurrentSlide();

        thisCarTrawler.idSelectedCar = $('#singleCarrousel>div>div').children('li[index=' + index + ']').attr("vehid");
        thisCarTrawler.vendorModel = $('#singleCarrousel>div>div').children('li[index=' + index + ']').attr("vendormodel");
    };
    
    thisCarTrawler.UpdateAvailability = function ()
    {
        var valid = thisCarTrawler.IsValidSearch();
        
        if (valid == '') {
            $('#txtDatePickup').val($.datepicker.formatDate("DD, dd MM", new Date($('#dtPickup').datepicker('getDate'))));
            $('#txtDateReturn').val($.datepicker.formatDate("DD, dd MM", new Date($('#dtReturn').datepicker('getDate'))));

            var json = thisCarTrawler.requestAvailability;
            var datePickup = $.datepicker.formatDate("yy-mm-dd", new Date($('#dtPickup').datepicker('getDate')));
            var timePickup = $('#availabilityHoursPickUp').val();
            var dateTimePickup = datePickup.concat("T").concat(timePickup).concat(':00');
            var dateReturn = $.datepicker.formatDate("yy-mm-dd", new Date($('#dtReturn').datepicker('getDate')));
            var timeReturn = $('#availabilityHoursReturn').val();
            var dateTimeReturn = dateReturn.concat("T").concat(timeReturn).concat(':00');
            var returnIata = $('#returnLocation').data('iata');
            var pickupIata = $('#pickupLocation').data('iata');

            //Set availability
            json.VehAvailRQCore.VehRentalCore['@PickUpDateTime'] = dateTimePickup;
            json.VehAvailRQCore.VehRentalCore['@ReturnDateTime'] = dateTimeReturn;
            json.VehAvailRQCore.VehRentalCore.PickUpLocation['@LocationCode'] = $('#pickupLocation').data('iata');
            json.VehAvailRQCore.VehRentalCore.ReturnLocation['@LocationCode'] = $('#returnLocation').data('iata');

            //Set prebooking
            thisCarTrawler.requestPreBooking.VehResRQCore.VehRentalCore["@PickUpDateTime"] = dateTimePickup;
            thisCarTrawler.requestPreBooking.VehResRQCore.VehRentalCore["@ReturnDateTime"] = dateTimeReturn;
            thisCarTrawler.requestPreBooking.VehResRQCore.VehRentalCore.PickUpLocation["@LocationCode"] = $('#pickupLocation').data('iata');
            thisCarTrawler.requestPreBooking.VehResRQCore.VehRentalCore.ReturnLocation["@LocationCode"] = $('#returnLocation').data('iata');

            //$('#divLoading').text('Actualizando búsqueda');
            $('#divLoading').show();
            $('#divOverlay').show();

            thisCarTrawler.RequestAvailability(true);
        }
        else
        {
            alert(valid);
        }
    };

    thisCarTrawler.IsValidSearch = function () {

        var datePickup = $.datepicker.formatDate("yy-mm-dd", new Date($('#dtPickup').datepicker('getDate')));
        var timePickup = $('#availabilityHoursPickUp').val();
        var dateTimePickup = datePickup.concat("T").concat(timePickup).concat(':00');
        var dateReturn = $.datepicker.formatDate("yy-mm-dd", new Date($('#dtReturn').datepicker('getDate')));
        var timeReturn = $('#availabilityHoursReturn').val();
        var dateTimeReturn = dateReturn.concat("T").concat(timeReturn).concat(':00');
        var returnIata = $('#returnLocation').data('iata');
        var pickupIata = $('#pickupLocation').data('iata');


        var msgError = '';

        if (dateTimePickup >= dateTimeReturn)
        {
            msgError = thisCarTrawler.copies.msgErrorDate;
        }

        return msgError;
    };

    thisCarTrawler.showUpdateCars = function () {
        $('#carsCarrouselOpacityController').css('opacity', 0);

        $('#carsCarrousel').show();

        $('#multiCarrousel').slick({
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            rtl: true,
            draggable: false,
            slide: 'li',
            speed: 0,
            variableWidth: true,
            onAfterChange: function () {
                var initialized = $('#multiCarrousel').data('initialized');
                if (!initialized) {
                    $('#multiCarrousel').data('initialized', true);
                    this.options.speed = this.defaults.speed;
                    $('#carsCarrousel').hide();
                }
            }
        });

        $('#multiCarrousel').getSlick().oldGetLeft = $('#multiCarrousel').getSlick().getLeft;
        $('#multiCarrousel').getSlick().getLeft = function (position) {
            return this.oldGetLeft(position) - 14;
        }

        $('#multiCarrousel').slickGoTo(2);

        $('#carsSearcher').show();

        $('#singleCarrousel').slick({
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: true,
            draggable: false,
            slide: 'li',
            speed: 0,
            variableWidth: true,
            onAfterChange: function () {
                var initialized = $('#singleCarrousel').data('initialized');
                if (!initialized) {
                    $('#singleCarrousel').data('initialized', true);
                    this.options.speed = this.defaults.speed;
                    $('#singleCarrousel>.slick-prev').on('click', thisCarTrawler.UpdateSelecteCar);
                    $('#singleCarrousel>.slick-next').on('click', thisCarTrawler.UpdateSelecteCar);
                    $('#carsCarrouselOpacityController').css('opacity', 1);
                }
            }
        });

        var index = parseInt($('li[vendormodel="' + thisCarTrawler.vendorModel + '"]').attr("index")) != 0 ? parseInt($('li[vendormodel="' + thisCarTrawler.vendorModel + '"]').attr("index")) : parseInt($('#singleCarrousel>div>div').children('li').length) - 3;

        $('#singleCarrousel').slickGoTo(parseInt($('#singleCarrousel>div>div').children('li').length) - 3 - index);

    };

    thisCarTrawler.CancelUpdate = function ()
    {
        $('#pnlCarTrawlerList').show();
        $('#pnlCarTrawlerUpdate').hide();
    };

    thisCarTrawler.PreBooking = function () {

        var id = thisCarTrawler.idSelectedCar = $(this).attr("vehid");

        thisCarTrawler.requestPreBooking.VehResRQInfo.Reference = thisCarTrawler.Reference[id];
        thisCarTrawler.requestPreBooking.TotalPrice = thisCarTrawler.TotalPrices[id];
        thisCarTrawler.requestPreBooking.IdCarSelected = id;

        $('#divLoading').show();
        $('#divOverlay').show();

        setTimeout(function(){
            $('#divLoading').hide();
            $('#divOverlay').hide();
            thisCarTrawler.SideBarObj.setExternalService("RentCar", { pay: { desc: "1 " + thisCarTrawler.copies.sbsidebarAdded, price: parseFloat("0.00") } });
            thisCarTrawler.SideBarObj.displayCustomServiceTooltip("RentCar", thisCarTrawler.copies.titleTooltipAdded, thisCarTrawler.copies.textTooltipAdded);
            thisCarTrawler.showConfirmationBox();
        },500);

    };

    thisCarTrawler.CancelBooking = function () {

        if (thisCarTrawler.SideBarObj.hasExternalServices) {
            thisCarTrawler.SideBarObj.hasExternalServices = false;
            thisCarTrawler.SideBarObj.removeService("RentCar", true);
        }

        $(window).trigger('resize');
        $('#carsCarrousel').show();
        $('#carsConfirmation').hide();
        $('#' + thisCarTrawler.infoPreBookingCar).val('');
    };

    thisCarTrawler.ChangeBooking = function () {

        if (thisCarTrawler.SideBarObj.hasExternalServices) {
            thisCarTrawler.SideBarObj.hasExternalServices = false;
            thisCarTrawler.SideBarObj.removeService("RentCar", true);
        }

        //thisCarTrawler.idSelectedCar = $(this).attr("vehid");

        thisCarTrawler.showCarsSearcher();
        $('#carsConfirmation').hide();
        $('#' + thisCarTrawler.infoPreBookingCar).val('');
    };

    thisCarTrawler.setLocations = function () {

        var url = thisCarTrawler.urlProxyCarTrawler + thisCarTrawler.locationRequestType + thisCarTrawler.culture + "&callback=?";

        $.getJSON(url, function (data) {
            thisCarTrawler.locations = data;


            $('#pickupLocation').autocomplete({
                source: function (request, response) {
                    var sValue = request.term.toLowerCase();
                    var aSearch = [];
                    $(thisCarTrawler.locations).each(function (iIndex, sElement) {
                        if (sElement.label.toLowerCase().indexOf(sValue) >= 0 || sElement.value.toLowerCase().indexOf(sValue) >= 0) {
                            aSearch.push(sElement);
                        }
                    });

                    response(aSearch);
                },
                minLength: 2,
                select: function (event, ui) {
                    this.value = ui.item.label;
                    $('#pickupLocation').data('iataOld', $('#pickupLocation').data('iata'));
                    $('#pickupLocation').data('iata', ui.item.value);
                    thisCarTrawler.UpdateAvailability();
                    $("#resultsPickup").hide();
                    return false;
                },
                change: function (event, ui) {
                    if (ui.item == null) {
                        alert(thisCarTrawler.copies.msgErrorLocation);
                        this.value = $('#pickupLocation').data('iata');
                        var location = $.grep(thisCarTrawler.locations, function (e) { return e.value == $('#pickupLocation').data('iata'); });
                        $("#pickupLocation").val(location[0].label);
                        $("#resultsPickup").hide();
                    }
                },
                appendTo: "#resultsPickup",
                open: function () {
                    var position = $("#resultsPickup").position(),
                        left = position.left, top = position.top;
                    $("#resultsPickup > ul").css({
                        left: (left) + "px",
                        top: (top) + "px"
                    });

                    $("#resultsPickup").show();
                }
            });

            $("#returnLocation").autocomplete({
                source: function (request, response) {
                    var sValue = request.term.toLowerCase();
                    var aSearch = [];
                    $(thisCarTrawler.locations).each(function (iIndex, sElement) {
                        if (sElement.label.toLowerCase().indexOf(sValue) >= 0 || sElement.value.toLowerCase().indexOf(sValue) >= 0) {
                            aSearch.push(sElement);
                        }
                    });

                    response(aSearch);
                },
                minLength: 2,
                select: function (event, ui) {
                    this.value = ui.item.label;
                    $('#returnLocation').data('iataOld', $('#pickupLocation').data('iata'));
                    $('#returnLocation').data('iata', ui.item.value);
                    thisCarTrawler.UpdateAvailability();
                    $("#resultsReturn").hide();
                    return false;
                },
                change: function (event, ui) {
                    if (ui.item == null) {
                        alert(thisCarTrawler.copies.msgErrorLocation);
                        var location = $.grep(thisCarTrawler.locations, function (e) { return e.value == $('#returnLocation').data('iata'); });
                        $("#returnLocation").val(location[0].label);
                        $("#resultsReturn").hide();
                    }
                },
                appendTo: "#resultsReturn",
                open: function () {
                    var position = $("#resultsReturn").position(),
                        left = position.left, top = position.top;
                    $("#resultsReturn > ul").css({
                        left: (left) + "px",
                        top: (top) + "px"
                    });
                    $("#resultsReturn").show();
                }
            });
        });

    };

    thisCarTrawler.setCodetables = function () {

        var url = thisCarTrawler.urlProxyCarTrawler + thisCarTrawler.codetablesRequestType + thisCarTrawler.culture + "&callback=?";

        $.getJSON(url, function (data) {
            thisCarTrawler.otacodetables = data;
        });
    };

    thisCarTrawler.setAvailabilityHours = function (timePickup,timeReturn)
    {
        var date = new Date('', '', '', 00, 00, 00, 00), interval =  parseInt(thisCarTrawler.intervalMinutes), arr = [];
        var date2 = new Date('', '', '', 00, 00, 00, 00);

        while (date.getDay() == date2.getDay())
        {
            date.setMinutes(date.getMinutes() + interval);
            arr.push(("0" + date.getHours()).slice(-2)+ ':' + ("0" + date.getMinutes()).slice(-2));
        }

        var availabilityHours = arr.sort();

        $.each(availabilityHours, function (i,hour) {
            $('#availabilityHoursPickUp').append($('<option></option>').val(hour).html(hour));
            $('#availabilityHoursReturn').append($('<option></option>').val(hour).html(hour));
        });

        $('#availabilityHoursPickUp').val(thisCarTrawler.getNearestTimes(availabilityHours, timePickup, interval)).on('change', thisCarTrawler.UpdateAvailability);
        $('#availabilityHoursReturn').val(thisCarTrawler.getNearestTimes(availabilityHours, timeReturn, interval)).on('change', thisCarTrawler.UpdateAvailability);
    }

    thisCarTrawler.getNearestTimes = function (times, timeString, interval) {
        var hours = timeString.split(":")[0];
        var minutes = timeString.split(":")[1];

        var timeToCheck = new Date();
        timeToCheck.setHours(hours);
        timeToCheck.setMinutes(minutes);

        var nearest = Math.round(timeToCheck.getMinutes() / interval);

        minutes = '00';
        hours = timeToCheck.getHours();

        if (nearest === (60 / interval)) {
            hours += 1;
        }
        else {
            minutes = nearest * interval;
        }

        timeToCheck.setMinutes(minutes);
        timeToCheck.setHours(hours);

        minutes = timeToCheck.getMinutes().toString();
        hours = timeToCheck.getHours().toString();

        if (minutes.length === 1) {
            minutes = '0' + minutes;
        }
        if (hours.length === 1) {
            hours = '0' + hours;
        }


        var foundAt = times.indexOf(hours + ':' + minutes);
        if (foundAt != -1) {
            return times[foundAt];
        }

        return 'not found';
    };

    thisCarTrawler.showConfirmationBox = function ()
    {
        var idselected = thisCarTrawler.idSelectedCar.split("_");
        var idVendor = parseInt(idselected[0]);
        var idCarVendor = parseInt(idselected[1]);

        var vehAvailRSCore = thisCarTrawler.responseAvailability;
        var vehRentalCore = vehAvailRSCore.VehRentalCore;

        var datePickup = $.datepicker.formatDate("dd MM yy", new Date(vehRentalCore["@PickUpDateTime"]));
        var dateReturn = $.datepicker.formatDate("dd MM yy", new Date(vehRentalCore["@ReturnDateTime"]));
        var timePickup = vehRentalCore["@PickUpDateTime"].split("T")[1].substring(0, 5);
        var timeReturn = vehRentalCore["@ReturnDateTime"].split("T")[1].substring(0, 5);

        $('#pickupDate').text(datePickup + " (" + timePickup + ")");
        $('#returnDate').text(dateReturn + " (" + timeReturn + ")");
        $('#pickupLocationConfirm').text(vehRentalCore.PickUpLocation["@Name"]);
        $('#returnLocationConfirm').text(vehRentalCore.ReturnLocation["@Name"]);

        var vehVendorAvails = vehAvailRSCore.VehVendorAvails;

        if (!(vehAvailRSCore.VehVendorAvails instanceof Array)) { vehVendorAvails = [vehAvailRSCore.VehVendorAvails.VehVendorAvail]; };

        $.each(vehVendorAvails, function (indexParent, vendor) {
            if (indexParent === idVendor){
                $('#logoVendor').attr('src', vendor.Info.TPA_Extensions.VendorPictureURL["#text"]);
                $('#logoVendor').text('alt', vendor.Vendor["@CompanyShortName"]);
                var vehAvails = vendor.VehAvails;
                if (!(vendor.VehAvails instanceof Array)) { vehAvails = [vendor.VehAvails]; };
                $.each(vehAvails, function (index, veh) {
                    if (index === idCarVendor)
                    {
                        var description = new JSBaseType.String("{0}/ {1}, {2}");
                        var sizeCar = thisCarTrawler.getSizeCar(veh.VehAvailCore.Vehicle.VehClass["@Size"]);
                        var freeAditionalDriver = thisCarTrawler.isfreeDriver(veh.VehAvailCore.TPA_Extensions.SpecialOffers)
                        var labelPassenger = veh.VehAvailCore.Vehicle["@PassengerQuantity"] + " " + thisCarTrawler.copies.passengers;
                        var totalCharge = veh.VehAvailCore.TotalCharge["@RateTotalAmount"];
                        var totalChargeFormatted = SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(totalCharge);
                        var days = veh.VehAvailCore.TPA_Extensions.Duration["@Days"];
                        var dailyCharge = parseFloat(Math.round((totalCharge / days) * 100) / 100).toFixed(2);
                        var dailyChargeFormatted = SKYSALES.Util.convertToLocaleCurrencyNumberFormatted(dailyCharge);
                        var fullDescription = description.format(sizeCar, labelPassenger, veh.VehAvailCore.Vehicle["@TransmissionType"]);

                        $('#logoCar').attr('src', veh.VehAvailCore.Vehicle.PictureURL);
                        $('#logoCar').attr('alt', veh.VehAvailCore.Vehicle.VehMakeModel["@Name"]);
                        $('#description').text(fullDescription);
                        $('#modelCar').text(veh.VehAvailCore.Vehicle.VehMakeModel["@Name"]);

                        thisCarTrawler.requestPreBooking.InfoBookingCar.urlImage = veh.VehAvailCore.Vehicle.PictureURL;
                        thisCarTrawler.requestPreBooking.InfoBookingCar.description = fullDescription;
                        $('#' + thisCarTrawler.infoPreBookingCar).val(JSON.stringify(thisCarTrawler.requestPreBooking));

                        $('#freeAditionalDriver').empty();

                        if (freeAditionalDriver) {
                            $('#freeAditionalDriver').append('<div class="carsSectionSliderContent_legend"><span>' + thisCarTrawler.copies.freeDriver + '</span></div>');
                        }

                        $('#pricePerDay').text(dailyChargeFormatted);
                        $('#totalPrice').text(totalChargeFormatted);
                    }
                });
            }
        });

        //$('#singleCarrousel').unslick();
        $('#carsSearcher').hide();
        $('#carsConfirmation').show();


        $('#changeBookingCar').on('click', thisCarTrawler.ChangeBooking);
        $('#removeBookingCar').on('click', thisCarTrawler.CancelBooking);

    };

    return thisCarTrawler;

};

