/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

/*
    This file has been deprecated
    The seat map javascript is in unitMap.js
*/

var SeatMapCOGInput = function()
{
    this.instanceName = '';
    this.seatHintArray = new Array(350);
    this.activePassengerLegKey = null;
    this.passengerLegKeyArray = new Array();
    this.cssClassActive = "seatAssignmentActive";
    this.cssClassNotActive = "seatAssignmentNotActive";
    this.cssClassOccupied = "seatOccupied";
    this.cssClassSelected = "seatSelected";
    this.cssClassAvailable = "seatAvailable";
    this.cssClassShowAircraftConfiguration = "visible";
    this.cssClassHideAircraftConfiguration = "hidden";
    this.duplicateSeatText = "There was a problem selecting that seat";
    this.deselectSeatText = "Are you sure you want to deselect this seat?";
    this.couldNotFindPassengerText = "Could not find passenger";
    this.seatAssignErrorText = "There was an error assigning the seat";
    this.currentlyAssignedSeatArray = new Array();
    this.seatMapDivPrefix = "";
    this.seatMapCOGInputBodyId = "seatMapInputBodyId";
    this.seatMapCOGWaitDivId = "seatMapCOGWaitDivId";
    
    this.showControlBody = function()
    {
        var controlBodyId = this.getSeatMapCOGInputBodyId();
        var controlBody = document.getElementById(controlBodyId);
        if(controlBody != null)
        {
            if(controlBody.style)
            {
                controlBody.style.display = "block";
            }
        }
    };
    this.getInstanceName = function()
    {
        return this.instanceName;
    };
    this.setInstanceName = function(arg)
    {
        this.instanceName = arg;
    };
    this.getCouldNotFindPassengerText = function()
    {
        return this.couldNotFindPassengerText;
    };
    this.setCouldNotFindPassengerText = function(arg)
    {
        this.couldNotFindPassengerText = arg;
    };
    this.getSeatAssignErrorText = function()
    {
        return this.seatAssignErrorText;
    };
    this.setSeatAssignErrorText = function(arg)
    {
        this.seatAssignErrorText = arg;
    };
    this.getSeatMapCOGInputBodyId = function()
    {
        return this.seatMapCOGInputBodyId;
    };
    this.setSeatMapCOGInputBodyId = function(arg)
    {
        this.seatMapCOGInputBodyId = arg;
    };
    this.getSeatMapCOGWaitDivId = function()
    {
        return this.seatMapCOGWaitDivId;
    };
    this.setSeatMapCOGWaitDivId = function(arg)
    {
        this.seatMapCOGWaitDivId = arg;
    };
    this.showSeatMapCOGWaitDiv = function()
    {
        var seatMapWaitDivId = this.getSeatMapCOGWaitDivId();
        var seatMapWaitDiv = document.getElementById(seatMapWaitDivId);
        if(seatMapWaitDiv != null)
        {
            if(seatMapWaitDiv.style)
            {
                seatMapWaitDiv.style.display = "block";
            }
        }
    };
    this.hideSeatMapCOGWaitDiv = function()
    {
        var seatMapWaitDivId = this.getSeatMapCOGWaitDivId();
        var seatMapWaitDiv = document.getElementById(seatMapWaitDivId);
        if(seatMapWaitDiv != null)
        {
            if(seatMapWaitDiv.style)
            {
                seatMapWaitDiv.style.display = "none";
            }
        }
    };
    this.getDeselectSeatText = function()
    {
        return this.deselectSeatText;
    };
    this.setDeselectSeatText = function(arg)
    {
        this.deselectSeatText = arg;
    };
    this.getSeatMapDivPrefix = function()
    {
        return this.seatMapDivPrefix;
    };
    this.setSeatMapDivPrefix = function(arg)
    {
        this.seatMapDivPrefix = arg;
    };
    this.getActivePassengerLegKey = function()
    {
        return this.activePassengerLegKey;
    };
    this.setActivePassengerLegKey = function(arg)
    {
        this.activePassengerLegKey = arg;
    };
    this.getPassengerLegKeyArray = function()
    {
        return this.passengerLegKeyArray;
    };
    this.setPassengerLegKeyArray = function(arg)
    {
        this.passengerLegKeyArray = arg;
    };
    this.addNewPassengerLegKeyArrayElement = function(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId, seperator)
    {
        var passengerLegKey = new this.PassengerLegKey(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId, seperator);
        this.passengerLegKeyArray[this.passengerLegKeyArray.length] = passengerLegKey;
    };
    this.addNewPassengerLegKeyArrayElementByArray = function(paramArray)
    {
        this.addNewPassengerLegKeyArrayElement(
                                                paramArray['htmlId'],
                                                paramArray['passengerNumber'],
                                                paramArray['segmentOrLegKey'],
                                                paramArray['aircraftConfigurationId'],
                                                paramArray['aircraftConfigurationHtmlId'],
                                                paramArray['seperator']
                                                );
    };
    this.addNewPassengerLegKeyByObject = function(jsonObject)
    {
        var passengerLegKeyDefault = SeatMapCOGInput.getDefaultPassengerLegKey();
        $(this).extend(passengerLegKeyDefault, jsonObject);
        this.addNewPassengerLegKeyArrayElementByArray(passengerLegKeyDefault);
    };
    this.getCurrentlyAssignedSeatArray = function()
    {
        return this.currentlyAssignedSeatArray;
    };
    this.setCurrentlyAssignedSeatArray = function(arg)
    {
        this.currentlyAssignedSeatArray = arg;
    };
    this.addNewCurrentlyAssignedSeatArrayElement = function(row, column, legKey, passengerNumber)
    {
        if((row != "") && (column != ""))
        {
            var currentlyAssignedSeat = new this.CurrentlyAssignedSeat(row, column, legKey, passengerNumber);
            this.currentlyAssignedSeatArray[this.currentlyAssignedSeatArray.length] = currentlyAssignedSeat;
        }
    };
    this.addNewCurrentlyAssignedSeatArrayElementByArray = function(paramArray)
    {
        this.addNewCurrentlyAssignedSeatArrayElement(paramArray['row'], paramArray['column'], paramArray['segmentOrLegKey'], paramArray['passengerNumber'])
    };
    this.addNewCurrentlyAssignedSeatByObject = function(jsonObject)
    {
        var currentlyAssignedSeatDefault = SeatMapCOGInput.getDefaultCurrentlyAssignedSeat();
        $(this).extend(currentlyAssignedSeatDefault, jsonObject);
        this.addNewCurrentlyAssignedSeatArrayElementByArray(currentlyAssignedSeatDefault);
    };
    this.getCssClassActive = function()
    {
        return this.cssClassActive;
    };
    this.setCssClassActive = function(arg)
    {
        this.cssClassActive = arg;
    };
    this.getCssClassNotActive = function()
    {
        return this.cssClassNotActive;
    };
    this.setCssClassNotActive = function(arg)
    {
        this.cssClassNotActive = arg;
    };
    this.getCssClassOccupied = function()
    {
        return this.cssClassOccupied;
    };
    this.setCssClassOccupied = function(arg)
    {
        this.cssClassOccupied = arg;
    };
    this.getCssClassSelected = function()
    {
        return this.cssClassSelected;
    };
    this.setCssClassSelected = function(arg)
    {
        this.cssClassSelected = arg;
    };
    this.getCssClassAvailable = function()
    {
        return this.cssClassAvailable;
    };
    this.setCssClassAvailable = function(arg)
    {
        this.cssClassAvailable = arg;
    };
    this.getCssClassShowAircraftConfiguration = function()
    {
        return this.cssClassShowAircraftConfiguration;
    };
    this.setCssClassShowAircraftConfiguration = function(arg)
    {
        this.cssClassShowAircraftConfiguration = arg;
    };
    this.getCssClassHideAircraftConfiguration = function()
    {
        return this.cssClassHideAircraftConfiguration;
    };
    this.setCssClassHideAircraftConfiguration = function(arg)
    {
        this.cssClassHideAircraftConfiguration = arg;
    };
    this.getDuplicateSeatText = function()
    {
        return this.duplicateSeatText;
    };
    this.setDuplicateSeatText = function(arg)
    {
        this.duplicateSeatText = arg;
    };

    this.getSeatHintArray = function()
    {
        return this.seatHintArray;
    };
    this.setSeatHintArray = function(arg)
    {
        this.seatHintArray = arg;
    };
    this.addSeatHintArrayElement = function(element)
    {
        this.seatHintArray[this.seatHintArray.length] = element;
    };
    this.addSeatHintArrayElementById = function(elementId)
    {
        var element = $('#' + elementId).get(0);
        if (element != null)
        {
            this.seatHintArray[this.seatHintArray.length] = element;
        }
    };
    
    this.addPassengerLegKeyEvents = function ()
    {
        var instanceName = this.getInstanceName();
        var passengerLegKeyArray = this.getPassengerLegKeyArray();
        var thisCopy = this;
        $(passengerLegKeyArray).each
        (
            function (index)
			{	
			    var passengerLegKey = this;
			    var htmlObj = passengerLegKey.getHtmlObj();
				$(htmlObj).click
				(
					function ()
					{
						thisCopy.activatePassengerAndLegKey(
						                                            passengerLegKey.getHtmlId(),
						                                            passengerLegKey.getPassengerNumber(),
						                                            passengerLegKey.getLegKey(),
						                                            passengerLegKey.getAircraftConfigurationId(),
						                                            passengerLegKey.getAircraftConfigurationHtmlId()
						                                            );
			            return false;
					}
				);
			}
        );
        
        
    };
    
    this.addCurrentlyAssignedSeatEvents = function ()
    {
        var seatArray = this.getCurrentlyAssignedSeatArray();
        var i = 0;
        var seat = null;
        var thisCopy = this;
        var seatHtmlId = "";
        var passengerLegKey = thisCopy.getActivePassengerLegKey();
        var jsonObject = {};
        for (i = 0; i < seatArray.length; i += 1)
        {
            seat = seatArray[i];
            seatHtmlId = this.getSeatMapDivPrefix() + passengerLegKey.getAircraftConfigurationId() + seat['column'] + seat['row'];
            jsonObject = {
                            seatMapDivId: seatHtmlId,
                            column: seat['column'],
                            row: seat['row'],
                            aircraftConfigurationNumber: passengerLegKey.getAircraftConfigurationId(),
                            seatStatus: 'AVAILABLE'
                            };
            this.addaddCurrentlyAssignedSeatEvent(jsonObject);
        }
    };
    
    this.addaddCurrentlyAssignedSeatEvent = function (jsonObject)
    {
        var thisCopy = this;
        var objName = this.getInstanceName();
        var seatHintDefault = SeatMapCOGInput.getDefaultSeatHint();
        $(this).extend(seatHintDefault, jsonObject);
        var jQuerySeatDiv = $('#' + seatHintDefault['seatMapDivId']);

        jQuerySeatDiv.click
        (
            function ()
            {
               thisCopy.assignSeat(seatHintDefault['seatMapDivId'], seatHintDefault['column'], seatHintDefault['row'], seatHintDefault['aircraftConfigurationNumber']);
               return false;
            }
        );
    };
    
    this.addSeatHintEventsByObject = function(jsonObject)
    {
        var objName = this.getInstanceName();
        var seatHintDefault = SeatMapCOGInput.getDefaultSeatHint();
        $(this).extend(seatHintDefault, jsonObject);
        var jQuerySeatDiv = $('#' + seatHintDefault['seatMapDivId']);
        var jQuerySeatHint = $('#' + seatHintDefault['seatHintId']);
        
        jQuerySeatDiv.hover
        (
            function ()
            {
                jQuerySeatHint.show();
                return false;
            },
            function ()
            {
                jQuerySeatHint.hide();
                return false;
            }
        );
        
        if (seatHintDefault['seatStatus'] == 'AVAILABLE')
        {
            var thisCopy = this;
            jQuerySeatDiv.click
            (
                function ()
                {
                   thisCopy.assignSeat(seatHintDefault['seatMapDivId'], seatHintDefault['column'], seatHintDefault['row'], seatHintDefault['aircraftConfigurationNumber']);
                   return false;
                }
            );
        }
    };
    
    this.activatePassengerAndLegKey = function(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId)
    {
        this.deactivateAllPassengerAndLegKey();
        var activePassengerLegKey = this.findPassengerLegKey(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId);
        if(activePassengerLegKey != null)
        {
            this.setActivePassengerLegKey(activePassengerLegKey);
            var activeHtmlObj = activePassengerLegKey.getHtmlObj();
            if(activeHtmlObj != null)
            {
                activeHtmlObj.className = this.getCssClassActive();
            }
            this.showSeatMapCOGWaitDiv();
            setTimeout(this.getInstanceName() + ".activatePassengerAndLegKeyAfterDelay('" + htmlId + "', '" + passengerNumber + "', '" + legKey + "', '" + aircraftConfigurationId + "', '" + aircraftConfigurationHtmlId + "')", 500);
        }
    };
    
    this.activatePassengerAndLegKeyAfterDelay = function(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId)
    {
        var activePassengerLegKey = this.findPassengerLegKey(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId);
        if(activePassengerLegKey != null)
        {
            var aircraftConfigurationHtmlObj = activePassengerLegKey.getAircraftConfigurationHtmlObj();
            if(aircraftConfigurationHtmlObj != null)
            {
                aircraftConfigurationHtmlObj.className = this.getCssClassShowAircraftConfiguration();
            }
            this.hideSeatMapCOGWaitDiv();
            var passengerLegKeyArray = this.getPassengerLegKeyArray();
            for(var i = 0; i < passengerLegKeyArray.length; i++)
            {
                var passengerLegKey = passengerLegKeyArray[i];
                var seat = passengerLegKey.getAssignedSeat();
                
                if(seat == null)
                {
                    var htmlObjValue = "";
                    var htmlObj = passengerLegKey.getHtmlObj();
                    if(htmlObj != null)
                    {
                        htmlObjValue = htmlObj.value;
                    }
                    var row = "";
                    var rowMatchArray = htmlObjValue.match(/([0-9]+)/);
                    if ((rowMatchArray != null) && (rowMatchArray.length > 0))
                    {
                        row = rowMatchArray[0];
                    }
                    var column = "";
                    var columnMatchArray = htmlObjValue.match(/([a-zA-Z]+)/);
                    if ((columnMatchArray != null) && (columnMatchArray.length > 0))
                    {
                        column = columnMatchArray[0];
                    }

                    if((row != "") && (column != ""))
                    {
                        var seatHtmlId = this.getSeatMapDivPrefix() + passengerLegKey.getAircraftConfigurationId() + column + row;
                        seat = new this.Seat(
                                                passengerLegKey.getAircraftConfigurationId(),
                                                column,
                                                row,
                                                seatHtmlId,
                                                this.Seat.getAvailableStatus(),
                                                passengerLegKey.getPassengerNumber()
                                                );
                        passengerLegKey.setAssignedSeat(seat);
                    }
                }
                if(seat != null)
                {
                    if(activePassengerLegKey.isEqualTo(passengerLegKey))
                    {
                        seat.setStatus(this.Seat.getAvailableStatus());
                        var seatHtmlObj = seat.getHtmlObj();
                        if(seatHtmlObj != null)
                        {
                            seatHtmlObj.className = this.getCssClassSelected();
                        }
                    }
                    else
                    {
                        seat.setStatus(this.Seat.getOccupiedStatus());
                        var seatHtmlObj = seat.getHtmlObj();
                        if(seatHtmlObj != null)
                        {
                            seatHtmlObj.className = this.getCssClassOccupied();
                        }
                    }
                }
            }
        }
        else
        {
            alert(this.getCouldNotFindPassengerText());
        }
    };
    
    this.activateFirstPassengerLegKey = function()
    {
        var passengerLegKeyArray = this.getPassengerLegKeyArray();
        var passengerLegKey = passengerLegKeyArray[0];
        if(passengerLegKey != null)
        {
            this.activatePassengerAndLegKey(
                                                passengerLegKey.getHtmlId(),
                                                passengerLegKey.getPassengerNumber(),
                                                passengerLegKey.getLegKey(),
                                                passengerLegKey.getAircraftConfigurationId(),
                                                passengerLegKey.getAircraftConfigurationHtmlId()
                                                );
        }
    };
    
    this.deactivateAllPassengerAndLegKey = function()
    {
        var passengerLegKeyArray = this.getPassengerLegKeyArray();
        for(var i = 0; i < passengerLegKeyArray.length; i++)
        {
            var passengerLegKey = passengerLegKeyArray[i];
            var htmlObj = passengerLegKey.getHtmlObj();
            if(htmlObj != null)
            {
                htmlObj.className = this.getCssClassNotActive();
            }
            var aircraftConfigurationHtmlObj = passengerLegKey.getAircraftConfigurationHtmlObj();
            if(aircraftConfigurationHtmlObj != null)
            {
                aircraftConfigurationHtmlObj.className = this.getCssClassHideAircraftConfiguration();
            }
        }
    };
    
    this.findPassengerLegKey = function(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId)
    {
        var foundPassengerLegKey = null;
        var newPassengerLegKey = new this.PassengerLegKey(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId);
        var passengerLegKeyArray = this.getPassengerLegKeyArray();
        for(var i = 0; i < passengerLegKeyArray.length; i++)
        {
            var passengerLegKey = passengerLegKeyArray[i];
            if(passengerLegKey.isEqualTo(newPassengerLegKey))
            {
                foundPassengerLegKey = passengerLegKey;
            }
        }
        return foundPassengerLegKey;
    };
    
    this.PassengerLegKey = function(htmlId, passengerNumber, legKey, aircraftConfigurationId, aircraftConfigurationHtmlId, passengerLegKeySeperator)
    {
        this.htmlId = htmlId;
        this.passengerNumber = passengerNumber;
        this.legKey = legKey;
        this.aircraftConfigurationId = aircraftConfigurationId;
        this.aircraftConfigurationHtmlId = aircraftConfigurationHtmlId;
        this.passengerLegKeySeperator = passengerLegKeySeperator;
        this.assignedSeat = null;
        this.passengerLegId = null;
        this.htmlObj = null;
        
        this.getPassengerLegKeySeperator = function()
        {
            if(this.passengerLegKeySeperator == null)
            {
                this.passengerLegKeySeperator = '|';
            }
            return this.passengerLegKeySeperator;
        }
        this.setPassengerLegKeySeperator = function(arg)
        {
            this.passengerLegKeySeperator = arg;
        }
        this.getPassengerNumber = function()
        {
            return this.passengerNumber;
        }
        this.setPassengerNumber = function(arg)
        {
            this.passengerNumber = arg;
        }
        this.getLegKey = function()
        {
            return this.legKey;
        }
        this.setLegKey = function(arg)
        {
            this.legKey = arg;
        }
        this.getHtmlId = function()
        {
            return this.htmlId;
        }
        this.setHtmlId = function(arg)
        {
            this.htmlId = arg;
        }
        this.getHtmlObj = function()
        {
            if(this.htmlObj == null)
            {
                var htmlId = this.getHtmlId();
                if ((htmlId != null) && (htmlId.length > 0))
                {
                    this.htmlObj = document.getElementById(htmlId);
                }
            }
            return this.htmlObj;
        }
        this.setHtmlObj = function(arg)
        {
            this.htmlObj = arg;
        }
        
        this.getAssignedSeat = function()
        {
            return this.assignedSeat;
        }
        this.setAssignedSeat = function(arg)
        {
            this.assignedSeat = arg;
        }
        this.setAndUpdateAssignedSeat = function(arg)
        {
            this.setAssignedSeat(arg);
            var htmlObj = this.getHtmlObj();
            if(htmlObj != null)
            {
                var seat = this.getAssignedSeat();
                var seatNumber = seat.getRow() + seat.getColumn();
                htmlObj.value = seatNumber;
            }
        }
    
        this.getPassengerLegKeyId = function()
        {
            if(this.passengerLegId == null)
            {
                var seperator = this.getPassengerLegKeySeperator();
                var htmlId = this.getHtmlId();
                var passengerNumber = this.getPassengerNumber();
                var legKey = this.getLegKey();
                var aircraftConfigurationId = this.getAircraftConfigurationId();
                this.passengerLegId = htmlId + seperator + passengerNumber + seperator + legKey + seperator + aircraftConfigurationId;
            }
            return this.passengerLegId;
        }
        
        this.isEqualTo = function(passengerLegKey)
        {
            var isEqual = false;
            
            if(this.getPassengerLegKeyId() == passengerLegKey.getPassengerLegKeyId())
            {
               isEqual = true;
            }
            return isEqual;
        }
        
        this.getAircraftConfigurationId = function()
        {
            return this.aircraftConfigurationId;
        }
        this.setAircraftConfigurationId = function(arg)
        {
            this.aircraftConfigurationId = arg;
        }
        this.getAircraftConfigurationHtmlId = function()
        {
            return this.aircraftConfigurationHtmlId;
        }
        this.setAircraftConfigurationHtmlId = function(arg)
        {
            this.aircraftConfigurationHtmlId = arg;
        }
        this.getAircraftConfigurationHtmlObj = function()
        {
            if(this.aircraftConfigurationHtmlObj == null)
            {
                var aircraftConfigurationHtmlId = this.getAircraftConfigurationHtmlId();
                if ((aircraftConfigurationHtmlId != null) && (aircraftConfigurationHtmlId.length > 0))
                {
                    this.aircraftConfigurationHtmlObj = document.getElementById(aircraftConfigurationHtmlId);
                }
            }
            return this.aircraftConfigurationHtmlObj;
        }
        this.setAircraftConfigurationHtmlObj = function(arg)
        {
            this.aircraftConfigurationHtmlObj = arg;
        }
    };
    
    this.Seat = function(aircraftConfigurationId, column, row, htmlId, status, passengerNumber)
    {
        this.aircraftConfigurationId= aircraftConfigurationId;
        this.column = column;
        this.row = row;
        this.htmlId = htmlId;
        this.status = status;
        this.passengerNumber = passengerNumber;
        this.htmlObj = null;
        this.jqueryObj = null;
        
        
        this.getPassengerNumber = function()
        {
            return this.passengerNumber;
        }
        this.setPassengerNumber = function(arg)
        {
            this.passengerNumber = arg;
        }
        this.getAircraftConfigurationId = function()
        {
            return this.aircraftConfigurationId;
        }
        this.setAircraftConfigurationId = function(arg)
        {
            this.aircraftConfigurationId = arg;
        }
        this.getColumn = function()
        {
            return this.column;
        }
        this.setColumn = function(arg)
        {
            this.column = arg;
        }
        this.getRow = function()
        {
            return this.row;
        }
        this.setRow = function(arg)
        {
            this.row = arg;
        }
        this.getHtmlId = function()
        {
            return this.htmlId;
        }
        this.setHtmlId = function(arg)
        {
            this.htmlId = arg;
        }
        
        this.getHtmlObj = function()
        {
            if(this.htmlObj == null)
            {
                var htmlId = this.getHtmlId();
                if(htmlId.length > 0)
                {
                    this.htmlObj = document.getElementById(htmlId);
                }
            }
            return this.htmlObj;
        }
        this.getJqueryObj = function()
        {
            if(this.jqueryObj == null)
            {
                var htmlId = this.getHtmlId();
                if ((htmlId != null) &&(htmlId.length > 0))
                {
                    this.jqueryObj = $('#' + htmlId);
                }
            }
            return this.jqueryObj;
        }
        this.setHtmlObj = function(arg)
        {
            this.htmlObj = arg;
        }
        this.getStatus = function()
        {
            if (this.status == null)
            {
                this.status = this.getOccupiedStatus();
            }
            return this.status;
        }
        this.setStatus = function(arg)
        {
            this.status = arg;
        }
        
        this.setClassName = function(arg)
        {
            var jqueryObj = this.getJqueryObj();
            if(jqueryObj != null)
            {
                jqueryObj.removeClass();
                jqueryObj.toggleClass(arg);
            }
            return false;
        }
        this.getClassName = function()
        {
            var jqueryObj = this.getJqueryObj();
            var retVal = '';
            if(jqueryObj != null)
            {
                retVal = jqueryObj.attr('class');
            }
            return retVal;
        }
        this.isEqualTo = function(seat)
        {
            var isEqualTo = false;
            if(
                    this.getAircraftConfigurationId() == seat.getAircraftConfigurationId() &&
                    this.getHtmlId() == seat.getHtmlId() &&
                    this.getColumn() == seat.getColumn() &&
                    this.getRow() == seat.getRow()
                    )
            {
                isEqualTo = true;
            }
            return isEqualTo;
        }
    };
    /* start static seat functions */
    this.Seat.getOccupiedStatus = function()
    {
        return 'occupied';
    };
    this.Seat.getAvailableStatus = function()
    {
        return 'available';
    };
    /* end static seat functions */
    
    this.CurrentlyAssignedSeat = function(row, column, legKey, passengerNumber)
    {
        this.row = row;
        this.column = column;
        this.legKey = legKey;
        this.passengerNumber = passengerNumber;
    
        this.getRow = function()
        {
            return this.row;
        }
        this.setRow = function(arg)
        {
            this.row = arg;
        }
        this.getColumn = function()
        {
            return this.column;
        }
        this.setColumn = function(arg)
        {
            this.column = arg;
        }
        this.getLegKey = function()
        {
            return this.legKey;
        }
        this.setLegKey = function(arg)
        {
            this.legKey = arg;
        }
        this.getPassengerNumber = function()
        {
            return this.passengerNumber;
        }
        this.setPassengerNumber = function(arg)
        {
            this.passengerNumber = arg;
        }
        
        this.isEqualTo = function(obj)
        {
            var isEqual = false;
            if(
                (this.getRow() == obj.getRow()) &&
                (this.getColumn() == obj.getColumn()) &&
                (this.getLegKey() == obj.getLegKey()) &&
                (this.getPassengerNumber() == obj.getPassengerNumber())
                )
            {
                isEqual = true;
            }
            return isEqual;
        }
    };
    
    this.checkDuplicateSeat = function(activePassengerLegKey, selectedSeat)
    {
        var isDuplicateSeat = false;
        var passengerLegKeyArray = this.getPassengerLegKeyArray();
        for(var i = 0; i < passengerLegKeyArray.length; i++)
        {
            var passengerLegKey = passengerLegKeyArray[i];
            if (!passengerLegKey.isEqualTo(activePassengerLegKey))
            {
                var duplicateSeat = passengerLegKey.getAssignedSeat();
                if(duplicateSeat != null)
                {
                    if(selectedSeat.isEqualTo(duplicateSeat))
                    {
                        isDuplicateSeat = true;
                        break;
                    }
                }
            }
        }
        return isDuplicateSeat;
    };
    
    this.assignSeat = function(htmlId, column, row, aircraftConfigurationId)
    {
        //alert(htmlId + "\n" + column + "\n" + row + "\n" + aircraftConfigurationId);
        var activePassengerLegKey = this.getActivePassengerLegKey();
        if(activePassengerLegKey != null)
        {
            var seatAssigned = activePassengerLegKey.getAssignedSeat();
            var selectedSeat = new this.Seat(aircraftConfigurationId, column, row, htmlId, this.Seat.getAvailableStatus(), activePassengerLegKey.getPassengerNumber());
            
            var isDuplicateSeat = this.checkDuplicateSeat(activePassengerLegKey, selectedSeat);
            
            if(isDuplicateSeat)
            {
                alert(this.getDuplicateSeatText());
            }
            else if ((seatAssigned != null) && (seatAssigned.isEqualTo(selectedSeat)))
            {
                if(confirm(this.getDeselectSeatText()))
                {
                    this.clearAssignedSeat(activePassengerLegKey);
                }
            }
            else
            {
                var currentlyAssignedSeatArray = this.getCurrentlyAssignedSeatArray();
                if(seatAssigned != null)
                {
                    seatAssigned.setClassName(this.getCssClassAvailable());
                    seatAssigned.setStatus(this.Seat.getAvailableStatus());
                    this.clearAssignedSeat(activePassengerLegKey);
                }
                selectedSeat.setClassName(this.getCssClassSelected());
                activePassengerLegKey.setAndUpdateAssignedSeat(selectedSeat);
                
                var activeCurrentlyAssignedSeat = new this.CurrentlyAssignedSeat(
                                                                                selectedSeat.getRow(),
                                                                                selectedSeat.getColumn(), 
                                                                                activePassengerLegKey.getLegKey(), 
                                                                                activePassengerLegKey.getPassengerNumber()
                                                                                );
                currentlyAssignedSeatArray[currentlyAssignedSeatArray.length] = activeCurrentlyAssignedSeat;
                this.setCurrentlyAssignedSeatArray(currentlyAssignedSeatArray);
            }
        }
        else
        {
            alert(this.getSeatAssignErrorText());
        }
        return false;
    };
    
    this.clearAssignedSeat = function(passengerLegKey)
    {
        var seatAssigned = passengerLegKey.getAssignedSeat();
        if(seatAssigned != null)
        {
            seatAssigned.setClassName(this.getCssClassAvailable());
            var currentlyAssignedSeatArray = this.getCurrentlyAssignedSeatArray();
            for(var i = 0; i < currentlyAssignedSeatArray.length; i++)
            {
                var currentlyAssignedSeat = currentlyAssignedSeatArray[i];
                var activeCurrentlyAssignedSeat = new this.CurrentlyAssignedSeat(
                                                                                seatAssigned.getRow(),
                                                                                seatAssigned.getColumn(), 
                                                                                passengerLegKey.getLegKey(), 
                                                                                passengerLegKey.getPassengerNumber()
                                                                                );
                if(currentlyAssignedSeat.isEqualTo(activeCurrentlyAssignedSeat))
                {
                    currentlyAssignedSeatArray.splice(i, 1);
                    this.setCurrentlyAssignedSeatArray(currentlyAssignedSeatArray);
                    break;
                }
            }
            passengerLegKey.setAssignedSeat(null);
            var htmlObj = passengerLegKey.getHtmlObj();
            if(htmlObj != null)
            {
                htmlObj.value = "";
            }
        }
    };
    
    this.setSettingByArray = function(settingArray)
    {
        this.setCssClassActive(settingArray['cssClassActive']);
        this.setCssClassNotActive(settingArray['cssClassNotActive']);
        this.setCssClassOccupied(settingArray['cssClassOccupied']);
        this.setCssClassSelected(settingArray['cssClassSelected']);
        this.setCssClassAvailable(settingArray['cssClassAvailable']);
        this.setCssClassShowAircraftConfiguration(settingArray['cssClassShowAircraftConfiguration']);
        this.setCssClassHideAircraftConfiguration(settingArray['cssClassHideAircraftConfiguration']);
        this.setSeatMapDivPrefix(settingArray['seatMapDivPrefix']);
        this.setSeatMapCOGInputBodyId(settingArray['seatMapCOGInputBodyId']);
        this.setSeatMapCOGWaitDivId(settingArray['seatMapCOGWaitDivId']);
        this.setDuplicateSeatText(settingArray['duplicateSeatText']);
        this.setDeselectSeatText(settingArray['deselectSeatText']);
        this.setCouldNotFindPassengerText(settingArray['couldNotFindPassengerText']);
    };
    
    this.setSettingByObject = function(jsonObject)
    { 
        var settingDefault = SeatMapCOGInput.getDefaultSetting();
        $(this).extend(settingDefault, jsonObject);
        this.setSettingByArray(settingDefault);
    };
}

SeatMapCOGInput.varDump = function (obj)
{
    if (obj != null)
    {
        var str = '';
        var tmp = '';
        for (tmp in obj)
        {
            str = str + "\n" + tmp + " = " + obj[tmp];
        }
        alert(str);
    }
    else
    {
        alert("null");
    }
};

SeatMapCOGInput.initializeNewSeatMapCOGInput = function()
{
        $(document).ready
        (
            function()
            {
                $('div.SeatMapCOGInput').each
                (
                    function(index)
                    {
                        var jQueryObj = $(this);
                        var objNameBase = $(this).attr('id');
                        var objName = objNameBase + index;
                        var obj = eval('window.' + objName + '= new SeatMapCOGInput();');
                        obj.setInstanceName(objName);                     
                        
                        //Add The Settings
                        $('object.jsObject > param', $(this)).each
                        (
                            function(index)
                            {
                                try
                                {
                                    eval('(' + 'obj.' + $(this).val() + ');');
                                }
                                catch (e)
                                {
                                }
                            }
                        )
                        
                        // Add The Event Handlers
                        obj.addPassengerLegKeyEvents();
                        obj.activateFirstPassengerLegKey();
                        obj.addCurrentlyAssignedSeatEvents();
                        obj.showControlBody();
                        
                    }
                )
            }
        );
        return false;
};

SeatMapCOGInput.getDefaultSetting = function()
{
    var defaultSetting = {
                                cssClassActive:'seatAssignmentActive',
                                cssClassNotActive:'seatAssignmentNotActive',
                                cssClassOccupied:'seatOccupied',
                                cssClassSelected:'seatSelected',
                                cssClassAvailable:'seatAvailable',
                                cssClassShowAircraftConfiguration:'visible',
                                cssClassHideAircraftConfiguration:'hidden',
                                seatMapDivPrefix:'',
                                seatMapCOGInputBodyId:'seatMapCOGInputBodyId',
                                seatMapCOGWaitDivId:'seatMapCOGWaitDivId',
                                duplicateSeatText:'There was a problem selecting that seat',
                                deselectSeatText:'Are you sure you want to deselect this seat?',
                                couldNotFindPassengerText:'Could not find passenger',
                                seatAssignErrorText:'There was an error assigning the seat'
                            };
    return defaultSetting;
};

SeatMapCOGInput.getDefaultPassengerLegKey = function()
{
    var defaultPassengerLegKey = {
                                    htmlId:'',
                                    passengerNumber:'',
                                    segmentOrLegKey:'',
                                    aircraftConfigurationId:'',
                                    aircraftConfigurationHtmlId:'',
                                    seperator:null
                                };
    return defaultPassengerLegKey;
};

SeatMapCOGInput.getDefaultSeatHint = function()
{
    var defaultSeatHint = {
                                seatHintId:'',
                                seatMapDivId:'',
                                column:'',
                                row:'',
                                aircraftConfigurationNumber:'',
                                seatStatus:''
                            };
    return defaultSeatHint;
};

SeatMapCOGInput.getDefaultCurrentlyAssignedSeat = function()
{
    var defaultCurrentlyAssignedSeat = {
                                            row:'',
                                            column:'',
                                            segmentOrLegKey:'',
                                            passengerNumber:''
                                        };
    return defaultCurrentlyAssignedSeat;
};

SeatMapCOGInput.initializeNewSeatMapCOGInput();

        
