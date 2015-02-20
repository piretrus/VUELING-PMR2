/*global $: false, SKYSALES: false, window: false */

if (!SKYSALES.Class.InsuranceAvailability)
{
    /*
    Class InsuranceAvailability
    */
    SKYSALES.Class.InsuranceAvailability = function ()
    {
        var thisInsuranceAvailability = this;
        var insuranceArray = [];

        thisInsuranceAvailability.addInsurance = function (insuranceParamObj)
        {
            var insurance = new SKYSALES.Class.Insurance();
            insurance.init(insuranceParamObj);
            insuranceArray[insuranceArray.length] = insurance;
        };
        
        thisInsuranceAvailability.addInsurance = function (insuranceParamObj)
        {
            var insurance = new SKYSALES.Class.Insurance();
            insurance.init(insuranceParamObj);
            insuranceArray[insuranceArray.length] = insurance;
        };
        
        return thisInsuranceAvailability;
    };
    SKYSALES.Class.InsuranceAvailability.initializeInsurances = function ()
    {
        var paramObject = {
            objNameBase: 'insuranceAvailability',
            objType: 'InsuranceAvailability',
            selector: 'div.insuranceContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
}
    
SKYSALES.Class.Insurance = function ()
{
    var parent = new SKYSALES.Class.Aos();
    var thisInsurance = SKYSALES.Util.extendObject(parent);
    
    thisInsurance.showHideCheckBoxId = '';
    thisInsurance.passengerCount = 0;
    thisInsurance.passengerIndex = -1;
    thisInsurance.clientId = 0;
    thisInsurance.requiredArray = [];
    thisInsurance.requestFailMessage = 'Please enter all passenger data first';
    thisInsurance.autoRequest = false;
    thisInsurance.insurancePolicyContainerId = '';
    thisInsurance.passengerControlId = '';
    thisInsurance.url = '';
    thisInsurance.controlGroupId = '';
    thisInsurance.passengerDataContainer = 'passengerInputContent';
    thisInsurance.waitImgId = '';
    
    thisInsurance.showHideCheckBox = '';
    thisInsurance.passengerInfo = {};
    thisInsurance.nameDel = "$";
    thisInsurance.idDel = "_";
    thisInsurance.hideRequestMessage = false;
    thisInsurance.inputArray = {};
    thisInsurance.insurancePolicyContainer = {};
    thisInsurance.waitImg = null;
    
    thisInsurance.init = function (json)
    {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };
    
    thisInsurance.show = function ()
    {
        parent.show.call(this);
        this.showHideCheckBox.attr('checked', 'checked');    
    };
    thisInsurance.hide = function ()
    {
        parent.hide.call(this);
        this.insurancePolicyContainer.html('');
        this.showHideCheckBox.removeAttr('checked');
    };
    thisInsurance.showHideHandler = function ()
    {
        thisInsurance.showHide();
    };
    thisInsurance.showHide = function ()
    {
        var isChecked = this.showHideCheckBox.is(':checked');
        if (isChecked)
        {
            this.validateRequest();
        }
        else
        {
            this.hide();
        }
    };
    thisInsurance.setSettingsByObject = function (jsonObject)
    {
        parent.setSettingsByObject.call(this, jsonObject);
        var propName = '';
        for (propName in jsonObject)
        {
            if (thisInsurance.hasOwnProperty(propName))
            {
                thisInsurance[propName] = jsonObject[propName];
            }
        }
    };
    thisInsurance.addEvents = function ()
    {
        var i = 0;
        var passengerIndex = 0;
        var prop = '';
        var requiredIndex = '';
        var requiredInputId = '';
        this.hide();
        this.showHideCheckBox.click(this.showHideHandler);
        
        if (this.autoRequest === true)
        {
            for (i = 0; i < this.requiredArray.length; i += 1)
            {
                requiredInputId = this.requiredArray[i];
                if (this.passengerIndex > -1)
                {
                    for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
                    {
                        prop = this.getPropId(requiredIndex, this.passengerIndex);
                        this.getById(prop).blur(this.validateAutoRequestHandler);
                    }
                }
                else
                {
                    passengerLoop:
                    for (passengerIndex = 0; passengerIndex <= this.passengerCount; passengerIndex += 1)
                    {
                        for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
                        {
                            prop = this.getPropId(requiredIndex, passengerIndex);
                            this.getById(prop).blur(this.validateAutoRequestHandler);
                            prop = this.getInfantPropId(requiredIndex, passengerIndex);
                            this.getById(prop).blur(this.validateAutoRequestHandler);
                        }
                    }
                }
            }
        }
    };
    thisInsurance.filterHandler = function ()
    {
        var retVal = true;
        if ($(this).hasClass('notInsuranceInput'))
        {
            retVal = false;
        }
        return retVal;
    };
    thisInsurance.setVars = function ()
    {
        parent.setVars.call(this);
        
        thisInsurance.showHideCheckBox = this.getById(this.showHideCheckBoxId);
        if (thisInsurance.autoRequest === true)
        {
            thisInsurance.inputArray = $('#' + this.passengerDataContainer + ' :input');
            thisInsurance.inputArray = this.inputArray.filter(this.filterHandler);
        }
        thisInsurance.insurancePolicyContainer = this.getById(this.insurancePolicyContainerId);
        thisInsurance.waitImg = this.getById(this.waitImgId);
    };
    thisInsurance.validateAutoRequestHandler = function ()
    {
        thisInsurance.validateAutoRequest();
    };
    thisInsurance.validateAutoRequest = function ()
    {
        this.hideRequestMessage = true;
        this.validateRequest();
        this.hideRequestMessage = false;
    };
    thisInsurance.getPropName = function (requiredIndex, passengerIndex)
    {
        var prop = this.controlGroupId + this.nameDel + this.passengerControlId + this.nameDel + this.requiredArray[requiredIndex] + this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.getInfantPropName = function (requiredIndex, passengerIndex)
    {
        var prop = this.getPropName(requiredIndex, passengerIndex);
        prop += this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.getPropId = function (requiredIndex, passengerIndex)
    {
        var prop = 'CONTROLGROUPPASSENGER_PassengerInputViewPassengerView' + this.idDel + this.requiredArray[requiredIndex] + this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.getInfantPropId = function (requiredIndex, passengerIndex)
    {
        var prop = this.getPropId(requiredIndex, passengerIndex);
        prop += this.idDel + passengerIndex;
        return prop;
    };
    thisInsurance.validateProperty = function (prop)
    {
        var isValid = true;
        if (this.passengerInfo.hasOwnProperty(prop))
        {
            if (!this.passengerInfo[prop])
            {
                isValid = false;
            }
        }
        return isValid;
    };
    thisInsurance.validateRequest = function ()
    {
        var isValid = true;
        var passengerIndex = 0;
        var requiredIndex = 0;
        var prop = '';
        this.populatePassengerInfo();
        
        if (this.passengerIndex > -1)
        {
            for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
            {
                prop = this.getPropName(requiredIndex, this.passengerIndex);
                if (!this.validateProperty(prop))
                {
                    isValid = false;
                    break;
                }
            }
        }
        else
        {
            passengerLoop:
            for (passengerIndex = 0; passengerIndex <= this.passengerCount; passengerIndex += 1)
            {
                for (requiredIndex = 0; requiredIndex < this.requiredArray.length; requiredIndex += 1)
                {
                    prop = this.getPropName(requiredIndex, passengerIndex);
                    if (!this.validateProperty(prop))
                    {
                        isValid = false;
                        break passengerLoop;
                    }
                    prop = this.getInfantPropName(requiredIndex, passengerIndex);
                    if (!this.validateProperty(prop))
                    {
                        isValid = false;
                        break passengerLoop;
                    }
                }
            }
        }
        if (isValid === true)
        {
            this.sendRequest();
        }
        else
        {
            this.reset();
            if (this.hideRequestMessage === false)
            {
                window.alert(this.requestFailMessage);
            }
        }
    };
    thisInsurance.reset = function ()
    {
        thisInsurance.hide();
    };
    thisInsurance.setPassengerInfoPropertyHandler = function ()
    {
        var input = $(this);
        thisInsurance.setPassengerInfoProperty(input);
    };
    thisInsurance.setPassengerInfoProperty = function (input)
    {
        var name = input.attr('name');
        if (name)
        {
            name = name.substring(name.lastIndexOf(this.nameDel) + 1, name.length);
            name = this.controlGroupId + this.nameDel + this.passengerControlId + this.nameDel + name;
        }
        var val = input.val();
        this.passengerInfo[name] = val;
    };
    thisInsurance.getClientName = function ()
    {
        return this.clientId.replace(this.idDel, this.nameDel);
    };
    thisInsurance.populatePassengerInfo = function ()
    {
        this.inputArray.each(this.setPassengerInfoPropertyHandler);
        //passengerInfo[thisInsurance.controlGroupId + nameDel + 'ButtonSubmit'] = 'Continue';
        this.passengerInfo[thisInsurance.controlGroupId + this.nameDel + this.clientId + this.nameDel + 'passengerNumber'] = window.parseInt(this.passengerIndex, 10);
        /*jslint nomen: false */
        this.passengerInfo.__EVENTTARGET = this.controlGroupId + this.nameDel + 'ButtonSubmit';
        /*jslint nomen: true */
    };
    thisInsurance.updateDomHandler = function (data)
    {
        thisInsurance.updateDom(data);
    };
    thisInsurance.updateDom = function (data)
    {
        this.insurancePolicyContainer.html(data);
        this.parseDomObjects(data);
        this.waitImg.hide();
        this.show();
    };
    thisInsurance.parseDomObjects = function (data)
    {
        var paramNodeFunction = function (index)
        {
            var paramNodeValue = $(this).val();
            //paramNodeValue = paramNodeValue.replace(/\'/g, '"');
            var parsedJsonObject = SKYSALES.Json.parse(paramNodeValue);
            var funRef = null;
            var refName = '';
            var refArray = [];
            var i = 0;
            var refIndex = 0;
            var arrayRegex = /^([a-zA-Z0-9]+)\[(\d+)\]$/;
            var matchArray = [];
            if (parsedJsonObject.method !== undefined)
            {
	            funRef = thisInsurance;
	            if (parsedJsonObject.method.name.indexOf('.') > -1)
	            {
		            refArray = parsedJsonObject.method.name.split('.');
		            for (i = 0; i < refArray.length; i += 1)
		            {
			            refName = refArray[i];
			            matchArray = refName.match(arrayRegex);
			            if ((matchArray) && (matchArray.length > 0))
			            {
				            refName = matchArray[1];
				            refIndex = matchArray[2];
				            refIndex = parseInt(refIndex, 10);
				            funRef = funRef[refName][refIndex];
			            }
			            else
			            {
				            funRef = funRef[refName];
			            }
		            }
	            }
	            else
	            {
		            funRef = funRef[parsedJsonObject.method.name];
	            }
            	
	            if (funRef)
	            {
		            funRef(parsedJsonObject.method.paramJsonObject);
	            }
            }
        };
        $("object.jsObject > param", $(data)).each(paramNodeFunction);
    };
    thisInsurance.sendRequest = function ()
    {
        this.waitImg.show();
        //$.get did not work in IE7
        $.post(this.url, this.passengerInfo, this.updateDomHandler);
    };
    
    thisInsurance.addAvailableItem = function (availableItemParamObj)
    {
        var availableItem = new SKYSALES.Class.AvailableItem();
        availableItem.init(availableItemParamObj);
    };
    
    thisInsurance.addTermsAndConditions = function (availableItemParamObj)
    {
        var terms = new SKYSALES.Class.TermsAndConditions();
        terms.init(availableItemParamObj);
    };
    
    return thisInsurance;
};

/*
    AvailableItem extends AvailableItemBase
*/
SKYSALES.Class.AvailableItem = function ()
{
    var availableItemBase = new SKYSALES.Class.AvailableItemBase();
    var thisAvailableItem = SKYSALES.Util.extendObject(availableItemBase);
    
    thisAvailableItem.showHideCheckBoxId = '';
    
    var input = null;
    var showHideCount = 0;
    
    thisAvailableItem.setSettingsByObject = function (jsonObject)
    {
        availableItemBase.setSettingsByObject.call(this, jsonObject);
        var propName = '';
        for (propName in jsonObject)
        {
            if (thisAvailableItem.hasOwnProperty(propName))
            {
                thisAvailableItem[propName] = jsonObject[propName];
            }
        }
    };
    thisAvailableItem.addEvents = function ()
    {
        var showHideHandler = function ()
        {
            if ((showHideCount % 2) === 0)
            {
                thisAvailableItem.show();
            }
            else
            {
                thisAvailableItem.hide();
            }
            showHideCount = showHideCount + 1;
        };
        input.click(showHideHandler);
    };
    thisAvailableItem.setVars = function ()
    {
        availableItemBase.setVars.call(this);
        input = this.getById(thisAvailableItem.showHideCheckBoxId);
    };
    return thisAvailableItem;
};

/*
    TermsAndConditions extends TermsAndConditionsBase
*/
SKYSALES.Class.TermsAndConditions = function ()
{
    var termsAndConditionsBase = new SKYSALES.Class.TermsAndConditionsBase();
    var thisTerms = SKYSALES.Util.extendObject(termsAndConditionsBase);
    
    return thisTerms;
};
        
$(window.document).ready(SKYSALES.Class.InsuranceAvailability.initializeInsurances);