/*global $ SKYSALES window */

    /*
    Member variables of the TravelDocumentInput
    */
    this.instanceName = '';
    this.delimiter = '_';
    
    this.travelDocumentInfoId = '';
    this.travelDocumentInfo = null;
    this.documentNumberId = '';
    this.documentNumber = null;
    this.documentTypeId = '';
    this.documentType = null;
SKYSALES.Class.TravelDocumentInput = function () 
{
    var parent = new SKYSALES.Class.SkySales();
    var thisTravelDocumentInput = SKYSALES.Util.extendObject(parent);
    thisTravelDocumentInput.instanceName = '';
    thisTravelDocumentInput.delimiter = '_';
    thisTravelDocumentInput.travelDocumentInfoId = '';
    thisTravelDocumentInput.travelDocumentInfo = null;
    thisTravelDocumentInput.documentNumberId = '';
    thisTravelDocumentInput.documentNumber = null;
    thisTravelDocumentInput.documentTypeId = '';
    thisTravelDocumentInput.documentType = null;
    thisTravelDocumentInput.documentIssuingCountryId = '';
    thisTravelDocumentInput.documentIssuingCountry = null;
    thisTravelDocumentInput.documentExpYearId = '';
    thisTravelDocumentInput.documentExpYear = null;
    thisTravelDocumentInput.documentExpMonthId = '';
    thisTravelDocumentInput.documentExpMonth = null;
    thisTravelDocumentInput.documentExpDayId = '';
    thisTravelDocumentInput.documentExpDay = null;
    thisTravelDocumentInput.actionId = '';
    thisTravelDocumentInput.action = null;
    thisTravelDocumentInput.travelDocumentKey = '';
    
    thisTravelDocumentInput.missingDocumentText = '';
    thisTravelDocumentInput.missingDocumentTypeText = '';
    thisTravelDocumentInput.invalidExpDateText = '';
    thisTravelDocumentInput.emptyExpDateText = '';
    thisTravelDocumentInput.invalidDaysOfMonthTextPre = '';
    thisTravelDocumentInput.invalidDaysOfMonthTextMid = '';
    thisTravelDocumentInput.invalidDaysOfMonthTextPost = '';
    thisTravelDocumentInput.missingDocumentNumberText = '';
    thisTravelDocumentInput.missingDocumentCountryText = '';
    thisTravelDocumentInput.init = function (json) 
    
    this.setDocumentIssuingCountryId = function(id)
    {
        this.documentIssuingCountryId = id;
    }
    
    this.setActionId = function(id)
    {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisTravelDocumentInput.setVars = function () 
    {
        thisTravelDocumentInput.travelDocumentInfo = this.getById(this.travelDocumentInfoId);
        thisTravelDocumentInput.documentType = this.getById(this.documentTypeId);
        thisTravelDocumentInput.documentNumber = this.getById(this.documentNumberId);
        thisTravelDocumentInput.documentIssuingCountry = this.getById(this.documentIssuingCountryId);
        thisTravelDocumentInput.documentExpYear = this.getById(this.documentExpYearId);
        thisTravelDocumentInput.documentExpMonth = this.getById(this.documentExpMonthId);
        thisTravelDocumentInput.documentExpDay = this.getById(this.documentExpDayId);
        thisTravelDocumentInput.action = this.getById(this.actionId);
    };
    
    thisTravelDocumentInput.setTravelDocumentInfo = function ()
    {
        var travelDocumentKey = '';
        var documentType = this.documentType.val();
        var documentNumber = this.documentNumber.val();
        var documentIssuingCountry = this.documentIssuingCountry.val();
        
        if (documentType && documentNumber && documentIssuingCountry)
        {
            //travelDocumentKey should always start with the delimiter.
            //travelDocumentKey format is as follows: _<DOC TYPE>_<DOC NUMBER>_<ISSUING COUNTRY>
            travelDocumentKey = this.delimiter + documentType + this.delimiter + documentNumber + this.delimiter + documentIssuingCountry;
            this.travelDocumentInfo.val(travelDocumentKey);
        }
        return true;
    };
    
    thisTravelDocumentInput.validateTravelDocumentHandler = function ()
    {
        var result = thisTravelDocumentInput.validateTravelDocument();
        return result;
    };
    
    thisTravelDocumentInput.validateTravelDocument = function ()
    {
        this.setTravelDocumentInfo();
        var action = this.action.get(0);
        var result = window.validate(action) && this.validateInput();
        return result;
    };
    thisTravelDocumentInput.addEvents = function () 
    {
        this.action.click(this.validateTravelDocumentHandler);
    };
    thisTravelDocumentInput.validateInput = function () 
    {
        var retVal = true;
        var msg = '';
        var invalidDateMsg = '';
        var documentNumberValue = this.documentNumber.val() || '';
        var documentExpYearValue = this.documentExpYear.val() || '';
        var documentExpMonthValue = this.documentExpMonth.val() || '';
        var documentExpDayValue = this.documentExpDay.val() || '';
        var documentTypeValue = this.documentType.val() || '';
        var documentIssuingCountryValue = this.documentIssuingCountry.val() || '';     
        var isPassedDate = false;
        var isValidDate = false;
        var documentExpMonthText = '';
        
        if (documentNumberValue || documentTypeValue || documentIssuingCountryValue || documentExpYearValue || documentExpMonthValue || documentExpDayValue)
        {
            if (!documentNumberValue) 
            {
                msg = msg + this.missingDocumentNumberText + "\n";
            if (!documentTypeValue) 
            {
                msg = msg + this.missingDocumentTypeText + "\n";
            if (!documentIssuingCountryValue) 
            {
                msg = msg + this.missingDocumentCountryText + "\n";
            
            isValidDate = this.checkDaysOfMonth(documentExpDayValue, documentExpMonthValue, documentExpYearValue);
            isPassedDate = this.isPastDate(documentExpDayValue, documentExpMonthValue, documentExpYearValue);
            if (documentExpDayValue && documentExpMonthValue && documentExpYearValue)
            {
                if (!isValidDate)
                {
                    documentExpMonthText = this.documentExpMonth.find(':selected').text();
                    invalidDateMsg = this.invalidDaysOfMonthTextPre + documentExpDayValue;
                    invalidDateMsg += this.invalidDaysOfMonthTextMid + documentExpMonthText + this.invalidDaysOfMonthTextPost;
                    msg = msg + invalidDateMsg + "\n";
                }
                else if (!isPassedDate)
                {
                    msg = msg + this.invalidExpDateText + "\n";
                }
            }
            else
            {
                msg = msg + this.emptyExpDateText + "\n";
            }
            
            if (msg) 
            {
                window.alert(this.missingDocumentText + "\n" + msg);
                retVal = false;
            }
        }
        return retVal;
    };
    
    thisTravelDocumentInput.checkDaysOfMonth = function (day, month, year) 
    {
        year = window.parseInt(year, 10);
        month = window.parseInt(month, 10);
        day = window.parseInt(day, 10);
        var retVal = false;
        var lastDayInFeb = null;
        var daysInFeb = -1;
        var daysInMonth = null;
        if (year && month && day)
        {
            month -= 1;
            lastDayInFeb = new Date();
            lastDayInFeb.setMonth(2);
            lastDayInFeb.setDate(1);
            lastDayInFeb.setDate(lastDayInFeb.getDate() - 1);
            daysInFeb = lastDayInFeb.getDate();
            daysInMonth = [31, daysInFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (day <= daysInMonth[month]) 
            {
                retVal = true;
            }
        }
        return retVal;
    };

    thisTravelDocumentInput.isPastDate = function (day, month, year)
    {
        year = window.parseInt(year, 10);
        month = window.parseInt(month, 10);
        day = window.parseInt(day, 10);
        var retVal = false;
        var today = null;
        var compareDate = null;
        if (year && month && day)
        {
            month -= 1;
            today = new Date();
            compareDate = new Date(year, month, day);
            if (compareDate > today)
            {
                retVal = true;
            }
        }
        return retVal;
    };
    
    return thisTravelDocumentInput;
};