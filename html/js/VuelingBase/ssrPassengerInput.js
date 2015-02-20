/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/
/*


JsLint Status:
Pass - JsLint Edition 2009-08-31
        
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

/*global $: false, jQuery: false, window: false, SKYSALES: false, alert: false */

/*
    Name: 
        Class SsrPassengerInput
    Param:
        None
    Return: 
        An instance of SsrPassengerInput
    Functionality:
        This class represents an SsrPassengerInput
        It is used to sell ssrs at any point in the booking flow
    Notes:
    Class Hierarchy:
        SkySales -> SsrPassengerInput
*/
if (!SKYSALES.Class.SsrPassengerInput)
{
    SKYSALES.Class.SsrPassengerInput = function ()
    {
        var parent = SKYSALES.Class.SkySales();
        var thisSsrPassengerInput = SKYSALES.Util.extendObject(parent);
        
        thisSsrPassengerInput.ssrFormArray = null;
        thisSsrPassengerInput.ssrFeeArray = null;
        thisSsrPassengerInput.errorMsgOverMaxPerPassenger = 'There has been an error';
        thisSsrPassengerInput.ssrButtonIdArray = null;
        thisSsrPassengerInput.ssrButtonArray = null;
        thisSsrPassengerInput.buttonTrackId = "";
        thisSsrPassengerInput.buttonTrack = null;
        
        thisSsrPassengerInput.init = function (json)
        {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
            $('table.ssrSoldContainer :input', this.container).attr("disabled", "disabled");
        };
        
        thisSsrPassengerInput.setVars = function ()
        {
            thisSsrPassengerInput.buttonTrack = this.getById(this.buttonTrackId);
            thisSsrPassengerInput.ssrButtonIdArray = this.ssrButtonIdArray || [];
            var ssrButtonArray = [];
            var i = 0;
            var ssrButton = null;
            var ssrButtonId = '';
            for (i = 0; i < this.ssrButtonIdArray.length; i += 1)
            {
                ssrButtonId = this.ssrButtonIdArray[i];
                ssrButton = this.getById(ssrButtonId);
                if (ssrButton.length > 0)
                {
                    ssrButtonArray[ssrButtonArray.length] = ssrButton;
                }
            }
            thisSsrPassengerInput.ssrButtonArray = ssrButtonArray;
        };
        
        thisSsrPassengerInput.addEvents = function ()
        {
            this.addButtonClickedEvents();
        };
        
        thisSsrPassengerInput.addButtonClickedEvents = function () 
        {
            var i = 0;
            var ssrButton = null;
            for (i = 0; i < this.ssrButtonArray.length; i += 1)
            {
                ssrButton = this.ssrButtonArray[i];
                ssrButton.click(this.updateButtonTrackHandler);
            }
        };
        
        thisSsrPassengerInput.updateButtonTrackHandler = function ()
        {
            thisSsrPassengerInput.buttonTrack.val(this.id);
        };
        
        thisSsrPassengerInput.setSettingsByObject = function (json)
        {
            parent.setSettingsByObject.call(this, json);
            
            var i = 0;
            var ssrFormArray = this.ssrFormArray || [];
            var ssrForm = null;
            for (i = 0; i < ssrFormArray.length; i += 1)
            {
                ssrForm = new SKYSALES.Class.SsrForm();
                ssrForm.index = i;
                ssrForm.ssrPassengerInput = this;
                ssrForm.init(ssrFormArray[i]);
                ssrFormArray[i] = ssrForm;
            }
            
            var ssrFeeArray = this.ssrFeeArray || [];
            var ssrFee = null;
            for (i = 0; i < ssrFeeArray.length; i += 1)
            {
                ssrFee = new SKYSALES.Class.SsrFormFee();
                ssrFee.index = i;
                ssrFee.ssrPassengerInput = this;
                ssrFee.init(ssrFeeArray[i]);
                ssrFeeArray[i] = ssrFee;
            }
        };
        
        thisSsrPassengerInput.deactivateSsrFormNotes = function ()
        {
            var i = 0;
            var ssrFormArray = this.ssrFormArray;
            var ssrForm = null;
            
            for (i = 0; i < ssrFormArray.length; i += 1)
            {
                ssrForm = ssrFormArray[i];
                ssrForm.deactivateNoteDiv();
            }
        };
        return thisSsrPassengerInput;
    };
    SKYSALES.Class.SsrPassengerInput.createObject = function (json)
    {
        SKYSALES.Util.createObject('ssrPassengerInput', 'SsrPassengerInput', json);
    };
}

    
/*
    Name: 
        Class SsrForm
    Param:
        None
    Return: 
        An instance of SsrForm
    Functionality:
        An SsrForm represents a row on the SsrPassengerInput
    Notes:
    Class Hierarchy:
        SkySales -> SsrForm
*/
SKYSALES.Class.SsrForm = function ()
{
    var parent = SKYSALES.Class.SkySales();
    var thisSsrForm = SKYSALES.Util.extendObject(parent);
    
    thisSsrForm.maximumDropDownLimit = 0;
    thisSsrForm.ssrPassengerId = '';
    thisSsrForm.ssrPassenger = null;
    thisSsrForm.ssrCodeId = '';
    thisSsrForm.ssrCode = null;
    thisSsrForm.ssrQuantityId = '';
    thisSsrForm.ssrQuantity = null;
    thisSsrForm.ssrNoteId = '';
    thisSsrForm.ssrNote = null;
    thisSsrForm.ssrNoteIframeId = '';
    thisSsrForm.ssrNoteIframe = null;
    thisSsrForm.ssrNoteCloseId = '';
    thisSsrForm.ssrNoteClose = null;
    thisSsrForm.ssrNoteDivId = '';
    thisSsrForm.ssrNoteDiv = null;
    thisSsrForm.ssrNoteImageId = '';
    thisSsrForm.ssrNoteImage = null;
    thisSsrForm.ssrNoteCancelId = '';
    thisSsrForm.ssrNoteCancel = null;
    thisSsrForm.ssrFlightId = '';
    thisSsrForm.ssrFlight = null;
    thisSsrForm.ssrAmountId = '';
    thisSsrForm.ssrAmount = null;
    thisSsrForm.ssrCurrencyId = '';
    thisSsrForm.ssrCurrency = null;
    thisSsrForm.index = -1;
    thisSsrForm.ssrPassengerInput = null;

    thisSsrForm.init = function (json)
    {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
        this.updateSsrAmount();
    };
    
    thisSsrForm.setVars = function ()
    {
        thisSsrForm.ssrNote = this.getById(this.ssrNoteId);
        thisSsrForm.ssrNoteDiv = this.getById(this.ssrNoteDivId);
        thisSsrForm.ssrNoteClose = this.getById(this.ssrNoteCloseId);
        thisSsrForm.ssrNoteCancel = this.getById(this.ssrNoteCancelId);
        thisSsrForm.ssrNoteImage = this.getById(this.ssrNoteImageId);
        thisSsrForm.ssrNoteIframe = this.getById(this.ssrNoteIframeId);
        thisSsrForm.ssrQuantity = this.getById(this.ssrQuantityId);
        thisSsrForm.ssrPassenger = this.getById(this.ssrPassengerId);
        thisSsrForm.ssrCode = this.getById(this.ssrCodeId);
        thisSsrForm.ssrCurrency = this.getById(this.ssrCurrencyId);
        thisSsrForm.ssrFlight = this.getById(this.ssrFlightId);
        thisSsrForm.ssrAmount = this.getById(this.ssrAmountId);
    };
    
    thisSsrForm.addEvents = function ()
    {
        this.addNoteEvents();
        this.addQuantityEvents();
        this.addSSRCodeEvents();
        this.addFlightEvents();
    };
    
    thisSsrForm.addFlightEvents = function ()
    {
        this.ssrFlight.change(this.updateSsrAmountHandler);
    };
    
    thisSsrForm.updateSsrQuantityHandler = function ()
    {
        thisSsrForm.updateSsrQuantity();
    };
    
    thisSsrForm.updateSsrAmountHandler = function ()
    {
        thisSsrForm.updateSsrAmount();
    };
    
    thisSsrForm.addSSRCodeEvents = function ()
    {
        this.ssrCode.change(this.updateSsrQuantityHandler);
        this.ssrCode.change(this.updateSsrAmountHandler);
    };
    
    thisSsrForm.addQuantityEvents = function ()
    {
        this.ssrQuantity.change(this.updateSsrAmountHandler);
        this.ssrQuantity.blur(this.updateSsrAmountHandler);
    };
    
    thisSsrForm.updateSsrAmount = function ()
    {
        var ssrAmount = this.ssrAmount;
        var ssrAmountFormatted = SKYSALES.Util.convertToLocaleCurrency('0.00');
        ssrAmount.val(ssrAmountFormatted);
        var ssrPassengerValue = this.ssrPassenger.val();
        var ssrCodeValue = this.ssrCode.val();
        var ssrQuantityValue = this.ssrQuantity.val();
        ssrQuantityValue = $.trim(ssrQuantityValue);
        var re = /^[0-9]+$/;
        var j = 0;
        var ssrPassengerInput = this.ssrPassengerInput;
        var ssrFeeArray = ssrPassengerInput.ssrFeeArray;
        var ssrFee = null;
        var ssrFlightValue = '';
        var amount = 0;
        
        if (re.test(ssrQuantityValue))
        {
            ssrFlightValue = this.ssrFlight.val();
            
            for (j = 0; j < ssrFeeArray.length; j += 1)
            {
                ssrFee = ssrFeeArray[j];
                
                if ((ssrFlightValue === "all") || (ssrFlightValue === ssrFee.segmentKey))
                {
                    if ((ssrPassengerValue === ssrFee.passengerNumber) && (ssrCodeValue === ssrFee.ssrCode))
                    {
                        amount += (ssrFee.amount * ssrQuantityValue);
                    }
                }
            }
            ssrAmountFormatted = SKYSALES.Util.convertToLocaleCurrency(amount);
            ssrAmount.val(ssrAmountFormatted);
        }
        else
        {
            this.ssrQuantity.val(0);
        }
    };
    
    thisSsrForm.updateSsrQuantity = function ()
    {
        var maximumDropDownLimit = this.maximumDropDownLimit;
        maximumDropDownLimit = window.parseInt(maximumDropDownLimit, 10);

        var ssrPassengerValue = this.ssrPassenger.val();
        var ssrCodeValue = this.ssrCode.val();
        var ssrFlightValue = this.ssrFlight.val();
        var i = 0;
        var j = 0;
        var ssrPassengerInput = this.ssrPassengerInput;
        var ssrFeeArray = ssrPassengerInput.ssrFeeArray;
        var ssrFee = null;
        var ssrQuantityValue = this.ssrQuantity.val();
        ssrQuantityValue = parseInt(ssrQuantityValue, 10);
        var maxPerPassenger = 0;
        var newOpt = null;
        var ssrQuantityInput = this.ssrQuantity.get(0);
        
        for (i = 0; i < ssrFeeArray.length; i += 1)
        {
            ssrFee = ssrFeeArray[i];
            if ((ssrFlightValue === "all") || (ssrFlightValue === ssrFee.segmentKey))
            {
                if ((ssrPassengerValue === ssrFee.passengerNumber) && (ssrCodeValue === ssrFee.ssrCode))
                {
                    maxPerPassenger = parseInt(ssrFee.maxPerPassenger, 10);
                    if (maxPerPassenger === 0)
                    {
                        maxPerPassenger = maximumDropDownLimit;
                        maxPerPassenger = parseInt(maxPerPassenger, 10);
                        if (ssrQuantityValue >= maxPerPassenger)
                        {
                            maxPerPassenger = ssrQuantityValue;
                            maxPerPassenger = maxPerPassenger + 1;
                        }
                    }
                    
                    if (ssrQuantityInput.options)
                    {
                    
                        while (ssrQuantityInput.options.length > 0)
                        {
                            ssrQuantityInput.options[0] = null;
                        }
                        
                        for (j = 0; j <= maxPerPassenger; j += 1)
                        {
                            newOpt = new window.Option(j, j);
                            ssrQuantityInput.options[j] = newOpt;
                            if (ssrQuantityValue === j)
                            {
                                this.ssrQuantity.val(j);
                            }
                        }
                    }
                    
                    if (ssrQuantityValue > maxPerPassenger)
                    {
                        this.ssrQuantity.val(maxPerPassenger);
                        alert(this.getErrorMsgOverMaxPerPassenger());
                    }
                    else
                    {
                        this.ssrQuantity.val(ssrQuantityValue);
                    }
                }
            }
        }
    };
    
    thisSsrForm.getErrorMsgOverMaxPerPassenger = function ()
    {
        var retVal = '';
        retVal = this.ssrPassengerInput.errorMsgOverMaxPerPassenger;
        return retVal;
    };
    
    thisSsrForm.clearAndDeactivateNoteDiv = function ()
    {
        var ssrNote = this.ssrNote;
        var isDisabled = ssrNote.is(':disabled');

        if (isDisabled === false)
        {
            ssrNote.val('');
        }
        this.deactivateNoteDiv();
    };
    
    thisSsrForm.deactivateNoteDiv = function ()
    {
        this.ssrNoteDiv.hide();
        this.ssrNoteIframe.hide();
    };

    thisSsrForm.activateNoteDiv = function ()
    {
        // Reset the floating ssrNote divs
        this.ssrPassengerInput.deactivateSsrFormNotes();
        
        var ssrNoteImage = this.ssrNoteImage.get(0);
        var dhtml = SKYSALES.Dhtml();
        var left = dhtml.getX(ssrNoteImage);
        var top = dhtml.getY(ssrNoteImage);
        
        this.ssrNoteDiv.css('left', left + 'px');
        this.ssrNoteDiv.css('top', top + 'px');
        this.ssrNoteDiv.show();
        
        this.ssrNoteIframe.css('left', left + 'px');
        this.ssrNoteIframe.css('top', top + 'px');
        this.ssrNoteIframe.show();
        
        var isDisabled = this.ssrNote.is(':disabled');
        if (isDisabled === false)
        {
            this.ssrNote.click();
        }
    };
    
    thisSsrForm.ssrNoteCancelHandler = function ()
    {
        thisSsrForm.clearAndDeactivateNoteDiv();
    };
    
    thisSsrForm.ssrNoteCloseHandler = function ()
    {
        thisSsrForm.deactivateNoteDiv();
    };
    
    thisSsrForm.ssrNoteImageHandler = function ()
    {
        thisSsrForm.activateNoteDiv();
    };
    
    thisSsrForm.addNoteEvents = function ()
    {
        this.ssrNoteCancel.mouseup(this.ssrNoteCancelHandler);
        this.ssrNoteClose.mouseup(this.ssrNoteCloseHandler);
        this.ssrNoteImage.mouseup(this.ssrNoteImageHandler);
    };
    return thisSsrForm;
};

/*
    Name: 
        Class SsrFormFee
    Param:
        None
    Return: 
        An instance of SsrFormFee
    Functionality:
        An SsrForm represents a fee that is used to show the amount for an SsrForm
    Notes:
    Class Hierarchy:
        SkySales -> SsrFormFee
*/
SKYSALES.Class.SsrFormFee = function ()
{
    var parent = SKYSALES.Class.SkySales();
    var thisSsrFormFee = SKYSALES.Util.extendObject(parent);
    
    thisSsrFormFee.journeyIndex = -1;
    thisSsrFormFee.segmentIndex = -1;
    thisSsrFormFee.segmentKey = '';
    thisSsrFormFee.passengerNumber = -1;
    thisSsrFormFee.ssrCode = '';
    thisSsrFormFee.feeCode = '';
    thisSsrFormFee.amount = 0;
    thisSsrFormFee.currencyCode = '';
    thisSsrFormFee.maxPerPassenger = 0;
    thisSsrFormFee.index = -1;
    thisSsrFormFee.ssrPassengerInput = null;
    
    return thisSsrFormFee;
};