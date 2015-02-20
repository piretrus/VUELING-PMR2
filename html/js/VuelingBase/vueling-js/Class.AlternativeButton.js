

VUELING.Class.AlternativeButton = function () {
    var parent = SKYSALES.Class.SkySales(),
        thisAlternativeButton = SKYSALES.Util.extendObject(parent);

    thisAlternativeButton.alternativeButtonId = "";
    thisAlternativeButton.alternativeButton = null;
    thisAlternativeButton.objectNameWithButton = "";

    thisAlternativeButton.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisAlternativeButton.setVars = function () {
        thisAlternativeButton.alternativeButton = this.getById(this.alternativeButtonId);
    };

    thisAlternativeButton.addEvents = function () {
        thisAlternativeButton.alternativeButton.click(function () {
            var thisObjectWithButton = VUELING.Util.getObjectInstance(thisAlternativeButton.objectNameWithButton);
            return thisObjectWithButton.clickFunction(thisObjectWithButton.submitButton[0]);
        });
    };

    return thisAlternativeButton;
};