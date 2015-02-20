

VUELING.Class.CanalIndirectoInputWhiteLabel = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisCanalIndirectoInputWhiteLabel = SKYSALES.Util.extendObject(parent);

    thisCanalIndirectoInputWhiteLabel.sectionId = '';
    thisCanalIndirectoInputWhiteLabel.modifyLinkId = '';
    thisCanalIndirectoInputWhiteLabel.buttonDivId = '';

    thisCanalIndirectoInputWhiteLabel.modifyLink = null;
    thisCanalIndirectoInputWhiteLabel.buttonDiv = null;

    thisCanalIndirectoInputWhiteLabel.inputs = "input[type='text'],input[type='radio'],select";
    thisCanalIndirectoInputWhiteLabel.toggleEditMode = '';
    thisCanalIndirectoInputWhiteLabel.elements = null;

    thisCanalIndirectoInputWhiteLabel.setVars = function () {
        parent.setVars.call(this);
        this.modifyLink = this.getById(this.modifyLinkId);
        this.elements = $('#' + this.sectionId).find(this.inputs);
        this.buttonDiv = this.getById(this.buttonDivId);
    };

    thisCanalIndirectoInputWhiteLabel.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
        this.initToggle();
    };

    thisCanalIndirectoInputWhiteLabel.addEvents = function () {
        parent.addEvents.call(this);
        this.modifyLink.click(this.toggleEditClickHandler);
    };

    // Initialize the TOGGLE function
    thisCanalIndirectoInputWhiteLabel.initToggle = function () {

        var toggleEditArgs = {
            eventsEnabled: false,
            copyCss: false,
            onpreview: function (e, ui) {
                //hide the styled dropdowns as well as the real dropdown
                if (ui.element[0].localName === 'select') {
                    ui.element.siblings('a').hide();
                }
            },
            onedit: function (e, ui) {
                //hide real dropdowns, show styled ones (if exists)
                if (ui.element[0].localName === 'select') {
                    if (ui.element.siblings('a').length > 0) {
                        ui.element.siblings('a').show();
                        ui.element.hide();
                    }
                }
            }
        };

        if (thisCanalIndirectoInputWhiteLabel.elements !== null) {

            var toggleedit = "preview";
            $(thisCanalIndirectoInputWhiteLabel.elements).each(function () {
                if ($(this).attr("type") == "text" && $(this).val() == "") {
                    toggleedit = "edit";
                }
            });

            $(thisCanalIndirectoInputWhiteLabel.elements)
                .toggleEdit(toggleEditArgs)
                .toggleEdit(toggleedit);

            thisCanalIndirectoInputWhiteLabel.toggleEditMode = toggleedit;
            if (toggleedit == "preview") {
                $(thisCanalIndirectoInputWhiteLabel.buttonDiv[0]).hide();
                thisCanalIndirectoInputWhiteLabel.modifyLink.show();
            } else {
                thisCanalIndirectoInputWhiteLabel.buttonDiv.show();
                thisCanalIndirectoInputWhiteLabel.modifyLink.hide();
            }
        }
    };

    thisCanalIndirectoInputWhiteLabel.toggleEditClickHandler = function () {
        if (thisCanalIndirectoInputWhiteLabel.toggleEditMode == 'preview') {
            thisCanalIndirectoInputWhiteLabel.toggleEditMode = 'edit';
            thisCanalIndirectoInputWhiteLabel.buttonDiv.show();
            thisCanalIndirectoInputWhiteLabel.modifyLink.hide();
        } else {
            thisCanalIndirectoInputWhiteLabel.toggleEditMode = 'preview';
            thisCanalIndirectoInputWhiteLabel.buttonDiv.hide();
            thisCanalIndirectoInputWhiteLabel.modifyLink.show();
        }
        $(thisCanalIndirectoInputWhiteLabel.elements).toggleEdit(thisCanalIndirectoInputWhiteLabel.toggleEditMode);
    };

    return thisCanalIndirectoInputWhiteLabel;
};