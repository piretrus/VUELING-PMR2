



VUELING.Class.ToggleAtAGlance = function () {
    var parent = new SKYSALES.Class.SkySales(),
        thisToggleAtAGlance = SKYSALES.Util.extendObject(parent);
    thisToggleAtAGlance.openImageUrl = '';
    thisToggleAtAGlance.closeImageUrl = '';
    thisToggleAtAGlance.flightAndPaxDetailsToggleButtonId = '';
    thisToggleAtAGlance.flightAndPaxDetailsToggleButton = null; // Flight and Pax Details Toggle Button DIV -- $("#flightAndPaxDetailsToggleButton")
    thisToggleAtAGlance.atAGlanceToggleButtonId = '';
    thisToggleAtAGlance.atAGlanceToggleButton = null;       // At A Glance Toggle button DIV -- $('#atAGlanceToggleButton')
    //thisToggleAtAGlance.flightAndPaxDetailsId = '';
    //thisToggleAtAGlance.flightAndPaxDetails = null;         // Flight and Pax details DIV -- $('#flightAndPaxDetails')
    //thisToggleAtAGlance.yourTripsHeaderId = '';
    //thisToggleAtAGlance.yourTripsHeader = null;             // Your Trips Header DIV -- $('#yourTripsHeader')
    //thisToggleAtAGlance.tripDisplayTemplateId = '';
    //thisToggleAtAGlance.tripDisplayTemplate = null;         // Trip Display Template DIV -- $('#tripDisplayTemplate')


    // Init method for this class
    thisToggleAtAGlance.init = function (paramObj) {
        this.setSettingsByObject(paramObj);
        this.setVars();
        this.addEvents();
    };

    // Set additional variables needed for this class
    thisToggleAtAGlance.setVars = function () {
        parent.setVars.call(this);
        thisToggleAtAGlance.flightAndPaxDetailsToggleButton = this.getById(this.flightAndPaxDetailsToggleButtonId);
        thisToggleAtAGlance.atAGlanceToggleButton = this.getById(this.atAGlanceToggleButtonId);
        //this.flightAndPaxDetails = this.getById(this.flightAndPaxDetailsId);
        //this.yourTripsHeader = this.getById(this.yourTripsHeaderId);
        //this.tripDisplayTemplate = this.getById(this.tripDisplayTemplateId);
    };

    // Add events for the links objects on the control
    thisToggleAtAGlance.addEvents = function () {
        parent.addEvents.call(this);
        thisToggleAtAGlance.flightAndPaxDetailsToggleButton.click(thisToggleAtAGlance.toggleAtAGlanceEvent);
        thisToggleAtAGlance.atAGlanceToggleButton.click(thisToggleAtAGlance.toggleAtAGlanceEvent);
    };


    // Event handler for the At A Glance toggle button. 
    // TODO:  Using class objects in this function is problematic, because 
    //        the objects referenced in this function are updated via ajax triggered by user
    //        action on the control.  So the elements we are checking in this method (#flightAndPaxDetails, #yourTripsHeader, etc)
    //        are updated by ajax, and this class loads these items from the DOM at page load, so the ajax
    //        call would need to update the objects in this class.  So that is what needs to be done:
    //          1.  Use class objects (instead of jQuery refs) for the items herein (#flightAndPaxDetails ==> thisToggleAtAGlance.flightAndPaxDetails,
    //              #yourTripsHeader ==> thisToggleAtAGlance.yourTripsHeader, etc)
    //          2.  Update the class objects when the ajax is executed
    thisToggleAtAGlance.toggleAtAGlanceEvent = function () {
        if ($('#flightAndPaxDetails').html() != '') {
            $('#flightAndPaxDetails').toggle();                     // Toggle flight and pax details
            $('#yourTripsHeader').toggle();                         // Toggle trips header
            $('#tripDisplay').toggle();                             // Toggle trip display template
            //$('div.atAGlanceContainer .expander').toggle();         // Toggle total display

            if ($('#flightAndPaxDetails').is(':visible')) {   // Toggle the toggle button image
                thisToggleAtAGlance.atAGlanceToggleButton.attr("src", thisToggleAtAGlance.closeImageUrl);
                thisToggleAtAGlance.atAGlanceToggleButton.parent().addClass("toggleButtonClose");
                $('#arrIATAImgContainer, #atAGlanceImageCaption').show(); // Toggle img
            } else {
                thisToggleAtAGlance.atAGlanceToggleButton.attr("src", thisToggleAtAGlance.openImageUrl);
                thisToggleAtAGlance.atAGlanceToggleButton.parent().removeClass("toggleButtonClose");
                $('#arrIATAImgContainer, #atAGlanceImageCaption').hide(); // Toggle img
            }
        }
        return false;
    };

    return thisToggleAtAGlance;
};