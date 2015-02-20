

VUELING.Class.ExpressSignUp = function () {
    var parent = SKYSALES.Class.SkySales(),
        expressSignUp = SKYSALES.Util.extendObject(parent);

    expressSignUp.ajaxResponseWrapperId = "";
    expressSignUp.emailControlId = "";
    expressSignUp.passwordControlId = "";
    expressSignUp.linkControlId = "";
    expressSignUp.genericErrorText = "";

    expressSignUp.linkControl = null;
    expressSignUp.ajaxResponseWrapperControl = null;
    expressSignUp.emailControl = null;
    expressSignUp.passwordControlId = null;

    expressSignUp.validationErrorReadAlong = new SKYSALES.ValidationErrorReadAlong();

    expressSignUp.init = function (json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    expressSignUp.setVars = function () {
        this.linkControl = jQuery('#' + this.linkControlId);
        this.ajaxResponseWrapperControl = jQuery('#' + this.ajaxResponseWrapperId);
        this.emailControl = jQuery('#' + this.emailControlId);
        this.passwordControl = jQuery('#' + this.passwordControlId);
    };

    expressSignUp.addEvents = function () {
        this.linkControl.on('click', this.SubmitDataToAjax);
    };

    expressSignUp.SubmitDataToAjax = function () {
        if (!SKYSALES.Util.validate(this)) {
            return false;
        }
        expressSignUp.linkControl.unbind("click");
        var emailId = expressSignUp.emailControlId;
        var email = expressSignUp.emailControl.val();
        var passwordId = expressSignUp.passwordControlId;
        var password = expressSignUp.passwordControl.val();

        var postData = {};
        postData[emailId] = email;
        postData[passwordId] = password;

        expressSignUp.validationErrorReadAlong.hide();

        $.ajax({
            url: "ExpressSignUpAjax.aspx",
            type: "POST",
            data: postData,
            success: function (data) {
                var responseData = $(data);
                var response = responseData.find('#express_sign_up_result').text();
                var responseHtml = responseData.find('#express_sign_up_response').html();

                if (response == 'success') {
                    expressSignUp.ajaxResponseWrapperControl.html(responseHtml);
                } else {
                    expressSignUp.handleAjaxError(responseHtml);
                }
            },
            error: function (xhr) {
                expressSignUp.handleAjaxError();
            },
            dataType: "html" /*,
            timeout: 15000 */
        });

        return false;
    };

    expressSignUp.handleAjaxError = function (message) {
        if (!message) {
            message = expressSignUp.genericErrorText;
        }
        var validationErrorListId = expressSignUp.validationErrorReadAlong.getValidationErrorListId(),
            readAlongDivId = this.getById(validationErrorListId).attr('id');

        if (readAlongDivId === undefined) {
            expressSignUp.validationErrorReadAlong.addValidationErrorDiv();
            expressSignUp.validationErrorReadAlong.addCloseEvent();
        }

        expressSignUp.getById(validationErrorListId).html(message);
        expressSignUp.validationErrorReadAlong.show();
        SKYSALES.Util.anchorToErrorMsg();
    };

    return expressSignUp;
};