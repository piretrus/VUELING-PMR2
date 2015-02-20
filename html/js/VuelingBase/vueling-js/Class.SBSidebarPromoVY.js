

VUELING.Class.SBSidebarPromoVY = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisSBSidebarPromoVY = SKYSALES.Util.extendObject(parent);

    thisSBSidebarPromoVY.init = function (json) {
        this.setSettingsByObject(json);
    };

    thisSBSidebarPromoVY.SpecialBaggageSelected = function () {
        var ssrSpecialBaggageInput = VUELING.Util.getObjectInstance("ssrSpecialBaggageInput");
        return thisSBSidebarPromoVY.GetSSRSelected(ssrSpecialBaggageInput);
    };

    thisSBSidebarPromoVY.BaggageSelected = function () {
        var ssrBaggageInput = VUELING.Util.getObjectInstance("ssrBaggageInput");
        return thisSBSidebarPromoVY.GetSSRSelected(ssrBaggageInput);
    };

    thisSBSidebarPromoVY.GetSSRSelected = function (ssrPassengerInput) {
        var result = [];
        for (var i = 0; i < ssrPassengerInput.ssrFormArray.length; i++) {
            if (ssrPassengerInput.ssrFormArray[i].ssrCode.val()) {
                if (parseInt(ssrPassengerInput.ssrFormArray[i].ssrQuantity.val()) > 0) {
                    result.push({
                        Amount: SKYSALES.Util.convertLocaleCurrencyToDecimal(ssrPassengerInput.ssrFormArray[i].ssrAmount.val()),
                        Code: ssrPassengerInput.ssrFormArray[i].ssrCode.val(),
                        QuantityMode: "segment"
                    });
                }
            }
        }
        return result;
    };

    thisSBSidebarPromoVY.InsuranceMissedFlightSelected = function () {
        var missedFlightInsuranceInput = VUELING.Util.getObjectInstance("missedFlightInsuranceInput");

        var result = [];
        for (var i = 0; i < missedFlightInsuranceInput.checkboxIds.length; i++) {
            if ($("#" + missedFlightInsuranceInput.checkboxIds[i]).prop("checked")) {
                var pricePerPax = parseFloat(missedFlightInsuranceInput.insurancePrice.replace(",", "."));
                result.push({
                    Amount: pricePerPax,
                    Code: "insuranceMissedFlight",
                    QuantityMode: "booking"
                });
            }
        }
        return result;
    };

    thisSBSidebarPromoVY.PetsSelected = function () {
        var petInput = VUELING.Util.getObjectInstance("petInput");
        var result = [];
        var checked = $('div .petTable .typeCheck:checked');
        var price = (petInput.flightPartSsrArray.length / petInput.paxCount) * SKYSALES.Util.convertLocaleCurrencyToDecimal(petInput.petPrice);
        for (var i = 0; i < checked.length; i++) {
            result.push({
                Amount: price,
                Code: 'pets',
                QuantityMode: "segment"
            });
        }
        return result;
    };

    thisSBSidebarPromoVY.InsurancesBagsSelected = function () {
        var result = [];
        var baggagesInsurances = VUELING.Util.getObjectInstance("BaggagesInsurances");
        for (var j in baggagesInsurances.insurancesSelected) {
            result.push({
                Amount: baggagesInsurances.insurancesSelected[j]["price"],
                Code: baggagesInsurances.insurancesSelected[j]["code"],
                QuantityMode: "booking"
            });
        }
        return result;
    };

    thisSBSidebarPromoVY.InsurancesSelected = function () {
        var result = [];
        var insuraceInput = VUELING.Util.getObjectInstance("SSRInsuraceInput");
        for (var i = 0; i < insuraceInput.insurances.length; i++) {
            if (insuraceInput.insurances[i].selected == true) {
                result.push({
                    Amount: insuraceInput.insurances[i].price,
                    Code: insuraceInput.insurances[i].code,
                    QuantityMode: "booking"
                });
            }
        }
        return result;
    };

    thisSBSidebarPromoVY.SpecialEquipmentInsurancesSelected = function () {
        var result = [];
        var specialEquipmentInsurances = VUELING.Util.getObjectInstance("SpecialEquipmentInsurances");
        for (var j in specialEquipmentInsurances.insurancesSelected) {
            result.push({
                Amount: specialEquipmentInsurances.insurancesSelected[j].price,
                Code: specialEquipmentInsurances.insurancesSelected[j].code,
                QuantityMode: "booking"
            });
        }
        return result;
    };

    thisSBSidebarPromoVY.SeatSelected = function () {
        var result = [];
        var seatMaps = VUELING.Util.getObjectInstanceAllStartWith("seatmap");
        if (seatMaps.length > 0) {
            var seatSelected = seatMaps[0].SelectedSeatsHolderObj.CurrentSelectedSeats;
            for (var j = 0; j < seatSelected.length; j++) {
                result.push({
                    Amount: seatSelected[j].Price,
                    Code: 'seat',
                    QuantityMode: "booking",
                    Type: seatSelected[j].Type
                });
            }
        }
        return result;
    };

    thisSBSidebarPromoVY.GetServicesSelected = function (servicesPricesArray) {
        var result = {
            ServicesSelected: []
        };

        for (var serviceId in servicesPricesArray) {
            var selected = [];
            switch (serviceId) {
                case "bags":
                    selected = thisSBSidebarPromoVY.BaggageSelected()
                    break;
                case "speqs":
                    selected = thisSBSidebarPromoVY.SpecialBaggageSelected();
                    break;
                case "insuranceMissedFlight":
                    selected = thisSBSidebarPromoVY.InsuranceMissedFlightSelected();
                    break;
                case "pets":
                    selected = thisSBSidebarPromoVY.PetsSelected();
                    break;
                case "insurancesBags":
                    selected = thisSBSidebarPromoVY.InsurancesBagsSelected();
                    break;
                case "insurances":
                    selected = thisSBSidebarPromoVY.InsurancesSelected();
                    break;
                case "insurancesSpeqs":
                    selected = thisSBSidebarPromoVY.SpecialEquipmentInsurancesSelected();
                    break;
                case "seats":
                    selected = thisSBSidebarPromoVY.SeatSelected();
                    break;
            }
            for (var i = 0; i < selected.length; i++) {
                result.ServicesSelected.push(selected[i]);
            }
        };

        return result;
    };

    return thisSBSidebarPromoVY;
};