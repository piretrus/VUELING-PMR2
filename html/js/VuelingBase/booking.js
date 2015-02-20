/*extern SKYSALES */

SKYSALES.BOOKING = {};

SKYSALES.BOOKING.CreateObject = function (objectType, objJson)
{
    var obj = null;
    switch (objectType)
    {
        case "bookingInfo" : 
            this[bookingProperty] = new nameSpace.BookingInfo(objJson);
            break;
        case "typeOfSale" : 
            this[bookingProperty] = new nameSpace.TypeOfSale(objJson);
            break;
        case "receivedBy":
            this[bookingProperty] = new nameSpace.ReceivedBy(objJson);
            break;
        case "bookingSum":
            this[bookingProperty] = new nameSpace.BookingSum(objJson);
            break;
        case "bookingHold":
            this[bookingProperty] = new nameSpace.BookingHold(objJson);
            break;
        case "pos":
            this[bookingProperty] = new nameSpace.PointOfSale(objJson);
            break;
        case "sourcePos":
            this[bookingProperty] = new nameSpace.PointOfSale(objJson);
            break;
        default:
            alert("Object: " + bookingProperty);
    }
};

SKYSALES.BOOKING.Booking = function (bookingJson)
{
    var nameSpace = SKYSALES.BOOKING;
    var bookingProperty = null;
    for (bookingProperty in bookingJson)
    {
        //alert(bookingProperty + "\n" + typeof(bookingJson[bookingProperty]));
        if (typeof(bookingJson[bookingProperty]) === "string")
        {
            //alert("String: " + bookingProperty);
            this[bookingProperty] = bookingJson[bookingProperty];
        }
        else if (bookingJson[bookingProperty].constructor.toString().indexOf("Array") > -1)
        {
            alert("Is Array: " + bookingProperty + "\n");
        }
        else if (typeof(bookingJson[bookingProperty]) === "object")
        {
            switch (bookingProperty)
            {
                case "bookingInfo" : 
                    this[bookingProperty] = new nameSpace.BookingInfo(bookingJson[bookingProperty]);
                    break;
                case "typeOfSale" : 
                    this[bookingProperty] = new nameSpace.TypeOfSale(bookingJson[bookingProperty]);
                    break;
                case "receivedBy":
                    this[bookingProperty] = new nameSpace.ReceivedBy(bookingJson[bookingProperty]);
                    break;
                case "bookingSum":
                    this[bookingProperty] = new nameSpace.BookingSum(bookingJson[bookingProperty]);
                    break;
                case "bookingHold":
                    this[bookingProperty] = new nameSpace.BookingHold(bookingJson[bookingProperty]);
                    break;
                case "pos":
                    this[bookingProperty] = new nameSpace.PointOfSale(bookingJson[bookingProperty]);
                    break;
                case "sourcePos":
                    this[bookingProperty] = new nameSpace.PointOfSale(bookingJson[bookingProperty]);
                    break;
                default:
                    alert("Object: " + bookingProperty);
            }
        }
        else
        {
            //alert("Not Found: " + typeof(bookingJson[bookingProperty]) + "\n" + bookingProperty);
        }
    }

    var bookingChangeCode;
    var bookingComments;
    var bookingComponents;
    var bookingContacts;
    var bookingId;
    var bookingInfo;
    var bookingParentId;
    var currencyCode;
    var groupName;
    var journeys;
    var parentRecordLocator;
    var paxCount;
    var recordLocator;
    var systemCode;
    var messageContext;
    var pos;
    var sourcePos;
    var bookingHistoryList;
    var bookingHold;
    var bookingSum;
    var otherServiceInfoList;
    var passengers;
    var payments;
    var receivedBy;
    var typeOfSale;
    var recordLocators;
    
    this.getBookingChangeCode = function ()
    {
        return bookingChangeCode;
    };
    this.setBookingChangeCode = function (arg)
    {
        bookingChangeCode = arg;
        return this;
    };

    this.getBookingComments = function ()
    {
        return bookingComments;
    };
    this.setBookingComments = function (arg)
    {
        bookingComments = arg;
        return this;
    };

    this.getBookingComponents = function ()
    {
        return bookingComponents;
    };
    this.setBookingComponents = function (arg)
    {
        bookingComponents = arg;
        return this;
    };

    this.getBookingContacts = function ()
    {
        return bookingContacts;
    };
    this.setBookingContacts = function (arg)
    {
        bookingContacts = arg;
        return this;
    };

    this.getBookingId = function ()
    {
        return bookingId;
    };
    this.setBookingId = function (arg)
    {
        bookingId = arg;
        return this;
    };

    this.getBookingInfo = function ()
    {
        return bookingInfo;
    };
    this.setBookingInfo = function (arg)
    {
        bookingInfo = arg;
        return this;
    };

    this.getBookingParentId = function ()
    {
        return bookingParentId;
    };
    this.setBookingParentId = function (arg)
    {
        bookingParentId = arg;
        return this;
    };

    this.getCurrencyCode = function ()
    {
        return currencyCode;
    };
    this.setCurrencyCode = function (arg)
    {
        currencyCode = arg;
        return this;
    };

    this.getGroupName = function ()
    {
        return groupName;
    };
    this.setGroupName = function (arg)
    {
        groupName = arg;
        return this;
    };

    this.getJourneys = function ()
    {
        return journeys;
    };
    this.setJourneys = function (arg)
    {
        journeys = arg;
        return this;
    };

    this.getParentRecordLocator = function ()
    {
        return parentRecordLocator;
    };
    this.setParentRecordLocator = function (arg)
    {
        parentRecordLocator = arg;
        return this;
    };

    this.getPaxCount = function ()
    {
        return paxCount;
    };
    this.setPaxCount = function (arg)
    {
        paxCount = arg;
        return this;
    };

    this.getRecordLocator = function ()
    {
        return recordLocator;
    };
    this.setRecordLocator = function (arg)
    {
        recordLocator = arg;
        return this;
    };

    this.getSystemCode = function ()
    {
        return systemCode;
    };
    this.setSystemCode = function (arg)
    {
        systemCode = arg;
        return this;
    };

    this.getMessageContext = function ()
    {
        return messageContext;
    };
    this.setMessageContext = function (arg)
    {
        messageContext = arg;
        return this;
    };

    this.getPos = function ()
    {
        return pos;
    };
    this.setPos = function (arg)
    {
        pos = arg;
        return this;
    };

    this.getSourcePos = function ()
    {
        return sourcePos;
    };
    this.setSourcePos = function (arg)
    {
        sourcePos = arg;
        return this;
    };

    this.getBookingHistoryList = function ()
    {
        return bookingHistoryList;
    };
    this.setBookingHistoryList = function (arg)
    {
        bookingHistoryList = arg;
        return this;
    };

    this.getBookingHold = function ()
    {
        return bookingHold;
    };
    this.setBookingHold = function (arg)
    {
        bookingHold = arg;
        return this;
    };

    this.getBookingSum = function ()
    {
        return bookingSum;
    };
    this.setBookingSum = function (arg)
    {
        bookingSum = arg;
        return this;
    };

    this.getOtherServiceInfoList = function ()
    {
        return otherServiceInfoList;
    };
    this.setOtherServiceInfoList = function (arg)
    {
        otherServiceInfoList = arg;
        return this;
    };

    this.getPassengers = function ()
    {
        return passengers;
    };
    this.setPassengers = function (arg)
    {
        passengers = arg;
        return this;
    };

    this.getPayments = function ()
    {
        return payments;
    };
    this.setPayments = function (arg)
    {
        payments = arg;
        return this;
    };

    this.getReceivedBy = function ()
    {
        return receivedBy;
    };
    this.setReceivedBy = function (arg)
    {
        receivedBy = arg;
        return this;
    };

    this.getTypeOfSale = function ()
    {
        return typeOfSale;
    };
    this.setTypeOfSale = function (arg)
    {
        typeOfSale = arg;
        return this;
    };

    this.getRecordLocators = function ()
    {
        return recordLocators;
    };
    this.setRecordLocators = function (arg)
    {
        recordLocators = arg;
        return this;
    };
};

SKYSALES.BOOKING.BookingComment = function ()
{
    var commentText;
    var commentType;
    var createdDate;
    var pointOfSale;

    this.getCommentText = function ()
    {
        return commentText;
    };
    this.setCommentText = function (arg)
    {
        commentText = arg;
        return this;
    };

    this.getCommentType = function ()
    {
        return commentType;
    };
    this.setCommentType = function (arg)
    {
        commentType = arg;
        return this;
    };

    this.getCreatedDate = function ()
    {
        return createdDate;
    };
    this.setCreatedDate = function (arg)
    {
        createdDate = arg;
        return this;
    };

    this.getPointOfSale = function ()
    {
        return pointOfSale;
    };
    this.setPointOfSale = function (arg)
    {
        pointOfSale = arg;
        return this;
    };

};

SKYSALES.BOOKING.Date = function ()
{
    var year;
    var month;
    var day;
    var hour;
    var minute;
    var second;

    this.getYear = function ()
    {
        return year;
    };
    this.setYear = function (arg)
    {
        year = arg;
        return this;
    };

    this.getMonth = function ()
    {
        return month;
    };
    this.setMonth = function (arg)
    {
        month = arg;
        return this;
    };

    this.getDay = function ()
    {
        return day;
    };
    this.setDay = function (arg)
    {
        day = arg;
        return this;
    };

    this.getHour = function ()
    {
        return hour;
    };
    this.setHour = function (arg)
    {
        hour = arg;
        return this;
    };

    this.getMinute = function ()
    {
        return minute;
    };
    this.setMinute = function (arg)
    {
        minute = arg;
        return this;
    };

    this.getSecond = function ()
    {
        return second;
    };
    this.setSecond = function (arg)
    {
        second = arg;
        return this;
    };
};

SKYSALES.BOOKING.PointOfSale = function (pointOfSaleJson)
{
    var pointOfSaleProperty = null;
    var obj = null;
    for (pointOfSaleProperty in pointOfSaleJson)
    {
	    if (typeof(pointOfSaleJson[pointOfSaleProperty]) === "string")
	    {
	        this[pointOfSaleProperty] = pointOfSaleJson[pointOfSaleProperty];
	    }
    }

    var agentCode;
    var domainCode;
    var locationCode;
    var organizationCode;
    
    this.getAgentCode = function ()
    {
        return agentCode;
    };
    this.setAgentCode = function (arg)
    {
        agentCode = arg;
        return this;
    };

    this.getDomainCode = function ()
    {
        return domainCode;
    };
    this.setDomainCode = function (arg)
    {
        domainCode = arg;
        return this;
    };

    this.getLocationCode = function ()
    {
        return locationCode;
    };
    this.setLocationCode = function (arg)
    {
        locationCode = arg;
        return this;
    };

    this.getOrganizationCode = function ()
    {
        return organizationCode;
    };
    this.setOrganizationCode = function (arg)
    {
        organizationCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.BookingComponent = function ()
{
    var beginLocationCode;
    var bookingComponentCharges;
    var bookingComponentId;
    var bookingId;
    var createdAgentId;
    var createdDate;
    var endDate;
    var endLocationCode;
    var historical;
    var itemDescription;
    var itemId;
    var itemSequence;
    var itemTypeCode;
    var modifiedDate;
    var orderId;
    var passengerId;
    //private string status;
    var supplierCode;
    var supplierRecordLocator;

    this.getBeginLocationCode = function ()
    {
        return beginLocationCode;
    };
    this.setBeginLocationCode = function (arg)
    {
        beginLocationCode = arg;
        return this;
    };

    this.getBookingComponentCharges = function ()
    {
        return bookingComponentCharges;
    };
    this.setBookingComponentCharges = function (arg)
    {
        bookingComponentCharges = arg;
        return this;
    };

    this.getBookingComponentId = function ()
    {
        return bookingComponentId;
    };
    this.setBookingComponentId = function (arg)
    {
        bookingComponentId = arg;
        return this;
    };

    this.getBookingId = function ()
    {
        return bookingId;
    };
    this.setBookingId = function (arg)
    {
        bookingId = arg;
        return this;
    };

    this.getCreatedAgentId = function ()
    {
        return createdAgentId;
    };
    this.setCreatedAgentId = function (arg)
    {
        createdAgentId = arg;
        return this;
    };

    this.getCreatedDate = function ()
    {
        return createdDate;
    };
    this.setCreatedDate = function (arg)
    {
        createdDate = arg;
        return this;
    };

    this.getEndDate = function ()
    {
        return endDate;
    };
    this.setEndDate = function (arg)
    {
        endDate = arg;
        return this;
    };

    this.getEndLocationCode = function ()
    {
        return endLocationCode;
    };
    this.setEndLocationCode = function (arg)
    {
        endLocationCode = arg;
        return this;
    };

    this.getHistorical = function ()
    {
        return historical;
    };
    this.setHistorical = function (arg)
    {
        historical = arg;
        return this;
    };

    this.getItemDescription = function ()
    {
        return itemDescription;
    };
    this.setItemDescription = function (arg)
    {
        itemDescription = arg;
        return this;
    };

    this.getItemId = function ()
    {
        return itemId;
    };
    this.setItemId = function (arg)
    {
        itemId = arg;
        return this;
    };

    this.getItemSequence = function ()
    {
        return itemSequence;
    };
    this.setItemSequence = function (arg)
    {
        itemSequence = arg;
        return this;
    };

    this.getItemTypeCode = function ()
    {
        return itemTypeCode;
    };
    this.setItemTypeCode = function (arg)
    {
        itemTypeCode = arg;
        return this;
    };

    this.getModifiedDate = function ()
    {
        return modifiedDate;
    };
    this.setModifiedDate = function (arg)
    {
        modifiedDate = arg;
        return this;
    };

    this.getOrderId = function ()
    {
        return orderId;
    };
    this.setOrderId = function (arg)
    {
        orderId = arg;
        return this;
    };

    this.getPassengerId = function ()
    {
        return passengerId;
    };
    this.setPassengerId = function (arg)
    {
        passengerId = arg;
        return this;
    };

//    this.getStatus = function ()
//    {
//        return status;
//    };
//    this.setStatus = function (arg)
//    {
//        status = arg;
//        return this;
//    };

    this.getSupplierCode = function ()
    {
        return supplierCode;
    };
    this.setSupplierCode = function (arg)
    {
        supplierCode = arg;
        return this;
    };

    this.getSupplierRecordLocator = function ()
    {
        return supplierRecordLocator;
    };
    this.setSupplierRecordLocator = function (arg)
    {
        supplierRecordLocator = arg;
        return this;
    };

};

SKYSALES.BOOKING.BookingComponentCharge = function ()
{
    var chargeAmount;
    var chargeCode;
    var chargeDetail;
    var chargeNumber;
    var chargeType;
    var collectType;
    var currencyCode;
    var foreignAmount;
    var foreignCurrencyCode;
    var ticketCode;

    this.getChargeAmount = function ()
    {
        return chargeAmount;
    };
    this.setChargeAmount = function (arg)
    {
        chargeAmount = arg;
        return this;
    };

    this.getChargeCode = function ()
    {
        return chargeCode;
    };
    this.setChargeCode = function (arg)
    {
        chargeCode = arg;
        return this;
    };

    this.getChargeDetail = function ()
    {
        return chargeDetail;
    };
    this.setChargeDetail = function (arg)
    {
        chargeDetail = arg;
        return this;
    };

    this.getChargeNumber = function ()
    {
        return chargeNumber;
    };
    this.setChargeNumber = function (arg)
    {
        chargeNumber = arg;
        return this;
    };

    this.getChargeType = function ()
    {
        return chargeType;
    };
    this.setChargeType = function (arg)
    {
        chargeType = arg;
        return this;
    };

    this.getCollectType = function ()
    {
        return collectType;
    };
    this.setCollectType = function (arg)
    {
        collectType = arg;
        return this;
    };

    this.getCurrencyCode = function ()
    {
        return currencyCode;
    };
    this.setCurrencyCode = function (arg)
    {
        currencyCode = arg;
        return this;
    };

    this.getForeignAmount = function ()
    {
        return foreignAmount;
    };
    this.setForeignAmount = function (arg)
    {
        foreignAmount = arg;
        return this;
    };

    this.getForeignCurrencyCode = function ()
    {
        return foreignCurrencyCode;
    };
    this.setForeignCurrencyCode = function (arg)
    {
        foreignCurrencyCode = arg;
        return this;
    };

    this.getTicketCode = function ()
    {
        return ticketCode;
    };
    this.setTicketCode = function (arg)
    {
        ticketCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.BookingContact = function ()
{
    var addressLine1;
    var addressLine2;
    var addressLine3;
    var city;
    var companyName;
    var countryCode;
    var cultureCode;
    var customerNumber;
    var distributionOption;
    var emailAddress;
    var fax;
    var homePhone;
    var name;
    var notificationPreference;
    var otherPhone;
    var postalCode;
    var provinceState;
    var sourceOrganization;
    var typeCode;
    var workPhone;
    
    this.getAddressLine1 = function ()
    {
        return addressLine1;
    };
    this.setAddressLine1 = function (arg)
    {
        addressLine1 = arg;
        return this;
    };

    this.getAddressLine2 = function ()
    {
        return addressLine2;
    };
    this.setAddressLine2 = function (arg)
    {
        addressLine2 = arg;
        return this;
    };

    this.getAddressLine3 = function ()
    {
        return addressLine3;
    };
    this.setAddressLine3 = function (arg)
    {
        addressLine3 = arg;
        return this;
    };

    this.getCity = function ()
    {
        return city;
    };
    this.setCity = function (arg)
    {
        city = arg;
        return this;
    };

    this.getCompanyName = function ()
    {
        return companyName;
    };
    this.setCompanyName = function (arg)
    {
        companyName = arg;
        return this;
    };

    this.getCountryCode = function ()
    {
        return countryCode;
    };
    this.setCountryCode = function (arg)
    {
        countryCode = arg;
        return this;
    };

    this.getCultureCode = function ()
    {
        return cultureCode;
    };
    this.setCultureCode = function (arg)
    {
        cultureCode = arg;
        return this;
    };

    this.getCustomerNumber = function ()
    {
        return customerNumber;
    };
    this.setCustomerNumber = function (arg)
    {
        customerNumber = arg;
        return this;
    };

    this.getDistributionOption = function ()
    {
        return distributionOption;
    };
    this.setDistributionOption = function (arg)
    {
        distributionOption = arg;
        return this;
    };

    this.getEmailAddress = function ()
    {
        return emailAddress;
    };
    this.setEmailAddress = function (arg)
    {
        emailAddress = arg;
        return this;
    };

    this.getFax = function ()
    {
        return fax;
    };
    this.setFax = function (arg)
    {
        fax = arg;
        return this;
    };

    this.getHomePhone = function ()
    {
        return homePhone;
    };
    this.setHomePhone = function (arg)
    {
        homePhone = arg;
        return this;
    };

    this.getName = function ()
    {
        return name;
    };
    this.setName = function (arg)
    {
        name = arg;
        return this;
    };

    this.getNotificationPreference = function ()
    {
        return notificationPreference;
    };
    this.setNotificationPreference = function (arg)
    {
        notificationPreference = arg;
        return this;
    };

    this.getOtherPhone = function ()
    {
        return otherPhone;
    };
    this.setOtherPhone = function (arg)
    {
        otherPhone = arg;
        return this;
    };

    this.getPostalCode = function ()
    {
        return postalCode;
    };
    this.setPostalCode = function (arg)
    {
        postalCode = arg;
        return this;
    };

    this.getProvinceState = function ()
    {
        return provinceState;
    };
    this.setProvinceState = function (arg)
    {
        provinceState = arg;
        return this;
    };

    this.getSourceOrganization = function ()
    {
        return sourceOrganization;
    };
    this.setSourceOrganization = function (arg)
    {
        sourceOrganization = arg;
        return this;
    };

    this.getTypeCode = function ()
    {
        return typeCode;
    };
    this.setTypeCode = function (arg)
    {
        typeCode = arg;
        return this;
    };

    this.getWorkPhone = function ()
    {
        return workPhone;
    };
    this.setWorkPhone = function (arg)
    {
        workPhone = arg;
        return this;
    };

};

SKYSALES.BOOKING.BookingInfo = function (bookingInfoJson)
{
    var bookingInfoProperty = null;
    for (bookingInfoProperty in bookingInfoJson)
    {
        if (typeof(bookingInfoJson[bookingInfoProperty]) === "string")
        {
            this[bookingInfoProperty] = bookingInfoJson[bookingInfoProperty];
        }
    }

    var bookingStatus;
    var bookingType;
    var changeAllowed;
    var channelType;
    var createdDate;
    var expiredDate;
    var lockStatus;
    var priceStatus;
    var profileStatus;

    this.getBookingStatus = function ()
    {
        return bookingStatus;
    };
    this.setBookingStatus = function (arg)
    {
        bookingStatus = arg;
        return this;
    };

    this.getBookingType = function ()
    {
        return bookingType;
    };
    this.setBookingType = function (arg)
    {
        bookingType = arg;
        return this;
    };

    this.getChangeAllowed = function ()
    {
        return changeAllowed;
    };
    this.setChangeAllowed = function (arg)
    {
        changeAllowed = arg;
        return this;
    };

    this.getChannelType = function ()
    {
        return channelType;
    };
    this.setChannelType = function (arg)
    {
        channelType = arg;
        return this;
    };

    this.getCreatedDate = function ()
    {
        return createdDate;
    };
    this.setCreatedDate = function (arg)
    {
        createdDate = arg;
        return this;
    };

    this.getExpiredDate = function ()
    {
        return expiredDate;
    };
    this.setExpiredDate = function (arg)
    {
        expiredDate = arg;
        return this;
    };

    this.getLockStatus = function ()
    {
        return lockStatus;
    };
    this.setLockStatus = function (arg)
    {
        lockStatus = arg;
        return this;
    };

    this.getPriceStatus = function ()
    {
        return priceStatus;
    };
    this.setPriceStatus = function (arg)
    {
        priceStatus = arg;
        return this;
    };

    this.getProfileStatus = function ()
    {
        return profileStatus;
    };
    this.setProfileStatus = function (arg)
    {
        profileStatus = arg;
        return this;
    };

};

SKYSALES.BOOKING.Journey = function ()
{
    var notForGeneralUse;
    var segments;
    var arrivalStation;
    var departureDate;
    var departureStation;
    var journeyType;
    var salesDate;
    var isAPaxCheckedIn;
    var isStandby;
    
    this.getNotForGeneralUse = function ()
    {
        return notForGeneralUse;
    };
    this.setNotForGeneralUse = function (arg)
    {
        notForGeneralUse = arg;
        return this;
    };

    this.getSegments = function ()
    {
        return segments;
    };
    this.setSegments = function (arg)
    {
        segments = arg;
        return this;
    };

    this.getArrivalStation = function ()
    {
        return arrivalStation;
    };
    this.setArrivalStation = function (arg)
    {
        arrivalStation = arg;
        return this;
    };

    this.getDepartureDate = function ()
    {
        return departureDate;
    };
    this.setDepartureDate = function (arg)
    {
        departureDate = arg;
        return this;
    };

    this.getDepartureStation = function ()
    {
        return departureStation;
    };
    this.setDepartureStation = function (arg)
    {
        departureStation = arg;
        return this;
    };

    this.getJourneyType = function ()
    {
        return journeyType;
    };
    this.setJourneyType = function (arg)
    {
        journeyType = arg;
        return this;
    };

    this.getSalesDate = function ()
    {
        return salesDate;
    };
    this.setSalesDate = function (arg)
    {
        salesDate = arg;
        return this;
    };

    this.getIsAPaxCheckedIn = function ()
    {
        return isAPaxCheckedIn;
    };
    this.setIsAPaxCheckedIn = function (arg)
    {
        isAPaxCheckedIn = arg;
        return this;
    };

    this.getIsStandby = function ()
    {
        return isStandby;
    };
    this.setIsStandby = function (arg)
    {
        isStandby = arg;
        return this;
    };

};

SKYSALES.BOOKING.Segment = function ()
{
    var arrivalStation;
    var cabinOfService;
    var changeReasonCode;
    var departureStation;
    var fares;
    var flightDesignator;
    var classOfService;
    var classStatus;
    var classType;
    var fareClassOfService;
    var legs;
    var numberOfStops;
    var originalClassOfService;
    var paxBags;
    var paxSeats;
    var paxSegments;
    var paxSSRs;
    var paxTicket;
    var utcArrvDateTime;
    var utcDeptDateTime;
    var xrefClassOfService;
    var international;
    var isAllPaxCheckedIn;
    var isAPaxCheckedIn;
    var isChangeOfGauge;
    var isConfirming;
    var isStandby;
    var isUpgraded;
    var paxTickets;
    var priorityCode;
    var segmentType;
    var sta;
    var std;
    var xrefFlightDesignator;

    this.getArrivalStation = function ()
    {
        return arrivalStation;
    };
    this.setArrivalStation = function (arg)
    {
        arrivalStation = arg;
        return this;
    };

    this.getCabinOfService = function ()
    {
        return cabinOfService;
    };
    this.setCabinOfService = function (arg)
    {
        cabinOfService = arg;
        return this;
    };

    this.getChangeReasonCode = function ()
    {
        return changeReasonCode;
    };
    this.setChangeReasonCode = function (arg)
    {
        changeReasonCode = arg;
        return this;
    };

    this.getDepartureStation = function ()
    {
        return departureStation;
    };
    this.setDepartureStation = function (arg)
    {
        departureStation = arg;
        return this;
    };

    this.getFares = function ()
    {
        return fares;
    };
    this.setFares = function (arg)
    {
        fares = arg;
        return this;
    };

    this.getFlightDesignator = function ()
    {
        return flightDesignator;
    };
    this.setFlightDesignator = function (arg)
    {
        flightDesignator = arg;
        return this;
    };

    this.getClassOfService = function ()
    {
        return classOfService;
    };
    this.setClassOfService = function (arg)
    {
        classOfService = arg;
        return this;
    };

    this.getClassStatus = function ()
    {
        return classStatus;
    };
    this.setClassStatus = function (arg)
    {
        classStatus = arg;
        return this;
    };

    this.getClassType = function ()
    {
        return classType;
    };
    this.setClassType = function (arg)
    {
        classType = arg;
        return this;
    };

    this.getFareClassOfService = function ()
    {
        return fareClassOfService;
    };
    this.setFareClassOfService = function (arg)
    {
        fareClassOfService = arg;
        return this;
    };

    this.getLegs = function ()
    {
        return legs;
    };
    this.setLegs = function (arg)
    {
        legs = arg;
        return this;
    };

    this.getNumberOfStops = function ()
    {
        return numberOfStops;
    };
    this.setNumberOfStops = function (arg)
    {
        numberOfStops = arg;
        return this;
    };

    this.getOriginalClassOfService = function ()
    {
        return originalClassOfService;
    };
    this.setOriginalClassOfService = function (arg)
    {
        originalClassOfService = arg;
        return this;
    };

    this.getPaxBags = function ()
    {
        return paxBags;
    };
    this.setPaxBags = function (arg)
    {
        paxBags = arg;
        return this;
    };

    this.getPaxSeats = function ()
    {
        return paxSeats;
    };
    this.setPaxSeats = function (arg)
    {
        paxSeats = arg;
        return this;
    };

    this.getPaxSegments = function ()
    {
        return paxSegments;
    };
    this.setPaxSegments = function (arg)
    {
        paxSegments = arg;
        return this;
    };

    this.getPaxSSRs = function ()
    {
        return paxSSRs;
    };
    this.setPaxSSRs = function (arg)
    {
        paxSSRs = arg;
        return this;
    };

    this.getPaxTicket = function ()
    {
        return paxTicket;
    };
    this.setPaxTicket = function (arg)
    {
        paxTicket = arg;
        return this;
    };

    this.getUtcArrvDateTime = function ()
    {
        return utcArrvDateTime;
    };
    this.setUtcArrvDateTime = function (arg)
    {
        utcArrvDateTime = arg;
        return this;
    };

    this.getUtcDeptDateTime = function ()
    {
        return utcDeptDateTime;
    };
    this.setUtcDeptDateTime = function (arg)
    {
        utcDeptDateTime = arg;
        return this;
    };

    this.getXrefClassOfService = function ()
    {
        return xrefClassOfService;
    };
    this.setXrefClassOfService = function (arg)
    {
        xrefClassOfService = arg;
        return this;
    };

    this.getInternational = function ()
    {
        return international;
    };
    this.setInternational = function (arg)
    {
        international = arg;
        return this;
    };

    this.getIsAllPaxCheckedIn = function ()
    {
        return isAllPaxCheckedIn;
    };
    this.setIsAllPaxCheckedIn = function (arg)
    {
        isAllPaxCheckedIn = arg;
        return this;
    };

    this.getIsAPaxCheckedIn = function ()
    {
        return isAPaxCheckedIn;
    };
    this.setIsAPaxCheckedIn = function (arg)
    {
        isAPaxCheckedIn = arg;
        return this;
    };

    this.getIsChangeOfGauge = function ()
    {
        return isChangeOfGauge;
    };
    this.setIsChangeOfGauge = function (arg)
    {
        isChangeOfGauge = arg;
        return this;
    };

    this.getIsConfirming = function ()
    {
        return isConfirming;
    };
    this.setIsConfirming = function (arg)
    {
        isConfirming = arg;
        return this;
    };

    this.getIsStandby = function ()
    {
        return isStandby;
    };
    this.setIsStandby = function (arg)
    {
        isStandby = arg;
        return this;
    };

    this.getIsUpgraded = function ()
    {
        return isUpgraded;
    };
    this.setIsUpgraded = function (arg)
    {
        isUpgraded = arg;
        return this;
    };

    this.getPaxTickets = function ()
    {
        return paxTickets;
    };
    this.setPaxTickets = function (arg)
    {
        paxTickets = arg;
        return this;
    };

    this.getPriorityCode = function ()
    {
        return priorityCode;
    };
    this.setPriorityCode = function (arg)
    {
        priorityCode = arg;
        return this;
    };

    this.getSegmentType = function ()
    {
        return segmentType;
    };
    this.setSegmentType = function (arg)
    {
        segmentType = arg;
        return this;
    };

    this.getSta = function ()
    {
        return sta;
    };
    this.setSta = function (arg)
    {
        sta = arg;
        return this;
    };

    this.getStd = function ()
    {
        return std;
    };
    this.setStd = function (arg)
    {
        std = arg;
        return this;
    };

    this.getXrefFlightDesignator = function ()
    {
        return xrefFlightDesignator;
    };
    this.setXrefFlightDesignator = function (arg)
    {
        xrefFlightDesignator = arg;
        return this;
    };

};

SKYSALES.BOOKING.Fare = function ()
{
    var cabinOfService;
    var carrierCode;
    var classOfService;
    var classType;
    var fareApplicationType;
    var fareBasisCode;
    var fareClassOfService;
    var fareSequence;
    var fareStatus;
    var isAllotmentMarketFare;
    var originalClassOfService;
    var paxFares;
    var productClass;
    var ruleNumber;
    var ruleTariff;
    var xrefClassOfService;
    
    this.getCabinOfService = function ()
    {
        return cabinOfService;
    };
    this.setCabinOfService = function (arg)
    {
        cabinOfService = arg;
        return this;
    };

    this.getCarrierCode = function ()
    {
        return carrierCode;
    };
    this.setCarrierCode = function (arg)
    {
        carrierCode = arg;
        return this;
    };

    this.getClassOfService = function ()
    {
        return classOfService;
    };
    this.setClassOfService = function (arg)
    {
        classOfService = arg;
        return this;
    };

    this.getClassType = function ()
    {
        return classType;
    };
    this.setClassType = function (arg)
    {
        classType = arg;
        return this;
    };

    this.getFareApplicationType = function ()
    {
        return fareApplicationType;
    };
    this.setFareApplicationType = function (arg)
    {
        fareApplicationType = arg;
        return this;
    };

    this.getFareBasisCode = function ()
    {
        return fareBasisCode;
    };
    this.setFareBasisCode = function (arg)
    {
        fareBasisCode = arg;
        return this;
    };

    this.getFareClassOfService = function ()
    {
        return fareClassOfService;
    };
    this.setFareClassOfService = function (arg)
    {
        fareClassOfService = arg;
        return this;
    };

    this.getFareSequence = function ()
    {
        return fareSequence;
    };
    this.setFareSequence = function (arg)
    {
        fareSequence = arg;
        return this;
    };

    this.getFareStatus = function ()
    {
        return fareStatus;
    };
    this.setFareStatus = function (arg)
    {
        fareStatus = arg;
        return this;
    };

    this.getIsAllotmentMarketFare = function ()
    {
        return isAllotmentMarketFare;
    };
    this.setIsAllotmentMarketFare = function (arg)
    {
        isAllotmentMarketFare = arg;
        return this;
    };

    this.getOriginalClassOfService = function ()
    {
        return originalClassOfService;
    };
    this.setOriginalClassOfService = function (arg)
    {
        originalClassOfService = arg;
        return this;
    };

    this.getPaxFares = function ()
    {
        return paxFares;
    };
    this.setPaxFares = function (arg)
    {
        paxFares = arg;
        return this;
    };

    this.getProductClass = function ()
    {
        return productClass;
    };
    this.setProductClass = function (arg)
    {
        productClass = arg;
        return this;
    };

    this.getRuleNumber = function ()
    {
        return ruleNumber;
    };
    this.setRuleNumber = function (arg)
    {
        ruleNumber = arg;
        return this;
    };

    this.getRuleTariff = function ()
    {
        return ruleTariff;
    };
    this.setRuleTariff = function (arg)
    {
        ruleTariff = arg;
        return this;
    };

    this.getXrefClassOfService = function ()
    {
        return xrefClassOfService;
    };
    this.setXrefClassOfService = function (arg)
    {
        xrefClassOfService = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaxFare = function ()
{
    var fareDiscountCode;
    var paxDiscountCode;
    var paxType;
    var serviceCharges;

    this.getFareDiscountCode = function ()
    {
        return fareDiscountCode;
    };
    this.setFareDiscountCode = function (arg)
    {
        fareDiscountCode = arg;
        return this;
    };

    this.getPaxDiscountCode = function ()
    {
        return paxDiscountCode;
    };
    this.setPaxDiscountCode = function (arg)
    {
        paxDiscountCode = arg;
        return this;
    };

    this.getPaxType = function ()
    {
        return paxType;
    };
    this.setPaxType = function (arg)
    {
        paxType = arg;
        return this;
    };

    this.getServiceCharges = function ()
    {
        return serviceCharges;
    };
    this.setServiceCharges = function (arg)
    {
        serviceCharges = arg;
        return this;
    };
    
};

SKYSALES.BOOKING.ServiceCharge = function ()
{
    var amount;
    var chargeCode;
    var chargeDetail;
    var chargeType;
    var collectType;
    var currencyCode;
    var foreignAmount;
    var foreignCurrencyCode;
    var ticketCode;

    this.getAmount = function ()
    {
        return amount;
    };
    this.setAmount = function (arg)
    {
        amount = arg;
        return this;
    };

    this.getChargeCode = function ()
    {
        return chargeCode;
    };
    this.setChargeCode = function (arg)
    {
        chargeCode = arg;
        return this;
    };

    this.getChargeDetail = function ()
    {
        return chargeDetail;
    };
    this.setChargeDetail = function (arg)
    {
        chargeDetail = arg;
        return this;
    };

    this.getChargeType = function ()
    {
        return chargeType;
    };
    this.setChargeType = function (arg)
    {
        chargeType = arg;
        return this;
    };

    this.getCollectType = function ()
    {
        return collectType;
    };
    this.setCollectType = function (arg)
    {
        collectType = arg;
        return this;
    };

    this.getCurrencyCode = function ()
    {
        return currencyCode;
    };
    this.setCurrencyCode = function (arg)
    {
        currencyCode = arg;
        return this;
    };

    this.getForeignAmount = function ()
    {
        return foreignAmount;
    };
    this.setForeignAmount = function (arg)
    {
        foreignAmount = arg;
        return this;
    };

    this.getForeignCurrencyCode = function ()
    {
        return foreignCurrencyCode;
    };
    this.setForeignCurrencyCode = function (arg)
    {
        foreignCurrencyCode = arg;
        return this;
    };

    this.getTicketCode = function ()
    {
        return ticketCode;
    };
    this.setTicketCode = function (arg)
    {
        ticketCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.FlightDesignator = function ()
{
    var carrierCode;
    var flightNumber;
    var opSuffix;

    this.getCarrierCode = function ()
    {
        return carrierCode;
    };
    this.setCarrierCode = function (arg)
    {
        carrierCode = arg;
        return this;
    };

    this.getFlightNumber = function ()
    {
        return flightNumber;
    };
    this.setFlightNumber = function (arg)
    {
        flightNumber = arg;
        return this;
    };

    this.getOpSuffix = function ()
    {
        return opSuffix;
    };
    this.setOpSuffix = function (arg)
    {
        opSuffix = arg;
        return this;
    };
};

SKYSALES.BOOKING.Leg = function ()
{
    var arrivalStation;
    var departureStation;
    var flightDesignator;
    var utcArrvDateTime;
    var utcDeptDateTime;
    var isAvailableForBooking;
    var legInfo;
    var operationsInfo;
    var sta;
    var std;

    this.getArrivalStation = function ()
    {
        return arrivalStation;
    };
    this.setArrivalStation = function (arg)
    {
        arrivalStation = arg;
        return this;
    };

    this.getDepartureStation = function ()
    {
        return departureStation;
    };
    this.setDepartureStation = function (arg)
    {
        departureStation = arg;
        return this;
    };

    this.getFlightDesignator = function ()
    {
        return flightDesignator;
    };
    this.setFlightDesignator = function (arg)
    {
        flightDesignator = arg;
        return this;
    };

    this.getUtcArrvDateTime = function ()
    {
        return utcArrvDateTime;
    };
    this.setUtcArrvDateTime = function (arg)
    {
        utcArrvDateTime = arg;
        return this;
    };

    this.getUtcDeptDateTime = function ()
    {
        return utcDeptDateTime;
    };
    this.setUtcDeptDateTime = function (arg)
    {
        utcDeptDateTime = arg;
        return this;
    };

    this.getIsAvailableForBooking = function ()
    {
        return isAvailableForBooking;
    };
    this.setIsAvailableForBooking = function (arg)
    {
        isAvailableForBooking = arg;
        return this;
    };

    this.getLegInfo = function ()
    {
        return legInfo;
    };
    this.setLegInfo = function (arg)
    {
        legInfo = arg;
        return this;
    };

    this.getOperationsInfo = function ()
    {
        return operationsInfo;
    };
    this.setOperationsInfo = function (arg)
    {
        operationsInfo = arg;
        return this;
    };

    this.getSta = function ()
    {
        return sta;
    };
    this.setSta = function (arg)
    {
        sta = arg;
        return this;
    };

    this.getStd = function ()
    {
        return std;
    };
    this.setStd = function (arg)
    {
        std = arg;
        return this;
    };
};

SKYSALES.BOOKING.LegInfo = function ()
{
    var adjustedCapacity;
    var aircraftType;
    var aircraftTypeSuffix;
    var arrivalTerminal;
    var arrvLTV;
    var backMoveDays;
    var capacity;
    var codeShareIndicator;
    var departureTerminal;
    var deptLTV;
    var eTicket;
    var flifoUpdated;
    var irop;
    var legNests;
    var legSSRs;
    var lid;
    var onTime;
    var operatedByText;
    var operatingCarrier;
    var operatingFlightNumber;
    var operatingOpSuffix;
    var outMoveDays;
    var paxSTA;
    var paxSTD;
    var prbCode;
    var scheduleServiceType;
    var sold;
    var status;
    var subjectToGovtApproval;

    this.getAdjustedCapacity = function ()
    {
        return adjustedCapacity;
    };
    this.setAdjustedCapacity = function (arg)
    {
        adjustedCapacity = arg;
        return this;
    };

    this.getAircraftType = function ()
    {
        return aircraftType;
    };
    this.setAircraftType = function (arg)
    {
        aircraftType = arg;
        return this;
    };

    this.getAircraftTypeSuffix = function ()
    {
        return aircraftTypeSuffix;
    };
    this.setAircraftTypeSuffix = function (arg)
    {
        aircraftTypeSuffix = arg;
        return this;
    };

    this.getArrivalTerminal = function ()
    {
        return arrivalTerminal;
    };
    this.setArrivalTerminal = function (arg)
    {
        arrivalTerminal = arg;
        return this;
    };

    this.getArrvLTV = function ()
    {
        return arrvLTV;
    };
    this.setArrvLTV = function (arg)
    {
        arrvLTV = arg;
        return this;
    };

    this.getBackMoveDays = function ()
    {
        return backMoveDays;
    };
    this.setBackMoveDays = function (arg)
    {
        backMoveDays = arg;
        return this;
    };

    this.getCapacity = function ()
    {
        return capacity;
    };
    this.setCapacity = function (arg)
    {
        capacity = arg;
        return this;
    };

    this.getCodeShareIndicator = function ()
    {
        return codeShareIndicator;
    };
    this.setCodeShareIndicator = function (arg)
    {
        codeShareIndicator = arg;
        return this;
    };

    this.getDepartureTerminal = function ()
    {
        return departureTerminal;
    };
    this.setDepartureTerminal = function (arg)
    {
        departureTerminal = arg;
        return this;
    };

    this.getDeptLTV = function ()
    {
        return deptLTV;
    };
    this.setDeptLTV = function (arg)
    {
        deptLTV = arg;
        return this;
    };

    this.getETicket = function ()
    {
        return eTicket;
    };
    this.setETicket = function (arg)
    {
        eTicket = arg;
        return this;
    };

    this.getFlifoUpdated = function ()
    {
        return flifoUpdated;
    };
    this.setFlifoUpdated = function (arg)
    {
        flifoUpdated = arg;
        return this;
    };

    this.getIrop = function ()
    {
        return irop;
    };
    this.setIrop = function (arg)
    {
        irop = arg;
        return this;
    };

    this.getLegNests = function ()
    {
        return legNests;
    };
    this.setLegNests = function (arg)
    {
        legNests = arg;
        return this;
    };

    this.getLegSSRs = function ()
    {
        return legSSRs;
    };
    this.setLegSSRs = function (arg)
    {
        legSSRs = arg;
        return this;
    };

    this.getLid = function ()
    {
        return lid;
    };
    this.setLid = function (arg)
    {
        lid = arg;
        return this;
    };

    this.getOnTime = function ()
    {
        return onTime;
    };
    this.setOnTime = function (arg)
    {
        onTime = arg;
        return this;
    };

    this.getOperatedByText = function ()
    {
        return operatedByText;
    };
    this.setOperatedByText = function (arg)
    {
        operatedByText = arg;
        return this;
    };

    this.getOperatingCarrier = function ()
    {
        return operatingCarrier;
    };
    this.setOperatingCarrier = function (arg)
    {
        operatingCarrier = arg;
        return this;
    };

    this.getOperatingFlightNumber = function ()
    {
        return operatingFlightNumber;
    };
    this.setOperatingFlightNumber = function (arg)
    {
        operatingFlightNumber = arg;
        return this;
    };

    this.getOperatingOpSuffix = function ()
    {
        return operatingOpSuffix;
    };
    this.setOperatingOpSuffix = function (arg)
    {
        operatingOpSuffix = arg;
        return this;
    };

    this.getOutMoveDays = function ()
    {
        return outMoveDays;
    };
    this.setOutMoveDays = function (arg)
    {
        outMoveDays = arg;
        return this;
    };

    this.getPaxSTA = function ()
    {
        return paxSTA;
    };
    this.setPaxSTA = function (arg)
    {
        paxSTA = arg;
        return this;
    };

    this.getPaxSTD = function ()
    {
        return paxSTD;
    };
    this.setPaxSTD = function (arg)
    {
        paxSTD = arg;
        return this;
    };

    this.getPrbCode = function ()
    {
        return prbCode;
    };
    this.setPrbCode = function (arg)
    {
        prbCode = arg;
        return this;
    };

    this.getScheduleServiceType = function ()
    {
        return scheduleServiceType;
    };
    this.setScheduleServiceType = function (arg)
    {
        scheduleServiceType = arg;
        return this;
    };

    this.getSold = function ()
    {
        return sold;
    };
    this.setSold = function (arg)
    {
        sold = arg;
        return this;
    };

    this.getStatus = function ()
    {
        return status;
    };
    this.setStatus = function (arg)
    {
        status = arg;
        return this;
    };

    this.getSubjectToGovtApproval = function ()
    {
        return subjectToGovtApproval;
    };
    this.setSubjectToGovtApproval = function (arg)
    {
        subjectToGovtApproval = arg;
        return this;
    };
};

SKYSALES.BOOKING.LegNest = function ()
{
    var adjustedCapacity;
    var cabinOfService;
    var classNest;
    var legClasses;
    var lid;
    var nestType;

    this.getAdjustedCapacity = function ()
    {
        return adjustedCapacity;
    };
    this.setAdjustedCapacity = function (arg)
    {
        adjustedCapacity = arg;
        return this;
    };

    this.getCabinOfService = function ()
    {
        return cabinOfService;
    };
    this.setCabinOfService = function (arg)
    {
        cabinOfService = arg;
        return this;
    };

    this.getClassNest = function ()
    {
        return classNest;
    };
    this.setClassNest = function (arg)
    {
        classNest = arg;
        return this;
    };

    this.getLegClasses = function ()
    {
        return legClasses;
    };
    this.setLegClasses = function (arg)
    {
        legClasses = arg;
        return this;
    };

    this.getLid = function ()
    {
        return lid;
    };
    this.setLid = function (arg)
    {
        lid = arg;
        return this;
    };

    this.getNestType = function ()
    {
        return nestType;
    };
    this.setNestType = function (arg)
    {
        nestType = arg;
        return this;
    };
};

SKYSALES.BOOKING.LegClass = function ()
{
    var classAllotted;
    var classAU;
    var classNest;
    var classOfService;
    var classRank;
    var classType;
    var cnxSold;
    var latestAdvRes;
    var nonStopSold;
    var status;
    var thruSold;
    
    this.getClassAllotted = function ()
    {
        return classAllotted;
    };
    this.setClassAllotted = function (arg)
    {
        classAllotted = arg;
        return this;
    };

    this.getClassAU = function ()
    {
        return classAU;
    };
    this.setClassAU = function (arg)
    {
        classAU = arg;
        return this;
    };

    this.getClassNest = function ()
    {
        return classNest;
    };
    this.setClassNest = function (arg)
    {
        classNest = arg;
        return this;
    };

    this.getClassOfService = function ()
    {
        return classOfService;
    };
    this.setClassOfService = function (arg)
    {
        classOfService = arg;
        return this;
    };

    this.getClassRank = function ()
    {
        return classRank;
    };
    this.setClassRank = function (arg)
    {
        classRank = arg;
        return this;
    };

    this.getClassType = function ()
    {
        return classType;
    };
    this.setClassType = function (arg)
    {
        classType = arg;
        return this;
    };

    this.getCnxSold = function ()
    {
        return cnxSold;
    };
    this.setCnxSold = function (arg)
    {
        cnxSold = arg;
        return this;
    };

    this.getLatestAdvRes = function ()
    {
        return latestAdvRes;
    };
    this.setLatestAdvRes = function (arg)
    {
        latestAdvRes = arg;
        return this;
    };

    this.getNonStopSold = function ()
    {
        return nonStopSold;
    };
    this.setNonStopSold = function (arg)
    {
        nonStopSold = arg;
        return this;
    };

    this.getStatus = function ()
    {
        return status;
    };
    this.setStatus = function (arg)
    {
        status = arg;
        return this;
    };

    this.getThruSold = function ()
    {
        return thruSold;
    };
    this.setThruSold = function (arg)
    {
        thruSold = arg;
        return this;
    };
};

SKYSALES.BOOKING.LegSsr = function ()
{
    var ssrLid;
    var ssrNestCode;
    var ssrSold;

    this.getSsrLid = function ()
    {
        return ssrLid;
    };
    this.setSsrLid = function (arg)
    {
        ssrLid = arg;
        return this;
    };

    this.getSsrNestCode = function ()
    {
        return ssrNestCode;
    };
    this.setSsrNestCode = function (arg)
    {
        ssrNestCode = arg;
        return this;
    };

    this.getSsrSold = function ()
    {
        return ssrSold;
    };
    this.setSsrSold = function (arg)
    {
        ssrSold = arg;
        return this;
    };
};

SKYSALES.BOOKING.OperationsInfo = function ()
{
    var actualArrivalGate;
    var actualDepartureGate;
    var actualOffBlockTime;
    var actualOnBlockTime;
    var actualTouchDownTime;
    var airborneTime;
    var arrivalGate;
    var arrivalNote;
    var arrivalStatus;
    var baggageClaim;
    var departureGate;
    var departureNote;
    var departureStatus;
    var eta;
    var etd;
    var sta;
    var std;
    var tailNumber;

    this.getActualArrivalGate = function ()
    {
        return actualArrivalGate;
    };
    this.setActualArrivalGate = function (arg)
    {
        actualArrivalGate = arg;
        return this;
    };

    this.getActualDepartureGate = function ()
    {
        return actualDepartureGate;
    };
    this.setActualDepartureGate = function (arg)
    {
        actualDepartureGate = arg;
        return this;
    };

    this.getActualOffBlockTime = function ()
    {
        return actualOffBlockTime;
    };
    this.setActualOffBlockTime = function (arg)
    {
        actualOffBlockTime = arg;
        return this;
    };

    this.getActualOnBlockTime = function ()
    {
        return actualOnBlockTime;
    };
    this.setActualOnBlockTime = function (arg)
    {
        actualOnBlockTime = arg;
        return this;
    };

    this.getActualTouchDownTime = function ()
    {
        return actualTouchDownTime;
    };
    this.setActualTouchDownTime = function (arg)
    {
        actualTouchDownTime = arg;
        return this;
    };

    this.getAirborneTime = function ()
    {
        return airborneTime;
    };
    this.setAirborneTime = function (arg)
    {
        airborneTime = arg;
        return this;
    };

    this.getArrivalGate = function ()
    {
        return arrivalGate;
    };
    this.setArrivalGate = function (arg)
    {
        arrivalGate = arg;
        return this;
    };

    this.getArrivalNote = function ()
    {
        return arrivalNote;
    };
    this.setArrivalNote = function (arg)
    {
        arrivalNote = arg;
        return this;
    };

    this.getArrivalStatus = function ()
    {
        return arrivalStatus;
    };
    this.setArrivalStatus = function (arg)
    {
        arrivalStatus = arg;
        return this;
    };

    this.getBaggageClaim = function ()
    {
        return baggageClaim;
    };
    this.setBaggageClaim = function (arg)
    {
        baggageClaim = arg;
        return this;
    };

    this.getDepartureGate = function ()
    {
        return departureGate;
    };
    this.setDepartureGate = function (arg)
    {
        departureGate = arg;
        return this;
    };

    this.getDepartureNote = function ()
    {
        return departureNote;
    };
    this.setDepartureNote = function (arg)
    {
        departureNote = arg;
        return this;
    };

    this.getDepartureStatus = function ()
    {
        return departureStatus;
    };
    this.setDepartureStatus = function (arg)
    {
        departureStatus = arg;
        return this;
    };

    this.getEta = function ()
    {
        return eta;
    };
    this.setEta = function (arg)
    {
        eta = arg;
        return this;
    };

    this.getEtd = function ()
    {
        return etd;
    };
    this.setEtd = function (arg)
    {
        etd = arg;
        return this;
    };

    this.getSta = function ()
    {
        return sta;
    };
    this.setSta = function (arg)
    {
        sta = arg;
        return this;
    };

    this.getStd = function ()
    {
        return std;
    };
    this.setStd = function (arg)
    {
        std = arg;
        return this;
    };

    this.getTailNumber = function ()
    {
        return tailNumber;
    };
    this.setTailNumber = function (arg)
    {
        tailNumber = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaxBag = function ()
{
    var arrivalStation;
    var baggageStatus;
    var compartmentId;
    var departureStation;
    var osTag;
    var osTagDate;
    var passengerNumber;

    this.getArrivalStation = function ()
    {
        return arrivalStation;
    };
    this.setArrivalStation = function (arg)
    {
        arrivalStation = arg;
        return this;
    };

    this.getBaggageStatus = function ()
    {
        return baggageStatus;
    };
    this.setBaggageStatus = function (arg)
    {
        baggageStatus = arg;
        return this;
    };

    this.getCompartmentId = function ()
    {
        return compartmentId;
    };
    this.setCompartmentId = function (arg)
    {
        compartmentId = arg;
        return this;
    };

    this.getDepartureStation = function ()
    {
        return departureStation;
    };
    this.setDepartureStation = function (arg)
    {
        departureStation = arg;
        return this;
    };

    this.getOsTag = function ()
    {
        return osTag;
    };
    this.setOsTag = function (arg)
    {
        osTag = arg;
        return this;
    };

    this.getOsTagDate = function ()
    {
        return osTagDate;
    };
    this.setOsTagDate = function (arg)
    {
        osTagDate = arg;
        return this;
    };

    this.getPassengerNumber = function ()
    {
        return passengerNumber;
    };
    this.setPassengerNumber = function (arg)
    {
        passengerNumber = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaxSeat = function ()
{
    var arrivalStation;
    var cabinOfService;
    var column;
    var departureStation;
    var isSeatPendingRequest;
    var passengerNumber;
    var row;
    var seatPreference;

    this.getArrivalStation = function ()
    {
        return arrivalStation;
    };
    this.setArrivalStation = function (arg)
    {
        arrivalStation = arg;
        return this;
    };

    this.getCabinOfService = function ()
    {
        return cabinOfService;
    };
    this.setCabinOfService = function (arg)
    {
        cabinOfService = arg;
        return this;
    };

    this.getColumn = function ()
    {
        return column;
    };
    this.setColumn = function (arg)
    {
        column = arg;
        return this;
    };

    this.getDepartureStation = function ()
    {
        return departureStation;
    };
    this.setDepartureStation = function (arg)
    {
        departureStation = arg;
        return this;
    };

    this.getIsSeatPendingRequest = function ()
    {
        return isSeatPendingRequest;
    };
    this.setIsSeatPendingRequest = function (arg)
    {
        isSeatPendingRequest = arg;
        return this;
    };

    this.getPassengerNumber = function ()
    {
        return passengerNumber;
    };
    this.setPassengerNumber = function (arg)
    {
        passengerNumber = arg;
        return this;
    };

    this.getRow = function ()
    {
        return row;
    };
    this.setRow = function (arg)
    {
        row = arg;
        return this;
    };

    this.getSeatPreference = function ()
    {
        return seatPreference;
    };
    this.setSeatPreference = function (arg)
    {
        seatPreference = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaxSegment = function ()
{
    var boardingSequence;
    var createdDate;
    var liftStatus;
    var overBookIndicator;
    var passengerNumber;
    var pos;
    var priorityDate;
    var sourcePOS;
    var timeChanged;
    var tripType;
    var verifiedTravelDocs;

    this.getBoardingSequence = function ()
    {
        return boardingSequence;
    };
    this.setBoardingSequence = function (arg)
    {
        boardingSequence = arg;
        return this;
    };

    this.getCreatedDate = function ()
    {
        return createdDate;
    };
    this.setCreatedDate = function (arg)
    {
        createdDate = arg;
        return this;
    };

    this.getLiftStatus = function ()
    {
        return liftStatus;
    };
    this.setLiftStatus = function (arg)
    {
        liftStatus = arg;
        return this;
    };

    this.getOverBookIndicator = function ()
    {
        return overBookIndicator;
    };
    this.setOverBookIndicator = function (arg)
    {
        overBookIndicator = arg;
        return this;
    };

    this.getPassengerNumber = function ()
    {
        return passengerNumber;
    };
    this.setPassengerNumber = function (arg)
    {
        passengerNumber = arg;
        return this;
    };

    this.getPos = function ()
    {
        return pos;
    };
    this.setPos = function (arg)
    {
        pos = arg;
        return this;
    };

    this.getPriorityDate = function ()
    {
        return priorityDate;
    };
    this.setPriorityDate = function (arg)
    {
        priorityDate = arg;
        return this;
    };

    this.getSourcePOS = function ()
    {
        return sourcePOS;
    };
    this.setSourcePOS = function (arg)
    {
        sourcePOS = arg;
        return this;
    };

    this.getTimeChanged = function ()
    {
        return timeChanged;
    };
    this.setTimeChanged = function (arg)
    {
        timeChanged = arg;
        return this;
    };

    this.getTripType = function ()
    {
        return tripType;
    };
    this.setTripType = function (arg)
    {
        tripType = arg;
        return this;
    };

    this.getVerifiedTravelDocs = function ()
    {
        return verifiedTravelDocs;
    };
    this.setVerifiedTravelDocs = function (arg)
    {
        verifiedTravelDocs = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaxSsr = function ()
{
    var arrivalStation;
    var departureStation;
    var feeCode;
    var note;
    var passengerNumber;
    var ssrCode;
    var ssrDetail;
    var ssrNumber;

    this.getArrivalStation = function ()
    {
        return arrivalStation;
    };
    this.setArrivalStation = function (arg)
    {
        arrivalStation = arg;
        return this;
    };

    this.getDepartureStation = function ()
    {
        return departureStation;
    };
    this.setDepartureStation = function (arg)
    {
        departureStation = arg;
        return this;
    };

    this.getFeeCode = function ()
    {
        return feeCode;
    };
    this.setFeeCode = function (arg)
    {
        feeCode = arg;
        return this;
    };

    this.getNote = function ()
    {
        return note;
    };
    this.setNote = function (arg)
    {
        note = arg;
        return this;
    };

    this.getPassengerNumber = function ()
    {
        return passengerNumber;
    };
    this.setPassengerNumber = function (arg)
    {
        passengerNumber = arg;
        return this;
    };

    this.getSsrCode = function ()
    {
        return ssrCode;
    };
    this.setSsrCode = function (arg)
    {
        ssrCode = arg;
        return this;
    };

    this.getSsrDetail = function ()
    {
        return ssrDetail;
    };
    this.setSsrDetail = function (arg)
    {
        ssrDetail = arg;
        return this;
    };

    this.getSsrNumber = function ()
    {
        return ssrNumber;
    };
    this.setSsrNumber = function (arg)
    {
        ssrNumber = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaxTicket = function ()
{
    var infantTicketNumber;
    var passengerNumber;
    var ticketIndicator;
    var ticketNumber;
    var ticketStatus;

    this.getInfantTicketNumber = function ()
    {
        return infantTicketNumber;
    };
    this.setInfantTicketNumber = function (arg)
    {
        infantTicketNumber = arg;
        return this;
    };

    this.getPassengerNumber = function ()
    {
        return passengerNumber;
    };
    this.setPassengerNumber = function (arg)
    {
        passengerNumber = arg;
        return this;
    };

    this.getTicketIndicator = function ()
    {
        return ticketIndicator;
    };
    this.setTicketIndicator = function (arg)
    {
        ticketIndicator = arg;
        return this;
    };

    this.getTicketNumber = function ()
    {
        return ticketNumber;
    };
    this.setTicketNumber = function (arg)
    {
        ticketNumber = arg;
        return this;
    };

    this.getTicketStatus = function ()
    {
        return ticketStatus;
    };
    this.setTicketStatus = function (arg)
    {
        ticketStatus = arg;
        return this;
    };

};

SKYSALES.BOOKING.BookingHistory = function ()
{
    var createdDate;
    var historyCode;
    var pointOfSale;
    var receivedBy;
    var receivedByReference;
    var sourcePointOfSale;

    this.getCreatedDate = function ()
    {
        return createdDate;
    };
    this.setCreatedDate = function (arg)
    {
        createdDate = arg;
        return this;
    };

    this.getHistoryCode = function ()
    {
        return historyCode;
    };
    this.setHistoryCode = function (arg)
    {
        historyCode = arg;
        return this;
    };

    this.getPointOfSale = function ()
    {
        return pointOfSale;
    };
    this.setPointOfSale = function (arg)
    {
        pointOfSale = arg;
        return this;
    };

    this.getReceivedBy = function ()
    {
        return receivedBy;
    };
    this.setReceivedBy = function (arg)
    {
        receivedBy = arg;
        return this;
    };

    this.getReceivedByReference = function ()
    {
        return receivedByReference;
    };
    this.setReceivedByReference = function (arg)
    {
        receivedByReference = arg;
        return this;
    };

    this.getSourcePointOfSale = function ()
    {
        return sourcePointOfSale;
    };
    this.setSourcePointOfSale = function (arg)
    {
        sourcePointOfSale = arg;
        return this;
    };
};

SKYSALES.BOOKING.BookingHold = function (bookingHoldJson)
{
    var bookingHoldProperty = null;
    var obj = null;
    for (bookingHoldProperty in bookingHoldJson)
    {
	    if (typeof(bookingHoldJson[bookingHoldProperty]) === "string")
	    {
	        this[bookingHoldProperty] = bookingHoldJson[bookingHoldProperty];
	    }
    }

    var holdDateTime;
    
    this.getHoldDateTime = function ()
    {
        return holdDateTime;
    };
    this.setHoldDateTime = function (arg)
    {
        holdDateTime = arg;
        return this;
    };
};

SKYSALES.BOOKING.BookingSum = function (bookingSumJson)
{
    var bookingSumProperty = null;
    var obj = null;
    for (bookingSumProperty in bookingSumJson)
    {
        if (typeof(bookingSumJson[bookingSumProperty]) === "string")
        {
            this[bookingSumProperty] = bookingSumJson[bookingSumProperty];
        }
    }

    var balanceDue;
    var passiveSegmentCount;
    var segmentCount;
    var totalCost;

    this.getBalanceDue = function ()
    {
        return balanceDue;
    };
    this.setBalanceDue = function (arg)
    {
        balanceDue = arg;
        return this;
    };

    this.getPassiveSegmentCount = function ()
    {
        return passiveSegmentCount;
    };
    this.setPassiveSegmentCount = function (arg)
    {
        passiveSegmentCount = arg;
        return this;
    };

    this.getSegmentCount = function ()
    {
        return segmentCount;
    };
    this.setSegmentCount = function (arg)
    {
        segmentCount = arg;
        return this;
    };

    this.getTotalCost = function ()
    {
        return totalCost;
    };
    this.setTotalCost = function (arg)
    {
        totalCost = arg;
        return this;
    };

};

SKYSALES.BOOKING.OtherServiceInfo = function ()
{
    var osiSeverity;
    var osiType;
    var text;

    this.getOsiSeverity = function ()
    {
        return osiSeverity;
    };
    this.setOsiSeverity = function (arg)
    {
        osiSeverity = arg;
        return this;
    };

    this.getOsiType = function ()
    {
        return osiType;
    };
    this.setOsiType = function (arg)
    {
        osiType = arg;
        return this;
    };

    this.getText = function ()
    {
        return text;
    };
    this.setText = function (arg)
    {
        text = arg;
        return this;
    };

};

SKYSALES.BOOKING.Passenger = function ()
{
    var customerNumber;
    var familyNumber;
    var infant;
    var name;
    var passengerAddresses;
    var passengerBags;
    var passengerFees;
    var passengerId;
    var passengerInfo;
    var passengerNumber;
    var passengerProgram;
    var passengerTravelDocuments;
    var passengerTypeInfo;
    var paxDiscountCode;

    this.getCustomerNumber = function ()
    {
        return customerNumber;
    };
    this.setCustomerNumber = function (arg)
    {
        customerNumber = arg;
        return this;
    };

    this.getFamilyNumber = function ()
    {
        return familyNumber;
    };
    this.setFamilyNumber = function (arg)
    {
        familyNumber = arg;
        return this;
    };

    this.getInfant = function ()
    {
        return infant;
    };
    this.setInfant = function (arg)
    {
        infant = arg;
        return this;
    };

    this.getName = function ()
    {
        return name;
    };
    this.setName = function (arg)
    {
        name = arg;
        return this;
    };

    this.getPassengerAddresses = function ()
    {
        return passengerAddresses;
    };
    this.setPassengerAddresses = function (arg)
    {
        passengerAddresses = arg;
        return this;
    };

    this.getPassengerBags = function ()
    {
        return passengerBags;
    };
    this.setPassengerBags = function (arg)
    {
        passengerBags = arg;
        return this;
    };

    this.getPassengerFees = function ()
    {
        return passengerFees;
    };
    this.setPassengerFees = function (arg)
    {
        passengerFees = arg;
        return this;
    };

    this.getPassengerId = function ()
    {
        return passengerId;
    };
    this.setPassengerId = function (arg)
    {
        passengerId = arg;
        return this;
    };

    this.getPassengerInfo = function ()
    {
        return passengerInfo;
    };
    this.setPassengerInfo = function (arg)
    {
        passengerInfo = arg;
        return this;
    };

    this.getPassengerNumber = function ()
    {
        return passengerNumber;
    };
    this.setPassengerNumber = function (arg)
    {
        passengerNumber = arg;
        return this;
    };

    this.getPassengerProgram = function ()
    {
        return passengerProgram;
    };
    this.setPassengerProgram = function (arg)
    {
        passengerProgram = arg;
        return this;
    };

    this.getPassengerTravelDocuments = function ()
    {
        return passengerTravelDocuments;
    };
    this.setPassengerTravelDocuments = function (arg)
    {
        passengerTravelDocuments = arg;
        return this;
    };

    this.getPassengerTypeInfo = function ()
    {
        return passengerTypeInfo;
    };
    this.setPassengerTypeInfo = function (arg)
    {
        passengerTypeInfo = arg;
        return this;
    };

    this.getPaxDiscountCode = function ()
    {
        return paxDiscountCode;
    };
    this.setPaxDiscountCode = function (arg)
    {
        paxDiscountCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerInfant = function ()
{
    var dob;
    var gender;
    var name;
    var nationality;
    var residentCountry;

    this.getDob = function ()
    {
        return dob;
    };
    this.setDob = function (arg)
    {
        dob = arg;
        return this;
    };

    this.getGender = function ()
    {
        return gender;
    };
    this.setGender = function (arg)
    {
        gender = arg;
        return this;
    };

    this.getName = function ()
    {
        return name;
    };
    this.setName = function (arg)
    {
        name = arg;
        return this;
    };

    this.getNationality = function ()
    {
        return nationality;
    };
    this.setNationality = function (arg)
    {
        nationality = arg;
        return this;
    };

    this.getResidentCountry = function ()
    {
        return residentCountry;
    };
    this.setResidentCountry = function (arg)
    {
        residentCountry = arg;
        return this;
    };
};

SKYSALES.BOOKING.Name = function ()
{
    var firstName;
    var lastName;
    var middleName;
    var suffix;
    var title;

    this.getFirstName = function ()
    {
        return firstName;
    };
    this.setFirstName = function (arg)
    {
        firstName = arg;
        return this;
    };

    this.getLastName = function ()
    {
        return lastName;
    };
    this.setLastName = function (arg)
    {
        lastName = arg;
        return this;
    };

    this.getMiddleName = function ()
    {
        return middleName;
    };
    this.setMiddleName = function (arg)
    {
        middleName = arg;
        return this;
    };

    this.getSuffix = function ()
    {
        return suffix;
    };
    this.setSuffix = function (arg)
    {
        suffix = arg;
        return this;
    };

    this.getTitle = function ()
    {
        return title;
    };
    this.setTitle = function (arg)
    {
        title = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerAddress = function ()
{
    var addressLine1;
    var addressLine2;
    var addressLine3;
    var city;
    var companyName;
    var countryCode;
    var phone;
    var postalCode;
    var provinceState;
    var stationCode;
    var typeCode;

    this.getAddressLine1 = function ()
    {
        return addressLine1;
    };
    this.setAddressLine1 = function (arg)
    {
        addressLine1 = arg;
        return this;
    };

    this.getAddressLine2 = function ()
    {
        return addressLine2;
    };
    this.setAddressLine2 = function (arg)
    {
        addressLine2 = arg;
        return this;
    };

    this.getAddressLine3 = function ()
    {
        return addressLine3;
    };
    this.setAddressLine3 = function (arg)
    {
        addressLine3 = arg;
        return this;
    };

    this.getCity = function ()
    {
        return city;
    };
    this.setCity = function (arg)
    {
        city = arg;
        return this;
    };

    this.getCompanyName = function ()
    {
        return companyName;
    };
    this.setCompanyName = function (arg)
    {
        companyName = arg;
        return this;
    };

    this.getCountryCode = function ()
    {
        return countryCode;
    };
    this.setCountryCode = function (arg)
    {
        countryCode = arg;
        return this;
    };

    this.getPhone = function ()
    {
        return phone;
    };
    this.setPhone = function (arg)
    {
        phone = arg;
        return this;
    };

    this.getPostalCode = function ()
    {
        return postalCode;
    };
    this.setPostalCode = function (arg)
    {
        postalCode = arg;
        return this;
    };

    this.getProvinceState = function ()
    {
        return provinceState;
    };
    this.setProvinceState = function (arg)
    {
        provinceState = arg;
        return this;
    };

    this.getStationCode = function ()
    {
        return stationCode;
    };
    this.setStationCode = function (arg)
    {
        stationCode = arg;
        return this;
    };

    this.getTypeCode = function ()
    {
        return typeCode;
    };
    this.setTypeCode = function (arg)
    {
        typeCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerBag = function ()
{
    var baggageId;
    var lrtIndicator;
    var osTag;
    var osTagDate;
    var stationCode;
    var taggedToFlightNumber;
    var taggedToStation;
    var weight;
    var weightType;

    this.getBaggageId = function ()
    {
        return baggageId;
    };
    this.setBaggageId = function (arg)
    {
        baggageId = arg;
        return this;
    };

    this.getLrtIndicator = function ()
    {
        return lrtIndicator;
    };
    this.setLrtIndicator = function (arg)
    {
        lrtIndicator = arg;
        return this;
    };

    this.getOsTag = function ()
    {
        return osTag;
    };
    this.setOsTag = function (arg)
    {
        osTag = arg;
        return this;
    };

    this.getOsTagDate = function ()
    {
        return osTagDate;
    };
    this.setOsTagDate = function (arg)
    {
        osTagDate = arg;
        return this;
    };

    this.getStationCode = function ()
    {
        return stationCode;
    };
    this.setStationCode = function (arg)
    {
        stationCode = arg;
        return this;
    };

    this.getTaggedToFlightNumber = function ()
    {
        return taggedToFlightNumber;
    };
    this.setTaggedToFlightNumber = function (arg)
    {
        taggedToFlightNumber = arg;
        return this;
    };

    this.getTaggedToStation = function ()
    {
        return taggedToStation;
    };
    this.setTaggedToStation = function (arg)
    {
        taggedToStation = arg;
        return this;
    };

    this.getWeight = function ()
    {
        return weight;
    };
    this.setWeight = function (arg)
    {
        weight = arg;
        return this;
    };

    this.getWeightType = function ()
    {
        return weightType;
    };
    this.setWeightType = function (arg)
    {
        weightType = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerFee = function ()
{
    var createdDate;
    var feeCode;
    var feeDetail;
    var feeNumber;
    var feeOverride;
    var feeType;
    var note;
    var paymentNumber;
    var flightReference;
    var serviceCharges;
    var ssrCode;
    var ssrNumber;

    this.getCreatedDate = function ()
    {
        return createdDate;
    };
    this.setCreatedDate = function (arg)
    {
        createdDate = arg;
        return this;
    };

    this.getFeeCode = function ()
    {
        return feeCode;
    };
    this.setFeeCode = function (arg)
    {
        feeCode = arg;
        return this;
    };

    this.getFeeDetail = function ()
    {
        return feeDetail;
    };
    this.setFeeDetail = function (arg)
    {
        feeDetail = arg;
        return this;
    };

    this.getFeeNumber = function ()
    {
        return feeNumber;
    };
    this.setFeeNumber = function (arg)
    {
        feeNumber = arg;
        return this;
    };

    this.getFeeOverride = function ()
    {
        return feeOverride;
    };
    this.setFeeOverride = function (arg)
    {
        feeOverride = arg;
        return this;
    };

    this.getFeeType = function ()
    {
        return feeType;
    };
    this.setFeeType = function (arg)
    {
        feeType = arg;
        return this;
    };

    this.getNote = function ()
    {
        return note;
    };
    this.setNote = function (arg)
    {
        note = arg;
        return this;
    };

    this.getPaymentNumber = function ()
    {
        return paymentNumber;
    };
    this.setPaymentNumber = function (arg)
    {
        paymentNumber = arg;
        return this;
    };

    this.getFlightReference = function ()
    {
        return flightReference;
    };
    this.setFlightReference = function (arg)
    {
        flightReference = arg;
        return this;
    };

    this.getServiceCharges = function ()
    {
        return serviceCharges;
    };
    this.setServiceCharges = function (arg)
    {
        serviceCharges = arg;
        return this;
    };

    this.getSsrCode = function ()
    {
        return ssrCode;
    };
    this.setSsrCode = function (arg)
    {
        ssrCode = arg;
        return this;
    };

    this.getSsrNumber = function ()
    {
        return ssrNumber;
    };
    this.setSsrNumber = function (arg)
    {
        ssrNumber = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerInfo = function ()
{
    var balanceDue;
    var gender;
    var nationality;
    var residentCountry;
    var totalCost;
    var weightCategory;

    this.getBalanceDue = function ()
    {
        return balanceDue;
    };
    this.setBalanceDue = function (arg)
    {
        balanceDue = arg;
        return this;
    };

    this.getGender = function ()
    {
        return gender;
    };
    this.setGender = function (arg)
    {
        gender = arg;
        return this;
    };

    this.getNationality = function ()
    {
        return nationality;
    };
    this.setNationality = function (arg)
    {
        nationality = arg;
        return this;
    };

    this.getResidentCountry = function ()
    {
        return residentCountry;
    };
    this.setResidentCountry = function (arg)
    {
        residentCountry = arg;
        return this;
    };

    this.getTotalCost = function ()
    {
        return totalCost;
    };
    this.setTotalCost = function (arg)
    {
        totalCost = arg;
        return this;
    };

    this.getWeightCategory = function ()
    {
        return weightCategory;
    };
    this.setWeightCategory = function (arg)
    {
        weightCategory = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerProgram = function ()
{
    var programCode;
    var programLevelCode;
    var programNumber;

    this.getProgramCode = function ()
    {
        return programCode;
    };
    this.setProgramCode = function (arg)
    {
        programCode = arg;
        return this;
    };

    this.getProgramLevelCode = function ()
    {
        return programLevelCode;
    };
    this.setProgramLevelCode = function (arg)
    {
        programLevelCode = arg;
        return this;
    };

    this.getProgramNumber = function ()
    {
        return programNumber;
    };
    this.setProgramNumber = function (arg)
    {
        programNumber = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerTravelDocument = function ()
{
    var dob;
    var docNumber;
    var docSuffix;
    var docTypeCode;
    var expirationDate;
    var gender;
    var issuedByCode;
    var issuedDate;
    var name;
    var nationality;
    var birthCountry;

    this.getDob = function ()
    {
        return dob;
    };
    this.setDob = function (arg)
    {
        dob = arg;
        return this;
    };

    this.getDocNumber = function ()
    {
        return docNumber;
    };
    this.setDocNumber = function (arg)
    {
        docNumber = arg;
        return this;
    };

    this.getDocSuffix = function ()
    {
        return docSuffix;
    };
    this.setDocSuffix = function (arg)
    {
        docSuffix = arg;
        return this;
    };

    this.getDocTypeCode = function ()
    {
        return docTypeCode;
    };
    this.setDocTypeCode = function (arg)
    {
        docTypeCode = arg;
        return this;
    };

    this.getExpirationDate = function ()
    {
        return expirationDate;
    };
    this.setExpirationDate = function (arg)
    {
        expirationDate = arg;
        return this;
    };

    this.getGender = function ()
    {
        return gender;
    };
    this.setGender = function (arg)
    {
        gender = arg;
        return this;
    };

    this.getIssuedByCode = function ()
    {
        return issuedByCode;
    };
    this.setIssuedByCode = function (arg)
    {
        issuedByCode = arg;
        return this;
    };

    this.getIssuedDate = function ()
    {
        return issuedDate;
    };
    this.setIssuedDate = function (arg)
    {
        issuedDate = arg;
        return this;
    };

    this.getName = function ()
    {
        return name;
    };
    this.setName = function (arg)
    {
        name = arg;
        return this;
    };

    this.getNationality = function ()
    {
        return nationality;
    };
    this.setNationality = function (arg)
    {
        nationality = arg;
        return this;
    };

    this.getBirthCountry = function ()
    {
        return birthCountry;
    };
    this.setBirthCountry = function (arg)
    {
        birthCountry = arg;
        return this;
    };
};

SKYSALES.BOOKING.PassengerTypeInfo = function ()
{
    var dob;
    var paxType;

    this.getDob = function ()
    {
        return dob;
    };
    this.setDob = function (arg)
    {
        dob = arg;
        return this;
    };

    this.getPaxType = function ()
    {
        return paxType;
    };
    this.setPaxType = function (arg)
    {
        paxType = arg;
        return this;
    };
    
};

SKYSALES.BOOKING.Payment = function ()
{
    var accountName;
    var accountNumber;
    var authorizationCode;
    var authorizationStatus;
    var channelType;
    var collectedAmount;
    var collectedCurrencyCode;
    var currencyCode;
    var dccRateId;
    var dccStatus;
    var dccTransactionId;
    var expiration;
    var fundedDate;
    var installments;
    var nominalPaymentAmount;
    var parentPaymentId;
    var paymentAddresses;
    var paymentAttachments;
    var paymentFields;
    var paymentId;
    var paymentMethodCode;
    var paymentMethodType;
    var paymentNumber;
    var paymentText;
    var pointOfSale;
    var quotedAmount;
    var quotedCurrencyCode;
    var reconciliationId;
    var referenceId;
    var referenceType;
    var sourcePointOfSale;
    var status;
    var transferred;

    this.getAccountName = function ()
    {
        return accountName;
    };
    this.setAccountName = function (arg)
    {
        accountName = arg;
        return this;
    };

    this.getAccountNumber = function ()
    {
        return accountNumber;
    };
    this.setAccountNumber = function (arg)
    {
        accountNumber = arg;
        return this;
    };

    this.getAuthorizationCode = function ()
    {
        return authorizationCode;
    };
    this.setAuthorizationCode = function (arg)
    {
        authorizationCode = arg;
        return this;
    };

    this.getAuthorizationStatus = function ()
    {
        return authorizationStatus;
    };
    this.setAuthorizationStatus = function (arg)
    {
        authorizationStatus = arg;
        return this;
    };

    this.getChannelType = function ()
    {
        return channelType;
    };
    this.setChannelType = function (arg)
    {
        channelType = arg;
        return this;
    };

    this.getCollectedAmount = function ()
    {
        return collectedAmount;
    };
    this.setCollectedAmount = function (arg)
    {
        collectedAmount = arg;
        return this;
    };

    this.getCollectedCurrencyCode = function ()
    {
        return collectedCurrencyCode;
    };
    this.setCollectedCurrencyCode = function (arg)
    {
        collectedCurrencyCode = arg;
        return this;
    };

    this.getCurrencyCode = function ()
    {
        return currencyCode;
    };
    this.setCurrencyCode = function (arg)
    {
        currencyCode = arg;
        return this;
    };

    this.getDccRateId = function ()
    {
        return dccRateId;
    };
    this.setDccRateId = function (arg)
    {
        dccRateId = arg;
        return this;
    };

    this.getDccStatus = function ()
    {
        return dccStatus;
    };
    this.setDccStatus = function (arg)
    {
        dccStatus = arg;
        return this;
    };

    this.getDccTransactionId = function ()
    {
        return dccTransactionId;
    };
    this.setDccTransactionId = function (arg)
    {
        dccTransactionId = arg;
        return this;
    };

    this.getExpiration = function ()
    {
        return expiration;
    };
    this.setExpiration = function (arg)
    {
        expiration = arg;
        return this;
    };

    this.getFundedDate = function ()
    {
        return fundedDate;
    };
    this.setFundedDate = function (arg)
    {
        fundedDate = arg;
        return this;
    };

    this.getInstallments = function ()
    {
        return installments;
    };
    this.setInstallments = function (arg)
    {
        installments = arg;
        return this;
    };

    this.getNominalPaymentAmount = function ()
    {
        return nominalPaymentAmount;
    };
    this.setNominalPaymentAmount = function (arg)
    {
        nominalPaymentAmount = arg;
        return this;
    };

    this.getParentPaymentId = function ()
    {
        return parentPaymentId;
    };
    this.setParentPaymentId = function (arg)
    {
        parentPaymentId = arg;
        return this;
    };

    this.getPaymentAddresses = function ()
    {
        return paymentAddresses;
    };
    this.setPaymentAddresses = function (arg)
    {
        paymentAddresses = arg;
        return this;
    };

    this.getPaymentAttachments = function ()
    {
        return paymentAttachments;
    };
    this.setPaymentAttachments = function (arg)
    {
        paymentAttachments = arg;
        return this;
    };

    this.getPaymentFields = function ()
    {
        return paymentFields;
    };
    this.setPaymentFields = function (arg)
    {
        paymentFields = arg;
        return this;
    };

    this.getPaymentId = function ()
    {
        return paymentId;
    };
    this.setPaymentId = function (arg)
    {
        paymentId = arg;
        return this;
    };

    this.getPaymentMethodCode = function ()
    {
        return paymentMethodCode;
    };
    this.setPaymentMethodCode = function (arg)
    {
        paymentMethodCode = arg;
        return this;
    };

    this.getPaymentMethodType = function ()
    {
        return paymentMethodType;
    };
    this.setPaymentMethodType = function (arg)
    {
        paymentMethodType = arg;
        return this;
    };

    this.getPaymentNumber = function ()
    {
        return paymentNumber;
    };
    this.setPaymentNumber = function (arg)
    {
        paymentNumber = arg;
        return this;
    };

    this.getPaymentText = function ()
    {
        return paymentText;
    };
    this.setPaymentText = function (arg)
    {
        paymentText = arg;
        return this;
    };

    this.getPointOfSale = function ()
    {
        return pointOfSale;
    };
    this.setPointOfSale = function (arg)
    {
        pointOfSale = arg;
        return this;
    };

    this.getQuotedAmount = function ()
    {
        return quotedAmount;
    };
    this.setQuotedAmount = function (arg)
    {
        quotedAmount = arg;
        return this;
    };

    this.getQuotedCurrencyCode = function ()
    {
        return quotedCurrencyCode;
    };
    this.setQuotedCurrencyCode = function (arg)
    {
        quotedCurrencyCode = arg;
        return this;
    };

    this.getReconciliationId = function ()
    {
        return reconciliationId;
    };
    this.setReconciliationId = function (arg)
    {
        reconciliationId = arg;
        return this;
    };

    this.getReferenceId = function ()
    {
        return referenceId;
    };
    this.setReferenceId = function (arg)
    {
        referenceId = arg;
        return this;
    };

    this.getReferenceType = function ()
    {
        return referenceType;
    };
    this.setReferenceType = function (arg)
    {
        referenceType = arg;
        return this;
    };

    this.getSourcePointOfSale = function ()
    {
        return sourcePointOfSale;
    };
    this.setSourcePointOfSale = function (arg)
    {
        sourcePointOfSale = arg;
        return this;
    };

    this.getStatus = function ()
    {
        return status;
    };
    this.setStatus = function (arg)
    {
        status = arg;
        return this;
    };

    this.getTransferred = function ()
    {
        return transferred;
    };
    this.setTransferred = function (arg)
    {
        transferred = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaymentAddress = function ()
{
    var addressLine1;
    var addressLine2;
    var addressLine3;
    var city;
    var companyName;
    var countryCode;
    var paymentId;
    var postalCode;
    var provinceState;

    this.getAddressLine1 = function ()
    {
        return addressLine1;
    };
    this.setAddressLine1 = function (arg)
    {
        addressLine1 = arg;
        return this;
    };

    this.getAddressLine2 = function ()
    {
        return addressLine2;
    };
    this.setAddressLine2 = function (arg)
    {
        addressLine2 = arg;
        return this;
    };

    this.getAddressLine3 = function ()
    {
        return addressLine3;
    };
    this.setAddressLine3 = function (arg)
    {
        addressLine3 = arg;
        return this;
    };

    this.getCity = function ()
    {
        return city;
    };
    this.setCity = function (arg)
    {
        city = arg;
        return this;
    };

    this.getCompanyName = function ()
    {
        return companyName;
    };
    this.setCompanyName = function (arg)
    {
        companyName = arg;
        return this;
    };

    this.getCountryCode = function ()
    {
        return countryCode;
    };
    this.setCountryCode = function (arg)
    {
        countryCode = arg;
        return this;
    };

    this.getPaymentId = function ()
    {
        return paymentId;
    };
    this.setPaymentId = function (arg)
    {
        paymentId = arg;
        return this;
    };

    this.getPostalCode = function ()
    {
        return postalCode;
    };
    this.setPostalCode = function (arg)
    {
        postalCode = arg;
        return this;
    };

    this.getProvinceState = function ()
    {
        return provinceState;
    };
    this.setProvinceState = function (arg)
    {
        provinceState = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaymentAttachment = function ()
{
    var attachment;
    var paymentAttachmentId;
    var paymentAttachmentType;
    var paymentId;
    
    this.getAttachment = function ()
    {
        return attachment;
    };
    this.setAttachment = function (arg)
    {
        attachment = arg;
        return this;
    };

    this.getPaymentAttachmentId = function ()
    {
        return paymentAttachmentId;
    };
    this.setPaymentAttachmentId = function (arg)
    {
        paymentAttachmentId = arg;
        return this;
    };

    this.getPaymentAttachmentType = function ()
    {
        return paymentAttachmentType;
    };
    this.setPaymentAttachmentType = function (arg)
    {
        paymentAttachmentType = arg;
        return this;
    };

    this.getPaymentId = function ()
    {
        return paymentId;
    };
    this.setPaymentId = function (arg)
    {
        paymentId = arg;
        return this;
    };
};

SKYSALES.BOOKING.PaymentField = function ()
{
    var fieldName;
    var fieldValue;

    this.getFieldName = function ()
    {
        return fieldName;
    };
    this.setFieldName = function (arg)
    {
        fieldName = arg;
        return this;
    };

    this.getFieldValue = function ()
    {
        return fieldValue;
    };
    this.setFieldValue = function (arg)
    {
        fieldValue = arg;
        return this;
    };
};

SKYSALES.BOOKING.ReceivedBy = function (receivedByJson)
{
    var receivedByProperty = null;
    var obj = null;
    for (receivedByProperty in receivedByJson)
    {
        if (typeof(receivedByJson[receivedByProperty]) === "string")
        {
            this[receivedByProperty] = receivedByJson[receivedByProperty];
        }
    }

    var receivedBy;
    var receivedReference;
    var referralCode;

    this.getReceivedBy = function ()
    {
        return receivedBy;
    };
    this.setReceivedBy = function (arg)
    {
        receivedBy = arg;
        return this;
    };

    this.getReceivedReference = function ()
    {
        return receivedReference;
    };
    this.setReceivedReference = function (arg)
    {
        receivedReference = arg;
        return this;
    };

    this.getReferralCode = function ()
    {
        return referralCode;
    };
    this.setReferralCode = function (arg)
    {
        referralCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.TypeOfSale = function (typeOfSaleJson)
{
    var typeOfSaleProperty = null;
    var obj = null;
    for (typeOfSaleProperty in typeOfSaleJson)
    {
        if (typeof(typeOfSaleJson[typeOfSaleProperty]) === "string")
        {
            this[typeOfSaleProperty] = typeOfSaleJson[typeOfSaleProperty];
        }
    }

    var fareTypes;
    var paxResidentCountry;
    var promotionCode;

    this.getFareTypes = function ()
    {
        return fareTypes;
    };
    this.setFareTypes = function (arg)
    {
        fareTypes = arg;
        return this;
    };

    this.getPaxResidentCountry = function ()
    {
        return paxResidentCountry;
    };
    this.setPaxResidentCountry = function (arg)
    {
        paxResidentCountry = arg;
        return this;
    };

    this.getPromotionCode = function ()
    {
        return promotionCode;
    };
    this.setPromotionCode = function (arg)
    {
        promotionCode = arg;
        return this;
    };
};

SKYSALES.BOOKING.RecordLocator = function ()
{
    var hostedCarrierCode;
    var interactionPurpose;
    var recordCode;
    var systemCode;
    var systemDomainCode;

    this.getHostedCarrierCode = function ()
    {
        return hostedCarrierCode;
    };
    this.setHostedCarrierCode = function (arg)
    {
        hostedCarrierCode = arg;
        return this;
    };

    this.getInteractionPurpose = function ()
    {
        return interactionPurpose;
    };
    this.setInteractionPurpose = function (arg)
    {
        interactionPurpose = arg;
        return this;
    };

    this.getRecordCode = function ()
    {
        return recordCode;
    };
    this.setRecordCode = function (arg)
    {
        recordCode = arg;
        return this;
    };

    this.getSystemCode = function ()
    {
        return systemCode;
    };
    this.setSystemCode = function (arg)
    {
        systemCode = arg;
        return this;
    };

    this.getSystemDomainCode = function ()
    {
        return systemDomainCode;
    };
    this.setSystemDomainCode = function (arg)
    {
        systemDomainCode = arg;
        return this;
    };
};