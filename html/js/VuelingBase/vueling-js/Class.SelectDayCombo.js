


VUELING.Class.SelectDayCombo = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisSelectDayCombo = SKYSALES.Util.extendObject(parent);

    thisSelectDayCombo.monthsCollection = null;

    thisSelectDayCombo.dayComboId = "";
    thisSelectDayCombo.monthComboId = "";
    thisSelectDayCombo.yearComboId = "";

    thisSelectDayCombo.dayCombo = null;
    thisSelectDayCombo.monthCombo = null;
    thisSelectDayCombo.yearCombo = null;

    thisSelectDayCombo.maximumDateString = "";
    thisSelectDayCombo.maximumDate = null;

    thisSelectDayCombo.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.loadYears();
        this.defaultDays();
    };

    thisSelectDayCombo.setVars = function () {
        parent.setVars.call(this);
        this.dayCombo = $("#" + this.dayComboId);
        this.monthCombo = $("#" + this.monthComboId);
        this.yearCombo = $("#" + this.yearComboId);
        this.maximumDate = new Date(this.maximumDateString);
        if (isNaN(this.maximumDate.getDate()))
            this.maximumDate = new Date();
    };

    thisSelectDayCombo.addEvents = function () {
        this.yearCombo.change(function () {
            thisSelectDayCombo.loadMonths();
            thisSelectDayCombo.loadDias();
        });

        this.monthCombo.change(function () {
            thisSelectDayCombo.loadDias();
        });
    };

    thisSelectDayCombo.loadYears = function() {
        if (this.yearCombo.children().length > 2) {
            while (this.yearCombo.children()[1].value > this.maximumDate.getFullYear()) {
                this.yearCombo.children()[1].remove();
            }
        }
    };


    thisSelectDayCombo.loadMonths = function() {
        if (this.yearCombo.val() == "none")
            return;

        var currentSelected = this.monthCombo.val();
        var noneOption = $("option[value='none']", this.monthCombo).text();
        this.monthCombo.html("");
        var maxmonths = ((this.yearCombo.val() >= this.maximumDate.getFullYear()) ? this.maximumDate.getMonth() + 1 : this.monthsCollection.length) + 1;

        /*if (this.yearCombo.val() == this.yearCombo.children()[1].value) {
            maxmonths = this.maximumDate.getMonth() + 1;
        }*/

        var minmonths = 1;
        var posicion = this.yearCombo.children().length - 1;
        if (this.yearCombo.val() == this.yearCombo.children()[posicion].value) {
            minmonths = this.maximumDate.getMonth() + 1;
            if (thisSelectDayCombo.isLastDay(this.maximumDate)) {
                minmonths = minmonths == 12 ? 1 : minmonths;
            } 
        }

        this.monthCombo.append($("<option></option>").attr("value", "none").text(noneOption));
        for (var i = minmonths; i <= maxmonths; i++) {
            this.monthCombo.append($("<option></option>").attr("value", i).text(this.monthsCollection[i]));
        }

        if (currentSelected != "none") {
            if (this.monthCombo.children().filter("option[value='" + currentSelected + "']").length > 0) {
                this.monthCombo.val(currentSelected);
            }
        }

    };

    thisSelectDayCombo.loadDias = function () {
        if (this.monthCombo.val() == "none")
            return;

        var daysToLoad = (this.yearCombo.val() >= this.maximumDate.getFullYear() && this.monthCombo.val() >= (this.maximumDate.getMonth() + 1))
            ? this.maximumDate.getDay() - 1 : this.daysInMonth(this.monthCombo.val(), this.yearCombo.val());

        if (!isNaN(daysToLoad)) {
            var currentSelected = this.dayCombo.val();
            var noneOptionDay = $("option[value='none']", this.dayCombo).text();
            this.dayCombo.html("");

            this.dayCombo.append($("<option></option>").attr("value", "none").text(noneOptionDay));
            
            var minday = 1;
            var posicion = this.yearCombo.children().length - 1;
            if (this.yearCombo.val() == this.yearCombo.children()[posicion].value &&
                this.monthCombo.val() == this.monthCombo.children()[1].value) {
                
                minday = this.maximumDate.getDate() + 1;
            }

            if (this.yearCombo.val() == this.yearCombo.children()[1].value &&
               this.monthCombo.val() == this.maximumDate.getMonth() + 1 ) {

                daysToLoad = this.maximumDate.getDate() - 1;
            }
            
            for (var i = minday; i <= daysToLoad; i++) {
                var dayText = i;
                if (i < 10) dayText = "0" + dayText;
                this.dayCombo.append($("<option></option>").attr("value", i).text(dayText));
            }
            if (currentSelected != "none") {
                if (this.dayCombo.children().filter("option[value='" + currentSelected + "']").length > 0) {
                    this.dayCombo.val(currentSelected);
                }
            }
        }
    };

    thisSelectDayCombo.defaultDays = function () {
        if (this.dayCombo.children().length > 2) {
            for (var i = 1; i < 10; i++) {
                var option = $(this.dayCombo.children()[i]);
                option.text("0" + option.text());
            }
        }
    };

    thisSelectDayCombo.daysInMonth = function (iMonth, iYear) {
        return new Date(iYear, iMonth, 0).getDate();
    };
    
    thisSelectDayCombo.isLastDay = function(dt) {
        var test = new Date(dt.getTime());
        test.setDate(test.getDate() + 1);
        return test.getDate() === 1;
    }

    
    //    if (this.yearCombo.val() == "none" || this.monthCombo.val() == "none" || this.dayCombo.val() == "none")
    //        return;

    //    var currentDate = new Date(this.yearCombo.val(), this.monthCombo.val(), this.dayCombo.val());
    //    if (currentDate > this.maximumDate)

    

    return thisSelectDayCombo;
};
