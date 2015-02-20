

VUELING.Class.SelectedSeatsHolder = function () {
    var parent = SKYSALES.Class.SkySales();
    var thisSelectedSeatsHolder = SKYSALES.Util.extendObject(parent);

    //Arreglo de instancias de la clase interna con la info de los asientos anteriormente seleccionados
    //para el caso de C3 y checkin
    thisSelectedSeatsHolder.AssignedSeats = null;

    //Total del precio de los asientos contratados anteriormente
    thisSelectedSeatsHolder.AmountAssignedSeats = 0;

    //Arreglo de instancias de la clase interna con la info de los asientos actualmente seleccionados
    thisSelectedSeatsHolder.CurrentSelectedSeats = [];

    thisSelectedSeatsHolder.init = function (json) {
        thisSelectedSeatsHolder.setSettingsByObject(json);
        thisSelectedSeatsHolder.convertAssignedSeatsObjectToSeat();

        if (thisSelectedSeatsHolder.CurrentSelectedSeats.length == 0 && thisSelectedSeatsHolder.AssignedSeats.length > 0) {
            thisSelectedSeatsHolder.CurrentSelectedSeats = thisSelectedSeatsHolder.AssignedSeats.slice();
        }
    };

    thisSelectedSeatsHolder.convertAssignedSeatsObjectToSeat = function () {
        $.each(thisSelectedSeatsHolder.AssignedSeats, function (index, item) {
            var seat = new Seat(item.Price, item.Type, item.Segment, item.Journey, item.PaxId);
            thisSelectedSeatsHolder.addSeat(thisSelectedSeatsHolder.AssignedSeats, seat);
        });
        thisSelectedSeatsHolder.AmountAssignedSeats = thisSelectedSeatsHolder.getAmountSeatsList(thisSelectedSeatsHolder.AssignedSeats);
    };

    //Seat es una clase interna a la clase VUELING.Class.SelectedSeatsHolder
    function Seat(price, type, segment, journey, paxId) {
        this.Price = price;
        this.Type = type;
        this.Segment = segment;
        this.Journey = journey;
        this.PaxId = paxId;
    };

    //eventos cuando la lista de asientos contratados en la reserva se queda vacía
    var removeAllSelectedSeatsObservers = [];

    thisSelectedSeatsHolder.addRemoveAllSelectedSeatsObserver = function (observer) {
        if (observer && typeof (observer) == "function") {
            removeAllSelectedSeatsObservers.push(observer);
        }
    };

    thisSelectedSeatsHolder.RemoveAllSelectedSeats = function () {
        thisSelectedSeatsHolder.CurrentSelectedSeats = [];
        thisSelectedSeatsHolder.OnRemoveAllSelectedSeatsEvent();
    };

    thisSelectedSeatsHolder.OnRemoveAllSelectedSeatsEvent = function () {
        $.each(removeAllSelectedSeatsObservers, function (index, event) {
            try {
                event();
            } catch (e) {
                if ($.browser.msie == false && $.browser.version > 8) console.error('Error executing: %s. Error: %s', event, e);
            }
        });
        thisSelectedSeatsHolder.OnNoSelectedSeatsEvent();
    };

    thisSelectedSeatsHolder.addCurrentSeat = function (seatInput) {
        var price = parseFloat($(seatInput).attr('data_price'));
        var type = $(seatInput).attr('data_seat_type');
        var segment = parseInt($(seatInput).attr('data_segment'));
        var journey = parseInt($(seatInput).attr('data_journey'));
        var paxId = parseInt($(seatInput).attr('data_paxId'));

        var seat = new Seat(price, type, segment, journey, paxId);

        thisSelectedSeatsHolder.addSeat(thisSelectedSeatsHolder.CurrentSelectedSeats, seat);
    };

    //eventos cuando la lista de asientos contratados en la reserva se queda vacia
    var noSelectedSeatsObservers = [];

    thisSelectedSeatsHolder.addNoSelectedSeatsObserver = function (observer) {
        if (observer && typeof (observer) == "function") {
            noSelectedSeatsObservers.push(observer);
        }
    };

    thisSelectedSeatsHolder.removeCurrentSeat = function (seatInput) {
        var paxId = parseInt($(seatInput).attr('data_paxId'));
        var journey = parseInt($(seatInput).attr('data_journey'));
        var segment = parseInt($(seatInput).attr('data_segment'));

        var existSeat = thisSelectedSeatsHolder.findSeat(thisSelectedSeatsHolder.CurrentSelectedSeats, paxId, journey, segment);
        if (existSeat && existSeat.length > 0) {
            var index = 0;
            for (var i = 0; i < thisSelectedSeatsHolder.CurrentSelectedSeats.length; i++)
                if (thisSelectedSeatsHolder.CurrentSelectedSeats[i].PaxId == existSeat[0].PaxId
                    && thisSelectedSeatsHolder.CurrentSelectedSeats[i].Journey == existSeat[0].Journey
                    && thisSelectedSeatsHolder.CurrentSelectedSeats[i].Segment == existSeat[0].Segment) {
                    index = i;
                    break;
                }
            thisSelectedSeatsHolder.CurrentSelectedSeats.splice(index, 1);
        }
        if (thisSelectedSeatsHolder.CurrentSelectedSeats.length == 0) {
            thisSelectedSeatsHolder.OnNoSelectedSeatsEvent();
        }
    };

    thisSelectedSeatsHolder.OnNoSelectedSeatsEvent = function () {
        $.each(noSelectedSeatsObservers, function (index, event) {
            try {
                event();
            } catch (e) {
                console.error('Error executing: %s. Error: %s', event, e);
            }
        });
    };

    thisSelectedSeatsHolder.addSeat = function (seatsList, seat) {
        var existSeat = thisSelectedSeatsHolder.findSeat(seatsList, seat.PaxId, seat.Journey, seat.Segment);
        if (existSeat && existSeat.length > 0) {
            var index = 0;
            for (var i = 0; i < seatsList.length; i++)
                if (seatsList[i].PaxId == existSeat[0].PaxId
                    && seatsList[i].Journey == existSeat[0].Journey
                    && seatsList[i].Segment == existSeat[0].Segment) {
                    index = i;
                    break;
                }
            seatsList[index] = seat;
        } else {
            seatsList.push(seat);
        }
    };

    thisSelectedSeatsHolder.findSeat = function (listSeat, paxId, journey, segment) {
        return $.grep(listSeat, function (item) {
            return item.PaxId == paxId && item.Journey == journey && item.Segment == segment;
        });
    };

    thisSelectedSeatsHolder.getAmountSeatsList = function (seatList) {
        var amount = 0;
        $.each(seatList, function (index, seat) {
            amount += seat.Price;
        });
        return amount;
    };

    return thisSelectedSeatsHolder;
};