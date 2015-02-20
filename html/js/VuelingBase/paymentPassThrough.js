/*global $:false, SKYSALES:false, window:false, Option:false, Date:false, document: false */

if (SKYSALES.Class.PaymentPassThroughControl === undefined)
{
    /*
    Class PaymentPassThroughControl
    */
    SKYSALES.Class.PaymentPassThroughControl = function ()
    {
        var thisPaymentPassThroughControl = this;
        var paymentPassThroughArray = [];
        thisPaymentPassThroughControl.paymentTypeArray = [];
        /*
            PaymentPassThrough extends PaymentPassThroughBase
        */
        var PaymentPassThrough = function ()
        {
            var paymentPassThroughBase = new SKYSALES.Class.PaymentPassThroughBase();
            var thisPaymentPassThrough = SKYSALES.Util.extendObject(paymentPassThroughBase);
            
            thisPaymentPassThrough.paymentInputContainerId = 'paymentInputContent';
            thisPaymentPassThrough.paymentInputContainer = {};
            thisPaymentPassThrough.paymentCardTypeId = '';
            thisPaymentPassThrough.paymentCardType = {};
            thisPaymentPassThrough.paymentCardNumberId = '';
            thisPaymentPassThrough.paymentCardNumber = {};
            thisPaymentPassThrough.paymentExpirationDateMonthId = '';
            thisPaymentPassThrough.paymentExpirationDateMonth = {};
            thisPaymentPassThrough.paymentExpirationDateYearId = '';
            thisPaymentPassThrough.paymentExpirationDateYear = {};
            thisPaymentPassThrough.paymentCardHolderNameId = '';
            thisPaymentPassThrough.paymentCardHolderName = {};
            thisPaymentPassThrough.autoFillId = '';
            thisPaymentPassThrough.autoFill = '';
            thisPaymentPassThrough.vendorCode = '';
            thisPaymentPassThrough.paymentTypeArray = [];
            thisPaymentPassThrough.cardTypeId = '';
            thisPaymentPassThrough.cardType = {};
            thisPaymentPassThrough.cardNumberId = '';
            thisPaymentPassThrough.cardNumber = {};
            thisPaymentPassThrough.expYearId = '';
            thisPaymentPassThrough.expYear = {};
            thisPaymentPassThrough.expYearCount = 10;
            thisPaymentPassThrough.expMonthId = '';
            thisPaymentPassThrough.expMonth = {};
            thisPaymentPassThrough.expDateId = '';
            thisPaymentPassThrough.expDate = {};
            thisPaymentPassThrough.cardHolderNameId = '';
            thisPaymentPassThrough.cardHolderName = {};
            
            thisPaymentPassThrough.setSettingsByObject = function (jsonObject)
            {
                paymentPassThroughBase.setSettingsByObject.call(this, jsonObject);
                var propName = '';
                for (propName in jsonObject)
                {
                    if (thisPaymentPassThrough.hasOwnProperty(propName))
                    {
                        thisPaymentPassThrough[propName] = jsonObject[propName];
                    }
                }
            };
            
            thisPaymentPassThrough.setVars = function ()
            {
                paymentPassThroughBase.setVars.call(this);
                thisPaymentPassThrough.paymentInputContainer =  this.getById(thisPaymentPassThrough.paymentInputContainerId);
                thisPaymentPassThrough.paymentCardType =  this.getById(thisPaymentPassThrough.paymentCardTypeId);
                thisPaymentPassThrough.paymentCardNumber =  this.getById(thisPaymentPassThrough.paymentCardNumberId);
                thisPaymentPassThrough.paymentExpirationDateMonth =  this.getById(thisPaymentPassThrough.paymentExpirationDateMonthId);
                thisPaymentPassThrough.paymentExpirationDateYear =  this.getById(thisPaymentPassThrough.paymentExpirationDateYearId);
                thisPaymentPassThrough.paymentCardHolderName =  this.getById(thisPaymentPassThrough.paymentCardHolderNameId);
                thisPaymentPassThrough.autoFill = this.getById(thisPaymentPassThrough.autoFillId);
                thisPaymentPassThrough.cardType = this.getById(thisPaymentPassThrough.cardTypeId);
                thisPaymentPassThrough.cardNumber = this.getById(thisPaymentPassThrough.cardNumberId);
                thisPaymentPassThrough.expYear = this.getById(thisPaymentPassThrough.expYearId);
                thisPaymentPassThrough.expMonth = this.getById(thisPaymentPassThrough.expMonthId);
                thisPaymentPassThrough.expDate = this.getById(thisPaymentPassThrough.expDateId);
                thisPaymentPassThrough.cardHolderName = this.getById(thisPaymentPassThrough.cardHolderNameId);
                if (thisPaymentPassThroughControl.paymentTypeArray[thisPaymentPassThrough.vendorCode] !== undefined)
                {
                    thisPaymentPassThrough.paymentTypeArray = thisPaymentPassThroughControl.paymentTypeArray[thisPaymentPassThrough.vendorCode].paymentTypeArray;
                }
            };
            
            thisPaymentPassThrough.updateExpDate = function ()
            {
                var currentDate = new Date();
                var year = thisPaymentPassThrough.expYear.val();
                if (!year)
                {
                    year = currentDate.getFullYear();
                }
                var month = thisPaymentPassThrough.expMonth.val();
                if (!month)
                {
                    month = currentDate.getMonth();
                }
                //var expDate = new Date(year, month - 1);
                thisPaymentPassThrough.expDate.val(year + '-' + month + '-01');
            };
            
            thisPaymentPassThrough.autoFillForm = function ()
            {
                if (this.checked)
                {
                    var cardType = thisPaymentPassThrough.paymentCardType.val();
                    if (cardType)
                    {
                        cardType = cardType.replace(/ExternalAccount:/, '');
                        thisPaymentPassThrough.cardType.val(cardType);
                        thisPaymentPassThrough.cardNumber.val(thisPaymentPassThrough.paymentCardNumber.val());
                        thisPaymentPassThrough.expYear.val(thisPaymentPassThrough.paymentExpirationDateYear.val());
                        thisPaymentPassThrough.expMonth.val(thisPaymentPassThrough.paymentExpirationDateMonth.val());
                        thisPaymentPassThrough.cardHolderName.val(thisPaymentPassThrough.paymentCardHolderName.val());
                        thisPaymentPassThrough.updateExpDate();
                    }
                }
            };
            
            thisPaymentPassThrough.addEvents = function ()
            {
                paymentPassThroughBase.addEvents.call(this);
                thisPaymentPassThrough.expYear.change(thisPaymentPassThrough.updateExpDate);
                thisPaymentPassThrough.expMonth.change(thisPaymentPassThrough.updateExpDate);
                thisPaymentPassThrough.autoFill.click(thisPaymentPassThrough.autoFillForm);
            };
            
            thisPaymentPassThrough.populateCardTypeDropDown = function ()
            {
                var selectBox = thisPaymentPassThrough.cardType.get(0);
                //var paymentTypeArray = thisPaymentPassThrough.paymentTypeArray;
                var optionArray = [];
                var text = '';
                var value = '';
                var paymentType = {};
                var i = 0;
                if (selectBox)
                {
                    for (i = 0; i < thisPaymentPassThrough.paymentTypeArray.length; i += 1)
                    {
                        paymentType = thisPaymentPassThrough.paymentTypeArray[i];
                        if ((paymentType !== undefined) && (paymentType.paymentTypeCode !== undefined))
                        {
                            value = paymentType.paymentTypeCode;
                            text = paymentType.description;
                            optionArray[optionArray.length] = new Option(text, value, false, false);
                        }
                    }
                    thisPaymentPassThrough.addOptions(selectBox, optionArray);
                }
            };
            
            thisPaymentPassThrough.populateExpYearDropDown = function ()
            {
                var selectBox = thisPaymentPassThrough.expYear.get(0);
                //var paymentTypeArray = thisPaymentPassThrough.paymentTypeArray;
                var optionArray = [];
                var i = 0;
                var currentDate = new Date();
                var year = currentDate.getFullYear();
                if (selectBox)
                {
                    for (i = 0; i < thisPaymentPassThrough.expYearCount; i += 1)
                    {
                        optionArray[optionArray.length] = new Option(year, year, false, false);
                        year += 1;
                    }
                    thisPaymentPassThrough.addOptions(selectBox, optionArray);
                }
            };
            
            thisPaymentPassThrough.init = function (paramObj)
            {
                paymentPassThroughBase.init.call(this, paramObj);
                thisPaymentPassThrough.addEvents();
                thisPaymentPassThrough.populateExpYearDropDown();
            };
            
            return thisPaymentPassThrough;
        };
        thisPaymentPassThroughControl.addPaymentPassThrough = function (activityParamObj)
        {
            var paymentPassThrough = new PaymentPassThrough();
            paymentPassThrough.init(activityParamObj);
            paymentPassThroughArray[paymentPassThroughArray.length] = paymentPassThrough;
            paymentPassThrough.populateCardTypeDropDown();
        };
        
        /*
            PaymentType extends PaymentTypeBase
        */
        var PaymentType = function ()
        {
            var paymentTypeBase = new SKYSALES.Class.PaymentTypeBase();
            var thisPaymentType = SKYSALES.Util.extendObject(paymentTypeBase);
            return thisPaymentType;
        };
        thisPaymentPassThroughControl.addPaymentType = function (activityParamObj)
        {
            var paymentType = new PaymentType();
            paymentType.init(activityParamObj);
            thisPaymentPassThroughControl.paymentTypeArray[paymentType.vendorCode] = paymentType;
        };
        return thisPaymentPassThroughControl;
    };
    SKYSALES.Class.PaymentPassThroughControl.initializePaymentPassThroughControl = function ()
    {
        var paramObject = {
            objNameBase: 'paymentPassThroughControl',
            objType: 'PaymentPassThroughControl',
            selector: 'div.paymentPassThroughContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.PaymentPassThroughControl.initializePaymentPassThroughControl);
}