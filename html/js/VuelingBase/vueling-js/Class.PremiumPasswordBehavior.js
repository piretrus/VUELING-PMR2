

VUELING.Class.PremiumPasswordBehavior = function () {
    var parent = new SKYSALES.Class.SkySales(),
      thisPremiumPasswordBehavior = SKYSALES.Util.extendObject(parent);

    thisPremiumPasswordBehavior.passwordFieldSetId = '';
    thisPremiumPasswordBehavior.passwordFieldSet = null;
    thisPremiumPasswordBehavior.valid = '';
    thisPremiumPasswordBehavior.required = '';

    thisPremiumPasswordBehavior.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
    };

    thisPremiumPasswordBehavior.setVars = function () {
        parent.setVars.call(this);
        this.passwordFieldSet = $('#' + this.passwordFieldSetId);
    };

    thisPremiumPasswordBehavior.addEvents = function () {
        $('#' + this.passwordFieldSetId + ' :input').focusin(this.focusIn).focusout(this.focusOut);
    };

    thisPremiumPasswordBehavior.focusIn = function () {
        if (thisPremiumPasswordBehavior.validatePasswordFieldSet()) {
            $(this).parent().removeClass(thisPremiumPasswordBehavior.valid);
        }
        $(this).parent().removeClass(thisPremiumPasswordBehavior.required);
    };

    thisPremiumPasswordBehavior.focusOut = function () {
        if (thisPremiumPasswordBehavior.validatePasswordFieldSet) {
            thisPremiumPasswordBehavior.passwordFieldSet.addClass(thisPremiumPasswordBehavior.valid);
        }
        thisPremiumPasswordBehavior.passwordFieldSet.addClass(thisPremiumPasswordBehavior.required);
    };

    thisPremiumPasswordBehavior.validatePasswordFieldSet = function () {
        var valid = true;
        for (i in thisPremiumPasswordBehavior.passwordFieldSet.children()) {
            if (!VUELING.Util.validateByElementId('#' + thisPremiumPasswordBehavior.passwordFieldSet.children()[i].id)) {
                valid = false;
                break;
            }
        }
        return valid;
    };

    return thisPremiumPasswordBehavior;
}