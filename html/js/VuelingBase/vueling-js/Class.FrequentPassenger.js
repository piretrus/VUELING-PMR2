VUELING.Class.FrequentPassenger = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisFrequentPassenger = SKYSALES.Util.extendObject(parent);

    thisFrequentPassenger.selectPaxTypeId = "";
    thisFrequentPassenger.contentToHiddenId1 = "";
    thisFrequentPassenger.contentToHiddenId2 = "";
    thisFrequentPassenger.contentToHiddenId3 = "";

    thisFrequentPassenger.selectPaxType = null;
    thisFrequentPassenger.contentToHidden1 = null;
    thisFrequentPassenger.contentToHidden2 = null;
    thisFrequentPassenger.contentToHidden3 = null;

    thisFrequentPassenger.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
        this.validateOnLoad();
    };

    thisFrequentPassenger.setVars = function () {
        parent.setVars.call(this);
        this.selectPaxType = this.getById(this.selectPaxTypeId);
        this.contentToHidden1 = this.getById(thisFrequentPassenger.contentToHiddenId1);
        this.contentToHidden2 = this.getById(thisFrequentPassenger.contentToHiddenId2);
        this.contentToHidden3 = this.getById(thisFrequentPassenger.contentToHiddenId3);
    };

    thisFrequentPassenger.addEvents = function () {
        parent.addEvents.call(this);
        this.selectPaxType.change(this.selectPaxTypeChangeHandler);
    };

    thisFrequentPassenger.selectPaxTypeChangeHandler = function (e) {
        if (thisFrequentPassenger.selectPaxType.val() != 'INF') {
            thisFrequentPassenger.contentToHidden1.show();
            thisFrequentPassenger.contentToHidden2.show();
        }
        else {
            thisFrequentPassenger.contentToHidden1.hide();
            thisFrequentPassenger.contentToHidden2.hide();
        }

        if (thisFrequentPassenger.selectPaxType.val() == 'ADT' || thisFrequentPassenger.selectPaxType.val() == "---") {
            thisFrequentPassenger.contentToHidden3.show();
        } else {
            thisFrequentPassenger.contentToHidden3.hide();
        }

    };

    thisFrequentPassenger.validateOnLoad = function () {
        this.selectPaxTypeChangeHandler(null);
    };

    return thisFrequentPassenger;
};