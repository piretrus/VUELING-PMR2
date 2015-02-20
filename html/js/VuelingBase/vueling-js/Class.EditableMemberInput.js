

VUELING.Class.EditableMemberInput = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisEditableMemberInput = SKYSALES.Util.extendObject(parent);

    thisEditableMemberInput.globalSelector = '';
    thisEditableMemberInput.hideOnView = '';
    thisEditableMemberInput.dropDownListStateOrgInput = '';
    thisEditableMemberInput.dropDownListStatePersonInput = '';
    thisEditableMemberInput.editLinksSelector = '';
    thisEditableMemberInput.submitButtonId = '';
    thisEditableMemberInput.cancelButtonId = '';

    thisEditableMemberInput.dropDownListStateOrgInputObj = '';
    thisEditableMemberInput.dropDownListStateOrgInputView = null;
    thisEditableMemberInput.dropDownListStatePersonInputObj = '';
    thisEditableMemberInput.dropDownListStatePersonInputView = null;
    thisEditableMemberInput.toggleEditMode = '';

    thisEditableMemberInput.init = function (json) {
        this.setSettingsByObject(json);
        thisEditableMemberInput.dropDownListStateOrgInputObj = $('#' + thisEditableMemberInput.dropDownListStateOrgInput);
        thisEditableMemberInput.dropDownListStatePersonInputObj = $('#' + thisEditableMemberInput.dropDownListStatePersonInput);
        this.initEditControls();
        this.addEvents();
    };

    thisEditableMemberInput.initEditControls = function () {

        var toggleEditArgs = {
            eventsEnabled: false,
            copyCss: false,
            onpreview: function (e, ui) {
                if (ui.element.attr('type') === 'radio') {
                    ui.preview.hide();
                    if (ui.element.attr('checked') == false) {
                        $('#' + ui.element.attr('id') + 'Label').hide();
                    }
                }
                ui.element.parent().parent().addClass('noInput');
                $('#' + thisEditableMemberInput.submitButtonId).hide();
                $('#' + thisEditableMemberInput.cancelButtonId).hide();
                $('.' + thisEditableMemberInput.hideOnView).hide();
                if (thisEditableMemberInput.dropDownListStateOrgInputObj.length > 0) {
                    thisEditableMemberInput.dropDownListStateOrgInputObj.hide();
                    thisEditableMemberInput.dropDownListStateOrgInputObj.parent().parent().addClass('noInput');
                }
                if (thisEditableMemberInput.dropDownListStatePersonInputObj.length > 0) {
                    thisEditableMemberInput.dropDownListStatePersonInputObj.hide();
                    thisEditableMemberInput.dropDownListStatePersonInputObj.parent().parent().addClass('noInput');
                }
                $('.showOnView').show();
            },
            onedit: function (e, ui) {
                if (ui.element.attr('type') == 'radio') {
                    $('#' + ui.element.attr('id') + 'Label').show();
                }
                ui.element.parent().parent().removeClass('noInput');
                $('#' + thisEditableMemberInput.submitButtonId).show();
                $('#' + thisEditableMemberInput.cancelButtonId).show();
                $('.' + thisEditableMemberInput.hideOnView).show();
                if (thisEditableMemberInput.dropDownListStateOrgInputObj.length > 0) {
                    thisEditableMemberInput.dropDownListStateOrgInputObj.show();
                    thisEditableMemberInput.dropDownListStateOrgInputObj.parent().parent().removeClass('noInput');
                }
                if (thisEditableMemberInput.dropDownListStatePersonInputObj.length > 0) {
                    thisEditableMemberInput.dropDownListStatePersonInputObj.show();
                    thisEditableMemberInput.dropDownListStatePersonInputObj.parent().parent().removeClass('noInput');
                }
                $('.showOnView').hide();
            }
        };

        $('input, select', $(thisEditableMemberInput.globalSelector)).not('#' + thisEditableMemberInput.dropDownListStateOrgInput + ', #' + thisEditableMemberInput.dropDownListStatePersonInput)
            .toggleEdit(toggleEditArgs)
            .toggleEdit('preview');

        if (thisEditableMemberInput.dropDownListStateOrgInputObj.length > 0) {
            thisEditableMemberInput.dropDownListStateOrgInputView = $("<div class='showOnView'>" + $("option:selected", thisEditableMemberInput.dropDownListStateOrgInputObj).text() + "</div>")
                .insertAfter(thisEditableMemberInput.dropDownListStateOrgInputObj);
        }
        if (thisEditableMemberInput.dropDownListStatePersonInputObj.length > 0) {
            thisEditableMemberInput.dropDownListStatePersonInputView = $("<div class='showOnView'>" + $("option:selected", thisEditableMemberInput.dropDownListStatePersonInputObj).text() + "</div>")
                .insertAfter(thisEditableMemberInput.dropDownListStatePersonInputObj);
        }

        thisEditableMemberInput.toggleEditMode = 'preview';
    };

    thisEditableMemberInput.editLinkHandler = function (e) {
        e.preventDefault();
        if (thisEditableMemberInput.toggleEditMode == 'preview') {
            thisEditableMemberInput.toggleEditMode = 'edit';
        }
        else {
            thisEditableMemberInput.toggleEditMode = 'preview';
        }

            if (thisEditableMemberInput.dropDownListStateOrgInputObj.length > 0) {
                $('input, select', $(thisEditableMemberInput.globalSelector)).not('#' + thisEditableMemberInput.dropDownListStateOrgInput)
                        .toggleEdit(thisEditableMemberInput.toggleEditMode);
            }
            if (thisEditableMemberInput.dropDownListStatePersonInputObj.length > 0) {
                $('input, select', $(thisEditableMemberInput.globalSelector)).not('#' + thisEditableMemberInput.dropDownListStatePersonInput)
                        .toggleEdit(thisEditableMemberInput.toggleEditMode);
            }
    };

    thisEditableMemberInput.addEvents = function () {
        $(thisEditableMemberInput.editLinksSelector).click(function (e) {
            thisEditableMemberInput.editLinkHandler(e);
            $(thisEditableMemberInput.editLinksSelector).hide();
        });

        $('#' + thisEditableMemberInput.cancelButtonId).click(function (e) {
            $('form').each(function () {
                this.reset();
            });
            thisEditableMemberInput.editLinkHandler(e);
            $(thisEditableMemberInput.editLinksSelector).show();
        });
    };

    return thisEditableMemberInput;
};