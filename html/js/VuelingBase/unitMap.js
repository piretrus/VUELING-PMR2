/*!
    This file is part of the Navitaire NewSkies application.
    Copyright (C) Navitaire.  All rights reserved.
*/

/*
    Dependencies:
        This file depends on other JavaScript files to be there at run time.
        
        jquery.js:
            $ is a jquery variable
        common.js:
            SKYSALES namespace is used to avoid name collisions.
            The Dhtml class is used to position items.

    General Notes:
        This JavaScript file handles the browser interaction for the seat map and the auto assign controls.
        It draws the seat map from a JSON object of the equipment.
        
        The XSLT defines a static function called SKYSALES.Class.UnitMapContainer.createUnitMapContainer.
        The code execution for this file begins when the XSLT calls SKYSALES.Class.UnitMapContainer.createUnitMapContainer on dom ready.
        The SKYSALES.Class.UnitMapContainer.createUnitMapContainer function creates a new SKYSALES.Class.UnitMapContainer which is defined in this file,
        and then calls unitMapcontainer.init(json). The JSON parameter here is all of the JSON data used by this file.
        In the unitMapContainer init method the JSON is turned into objects that are defined in this file.
        The JSON is then deleted from memory as it is no longer needed.
    
        This file makes an attempt to not write html with JavaScript.
        It will grab a template from the XSLT file, and swap out member variables within the template,
        and then write it to the dom.
        For instance all of the seats will be drawn by grabbing the dom element with the id of 'seatId',
        and then swapping out the values in [] with the member variable with that same name.
        [unitKey] will be replaced with the actual unitKey of that seat instance before it is written to the dom.
        This way the html stays seperate from the JavaScript, and the html can be changed easily.
        
        A technique was used to add events to the map so that every unit did not have to have a mouseover, mouseout, and click event.
        These events were needed so that every seat would have a rollover that showed its details, and it could be assigned.
        We assign the mouseover, mouseout, and click events to the compartment, 
        and then in the compartment method we decide what unit the event shold be associated with.
        This was done because when to many events are added the browser runs slow.
        
        The equipment object hierarchy consists of an Equipment that has a list of Compartments that has a list of Units.
        The width and height of everything is measured in grid units. For example a seat is 2 units wide by 2 units tall.
        We turn the unit measurement into a pixel measurement using the grid member variable of the UnitMapContainer class.
        Any unit can also be drawn at one of four angles 0, 90, 180, 270 measured in degrees.
        
        Seat Properties:
            The complete list of all seat properties is sent to the browser via JSON. 
            It is different for every equipment and is a property of the UnitMap object (unitMap.flattenedPropertyTypeList).
            Each property in the flattenedPropertyTypeList has a propertyTypeCode and a propertyCode, you want to use the
            propertyCode if it is set, otherwise fall back to using the propertyTypeCode.
            The easiest way to find out if a unit has a particular property is to call unit.hasProperty(propertyIndex);
            Each seat has an array of integers that represent an array of bits.
            Example:
                //The complete list of property objects that is at the unitMap level.
                //In This example there are three properties on the unitMap, AISLE, IDZEN, IDZAP
                var allPropertyArray =  [ 
                                                    {
                                                        "name": "Aisle",
                                                        "propertyCode": "",
                                                        "propertyTypeCode": "AISLE",
                                                    },
                                                    {
                                                        "name": "iDbox",
                                                        "propertyCode": "IDZEN",
                                                        "propertyTypeCode": "AMBIENCE",
                                                    },
                                                    {
                                                        "name": "iDZap",
                                                        "propertyCode": "IDZAP",
                                                        "propertyTypeCode": "AMBIENCE",
                                                    }
                                                ];
                
                //Each unit has an array of integers that represents an array of bits, that are used to tell weather the unit has a particular property
                //Each integer in the array represents 32 bits, if the allPropertyArray has a length < 32 than you will have 1 integer in the array.
                //If allPropertyArray has a length of 150, than there will be 5 integers in the unit.propertyArray, unit.propertyArray = [5, 1, 4, 3, 8];
                unit.propertyArray = [5];
                
                //This unit.propertyArray of an integer of the number 5 turns into a bit array of [00000000000000000000000000000101]
                //This means that this unit has a property of Aisle, because the right most bit is 1 and it matches with the first property in the allPropertyArray.
                //The unit also has an IDZAP ambience, because the bit array has a 1 in the bit that is third from the right.
                
                //To figure out if a seat has a particular property
                // First get the int we want >> 5 is the same as dividing by 32
                // Then figure out what bit we are
                // Finally, Grab the right most bit
                if (((unit.propertyArray[propertyIndex >> 5] >> (propertyIndex % 32)) & 1) === 1)
                {
                    hasProperty = true;
                }
          
         Ssrs:
            Ssrs are sold by segment, even if it is a change of guage flight. 
            The complete list of all seat ssrs is sent to the browser via JSON. 
            It is different for every equipment and is a property of the UnitMap object (unitMap.ssrHash).
            The easiest way to find out if a unit has a particular ssr is to call unit.hasSsr(ssrIndex);
            Each seat has an array of integers that represent an array of bits.
            Example:
                //The complete list of ssr objects that is at the unitMap level.
                //In This example there are three properties on the equipment, AISLE, IDZEN, IDZAP
                //All of the ssrCodes on the equipment are contained in the unitMap ssrCodeList property. 
                //From the ssrCode you can key into the ssrHash. 
                //The ssrHash is a hash of all seat ssr objects used on the equipment.
            
                var ssrHash = {
                                        "BIKE": {
                                                    "allowed": 1,
                                                    "boardingZone": 99,
                                                    "feeCode": "121",
                                                    "inActive": 0,
                                                    "limitPerPassenger": 1,
                                                    "name": "BIKE",
                                                    "seatMapCode": "",
                                                    "seatRestriction": "DefaultAllowed",
                                                    "ssrCode": "BIKE",
                                                    "ssrNestCode": "BIKE",
                                                    "ssrType": "Standard",
                                                    "traceQueueCode": "SSRQ",
                                                    "unitValue": 1
                                                }
                                    };
                
                //Each unit has an array of integers that represents an array of bits, that are used to tell weather the unit has a particular ssr
                //Each integer in the array represents 32 bits, if the ssrPermissionArray has a length < 32 than you will have 1 integer in the array.
                //If ssrPermissionArray has a length of 150, than there will be 5 integers in the unit.ssrPermissionArray, unit.ssrPermissionArray = [5, 1, 4, 3, 8];
                unit.ssrPermissionArray = [1];
                
                //This unit.ssrPermissionArray of an integer of the number 5 turns into a bit array of [00000000000000000000000000000001]
                //This means that this unit has a ssr of Bike, because the right most bit is 1 and it matches with the first ssr in the ssrHash.
                
                //To figure out if a seat has a particular ssr
                // First get the int we want >> 5 is the same as dividing by 32
                // Then figure out what bit we are
                // Finally, Grab the right most bit
                if (((unit.ssrPermissionArray[ssrIndex >> 5] >> (ssrIndex % 32)) & 1) === 1)
                {
                    hasSsr = true;
                }
            
        Ssr Fee:
            Start with the ssrCode.
            Get the ssr object from the ssrHash with the ssrCode.
            Get the feeCode from the ssr object.
            Use the ssrFeeHash to get the amount of the fees.
            
            The ssrFeeHash is a hash of all ssrFees from the ssrHash. The ssrFee depends on the feeCode, segment, and passengerType.
            The key for the ssrFeeHash is the [feeCode]_[journeyNumber]_[segmentNumber]_[passengerNumber]
            The ssrFeeHash contains the amount of the ssr.
            
            var ssrFeeHash = {
                                            "121_0_0_0": {
                                                                    "feeCode": "121",
                                                                    "journeyNumber": 0,
                                                                    "segmentNumber": 0,
                                                                    "passengerFee": 10,
                                                                    "passengerNumber": 0,
                                                                    "travelComponent": 'Segment',
                                                                    "delimiter": '_',
                                                                    "templateId": 'ssrFeeId',
                                                                    "template": null,
                                                                    "templateHtml": ''
                                                                   }
                                        };
             
            So using the ssrCode you can get the ssr object, and get its feeCode property.
            Using the feeCode, journeyNumber, segmentNumber and passengerNumber you can get the ssr amount.
            The UnitInput object contains the journeyNumber, segmentNumber and passengerNumber, 
            so all you really need is the ssrCode, and the unitInput to get the ssr amount.
             
        
        Filter Panel:
            The filter panel consists of properties and ssrs that you can use to search for seats with.
            If the user selects Aisle from the filter panel and then selects find seats, all of the seats with the Aisle property will be highlighted.
            If the user filters by multiple filter options at once then the seats that are highlighted must meet all of the selected criteria.
            If a user selects Aisle, and DVD then only seats that have the property Aisle and support the DVD ssr will be highlighted.
            A lot of filter panel code does a task for the properties, and then does the same task for ssrs.
            The properties and ssrs were kept seperate as much as possible, so that the code would be more modular.
            The filter panel should remember what was selected for each UserInput, or for each passenger, for each segment.
            This is done by writing hidden html form fields to the dom, where they are written to the xml output of the control to be read on page load.
            The filter panel properties are written to a node where id="selectedFilterPropertyInputContainer", <span id="selectedFilterPropertyInputContainer" ></span>
            The filter panel ssrs are written to a node where id="selectedFilterSsrInputContainer", <span id="selectedFilterSsrInputContainer" ></span>
            The selected filter properties and ssrs are written to the dom in groups, that represent properties and ssrs selected for a unit input.
            The id of the group node is unique, based on the equipmentIndex, and the passengerNumber of the unit container.
            
            Example of filter panel properties written to dom:
                <!-- The parent container, where selected filter properties will be written to the dom -->
                <span id="selectedFilterPropertyInputContainer" >
                    
                    <!-- The group parent container, [equipmentIndex]_[passengerNumber] -->
                    <span id="selectedFilterPropertyInputContainer_0_0">
                    
                        <!--
                            Input format:
                            <input id="ControlId_[equipmentIndex]_[passengerNumber]_[propertyTypeCode]" value="[propertyCode]" name="ControlName$selectedFilterProperty_[equipmentIndex]_[passengerNumber]_[propertyTypeCode]" type="hidden" />
                            The name attribute must start with "selectedFilterProperty" directly after the control name.
                            If propertyCode is not set, the value should be "True"
                        -->
                        <input id="ControlId_0_0_AISLE" type="hidden" value="True" name="ControlName$selectedFilterProperty_0_0_AISLE"/>
                        
                    </span>
                 </span>
             
            Example of filter panel ssrs written to dom:
                <!-- The parent container, where selected filter ssrs will be written to the dom -->
                <span id="selectedFilterSsrInputContainer" >
                
                    <!-- The group parent container, [equipmentIndex]_[passengerNumber] -->
                    <span id="selectedFilterSsrInputContainer_0_0">
                        
                        <!--
                            Input format:
                            <input id="ControlId_[equipmentIndex]_[passengerNumber]_[ssrCode]" value="[quantity]" name="ControlName$selectedFilterSsr_[equipmentIndex]_[passengerNumber]_[ssrCode]" type="hidden" />
                            The name attribute must start with "selectedFilterSsr" directly after the control name.
                        -->
                        <input id="ControlId_0_0_BIKE" type="hidden" value="1" name="ControlName$selectedFilterSsr_0_0_BIKE" />
                        
                    </span>
                </span>

            Correct behavior Jumping to a seat in Sky Sales and Sky Speed on pressing Find

                Two business objectives need to be met:
                    1. A car with seats that mach the property filter needs to be found 
                    2. Of all cars that meet the Seat Property filter criteria, select the car with the highest number of seats

    
    Requirements And Assumptions:
        A warning message should show up to inform the user that there is no seat matching the SSR selected on the filter panel
            I assume that the warning message applies when multiple ssrs are selected from the filter panel.
            I assume that this warning message that there are no seats available with the matching ssrs selected also applies to properties,
            however we do not show the property on the filter panel if it is not available on the entire equipment.
            I assume that the warning message applies when multiple properties and multiple ssrs are selected together.
            If the user filters by a property (Bike), and and some ssrs (DVD) (DVD Player), 
            and zero seats on the current equipment support all of these features the warning message should be displayed
        
    JsLint Status:
        Pass - JsLint Edition 2008-05-31
        
        + Strict whitespace
        + Assume a browser
        + Disallow undefined variables
        + Disallow leading _ in identifiers
        + Disallow == and !=
        + Disallow ++ and --
        + Disallow bitwise operators
        + Disallow . in RegExp literals
        + Disallow global var
        Indentation 4
        
*/

/*global $: false, jQuery: false, window: false, SKYSALES: false */

/*
    Name: 
        Class UnitContainer
    Param:
        None
    Return: 
        An instance of UnitContainer
    Functionality:
        This is the Base class for any class that can show or hide itself.
        The containerId is the id of the domelement that you wish to show and hide.
    Notes:
    Class Hierarchy:
        SkySales -> UnitContainer
*/
if (SKYSALES.Class.UnitContainer === undefined)
{
    SKYSALES.Class.UnitContainer = function ()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisUnitContainer = SKYSALES.Util.extendObject(parent);
        
        thisUnitContainer.containerId = '';
        thisUnitContainer.container = null;
        thisUnitContainer.setVars = function ()
        {
            thisUnitContainer.container = this.getById(this.containerId);
        };
        thisUnitContainer.hide = function ()
        {
            this.container.hide('slow');
        };
        thisUnitContainer.show = function ()
        {
            this.container.show('slow');
        };
        return thisUnitContainer;
    };
}

/*
    Name: 
        Class UnitMapContainer
    Param:
        None
    Return: 
        An instance of UnitMapContainer
    Functionality:
        Acts as the controller between all of the objects on the unitMapView
        It manages the communication between unitMaps, unitInputs, fees, ssrs, and properties.
    Notes:
        This class is instantiated and populated from a JSON object that comes from the XSLT
    Class Hierarchy:
        SkySales -> UnitMapContainer
*/
if (SKYSALES.Class.UnitMapContainer === undefined)
{
    SKYSALES.Class.UnitMapContainer = function ()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisUnitMapContainer = SKYSALES.Util.extendObject(parent);
        
        //The fullly qualified control id
        thisUnitMapContainer.clientId = '';
        
        //The fullly qualified control name
        thisUnitMapContainer.clientName = '';

        thisUnitMapContainer.blankImageName = '';
        thisUnitMapContainer.equipmentImagePath = '';
        thisUnitMapContainer.genericUnitImagePath = '';
        thisUnitMapContainer.propertyIconImagePath = '';

        thisUnitMapContainer.propertySuperSetId = 'propertyId';
        thisUnitMapContainer.propertyAutoAssignId = 'propertyId';

        // The maximum number of property icons to show on an individual seat
        thisUnitMapContainer.iconMax = 5;
        // The maximum number of property icons to show on an individual large seat
        thisUnitMapContainer.iconMaxLargeSeat = 7;

        thisUnitMapContainer.noUnitsMeetFilterCriteriaMessage = '';

        //The size of each square on the equipment grid
        thisUnitMapContainer.grid = 0;

        //Quick access to the active objects
        thisUnitMapContainer.activeCompartmentDesignator = '';
        thisUnitMapContainer.activeCompartmentDeck = -1;
        thisUnitMapContainer.activeUnitInput = null;
        thisUnitMapContainer.activeUnitMap = null;
        thisUnitMapContainer.activeCompartment = null;
        thisUnitMapContainer.activeUnit = null;

        //Used to mark the seat map as read only. Used for viewing flyahead offering seat maps.
        thisUnitMapContainer.seatMapIsOnReadOnlyMode = false;
        
        thisUnitMapContainer.journeySellKeyId = '';
        thisUnitMapContainer.journeySellKey = null;

        //An array of UnitInput objects
        thisUnitMapContainer.unitInputArray = [];

        //A hash of all of the Ssr objects with the key as the ssrCode
        thisUnitMapContainer.ssrHash = {};

        //A hash of all of the SsrFee objects with the key as the feeCode
        thisUnitMapContainer.ssrFeeHash = {};

        //The id of the unitTip div
        thisUnitMapContainer.showDetailId = null;

        //An array of unitMap objects - this is where the equipment is.
        thisUnitMapContainer.unitMapArray = [];

        //The ssr up sell object
        thisUnitMapContainer.ssrContainer = null;

        //The ssrs that have been selected to be sold on the up sell ssr container
        thisUnitMapContainer.soldSsrHash = {};

        //An array of inputs that you can filter by
        thisUnitMapContainer.propertyFilterInputArray = null;
        thisUnitMapContainer.ssrFilterInputArray = null;
        thisUnitMapContainer.selectedPropertyHash = {};
        thisUnitMapContainer.selectedSsrHash = {};

        //Show the ssr up sell container on load of the page
        thisUnitMapContainer.showSsrContainerOnInit = false;

        //Temporary JSON objects, the data gets turned into real object types
        thisUnitMapContainer.ssrListJson = {};
        thisUnitMapContainer.ssrFeeListJson = {};
        thisUnitMapContainer.unitMapJson = [];

        //css classes
        thisUnitMapContainer.activeUnitInputClass = 'activeUnitInput';
        thisUnitMapContainer.activeCompartmentClass = 'carSelected';

        //Used to delimit strings
        thisUnitMapContainer.delimiter = '_';

        //Used to strip invalid characters from the unitDesignator
        thisUnitMapContainer.clean = function(str)
        {
            return str.replace(/[\$\s]/g, '_');
        };

        //Called to initialize the instance of the UnitMapContainer
        thisUnitMapContainer.init = function(json)
        {
            this.setSettingsByObject(json);

            this.setVars();
            this.initAutoAssign();
            this.initSsrContainer();
            this.initSoldSsrHash();
            this.initSsrHash();
            this.initSsrFeeHash();
            this.initUnitMapArray();
            this.initUnitInputArray();
            this.initPropertyAutoAssignSet(this.unitInputArray);

            //Delete the functions to save memory
            delete thisUnitMapContainer.initAutoAssign;
            delete thisUnitMapContainer.initSsrContainer;
            delete thisUnitMapContainer.initSoldSsrHash;
            delete thisUnitMapContainer.initSsrHash;
            delete thisUnitMapContainer.initSsrFeeHash;
            delete thisUnitMapContainer.initUnitMapArray;
            delete thisUnitMapContainer.initPropertyAutoAssignSet;
            delete thisUnitMapContainer.init;
        };

        thisUnitMapContainer.setVars = function ()
        {
            thisUnitMapContainer.journeySellKey = this.getById(this.journeySellKeyId);
        };
        thisUnitMapContainer.hide = function() { };
        thisUnitMapContainer.show = function() { };

        //Create an array of UnitInput objects
        thisUnitMapContainer.initUnitInputArray = function()
        {
            var unitInput = null;
            var i = 0;

            for (i = 0; i < this.unitInputArray.length; i += 1)
            {
                unitInput = SKYSALES.Class.UnitInput();
                thisUnitMapContainer.unitInputArray[i].unitMapContainer = this;
                unitInput.init(this.unitInputArray[i]);
                thisUnitMapContainer.unitInputArray[i] = unitInput;
                if (unitInput.isActive === true)
                {
                    thisUnitMapContainer.activeUnitInput = unitInput;
                }
            }
            this.updateActiveUnitInput(this.activeUnitInput);
            if (this.showSsrContainerOnInit)
            {
                this.activateUnitInput(this.activeUnitInput);
            }
        };

        thisUnitMapContainer.isEven = function(number)
        {
            var mod2 = (number % 2),
            even = (0 === mod2);
            return even;
        };

        thisUnitMapContainer.getUnitMapUnitInput = function(equipmentIndex)
        {
            var unitInput,
            unitMapUnitInput,
            unitInputArray = this.unitInputArray,
            unitInputArrayLength = unitInputArray.length,
            i = 0;
            equipmentIndex = equipmentIndex.toString();
            for (i = 0; ((i < unitInputArrayLength) && !unitMapUnitInput); i += 1)
            {
                unitInput = unitInputArray[i];
                if (unitInput.equipmentIndex === equipmentIndex)
                {
                    unitMapUnitInput = unitInput;
                }
            }
            return unitMapUnitInput;
        };

        thisUnitMapContainer.initPropertyAutoAssignSet = function(unitInputArray)
        {
            var propertyAutoAssignContainer = this.getById(this.propertyAutoAssignId),
            originalTemplateHtml = this.getById('propertyAutoAssignSetTemplateId').text(),
            workingTemplateHtml = '',
            propertyAutoAssignHash = null,
            unitMapArray = this.unitMapArray || [],
            unitMap = null,
            unitInput = null;
            i = 0,
            j = 0;
            flightNumber = 1,
            propertyAutoAssignAllHtml = '<table>',
            even = false,
            propertyAutoAssignInputsHtml = '',
            propertyAutoAssignListsHtml = '',
            currentUnitInput = null,
            departureStation = '',
            arrivalStation = '';

            for (i = 0; i < unitMapArray.length; i += 1)
            {
                flightNumber = i + 1;
                even = this.isEven(flightNumber);
                if (false === even)
                {
                    propertyAutoAssignAllHtml += '<tr>';
                }
                unitMap = unitMapArray[i]
                for (j = 0; j < unitInputArray.length; j += 1)
                {
                    unitInput = unitInputArray[j];
                    if (unitInput.passengerNumber === "0" && unitInput.equipmentIndex === (unitMap.equipmentIndex + ''))
                    {
                        departureStation = unitInput.departureStation;
                        arrivalStation = unitInput.arrivalStation;

                        propertyAutoAssignHash = this.getPropertyAutoAssignHash(unitMap, unitInput);
                        workingTemplateHtml = originalTemplateHtml.replace('[flightNumber]', flightNumber);
                        workingTemplateHtml = workingTemplateHtml.replace('[departureStation]', departureStation);
                        workingTemplateHtml = workingTemplateHtml.replace('[arrivalStation]', arrivalStation);
                        propertyAutoAssignInputsHtml = this.getPropertyAutoAssignInputsHtml(propertyAutoAssignHash);
                        workingTemplateHtml = workingTemplateHtml.replace('[propertyAutoAssignInputsHtml]', propertyAutoAssignInputsHtml);
                        propertyAutoAssignListsHtml = this.getPropertyAutoAssignListsHtml(propertyAutoAssignHash);
                        workingTemplateHtml = workingTemplateHtml.replace('[propertyAutoAssignListsHtml]', propertyAutoAssignListsHtml);
                        propertyAutoAssignAllHtml += workingTemplateHtml;

                        if (true === even)
                        {
                            propertyAutoAssignAllHtml += '</tr>';
                        }
                        break;
                    }
                }
            }
            propertyAutoAssignAllHtml += '</tr></table>';
            propertyAutoAssignContainer.append(propertyAutoAssignAllHtml);
        };

        thisUnitMapContainer.getPropertyAutoAssignHash = function(unitMap, unitInput)
        {
            unitMap = unitMap || this.activeUnitMap;
            var propertyTypeList = null;
            var propertyType = null;
            var propertyTypeIndex = 0;
            var propertyHash = {};
            var propertyYesNoTemplate = this.getById('propertyYesNoTemplateId').text();
            var propertyStringTemplate = this.getById('propertyStringTemplateId').text();
            var propertyListTemplate = this.getById('propertyListTemplateId').text();
            var propertyListOptionTemplate = this.getById('propertyListOptionTemplateId').text();
            var propertyHtml = '';
            var key = '';
            var optionArray = null;

            // used to preselect auto assign properties
            var selectedAutoAssignPropertyArray = unitInput.selectedAutoAssignPropertyArray || [];
            var selectedFilterProperty = null;
            var i = 0;
            var comparePropertyCode = null;
            var comparePropertyTypeCode = null;

            if (unitMap)
            {
                propertyTypeList = unitMap.flattenedPropertyTypeList;
                for (propertyTypeIndex = 0; propertyTypeIndex < propertyTypeList.length; propertyTypeIndex += 1)
                {
                    propertyType = propertyTypeList[propertyTypeIndex];
                    if (propertyType.searchable === 1 && propertyType.usedOnMap === 1)
                    {
                        key = propertyType.propertyTypeCode;
                        var checked = '';
                        var selected = '';
                        //Options: None, YesNo, Numeric, List, String
                        if (propertyType.valueType === 'YesNo')
                        {
                            // look through the selectedAutoAssignPropertyArray
                            for (i = 0; i < selectedAutoAssignPropertyArray.length; i += 1)
                            {
                                selectedFilterProperty = selectedAutoAssignPropertyArray[i];
                                comparePropertyTypeCode = selectedFilterProperty.propertyTypeCode.toLowerCase();
                                comparePropertyCode = selectedFilterProperty.propertyCode.toLowerCase();
                                if ((comparePropertyCode === 'true') && (comparePropertyTypeCode === propertyType.propertyTypeCode.toLowerCase()))
                                {
                                    checked = 'CHECKED';
                                }
                            }
                            propertyHtml = propertyYesNoTemplate;
                            propertyHash[key] = {
                                "equipmentIndex": unitMap.equipmentIndex,
                                "propertyType": propertyType,
                                "html": propertyHtml,
                                "type": "boolean",
                                "checked": checked
                            };
                        }
                        else if ((propertyType.valueType === 'Numeric') || (propertyType.valueType === 'String'))
                        {
                            propertyHtml = propertyStringTemplate;
                            propertyHash[key] = {
                                "equipmentIndex": unitMap.equipmentIndex,
                                "propertyType": propertyType,
                                "html": propertyHtml,
                                "type": "text"
                            };
                        }
                        else if (propertyType.valueType === 'List')
                        {
                            if (!propertyHash[key])
                            {
                                propertyHtml = propertyListTemplate;
                                propertyHash[key] = {
                                    "propertyTypeName": propertyType.propertyTypeName,
                                    "equipmentIndex": unitMap.equipmentIndex,
                                    "optionArray": [],
                                    "html": propertyHtml,
                                    "type": "list"
                                };
                            }

                            // look through the selectedAutoAssignPropertyArray
                            for (i = 0; i < selectedAutoAssignPropertyArray.length; i += 1)
                            {
                                selectedFilterProperty = selectedAutoAssignPropertyArray[i];
                                comparePropertyTypeCode = selectedFilterProperty.propertyTypeCode.toLowerCase();
                                comparePropertyCode = selectedFilterProperty.propertyCode.toLowerCase();
                                if ((comparePropertyCode === propertyType.propertyCode.toLowerCase()) && (comparePropertyTypeCode === propertyType.propertyTypeCode.toLowerCase()))
                                {
                                    selected = 'SELECTED';
                                }
                            }

                            propertyHtml = propertyListOptionTemplate;
                            optionArray = propertyHash[key].optionArray;
                            optionArray[optionArray.length] = {
                                "equipmentIndex": unitMap.equipmentIndex,
                                "propertyType": propertyType,
                                "html": propertyHtml,
                                "type": "option",
                                "selected": selected
                            };
                        }
                    }
                }
            }
            return propertyHash;
        };

        thisUnitMapContainer.getPropertyAutoAssignInputsHtml = function(propertyAutoAssignHash)
        {
            var propertyAutoAssignAllHtml = '';
            var propertyAutoAssignHtml = '';
            var propertyAutoAssign = null;
            var key = '';
            var propertyType = null;

            for (key in propertyAutoAssignHash)
            {
                if (propertyAutoAssignHash.hasOwnProperty(key))
                {
                    propertyAutoAssign = propertyAutoAssignHash[key];
                    if (propertyAutoAssign.type !== "list")
                    {
                        propertyAutoAssignHtml = propertyAutoAssign.html;
                        propertyType = propertyAutoAssign.propertyType;
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[equipmentIndex\]/g, propertyAutoAssign.equipmentIndex);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[propertyTypeCode\]/g, propertyType.propertyTypeCode);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[propertyCode\]/g, propertyType.propertyCode);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[name\]/g, propertyType.name);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[passengerNumber\]/g, propertyAutoAssign.passengerNumber);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[checked\]/g, propertyAutoAssign.checked);
                        propertyAutoAssignAllHtml += propertyAutoAssignHtml;
                    }
                }
            }
            return propertyAutoAssignAllHtml;
        };

        thisUnitMapContainer.getPropertyAutoAssignListsHtml = function(propertyAutoAssignHash)
        {
            var propertyAutoAssignAllHtml = '';
            var propertyAutoAssignHtml = '';
            var propertyAutoAssignOptionHtml = '';
            var propertyAutoAssignOptionAllHtml = '';
            var propertyAutoAssignOption = null;
            var optionArray = null;
            var propertyAutoAssign = null;
            var key = '';
            var i = 0;
            var propertyType = null;

            for (key in propertyAutoAssignHash)
            {
                if (propertyAutoAssignHash.hasOwnProperty(key))
                {
                    propertyAutoAssign = propertyAutoAssignHash[key];
                    if (propertyAutoAssign.type === "list")
                    {
                        propertyAutoAssignHtml = propertyAutoAssign.html;
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[equipmentIndex\]/g, propertyAutoAssign.equipmentIndex);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[name\]/g, propertyAutoAssign.propertyTypeName);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[propertyTypeCode\]/g, key);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[propertyCode\]/g, key);
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace(/\[passengerNumber\]/g, propertyAutoAssign.passengerNumber);
                        propertyAutoAssignOptionAllHtml = '';
                        optionArray = propertyAutoAssign.optionArray || [];
                        for (i = 0; i < optionArray.length; i += 1)
                        {
                            propertyAutoAssignOption = optionArray[i];
                            propertyType = propertyAutoAssignOption.propertyType;
                            propertyAutoAssignOptionHtml = propertyAutoAssignOption.html;
                            propertyAutoAssignOptionHtml = propertyAutoAssignOptionHtml.replace(/\[equipmentIndex\]/g, propertyAutoAssign.equipmentIndex);
                            propertyAutoAssignOptionHtml = propertyAutoAssignOptionHtml.replace(/\[propertyTypeCode\]/g, propertyType.propertyTypeCode);
                            propertyAutoAssignOptionHtml = propertyAutoAssignOptionHtml.replace(/\[propertyCode\]/g, propertyType.propertyCode);
                            propertyAutoAssignOptionHtml = propertyAutoAssignOptionHtml.replace(/\[name\]/g, propertyType.name);
                            propertyAutoAssignOptionHtml = propertyAutoAssignOptionHtml.replace(/\[selected\]/g, propertyAutoAssignOption.selected);
                            propertyAutoAssignOptionAllHtml += propertyAutoAssignOptionHtml;
                        }
                        propertyAutoAssignHtml = propertyAutoAssignHtml.replace('[optionArray]', propertyAutoAssignOptionAllHtml);
                        propertyAutoAssignAllHtml += propertyAutoAssignHtml;
                    }

                }
            }
            return propertyAutoAssignAllHtml;
        };

        //Create an array of UnitMap objects - these objects contain the equipment
        thisUnitMapContainer.initUnitMapArray = function()
        {
            var i = 0;
            var unitMap = null;

            for (i = 0; i < this.unitMapJson.length; i += 1)
            {
                unitMap = SKYSALES.Class.UnitMap();
                unitMap.unitMapContainer = this;
                unitMap.equipmentIndex = i;
                unitMap.init(this.unitMapJson[i]);
                thisUnitMapContainer.unitMapArray[i] = unitMap;
                if (unitMap.equipment.isActive)
                {
                    thisUnitMapContainer.activeUnitMap = unitMap;
                }
            }
            if ((!this.activeUnitMap) && (this.unitMapArray.length > 0))
            {
                thisUnitMapContainer.activeUnitMap = this.unitMapArray[0];
            }
            delete thisUnitMapContainer.unitMapJson;
        };

        //Wire up the auto assign button
        thisUnitMapContainer.initAutoAssign = function()
        {
            var autoUnitAssignAllButton = this.getById('AutoUnitAssignAllButton');
            autoUnitAssignAllButton.click(this.autoAssignHandler);
        };

        //Event handler that responds to the auto assign button click
        thisUnitMapContainer.autoAssignHandler = function()
        {
            //Switch to the first unit input
            var unitInput = null;
            var i = 0;
            var unitInputArray = thisUnitMapContainer.unitInputArray || [];
            if (unitInputArray.length > 0)
            {
                unitInput = unitInputArray[0];
                thisUnitMapContainer.activeUnitInput = unitInput;
                thisUnitMapContainer.ssrContainer.unitInput = thisUnitMapContainer.unitInput;
                thisUnitMapContainer.ssrContainer.unit = thisUnitMapContainer.getUnitByUnitKey(thisUnitMapContainer.activeUnitInput.unitKey);
            }
            //Save the filter selection for each unit input
            for (i = 0; i < unitInputArray.length; i += 1)
            {
                unitInput = unitInputArray[i];
                thisUnitMapContainer.writeAutoAssignPropertiesToDom(unitInput);
            }
            /*jslint nomen: false */
            window.__doPostBack(thisUnitMapContainer.clientName + '$LinkButtonAutoAssignUnit', '');
            /*jslint nomen: true */
        };

        //Creates a SsrContainer that will upsell the ssrs
        thisUnitMapContainer.initSsrContainer = function()
        {
            var ssrContainerParam = {
                'containerId': 'confirmSeat',
                'dynamicContainerId': 'confirmSeatContainer',
                'ssrTemplateId': 'ssrId',
                'ssrCancelButtonId': 'ssrCancelButton',
                'ssrConfirmButtonId': 'ssrConfirmButton',
                'sellSsrButtonId': 'sellSsrButton',
                'unitMapContainer': this
            };
            thisUnitMapContainer.ssrContainer = SKYSALES.Class.SsrContainer();
            thisUnitMapContainer.ssrContainer.init(ssrContainerParam);
        };

        //Remember what what ssrs were selected to be sold
        //For every segment we store an array of ssrs that were selected
        thisUnitMapContainer.initSoldSsrHash = function()
        {
            var soldSsrHash = this.soldSsrHash;
            var soldSsrArray = null;
            var soldSsr = null;
            var i = 0;
            var unitInputSegmentKey = '';
            for (unitInputSegmentKey in soldSsrHash)
            {
                if (soldSsrHash.hasOwnProperty(unitInputSegmentKey))
                {
                    soldSsrArray = soldSsrHash[unitInputSegmentKey].soldSsrArray;
                    for (i = 0; i < soldSsrArray.length; i += 1)
                    {
                        soldSsr = new SKYSALES.Class.SoldSsr();
                        soldSsr.init(soldSsrArray[i]);
                        soldSsrArray[i] = soldSsr;
                    }
                    soldSsrHash[unitInputSegmentKey].soldSsrArray = soldSsrArray;
                    soldSsrHash[unitInputSegmentKey].lostSsrArray = [];
                }
            }
            thisUnitMapContainer.soldSsrHash = soldSsrHash;
            //this.ssrContainer.writeSoldSsrsToDom();
        };

        //Creates an ssrHash that contains a hash of every seat ssr object in the system, "ssrCode": { SsrObject }
        thisUnitMapContainer.initSsrHash = function()
        {
            var i = 0;
            var ssrArray = this.ssrListJson.SsrList;
            var ssr = null;
            ssrArray = ssrArray || [];
            for (i = 0; i < ssrArray.length; i += 1)
            {
                ssr = SKYSALES.Class.Ssr();
                ssr.init(ssrArray[i]);

                if (!thisUnitMapContainer.ssrHash[ssr.ssrCode])
                {
                    thisUnitMapContainer.ssrHash[ssr.ssrCode] = ssr;
                }
            }
            delete thisUnitMapContainer.ssrListJson;
        };

        //Creates an has of SsrFee objects
        thisUnitMapContainer.initSsrFeeHash = function()
        {
            var i = 0;
            var ssrFeeArray = this.ssrFeeListJson.SsrFeeList;
            var ssrFee = null;
            var ssrFeeKey = '';
            ssrFeeArray = ssrFeeArray || [];
            for (i = 0; i < ssrFeeArray.length; i += 1)
            {
                ssrFee = SKYSALES.Class.SsrFee();
                ssrFee.init(ssrFeeArray[i]);
                ssrFeeKey = ssrFee.getKey();
                thisUnitMapContainer.ssrFeeHash[ssrFeeKey] = ssrFee;
            }
            delete thisUnitMapContainer.ssrFeeListJson;
        };

        /*
        This is called when the unitInput is selected, and you are viewing the unitMap.
        If it needs another equipment it will post back to get it, otherwise it will just update the state of the map for the active unitInput.
        */
        thisUnitMapContainer.updateActiveUnitInput = function(selectedActiveUnitInput)
        {
            var i = 0;
            var unitInputArray = this.unitInputArray;
            var unitInput = null;
            var equipmentIndex = 0;
            var unit = null;
            if (this.activeUnitInput && selectedActiveUnitInput)
            {
                //this.writeFilterToDom(this.activeUnitInput);
                equipmentIndex = this.activeUnitInput.equipmentIndex;
                if (selectedActiveUnitInput.equipmentIndex === equipmentIndex)
                {
                    for (i = 0; i < unitInputArray.length; i += 1)
                    {
                        unitInput = unitInputArray[i];
                        if (unitInput.equipmentIndex !== equipmentIndex)
                        {
                            continue;
                        }
                        unit = this.getUnitByUnitKey(unitInput.unitKey);

                        if (unitInput === selectedActiveUnitInput)
                        {
                            if (unit)
                            {
                                unit.updateSeatImage('Selected');
                                unit.unitAvailability = 'Open';
                            }
                            unitInput.input.addClass(this.activeUnitInputClass);
                            thisUnitMapContainer.activeUnitInput = unitInput;
                            thisUnitMapContainer.activeUnit = unit;
                        }
                        else
                        {
                            if (unit)
                            {
                                unit.updateSeatImage('Reserved');
                                unit.unitAvailability = 'Occupied';
                            }
                            unitInput.deactivate();
                        }
                    }
                    this.updateFilterSsrFees();
                    this.selectFilterProperties();
                    this.selectFilterSsrs();
                    // hide all seat fees first then only show the seat fee legend for the selected passenger
                    this.updateSeatFeeLegend(this.activeUnitInput);
                }
                else
                {
                    this.postBackForEquipment();
                }
            }
        };

        /*
        Called when you select the next unitInput in the upsell dialog
        Usually we should not have to post back here, because we should have the stripped down equipment.
        */
        thisUnitMapContainer.activateUnitInput = function(selectedUnitInput)
        {
            var unit = null;
            var equipmentIndex = -1;
            if (this.activeUnitInput && selectedUnitInput)
            {
                this.ssrContainer.writeSoldSsrsToDom();
                equipmentIndex = this.activeUnitInput.equipmentIndex;
                if (selectedUnitInput.equipmentIndex === equipmentIndex)
                {
                    thisUnitMapContainer.activeUnitInput = selectedUnitInput;
                    thisUnitMapContainer.ssrContainer.showFlightList = true;
                    thisUnitMapContainer.ssrContainer.unitInput = thisUnitMapContainer.activeUnitInput;
                    thisUnitMapContainer.ssrContainer.unit = thisUnitMapContainer.getUnitByUnitKey(thisUnitMapContainer.activeUnitInput.unitKey);
                    if (thisUnitMapContainer.ssrContainer.unit)
                    {
                        this.ssrContainer.show();
                    }
                }
                else if (this.unitMapArray.length > selectedUnitInput.equipmentIndex)
                {
                    thisUnitMapContainer.activeUnitInput = selectedUnitInput;
                    thisUnitMapContainer.activeEquipment = thisUnitMapContainer.unitMapArray[selectedUnitInput.equipmentIndex];
                    unit = this.getUnitByUnitKey(this.activeUnitInput.unitKey);
                    if (unit)
                    {
                        thisUnitMapContainer.activeCompartment = unit.compartment;
                        thisUnitMapContainer.activeCompartmentDesignator = unit.compartmentDesignator;
                        thisUnitMapContainer.ssrContainer.showFlightList = true;
                        thisUnitMapContainer.ssrContainer.unitInput = thisUnitMapContainer.activeUnitInput;
                        thisUnitMapContainer.activeCompartmentDeck = unit.compartment.deck;
                        thisUnitMapContainer.activeUnit = unit;
                        thisUnitMapContainer.ssrContainer.unit = unit;
                        if (thisUnitMapContainer.ssrContainer.unit)
                        {
                            this.ssrContainer.show();
                        }
                    }
                    else
                    {
                        this.postBackForUpSell();
                    }
                }
                else
                {
                    this.postBackForUpSell();
                }
            }
        };

        thisUnitMapContainer.postBackForUpSell = function()
        {
            thisUnitMapContainer.showSsrContainerOnInit = true;
            var showUpSellInputHtml = '<input type="hidden" name="' + thisUnitMapContainer.clientName + '$showUpSell" value="true" />';
            this.getById('showUpSellInputContainer').html(showUpSellInputHtml);
            /*jslint nomen: false */
            window.__doPostBack(this.clientName + '$LinkButtonTripSelector', '');
            /*jslint nomen: true */
        };

        //show the upsell dialog
        thisUnitMapContainer.confirmSeat = function(unit)
        {
            var activeUnit = this.activeUnit;
            var activeUnitInput = this.activeUnitInput;
            if ((activeUnitInput) && (unit) && (unit.unitAvailability === 'Open'))
            {
                // update seat fee
                unit.unitFee = SKYSALES.Class.UnitFee.getUnitFeeByPassenger(activeUnitInput.passengerNumber, unit.unitGroup);

                if (activeUnit === unit)
                {
                    activeUnitInput.input.val('');
                    activeUnitInput.hiddenInput.val('');
                    activeUnitInput.unitKey = '';
                    if (unit.updateSeatImage)
                    {
                        unit.updateSeatImage();
                    }
                    unit = null;
                    thisUnitMapContainer.activeUnit = null;
                }
                else
                {
                    thisUnitMapContainer.ssrContainer.unitInput = activeUnitInput;
                    thisUnitMapContainer.ssrContainer.unit = unit;
                    this.ssrContainer.show();
                }
            }
        };

        /*
        Associates a seat with a unitInput, the seat does not actually get assigned until the Assign button is clicked.
        The seat information is round tripped from the client to the server until it is assigned.
        */
        thisUnitMapContainer.assignSeat = function(unit)
        {
            var activeUnit = this.activeUnit;
            var activeUnitInput = this.activeUnitInput;
            var value = '';
            var paxSeatFeeHtml = SKYSALES.Util.convertToLocaleCurrency(unit.unitFee);
            if ((activeUnitInput) && (unit) && (unit.unitAvailability === 'Open'))
            {
                value = unit.getKey();

                activeUnitInput.setInputAndHiddenInput(value);
                activeUnitInput.unitKey = value;

                activeUnitInput.paxSeatFee.html(paxSeatFeeHtml);
                if (unit.updateSeatImage)
                {
                    unit.updateSeatImage('Selected');
                }
                thisUnitMapContainer.activeUnit = unit;

                if (activeUnit)
                {
                    if (activeUnit.updateSeatImage)
                    {
                        activeUnit.updateSeatImage();
                    }
                }
                thisUnitMapContainer.activeUnit = unit;
            }
        };

        /*
        Given a unitKey this method should return the unit object
        This should be the only method that knows how to parse the unit key
        In its current for mat the key is 'equipmentIndex_compartmentDesignator_deck_unitDesignator'
        */
        thisUnitMapContainer.getUnitByUnitKey = function(unitKey)
        {
            unitKey = unitKey || '';
            var unitInfo = unitKey.split(this.delimiter);
            var equipmentIndex = -1;
            var compartmentDesignator = '';
            var deck = '';
            var unitDesignator = '';

            var equipment = null;
            var compartmentArray = null;
            var compartment = null;
            var unit = null;
            var i = 0;

            if (unitInfo.length === 4)
            {
                equipmentIndex = unitInfo[0];
                compartmentDesignator = unitInfo[1];
                deck = unitInfo[2];
                deck = parseInt(deck, 10);
                unitDesignator = unitInfo[3];

                equipmentIndex = parseInt(equipmentIndex, 10);
                if (this.unitMapArray.length > equipmentIndex)
                {
                    equipment = this.unitMapArray[equipmentIndex].equipment;
                    if (equipment && equipment.compartmentHash[compartmentDesignator])
                    {
                        compartmentArray = equipment.compartmentHash[compartmentDesignator];
                        /*
                        When you have a stripped equipment the first deck might not be there,
                        So we must loop through the decks we have to find the right unitKey.
                        */
                        for (i = 0; i < compartmentArray.length; i += 1)
                        {
                            compartment = compartmentArray[i];
                            if (compartment && compartment.unitHash[unitKey])
                            {
                                unit = compartment.unitHash[unitKey];
                                if (unit)
                                {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return unit;
        };

        thisUnitMapContainer.postBackForEquipment = function()
        {
            if (this.activeCompartment)
            {
                this.activeCompartment.compartmentContainer.html('');
            }
            /*jslint nomen: false */
            window.__doPostBack(this.clientName + '$LinkButtonTripSelector', '');
            /*jslint nomen: true */
        };

        /*
        This method shows the warning message that is displayed when zero units on the equipment match the users selections.
        The requirement is to show a dialog box for SkySales that looks like an alert box,
        however alert boxes break the asynchronous model by stopping code execution.
        This means that asynchronous AJAX requests will stop processing then an alert box is displayed.
        We should be showing a message div or something else that does not block JavaScript code execution
        */
        thisUnitMapContainer.showNoUnitsMeetFilterCriteria = function()
        {
            window.alert(this.noUnitsMeetFilterCriteriaMessage);
        };

        /*
        Update the fees on the filter panel.
        The fees must be updated every time the activeUnitInput is changed
        because the fee can be different per passenger per segment
        */
        thisUnitMapContainer.updateFilterSsrFees = function(unitInput)
        {
            unitInput = unitInput || this.activeUnitInput;
            var ssrFilterInputHash = this.getSsrFilterInputHash();
            var feeNode = null;
            var ssrCode = '';
            var ssr = null;
            var filterInput = null;
            var ssrFee = null;
            var ssrFilterInput = null;
            var ssrFeeHtml = '';
            var feeNodeHtml = '';
            var prop = '';
            for (prop in ssrFilterInputHash)
            {
                if (ssrFilterInputHash.hasOwnProperty(prop))
                {
                    ssrFilterInput = ssrFilterInputHash[prop];
                    filterInput = ssrFilterInput.input;
                    feeNode = ssrFilterInput.fee;
                    ssrCode = filterInput.attr('id');
                    ssrCode = ssrCode || '';
                    ssrCode = ssrCode.replace('ssr_', '');
                    ssr = this.ssrHash[ssrCode];
                    ssrFee = this.getSsrFee(ssr);
                    ssrFeeHtml = ssrFee.supplant();
                    feeNodeHtml = feeNode.html();
                    feeNodeHtml = feeNodeHtml || '';
                    feeNodeHtml = feeNodeHtml.replace('[ssrFee]', ssrFeeHtml);
                    feeNode.html(feeNodeHtml);
                }
            }
        };

        /*
        Hides all the seat fee legend and only shows the applicable seat fee 
        legend for the specific passenger-segement
        */
        thisUnitMapContainer.updateSeatFeeLegend = function(unitInput)
        {
            var passengerNumber = unitInput.passengerNumber;
            var equipmentIndex = unitInput.equipmentIndex;
            this.hideSeatFeeLegendForAllPassengers();
            this.showSeatFeeLegendForSelectedPassenger(passengerNumber, equipmentIndex);
        };

        thisUnitMapContainer.getSeatFeeLegendForSelectedPassengerElement = function(passengerNumber, equipmentIndex)
        {
            var seatFeeLegendForSelectedPassengerDivId = 'seatingLegendSeatFee_' + 'PaxNumber' + passengerNumber + 'EquipmentIndex' + equipmentIndex;
            var seatFeeLegendForSelectedPassengerDiv = this.getById(seatFeeLegendForSelectedPassengerDivId);
            return seatFeeLegendForSelectedPassengerDiv;
        };

        thisUnitMapContainer.showSeatFeeLegendForSelectedPassenger = function(passengerNumber, equipmentIndex)
        {
            var seatFeeLegendForSelectedPassengerElement = this.getSeatFeeLegendForSelectedPassengerElement(passengerNumber, equipmentIndex);
            if (seatFeeLegendForSelectedPassengerElement.length > 0)
            {
                seatFeeLegendForSelectedPassengerElement.show();
            }
        };

        thisUnitMapContainer.hideSeatFeeLegendForSelectedPassenger = function(passengerNumber, equipmentIndex)
        {
            var seatFeeLegendForSelectedPassengerElement = this.getSeatFeeLegendForSelectedPassengerElement(passengerNumber, equipmentIndex);
            if (seatFeeLegendForSelectedPassengerElement.length > 0)
            {
                seatFeeLegendForSelectedPassengerElement.hide();
            }
        };

        thisUnitMapContainer.hideSeatFeeLegendForAllPassengers = function()
        {
            var unitInputArray = this.unitInputArray || [];
            var unitInput = null;
            var passengerNumber = 0;
            var equipmentIndex = 0;
            var i = 0;

            //Hide seat fee legend for each unit input
            for (i = 0; i < unitInputArray.length; i += 1)
            {
                unitInput = unitInputArray[i];
                passengerNumber = unitInput.passengerNumber;
                equipmentIndex = unitInput.equipmentIndex;
                this.hideSeatFeeLegendForSelectedPassenger(passengerNumber, equipmentIndex);
            }
        };

        /*
        Given the ssr, it returns the ssr fee
        It returns the fee for the activeUnitInput
        which means that it returns the ssr fee for the active passenger, journey, segment
        */
        thisUnitMapContainer.getSsrFee = function(ssr)
        {
            ssr = ssr || new SKYSALES.Class.Ssr();
            var del = this.delimiter;
            var unitInput = this.activeUnitInput;
            var ssrFeeHash = this.ssrFeeHash;
            var ssrFee = null;
            var ssrFeeKey = ssr.feeCode + del + unitInput.journeyIndex + del + unitInput.segmentIndex + del + unitInput.passengerNumber;
            ssrFee = ssrFeeHash[ssrFeeKey];
            if (!ssrFee)
            {
                ssrFee = new SKYSALES.Class.SsrFee();
                ssrFee.init();
            }
            return ssrFee;
        };

        /*
        When a unitInput is selected, the property and ssr filter control should remember its state for that unitInput.
        This method sets the filter control to what properties were searched for the last time the unitInput was active
        */
        thisUnitMapContainer.selectFilterProperties = function(unitInput)
        {
            unitInput = unitInput || this.activeUnitInput;
            var selectedFilterPropertyArray = unitInput.selectedFilterPropertyArray || [];
            var propertyFilterInputHash = this.getPropertyFilterInputHash();
            var filterInput = null;
            var i = 0;
            var isCheckBox = false;
            var prop = '';
            var selectedFilterProperty = null;
            var filterName = '';
            var propertyIndex = -1;
            var comparePropertyCode = null;
            var comparePropertyTypeCode = null;
            var optionArray = null;
            var optionIndex = 0;
            var filterOptionName = null;

            for (prop in propertyFilterInputHash)
            {
                if (propertyFilterInputHash.hasOwnProperty(prop))
                {
                    filterInput = propertyFilterInputHash[prop].input;
                    propertyIndex = propertyFilterInputHash[prop].index;
                    if (filterInput.length > 0)
                    {
                        filterName = filterInput.attr('name');
                        filterName = filterName.toLowerCase();
                        isCheckBox = filterInput.is(':checkbox');
                        if (isCheckBox)
                        {
                            filterInput.removeAttr('checked');
                        }
                        else
                        {
                            filterInput.val('');
                        }
                        for (i = 0; i < selectedFilterPropertyArray.length; i += 1)
                        {
                            selectedFilterProperty = selectedFilterPropertyArray[i];
                            comparePropertyTypeCode = selectedFilterProperty.propertyTypeCode.toLowerCase();
                            comparePropertyCode = selectedFilterProperty.propertyCode.toLowerCase();
                            if ((comparePropertyCode === 'true') && (comparePropertyTypeCode === filterName))
                            {
                                isCheckBox = filterInput.is(':checkbox');
                                if (isCheckBox)
                                {
                                    filterInput.attr('checked', 'checked');
                                }
                            }
                            else
                            {
                                optionArray = $('option', filterInput);
                                optionArray = optionArray || [];
                                for (optionIndex = 0; optionIndex < optionArray.length; optionIndex += 1)
                                {
                                    filterOptionName = optionArray[optionIndex].value;
                                    filterOptionName = filterOptionName || '';
                                    filterOptionName = filterOptionName.toLowerCase();
                                    if (comparePropertyCode === filterOptionName)
                                    {
                                        filterInput.val(selectedFilterProperty.propertyCode);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        /*
        When a unitInput is selected, the property and ssr filter control should remember its state for that unitInput.
        This method sets the filter control to what ssrs were searched for the last time the unitInput was active
        */
        thisUnitMapContainer.selectFilterSsrs = function(unitInput)
        {
            unitInput = unitInput || this.activeUnitInput;
            var selectedFilterSsrArray = unitInput.selectedFilterSsrArray;
            var ssrFilterInputHash = this.getSsrFilterInputHash();
            var filterInput = null;
            var i = 0;
            var isCheckBox = false;
            var prop = '';
            var selectedFilterSsr = null;
            var filterName = '';
            for (prop in ssrFilterInputHash)
            {
                if (ssrFilterInputHash.hasOwnProperty(prop))
                {
                    filterInput = ssrFilterInputHash[prop].input;
                    if (filterInput)
                    {
                        filterName = filterInput.attr('name');
                        isCheckBox = filterInput.is(':checkbox');
                        if (isCheckBox)
                        {
                            filterInput.removeAttr('checked');
                        }
                        else
                        {
                            filterInput.val('');
                        }
                        for (i = 0; i < selectedFilterSsrArray.length; i += 1)
                        {
                            selectedFilterSsr = selectedFilterSsrArray[i];
                            if (selectedFilterSsr.ssrCode === filterName)
                            {
                                isCheckBox = filterInput.is(':checkbox');
                                if (isCheckBox)
                                {
                                    filterInput.attr('checked', 'checked');
                                }
                                else
                                {
                                    filterInput.val(selectedFilterSsr.propertyCode);
                                }
                                break;
                            }
                        }
                    }
                }
            }
        };

        /*
        The property icons for a unit have a sort order, only the first few are displayed, 
        so that the seat is not overrun with property icons.
        This method compares two properties for sorting purposes.
        It is meant to be passed to the built in JavaScript array sort method.
        unitPropertyArray.sort(unitMapContainer.sortPropertyList);
        The array.sort() method takes as an argument a function to sort with.
        This method is to be used as that argument.
            
        Compares PropertyInstances using these steps:
        Step 1: Sort based on property type and whether there is an icon set for the property
        Step 2: Sort based on Display Priority
        Step 3: Sort based on Displayed Name            
        */
        thisUnitMapContainer.sortPropertyList = function(a, b)
        {
            var displayPriorityOne = a.displayPriority;
            var displayPriorityTwo = b.displayPriority;


            if (a !== null && b !== null)
            {
                // Step 1: Sort based on property type and whether there is an icon set for the property
                var result = thisUnitMapContainer.getPropertyInstanceWeight(a) - thisUnitMapContainer.getPropertyInstanceWeight(b);

                // Step 2: Sort based on Display Priority
                if (result === 0)
                {
                    result = displayPriorityOne - displayPriorityTwo;

                    // Step 3: Sort based on Displayed Name                
                    if (result === 0)
                    {
                        // if they have the same DisplayPriority, we sort them alphabeticaly.
                        result = thisUnitMapContainer.sortPropertyListByName(a, b);
                    }
                }
                return result;
            }
            else if (a == null && b != null)
            {
                return -1;
            }
            else if (a != null && b == null) 
            {
                return 1;
            }
            else
            {
                return 0;
            }
        };

        thisUnitMapContainer.getPropertyInstanceWeight = function(propertyType)
        {
            var result = 0;

            switch (propertyType.valueType)
            {
                case 'YesNo':
                    if (propertyType.iconContentName !== '')
                    {
                        result = 40;
                    }
                    else
                    {
                        result = 60;
                    }
                    break;
                case 'List':
                    if (propertyType.iconContentName !== '')
                    {
                        result = 30;
                    }
                    else
                    {
                        result = 50;
                    }
                    break;
                case 'Numeric':
                    result = 20;
                    break;
                default:
                    result = int.MaxValue;
                    break;
            }

            return result;
        };

        /*
        This function is used to sort the properties by name.
        */
        thisUnitMapContainer.sortPropertyListByName = function(propertyOne, propertyTwo)
        {
            var nameArray = null;
            var nameOne = propertyOne.name.toLowerCase();
            var nameTwo = propertyTwo.name.toLowerCase();
            var retVal = 0;
            if (nameOne !== nameTwo)
            {
                nameArray = [
                        nameOne,
                        nameTwo
                    ];
                nameArray.sort();

                if (nameArray[0] === nameOne)
                {
                    retVal = -1;
                }
                else
                {
                    retVal = 1;
                }
            }
            return retVal;
        };

        /*
        Gets what ssrs are selected in the filter control and returns them in a hash
        */
        thisUnitMapContainer.getSelectedSsrFilterInputHash = function()
        {
            var matchSsrUnitHash = {};
            var ssrFilterInputHash = this.getSsrFilterInputHash();
            var unitMap = this.activeUnitMap || {};
            var ssrCodeList = unitMap.ssrCodeList || [];
            var filterName = '';
            var filterValue = '';
            var filterInput = null;
            var i = 0;
            var isCheckBox = false;
            var isChecked = false;
            var ssrCode = '';
            for (i = 0; i < ssrCodeList.length; i += 1)
            {
                ssrCode = ssrCodeList[i];
                if (ssrFilterInputHash[ssrCode])
                {
                    filterInput = ssrFilterInputHash[ssrCode].input;
                    if (filterInput)
                    {
                        filterValue = filterInput.val();
                        isCheckBox = filterInput.is(':checkbox');
                        if (isCheckBox)
                        {
                            isChecked = filterInput.attr('checked');
                            if (!isChecked)
                            {
                                filterValue = '';
                            }
                        }
                        if (filterValue)
                        {
                            filterName = filterInput.attr('name');
                            matchSsrUnitHash[filterName] = {
                                'filterName': filterName,
                                'filterValue': filterValue,
                                'index': i
                            };
                        }
                    }
                }
            }
            return matchSsrUnitHash;
        };

        /*
        Gets what properties are selected on the auto assign view and returns them in a hash
        returns an object that looks like this
            
        {
        "property_AISLE_YesNo_0":
        {
        "autoAssignName": "AISLE",
        "autoAssignValue": "TRUE",
        "equipmentIndex": 0,
        "index": 0
        },
        "property_SEATPREF_List_0":
        {
        "autoAssignName": "SEATPREF",
        "autoAssignValue": "SMOKE",
        "equipmentIndex": 0,
        "index": 53
        }
        }
            
        */
        thisUnitMapContainer.getSelectedAutoAssignPropertyInputHash = function(unitInput)
        {
            var matchPropertyUnitHash = {};
            var autoAssignPropertyInputHash = this.getAutoAssignPropertyInputHash(unitInput);
            var autoAssignId = '';
            var autoAssignName = '';
            var autoAssignValue = '';
            var autoAssignInput = null;
            var isCheckBox = false;
            var isChecked = false;
            var isSelectBox = false;
            var prop = '';
            var propertyIndex = -1;
            var autoAssignPropertyInput = null;
            var equipmentIndex = -1;
            var propName = '';

            for (prop in autoAssignPropertyInputHash)
            {
                if (autoAssignPropertyInputHash.hasOwnProperty(prop))
                {
                    autoAssignPropertyInput = autoAssignPropertyInputHash[prop];
                    autoAssignInput = autoAssignPropertyInput.input;
                    propertyIndex = autoAssignPropertyInput.index;
                    equipmentIndex = autoAssignPropertyInput.equipmentIndex;
                    if (autoAssignInput.length > 0)
                    {
                        autoAssignValue = autoAssignInput.val();
                        isCheckBox = autoAssignInput.is(':checkbox');
                        isSelectBox = autoAssignInput.is('select');
                        if (isCheckBox)
                        {
                            isChecked = autoAssignInput.attr('checked');
                            if (!isChecked)
                            {
                                autoAssignValue = '';
                            }
                        }
                        else if (isSelectBox)
                        {
                            propName = autoAssignValue + '_List_' + equipmentIndex;
                            if (prop !== propName)
                            {
                                autoAssignValue = '';
                            }
                        }
                        if (autoAssignValue)
                        {
                            autoAssignId = autoAssignInput.attr('id');
                            autoAssignName = autoAssignInput.attr('name');
                            matchPropertyUnitHash[autoAssignId] = {
                                'autoAssignName': autoAssignName,
                                'autoAssignValue': autoAssignValue,
                                'index': propertyIndex,
                                'equipmentIndex': equipmentIndex
                            };
                        }
                    }
                }
            }
            return matchPropertyUnitHash;
        };

        /*
        Gets what properties are selected in the filter control and returns them in a hash
        */
        thisUnitMapContainer.getSelectedPropertyFilterInputHash = function()
        {
            var matchPropertyUnitHash = {};
            var propertyFilterInputHash = this.getPropertyFilterInputHash();
            var filterName = '';
            var filterValue = '';
            var filterInput = null;
            var isCheckBox = false;
            var isChecked = false;
            var isSelectBox = false;
            var prop = '';
            var propertyIndex = -1;
            for (prop in propertyFilterInputHash)
            {
                if (propertyFilterInputHash.hasOwnProperty(prop))
                {
                    filterInput = propertyFilterInputHash[prop].input;
                    propertyIndex = propertyFilterInputHash[prop].index;
                    if (filterInput.length > 0)
                    {
                        filterValue = filterInput.val();
                        isCheckBox = filterInput.is(':checkbox');
                        isSelectBox = filterInput.is('select');
                        if (isCheckBox)
                        {
                            isChecked = filterInput.attr('checked');
                            if (!isChecked)
                            {
                                filterValue = '';
                            }
                        }
                        else if (isSelectBox) {
                            if (prop !== filterValue + '_List') {
                                filterValue = '';
                            }
                        }
                        if (filterValue)
                        {
                            filterName = filterInput.attr('name');
                            matchPropertyUnitHash[filterName] = {
                                'filterName': filterName,
                                'filterValue': filterValue,
                                'index': propertyIndex
                            };
                        }
                    }
                }
            }
            return matchPropertyUnitHash;
        };

        /*
        Gets what a hash of all property inputs from the filter control
        */
        thisUnitMapContainer.getSsrFilterInputHash = function()
        {
            var ssrCode = '';
            var unitMap = this.activeUnitMap || {};
            var ssrCodeList = unitMap.ssrCodeList || [];
            var i = 0;
            var ssrHash = this.ssrHash;
            var ssr = null;
            var feeId = '';
            var filterPanelSsrContainer = this.getById('filterPanelSsrContainer');
            thisUnitMapContainer.ssrFilterInputHash = {};
            for (i = 0; i < ssrCodeList.length; i += 1)
            {
                ssrCode = ssrCodeList[i];
                ssr = ssrHash[ssrCode];
                if (ssr)
                {
                    feeId = ssr.ssrCode + 'Container';
                    thisUnitMapContainer.ssrFilterInputHash[ssr.ssrCode] = {
                        'input': $('#ssr_' + ssr.ssrCode, filterPanelSsrContainer),
                        'index': i,
                        'fee': $('#ssr_' + feeId, filterPanelSsrContainer)
                    };
                }
            }
            return this.ssrFilterInputHash;
        };


        /*
        Gets the list of property inputs from the auto assign view.
        returns an object that looks like this.
            
        {
        "propertyCode_propertyType_equipmentIndex": 
        {
        "equipmentIndex": 0,
        "index": 51,
        "input": A JQuery object that contains the dom input object
        },
        "AISLE_List_0":
        {
        "equipmentIndex": 0,
        "index": 51,
        "input": {}
        }
        }
            
        */
        thisUnitMapContainer.getAutoAssignPropertyInputHash = function(unitInput)
        {
            var unitMapArray = this.unitMapArray || [];
            var unitMapIndex = 0;
            var unitMap = null;
            var flattenedPropertyTypeList = [];
            var propertyIndex = 0;
            var flattenedPropertyType = null;
            thisUnitMapContainer.autoAssignPropertyInputHash = {};
            var propertyCode = '';
            var autoAssignPropertyContainer = this.getById('autoAssignPropertyContainer');
            var equipmentIndex = -1;
            var propertyId = '';
            var input = null;
            if (unitInput)
            {
                equipmentIndex = unitInput.equipmentIndex;
                equipmentIndex = parseInt(equipmentIndex, 10);
            }

            for (unitMapIndex = 0; unitMapIndex < unitMapArray.length; unitMapIndex += 1)
            {
                unitMap = unitMapArray[unitMapIndex];
                if (equipmentIndex === -1 || unitMap.equipmentIndex === equipmentIndex)
                {
                    flattenedPropertyTypeList = unitMap.flattenedPropertyTypeList;

                    for (propertyIndex = 0; propertyIndex < flattenedPropertyTypeList.length; propertyIndex += 1)
                    {
                        flattenedPropertyType = flattenedPropertyTypeList[propertyIndex];
                        if (flattenedPropertyType.searchable)
                        {
                            propertyCode = flattenedPropertyType.propertyCode;
                            if (propertyCode === "")
                            {
                                propertyCode = flattenedPropertyType.propertyTypeCode;
                            }

                            propertyId = 'property_' + flattenedPropertyType.propertyTypeCode + '_' + flattenedPropertyType.valueType + '_' + unitMap.equipmentIndex;
                            input = $('#' + propertyId, autoAssignPropertyContainer);

                            if (input.length > 0)
                            {
                                propertyCode = propertyCode + '_' + flattenedPropertyType.valueType + '_' + unitMap.equipmentIndex;
                                if (!this.autoAssignPropertyInputHash[propertyCode])
                                {
                                    this.autoAssignPropertyInputHash[propertyCode] = {
                                        'input': $('#' + propertyId, autoAssignPropertyContainer),
                                        'index': propertyIndex,
                                        'equipmentIndex': unitMap.equipmentIndex
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return this.autoAssignPropertyInputHash;
        };

        /*
        Gets what a hash of all ssr inputs from the filter control
        */
        thisUnitMapContainer.getPropertyFilterInputHash = function()
        {
            var unitMap = this.activeUnitMap || {};
            var flattenedPropertyTypeList = unitMap.flattenedPropertyTypeList || [];
            var propertyIndex = 0;
            var flattenedPropertyType = null;
            thisUnitMapContainer.propertyFilterInputHash = {};
            var propertyCode = '';
            var propertyId = '';
            var input = null;
            var filterPanelPropertyContainer = this.getById('filterPanelPropertyContainer');
            for (propertyIndex = 0; propertyIndex < flattenedPropertyTypeList.length; propertyIndex += 1)
            {
                flattenedPropertyType = flattenedPropertyTypeList[propertyIndex];
                if (flattenedPropertyType.searchable)
                {
                    propertyCode = flattenedPropertyType.propertyCode;
                    if (propertyCode === "")
                    {
                        propertyCode = flattenedPropertyType.propertyTypeCode;
                    }

                    propertyId = 'property_' + flattenedPropertyType.propertyTypeCode + '_' + flattenedPropertyType.valueType;
                    input = $('#' + propertyId, filterPanelPropertyContainer);

                    propertyCode = propertyCode + '_' + flattenedPropertyType.valueType;
                    if (!this.propertyFilterInputHash[propertyCode])
                    {
                        this.propertyFilterInputHash[propertyCode] = {
                            'input': $('#' + propertyId, filterPanelPropertyContainer),
                            'index': propertyIndex
                        };
                    }
                }
            }
            return this.propertyFilterInputHash;
        };

        /*
        In order to save the properties and ssrs that were selected with the filter control
        we write them to the dom to be sent to the server during the postBack.
        */
        thisUnitMapContainer.writeFilterToDom = function(unitInput)
        {
            this.writeFilterPropertiesToDom(unitInput);
            this.writeFilterSsrsToDom(unitInput);
        };

        /*
        In order to save the ssrs that were selected with the filter control
        we write them to the dom to be sent to the server during the postBack.
        */
        thisUnitMapContainer.writeFilterSsrsToDom = function(unitInput)
        {
            var ssrContainerId = 'selectedFilterSsrInputContainer';
            var ssrContainer = this.getById(ssrContainerId);
            unitInput = unitInput || this.activeUnitInput;
            var selectedSsrHash = {};
            var prop = '';
            var unitInputKey = '';
            var currentSelectedSsrHash = this.getSelectedSsrFilterInputHash();
            var currentSelectedSsr = null;
            var selectedSsrArray = [];
            var selectedSsr = null;
            var selectedSsrHtml = '';
            var i = 0;
            var clientId = this.clientId;
            var clientName = this.clientName;
            var inputId = '';
            var inputName = '';
            var del = this.delimiter;
            var selectedFilterSsrArray = null;
            var id = '';
            if (unitInput)
            {
                unitInputKey = unitInput.getKey();
                id = 'selectedFilterSsrInputContainer' + del + unitInputKey;
                selectedFilterSsrArray = [];
                if (!selectedSsrHash[unitInputKey])
                {
                    selectedSsrHash[unitInputKey] = [];
                }
                selectedSsrArray = selectedSsrHash[unitInputKey];

                for (prop in currentSelectedSsrHash)
                {
                    if (currentSelectedSsrHash.hasOwnProperty(prop))
                    {
                        currentSelectedSsr = currentSelectedSsrHash[prop];
                        selectedSsrArray[selectedSsrArray.length] = currentSelectedSsr;
                    }
                }
                selectedSsrHash[unitInputKey] = selectedSsrArray;

                for (prop in selectedSsrHash)
                {
                    if (selectedSsrHash.hasOwnProperty(prop))
                    {
                        selectedSsrArray = selectedSsrHash[prop];
                        for (i = 0; i < selectedSsrArray.length; i += 1)
                        {
                            selectedSsr = selectedSsrArray[i];
                            inputId = clientId + del + unitInput.equipmentIndex + del + unitInput.passengerNumber + del + selectedSsr.filterName;
                            inputName = clientName + '$selectedFilterSsr_' + unitInput.equipmentIndex + del + unitInput.passengerNumber + del + selectedSsr.filterName;
                            selectedSsrHtml += '<input type="hidden" id="' + inputId + '" name="' + inputName + '" value="' + selectedSsr.filterValue + '" />';
                            selectedFilterSsrArray[selectedFilterSsrArray.length] = {
                                'ssrCode': selectedSsr.filterName,
                                'quantity': selectedSsr.filterValue
                            };
                        }
                    }
                }
                unitInput.selectedFilterSsrArray = selectedFilterSsrArray;
                this.getById(id).remove();
                ssrContainer.append('<span id="' + id + '">' + selectedSsrHtml + '</span>');
            }
        };

        /*
        In order to save the properties that were selected on the auto assign page
        we write them to the dom to be sent to the server during the postBack.
        */
        thisUnitMapContainer.writeAutoAssignPropertiesToDom = function(unitInput)
        {
            var propertyContainerId = 'selectedAutoAssignPropertyInputContainer';
            var propertyContainer = this.getById(propertyContainerId);
            unitInput = unitInput || this.activeUnitInput;
            var selectedPropertyHash = {};
            var prop = '';
            var unitInputKey = '';
            var currentSelectedPropertyHash = this.getSelectedAutoAssignPropertyInputHash(unitInput);
            var currentSelectedProperty = null;
            var selectedPropertyArray = [];
            var selectedProperty = null;
            var selectedPropertyHtml = '';
            var i = 0;
            var clientId = this.clientId;
            var clientName = this.clientName;
            var inputId = '';
            var inputName = '';
            var del = thisUnitMapContainer.delimiter;
            var selectedAutoAssignPropertyArray = null;
            var id = '';
            var unitInputEquipmentIndex = -1;

            if (unitInput)
            {
                id = 'selectedAutoAssignPropertyInputContainer' + del + unitInput.getKey();
                selectedAutoAssignPropertyArray = unitInput.selectedAutoAssignPropertyArray || [];
                unitInputKey = unitInput.getKey();
                if (!selectedPropertyHash[unitInputKey])
                {
                    selectedPropertyHash[unitInputKey] = [];
                }
                selectedPropertyArray = selectedPropertyHash[unitInputKey];

                for (prop in currentSelectedPropertyHash)
                {
                    if (currentSelectedPropertyHash.hasOwnProperty(prop))
                    {
                        currentSelectedProperty = currentSelectedPropertyHash[prop];
                        selectedPropertyArray[selectedPropertyArray.length] = currentSelectedProperty;
                    }
                }
                selectedPropertyHash[unitInputKey] = selectedPropertyArray;

                for (prop in selectedPropertyHash)
                {
                    if (selectedPropertyHash.hasOwnProperty(prop))
                    {
                        selectedPropertyArray = selectedPropertyHash[prop];
                        for (i = 0; i < selectedPropertyArray.length; i += 1)
                        {
                            selectedProperty = selectedPropertyArray[i];
                            unitInputEquipmentIndex = parseInt(unitInput.equipmentIndex, 10);
                            if (unitInputEquipmentIndex === selectedProperty.equipmentIndex)
                            {
                                inputId = clientId + del + unitInput.equipmentIndex + del + unitInput.passengerNumber + del + selectedProperty.autoAssignName;
                                inputName = clientName + '$selectedFilterProperty_' + unitInput.equipmentIndex + del + unitInput.passengerNumber + del + selectedProperty.autoAssignName;
                                selectedPropertyHtml += '<input type="hidden" id="' + inputId + '" name="' + inputName + '" value="' + selectedProperty.autoAssignValue + '" />';
                                selectedAutoAssignPropertyArray[selectedAutoAssignPropertyArray.length] = {
                                    'propertyCode': selectedProperty.autoAssignValue,
                                    'propertyTypeCode': selectedProperty.autoAssignName
                                };
                            }
                        }
                    }
                }
                unitInput.selectedAutoAssignPropertyArray = selectedAutoAssignPropertyArray;
                this.getById(id).remove();
                propertyContainer.append('<span id="' + id + '">' + selectedPropertyHtml + '</span>');
            }
        };

        /*
        In order to save the properties that were selected with the filter control
        we write them to the dom to be sent to the server during the postBack.
        */
        thisUnitMapContainer.writeFilterPropertiesToDom = function(unitInput)
        {
            var propertyContainerId = 'selectedFilterPropertyInputContainer';
            var propertyContainer = this.getById(propertyContainerId);
            unitInput = unitInput || this.activeUnitInput;
            var selectedPropertyHash = {};
            var prop = '';
            var unitInputKey = '';
            var currentSelectedPropertyHash = this.getSelectedPropertyFilterInputHash();
            var currentSelectedProperty = null;
            var selectedPropertyArray = [];
            var selectedProperty = null;
            var selectedPropertyHtml = '';
            var i = 0;
            var clientId = this.clientId;
            var clientName = this.clientName;
            var inputId = '';
            var inputName = '';
            var del = thisUnitMapContainer.delimiter;
            var selectedFilterPropertyArray = null;
            var id = '';
            if (unitInput)
            {
                id = 'selectedFilterPropertyInputContainer' + del + unitInput.getKey();
                selectedFilterPropertyArray = [];
                unitInputKey = unitInput.getKey();
                if (!selectedPropertyHash[unitInputKey])
                {
                    selectedPropertyHash[unitInputKey] = [];
                }
                selectedPropertyArray = selectedPropertyHash[unitInputKey];

                for (prop in currentSelectedPropertyHash)
                {
                    if (currentSelectedPropertyHash.hasOwnProperty(prop))
                    {
                        currentSelectedProperty = currentSelectedPropertyHash[prop];
                        selectedPropertyArray[selectedPropertyArray.length] = currentSelectedProperty;
                    }
                }
                selectedPropertyHash[unitInputKey] = selectedPropertyArray;

                for (prop in selectedPropertyHash)
                {
                    if (selectedPropertyHash.hasOwnProperty(prop))
                    {
                        selectedPropertyArray = selectedPropertyHash[prop];
                        for (i = 0; i < selectedPropertyArray.length; i += 1)
                        {
                            selectedProperty = selectedPropertyArray[i];
                            inputId = clientId + del + unitInput.equipmentIndex + del + unitInput.passengerNumber + del + selectedProperty.filterName;
                            inputName = clientName + '$selectedFilterProperty_' + unitInput.equipmentIndex + del + unitInput.passengerNumber + del + selectedProperty.filterName;
                            selectedPropertyHtml += '<input type="hidden" id="' + inputId + '" name="' + inputName + '" value="' + selectedProperty.filterValue + '" />';
                            selectedFilterPropertyArray[selectedFilterPropertyArray.length] = {
                                'propertyCode': selectedProperty.filterValue,
                                'propertyTypeCode': selectedProperty.filterName
                            };
                        }
                    }
                }
                unitInput.selectedFilterPropertyArray = selectedFilterPropertyArray;
                this.getById(id).remove();
                propertyContainer.append('<span id="' + id + '">' + selectedPropertyHtml + '</span>');
            }
        };

        /*
        This method gets the properties that were unfulfilled when we did an auto assign.
        If the person selects a preference of window, but does not get a window seat uring auto assign
        window will com back as an unfulfilled property.
        */
        thisUnitMapContainer.getUnfulfilledPropertyHash = function(unitInput)
        {
            var unfulfilledPropertyHash = {};
            var i = 0;
            var unfulfilledPropertyArray = null;
            var unfulfilledProperty = null;
            var key = '';
            var value = '';
            var unfulfilledPropertyObject = null;

            unfulfilledPropertyArray = unitInput.unfulfilledPropertyArray;
            for (i = 0; i < unfulfilledPropertyArray.length; i += 1)
            {
                unfulfilledProperty = unfulfilledPropertyArray[i];
                key = unfulfilledProperty.key;
                value = unfulfilledProperty.value;
                unfulfilledPropertyObject = null;
                if (value.toLowerCase() === 'true')
                {
                    unfulfilledPropertyObject = this.getPropertyByPropertyTypeCode(key, unitInput);
                }
                else
                {
                    unfulfilledPropertyObject = this.getPropertyByPropertyCode(value, unitInput);
                }
                unfulfilledPropertyHash[key] = unfulfilledPropertyObject;
            }
            return unfulfilledPropertyHash;
        };

        thisUnitMapContainer.getEquipmentByUnitInput = function(unitInput)
        {
            unitInput = unitInput || this.activeUnitInput;
            var unitMapArray = this.unitMapArray || [];
            var equipmentIndex = unitInput.equipmentIndex;
            equipmentIndex = parseInt(equipmentIndex, 10);
            var equipment = null;
            if (unitMapArray.length > equipmentIndex)
            {
                equipment = unitMapArray[equipmentIndex];
            }
            return equipment;
        };

        thisUnitMapContainer.getPropertyByPropertyCode = function(propertyCode, unitInput)
        {
            var equipment = this.getEquipmentByUnitInput(unitInput) || {};
            var i = 0;
            var flattenedPropertyTypeList = null;
            var flattenedPropertyType = null;
            var property = { "name": "" };
            flattenedPropertyTypeList = equipment.flattenedPropertyTypeList || [];
            for (i = 0; i < flattenedPropertyTypeList.length; i += 1)
            {
                flattenedPropertyType = flattenedPropertyTypeList[i];
                if (flattenedPropertyType.propertyCode === propertyCode)
                {
                    property = flattenedPropertyType;
                    break;
                }
            }
            return property;
        };

        thisUnitMapContainer.getPropertyByPropertyTypeCode = function(propertyTypeCode, unitInput)
        {
            var equipment = this.getEquipmentByUnitInput(unitInput) || {};
            var i = 0;
            var flattenedPropertyTypeList = null;
            var flattenedPropertyType = null;
            var property = { "name": "" };
            flattenedPropertyTypeList = equipment.flattenedPropertyTypeList || [];
            for (i = 0; i < flattenedPropertyTypeList.length; i += 1)
            {
                flattenedPropertyType = flattenedPropertyTypeList[i];
                if (flattenedPropertyType.propertyTypeCode === propertyTypeCode)
                {
                    property = flattenedPropertyType;
                    break;
                }
            }
            return property;
        };

        /*
        This method gets the message to display when the passengers 
        were not able to be seated together
        */
        thisUnitMapContainer.getNotSeatedTogether = function(unitInput)
        {
            var notSeatedTogether = "";
            notSeatedTogether = unitInput.notSeatedTogether;
            return notSeatedTogether;
        };

        thisUnitMapContainer.getIconImageUri = function(iconContentName)
        {
            var imageUri = '';
            if (iconContentName)
            {
                imageUri = this.propertyIconImagePath + iconContentName;
            }
            else
            {
                imageUri = this.equipmentImagePath + this.blankImageName;
            }
            return imageUri;
        };

        return thisUnitMapContainer;
    };
}

/*
    Name: 
        Class UnitMap
    Param:
        None
    Return: 
        An instance of UnitMap
    Functionality:
        Is an object that links an equipment to properties that are not part of the equipment, but are equipment specific.
        SeatFees, Available Ssrs, and the list of Properties are some examples.
    Notes:
    Class Hierarchy:
        SkySales -> UnitMap
*/
if (SKYSALES.Class.UnitMap === undefined)
{
    SKYSALES.Class.UnitMap = function()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisUnitMap = SKYSALES.Util.extendObject(parent);

        thisUnitMap.equipmentIndex = -1;
        thisUnitMap.equipment = null;
        thisUnitMap.flattenedPropertyTypeList = [];
        thisUnitMap.numericPropertyCodeList = [];
        thisUnitMap.numericPropertyHash = {};
        thisUnitMap.ssrCodeList = [];
        thisUnitMap.linkId = '';
        thisUnitMap.link = null;
        thisUnitMap.tripInputId = '';
        thisUnitMap.tripInput = null;
        thisUnitMap.unitMapContainer = null;

        thisUnitMap.init = function (json)
        {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisUnitMap.setVars = function ()
        {
            thisUnitMap.link = this.getById(this.linkId);
            thisUnitMap.tripInput = this.getById(this.tripInputId);
        };
        thisUnitMap.hide = function() { };
        thisUnitMap.show = function() { };

        thisUnitMap.setSettingsByObject = function(json)
        {
            var equipment = {};
            var flattenedPropertyTypeList = [];
            var numericPropertyCodeList = [];
            var numericPropertyList = [];
            var ssrCodeList = [];
            var i = 0;
            var numericProperty = null;
            var numericPropertyCode = '';

            if (json.flattenedPropertyTypeListJson)
            {
                flattenedPropertyTypeList = json.flattenedPropertyTypeListJson.FlattenedPropertyTypeList || [];
                thisUnitMap.flattenedPropertyTypeList = flattenedPropertyTypeList;
            }
            if (json.numericPropertyCodeListJson)
            {
                numericPropertyCodeList = json.numericPropertyCodeListJson.PropertyCodeList || [];
                thisUnitMap.numericPropertyCodeList = numericPropertyCodeList;
            }
            if (json.numericPropertyListJson)
            {
                numericPropertyList = json.numericPropertyListJson.FlattenedPropertyTypeList || [];
                for (i = 0; i < numericPropertyList.length; i += 1)
                {
                    numericProperty = numericPropertyList[i];
                    numericPropertyCode = numericProperty.propertyTypeCode;
                    thisUnitMap.numericPropertyHash[numericPropertyCode] = numericProperty;
                }
            }
            if (json.ssrCodeListJson)
            {
                ssrCodeList = json.ssrCodeListJson.SsrCodeList || [];
                thisUnitMap.ssrCodeList = ssrCodeList;
            }
            if (json.equipmentJson)
            {
                equipment = SKYSALES.Class.Equipment();
                equipment.unitMap = this;
                equipment.equipmentIndex = this.equipmentIndex;
                equipment.init(json.equipmentJson);
                thisUnitMap.equipment = equipment;
            }

            if (json.linkId)
            {
                thisUnitMap.linkId = json.linkId;
            }

            if (json.tripInputId)
            {
                thisUnitMap.tripInputId = json.tripInputId;
            }
        };

        thisUnitMap.addEvents = function() {
            parent.addEvents.call(this);
            this.link.click(this.postBackForEquipment);
        }

        thisUnitMap.postBackForEquipment = function() {
            thisUnitMap.tripInput.val(thisUnitMap.equipmentIndex);
            window.__doPostBack(thisUnitMap.unitMapContainer.clientName + '$LinkButtonTripSelector', '');
        }
        
        return thisUnitMap;
    };
}

/*
    Name: 
        Class EquipmentBase
    Param:
        None
    Return: 
        An instance of EquipmentBase
    Functionality:
        Adds the convertParamObject method.
        Any object that needs to call convertParamObject should inherit from this class
    Notes:
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase
*/
if (SKYSALES.Class.EquipmentBase === undefined)
{
    SKYSALES.Class.EquipmentBase = function ()
    {
        var parent = SKYSALES.Class.UnitContainer();
        var thisEquipmentBase = SKYSALES.Util.extendObject(parent);
        
        thisEquipmentBase.convertParamObject = SKYSALES.Class.EquipmentBase.prototype.convertParamObject;
        return thisEquipmentBase;
    };
    SKYSALES.Class.EquipmentBase.prototype.convertParamObject = function (keyHash, json)
    {
        var prop = '';
        var name = '';
        for (prop in keyHash)
        {
            if (keyHash.hasOwnProperty(prop))
            {
                name = keyHash[prop];
                if ((name !== prop) && (json[prop] !== undefined))
                {
                    json[name] = json[prop];
                    delete json[prop];
                }
            }
        }
    };
}

/*
    Name: 
        Class Equipment
    Param:
        None
    Return: 
        An instance of Equipment
    Functionality:
        Represents an EquipmentInfo object
        Contains a list of cars, or cabins
    Notes:
        The equipmentKeyHash makes it possible to turn short property names from the JSON
        into readable names. The short names are there so that the data downloads faster,
        but it is to hard to read so the equipmentKeyHash is used to turn the short names into more readable names.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Equipment
*/
if (SKYSALES.Class.Equipment === undefined)
{
    SKYSALES.Class.Equipment = function ()
    {
        var parent = SKYSALES.Class.EquipmentBase();
        var thisEquipment = SKYSALES.Util.extendObject(parent);
        
        thisEquipment.arrivalStation = '';
        thisEquipment.equipmentCategory = '';
        thisEquipment.equipmentType = '';
        thisEquipment.equipmentTypeSuffix = '';
        thisEquipment.marketingCode = '';
        thisEquipment.availableUnits = 0;
        thisEquipment.departureStation = '';
        thisEquipment.propertyArray = [];
        thisEquipment.compartmentHash = {};
        // Do not use compartmentArray, it gets deleted
        thisEquipment.compartmentArray = [];
        thisEquipment.filterButtonId = 'filterEquipmentButton';
        thisEquipment.filterButton = null;
        thisEquipment.propertiesInUse = null;
        thisEquipment.compartmentCount = 0;
        thisEquipment.isStripped = true;
        //isActive can be true, false, 0 , or 1 so use if (this.isActive)
        thisEquipment.isActive = false;
        thisEquipment.unitMap = null;
        thisEquipment.equipmentIndex = -1;
        
        thisEquipment.init = function (json)
        {
            var keyHash = SKYSALES.Class.Equipment.equipmentKeyHash;
            this.convertParamObject(keyHash, json);
            this.setSettingsByObject(json);
            this.populateCompartmentHash();
            this.setVars();
            if (this.isActive)
            {
                this.addEvents();
            }
        };
        thisEquipment.getKey = function ()
        {
            return this.equipmentIndex;
        };
        
        /*
            A deck is the same as a compartment and multiple compartments can have the same compartment designator.
            So we create a hash with the compartmentDesignator as the key and an array of compartments as the value.
            The array of compartments are the decks with the same compartment designator.
            {
                'A': [{'deck': 1},{'deck2'}],
                'B': [{'deck': 1},{'deck2'}]
            }
        */
        thisEquipment.populateCompartmentHash = function ()
        {
            var i = '';
            var compartment = null;
            var compartmentHash = this.compartmentHash;
            var compartmentDesignator = '';
            var deckArray = null;
            for (i = 0; i < this.compartmentArray.length; i += 1)
            {
                compartment = SKYSALES.Class.Compartment();
                compartment.equipment = thisEquipment;
                compartment.compartmentIndex = i;
                compartment.init(thisEquipment.compartmentArray[i]);
                compartmentDesignator = compartment.compartmentDesignator;
                deckArray = compartmentHash[compartmentDesignator] || [];
                deckArray[deckArray.length] = compartment;
                thisEquipment.compartmentHash[compartment.compartmentDesignator] = deckArray;
            }
            this.activateDefaultCompartment();
            delete thisEquipment.compartmentArray;
        };
        
        //On page load initialize the compartment that has the most number of available seats
        thisEquipment.activateDefaultCompartment = function ()
        {
            var compartment = null;
            var compartmentHash = this.compartmentHash;
            var prop = '';
            var deckArray = null;
            var i = 0;
            var compartmentToSwitchTo = null;
        
            for (prop in compartmentHash)
            {
                if (compartmentHash.hasOwnProperty(prop))
                {
                    deckArray = compartmentHash[prop];
                    for (i = 0; i < deckArray.length; i += 1)
                    {
                        compartment = deckArray[i];
                        compartment.isActive = false;
                        if ((!compartmentToSwitchTo) || (compartment.availableUnits > compartmentToSwitchTo.availableUnits))
                        {
                            compartmentToSwitchTo = compartment;
                        } 
                    }
                }
            }
            if (compartmentToSwitchTo)
            {
                compartmentToSwitchTo.updateCompartment();
            }
        };
        
        thisEquipment.updateEquipmentFilterHandler = function ()
        {
            thisEquipment.updateEquipmentFilter();
        };
        thisEquipment.updateEquipmentFilter = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var prop = '';
            var compartment = null;
            var selectedCompartment = unitMapContainer.activeCompartment;
            var deckArray = null;
            var i = 0;
            
            selectedCompartment.updateCompartmentFilter();
            
            for (prop in thisEquipment.compartmentHash)
            {
                if (thisEquipment.compartmentHash.hasOwnProperty(prop))
                {
                    deckArray = thisEquipment.compartmentHash[prop] || [];
                    for (i = 0; i < deckArray.length; i += 1)
                    {
                        compartment = deckArray[i];
                        if (compartment)
                        {
                            if (compartment !== selectedCompartment)
                            {
                                compartment.updateCompartmentFilter();
                            }
                            if (compartment.unitsWithSelectedCriteria)
                            {
                                if (!selectedCompartment.unitsWithSelectedCriteria)
                                {
                                    selectedCompartment = compartment;
                                }
                                else if (compartment.availableUnits > selectedCompartment.availableUnits)
                                {
                                    selectedCompartment = compartment;
                                }
                                else if ((compartment.availableUnits === selectedCompartment.availableUnits) && 
                                            (compartment.unitsWithSelectedCriteria > selectedCompartment.unitsWithSelectedCriteria)
                                            )
                                {
                                    selectedCompartment = compartment;
                                }
                            }
                        }
                    }
                }
            }
            if (selectedCompartment.unitsWithSelectedCriteria === 0)
            {
                unitMapContainer.showNoUnitsMeetFilterCriteria();
            }
            else
            {
                selectedCompartment.updateCompartment();
            }
            unitMapContainer.writeFilterToDom();
        };
        thisEquipment.addEvents = function ()
        {
            parent.addEvents.call(this);
            thisEquipment.filterButton.click(this.updateEquipmentFilterHandler);
        };
        thisEquipment.setVars = function ()
        {
            parent.setVars.call(this);
            thisEquipment.filterButton = this.getById(this.filterButtonId);
            delete thisEquipment.filterButtonId;
        };
        thisEquipment.getUnitMapContainer = function ()
        {
            return this.unitMap.unitMapContainer;
        };
        thisEquipment.getFlattenedPropertyTypeList = function ()
        {
            return this.unitMap.flattenedPropertyTypeList;
        };
        thisEquipment.getNumericPropertyCodeList = function ()
        {
            return this.unitMap.numericPropertyCodeList;
        };
        thisEquipment.getSsrCodeList = function ()
        {
            return this.unitMap.ssrCodeList;
        };
        thisEquipment.getNumericPropertyHash = function ()
        {
            return this.unitMap.numericPropertyHash;
        };
        return thisEquipment;
    };
    SKYSALES.Class.Equipment.equipmentKeyHash = {
        'as': 'arrivalStation',
        'ec': 'equipmentCategory',
        'et': 'equipmentType',
        'ets': 'equipmentTypeSuffix',
        'mc': 'marketingCode',
        'au': 'availableUnits',
        'ds': 'departureStation',
        'p': 'properties',
        'c': 'compartmentArray',
        'piu': 'propertiesInUse',
        'is': 'isStripped',
        'ia': 'isActive'
    };
}

/*
    Name: 
        Class Compartment
    Param:
        None
    Return: 
        An instance of Compartment
    Functionality:
        Represents an Compartment object
        Contains a list of units that represent the individual objects on an equipment.
    Notes:
        The compartmentKeyHash makes it possible to turn short property names from the JSON
        into readable names. The short names are there so that the data downloads faster,
        but it is to hard to read so the compartmentKeyHash is used to turn the short names into more readable names.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Compartment
*/
if (SKYSALES.Class.Compartment === undefined)
{
    SKYSALES.Class.Compartment = function ()
    {
        var parent = SKYSALES.Class.EquipmentBase();
        var thisCompartment = SKYSALES.Util.extendObject(parent);
        
        thisCompartment.equipment = null;
        thisCompartment.compartmentIndex = -1;
        thisCompartment.deck = -1;
        thisCompartment.compartmentDesignator = '';
        thisCompartment.len = '';
        thisCompartment.availableUnits = 0;
        //thisCompartment.propertyArray = '';
        thisCompartment.sequence = '';
        thisCompartment.width = '';
        thisCompartment.unitHash = {};
        // Do not use: thisCompartment.unitArray it gets deleted, use thisCompartment.unitHash
        thisCompartment.unitArray = [];
        thisCompartment.isActive = false;
        thisCompartment.unitsAvailableSpan = null;
        
        thisCompartment.compartmentContainerId = 'deck';
        thisCompartment.compartmentContainer = null;
        
        thisCompartment.unitHtmlArray = null;
        
        thisCompartment.inputId = '';
        thisCompartment.input = null;
        thisCompartment.availableSeatsId = '';
        thisCompartment.deckTabsId = 'deckTabs';
        thisCompartment.deckTabs = null;
        thisCompartment.deckTabId = 'deckTab_';
        thisCompartment.deckTab = null;
        thisCompartment.deckTabLabelId = 'deckTabLabel_';
        thisCompartment.deckTabLabel = null;
        thisCompartment.deckTabAId = 'deckTabA_';
        thisCompartment.deckTabA = null;
        
        thisCompartment.propertyFilterInputHash = null;
        thisCompartment.ssrFilterInputHash = null;
        thisCompartment.unitsWithSelectedCriteria = 0;
        thisCompartment.delimiter = '_';
        
        thisCompartment.init = function (json)
        {
            var keyHash = SKYSALES.Class.Compartment.compartmentKeyHash;
            this.convertParamObject(keyHash, json);
            this.setSettingsByObject(json);
            this.populateUnitHash();
            this.setVars();
            this.addEvents();
            this.unitsAvailableSpan.text(this.availableUnits);
        };
        thisCompartment.getUnitMapContainer = function ()
        {
            return this.equipment.getUnitMapContainer();
        };
        thisCompartment.setSettingsByObject = function (jsonObject)
        {
            parent.setSettingsByObject.call(this, jsonObject);
            var del = thisCompartment.delimiter;
            var unitMapContainer = this.getUnitMapContainer();
            thisCompartment.compartmentDesignator = unitMapContainer.clean(this.compartmentDesignator);
            thisCompartment.containerId = 'compartment' + del + this.compartmentDesignator + del + this.deck;
            thisCompartment.unitContainerId = this.compartmentDesignator + del + this.deck;
            thisCompartment.availableSeatsId = 'availableSeats_compartment' + del + this.compartmentDesignator + del + 'deck' + del + this.deck;
        };
        
        /*
            This method updates the compartment to highlight the seats that you searched for
        */
        thisCompartment.updateCompartmentFilter = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var filterValueObj = '';
            var prop = '';
            var unit = null;
            var matchesFilter = true;
            var hasProperty = false;
            var hasSsr = false;
            var unitInput = unitMapContainer.activeUnitInput;
            var matchPropertyUnitHash = unitMapContainer.getSelectedPropertyFilterInputHash(unitInput);
            var matchSsrUnitHash = unitMapContainer.getSelectedSsrFilterInputHash();
            thisCompartment.unitsWithSelectedCriteria = 0;
            this.draw();
            
            for (prop in thisCompartment.unitHash)
            {
                if (this.unitHash.hasOwnProperty(prop))
                {
                    matchesFilter = true;
                    unit = this.unitHash[prop];
                    if (unit.hasProperty && unit.unitAvailability === 'Open')
                    {
                        unit.updateSeatImage();
                        for (prop in matchPropertyUnitHash)
                        {
                            if (matchPropertyUnitHash.hasOwnProperty(prop))
                            {
                                filterValueObj = matchPropertyUnitHash[prop];
                                if (filterValueObj.index > -1)
                                {
                                    hasProperty = unit.hasProperty(filterValueObj.index);
                                    if (!hasProperty)
                                    {
                                        matchesFilter = false;
                                        break;
                                    }
                                }
                            }
                        }
                        if (matchesFilter === true)
                        {
                            for (prop in matchSsrUnitHash)
                            {
                                if (matchSsrUnitHash.hasOwnProperty(prop))
                                {
                                    filterValueObj = matchSsrUnitHash[prop];
                                    if (filterValueObj.index > -1)
                                    {
                                        hasSsr = unit.hasSsr(filterValueObj.index);
                                        if (!hasSsr)
                                        {
                                            matchesFilter = false;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        if (matchesFilter === true)
                        {
                            unit.updateSeatImage('Filtered');
                            thisCompartment.unitsWithSelectedCriteria += 1;
                        }
                    }
                }
            }
        };
        
        //Draw the compartment, header and footer, and call unit.draw on all of the units in this compartment
        //This method writes the unit html to the dom
        thisCompartment.draw = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var prop = '';
            var unit = null;
            var i = 0;
            var wallHtml = '';
            var grid = parseFloat(unitMapContainer.grid, 10);
            var equipmentType = this.equipment.equipmentCategory;
            //var trainNoseWidth = 336;
            var trainNoseHeight = 120;
            var noseWidth = 200;
            var noseHeight = 300;
            var tailHeight = 158;
            var width = thisCompartment.width;
            var tWidth = thisCompartment.width;
            var len = thisCompartment.len;
            var rate = (width * grid) / noseWidth;
            var imageDir = 'images/Base/equipment/';
            var compartmentHashLen = this.equipment.compartmentCount;
            var compartmentTop = 0;
            if (this.unitHtmlArray === null)
            {
                thisCompartment.unitHtmlArray = [];
                i = 0;
                for (prop in this.unitHash)
                {
                    if (this.unitHash.hasOwnProperty(prop))
                    {
                        unit = this.unitHash[prop];
                        thisCompartment.unitHtmlArray[i] = unit.getUnitHtml();
                        i += 1;
                    }
                }
                wallHtml += '<div class="floor" style="top:' + grid + 'px;left:0px;width:' + grid * width + 'px; height:' + grid * (len - 1) + 'px;"></div>';
                if (equipmentType === 'Train')
                {
                    tWidth = (tWidth * grid) + 32;
                    
                    compartmentTop = trainNoseHeight * rate - grid;
                    wallHtml += '<div id="nose" style="top:' + (trainNoseHeight) * -1 + 'px; left:0px; height:' + trainNoseHeight + 'px; width:' + tWidth + 'px">';
                    wallHtml += '<img src="' + imageDir + 'train-nose.png" height="' + trainNoseHeight + 'px;" width="' + tWidth + 'px;" alt=""/>';
                    wallHtml += '</div>';

                    wallHtml += '<div class="wall" style="top:0; left:0px; width:' + grid * width + 'px; height:' + grid + 'px;"></div>';
                    wallHtml += '<div class="wall" style="top:' + grid * len + 'px; left:0px; width:' + grid * width + 'px; height:' + grid + 'px;"></div>';
                    wallHtml += '<div class="wall" style="top:' + grid + 'px; left:0; width:' + grid + 'px; height:' + grid * (len - 1) + 'px;"></div>';
                    wallHtml += '<div class="wall" style="top:' + grid + 'px; left:' + grid * (width - 1) + 'px; width:' + grid + 'px; height:' + grid * (len - 1) + 'px;"></div>';

                    wallHtml += '<div id="tail" style="top:' + len * grid + 'px; left:0px; height:' + tailHeight * rate + 'px; width:' + tWidth + 'px">';
                    wallHtml += '<img src="' + imageDir + 'train-tail.png" width="' + tWidth + 'px;" alt=""/>';
                    wallHtml += '</div>';               
                }
                else
                {
                    if (this.compartmentIndex === 0)
                    {
                        compartmentTop = noseHeight * rate - grid;
                        wallHtml += '<div id="nose" style="top:' + (noseHeight * rate - grid) * -1 + 'px; left:0px; height:' + noseHeight * rate + 'px; width:' + width * grid + 'px">';
                        wallHtml += '<img src="' + imageDir + 'nose.gif" width="' + noseWidth * rate + 'px;" alt=""/>';
                        wallHtml += '</div>';
                    }

                    if (this.compartmentIndex === (compartmentHashLen - 1))
                    {
                        wallHtml += '<div id="tail" style="top:' + len * grid + 'px; left:0px; height:' + tailHeight * rate + 'px; width:' + width * grid + 'px">';
                        wallHtml += '<img src="' + imageDir + 'tail.gif" width="' + noseWidth * rate + 'px;" alt=""/>';
                        wallHtml += '</div>';
                    }
                    wallHtml += '<div class="wallRight" style="top:' + grid + 'px; left:0px; width:' + grid + 'px; height:' + grid * (len - 1) + 'px;"></div>';
                    wallHtml += '<div class="wallLeft" style="top:' + grid + 'px;left:' + grid * (width - 1) + 'px;width:' + grid + 'px; height:' + grid * (len - 1) + 'px;"></div>';
                }
                this.compartmentContainer.css('top', compartmentTop);
                this.compartmentContainer.height(grid * len);
                this.compartmentContainer.width((grid * width) + 50);
                this.compartmentContainer.append('<div id="' + this.unitContainerId + '" class="hidden" >' + wallHtml + this.unitHtmlArray.join('\n') + '</div>');
                thisCompartment.unitContainer = this.getById(this.unitContainerId);
                for (prop in this.unitHash)
                {
                    if (this.unitHash.hasOwnProperty(prop))
                    {
                        unit = this.unitHash[prop];
                        unit.draw();
                    }
                }
            }
            thisCompartment.unitHtmlArray.length = 0;
        };
        
        //Decides what type of unit to create based on the unitType
        //It then creates and initializes that object
        thisCompartment.populateUnitHash = function ()
        {
            var unit = null;
            var i = 0;
            var unitType = '';
            for (i = 0; i < this.unitArray.length; i += 1)
            {
                thisCompartment.unitArray[i].compartment = this;
                unitType = this.unitArray[i].ut;
                switch (unitType) 
                {
                case 'NS':
                    unit = SKYSALES.Class.Seat();
                    break;    
                case 'LS':
                    unit = SKYSALES.Class.LargeSeat();
                    break;
                case 'BH':
                    unit = SKYSALES.Class.BulkHead();
                    break;
                case 'B1':
                    unit = SKYSALES.Class.BedOneOfThree();
                    break;
                case 'B2':
                    unit = SKYSALES.Class.BedTwoOfThree();
                    break;
                case 'B3':
                    unit = SKYSALES.Class.BedThreeOfThree();
                    break;
                case 'B4':
                    unit = SKYSALES.Class.BedOneOfTwo();
                    break;
                case 'B5':
                    unit = SKYSALES.Class.BedTwoOfTwo();
                    break;
                case 'B6':
                    unit = SKYSALES.Class.BedOneOfOne();
                    break;
                case 'CO':
                    unit = SKYSALES.Class.SeatCompartment();
                    break;
                case 'TB':
                    unit = SKYSALES.Class.Table();
                    break;
                case 'WL':
                    unit = SKYSALES.Class.Wall();
                    break;
                case 'WI':
                    unit = SKYSALES.Class.Window();
                    break;
                case 'DR':
                    unit = SKYSALES.Class.Door();
                    break;
                case 'ST':
                    unit = SKYSALES.Class.Stairs();
                    break;
                case 'WG':
                    if (this.unitArray[i].an === 0)
                    {
                        unit = SKYSALES.Class.WingLeft();
                    }
                    else if (this.unitArray[i].an === 180)
                    {
                        unit = SKYSALES.Class.WingRight();
                    }
                    else
                    {
                        unit = SKYSALES.Class.Wing();
                    }
                    break;
                case 'EX':
                    unit = SKYSALES.Class.Exit();
                    break;
                case 'LR':
                    unit = SKYSALES.Class.LabelRuler();
                    break;
                case 'GR':
                    unit = SKYSALES.Class.GenericUnit();
                    break;
                case 'DR':
                    unit = SKYSALES.Class.GenericUnit();
                    break;
                case 'LV':
                    unit = SKYSALES.Class.Lavatory();
                    break;
                case 'LG':
                    unit = SKYSALES.Class.Luggage();
                    break;
                case 'ED':
                    unit = SKYSALES.Class.Door();
                    break;                    
                case 'LH':
                    unit = SKYSALES.Class.LavatoryWithHandicappedFacilities();
                    break;
                case 'BR':
                    unit = SKYSALES.Class.Bar();
                    break;
                case 'CL':
                    unit = SKYSALES.Class.Closet();
                    break;
                case 'GY':
                    unit = SKYSALES.Class.Galley();
                    break;
                case 'SS':
                    unit = SKYSALES.Class.Storage();
                    break;
                case 'DV':
                    unit = SKYSALES.Class.Divider();
                    break;
                case 'MS':
                    unit = SKYSALES.Class.MovieScreen();
                    break;  
                default:
                    unit = SKYSALES.Class.Unit();
                }
                unit.compartment = this;
                unit.init(this.unitArray[i]);
                var key = unit.getKey();
                thisCompartment.unitHash[key] = unit;
            }
            delete thisCompartment.unitArray;
        };
        
        thisCompartment.updateDeckTabCss = function ()
        {
            var deckArray = null;
            var deck = null;
            var deckTab = null;
            var i = 0;
            if (thisCompartment.equipment)
            {
                deckArray = this.equipment.compartmentHash[thisCompartment.compartmentDesignator];
            }
            deckArray = deckArray || [];
            if (deckArray.length < 2)
            {
                this.deckTabs.hide();
            }
            else
            {
                this.deckTabs.show();
                for (i = 0; i < deckArray.length; i += 1)
                {
                    deck = deckArray[i];
                    deckTab = deck.deckTab;
                    if (this.deck === deck.deck)
                    {
                        $('label', deckTab).show();
                        $('a', deckTab).hide();
                    }
                    else
                    {
                        $('label', deckTab).hide();
                        $('a', deckTab).show();
                    }
                }
            }
        };
        thisCompartment.addDeckTabEvents = function ()
        {
            var i = 0;
            var deckArray = null;
            var deck = null;
            if (this.equipment)
            {
                deckArray = this.equipment.compartmentHash[this.compartmentDesignator];
            }
            deckArray = deckArray || [];
            for (i = 0; i < deckArray.length; i += 1)
            {
                deck = deckArray[i];
                deck.deckTab.unbind('click');
                deck.deckTab.click(deck.activateDeckHandler);
            }
        };
        thisCompartment.updateDeckTabs = function ()
        {
            this.updateDeckTabCss();
            this.addDeckTabEvents();
        };
        thisCompartment.activate = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var activeClass = unitMapContainer.activeCompartmentClass;
            var isStripped = this.equipment.isStripped;
            var deckArray = null;
            if (!isStripped)
            {
                this.draw();
                this.unitContainer.show();
                deckArray =  this.equipment.compartmentHash[this.compartmentDesignator] || [];
                if (deckArray.length > 0)
                {
                    deckArray[0].container.removeClass(activeClass);
                    deckArray[0].container.addClass(activeClass);
                }
                this.updateDeckTabs();
            }
            unitMapContainer.activeCompartment = this;
            unitMapContainer.activeCompartmentDeck = this.deck;
            thisCompartment.isActive = true;
            unitMapContainer.writeFilterToDom(unitMapContainer.activeUnitInput);
            unitMapContainer.updateActiveUnitInput(unitMapContainer.activeUnitInput);
        };
        thisCompartment.deactivate = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var activeCompartment = unitMapContainer.activeCompartment;
            var activeClass = unitMapContainer.activeCompartmentClass;
            var deckArray = [];
            var i = 0;
            if (activeCompartment)
            {
                deckArray =  activeCompartment.equipment.compartmentHash[activeCompartment.compartmentDesignator] || [];
                for (i = 0; i < deckArray.length; i += 1)
                {
                    deckArray[i].container.removeClass(activeClass);
                }
                if (activeCompartment.unitContainer)
                {
                    activeCompartment.unitContainer.hide();
                }
                activeCompartment.isActive = false;
            }
        };
        thisCompartment.activateDeckHandler = function ()
        {
            var unitMapContainer = thisCompartment.getUnitMapContainer();
            if (unitMapContainer.activeCompartmentDeck !== this.deck)
            {
                unitMapContainer.activeCompartment.deactivate();
                thisCompartment.activate();
            }
        };
        thisCompartment.getKey = function ()
        {
            var del = thisCompartment.delimiter;
            var key = this.equipment.getKey() + del + this.compartmentDesignator + del + this.deck;
            return key;
        };
        thisCompartment.updateCompartmentHandler = function ()
        {
            thisCompartment.updateCompartment();
        };
        thisCompartment.updateCompartment = function ()
        {
            if (!this.isActive)
            {
                this.input.val(thisCompartment.compartmentDesignator);
                this.deactivate();
                this.activate();
            }
        };
        thisCompartment.addEvents = function ()
        {
            parent.addEvents.call(this);
            this.container.click(this.updateCompartmentHandler);
            this.compartmentContainer.mouseover(this.showDetailHandler);
            this.compartmentContainer.mouseout(this.hideDetailHandler);
            // Do not allow clicking on the seats to prevent seat assignment. Used for viewing
            // flyahead offering seat maps.
            if (thisCompartment.equipment.unitMap.unitMapContainer.seatMapIsOnReadOnlyMode != "True")
            {
                this.compartmentContainer.click(this.confirmSeatHandler);
            }
        };
        thisCompartment.confirmSeatHandler = function (eventInfo)
        {
            var target = null;
            eventInfo = eventInfo || window.event;
            target = eventInfo.target || eventInfo.srcElement;
            var unitKey = target.id;
            if (unitKey === "")
            {
                unitKey = $(target).parent('div.aUnit').attr('id') || '';
            }
            var unit = thisCompartment.unitHash[unitKey];

            if (unit && unit.confirmSeat)
            {
                unit.confirmSeat();
            }
        };
        thisCompartment.showDetailHandler = function (eventInfo)
        {
            var target = null;
            eventInfo = eventInfo || window.event;
            target = eventInfo.target || eventInfo.srcElement;
            var unitKey = target.id;
            if (unitKey === "")
            {
                unitKey = $(target).parent('div.aUnit').attr('id') || '';
            }
            var unit = thisCompartment.unitHash[unitKey];

            if (unit && unit.setTimeoutDetail)
            {
                unit.setTimeoutDetail();
            }
        };
        thisCompartment.hideDetailHandler = function (eventInfo)
        {
            var unitMapContainer = thisCompartment.getUnitMapContainer();
            window.clearTimeout(unitMapContainer.showDetailId);
            if (SKYSALES.Class.Seat.prototype.unitDetail)
            {
                SKYSALES.Class.Seat.prototype.unitDetail.hide();
            }
        };
        
        thisCompartment.getFlattenedPropertyTypeList = function ()
        {
            return this.equipment.getFlattenedPropertyTypeList();
        };
        thisCompartment.getNumericPropertyCodeList = function ()
        {
            return this.equipment.getNumericPropertyCodeList();
        };
        thisCompartment.getSsrCodeList = function ()
        {
            return this.equipment.getSsrCodeList();
        };
        thisCompartment.getNumericPropertyHash = function ()
        {
            return this.equipment.getNumericPropertyHash();
        };
        thisCompartment.setVars = function ()
        {
            parent.setVars.call(this);
            var del = thisCompartment.delimiter;
            thisCompartment.template = this.getById(this.templateId);
            thisCompartment.compartmentContainer = this.getById(this.compartmentContainerId);
            thisCompartment.input = this.getById(this.inputId);
            thisCompartment.unitsAvailableSpan = this.getById('availableSeats' + del + 'compartment' + del + this.compartmentDesignator + del + 'deck' + del + this.deck);
            thisCompartment.deckTabs = this.getById(this.deckTabsId);
            thisCompartment.deckTab = $('#' + this.deckTabId + this.deck, this.deckTabs);
            thisCompartment.deckTabLabel = $('#' + this.deckTabLabelId + this.deck, this.deckTab);
            thisCompartment.deckTabA = $('#' + this.deckTabAId + this.deck, this.deckTab);
            delete thisCompartment.templateId;
            delete thisCompartment.compartmentContainerId;
            delete thisCompartment.inputId;
            delete thisCompartment.deckTabsId;
        };
        return thisCompartment;
    };
    SKYSALES.Class.Compartment.compartmentKeyHash = {
        'd': 'deck',
        'cd': 'compartmentDesignator',
        'l': 'len',
        'au': 'availableUnits',
        's': 'sequence',
        'w': 'width',
        'u': 'unitArray'
    };
}

/*
    Name: 
        Class Unit
    Param:
        None
    Return: 
        An instance of Unit
    Functionality:
        Represents an Unit object
        A Unit is an object on the seat map.
        A seat, lavretory, and a bed are all units
    Notes:
        The unitKeyHash makes it possible to turn short property names from the JSON
        into readable names. The short names are there so that the data downloads faster,
        but it is to hard to read so the unitKeyHash is used to turn the short names into more readable names.
        All units should have a x, y, width and height so they can be drawn.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit
*/
if (SKYSALES.Class.Unit === undefined)
{
    SKYSALES.Class.Unit = function ()
    {
        var parent = SKYSALES.Class.EquipmentBase();
        var thisUnit = SKYSALES.Util.extendObject(parent);
        
        thisUnit.compartment = null;
        thisUnit.assignable = '';
        //A list of the properties this unit supports
        thisUnit.propertyArray = [];
        thisUnit.height = 0;
        thisUnit.compartmentDesignator = '';
        thisUnit.seatSet = '';
        //A list of the numeric properties this unit has
        thisUnit.propertyInts = [];
        //A list of the ssrs this unit supports
        thisUnit.ssrPermissionArray = [];
        thisUnit.travelClassCode = '';
        //The direction the unit is facing
        thisUnit.unitAngle = '';
        thisUnit.unitAvailability = '';
        thisUnit.unitDesignator = '';
        thisUnit.unitGroup = '';
        thisUnit.unitType = '';
        thisUnit.width = 0;
        thisUnit.x = '';
        thisUnit.y = '';
        thisUnit.zone = '';
        thisUnit.unitFee = '';
        thisUnit.unitKey = '';
        thisUnit.text = '';
        thisUnit.iconContentName = '';
        
        //This string uniquly identifies the unit, and can be used to get the unit object
        //getUnitByUnitKey(unitKey);
        thisUnit.unitKey = null;
        
        thisUnit.unitTemplateId = '';
        thisUnit.unitTemplate = null;
        thisUnit.unitTemplateHtml = '';
        
        SKYSALES.Class.Unit.prototype.timeOut = 500;
        SKYSALES.Class.Unit.prototype.offset = 30;
        SKYSALES.Class.Unit.prototype.delimiter = '_';
        
        thisUnit.unitMapContainer = null;

        thisUnit.init = function (json)
        {
            var keyHash = SKYSALES.Class.Unit.prototype.unitKeyHash;
            this.convertParamObject(keyHash, json);
            this.setSettingsByObject(json);
            this.setVars();
            this.setUnitAvailability();
            delete thisUnit.init;
        };
        thisUnit.setSettingsByObject = function (jsonObject)
        {
            parent.setSettingsByObject.call(this, jsonObject);
            var unitMapContainer = this.getUnitMapContainer();
            // unit fee will be populated as the active unit input changes to be able to get the correct unit fee for the specific passenger            
            //thisUnit.unitFee = SKYSALES.Class.UnitFee.getUnitFeeByPassenger(unitMapContainer.activeUnitInput.passengerNumber, this.unitGroup);
            thisUnit.compartmentDesignator = unitMapContainer.clean(this.compartmentDesignator);
            thisUnit.unitDesignator = unitMapContainer.clean(this.unitDesignator);
            this.compartmentDesignator = thisUnit.compartmentDesignator;
            this.unitDesignator = thisUnit.unitDesignator;
            thisUnit.unitKey = this.getKey();
            delete thisUnit.setSettingsByObject;
        };
        thisUnit.setVars = function ()
        {
            parent.setVars.call(this);
            if (this.unitTemplateId)
            {
                thisUnit.unitTemplate = this.getById(this.unitTemplateId);
                thisUnit.unitTemplateHtml = this.unitTemplate.text();
            }
            delete thisUnit.unitTemplateId;
            delete thisUnit.setVars;
        };
        thisUnit.getUnitHtml = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var iconMax = unitMapContainer.iconMax;
            var supplantParamObject = {
                'templateHtml': this.unitTemplateHtml,
                'propertyHtml': this.booleanPropertyUnitTemplateHtml,
                'iconMax': iconMax
            };
            var unitHtml = this.supplant(supplantParamObject);
            delete thisUnit.unitTemplateHtml;
            delete thisUnit.booleanPropertyUnitTemplateHtml;
            delete thisUnit.getUnitHtml;
            return unitHtml;
        };
        thisUnit.setUnitAvailability = function ()
        {
            /*
                If the unit is not assignable, assume that it is open.
                This is to fix the issue where we are getting bulkheads that are set to Reserved
            */
            if (!this.assignable)
            {
                this.unitAvailability = 'Open';
            }
            
            /*
                If the unit is assignable and its not open, assume it is reserved.
                This is to fix the issue of showing FleetBlocked and HeldForAnotherSession
            */
            if ((this.assignable) && (this.unitAvailability !== 'Open'))
            {
                this.unitAvailability = 'Reserved';
            }
            delete thisUnit.setUnitAvailability;
        };

        thisUnit.draw = SKYSALES.Class.Unit.prototype.draw;
        thisUnit.getImagePath = SKYSALES.Class.Unit.prototype.getImagePath;
        thisUnit.updateSeatImage = SKYSALES.Class.Unit.prototype.updateSeatImage;
        thisUnit.getById = SKYSALES.Class.Unit.prototype.getById;
        thisUnit.getUnitMapContainer = SKYSALES.Class.Unit.prototype.getUnitMapContainer;
        thisUnit.getKey = SKYSALES.Class.Unit.prototype.getKey;
        thisUnit.getFlattenedPropertyTypeList = SKYSALES.Class.Unit.prototype.getFlattenedPropertyTypeList;
        thisUnit.getNumericPropertyCodeList = SKYSALES.Class.Unit.prototype.getNumericPropertyCodeList;
        thisUnit.getSsrCodeList = SKYSALES.Class.Unit.prototype.getSsrCodeList;
        thisUnit.getNumericPropertyHash = SKYSALES.Class.Unit.prototype.getNumericPropertyHash;
        thisUnit.supplant = SKYSALES.Class.Unit.prototype.supplant;
        return thisUnit;
    };
    SKYSALES.Class.Unit.prototype.draw = function ()
    {
        var unitKey = this.getKey();
        this.container = this.getById(unitKey);
        this.updateSeatImage();
    };
    SKYSALES.Class.Unit.prototype.getImagePath = function (unitAvailability)
    {
        unitAvailability = unitAvailability || this.unitAvailability;
        var del = SKYSALES.Class.Unit.prototype.delimiter;
        var equipmentCategory = 'JetAircraft';
        if (this.compartment && this.compartment.equipment)
        {
            equipmentCategory = this.compartment.equipment.equipmentCategory;
        }
        var unitMapContainer = this.getUnitMapContainer();
        var imagePath =  unitMapContainer.equipmentImagePath + equipmentCategory + del + this.unitType + del + unitAvailability + del + this.unitAngle + '.gif';
        return imagePath;
    };
    SKYSALES.Class.Unit.prototype.updateSeatImage = function (unitAvailability)
    {
        unitAvailability = unitAvailability || this.unitAvailability;
        var imagePath = this.getImagePath(unitAvailability);
        this.container.css('background-image', 'url(' + imagePath + ')');
    };
    SKYSALES.Class.Unit.prototype.getById = function (id)
    {
        var retVal = null;
        if (id)
        {
            retVal = window.document.getElementById(id);
        }
        if (!retVal)
        {
            retVal = $([]);
        }
        return $(retVal);
    };
    SKYSALES.Class.Unit.prototype.getUnitMapContainer = function ()
    {
        if ((!this.unitMapContainer) && this.compartment)
        {
            this.unitMapContainer = this.compartment.getUnitMapContainer();
        }
        return this.unitMapContainer;
    };
    SKYSALES.Class.Unit.prototype.getKey = function ()
    {
        var del = SKYSALES.Class.Unit.prototype.delimiter;
        if (!this.unitKey)
        {
            this.unitKey = this.compartment.getKey() + del + this.unitDesignator;
        }
        return this.unitKey;
    };
    SKYSALES.Class.Unit.prototype.getFlattenedPropertyTypeList = function ()
    {
        return this.compartment.getFlattenedPropertyTypeList();
    };
    SKYSALES.Class.Unit.prototype.getNumericPropertyCodeList = function ()
    {
        return this.compartment.getNumericPropertyCodeList();
    };
    SKYSALES.Class.Unit.prototype.getSsrCodeList = function ()
    {
        return this.compartment.getSsrCodeList();
    };
    SKYSALES.Class.Unit.prototype.getNumericPropertyHash = function ()
    {
        return this.compartment.getNumericPropertyHash();
    };
    SKYSALES.Class.Unit.prototype.supplant = function (paramObject)
    {
        var templateHtml = paramObject.templateHtml || '';
    
        var unitMapContainer = this.getUnitMapContainer() || {};
        var grid = unitMapContainer.grid || 1;
        
        templateHtml = templateHtml.replace('[unitKey]', this.getKey());

        if (unitMapContainer.activeUnitMap)
        {
            var equipmentCategory = unitMapContainer.activeUnitMap.equipment.equipmentCategory;
            var designator = new SKYSALES.Class.ComparmentUnitDesignator();
            designator.equipmentCategory = equipmentCategory;
            designator.delimiter = '_';
            designator.delimiterDisplay = '-';
            designator.parseDesignator(this.getKey());
            designator.init();
            templateHtml = templateHtml.replace(/\[compartmentUnitDesignator\]/g, designator.display);
        }
        templateHtml = templateHtml.replace(/\[unitDesignator\]/g, this.unitDesignator);
        templateHtml = templateHtml.replace('[unitAvailability]', this.unitAvailability);
        templateHtml = templateHtml.replace('[unitGroup]', this.unitGroup);
        var unitFeeLocalized = SKYSALES.Util.convertToLocaleCurrency(this.unitFee);
        templateHtml = templateHtml.replace('[unitFee]', unitFeeLocalized);
        templateHtml = templateHtml.replace('[unitAngle]', this.unitAngle);
        templateHtml = templateHtml.replace('[text]', this.text);
        templateHtml = templateHtml.replace('[width]', this.width * grid);
        templateHtml = templateHtml.replace('[height]', this.height * grid);
        templateHtml = templateHtml.replace('[x]', this.x * grid);
        templateHtml = templateHtml.replace('[y]', this.y * grid);
        
        var imagePath = unitMapContainer.getIconImageUri(this.iconContentName);
        templateHtml = templateHtml.replace('[IconContentName]', imagePath);
        return templateHtml;
    };
    SKYSALES.Class.Unit.prototype.unitKeyHash = {
        'a':    'assignable',
        'h':    'height',
        'cl':   'cabotageLevel',
        'cau':   'carAvailableUnits',
        'cd':   'compartmentDesignator',
        'ss':   'seatSet',
        'pi':  'propertyInts',
        'cw':  'criterionWeight',
        'pri':  'priority',
        'pb':  'propertyArray',
        'ssau':  'seatSetAvailableUnits',
        'spb':  'ssrPermissionArray',
        'ssmc': 'ssrSeatMapCode',
        'tcc':   'travelClassCode',
        'an':   'unitAngle',
        'ua':   'unitAvailability',
        'ud':   'unitDesignator',
        'ug':   'unitGroup',
        'ut':   'unitType',
        'w':    'width',
        'x':    'x',
        'y':    'y',
        'z':    'zone',
        't':    'text',
        'icn': 'iconContentName'
    };
}

/*
    Name: 
        Class Seat
    Param:
        None
    Return: 
        An instance of Seat
    Functionality:
        Represents an Seat object
    Notes:
        A seat is a unit that has a tool tip that shows its details and can be assigned if it is available.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat
*/
if (SKYSALES.Class.Seat === undefined)
{
    SKYSALES.Class.Seat = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisSeat = SKYSALES.Util.extendObject(parent);
        
        thisSeat.unitTemplateId = 'seatId';
        
        thisSeat.booleanPropertyHash = {};
        
        thisSeat.getUnitHtml = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var iconMax = unitMapContainer.iconMax;
            var supplantParamObject = {
                'templateHtml': this.unitTemplateHtml,
                'propertyHtml': SKYSALES.Class.Seat.prototype.booleanPropertyUnitTemplateHtml,
                'iconMax': iconMax
            };
            var unitHtml = this.supplant(supplantParamObject);
            delete thisSeat.unitTemplateHtml;
            delete thisSeat.getUnitHtml;
            return unitHtml;
        };
        thisSeat.showDetailHandler = function ()
        {
            thisSeat.setTimeoutDetail();
        };
        thisSeat.hideDetailHandler = function ()
        {
            thisSeat.hideDetail();
        };
        thisSeat.showDetailTimeoutHandler = function ()
        {
            thisSeat.showDetail();
        };
        thisSeat.confirmSeat = function ()
        {
            var unitMapContainer = thisSeat.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisSeat);
        };
        thisSeat.setVars = function ()
        {
            parent.setVars.call(this);
            if (!SKYSALES.Class.Seat.prototype.ranSetVars)
            {
                SKYSALES.Class.Seat.prototype.ranSetVars = true;
                SKYSALES.Class.Seat.prototype.unitDetail = this.getById('unitTipId');
                SKYSALES.Class.Seat.prototype.positionContainer = this.getById('unitMapView');
                SKYSALES.Class.Seat.prototype.booleanPropertyUnitTemplate = this.getById('booleanPropertyUnitId');
                SKYSALES.Class.Seat.prototype.booleanPropertyUnitTipTemplate = this.getById('booleanPropertyUnitTipId');
                SKYSALES.Class.Seat.prototype.numericPropertyUnitTipTemplate = this.getById('numericPropertyUnitTipId');
                
                SKYSALES.Class.Seat.prototype.unitDetailHtml = SKYSALES.Class.Seat.prototype.unitDetail.text();
                SKYSALES.Class.Seat.prototype.booleanPropertyUnitTemplateHtml = SKYSALES.Class.Seat.prototype.booleanPropertyUnitTemplate.text();
                SKYSALES.Class.Seat.prototype.booleanPropertyUnitTipTemplateHtml = SKYSALES.Class.Seat.prototype.booleanPropertyUnitTipTemplate.text();
                SKYSALES.Class.Seat.prototype.numericPropertyUnitTipTemplateHtml = SKYSALES.Class.Seat.prototype.numericPropertyUnitTipTemplate.text();
            }
            delete thisSeat.setVars;
        };
        
        thisSeat.supplant = SKYSALES.Class.Seat.prototype.supplant;
        thisSeat.getSsrPermissionHtml = SKYSALES.Class.Seat.prototype.getSsrPermissionHtml;
        thisSeat.getPropertyHtml = SKYSALES.Class.Seat.prototype.getPropertyHtml;
        thisSeat.getNumericPropertyHtml = SKYSALES.Class.Seat.prototype.getNumericPropertyHtml;
        thisSeat.showDetail = SKYSALES.Class.Seat.prototype.showDetail;
        thisSeat.hasProperty = SKYSALES.Class.Seat.prototype.hasProperty;
        thisSeat.hasNumericProperty = SKYSALES.Class.Seat.prototype.hasNumericProperty;
        thisSeat.hasSsr = SKYSALES.Class.Seat.prototype.hasSsr;
        thisSeat.setTimeoutDetail = SKYSALES.Class.Seat.prototype.setTimeoutDetail;
        return thisSeat;
    };
    SKYSALES.Class.Seat.prototype.supplant = function (paramObject)
    {
        var templateHtml = paramObject.templateHtml || '';
        var propertyHtml = paramObject.propertyHtml || '';
        var numericPropertyHtml = paramObject.numericPropertyHtml || '';
        var iconMax = paramObject.iconMax || -1;
        var allSsrPermissionHtml = '';
        var allBooleanPropertyHtml = '';
        var allNumPropertyHtml = '';
        
        templateHtml = SKYSALES.Class.Unit.prototype.supplant.call(this, paramObject);
        
        if (templateHtml.indexOf('[propertyArray]') > -1)
        {
            allBooleanPropertyHtml = this.getPropertyHtml(propertyHtml, iconMax);
            templateHtml = templateHtml.replace('[propertyArray]', allBooleanPropertyHtml);
        }
        
        if (templateHtml.indexOf('[numericPropertyArray]') > -1)
        {
            allNumPropertyHtml = this.getNumericPropertyHtml(numericPropertyHtml);
            templateHtml = templateHtml.replace('[numericPropertyArray]', allNumPropertyHtml);
        }
        
        if (templateHtml.indexOf('[ssrPermissionArray]') > -1)
        {
            allSsrPermissionHtml = this.getSsrPermissionHtml(propertyHtml);
            templateHtml = templateHtml.replace('[ssrPermissionArray]', allSsrPermissionHtml);
        }
        return templateHtml;
    };
    
    /*
        Supplant the property template html from the xslt with the property imformation for this seat
    */
    SKYSALES.Class.Seat.prototype.getPropertyHtml = function (propertyHtml, iconMax)
    {
        var unitMapContainer = this.getUnitMapContainer();
        var flattenedPropertyTypeList = this.getFlattenedPropertyTypeList() || [];
        var iconIndex = 0;
        var unitType = this.unitType;
        var className = 'property' + '_' + unitType;
        var booleanPropertyHtml = '';
        var allBooleanPropertyHtml = '';
        var i = 0;
        var unitPropertyArray = [];
        var unitProperty = null;
        var hasProperty = false;

        if (this.compartment.equipment.equipmentCategory === 'Train')
        {
            if (this.unitType === 'NS')
            {
                className = className + '_TRAIN';
            }
            else if (this.unitType === 'LS')
            {
                if ((this.unitAngle === 0) || (this.unitAngle === 180))
                {
                    className = className + '_TRAINH';
                } else
                {
                    className = className + '_TRAINV';
                }
            }
        }
        
        className = className + "_";
        
        for (i = 0; i < flattenedPropertyTypeList.length; i += 1)
        {
            unitProperty = flattenedPropertyTypeList[i];
            hasProperty = this.hasProperty(i);
            if (hasProperty)
            {
                unitPropertyArray[unitPropertyArray.length] = unitProperty;
            }
        }
        unitPropertyArray.sort(unitMapContainer.sortPropertyList);

        for (i = 0; i < unitPropertyArray.length; i += 1)
        {
            unitProperty = unitPropertyArray[i];
            booleanPropertyHtml = propertyHtml;
            booleanPropertyHtml = window.decodeURI(booleanPropertyHtml);
            booleanPropertyHtml = booleanPropertyHtml.replace('[name]', unitProperty.name);
            
            var imagePath = unitMapContainer.getIconImageUri(unitProperty.iconContentName);
            booleanPropertyHtml = booleanPropertyHtml.replace('[IconContentName]', imagePath);
            booleanPropertyHtml = booleanPropertyHtml.replace('[className]', className + iconIndex);
            allBooleanPropertyHtml += booleanPropertyHtml;
            iconIndex += 1;
           
            if (iconIndex === iconMax)
            {
                break;
            }
        }
        return allBooleanPropertyHtml;
    };
    
    /*
        Supplant the numeric property template html from the xslt with the numeric property imformation for this seat
    */
    SKYSALES.Class.Seat.prototype.getNumericPropertyHtml = function (numericPropertyHtml)
    {
        var i = 0;
        var numericPropertyCodeList = this.getNumericPropertyCodeList() || [];
        var numericPropertyHash = this.getNumericPropertyHash() || {};
        var numericPropertyCode = '';
        var numericProperty = null;
        var numPropertyHtml = '';
        var allNumPropertyHtml = '';
        var hasProperty = false;
        
        for (i = 0; i < numericPropertyCodeList.length; i += 1)
        {
            hasProperty = this.hasNumericProperty(i);
            if (hasProperty)
            {
                numericPropertyCode = numericPropertyCodeList[i];
                numericProperty = numericPropertyHash[numericPropertyCode];
                if (numericProperty)
                {
                    numPropertyHtml = numericPropertyHtml;
                    numPropertyHtml = window.decodeURI(numPropertyHtml);
                    numPropertyHtml = numPropertyHtml.replace('[name]', numericProperty.name);
                    numPropertyHtml = numPropertyHtml.replace('[value]', this.propertyInts[i]);
                    allNumPropertyHtml += numPropertyHtml;
                }
            }
        }
        return allNumPropertyHtml;
    };
    
    /*
        Supplant the ssr template html from the xslt with the ssr imformation for this seat
    */
    SKYSALES.Class.Seat.prototype.getSsrPermissionHtml = function (ssrHtml)
    {
        var unitMapContainer = this.getUnitMapContainer();
        var ssrCodeList = this.getSsrCodeList() || [];
        var i = 0;
        var ssrHash = unitMapContainer.ssrHash || {};
        var ssrPermissionHtml = '';
        var allSsrPermissionHtml = '';
        var ssrCode = '';
        var hasSsrPermission = false;
        var ssr = null;
        var imagePath = unitMapContainer.getIconImageUri();
        for (i = 0; i < ssrCodeList.length; i += 1)
        {
            hasSsrPermission = this.hasSsr(i);
            if (hasSsrPermission)
            {
                ssrCode = ssrCodeList[i];
                ssr = ssrHash[ssrCode];
                if (ssr && ssr.ssrCode)
                {
                    ssrPermissionHtml = ssrHtml;
                    ssrPermissionHtml = window.decodeURI(ssrPermissionHtml);
                    ssrPermissionHtml = ssrPermissionHtml.replace(/\[IconContentName\]/, imagePath);
                    ssrPermissionHtml = ssrPermissionHtml.replace(/\[name\]/g, ssr.name);
                    allSsrPermissionHtml += ssrPermissionHtml;
                }
            }
        }
        return allSsrPermissionHtml;
    };
    SKYSALES.Class.Seat.prototype.showDetail = function ()
    {
        var supplantParamObject = {
            'templateHtml': SKYSALES.Class.Seat.prototype.unitDetailHtml,
            'propertyHtml': SKYSALES.Class.Seat.prototype.booleanPropertyUnitTipTemplateHtml,
            'numericPropertyHtml': SKYSALES.Class.Seat.prototype.numericPropertyUnitTipTemplateHtml
        };        
               
        this.unitFee = this.UnitFee.getUnitFeeByPassenger(this.unitMapContainer.activeUnitInput.passengerNumber, this.unitGroup); 
        
        var unitDetailHtml = this.supplant(supplantParamObject);
        var unitDetail = SKYSALES.Class.Seat.prototype.unitDetail;
        unitDetail.html(unitDetailHtml);
        var dhtml = SKYSALES.Dhtml();
        var left = dhtml.getX(this.container.get(0));
        var top = dhtml.getY(this.container.get(0));
        var positionContainer = SKYSALES.Class.Seat.prototype.positionContainer.get(0);
        left -= positionContainer.scrollLeft;
        top -= positionContainer.scrollTop;
        unitDetail.css('left', left +  SKYSALES.Class.Unit.prototype.offset);
        unitDetail.css('top', top +  SKYSALES.Class.Unit.prototype.offset);
        unitDetail.show();
    };
    SKYSALES.Class.Seat.prototype.hasProperty = function (propertyIndex)
    {
        var hasProperty = false;
        if (propertyIndex === null)
        {
            propertyIndex = -1;
        }
        if (propertyIndex > -1)
        {
            // First get the int we want >> 5 is the same as dividing by 32
            // Then figure out what bit we are
            // Finally, Grab the right most bit
            /*jslint bitwise: false */
            if (((this.propertyArray[propertyIndex >> 5] >> (propertyIndex % 32)) & 1) === 1)
            {
                hasProperty = true;
            }
            /*jslint bitwise: true */
        }
        return hasProperty;
    };
    SKYSALES.Class.Seat.prototype.hasNumericProperty = function (numericPropertyIndex)
    {
        var hasNumericProperty = true;
        var magicNullNumber = -32769;
        if (numericPropertyIndex === null)
        {
            numericPropertyIndex = -1;
        }
        if (numericPropertyIndex > -1)
        {
            if (this.propertyInts[numericPropertyIndex] === magicNullNumber)
            {
                hasNumericProperty = false;
            }
        }
        return hasNumericProperty;
    };
    SKYSALES.Class.Seat.prototype.hasSsr = function (ssrIndex)
    {
        var hasSsr = false;
        if (ssrIndex === null)
        {
            ssrIndex = -1;
        }
        if (ssrIndex > -1)
        {
            // First get the int we want >> 5 is the same as dividing by 32
            // Then figure out what bit we are
            // Finally, Grab the right most bit
            /*jslint bitwise: false */
            if (((this.ssrPermissionArray[ssrIndex >> 5] >> (ssrIndex % 32)) & 1) === 1)
            {
                hasSsr = true;
            }
            /*jslint bitwise: true */
        }
        return hasSsr;
    };
    SKYSALES.Class.Seat.prototype.setTimeoutDetail = function ()
    {
        var unitMapContainer = this.getUnitMapContainer();
        if (unitMapContainer.showDetailId)
        {
            window.clearTimeout(unitMapContainer.showDetailId);
        }
        unitMapContainer.showDetailId = window.setTimeout(this.showDetailTimeoutHandler, SKYSALES.Class.Unit.prototype.timeOut);
    };
}

/*
    Name: 
        Class LargeSeat
    Param:
        None
    Return: 
        An instance of LargeSeat
    Functionality:
        Represents an LargeSeat object
    Notes:
        A LargeSeat is a seat that uses a different unitTemplate
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> LargeSeat
*/
if (SKYSALES.Class.LargeSeat === undefined)
{
    SKYSALES.Class.LargeSeat = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisLargeSeat = SKYSALES.Util.extendObject(parent);
        
        thisLargeSeat.unitTemplateId = 'largeSeatId';

        thisLargeSeat.confirmSeat = function ()
        {
            var unitMapContainer = thisLargeSeat.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisLargeSeat);
        };
        thisLargeSeat.showDetailHandler = function ()
        {
            thisLargeSeat.setTimeoutDetail();
        };
        thisLargeSeat.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisLargeSeat);
        };
        thisLargeSeat.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisLargeSeat);
        };
        thisLargeSeat.getUnitHtml = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var iconMax = unitMapContainer.iconMaxLargeSeat;
            var supplantParamObject = {
                'templateHtml': this.unitTemplateHtml,
                'propertyHtml': SKYSALES.Class.Seat.prototype.booleanPropertyUnitTemplateHtml,
                'iconMax': iconMax
            };
            var unitHtml = this.supplant(supplantParamObject);
            delete thisLargeSeat.getUnitHtml;
            return unitHtml;
        };
        return thisLargeSeat;
    };
}

/*
    Name: 
        Class Chouchette
    Param:
        None
    Return: 
        An instance of Chouchette
    Functionality:
        Represents an Chouchette object
    Notes:
        A Chouchette is a seat that uses a different unitTemplate
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> Chouchette
*/
if (SKYSALES.Class.Chouchette === undefined)
{
    SKYSALES.Class.Chouchette = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisChouchette = SKYSALES.Util.extendObject(parent);
        
        thisChouchette.unitTemplateId = 'chouchetteId';

        thisChouchette.confirmSeat = function ()
        {
            var unitMapContainer = thisChouchette.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisChouchette);
        };
        thisChouchette.showDetailHandler = function ()
        {
            thisChouchette.setTimeoutDetail();
        };
        thisChouchette.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisChouchette);
        };
        thisChouchette.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisChouchette);
        };
        return thisChouchette;
    };
}

/*
    Name: 
        Class BedOneOfOne
    Param:
        None
    Return: 
        An instance of BedOneOfOne
    Functionality:
        Represents an BedOneOfOne object
    Notes:
        A BedOneOfOne is a seat that uses a different unitTemplate
        This is a regular bed, and not a bunk bed
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> BedOneOfOne
*/
if (SKYSALES.Class.BedOneOfOne === undefined)
{
    SKYSALES.Class.BedOneOfOne = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisBedOneOfOne = SKYSALES.Util.extendObject(parent);
        
        thisBedOneOfOne.unitTemplateId = 'bedOneOfOneId';

        thisBedOneOfOne.confirmSeat = function ()
        {
            var unitMapContainer = thisBedOneOfOne.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisBedOneOfOne);
        };
        thisBedOneOfOne.showDetailHandler = function ()
        {
            thisBedOneOfOne.setTimeoutDetail();
        };
        thisBedOneOfOne.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisBedOneOfOne);
        };
        thisBedOneOfOne.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisBedOneOfOne);
        };
        return thisBedOneOfOne;
    };
}

/*
    Name: 
        Class BedOneOfTwo
    Param:
        None
    Return: 
        An instance of BedOneOfTwo
    Functionality:
        Represents an BedOneOfTwo object
    Notes:
        A BedOneOfTwo is a seat that uses a different unitTemplate
        This bed can be divided into two sections, with each section being its own unit.
        The sections represent bunk beds, each unit being one bed in the set of bunk beds.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> BedOneOfTwo
*/
if (SKYSALES.Class.BedOneOfTwo === undefined)
{
    SKYSALES.Class.BedOneOfTwo = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisBedOneOfTwo = SKYSALES.Util.extendObject(parent);
        
        thisBedOneOfTwo.unitTemplateId = 'bedOneOfTwoId';

        thisBedOneOfTwo.confirmSeat = function ()
        {
            var unitMapContainer = thisBedOneOfTwo.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisBedOneOfTwo);
        };
        thisBedOneOfTwo.showDetailHandler = function ()
        {
            thisBedOneOfTwo.setTimeoutDetail();
        };
        thisBedOneOfTwo.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisBedOneOfTwo);
        };
        thisBedOneOfTwo.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisBedOneOfTwo);
        };
        return thisBedOneOfTwo;
    };
}

/*
    Name: 
        Class BedTwoOfTwo
    Param:
        None
    Return: 
        An instance of BedTwoOfTwo
    Functionality:
        Represents an BedTwoOfTwo object
    Notes:
        A BedTwoOfTwo is a seat that uses a different unitTemplate
        This bed can be divided into two sections, with each section being its own unit.
        The sections represent bunk beds, each unit being one bed in the set of bunk beds.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> BedTwoOfTwo
*/
if (SKYSALES.Class.BedTwoOfTwo === undefined)
{
    SKYSALES.Class.BedTwoOfTwo = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisBedTwoOfTwo = SKYSALES.Util.extendObject(parent);
        
        thisBedTwoOfTwo.unitTemplateId = 'bedTwoOfTwoId';

        thisBedTwoOfTwo.confirmSeat = function ()
        {
            var unitMapContainer = thisBedTwoOfTwo.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisBedTwoOfTwo);
        };
        thisBedTwoOfTwo.showDetailHandler = function ()
        {
            thisBedTwoOfTwo.setTimeoutDetail();
        };
        thisBedTwoOfTwo.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisBedTwoOfTwo);
        };
        thisBedTwoOfTwo.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisBedTwoOfTwo);
        };
        return thisBedTwoOfTwo;
    };
}

/*
    Name: 
        Class BedOneOfThree
    Param:
        None
    Return: 
        An instance of BedOneOfThree
    Functionality:
        Represents an BedOneOfThree object
    Notes:
        A BedTwoOfTwo is a seat that uses a different unitTemplate
        This bed can be divided into three sections, with each section being its own unit.
        The sections represent bunk beds, each unit being one bed in the set of bunk beds.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> BedOneOfThree
*/
if (SKYSALES.Class.BedOneOfThree === undefined)
{
    SKYSALES.Class.BedOneOfThree = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisBedOneOfThree = SKYSALES.Util.extendObject(parent);
        
        thisBedOneOfThree.unitTemplateId = 'bedOneOfThreeId';

        thisBedOneOfThree.confirmSeat = function ()
        {
            var unitMapContainer = thisBedOneOfThree.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisBedOneOfThree);
        };
        thisBedOneOfThree.showDetailHandler = function ()
        {
            thisBedOneOfThree.setTimeoutDetail();
        };
        thisBedOneOfThree.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisBedOneOfThree);
        };
        thisBedOneOfThree.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisBedOneOfThree);
        };
        return thisBedOneOfThree;
    };
}

/*
    Name: 
        Class BedOneOfThree
    Param:
        None
    Return: 
        An instance of BedOneOfThree
    Functionality:
        Represents an BedOneOfThree object
    Notes:
        A BedTwoOfTwo is a seat that uses a different unitTemplate
        This bed can be divided into three sections, with each section being its own unit.
        The sections represent bunk beds, each unit being one bed in the set of bunk beds.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> BedOneOfThree
*/
if (SKYSALES.Class.BedTwoOfThree === undefined)
{
    SKYSALES.Class.BedTwoOfThree = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisBedTwoOfThree = SKYSALES.Util.extendObject(parent);
        
        thisBedTwoOfThree.unitTemplateId = 'bedTwoOfThreeId';

        thisBedTwoOfThree.confirmSeat = function ()
        {
            var unitMapContainer = thisBedTwoOfThree.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisBedTwoOfThree);
        };
        thisBedTwoOfThree.showDetailHandler = function ()
        {
            thisBedTwoOfThree.setTimeoutDetail();
        };
        thisBedTwoOfThree.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisBedTwoOfThree);
        };
        thisBedTwoOfThree.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisBedTwoOfThree);
        };
        return thisBedTwoOfThree;
    };
}

/*
    Name: 
        Class BedOneOfThree
    Param:
        None
    Return: 
        An instance of BedOneOfThree
    Functionality:
        Represents an BedOneOfThree object
    Notes:
        A BedTwoOfTwo is a seat that uses a different unitTemplate
        This bed can be divided into three sections, with each section being its own unit.
        The sections represent bunk beds, each unit being one bed in the set of bunk beds.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Seat -> BedOneOfThree
*/
if (SKYSALES.Class.BedThreeOfThree === undefined)
{
    SKYSALES.Class.BedThreeOfThree = function ()
    {
        var parent = SKYSALES.Class.Seat();
        var thisBedThreeOfThree = SKYSALES.Util.extendObject(parent);
        
        thisBedThreeOfThree.unitTemplateId = 'bedThreeOfThreeId';

        thisBedThreeOfThree.confirmSeat = function ()
        {
            var unitMapContainer = thisBedThreeOfThree.getUnitMapContainer();
            unitMapContainer.confirmSeat(thisBedThreeOfThree);
        };
        thisBedThreeOfThree.showDetailHandler = function ()
        {
            thisBedThreeOfThree.setTimeoutDetail();
        };
        thisBedThreeOfThree.showDetailTimeoutHandler = function ()
        {
            parent.showDetail.call(thisBedThreeOfThree);
        };
        thisBedThreeOfThree.hideDetailHandler = function ()
        {
            parent.hideDetail.call(thisBedThreeOfThree);
        };
        return thisBedThreeOfThree;
    };
}

/*
    Name: 
        Class GenericUnit
    Param:
        None
    Return: 
        An instance of GenericUnit
    Functionality:
        Represents an GenericUnit object
    Notes:
        A generic unit is a Unit that can represent many different things on the equipment.
        It has a different getImagePath method that includes the iconId in the image name.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> GenericUnit
*/
if (SKYSALES.Class.GenericUnit === undefined)
{
    SKYSALES.Class.GenericUnit = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisGenericUnit = SKYSALES.Util.extendObject(parent);
        
        thisGenericUnit.unitTemplateId = 'genericUnitId';
        
        thisGenericUnit.getImagePath = function ()
        {
            var unitMapContainer = this.getUnitMapContainer();
            var imagePath = unitMapContainer.genericUnitImagePath + this.iconContentName + '.gif';
            return imagePath;
        };
        return thisGenericUnit;
    };
}

/*
    Name: 
        Class Window
    Param:
        None
    Return: 
        An instance of Window
    Functionality:
        Represents an Window object
    Notes:
        A window is a unit that represents a window on the equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Window
*/
if (SKYSALES.Class.Window === undefined)
{
    SKYSALES.Class.Window = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisWindow = SKYSALES.Util.extendObject(parent);
        thisWindow.unitTemplateId = 'windowId';
        return thisWindow;
    };
}

/*
    Name: 
        Class LabelRuler
    Param:
        None
    Return: 
        An instance of LabelRuler
    Functionality:
        Represents an LabelRuler object
    Notes:
        A LabelRuler is an object that is used to label the rows and colums of seats, typically on an airplane.
        Most of the time the x, and y of a LabelRuler will be outside of the compartment space.
        { 'x': -3, 'y':-5 }
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> LabelRuler
*/
if (SKYSALES.Class.LabelRuler === undefined)
{
    SKYSALES.Class.LabelRuler = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisLabelRuler = SKYSALES.Util.extendObject(parent);
        thisLabelRuler.unitTemplateId = 'labelRulerId';
        return thisLabelRuler;
    };
}

/*
    Name: 
        Class Table
    Param:
        None
    Return: 
        An instance of Table
    Functionality:
        Represents an Table object
    Notes:
        A Table represents a table on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Table
*/
if (SKYSALES.Class.Table === undefined)
{
    SKYSALES.Class.Table = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisTable = SKYSALES.Util.extendObject(parent);
        thisTable.unitTemplateId = 'tableId';
        return thisTable;
    };
}

/*
    Name: 
        Class Wall
    Param:
        None
    Return: 
        An instance of Wall
    Functionality:
        Represents an Wall object
    Notes:
        A Wall represents a wall on an equipment
        We are drawing the walls of the compartment, we are not getting a wall unit for the wall at this time.
        This might have been deprecated, and replaced by just drawing the walls at the demensions of the compartment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Wall
*/
if (SKYSALES.Class.Wall === undefined)
{
    SKYSALES.Class.Wall = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisWall = SKYSALES.Util.extendObject(parent);
        thisWall.unitTemplateId = 'wallId';
        return thisWall;
    };
}

/*
    Name: 
        Class Exit
    Param:
        None
    Return: 
        An instance of Exit
    Functionality:
        Represents an Exit object
    Notes:
        A Exit represents a exit on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Exit
*/
if (SKYSALES.Class.Exit === undefined)
{
    SKYSALES.Class.Exit = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisExit = SKYSALES.Util.extendObject(parent);
        thisExit.unitTemplateId = 'exitId';
        return thisExit;
    };
}

if (SKYSALES.Class.ComparmentUnitDesignator === undefined) 
{
    SKYSALES.Class.ComparmentUnitDesignator = function ()
    {
        //(designator, equipmentCategory)
        var thisDesignator = this;
        thisDesignator.equipmentId = '';
        thisDesignator.compartmentDesignator = '';
        thisDesignator.unitDesignator = '';
        thisDesignator.deck = '';
        thisDesignator.compartmentUnitDesignator = '';
        thisDesignator.display = '';
        thisDesignator.equipmentCategory = '';
        thisDesignator.delimiter = '_';
        thisDesignator.delimiterDisplay = '-';
        
        thisDesignator.parseDesignator = function (designator)
        {
            var designatorArray = designator.split(thisDesignator.delimiter);
            if (4 === designatorArray.length) 
            {
                thisDesignator.equipmentId = designatorArray[0];
                thisDesignator.compartmentDesignator = designatorArray[1];
                thisDesignator.deck = designatorArray[2];
                thisDesignator.unitDesignator = designatorArray[3];
            }
        };
        
        thisDesignator.init = function ()
        {
            thisDesignator.compartmentUnitDesignator = thisDesignator.compartmentDesignator + thisDesignator.delimiterDisplay + thisDesignator.unitDesignator;
            if ('Train' === thisDesignator.equipmentCategory)
            {
                thisDesignator.display = thisDesignator.compartmentUnitDesignator;
            }
            else 
            {
                thisDesignator.display = thisDesignator.unitDesignator;
            }
        };
    };
}

/*
    Name: 
        Class Door
    Param:
        None
    Return: 
        An instance of Door
    Functionality:
        Represents an Door object
    Notes:
        A Door represents a door on an equipment
        This might have been deprecated, and replaced with an Exit
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Door
*/
if (SKYSALES.Class.Door === undefined)
{
    SKYSALES.Class.Door = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisDoor = SKYSALES.Util.extendObject(parent);
        thisDoor.unitTemplateId = 'doorId';
        return thisDoor;
    };
}

/*
    Name: 
        Class Stairs
    Param:
        None
    Return: 
        An instance of Stairs
    Functionality:
        Represents an Stairs object
    Notes:
        A Stairs represents a stairs on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Stairs
*/
if (SKYSALES.Class.Stairs === undefined)
{
    SKYSALES.Class.Stairs = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisStairs = SKYSALES.Util.extendObject(parent);
        thisStairs.unitTemplateId = 'stairsId';
        return thisStairs;
    };
}

/*
    Name: 
        Class BulkHead
    Param:
        None
    Return: 
        An instance of BulkHead
    Functionality:
        Represents an BulkHead object
    Notes:
        A BulkHead represents a bulkhead on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> BulkHead
*/
if (SKYSALES.Class.BulkHead === undefined)
{
    SKYSALES.Class.BulkHead = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisBulkHead = SKYSALES.Util.extendObject(parent);
        thisBulkHead.unitTemplateId = 'bulkHeadId';
        return thisBulkHead;
    };
}

/*
    Name: 
        Class Wing
    Param:
        None
    Return: 
        An instance of Wing
    Functionality:
        Represents an Wing object
    Notes:
        A Wing represents a wing on an equipment
        We get wing objects, but we probably should never create a wing object.
        We should be creating WingLeft and WingRight objects so that the wings can be drawn correctly.
        WingLeft is when the unit is at 0 degrees and WingRight is when the unit is at 180 degrees.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Wing
*/
if (SKYSALES.Class.Wing === undefined)
{
    SKYSALES.Class.Wing = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisWing = SKYSALES.Util.extendObject(parent);
        thisWing.unitTemplateId = 'wingId';
        return thisWing;
    };
}

/*
    Name: 
        Class WingLeft
    Param:
        None
    Return: 
        An instance of WingLeft
    Functionality:
        Represents an WingLeft object
    Notes:
        A WingLeft represents a left wing on an equipment
        WingLeft is when the unit is at 0 degrees.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> WingLeft
*/
if (SKYSALES.Class.WingLeft === undefined)
{
    SKYSALES.Class.WingLeft = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisWingLeft = SKYSALES.Util.extendObject(parent);
        thisWingLeft.unitTemplateId = 'wingLeftId';
        
        thisWingLeft.setSettingsByObject = function (json)
        {
            parent.setSettingsByObject.call(this, json);
            var unitMapContainer = this.getUnitMapContainer();
            var grid = unitMapContainer.grid;
            thisWingLeft.x = (((thisWingLeft.x * grid) - 120) / grid);
        };
        
        thisWingLeft.updateSeatImage = function (unitAvailability)
        {
        };
                
        return thisWingLeft;
    };
}

/*
    Name: 
        Class WingRight
    Param:
        None
    Return: 
        An instance of WingRight
    Functionality:
        Represents an WingRight object
    Notes:
        A WingRight represents a right wing on an equipment
        WingLeft is when the unit is at 0 degrees.
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> WingRight
*/
if (SKYSALES.Class.WingRight === undefined)
{
    SKYSALES.Class.WingRight = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisWingRight = SKYSALES.Util.extendObject(parent);
        thisWingRight.unitTemplateId = 'wingRightId';
        
        thisWingRight.setSettingsByObject = function (json)
        {
            parent.setSettingsByObject.call(this, json);
            var unitMapContainer = this.getUnitMapContainer();
            var grid = unitMapContainer.grid;
            thisWingRight.x = (((thisWingRight.x * grid) + 10) / grid);
        };
        
        thisWingRight.updateSeatImage = function (unitAvailability)
        {
        };
                
        return thisWingRight;
    };
}

/*
    Name: 
        Class SeatCompartment
    Param:
        None
    Return: 
        An instance of SeatCompartment
    Functionality:
        Represents an SeatCompartment object
    Notes:
        A SeatCompartment represents a seat compartment on an equipment
        It is a way to visually group the seats together
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> SeatCompartment
*/
if (SKYSALES.Class.SeatCompartment === undefined)
{
    SKYSALES.Class.SeatCompartment = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisSeatCompartment = SKYSALES.Util.extendObject(parent);
        thisSeatCompartment.unitTemplateId = 'seatCompartmentId';
        
        thisSeatCompartment.updateSeatImage = function (unitAvailability)
        {
        };
        
        return thisSeatCompartment;
    };
}

/*
    Name: 
        Class Lavatory
    Param:
        None
    Return: 
        An instance of Lavatory
    Functionality:
        Represents an Lavatory object
    Notes:
        A Lavatory represents a table on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Lavatory
*/
if (SKYSALES.Class.Lavatory === undefined)
{
    SKYSALES.Class.Lavatory = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisLavatory = SKYSALES.Util.extendObject(parent);
        thisLavatory.unitTemplateId = 'lavatoryId';
        return thisLavatory;
    };
}

/*
    Name: 
        Class Luggage
    Param:
        None
    Return: 
        An instance of Luggage
    Functionality:
        Represents an Luggage object
    Notes:
        A Luggage represents a table on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Luggage
*/
if (SKYSALES.Class.Luggage === undefined)
{
    SKYSALES.Class.Luggage = function ()
    {
        var parent = SKYSALES.Class.Unit();
        var thisLuggage = SKYSALES.Util.extendObject(parent);
        thisLuggage.unitTemplateId = 'luggageId';
        return thisLuggage;
    };
}

/*
    Name: 
        Class LavatoryWithHandicappedFacilities
    Param:
        None
    Return: 
        An instance of LavatoryWithHandicappedFacilities 
    Functionality:
        Represents a LavatoryWithHandicappedFacilities object
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> LavatoryWithHandicappedFacilities
*/
if (SKYSALES.Class.LavatoryWithHandicappedFacilities === undefined) {
    SKYSALES.Class.LavatoryWithHandicappedFacilities = function() {
        var parent = SKYSALES.Class.Unit();
        var thisLavatoryWithHandicappedFacilities = SKYSALES.Util.extendObject(parent);
        thisLavatoryWithHandicappedFacilities.unitTemplateId = 'lavatoryWithHandicappedFacilitiesId';
        return thisLavatoryWithHandicappedFacilities;
    };
}

/*
    Name: 
        Class Bar
    Param:
        None
    Return: 
        An instance of Bar
    Functionality:
        Represents a Bar object
    Notes:
        A Bar represents a bar on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Bar
*/
if (SKYSALES.Class.Bar === undefined) {
    SKYSALES.Class.Bar = function() {
        var parent = SKYSALES.Class.Unit();
        var thisBar = SKYSALES.Util.extendObject(parent);
        thisBar.unitTemplateId = 'barId';
        return thisBar;
    };
}

/*
    Name: 
        Class Closet
    Param:
        None
    Return: 
        An instance of Closet
    Functionality:
        Represents a Closet object
    Notes:
        A Closet represents a closet on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Closet
*/
if (SKYSALES.Class.Closet === undefined) {
    SKYSALES.Class.Closet = function() {
        var parent = SKYSALES.Class.Unit();
        var thisCloset = SKYSALES.Util.extendObject(parent);
        thisCloset.unitTemplateId = 'closetId';
        return thisCloset;
    };
}

/*
    Name: 
        Class Galley
    Param:
        None
    Return: 
        An instance of Galley
    Functionality:
        Represents a Galley object
    Notes:
        A Galley represents a galley on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Galley
*/
if (SKYSALES.Class.Galley === undefined) {
    SKYSALES.Class.Galley = function() {
        var parent = SKYSALES.Class.Unit();
        var thisGalley = SKYSALES.Util.extendObject(parent);
        thisGalley.unitTemplateId = 'galleyId';
        return thisGalley;
    };
}

/*
    Name: 
        Class Storage
    Param:
        None
    Return: 
        An instance of Storage
    Functionality:
        Represents a Storage object
    Notes:
        A Storage represents a storage on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Storage
*/
if (SKYSALES.Class.Storage === undefined) {
    SKYSALES.Class.Storage = function() {
        var parent = SKYSALES.Class.Unit();
        var thisStorage = SKYSALES.Util.extendObject(parent);
        thisStorage.unitTemplateId = 'storageId';
        return thisStorage;
    };
}

/*
    Name: 
        Class Divider
    Param:
        None
    Return: 
        An instance of Divider
    Functionality:
        Represents a Divider object
    Notes:
        A Divider represents a moveable compartment divider on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> Divider
*/
if (SKYSALES.Class.Divider === undefined) {
    SKYSALES.Class.Divider = function() {
        var parent = SKYSALES.Class.Unit();
        var thisDivider = SKYSALES.Util.extendObject(parent);
        thisDivider.unitTemplateId = 'dividerId';
        return thisDivider;
    };
}

/*
    Name: 
        Class MovieScreen
    Param:
        None
    Return: 
        An instance of MovieScreen
    Functionality:
    Represents a MovieScreen object
    Notes:
        A MovieScreen represents a movie screen on an equipment
    Class Hierarchy:
        SkySales -> UnitContainer -> EquipmentBase -> Unit -> MovieScreen
*/
if (SKYSALES.Class.MovieScreen === undefined) {
    SKYSALES.Class.MovieScreen = function() {
        var parent = SKYSALES.Class.Unit();
        var thisMovieScreen = SKYSALES.Util.extendObject(parent);
        thisMovieScreen.unitTemplateId = 'movieScreenId';
        return thisMovieScreen;
    };
}

/*
    Name: 
        Class UnitInput
    Param:
        None
    Return: 
        An instance of UnitInput
    Functionality:
        Represents an UnitInput object
    Notes:
        This object controls what seat segment, passenger, and equipment you are currently interacting with.
        It is the way to change what seat segment you are dealing with.
        The segment information is also needed so that ssrs can be sold by segment.
    Class Hierarchy:
        SkySales -> UnitContainer -> UnitInput
*/
if (SKYSALES.Class.UnitInput === undefined)
{
    SKYSALES.Class.UnitInput = function ()
    {
        var parent = SKYSALES.Class.UnitContainer();
        var thisUnitInput = SKYSALES.Util.extendObject(parent);
        
        thisUnitInput.inputId = '';
        thisUnitInput.hiddenInputId = '';
        thisUnitInput.input = null;
        thisUnitInput.hiddenInput = null;
        thisUnitInput.tripInputId = '';
        thisUnitInput.tripInput = null;
        thisUnitInput.passengerNumber = -1;
        thisUnitInput.unitKey = '';
        thisUnitInput.equipmentIndex = '';
        thisUnitInput.passengerName = '';
        thisUnitInput.isActive = false;
        thisUnitInput.journeyIndex = -1;
        thisUnitInput.segmentIndex = -1;
        thisUnitInput.departureStation = '';
        thisUnitInput.arrivalStation = '';
        thisUnitInput.segmentDepartureStation = '';
        thisUnitInput.segmentArrivalStation = '';
        thisUnitInput.selectedFilterPropertyArray = null;
        thisUnitInput.selectedAutoAssignPropertyArray = null;
        thisUnitInput.selectedFilterSsrArray = null;
        thisUnitInput.paxSeatFeeId = '';
        thisUnitInput.paxSeatFee = null;
        thisUnitInput.activateId = '';
        thisUnitInput.activate = null;
        thisUnitInput.delimiter = '_';
        thisUnitInput.delimiterDisplay = '-';
        thisUnitInput.unitMapContainer = null;
        thisUnitInput.unfulfilledPropertyArray = null;
        thisUnitInput.notSeatedTogether = "";
        
        thisUnitInput.init = function (paramObject)
        {
            this.setSettingsByObject(paramObject);
            this.setVars();
            this.makeReadOnly();
            this.writePaxSeatFee();
            this.initInput();
            this.addEvents();
        };
        thisUnitInput.writePaxSeatFee = function ()
        {
            var unit = thisUnitInput.unitMapContainer.getUnitByUnitKey(thisUnitInput.unitKey);
            if (unit)
            {
                unit.unitFee = SKYSALES.Class.UnitFee.getUnitFeeByPassenger(thisUnitInput.passengerNumber, unit.unitGroup);
                var unitFee = SKYSALES.Util.convertToLocaleCurrency(unit.unitFee);
                this.paxSeatFee.html(unitFee);
            }
        };
        thisUnitInput.makeReadOnly = function ()
        {
            this.input.attr('readonly', 'readonly');
        };
        thisUnitInput.updateActiveUnitInput = function ()
        {
            thisUnitInput.tripInput.val(thisUnitInput.equipmentIndex);
            thisUnitInput.unitMapContainer.writeFilterToDom(thisUnitInput.UnitMapContainer.activeUnitInput);
            thisUnitInput.unitMapContainer.updateActiveUnitInput(thisUnitInput);
        };        
        thisUnitInput.deactivate = function ()
        {
            var activeUnitInputClass = thisUnitInput.unitMapContainer.activeUnitInputClass;
            if (this.input)
            {
                this.input.removeClass(activeUnitInputClass);
            }
        };
        thisUnitInput.addEvents = function ()
        {
            parent.addEvents.call(this);
            this.input.click(this.updateActiveUnitInput);
            var unit = thisUnitInput.unitMapContainer.getUnitByUnitKey(this.unitKey);
            this.activate.click(this.activateUnitInputHandler);
        };
        thisUnitInput.activateUnitInputHandler = function ()
        {
            thisUnitInput.tripInput.val(thisUnitInput.equipmentIndex);
            thisUnitInput.unitMapContainer.ssrContainer.populateSoldSsrHash();
            thisUnitInput.unitMapContainer.activateUnitInput(thisUnitInput);
        };
        thisUnitInput.setInput = function (hiddenVal)
        {
            var equipmentCategory = this.unitMapContainer.unitMapArray[this.equipmentIndex].equipment.equipmentCategory;
            var designator = new SKYSALES.Class.ComparmentUnitDesignator();
            designator.equipmentCategory = equipmentCategory;
            designator.delimiter = thisUnitInput.delimiter;
            designator.delimiterDisplay = thisUnitInput.delimiterDisplay;
            designator.parseDesignator(hiddenVal);
            designator.init();
            this.input.val(designator.display);
        };
        thisUnitInput.initInput = function ()
        {
            var hiddenVal = this.hiddenInput.val();
            if (undefined !== hiddenVal)
            {
                this.setInput(hiddenVal);
            }
        };        
        thisUnitInput.setVars = function ()
        {
            parent.setVars.call(this);
            thisUnitInput.input = this.getById(this.inputId);
            thisUnitInput.hiddenInput = this.getById(this.hiddenInputId);
            thisUnitInput.tripInput = this.getById(this.tripInputId);
            thisUnitInput.paxSeatFee = this.getById(this.paxSeatFeeId);
            thisUnitInput.activate = this.getById(this.activateId);
        };
        thisUnitInput.setInputAndHiddenInput = function (val)
        {
            this.hiddenInput.val(val);
            this.setInput(val);
        };
        thisUnitInput.supplant = function (templateHtml)
        {
            templateHtml = window.decodeURI(templateHtml);
            templateHtml = templateHtml.replace('[passengerName]', this.passengerName);
            templateHtml = templateHtml.replace('[segmentDepartureStation]', this.segmentDepartureStation);
            templateHtml = templateHtml.replace('[segmentArrivalStation]', this.segmentArrivalStation);
            return templateHtml;
        };
        thisUnitInput.getKey = function ()
        {
            var del = this.delimiter;
            var key = this.equipmentIndex + del + this.passengerNumber;
            return key;
        };
        thisUnitInput.getSegmentKey = function ()
        {
            var del = this.delimiter;
            var key = this.journeyIndex + del + this.segmentIndex + del + this.passengerNumber;
            return key;
        };
        return thisUnitInput;
    };
}

/*
    Name: 
        Class SoldSsr
    Param:
        None
    Return: 
        An instance of SoldSsr
    Functionality:
        Represents an SoldSsr object
    Notes:
        A SoldSsr is one that has been selected for sale by the up sell dialog.
        It knows what passenger, and segment it is for.
    Class Hierarchy:
        SkySales -> SoldSsr
*/
if (SKYSALES.Class.SoldSsr === undefined)
{
    SKYSALES.Class.SoldSsr = function ()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisSoldSsr = SKYSALES.Util.extendObject(parent);
        
        thisSoldSsr.ssrCode = '';
        thisSoldSsr.ssrNumber = -1;
        thisSoldSsr.feeCode = '';
        thisSoldSsr.name = '';
        thisSoldSsr.journeyIndex = -1;
        thisSoldSsr.segmentIndex = -1;
        thisSoldSsr.passengerNumber = -1;
        thisSoldSsr.quantity = 1;
        thisSoldSsr.delimiter = '_';
        
        thisSoldSsr.init = function (json)
        {
            this.setSettingsByObject(json);
        };
        thisSoldSsr.setVars = function () {};
        thisSoldSsr.hide = function () {};
        thisSoldSsr.show = function () {};
        thisSoldSsr.isSelected = function ()
        {
            var input = thisSoldSsr.getInput();
            return input.is(':checked');
        };
        thisSoldSsr.isSelected_PreviousSsr = function ()
        {
            var input = thisSoldSsr.getInput_PreviousSsr();
            return input.is(':checked');
        };
        thisSoldSsr.getInput = function ()
        {
            return this.getById(thisSoldSsr.ssrCode + this.delimiter + 'checkbox');
        };
        thisSoldSsr.getInput_PreviousSsr = function ()
        {
            return this.getById('sold' + this.delimiter + thisSoldSsr.ssrCode + this.delimiter + thisSoldSsr.ssrNumber + this.delimiter + 'checkbox');
        };
        thisSoldSsr.getKey = function ()
        {
            var del = this.delimiter;
            var key = thisSoldSsr.ssrCode + del + thisSoldSsr.journeyIndex + del + thisSoldSsr.segmentIndex + del + thisSoldSsr.passengerNumber;
            return key;
        };
        
        thisSoldSsr.supplant = function (templateHtml)
        {
            templateHtml = window.decodeURI(templateHtml);
            templateHtml = templateHtml.replace(/\[ssrKey\]/g, thisSoldSsr.ssrCode);
            templateHtml = templateHtml.replace(/\[ssrCode\]/g, thisSoldSsr.ssrCode);
            templateHtml = templateHtml.replace(/\[ssrNumber\]/g, thisSoldSsr.ssrNumber);
            templateHtml = templateHtml.replace(/\[name\]/g, thisSoldSsr.name);
            return templateHtml;
        };
        return thisSoldSsr;
    };
}

/*
    Name: 
        Class Ssr
    Param:
        None
    Return: 
        An instance of Ssr
    Functionality:
        Represents an Ssr object
    Notes:
        An Ssr is a special service request.
    Class Hierarchy:
        SkySales -> Ssr
*/
if (SKYSALES.Class.Ssr === undefined)
{
    SKYSALES.Class.Ssr = function ()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisSsr = SKYSALES.Util.extendObject(parent);
        
        thisSsr.allowed = 1;
        thisSsr.boardingZone = 0;
        thisSsr.feeCode = '';
        thisSsr.limitPerPassenger = 0;
        thisSsr.name = 0;
        thisSsr.seatMapCode = '';
        thisSsr.seatRestriction = '';
        thisSsr.ssrCode = '';
        thisSsr.ssrNumber = 0;
        thisSsr.ssrNestCode = '';
        thisSsr.ssrType = '';
        thisSsr.traceQueueCode = '';
        thisSsr.unitValue = 0;
        
        thisSsr.init = function (json)
        {
            this.setSettingsByObject(json);
        };
        thisSsr.setVars = function () {};
        thisSsr.hide = function () {};
        thisSsr.show = function () {};
        thisSsr.supplant = function (templateHtml)
        {
            templateHtml = window.decodeURI(templateHtml);
            templateHtml = templateHtml.replace(/\[ssrKey\]/g, thisSsr.ssrCode);
            templateHtml = templateHtml.replace(/\[ssrCode\]/g, thisSsr.ssrCode);
//            templateHtml = templateHtml.replace(/\[ssrNumber\]/g, thisSsr.ssrNumber);
            templateHtml = templateHtml.replace(/\[name\]/g, thisSsr.name);
            return templateHtml;
        };
        return thisSsr;
    };
}

/*
    Name: 
        Class SsrFee
    Param:
        None
    Return: 
        An instance of SsrFee
    Functionality:
        Represents an SsrFee object
    Notes:
        An SsrFee is a fee associated with a Ssr through a feeCode
    Class Hierarchy:
        SkySales -> SsrFee
*/
if (SKYSALES.Class.SsrFee === undefined)
{
    SKYSALES.Class.SsrFee = function ()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisSsrFee = SKYSALES.Util.extendObject(parent);
        
        thisSsrFee.feeCode = '';
        thisSsrFee.journeyNumber = -1;
        thisSsrFee.segmentNumber = -1;
        thisSsrFee.passengerFee = 0.00;
        thisSsrFee.passengerNumber = -1;
        thisSsrFee.travelComponent = '';
        thisSsrFee.delimiter = '_';
        thisSsrFee.templateId = 'ssrFeeId';
        thisSsrFee.template = null;
        thisSsrFee.templateHtml = '';
        
        thisSsrFee.init = function (json)
        {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };
        thisSsrFee.setVars = function ()
        {
            parent.setVars.call(this);
            thisSsrFee.template = this.getById(this.templateId);
            thisSsrFee.templateHtml = thisSsrFee.template.text();
        };
        thisSsrFee.hide = function () {};
        thisSsrFee.show = function () {};
        thisSsrFee.getKey = function ()
        {
            var del = this.delimiter;
            var ssrFeeKey = this.feeCode + del + this.journeyNumber + del + this.segmentNumber + del + this.passengerNumber;
            return ssrFeeKey;
        };
        thisSsrFee.supplant = function (templateHtml)
        {
            templateHtml = templateHtml || thisSsrFee.templateHtml;
            templateHtml = window.decodeURI(templateHtml);
            templateHtml = templateHtml.replace(/\[feeCode\]/g, this.feeCode);
            var passengerFeeLocalized = SKYSALES.Util.convertToLocaleCurrency(this.passengerFee);
            templateHtml = templateHtml.replace(/\[passengerFee\]/g, passengerFeeLocalized);
            return templateHtml;
        };
        return thisSsrFee;
    };
}

/*
    Name: 
        Class SsrContainer
    Param:
        None
    Return: 
        An instance of SsrContainer
    Functionality:
        Represents an SsrContainer object
    Notes:
        An SsrContainer is the up sell dialog, that up sells the ssrs, tells you what ssrs you lost, 
        and tells you what properties were not provided during auto assign.
        The SsrContainer is a floating div that needs an iframe behind it in IE6 to stop select boxes from bleeding through. 
    Class Hierarchy:
        SkySales -> UnitContainer -> SsrContainer
*/
if (SKYSALES.Class.SsrContainer === undefined)
{
    SKYSALES.Class.SsrContainer = function ()
    {
        var parent = SKYSALES.Class.UnitContainer();
        var thisSsrContainer = SKYSALES.Util.extendObject(parent);
        
        thisSsrContainer.dynamicContainerId = '';
        thisSsrContainer.dynamicContainer = null;
        thisSsrContainer.ssrTemplateId = '';
        thisSsrContainer.lostSsrTemplateHtml = '';
        thisSsrContainer.lostSsrTemplate = null;
        thisSsrContainer.lostSsrTemplateId = 'lostSsrId';
        thisSsrContainer.soldSsrTemplateHtml = '';
        thisSsrContainer.soldSsrTemplate = null;
        thisSsrContainer.soldSsrTemplateId = 'soldSsrId';
        thisSsrContainer.ssrTemplate = null;
        thisSsrContainer.ssrCancelButtonId = '';
        thisSsrContainer.ssrCancelButton = null;
        thisSsrContainer.ssrConfirmButtonId = '';
        thisSsrContainer.ssrConfirmButton = null;
        thisSsrContainer.sellSsrButtonId = '';
        thisSsrContainer.sellSsrButton = null;
        thisSsrContainer.unit = null;
        thisSsrContainer.unitInput = null;
        thisSsrContainer.soldSsrInputContainerId = 'soldSsrInputContainer';
        thisSsrContainer.soldSsrInputContainer = null;
        thisSsrContainer.flightListId = 'confirmUnitInputContainer';
        thisSsrContainer.flightList = null;
        thisSsrContainer.showFlightList = false;
        thisSsrContainer.delimiter = '_';
        thisSsrContainer.unitMapContainer = null;
        thisSsrContainer.iframe = null;
        thisSsrContainer.unfulfilledPropertyTemplateId = 'unfulfilledPropertyId';
        thisSsrContainer.unfulfilledPropertyTemplate = null;
        thisSsrContainer.unfulfilledPropertyTemplateHtml = '';
        
        var ssrContainerTemplateHtml = '';
        var ssrTemplateHtml = '';
        
        thisSsrContainer.init = function (paramObject)
        {
            this.setSettingsByObject(paramObject);
            this.setVars();
            this.addEvents();
        };
        thisSsrContainer.sellSsrs = function ()
        {
            thisSsrContainer.populateSoldSsrHash();
            thisSsrContainer.writeSoldSsrsToDom();
            /*jslint nomen: false */
            window.__doPostBack(thisSsrContainer.unitMapContainer.clientName + '$LinkButtonSellSsrs', '');
            /*jslint nomen: true */
        };
        thisSsrContainer.populateSoldSsrHash = function ()
        {
            var unitMapContainer = this.unitMapContainer;
            var prop = '';
            var soldSsr = null;
            var ssrHash = unitMapContainer.ssrHash;
            var ssr = null;
            var soldSsrParam = null;
            var unitInput = thisSsrContainer.unitInput;
            var soldSsrHash = unitMapContainer.soldSsrHash;
            var soldSsrArray = null;
            var isSelected = false;
            var activeUnitInput = unitMapContainer.activeUnitInput;
            var soldSsrKey = activeUnitInput.getSegmentKey();

            // For previously sold ssr
            if (soldSsrHash[soldSsrKey] != null)
            {
                soldSsrArray = soldSsrHash[soldSsrKey].soldSsrArray;                
            }
            else
            {
                soldSsrArray = {};
            }

            for (prop in soldSsrArray)
            {
                if (soldSsrHash[soldSsrKey].soldSsrArray.hasOwnProperty(prop))
                {
                    ssr = soldSsrHash[soldSsrKey].soldSsrArray[prop];
                    soldSsrParam = {
                        'journeyIndex': unitInput.journeyIndex,
                        'segmentIndex': unitInput.segmentIndex,
                        'passengerNumber': unitInput.passengerNumber,
                        'ssrCode': ssr.ssrCode,
                        'ssrNumber': ssr.ssrNumber
                    };
                    soldSsr = SKYSALES.Class.SoldSsr();
                    soldSsr.init(soldSsrParam);
                    isSelected = soldSsr.isSelected_PreviousSsr();

                    if (isSelected)
                    {
                        // Update the quantity to 1
                        ssr.quantity = 1;
                        soldSsrHash[soldSsrKey].soldSsrArray[prop] = ssr;
                    }
                    else
                    {
                        // This is a new ssr that has not been committed yet, just delete it from the soldSsrArray
                        //                        if (ssr.ssrNumber < 0)
                        //                        {
                        //                            ssr.quantity = 0;
                        //                            soldSsrArrayTemp.splice(prop, 1);
                        //                        }
                        //                        // This is a previous ssr that changed from pretick to untick, set the quantity to 0 so this will be released
                        //                        else
                        //                        {
                        ssr.quantity = 0;
                        soldSsrHash[soldSsrKey].soldSsrArray[prop] = ssr;
                        //                        }
                    }
                }
            }

            // Remove the ssrs that has not been committed yet
            //            var soldSsrArrayTemp = soldSsrHash[soldSsrKey].soldSsrArray.slice();

            //            for (prop in soldSsrHash[soldSsrKey].soldSsrArray)
            //            {
            //                ssr = soldSsrHash[soldSsrKey].soldSsrArray[prop];
            //                if (ssr.quantity == 0 && ssr.ssrNumber < 0)
            //                {
            //                    soldSsrArrayTemp.splice(prop, 1);
            //                }
            //            }

            //            soldSsrHash[soldSsrKey].soldSsrArray = soldSsrArrayTemp;



            // For new ssrs to be sold
            for (prop in ssrHash)
            {
                if (ssrHash.hasOwnProperty(prop))
                {
                    ssr = ssrHash[prop];
                    soldSsrParam = {
                        'journeyIndex': unitInput.journeyIndex,
                        'segmentIndex': unitInput.segmentIndex,
                        'passengerNumber': unitInput.passengerNumber,
                        'ssrCode': ssr.ssrCode
                    };
                    soldSsr = SKYSALES.Class.SoldSsr();
                    soldSsr.init(soldSsrParam);

                    isSelected = soldSsr.isSelected();

                    // Allow selling of more than 1 instance of an SSR, just make the ssrNumber is unique
                    if (isSelected)
                    {
                        soldSsrArray = soldSsrHash[soldSsrKey].soldSsrArray;

                        // Make ssrNumber unique if it already exists
                        soldSsr.ssrNumber = thisSsrContainer.getUniqueSsrNumber(soldSsr.ssrCode, soldSsrArray);

                        soldSsrArray[soldSsrArray.length] = soldSsr;
                        soldSsrHash[soldSsrKey].soldSsrArray = soldSsrArray;
                    }
                }
            }
        };

        thisSsrContainer.getUniqueSsrNumber = function(ssrCode, soldSsrArray)
        {
            var prop = '';
            var soldSsrInArray = null;
            var lowestSsrNumber = 0;

            for (prop in soldSsrArray)
            {
                if (soldSsrArray.hasOwnProperty(prop))
                {
                    soldSsrInArray = soldSsrArray[prop];
                    if (soldSsrInArray.ssrCode === ssrCode)
                    {
                        if (soldSsrInArray.ssrNumber < lowestSsrNumber)
                        {
                            lowestSsrNumber = soldSsrInArray.ssrNumber;
                        }
                    }
                }
            }
            return lowestSsrNumber - 1;
        }

        thisSsrContainer.updateConfirm = function()
        {
            thisSsrContainer.populateSoldSsrHash();
            thisSsrContainer.hide();
            thisSsrContainer.unitMapContainer.assignSeat(thisSsrContainer.unit);
            thisSsrContainer.writeSoldSsrsToDom();

            window.__doPostBack(thisSsrContainer.unitMapContainer.clientName + '$LinkButtonSellSsrs', '');
        };
        thisSsrContainer.writeSoldSsrsToDom = function ()
        {
            var soldSsrHash = this.unitMapContainer.soldSsrHash;
            var prop = 0;
            var soldSsrInputHtml = '';
            var soldSsr = null;
            var clientId = this.unitMapContainer.clientId;
            var clientName = this.unitMapContainer.clientName;
            var inputId = '';
            var inputName = '';
            var del = this.delimiter;
            var soldSsrArray = null;
            var i = 0;
            
            for (prop in soldSsrHash)
            {
                if (soldSsrHash.hasOwnProperty(prop))
                {
                    soldSsrArray = soldSsrHash[prop].soldSsrArray || [];
                    for (i = 0; i < soldSsrArray.length; i += 1)
                    {
                        soldSsr = soldSsrArray[i];
                        // Previously sold ssr
                        if (soldSsr.ssrCode && soldSsr.ssrNumber > 0)
                        {
                            inputId = clientId + del + soldSsr.ssrCode + del + soldSsr.ssrNumber + del + soldSsr.journeyIndex + del + soldSsr.segmentIndex + del + soldSsr.passengerNumber;
                            inputName = clientName + '$' + soldSsr.ssrCode + del + soldSsr.ssrNumber + del + soldSsr.journeyIndex + del + soldSsr.segmentIndex + del + soldSsr.passengerNumber;
                            soldSsrInputHtml += '<input type="hidden" id="' + inputId + '" name="' + inputName + '" value="' + soldSsr.quantity + '" />';
                        }
                        // Newly sold ssr
                        else if (soldSsr.ssrCode && soldSsr.ssrNumber < 0)
                        {
                            inputId = clientId + del + soldSsr.ssrCode + del + soldSsr.journeyIndex + del + soldSsr.segmentIndex + del + soldSsr.passengerNumber;
                            inputName = clientName + '$' + soldSsr.ssrCode + del + soldSsr.journeyIndex + del + soldSsr.segmentIndex + del + soldSsr.passengerNumber;
                            soldSsrInputHtml += '<input type="hidden" id="' + inputId + '" name="' + inputName + '" value="' + soldSsr.quantity + '" />';
                        }
                    }
                }
            }
            thisSsrContainer.soldSsrInputContainer.html(soldSsrInputHtml);
        };
        thisSsrContainer.hide = function ()
        {
            thisSsrContainer.dynamicContainer.html('');
            if (thisSsrContainer.iframe)
            {
                thisSsrContainer.iframe.remove();
            }
            parent.hide.call(thisSsrContainer);
        };
        thisSsrContainer.addEvents = function ()
        {
            parent.addEvents.call(this);
            thisSsrContainer.ssrCancelButton.click(thisSsrContainer.hide);
            thisSsrContainer.ssrConfirmButton.click(thisSsrContainer.updateConfirm);
            thisSsrContainer.sellSsrButton.click(thisSsrContainer.sellSsrs);
        };
        thisSsrContainer.setVars = function ()
        {
            parent.setVars.call(this);
            thisSsrContainer.dynamicContainer = this.getById(thisSsrContainer.dynamicContainerId);
            thisSsrContainer.ssrTemplate = this.getById(thisSsrContainer.ssrTemplateId);
            thisSsrContainer.ssrCancelButton = this.getById(thisSsrContainer.ssrCancelButtonId);
            thisSsrContainer.ssrConfirmButton = this.getById(thisSsrContainer.ssrConfirmButtonId);
            thisSsrContainer.soldSsrInputContainer = this.getById(thisSsrContainer.soldSsrInputContainerId);
            thisSsrContainer.lostSsrTemplate = this.getById(thisSsrContainer.lostSsrTemplateId);
            thisSsrContainer.soldSsrTemplate = this.getById(thisSsrContainer.soldSsrTemplateId);
            thisSsrContainer.flightList = this.getById(thisSsrContainer.flightListId);
            thisSsrContainer.sellSsrButton = this.getById(thisSsrContainer.sellSsrButtonId);
            thisSsrContainer.unfulfilledPropertyTemplate = this.getById(thisSsrContainer.unfulfilledPropertyTemplateId);
            
            thisSsrContainer.lostSsrTemplateHtml = thisSsrContainer.lostSsrTemplate.text();
            thisSsrContainer.soldSsrTemplateHtml = thisSsrContainer.soldSsrTemplate.text();
            ssrTemplateHtml = thisSsrContainer.ssrTemplate.text();
            ssrContainerTemplateHtml = thisSsrContainer.dynamicContainer.text();
            thisSsrContainer.unfulfilledPropertyTemplateHtml = thisSsrContainer.unfulfilledPropertyTemplate.text();
        };
        thisSsrContainer.getSsrFee = function (ssr)
        {
            var ssrFee = this.unitMapContainer.getSsrFee(ssr);
            return ssrFee;
        };
        
        thisSsrContainer.supplant = function ()
        {
            var ssrContainerHtml = ssrContainerTemplateHtml;
            var ssrHtml = '';
            var unit = this.unit;
            var unitInput = this.unitInput;
            var ssrHash = this.unitMapContainer.ssrHash;
            var soldSsrHash = this.unitMapContainer.soldSsrHash;
            var ssr = null;
            var allSsrHtml = '';
            var ssrFee = null;
            var hasSsrPermission = false;
            var i = 0;
            var lostSsrArray = [];
            var unitInputKey = unitInput.getSegmentKey();
            var soldSsrArray = [];
            var soldSsrIndex = 0;
            var lostSsrHtml = '';
            var allLostSsrHtml = '';
            var allSoldSsrHtml = '';
            var soldSsr = null;
            var unfulfilledPropertyHash = this.unitMapContainer.getUnfulfilledPropertyHash(unitInput);
            var unfulfilledProperty = null;
            var notSeatedTogether = this.unitMapContainer.getNotSeatedTogether(unitInput);
            var unfulfilledPropertyhtml = '';
            var allUnfulfilledPropertyhtml = '';
            var key = '';
            var ssrIndex = null;
            
            var supplantParamObject = {
                'templateHtml': ''
            };
            var ssrCodeList = this.unit.getSsrCodeList();

            if (!soldSsrHash[unitInputKey])
            {
                soldSsrHash[unitInputKey] = {
                    'soldSsrArray': [],
                    'lostSsrArray': []
                };
            }
            
            if (!unit)
            {
                unit = SKYSALES.Class.Unit();
            }
            supplantParamObject.templateHtml = ssrContainerHtml;
            ssrContainerHtml = unit.supplant(supplantParamObject);
            if (unitInput)
            {
                ssrContainerHtml = unitInput.supplant(ssrContainerHtml, '');
            }
            if (unit.hasSsr)
            {
                i = 0;
                // Traverse through the ssrCodeList and then use the ssrHash to get the other ssr details
                for (ssrIndex in ssrCodeList)
                {
                    if (ssrHash.hasOwnProperty(ssrCodeList[ssrIndex])) 
                    {
                        ssr = ssrHash[ssrCodeList[ssrIndex]];
                        if (ssr.ssrCode) 
                        {
                            hasSsrPermission = unit.hasSsr(i);
                            if (hasSsrPermission)
                            {
                                ssrHtml = ssrTemplateHtml;
                                ssrHtml = ssr.supplant(ssrHtml);
                                ssrFee = thisSsrContainer.getSsrFee(ssr);
                                ssrHtml = ssrFee.supplant(ssrHtml);
                                allSsrHtml += ssrHtml;
                            }
                            else
                            {
                                soldSsrArray = soldSsrHash[unitInputKey].soldSsrArray;
                                for (soldSsrIndex = 0; soldSsrIndex < soldSsrArray.length; soldSsrIndex += 1)
                                {
                                    soldSsr = soldSsrArray[soldSsrIndex];
                                    if (soldSsr.ssrCode === ssr.ssrCode)
                                    {
                                        lostSsrArray[lostSsrArray.length] = ssr;
                                        break;
                                    }
                                }
                            }

                            // Display currently sold SSRs
                            soldSsrArray = soldSsrHash[unitInputKey].soldSsrArray;
                            for (soldSsrIndex = 0; soldSsrIndex < soldSsrArray.length; soldSsrIndex += 1)
                            {
                                soldSsr = soldSsrArray[soldSsrIndex];
                                if (soldSsr.ssrCode === ssr.ssrCode)
                                {
                                    soldSsrHtml = thisSsrContainer.soldSsrTemplateHtml;
                                    //soldSsrHtml = ssr.supplant(soldSsrHtml);
                                    soldSsr.name = ssr.name;
                                    soldSsrHtml = soldSsr.supplant(soldSsrHtml);
                                    ssrFee = thisSsrContainer.getSsrFee(ssr);
                                    soldSsrHtml = ssrFee.supplant(soldSsrHtml);
                                    allSoldSsrHtml += soldSsrHtml;
                                }
                            }

                        }
                        i += 1;
                    }
                }
                soldSsrHash[unitInputKey].lostSsrArray = lostSsrArray;
                for (i = 0; i < lostSsrArray.length; i += 1)
                {
                    ssr = lostSsrArray[i];
                    if (ssr.ssrCode)
                    {
                        lostSsrHtml = thisSsrContainer.lostSsrTemplateHtml;
                        lostSsrHtml = ssr.supplant(lostSsrHtml);
                        allLostSsrHtml += lostSsrHtml;
                    }
                }
            }
            
            for (key in unfulfilledPropertyHash)
            {
                if (unfulfilledPropertyHash.hasOwnProperty(key))
                {
                    unfulfilledProperty = unfulfilledPropertyHash[key];
                    unfulfilledPropertyhtml = thisSsrContainer.unfulfilledPropertyTemplateHtml;
                    unfulfilledPropertyhtml = unfulfilledPropertyhtml.replace('[key]', key);
                    unfulfilledPropertyhtml = unfulfilledPropertyhtml.replace('[value]', unfulfilledProperty.name);
                    allUnfulfilledPropertyhtml += unfulfilledPropertyhtml;
                }
            }
            ssrContainerHtml = ssrContainerHtml.replace(/\[notSeatedTogether\]/, notSeatedTogether);
            ssrContainerHtml = ssrContainerHtml.replace(/\[unfulfilledPropertyArray\]/, allUnfulfilledPropertyhtml);
            ssrContainerHtml = ssrContainerHtml.replace(/\[lostSsrArray\]/g, allLostSsrHtml);
            ssrContainerHtml = ssrContainerHtml.replace(/\[soldSsrArray\]/g, allSoldSsrHtml);
            ssrContainerHtml = ssrContainerHtml.replace(/\[ssrArray\]/g, allSsrHtml);
            return ssrContainerHtml;
        };
        thisSsrContainer.checkSoldSsrInput = function ()
        {
            var i = 0;
            var soldSsrHash = this.unitMapContainer.soldSsrHash;
            var unitInput = thisSsrContainer.unitInput;
            var soldSsr = null;
            var soldSsrInput = null;
            var soldSsrKey = unitInput.getSegmentKey();
            var soldSsrArray = soldSsrHash[soldSsrKey].soldSsrArray || [];
            for (i = 0; i < soldSsrArray.length; i += 1)
            {
                soldSsr = soldSsrArray[i];
                if (soldSsr.quantity > 0)
                {
                    soldSsrInput = soldSsr.getInput_PreviousSsr();
                    soldSsrInput.attr('checked', 'checked');
                }
            }
        };
        
        /*
        This method is used to default the ssr checkboxes of the ssr up sell dialog
        that were selected in the filter panel.
        If the user searches for a dvd in the filter panel dvd should pre prechecked in the ssr up sell dialog
        However, the prechecking of the ssrs must happen when the ssr up sell dialog is displayed, if it happens
        when the user searches with the filter panel, the ssr could be sold without the user ever seeing the ssr up sell dialog
        */
        thisSsrContainer.sellSelectedFilterSsrs = function (unitInput)
        {
            var unitMapContainer = this.unitMapContainer;
            unitInput = unitInput || unitMapContainer.activeUnitInput;
            var ssrSelectedFilterInputHash = unitMapContainer.getSelectedSsrFilterInputHash();
            var ssrCode = '';
            var ssrSelectedFilterInput = null;
            var prop = '';
            var soldSsr = null;
            var soldSsrParam = null;
            var soldSsrKey = unitInput.getSegmentKey();
            var soldSsrHash = unitMapContainer.soldSsrHash || {};
            var soldSsrArray =  soldSsrHash[soldSsrKey].soldSsrArray || [];
            var alreadySoldSsr = false;
            for (prop in ssrSelectedFilterInputHash)
            {
                if (ssrSelectedFilterInputHash.hasOwnProperty(prop))
                {
                    ssrSelectedFilterInput = ssrSelectedFilterInputHash[prop];
                    ssrCode = ssrSelectedFilterInput.filterName;
                    soldSsrParam = {
                        'ssrCode': ssrCode,
                        'journeyIndex': unitInput.journeyIndex,
                        'segmentIndex': unitInput.segmentIndex,
                        'passengerNumber': unitInput.passengerNumber
                    };
                    soldSsr = new SKYSALES.Class.SoldSsr();
                    soldSsr.init(soldSsrParam);
                    soldSsrKey = unitInput.getSegmentKey();

                    alreadySoldSsr = thisSsrContainer.isSoldSsrAlreadySold(soldSsr, unitInput);

                    if (!alreadySoldSsr)
                    {
                        soldSsrArray[soldSsrArray.length] = soldSsr;
                        if (!soldSsrHash[soldSsrKey])
                        {
                            soldSsrHash[soldSsrKey] = {
                                'soldSsrArray': [],
                                'lostSsrArray': []
                            };
                        }
                        unitMapContainer.soldSsrHash[soldSsrKey].soldSsrArray = soldSsrArray;

                        // Pretick in the available ssrs
                        soldSsrInput = soldSsr.getInput();
                        soldSsrInput.attr('checked', 'checked');
                    }
                }
            }
        };
        /*
        If the user has already selected to buy an ssr on the ssr up sell dialog 
        we do not want them to purchase another one for this passenger for this segment
        This method will return true if the ssr has already been sold for this passenger for this segment
        */
        thisSsrContainer.isSoldSsrAlreadySold = function (soldSsr, unitInput)
        {
            var unitMapContainer = this.unitMapContainer;
            var alreadySoldSsr = false;
            var i = 0;
            var soldSsrKey = unitInput.getSegmentKey();
            var soldSsrHash = unitMapContainer.soldSsrHash || {};
            var soldSsrArray =  soldSsrHash[soldSsrKey].soldSsrArray || [];
            var compareSoldSsr = null;
            var compareSoldSsrKey = '';
            unitInput = unitInput || unitMapContainer.activeUnitInput;
            for (i = 0; i < soldSsrArray.length; i += 1)
            {
                compareSoldSsr = soldSsrArray[i];
                compareSoldSsrKey = compareSoldSsr.getKey();
                if (compareSoldSsrKey === soldSsr.getKey())
                {
                    alreadySoldSsr = true;
                    break;
                }
            }
            return alreadySoldSsr;
        };
        
        /*
        Displays the ssr container also known as the ssr up sell dialog.
        It is a floating div, that floats over the page like a pop up.
        In IE6 all select boxes bleed through any div that is above them on the z axis.
        You can either hide the select boxes you think it might be over, or
        you can put an iframe behind the floating div with the same height and width.
        The select boxes do not bleed through the floating iframe.
        The iframe is only shown behind the floating div if the browser is Internet Explorer
        This is acomplished by $.browser.msie, this is the jquery browser check that returns true if the browser is IE
        Checking for the browser type like this is the root of all evil on the web.
        For example 
        */
        thisSsrContainer.show = function ()
        {
            var ssrHtml = thisSsrContainer.supplant();
            this.container.css('position', 'absolute');
            this.container.css('left', '200px');
            this.container.css('top', '200px');
            this.dynamicContainer.html(ssrHtml);
            this.sellSelectedFilterSsrs();
            // This preticks the sold ssrs
            this.checkSoldSsrInput();
            var iframeHeight = 0;
            var iframeWidth = 0;
            var iframeLeft = 0;
            var iframeTop = 0;
            var iframeHtml = '';
            var iframe = null;
            var iframeParent = null;
            if ($.browser.msie)
            {
                iframeHeight = this.container.height();
                iframeWidth = this.container.width();
                iframeLeft = this.container.css('left');
                iframeTop = this.container.css('top');
                iframeHtml = '<iframe src="#"></iframe>';
                iframeParent = this.container.parent();
                iframeParent.prepend(iframeHtml);
                iframe = $('iframe', iframeParent);
                iframe.css('position', 'absolute');
                iframe.css('left', iframeLeft);
                iframe.css('top', iframeTop);
                iframe.width(iframeWidth);
                iframe.height(iframeHeight);
                thisSsrContainer.iframe = iframe;
            }
            if (this.showFlightList)
            {
                this.flightList.show();
            }
            parent.show.call(this);
        };
        return thisSsrContainer;
    };
}

/*
    Name: 
        Class UnitFee
    Param:
        None
    Return:
        The fee associated with a unit.
    Functionality:
        Represents an UnitFee object
    Notes:
        The Unit calles 
        thisUnit.unitFee = SKYSALES.Class.UnitFee.getUnitFee(this.unitGroup);
        at initialization time to set the unitFee property.
        unit.unitFee is the recommended way of getting the seatFee.
        
        The function of this class is only to populate SKYSALES.Class.UnitFee.UnitFeePassengerHash
        with values from the XML.
        In UnitMapInput.xslt, we have to call SKYSALES.Util.createObject which requires an
        init function. So we added that and what it does is it populates the 'local'
        variable thisUnitFee.unitFeePassengerHash. Then we copy the values to the 'global'
        SKYSALES.Class.UnitFee.UnitFeePassengerHash so that it can be used by 
        SKYSALES.Class.UnitFee.getUnitFeeByPassenger.
    Class Hierarchy:
        UnitFee
*/
SKYSALES.Class.UnitFee = function() {

    var thisUnitFee = this;

    thisUnitFee.unitFeePassengerHash = {};

    thisUnitFee.init = function(json)
    {
        thisUnitFee.setSettingsByObject(json);
        SKYSALES.Class.UnitFee.UnitFeePassengerHash = thisUnitFee.unitFeePassengerHash;
    }

    thisUnitFee.setSettingsByObject = function(jsonObject) {
        var prop = null;
        for (prop in jsonObject) {
            if (thisUnitFee.hasOwnProperty(prop)) {
                thisUnitFee[prop] = jsonObject[prop];
            }
        }
    }

};

SKYSALES.Class.UnitFee.UnitFeePassengerHash = {};
SKYSALES.Class.UnitFee.delimiter = '_';

SKYSALES.Class.UnitFee.getUnitFeeByPassenger = function (passengerNumber, groupDesignator)
{
    var key = passengerNumber + this.delimiter + groupDesignator;
    var fee = 0;
    
    if (SKYSALES.Class.UnitFee.UnitFeePassengerHash[key])
    {
        fee = SKYSALES.Class.UnitFee.UnitFeePassengerHash[key];
       
        if (!fee)
        {
            fee = 0;
        }
        return fee;
    }
    return fee;
};
