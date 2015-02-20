/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/
/*global $: false, SKYSALES: false, window: false, Option: false */

if (SKYSALES.Class.ContactInput === undefined)
{
    /*
    Class ContactInput
    */
    SKYSALES.Class.ContactInput = function ()
    {   
        var contactInput = new SKYSALES.Class.SkySales();
        var thisContactInput = SKYSALES.Util.extendObject(contactInput);
        
        thisContactInput.clientId = '';
        thisContactInput.keyIdArray = [];
        thisContactInput.keyArray = [];
        thisContactInput.clientStoreIdHash = null;
        thisContactInput.countryInputId = '';
        thisContactInput.countryInput = null;
        thisContactInput.stateInputId = '';
        thisContactInput.stateInput = null;
        thisContactInput.countryStateHash = null;
        thisContactInput.imContactId = '';
        thisContactInput.imContact = null;
        thisContactInput.currentContactData = {};
        thisContactInput.logOutButton = null;
        
        thisContactInput.clientHash = SKYSALES.Util.getResource().clientHash;
        
        thisContactInput.setSettingsByObject = function (jsonObject)
        {
            contactInput.setSettingsByObject.call(this, jsonObject);
            var propName = '';
            for (propName in jsonObject)
            {
                if (thisContactInput.hasOwnProperty(propName))
                {
                    thisContactInput[propName] = jsonObject[propName];
                }
            }
        };
        
        thisContactInput.clearCurrentContact = function()
        {
            var clientId = thisContactInput.clientId;
            this.getById(thisContactInput.clientId + '_DropDownListTitle').val('');
            this.getById(clientId + '_TextBoxFirstName').val('');
            this.getById(clientId + '_TextBoxMiddleName').val('');
            this.getById(clientId + '_TextBoxLastName').val('');
            this.getById(clientId + '_TextBoxAddressLine1').val('');
            this.getById(clientId + '_TextBoxAddressLine2').val('');
            this.getById(clientId + '_TextBoxAddressLine3').val('');
            this.getById(clientId + '_TextBoxCity').val('');
            this.getById(clientId + '_DropDownListStateProvince').val('');
            this.getById(clientId + '_DropDownListCountry').val('');
            this.getById(clientId + '_TextBoxPostalCode').val('');
            this.getById(clientId + '_TextBoxHomePhone').val('');
            this.getById(clientId + '_TextBoxWorkPhone').val('');
            this.getById(clientId + '_TextBoxOtherPhone').val('');
            this.getById(clientId + '_TextBoxFax').val('');
            this.getById(clientId + '_TextBoxEmailAddress').val('');
        };
        
        thisContactInput.populateCurrentContact = function()
        {
            var clientId = null,
            currentContactData = null;
            if (thisContactInput.currentContactData)
            {
                if (thisContactInput.imContact.attr('checked') === true)
                {
                    clientId = thisContactInput.clientId;
                    currentContactData = thisContactInput.currentContactData;
                    this.getById(clientId + '_DropDownListTitle').val(currentContactData.title);
                    this.getById(clientId + '_TextBoxFirstName').val(currentContactData.firstName);
                    this.getById(clientId + '_TextBoxMiddleName').val(currentContactData.middleName);
                    this.getById(clientId + '_TextBoxLastName').val(currentContactData.lastName);
                    this.getById(clientId + '_TextBoxAddressLine1').val(currentContactData.streetAddressOne);
                    this.getById(clientId + '_TextBoxAddressLine2').val(currentContactData.streetAddressTwo);
                    this.getById(clientId + '_TextBoxAddressLine3').val(currentContactData.streetAddressThree);
                    this.getById(clientId + '_TextBoxCity').val(currentContactData.city);
                    this.getById(clientId + '_DropDownListStateProvince').val(currentContactData.stateProvince);
                    this.getById(clientId + '_DropDownListCountry').val(currentContactData.country);
                    this.getById(clientId + '_TextBoxPostalCode').val(currentContactData.postalCode);
                    this.getById(clientId + '_TextBoxHomePhone').val(currentContactData.eveningPhone);
                    this.getById(clientId + '_TextBoxWorkPhone').val(currentContactData.dayPhone);
                    this.getById(clientId + '_TextBoxOtherPhone').val(currentContactData.mobilePhone);
                    this.getById(clientId + '_TextBoxFax').val(currentContactData.faxPhone);
                    this.getById(clientId + '_TextBoxEmailAddress').val(currentContactData.email);
                }
                else
                {
                    thisContactInput.clearCurrentContact();
                }
            }
        };
        
        thisContactInput.populateCountryStateHash = function ()
        {
            var i = 0;
            var selectBox = thisContactInput.stateInput.get(0);
            var country = '';
            var stateArray = [];
            var countryStateArray = [];
            var option = null;
            var state = '';
            var stateName = '';
            var stateObject = {};
            var countryStateHash = {};

            if ((selectBox) && (selectBox.options))
            {
                thisContactInput.countryStateHash = {};
                countryStateHash.customStates = [];
                countryStateHash.allStates = [];
                for (i = 0; i < selectBox.options.length; i += 1)
                {
                    option = selectBox.options[i];
                    state = option.value;
                    stateName = option.text;
                    stateObject = { 
                        'name': stateName,
                        'code': state
                    };
                    countryStateArray = option.value.split('|');
                    if (countryStateArray.length === 2)
                    {
                        country = countryStateArray[0];
                        stateArray = countryStateHash[country];
                        stateArray = stateArray || [];
                        stateArray[stateArray.length] = stateObject;
                        countryStateHash[country] = stateArray;
                        
                        countryStateHash.allStates[countryStateHash.allStates.length] = stateObject;
                    }
                    else
                    {
                        countryStateHash.customStates[countryStateHash.customStates.length] = stateObject;
                    }
                }
                thisContactInput.countryStateHash = countryStateHash;
            }
        };
        
        thisContactInput.updateCountry = function ()
        {
            var countryState = thisContactInput.stateInput.val();
            var countryStateArray = countryState.split('|');
            var country = '';
            if (countryStateArray.length === 2)
            {
                country = countryStateArray[0];
                thisContactInput.countryInput.val(country);
            }
        };
        
        thisContactInput.updateState = function ()
        {
            var country = thisContactInput.countryInput.val();
            var stateArray = [];
            var stateObject = {};
            var stateObjectArray = [];
            var i = 0;
            if (!thisContactInput.countryStateHash)
            {
                thisContactInput.populateCountryStateHash();
            }
            stateArray = thisContactInput.countryStateHash[country];
            stateArray = stateArray || [];
            if (stateArray.length === 0)
            {
                stateArray = thisContactInput.countryStateHash.allStates;
            }
            for (i = 0; i < thisContactInput.countryStateHash.customStates.length; i += 1)
            {
                stateObject = thisContactInput.countryStateHash.customStates[i];
                stateObjectArray[stateObjectArray.length] = stateObject;
            }
            for (i = 0; i < stateArray.length; i += 1)
            {
                stateObject = stateArray[i];
                stateObjectArray[stateObjectArray.length] = stateObject;
            }
            var paramObject = {
                    'objectArray': stateObjectArray,
                    'selectBox': thisContactInput.stateInput,
                    'showCode': false,
                    'clearOptions': true
                };
            SKYSALES.Util.populateSelect(paramObject);
        };
        
        thisContactInput.getKey = function ()
        {
            var i = 0;
            var keyArray = thisContactInput.keyArray;
            var keyObject = null;
            var key = '';
            for (i = 0; i < keyArray.length; i += 1)
            {
                keyObject = keyArray[i];
                key += keyObject.val();
            }
            key = thisContactInput.clientId + '_' + key;
            return key;
        };
        
        thisContactInput.populateClientStoreIdHash = function ()
        {
            var clientHash = thisContactInput.clientHash;
            var i = 0;
            var keyValueStr = '';
            var keyValueArray = [];
            var singleKeyValueStr = '';
            var singleKeyValueArray = [];
            var eqIndex = -1;
            var key = thisContactInput.getKey();
            var value = null;
            thisContactInput.clientStoreIdHash = {};
            if ((key) && (clientHash) && (clientHash[key]))
            {
                thisContactInput.clientStoreIdHash = thisContactInput.clientStoreIdHash || {};
                keyValueStr = clientHash[key];
                keyValueArray = keyValueStr.split('&');
                for (i = 0; i < keyValueArray.length; i += 1)
                {
                    singleKeyValueStr = keyValueArray[i];
                    eqIndex = singleKeyValueStr.indexOf('=');
                    if (eqIndex > -1)
                    {
                        key = singleKeyValueStr.substring(0, eqIndex);
                        value = singleKeyValueStr.substring(eqIndex + 1, singleKeyValueStr.length);
                        if (key)
                        {
                            thisContactInput.clientStoreIdHash[key] = value;
                        }
                    }
                }
            }
        };
        
        thisContactInput.autoPopulateForm = function ()
        {
            thisContactInput.populateClientStoreIdHash();
            var clientStoreIdHash = thisContactInput.clientStoreIdHash;
            var key = '';
            var value = '';
            for (key in clientStoreIdHash)
            {
                if (clientStoreIdHash.hasOwnProperty(key))
                {
                    value = clientStoreIdHash[key];
                    this.getById(key).val(value);
                }
            }
        };
        
        thisContactInput.addEvents = function ()
        {
            contactInput.addEvents.call(this);
            var i = 0;
            var keyArray = thisContactInput.keyArray;
            var key = null;
            for (i = 0; i < keyArray.length; i += 1)
            {
                key = keyArray[i];
                key.change(thisContactInput.autoPopulateForm);
            }
            thisContactInput.countryInput.change(thisContactInput.updateState);
            thisContactInput.stateInput.change(thisContactInput.updateCountry);
            thisContactInput.imContact.click(thisContactInput.populateCurrentContact);
            thisContactInput.logOutButton.click(thisContactInput.clearCurrentContact);
        };
        
        thisContactInput.setVars = function ()
        {
            contactInput.setVars.call(this);
            var i = 0;
            var keyIdArray = thisContactInput.keyIdArray;
            var keyArray = thisContactInput.keyArray;
            var keyId = '';
            for (i = 0; i < keyIdArray.length; i += 1)
            {
                keyId = keyIdArray[i];
                keyArray[keyArray.length] = this.getById(keyId);
            }
            thisContactInput.countryInput = this.getById(thisContactInput.countryInputId);
            thisContactInput.stateInput = this.getById(thisContactInput.stateInputId);
            thisContactInput.imContact = this.getById(thisContactInput.imContactId);
            thisContactInput.logOutButton = this.getById('MemberLoginContactView_ButtonLogOut');
        };
        
        thisContactInput.init = function (paramObj)
        {
            this.setSettingsByObject(paramObj);
            this.setVars();
            this.addEvents();
        };
        return thisContactInput;
    };
}
