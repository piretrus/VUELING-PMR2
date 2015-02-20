/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/
/*
---------------------------------------------------------------------------------------------------------------------------------------
vueling.js
---------------------------------------------------------------------------------------------------------------------------------------
*/
/*
Dependencies: 
main.js
lib.js

General Notes:
All Vueling-specific code should be in this file.

All of the Vueling SkySales JavaScrip t should be behind the VUELING object defined in this file.
You can think of the SKYSALES and VUELING objects as namespaces.

Notes for Vueling
All new classes should inherit (directly or indirectly) from SkySales.
See LanguageOption for an example of a class that inherits directly from SkySales.
An instance of LanguageOption is created for every <li> in the language menu.
This is a common pattern in main.js: we make a class that represents an element in the DOM.

CustomToggleView is an example of a class that inherits indirectly from SkySales.
VUELING.Class.CustomToggleView inherits from SKYSALES.Class.ToggleView, which inherits from SKYSALES.Class.SkySales.
CustomToggleView adds to the existing behavior of ToggleView.
*/

/*
All javascript added/changed by vueling should be behind the VUELING namespace.
This prevents naming collisions.
*/

// todo: Consider commenting classes and methods with VS-intellisense supported doc style: http://weblogs.asp.net/bleroy/archive/2007/04/23/the-format-for-javascript-doc-comments.aspx

// This comment is used by jslint to decide which rules to apply:
/*global window: false, SKYSALES: true, $: false, alert: false, document: false, Option: false, setTimeout: false */


(function () {
    "use strict";

    window.VUELING = {};

    // this file should be referenced after main.js, so window.SKYSALES should already be available.
    // Code in vueling.js can use classes and methods in the SKYSALES namespace.
    var SKYSALES = window.SKYSALES,
        VUELING = window.VUELING,

        console = window.console || {
            // If window.console isn't available, this will prevent errors when we try to log messages.
            "log": function () { },
            "debug": function () { },
            "info": function () { },
            "warn": function () { },
            "error": function () { }
        };

    // All classes added in this file should use the VUELING.class "namespace"
    VUELING.Class = {};
    // All utilities added in this file should use the VUELING.Util "namespace"
    VUELING.Util = {};

    // Textbox input filter methods
    VUELING.Util.InputFilters = {};

    VUELING.Util.getObjectInstance = function (objectName) {
        var myObject = null;
        for (var ins in SKYSALES.Instance) {
            if (ins.substring(0, objectName.length) === objectName) {
                myObject = SKYSALES.Instance[ins];
                break;
            }
        }
        return myObject;
    };
    VUELING.Util.getObjectInstanceAllStartWith = function (objectName) {
        var myObject = new Array();
        for (var ins in SKYSALES.Instance) {
            if (ins.substring(0, objectName.length) === objectName)
                myObject.push(SKYSALES.Instance[ins]);
        }
        return myObject;
    };

    VUELING.Util.IsAppleDevice = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsiPad = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/(ipad;)/);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsAppleMobile = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/(iphone|ipod)/);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsWindowsMobile = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/iemobile/i);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsOperaMobile = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/opera mini/i);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsBlackBerryMobile = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/blackBerry/i);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsAndroidMobile = function () {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/android/i);
            if (arrMatches)
                return true;
        }
        return false;
    };

    VUELING.Util.IsMobile = function () {
        return (VUELING.Util.IsAndroidMobile() || VUELING.Util.IsAppleMobile() || VUELING.Util.IsWindowsMobile()
            || VUELING.Util.IsOperaMobile() || VUELING.Util.IsBlackBerryMobile());
    };

    VUELING.Util.IsIe = function () {
        var isIE = $.browser.msie, browserVersion = parseInt($.browser.version, 10);
        if (isIE) return browserVersion;
        return false;
    };

    VUELING.Util.htmlDecode = function (value) {
        return $("<div/>").html(value).text();
    };

    VUELING.Util.parseDate = function (dateStr) {
        if (typeof (dateStr) != "string")
            return dateStr;

        dateStr = dateStr.replace(/[\.-]/g, "/");
        return new Date(Date.parse(dateStr));
    };

    VUELING.Util.onblurTrim = function (elem) {
        $('#' + elem).blur(function () {
            if ($('#' + elem).val() != "") {
                $('#' + elem).val(jQuery.trim($('#' + elem).val()));
            }
        });
    };

    // courtesy of http://stackoverflow.com/questions/646628/javascript-startswith
    // This function returns true if a string starts with the supplied string;
    // For example, "telephone".startsWith("tele"); is true.
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str) {
            return this.slice(0, str.length) === str;
        };
    }

    // This function returns true if a string ends with the supplied string;
    // For example, "telephone".endsWith("phone"); is true.
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (str) {
            return this.slice(-str.length) === str;
        };
    }

    // Add inArray method to Array class...


    //            var i;


    //                    return true;


    //            return false;



    //valeriano fix
    /*if (!Array.indexOf) 
    Array.prototype.indexOf = function (obj) 
    for (var i = 0; i < this.length; i++) 
    if (this[i] == obj) 
    return i;
    
    
    return -1;
    
    ;*/

    // Hack: Replace the initObjects function in SKYSALES.Util 
    // In most cases, inheritance is better; we should avoid changing anything in SKYSALES namespace when we can.
    // Avoid doing this!
    // This code modifies initObjects to look in both VUELING and SKYSALES namspaces.
    // Also, it allows the user to specify a type name with "VUELING.Class" or "SKYSALES.Class" before it.
    // To use this, call SKYSALES.Util.createObject(..)

    //      Go to the end of StaticHeaderAgency_View1.xslt for an example of doing this in XSLT.
    SKYSALES.Util.initObjects = function (createEvent) {
        createEvent = createEvent || "ready";
        var i = 0,
            createObjectArray = SKYSALES.Util.createObjectArray,
            objName = '',
            objectType = '',
            bareType = '',
            json = null,
            createObject = null,
            vuelingPrefix = "VUELING.Class.",
            skysalesPrefix = "SKYSALES.Class.",
            instance = null;

        for (i = 0; i < createObjectArray.length; i += 1) {
            createObject = createObjectArray[i];
            if (createObject.createEvent === createEvent) {
                objName = createObject.objNameBase + SKYSALES.Instance.getNextIndex();
                objectType = createObject.objType;
                json = createObject.json || {};

                instance = null;

                // if a namespace was provided, use it
                if (objectType.startsWith(vuelingPrefix)) {
                    bareType = objectType.substring(vuelingPrefix.length);
                    if (VUELING.Class[bareType]) {
                        instance = new VUELING.Class[bareType]();
                    }
                } else if (objectType.startsWith(skysalesPrefix)) {
                    bareType = objectType.substring(skysalesPrefix.length);
                    if (SKYSALES.Class[bareType]) {
                        instance = new SKYSALES.Class[bareType]();
                    }
                    // a namespace was not provided; look in SKYSALES.Class
                } else if (SKYSALES.Class[objectType]) {
                    instance = new SKYSALES.Class[objectType]();
                }

                if (instance) {
                    SKYSALES.Instance[objName] = instance;
                    instance.init(json);
                } else {
                    console.warn("The class '%s' could not be found!", objectType);
                }
            }
        }
    };

    SKYSALES.Util.inArray = function (arr, value) {
        var i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return true;
            }
        }
        return false;
    };

    SKYSALES.Util.inArrayDates = function (arr, value) {
        //to compare dates
        var i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].valueOf() === value.valueOf()) {
                return true;
            }
        }
        return false;
    };

    SKYSALES.Util.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    };

    SKYSALES.Util.getNow = function () {
        //IE8 doesn't support the Date.now() object
        if (!Date.now) {
            Date.now = function () {
                return +new Date();
            };
        } else {
            return Date.now();
        }
    };

    SKYSALES.Util.GetStationCode = function (isOrigin) {
        var result = $("#arrivalStationCode").val();
        if (isOrigin)
            result = $("#departureStationCode").val();
        return result;
    };

    SKYSALES.Util.IsChangingFlight = function () {
        for (var ins in SKYSALES.Instance) {
            if (ins.indexOf("ChangeFlight") != -1)
                return true;
        }
        return false;
    };

    SKYSALES.Util.removeDiacritics = function (s) {
        var r = s;
        if (s != undefined) {
            r = s.toLowerCase();
            r = r.replace(new RegExp(/\s/g), "");
            r = r.replace(new RegExp(/[àáâãäå]/g), "a");
            r = r.replace(new RegExp(/æ/g), "ae");
            r = r.replace(new RegExp(/ç/g), "c");
            r = r.replace(new RegExp(/[èéêë]/g), "e");
            r = r.replace(new RegExp(/[ìíîï]/g), "i");
            r = r.replace(new RegExp(/ñ/g), "n");
            r = r.replace(new RegExp(/[òóôõö]/g), "o");
            r = r.replace(new RegExp(/œ/g), "oe");
            r = r.replace(new RegExp(/[ùúûü]/g), "u");
            r = r.replace(new RegExp(/[ýÿ]/g), "y");
            r = r.replace(new RegExp(/\W/g), "");
        }
        return r;
    };

    SKYSALES.Util.executeFunctionByName = function (functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments).splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    };

    SKYSALES.accordionHideShow = function () {
        var divToToggle = $(this).closest('li').children('div.acordeonContent');
        divToToggle.slideToggle('slow');
        $(this).closest('li').toggleClass("pulsado");
    };

    SKYSALES.jsonp = function (url) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        head.appendChild(script);
    };

    SKYSALES.askAsistenteVirtual = function (question, language) {
        question = question.replace("/", " ");
        if (jQuery.trim(question) == "" || jQuery.trim(question) == SKYSALES.AsistenteEscribe) {
            $('#vquestion').blur();
            return false;
        }
        var languageId = 0;
        switch (language) {
            case "es-ES": case "ca-ES": case "eu-ES": case "gl-ES":
                languageId = 1;
                break;
            default:
                languageId = 3;
                break;
        }
        var virtualAssistantServiceUrl = "https://vueling.anbotocloud.com/frontal/service?service=13&customer=vl35a8xpcr&";
        var url = virtualAssistantServiceUrl + "output=json&callback=?&charset=utf-8&lang=" + languageId + "&ref=" + SKYSALES.AsistenteVirtualRef + "&text=" + encodeURIComponent(question);

        $.getJSON(url,
        function (data) {
            try {
                var questions;
                {
                    var isRedirect = false, txtRedirect = "", originalQuestion = "", bodyResponse = "";
                    originalQuestion = data.response.context.text;
                    if (data.response.fields.VABehaviour.behaviour !== undefined && data.response.fields.VABehaviour.behaviour.toUpperCase() == "REDIRECT") {
                        isRedirect = true;
                        var urlRedirect = data.response.fields.VABehaviour.URL;
                        txtRedirect = SKYSALES.AsistenteVirtualRedirect;
                        var txtRedirectAux = txtRedirect.replace("[redirectEnlace]", "<a href=\"" + urlRedirect + "\" target=\"_blank\">");
                        txtRedirect = txtRedirectAux.replace("[redirectEnlaceFin]", "</a>");

                        $('#redirectAV').remove();
                        $('.footer').append("<div id=\"redirectAV\"/>");
                        $('#redirectAV').click(function () {
                            window.open(data.response.fields.VABehaviour.URL, "_blank");
                        });
                        $('#redirectAV').trigger("click");
                    }
                    var resp = new Array();
                    var connections = new Array();
                    var questions = new Array();
                    var dataQuestion = data.response.fields.question, respChild, thisconnection;
                    SKYSALES.AsistenteVirtualRef = data.response.context.ref;
                    if (dataQuestion.constructor == Array) {
                        resp = dataQuestion;
                        for (i in resp) {
                            connections[i] = data.response.fields.question[i].connections;
                            questions[i] = data.response.fields.question[i].value;
                        }
                    } else {
                        resp[0] = data.response.fields.question;
                        connections[0] = data.response.fields.question.connections;
                        questions[0] = data.response.fields.question.value;
                    }

                }
            } catch (error) {
                resp = new Array({ "resp": SKYSALES.AsistenteVirtualError });
                connections = new Array();
            }

            bodyResponse = "<div><h3>" + originalQuestion + "</h3>";
            for (var i in resp) {
                respChild = resp[i].resp.replace(" href", " target='_blank' href");
                thisconnection = (connections.length > 0) ? connections[i] : false;
                if (thisconnection && thisconnection.connection.length > 0) {
                    if (typeof (thisconnection.connection) != "string") {
                        for (i = 0; i < thisconnection.connection.length; i++) {
                            var quiza = "";
                            if ($.trim(thisconnection.header) != "") {
                                quiza = "<p>" + SKYSALES.AsistenteQuiza + ":</p>";
                            }
                            if (i == 0) respChild += quiza + "<ul class='propusedQuestions'>";
                            respChild += "<li style='cursor:pointer'><a>" + thisconnection.connection[i] + "</a></li>";
                        }
                    }
                    else {
                        respChild += "<ul class='propusedQuestions'>";
                        respChild += "<li style='cursor:pointer'><a>" + thisconnection.connection + "</a></li>";
                    }
                    respChild += "</ul>";
                }
                if (isRedirect) {
                    respChild += " " + txtRedirect;
                    isRedirect = false;
                }
                bodyResponse += "<p>" + respChild + "</p>";
            }

            bodyResponse += "</div>";
            $('.vresponses').append(bodyResponse);
            $(".propusedQuestions a").unbind('click').click(function () {
                SKYSALES.askAsistenteVirtual($(this).html(), language);
            });

            $("#blockUIPopUpForAsistente .scrollbar").css('display', '');
            $('#blockUIPopUpForAsistente #scrollbar1').tinyscrollbar();

            var positionScrollBar = $(".overview .vresponses div:last").position();
            var heigthScrollBar = $(".overview .vresponses div:last").height();
            if (heigthScrollBar < 200) $('#blockUIPopUpForAsistente #scrollbar1').tinyscrollbar_update("bottom");
            else $('#blockUIPopUpForAsistente #scrollbar1').tinyscrollbar_update(positionScrollBar.top);
        });
    };

    SKYSALES.AsistenteVirtualRef = "";
    SKYSALES.AsistenteVirtualRedirect = "";
    SKYSALES.AsistenteVirtualError = "";
    SKYSALES.AsistenteQuiza = "";
    SKYSALES.AsistenteEscribe = "";

    SKYSALES.initAsistenteVirtual = function (lang, errorAsistente, redirectAsistente, quiza, escribe) {
        SKYSALES.AsistenteVirtualError = errorAsistente;
        SKYSALES.AsistenteVirtualRedirect = redirectAsistente;
        SKYSALES.AsistenteQuiza = quiza;
        SKYSALES.AsistenteEscribe = escribe;
        $('#vquestion').click(function () {
            if ($(this).val() == SKYSALES.AsistenteEscribe) {
                $(this).val("");
            }
        });
        $('#vquestion').blur(function () {
            if ($.trim($(this).val()) == "") {
                $(this).val(SKYSALES.AsistenteEscribe);
            }
        });
        $("#AsistenteVirtualAsk").click(function () {
            var question = $("#vquestion").val();
            $("#vquestion").val("");
            SKYSALES.askAsistenteVirtual(question, lang);
        });

        $('#vquestion').keydown(function (event) {
            if (event.keyCode == '13') {
                event.preventDefault();
                var question = $("#vquestion").val();
                $("#vquestion").val("");
                SKYSALES.askAsistenteVirtual(question, lang);

            }
        });
        $('#vquestion').focus(function () {
            $(this).select();
        });
    };

    SKYSALES.Util.ValidateHold = function (clickedDate, advanceDaysHold, journeysDateMarketDataModelList) {
        var dayNow = new Date();
        var one_day = 1000 * 60 * 60 * 24;

        //var basicChecked = false;
        //var radioBasicFares = $("td.basictd input");
        //if (radioBasicFares.length > 0)
        //    basicChecked = radioBasicFares.is(':checked');


        /*cambio maria*/

        var holdAllowed = false;
        var holdAllowedList = [];
        var itemSelected0 = "";
        var itemSelected1 = "";

        var availabilityInputObj = VUELING.Util.getObjectInstance('availabilityInput');
        if (availabilityInputObj != null) {

            itemSelected0 = availabilityInputObj.getAvailabilityTableSelectionValue('#availabilityTable0');
            itemSelected1 = availabilityInputObj.getAvailabilityTableSelectionValue('#availabilityTable1');
        }

        if (journeysDateMarketDataModelList != null) {
            for (var i = 0; journeysDateMarketDataModelList.length > i; i++) {
                if (journeysDateMarketDataModelList[i] != null) {
                    var isInList = (itemSelected0 != undefined && journeysDateMarketDataModelList[i].keyJourneyDateMarket == itemSelected0)
                                || (itemSelected1 != undefined && journeysDateMarketDataModelList[i].keyJourneyDateMarket == itemSelected1);
                    if (isInList) {
                        holdAllowedList.push({
                            "keyJourneyDateMarket": journeysDateMarketDataModelList[i].keyJourneyDateMarket,
                            "fareProductClassCode": journeysDateMarketDataModelList[i].fareProductClassCode,
                            "isHoldAllowed": journeysDateMarketDataModelList[i].isHoldAllowed
                        });
                    }
                }
                if (holdAllowedList.length == 2)
                    break;
            }

            for (var j = 0; holdAllowedList.length > j; j++) {
                holdAllowed = holdAllowedList[j].isHoldAllowed;
                if (!holdAllowed) break;
            }
        }


        /*cambio dani*/
        if (!holdAllowed)
            return SKYSALES.Util.HideHold();

        var advanceDaysHoldMatch = true;
        if ($('#availabilityTable0.availabilityBody tbody tr td input:checked').length == 0)
            return SKYSALES.Util.HideHold();
        var dateDeparture = SKYSALES.Util.ScheduleSelectedDate(0, null);
        var dateDiff = Math.ceil((dateDeparture.getTime() - dayNow.getTime()) / (one_day));
        if (dateDiff < advanceDaysHold) {
            return SKYSALES.Util.HideHold();
        }

        if ($('#availabilityTable1').length > 0) {
            if ($('#availabilityTable1.availabilityBody tbody tr td input:checked').length == 0)
                return SKYSALES.Util.HideHold();

            var dateReturn = SKYSALES.Util.ScheduleSelectedDate(1, null);
            var dateDiff = Math.ceil((dateReturn.getTime() - dayNow.getTime()) / (one_day));
            if (dateDiff < advanceDaysHold) {
                return SKYSALES.Util.HideHold();
            }
        }

        $(".checkHold").parent().show();
        $("#hrHold").show();
    };

    SKYSALES.Util.HideHold = function () {
        $(".checkHold").parent().hide();
        $("#hrHold").hide();
        if ($(".checkHold input").is(':checked'))
            $(".checkHold input").click();
    };

    SKYSALES.Util.MarketSize = function () {
        return $("div.marketSection div.availabilitySection").not(":hidden").size();
    };

    SKYSALES.Util.MarketSizeWithHiddenAvailability = function () {
        return $("div.marketSection div.availabilitySection").size();
    };

    SKYSALES.Util.AllMarketsShownHaveAvailability = function () {
        var result = true;
        var markets = $("div.marketSection div.availabilitySection").not(":hidden");
        $(markets).each(function (ind) {
            var availabilityInputs = $(this).find("table.availabilityBody input").size();
            if (availabilityInputs == 0) result = false;
        });

        return result;
    };

    SKYSALES.Util.DayDifference = function () {
        var day0 = new Date($('#dateselected0').val());
        var day1 = new Date($('#dateselected1').val());
        return (day1 - day0) / (1000 * 60 * 60 * 24);
    };

    SKYSALES.Util.ScheduleSelectedDate = function (journeyIndex, dateSelected) {
        if (dateSelected != null) {
            if (typeof dateSelected === 'string')
                $('#dateselected' + journeyIndex).val(dateSelected);
            else {
                var year = dateSelected.getFullYear(),
                    day = dateSelected.getDate().toString(),
                    month = (dateSelected.getMonth() + 1).toString();
                if (month.length == 1)
                    month = '0' + month;
                if (day.length == 1)
                    day = '0' + day;
                $('#dateselected' + journeyIndex).val(month + "/" + day + "/" + year);
            }

            var dateMarketSelected = new Date($('#dateselected' + journeyIndex).val() + " 23:59:59");
            VUELING.journeyDates = VUELING.journeyDates || [];
            VUELING.journeyDates[journeyIndex] = dateMarketSelected;

            var availabilityInputInstance = VUELING.Util.getObjectInstance('availabilityInput');
            if (availabilityInputInstance) {
                availabilityInputInstance.marketArray[journeyIndex].marketDepartDate = $('#dateselected' + journeyIndex).val();
                var myDate = availabilityInputInstance.marketArray[journeyIndex].marketDepartDate.split("/");
                availabilityInputInstance.marketArray[journeyIndex].marketDepartDateFormatted = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
            }

        }
        var setdateSelected = new Date($('#dateselected' + journeyIndex).val() + " 23:59:59");
        return setdateSelected;
    };

    SKYSALES.Util.DatesAreInOrder = function (journeyIndex, dateSelected, areEqualsJourneyOriginAndDestination) {
        var datesAreInOrder = true,
            marketSize = SKYSALES.Util.MarketSize(),
            deptDate = '',
            returnDate = '';
        if (marketSize > 1) {
            if (journeyIndex == 0) {
                deptDate = (typeof dateSelected === 'string') ? new Date(dateSelected + " 23:59:59") : dateSelected;
                returnDate = SKYSALES.Util.ScheduleSelectedDate(1, null);
            } else {
                returnDate = (typeof dateSelected === 'string') ? new Date(dateSelected + " 23:59:59") : dateSelected;
                deptDate = SKYSALES.Util.ScheduleSelectedDate(0, null);
            }

            if (areEqualsJourneyOriginAndDestination == true) {
                if (deptDate >= returnDate)
                    datesAreInOrder = false;
            } else {
                if (deptDate > returnDate)
                    datesAreInOrder = false;
            }
        }
        return datesAreInOrder;
    };

    var OriginalHintClass = SKYSALES.Hint;
    //Overwrite SKYSALES.Hint to correct the position implementation, using Jquery UI plugin.
    SKYSALES.Hint = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisHint = SKYSALES.Util.extendObject(parent);

        thisHint.addHintEvents = function () {
            SKYSALES.common.getAllInputObjects().each(this.eventFunction);
        };
        thisHint.eventFunction = function () {
            var hint = SKYSALES.Util.getAttributeValue($(this), 'hint');
            if (hint) {
                if (this.tagName && (this.tagName.toString().toLowerCase() === 'input')) {
                    thisHint.addHintFocusEvents(this);
                } else {
                    thisHint.addHintHoverEvents(this);
                }
            }
        };
        thisHint.removeEventFunction = function () {
            var obj = $(this),
                hint = SKYSALES.Util.getAttributeValue(obj, 'hint');
            if (hint) {
                if (this.tagName && (this.tagName.toString().toLowerCase() === 'input')) {
                    obj.unbind('focus');
                    obj.unbind('blur');
                } else {
                    obj.unbind('mouseenter');
                    obj.unbind('mouseleave');
                }
            }
        };

        thisHint.addHintFocusEvents = function (obj, hintText) {
            var focusFunction = null,
                blurFunction = null;

            focusFunction = function () {
                thisHint.showHint(obj, hintText);
            };
            blurFunction = function () {
                thisHint.hideHint(obj, hintText);
            };
            if ($(obj).is(':hidden') === false) {
                $(obj).focus(focusFunction);
                $(obj).blur(blurFunction);
            }
        };

        thisHint.addHintHoverEvents = function (obj, hintText) {
            var showFunction = null,
                hideFunction = null;

            showFunction = function () {
                thisHint.showHint(obj, hintText);
            };
            hideFunction = function () {
                thisHint.hideHint(obj, hintText);
            };
            $(obj).hover(showFunction, hideFunction);
        };

        thisHint.getHintDivId = function () {
            return "cssHint";
        };

        thisHint.showHint = function (obj, hintHtml, xOffset, yOffset, referenceId) {
            var hintDivId = thisHint.getHintDivId(),
                jQueryHintDiv = this.getById(hintDivId),
                hint = SKYSALES.Util.getAttributeValue($(obj), 'hint'),
                offset = $(obj).offset(),
                position = $(obj).position(),
                csspos = $(obj).css('position');

            if (!hintHtml && hint) {
                hintHtml = hint;
            }
            jQueryHintDiv.html(hintHtml);

            var w = 0, h = offset.top;
            $(obj).parent().append($(jQueryHintDiv));
            var childs = $(obj).parent().children();

            for (var i = 0; i < childs.size() - 1; i++) {
                if ($(childs[i]).is(':visible') && (
                        $(childs[i]).attr('class') != 'validationErrorDescription' &&
                        $(childs[i]).attr('id') != 'cssHint' &&
                        !$(childs[i]).hasClass('hideOutside'))
                    ) {
                    w += $(childs[i]).outerWidth(true) + 5;
                }
            };

            if (csspos == 'static') w = 10 + $(obj).width();
            if (VUELING.Util.IsIe() && csspos != 'static') w = 15;
            $(jQueryHintDiv).css({
                left: w + 'px',
                top: position.top + 'px',
                minWidth: '105px'
            });
            $(jQueryHintDiv).fadeIn();
        };

        thisHint.hideHint = function () {
            var hintDivId = thisHint.getHintDivId();
            this.getById(hintDivId).hide();
        };

        return thisHint;
    };

    // Hack: Replace the SKYSALES.Validate in SKYSALES
    // In most cases, inheritance is better; we should avoid changing anything in SKYSALES namespace when we can.
    // Avoid doing this!
    // This code extends Validate to do new Vueling's Validations inside SKYSALES namespace.
    // To use this, call SKYSALES.Validate(..) like always

    // This tells JSLINT to allow a separate var declaration:
    /* jslint vars:true */
    var OriginalValidateClass = SKYSALES.Validate;
    /* jslint vars:false */

    // Warning: usually, we should avoid doing this; this will put Vueling's version of Validate into the SKYSALES namespace.
    SKYSALES.Validate = function (form, controlID, errorsHeader, regexElementIdFilter, errorDisplayMethod) {
        var parent = new OriginalValidateClass(form, controlID, errorsHeader, regexElementIdFilter, errorDisplayMethod),
            thisValidate = SKYSALES.Util.extendObject(parent);

        // set up new attributes
        thisValidate.valueInRangesAttribute = 'valueinranges';
        thisValidate.valueIberiaPlusAttribute = 'iberiapluscode';
        thisValidate.cardexpirationAttribute = 'cardexpirationid';
        thisValidate.nameOrSurnameAttribute = 'nameorsurname';
        thisValidate.residentSurnamesAttribute = 'residentsurnames';
        thisValidate.notEqualsInputAttribute = 'notequals';
        thisValidate.notNumbersInputAttribute = 'notnumbers';


        // set up Tracking Attributes
        thisValidate.trackingEvents = '';
        thisValidate.trackingDescriptions = '';

        // set up error handling attributes
        thisValidate.valueInRangesErrorAttribute = 'valueinrangeserror';
        thisValidate.valueInfantCountErrorAttribute = 'infantcounterror';
        thisValidate.valueInfantCountShortErrorAttribute = 'infantcountshorterror';
        thisValidate.valuePassengerCountErrorAttribute = 'passengercounterror';
        thisValidate.valueUMAvailabilityErrorAttribute = 'umavailabilityerror';
        thisValidate.valueIberiaPlusAttributeErrorAttribute = 'iberiapluscodeerror';
        thisValidate.cardexpirationErrorAttribute = 'cardexpirationerror';
        thisValidate.nameOrSurnameErrorAttribute = 'nameorsurnameerror';
        thisValidate.residentSurnamesErrorAttribute = 'residentsurnameserror';
        thisValidate.notEqualsInputErrorAttribute = 'notequalserror';
        thisValidate.notNumbersInputErrorAttribute = 'notnumberserror';
        thisValidate.dobSelectsErrorAttribute = 'dobvalidation';
        thisValidate.dobSelectsErrorDataAttribute = 'dobvalidationdata';

        // set up error handling default errors
        thisValidate.defaultValueInRangesError = '{label} is not in a valid range';
        thisValidate.defaultInfantCountError = 'Por motivos de seguridad cada bebé debe viajar con un adulto. Por favor, haz de nuevo tu selección.';
        thisValidate.defaultInfantCountShortError = 'Revisa tu selección.';
        thisValidate.defaultPassengerCountError = 'Has introducido un número de pasajeros que no es válido.\n Sólo se te permite un máximo de  25 pasajeros por reserva.\n Si deseas reservar un número superior al indicado, utiliza el formulario para reservas de grupo';
        thisValidate.defaultUMAvailabilityError = 'No se permite contratar el servicio de acompañamiento de menores con menos de 24 horas de antelación';
        thisValidate.defaultIberiaPlusError = 'El código de Iberia Plus que ha introducido es incorrecto';
        thisValidate.defaultcardexpirationErrorAttribute = 'Expirated Card';
        thisValidate.defaultnameOrSurnameErrorAttribute = 'El nombre introducido no es correcto';
        thisValidate.defaultresidentSurnamesErrorAttribute = 'La longitud de los apellidos no es correcta';
        thisValidate.defaultNotEqualsInputError = 'No es posible seleccionar el mismo destino preferido en los dos campos.';
        thisValidate.defaultNotNumbersInputError = 'Solo es posible escribir letras de la A a la Z.';
        thisValidate.defaultDobSelectsError = 'Selecciona la fecha de nacimiento.';

        // Override validateType for do New Custom Vueling Validations
        // First do a backup of the original function (for to can call)
        thisValidate.originalValidateType = parent.validateType;
        // IMPORTANT: create a function in "parent." for override the function into the parent
        //            if you don't do this the function doesn't override and will execute the parent original function and not this
        //            This workaround is necessary because the parent is calling "thisValidate.originalValidateType()" 
        //                  where it should be calling "this.originalValidateType()".
        parent.validateType = function (e) {
            thisValidate.doCustomVuelingValidations(e);

            // hack: There are, unfortunately, two versions of the errors field:
            // 1. On the parent Validate class
            // 2. On Vueling's custom Validate class (which this code is found in the middle of)
            // During the call to doCustomVuelingValidations, if errors are set, they are set on the derived (Vueling) object.
            // However, other code in the base Validate class expects it to be set on version 1 of the object. So here, we move the errors there.
            // 
            // The short explanation is that when the base class calls thisValidate.something() instead of this.something(), it changes the context 
            //      of the method call. In the context of this validateType method, "this" is the parent class.
            if (thisValidate.errors) {
                this.errors += thisValidate.errors;
                // Alex M. 18/06/2011 - I comment out this line because it submits the form even if there are errors on it. The reason is that the 
                // outputErrors method expects the error list on the thisValidate.errors variable.
                // thisValidate.errors = "";
            }

            // Now call the original method:
            thisValidate.originalValidateType(e);
        };

        // Here call functions that validate New Custom Vueling Validations
        thisValidate.doCustomVuelingValidations = function (e) {
            thisValidate.validateValueInRanges(e);
            thisValidate.validatePassengerCount(e);
            thisValidate.validateUMAvailability(e);
            thisValidate.validateIberiaPlusCode(e);
            thisValidate.validateCardExpiration(e);
            thisValidate.validateNameOrSurname(e);
            thisValidate.validateResidentSurnames(e);
            thisValidate.validateNotEqualsInput(e);
            thisValidate.validateNotNumbersInput(e);
            thisValidate.validateDobSelects(e);
        };



        //Override outputErrors for tracking errors
        thisValidate.originaloutputErrors = parent.outputErrors;

        thisValidate.renderShowChat = function () {
            if (thisValidate.ShowChat == 'true') {
                if ($("#chatShow").length == 0) {
                    $("#chatHidden").clone(true).attr('id', 'chatShow').appendTo($("#errorMsg"));
                }
            }
        }

        parent.outputErrors = function (focusOnError) {

            //Codigo de Tracking Aquí
            if (thisValidate.trackingEvents != "" && thisValidate.trackingEvents != null) {
                VUELING.trackingFunction('', thisValidate.trackingEvents, thisValidate.trackingDescriptions);
            }
            // if there is an error output it
            var errorDisplayMethod = this.errorDisplayMethod.toString().toLowerCase(),
                errorHtml = '',
                errorArray = [],
                i = 0,
                showDefaultErrorMethod = true,
                showAllErrorLocations = false;
            if (thisValidate.errors) {
                if (this.errorsHeader !== '') {
                    errorHtml += '<p class="fs_12">' + this.errorsHeader + '<\/p>';
                }
                errorArray = thisValidate.errors.split('\n');
                errorHtml += '<ul>';
                for (i = 0; i < errorArray.length; i += 1) {
                    if (errorArray[i] !== '') {
                        errorHtml += '<li>' + errorArray[i] + '<\/li>';
                    }
                }
                errorHtml += '<\/ul>';

                if (errorArray.length > 0)
                    $("html, body").stop().animate({ scrollTop: 0 }, 500);

                if (errorDisplayMethod.indexOf('all') > -1) {
                    showAllErrorLocations = true;
                    errorDisplayMethod = 'read_along';

                }
                if (errorDisplayMethod.indexOf('no_summary') > -1) {
                    showDefaultErrorMethod = false;
                }
                if (errorDisplayMethod.indexOf('read_along') > -1) {
                    thisValidate.outputErrorsReadAlong(errorHtml, showAllErrorLocations);
                    showDefaultErrorMethod = false;
                }
                if (errorDisplayMethod.indexOf('alert') > -1) {
                    alert(thisValidate.errorsHeader + thisValidate.errors);
                }
                if (showDefaultErrorMethod === true) {
                    alert(thisValidate.errorsHeader + thisValidate.errors);
                }

                if (thisValidate.setfocus) {
                    if ($(thisValidate.setfocus).is(':hidden') === false && $(thisValidate.setfocus).css('visibility') != 'hidden') {
                        if (focusOnError !== false) {
                            thisValidate.setfocus.blur();
                            thisValidate.setfocus.focus();
                        }
                    }
                }

                thisValidate.renderShowChat();

                return false;
            } else {
                return true;
            }
        };



        //                parent.errors = thisValidate.errors;
        //                this.errors = thisValidate.errors;
        //                thisValidate.errors = "";



        //                thisValidate.errors = this.errors;


        //            // Now call the original method:
        //            thisValidate.originaloutputErrors();


        // Override setError for tracking errors
        thisValidate.originalSetError = parent.setError;
        parent.setError = function (e, errorAttribute, defaultTypeError) {


            try {
                // Codigo de tracking aqui
                var pageName = "";
                var controlName = e.getAttribute('name');
                var controlId = e.getAttribute('id');


                pageName = window.location.pathname; // e.baseURI;

                if (controlName != null || controlId != null) {


                    if (controlName == null) controlName = '';
                    if (controlId == null) controlId = '';

                    // Buscador
                    if (pageName.indexOf("/Search.aspx") != -1) {


                        //            Selecciona tu vuelo:
                        if (controlName.indexOf("AvailabilitySearchInputSearchView") != -1) {
                            //•	Falta seleccionar vuelo de ida o vuelta – evento 11  --> 
                            if ((controlName.indexOf('TextBoxMarketOrigin') != -1) || (controlName.indexOf('TextBoxMarketDestination') != -1)) {
                                if (errorAttribute.indexOf('required') != -1) {
                                    if (thisValidate.trackingEvents.indexOf('event11') == -1) {
                                        thisValidate.trackingEvents += 'event11,';
                                        thisValidate.trackingDescriptions += 'Falta seleccionar vuelo de ida o vuelta. ';
                                    }
                                }
                            }
                            //•	Se ha seleccionado una ida antes de una vuelta – evento 10
                            if ((controlName.indexOf('DropDownListMarketMonth') != -1)) {
                                if (errorAttribute.indexOf('daterange') != -1) {
                                    if (thisValidate.trackingEvents.indexOf('event10') == -1) {
                                        thisValidate.trackingEvents += 'event10,';
                                        thisValidate.trackingDescriptions += 'Se ha seleccionado una ida antes de una vuelta. ';
                                    }
                                }
                            }
                            //•	Falta validar las condiciones de transporte – evento 5
                        }
                    }

                    // Selecciona Tu Vuelo
                    if (pageName.indexOf("/ScheduleSelect.aspx") != -1) { }

                    //Datos de Contacto
                    if (pageName.indexOf("/Contact.aspx") != -1) {

                        // Faltan Datos de contacto
                        if ((controlName.indexOf('PassengerInputViewContactView_TextBoxFirstName') != -1) || (controlName.indexOf('PassengerInputViewContactView_TextBoxLastName') != -1) ||
                            (controlName.indexOf('PassengerInputViewContactView$TextBoxFirstName') != -1) || (controlName.indexOf('PassengerInputViewContactView$TextBoxLastName') != -1)) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event12') == -1) {
                                    thisValidate.trackingEvents += 'event12,';
                                    thisValidate.trackingDescriptions += 'Faltan datos de pasajero. ';
                                }
                            }
                        }

                        //Emails no coinciden
                        if (controlId.indexOf('TextBoxEmailAddressRepeat') != -1) {
                            if (errorAttribute.indexOf('equalsinputerror') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event23') == -1) {
                                    thisValidate.trackingEvents += 'event23,';
                                    thisValidate.trackingDescriptions += 'Emails no coinciden. ';
                                }
                            }
                        }

                        //Falta telefono o email
                        if ((controlName.indexOf('TextBoxHomePhone') != -1) || (controlName.indexOf('TextBoxEmailAddress') != -1)) {
                            if (errorAttribute.indexOf('requirederror') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event3') == -1) {
                                    thisValidate.trackingEvents += 'event3,';
                                    thisValidate.trackingDescriptions += 'Falta telefono o email. ';
                                }
                            }
                        }

                        //Faltan datos de pasajero
                        if ((controlName.indexOf('ContactInputView_TextBoxFirstName') != -1) || (controlName.indexOf('ContactInputView_TextBoxLastName') != -1)
                            || (controlName.indexOf('ContactInputView$TextBoxFirstName') != -1) || (controlName.indexOf('ContactInputView$TextBoxLastName') != -1)
                                || (controlName.indexOf('DropDownListCountry') != -1) || (controlName.indexOf('TextBoxCity') != -1)) {
                            if (errorAttribute.indexOf('requirederror') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event22') == -1) {
                                    thisValidate.trackingEvents += 'event22,';
                                    thisValidate.trackingDescriptions += 'Faltan Datos de contacto. ';
                                }
                            }
                        }


                        //Falta marcar Condiciones de Transporte.
                        if (controlId.indexOf('LegalTransportconditions') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event5') == -1) {
                                    thisValidate.trackingEvents += 'event5,';
                                    thisValidate.trackingDescriptions += 'Falta marcar Condiciones de Transporte. ';
                                }
                            }
                        }

                    }

                    //Personaliza tu vuelo:
                    if (pageName.indexOf("/Services.aspx") != -1) {
                        // 

                        //•	Falta elegir si quieres maleta o no – evento 16
                        if (controlId.indexOf('BaggageInputViewServicesView') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event16') == -1) {
                                    thisValidate.trackingEvents += 'event16,';
                                    thisValidate.trackingDescriptions += 'Falta elegir si quieres maleta o no. ';
                                }
                            }
                        }
                        //•	Falta elegir si quieres seguro o no – evento 21
                        if (controlId.indexOf('FeeInputTypeSSRInsuranceInput') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event21') == -1) {
                                    thisValidate.trackingEvents += 'event21,';
                                    thisValidate.trackingDescriptions += 'Falta elegir si quieres seguro o no. ';
                                }
                            }
                        }

                        //•	Debes seleccionar si vas a facturar maletas o no. – evento ?
                        if (controlId.indexOf('SeatSelectionAjaxViewServicesView') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {

                            }
                        }

                    }

                    //Forma de Pago:
                    if (pageName.indexOf("/Payment.aspx") != -1) {


                        //Forma de Pago:
                        //•	Falta elegir tarjeta – evento 37
                        if (controlName.indexOf('DropDownListPaymentMethodCode') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event37') == -1) {
                                    thisValidate.trackingEvents += 'event37,';
                                    thisValidate.trackingDescriptions += 'Falta elegir tarjeta. ';
                                }
                            }

                        }
                        //•	Falta indicar titular de tarjeta – evento 38
                        if (controlName.indexOf('AccountHolderName') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event38') == -1) {
                                    thisValidate.trackingEvents += 'event38,';
                                    thisValidate.trackingDescriptions += 'Falta indicar titular de tarjeta. ';
                                }
                            }

                        }

                        //•	Falta indicar mes / año de caducidad de tarjeta – evento 39
                        if ((controlName.indexOf('DropDownListEXPDAT_MONTH') != -1) || (controlName.indexOf('DropDownListEXPDAT_YEAR') != -1)) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event39') == -1) {
                                    thisValidate.trackingEvents += 'event39,';
                                    thisValidate.trackingDescriptions += 'Falta indicar mes / año de caducidad de tarjeta. ';
                                }
                            }
                        }

                        //•	Falta ### CVV – evento 40
                        if (controlName.indexOf('TextBoxCC') != -1) {
                            if (errorAttribute.indexOf('required') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event40') == -1) {
                                    thisValidate.trackingEvents += 'event40,';
                                    thisValidate.trackingDescriptions += 'Falta ### CVV. ';
                                }
                            }
                        }

                        //•	Nº tarjeta invalida – evento 60
                        if (controlName.indexOf('TextBoxACCTNO') != -1) {
                            if (errorAttribute.indexOf('validationtype') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event60') == -1) {
                                    thisValidate.trackingEvents += 'event60,';
                                    thisValidate.trackingDescriptions += 'Error números de tarjeta. ';
                                }

                            }

                            //•	Nº tarjeta Visa VY no reconocida – evento 61
                            if (errorAttribute.indexOf('valueinrange') != -1) {
                                if (thisValidate.trackingEvents.indexOf('event61') == -1) {
                                    thisValidate.trackingEvents += 'event61,';
                                    thisValidate.trackingDescriptions += 'Nº tarjeta Visa VY no reconocida. ';
                                }

                            }

                        }
                    }

                    //Itinerario
                    if (pageName.indexOf("/Itinerary.aspx") != -1) { }
                }
            }
            catch (e) { }
            if (thisValidate.errors) { this.errors += thisValidate.errors; }
            thisValidate.originalSetError(e, errorAttribute, defaultTypeError);
        };

        thisValidate.validateCardExpiration = function (e) {
            var cardexpiration = SKYSALES.Util.getAttributeValue($(e), thisValidate.cardexpirationAttribute);
            if (cardexpiration) {
                var myDate = new Date();
                var myMonth = (myDate.getMonth() + 1).toString();
                myMonth = myMonth.length == 1 ? "0" + myMonth : myMonth;
                var myYear = myDate.getFullYear();
                var dateCompare = parseInt(myYear + myMonth);
                var value = thisValidate.getValue(e);
                var idthis = e.id.replace("Month", "Year");
                var year = $('#' + idthis).val();
                var dateSelected = parseInt(year + value);
                if (dateSelected < dateCompare) {
                    thisValidate.setError(e, thisValidate.cardexpirationErrorAttribute, thisValidate.defaultcardexpirationErrorAttribute);
                }
            }
        };

        thisValidate.validateNameOrSurname = function (e) {
            var nameorsurname = SKYSALES.Util.getAttributeValue($(e), thisValidate.nameOrSurnameAttribute);
            if (nameorsurname) {
                var regName = /[0-9\\`~!@#$%^&*\(\)_=+\{\}"\/?.,;:¡?¿<>\|]/g;
                var value = thisValidate.getValue(e);
                var newstr = $.trim(value.replace(/[\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F]/gi, ''));
                var regLatin = /[\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F]/gi;
                if (value.match(regName) !== null || value.match(regLatin) == null || newstr.length != 0) {
                    thisValidate.setError(e, thisValidate.nameOrSurnameErrorAttribute, thisValidate.defaultresidentSurnamesErrorAttribute);
                }
            }
        };

        thisValidate.validateResidentSurnames = function (e) {
            var residentsurnames = SKYSALES.Util.getAttributeValue($(e), thisValidate.residentSurnamesAttribute);
            if (residentsurnames)
            {
                var total = 0;
                var surnameId = e.getAttribute("surnamesid");
                
                $("input[surnamesid=" + surnameId + "]").filter(function () {
                    total = total + this.value.length;
                });

                if (total > 31)
                    thisValidate.setError(e, thisValidate.residentSurnamesErrorAttribute, thisValidate.defaultnameOrSurnameErrorAttribute);
            }
        };

        //Manuel Gómez 23/11/2011
        // Validate that the value is in any range of the attribute valueInRangesAttribute
        // valueInRangesAttribute in an array json with the structure:



        thisValidate.validateValueInRanges = function (e) {
            var ranges = SKYSALES.Util.getAttributeValue($(e), thisValidate.valueInRangesAttribute),
                value = this.getValue(e),
                validValue = false,
                i = 0;

            if (value.substring(0, 4).toUpperCase() == "XXXX")
                return;

            if ((value !== null) && (ranges !== undefined) && (0 < ranges.length)) {
                for (i = 0; i < ranges.length; i += 1) {
                    if (parseFloat(value) >= ranges[i].startRange && parseFloat(value) <= ranges[i].endRange) {
                        validValue = true;
                    }
                }
                if (!validValue) {
                    thisValidate.setError(e, thisValidate.valueInRangesErrorAttribute, thisValidate.defaultValueInRangesError);
                }
            }

        };

        thisValidate.validateNotEqualsInput = function (e) {
            var equal = this.attributeValue(e, thisValidate.notEqualsInputAttribute),
                value = thisValidate.getValue(e);
            if ((value !== null) && (equal !== undefined) && (0 < equal.length)) {
                if (thisValidate.getValue($("#" + equal)) === value) {
                    if (this.attributeValue(e, thisValidate.notEqualsInputElementVisible) != '') {
                        thisValidate.setError(this.getById(this.attributeValue(e, thisValidate.notEqualsInputElementVisible)), thisValidate.notEqualsInputErrorAttribute, thisValidate.defaultNotEqualsInputError);
                    } else {
                        thisValidate.setError(e, thisValidate.notEqualsInputErrorAttribute, thisValidate.defaultNotEqualsInputError);
                    }
                }
            }
        };

        thisValidate.validateNotNumbersInput = function (e) {
            var notNumbers = this.attributeValue(e, thisValidate.notNumbersInputAttribute),
                value = thisValidate.getValue(e);
            var valueMatchNotNumbers = (value + "").match(/\d+/i);
            if (notNumbers && valueMatchNotNumbers)
                if (this.attributeValue(e, thisValidate.notNumbersInputElementVisible) != '') {
                    thisValidate.setError(this.getById(this.attributeValue(e, thisValidate.notNumbersInputElementVisible)), thisValidate.notNumbersInputErrorAttribute, thisValidate.defaultNotNumbersInputError);
                } else {
                    thisValidate.setError(e, thisValidate.notNumbersInputErrorAttribute, thisValidate.defaultNotNumbersInputError);
                }
        };

        thisValidate.validateIberiaPlusCode = function (e) {
            var sCCnum = SKYSALES.Util.getAttributeValue($(e), thisValidate.valueIberiaPlusAttribute),
            value = this.getValue(e),
            validValue = false,
            i = 0;

            var errorLabel = SKYSALES.Util.getAttributeValue($(e), thisValidate.valueIberiaPlusAttributeErrorAttribute);
            if (errorLabel == null || errorLabel == '') {
                errorLabel = thisValidate.defaultIberiaPlusError;
            }

            var res;
            var iTotal = 0;

            if ((sCCnum !== null) && (sCCnum !== undefined)) {
                //valor del campo length
                var CIBP = this.getById(e.id).val(); //valor campo código iberia plus
                var iNumLen = CIBP.length;
                if (iNumLen > 0) {
                    while (iNumLen > 0) {
                        var sTemp = CIBP.substr(iNumLen - 1, 1);
                        iTotal = iTotal + parseInt(sTemp);
                        sTemp = CIBP.substr(iNumLen - 2, 1);
                        var sTempMult = parseInt(sTemp) * 2 + "";
                        sTemp = sTempMult.substring(0, 1);
                        iTotal = iTotal + parseInt(sTemp);
                        if (sTempMult.length > 1) {
                            sTemp = sTempMult.substring(1, 2);
                            iTotal = iTotal + parseInt(sTemp);
                        }
                        iNumLen = iNumLen - 2;
                    }
                }

                if (CIBP.length % 2 == 1) {
                    sTemp = CIBP.substring(0, 1); iTotal = iTotal + parseInt(sTemp);
                }
                if (iTotal % 10 == 0 || CIBP.length == 0) {
                    if (CIBP.length != 8 && CIBP.length != 0) {
                        thisValidate.setError(e, thisValidate.valueInRangesErrorAttribute, errorLabel);
                        return false;
                    }
                } else {
                    thisValidate.setError(e, thisValidate.valueInRangesErrorAttribute, errorLabel);
                    return false;
                }
            }
            return "";
        };


        thisValidate.validatePassengerCount = function (e) {
            var thisValue = parseInt(thisValidate.getValue(e)),
                chdInput = null,
                chdInputValue = null,
                infantInput = null,
                infantInputValue = null,
                adtInput = null,
                adtInputValue = null;

            if (e.id.indexOf("PassengerType_ADT") != -1) {
                chdInput = this.getById(e.id.substring(0, e.id.length - "ADT".length) + "CHD");
                chdInputValue = chdInput.length ? thisValidate.getValue(chdInput) : 0;
                infantInput = this.getById(e.id.substring(0, e.id.length - "ADT".length) + "INFANT");
                infantInputValue = infantInput.length ? thisValidate.getValue(infantInput) : 0;
                adtInput = this.getById(e.id);
                adtInputValue = adtInput.length ? thisValidate.getValue(adtInput) : 0;

                if (thisValue == 0 && chdInputValue == 0) {
                    parent.setError(e, thisValidate.valuePassengerCountErrorAttribute, thisValidate.defaultPassengerCountError);
                }
            }
            else if (e.id.indexOf("PassengerType_INFANT") != -1) {
                adtInput = this.getById(e.id.substring(0, e.id.length - "INFANT".length) + "ADT");
                if (adtInput.length) {
                    if (thisValue > parseInt(thisValidate.getValue(adtInput))) {
                        parent.setError(e, thisValidate.valueInfantCountErrorAttribute, thisValidate.defaultInfantCountError);
                    }
                }
            }
        };

        thisValidate.validateUMAvailability = function (e) {
            var thisValue = thisValidate.getValue(e),
                dateInput = null,
                adtInput = null,
                numAdt = 0,
                date = null,
                tomorrow = null;

            if (e.id.indexOf("PassengerType_CHD") != -1) {
                adtInput = this.getById(e.id.substring(0, e.id.length - "CHD".length) + "ADT");
                dateInput = this.getById("date_picker_id_1");
                numAdt = adtInput.val();
                tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(23);
                tomorrow.setMinutes(59);
                tomorrow.setSeconds(59);
                date = Date.parse(dateInput.val());

                if (thisValue > 0 && numAdt == 0 && date < tomorrow) {
                    parent.setError(e, thisValidate.valueUMAvailabilityErrorAttribute, thisValidate.defaultUMAvailabilityError);
                }
            }
        };

        thisValidate.validateDobSelects = function (e) {
            var dayCombo, monthCombo, yearCombo;
            var day, month, year;
            //validamos fecha de nacimeinto
            var error = SKYSALES.Util.getAttributeValue($(e), thisValidate.dobSelectsErrorAttribute);
            if (error) {
                var validationData = SKYSALES.Util.getAttributeValue($(e), thisValidate.dobSelectsErrorDataAttribute);
                for (var i in validationData) {
                    if (validationData[i].indexOf('Day') > -1) { dayCombo = validationData[i]; }
                    else if (validationData[i].indexOf('Month') > -1) { monthCombo = validationData[i]; }
                    else if (validationData[i].indexOf('Year') > -1) { yearCombo = validationData[i]; }
                }

                day = this.getById(dayCombo).val();
                month = this.getById(monthCombo).val();
                year = this.getById(yearCombo).val();

                var notFullDate = (day == "none" || month == "none" || year == "none")
                    || (day == "" || month == "" || year == "");

                var date = new Date(year, month, day);
                if (isNaN(date.getTime()) || notFullDate) {
                    var copyerrorto = [];
                    if (day == 'none') { copyerrorto.push(dayCombo); }
                    if (month == 'none') { copyerrorto.push(monthCombo); }
                    if (year == 'none') { copyerrorto.push(yearCombo); }
                    SKYSALES.Util.setAttribute($(e), thisValidate.copyErrorToAttribute, copyerrorto);
                    thisValidate.setError(e, thisValidate.dobSelectsErrorAttribute, error);
                }
            }
        };


        thisValidate.runByElementId = function (idString) {
            var nodeArray = $(idString).get(),
                node = null,
                i = 0;
            // run validation on the form elements
            for (i = 0; i < nodeArray.length; i += 1) {
                node = nodeArray[i];
                thisValidate.validateSingleElement(node);
            }
            return false;
        };

        return thisValidate;
    };

    var OriginalMarketInputClass = SKYSALES.Class.MarketInput;
    SKYSALES.Class.MarketInput = function () {
        var parent = new OriginalMarketInputClass(),
            thisMarketInput = SKYSALES.Util.extendObject(parent),
            resource = SKYSALES.Util.getResource() || {};

        var residentesIdSelector = "";
        for (var j = 0; SKYSALES.Util.createObjectArray.length > j; j++) {
            var objectSkysales = SKYSALES.Util.createObjectArray[j];
            if (objectSkysales.json.residentFamNumSelectorId)
                residentesIdSelector = objectSkysales.json.residentFamNumSelectorId;
        }
        thisMarketInput.residentFamNumSelectorId = residentesIdSelector;
        thisMarketInput.residentFamNumSelector = null;

        thisMarketInput.originMarketArray = resource.originMarketArray;
        thisMarketInput.residentsMarketHash = resource.residentsMarketHash;
        thisMarketInput.residentsOriginMarketArray = resource.residentsOriginMarketArray;
        thisMarketInput.largeFamilyMarketHash = resource.largeFamilyMarketHash;
        thisMarketInput.largeFamilyOriginMarketArray = resource.largeFamilyOriginMarketArray;
        thisMarketInput.connectionsMarketHash = resource.connectionsMarketHash;
        thisMarketInput.macMarketHash = resource.macMarketHash;

        thisMarketInput.departureStationCodeId = '';
        thisMarketInput.arrivalStationCodeId = '';
        thisMarketInput.selectedSuggestionOrigenId = '';
        thisMarketInput.erroneousWordOrigenId = '';
        thisMarketInput.selectedSuggestionDestinationId = '';
        thisMarketInput.erroneousWordDestinationId = '';
        thisMarketInput.suggestionOriginId = '';
        thisMarketInput.suggestionDestinationId = '';
        thisMarketInput.buttonNewSearchId = '';

        thisMarketInput.originDescription = '';
        thisMarketInput.destinationDescription = '';

        thisMarketInput.departureStationCodeInput = null;
        thisMarketInput.arrivalStationCodeInput = null;
        thisMarketInput.buttonNewSearch = null;

        thisMarketInput.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();

            parent.init.call(this, json);

            // updateCalendarIcon won't work unless we wait until a bit of other work is done, so we put it at the end of the message queue.
            // we have to use "thisMarketInput", because JS sets "this" to the global object (window) when the callback is made.
            setTimeout(function () { thisMarketInput.updateCalendarIcon(); }, 0);
        };

        thisMarketInput.initObject = function () {
            thisMarketInput.departureStationCodeInput = this.getById(thisMarketInput.departureStationCodeId);
            thisMarketInput.arrivalStationCodeInput = this.getById(thisMarketInput.arrivalStationCodeId);
            thisMarketInput.buttonNewSearch = this.getById(thisMarketInput.buttonNewSearchId);
        };

        thisMarketInput.updateMarketOrigin = function (origin) {
            var marketHash = null,
                originArray = null,
                connections = [],
                destinationArray = [],
                json = {},
                marketsAndOrigins = thisMarketInput.getMarketsAndOrigins(),
                marketHash = marketsAndOrigins.marketHash,
                originArray = marketsAndOrigins.originArray;

            var stationDepartureCode = thisMarketInput.departureStationCodeInput.val();
            thisMarketInput.cleanMarketInput(parent.origin, stationDepartureCode, originArray);

            destinationArray = thisMarketInput.getDestinations(stationDepartureCode, marketHash);
            // Populate origins
            if (originArray != null) {
                json = {
                    "input": parent.origin,
                    "objectArray": originArray,
                    "showCode": false
                };
                SKYSALES.Util.populate(json);
            }

            // Populate destinations
            connections = thisMarketInput.connectionsMarketHash[stationDepartureCode] || [];
            destinationArray = destinationArray || [];

            for (var i = 0, ii = destinationArray.length; i < ii; i++)
                destinationArray[i].connection = thisMarketInput.findInConnection(connections, destinationArray[i].code);

            json = {
                "input": parent.destination,
                "objectArray": destinationArray,
                "showCode": false
            };
            SKYSALES.Util.populate(json);

            var stationArrivalCode = thisMarketInput.arrivalStationCodeInput.val();

            thisMarketInput.cleanMarketInput(parent.destination, stationArrivalCode, destinationArray);
        };

        thisMarketInput.populateMarketInput = function (input) {
            var json = {};

            var isOrigin = input && input.length > 0 && input[0].id.indexOf('Origin') > 0;

            if (isOrigin) {
                json = {
                    "input": input,
                    "objectArray": this.stationList,
                    "showCode": false,
                    "isBuyWithPoints": this.isBuyWithPoints,
                    "stationCodeId": thisMarketInput.departureStationCodeId,
                    "selectedSuggestionId": thisMarketInput.selectedSuggestionOrigenId,
                    "erroneousWordId": thisMarketInput.erroneousWordOrigenId,
                    "suggestionId": thisMarketInput.suggestionOriginId,
                    "buttonNewSearchId": thisMarketInput.buttonNewSearchId
                };
            } else {
                json = {
                    "input": input,
                    "objectArray": this.stationList,
                    "showCode": false,
                    "isBuyWithPoints": this.isBuyWithPoints,
                    "stationCodeId": thisMarketInput.arrivalStationCodeId,
                    "selectedSuggestionId": thisMarketInput.selectedSuggestionDestinationId,
                    "erroneousWordId": thisMarketInput.erroneousWordDestinationId,
                    "suggestionId": thisMarketInput.suggestionDestinationId,
                    "buttonNewSearchId": thisMarketInput.buttonNewSearchId
                };
            }

            SKYSALES.Util.populate(json);
        };

        thisMarketInput.findInConnection = function (connections, stationCode) {
            for (var j = 0, jj = connections.length; j < jj; j++)
                if (connections[j].code == stationCode)
                    return true;
            return false;
        };

        thisMarketInput.getMarketsAndOrigins = function () {
            var resOrFam = thisMarketInput.residentFamNumSelector.val(),
                marketHash = null, originArray = null;

            switch (resOrFam) {
                case 'resfam1':
                case 'resfam2':
                case 'res':
                    marketHash = thisMarketInput.residentsMarketHash;
                    originArray = this.residentsOriginMarketArray;
                    break;
                case 'fam1':
                case 'fam2':
                    marketHash = this.largeFamilyMarketHash;
                    originArray = this.largeFamilyOriginMarketArray;
                    break;
                default:
                    originArray = thisMarketInput.originMarketArray;
                    marketHash = parent.marketHash;
            }
            return {
                "marketHash": marketHash,
                "originArray": originArray
            };
        };

        thisMarketInput.getDestinations = function (origin, marketHash) {
            var destinationArray = [];

            if (marketHash[origin]) destinationArray = resource.removeCodeRepeated(marketHash[origin]);

            return destinationArray;
        };

        thisMarketInput.updateMarketDestination = function (origin, destination) {
            if (origin != '' && destination != '') {
                if (!(SKYSALES.common.isEmpty(parent.origin)) && !(SKYSALES.common.isEmpty(parent.destination))) {
                    origin = thisMarketInput.departureStationCodeInput.val();
                    destination = thisMarketInput.arrivalStationCodeInput.val();
                    var destinationArray = thisMarketInput.getDestinations(origin.toUpperCase(), thisMarketInput.getMarketsAndOrigins().marketHash);
                    thisMarketInput.cleanMarketInput(parent.destination, destination, destinationArray);
                }
            }
        };

        thisMarketInput.mergeStationArray = function (arrayA, arrayB) {
            var itemA, itemB = "";
            var arrayReturn = [];
            var station = {};
            var found = 0;
            for (var i = 0; arrayB.length > i; i++) {
                found = 0;
                itemB = arrayB[i];
                if (arrayA && arrayA.length > 0) {
                    for (var k = 0; arrayA.length > k; k++) {
                        itemA = arrayA[k];
                        if (itemA.code == itemB.code) found = 1;
                    }
                }
                if (found == 0) {
                    for (var j = 0; resource.originMarketArrayWithoutMac.length > j; j++) {
                        if (itemB.code == resource.originMarketArrayWithoutMac[j].code) { station = resource.originMarketArrayWithoutMac[j]; break; }
                    }
                    var response = itemB;
                    if (resource.isInMacArray(resource.originMarketArray, itemB.code) && station.macCode && station.macCode != "") {
                        var stationObj = { code: station.macCode, macCode: "", name: resource.stationInfoHash[station.macCode].name, CountryCode: station.CountryCode };
                        response = stationObj;
                    }
                    arrayReturn.push(response);
                }
            }
            return arrayReturn;
        };

        thisMarketInput.cleanMarketInput = function (input, code, allowedMarketsArray) {
            var found = false, foundName = false, selectedValue = input.val();
            if ((input.length !== 0) && (code != undefined)) {
                for (var i = 0, ii = allowedMarketsArray.length; i < ii; i++) {
                    if (allowedMarketsArray[i].code.toUpperCase() == code.toUpperCase()) {
                        found = true; break;
                    }

                    if (allowedMarketsArray[i].name != undefined &&
                    (allowedMarketsArray[i].name.toUpperCase().indexOf(selectedValue.toUpperCase()) == 0 ||
                    selectedValue.toUpperCase().indexOf(allowedMarketsArray[i].name.toUpperCase()) == 0)) {
                        foundName = true; break;
                    }
                }
                if (!found && !foundName)
                    input.val('');
                if (foundName || found)
                    input.val(selectedValue);
            }
        };

        thisMarketInput.setVars = function () {
            var calButtons = $(".ui-datepicker-trigger", this.container);

            parent.setVars.call(this);
            this.residentFamNumSelector = this.getById(this.residentFamNumSelectorId);
        };

        thisMarketInput.addEvents = function () {
            parent.addEvents.call(this);

            this.destination.change(this.updateMarketDestinationHandler);
            this.residentFamNumSelector.change(this.updateResidentFamNumSelectorHandler);
        };

        thisMarketInput.updateResidentFamNumSelectorHandler = function () {
            thisMarketInput.updateResidentFamNumSelector();
        };

        thisMarketInput.updateResidentFamNumSelector = function () {
            var origin = parent.origin.val();
            var marketArr = SKYSALES.Resource.originMarketArray;
            for (var i in marketArr) {
                if (SKYSALES.Resource.originMarketArray[i].name == origin)
                    origin = SKYSALES.Resource.originMarketArray[i].code;
            }
            this.updateMarketOrigin(origin);
            if (thisMarketInput.residentFamNumSelector.val() != "" && parent.destination.val() == "") {
                thisMarketInput.buttonNewSearch.click();
            }
        };

        thisMarketInput.toggleMarketHandler = function () {
            thisMarketInput.toggleMarket();
        };

        thisMarketInput.toggleMarket = function () {
            parent.toggleMarket.call(this);
            this.updateCalendarIcon();
        };

        thisMarketInput.updateCalendarIcon = function () {
            var calButtons = $(".ui-datepicker-trigger", this.container);
            if ($('select:disabled', this.container).length > 0) {
                calButtons.hide();
            } else {
                calButtons.show();
            }
        };

        thisMarketInput.updateMarketOriginHandler = function () {
            if (SKYSALES.common.isEmpty(thisMarketInput.departureStationCodeInput))
                $(this).val(thisMarketInput.originDescription);
            else {
                var origin = thisMarketInput.departureStationCodeInput.val();
                thisMarketInput.updateMarketOrigin(origin);
            }
        };

        thisMarketInput.updateMarketDestinationHandler = function () {
            if (SKYSALES.common.isEmpty(thisMarketInput.arrivalStationCodeInput))
                $(this).val(thisMarketInput.destinationDescription);
            else {
                var destination = thisMarketInput.arrivalStationCodeInput.val();
                if (destination.length === 3) {
                    var instation = false;
                    for (var i in SKYSALES.Resource.stationInfoHash) {
                        var destinationComb = SKYSALES.Resource.stationInfoHash[i].name;
                        if (SKYSALES.Resource.stationInfoHash[i].code.toUpperCase().indexOf(destination) != -1) {
                            instation = true;
                            $(this).val(destinationComb);
                        }
                    }
                    for (var i in SKYSALES.Resource.macInfoHash) {
                        destinationComb = SKYSALES.Resource.macInfoHash[i].name;
                        if (SKYSALES.Resource.macInfoHash[i].code.toUpperCase().indexOf(destination) != -1) {
                            instation = true;
                            $(this).val(destinationComb);
                        }
                    }
                    if (!instation) thisMarketInput.arrivalStationCodeInput.val('');
                } else if (destination.length > 3) {
                    instation = false;
                    for (var i in SKYSALES.Resource.stationInfoHash) {
                        destinationComb = SKYSALES.Resource.stationInfoHash[i].name;
                        if ($(this).val() == destinationComb) {
                            instation = true;
                        }
                        if (SKYSALES.Resource.stationInfoHash[i].name.toUpperCase() == destination) {
                            $(this).val(destinationComb);
                            instation = true;
                        }
                    }
                    for (var i in SKYSALES.Resource.macInfoHash) {
                        destinationComb = SKYSALES.Resource.macInfoHash[i].name;
                        if ($(this).val() == destinationComb) {
                            instation = true;
                        }
                        if (SKYSALES.Resource.macInfoHash[i].name.toUpperCase() == destination) {
                            $(this).val(destinationComb);
                            instation = true;
                        }
                    }
                    if (!instation) $(this).val('');
                }

                var origin = thisMarketInput.departureStationCodeInput.val();
                destination = thisMarketInput.arrivalStationCodeInput.val();

                thisMarketInput.updateMarketDestination(origin, destination);
            }
        };

        return thisMarketInput;
    };


    VUELING.Class.NewSearchFlightSearch = function (json) {
        json = json || {};
        var parent = SKYSALES.Class.Resource(),
            thisNewSearchFlightSearch = SKYSALES.Util.extendObject(parent);

        thisNewSearchFlightSearch.newSearchButtonId = '';
        thisNewSearchFlightSearch.newSearchCloseButtonId = '';
        thisNewSearchFlightSearch.newSearchSearcherId = '';
        thisNewSearchFlightSearch.searchButtonId = '';

        thisNewSearchFlightSearch.newSearchButton = null;
        thisNewSearchFlightSearch.searchButton = null;
        thisNewSearchFlightSearch.newSearchCloseButton = '';

        thisNewSearchFlightSearch.newSearchButtonActionRedirect = false;
        thisNewSearchFlightSearch.newSearchButtonActionHref = '';

        thisNewSearchFlightSearch.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
            this.addEvents();
        };

        thisNewSearchFlightSearch.initObject = function () {
            thisNewSearchFlightSearch.newSearchButton = this.getById(thisNewSearchFlightSearch.newSearchButtonId);
            thisNewSearchFlightSearch.searchButton = this.getById(thisNewSearchFlightSearch.searchButtonId);
            thisNewSearchFlightSearch.newSearchCloseButton = this.getById(thisNewSearchFlightSearch.newSearchCloseButtonId);

            thisNewSearchFlightSearch.blockUI = new SKYSALES.Class.BlockedPopUp();
            var json = {};
            json.closeElement = thisNewSearchFlightSearch.newSearchCloseButton;
            json.properties = { css: { width: '710px' } };
            thisNewSearchFlightSearch.blockUI.init(json);

        };

        thisNewSearchFlightSearch.addEvents = function () {
            if (this.newSearchButtonActionRedirect) {
                thisNewSearchFlightSearch.newSearchButton.attr('href', this.newSearchButtonActionHref);
            }
            else {
                thisNewSearchFlightSearch.newSearchButton.click(thisNewSearchFlightSearch.openSearcher);
            }
            thisNewSearchFlightSearch.searchButton.click(thisNewSearchFlightSearch.submitSearcher);
        };

        thisNewSearchFlightSearch.openSearcher = function () {
            window.scrollTo(0, 0);
            thisNewSearchFlightSearch.blockUI.show(thisNewSearchFlightSearch.newSearchSearcherId);
            $(".blockUI.sectionBorder_lightBox.blockPage").css("position", "absolute");
        };

        thisNewSearchFlightSearch.submitSearcher = function (e) {
            e.preventDefault();
            SKYSALES.Util.ValidateAndAppendToSkySalesAndPostBack(thisNewSearchFlightSearch.newSearchSearcherId, this);
        };

        return thisNewSearchFlightSearch;
    };

    VUELING.Class.PromoCarnetJove = function (json) {
        json = json || {};
        var parent = SKYSALES.Class.Resource(),
            thisPromoCarnetJove = SKYSALES.Util.extendObject(parent);

        thisPromoCarnetJove.searcher = null;


        thisPromoCarnetJove.minAdultPassengersNum = null;
        thisPromoCarnetJove.minChildPassengersNum = null;
        thisPromoCarnetJove.minInfantPassengersNum = null;
        thisPromoCarnetJove.maxAdultPassengersNum = null;
        thisPromoCarnetJove.maxChildPassengersNum = null;
        thisPromoCarnetJove.maxInfantPassengersNum = null;
        thisPromoCarnetJove.enableDiscountList = null;
        thisPromoCarnetJove.disableDiscountList = null;
        thisPromoCarnetJove.disableOneWay = null;
        thisPromoCarnetJove.enableOneWay = null;
        thisPromoCarnetJove.disableRoundTrip = null;
        thisPromoCarnetJove.enableRoundTrip = null;
        thisPromoCarnetJove.minDateDeparture = null;
        thisPromoCarnetJove.maxDateDeparture = null;
        thisPromoCarnetJove.minDateReturn = null;
        thisPromoCarnetJove.maxDateReturn = null;

        thisPromoCarnetJove.init = function (json) {
            this.setSettingsByObject(json);
            this.searcher = VUELING.Util.getObjectInstance("vuelingSearcher");
            this.initSearcher();
        };

        thisPromoCarnetJove.initSearcher = function () {
            if (this.searcher != null) {
                if (this.minAdultPassengersNum != null) {
                    this.searcher.setMinAdultPassengersNum(this.minAdultPassengersNum);
                }
                if (this.minChildPassengersNum != null) {
                    this.searcher.setMinChildPassengersNum(this.minChildPassengersNum);
                }
                if (this.minInfantPassengersNum != null) {
                    this.searcher.setMinInfantPassengersNum(this.minInfantPassengersNum);
                }
                if (this.maxAdultPassengersNum != null) {
                    this.searcher.setMaxAdultPassengersNum(this.maxAdultPassengersNum);
                    this.searcher.setMaxTotalPassengersNum(this.maxAdultPassengersNum);
                }
                if (this.maxChildPassengersNum != null) {
                    this.searcher.setMaxChildPassengersNum(this.maxChildPassengersNum);
                }
                if (this.maxInfantPassengersNum != null) {
                    this.searcher.setMaxInfantPassengersNum(this.maxInfantPassengersNum);
                }
                if (this.enableDiscountList != null) {
                    this.searcher.enableDiscountList();
                }
                if (this.disableDiscountList != null) {
                    this.searcher.disableDiscountList();
                }
                if (this.disableOneWay != null) {
                    this.searcher.disableOneWay();
                }
                if (this.enableOneWay != null) {
                    this.searcher.enableOneWay();
                }
                if (this.disableRoundTrip != null) {
                    this.searcher.disableRoundTrip();
                }
                if (this.enableRoundTrip != null) {
                    this.searcher.enableRoundTrip();
                }
                if (this.minDateDeparture != null) {
                    var day = this.minDateDeparture.substr(0, 2),
                        month = this.minDateDeparture.substr(3, 2),
                        year = this.minDateDeparture.substr(6);
                    this.searcher.setMinDateDeparture(year, month, day);
                }
                if (this.maxDateDeparture != null) {
                    var day = this.minDateDeparture.substr(0, 2),
                        month = this.minDateDeparture.substr(3, 2),
                        year = this.minDateDeparture.substr(6);
                    this.searcher.setMaxDateDeparture(year, month, day);
                }
                if (this.minDateReturn != null) {
                    var day = this.minDateReturn.substr(0, 2),
                        month = this.minDateReturn.substr(3, 2),
                        year = this.minDateReturn.substr(6);
                    this.searcher.setMinDateReturn(year, month, day);
                }
                if (this.maxDateReturn != null) {
                    var day = this.maxDateReturn.substr(0, 2),
                        month = this.maxDateReturn.substr(3, 2),
                        year = this.maxDateReturn.substr(6);
                    this.searcher.setMaxDateReturn(year, month, day);
                }
            }
        };

        return thisPromoCarnetJove;
    };

    VUELING.Class.BlankDaysAndPromoDays = function () {

        var parent = new SKYSALES.Class.SkySales(),
            thisBlankDaysAndPromoDays = SKYSALES.Util.extendObject(parent);

        thisBlankDaysAndPromoDays.Departure = "";
        thisBlankDaysAndPromoDays.Arrival = "";
        thisBlankDaysAndPromoDays.PromoName = "";
        thisBlankDaysAndPromoDays.CalendarArray = [];

        thisBlankDaysAndPromoDays.JsonToObject = function (json) {

            var blankDaysAndPromoDaysObject = json;

            if (blankDaysAndPromoDaysObject == undefined || blankDaysAndPromoDaysObject == null || blankDaysAndPromoDaysObject.Calendar.length == 0 || blankDaysAndPromoDaysObject.Calendar[0] == undefined)
                return;

            thisBlankDaysAndPromoDays.Departure = blankDaysAndPromoDaysObject.Departure;
            thisBlankDaysAndPromoDays.Arrival = blankDaysAndPromoDaysObject.Arrival;
            thisBlankDaysAndPromoDays.PromoName = blankDaysAndPromoDaysObject.PromoName;
            thisBlankDaysAndPromoDays.PromoColor = blankDaysAndPromoDaysObject.PromoColor;

            for (var i = 0; i < blankDaysAndPromoDaysObject.Calendar.length; i++) {

                var calendarItem = {
                    Year: blankDaysAndPromoDaysObject.Calendar[i].Year,
                    Month: blankDaysAndPromoDaysObject.Calendar[i].Month,
                    FirstFlightDay: blankDaysAndPromoDaysObject.Calendar[i].FirstFlightDay,
                    BlankDays: blankDaysAndPromoDaysObject.Calendar[i].BlankDays,
                    PromoDays: blankDaysAndPromoDaysObject.Calendar[i].PromoDays
                };

                thisBlankDaysAndPromoDays.CalendarArray.push(calendarItem);
            }
        };

        return thisBlankDaysAndPromoDays;
    };

    VUELING.Class.VuelingSearcher = function (json) {
        json = json || {};
        var parent = SKYSALES.Class.Resource(),
            thisVuelingSearcher = SKYSALES.Util.extendObject(parent);

        // "Public"
        thisVuelingSearcher.residentFamNumButtonId = "";
        thisVuelingSearcher.residentFamNumSelectorDivId = "";
        thisVuelingSearcher.residentFamNumSelectorId = "";
        thisVuelingSearcher.discountDropDownLinkId = "";
        thisVuelingSearcher.discountDivId = "";
        thisVuelingSearcher.discountCodeId = "";
        thisVuelingSearcher.originInputId = "";
        thisVuelingSearcher.destinationInputId = "";
        thisVuelingSearcher.departureDateInputId = "";
        thisVuelingSearcher.returnDateInputId = "";
        thisVuelingSearcher.flightSearchObjectName = "";
        thisVuelingSearcher.radioButtonMarketStructureName = "";
        thisVuelingSearcher.monthShowedMarket1 = '';
        thisVuelingSearcher.roundTripRadioId = "";
        thisVuelingSearcher.oneWayRadioId = "";
        thisVuelingSearcher.discountListId = "";
        thisVuelingSearcher.passengerCountADTDropDownId = "AvailabilitySearchInputSearchView_DropDownListPassengerType_ADT";
        thisVuelingSearcher.passengerCountCHDDropDownId = "AvailabilitySearchInputSearchView_DropDownListPassengerType_CHD";
        thisVuelingSearcher.passengerCountINFANTDropDownId = "AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT";
        thisVuelingSearcher.loadingImgUrl = "";
        thisVuelingSearcher.checkRoutesUrl = "";
        thisVuelingSearcher.operatingDatesMessageHtml = "";
        thisVuelingSearcher.maxCHDUM = 6; //valor por defecto. Esta en Configuration.UM.ServiceLibrary (maxUMbyFlight) el valor.
        thisVuelingSearcher.labelOrigin = "Origen";
        thisVuelingSearcher.labelDestination = "Destino";
        thisVuelingSearcher.checkRoutesMonthRange = "";
        thisVuelingSearcher.calendarImgAltAttr = "";
        thisVuelingSearcher.calendarImgElementClass = ".ui-datepicker-trigger";

        thisVuelingSearcher.openJawRadioId = "";
        thisVuelingSearcher.originInputId2 = "";
        thisVuelingSearcher.destinationInputId2 = "";
        thisVuelingSearcher.isOpenJawChecked = "";

        thisVuelingSearcher.departureStationCodeId1 = "";
        thisVuelingSearcher.arrivalStationCodeId1 = "";
        thisVuelingSearcher.departureStationCodeId2 = "";
        thisVuelingSearcher.arrivalStationCodeId2 = "";

        thisVuelingSearcher.suggestionOriginId1 = "";
        thisVuelingSearcher.suggestionDestinationId1 = "";
        thisVuelingSearcher.suggestionOriginId2 = "";
        thisVuelingSearcher.suggestionDestinationId2 = "";

        // "Private"
        thisVuelingSearcher.residentFamNumButton = null;
        thisVuelingSearcher.residentFamNumSelectorDiv = null;
        thisVuelingSearcher.residentFamNumSelector = null;
        thisVuelingSearcher.discountDropDownLink = null;
        thisVuelingSearcher.discountDiv = null;
        thisVuelingSearcher.discountCode = null;
        thisVuelingSearcher.originInput = null;
        thisVuelingSearcher.originDownArrowInput = null;
        thisVuelingSearcher.destinationInput = null;
        thisVuelingSearcher.destinationDownArrowInput = null;
        thisVuelingSearcher.departureDateInput = null;
        thisVuelingSearcher.returnDateInput = null;
        thisVuelingSearcher.flightSearchObject = null;
        thisVuelingSearcher.departureDatepicker = null;
        thisVuelingSearcher.departureDatepickerManager = null;
        thisVuelingSearcher.returnDatepicker = null;
        thisVuelingSearcher.returnDatepickerManager = null;
        thisVuelingSearcher.roundTripRadio = null;
        thisVuelingSearcher.oneWayRadio = null;
        thisVuelingSearcher.discountList = null;
        thisVuelingSearcher.passengerCountADTDropDown = null;
        thisVuelingSearcher.passengerCountCHDDropDown = null;
        thisVuelingSearcher.passengerCountINFANTDropDown = null;
        thisVuelingSearcher.resource = SKYSALES.Util.getResource() || {};
        thisVuelingSearcher.datepickerDivId = "ui-datepicker-div";
        thisVuelingSearcher.checkRoutesTimeout = 5000;
        thisVuelingSearcher.lastTimestampFocusClickOrigin = 0;
        thisVuelingSearcher.lastTimestampFocusClickDestination = 0;
        thisVuelingSearcher.airportListPressedKey = null;
        thisVuelingSearcher.maxPassengersNum = null;
        thisVuelingSearcher.labelErrorMaxPassengers = "error";
        thisVuelingSearcher.isPuntoSearcher = false;
        thisVuelingSearcher.laberErrorPuntoSearcherRestriction = "error";
        thisVuelingSearcher.idDivResidentes = "";

        thisVuelingSearcher.openJawRadio = null;
        thisVuelingSearcher.originInput2 = null;
        thisVuelingSearcher.originDownArrowInput2 = null;
        thisVuelingSearcher.destinationInput2 = null;
        thisVuelingSearcher.destinationDownArrowInput2 = null;

        thisVuelingSearcher.departureStationCodeInput1 = null;
        thisVuelingSearcher.arrivalStationCodeInput1 = null;
        thisVuelingSearcher.departureStationCodeInput2 = null;
        thisVuelingSearcher.arrivalStationCodeInput2 = null;

        thisVuelingSearcher.suggestionOriginInput1 = null;
        thisVuelingSearcher.suggestionDestinationInput1 = null;
        thisVuelingSearcher.suggestionOriginInput2 = null;
        thisVuelingSearcher.suggestionDestinationInput2 = null;

        thisVuelingSearcher.ButtonForClickToSearchMulticity = null;
        thisVuelingSearcher.ButtonForClickToSearchMulticityId = null;
        thisVuelingSearcher.ButtonForClickToSearchNormal = null;
        thisVuelingSearcher.ButtonForClickToSearchNormalId = null;

        thisVuelingSearcher.promoUniversalDatapickerLegend = '';
        thisVuelingSearcher.BlankDaysAndPromoDays = null;

        thisVuelingSearcher.moreText = '';

        this.RouteDataManager = function () {

            this.RouteData = function (data) {
                this.OriginStationCode = data.Departure;
                this.DestinationStationCode = data.Arrival;
                this.FirstAvailableDate = new Date();
                this.NonAvailableDates = [];
                this.PromoDates = [];

                this.CacheData = data;

                this.IntializeProperties = function () {
                    this.GetBlankDates();
                    this.GetFirstAvailableDate();
                    this.GetPromoDates();
                };

                this.GetBlankDates = function () {
                    if (this.CacheData.CalendarArray == null || this.CacheData.CalendarArray.length == 0 || this.CacheData.CalendarArray[0] == undefined)
                        return;

                    for (var i = 0; i < this.CacheData.CalendarArray.length; i++) {
                        var calendarItem = this.CacheData.CalendarArray[i];

                        for (var j = 0; j < calendarItem.BlankDays.length; j++) {
                            var nonAvailableDates = new Date(calendarItem.Year, calendarItem.Month - 1, calendarItem.BlankDays[j]);
                            this.NonAvailableDates.push(nonAvailableDates);
                        }
                    }
                };

                this.GetFirstAvailableDate = function () {
                    this.FirstAvailableDate = new Date();

                    if (this.CacheData.CalendarArray == null || this.CacheData.CalendarArray.length == 0 || this.CacheData.CalendarArray[0] == undefined)
                        return;

                    for (var i = 0; i < this.CacheData.CalendarArray.length; i++) {
                        var calendarItem = this.CacheData.CalendarArray[i];
                        if (calendarItem.FirstFlightDay != 0) {
                            this.FirstAvailableDate = new Date(calendarItem.Year, calendarItem.Month - 1, calendarItem.FirstFlightDay);
                            return;
                        }
                    }
                };

                this.GetPromoDates = function () {
                    if (this.CacheData.CalendarArray == null || this.CacheData.CalendarArray.length == 0 || this.CacheData.CalendarArray[0] == undefined)
                        return;

                    for (var i = 0; i < this.CacheData.CalendarArray.length; i++) {
                        var calendarItem = this.CacheData.CalendarArray[i];

                        for (var j = 0; j < calendarItem.PromoDays.length; j++) {
                            var promoDates = new Date(calendarItem.Year, calendarItem.Month - 1, calendarItem.PromoDays[j]);
                            this.PromoDates.push(promoDates);
                        }
                    }
                };
            };

            this.RouteDataArray = [];

            this.AddRouteData = function (data) {
                var routeData = new this.RouteData(data);
                routeData.IntializeProperties();
                this.RouteDataArray.push(routeData);
            };

            this.GetRouteDataByStationCodes = function (originStationCode, destinationStationCode) {
                var result = null;
                for (var i = 0; i < this.RouteDataArray.length; i++) {
                    var current = this.RouteDataArray[i];
                    if (current.OriginStationCode == originStationCode && current.DestinationStationCode == destinationStationCode) {
                        result = current;
                        break;
                    }
                }
                return result;
            };


        };

        thisVuelingSearcher.RouteDataManager = new this.RouteDataManager();

        thisVuelingSearcher.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
            this.addEvents();
            this.initUI();
        };

        thisVuelingSearcher.initUI = function () {
            if (this.originInput.val() == '') {
                this.originInput.val(thisVuelingSearcher.labelOrigin);
            }
            if (this.destinationInput.val() == '') {
                this.destinationInput.val(thisVuelingSearcher.labelDestination);
            }

            if (this.originInput2.val() == '')
                this.originInput2.val(thisVuelingSearcher.labelOrigin);
            if (this.destinationInput2.val() == '')
                this.destinationInput2.val(thisVuelingSearcher.labelDestination);

            this.changeCalendarImgAttr();
        };

        thisVuelingSearcher.initObject = function () {
            thisVuelingSearcher.moreText = $('#adtSelectorDropdown').data('more');
            this.residentFamNumButton = this.getById(this.residentFamNumButtonId);
            this.residentFamNumSelectorDiv = this.getById(this.residentFamNumSelectorDivId);
            this.residentFamNumSelector = this.getById(this.residentFamNumSelectorId);
            this.discountDropDownLink = this.getById(this.discountDropDownLinkId);
            this.discountDiv = this.getById(this.discountDivId);
            this.discountCode = this.getById(this.discountCodeId);
            this.originInput = this.getById(this.originInputId);
            this.originDownArrowInput = $('#' + this.originInputId + 'DownArrowInput');
            this.destinationInput = this.getById(this.destinationInputId);
            this.destinationDownArrowInput = $('#' + this.destinationInputId + 'DownArrowInput');

            this.originInput2 = this.getById(this.originInputId2);
            this.originDownArrowInput2 = $('#' + this.originInputId2 + 'DownArrowInput');
            this.destinationInput2 = this.getById(this.destinationInputId2);
            this.destinationDownArrowInput2 = $('#' + this.destinationInputId2 + 'DownArrowInput');
            this.openJawRadio = $('label[for="' + this.openJawRadioId + '"]');

            this.departureStationCodeInput1 = this.getById(this.departureStationCodeId1);
            this.arrivalStationCodeInput1 = this.getById(this.arrivalStationCodeId1);
            this.departureStationCodeInput2 = this.getById(this.departureStationCodeId2);
            this.arrivalStationCodeInput2 = this.getById(this.arrivalStationCodeId2);

            this.suggestionOriginInput1 = this.getById(this.suggestionOriginId1);
            this.suggestionDestinationInput1 = this.getById(this.suggestionDestinationId1);
            this.suggestionOriginInput2 = this.getById(this.suggestionOriginId2);
            this.suggestionDestinationInput2 = this.getById(this.suggestionDestinationId2);

            this.ButtonForClickToSearchMulticity = this.getById(this.ButtonForClickToSearchMulticityId);
            this.ButtonForClickToSearchNormal = this.getById(this.ButtonForClickToSearchNormalId);

            this.departureDateInput = this.getById(this.departureDateInputId);
            this.returnDateInput = this.getById(this.returnDateInputId);
            this.roundTripRadio = this.getById(this.roundTripRadioId);
            this.oneWayRadio = $('label[for="' + this.oneWayRadioId + '"]');
            this.discountList = this.getById(this.discountListId);
            this.passengerCountADTDropDown = this.getById(this.passengerCountADTDropDownId);
            this.passengerCountCHDDropDown = this.getById(this.passengerCountCHDDropDownId);
            this.passengerCountINFANTDropDown = this.getById(this.passengerCountINFANTDropDownId);

            if (thisVuelingSearcher.flightSearchObjectName != '') {
                this.flightSearchObject = this.getObjectInstance(thisVuelingSearcher.flightSearchObjectName);
                this.departureDatepickerManager = this.flightSearchObject.marketArray[0].marketDateArray[0].datePickerManager;
                this.departureDatepicker = this.departureDatepickerManager.linkedDate;
                this.returnDatepickerManager = this.flightSearchObject.marketArray[1].marketDateArray[0].datePickerManager;
                this.returnDatepicker = this.returnDatepickerManager.linkedDate;
            }

            if (this.departureDatepicker != null) {
                this.departureDatepicker.manager = this.flightSearchObject.marketArray[0].marketDateArray[0].datePickerManager;
                this.departureDatepicker.datepicker("option", {
                    "showButtonPanel": true,
                    "firstDay": 1,
                    "minDate": new Date(),
                    "onChangeMonthYear": function (year, month, inst) {
                        var origin = thisVuelingSearcher.departureStationCodeInput1.val();
                        var destination = thisVuelingSearcher.arrivalStationCodeInput1.val();
                        var existsStationsInResources = thisVuelingSearcher.existsStationsInResource(origin, destination);

                        var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);
                        if (routeData != null)
                            thisVuelingSearcher.updateDistantOperationsDates(routeData, true);
                        if (!(origin != '' && destination != '' && existsStationsInResources == true && routeData == null)) {
                            setTimeout(thisVuelingSearcher.insertLegend, 10, origin, destination);
                        }
                    },
                    "beforeShow": function (input, inst) {
                        var origin = thisVuelingSearcher.departureStationCodeInput1.val();
                        var destination = thisVuelingSearcher.arrivalStationCodeInput1.val();

                        var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);
                        var existsStationsInResources = thisVuelingSearcher.existsStationsInResource(origin, destination);

                        if (origin != '' && destination != '' && existsStationsInResources == true && routeData == null) {
                            var dpId = $(inst.dpDiv).attr('id');
                            var date = new Date();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();

                            thisVuelingSearcher.disableDatePicker(dpId);

                            thisVuelingSearcher.checkRoutesAndPromoUniversal(month, year, origin, destination, "SKYSALES_Util_checkRoutesAndPromoUniversalDepartureCallback", "SKYSALES_Util_checkRoutesAndPromoUniversalDepartureErrorCallback");
                        }
                        else {
                            if (routeData != null)
                                thisVuelingSearcher.updateDistantOperationsDates(routeData, true);
                            thisVuelingSearcher.insertLegend(origin, destination);
                        }
                    },
                    "beforeShowDay": function (date) {
                        var origin = thisVuelingSearcher.departureStationCodeInput1.val();
                        var destination = thisVuelingSearcher.arrivalStationCodeInput1.val();
                        var result = true;

                        if (origin != '' && destination != '')
                            result = thisVuelingSearcher.checkRoutesDayMarkets(date, origin, destination);

                        var isInPromoUniversal = thisVuelingSearcher.checkPromoUniversalDayMarkets(date, origin, destination);
                        if (isInPromoUniversal == false) {
                            return [result, ''];
                        }
                        else {
                            return [result, 'ui-state-promo'];
                        }
                    },
                    "onClose": function (departureDate) {
                        var returnDate = thisVuelingSearcher.returnDatepicker.datepicker("getDate");
                        departureDate = thisVuelingSearcher.parseDate(departureDate);
                        var returnDateToUpdate = departureDate;
                        var isNecessaryToUpdateReturnDate = false;

                        if (returnDate < departureDate) {
                            isNecessaryToUpdateReturnDate = true;
                        }

                        if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                            if (returnDate <= departureDate && thisVuelingSearcher.AreEqualsJourneyOriginAndDestination()) {
                                returnDateToUpdate.setDate(departureDate.getDate() + 1);
                                isNecessaryToUpdateReturnDate = true;
                            }
                        }

                        if (isNecessaryToUpdateReturnDate) {
                            thisVuelingSearcher.returnDatepickerManager.setYearMonthAndDayInputHandler($.datepicker.formatDate("yy-mm-dd", returnDateToUpdate));
                            thisVuelingSearcher.returnDatepicker.datepicker("setDate", returnDateToUpdate);
                            thisVuelingSearcher.returnDateInput.val($.datepicker.formatDate("DD dd MM", returnDateToUpdate));
                        }

                        if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                            var origin = thisVuelingSearcher.departureStationCodeInput2.val();
                            if (origin == '')
                                thisVuelingSearcher.originInput2.focus();
                        } else {
                            thisVuelingSearcher.returnDatepicker.datepicker("option", "minDate", departureDate);
                            thisVuelingSearcher.returnDatepicker.datepicker("option", "showButtonPanel", true);
                        }
                    }
                });
            }

            if (this.returnDatepicker != null) {
                this.returnDatepicker.manager = this.flightSearchObject.marketArray[1].marketDateArray[0].datePickerManager;
                this.returnDatepicker.datepicker("option", {
                    "showButtonPanel": true,
                    "firstDay": 1,
                    "minDate": this.departureDatepicker.datepicker("getDate"),
                    "onChangeMonthYear": function (year, month, inst) {
                        var origin = thisVuelingSearcher.departureStationCodeInput1.val();
                        var destination = thisVuelingSearcher.arrivalStationCodeInput1.val();

                        if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                            origin = thisVuelingSearcher.departureStationCodeInput2.val();
                            destination = thisVuelingSearcher.arrivalStationCodeInput2.val();
                        }

                        var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);
                        if (routeData != null)
                            thisVuelingSearcher.updateDistantOperationsDates(routeData, true);
                        var existsStationsInResources = thisVuelingSearcher.existsStationsInResource(origin, destination);

                        if (!(origin != '' && destination != '' && existsStationsInResources == true && routeData == null)) {
                            setTimeout(thisVuelingSearcher.insertLegend, 10, origin, destination);
                        }
                    },
                    "beforeShow": function (input, inst) {
                        var origin = thisVuelingSearcher.arrivalStationCodeInput1.val();
                        var destination = thisVuelingSearcher.departureStationCodeInput1.val();

                        if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                            origin = thisVuelingSearcher.departureStationCodeInput2.val();
                            destination = thisVuelingSearcher.arrivalStationCodeInput2.val();
                        }

                        var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);
                        var existsStationsInResources = thisVuelingSearcher.existsStationsInResource(origin, destination);

                        if (origin != '' && destination != '' && existsStationsInResources == true && routeData == null) {
                            var dpId = $(inst.dpDiv).attr('id');
                            var date = new Date();
                            var month = date.getMonth() + 1;
                            var year = date.getFullYear();

                            thisVuelingSearcher.disableDatePicker(dpId);
                            thisVuelingSearcher.checkRoutesAndPromoUniversal(month, year, origin, destination, "SKYSALES_Util_checkRoutesAndPromoUniversalReturnCallback", "SKYSALES_Util_checkRoutesAndPromoUniversalReturnErrorCallback");
                        }
                        else {
                            if (routeData != null)
                                thisVuelingSearcher.updateDistantOperationsDates(routeData, true);
                            thisVuelingSearcher.insertLegend(origin, destination);
                        }
                    },
                    "beforeShowDay": function (date) {
                        var departureDate = thisVuelingSearcher.departureDatepicker.datepicker("getDate");
                        var result = thisVuelingSearcher.checkReturnDate(departureDate, date);
                        var origin = thisVuelingSearcher.arrivalStationCodeInput1.val();
                        var destination = thisVuelingSearcher.departureStationCodeInput1.val();

                        if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                            origin = thisVuelingSearcher.departureStationCodeInput2.val();
                            destination = thisVuelingSearcher.arrivalStationCodeInput2.val();
                        }

                        if (result) {
                            result = thisVuelingSearcher.checkRoutesDayMarkets(date, origin, destination);
                        }

                        var isInPromoUniversal = thisVuelingSearcher.checkPromoUniversalDayMarkets(date, origin, destination);
                        if (isInPromoUniversal == false) {
                            return [result, ''];
                        }
                        else {
                            return [result, 'ui-state-promo'];
                        }
                    }
                });
            }
            //para que se muestren los value correctos en los select
            thisVuelingSearcher.passengerCountADTDropDownChange();
            if (thisVuelingSearcher.isPuntoSearcher) {
                $('#' + thisVuelingSearcher.idDivResidentes).hide();
            }
        };

        thisVuelingSearcher.existsStationsInResource = function (origin, destination) {
            var result = thisVuelingSearcher.resource.stationHash[origin] != undefined ||
                                    thisVuelingSearcher.resource.stationHash[destination] != undefined &&
                                    thisVuelingSearcher.resource.macHash[origin] != undefined ||
                                    thisVuelingSearcher.resource.macHash[destination] != undefined;

            return result;
        };

        thisVuelingSearcher.insertLegend = function (origin, destination) {

            clearTimeout(thisVuelingSearcher.insertLegend.timer);

            // Inserto la Leyenda de Promo Universal solo si la la ruta en cuestión tiene algún día en promoción
            if (origin == undefined || destination == undefined || origin == '' || destination == '')
                return;

            var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);
            if (routeData == null || routeData.PromoDates.length == 0)
                return;

            var lastDayWithPromo = routeData.PromoDates[routeData.PromoDates.length - 1];

            var today = new Date();
            if (today > lastDayWithPromo)
                return;

            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                if ($('#ui-datepicker-div').css("opacity") != 0) {
                    if ($('.ui-datepicker-legend-promo').length == 0) {
                        $('.ui-datepicker-group-last').after(thisVuelingSearcher.promoUniversalDatapickerLegend);
                    }
                } else {
                    thisVuelingSearcher.insertLegend.timer = setTimeout(thisVuelingSearcher.insertLegend, 10, origin, destination);
                }
            } else {
                thisVuelingSearcher.insertLegend.timer = setTimeout(thisVuelingSearcher.insertLegend, 10, origin, destination);
            }
        };

        thisVuelingSearcher.changeCalendarImgAttr = function () {
            $(this.calendarImgElementClass).attr({ alt: this.calendarImgAltAttr, title: this.calendarImgAltAttr });
        };

        thisVuelingSearcher.disableDatePicker = function (id) {
            var div = $("#" + id);
            $(div).addClass("ui-datepicker-wait");
            $(div).css("background", "#fff center no-repeat url(" + thisVuelingSearcher.loadingImgUrl + ")");
            $("body").css("cursor", "wait");
        };

        thisVuelingSearcher.enableDatePicker = function (refresh) {
            var div = $("#" + thisVuelingSearcher.datepickerDivId);
            $(div).removeClass("ui-datepicker-wait");
            $(div).css("background-image", "none");
            $("body").css("cursor", "default");

            if (refresh) {
                this.departureDatepicker.datepicker("refresh");
                this.returnDatepicker.datepicker("refresh");
            }
        };

        thisVuelingSearcher.parseDate = function (input) {
            var parts = input.match(/(\d+)/g);
            return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
        };

        thisVuelingSearcher.parseSimpleDate = function (input) {
            if (input && input.length == 8)
                return new Date(input.substring(0, 4), input.substring(4, 6) - 1, input.substring(6, 8)); // months are 0-based
        };

        thisVuelingSearcher.checkDepartureDate = function (departureDate, returnDate) {
            return returnDate <= departureDate;
        };

        thisVuelingSearcher.checkReturnDate = function (departureDate, returnDate) {
            return returnDate >= departureDate;
        };

        thisVuelingSearcher.checkRoutesAndPromoUniversalDepartureCallback = function (data) {

            thisVuelingSearcher.BlankDaysAndPromoDays = new VUELING.Class.BlankDaysAndPromoDays();

            //mapeo los datos del JSon a la clase BlankDaysAndPromoDays
            thisVuelingSearcher.BlankDaysAndPromoDays.JsonToObject(data);

            thisVuelingSearcher.BlankDaysAndPromoDays.calendar
            var departure = thisVuelingSearcher.BlankDaysAndPromoDays.Departure;
            var arrival = thisVuelingSearcher.BlankDaysAndPromoDays.Arrival;

            thisVuelingSearcher.updateCheckRoutesAndPromoUniversalData(thisVuelingSearcher.BlankDaysAndPromoDays);
            thisVuelingSearcher.enableDatePicker();
            thisVuelingSearcher.departureDatepicker.datepicker("refresh");
            var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(departure, arrival);
            if (routeData != null)
                thisVuelingSearcher.updateDistantOperationsDates(routeData, false);
            thisVuelingSearcher.insertLegend(departure, arrival);
        };

        thisVuelingSearcher.checkRoutesAndPromoUniversalReturnCallback = function (data) {

            thisVuelingSearcher.BlankDaysAndPromoDays = new VUELING.Class.BlankDaysAndPromoDays();

            //mapeo los datos del JSon a la clase BlankDaysAndPromoDays
            thisVuelingSearcher.BlankDaysAndPromoDays.JsonToObject(data);

            var departure = thisVuelingSearcher.BlankDaysAndPromoDays.Departure;
            var arrival = thisVuelingSearcher.BlankDaysAndPromoDays.Arrival;

            thisVuelingSearcher.updateCheckRoutesAndPromoUniversalData(thisVuelingSearcher.BlankDaysAndPromoDays);
            thisVuelingSearcher.enableDatePicker();
            thisVuelingSearcher.returnDatepicker.datepicker("refresh");

            var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(departure, arrival);
            if (routeData != null)
                thisVuelingSearcher.updateDistantOperationsDates(routeData, false);

            thisVuelingSearcher.insertLegend(departure, arrival);
        };


        thisVuelingSearcher.checkRoutesAndPromoUniversalDepartureErrorCallback = function () {
            thisVuelingSearcher.enableDatePicker();
            thisVuelingSearcher.departureDatepicker.datepicker("refresh");
        };

        thisVuelingSearcher.checkRoutesAndPromoUniversalReturnErrorCallback = function () {
            thisVuelingSearcher.enableDatePicker();
            thisVuelingSearcher.returnDatepicker.datepicker("refresh");
        };

        thisVuelingSearcher.updateCheckRoutesAndPromoUniversalData = function (data) {
            var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(data.Departure, data.Arrival);
            if (routeData == null)
                thisVuelingSearcher.RouteDataManager.AddRouteData(data);
        };

        thisVuelingSearcher.checkRoutesAndPromoUniversal = function (month, year, departure, arrival, successCallback, errorCallback) {

            //http://apps-aragorn.vueling.com/Vueling.Cache.WCF.REST.WebService/BlankDaysService.svc/Get?callback=SKYSALES_Util_checkRoutesAndPromoUniversalDepartureCallback&departure=BCN&arrival=AMS&year=2014&month=2&monthsRange=12

            //http://apps-aragorn.vueling.com/Vueling.Cache.WCF.REST.WebService/BlankDaysService.svc/Get?callback=SKYSALES_Util_checkRoutesAndPromoUniversalReturnCallback&departure=AMS&arrival=BCN&year=2014&month=2&monthsRange=12

            var data = "departure=" + departure + "&arrival=" + arrival + "&year=" + year + "&month=" + month
                + "&monthsRange=" + thisVuelingSearcher.checkRoutesMonthRange;

            if (departure == undefined || arrival == undefined || departure == '' || arrival == '')
                return;

            // Jsonp calls don't throw an timeout error on IE8

            if ($.browser.msie) {
                var ie8ErrorCallback = function (jqXHR, textStatus, errorThrown) {
                    if (errorCallback != undefined)
                        eval(errorCallback + "()");
                };
                setTimeout(ie8ErrorCallback, thisVuelingSearcher.checkRoutesTimeout);
            }

            $.ajax({
                dataType: "jsonp",
                url: thisVuelingSearcher.checkRoutesUrl + "/Get",
                data: data,
                timeout: thisVuelingSearcher.checkRoutesTimeout,
                jsonpCallback: successCallback,
                success: function () {
                    if (typeof successCallback == "function") {
                        successCallback();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    eval(errorCallback + "()");
                    if (jqXHR.readyState != 4 || jqXHR.status != 200) {
                        if (errorCallback != undefined)
                            eval(errorCallback + "()");
                    }
                }
            });

        };


        // The function takes a date as a parameter and must return an array with [0] equal to true/false 
        // indicating whether or not this date is selectable, [1] equal to a CSS class name(s) or '' for 
        // the default presentation, and [2] an optional popup tooltip for this date
        thisVuelingSearcher.checkRoutesDayMarkets = function (date, origin, destination) {

            var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);

            if (routeData == null)
                return true;
            else
                return !SKYSALES.Util.inArrayDates(routeData.NonAvailableDates, date);
        };


        thisVuelingSearcher.checkPromoUniversalDayMarkets = function (date, origin, destination) {

            var routeData = thisVuelingSearcher.RouteDataManager.GetRouteDataByStationCodes(origin, destination);

            if (routeData == null)
                return false;
            else
                return SKYSALES.Util.inArrayDates(routeData.PromoDates, date);

        };


        thisVuelingSearcher.updateDistantOperationsDates = function (routeData, withTimeOut) {
            var firstAvailableDate = routeData.FirstAvailableDate;
            var today = new Date();

            var monthsDiff;
            monthsDiff = (firstAvailableDate.getFullYear() - today.getFullYear()) * 12;
            monthsDiff += firstAvailableDate.getMonth() - today.getMonth();
            if (today.getDate() <= firstAvailableDate.getDate())
                monthsDiff += 1;
            monthsDiff = monthsDiff <= 0 ? 0 : monthsDiff;

            if (monthsDiff > 2) { //this value could be in configuration.
                if (withTimeOut)
                    thisVuelingSearcher.populateDistantOperationsDatesWithTimeOut(firstAvailableDate, routeData.OriginStationCode);
                else
                    thisVuelingSearcher.populateDistantOperationsDates(firstAvailableDate, routeData.OriginStationCode);
            }
        };

        thisVuelingSearcher.populateDistantOperationsDatesWithTimeOut = function (date, origin) {
            clearTimeout(thisVuelingSearcher.populateDistantOperationsDatesWithTimeOut.timer);
            thisVuelingSearcher.populateDistantOperationsDatesWithTimeOut.timer = setTimeout(thisVuelingSearcher.populateDistantOperationsDates, 10, date, origin);
        };

        thisVuelingSearcher.populateDistantOperationsDates = function (date, origin) {
            var showMessage = false;
            var html = thisVuelingSearcher.operatingDatesMessageHtml;

            if (date != undefined && new Date() < date) {
                html = html.replace("{{DB}}", $.datepicker.formatDate("dd/mm/yy", date));
                if (html.indexOf("<") === -1) html = VUELING.Util.htmlDecode(html);
                showMessage = true;
            }

            if (showMessage) {
                var originInput = thisVuelingSearcher.departureStationCodeInput1.val();

                if (originInput == origin) {
                    var departureDate = thisVuelingSearcher.departureDatepicker.datepicker("getDate");
                    if (departureDate != undefined && date.getTime() > departureDate.getTime())
                        thisVuelingSearcher.departureDatepicker.datepicker("setDate", $.datepicker.formatDate("yy-mm-dd", date));
                } else {
                    var returnDate = thisVuelingSearcher.returnDatepicker.datepicker("getDate");
                    if (returnDate != undefined && date.getTime() > returnDate.getTime())
                        thisVuelingSearcher.returnDatepicker.datepicker("setDate", $.datepicker.formatDate("yy-mm-dd", date));
                }

                $("#ui-datepicker-div .ui-datepicker-row-break").html(html);
            }
        };

        thisVuelingSearcher.addEvents = function () {
            this.ButtonForClickToSearchMulticity.bind("click", thisVuelingSearcher.ClickToSearch);
            this.ButtonForClickToSearchNormal.bind("click", thisVuelingSearcher.ClickToSearch);

            // Origin station input events
            this.originInput.bind("click focus", this.originInputFocus);
            this.originInput.bind("airportOriginChange", this.originInputChange);
            this.originInput.bind("destinationAirportListRepaint", this.destinationAirportListRepaint);
            this.originInput.bind("airportListKeyPress", this.airportListKeyPress);

            // Destination station input events
            this.destinationInput.bind("click focus", this.destinationInputFocus);
            this.destinationInput.bind("airportDestinationChange", this.destinationInputChange);
            this.destinationInput.bind("originAirportListRepaint", this.originAirportListRepaint);
            this.destinationInput.bind("airportListKeyPress", this.airportListKeyPress);

            // Origin2 station input events
            this.originInput2.bind("click focus", this.originInputFocus2);
            this.originInput2.bind("airportOriginChange", this.originInputChange2);
            this.originInput2.bind("destinationAirportListRepaint", this.destinationAirportListRepaint2);
            this.originInput2.bind("airportListKeyPress", this.airportListKeyPress2);

            // Destination2 station input events
            this.destinationInput2.bind("click focus", this.destinationInputFocus2);
            this.destinationInput2.bind("airportDestinationChange", this.destinationInputChange2);
            this.destinationInput2.bind("originAirportListRepaint", this.originAirportListRepaint2);
            this.destinationInput2.bind("airportListKeyPress", this.airportListKeyPress2);

            // Departure date input events
            this.departureDateInput.bind("click focus", this.departureDateInputFocus);
            this.departureDateInput.keypress(function () { return false; });

            // Return date input events
            this.returnDateInput.bind("click focus", this.returnDateInputFocus);
            this.returnDateInput.keypress(function () { return false; });

            // Datepicker events
            if (this.departureDatepicker)
                this.departureDatepicker.datepicker("option", "onSelect", this.onDepartureDateSelect);

            if (this.returnDatepicker)
                this.returnDatepicker.datepicker("option", "onSelect", this.onReturnDateSelect);

            // Residents and large family drop down events
            this.residentFamNumButton.click(thisVuelingSearcher.residentFamNumButtonChange);
            this.discountDropDownLink.click(thisVuelingSearcher.discountDropDownLinkFocus);

            if (this.passengerCountADTDropDown) {
                this.passengerCountADTDropDown.change(thisVuelingSearcher.passengerCountADTDropDownChange);
                this.passengerCountADTDropDown.change(thisVuelingSearcher.checkIfGroup);
            }
            if (this.passengerCountCHDDropDown)
                this.passengerCountCHDDropDown.change(thisVuelingSearcher.checkIfGroup);

            if (this.passengerCountCHDDropDown && thisVuelingSearcher.isPuntoSearcher) {
                this.passengerCountCHDDropDown.change(thisVuelingSearcher.restrictUMPunto);
            }

            var self = this;
            $("a.adt_select_button").click(function () {
                var adults = $(this).data('n-adults');
                self.passengerCountADTDropDown.val(adults).change();
            });

            $("#adtSelectorDropdown").change(function () {
                var adults = $(this).val();
                if (adults == 25) {
                    $(':last-child', self.passengerCountADTDropDown).attr('selected', 'selected').change();
                    window.location = 'http://groups.vueling.com';
                    return;
                }
                self.passengerCountADTDropDown.val(adults).change();
                $('[id$="_DropDownListPassengerType_CHD"]:first').focus();
            })
            .mousedown(function () {
                var adults = $(this).val();
                $(this).find("option[value='" + adults + "']").text(adults);
            });
        };

        thisVuelingSearcher.checkIfGroup = function (e) {
            if (thisVuelingSearcher.maxPassengersNum !== null) {
                var select = e.currentTarget;
                if (thisVuelingSearcher.maxPassengersNum < thisVuelingSearcher.getTotalPassengerCount()) {
                    $(select).val('');
                    alert(thisVuelingSearcher.labelErrorMaxPassengers.replace("NUM", thisVuelingSearcher.maxPassengersNum));
                }
            }
            if (thisVuelingSearcher.getTotalPassengerCount() > 24)
                window.location = 'http://groups.vueling.com';
        };

        thisVuelingSearcher.restrictUMPunto = function (e) {
            var select = e.currentTarget;
            $(select).removeClass('validationError');
            $(select).parent().find('div.validationErrorDescription').remove();
            if (parseInt(thisVuelingSearcher.passengerCountADTDropDown.val()) == 0 && parseInt($(select).val()) > 0) {
                thisVuelingSearcher.setPuntoRestrictions();
            }
        };

        thisVuelingSearcher.setPuntoRestrictions = function () {
            thisVuelingSearcher.passengerCountCHDDropDown.val(0);
            thisVuelingSearcher.passengerCountADTDropDown.val(1);
            var position = $(thisVuelingSearcher.passengerCountCHDDropDown).position();

            var positionClass = $(thisVuelingSearcher.passengerCountCHDDropDown).hasClass('tooltipPositionAbove') ? 'layerArrow-up' : 'layerArrow-down',
                positionLeft = $(thisVuelingSearcher.passengerCountCHDDropDown).hasClass('tooltipPositionAbove') ? position.left : position.left,
                positionTop = $(thisVuelingSearcher.passengerCountCHDDropDown).hasClass('tooltipPositionAbove') ? position.top - 65 : position.top + 45;
            var validationErrorDescription = "<div style='position:absolute;left:" + positionLeft + "px; top:" + positionTop + "px;' class='validationErrorDescription sectionBorder_layerSmall styleBox_red'><div class='" + positionClass + "'></div>" + thisVuelingSearcher.laberErrorPuntoSearcherRestriction + "<div class='clearFix'></div></div>";
            $(thisVuelingSearcher.passengerCountCHDDropDown).addClass('validationError').parent().append(validationErrorDescription);
        };

        thisVuelingSearcher.getTotalPassengerCount = function () {
            var result = 0;

            if (this.passengerCountADTDropDown)
                result += parseInt(this.passengerCountADTDropDown.val());
            if (this.passengerCountCHDDropDown)
                result += parseInt(this.passengerCountCHDDropDown.val());

            return result;
        };

        thisVuelingSearcher.setSelectedAdtButton = function (adults) {
            $('a.adt_select_button').removeClass('is active');
            $("a.adt_select_button[data-n-adults='" + adults + "']").addClass('is active').focus();

            this.addOrRemoveMoreOption(adults);
        };

        thisVuelingSearcher.addOrRemoveMoreOption = function (adults) {
            var adtDropdown = $('#adtSelectorDropdown');
            var option = adtDropdown.find("option[value='" + adults + "']");

            if (adults == 0 || adults > 3) {
                adtDropdown.val(adults);
                option.text(adults);

            } else {
                var currentSelection = adtDropdown.val();
                adtDropdown.find("option[value='" + currentSelection + "']").text(currentSelection);

                adtDropdown.val(adults);
                option.text(thisVuelingSearcher.moreText);
            }
        }

        thisVuelingSearcher.passengerCountADTDropDownChange = function () {
            var selected = thisVuelingSearcher.passengerCountADTDropDown.find("option:selected");
            var selectedValue = parseInt(selected.attr('value'));

            thisVuelingSearcher.setSelectedAdtButton(selectedValue);

            if (selectedValue == 0) {
                thisVuelingSearcher.passengerCountINFANTDropDown.val(0);
                thisVuelingSearcher.passengerCountINFANTDropDown.find("option").each(
                    function () {
                        $(this).attr("disabled", "disabled");
                    }
                );
                if (parseInt(thisVuelingSearcher.passengerCountCHDDropDown.val()) > thisVuelingSearcher.maxCHDUM)
                    thisVuelingSearcher.passengerCountCHDDropDown.val(0);
                thisVuelingSearcher.passengerCountCHDDropDown.find("option").each(
                    function () {
                        if (parseInt($(this).val()) > thisVuelingSearcher.maxCHDUM)
                            $(this).attr("disabled", "disabled");
                    }
                );
                if (thisVuelingSearcher.isPuntoSearcher && parseInt(thisVuelingSearcher.passengerCountCHDDropDown.val()) > 0) {
                    thisVuelingSearcher.setPuntoRestrictions();
                }
            }
            else {
                if (parseInt(thisVuelingSearcher.passengerCountINFANTDropDown.val()) > parseInt(selected.attr('value')))
                    thisVuelingSearcher.passengerCountINFANTDropDown.val(selected.attr('value'));
                thisVuelingSearcher.passengerCountINFANTDropDown.find("option").each(
                    function () {
                        if (parseInt($(this).val()) > parseInt(selected.attr('value')))
                            $(this).attr("disabled", "disabled");
                        else
                            $(this).removeAttr("disabled");
                    }
                );
                thisVuelingSearcher.passengerCountCHDDropDown.find("option").each(
                    function () {
                        if (parseInt($(this).val()) > thisVuelingSearcher.maxCHDUM)
                            $(this).removeAttr("disabled");
                    }
                );
            }

            if (selected.data('goto') == 'gotoGroups') {
                window.location = 'http://groups.vueling.com';
            }
        };

        thisVuelingSearcher.onDepartureDateSelect = function (dateString, inst) {
            thisVuelingSearcher.departureDatepicker.manager.setYearMonthAndDayInputHandler(dateString);
            if (inst !== false)
                setTimeout(thisVuelingSearcher.onDepartureDateSelectAux, 500);
            return true;
        };

        thisVuelingSearcher.onDepartureDateSelectAux = function () {
            if ($('.radioForm :radio[checked]').val() == "RoundTrip" || $('#SkySales div.elem-form :radio[checked]').val() == "RoundTrip") {
                thisVuelingSearcher.returnDateInput.focus();
            }
            return true;
        };

        thisVuelingSearcher.onReturnDateSelect = function (dateString, inst) {
            // call original manager to do all the internal work
            thisVuelingSearcher.returnDatepicker.manager.setYearMonthAndDayInputHandler(dateString);
            $("#ui-datepicker-div").css("display", "none"); //iPad + Chrome
        };

        thisVuelingSearcher.departureDateInputFocus = function (e) {
            e.preventDefault();
            thisVuelingSearcher.departureDatepicker.datepicker("show");
        };

        thisVuelingSearcher.returnDateInputFocus = function (e) {
            e.preventDefault();

            if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                thisVuelingSearcher.SetReturnMinDateForMulticity();
            }

            thisVuelingSearcher.returnDatepicker.datepicker("show");
            $("#ui-datepicker-div").css("display", "block"); //iPad + Chrome
        };

        thisVuelingSearcher.originInputFocus = function (e) {
            e.preventDefault();
            // Prevent both click and focus events will hit the code twice.
            var timestampNow = new Date().getTime();
            if ((timestampNow - 500) > thisVuelingSearcher.lastTimestampFocusClickOrigin) {

                $('#destination').find('.cajaDesplegableTabToggle').hide();

                if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                    $('#origin2').find('.cajaDesplegableTabToggle').hide();
                    $('#destination2').find('.cajaDesplegableTabToggle').hide();
                }

                thisVuelingSearcher.suggestionOriginInput1.val('');
                thisVuelingSearcher.suggestionDestinationInput1.val('');
                thisVuelingSearcher.departureStationCodeInput1.val('');
                thisVuelingSearcher.arrivalStationCodeInput1.val('');

                thisVuelingSearcher.lastTimestampFocusClickOrigin = timestampNow;
                thisVuelingSearcher.departureDatepicker.datepicker("hide");
                thisVuelingSearcher.returnDatepicker.datepicker("hide");
                thisVuelingSearcher.destinationInput.val(SKYSALES.common.getRequiredEmptyValue(thisVuelingSearcher.destinationInput));
                thisVuelingSearcher.originDownArrowInput.trigger('airportListToggle');
            }
            return false;
        };

        thisVuelingSearcher.originAirportListRepaint = function (e) {
            thisVuelingSearcher.lastTimestampFocusClickOrigin = new Date().getTime();
            thisVuelingSearcher.destinationInput.val(SKYSALES.common.getRequiredEmptyValue(thisVuelingSearcher.destinationInput));
            thisVuelingSearcher.originDownArrowInput.trigger('airportListToggle');
        };

        thisVuelingSearcher.originInputChange = function (e) {
            e.preventDefault();
            if (!SKYSALES.common.isEmpty(thisVuelingSearcher.originInput)) {
                $(thisVuelingSearcher.originInput).removeClass('validationError');
                $(thisVuelingSearcher.destinationInput).removeClass('validationError');
                $('.dropDownOuterContainer .validationErrorDescription ').hide();
                // when it is shift+tab, we don't go to destination.
                if (!(thisVuelingSearcher.airportListPressedKey !== undefined
                    && thisVuelingSearcher.airportListPressedKey !== null
                    && thisVuelingSearcher.airportListPressedKey.which == 9
                    && thisVuelingSearcher.airportListPressedKey.shiftKey)) {

                    thisVuelingSearcher.destinationInput.focus();
                }
            }
        };

        thisVuelingSearcher.destinationInputFocus = function (e) {
            e.preventDefault();
            // Prevent both click and focus events will hit the code twice.
            var timestampNow = new Date().getTime();
            if ((timestampNow - 300) > thisVuelingSearcher.lastTimestampFocusClickDestination) {
                thisVuelingSearcher.arrivalStationCodeInput1.val('');

                thisVuelingSearcher.lastTimestampFocusClickDestination = timestampNow;
                thisVuelingSearcher.departureDatepicker.datepicker("hide");
                thisVuelingSearcher.returnDatepicker.datepicker("hide");

                if (thisVuelingSearcher.flightSearchObject.activeFlight == thisVuelingSearcher.openJawRadioId) {
                    $('#origin2').find('.cajaDesplegableTabToggle').hide();
                    $('#destination2').find('.cajaDesplegableTabToggle').hide();
                }

                if (SKYSALES.common.isEmpty(thisVuelingSearcher.originInput)) {
                    // fix origin first
                    if ($('div.cajaDesplegableTabToggle').is(':visible')) {
                        $('div.cajaDesplegableTabToggle').hide();
                    }
                    thisVuelingSearcher.lastTimestampFocusClickOrigin = 0;
                    thisVuelingSearcher.originInput.focus();
                }
                else {
                    thisVuelingSearcher.destinationDownArrowInput.trigger('airportListToggle');
                }
            }
            return false;
        };

        thisVuelingSearcher.destinationAirportListRepaint = function (e) {
            thisVuelingSearcher.lastTimestampFocusClickDestination = new Date().getTime();
            thisVuelingSearcher.destinationDownArrowInput.trigger('airportListToggle');
        };

        thisVuelingSearcher.destinationInputChange = function (e) {
            e.preventDefault();
            if (SKYSALES.common.isEmpty(thisVuelingSearcher.originInput)) {
                // fix origin first
                if ($('div.cajaDesplegableTabToggle').is(':visible')) {
                    $('div.cajaDesplegableTabToggle').hide();
                }
                thisVuelingSearcher.originInput.focus();
                thisVuelingSearcher.originInput.click();
            }
            else if (!SKYSALES.common.isEmpty(thisVuelingSearcher.destinationInput)) {
                $(thisVuelingSearcher.destinationInput).removeClass('validationError');
                $('.dropDownOuterContainer .validationErrorDescription ').hide();
                // when it is shift+tab, we don't go to datepicker.
                if (!(thisVuelingSearcher.airportListPressedKey !== undefined
                    && thisVuelingSearcher.airportListPressedKey !== null
                    && thisVuelingSearcher.airportListPressedKey.which == 9
                    && thisVuelingSearcher.airportListPressedKey.shiftKey)) {
                    thisVuelingSearcher.departureDateInput.focus();
                    thisVuelingSearcher.departureDateInput.click();
                    thisVuelingSearcher.departureDateInput.select();

                }
            }
            return false;
        };

        thisVuelingSearcher.airportListKeyPress = function (e, key) {
            thisVuelingSearcher.airportListPressedKey = key;
            return false;
        };

        thisVuelingSearcher.originInputFocus2 = function (e) {
            e.preventDefault();
            // Prevent both click and focus events will hit the code twice.
            var timestampNow = new Date().getTime();
            if ((timestampNow - 500) > thisVuelingSearcher.lastTimestampFocusClickOrigin) {

                $('#destination2').find('.cajaDesplegableTabToggle').hide();
                $('#origin').find('.cajaDesplegableTabToggle').hide();
                $('#destination').find('.cajaDesplegableTabToggle').hide();

                thisVuelingSearcher.suggestionOriginInput2.val('');
                thisVuelingSearcher.suggestionDestinationInput2.val('');
                thisVuelingSearcher.departureStationCodeInput2.val('');
                thisVuelingSearcher.arrivalStationCodeInput2.val('');

                thisVuelingSearcher.lastTimestampFocusClickOrigin = timestampNow;
                thisVuelingSearcher.departureDatepicker.datepicker("hide");
                thisVuelingSearcher.returnDatepicker.datepicker("hide");
                thisVuelingSearcher.destinationInput2.val(SKYSALES.common.getRequiredEmptyValue(thisVuelingSearcher.destinationInput2));
                thisVuelingSearcher.originDownArrowInput2.trigger('airportListToggle');
            }
            return false;
        };

        thisVuelingSearcher.originAirportListRepaint2 = function (e) {
            thisVuelingSearcher.lastTimestampFocusClickOrigin = new Date().getTime();
            thisVuelingSearcher.destinationInput2.val(SKYSALES.common.getRequiredEmptyValue(thisVuelingSearcher.destinationInput2));
            thisVuelingSearcher.originDownArrowInput2.trigger('airportListToggle');
        };

        thisVuelingSearcher.originInputChange2 = function (e) {
            e.preventDefault();
            if (!SKYSALES.common.isEmpty(thisVuelingSearcher.originInput2)) {
                $(thisVuelingSearcher.originInput2).removeClass('validationError');
                $(thisVuelingSearcher.destinationInput2).removeClass('validationError');
                $('.dropDownOuterContainer .validationErrorDescription ').hide();
                // when it is shift+tab, we don't go to destination.
                if (!(thisVuelingSearcher.airportListPressedKey2 !== undefined
                    && thisVuelingSearcher.airportListPressedKey2 !== null
                    && thisVuelingSearcher.airportListPressedKey2.which == 9
                    && thisVuelingSearcher.airportListPressedKey2.shiftKey)) {

                    thisVuelingSearcher.destinationInput2.focus();
                }
            }
        };

        thisVuelingSearcher.destinationInputFocus2 = function (e) {
            e.preventDefault();
            // Prevent both click and focus events will hit the code twice.
            var timestampNow = new Date().getTime();
            if ((timestampNow - 300) > thisVuelingSearcher.lastTimestampFocusClickDestination) {
                thisVuelingSearcher.arrivalStationCodeInput2.val('');
                thisVuelingSearcher.lastTimestampFocusClickDestination = timestampNow;
                thisVuelingSearcher.departureDatepicker.datepicker("hide");
                thisVuelingSearcher.returnDatepicker.datepicker("hide");
                if (SKYSALES.common.isEmpty(thisVuelingSearcher.originInput2)) {
                    // fix origin first
                    if ($('div.cajaDesplegableTabToggle').is(':visible')) {
                        $('div.cajaDesplegableTabToggle').hide();
                    }
                    thisVuelingSearcher.lastTimestampFocusClickOrigin = 0;
                    thisVuelingSearcher.originInput2.focus();
                }
                else {
                    thisVuelingSearcher.destinationDownArrowInput2.trigger('airportListToggle');
                }
            }
            return false;
        };

        thisVuelingSearcher.destinationAirportListRepaint2 = function (e) {
            thisVuelingSearcher.lastTimestampFocusClickDestination = new Date().getTime();
            thisVuelingSearcher.destinationDownArrowInput2.trigger('airportListToggle');
        };

        thisVuelingSearcher.destinationInputChange2 = function (e) {
            e.preventDefault();
            if (SKYSALES.common.isEmpty(thisVuelingSearcher.originInput2)) {
                // fix origin first
                if ($('div.cajaDesplegableTabToggle').is(':visible')) {
                    $('div.cajaDesplegableTabToggle').hide();
                }
                thisVuelingSearcher.originInput2.focus();
                thisVuelingSearcher.originInput2.click();
            }
            else if (!SKYSALES.common.isEmpty(thisVuelingSearcher.destinationInput2)) {
                $(thisVuelingSearcher.destinationInput2).removeClass('validationError');
                $('.dropDownOuterContainer .validationErrorDescription ').hide();
                // when it is shift+tab, we don't go to datepicker.
                if (!(thisVuelingSearcher.airportListPressedKey2 !== undefined
                    && thisVuelingSearcher.airportListPressedKey2 !== null
                    && thisVuelingSearcher.airportListPressedKey2.which == 9
                    && thisVuelingSearcher.airportListPressedKey2.shiftKey)) {
                    thisVuelingSearcher.returnDateInput.focus();
                    thisVuelingSearcher.returnDateInput.select();
                }
            }
            return false;
        };

        thisVuelingSearcher.airportListKeyPress2 = function (e, key) {
            thisVuelingSearcher.airportListPressedKey = key;
            return false;
        };

        // Residentes, Fam. Num.
        thisVuelingSearcher.residentFamNumButtonChange = function () {
            var isResidentOrLargeFam = $(this).is(":checked");
            thisVuelingSearcher.residentFamNumSelectorDiv.toggle(isResidentOrLargeFam);
            if (!isResidentOrLargeFam) {
                thisVuelingSearcher.residentFamNumSelector.val('');
                SKYSALES.Util.removeAttribute(thisVuelingSearcher.residentFamNumSelector, 'required');
            }
            else {
                SKYSALES.Util.setAttribute(thisVuelingSearcher.residentFamNumSelector, 'required', 'true');
            }
            thisVuelingSearcher.residentFamNumSelector.change();
        };

        thisVuelingSearcher.discountDropDownLinkFocus = function (e) {
            e.preventDefault();
            thisVuelingSearcher.discountDiv.toggle();
            if (!$(thisVuelingSearcher.discountDiv).is(':visible'))
                thisVuelingSearcher.discountCode.val('');
        };
        // End Residentes, Fam. Num.

        thisVuelingSearcher.getObjectInstance = function (objectName) {
            for (var ins in SKYSALES.Instance)
                if (ins.substring(0, objectName.length) === objectName)
                    return SKYSALES.Instance[ins];
            return null;
        };

        thisVuelingSearcher.setMinDateDeparture = function (year, month, day) {
            thisVuelingSearcher.setDatepickerMinMaxDate(this.departureDatepicker, "minDate", year, month, day);
            // the return date cannot be prior to departure date...
            thisVuelingSearcher.setDatepickerMinMaxDate(this.returnDatepicker, "minDate", year, month, day);
        };

        thisVuelingSearcher.setMaxDateDeparture = function (year, month, day) {
            thisVuelingSearcher.setDatepickerMinMaxDate(this.departureDatepicker, "maxDate", year, month, day);
        };

        thisVuelingSearcher.setMinDateReturn = function (year, month, day) {
            thisVuelingSearcher.setDatepickerMinMaxDate(this.returnDatepicker, "minDate", year, month, day);
        };

        thisVuelingSearcher.setMaxDateReturn = function (year, month, day) {
            thisVuelingSearcher.setDatepickerMinMaxDate(this.returnDatepicker, "maxDate", year, month, day);
        };

        thisVuelingSearcher.setDatepickerMinMaxDate = function (datepicker, type, year, month, day) {
            try { datepicker.datepicker("option", type, new Date(year, month - 1, day)); }
            catch (err) { }
        };

        thisVuelingSearcher.enableRoundTrip = function () {
            $(this.roundTripRadio).parent().show();
        };

        thisVuelingSearcher.disableRoundTrip = function () {
            $(this.oneWayRadio).click();
            $(this.roundTripRadio).parent().hide();
        };

        thisVuelingSearcher.enableOneWay = function () {
            $(this.oneWayRadio).parent().show();
        };

        thisVuelingSearcher.disableOneWay = function () {
            $(this.roundTripRadio).click();
            $(this.oneWayRadio).parent().hide();
        };

        thisVuelingSearcher.enableDiscountList = function () {
            $(this.discountList).show();
        };

        thisVuelingSearcher.disableDiscountList = function () {
            $(this.discountList).hide(); //.find("select").val(''); //.selectmenu("destroy").selectmenu(VUELING.applyJqueryMenuSelectOptions);
        };

        thisVuelingSearcher.setMinAdultPassengersNum = function (numPassenger) {
            thisVuelingSearcher.setMinPassengersNum(this.passengerCountADTDropDown, numPassenger);
        };

        thisVuelingSearcher.setMinChildPassengersNum = function (numPassenger) {
            thisVuelingSearcher.setMinPassengersNum(this.passengerCountCHDDropDown, numPassenger);
        };

        thisVuelingSearcher.setMinInfantPassengersNum = function (numPassenger) {
            thisVuelingSearcher.setMinPassengersNum(this.passengerCountINFANTDropDown, numPassenger);
        };

        thisVuelingSearcher.setMinPassengersNum = function (select, numPassenger) {
            if (select) {
                select.find("option").each(function () {
                    if ($(this).val() < numPassenger) {
                        $(this).remove();
                    }
                });
                if (numPassenger == 0) {
                    select.css("display", "none");
                }
                //select.val('').selectmenu("destroy").selectmenu(VUELING.applyJqueryMenuSelectOptions);
            }
        };

        thisVuelingSearcher.setMaxAdultPassengersNum = function (numPassenger) {
            thisVuelingSearcher.setMaxPassengersNum(this.passengerCountADTDropDown, numPassenger);
        };

        thisVuelingSearcher.setMaxChildPassengersNum = function (numPassenger) {
            thisVuelingSearcher.setMaxPassengersNum(this.passengerCountCHDDropDown, numPassenger);
        };

        thisVuelingSearcher.setMaxInfantPassengersNum = function (numPassenger) {
            thisVuelingSearcher.setMaxPassengersNum(this.passengerCountINFANTDropDown, numPassenger);
        };

        thisVuelingSearcher.setMaxPassengersNum = function (select, numPassenger) {
            if (select) {
                if (numPassenger == 0) {
                    select.parent().remove();
                }
                else {
                    select.find("option").each(function () {
                        if (parseInt($(this).val()) > parseInt(numPassenger)) {
                            $(this).remove();
                        }
                    });
                }
            }
        };

        thisVuelingSearcher.setMaxTotalPassengersNum = function (numPassenger) {
            thisVuelingSearcher.maxPassengersNum = numPassenger;
        };

        thisVuelingSearcher.ClickToSearch = function () {
            try {
                var thisFlightSearch = VUELING.Util.getObjectInstance('flightSearch');
                $.browser.safari = $.browser.webkit && !window.chrome; // safari bug attaching event to button
                if ($.browser.safari) {
                    var a = document.getElementById(thisFlightSearch.marketArray[0].marketInputIdArray[0].buttonNewSearchId);
                    var evObj = document.createEvent('MouseEvents');
                    evObj.initMouseEvent('click', true, true, window);
                    a.dispatchEvent(evObj);
                } else {
                    document.getElementById(thisFlightSearch.marketArray[0].marketInputIdArray[0].buttonNewSearchId).click();
                }
            } catch (e) {
                var thisFlightSearch = VUELING.Util.getObjectInstance("flightSearch");
                if (SKYSALES.Util.validate(this, null, null, 'no_summary').toString() == 'true') {
                    var idButton = thisFlightSearch.marketArray[0].marketInputIdArray[0].buttonNewSearchId.replace("_", "$");
                    $("form").find("#eventTarget").val(idButton);
                    $("form").submit();
                }
            }
        };

        thisVuelingSearcher.AreEqualsJourneyOriginAndDestination = function () {

            var origin1 = thisVuelingSearcher.departureStationCodeInput1.val();
            var destination1 = thisVuelingSearcher.arrivalStationCodeInput1.val();

            var origin2 = thisVuelingSearcher.departureStationCodeInput2.val();
            var destination2 = thisVuelingSearcher.arrivalStationCodeInput2.val();

            if (origin1 == '' || origin2 == '' || destination1 == '' || destination2 == '')
                return false;

            if (origin1 == origin2 && destination1 == destination2)
                return true;

            return false;
        };

        thisVuelingSearcher.SetReturnMinDateForMulticity = function () {
            var departureDate = thisVuelingSearcher.departureDatepicker.datepicker("getDate");
            var returnDate = thisVuelingSearcher.returnDatepicker.datepicker("getDate");
            var minDateForReturn = departureDate;

            if (thisVuelingSearcher.AreEqualsJourneyOriginAndDestination()) {
                minDateForReturn.setDate(departureDate.getDate() + 1);

                if (returnDate <= departureDate) {
                    thisVuelingSearcher.returnDatepickerManager.setYearMonthAndDayInputHandler($.datepicker.formatDate("yy-mm-dd", minDateForReturn));
                    thisVuelingSearcher.returnDatepicker.datepicker("setDate", minDateForReturn);
                    thisVuelingSearcher.returnDateInput.val($.datepicker.formatDate("DD dd MM", minDateForReturn));
                }

                thisVuelingSearcher.returnDatepicker.datepicker("option", "minDate", minDateForReturn);
                thisVuelingSearcher.returnDatepicker.datepicker("option", "showButtonPanel", true);
            } else {
                thisVuelingSearcher.returnDatepicker.datepicker("option", "minDate", departureDate);
                thisVuelingSearcher.returnDatepicker.datepicker("option", "showButtonPanel", true);
            }
        };

        return thisVuelingSearcher;
    };

    /* jslint vars:true */
    var OriginalDropDownClass = SKYSALES.Class.DropDown;
    /* jslint vars:false */

    // Warning: usually, we should avoid doing this; this will put Vueling's version of Validate into the SKYSALES namespace.
    SKYSALES.Class.DropDown = function (paramObject) {
        paramObject = paramObject || {};

        var parent = new OriginalDropDownClass(paramObject),
            thisDropDown = SKYSALES.Util.extendObject(parent),
            resource = SKYSALES.Util.getResource() || {};

        thisDropDown.optionDirList = 0;
        thisDropDown.optionConList = 0;

        
        thisDropDown.labeldestinationWithConnection = resource.labeldestinationWithConnection;
        thisDropDown.countries = resource.originCountry;
        thisDropDown.defaultCountrySelected = resource.defaultCountrySelected;
        thisDropDown.stationCountryInfoHash = resource.stationCountryInfoHash;
        thisDropDown.macHash = resource.macHash;
        thisDropDown.labeldestinationDirect = resource.labeldestinationDirect;
        thisDropDown.labelSelectCountry = resource.labelSelectCountry;
        thisDropDown.labelSelectOrigin = resource.labelSelectOrigin;
        thisDropDown.labelSelectDestination = resource.labelSelectDestination;
        thisDropDown.isOrigin = true;
        thisDropDown.actualDropDownHTMLObject = null;
        thisDropDown.fieldBoxSelector = 'fieldset.inputBox';
        thisDropDown.thisFieldBox = null;
        thisDropDown.airportListContainerToggleSelector = 'div.cajaDesplegableTabToggle';
        thisDropDown.thisAirportListContainerToggle = null;
        thisDropDown.otherAirportListContainerToggle = null;
        thisDropDown.airportListContainerSelector = 'div.cajaDesplegableTab';
        thisDropDown.thisAirportListContainer = null;
        thisDropDown.MaxDistanceForSuggest = 3;
        thisDropDown.isNewFinder = false;
        thisDropDown.sugestion = new VUELING.Class.Suggestion();

        thisDropDown.stationCodeId = '';
        thisDropDown.selectedSuggestionId = '';
        thisDropDown.erroneousWordId = '';
        thisDropDown.suggestionId = '';

        thisDropDown.suggestionInput = null;

        thisDropDown.init = function (json) {
            thisDropDown.setSettingsByObject(json);
            thisDropDown.initObject();

            // only for physical existing objects
            if (json.input.length !== 0) {
                thisDropDown.initParent(json);
                thisDropDown.addEvents();
            }
        };

        thisDropDown.initObject = function () {
            thisDropDown.suggestionInput = this.getById(thisDropDown.suggestionId);
            thisDropDown.sugestion.init(paramObject);

            if (thisDropDown.stationCountryInfoHash) {
                for (var key in thisDropDown.stationCountryInfoHash) {
                    thisDropDown.isNewFinder = true;
                    break;
                }

            }
        };


        thisDropDown.initParent = function (json) {
            var headerText = $(json.input).attr('title') || '';

            thisDropDown.originalOpenFunction = parent.open;
            thisDropDown.originalCloseFunction = parent.close;
            thisDropDown.originalKeyEventFunction = parent.keyEvent;

            
            thisDropDown.actualDropDownHTMLObject = json.input;
            thisDropDown.thisFieldBox = thisDropDown.actualDropDownHTMLObject.parents(thisDropDown.fieldBoxSelector);
            thisDropDown.thisAirportListContainer = thisDropDown.thisFieldBox.find(thisDropDown.airportListContainerSelector);
            thisDropDown.thisAirportListContainerToggle = thisDropDown.thisFieldBox.find(thisDropDown.airportListContainerToggleSelector);

            if (thisDropDown.thisAirportListContainer.length !== 0) {
                thisDropDown.thisAirportListContainer.find('#headerTextPlaceholder').text(headerText);
                parent.defaultHtml = thisDropDown.thisAirportListContainer;
            }
            parent.commonOptionsCodes = thisDropDown.ConvertToCommon();
            parent.defaultOptionMainMenu = thisDropDown.defaultCountrySelected;
            parent.addOptionEvents = function () { thisDropDown.addOptionEvents(); };
            parent.close = function () { thisDropDown.originalCloseFunction(); thisDropDown.close(); };
            parent.getOptionHtml = function (search) { return thisDropDown.getOptionHtml(search); };
            parent.open = function () { thisDropDown.originalOpenFunction(); thisDropDown.open(); thisDropDown.Autocomplet(); };
            parent.selectOption = thisDropDown.selectOption;
            parent.selectCountryOption = thisDropDown.selectCountryOption;
            parent.keyEvent = thisDropDown.keyEvent;
            parent.init(json);

            if ($(parent.dropDownContainerInput).length === 1) {
                thisDropDown.isOrigin = ($(parent.dropDownContainerInput).attr('id').indexOf('Origin') > 0);
                if (thisDropDown.isOrigin) {
                    thisDropDown.otherAirportListContainerToggle = $(thisDropDown.airportListContainerToggleSelector + ":last");
                }
                else {
                    thisDropDown.otherAirportListContainerToggle = $(thisDropDown.airportListContainerToggleSelector + ":first");
                }
            }
        };

        thisDropDown.ConvertToCommon = function () {
            var commonOptionsCodes = {},
                stationCountry;

            for (var key in thisDropDown.stationCountryInfoHash) {
                stationCountry = thisDropDown.stationCountryInfoHash[key];
                commonOptionsCodes[key] = stationCountry;
                commonOptionsCodes[key].mainMenuCommonCode = stationCountry.CountryCode;
                commonOptionsCodes[key].subMenuCommonCode = stationCountry.StationCode;
            }

            return commonOptionsCodes;
        }

        thisDropDown.Autocomplet = function () {
            var resp = "";
            var search = thisDropDown.actualDropDownHTMLObject.val();
            var name1 = SKYSALES.Util.removeDiacritics(VUELING.Class.Search.citiesShow[0].name.toLowerCase());
            var name2 = SKYSALES.Util.removeDiacritics(search.toLowerCase());
            if (name1.startsWith(name2))
                resp = VUELING.Class.Search.citiesShow[0].name;
            if (search == "")
                resp = "";
            else
                resp = search + resp.substr(search.length);

            thisDropDown.suggestionInput.val(resp);
        };

        thisDropDown.keyEvent = function (key) {
            parent.dropDownContainerInput.trigger('airportListKeyPress', key);
            var retVal = thisDropDown.originalKeyEventFunction(key),
                keyNum = key.which;

            if (retVal) {
                if (keyNum === 37) {
                    thisDropDown.arrowLeft();
                    parent.autoComplete = true;
                    retVal = false;
                }
                else if (keyNum === 39) {
                    thisDropDown.arrowRight();
                    parent.autoComplete = true;
                    retVal = false;
                }
                else if (keyNum === 9) {
                    // special counter-action on main.js thisdrop for the dropdown.close
                    if ($(thisDropDown.airportListContainerToggleSelector).is(':visible')) {
                        $(thisDropDown.airportListContainerToggleSelector).hide();
                    }
                    if ((thisDropDown.isOrigin && !key.shiftKey) ||
                        (!thisDropDown.isOrigin && key.shiftKey)) {
                        // when origin and tab; or when destination and shift+tab,
                        // we return to the other airportlist.
                        // so the earlier close have to be shown again 
                        if (thisDropDown.isOrigin) {
                            // action fired from origin, so we show destination
                            parent.dropDownContainerInput.trigger('destinationAirportListRepaint');
                        }
                        else {
                            // action fired from destination, so we show origin
                            parent.dropDownContainerInput.trigger('originAirportListRepaint');
                        }
                        retVal = false;
                    }
                    else if (!thisDropDown.isOrigin && !key.shiftKey) {
                        // when on destination, tabbing without shift, we progress.
                        // because the we already progress in destinationInputchange, we return false.
                        retVal = false;
                    }
                }
            }
            parent.dropDownContainerInput.trigger('airportListKeyPress', null);

            return retVal;
        };

        thisDropDown.arrowLeft = function () {
            if (parent.optionList) {
                var activeOptionIndex = parent.getActiveOptionIndex(),
                activeOptionColumnIndex = 0,
                activeOptionRowIndex = 0,
                allFlights = parent.optionList.length,
                directFlights = thisDropDown.optionDirList,
                connectionFlights = allFlights - thisDropDown.optionDirList,
                directPartsDivider = 5,
                connectionPartsDivider = 5,
                directPart = 0,
                connectionPart = 0,
                newpostion = -1,
                step = directPart;

                if (thisDropDown.isNewFinder) {
                    directFlights = allFlights;
                    directPartsDivider = 2;
                    connectionPartsDivider = 2;
                    connectionFlights = 0;
                }

                if (directFlights > 0) {
                    directPart = Math.round((directFlights / directPartsDivider) + 0.49);
                }

                if ((directFlights - 1) < activeOptionIndex) {
                    connectionPart = Math.round((connectionFlights / connectionPartsDivider) + 0.49);
                    if (directFlights >= activeOptionIndex - connectionPart) {
                        newpostion = (directFlights - 1);
                    }
                    else {
                        activeOptionColumnIndex = Math.floor((activeOptionIndex - (directFlights - 1)) / connectionPart);
                        activeOptionRowIndex = (activeOptionIndex - (directFlights - 1)) % connectionPart;
                        newpostion = (directFlights - 1) + ((activeOptionColumnIndex - 1) * connectionPart) + activeOptionRowIndex;
                    }
                }
                else {
                    if (0 <= (activeOptionIndex - directPart)) {
                        activeOptionColumnIndex = Math.floor((activeOptionIndex) / directPart);
                        activeOptionRowIndex = (activeOptionIndex) % directPart;
                        newpostion = ((activeOptionColumnIndex - 1) * directPart) + activeOptionRowIndex;
                    }
                    else if (0 != activeOptionIndex) {
                        newpostion = 0;
                    }
                }

                if (newpostion >= 0) {
                    parent.optionInActive.call(parent.optionList[activeOptionIndex]);
                    parent.optionActive.call(parent.optionList[newpostion]);
                }
            }
        };

        thisDropDown.arrowRight = function () {
            if (parent.optionList) {
                var activeOptionIndex = parent.getActiveOptionIndex(),
                activeOptionColumnIndex = 0,
                activeOptionRowIndex = 0,
                allFlights = parent.optionList.length,
                directFlights = thisDropDown.optionDirList,
                connectionFlights = allFlights - thisDropDown.optionDirList,
                directPartsDivider = 5,
                connectionPartsDivider = 5,
                directPart = 0,
                connectionPart = 0,
                newpostion = -1,
                step = directPart;

                if (thisDropDown.isNewFinder) {
                    directPartsDivider = 2;
                    connectionPartsDivider = 2;
                    directFlights = allFlights;
                    connectionFlights = 0;
                }

                if (directFlights > 0) {
                    directPart = Math.round((directFlights / directPartsDivider) + 0.49);
                }

                if ((directFlights - 1) < activeOptionIndex) {
                    connectionPart = Math.round((connectionFlights / connectionPartsDivider) + 0.49);

                    if ((allFlights - 1) >= (activeOptionIndex + connectionPart)) {
                        activeOptionColumnIndex = Math.floor((activeOptionIndex - (directFlights - 1)) / connectionPart);
                        activeOptionRowIndex = (activeOptionIndex - (directFlights - 1)) % connectionPart;
                        newpostion = (directFlights - 1) + ((activeOptionColumnIndex + 1) * connectionPart) + activeOptionRowIndex;
                    }
                    else if ((allFlights - 1) < (activeOptionIndex + connectionPart)) {
                        newpostion = (allFlights - 1);
                    }
                    else if ((allFlights - 1) != activeOptionIndex) {
                        newpostion = (allFlights - 1);
                    }
                }
                else {
                    if ((directFlights - 1) >= (activeOptionIndex + directPart)) {
                        activeOptionColumnIndex = Math.floor((activeOptionIndex) / directPart);
                        activeOptionRowIndex = (activeOptionIndex) % directPart;
                        newpostion = ((activeOptionColumnIndex + 1) * directPart) + activeOptionRowIndex;
                    }
                    else if (((directFlights - 1) < (activeOptionIndex + directPart)) && (directFlights != allFlights)) {
                        newpostion = directFlights;
                    }
                    else if ((allFlights - 1) != activeOptionIndex) {
                        newpostion = (allFlights - 1);
                    }
                }

                if (newpostion >= 0) {
                    parent.optionInActive.call(parent.optionList[activeOptionIndex]);
                    parent.optionActive.call(parent.optionList[newpostion]);
                }

            }
        };

        thisDropDown.addEvents = function () {
            if ($(parent.dropDownContainerInput).length === 1) {
                $('#' + $(parent.dropDownContainerInput).attr('id') + 'DownArrowInput').bind('click', thisDropDown.arrowClick);
                $('#' + $(parent.dropDownContainerInput).attr('id') + 'DownArrowInput').bind('airportListToggle', thisDropDown.toggle);
            }
        };

        /// #region VuelingSearch
        /// This code below is specific for the VuelingSearch
        thisDropDown.close = function () {
            var vuelingSearcherTemp = VUELING.Util.getObjectInstance("vuelingSearcher");
            var search = thisDropDown.actualDropDownHTMLObject.val();

            if (search == "" || search == vuelingSearcherTemp.labelOrigin || search == vuelingSearcherTemp.labelDestination)
                thisDropDown.suggestionInput.val("");

            if (thisDropDown.otherAirportListContainerToggle.is(':visible')) {
                thisDropDown.otherAirportListContainerToggle.hide();
            }
            if (thisDropDown.thisAirportListContainerToggle.is(':visible')) {
                thisDropDown.thisAirportListContainerToggle.hide();
            }
        };

        thisDropDown.open = function () {
            if (thisDropDown.otherAirportListContainerToggle.is(':visible')) {
                thisDropDown.otherAirportListContainerToggle.hide();
            }
            if (!thisDropDown.thisAirportListContainerToggle.is(':visible')) {
                thisDropDown.thisAirportListContainerToggle.show();
            }
        };

        thisDropDown.toggle = function () {
            if ((thisDropDown.thisAirportListContainerToggle).is(':visible')) {
                thisDropDown.close();
            } else {
                thisDropDown.airportListHandler();
            }
        };

        thisDropDown.arrowClick = function (e) {
            var isIE = $.browser.msie, browserVersion = parseInt($.browser.version, 10);
            if (isIE && browserVersion <= 8) {
                $(parent.dropDownContainerInput).focus();
            } else {
                parent.dropDownContainerInput.click();
                return false;
            }
        };

        thisDropDown.airportListHandler = function () {
            var value = thisDropDown.retractAirport(parent.dropDownContainerInput.val());
            parent.dropDownContainerInput.val('');
            parent.dropDownContainerInput.select();

            parent.open();
            parent.autoComplete = true;

            if (!(value === undefined || value.length === 0)) {

                if (thisDropDown.isNewFinder) {
                    var countryCode = "";
                    if (thisDropDown.stationCountryInfoHash[value] != undefined)
                        countryCode = thisDropDown.stationCountryInfoHash[value].CountryCode;

                    $('div[id=mainMenuOptions] a').removeClass('optionActive');
                    $('div[id=mainMenuOptions] a[data-id-country-code=' + countryCode + ']').addClass('optionActive');
                    $('div[id=mainMenuOptions] a[data-id-country-code=' + countryCode + ']').click();

                    $('div[id=subMenuOptions] a').removeClass('optionActive');
                    $('div[id=subMenuOptions] a[data-id-code=' + value + ']').addClass('optionActive');
                } else {
                    if (thisDropDown.isOrigin) {
                        $('div.cajaDesplegableTab:first a').removeClass('optionActive');
                        $('div.cajaDesplegableTab:first a[data-id-code=' + value + ']').addClass('optionActive');
                    }
                    else if (!thisDropDown.isOrigin) {
                        $('div.cajaDesplegableTab:last a').removeClass('optionActive');
                        $('div.cajaDesplegableTab:last a[data-id-code=' + value + ']').addClass('optionActive');
                    }
                }
            }

            return false;
        };

        thisDropDown.retractAirport = function (airportText) {
            var airportCode = '';

            if ((this.options !== undefined && this.options.length > 0)
            && (airportText !== undefined && airportText.length > 0)) {
                if (thisDropDown.isNewFinder) {
                    var ourCode = airportText;

                    $(this.options).each(function (index, option) {
                        if (option.name === ourCode) {
                            airportCode = option.code;
                        }
                    });

                    if (airportCode === '') {
                        // miramos si es un mac
                        if (this.macHash && (airportText !== undefined && airportText.length > 0)) {
                            for (var key in this.macHash) {
                                if (this.macHash[key].name === airportText) {
                                    airportCode = this.macHash[key].code;
                                }
                            }
                        }
                    }
                } else {
                    var ourCode = airportText.substr(airportText.length - 4, 3);

                    $(this.options).each(function (index, option) {
                        if (option.code === ourCode) {
                            airportCode = option.code;
                        }
                    });
                }
            }

            return airportCode;
        };

        thisDropDown.addOptionStationsEvents = function () {
            if (thisDropDown.isNewFinder) {
                parent.optionList = $("a[data-id-code]", parent.dropDownContainerExtension);
                parent.optionList.click(thisDropDown.selectOption);
            } else {
                parent.optionList = $("a[data-id-code]", parent.dropDownContainerExtension);
                parent.optionList.click(thisDropDown.selectOption);
            }
        };

        thisDropDown.addOptionEvents = function () {
            if (thisDropDown.isNewFinder) {
                thisDropDown.addOptionStationsEvents();

                parent.optionMainMenuList = $("a[data-id-country-code]", parent.dropDownContainerExtension);
                parent.optionMainMenuList.click(thisDropDown.selectCountryOption);
            } else {
                parent.optionList = $("a", parent.dropDownContainerExtension);
                parent.optionList.click(thisDropDown.selectOption);
            }
        };

        thisDropDown.selectCountryOption = function () {
            var code = $(this).data('id-country-code');

            $('div[id=mainMenuOptions] a').removeClass('optionActive');
            $('div[id=mainMenuOptions] a[data-id-country-code=' + code + ']').addClass('optionActive');

            $("div[id=subMenuOptions]")[0].innerHTML = thisDropDown.selectStationsByCountry(code);

            $('div[id=subMenuOptions] a').removeClass('optionActive');
            $('div[id=subMenuOptions] a:first').addClass('optionActive');

            thisDropDown.addOptionStationsEvents();
        }

        thisDropDown.printStations = function (validOptions) {
            var optionHtml = '',
                showCode = parent.showCode,
                option = {};

            // Stations
            if (validOptions.length) {
                if (thisDropDown.isOrigin) {
                    optionHtml += '<h4 class="cajaDesplegableTab_title">' + thisDropDown.labelSelectOrigin + '</h4>\n';
                } else {
                    optionHtml += '<h4 class="cajaDesplegableTab_title">' + thisDropDown.labelSelectDestination + '</h4>\n';
                }
                optionHtml += '<div class="sectionSolid bc_f4f4f4 clearfix cajaDesplegableTab_destinationBox">\n';
                optionHtml += '<div class="cajaDesplegableTab_list">\n';
            }
            for (var i = 0, ii = validOptions.length, row = 0, col = 0, maxRow = Math.ceil(ii / 2) - 1; i < ii; i++, row++) {
                option = validOptions[i];

                if (row == 0) {
                    optionHtml += '<ul class="flyList">\n';
                }

                var isSuggest = "";
                if (option.distance != undefined)
                    isSuggest = ' suggest="true"';

                optionHtml += '\t<li><a href="#"' + isSuggest + ' data-id-code="' + option.code + '">' + option.name;
                if (showCode) {
                    optionHtml += ' (' + option.code + ')';
                }
                optionHtml += '</a></li>\n';

                if (row == maxRow) {
                    optionHtml += '</ul>\n';
                    row = -1;
                    col++;
                }
            }

            if (row != 0)
                optionHtml += '</ul>\n';

            optionHtml += '</div>\n</div>\n';
            return optionHtml;
        }

        thisDropDown.selectStationsByCountry = function (countryCode) {
            var option = {},
                prop = '',
                optionHtml = '',
                optionHash = parent.options,
                validOptions = [];

            for (prop in optionHash) {
                if (optionHash.hasOwnProperty(prop)) {
                    option = optionHash[prop];

                    if (option.CountryCode == countryCode) {
                        validOptions.push(option);
                    }
                }
            }

            validOptions.sort(thisDropDown.sortOptions);

            optionHtml += this.printStations(validOptions);

            return optionHtml;

        }

        thisDropDown.selectOption = function () {
            var code = $(this).data('id-code'),
                name = $(this).text();

            thisDropDown.sugestion.stationCode = code;
            if (thisDropDown.sugestion.erroneousWord != '')
                thisDropDown.sugestion.selectedSuggestion = code;

            thisDropDown.sugestion.persist();

            parent.dropDownContainerInput.val(name);
            parent.dropDownContainerInput.change();
            parent.close();

            if (!SKYSALES.common.isEmpty(parent.dropDownContainerInput))
                if (thisDropDown.isOrigin) {
                    parent.dropDownContainerInput.trigger('airportOriginChange');
                }
                else {
                    parent.dropDownContainerInput.trigger('airportDestinationChange');
                }

            thisDropDown.suggestionInput.val(name);
        };

        /*
        Turns the stationInfo into a hash for quick lookups.
        Keying into the countryHash with the country code you will get back a country object
        countryHash[countryCode] = {"name":"", "code": "" };
        */
        thisDropDown.populateCountryHash = function () {
            var i = 0,
                prop = '',
                countries = this.countries,
                countryHash = {},
                optionHash = parent.options,
                country = null,
                station = null,
                len = -1;

            if (optionHash) {
                for (prop in optionHash) {
                    station = optionHash[prop];
                    if (station.CountryCode) {
                        country = countries[station.CountryCode];
                        countryHash[country.code] = country;
                    }
                }
            }

            return countryHash;
        };

        thisDropDown.getOptionHtml = function (search) {
            search = search || '';

            if (search)
                search = SKYSALES.Util.removeDiacritics(search.toLowerCase());

            var option = {},
                prop = '',
                optionHtml = '',
                optionHash = parent.options,
                countryHash = this.countries,
                showCode = parent.showCode,
                optionName = '',
                optionCode = '',
                name = '',
                code = '',
                validOptions = [],
                validCountriesOptions = [],
                validConnectionsOptions = [];

            if (thisDropDown.isNewFinder) {
                if (search) {
                    for (prop in optionHash) {
                        if (optionHash.hasOwnProperty(prop)) {
                            option = optionHash[prop];
                            optionName = option.name || '';
                            optionCode = option.code || '';
                            optionCode = optionCode.toLowerCase();
                            name = option.name ? SKYSALES.Util.removeDiacritics(optionName.toLowerCase()) : '',
                                code = optionCode;

                            if ((name.indexOf(search) > -1) || (code.indexOf(search) > -1) || search.length == 0) {
                                validOptions.push(option);
                            }
                        }
                    }
                }

                countryHash = this.populateCountryHash();

                for (prop in countryHash) {
                    if (countryHash.hasOwnProperty(prop)) {
                        option = countryHash[prop];
                        optionName = option.name || '';
                        optionCode = option.code || '';
                        optionCode = optionCode.toLowerCase();
                        name = option.name ? SKYSALES.Util.removeDiacritics(optionName.toLowerCase()) : '',
                            code = optionCode;

                        validCountriesOptions.push(option);
                    }
                }

                validCountriesOptions.sort(thisDropDown.sortOptions);
                thisDropDown.sugestion.erroneousWord = "";
                thisDropDown.sugestion.selectedSuggestion = "";

                var suggestValidList = new Array();
                if (validOptions.length <= 0) {
                    for (prop in optionHash) {
                        if (optionHash.hasOwnProperty(prop)) {
                            option = optionHash[prop];
                            optionName = option.name || '';
                            optionCode = option.code || '';
                            optionCode = optionCode.toLowerCase();
                            name = option.name ? SKYSALES.Util.removeDiacritics(optionName.toLowerCase()) : '',
                                code = optionCode;

                            var nameTemp = name;
                            if (name.length > search.length)
                                nameTemp = name.substr(0, search.length);

                            var distance = thisDropDown.damerauLevenshteinDistance(nameTemp, search);
                            if (search.length > 0 && !name.startsWith(search[0].toLowerCase()))
                                distance = distance + 1;

                            if (distance <= thisDropDown.MaxDistanceForSuggest) {
                                option.distance = distance;
                                suggestValidList.push(option);
                            }
                        }
                    }
                    if (suggestValidList.length > 0) {
                        suggestValidList.sort(thisDropDown.sortDistance);
                        validOptions.push.apply(validOptions, suggestValidList);
                    } else {
                        thisDropDown.actualDropDownHTMLObject.val("");
                        $("#selectedComboTextOrigin").val("");
                        validOptions.push.apply(validOptions, optionHash);
                    }

                    thisDropDown.sugestion.erroneousWord = search;
                }

                thisDropDown.optionDirList = validOptions.length;

                //Countries
                if (validCountriesOptions.length) {
                    $("div[id=subMenuOptions], div[id=mainMenuOptions]").remove();
                    optionHtml += '<div class="sectionTable">\n';
                    optionHtml += '<div id="mainMenuOptions" class="sectionTable_cell cajaDesplegableTab_originBox">\n';
                    optionHtml += '<h4 class="cajaDesplegableTab_title">' + thisDropDown.labelSelectCountry + '</h4>\n';
                    optionHtml += '<div class="cajaDesplegableTab_list">\n';
                }
                for (var i = 0, ii = validCountriesOptions.length, row = 0, col = 0, maxRow = Math.ceil(ii / 3) - 1; i < ii; i++, row++) {
                    var option = validCountriesOptions[i];

                    if (row == 0) {
                        optionHtml += '<ul class="flyList">\n';
                    }

                    optionHtml += '\t<li><a href="#" data-id-country-code="' + option.code + '">' + option.name;
                    if (showCode) {
                        optionHtml += ' (' + option.code + ')';
                    }
                    optionHtml += '</a></li>\n';

                    if (row == maxRow) {
                        optionHtml += '</ul>\n';
                        row = -1;
                        col++;
                    }
                }

                if (row != 0)
                    optionHtml += '</ul>\n';

                optionHtml += '</div>\n</div>\n';
                optionHtml += '<div id="subMenuOptions" class="sectionTable_cell">\n';

                if (search) {
                    validOptions.sort(thisDropDown.sortOptions);
                    validOptions = thisDropDown.sortByCodeStartwith(validOptions, search);
                    validOptions = thisDropDown.sortByNameStartwith(validOptions, search);

                    optionHtml += this.printStations(validOptions);
                }
                optionHtml += '</div>\n</div>\n';

                VUELING.Class.Search.citiesShow = new Array();
                VUELING.Class.Search.citiesShow.push.apply(VUELING.Class.Search.citiesShow, validOptions);
                VUELING.Class.Search.citiesShow.push.apply(VUELING.Class.Search.citiesShow, validConnectionsOptions);
            } else {
                for (prop in optionHash) {
                    if (optionHash.hasOwnProperty(prop)) {
                        option = optionHash[prop];
                        optionName = option.name || '';
                        optionCode = option.code || '';
                        optionCode = optionCode.toLowerCase();
                        name = option.name ? SKYSALES.Util.removeDiacritics(optionName.toLowerCase()) : '',
                        code = optionCode;

                        if ((name.indexOf(search) > -1) || (code.indexOf(search) > -1) || search.length == 0) {
                            validOptions.push(option);
                        }
                    }
                }
                validOptions.sort(thisDropDown.sortOptions);

                validOptions = thisDropDown.sortByCodeStartwith(validOptions, search);
                validConnectionsOptions = thisDropDown.sortByCodeStartwith(validConnectionsOptions, search);
                validOptions = thisDropDown.sortByNameStartwith(validOptions, search);
                validConnectionsOptions = thisDropDown.sortByNameStartwith(validConnectionsOptions, search);

                thisDropDown.sugestion.erroneousWord = "";
                thisDropDown.sugestion.selectedSuggestion = "";

                var suggestValidList = new Array();
                if (validOptions.length <= 0) {
                    for (prop in optionHash) {
                        if (optionHash.hasOwnProperty(prop)) {
                            option = optionHash[prop];
                            optionName = option.name || '';
                            optionCode = option.code || '';
                            optionCode = optionCode.toLowerCase();
                            name = option.name ? SKYSALES.Util.removeDiacritics(optionName.toLowerCase()) : '',
                            code = optionCode;

                            var nameTemp = name;
                            if (name.length > search.length)
                                nameTemp = name.substr(0, search.length);

                            var distance = thisDropDown.damerauLevenshteinDistance(nameTemp, search);
                            if (search.length > 0 && !name.startsWith(search[0].toLowerCase()))
                                distance = distance + 1;

                            if (distance <= thisDropDown.MaxDistanceForSuggest) {
                                option.distance = distance;
                                suggestValidList.push(option);
                            }
                        }
                    }
                    if (suggestValidList.length > 0) {
                        suggestValidList.sort(thisDropDown.sortDistance);
                        validOptions.push.apply(validOptions, suggestValidList);
                    } else {
                        thisDropDown.actualDropDownHTMLObject.val("");
                        $("#selectedComboTextOrigin").val("");
                        validOptions.push.apply(validOptions, optionHash);
                    }

                    thisDropDown.sugestion.erroneousWord = search;
                }
                for (var i = validOptions.length - 1; i >= 0; i--) {
                    var connection = validOptions[i].connection;
                    if (connection != undefined && connection == true) {
                        validConnectionsOptions.push(validOptions[i]);
                        validOptions.splice(i, 1);
                    }
                }
                if (!search) {
                    validOptions.sort(thisDropDown.sortOptions);
                    validConnectionsOptions.sort(thisDropDown.sortOptions);
                }

                thisDropDown.optionDirList = validOptions.length;
                thisDropDown.optionConList = validConnectionsOptions.length;

                VUELING.Class.Search.citiesShow = new Array();
                VUELING.Class.Search.citiesShow.push.apply(VUELING.Class.Search.citiesShow, validOptions);
                VUELING.Class.Search.citiesShow.push.apply(VUELING.Class.Search.citiesShow, validConnectionsOptions);

                // Sin conexiones
                if (validConnectionsOptions.length && validOptions.length)
                    optionHtml += '<h4 class="destinationHeader">' + thisDropDown.labeldestinationDirect + '</h4>';
                for (var i = 0, ii = validOptions.length, row = 0, col = 0, maxRow = Math.ceil(ii / 5) - 1; i < ii; i++, row++) {
                    var option = validOptions[i];

                    if (row == 0) {
                        optionHtml += '<ul class="flyList';
                        if (col == 4)
                            optionHtml += ' marginRight0';
                        optionHtml += '">';
                    }

                    var isSuggest = "";
                    if (option.distance != undefined)
                        isSuggest = ' suggest="true"';

                    optionHtml += '\t<li><a href="#"' + isSuggest + ' data-id-code="' + option.code + '">' + option.name;
                    if (showCode) {
                        optionHtml += ' (' + option.code + ')';
                    }
                    optionHtml += '</a></li>\n';

                    if (row == maxRow) {
                        optionHtml += '</ul>\n';
                        row = -1;
                        col++;
                    }
                }

                if (row != 0)
                    optionHtml += '</ul>\n';

                // Conexiones
                if (validConnectionsOptions.length)
                    optionHtml += '<h4 class="destinationHeader">' + thisDropDown.labeldestinationWithConnection + '</h4>';
                for (var i = 0, ii = validConnectionsOptions.length, row = 0, col = 0, maxRow = Math.ceil(ii / 5) - 1; i < ii; i++, row++) {
                    var option = validConnectionsOptions[i];

                    if (row == 0) {
                        optionHtml += '<ul class="flyList';
                        if (col == 4)
                            optionHtml += ' marginRight0';
                        optionHtml += '">';
                    }

                    optionHtml += '\t<li><a href="#" data-id-code="' + option.code + '">' + option.name;
                    if (showCode) {
                        optionHtml += ' (' + option.code + ')';
                    }
                    optionHtml += '</a></li>\n';

                    if (row == maxRow) {
                        optionHtml += '</ul>\n';
                        row = -1;
                        col++;
                    }
                }

                if (row != 0)
                    optionHtml += '</ul>\n';

                optionHtml += '<div class="clearFix"></div>';
            }
            return optionHtml;
        };


        // Helpers
        thisDropDown.sortOptions = function (a, b) {
            var aname = SKYSALES.Util.removeDiacritics(a.name),
                bname = SKYSALES.Util.removeDiacritics(b.name);

            if (aname < bname)
                return -1;
            else if (aname > bname)
                return 1;
            else
                return 0;
        };
        thisDropDown.sortDistance = function (a, b) {
            var aname = a.distance,
                bname = b.distance;

            if (aname < bname)
                return -1;
            else if (aname > bname)
                return 1;
            else
                return 0;
        };
        thisDropDown.levenshtein = function (a, b) {
            var i, j, r = [];

            r[0] = [];
            r[0][0] = 0;

            for (i = 1; i <= a.length; i++) {
                r[i] = [];
                r[i][0] = i;

                for (j = 1; j <= b.length; j++) {
                    r[0][j] = j;
                    r[i][j] = Math.min(
                          r[i - 1][j] + 1,
                          r[i][j - 1] + 1,
                          r[i - 1][j - 1] + (a[i - 1] !== b[j - 1])
                        );
                }
            }

            return r[a.length][b.length];
        };
        thisDropDown.damerauLevenshteinDistance = function (s, t) {
            // Determine the Damerau-Levenshtein distance between s and t
            if (!s || !t) {
                return 99;
            }
            var m = s.length;
            var n = t.length;
            var charDictionary = new Object();

            /* For all i and j, d[i][j] holds the Damerau-Levenshtein distance
            * between the first i characters of s and the first j characters of t.
            * Note that the array has (m+1)x(n+1) values.
            */
            var d = new Array();
            for (var i = 0; i <= m; i++) {
                d[i] = new Array();
                d[i][0] = i;
            }
            for (var j = 0; j <= n; j++) {
                d[0][j] = j;
            }

            // Populate a dictionary with the alphabet of the two strings
            for (var i = 0; i < m; i++) {
                charDictionary[s.charAt(i)] = 0;
            }
            for (var j = 0; j < n; j++) {
                charDictionary[t.charAt(j)] = 0;
            }

            // Determine substring distances
            for (var i = 1; i <= m; i++) {
                var db = 0;
                for (var j = 1; j <= n; j++) {
                    var i1 = charDictionary[t.charAt(j - 1)];
                    var j1 = db;
                    var cost = 0;

                    if (s.charAt(i - 1) == t.charAt(j - 1)) { // Subtract one to start at strings' index zero instead of index one
                        db = j;
                    } else {
                        cost = 1;
                    }
                    d[i][j] = Math.min(d[i][j - 1] + 1,                 // insertion
                         Math.min(d[i - 1][j] + 1,        // deletion
                                  d[i - 1][j - 1] + cost)); // substitution
                    if (i1 > 0 && j1 > 0) {
                        d[i][j] = Math.min(d[i][j], d[i1 - 1][j1 - 1] + (i - i1 - 1) + (j - j1 - 1) + 1); //transposition
                    }
                }
                charDictionary[s.charAt(i - 1)] = i;
            }
            // Return the strings' distance
            return d[m][n];
        };
        thisDropDown.sortByCodeStartwith = function (arr, search) {
            var bname = SKYSALES.Util.removeDiacritics(search.toLowerCase());

            var arrTempFirst = new Array();
            var arrTempLast = new Array();
            for (var i = 0; i < arr.length; i++) {
                var aname = SKYSALES.Util.removeDiacritics(arr[i].code.toLowerCase());
                if (aname.startsWith(bname))
                    arrTempFirst.push(arr[i]);
                else
                    arrTempLast.push(arr[i]);
            }
            arr = new Array();
            arr.push.apply(arr, arrTempFirst);
            arr.push.apply(arr, arrTempLast);
            return arr;
        };
        thisDropDown.sortByNameStartwith = function (arr, search) {
            if (search.length > 0) {
                var bname = SKYSALES.Util.removeDiacritics(search.toLowerCase().toLowerCase());
                var arrTempFirst = new Array();
                var arrTempLast = new Array();
                for (var i = 0; i < arr.length; i++) {
                    var aname = SKYSALES.Util.removeDiacritics(arr[i].name.toLowerCase());
                    if (aname.startsWith(bname))
                        arrTempFirst.push(arr[i]);
                    else
                        arrTempLast.push(arr[i]);
                }
                arr = new Array();
                arr.push.apply(arr, arrTempFirst);
                arr.push.apply(arr, arrTempLast);
            }
            return arr;
        };
        thisDropDown.removeAccents = function (str) {
            for (var i = 0; i < str.length; i++) {
                //Sustituye "á é í ó ú" 
                if (str.charAt(i) == "á") str = str.replace(/á/, "a");
                if (str.charAt(i) == "é") str = str.replace(/é/, "e");
                if (str.charAt(i) == "í") str = str.replace(/í/, "i");
                if (str.charAt(i) == "ó") str = str.replace(/ó/, "o");
                if (str.charAt(i) == "ú") str = str.replace(/ú/, "u");
            }
            return str;
        };

        thisDropDown.init(paramObject);

        /// #endregion VuelingSearch

        return thisDropDown;
    };

    SKYSALES.Class.DropDown.dropDownArray = OriginalDropDownClass.dropDownArray;

    SKYSALES.Class.DropDown.getDropDown = OriginalDropDownClass.getDropDown;

    VUELING.Class.Suggestion = function () {

        var parent = SKYSALES.Class.SkySales(),
            suggestion = SKYSALES.Util.extendObject(parent);

        suggestion.stationCode = '';
        suggestion.selectedSuggestion = '';
        suggestion.erroneousWord = '';

        suggestion.stationCodeId = '';
        suggestion.selectedSuggestionId = '';
        suggestion.erroneousWordId = '';

        suggestion.stationCodeInput = null;
        suggestion.selectedSuggestionInput = null;
        suggestion.erroneousWordInput = null;

        suggestion.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
        };

        suggestion.initObject = function () {
            this.stationCodeInput = this.getById(suggestion.stationCodeId);
            this.selectedSuggestionInput = this.getById(suggestion.selectedSuggestionId);
            this.erroneousWordInput = this.getById(suggestion.erroneousWordId);
        };

        suggestion.persist = function () {
            suggestion.stationCodeInput.val(suggestion.stationCode);
            suggestion.selectedSuggestionInput.val(suggestion.selectedSuggestion);
            suggestion.erroneousWordInput.val(suggestion.erroneousWord);
        };

        return suggestion;
    };

    /*
    Name:
    Class VUELING.Class.Resource
    Param:
    None
    Return:
    An instance of Respource
    Functionality:
    This class contains resources, such as stations, currencies, etc.
    Please read the comments for SKYSALES.Class.Resource in main.js for more info.
    Notes:
    Common.xslt has been modified to instantiate VUELING.Class.Resource instead of SKYSALES.Class.Resource.
    This instance is stored as SKYSALES.Resource and is also available by calling SKYSALES.Util.GetResource().
    Class Hierarchy:
    SKYSALES.Class.SkySales -> SKYSALES.Class.Resource -> VUELING.Class.Resource
    */
    VUELING.Class.Resource = function () {
        var parent = SKYSALES.Class.Resource(),
            thisResource = SKYSALES.Util.extendObject(parent);

        thisResource.labeldestinationWithConnection = '';
        thisResource.labelSelectCountry = '';
        thisResource.labelSelectOrigin = '';
        thisResource.labelSelectDestination = '';
        thisResource.labeldestinationDirect = '';
        thisResource.residentsMarketInfo = {};
        thisResource.largeFamilyMarketInfo = {};
        thisResource.connectionMarketInfo = {};

        thisResource.originCountry = {};
        thisResource.defaultCountrySelected = '';
        thisResource.originMarketArray = [];
        thisResource.originMarketArrayWithoutMac = [];
        thisResource.residentsMarketHash = {};
        thisResource.residentsOriginMarketArray = [];
        thisResource.residentsOriginMarketArrayWithoutMac = [];
        thisResource.largeFamilyMarketHash = {};
        thisResource.largeFamilyOriginMarketArray = [];
        thisResource.largeFamilyOriginMarketArrayWithoutMac = [];
        thisResource.connectionsMarketHash = [];
        thisResource.macMarketHash = [];
        thisResource.stationInfoHash = {};

        // Add functionality to init method to use the Euro symbol if it is missing from Utilities.
        thisResource.init = function (json) {
            parent.init.call(this, json);

            var info = this.currencyCultureInfo || {};

            if (!info.symbol) {
                // If symbol is empty, set it to Euro symbol (€) and fix the patterns - '\u20AC' will survive if this js file changes encodings.
                info.symbol = '\u20AC';
                info.negativePattern = info.negativePattern + info.symbol;
                info.positivePattern = info.positivePattern + info.symbol;
            }

            this.populateStationInfoHash();
            this.populateOriginMarketHash();
            this.populateOriginCountryHash();
            this.populateResidentsMarketHash();
            this.populateLargeFamilyMarketHash();
            this.populateConnectionsMarketHash();
            this.populateMacMarketHash();
        };

        thisResource.isFalseMac = function (codeStation) {
            //if (codeStation == "JTK" || codeStation == "OSA") return true;
            //return false;
            return true;
        };

        thisResource.populateOriginCountryHash = function () {
            var country,
                countryCode,
                len,
                originCountry = {};


            if (this.originMarketArray) {
                len = this.originMarketArray.length;
                for (var i = 0; i < len; i++) {
                    if (this.originMarketArray[i]) {
                        countryCode = this.originMarketArray[i].CountryCode;
                        country = this.countryHash[countryCode];
                        if (originCountry[countryCode] === undefined) {
                            originCountry[countryCode] = country;
                        }
                    }
                }
            }

            this.originCountry = originCountry;
        };

        thisResource.populateOriginMarketHash = function () {
            var station,
                originCode,
                marketHash,
                stationHash = this.stationHash;

            if (this.marketInfo && this.marketInfo.MarketList) {
                marketHash = this.replaceMac(this.marketInfo.MarketList);

                for (originCode in marketHash) {
                    if (marketHash.hasOwnProperty(originCode)) {
                        station = stationHash[originCode];
                        if (station != undefined && station.macCode == "") {
                            this.originMarketArray.push(station);
                            this.originMarketArrayWithoutMac.push(station);
                        } else if (station != undefined) {
                            this.originMarketArrayWithoutMac.push(station);
                            if (this.isFalseMac(station.macCode) && this.stationInfoHash[station.macCode] != undefined)
                                this.originMarketArray.push(station);
                            var stationMac = this.setMac(this.originMarketArray, station);
                            if (stationMac) this.originMarketArray.push(stationMac);
                        }
                    }
                }
            }
        };
        thisResource.populateStationInfoHash = function () {
            if (this.stationInfo && this.stationInfo.StationList) {
                for (var i = 0; i < this.stationInfo.StationList.length; i++) {
                    this.stationInfoHash[this.stationInfo.StationList[i].code] = this.stationInfo.StationList[i];
                }
            }
            if (this.macInfo && this.macInfo.MacList) {
                for (var i = 0; i < this.macInfo.MacList.length; i++) {
                    this.stationInfoHash[this.macInfo.MacList[i].code] = this.macInfo.MacList[i];
                }
            }
        };

        thisResource.replaceMac = function (stations) {
            var i = 0;
            var response = {};
            for (var station in stations) {
                response[station] = this.replaceMacDestionation(stations[station]);
                i = i + 1;
            }
            return response;
        };

        thisResource.replaceMacDestionation = function (stations) {
            var i = 0, j = 0;
            var response = stations;
            var response2 = [];
            for (var i = 0; i < response.length; i++) {
                var macCode = this.stationInfoHash[stations[i].code] ? this.stationInfoHash[stations[i].code].macCode : "";
                if (macCode != "") {
                    if (response[i].code && thisResource.isFalseMac(macCode)) {
                        response2[j] = { code: response[i].code, macCode: "", name: this.stationInfoHash[response[i].code].name, CountryCode: this.stationInfoHash[response[i].code].CountryCode };
                        j++;
                    }
                    response[i] = this.getMacFromStation(this.stationInfoHash[response[i].code]);
                }
                // if (this.stationInfoHash[response[i].code].macCode != "") response[i] = this.getMacFromStation(this.stationInfoHash[response[i].code]);

            }
            jQuery.merge(response, response2);
            response = this.removeCodeRepeated(response);
            return response;
        };
        thisResource.removeCodeRepeated = function (stations) {
            var response = [];
            var stationsTmp = stations;
            var station;
            var k = 0;
            var found = "false";
            for (var i = 0; i < stations.length; i++) {
                station = stations[i];
                found = "false";
                for (var j = 0; j < response.length; j++) {
                    if (response[j].code == station.code) found = "true";
                }
                if (found == "false") { response[k] = station; k = k + 1; }
            }
            return response;
        };
        thisResource.getMacFromStationCode = function (stationCode) {
            return this.stationInfoHash[stationCode].code;
        };

        thisResource.getMacFromStation = function (station) {
            if (station.code
                && this.stationInfoHash[station.code]
                && this.stationInfoHash[station.code].name
                && this.stationInfoHash[station.code].macCode
                && this.stationInfoHash[station.code].CountryCode
                && this.stationInfoHash[this.stationInfoHash[station.code].macCode]
                && this.stationInfoHash[this.stationInfoHash[station.code].macCode].name) return { code: this.stationInfoHash[station.code].macCode, macCode: "", name: this.stationInfoHash[this.stationInfoHash[station.code].macCode].name, CountryCode: this.stationInfoHash[station.code].CountryCode };
            else if (station.code && this.stationInfoHash[station.code] && this.stationInfoHash[station.code].name) return { code: station.code, macCode: "", name: this.stationInfoHash[station.code].name, CountryCode: station.CountryCode };
            else return { code: "", macCode: "", name: "", CountryCode: "" };
        };

        thisResource.isInMacArray = function (macMarketHashStation, station) {
            var found = "false";
            for (var i = 0; i < macMarketHashStation.length; i++) {
                if (macMarketHashStation[i].code == station) {
                    found = "true";
                    break;
                }
            }
            return found;
        };

        thisResource.isInArrayCitiesOrig = function (originMarketArray, station) {
            var found = "false";
            for (var i = 0; i < originMarketArray.length; i++) {
                if (originMarketArray[i].code == station.macCode) {
                    found = "true";
                    break;
                }
            }
            return found;
        };
        thisResource.setMac = function (originMarketArray, station) {
            if (thisResource.isInArrayCitiesOrig(originMarketArray, station) == "false") {
                if (station.macCode != "") {
                    var stationObj = this.getMacFromStation(station);
                    return stationObj;
                } else {
                    return station;
                }
            }
        };

        thisResource.populateMacMarketHash = function () {
            var i, j, k = 0,
            destinationArray = [],
            destination = {},
            station = {},
            originCode = "",
            marketHash = {},
            marketHashInfoMarket = {},
            stationHash = this.stationHash;

            if (this.macInfo && this.macInfo.MacList) {
                thisResource.macMarketHash = this.macInfo.MacList;
            }
        };

        thisResource.populateConnectionsMarketHash = function () {
            var i = 0,
                destinationArray = [],
                destination = {},
                station = {},
                originCode = "",
                marketHash = {},
                stationHash = this.stationHash;

            if (this.connectionMarketInfo && this.connectionMarketInfo.MarketList) {
                marketHash = this.connectionMarketInfo.MarketList;
                for (originCode in marketHash) {
                    if (marketHash.hasOwnProperty(originCode)) {
                        destinationArray = marketHash[originCode];
                    }
                }
                this.connectionsMarketHash = marketHash;
            }
        };

        thisResource.populateResidentsMarketHash = function () {
            var i = 0,
                j = 0,
                destinationArray = [],
                stationArray = [],
                destination = {},
                station = {},
                originCode = "",
                marketHash = {},
                stationHash = this.stationHash;

            if (this.residentsMarketInfo && this.residentsMarketInfo.MarketList) {
                marketHash = this.replaceMac(this.residentsMarketInfo.MarketList);

                if (this.stationCountryInfo && this.stationCountryInfo.StationCountryList) {
                    for (var market in marketHash) {
                        if (marketHash.hasOwnProperty(market) && this.stationCountryInfo.StationCountryList[market]) {
                            stationArray = marketHash[market];
                            for (j = 0; j < stationArray.length; j += 1) {
                                station = stationArray[j];
                                marketHash[market][j].CountryCode = this.stationCountryInfo.StationCountryList[market][0].CountryCode;
                            }
                        }
                    }
                }

                for (originCode in marketHash) {
                    if (marketHash.hasOwnProperty(originCode)) {
                        destinationArray = marketHash[originCode];

                        station = stationHash[originCode];
                        if (station != undefined && station.macCode == "") {
                            this.residentsOriginMarketArray.push(station);
                            this.residentsOriginMarketArrayWithoutMac.push(station);
                        } else {
                            if (station != undefined) {
                                if (this.isFalseMac(station.macCode)) {
                                    this.residentsOriginMarketArray.push(station);
                                }
                                this.residentsOriginMarketArrayWithoutMac.push(station);
                                var stationMac = this.setMac(this.residentsOriginMarketArray, station);
                                if (stationMac) this.residentsOriginMarketArray.push(stationMac);
                            }
                        }

                        for (i = destinationArray.length - 1; i >= 0; i -= 1) {
                            destination = destinationArray[i];
                            station = stationHash[destination.code];
                            if (station) {
                                destination.name = station.name;
                            }
                        }
                    }
                }
                this.residentsMarketHash = marketHash;
            }
        };

        thisResource.populateLargeFamilyMarketHash = function () {
            var i = 0,
                j = 0,
                destinationArray = [],
                stationArray = [],
                destination = {},
                station = {},
                originCode = "",
                marketHash = {},
                stationHash = this.stationHash;

            if (this.largeFamilyMarketInfo && this.largeFamilyMarketInfo.MarketList) {
                marketHash = this.replaceMac(this.largeFamilyMarketInfo.MarketList);

                if (this.stationCountryInfo && this.stationCountryInfo.StationCountryList) {
                    for (var market in marketHash) {
                        if (marketHash.hasOwnProperty(market) && this.stationCountryInfo.StationCountryList[market]) {
                            stationArray = marketHash[market];
                            for (j = 0; j < stationArray.length; j += 1) {
                                station = stationArray[j];
                                marketHash[market][j].CountryCode = this.stationCountryInfo.StationCountryList[market][0].CountryCode;
                            }
                        }
                    }
                }

                for (originCode in marketHash) {
                    if (marketHash.hasOwnProperty(originCode)) {
                        destinationArray = marketHash[originCode];

                        station = stationHash[originCode];
                        if (station != undefined && station.macCode == "") {
                            this.largeFamilyOriginMarketArray.push(station);
                            this.largeFamilyOriginMarketArrayWithoutMac.push(station);
                        } else {
                            if (station != undefined) {
                                if (this.isFalseMac(station.macCode)) {
                                    this.largeFamilyOriginMarketArray.push(station);
                                }
                                this.largeFamilyOriginMarketArrayWithoutMac.push(station);
                                var stationMac = this.setMac(this.largeFamilyOriginMarketArray, station);
                                if (stationMac) this.largeFamilyOriginMarketArray.push(stationMac);
                            }
                        }
                        for (i = destinationArray.length - 1; i >= 0; i -= 1) {
                            destination = destinationArray[i];
                            station = stationHash[destination.code];
                            if (station) {
                                destination.name = station.name;
                            }
                        }
                    }
                }
                this.largeFamilyMarketHash = marketHash;
            }
        };

        return thisResource;
    };

    VUELING.Class.EasyPicker = function () {

        var parent = new SKYSALES.Class.SkySales(),
            thisEasyPicker = SKYSALES.Util.extendObject(parent),
            resource = SKYSALES.Util.getResource();

        thisEasyPicker.calendarId = "";
        thisEasyPicker.options = "";
        thisEasyPicker.setDate = "";

        thisEasyPicker.calendarInput = "";

        thisEasyPicker.init = function (paramObj) {
            this.setSettingsByObject(paramObj);
            this.setVars();
            thisEasyPicker.locale();
            thisEasyPicker.calendarInput.datepicker();
            if (thisEasyPicker.options != "") {
                for (var i in thisEasyPicker.options) {
                    thisEasyPicker.calendarInput.datepicker("option", i, thisEasyPicker.options[i]);
                }
            }
            if (thisEasyPicker.setDate != "")
                thisEasyPicker.calendarInput.datepicker("setDate", thisEasyPicker.setDate);
        };

        thisEasyPicker.setVars = function () {
            parent.setVars.call(this);
            this.calendarInput = this.getById(this.calendarId);
        };

        thisEasyPicker.locale = function () {
            $.datepicker.regional['vy'] = {
                closeText: resource.datePickerInfo.closeText,
                prevText: resource.datePickerInfo.prevText,
                nextText: resource.datePickerInfo.nextText,
                currentText: resource.datePickerInfo.currentText,
                monthNames: resource.dateCultureInfo.monthNames,
                monthNamesShort: resource.dateCultureInfo.monthNamesShort,
                dayNames: resource.dateCultureInfo.dayNames,
                dayNamesShort: resource.dateCultureInfo.dayNamesShort,
                dayNamesMin: resource.dateCultureInfo.dayNamesMin,
                dateFormat: resource.datePickerInfo.datePickerFormat
            };
            $.datepicker.setDefaults($.datepicker.regional['vy']);
        };

        return thisEasyPicker;
    };

    // Represents a drop-down menu that shows when the user hovers over the header
    VUELING.Class.DropDownMenu = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisDropDownMenu = SKYSALES.Util.extendObject(parent);

        // The header/title area (e.g. Edit)
        thisDropDownMenu.header = {};
        thisDropDownMenu.headerId = "";

        // The menu itself; the part that appears/disappears
        thisDropDownMenu.menu = {};
        thisDropDownMenu.menuId = "";

        // The menu bar, if there is one, that contains the list of menus; 
        // we have to update the class on this when we hover
        thisDropDownMenu.menuBar = null;
        thisDropDownMenu.menuBarId = "";

        // when the mouse is hovering, we will set the menu bar's class to this value
        thisDropDownMenu.menuBarHoverClass = "";

        thisDropDownMenu.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisDropDownMenu.setVars = function () {
            this.header = this.getById(this.headerId);
            this.menu = this.getById(this.menuId);
            this.menuBar = this.getById(this.menuBarId);
        };

        thisDropDownMenu.addEvents = function () {
            this.header.hover(
                this.mouseInHandler,
                this.mouseOutHandler);

            this.menu.hover(
                this.mouseInHandler,
                this.mouseOutHandler);

        };

        // Called when the mouse pointer enters the menu header area.
        thisDropDownMenu.mouseInHandler = function (e) {
            thisDropDownMenu.mouseIn(e);
        };
        thisDropDownMenu.mouseIn = function (e) {
            this.menu.show();
            if (this.menuBar) {
                this.menuBar.addClass(this.menuBarHoverClass);
            }
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $("#ui-datepicker-div").css("display", "none");
            }
        };

        // Called when the mouse pointer exits the menu header area.
        thisDropDownMenu.mouseOutHandler = function (e) {
            thisDropDownMenu.mouseOut(e);
        };
        thisDropDownMenu.mouseOut = function (e) {
            this.menu.hide();
            if (this.menuBar) {
                this.menuBar.removeClass(this.menuBarHoverClass);
            }
        };

        return thisDropDownMenu;

    };


    /*
    Name:
    Class LanguageOption
    Param:
    None
    Return:
    An instance of LanguageOption
    Functionality:
    This class represents a single language option <li> in the language drop-down in the upper-right hand corner of the header.
    This drop-down allows the user to view Vueling's site in the language of their choice.
    Notes:

    Class Hierarchy:
    SkySales -> LanguageOption
    */
    VUELING.Class.LanguageOption = function () {
        // When we use inheritance, the following two lines are very important.
        // First we create the parent object; then we configure thisLanguageOption to use it as its prototype.
        // All new classes should inherit directly or indirectly from SkySales.
        // About prototypal inheritance:
        //      Douglas Crockford's book, "Javascript: The Good Parts" has an excellent description of how this works.
        //      In prototypal inheritance, we look for a method or field in the current object, and if it isn't found,
        //      we look in the parent object, and then its parent, and so on.
        var parent = SKYSALES.Class.SkySales(),
            thisLanguageOption = SKYSALES.Util.extendObject(parent);

        // Fields: - here we define all the fields that will be available in this class

        // for example, "es-ES"
        thisLanguageOption.languageCode = '';

        thisLanguageOption.listItemId = '';
        // The list item that shows the language. For example, "Euskara"
        thisLanguageOption.listItem = null;

        // All classes should have these four methods:
        //    init, setVars, addEvents, and clickHandler

        thisLanguageOption.init = function (json) {
            // init methods usually call these methods:
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisLanguageOption.setVars = function () {
            this.listItem = this.getById(this.listItemId);
        };

        thisLanguageOption.addEvents = function () {
            this.listItem.click(this.clickHandler);
        };

        // Our pattern is to have a "Handler" method that immediately calls the other method.
        // This is because when an event handler is called, "this" is actually pointing at the DOM element, not thisLanguageOption
        // By calling another method in thisLanguageOption, we get the right "this".
        // 
        // There are only two places we should use "thisXXXXXXXXXXX":
        //      On the left side of an assignment. (e.g. thisValidate.Something = something)
        //      In an event handler with a single line, where we call another method with the correct "this".
        thisLanguageOption.clickHandler = function (e) {
            thisLanguageOption.click(e);
        };
        thisLanguageOption.click = function (e) {
            e.preventDefault();
            this.changePageLanguage(this.languageCode);
        };

        // language is the code for the new language; for example, "es-ES"
        thisLanguageOption.changePageLanguage = function (language) {
            var regex = /&{0,1}culture=[\w\-]*/gi,
                search = window.location.search,
                cleanedSearch = search.substring(1).replace(regex, ""),
                newSearch = "?culture=" + language;

            if (cleanedSearch) {
                if (cleanedSearch.charAt(0) !== "&") {
                    newSearch = newSearch + "&";
                }
                newSearch = newSearch + cleanedSearch;
            }

            window.location.search = newSearch;
        };

        // In JS, the function "LanguageOption" is actually the constructor for our class. If we returned "this,"
        // then the new object would be the one we just finished defining. However, in our pattern that uses
        // SKYSALES.Util.extendObject, we always return thisXXXXXXXXXXXXXX. If I do this:
        // var obj = new thisLanguageOption();
        // then obj will contain the thisLanguageOption object we just finished populating.
        // One of the big benefits of this pattern is that we can have private state. For example, there is a variable
        // called "parent" that only our thisLanguageOption object and its functions can see.
        return thisLanguageOption;
    };

    VUELING.Class.CookiePolicy = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisCookiePolicy = SKYSALES.Util.extendObject(parent);

        // Fields: - here we define all the fields that will be available in this class

        thisCookiePolicy.idPanel = "";
        thisCookiePolicy.panel = null;

        thisCookiePolicy.idCloseOption = "";
        thisCookiePolicy.closeOption = null;

        thisCookiePolicy.idAcceptOption = "";
        thisCookiePolicy.acceptOption = null;

        // All classes should have these four methods:
        //    init, setVars, addEvents, and clickHandler

        thisCookiePolicy.init = function (json) {
            // init methods usually call these methods:
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisCookiePolicy.setVars = function () {
            thisCookiePolicy.panel = $('#' + thisCookiePolicy.idPanel);
            thisCookiePolicy.closeOption = $('#' + thisCookiePolicy.idCloseOption);
            thisCookiePolicy.acceptOption = $('#' + thisCookiePolicy.idAcceptOption);
        };

        thisCookiePolicy.addEvents = function () {
            thisCookiePolicy.closeOption.bind("click", thisCookiePolicy.closeCookiePolicyPanel);
            thisCookiePolicy.acceptOption.bind("click", thisCookiePolicy.acceptCookiePolicy);
        };

        thisCookiePolicy.acceptCookiePolicy = function () {
            $.ajax({
                url: "CookiePolicy.aspx",
                beforeSend: thisCookiePolicy.closeCookiePolicyPanel,
                error: function (jqXHR, textStatus) {
                    console.error("Error set cookie policy accepted. Status: " + textStatus);
                },
                complete: thisCookiePolicy.closeCookiePolicyPanel,
                dataType: "html",
            });
        };

        thisCookiePolicy.closeCookiePolicyPanel = function () {
            thisCookiePolicy.panel.slideUp();
        };

        return thisCookiePolicy;
    };

    /*
    Class Hierarchy:
    SkySales -> SKYSALES.Class.ToggleView -> VUELING.Class.CustomToggleView
    Notes:
    For an example of this class being used, look for "SKYSALES.Util.createObject" in ..\VuelingBase\XSLT\Controls\StaticHeaderAgency_View1.xslt
    */
    VUELING.Class.CustomToggleView = function () {
        var parent = new SKYSALES.Class.ToggleView(),
            thisCustomToggleView = SKYSALES.Util.extendObject(parent);

        // In many places, it is important to use "thisXXXXXXXXXXXXXXX" instead of "this"
        //      Some people use "that" instead of "thisXXXXXXXXXXXXXXX" as their convention.
        // All elements that match the elementSelector will be shown or hidden.
        thisCustomToggleView.elementSelector = '';

        // This argument will be passed to show() and hide(); this could be "fast," "slow," or a number.
        thisCustomToggleView.duration = 0;

        // prevents the default click action in the browser; for example, if your trigger is an <a>, the link's href won't be visited.
        thisCustomToggleView.preventDefault = false;

        thisCustomToggleView.setVars = function () {
            parent.setVars.call(this);

            // Element is a jQuery element, which can contain one or many elements;
            // If we are using a selector, then element may represent more than one elements,
            // and all of them will be shown and hidden together.
            if (this.elementSelector) {
                parent.element = $(this.elementSelector);
            }
        };

        // By convention, SkySales classes always include these methods:
        //      init
        //      setVars
        //      addEvents
        // This init method takes a JSON object and uses it to initalize the fields in this object (and up the parent chain)
        // For example,

        //      setSettingsByObject will look for fields called "showId," "hideId," and "elementSelector."
        //      It will find showId and hideId in the parent ToggleView and set their values to 'myButton' and 'myButton2'
        //      It will find elementSelector in this CustomToggleView and set its value to '.arrow'
        thisCustomToggleView.init = function (paramObj) {
            // By convention, init calls these three methods.
            // setSettingsByObject is implemented in the SkySales class (CustomToggleView's grandparent);
            // It uses the JSON object to set all of the fields found in this class, its parent, etc.
            this.setSettingsByObject(paramObj);
            this.setVars();
            this.addEvents();
        };

        // This method takes an event handler "e" and conditionally calls its preventDefault method;
        // This is used, for example, to prevent a link from redirecting the browser to a new location.
        thisCustomToggleView.doPreventDefault = function (e) {
            if (this.preventDefault && e.preventDefault) {
                e.preventDefault();
            }
        };

        // this method hides the method with the same name in the parent class (ToggleView)
        thisCustomToggleView.updateShowHandler = function (e) {
            thisCustomToggleView.updateShow(e);
        };
        // this method hides the method with the same name in the parent class (ToggleView)
        thisCustomToggleView.updateShow = function (e) {
            this.doPreventDefault(e);
            // we negate, because an element set could be partially visible (which would still report as hidden)
            if (!parent.element.is(":hidden")) {
                return;
            }

            if (e.stopPropagation) {
                // if show and hide elements overlap, this is needed to prevent an item from showing and then immediately hiding.
                e.stopPropagation();
            }
            // When updateShowHandler (or any event handler) is called, "this" is actually set to the DOM element
            // that raised the event (and not thisCustomToggleView).
            // So we call updateShow, which will have the right value for "this"
            this.element.show(this.duration);
        };

        // this method hides the method with the same name in the parent class
        thisCustomToggleView.updateHideHandler = function (e) {
            thisCustomToggleView.doPreventDefault(e);
            // we negate, because an element set could be partially visible (which would still report as visible)
            if (!parent.element.is(":visible")) {
                return;
            }

            if (e.stopPropagation) {
                // if show and hide elements overlap, this is needed to prevent an item from showing and then immediately hiding.
                e.stopPropagation();
            }
            thisCustomToggleView.updateHide();
        };
        // this method hides the method with the same name in the parent class
        thisCustomToggleView.updateHide = function () {
            this.element.hide(this.duration);
        };

        // this method hides the method with the same name in the parent class
        thisCustomToggleView.updateToggleHandler = function (e) {
            thisCustomToggleView.doPreventDefault(e);
            thisCustomToggleView.updateToggle();
        };
        // this method hides the method with the same name in the parent class
        thisCustomToggleView.updateToggle = function () {
            this.element.toggle(this.duration);
        };


        return thisCustomToggleView;
    };

    /*
    Name:
    Class VuelingTravelDocument
    Param:
    None
    Return:
    An instance of VuelingTravelDocument
    Functionality:
    The object that initializes the VuelingTravelDocument control
    Notes:
    This class contains and creates all of the objects necessary to add functionality to the VuelingTravelDocument control
    Class Hierarchy:
    SkySales -> VuelingTravelDocument
    */
    VUELING.Class.VuelingTravelDocument = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisVuelingTravelDocument = SKYSALES.Util.extendObject(parent),
            resource = SKYSALES.Util.getResource(),
            MonthInfo = resource.dateCultureInfo.monthNames || [];

        thisVuelingTravelDocument.countryInputIdArray = [];
        thisVuelingTravelDocument.countryInputValues = "";
        thisVuelingTravelDocument.countryInputId = "";
        thisVuelingTravelDocument.yearInputId = "";
        thisVuelingTravelDocument.monthInputId = "";
        thisVuelingTravelDocument.dayInputId = "";
        thisVuelingTravelDocument.yearInput = null;
        thisVuelingTravelDocument.monthInput = null;
        thisVuelingTravelDocument.dayInput = null;
        thisVuelingTravelDocument.yearSelected = "";
        thisVuelingTravelDocument.monthSelected = "";
        thisVuelingTravelDocument.daySelected = "";
        thisVuelingTravelDocument.birthYearInputId = "";
        thisVuelingTravelDocument.birthMonthInputId = "";
        thisVuelingTravelDocument.birthDayInputId = "";
        thisVuelingTravelDocument.birthYearInput = null;
        thisVuelingTravelDocument.birthMonthInput = null;
        thisVuelingTravelDocument.birthDayInput = null;
        thisVuelingTravelDocument.birthYearSelected = "";
        thisVuelingTravelDocument.birthMonthSelected = "";
        thisVuelingTravelDocument.birthDaySelected = "";
        thisVuelingTravelDocument.countryInputArray = [];
        thisVuelingTravelDocument.MonthInfo = MonthInfo;
        thisVuelingTravelDocument.ExpeditionCountry = "";
        thisVuelingTravelDocument.passengerGender = "";
        thisVuelingTravelDocument.genderInputArray = [];
        thisVuelingTravelDocument.genderInputId = "";
        thisVuelingTravelDocument.genderInput = null;
        thisVuelingTravelDocument.genderSelected = "";
        thisVuelingTravelDocument.genderValues = "";
        thisVuelingTravelDocument.genderNames = null;
        thisVuelingTravelDocument.DoctypeCodeInputId = "";
        thisVuelingTravelDocument.DoctypeCodeInput = null;
        thisVuelingTravelDocument.DoctypeCodeSelected = "";
        thisVuelingTravelDocument.DoctypeCodeValues = "";
        thisVuelingTravelDocument.DoctypeCodeNames = null;
        thisVuelingTravelDocument.DocExpirationDateId = null;
        thisVuelingTravelDocument.DocExpirationDate = '';
        thisVuelingTravelDocument.DocExpirationDateLabel = null;
        thisVuelingTravelDocument.countryNamesArray = [];
        thisVuelingTravelDocument.cultureSelected = null;
        thisVuelingTravelDocument.countryNamesArray = null;
        thisVuelingTravelDocument.checkInfoTravelDocId = null;
        thisVuelingTravelDocument.checkInfoTravelDoc = null;
        thisVuelingTravelDocument.SectionId = null;
        thisVuelingTravelDocument.nombrePaxInputId = null;
        thisVuelingTravelDocument.apellidoPaxInputId = null;
        thisVuelingTravelDocument.numeroDocInputId = null;
        thisVuelingTravelDocument.nombrePaxInput = null;
        thisVuelingTravelDocument.apellidoPaxInput = null;
        thisVuelingTravelDocument.numeroDocInput = null;
        thisVuelingTravelDocument.countryInput = null;
        thisVuelingTravelDocument.originalDNIOption = null;
        thisVuelingTravelDocument.originalPassportOption = null;
        thisVuelingTravelDocument.arrayCoutriesDNIAllowed = null;
        thisVuelingTravelDocument.arrayCountriesPassportAllowed = null;
        thisVuelingTravelDocument.h3PaxId = "";
        thisVuelingTravelDocument.infoLinkCloseButtonId = '';
        thisVuelingTravelDocument.infoBoxId = '';
        thisVuelingTravelDocument.infoBoxIdContent = '';
        thisVuelingTravelDocument.borderColorRedContainer = '';
        thisVuelingTravelDocument.forcedWidth = '500px';
        thisVuelingTravelDocument.blockUI = null;

        thisVuelingTravelDocument.setSettingsByObject = function (json) {
            parent.setSettingsByObject.call(this, json);
        };

        thisVuelingTravelDocument.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
            this.initCountryInputIdArray();
            this.populateDay(this.dayInput, this.daySelected);
            this.populateMonth(this.monthInput, this.monthSelected);
            this.populateYear(this.yearInput, this.yearSelected);
            this.populateDay(this.birthDayInput, this.birthDaySelected);
            this.populateMonth(this.birthMonthInput, this.birthMonthSelected);
            this.populateBirthYear(this.birthYearInput, this.birthYearSelected);
            this.populateDocType(this.DoctypeCodeInput, this.DoctypeCodeSelected, this.DoctypeCodeNames, this.DoctypeCodeValues);
            this.populateGender(this.genderInput, this.genderSelected, this.genderNames, this.genderValues);
            this.ShrinkNoChecked(this.checkInfoTravelDocId, this.SectionId);
            this.initPopupCountryResident();

        };

        thisVuelingTravelDocument.setVars = function () {
            parent.setVars.call(this);
            this.dayInput = this.getById(this.dayInputId);
            this.monthInput = this.getById(this.monthInputId);
            this.yearInput = this.getById(this.yearInputId);
            this.birthDayInput = this.getById(this.birthDayInputId);
            this.birthMonthInput = this.getById(this.birthMonthInputId);
            this.birthYearInput = this.getById(this.birthYearInputId);
            this.DoctypeCodeInput = this.getById(this.DoctypeCodeInputId);
            this.countryInput = this.getById(this.countryInputId);
            this.genderInput = this.getById(this.genderInputId);
            this.checkInfoTravelDoc = this.getById(this.checkInfoTravelDocId);
            this.nombrePaxInput = this.getById(this.nombrePaxInputId);
            this.apellidoPaxInput = this.getById(this.apellidoPaxInputId);
            this.numeroDocInput = this.getById(this.numeroDocInputId);
            this.infoLinkCloseButton = this.getById(this.infoLinkCloseButtonId);
            this.DocExpirationDate = this.getById(this.DocExpirationDateId);
        };

        thisVuelingTravelDocument.SetAllValidations = function () {
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.nombrePaxInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.apellidoPaxInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.numeroDocInput), 'required', 'true');
            if ($(this.DoctypeCodeInput).val() == "DNI")
                SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.numeroDocInput), 'validationtype', 'NIF');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.genderInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.dayInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.monthInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.yearInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.birthDayInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.birthMonthInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.birthYearInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.DoctypeCodeInput), 'required', 'true');
            SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.countryInput), 'required', 'true');
        };

        thisVuelingTravelDocument.RemoveValidations = function () {
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.nombrePaxInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.apellidoPaxInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.numeroDocInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.numeroDocInput), 'validationtype');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.genderInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.dayInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.monthInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.yearInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.birthDayInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.birthMonthInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.birthYearInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.DoctypeCodeInput), 'required');
            SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.countryInput), 'required');
        };

        thisVuelingTravelDocument.addEvents = function () {

            this.checkInfoTravelDoc.click(function (e) {
                var divSec = "#" + $('#' + e.currentTarget.id).parent().parent().parent().attr("id");
                var checkState = e.currentTarget.checked;
                thisVuelingTravelDocument.checkUncheckPaxLogic(checkState, divSec);
            });

            this.DoctypeCodeInput.change(function (e) {
                if ($(thisVuelingTravelDocument.DoctypeCodeInput).val() == "DNI")
                    SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.numeroDocInput), 'validationtype', 'NIF');
                else
                    SKYSALES.Util.removeAttribute($(thisVuelingTravelDocument.numeroDocInput), 'validationtype');
            });


            this.countryInput.change(function (e) {
                var selectedCountry = $(thisVuelingTravelDocument.countryInput).val();

                thisVuelingTravelDocument.removeDocTypeCodeInputs();

                if (thisVuelingTravelDocument.isCountryAllowed(selectedCountry)) {
                    thisVuelingTravelDocument.dniSelectedActions(selectedCountry);
                }
                else if (thisVuelingTravelDocument.isPassportAllowed(selectedCountry)) {
                    thisVuelingTravelDocument.passportSelectedActions();
                }
                else {
                    var nameCountry = "";
                    var countries = new SKYSALES.Class.CountryInput(thisVuelingTravelDocument.ExpeditionCountry, thisVuelingTravelDocument.countryInputValues, thisVuelingTravelDocument.countryNamesArray);
                    for (var i = 0; i < countries.countryInfo.CountryList.length; i += 1) {
                        if (countries.countryInfo.CountryList[i].code == selectedCountry) {
                            nameCountry = countries.countryInfo.CountryList[i].name;
                            break;
                        }
                    }

                    if (document.getElementById(thisVuelingTravelDocument.infoBoxIdContent).innerHTML.indexOf('{{COUNTRYNAME}}') >= 0) {
                        document.getElementById(thisVuelingTravelDocument.infoBoxIdContent).innerHTML = document.getElementById(thisVuelingTravelDocument.infoBoxIdContent).innerHTML.replace('{{COUNTRYNAME}}', "<strong>" + nameCountry + "</strong>");
                    } else {
                        document.getElementById(thisVuelingTravelDocument.infoBoxIdContent).innerHTML = thisVuelingTravelDocument.replaceTag('strong', document.getElementById(thisVuelingTravelDocument.infoBoxIdContent).innerHTML, nameCountry);
                    }

                    thisVuelingTravelDocument.blockUI.show(thisVuelingTravelDocument.infoBoxId);

                    //modify border color of container
                    var container = thisVuelingTravelDocument.infoBoxId + "Box";
                    $('.' + container).addClass(thisVuelingTravelDocument.borderColorRedContainer);
                }
            });
        };

        thisVuelingTravelDocument.replaceTag = function (tag, txt, nameCountry) {
            var re = new RegExp("<" + tag + "+[^>]*>(.*?)</" + tag + ">", "");
            return txt.replace(re, "<strong>" + nameCountry + "</strong>");
        };

        thisVuelingTravelDocument.removeDocTypeCodeInputs = function () {
            thisVuelingTravelDocument.DoctypeCodeInput.find('[value="DNI"]').remove();
            thisVuelingTravelDocument.DoctypeCodeInput.find('[value="P"]').remove();
        };

        thisVuelingTravelDocument.dniSelectedActions = function (selectedCountry) {
            //thisVuelingTravelDocument.DoctypeCodeInput.removeAttr("disabled");
            thisVuelingTravelDocument.DoctypeCodeInput.append(thisVuelingTravelDocument.originalDNIOption).attr("selected", "selected");
            var stringArrayCoutriesDNIAllowed = JSON.stringify(thisVuelingTravelDocument.arrayCoutriesDNIAllowed);
            if (stringArrayCoutriesDNIAllowed.indexOf(selectedCountry) >= 0) {
                thisVuelingTravelDocument.DoctypeCodeInput.append(thisVuelingTravelDocument.originalPassportOption);
            }
        };

        thisVuelingTravelDocument.passportSelectedActions = function () {
            thisVuelingTravelDocument.DoctypeCodeInput.append(thisVuelingTravelDocument.originalPassportOption);
        };

        thisVuelingTravelDocument.isCountryAllowed = function (selectedCountry) {
            var stringArrayCoutriesDNIAllowed = JSON.stringify(thisVuelingTravelDocument.arrayCoutriesDNIAllowed);
            return stringArrayCoutriesDNIAllowed.indexOf(selectedCountry) >= 0;
        };

        thisVuelingTravelDocument.isPassportAllowed = function (selectedCountry) {
            var stringArrayCoutriesPassportAllowed = JSON.stringify(thisVuelingTravelDocument.arrayCountriesPassportAllowed);
            return stringArrayCoutriesPassportAllowed.indexOf(selectedCountry) >= 0;
        };

        thisVuelingTravelDocument.ShrinkNoChecked = function (check, section) {
            var divSec = "#" + section;
            var inputname = "[name=" + check + "]";
            if (thisVuelingTravelDocument.checkInfoTravelDoc !== null) {
                var checkState = $(inputname).is(':checked');
                thisVuelingTravelDocument.checkUncheckPaxLogic(checkState, divSec);
            }
        };

        thisVuelingTravelDocument.checkUncheckPaxLogic = function (checkState, divSec) {
            if (checkState) {
                $(thisVuelingTravelDocument.dayInput).change(thisVuelingTravelDocument.updateDocExpirationDate);
                $(thisVuelingTravelDocument.monthInput).change(thisVuelingTravelDocument.updateDocExpirationDate);
                $(thisVuelingTravelDocument.yearInput).change(thisVuelingTravelDocument.updateDocExpirationDate);
                thisVuelingTravelDocument.SetAllValidations();
                $(divSec).find('.contentSection').removeClass("hidden");
                $('#' + thisVuelingTravelDocument.h3PaxId).addClass("state-hover");
                $('#' + thisVuelingTravelDocument.h3PaxId).removeClass("state-off");
            } else {
                thisVuelingTravelDocument.RemoveValidations();
                $(divSec).find('.contentSection').addClass("hidden");
                $('#' + thisVuelingTravelDocument.h3PaxId).addClass("state-off");
                $('#' + thisVuelingTravelDocument.h3PaxId).removeClass("state-hover");
            }
        };

        thisVuelingTravelDocument.updateDocExpirationDate = function () {
            var year = thisVuelingTravelDocument.yearInput.val();
            var month = thisVuelingTravelDocument.monthInput.val();
            var day = thisVuelingTravelDocument.dayInput.val();

            if (year && month && day) {
                thisVuelingTravelDocument.DocExpirationDate.val(day + "/" + month + "/" + year);
                SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.monthInput), 'cardexpirationid', 'true');
                SKYSALES.Util.setAttribute($(thisVuelingTravelDocument.monthInput), 'cardexpirationerror', thisVuelingTravelDocument.DocExpirationDateLabel);
            }

        };

        thisVuelingTravelDocument.initPopupCountryResident = function () {
            thisVuelingTravelDocument.blockUI = new SKYSALES.Class.BlockedPopUp();
            var json = {};
            json.closeElement = this.infoLinkCloseButton;
            json.properties = { css: { width: this.forcedWidth } };
            this.blockUI.init(json);
        };

        thisVuelingTravelDocument.initCountryInputIdArray = function () {
            var i = 0,
                countryInputId = null,
                countryInput = {},
                countryInputIdArray = this.countryInputIdArray || [];

            for (i = 0; i < countryInputIdArray.length; i += 1) {
                countryInputId = countryInputIdArray[i];
                countryInput = new SKYSALES.Class.CountryInput(this.ExpeditionCountry, this.countryInputValues, this.countryNamesArray);
                countryInput.init(countryInputId);
                thisVuelingTravelDocument.countryInputArray[this.countryInputArray.length] = countryInput;
            }
        };

        thisVuelingTravelDocument.populateDocType = function (doctypeDom, selectedDoctype, doctypeNames, doctypeValues) {
            var i = 0,
            doctypeComboValues = [],
            doctypeJson = {};

            for (i = 0; i < doctypeValues.length; i++) {
                doctypeComboValues[i] = {
                    "code": doctypeValues[i],
                    "name": doctypeNames[i]
                }
            }

            doctypeJson = {
                "selectBox": doctypeDom,
                "objectArray": doctypeComboValues,
                "selectedItem": selectedDoctype
            };
            SKYSALES.Util.populateSelect(doctypeJson);
            thisVuelingTravelDocument.copyDNISelectOption();

        };

        thisVuelingTravelDocument.copyDNISelectOption = function () {
            thisVuelingTravelDocument.originalDNIOption = jQuery.extend(true, {}, thisVuelingTravelDocument.DoctypeCodeInput.find('[value="DNI"]'));

            thisVuelingTravelDocument.originalPassportOption = jQuery.extend(true, {}, thisVuelingTravelDocument.DoctypeCodeInput.find('[value="P"]'));

            var selectedCountry = "";
            if ($(thisVuelingTravelDocument.countryInput) != undefined)
                selectedCountry = $(thisVuelingTravelDocument.countryInput).val();
            else
                selectedCountry = "";
            if (!thisVuelingTravelDocument.isCountryAllowed(selectedCountry)) {
                thisVuelingTravelDocument.setPassportActions();
            }
        };

        thisVuelingTravelDocument.setPassportActions = function () {
            thisVuelingTravelDocument.DoctypeCodeInput.find('[value="P"]').attr("selected", "selected");
            $(thisVuelingTravelDocument.DoctypeCodeInput).change();
            thisVuelingTravelDocument.DoctypeCodeInput.find('[value="DNI"]').remove();
        };

        thisVuelingTravelDocument.populateGender = function (genderDom, selectedGender, genderNames, genderValues) {
            var i = 0,
                genderComboValues = [],
                genderJson = {};
            for (i = 0; i < genderValues.length; i++) {
                genderComboValues[i] = {
                    "code": genderValues[i],
                    "name": genderNames[i]
                }
            }

            genderJson = {
                "selectBox": genderDom,
                "objectArray": genderComboValues,
                "selectedItem": selectedGender
            };
            SKYSALES.Util.populateSelect(genderJson);
        }

        thisVuelingTravelDocument.populateDay = function (dayDom, selectedDay) {
            var i = 0,
                dayValues = [],
                dayJson = {};

            for (i = 1; i <= 31; i += 1) {
                dayValues[i - 1] = {
                    "code": this.formatDateValue(i),
                    "name": i
                };
            }

            dayJson = {
                "selectBox": dayDom,
                "objectArray": dayValues,
                "selectedItem": this.formatDateValue(selectedDay)
            };
            SKYSALES.Util.populateSelect(dayJson);
        };

        thisVuelingTravelDocument.formatDateValue = function (value) {
            var stringValue = value.toString();
            if (stringValue.length === 1) {
                stringValue = '0' + stringValue;
            }
            return stringValue;
        };

        thisVuelingTravelDocument.populateMonth = function (monthDom, selectedMonth) {
            var
                initialDate = new Date(),
                monthValues = [],
                monthJson = {},
                monthCtr = 0,
                monthText = this.MonthInfo;


            for (monthCtr = 0; monthCtr < 12; monthCtr += 1) {
                monthValues[monthCtr] = {
                    "code": this.formatDateValue(monthCtr + 1),
                    "name": monthText[monthCtr]
                };
            }

            monthJson = {
                "selectBox": monthDom,
                "objectArray": monthValues,
                "selectedItem": this.formatDateValue(selectedMonth)
            };

            SKYSALES.Util.populateSelect(monthJson);
        };

        thisVuelingTravelDocument.populateYear = function (YearDom, selectedYear) {
            var yearCtr = 0,
                initialDate = new Date(),
                year = initialDate.getFullYear(),
                yearRange = 12,
                YearValues = [],
                YearJson = {};

            for (yearCtr = 0; yearCtr <= yearRange; yearCtr += 1) {
                YearValues[yearCtr] = {
                    "code": year,
                    "name": year
                };

                year = year + 1;
            }

            YearJson = {
                "selectBox": YearDom,
                "objectArray": YearValues,
                "selectedItem": selectedYear
            };

            SKYSALES.Util.populateSelect(YearJson);
        };

        thisVuelingTravelDocument.populateBirthYear = function (YearDom, selectedYear) {
            var yearCtr = 0,
                initialDate = new Date(),
                year = initialDate.getFullYear(),
                yearRange = 100,
                YearValues = [],
                YearJson = {};

            for (yearCtr = 0; yearCtr <= yearRange; yearCtr += 1) {
                YearValues[yearCtr] = {
                    "code": year,
                    "name": year
                };

                year = year - 1;
            }

            YearJson = {
                "selectBox": YearDom,
                "objectArray": YearValues,
                "selectedItem": selectedYear
            };

            SKYSALES.Util.populateSelect(YearJson);
        };


        return thisVuelingTravelDocument;
    };

    /*
    Name:
    Class UpdateProfile
    Param:
    None
    Return:
    An instance of UpdateProfile
    Functionality:
    Handles the UpdateProfile controls
    Class Hierarchy:
    SkySales -> UpdateProfile
    */
    SKYSALES.Class.UpdateProfile = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisUpdateProfile = SKYSALES.Util.extendObject(parent);

        /* Configuration */
        thisUpdateProfile.SubmitButtonId = '';
        thisUpdateProfile.EditButtonId = '';
        thisUpdateProfile.SectionId = '';
        thisUpdateProfile.ResidenceProvinceId = '';
        thisUpdateProfile.ResidenceCountryId = '';
        thisUpdateProfile.DocumentTypeId = '';
        thisUpdateProfile.DocumentNumberId = '';
        thisUpdateProfile.loyaltyDefaultProgramRadioId = '';
        thisUpdateProfile.loyaltyProgramRadioOnId = '';
        thisUpdateProfile.loyaltyProgramRadioOffId = '';
        thisUpdateProfile.loyaltyProgramInputId = '';
        thisUpdateProfile.loyaltyProgramDivId = '';
        thisUpdateProfile.largeFamilyRadioOnId = '';
        thisUpdateProfile.largeFamilyRadioOffId = '';
        thisUpdateProfile.largeFamilyDivId = '';
        thisUpdateProfile.LargeFamilyTypeGenericInputRadioId = '';
        thisUpdateProfile.LargeFamilyTypeEspecialInputRadioId = '';
        thisUpdateProfile.largeFamilyDocumentNumberInputId = '';
        thisUpdateProfile.LargeFamilyProvincesSelectId = '';
        thisUpdateProfile.residentRadioOnId = '';
        thisUpdateProfile.residentRadioOffId = '';
        thisUpdateProfile.residentDivId = '';
        thisUpdateProfile.residentDocumentTypeInputId = '';
        thisUpdateProfile.residentMunicipalitiesSelectId = '';
        thisUpdateProfile.residentLargeFamilyDivId = '';
        thisUpdateProfile.residentLargeFamilyDniNieNumberInputId = '';
        thisUpdateProfile.provinceResidenceDivId = '';

        thisUpdateProfile.EboardersRadioOnId = '';
        thisUpdateProfile.EboardersRadioOffId = '';
        thisUpdateProfile.EboardersDivId = '';
        thisUpdateProfile.EboardersCountriesId = '';
        thisUpdateProfile.EboardersPassportNumberId = '';
        thisUpdateProfile.EboardersExpDateId = '';

        thisUpdateProfile.SubmitButton = null;
        thisUpdateProfile.EditButton = null;
        thisUpdateProfile.Section = null;
        thisUpdateProfile.ResidenceProvince = null;
        thisUpdateProfile.ResidenceProvinceView = null;
        thisUpdateProfile.ResidenceCountry = null;
        thisUpdateProfile.Elements = null;
        thisUpdateProfile.DocumentType = null;
        thisUpdateProfile.DocumentNumber = null;
        thisUpdateProfile.loyaltyProgramRadioOn = null;
        thisUpdateProfile.loyaltyProgramRadioOff = null;
        thisUpdateProfile.loyaltyProgramDiv = null;
        thisUpdateProfile.loyaltyProgramInput = null;
        thisUpdateProfile.Inputs = "input[type='text'],input[type='radio'],select";
        thisUpdateProfile.largeFamilyRadioOn = null;
        thisUpdateProfile.largeFamilyRadioOff = null;
        thisUpdateProfile.largeFamilyDiv = null;
        thisUpdateProfile.LargeFamilyTypeGenericInputRadio = null;
        thisUpdateProfile.LargeFamilyTypeEspecialInputRadio = null;
        thisUpdateProfile.largeFamilyDocumentNumberInput = null;
        thisUpdateProfile.LargeFamilyProvincesSelect = null;
        thisUpdateProfile.residentRadioOn = null;
        thisUpdateProfile.residentRadioOff = null;
        thisUpdateProfile.residentDiv = null;
        thisUpdateProfile.residentDocumentTypeInput = null;
        thisUpdateProfile.residentMunicipalitySelect = null;
        thisUpdateProfile.residentLargeFamilyDiv = null;
        thisUpdateProfile.residentLargeFamilyDniNieNumberInput = null;
        thisUpdateProfile.provinceResidenceDiv = null;

        thisUpdateProfile.EboardersRadioOn = null;
        thisUpdateProfile.EboardersRadioOff = null;
        thisUpdateProfile.EboardersDiv = null;
        thisUpdateProfile.EboardersCountries = null;
        thisUpdateProfile.EboardersPassportNumber = null;
        thisUpdateProfile.EboardersExpDate = null;

        thisUpdateProfile.toggleEditMode = '';

        thisUpdateProfile.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
            this.initControls();
        };

        thisUpdateProfile.initControls = function () {

            var toggleEditArgs = {
                eventsEnabled: false,
                copyCss: false,
                onpreview: function (e, ui) {
                    if (ui.element.attr('type') === 'radio') {
                        ui.preview.hide();
                        if (ui.element.attr('checked') == false) {
                            $('#' + ui.element.attr('id') + 'Label').hide();
                        }
                        // incluido para ocultar los label del radio de tratamiento en la página UpdateProfile
                        if (!ui.element.is(':checked'))
                            ui.element.closest('label').hide();
                    }
                    if (thisUpdateProfile.ResidenceProvince.length > 0) {
                        thisUpdateProfile.ResidenceProvince.hide();
                        thisUpdateProfile.ResidenceProvince.parent().parent().addClass('noInput');
                    }
                    $('.showOnView').show();
                    if ($('span[defaultProgram="true"].icoPuntoc3').length) {
                        $('.icoIbplus_small').hide();
                    }
                    if ($('span[defaultProgram="true"].icoIbplus_small').length) {
                        $('.icoPuntoc3').hide();
                    }
                },
                onedit: function (e, ui) {
                    var residenceProvinceEdited = $("#CONTROLGROUPUPDATEPROFILEVIEW_PersonInputUpdateProfileView_DropDownListState").is(":visible") ? true : false;

                    if (ui.element.attr('type') == 'radio') {
                        $('#' + ui.element.attr('id') + 'Label').show();
                        // incluido para mostrar los label del radio de tratamiento en la página UpdateProfile
                        ui.element.closest('label').show();

                        if ($('[value="IBRadioOff"]').is(':checked')) {
                            $('[value="IB"]').hide();
                        }
                        else {
                            $('.icoIbplus_small').show();
                        }
                    }
                    if (thisUpdateProfile.ResidenceProvince.length > 0) {
                        thisUpdateProfile.ResidenceProvince.show();
                        thisUpdateProfile.ResidenceProvince.parent().parent().removeClass('noInput');
                        $("#" + thisUpdateProfile.ResidenceProvince[0].id + ' ~ .showOnView').hide();
                    } else {
                        $('.showOnView').hide();

                        if (residenceProvinceEdited == true) {
                            $('#CONTROLGROUPUPDATEPROFILEVIEW_PersonInputUpdateProfileView_DropDownListStateDiv .showOnView').hide();
                        } else {
                            $('#CONTROLGROUPUPDATEPROFILEVIEW_PersonInputUpdateProfileView_DropDownListStateDiv .showOnView').show();
                        }
                    }
                    $('.icoPuntoc3').show();

                },
            };


            if (thisUpdateProfile.Elements !== null) {
                var elements = $(thisUpdateProfile.Elements);
                if (thisUpdateProfile.ResidenceProvince.length > 0)
                    elements = elements.not('#' + thisUpdateProfile.ResidenceProvinceId);
                elements.toggleEdit(toggleEditArgs).toggleEdit('preview');

                if (thisUpdateProfile.ResidenceProvince.length > 0) {
                    thisUpdateProfile.ResidenceProvinceView = $("<div class='showOnView'>" + $("option:selected", thisUpdateProfile.ResidenceProvince).text() + "</div>")
                        .insertAfter(thisUpdateProfile.ResidenceProvince);
                }

                thisUpdateProfile.toggleEditMode = 'preview';
            }
            if (thisUpdateProfile.DocumentType !== null && thisUpdateProfile.DocumentNumber !== null) {
                thisUpdateProfile.DocumentTypeSetValidationMethod(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber);
            }

            if (thisUpdateProfile.loyaltyProgramRadioOn !== null) {
                if ($(thisUpdateProfile.loyaltyProgramRadioOn).is(':checked')) {
                    thisUpdateProfile.enableLoyaltyProgram();
                }
            }

            if (thisUpdateProfile.loyaltyProgramRadioOff !== null) {
                if ($(thisUpdateProfile.loyaltyProgramRadioOff).is(':checked')) {
                    thisUpdateProfile.disableLoyaltyProgram();
                }
            }

            if (thisUpdateProfile.residentRadioOn !== null) {
                if ($(thisUpdateProfile.residentRadioOn).is(':checked')) {
                    thisUpdateProfile.enableResidents();
                }
            }

            if (thisUpdateProfile.residentRadioOff !== null) {
                if ($(thisUpdateProfile.residentRadioOff).is(':checked')) {
                    thisUpdateProfile.disableResidents();
                }
            }

            if (thisUpdateProfile.EboardersRadioOn !== null) {
                if ($(thisUpdateProfile.EboardersRadioOn).is(':checked')) {
                    thisUpdateProfile.enableEboarders();
                }
            }

            if (thisUpdateProfile.EboardersRadioOff !== null) {
                if ($(thisUpdateProfile.EboardersRadioOff).is(':checked')) {
                    thisUpdateProfile.disableEboarders();
                }
            }

            if (thisUpdateProfile.largeFamilyRadioOn !== null) {
                if ($(thisUpdateProfile.largeFamilyRadioOn).is(':checked')) {
                    thisUpdateProfile.enableLargeFamily();
                }
            }

            if (thisUpdateProfile.largeFamilyRadioOff !== null) {
                if ($(thisUpdateProfile.largeFamilyRadioOff).is(':checked')) {
                    thisUpdateProfile.disableLargeFamily();
                }
            }

            if (thisUpdateProfile.ResidenceCountry !== null && thisUpdateProfile.ResidenceProvince !== null && thisUpdateProfile.provinceResidenceDiv !== null) {
                thisUpdateProfile.residenceProvinceChange();
            }
        };

        thisUpdateProfile.setVars = function () {
            if (this.SubmitButtonId != '')
                thisUpdateProfile.SubmitButton = this.getById(this.SubmitButtonId);
            if (this.EditButtonId != '')
                thisUpdateProfile.EditButton = this.getById(this.EditButtonId);
            if (this.SectionId != '')
                thisUpdateProfile.Section = this.getById(this.SectionId);
            if (this.ProvinceId != '')
                thisUpdateProfile.ResidenceProvince = this.getById(this.ResidenceProvinceId);
            if (this.CountryId != '')
                thisUpdateProfile.ResidenceCountry = this.getById(this.ResidenceCountryId);
            if (this.DocumentTypeId != '')
                thisUpdateProfile.DocumentType = this.getById(this.DocumentTypeId);
            if (this.DocumentNumberId != '')
                thisUpdateProfile.DocumentNumber = this.getById(this.DocumentNumberId);
            if (this.loyaltyProgramRadioOnId != '')
                thisUpdateProfile.loyaltyProgramRadioOn = this.getById(this.loyaltyProgramRadioOnId);
            if (this.loyaltyProgramRadioOffId != '')
                thisUpdateProfile.loyaltyProgramRadioOff = this.getById(this.loyaltyProgramRadioOffId);
            if (this.loyaltyProgramDivId != '')
                thisUpdateProfile.loyaltyProgramDiv = this.getById(this.loyaltyProgramDivId);
            if (this.loyaltyProgramInputId != '')
                thisUpdateProfile.loyaltyProgramInput = this.getById(this.loyaltyProgramInputId);
            if (this.Section != null)
                thisUpdateProfile.Elements = $(this.Section).find(this.Inputs);
            if (this.largeFamilyRadioOnId != '')
                thisUpdateProfile.largeFamilyRadioOn = this.getById(this.largeFamilyRadioOnId);
            if (this.largeFamilyRadioOffId != '')
                thisUpdateProfile.largeFamilyRadioOff = this.getById(this.largeFamilyRadioOffId);
            if (this.largeFamilyDivId != '')
                thisUpdateProfile.largeFamilyDiv = this.getById(this.largeFamilyDivId);
            if (this.LargeFamilyTypeGenericInputRadioId != '')
                thisUpdateProfile.LargeFamilyTypeGenericInputRadio = this.getById(this.LargeFamilyTypeEspecialInputRadioId);
            if (this.LargeFamilyTypeEspecialInputRadioId != '')
                thisUpdateProfile.LargeFamilyTypeEspecialInputRadio = this.getById(this.LargeFamilyTypeEspecialInputRadioId);
            if (this.largeFamilyDocumentNumberInputId != '')
                thisUpdateProfile.largeFamilyDocumentNumberInput = this.getById(this.largeFamilyDocumentNumberInputId);
            if (this.LargeFamilyProvincesSelectId != '')
                thisUpdateProfile.LargeFamilyProvincesSelect = this.getById(this.LargeFamilyProvincesSelectId);
            if (this.residentRadioOnId != '')
                thisUpdateProfile.residentRadioOn = this.getById(this.residentRadioOnId);
            if (this.residentRadioOffId != '')
                thisUpdateProfile.residentRadioOff = this.getById(this.residentRadioOffId);
            if (this.residentDivId != '')
                thisUpdateProfile.residentDiv = this.getById(this.residentDivId);
            if (this.residentDocumentTypeInputId != '')
                thisUpdateProfile.residentDocumentTypeInput = this.getById(this.residentDocumentTypeInputId);
            if (this.residentMunicipalitiesSelectId != '')
                thisUpdateProfile.residentMunicipalitiesSelect = this.getById(this.residentMunicipalitiesSelectId);
            if (this.residentLargeFamilyDivId != '')
                thisUpdateProfile.residentLargeFamilyDiv = this.getById(this.residentLargeFamilyDivId);
            if (this.residentLargeFamilyDniNieNumberInputId != '')
                thisUpdateProfile.residentLargeFamilyDniNieNumberInput = this.getById(this.residentLargeFamilyDniNieNumberInputId);
            if (this.provinceResidenceDivId != '')
                thisUpdateProfile.provinceResidenceDiv = this.getById(this.provinceResidenceDivId);
            if (this.EboardersRadioOnId != '')
                thisUpdateProfile.EboardersRadioOn = this.getById(this.EboardersRadioOnId);
            if (this.EboardersRadioOffId != '')
                thisUpdateProfile.EboardersRadioOff = this.getById(this.EboardersRadioOffId);
            if (this.EboardersDivId != '')
                thisUpdateProfile.EboardersDiv = this.getById(this.EboardersDivId);
            if (this.EboardersCountriesId != '')
                thisUpdateProfile.EboardersCountries = this.getById(this.EboardersCountriesId);
            if (this.EboardersPassportNumberId != '')
                thisUpdateProfile.EboardersPassportNumber = this.getById(this.EboardersPassportNumberId);
            if (this.EboardersExpDateId != '')
                thisUpdateProfile.EboardersExpDate = this.getById(this.EboardersExpDateId);
        };

        thisUpdateProfile.enableLoyaltyProgram = function () {
            $(thisUpdateProfile.loyaltyProgramDiv).show();
            SKYSALES.Util.setAttribute(thisUpdateProfile.loyaltyProgramInput, 'required', 'true');
            $('.icoIbplus_small').show();
            $('#' + thisUpdateProfile.loyaltyDefaultProgramRadioId + 'IB').show();
        };

        thisUpdateProfile.disableLoyaltyProgram = function () {
            $(thisUpdateProfile.loyaltyProgramDiv).hide();
            $(thisUpdateProfile.loyaltyProgramInput).val('');
            SKYSALES.Util.setAttribute(thisUpdateProfile.loyaltyProgramInput, 'required', 'false');
            $('.icoIbplus_small').hide();
            $('#' + this.loyaltyDefaultProgramRadioId + 'IB').hide();
            $('#' + thisUpdateProfile.loyaltyDefaultProgramRadioId + 'VY').attr('checked', true);
        };

        thisUpdateProfile.enableEboarders = function () {
            $(thisUpdateProfile.EboardersDiv).show();
            SKYSALES.Util.setAttribute(thisUpdateProfile.EboardersCountries, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.EboardersPassportNumber, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.EboardersExpDate, 'required', 'true');
            thisUpdateProfile.DocumentNumberToDniCopyIfNeeded(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber, thisUpdateProfile.residentLargeFamilyDniNieNumberInput, thisUpdateProfile.EboardersPassportNumber);
        };

        thisUpdateProfile.disableEboarders = function () {
            $(thisUpdateProfile.EboardersDiv).hide();
            SKYSALES.Util.setAttribute(thisUpdateProfile.EboardersCountries, 'required', 'false');
            SKYSALES.Util.setAttribute(thisUpdateProfile.EboardersPassportNumber, 'required', 'false');
            SKYSALES.Util.setAttribute(thisUpdateProfile.EboardersExpDate, 'required', 'false');

        };

        thisUpdateProfile.enableResidents = function () {
            $(thisUpdateProfile.residentDiv).show();
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentDocumentTypeInput, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentMunicipalitiesSelect, 'required', 'true');
            $(thisUpdateProfile.residentLargeFamilyDiv).show();
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'validationtype', 'DNI,NIF,NIE');
            thisUpdateProfile.DocumentNumberToDniCopyIfNeeded(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber, thisUpdateProfile.residentLargeFamilyDniNieNumberInput, thisUpdateProfile.EboardersPassportNumber);
        };

        thisUpdateProfile.disableResidents = function () {
            $(thisUpdateProfile.residentDiv).hide();
            $(thisUpdateProfile.residentDocumentTypeInput).val('');
            $(thisUpdateProfile.residentMunicipalitiesSelect).val('');
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentDocumentTypeInput, 'required', 'false');
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentMunicipalitiesSelect, 'required', 'false');
            if ($(thisUpdateProfile.largeFamilyRadioOff).is(':checked')) {
                $(thisUpdateProfile.residentLargeFamilyDiv).hide();
                $(thisUpdateProfile.residentLargeFamilyDniNieNumberInput).val('');
                SKYSALES.Util.setAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'required', 'false');
                SKYSALES.Util.removeAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'validationtype');
            }
        };

        thisUpdateProfile.enableLargeFamily = function () {
            $(thisUpdateProfile.largeFamilyDiv).show();
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'validationtype', 'DNI,NIF,NIE');
            SKYSALES.Util.setAttribute(thisUpdateProfile.LargeFamilyTypeGenericInputRadio, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.LargeFamilyTypeEspecialInputRadio, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.largeFamilyDocumentNumberInput, 'required', 'true');
            SKYSALES.Util.setAttribute(thisUpdateProfile.LargeFamilyProvincesSelect, 'required', 'true');
            $(thisUpdateProfile.residentLargeFamilyDiv).show();
            SKYSALES.Util.setAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'required', 'true');
            thisUpdateProfile.DocumentNumberToDniCopyIfNeeded(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber, thisUpdateProfile.residentLargeFamilyDniNieNumberInput, thisUpdateProfile.EboardersPassportNumber);
        };

        thisUpdateProfile.disableLargeFamily = function () {
            $(thisUpdateProfile.largeFamilyDiv).hide();
            $(thisUpdateProfile.largeFamilyDocumentNumberInput).val('');
            $(thisUpdateProfile.LargeFamilyProvincesSelect).val('');
            SKYSALES.Util.setAttribute(thisUpdateProfile.LargeFamilyTypeGenericInputRadio, 'required', 'false');
            SKYSALES.Util.setAttribute(thisUpdateProfile.LargeFamilyTypeEspecialInputRadio, 'required', 'false');
            SKYSALES.Util.setAttribute(thisUpdateProfile.largeFamilyDocumentNumberInput, 'required', 'false');
            SKYSALES.Util.setAttribute(thisUpdateProfile.LargeFamilyProvincesSelect, 'required', 'false');
            if ($(thisUpdateProfile.residentRadioOff).is(':checked')) {
                $(thisUpdateProfile.residentLargeFamilyDiv).hide();
                $(thisUpdateProfile.residentLargeFamilyDniNieNumberInput).val('');
                SKYSALES.Util.setAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'required', 'false');
                SKYSALES.Util.removeAttribute(thisUpdateProfile.residentLargeFamilyDniNieNumberInput, 'validationtype');
            }
        };

        thisUpdateProfile.residenceProvinceChange = function () {
            var required = thisUpdateProfile.ResidenceCountry.val() == 'ES' ? 'true' : 'false';
            if (required == 'false') {
                $(thisUpdateProfile.ResidenceProvince).val('');
                $(thisUpdateProfile.provinceResidenceDiv).hide();
            }
            else {
                $(thisUpdateProfile.provinceResidenceDiv).show();
            }
            SKYSALES.Util.setAttribute(thisUpdateProfile.ResidenceProvince, 'required', required);
        }


        thisUpdateProfile.addEvents = function () {
            if (thisUpdateProfile.EditButton != null)
                thisUpdateProfile.EditButton.click(function (e) {
                    e.preventDefault();
                    if (thisUpdateProfile.toggleEditMode == 'preview') {
                        thisUpdateProfile.toggleEditMode = 'edit';
                        $(thisUpdateProfile.Elements).toggleEdit(thisUpdateProfile.toggleEditMode);
                        $(thisUpdateProfile.Section).find(".noInput").removeClass("noInput").addClass('toogleditPlaceHolder');
                        $(thisUpdateProfile.SubmitButton).show();
                        thisUpdateProfile.EditButton.hide();
                    }
                    else {
                        thisUpdateProfile.toggleEditMode = 'preview';
                        $(thisUpdateProfile.Elements).toggleEdit(thisUpdateProfile.toggleEditMode);
                        $(thisUpdateProfile.Section).find(".toogleditPlaceHolder").addClass("noInput");
                    }
                });

            if (thisUpdateProfile.loyaltyProgramRadioOn != null)
                thisUpdateProfile.loyaltyProgramRadioOn.click(function (e) {
                    thisUpdateProfile.enableLoyaltyProgram();
                });

            if (thisUpdateProfile.loyaltyProgramRadioOff != null)
                thisUpdateProfile.loyaltyProgramRadioOff.click(function (e) {
                    thisUpdateProfile.disableLoyaltyProgram();
                });

            if (thisUpdateProfile.DocumentType != null)
                thisUpdateProfile.DocumentType.change(thisUpdateProfile.DocumentTypeChangeHandler);

            if (thisUpdateProfile.DocumentNumber != null)
                thisUpdateProfile.DocumentNumber.change(thisUpdateProfile.DocumentNumberChangeHandler);

            if (thisUpdateProfile.largeFamilyRadioOn != null)
                thisUpdateProfile.largeFamilyRadioOn.click(function (e) {
                    thisUpdateProfile.enableLargeFamily();
                });

            if (thisUpdateProfile.largeFamilyRadioOff != null)
                thisUpdateProfile.largeFamilyRadioOff.click(function (e) {
                    thisUpdateProfile.disableLargeFamily();
                });

            if (thisUpdateProfile.EboardersRadioOn != null)
                thisUpdateProfile.EboardersRadioOn.click(function (e) {
                    thisUpdateProfile.enableEboarders();
                });

            if (thisUpdateProfile.EboardersRadioOff != null)
                thisUpdateProfile.EboardersRadioOff.click(function (e) {
                    thisUpdateProfile.disableEboarders();
                });

            if (thisUpdateProfile.EboardersExpDate != null)
                thisUpdateProfile.EboardersExpDate.datepicker({ dateFormat: 'dd/mm/yy' }).next("a").click(function () { $(this).prev().datepicker("show"); return false; })

            if (thisUpdateProfile.residentRadioOn != null)
                thisUpdateProfile.residentRadioOn.click(function (e) {
                    thisUpdateProfile.enableResidents();
                });

            if (thisUpdateProfile.residentRadioOff != null)
                thisUpdateProfile.residentRadioOff.click(function (e) {
                    thisUpdateProfile.disableResidents();
                });

            if (thisUpdateProfile.ResidenceCountry != null && thisUpdateProfile.ResidenceProvince != null)
                thisUpdateProfile.ResidenceCountry.change(function (e) {
                    thisUpdateProfile.residenceProvinceChange();
                });
        };

        thisUpdateProfile.DocumentNumberChangeHandler = function () {
            if (thisUpdateProfile.residentLargeFamilyDniNieNumberInput != null)
                thisUpdateProfile.DocumentNumberToDniCopyIfNeeded(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber, thisUpdateProfile.residentLargeFamilyDniNieNumberInput, thisUpdateProfile.EboardersPassportNumber);
            if (thisUpdateProfile.EboardersPassportNumber != null)
                thisUpdateProfile.DocumentNumberToDniCopyIfNeeded(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber, thisUpdateProfile.residentLargeFamilyDniNieNumberInput, thisUpdateProfile.EboardersPassportNumber);
        };

        thisUpdateProfile.DocumentTypeChangeHandler = function () {
            thisUpdateProfile.DocumentTypeSetValidationMethod(thisUpdateProfile.DocumentType, thisUpdateProfile.DocumentNumber);
            thisUpdateProfile.DocumentNumberChangeHandler();
        };

        thisUpdateProfile.DocumentNumberToDniCopyIfNeeded = function (documentTypeControl, documentNumberControl, residentLargeFamilyDniControl, eBoarderControl) {
            if (documentTypeControl != null) {
                if (thisUpdateProfile.residentLargeFamilyDniNieNumberInput != null) {
                    if (documentTypeControl.val() == 'DNI') {
                        residentLargeFamilyDniControl.val(documentNumberControl.val());
                        residentLargeFamilyDniControl.attr("readonly", "readonly");
                        residentLargeFamilyDniControl.css("background-color", "#F0F0F0");
                    } else {
                        residentLargeFamilyDniControl.removeAttr("readonly");
                        residentLargeFamilyDniControl.css("background-color", "");
                    }
                }
                if (thisUpdateProfile.EboardersPassportNumber != null) {
                    if (documentTypeControl.val() == 'P') {
                        eBoarderControl.val(documentNumberControl.val());
                        eBoarderControl.attr("readonly", "readonly");
                        eBoarderControl.css("background-color", "#F0F0F0");
                    } else {
                        eBoarderControl.removeAttr("readonly");
                        eBoarderControl.css("background-color", "");
                    }
                }
            }
        };

        thisUpdateProfile.DocumentTypeSetValidationMethod = function (documentTypeControl, documentNumberControl) {
            var documentType = documentTypeControl.val(),
                    validationType = '';
            if (documentType == 'DNI')
                validationType = 'NIF';
            else if (documentType == 'TR')
                validationType = 'NIE';

            SKYSALES.Util.setAttribute(documentNumberControl, 'validationtype', validationType);
        };

        return thisUpdateProfile;
    };


    /*
    Name: 
    Class UpdateCredentials
    Param: None
    Return: An instance of UpdateCredentials
    Functionality: The object that controls the screen of the UpdateCredentials page
    Notes: By Adonis Lee Villamor
    Class Hierarchy:
    SKYSALES.Class.SkySales -> SKYSALES.Class.UpdateCredential
    */
    SKYSALES.Class.UpdateCredential = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisUpdateCredential = SKYSALES.Util.extendObject(parent);

        /* Configuration */
        thisUpdateCredential.SubmitButtonId = '';
        thisUpdateCredential.EditButtonId = '';
        thisUpdateCredential.TextboxAgentUsernameId = '';
        thisUpdateCredential.TextboxPasswordId = '';
        thisUpdateCredential.TextboxRepeatPassId = '';
        thisUpdateCredential.EditPasswordToggleId = '';
        thisUpdateCredential.EditPasswordGroupId = '';
        thisUpdateCredential.ButtonZoneId = '';
        thisUpdateCredential.CancelButtonId = '';

        thisUpdateCredential.SubmitButton = null;
        thisUpdateCredential.EditButton = null;
        thisUpdateCredential.ButtonZone = null;
        thisUpdateCredential.CancelButton = null;
        thisUpdateCredential.TextboxAgentUsername = null;
        thisUpdateCredential.TextboxPassword = null;
        thisUpdateCredential.TextboxRepeatPass = null;
        thisUpdateCredential.EditPasswordToggle = null;
        thisUpdateCredential.EditPasswordGroup = null;

        thisUpdateCredential.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisUpdateCredential.setVars = function () {
            if (this.SubmitButtonId != '')
                thisUpdateCredential.SubmitButton = this.getById(this.SubmitButtonId);
            if (this.EditButtonId != '')
                thisUpdateCredential.EditButton = this.getById(this.EditButtonId);
            if (this.TextboxAgentUsernameId != '')
                thisUpdateCredential.TextboxAgentUsername = this.getById(this.TextboxAgentUsernameId);
            if (this.EditPasswordToggleId != '')
                thisUpdateCredential.EditPasswordToggle = this.getById(this.EditPasswordToggleId);
            if (this.EditPasswordGroupId != '')
                thisUpdateCredential.EditPasswordGroup = this.getById(this.EditPasswordGroupId);
            if (this.ButtonZoneId != '')
                thisUpdateCredential.ButtonZone = this.getById(this.ButtonZoneId);
            if (this.CancelButtonId != '')
                thisUpdateCredential.CancelButton = this.getById(this.CancelButtonId);
        };

        thisUpdateCredential.addEvents = function () {

            if (thisUpdateCredential.EditPasswordToggle != null)
                thisUpdateCredential.EditPasswordToggle.click(thisUpdateCredential.toggleFunction);
            if (thisUpdateCredential.CancelButton != null) {
                thisUpdateCredential.CancelButton.click(thisUpdateCredential.toggleFunction);
            }
        };

        thisUpdateCredential.toggleFunction = function () {
            thisUpdateCredential.EditPasswordToggle.toggleClass('desplegado');
            thisUpdateCredential.EditPasswordGroup.toggleClass('hidden');
            thisUpdateCredential.ButtonZone.toggleClass('hidden');
        };
        return thisUpdateCredential;
    };

    /*
    Name: 
    Class PasswordReset
    Param: None
    Return: An instance of PasswordReset
    Functionality: The object that controls the screen of the PasswordReset page
    Notes: By Adonis Lee Villamor
    Class Hierarchy:
    SKYSALES.Class.SkySales -> SKYSALES.Class.PasswordReset
    */
    SKYSALES.Class.PasswordReset = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisPasswordReset = SKYSALES.Util.extendObject(parent);

        /* Configuration */
        thisPasswordReset.State1ContentId = "";
        thisPasswordReset.State2ContentId = "";
        thisPasswordReset.State3ContentId = "";
        thisPasswordReset.State4ContentId = "";
        thisPasswordReset.StateErrorEmailNotExistContentId = "";
        thisPasswordReset.SubmitButtonId = '';
        thisPasswordReset.ChangePasswordButtonId = '';
        thisPasswordReset.CancelButtonId = '';
        thisPasswordReset.SuccessAgentNameLabelId = "";
        thisPasswordReset.AgentNameTextboxId = '';
        thisPasswordReset.BackToLoginButtonId = '';
        thisPasswordReset.BackToState2ButtonId = '';
        thisPasswordReset.State = 1; //1 = Login, 2 =  Password Reset, 3 = Password Reset Pending, 4 = Password Reset Success, 99 = Password Reset Error Email Not Exist

        thisPasswordReset.State1Content = null;
        thisPasswordReset.State2Content = null;
        thisPasswordReset.State3Content = null;
        thisPasswordReset.State4Content = null;
        thisPasswordReset.StateErrorEmailNotExistContent = null;
        thisPasswordReset.Form = null;
        thisPasswordReset.SubmitButton = null;
        thisPasswordReset.ChangePasswordButton = null;
        thisPasswordReset.CancelButton = null;
        thisPasswordReset.SuccessAgentNameLabel = null;
        thisPasswordReset.AgentNameTextbox = null;
        thisPasswordReset.BackToLoginButton = null;
        thisPasswordReset.BackToState2Button = null;

        thisPasswordReset.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisPasswordReset.setVars = function () {
            thisPasswordReset.Form = this.getById(this.FormId);
            thisPasswordReset.State1Content = this.getById(this.State1ContentId);
            thisPasswordReset.State2Content = this.getById(this.State2ContentId);
            thisPasswordReset.State3Content = this.getById(this.State3ContentId);
            thisPasswordReset.State4Content = this.getById(this.State4ContentId);
            thisPasswordReset.StateErrorEmailNotExistContent = this.getById(this.StateErrorEmailNotExistContentId);
            thisPasswordReset.SubmitButton = this.getById(this.SubmitButtonId);
            thisPasswordReset.ChangePasswordButton = this.getById(this.ChangePasswordButtonId);
            thisPasswordReset.CancelButton = this.getById(this.CancelButtonId);
            thisPasswordReset.SuccessAgentNameLabel = this.getById(this.SuccessAgentNameLabelId);
            thisPasswordReset.AgentNameTextbox = this.getById(this.AgentNameTextboxId);
            thisPasswordReset.BackToLoginButton = this.getById(this.BackToLoginButtonId);
            thisPasswordReset.BackToState2Button = this.getById(this.BackToState2ButtonId);
        };

        thisPasswordReset.addEvents = function () {

            if (thisPasswordReset.SubmitButton != null)
                thisPasswordReset.SubmitButton.click(function () {
                    if (SKYSALES.Util.validateBySelector("#" + thisPasswordReset.State2ContentId)) {
                        thisPasswordReset.State = 3;
                        thisPasswordReset.UpdateControl();
                        var params = {
                            "agentName": thisPasswordReset.AgentNameTextbox.context.value
                        };
                        $.get('PasswordResetAjax-resource.aspx', params, function (xml) {
                            var xmlDoc = $.parseXML(xml);
                            var $xml = $(xmlDoc);
                            var status = $xml.find("STATUS").text();

                            //Solo se muestra un mensaje de error específico si el email indicado no se corresponde a ningún agente
                            if (status == 'ERROR:AGENT_INVALID') {
                                thisPasswordReset.State = 99;
                                thisPasswordReset.UpdateControl();
                            } else {
                                // or SUCCESS
                                // or PENDING
                                // or ERROR:PERSONCONTROLLER_IS_NULL, ERROR:AGENTNAME_IS_EMPTY, ERROR:MISC
                                //En cualquiera de estos casos se muestra el mensaje de OK
                                thisPasswordReset.State = 4;
                                thisPasswordReset.UpdateControl();
                                //alert(data);
                                thisPasswordReset.State = 1; //reset back to state 1/login
                            }
                        });
                    }
                });

            if (thisPasswordReset.ChangePasswordButton != null)
                thisPasswordReset.ChangePasswordButton.click(function () {
                    thisPasswordReset.State = 2;
                    thisPasswordReset.UpdateControl();
                });

            if (thisPasswordReset.CancelButton != null)
                thisPasswordReset.CancelButton.click(function () {
                    thisPasswordReset.State = 1;
                    thisPasswordReset.UpdateControl();
                });

            if (thisPasswordReset.BackToLoginButton != null)
                thisPasswordReset.BackToLoginButton.click(function () {
                    thisPasswordReset.State = 1;
                    thisPasswordReset.UpdateControl();
                });

            if (thisPasswordReset.BackToState2Button != null)
                thisPasswordReset.BackToState2Button.click(function () {
                    thisPasswordReset.State = 2;
                    thisPasswordReset.UpdateControl();
                });
        };

        thisPasswordReset.UpdateControl = function () {

            if (!thisPasswordReset.State1Content.hasClass("hidden")) thisPasswordReset.State1Content.addClass('hidden');
            if (!thisPasswordReset.State2Content.hasClass("hidden")) thisPasswordReset.State2Content.addClass('hidden');
            if (!thisPasswordReset.State3Content.hasClass("hidden")) thisPasswordReset.State3Content.addClass('hidden');
            if (!thisPasswordReset.State4Content.hasClass("hidden")) thisPasswordReset.State4Content.addClass('hidden');
            if (!thisPasswordReset.StateErrorEmailNotExistContent.hasClass("hidden")) thisPasswordReset.StateErrorEmailNotExistContent.addClass('hidden');

            SKYSALES.Util.removeAttribute($("#" + thisPasswordReset.AgentNameTextboxId), "required");
            SKYSALES.Util.removeAttribute($("#" + thisPasswordReset.AgentNameTextboxId), "validationtype");

            switch (thisPasswordReset.State) {
                case 1:
                    thisPasswordReset.State1Content.removeClass('hidden');
                    break;
                case 2:
                    thisPasswordReset.State2Content.removeClass('hidden');
                    SKYSALES.Util.setAttribute($("#" + thisPasswordReset.AgentNameTextboxId), "required", "true");
                    SKYSALES.Util.setAttribute($("#" + thisPasswordReset.AgentNameTextboxId), "validationtype", "email");
                    break;
                case 3:
                    thisPasswordReset.State3Content.removeClass('hidden');
                    break;
                case 4:
                    thisPasswordReset.SuccessAgentNameLabel.html(thisPasswordReset.AgentNameTextbox.context.value);
                    thisPasswordReset.AgentNameTextbox.context.value = "";
                    thisPasswordReset.State4Content.removeClass('hidden');
                    break;
                case 99:
                    thisPasswordReset.StateErrorEmailNotExistContent.removeClass('hidden');
                default:

            }
        };

        return thisPasswordReset;
    };

    // Add new classes here:
    /*
    Name: 
    Class AgencyBookingList
    Param:
    None
    Return: 
    An instance of AgencyBookingList
    Functionality:
    The object that initializes the market data for the AgencyBookingListControl control
    Notes:           
    Class Hierarchy:
    SkySales -> SkySales
    */
    VUELING.Class.AgencyBookingList = function () {
        var parent = new SKYSALES.Class.SkySales(),
        thisAgencyBookingList = SKYSALES.Util.extendObject(parent);

        thisAgencyBookingList.improveJourneyArray = [];
        thisAgencyBookingList.viewDetailsArray = [];
        thisAgencyBookingList.viewDetailsText = '';
        thisAgencyBookingList.hideDetailsText = '';
        thisAgencyBookingList.isMemberBookingList = false;
        thisAgencyBookingList.addReservationOpenId = "";
        thisAgencyBookingList.addReservationOpen = null;
        thisAgencyBookingList.addReservationPopupId = "";
        thisAgencyBookingList.addReservationPopup = null;
        thisAgencyBookingList.addReservationCloseId = "";
        thisAgencyBookingList.addReservationClose = null;
        thisAgencyBookingList.addReservationAddLinkId = "";
        thisAgencyBookingList.addReservationAddLink = null;
        thisAgencyBookingList.passengerLastNameId = '';
        thisAgencyBookingList.passengerLastName = null;
        thisAgencyBookingList.passengerFirstNameId = '';
        thisAgencyBookingList.passengerFirstName = null;
        thisAgencyBookingList.passengerFirstNameToolTipId = '';
        thisAgencyBookingList.passengerFirstNameToolTip = null;

        thisAgencyBookingList.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
            this.initAddReservationPopup();
            this.SetDisabledFirstName();
        };

        thisAgencyBookingList.setVars = function () {
            thisAgencyBookingList.addReservationOpen = this.getById(this.addReservationOpenId);
            thisAgencyBookingList.addReservationPopup = this.getById(this.addReservationPopupId);
            thisAgencyBookingList.addReservationClose = this.getById(this.addReservationCloseId);
            thisAgencyBookingList.addReservationAddLink = this.getById(this.addReservationAddLinkId);
            thisAgencyBookingList.passengerFirstName = this.getById(this.passengerFirstNameId);
            thisAgencyBookingList.passengerLastName = this.getById(this.passengerLastNameId);
            thisAgencyBookingList.passengerFirstNameToolTip = this.getById(this.passengerFirstNameToolTipId);
        };

        thisAgencyBookingList.addEvents = function () {
            thisAgencyBookingList.improveJourneyEvent();
            thisAgencyBookingList.viewDetailsEvent();
            thisAgencyBookingList.printEvent();
            thisAgencyBookingList.addReservationOpen.click(function (event) { thisAgencyBookingList.addReservationOpenLink_Click(event); });
            thisAgencyBookingList.addReservationAddLink.click(function () { SKYSALES.Util.ValidateAndAppendToSkySalesAndPostBack(thisAgencyBookingList.addReservationPopupId, this); });
            thisAgencyBookingList.passengerLastName.change(function () { thisAgencyBookingList.SetDisabledFirstName(); });
        };

        thisAgencyBookingList.SetDisabledFirstName = function () {
            if (thisAgencyBookingList.passengerLastName.val() == "" || thisAgencyBookingList.passengerLastName.val() == undefined) {
                thisAgencyBookingList.passengerFirstName.attr("disabled", "disabled");
                thisAgencyBookingList.passengerFirstName.css("background-color", "#F0F0F0");
                //thisAgencyBookingList.passengerFirstNameToolTip.fadeIn();
            } else {
                thisAgencyBookingList.passengerFirstName.removeAttr("disabled");
                thisAgencyBookingList.passengerFirstName.css("background-color", "");
                //thisAgencyBookingList.passengerFirstNameToolTip.fadeOut();
            }
        };

        thisAgencyBookingList.viewDetailsEvent = function () {
            var i = 0,
                viewDetailsArray = this.viewDetailsArray || [],
                linkViewDetails = null;

            for (i = 0; i < viewDetailsArray.length; i += 1) {
                linkViewDetails = this.getById(viewDetailsArray[i].linkViewDetailsId);
                linkViewDetails.click(function (event) {
                    event.preventDefault();
                    var linkClass = $("#" + this.id + " .icoEye_small"), styleSpan = $("#" + this.id + "> #detailsIcon:first").clone();

                    for (var i = 0; i < thisAgencyBookingList.viewDetailsArray.length; i += 1) {
                        if (thisAgencyBookingList.viewDetailsArray[i].linkViewDetailsId == this.id) {
                            if (thisAgencyBookingList.isMemberBookingList) {

                                if ($("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).is(':visible')) {
                                    $("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).hide();
                                    $(this).empty().append(styleSpan).append(thisAgencyBookingList.viewDetailsText);
                                } else {
                                    $("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).show();
                                    $(this).empty().append(styleSpan).append(thisAgencyBookingList.hideDetailsText);
                                }

                            } else {
                                if (linkClass.hasClass("pulsado")) {
                                    $("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).hide();
                                    linkClass.removeClass("pulsado");
                                } else {
                                    $("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).html("Loading");
                                    $("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).show();
                                    var urlBookingDetail = "BookingDetailAjax.aspx";
                                    var currentPathName = window.location.pathname;

                                    var pathHoldAgency = "AgencyBookingListHold";
                                    var pathHoldCorp = "CorporateBookingListHold";

                                    var index1 = currentPathName.indexOf(pathHoldAgency);
                                    var index2 = currentPathName.indexOf(pathHoldCorp);
                                    if (index1 != -1 || index2 != -1) // If the index is not -1 then the term was matched in the string,
                                        urlBookingDetail = "BookingDetailHoldAjax.aspx";

                                    $.ajax({ type: "POST", url: urlBookingDetail, data: { recordLocator: thisAgencyBookingList.viewDetailsArray[i].reclocator, reset: 1 } }).done(function (html) {
                                        $("#" + thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).html(html);
                                    });
                                    linkClass.addClass("pulsado");
                                }
                            }
                            return;
                        }
                    }
                });
            }
        };

        thisAgencyBookingList.printEvent = function () {
            var i = 0,
                viewDetailsArray = this.viewDetailsArray || [],
                linkPrint = null;

            for (i = 0; i < viewDetailsArray.length; i += 1) {
                linkPrint = this.getById(viewDetailsArray[i].linkPrintId);
                linkPrint.click(function (event) {
                    event.preventDefault();

                    var bookingDiv = null;

                    for (var i = 0; i < thisAgencyBookingList.viewDetailsArray.length; i += 1) {
                        if (thisAgencyBookingList.viewDetailsArray[i].linkPrintId == this.id) {
                            bookingDiv = thisAgencyBookingList.getById(thisAgencyBookingList.viewDetailsArray[i].viewDetailsId).parent().parent();
                        }
                    }

                    if (bookingDiv != null) {
                        bookingDiv.removeClass('noPrint');
                        window.print();
                        bookingDiv.addClass('noPrint');
                    }
                });
            }
        };

        thisAgencyBookingList.improveJourneyEvent = function () {
            var i = 0,
                improveJourneyArray = this.improveJourneyArray || [];

            for (i = 0; i < improveJourneyArray.length; i += 1) {
                var toggleObject = new VUELING.Class.ToggleViewCustom();
                toggleObject.init({
                    "elementId": improveJourneyArray[i].improveJourneyId,
                    "hideId": improveJourneyArray[i].closeImproveJourneyId,
                    "showId": improveJourneyArray[i].openImproveJourneyId
                });
            }
        };

        thisAgencyBookingList.addReservationOpenLink_Click = function (event) {
            thisAgencyBookingList.addReservationPopup.show(thisAgencyBookingList.addReservationPopupId);
            event.preventDefault();
        };

        thisAgencyBookingList.initAddReservationPopup = function () {
            if (this.addReservationPopupId != '' && this.addReservationOpenId != '') {
                this.addReservationPopup = new SKYSALES.Class.BlockedPopUp();
                var json = {};
                json.closeElement = this.addReservationClose;
                this.addReservationPopup.init(json);
            }
        };

        return thisAgencyBookingList;
    };

    VUELING.Class.SSRPaymentInput = function () {
        var parent = new SKYSALES.Class.SkySales(),
        thisSSRPaymentInput = SKYSALES.Util.extendObject(parent);

        thisSSRPaymentInput.totalPriceContainerId = '';
        thisSSRPaymentInput.totalPriceContainer = null;

        thisSSRPaymentInput.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
        };

        thisSSRPaymentInput.setVars = function () {
            this.totalPriceContainer = this.getById(this.totalPriceContainerId);
        };

        return thisSSRPaymentInput;
    };

    VUELING.Class.FooterAction = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisFooter = SKYSALES.Util.extendObject(parent);

        thisFooter.textMore = '';
        thisFooter.textLess = '';
        thisFooter.actionLinkId = '';
        thisFooter.contentWebMapId = '';
        thisFooter.actionLinkObject = '';
        thisFooter.contentWebMapObject = '';
        thisFooter.hiddenLinksListSelector = '';
        thisFooter.isFullyDisplayed = false;

        thisFooter.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        thisFooter.setVars = function () {
            thisFooter.actionLinkObject = $("#" + thisFooter.actionLinkId);
            thisFooter.contentWebMapObject = $("#" + thisFooter.contentWebMapId);
        };

        thisFooter.addEvents = function () {
            thisFooter.actionLinkObject.click(function () {
                thisFooter.clickEventHandler();
            });
        };

        thisFooter.clickEventHandler = function () {
            $(this.hiddenLinksListSelector).slideToggle("slow")
            if (this.isFullyDisplayed == true) {
                thisFooter.actionLinkObject.text(thisFooter.textMore);
                this.isFullyDisplayed = false;
            } else {
                thisFooter.actionLinkObject.text(thisFooter.textLess);
                this.isFullyDisplayed = true;
            }

        };

        return thisFooter;
    };

    /*
    Name:
    Class ChangeBaggageInput
    Param:
    None
    Return:
    An instance of ChangeBaggageInput
    Functionality:
    Notes:
    Class Hierarchy:
    SkySales -> ChangeBaggageInput
    */
    VUELING.Class.ChangeBaggageInput = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisChangeBaggageInput = SKYSALES.Util.extendObject(parent);

        var totalBaggageChangeObservers = [];
        var totalInsurancesChangeObservers = [];

        thisChangeBaggageInput.addingServicesTitle = "";
        thisChangeBaggageInput.baggageServicesTitle = "";
        thisChangeBaggageInput.insuranceServicesTitle = "";
        thisChangeBaggageInput.bagaggeText = "";
        thisChangeBaggageInput.bagaggeTextSingular = "";
        thisChangeBaggageInput.insuranceText = "";
        thisChangeBaggageInput.numPassengers = "";
        thisChangeBaggageInput.passengers = "";
        thisChangeBaggageInput.currencyCode = "";

        thisChangeBaggageInput.AddingServicesToBookingJsObj;
        thisChangeBaggageInput.selectedBaggages = [];
        thisChangeBaggageInput.selectedInsurances = [];

        thisChangeBaggageInput.TotalPriceLabelId = "";
        thisChangeBaggageInput.TotalPriceBarLabelId = "AddingServicesToBookingChangeBaggageViewaddingServicesToBookingTotal";
        thisChangeBaggageInput.labelButtonSubmit = "";
        thisChangeBaggageInput.labelButtonSubmitTextIn = "";
        thisChangeBaggageInput.labelButtonSubmitTextOut = "";
        thisChangeBaggageInput.ContractInsurance = "";
        thisChangeBaggageInput.NotContractInsurance = "";
        thisChangeBaggageInput.labelContentContractButtonContract = "";
        thisChangeBaggageInput.labelContentContractButtonCancel = "";
        thisChangeBaggageInput.labelContentContractInsurance = "";
        thisChangeBaggageInput.labelContentInsurances = "";
        thisChangeBaggageInput.labelContentContract = "";

        thisChangeBaggageInput.setSettingsByObject = function (json) {
            parent.setSettingsByObject.call(this, json);
        };

        thisChangeBaggageInput.init = function (json) {
            this.setSettingsByObject(json);
            this.initializePage();
            this.addEvents();
        };

        thisChangeBaggageInput.initializePage = function () {
            $.each(thisChangeBaggageInput.passengers, function () {
                if (!this.baggage.baggageSelected) {
                    $('#' + this.baggage.chk).removeAttr("checked");
                    $('#' + this.baggage.select + ' option:first-child').attr("selected", "selected");
                }
                else {
                    $('#' + this.baggage.chk).attr("checked", "checked");
                }

            });

            //var AddingServicesToBookingName = "AddingServicesToBooking";


            //        thisChangeBaggageInput.AddingServicesToBookingJsObj = SKYSALES.Instance[ins];



            //thisChangeBaggageInput.AddingServicesToBookingJsObj.setTitle(thisChangeBaggageInput.addingServicesTitle);
            //thisChangeBaggageInput.AddingServicesToBookingJsObj.show();
        };

        thisChangeBaggageInput.addEvents = function () {
            $.each(thisChangeBaggageInput.passengers, function () {
                $('#' + this.baggage.lnk).click(function (event) {
                    event.preventDefault();

                    $.each(thisChangeBaggageInput.passengers, function () {
                        if ($(event.currentTarget).attr('id') == this.baggage.lnk) {
                            thisChangeBaggageInput.addBaggageClicked(this.passengerNumber);
                        }
                    });
                });

                $('#' + this.baggage.chk).click(function (event) {
                    $.each(thisChangeBaggageInput.passengers, function () {
                        if ($(event.currentTarget).attr('id') == this.baggage.chk) {
                            thisChangeBaggageInput.addBaggageClicked(this.passengerNumber);
                        }
                    });
                });

                $('#' + this.baggage.select).change(function (obj_changed) {
                    $.each(thisChangeBaggageInput.passengers, function () {
                        if ($(obj_changed.currentTarget).attr('id') == this.baggage.select) {
                            thisChangeBaggageInput.baggageComboChanged(this.passengerNumber);
                            thisChangeBaggageInput.BaggageChanges(this.passengerNumber, $(obj_changed.currentTarget).val(), $(obj_changed.currentTarget).find("option:selected").data("index"));
                        }
                    });
                });

                $('#' + this.insurance.chk).click(function (event) {
                    $.each(thisChangeBaggageInput.passengers, function () {
                        if ($(event.currentTarget).attr('id') == this.insurance.chk) {
                            thisChangeBaggageInput.addInsuranceClicked(this.passengerNumber);
                        }
                    });
                });

                $("[data-maleta]").click(thisChangeBaggageInput.IcoBaggageClick);
                $("[data-maleta]").hover(thisChangeBaggageInput.IcoBaggageHoverIn, thisChangeBaggageInput.IcoBaggageHoverOut);

                thisChangeBaggageInput.BaggageChanges(this.passengerNumber, $('[data-object="ContentContractSelect"][data-identity="' + this.passengerNumber + '"]').val(), $('[data-object="ContentContractSelect"][data-identity="' + this.passengerNumber + '"]').find("option:selected").data("index"))

            });

            $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"]').click(thisChangeBaggageInput.ButtonContract);
            $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonCancel + '"]').click(thisChangeBaggageInput.ButtonCancel);


        };

        thisChangeBaggageInput.ButtonContract = function (e) {
            if (!$(e.currentTarget).hasClass("disableButton")) {
                var passengerNumber = $(e.currentTarget).data("identity");

                var price = 0;
                thisChangeBaggageInput.selectedInsurances[passengerNumber] = true;
                price = thisChangeBaggageInput.passengers[passengerNumber].insurance.insuranceAmount;

                var insurance = new Object();
                insurance["Pax"] = passengerNumber;
                insurance["Amount"] = price;
                insurance["Code"] = $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).val();

                thisChangeBaggageInput.OnInsurancesChanged(insurance, false);
                //thisChangeBaggageInput.updateAddingServicesToBookingJsObj();

                $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).attr('checked', 'checked');

                if ($('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').length > 0) {
                    $('[data-object="' + thisChangeBaggageInput.labelContentContract + '"][data-identity="' + passengerNumber + '"]').addClass("is active");
                    $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').addClass("disableButton");
                    $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]' + ' span').html(thisChangeBaggageInput.ContractInsurance);
                }
                $('#' + thisChangeBaggageInput.labelButtonSubmit + ' .bt_link').html(thisChangeBaggageInput.labelButtonSubmitTextIn);
            }

            return false;
        }
        thisChangeBaggageInput.ButtonCancel = function (e) {
            var passengerNumber = $(e.currentTarget).data("identity");
            var price = 0;
            delete thisChangeBaggageInput.selectedInsurances[passengerNumber];

            var insurance = new Object();
            insurance["Pax"] = passengerNumber;
            insurance["Amount"] = price;
            insurance["Code"] = $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).val();

            thisChangeBaggageInput.OnInsurancesChanged(insurance, true);
            //thisChangeBaggageInput.updateAddingServicesToBookingJsObj();

            $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).removeAttr('checked');

            if ($('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').length > 0) {
                $('[data-object="' + thisChangeBaggageInput.labelContentContract + '"][data-identity="' + passengerNumber + '"]').removeClass("is active");
                $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').removeClass("disableButton");
                $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]' + ' span').html(thisChangeBaggageInput.NotContractInsurance);
            }
            if ($("#baggageNotPayed")[0].childNodes.length <= 0)
                $('#' + thisChangeBaggageInput.labelButtonSubmit + ' .bt_link').html(thisChangeBaggageInput.labelButtonSubmitTextOut);

            return false;
        }

        thisChangeBaggageInput.addBaggageChangedObserver = function (observer) {
            if (observer && typeof (observer) == "function") {
                totalBaggageChangeObservers.push(observer);
            }
        };

        thisChangeBaggageInput.OnTotalAmountChanged = function (total, pageCode, isRemove) {
            $.each(totalBaggageChangeObservers, function (index, event) {
                try {
                    event(total, pageCode, isRemove);
                } catch (e) {
                    console.error('Error executing: %s. Error: %s', event, e);
                }
            });
        };

        thisChangeBaggageInput.addInsuranceChangedObserver = function (observer) {
            if (observer && typeof (observer) == "function") {
                totalInsurancesChangeObservers.push(observer);
            }
        };

        thisChangeBaggageInput.OnInsurancesChanged = function (total, remove) {
            $.each(totalInsurancesChangeObservers, function (index, event) {
                try {
                    event(total, "CHANGEBAGGAGE", remove);
                } catch (e) {
                    console.error('Error executing: %s. Error: %s', event, e);
                }
            });
        };

        thisChangeBaggageInput.IcoBaggageClick = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            var obj = $(e.currentTarget);

            var baggageValue = obj.data("maleta");
            var paxid = $(obj).parent("[data-MaletaPax]").data("maletapax");

            thisChangeBaggageInput.getById(thisChangeBaggageInput.passengers[paxid].baggage.select).val(baggageValue);
            thisChangeBaggageInput.getById(thisChangeBaggageInput.passengers[paxid].baggage.select).change();

        };


        thisChangeBaggageInput.IcoBaggageHoverIn = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            var obj = $(e.currentTarget);
            var objParent = obj.parent("[data-maletapax]");
            var baggageindex = parseInt(obj.data("maletaindex"));

            $("[data-maleta][data-maletaallowed='true']", objParent).removeClass("active");
            for (var i = 0; i < baggageindex + 1; i++)
                $("[data-maletaindex=" + i + "]", objParent).addClass("active");
        };

        thisChangeBaggageInput.IcoBaggageHoverOut = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            var obj = $(e.currentTarget);
            var objParent = obj.parent("[data-maletapax]");
            var paxid = parseInt(objParent.data("maletapax"));

            var baggageValue = parseInt(thisChangeBaggageInput.getById(thisChangeBaggageInput.passengers[paxid].baggage.select).find("option:selected").data("index"));
            $("[data-maleta][data-maletaallowed='true']", objParent).removeClass("active");

            for (var i = 1; i <= baggageValue; i++)
                $("[data-maletaindex=" + i + "]", objParent).addClass("active");
        };

        thisChangeBaggageInput.addInsuranceClicked = function (passengerNumber) {
            var price = 0;
            if ($('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).attr('checked')) {
                thisChangeBaggageInput.selectedInsurances[passengerNumber] = true;
                price = thisChangeBaggageInput.passengers[passengerNumber].insurance.insuranceAmount;
            }
            else {
                delete thisChangeBaggageInput.selectedInsurances[passengerNumber];
            }

            var insurance = new Object();
            insurance["Pax"] = passengerNumber;
            insurance["Amount"] = price;
            insurance["Code"] = $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).val();

            thisChangeBaggageInput.OnInsurancesChanged(insurance, $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).attr('checked') != "checked");
            //thisChangeBaggageInput.updateAddingServicesToBookingJsObj();

            if ($('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').length > 0) {
                $('[data-object="' + thisChangeBaggageInput.labelContentContract + '"][data-identity="' + passengerNumber + '"]').removeClass("is active");
                $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').removeClass("disableButton");
            }

        }

        thisChangeBaggageInput.addBaggageClicked = function (passengerNumber) {
            if (thisChangeBaggageInput.passengers[passengerNumber].baggage.baggageSelected) {
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.chk).removeAttr('checked');
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.selectDiv).hide();
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.select + ' option:first-child').attr("selected", "selected");
                thisChangeBaggageInput.baggageComboChanged(passengerNumber);
                thisChangeBaggageInput.passengers[passengerNumber].baggage.baggageSelected = false;
            }
            else {
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.chk).attr('checked', 'checked');
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.selectDiv).show();
                thisChangeBaggageInput.passengers[passengerNumber].baggage.baggageSelected = true;
            }
        }

        thisChangeBaggageInput.BaggageChanges = function (paxid, selectedValue, bagIndex) {
            //ico
            var obj = $("[data-maletapax=" + paxid + "]");
            $("[data-maleta][data-maletaallowed='true']", obj).removeClass("active");
            for (var i = 0; i < bagIndex + 1; i++)
                $("[data-maletaindex=" + i + "]", obj).addClass("active");

            //KG
            $("[data-maletapax=" + paxid + "] [data-totalkg]").html(thisChangeBaggageInput.passengers[paxid].baggage.baggageWeight * (bagIndex));

            if (bagIndex == 0) {
                $('[data-object="' + thisChangeBaggageInput.labelContentContractInsurance + '"][data-identity="' + paxid + '"]').hide();
                $('[data-object="' + thisChangeBaggageInput.labelContentContractInsurance + '"][data-identity="' + paxid + '"]').removeAttr("data-action");
                $('[data-object="' + thisChangeBaggageInput.labelContentContract + '"][data-identity="' + paxid + '"]').removeClass("is active");
                $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + paxid + '"]').removeClass("disableButton");
            }
            else {
                $('[data-object="' + thisChangeBaggageInput.labelContentContractInsurance + '"][data-identity="' + paxid + '"]').show();
                $('[data-object="' + thisChangeBaggageInput.labelContentContractInsurance + '"][data-identity="' + paxid + '"]').attr("data-action", "On");
                if ($('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + paxid + '"]').length > 0) {
                    $('[data-object="' + thisChangeBaggageInput.labelContentContract + '"][data-identity="' + paxid + '"]').removeClass("is active");
                    $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonContract + '"][data-identity="' + paxid + '"]').removeClass("disableButton");
                    $('[data-object="' + thisChangeBaggageInput.labelContentContractButtonCancel + '"][data-identity="' + paxid + '"]').trigger("click");
                }
            }
            if ($("#baggageNotPayed")[0].childNodes.length <= 0) {
                $('#' + thisChangeBaggageInput.labelButtonSubmit + ' .bt_link').html(thisChangeBaggageInput.labelButtonSubmitTextOut);
            } else {
                $('#' + thisChangeBaggageInput.labelButtonSubmit + ' .bt_link').html(thisChangeBaggageInput.labelButtonSubmitTextIn);
            }

            if ($('[data-object="' + thisChangeBaggageInput.labelContentContractInsurance + '"][data-action="On"]').length <= 0) {
                if (!$('[data-object="' + thisChangeBaggageInput.labelContentInsurances + '"]').hasClass("hidden"))
                    $('[data-object="' + thisChangeBaggageInput.labelContentInsurances + '"]').addClass("hidden");
            } else
                $('[data-object="' + thisChangeBaggageInput.labelContentInsurances + '"]').removeClass("hidden");

            var nameBag = thisChangeBaggageInput.bagaggeTextSingular;
            if (bagIndex > 1)
                nameBag = thisChangeBaggageInput.bagaggeText;
            $('[data-object="' + thisChangeBaggageInput.labelContentContractInsurance + '"][data-identity="' + paxid + '"] .block--passenger__num').html("(" + bagIndex + " " + nameBag + ")");


        };

        thisChangeBaggageInput.baggageComboChanged = function (passengerNumber) {
            if ($('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.select).val() == '') {
                if (thisChangeBaggageInput.passengers[passengerNumber].insurance.showAlways == false) {
                    if (thisChangeBaggageInput.passengers[passengerNumber].insurance.insuranceIsEditable == true) {
                        $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.chk).removeAttr('checked');
                    }
                    $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.div).hide();
                }
                delete thisChangeBaggageInput.selectedInsurances[passengerNumber];
            }
            else {
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].insurance.div).show();
            }
            var baggageCodeSelected = $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.select).val();
            if (baggageCodeSelected != '') {
                var amount = 0;
                if (thisChangeBaggageInput.passengers[passengerNumber].baggage.availableSSR[baggageCodeSelected] != undefined)
                    amount = thisChangeBaggageInput.passengers[passengerNumber].baggage.availableSSR[baggageCodeSelected].amount;

                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.baggagePrice).text(
                    SKYSALES.Util.convertToLocaleCurrency(amount)
                );
                thisChangeBaggageInput.selectedBaggages[passengerNumber] = baggageCodeSelected;
            }
            else {
                $('#' + thisChangeBaggageInput.passengers[passengerNumber].baggage.baggagePrice).text('');
                delete thisChangeBaggageInput.selectedBaggages[passengerNumber];
            }

            var bag = new Object();
            bag["price"] = thisChangeBaggageInput.GetPriceSelectedBag(passengerNumber, baggageCodeSelected);
            bag["paxId"] = passengerNumber;
            bag["Code"] = baggageCodeSelected == "" ? "BAG1" : baggageCodeSelected;

            thisChangeBaggageInput.OnTotalAmountChanged(bag, "CHANGEBAGGAGE", baggageCodeSelected == "");
            //thisChangeBaggageInput.updateAddingServicesToBookingJsObj();
        }

        thisChangeBaggageInput.GetPriceSelectedBag = function (paxid, bagCode) {
            var result = 0;
            if (thisChangeBaggageInput.passengers[paxid].baggage.availableSSR[bagCode] != undefined)
                result = thisChangeBaggageInput.passengers[paxid].baggage.availableSSR[bagCode]['amount'];
            return result;
        };

        thisChangeBaggageInput.RefreshTotalPriceToPay = function () {
            $("#" + thisChangeBaggageInput.TotalPriceLabelId).text($("#" + thisChangeBaggageInput.TotalPriceBarLabelId).text());
        };

        return thisChangeBaggageInput;
    };

    /*
    Name: 
    Class AddingServicesToBooking
    Param:
    None
    Return: 
    An instance of AddingServicesToBooking
    Functionality:
    This class represents AddingServicesToBooking
    Notes:
    Class Hierarchy:
    SkySales -> AddingServicesToBooking
    */
    VUELING.Class.AddingServicesToBooking = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisAddingServicesToBooking = SKYSALES.Util.extendObject(parent);

        thisAddingServicesToBooking.div = "";
        thisAddingServicesToBooking.title = "";
        thisAddingServicesToBooking.services = "";
        thisAddingServicesToBooking.total = "";
        thisAddingServicesToBooking.totalText = "";
        thisAddingServicesToBooking.totalPay = "";
        thisAddingServicesToBooking.seatsPayedTitle = "";
        thisAddingServicesToBooking.seatsNotPayedTitle = "";
        thisAddingServicesToBooking.InitializeChangeFlightService = false;
        thisAddingServicesToBooking.ChangeFlightsTitle = "";
        thisAddingServicesToBooking.ChangeFlightsSubtitle = "";
        thisAddingServicesToBooking.ChangeFlightsBalanceDue = "";

        thisAddingServicesToBooking.totalAmount = 0;
        thisAddingServicesToBooking.overwriteTotalAmount = null;

        thisAddingServicesToBooking.allowNegativeTotalBalance = false;

        thisAddingServicesToBooking.servicesPricesArray = [];

        thisAddingServicesToBooking.init = function (json) {
            this.setSettingsByObject(json);
            this.addEvents();
            if (thisAddingServicesToBooking.InitializeChangeFlightService && thisAddingServicesToBooking.ChangeFlightsBalanceDue > 0)
                thisAddingServicesToBooking.InitializeChangeFlight();
        };

        thisAddingServicesToBooking.addEvents = function () {
            parent.addEvents.call(this);
        };

        thisAddingServicesToBooking.InitializeChangeFlight = function () {
            var servicesList = [];
            var service;

            service = [];
            service['num'] = 1;
            service['desc'] = thisAddingServicesToBooking.ChangeFlightsSubtitle;
            service['price'] = thisAddingServicesToBooking.ChangeFlightsBalanceDue;
            servicesList.push(service);

            thisAddingServicesToBooking.setService('changeFlights', thisAddingServicesToBooking.ChangeFlightsTitle, servicesList, true, true);
        };

        thisAddingServicesToBooking.setTitle = function (title) {
            $('#' + thisAddingServicesToBooking.title).text(title).show();
        };

        thisAddingServicesToBooking.show = function () {
            $('#' + thisAddingServicesToBooking.div).show();
        };

        thisAddingServicesToBooking.setService = function (serviceId, serviceTitle, serviceLines, showServiceTotal, showAllPricesPositive) {
            var servicePrice = 0,
                tableID = 'id' + thisAddingServicesToBooking.services + 'Table' + serviceId,
                htmlTable =
                "<table id='" + tableID + "' class='sideTable serviceInfo' cellspacing='0' cellpadding='0' border='0'>" +
                "<thead>" +
                "<tr>" +
                "<th colspan='3'><span>" + serviceTitle + "</span></th>" +
                "</tr>" +
                "</thead><tbody>",
                price,
                formattedPrice,
                priceClass,
                servicePriceAux,
                auxPriceFormatted,
                auxPriceClass;

            for (var i in serviceLines) {
                price = serviceLines[i]['price'];
                if (showAllPricesPositive == true && price < 0) {
                    price = price * (-1);
                }
                formattedPrice = SKYSALES.Util.convertToLocaleCurrency(price);
                priceClass = SKYSALES.Util.getPriceClass(formattedPrice);

                htmlTable = htmlTable +
                    "<tr>" +
                    "<td class='col1' colspan='2'>" +
                        serviceLines[i]['num'] +
                        " " +
                        serviceLines[i]['desc'] +
                    "</td>" +
                    "<td class='col3 " + priceClass + "'>" + formattedPrice + "</td>" +
                    "</tr>";

                servicePrice = servicePrice + serviceLines[i]['price'];
            }

            if (showServiceTotal != undefined && showServiceTotal == true) {
                servicePriceAux = servicePrice;
                if (showAllPricesPositive != undefined && showAllPricesPositive == true && servicePriceAux < 0) {
                    servicePriceAux = servicePriceAux * (-1);
                }

                auxPriceFormatted = SKYSALES.Util.convertToLocaleCurrency(servicePriceAux);
                auxPriceClass = SKYSALES.Util.getPriceClass(auxPriceFormatted);

                htmlTable = htmlTable +
                    "<tr>" +
                    "<td class='col1' colspan='2'><strong>" +
                        thisAddingServicesToBooking.totalText +
                    "</strong></td>" +
                    "<td class='col3 " + auxPriceClass + "'>" + auxPriceFormatted + "</td>" +
                    "</tr>";
            }

            htmlTable = htmlTable + "</tbody></table>";

            $('#' + tableID).remove();
            $('#' + thisAddingServicesToBooking.services).append(htmlTable);

            thisAddingServicesToBooking.servicesPricesArray[serviceId] = servicePrice;

            thisAddingServicesToBooking.updateTotalPrice();
        };

        thisAddingServicesToBooking.removeService = function (serviceId) {
            var tableID = 'id' + thisAddingServicesToBooking.services + 'Table' + serviceId;
            $('#' + tableID).remove();
            delete thisAddingServicesToBooking.servicesPricesArray[serviceId];

            thisAddingServicesToBooking.updateTotalPrice();
        };

        thisAddingServicesToBooking.updateTotalPrice = function () {
            var totalElement = $('#' + thisAddingServicesToBooking.total),
                formattedPrice,
                priceClass;

            if (thisAddingServicesToBooking.overwriteTotalAmount == null) {
                thisAddingServicesToBooking.totalAmount = 0;

                for (var i in thisAddingServicesToBooking.servicesPricesArray) {
                    thisAddingServicesToBooking.totalAmount = thisAddingServicesToBooking.totalAmount + thisAddingServicesToBooking.servicesPricesArray[i];
                }
            }
            else {
                thisAddingServicesToBooking.totalAmount = thisAddingServicesToBooking.overwriteTotalAmount;
            }

            var totalAmountToShow = thisAddingServicesToBooking.totalAmount.toFixed(2);
            if (thisAddingServicesToBooking.allowNegativeTotalBalance == false && thisAddingServicesToBooking.totalAmount < 0) {
                totalAmountToShow = 0;
            }

            formattedPrice = SKYSALES.Util.convertToLocaleCurrency(totalAmountToShow);
            priceClass = SKYSALES.Util.getPriceClass(formattedPrice);

            totalElement.html(formattedPrice);
            totalElement.attr("class", priceClass);
            totalElement.parent().show();
            $('#' + thisAddingServicesToBooking.div + ' .sepTotalPrice').show();
        };

        return thisAddingServicesToBooking;
    };

    VUELING.Class.ChangeJourneysToAddingServicesToBooking = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisChangeJourneysToAddingServicesToBooking = SKYSALES.Util.extendObject(parent);

        thisChangeJourneysToAddingServicesToBooking.ChangePage = "";
        thisChangeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney = [];
        thisChangeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney = [];
        thisChangeJourneysToAddingServicesToBooking.NumPassengers = "";
        thisChangeJourneysToAddingServicesToBooking.NumInfants = "";
        thisChangeJourneysToAddingServicesToBooking.OutboundFare = "";
        thisChangeJourneysToAddingServicesToBooking.InboundFare = "";
        thisChangeJourneysToAddingServicesToBooking.TotalFare = "";
        thisChangeJourneysToAddingServicesToBooking.OutboundFlightText = "";
        thisChangeJourneysToAddingServicesToBooking.InboundFlight = "";
        thisChangeJourneysToAddingServicesToBooking.ActualFlight = "";
        thisChangeJourneysToAddingServicesToBooking.NewFlights = "";
        thisChangeJourneysToAddingServicesToBooking.ChangeFlightsFeesTitle = "";
        thisChangeJourneysToAddingServicesToBooking.OutboundChangeFlightsFees = "";
        thisChangeJourneysToAddingServicesToBooking.InboundChangeFlightsFees = "";
        thisChangeJourneysToAddingServicesToBooking.OutboundChangeINFFlightsFees = "";
        thisChangeJourneysToAddingServicesToBooking.InboundChangeINFFlightsFees = "";

        thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingName = "AddingServicesToBooking";
        thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj = null;
        thisChangeJourneysToAddingServicesToBooking.SearchChangeName = "SearchChange";
        thisChangeJourneysToAddingServicesToBooking.SearchChangeJsObj = null;
        thisChangeJourneysToAddingServicesToBooking.NewOutboundFare = 0;
        thisChangeJourneysToAddingServicesToBooking.NewInboundFare = 0;
        thisChangeJourneysToAddingServicesToBooking.TotalChangeFee = 0;

        thisChangeJourneysToAddingServicesToBooking.init = function (json) {
            this.setSettingsByObject(json);
            this.initialize();
            this.addEvents();
        };

        thisChangeJourneysToAddingServicesToBooking.initialize = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingName.length) === thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingName) {
                    thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj = SKYSALES.Instance[ins];
                }
            }

            var servicesList = [];
            var service;

            service = [];
            service['num'] = thisChangeJourneysToAddingServicesToBooking.NumPassengers;
            service['desc'] = thisChangeJourneysToAddingServicesToBooking.OutboundFlightText;
            service['price'] = thisChangeJourneysToAddingServicesToBooking.OutboundFare * (-1);
            servicesList.push(service);

            thisChangeJourneysToAddingServicesToBooking.NewOutboundFare = thisChangeJourneysToAddingServicesToBooking.OutboundFare;

            if (thisChangeJourneysToAddingServicesToBooking.InboundFare > 0) {
                service = [];
                service['num'] = thisChangeJourneysToAddingServicesToBooking.NumPassengers;
                service['desc'] = thisChangeJourneysToAddingServicesToBooking.InboundFlight;
                service['price'] = thisChangeJourneysToAddingServicesToBooking.InboundFare * (-1);
                servicesList.push(service);

                thisChangeJourneysToAddingServicesToBooking.NewInboundFare = thisChangeJourneysToAddingServicesToBooking.InboundFare;
            }

            //thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj.setService('journeysOnBooking', thisChangeJourneysToAddingServicesToBooking.ActualFlight, servicesList, true, true);

            if (thisChangeJourneysToAddingServicesToBooking.ChangePage == "select") {

                var searchChange;

                for (var ins in SKYSALES.Instance) {
                    if (ins.substring(0, thisChangeJourneysToAddingServicesToBooking.SearchChangeName.length) === thisChangeJourneysToAddingServicesToBooking.SearchChangeName) {
                        searchChange = SKYSALES.Instance[ins];
                        thisChangeJourneysToAddingServicesToBooking.SearchChangeJsObj = searchChange;
                    }
                }

                if (searchChange != undefined) {
                    var changingOutbound = searchChange.outboundChangeCheckbox.prop("checked"),
                        changingInbound = searchChange.inboundChangeCheckbox.prop("checked");

                    servicesList = [];

                    if (changingOutbound) {
                        service = [];
                        service['num'] = thisChangeJourneysToAddingServicesToBooking.NumPassengers;
                        service['desc'] = thisChangeJourneysToAddingServicesToBooking.OutboundChangeFlightsFees;
                        service['price'] = 0;
                        if (thisChangeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney.length > 0)
                            service['price'] = thisChangeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney[0] * thisChangeJourneysToAddingServicesToBooking.NumPassengers;
                        thisChangeJourneysToAddingServicesToBooking.TotalChangeFee += service['price'];
                        servicesList.push(service);

                        if (thisChangeJourneysToAddingServicesToBooking.NumInfants > 0) {
                            service = [];
                            service['num'] = thisChangeJourneysToAddingServicesToBooking.NumInfants;
                            service['desc'] = thisChangeJourneysToAddingServicesToBooking.OutboundChangeINFFlightsFees;
                            service['price'] = 0;
                            if (thisChangeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney.length > 0)
                                service['price'] = thisChangeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney[0] * thisChangeJourneysToAddingServicesToBooking.NumInfants;
                            thisChangeJourneysToAddingServicesToBooking.TotalChangeFee += service['price'];
                            servicesList.push(service);
                        }
                    }

                    if (thisChangeJourneysToAddingServicesToBooking.SearchChangeJsObj.numberOfMarkets > 1 &&
                        changingInbound) {
                        service = [];
                        service['num'] = thisChangeJourneysToAddingServicesToBooking.NumPassengers;
                        service['desc'] = thisChangeJourneysToAddingServicesToBooking.InboundChangeFlightsFees;
                        service['price'] = 0;
                        if (thisChangeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney.length > 1)
                            service['price'] = thisChangeJourneysToAddingServicesToBooking.ChangeFeePerPaxAndJourney[1] * thisChangeJourneysToAddingServicesToBooking.NumPassengers;
                        thisChangeJourneysToAddingServicesToBooking.TotalChangeFee += service['price'];
                        servicesList.push(service);

                        if (thisChangeJourneysToAddingServicesToBooking.NumInfants > 0) {
                            service = [];
                            service['num'] = thisChangeJourneysToAddingServicesToBooking.NumInfants;
                            service['desc'] = thisChangeJourneysToAddingServicesToBooking.InboundChangeINFFlightsFees;
                            service['price'] = 0;
                            if (thisChangeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney.length > 1)
                                service['price'] = thisChangeJourneysToAddingServicesToBooking.ChangeFeePerInfAndJourney[1] * thisChangeJourneysToAddingServicesToBooking.NumInfants;
                            thisChangeJourneysToAddingServicesToBooking.TotalChangeFee += service['price'];
                            servicesList.push(service);
                        }
                    }

                    if (thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj != null && thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj != undefined) {
                        thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj.overwriteTotalAmount = thisChangeJourneysToAddingServicesToBooking.TotalChangeFee;

                        thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj.setService('journeysChangeFee', thisChangeJourneysToAddingServicesToBooking.ChangeFlightsFeesTitle, servicesList, true);
                    }
                }
            }
        };

        thisChangeJourneysToAddingServicesToBooking.addEvents = function () {
            $("#availabilityTable0 tr").live("click", this.outboundJourneyClickEventHandler);
            $("#availabilityTable1 tr").live("click", this.inboundJourneyClickEventHandler);
        };

        thisChangeJourneysToAddingServicesToBooking.outboundJourneyClickEventHandler = function (journeyClicked) {
            if ($("#availabilityTable0 tr input[type='radio']:checked").length != 1)
                return;
            var amount = SKYSALES.Util.convertLocaleCurrencyToDecimal($('label', $("#availabilityTable0 tr input[type='radio']:checked").parent()).text());
            thisChangeJourneysToAddingServicesToBooking.NewOutboundFare = Number((amount * thisChangeJourneysToAddingServicesToBooking.NumPassengers).toFixed(2));
            thisChangeJourneysToAddingServicesToBooking.JourneyClickEventHandler();
        };

        thisChangeJourneysToAddingServicesToBooking.inboundJourneyClickEventHandler = function (journeyClicked) {
            if ($("#availabilityTable1 tr input[type='radio']:checked").length != 1)
                return;
            var amount = SKYSALES.Util.convertLocaleCurrencyToDecimal($('label', $("#availabilityTable1 tr input[type='radio']:checked").parent()).text());
            thisChangeJourneysToAddingServicesToBooking.NewInboundFare = Number((amount * thisChangeJourneysToAddingServicesToBooking.NumPassengers).toFixed(2));
            thisChangeJourneysToAddingServicesToBooking.JourneyClickEventHandler();
        };

        thisChangeJourneysToAddingServicesToBooking.JourneyClickEventHandler = function () {
            var newFaresAmount = 0;
            var servicesList = [];
            var service;

            service = [];
            service['num'] = thisChangeJourneysToAddingServicesToBooking.NumPassengers;
            service['desc'] = thisChangeJourneysToAddingServicesToBooking.OutboundFlightText;
            service['price'] = thisChangeJourneysToAddingServicesToBooking.NewOutboundFare;
            if (thisChangeJourneysToAddingServicesToBooking.NewOutboundFare > thisChangeJourneysToAddingServicesToBooking.OutboundFare)
                newFaresAmount += thisChangeJourneysToAddingServicesToBooking.NewOutboundFare;
            else
                newFaresAmount += thisChangeJourneysToAddingServicesToBooking.OutboundFare;
            servicesList.push(service);

            if (thisChangeJourneysToAddingServicesToBooking.InboundFare > 0) {
                service = [];
                service['num'] = thisChangeJourneysToAddingServicesToBooking.NumPassengers;
                service['desc'] = thisChangeJourneysToAddingServicesToBooking.InboundFlight;
                service['price'] = thisChangeJourneysToAddingServicesToBooking.NewInboundFare;
                if (thisChangeJourneysToAddingServicesToBooking.NewInboundFare > thisChangeJourneysToAddingServicesToBooking.InboundFare)
                    newFaresAmount += thisChangeJourneysToAddingServicesToBooking.NewInboundFare;
                else
                    newFaresAmount += thisChangeJourneysToAddingServicesToBooking.InboundFare;
                servicesList.push(service);
            }

            if (thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj != null && thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj != undefined) {
                thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj.overwriteTotalAmount =
                    thisChangeJourneysToAddingServicesToBooking.TotalChangeFee - thisChangeJourneysToAddingServicesToBooking.TotalFare + newFaresAmount;

                thisChangeJourneysToAddingServicesToBooking.AddingServicesToBookingJsObj.setService('newJourneys', thisChangeJourneysToAddingServicesToBooking.NewFlights, servicesList, true);
            }
        };

        return thisChangeJourneysToAddingServicesToBooking;
    };

    /*
    Name: 
    Class SSRInsuraceInputChange
    Param:
    None
    Return: 
    An instance of SSRInsuraceInputChange
    Functionality:
    This class represents SSRInsuraceInputChange
    Notes:
    Class Hierarchy:
    SkySales -> SSRInsuraceInputChange
    */
    VUELING.Class.SSRInsuraceInputChange = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisSSRInsuraceInputChange = SKYSALES.Util.extendObject(parent);

        thisSSRInsuraceInputChange.numPassengers = "";
        thisSSRInsuraceInputChange.basePassengerId = "";
        thisSSRInsuraceInputChange.baseInsuranceId = "";
        thisSSRInsuraceInputChange.goUp = "";
        thisSSRInsuraceInputChange.goDown = "";
        thisSSRInsuraceInputChange.passengerList = "";
        thisSSRInsuraceInputChange.insurancesList = "";
        thisSSRInsuraceInputChange.selectedPassengerName = "";
        thisSSRInsuraceInputChange.passengers = [];
        thisSSRInsuraceInputChange.insurances = [];
        thisSSRInsuraceInputChange.insurancesDivs = [];
        thisSSRInsuraceInputChange.addingServicesTitle = "";
        thisSSRInsuraceInputChange.addingServicesSubtitle = "";
        thisSSRInsuraceInputChange.labelButtonSubmit = "";
        thisSSRInsuraceInputChange.labelButtonSubmitTextIn = "";
        thisSSRInsuraceInputChange.labelButtonSubmitTextOut = "";
        thisSSRInsuraceInputChange.ContractInsurance = "";
        thisSSRInsuraceInputChange.NotContractInsurance = "";
        thisSSRInsuraceInputChange.labelContentContractButtonContract = "";
        thisSSRInsuraceInputChange.labelContentContractButtonCancel = "";
        thisSSRInsuraceInputChange.labelContentContract = "";
        thisSSRInsuraceInputChange.labelContentContractCheck = "";
        thisSSRInsuraceInputChange.labelinsuranceNotPayed = "";

        thisSSRInsuraceInputChange.AddingServicesToBookingJsObj;
        thisSSRInsuraceInputChange.selectedInsurances = [];

        var insurancesChangeObservers = [];
        thisSSRInsuraceInputChange.addInsurancesChangeObserver = function (observer) {
            if (observer && typeof (observer) == "function") {
                insurancesChangeObservers.push(observer);
            }
        }

        thisSSRInsuraceInputChange.NotifyInsurancesSelection = function (insurance, isRemove) {
            $.each(insurancesChangeObservers, function (index, event) {
                try {
                    event(insurance, "CHANGEINSURANCE", isRemove);
                } catch (e) {
                    console.error('Error executing: %s. Error: %s', event, e);
                }
            });
        };

        thisSSRInsuraceInputChange.init = function (json) {
            this.setSettingsByObject(json);
            this.initializeSelectedInsurances();
            this.addEvents();

            thisSSRInsuraceInputChange.selectPassenger(0);
        };

        thisSSRInsuraceInputChange.initializeSelectedInsurances = function () {
            $.each(thisSSRInsuraceInputChange.insurances, function () {
                if (this.editable && this.selected) {
                    if (thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType] == undefined) {
                        thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType] = [];
                        thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['abbr'] = this.insuranceAbbrText;
                        thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['passengers'] = [];
                    }

                    thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['passengers'][this.passengerNumber] = this.insurancePrice;
                }
            });
        };

        thisSSRInsuraceInputChange.addEvents = function () {
            parent.addEvents.call(this);

            $.each(thisSSRInsuraceInputChange.insurances, function () {
                $('#' + this.btn + ', #' + this.btn + 'no').click(function (btn_clicked) {
                    var btnObjID = this.id;
                    var btnObj = $(this);

                    $.each(thisSSRInsuraceInputChange.insurances, function () {
                        if (this.btn == btnObjID || this.btn + 'span' == btnObjID || this.btn + 'no' == btnObjID) {
                            if (this.editable == false)
                                return false;

                            var chkObj = $('#' + this.chk);
                            var divObj = $('#' + this.div);
                            var btnNoObj = $('#' + this.btn + 'no');

                            if (chkObj.attr('checked') == 'checked') {
                                chkObj.removeAttr('checked');
                                divObj.removeClass('sectionSelected');
                                btnNoObj.hide();

                                if (thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType] != undefined
                                    && thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['passengers'][this.passengerNumber] != undefined) {
                                    delete thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['passengers'][this.passengerNumber];
                                }
                            }
                            else {
                                chkObj.attr('checked', 'checked');
                                divObj.addClass('sectionSelected');
                                btnNoObj.show();

                                if (thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType] == undefined) {
                                    thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType] = [];
                                    thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['abbr'] = this.insuranceAbbrText;
                                    thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['passengers'] = [];
                                }

                                thisSSRInsuraceInputChange.selectedInsurances[this.insuranceType]['passengers'][this.passengerNumber] = this.insurancePrice;
                            }

                            var insurance = new Object();

                            if (this.insuranceType == "MyDearThings")
                                insurance["Code"] = "SEE";
                            else if (this.insuranceType == "MissedFlight")
                                insurance["Code"] = "SAS";
                            else if (this.insuranceType == "MySki")
                                insurance["Code"] = "SCS";
                            else if (this.insuranceType == "MyHobbies")
                                insurance["Code"] = "SED";
                            else if (this.insuranceType == "MyHealth")
                                insurance["Code"] = "SEM";
                            else if (this.insuranceType == "AnulacionTotal")
                                insurance["Code"] = "SEA";
                            else
                                insurance["Code"] = "SCT";

                            insurance["Amount"] = this.insurancePrice;
                            insurance["Pax"] = this.passengerNumber;

                            thisSSRInsuraceInputChange.NotifyInsurancesSelection(insurance, chkObj.attr('checked') != 'checked');
                            return false;
                        }
                    });

                    return false;
                });
            });

            $.each(thisSSRInsuraceInputChange.passengers, function () {
                $('#' + this.div).click(function (obj_clicked) {
                    var obj = $(obj_clicked.currentTarget);
                    var passengerNumber = obj.attr('id');
                    passengerNumber = passengerNumber.replace(thisSSRInsuraceInputChange.basePassengerId, '').replace('_rdio', '');
                    thisSSRInsuraceInputChange.selectPassenger(passengerNumber);
                });
            });

            $('#' + thisSSRInsuraceInputChange.goUp).click(function () { thisSSRInsuraceInputChange.movePassengersList('UP'); return false; });
            $('#' + thisSSRInsuraceInputChange.goDown).click(function () { thisSSRInsuraceInputChange.movePassengersList('DOWN'); return false; });

            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractButtonContract + '"]').click(thisSSRInsuraceInputChange.ButtonContract);
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractButtonCancel + '"]').click(thisSSRInsuraceInputChange.ButtonCancel);
        };

        thisSSRInsuraceInputChange.foreachInsuraceInputChange = function (callback, e) {
            var passengerNumber = $(e.currentTarget).data("identity");
            var insuranceCode = $(e.currentTarget).data("insurance");

            for (var i = 0; i < thisSSRInsuraceInputChange.insurances.length; i++) {
                var obj = thisSSRInsuraceInputChange.insurances[i];
                if (obj.Code == insuranceCode) {
                    var insuranceType = obj.insuranceType;
                    var insuranceName = obj.insuranceAbbrText;
                    if (thisSSRInsuraceInputChange.selectedInsurances[insuranceType] == undefined) {
                        thisSSRInsuraceInputChange.selectedInsurances[insuranceType] = [];
                        thisSSRInsuraceInputChange.selectedInsurances[insuranceType]['abbr'] = insuranceName;
                        thisSSRInsuraceInputChange.selectedInsurances[insuranceType]['passengers'] = [];
                    }

                    thisSSRInsuraceInputChange.selectedInsurances[insuranceType]['passengers'][passengerNumber] = obj.insurancePrice;
                    callback(insuranceCode, obj.insurancePrice, passengerNumber);
                }
            }
        };

        thisSSRInsuraceInputChange.ButtonContract = function (e) {
            if (!$(e.currentTarget).hasClass("disableButton")) {
                thisSSRInsuraceInputChange.foreachInsuraceInputChange(function (insuranceCode, insurancePrice, passengerNumber) {
                    thisSSRInsuraceInputChange.AddInsurance(insuranceCode, insurancePrice, passengerNumber);
                }, e);
            }

            return false;
        }
        thisSSRInsuraceInputChange.ButtonCancel = function (e) {
            thisSSRInsuraceInputChange.foreachInsuraceInputChange(function (insuranceCode, insurancePrice, passengerNumber) {
                thisSSRInsuraceInputChange.RemoveInsurance(insuranceCode, insurancePrice, passengerNumber);
            }, e);

            return false;
        }

        thisSSRInsuraceInputChange.AddInsurance = function (insuranceCode, insurancePrice, passengerNumber) {
            var insurance = new Object();
            insurance["Code"] = insuranceCode;
            insurance["Amount"] = insurancePrice;
            insurance["Pax"] = passengerNumber;

            thisSSRInsuraceInputChange.NotifyInsurancesSelection(insurance, false);

            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContract + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]').addClass("is active");
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]').addClass("disableButton");
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]' + ' span').html(thisSSRInsuraceInputChange.ContractInsurance);
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractCheck + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]').attr("checked", "checked");
            $('#' + thisSSRInsuraceInputChange.labelButtonSubmit + ' .bt_link').html(thisSSRInsuraceInputChange.labelButtonSubmitTextIn);
        }
        thisSSRInsuraceInputChange.RemoveInsurance = function (insuranceCode, insurancePrice, passengerNumber) {
            var insurance = new Object();
            insurance["Code"] = insuranceCode;
            insurance["Amount"] = insurancePrice;
            insurance["Pax"] = passengerNumber;

            thisSSRInsuraceInputChange.NotifyInsurancesSelection(insurance, true);

            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContract + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]').removeClass("is active");
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]').removeClass("disableButton");
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]' + ' span').html(thisSSRInsuraceInputChange.NotContractInsurance);
            $('[data-object="' + thisSSRInsuraceInputChange.labelContentContractCheck + '"][data-identity="' + passengerNumber + '"][data-insurance="' + insuranceCode + '"]').removeAttr("checked");
            if ($('#' + thisSSRInsuraceInputChange.labelinsuranceNotPayed)[0].childNodes.length <= 0)
                $('#' + thisSSRInsuraceInputChange.labelButtonSubmit + ' .bt_link').html(thisSSRInsuraceInputChange.labelButtonSubmitTextOut);
        }

        thisSSRInsuraceInputChange.selectPassenger = function (passengerNumber) {
            $.each(thisSSRInsuraceInputChange.insurances, function () {
                if (this.passengerNumber == passengerNumber) {
                    $('#' + this.div).show();
                    //$('#' + this.div).addClass('displayInlineBlock');
                }
                else {
                    $('#' + this.div).removeClass('displayInlineBlock');
                    $('#' + this.div).hide();
                }
            });

            $.each(thisSSRInsuraceInputChange.passengers, function () {
                if (this.passengerNumber == passengerNumber) {
                    $('#' + this.rdio).attr('checked', 'checked');
                    $('#' + this.div).addClass('checked');
                    $('#' + thisSSRInsuraceInputChange.selectedPassengerName).html($('#' + this.div + ' > label > div').html());
                }
                else {
                    $('#' + this.div).removeAttr('checked');
                    $('#' + this.div).removeClass('checked');
                }
            });

            $.each(thisSSRInsuraceInputChange.insurancesDivs, function () {
                if ($('.' + this.divclass + ':visible').length == 0)
                    $('#' + this.title).hide();
                else
                    $('#' + this.title).show();
            });
        };

        thisSSRInsuraceInputChange.movePassengersList = function (direction) {
            var passengersHidden = $('#' + thisSSRInsuraceInputChange.passengerList + ' .contentScroll > fieldset:hidden').length;

            if (direction == "UP") {
                if (passengersHidden <= 0)
                    return;
                else if (passengersHidden <= 1)
                    $('#' + thisSSRInsuraceInputChange.goUp).addClass('topScroll');

                $('#' + thisSSRInsuraceInputChange.goDown).removeClass('bottomScroll');
                var firstShown = $('#' + thisSSRInsuraceInputChange.passengerList + ' .contentScroll > fieldset:hidden:last');
                firstShown.slideDown();
            }

            if (direction == "DOWN") {
                if (thisSSRInsuraceInputChange.numPassengers - passengersHidden < 5) {
                    $('#' + thisSSRInsuraceInputChange.goDown).addClass('bottomScroll');
                    return;
                }

                $('#' + thisSSRInsuraceInputChange.goUp).removeClass('topScroll');
                var firstShown = $('#' + thisSSRInsuraceInputChange.passengerList + ' .contentScroll > fieldset:visible:first');
                firstShown.slideUp(400, thisSSRInsuraceInputChange.checkiIfLast);
            }
        };

        thisSSRInsuraceInputChange.checkiIfLast = function () {
            var passengersHidden = $('#' + thisSSRInsuraceInputChange.passengerList + ' .contentScroll > fieldset:hidden').length;
            if (thisSSRInsuraceInputChange.numPassengers - passengersHidden < 5)
                $('#' + thisSSRInsuraceInputChange.goDown).addClass('bottomScroll');
        };
        return thisSSRInsuraceInputChange;
    };

    /*
    Name:
    Class ChangeSpecialEquipmentInput
    Param:
    None
    Return:
    An instance of ChangeSpecialEquipmentInput
    Functionality:
    Notes:
    Class Hierarchy:
    SkySales -> ChangeSpecialEquipmentInput
    */
    VUELING.Class.ChangeSpecialEquipmentInput = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisChangeSpecialEquipmentInput = SKYSALES.Util.extendObject(parent);

        thisChangeSpecialEquipmentInput.addingServicesTitle = "";
        thisChangeSpecialEquipmentInput.addingServicesSubtitle = "";
        thisChangeSpecialEquipmentInput.passengers = [];
        thisChangeSpecialEquipmentInput.availableSpecialEquipment = [];

        thisChangeSpecialEquipmentInput.AddingServicesToBookingJsObj;
        thisChangeSpecialEquipmentInput.selectedSpecialEquipment = [];
        thisChangeSpecialEquipmentInput.selectedInsurances = [];
        thisChangeSpecialEquipmentInput.labelButtonSubmit = "";
        thisChangeSpecialEquipmentInput.labelButtonSubmitTextIn = "";
        thisChangeSpecialEquipmentInput.labelButtonSubmitTextOut = "";
        thisChangeSpecialEquipmentInput.ContractInsurance = "";
        thisChangeSpecialEquipmentInput.NotContractInsurance = "";
        thisChangeSpecialEquipmentInput.labelContentContractButtonContract = "";
        thisChangeSpecialEquipmentInput.labelContentContractButtonCancel = "";
        thisChangeSpecialEquipmentInput.labelContentContract = "";
        thisChangeSpecialEquipmentInput.labelspecialequipmentNotPayed = "";
        thisChangeSpecialEquipmentInput.labelspecialequipmentPayed = "";
        thisChangeSpecialEquipmentInput.labelContentContractInsurance = "";
        thisChangeSpecialEquipmentInput.labelContentInsurances = "";

        thisChangeSpecialEquipmentInput.setSettingsByObject = function (json) {
            parent.setSettingsByObject.call(this, json);
        };

        var specialEquipmentObservers = [];
        thisChangeSpecialEquipmentInput.addSpecialEquipmentChangeObserver = function (observer) {
            if (observer && typeof (observer) == "function") {
                specialEquipmentObservers.push(observer);
            }
        }

        thisChangeSpecialEquipmentInput.NotifyNewSpecialEquipmentSelection = function (specialEquipment, isRemove) {
            $.each(specialEquipmentObservers, function (index, event) {
                try {
                    event(specialEquipment, "SPECIALEQUIPMENT", isRemove);
                } catch (e) {
                    console.error('Error executing: %s. Error: %s', event, e);
                }
            });
        };

        thisChangeSpecialEquipmentInput.init = function (json) {
            this.setSettingsByObject(json);
            this.initializePage();
            this.addEvents();
        };

        thisChangeSpecialEquipmentInput.initializePage = function () {

            $.each(thisChangeSpecialEquipmentInput.passengers, function () {
                var passengerNumber = this.passengerNumber.toString();

                if (this.specialequipment.editable && this.specialequipment.selectedSSR != '')
                    thisChangeSpecialEquipmentInput.selectedSpecialEquipment[passengerNumber] = this.specialequipment.selectedSSR;

                $.each(this.insurances, function () {
                    if (this.editable && this.selected) {
                        thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber] = [];
                        thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['insuranceType'] = this.insuranceType;
                        thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['price'] = this.price;
                        thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['name'] = this.name;
                    }
                });

                thisChangeSpecialEquipmentInput.specialEquipmentComboChanged(passengerNumber);


            });
        };

        thisChangeSpecialEquipmentInput.addEvents = function () {
            $.each(thisChangeSpecialEquipmentInput.passengers, function () {
                $('#' + this.specialequipment.select).change(function (obj_changed) {
                    $.each(thisChangeSpecialEquipmentInput.passengers, function () {
                        if ($(obj_changed.currentTarget).attr('id') == this.specialequipment.select) {
                            thisChangeSpecialEquipmentInput.specialEquipmentComboChanged(this.passengerNumber);
                        }
                    });
                });

                $.each(this.insurances, function () {
                    $('#' + this.chk).click(function (event) {
                        $.each(thisChangeSpecialEquipmentInput.passengers, function () {
                            var passengerNumber = this.passengerNumber;
                            $.each(this.insurances, function () {
                                if ($(event.currentTarget).attr('id') == this.chk) {
                                    thisChangeSpecialEquipmentInput.insuranceClicked(passengerNumber, this.insuranceType);
                                }
                            });
                        });
                    });
                });
            });

            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractButtonContract + '"]').click(thisChangeSpecialEquipmentInput.ButtonContract);
            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractButtonCancel + '"]').click(thisChangeSpecialEquipmentInput.ButtonCancel);
        };
        thisChangeSpecialEquipmentInput.ButtonContract = function (e) {
            if (!$(e.currentTarget).hasClass("disableButton")) {
                var passengerNumber = $(e.currentTarget).data("identity");
                var ssr = $(e.currentTarget).data("insurance");
                var insuranceType = $(e.currentTarget).data("insurancetype");

                var isDelete = false;
                var insurance = new Object();

                insurance["Code"] = ssr;
                insurance["Pax"] = passengerNumber;

                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber] = [];
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['insuranceType'] = insuranceType;
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['price'] = thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType]['price'];
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['name'] = thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType]['name'];

                insurance["Amount"] = thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType]['price'];;

                thisChangeSpecialEquipmentInput.NotifyNewSpecialEquipmentSelection(insurance, isDelete);
                //thisChangeSpecialEquipmentInput.updateAddingServicesToBookingJsObj();

                $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances["MyHobbies"].chk).attr('checked', 'checked');

                $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContract + '"][data-identity="' + passengerNumber + '"]').addClass("is active");
                $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').addClass("disableButton");
                $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"] span').html(thisChangeSpecialEquipmentInput.ContractInsurance);
                $('#' + thisChangeSpecialEquipmentInput.labelButtonSubmit + ' .bt_link').html(thisChangeSpecialEquipmentInput.labelButtonSubmitTextIn);
            }

            return false;
        }
        thisChangeSpecialEquipmentInput.ButtonCancel = function (e) {
            var passengerNumber = $(e.currentTarget).data("identity");
            var ssr = $(e.currentTarget).data("insurance");
            var insuranceType = $(e.currentTarget).data("insurancetype");

            var isDelete = false;
            var insurance = new Object();

            insurance["Code"] = ssr;
            insurance["Pax"] = passengerNumber;


            delete thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber];
            isDelete = true;

            thisChangeSpecialEquipmentInput.NotifyNewSpecialEquipmentSelection(insurance, isDelete);
            //thisChangeSpecialEquipmentInput.updateAddingServicesToBookingJsObj();

            $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances["MyHobbies"].chk).removeAttr('checked');

            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContract + '"][data-identity="' + passengerNumber + '"]').removeClass("is active");
            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"]').removeClass("disableButton");
            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractButtonContract + '"][data-identity="' + passengerNumber + '"] span').html(thisChangeSpecialEquipmentInput.NotContractInsurance);
            if ($("#" + thisChangeSpecialEquipmentInput.labelspecialequipmentNotPayed)[0].childNodes.length <= 0)
                $('#' + thisChangeSpecialEquipmentInput.labelButtonSubmit + ' .bt_link').html(thisChangeSpecialEquipmentInput.labelButtonSubmitTextOut);

            return false;
        }
        //add seguro
        thisChangeSpecialEquipmentInput.insuranceClicked = function (passengerNumber, insuranceType) {
            var isDelete = false;
            var insurance = new Object();

            insurance["Code"] = $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType].chk).val();
            insurance["Pax"] = passengerNumber;

            if ($('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType].chk).attr('checked')) {
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber] = [];
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['insuranceType'] = insuranceType;
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['price'] = thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType]['price'];
                thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber]['name'] = thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType]['name'];

                insurance["Amount"] = thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances[insuranceType]['price'];;
            }
            else {
                delete thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber];
                isDelete = true;
            }

            thisChangeSpecialEquipmentInput.NotifyNewSpecialEquipmentSelection(insurance, isDelete);
            //thisChangeSpecialEquipmentInput.updateAddingServicesToBookingJsObj();
        }

        thisChangeSpecialEquipmentInput.specialEquipmentComboChanged = function (passengerNumber) {
            var SSRselected = $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].specialequipment.select).val();
            var SSRselectedType = '';
            if (SSRselected == '') {
                $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].specialequipment.price).html('');
                if (thisChangeSpecialEquipmentInput.selectedSpecialEquipment[passengerNumber] != undefined) {
                    delete thisChangeSpecialEquipmentInput.selectedSpecialEquipment[passengerNumber];
                }
            }
            else {
                SSRselectedType = thisChangeSpecialEquipmentInput.availableSpecialEquipment[SSRselected]["equipmentType"];
                $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].specialequipment.price).html(
                    SKYSALES.Util.convertToLocaleCurrency(thisChangeSpecialEquipmentInput.availableSpecialEquipment[SSRselected].amount)
                );
                thisChangeSpecialEquipmentInput.selectedSpecialEquipment[passengerNumber] = SSRselected;
            }
            thisChangeSpecialEquipmentInput.showHideInsurances(passengerNumber, SSRselectedType);

            var SpecialEquipment = new Object();
            SpecialEquipment["Code"] = SSRselected == '' ? "SPEQ" : SSRselected;
            SpecialEquipment["Pax"] = passengerNumber;
            if (SSRselected != "")
                SpecialEquipment["Amount"] = thisChangeSpecialEquipmentInput.availableSpecialEquipment[SSRselected].amount;

            thisChangeSpecialEquipmentInput.NotifyNewSpecialEquipmentSelection(SpecialEquipment, SSRselected == '');
            //thisChangeSpecialEquipmentInput.updateAddingServicesToBookingJsObj();

            var nameInsurance = $.trim($("option:selected", $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].specialequipment.select)).text().split("(")[0]);
            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContract + 'Insurance"][data-identity="' + passengerNumber + '"] .block--passenger__num').html("(1 " + nameInsurance + ")");

            if ($("#" + thisChangeSpecialEquipmentInput.labelspecialequipmentNotPayed)[0].childNodes.length <= 0) {
                $('#' + thisChangeSpecialEquipmentInput.labelButtonSubmit + ' .bt_link').html(thisChangeSpecialEquipmentInput.labelButtonSubmitTextOut);
            } else {
                $('#' + thisChangeSpecialEquipmentInput.labelButtonSubmit + ' .bt_link').html(thisChangeSpecialEquipmentInput.labelButtonSubmitTextIn);
            }

            if (
                $("#" + thisChangeSpecialEquipmentInput.labelspecialequipmentNotPayed)[0].childNodes.length <= 0
                && ($("#" + thisChangeSpecialEquipmentInput.labelspecialequipmentPayed).length <= 0
                || $("#" + thisChangeSpecialEquipmentInput.labelspecialequipmentPayed)[0].childNodes.length <= 0)
                ) {
                if (!$('[data-object="' + thisChangeSpecialEquipmentInput.labelContentInsurances + '"]').hasClass("hidden"))
                    $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentInsurances + '"]').addClass("hidden");
            } else {
                $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentInsurances + '"]').removeClass("hidden");
            }


        }

        thisChangeSpecialEquipmentInput.showHideInsurances = function (passengerNumber, SSRselectedType) {
            var type = "";
            if (SSRselectedType == '') {
                $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances["MyHobbies"].chk).removeAttr('checked');
                delete thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber];
            }
            else {
                $('#' + thisChangeSpecialEquipmentInput.passengers[passengerNumber].insurances["MyHobbies"].chk).removeAttr('checked');
                delete thisChangeSpecialEquipmentInput.selectedInsurances['passenger' + passengerNumber];
                type = "MyHobbies";
            }
            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractInsurance + '"][data-identity="' + passengerNumber + '"]').hide();
            $('[data-object="' + thisChangeSpecialEquipmentInput.labelContentContractInsurance + '"][data-identity="' + passengerNumber + '"][data-insurancetype="' + type + '"]').show();
        }

        return thisChangeSpecialEquipmentInput;
    };

    /*
    Name:
    Class SpecialEquipmentInsurances
    Param:
    None
    Return:
    An instance of SpecialEquipmentInsurances
    Functionality:
    Notes:
    Class Hierarchy:
    SkySales -> SpecialEquipmentInsurances
    */
    VUELING.Class.SpecialEquipmentInsurances = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisSpecialEquipmentInsurances = SKYSALES.Util.extendObject(parent);

        thisSpecialEquipmentInsurances.specialEquipments = [];
        thisSpecialEquipmentInsurances.NullSSR = "";
        thisSpecialEquipmentInsurances.MyGolfSSR = "";
        thisSpecialEquipmentInsurances.MySkiSSR = "";

        thisSpecialEquipmentInsurances.SBSidebarName = "SBSidebar";
        thisSpecialEquipmentInsurances.SBSidebarObj = null;

        thisSpecialEquipmentInsurances.SSRInsuraceInputName = 'SSRInsuraceInput';
        thisSpecialEquipmentInsurances.SSRInsuraceInputObj = null;

        thisSpecialEquipmentInsurances.insurancesSelected = [];

        thisSpecialEquipmentInsurances.labelButtonContract = null;
        thisSpecialEquipmentInsurances.labelButtonCancel = null;
        thisSpecialEquipmentInsurances.specialEquipmentsInsert = [];
        thisSpecialEquipmentInsurances.labelButtonShowOn = null;
        thisSpecialEquipmentInsurances.labelButtonShowOff = null;
        thisSpecialEquipmentInsurances.labelButtonShowContent = null;
        thisSpecialEquipmentInsurances.labelCheckHidden = null;
        thisSpecialEquipmentInsurances.labelButtonShowContent = null;
        thisSpecialEquipmentInsurances.labelComboChange = null;
        thisSpecialEquipmentInsurances.labelComboClick = null;
        thisSpecialEquipmentInsurances.ContractInsurance = "";
        thisSpecialEquipmentInsurances.NotContractInsurance = "";
        thisSpecialEquipmentInsurances.InsuranceSelecteds = 0;
        thisSpecialEquipmentInsurances.Anadir = "";
        thisSpecialEquipmentInsurances.NotAnadir = "";
        thisSpecialEquipmentInsurances.labelbtnSpecialContract = "";
        thisSpecialEquipmentInsurances.labelbtnSpecialCancel = "";
        thisSpecialEquipmentInsurances.labelspecialcheck = "";
        thisSpecialEquipmentInsurances.labeldvSSRSpecialInfoAnulacionTotal = "";
        thisSpecialEquipmentInsurances.labelSpecialInsuranceContentHead = "";
        thisSpecialEquipmentInsurances.labelSpecialInsuranceContent = "";
        thisSpecialEquipmentInsurances.togglePetContentDivId = "";
        thisSpecialEquipmentInsurances.togglePetSeparatorId = "";
        thisSpecialEquipmentInsurances.paxCount = "";


        thisSpecialEquipmentInsurances.init = function (json) {
            this.getSBSidebarObject();
            this.setSettingsByObject(json);
            this.loadDisplay();
            this.addEvents();


            var showFlag = false;
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowContent + " .ssrQuantity select").each(function () {
                if ($(this).val() != 0)
                    showFlag = true;
            });
            if (showFlag)
                thisSpecialEquipmentInsurances.ButtonShowOnClick();
            else
                thisSpecialEquipmentInsurances.ButtonShowOffClick();
        };

        thisSpecialEquipmentInsurances.getSBSidebarObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisSpecialEquipmentInsurances.SBSidebarName.length) === thisSpecialEquipmentInsurances.SBSidebarName) {
                    thisSpecialEquipmentInsurances.SBSidebarObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisSpecialEquipmentInsurances.getSSRInsuraceInputObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisSpecialEquipmentInsurances.SSRInsuraceInputName.length) === thisSpecialEquipmentInsurances.SSRInsuraceInputName) {
                    thisSpecialEquipmentInsurances.SSRInsuraceInputObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisSpecialEquipmentInsurances.loadDisplay = function () {
            var specialEquip = null;
            for (var i = 0; i < thisSpecialEquipmentInsurances.specialEquipments.length; i++) {
                if (thisSpecialEquipmentInsurances.specialEquipments[i] != null) {
                    specialEquip = this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].id);
                    if (thisSpecialEquipmentInsurances.NullSSR != specialEquip.val()) {
                        thisSpecialEquipmentInsurances.specialEquipmentChanged(specialEquip);
                        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked(this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id));
                        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked(this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MySki"].id));
                        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked(this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyGolf"].id));
                    }
                }
            }
        };

        thisSpecialEquipmentInsurances.setSettingsByObject = function (json) {
            parent.setSettingsByObject.call(this, json);
        };

        thisSpecialEquipmentInsurances.addEvents = function () {
            $.each(thisSpecialEquipmentInsurances.specialEquipments, function () {
                thisSpecialEquipmentInsurances.getById(this.id).change(function (event) {
                    thisSpecialEquipmentInsurances.specialEquipmentChanged($(event.currentTarget));
                });

                if (this.insurances != null) {
                    $.each(this.insurances, function () {
                        thisSpecialEquipmentInsurances.getById(this.id).bind($.browser.msie && $.browser.version <= 8 ? 'propertychange' : 'change', function (event) {
                            thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked($(event.currentTarget));
                        });
                    });
                }
            });

            $('[data-object="' + thisSpecialEquipmentInsurances.labelButtonContract + '"]').click(thisSpecialEquipmentInsurances.ButtonContractClick);
            $('[data-object="' + thisSpecialEquipmentInsurances.labelButtonCancel + '"]').click(thisSpecialEquipmentInsurances.ButtonCancelClick);
            for (var s = 0; s < thisSpecialEquipmentInsurances.specialEquipments.length; s += 1)
                thisSpecialEquipmentInsurances.specialEquipmentsInsert.push(false);
            $('#' + thisSpecialEquipmentInsurances.labelButtonShowOn).click(thisSpecialEquipmentInsurances.ButtonShowOnClick);
            $('#' + thisSpecialEquipmentInsurances.labelButtonShowOff).click(thisSpecialEquipmentInsurances.ButtonShowOffClick);

            $(thisSpecialEquipmentInsurances.labelComboChange).change(thisSpecialEquipmentInsurances.ComboChange);
            $(thisSpecialEquipmentInsurances.labelComboChange).blur(thisSpecialEquipmentInsurances.ComboBlur);
            $(thisSpecialEquipmentInsurances.labelComboClick).click(thisSpecialEquipmentInsurances.ComboClick);
        };

        thisSpecialEquipmentInsurances.ButtonContractClick = function (e) {
            var controlChangedObjID = $(e.currentTarget).attr('id');
            for (var s = 0; s < thisSpecialEquipmentInsurances.specialEquipments.length; s += 1) {
                if (thisSpecialEquipmentInsurances.specialEquipments[s] != null) {
                    $.each(thisSpecialEquipmentInsurances.specialEquipments[s].insurances, function () {
                        if (this.id == controlChangedObjID) {
                            if (thisSpecialEquipmentInsurances.specialEquipmentsInsert[s] != true) {
                                thisSpecialEquipmentInsurances.specialEquipmentsInsert[s] = true;
                                var patternInsurance = this.id.split("passenger")[0];
                                thisSpecialEquipmentInsurances.InsuranceSelecteds++;
                                var numInsurances = thisSpecialEquipmentInsurances.InsuranceSelecteds;
                                var alias = "";
                                if (numInsurances == 1) {
                                    alias = this.name;
                                } else {
                                    alias = this.pluralName;
                                }
                                thisSpecialEquipmentInsurances.addSpecialEquipmentInsuranceToPriceDisplay(this.id, this.code, alias, this.price);
                            }
                        }
                    });
                }
            }
            var idPax = $(e.currentTarget).data("passanger");
            $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]').parent().parent().addClass("active");
            $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]').addClass("disableButton");
            $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]' + ' span').html(thisSpecialEquipmentInsurances.ContractInsurance);
            $('[data-object="' + thisSpecialEquipmentInsurances.labelspecialcheck + '"][data-passanger="' + idPax + '"]').removeAttr("checked");
            $('#' + controlChangedObjID + '[data-object="' + thisSpecialEquipmentInsurances.labelspecialcheck + '"][data-passanger="' + idPax + '"]').attr("checked", true);

            return false;
        };
        thisSpecialEquipmentInsurances.ButtonCancelClick = function (e) {
            var controlChangedObjID = $(e.currentTarget).attr('id');
            for (var s = 0; s < thisSpecialEquipmentInsurances.specialEquipments.length; s += 1) {
                if (thisSpecialEquipmentInsurances.specialEquipments[s] != null) {
                    $.each(thisSpecialEquipmentInsurances.specialEquipments[s].insurances, function () {
                        if (this.id == controlChangedObjID) {
                            thisSpecialEquipmentInsurances.specialEquipmentsInsert[s] = false;
                            var patternInsurance = this.id.split("passenger")[0];
                            thisSpecialEquipmentInsurances.InsuranceSelecteds--;
                            var numInsurances = thisSpecialEquipmentInsurances.InsuranceSelecteds;
                            var alias = "";
                            if (numInsurances == 1) {
                                alias = this.name;
                            } else {
                                alias = this.pluralName;
                            }
                            thisSpecialEquipmentInsurances.removeSpecialEquipmentInsuranceToPriceDisplay(this.id, alias);
                        }
                    });
                }
            }
            var idPax = $(e.currentTarget).data("passanger");
            $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]').parent().parent().removeClass("active");
            $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]').removeClass("disableButton");
            $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]' + ' span').html(thisSpecialEquipmentInsurances.NotContractInsurance);
            $('[data-object="' + thisSpecialEquipmentInsurances.labelspecialcheck + '"][data-passanger="' + idPax + '"]').removeAttr("checked");

            return false;
        };
        thisSpecialEquipmentInsurances.GetInsuranceActivatedCount = function () {
            var count = 0;
            for (var s = 0; s < thisSpecialEquipmentInsurances.specialEquipments.length; s += 1)
                if (thisSpecialEquipmentInsurances.specialEquipmentsInsert[s] == true)
                    count++;
            return count;
        };

        thisSpecialEquipmentInsurances.ButtonShowOnClick = function (e) {
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowContent).show();
            //$("#" + thisSpecialEquipmentInsurances.labelCheckHidden).attr('checked', false);
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowOn).parent().addClass("active");
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowOn).addClass("disableButton");
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowOn + " span").html(thisSpecialEquipmentInsurances.Anadir);

            thisSpecialEquipmentInsurances.getSSRInsuraceInputObject();
            if (thisSpecialEquipmentInsurances.SSRInsuraceInputObj && thisSpecialEquipmentInsurances.SSRInsuraceInputObj.IsSEAclicked) {
                $('[data-object="MessageAnulacionTotal"]').show();
            }

            if ($("#" + thisSpecialEquipmentInsurances.togglePetContentDivId).is(":visible")) {
                $("#" + thisSpecialEquipmentInsurances.togglePetSeparatorId).show();
            }
            $("#" + thisSpecialEquipmentInsurances.togglePetContentDivId).children().removeClass("marginTop20");


            return false;
        };
        thisSpecialEquipmentInsurances.ButtonShowOffClick = function (e) {
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowContent).hide();
            //$("#" + thisSpecialEquipmentInsurances.labelCheckHidden).attr('checked', true);
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowOn).parent().removeClass("active");
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowOn).removeClass("disableButton");
            $("#" + thisSpecialEquipmentInsurances.labelButtonShowOn + " span").html(thisSpecialEquipmentInsurances.NotAnadir);

            if ($("#" + thisSpecialEquipmentInsurances.togglePetSeparatorId).is(":visible")) {
                $("#" + thisSpecialEquipmentInsurances.togglePetSeparatorId).hide();
            }

            if(!$("#" + thisSpecialEquipmentInsurances.togglePetContentDivId).children().hasClass("marginTop20"))
                $("#" + thisSpecialEquipmentInsurances.togglePetContentDivId).children().addClass("marginTop20");

            for (var s = 0; s < parseInt(thisSpecialEquipmentInsurances.paxCount); s += 1) {
                if($('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + s + '"]').parent().parent().hasClass("active"))
                    $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialCancel + '"][data-passanger="' + s + '"]').trigger("click"); 
            }
          
            return false;
        };

        thisSpecialEquipmentInsurances.ComboChange = function (e) {
            $("#" + thisSpecialEquipmentInsurances.labelCheckHidden).attr('checked', false);
            if ($(e.currentTarget).val() == "NULL") {
                $(e.currentTarget).parent().parent().next().children("select").val("0");
            }
            else {
                $(e.currentTarget).parent().parent().next().children("select").val("1");
            }
        };
        thisSpecialEquipmentInsurances.ComboBlur = function (e) {
            if ($(e.currentTarget).val() == "NULL") {
                $(e.currentTarget).parent().parent().next().children("select").val("0");
            }
            else {
                $(e.currentTarget).parent().parent().next().children("select").val("1");
                $("#" + thisSpecialEquipmentInsurances.labelCheckHidden).attr('checked', false);
            }
        };
        thisSpecialEquipmentInsurances.ComboClick = function (e) {
            if (!$("#" + thisSpecialEquipmentInsurances.labelCheckHidden).is(":checked")) {
                $("#" + thisSpecialEquipmentInsurances.labelCheckHidden).attr('checked', true);
                if ($("#" + thisSpecialEquipmentInsurances.labelButtonShowContent).is(":visible")) {
                    $("#" + thisSpecialEquipmentInsurances.labelButtonShowContent).slideUp("fast");
                }
                $("#" + thisSpecialEquipmentInsurances.labelCheckHidden).removeClass("checked");
            }
            else {
                $("#" + thisSpecialEquipmentInsurances.labelCheckHidden).attr('checked', false);
                if ($("#" + thisSpecialEquipmentInsurances.labelButtonShowContent).is(":hidden")) {
                    $("#" + thisSpecialEquipmentInsurances.labelButtonShowContent).slideDown("fast");
                }
                $("#" + thisSpecialEquipmentInsurances.labelCheckHidden).addClass("checked");
            }
        };

        thisSpecialEquipmentInsurances.specialEquipmentChanged = function (controlChangedObj) {
            var controlChangedObjID = controlChangedObj.attr('id');
            var ssrSelected = controlChangedObj.val();
            thisSpecialEquipmentInsurances.getSSRInsuraceInputObject();
            if (ssrSelected == "NULL") {
                var idPax = $("#" + controlChangedObjID).data("passanger");
                $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialCancel + '"][data-passanger="' + idPax + '"]').attr("data-special", "");
                $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]').attr("data-special", "");
                $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialContract + '"][data-passanger="' + idPax + '"]').addClass("disableButton");
                $('#' + thisSpecialEquipmentInsurances.labeldvSSRSpecialInfoAnulacionTotal).hide();
            } else {
                var idPax = $("#" + controlChangedObjID).data("passanger");
                $('[data-object="' + thisSpecialEquipmentInsurances.labelbtnSpecialCancel + '"][data-passanger="' + idPax + '"]').trigger("click");
                if ($('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContentHead + '"]').is(":hidden"))
                    $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContentHead + '"]').show();


                if (thisSpecialEquipmentInsurances.SSRInsuraceInputObj && thisSpecialEquipmentInsurances.SSRInsuraceInputObj.IsSEAclicked) {
                    $('#' + thisSpecialEquipmentInsurances.labeldvSSRSpecialInfoAnulacionTotal).show();
                }

            }

            for (var i = 0; i < thisSpecialEquipmentInsurances.specialEquipments.length; i += 1) {
                if (thisSpecialEquipmentInsurances.specialEquipments[i].id == controlChangedObjID) {
                    if (ssrSelected == thisSpecialEquipmentInsurances.NullSSR) {
                        $('#' + thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id).removeAttr('checked');
                        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked(this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id));
                        var idPax = $("#" + controlChangedObjID).data("passanger");
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"]').hide();
                    }
                    else if (ssrSelected == thisSpecialEquipmentInsurances.MyGolfSSR) {
                        $('#' + thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id).removeAttr('checked');
                        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked(this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id));
                        var codeT = this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id).attr("value");
                        var idPax = $("#" + controlChangedObjID).data("passanger");
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"]').hide();
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"][data-special="' + codeT + '"]').show();
                        var nameInsurance = "1 " + $.trim($("option:selected", controlChangedObj)[0].label.split("(")[0]);
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"][data-special="' + codeT + '"] [data-object="insuranceSelected"]').html(nameInsurance);
                    }
                    else if (ssrSelected == thisSpecialEquipmentInsurances.MySkiSSR) {
                        $('#' + thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id).removeAttr('checked');
                        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked(this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id));
                        var codeT = this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id).attr("value");
                        var idPax = $("#" + controlChangedObjID).data("passanger");
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"]').hide();
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"][data-special="' + codeT + '"]').show();
                        var nameInsurance = "1 " + $.trim($("option:selected", controlChangedObj)[0].label.split("(")[0]);
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"][data-special="' + codeT + '"] [data-object="insuranceSelected"]').html(nameInsurance);
                    }
                    else {
                        var codeT = this.getById(thisSpecialEquipmentInsurances.specialEquipments[i].insurances["MyHobbies"].id).attr("value");
                        var idPax = $("#" + controlChangedObjID).data("passanger");
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"]').hide();
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"][data-special="' + codeT + '"]').show();
                        var nameInsurance = "1 " + $.trim($("option:selected", controlChangedObj)[0].label.split("(")[0]);
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"][data-passanger="' + idPax + '"][data-special="' + codeT + '"] [data-object="insuranceSelected"]').html(nameInsurance);
                    }
                    if ($('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContent + '"]:not(:hidden)').length <= 0)
                        $('[data-object="' + thisSpecialEquipmentInsurances.labelSpecialInsuranceContentHead + '"]').hide();

                    return;
                }
            }
        };

        thisSpecialEquipmentInsurances.specialEquipmentInsuranceClicked = function (controlChangedObj) {
            var controlChangedObjID = controlChangedObj.attr('id');

            for (var s = 0; s < thisSpecialEquipmentInsurances.specialEquipments.length; s += 1) {
                if (thisSpecialEquipmentInsurances.specialEquipments[s] != null) {
                    $.each(thisSpecialEquipmentInsurances.specialEquipments[s].insurances, function () {
                        if (this.id == controlChangedObjID) {
                            //var numInsurances = $('input[id*="MyDearThings"]:checked').size();
                            var patternInsurance = this.id.split("passenger")[0];
                            var idPax = this.id.split("passenger")[1];
                            var numInsurances = $('input[id*="' + patternInsurance + '"]:checked').size();
                            var alias = "";
                            if (numInsurances == 1) {
                                alias = this.name;
                            } else {
                                alias = this.pluralName;
                            }
                            if ($('#' + this.id).attr('checked'))
                                thisSpecialEquipmentInsurances.addSpecialEquipmentInsuranceToPriceDisplay(this.id, this.code, alias, this.price);
                            else
                                thisSpecialEquipmentInsurances.removeSpecialEquipmentInsuranceToPriceDisplay(this.id, alias);
                        }
                    });
                }
            }
        };

        thisSpecialEquipmentInsurances.addSpecialEquipmentInsuranceToPriceDisplay = function (id, code, name, price) {
            thisSpecialEquipmentInsurances.insurancesSelected[id] = [];
            thisSpecialEquipmentInsurances.insurancesSelected[id]["code"] = code;
            thisSpecialEquipmentInsurances.insurancesSelected[id]["name"] = name;
            thisSpecialEquipmentInsurances.insurancesSelected[id]["price"] = price;
            thisSpecialEquipmentInsurances.redisplayInsuranceToPriceDisplay(code, name);
        };

        thisSpecialEquipmentInsurances.removeSpecialEquipmentInsuranceToPriceDisplay = function (id, name) {
            if (thisSpecialEquipmentInsurances.insurancesSelected[id]) {
                var code = thisSpecialEquipmentInsurances.insurancesSelected[id]["code"];
                delete thisSpecialEquipmentInsurances.insurancesSelected[id];
                thisSpecialEquipmentInsurances.redisplayInsuranceToPriceDisplay(code, name);
            }
        };

        thisSpecialEquipmentInsurances.redisplayInsuranceToPriceDisplay = function (code, name) {
            var hasInsurances = false,
                popUpServiceAdded = null,
                selectedInsSpeq = [];

            for (var ins in thisSpecialEquipmentInsurances.insurancesSelected) {
                hasInsurances = true;

                if (selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code] == undefined) {
                    thisSpecialEquipmentInsurances.insurancesSelected[ins].name = name;
                    selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code] = [];
                    selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code]['num'] = 0;
                    selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code]['desc'] = thisSpecialEquipmentInsurances.insurancesSelected[ins].name;
                    selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code]['price'] = 0;

                    if (code == thisSpecialEquipmentInsurances.insurancesSelected[ins].code)
                        popUpServiceAdded = thisSpecialEquipmentInsurances.insurancesSelected[ins].name;
                }

                selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code]['num'] += 1;
                selectedInsSpeq[thisSpecialEquipmentInsurances.insurancesSelected[ins].code]['price'] += thisSpecialEquipmentInsurances.insurancesSelected[ins].price;
            }

            if (hasInsurances) {
                thisSpecialEquipmentInsurances.SBSidebarObj.setService('insurancesSpeqs', selectedInsSpeq, popUpServiceAdded);
                thisSpecialEquipmentInsurances.SBSidebarObj.displayServiceTooltip('insurancesSpeqs' + selectedInsSpeq, popUpServiceAdded);
            }
            else
                thisSpecialEquipmentInsurances.SBSidebarObj.removeService('insurancesSpeqs');
        };

        return thisSpecialEquipmentInsurances;
    };

    /*
    Name: 
    Class SSRInsuraceInput
    Param:
    None
    Return: 
    An instance of SSRInsuraceInput
    Functionality:
    This class represents SSRInsuraceInput
    Notes:
    This object is used during the personalization of a booking
    Class Hierarchy:
    SkySales -> SSRInsuraceInput
    */
    VUELING.Class.SSRInsuraceInput = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisSSRInsuraceInput = SKYSALES.Util.extendObject(parent);

        thisSSRInsuraceInput.noinsurance_div = "";
        thisSSRInsuraceInput.noinsurance_btn = "";
        thisSSRInsuraceInput.requiredFieldId = "";
        thisSSRInsuraceInput.insurances = [];
        thisSSRInsuraceInput.paxCount = 0;
        thisSSRInsuraceInput.paxSEMCount = 0;
        thisSSRInsuraceInput.insuranceAlias = "";
        thisSSRInsuraceInput.insuranceAliasPlural = "";
        thisSSRInsuraceInput.ContractInsurance = "Contractado";
        thisSSRInsuraceInput.NotContractInsurance = "Contratar seguro";
        thisSSRInsuraceInput.IsSEAclicked = false;
        thisSSRInsuraceInput.labelShopInsuranceOn = "";
        thisSSRInsuraceInput.labelShopInsuranceOff = "";
        thisSSRInsuraceInput.labelMessageAnulacionTotal = "";

        thisSSRInsuraceInput.SBSidebarName = "SBSidebar";
        thisSSRInsuraceInput.SBSidebarObj = null;

        thisSSRInsuraceInput.init = function (json) {
            this.setSettingsByObject(json);
            this.addEvents();
            this.getSBSidebarObject();
            this.loadPriceDisplay();
        };

        thisSSRInsuraceInput.getSBSidebarObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisSSRInsuraceInput.SBSidebarName.length) === thisSSRInsuraceInput.SBSidebarName) {
                    thisSSRInsuraceInput.SBSidebarObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisSSRInsuraceInput.loadPriceDisplay = function () {
            var selectedInsurance;
            for (var i = 0; i < thisSSRInsuraceInput.insurances.length; i++) {
                if (thisSSRInsuraceInput.insurances[i] != null) {
                    if (thisSSRInsuraceInput.insurances[i].selected == true) {
                        selectedInsurance = thisSSRInsuraceInput.insurances[i];
                    }
                }
            }
            if (selectedInsurance != null) {
                $('#' + selectedInsurance.btn).click();
            }
        };

        thisSSRInsuraceInput.addEvents = function () {
            parent.addEvents.call(this);
            $.each(thisSSRInsuraceInput.insurances, function () {
                $('#' + this.div).closest('.sectionPiece').click(function (divClicked) {
                    $.each(thisSSRInsuraceInput.insurances, function () {
                        $('#' + this.btn, divClicked.currentTarget).click();
                    });
                });


                $('#' + this.btn + '[data-object="' + thisSSRInsuraceInput.labelShopInsuranceOn + '"]').click(function (btn_clicked) {
                    var selectedInsuranceName = null;
                    var selectedInsurance = null;
                    var selectedInsuranceAlias = null;

                    $.each(thisSSRInsuraceInput.insurances, function () {
                        if (this.code != null) {
                            if ($(btn_clicked.currentTarget).attr('id') == this.btn) {
                                $('#' + this.div).addClass('active');
                                $('#' + this.div + ' [data-object="' + thisSSRInsuraceInput.labelShopInsuranceOn + '"]').addClass('disableButton');
                                $('#' + this.chk).attr('checked', 'checked');
                                $('#' + thisSSRInsuraceInput.requiredFieldId).val($('#' + this.chk).val());
                                $('.hiddenService').blur();
                                if (this.code != 'NOINSURANCE') {
                                    selectedInsuranceName = this.code;
                                    var alias = this.name;
                                    var finalPrice = this.price;
                                    selectedInsurance = [];
                                    selectedInsurance[this.code] = [];
                                    if (this.code == "SEA")
                                        selectedInsurance[this.code]['num'] = 1;
                                    else
                                        selectedInsurance[this.code]['num'] = thisSSRInsuraceInput.paxCount;
                                    selectedInsurance[this.code]['desc'] = alias;
                                    selectedInsurance[this.code]['price'] = finalPrice;

                                    if (this.code == "SEM") {
                                        selectedInsurance[this.code]['num'] = thisSSRInsuraceInput.paxSEMCount;
                                        selectedInsurance[this.code]['price'] = finalPrice * thisSSRInsuraceInput.paxSEMCount;
                                    }
                                    selectedInsuranceAlias = alias;
                                    this.selected = true;

                                    if (this.code == "SEA")
                                        thisSSRInsuraceInput.IsSEAclicked = true;
                                    $('#insure_SENO input')[0].checked = false;
                                    $('#insure_SENO_ToBottom a').removeClass("disableButton");
                                    if ($('#insure_SENO_ToBottom').hasClass("sectionPieceSelected"))
                                        $('#insure_SENO_ToBottom').removeClass("sectionPieceSelected");
                                }
                            }
                        }
                    });

                    if (thisSSRInsuraceInput.SBSidebarObj != null) {
                        if (selectedInsurance != null) {
                            thisSSRInsuraceInput.SBSidebarObj.setService('insurances' + selectedInsuranceName, selectedInsurance, selectedInsuranceAlias);
                            thisSSRInsuraceInput.SBSidebarObj.displayServiceTooltip('insurances' + selectedInsuranceName, selectedInsuranceAlias);
                        }
                        else
                            thisSSRInsuraceInput.SBSidebarObj.removeService('insurances');
                    }
                    $("span", btn_clicked.currentTarget).html(thisSSRInsuraceInput.ContractInsurance);

                    return false;
                });
                $('#' + this.btn + '[data-object="' + thisSSRInsuraceInput.labelShopInsuranceOff + '"]').bind('click', thisSSRInsuraceInput.ShopInsuranceOff);
            });
        };

        thisSSRInsuraceInput.ShopInsuranceOff = function (e) {
            var selectedInsuranceName = $(e.currentTarget).data("type");

            if (thisSSRInsuraceInput.SBSidebarObj != null)
                thisSSRInsuraceInput.SBSidebarObj.removeService('insurances' + selectedInsuranceName);

            $(e.currentTarget.parentNode).removeClass('active');
            $('[data-object="' + thisSSRInsuraceInput.labelShopInsuranceOn + '"]', e.currentTarget.parentNode).removeClass('disableButton');
            $('[data-object="' + thisSSRInsuraceInput.labelShopInsuranceOn + '"] span', e.currentTarget.parentNode).html(thisSSRInsuraceInput.NotContractInsurance);
            $('input', e.currentTarget.parentNode).removeAttr('checked');

            if (selectedInsuranceName == "SEA") {
                thisSSRInsuraceInput.IsSEAclicked = false;
                $('[data-object="' + thisSSRInsuraceInput.labelMessageAnulacionTotal + '"]').hide();
            }
            if ($('#insurance input[value="SEA"]:not(:checked),#insurance input[value="SEM"]:not(:checked)').length > 1)
                $('#' + thisSSRInsuraceInput.requiredFieldId).val("");

            return false;
        };

        thisSSRInsuraceInput.uncheckAllInsurances = function (e) {
            $("#insure_SENO").removeClass('active');
            $("#insure_SENO input[type='checkbox']").removeAttr('checked');
            thisSSRInsuraceInput.SBSidebarObj.removeService('insurances');
            $('#' + thisSSRInsuraceInput.requiredFieldId).val('');
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
        };

        thisSSRInsuraceInput.SelectNoInsure1 = function (e) {
            $('#insure_SEM.active [data-object="ShopInsuranceOff"], #insure_SEA.active [data-object="ShopInsuranceOff"]').trigger("click");
            $('#insure_SENO input')[0].checked = true;
            $("a", e.currentTarget).addClass("disableButton");
            if ($('#insurance').hasClass("styleBox_red")) {
                $('#insurance').removeClass("styleBox_red");
                $('#insuranceTab').find("p").removeClass("styleBox_red");
            }
            thisSSRInsuraceInput.uncheckAllInsurances(e);
            $('#' + thisSSRInsuraceInput.requiredFieldId).val("SENO");
            $('#CONTROLGROUPSERVICES_FeeInputTypeSSRInsuranceInput_NoInsurance')[0].checked = true;
            if (!$('#insure_SENO_ToBottom').hasClass("sectionPieceSelected"))
                $('#insure_SENO_ToBottom').addClass("sectionPieceSelected");
            if ($('#missedFlighInsurance').length > 0) {
                $("html, body").stop().animate({ scrollTop: $("#missedFlighInsurance").offset().top }, 1000);
            } else if ($('#pets').length > 0) {
                $("html, body").stop().animate({ scrollTop: $("#pets").offset().top }, 1000);
            } else if ($('#ssrs').length > 0) {
                $("html, body").stop().animate({ scrollTop: $("#ssrs").offset().top }, 1000);
            }
        };
        $("#insure_SENO_ToBottom").click(thisSSRInsuraceInput.SelectNoInsure1);

        return thisSSRInsuraceInput;
    };

    /*
    Name:
    Class BaggagesInsurances
    Param:
    None
    Return:
    An instance of BaggagesInsurances
    Functionality:
    Notes:
    Class Hierarchy:
    SkySales -> BaggagesInsurances
    */
    VUELING.Class.BaggagesInsurances = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisBaggagesInsurances = SKYSALES.Util.extendObject(parent);

        thisBaggagesInsurances.noBagsSSR = "";
        thisBaggagesInsurances.baggages = [];

        thisBaggagesInsurances.SBSidebarName = "SBSidebar";
        thisBaggagesInsurances.SBSidebarObj = null;
        thisBaggagesInsurances.SSRInsuraceInputName = 'SSRInsuraceInput';
        thisBaggagesInsurances.SSRInsuraceInputObj = null;
        thisBaggagesInsurances.insurancesSelected = [];
        thisBaggagesInsurances.maxKG = 23;
        thisBaggagesInsurances.baggagePrice = 26;

        thisBaggagesInsurances.labelButtonContract = null;
        thisBaggagesInsurances.labelButtonCancel = null;
        thisBaggagesInsurances.baggagesInsert = [];
        thisBaggagesInsurances.labelMaleta = null;
        thisBaggagesInsurances.labelMaletas = null;
        thisBaggagesInsurances.ContractInsurance = "";
        thisBaggagesInsurances.NotContractInsurance = "";

        thisBaggagesInsurances.init = function (json) {
            this.getSBSidebarObject();
            this.setSettingsByObject(json);
            this.loadDisplay();
            this.addEvents();
        };

        thisBaggagesInsurances.getSBSidebarObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisBaggagesInsurances.SBSidebarName.length) === thisBaggagesInsurances.SBSidebarName) {
                    thisBaggagesInsurances.SBSidebarObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisBaggagesInsurances.getSSRInsuraceInputObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisBaggagesInsurances.SSRInsuraceInputName.length) === thisBaggagesInsurances.SSRInsuraceInputName) {
                    thisBaggagesInsurances.SSRInsuraceInputObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisBaggagesInsurances.loadDisplay = function () {
            for (var i = 0; i < thisBaggagesInsurances.baggages.length; i++) {
                if (thisBaggagesInsurances.baggages[i] != null) {
                    if (thisBaggagesInsurances.noBagsSSR == this.getById(thisBaggagesInsurances.baggages[i].id).val()) {
                        $('#' + thisBaggagesInsurances.baggages[i].insurance.div).hide();
                        $('#' + thisBaggagesInsurances.baggages[i].insurance.id).removeAttr('checked');
                    }

                    thisBaggagesInsurances.baggageChanged(this.getById(thisBaggagesInsurances.baggages[i].id));
                }
            }
        };

        thisBaggagesInsurances.setSettingsByObject = function (json) {
            parent.setSettingsByObject.call(this, json);
        };

        thisBaggagesInsurances.addEvents = function () {
            $.each(thisBaggagesInsurances.baggages, function () {
                thisBaggagesInsurances.getById(this.id).change(function (event) {
                    thisBaggagesInsurances.baggageChanged($(event.currentTarget));
                });

                if (this.insurance != null) {
                    thisBaggagesInsurances.getById(this.insurance.id).bind($.browser.msie && $.browser.version <= 8 ? 'propertychange' : 'change', function (event) {
                        thisBaggagesInsurances.baggageInsuranceClicked($(event.currentTarget));
                    });
                }
            });

            $("[data-maleta]").click(thisBaggagesInsurances.IcoBaggageClick);
            $("[data-maleta]").hover(thisBaggagesInsurances.IcoBaggageHoverIn, thisBaggagesInsurances.IcoBaggageHoverOut);

            $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"]').click(thisBaggagesInsurances.ButtonContractClick);
            $('[data-object="' + thisBaggagesInsurances.labelButtonCancel + '"]').click(thisBaggagesInsurances.ButtonCancelClick);
            for (var s = 0; s < thisBaggagesInsurances.baggages.length; s += 1)
                thisBaggagesInsurances.baggagesInsert.push(false);
        };

        thisBaggagesInsurances.ButtonContractClick = function (e) {
            var controlChangedObjID = $(e.currentTarget).attr('id');
            var idPax = $(e.currentTarget).data('passanger');
            for (var s = 0; s < thisBaggagesInsurances.baggages.length; s += 1) {
                if (thisBaggagesInsurances.baggages[s] != null) {
                    if (thisBaggagesInsurances.baggages[s].insurance.id == controlChangedObjID) {
                        if (thisBaggagesInsurances.baggagesInsert[s] != true) {
                            thisBaggagesInsurances.baggagesInsert[s] = true;
                            var numInsurances = thisBaggagesInsurances.GetInsuranceActivatedCount();
                            var alias = "";
                            if (numInsurances == 1)
                                alias = thisBaggagesInsurances.baggages[s].insurance.name;
                            else
                                alias = thisBaggagesInsurances.baggages[s].insurance.pluralName;
                            thisBaggagesInsurances.addBaggageInsuranceToPriceDisplay(thisBaggagesInsurances.baggages[s].insurance.id, thisBaggagesInsurances.baggages[s].insurance.code, alias, thisBaggagesInsurances.baggages[s].insurance.price);

                            $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"][data-passanger="' + idPax + '"]').parent().parent().addClass("active");
                            $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"][data-passanger="' + idPax + '"]').addClass("disableButton");
                            $("span", $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"][data-passanger="' + idPax + '"]')).html(thisBaggagesInsurances.ContractInsurance);
                            $('[data-object="baggagecheck"][data-passanger="' + idPax + '"]').attr("checked", true);
                        }
                    }
                }
            }
            return false;
        };
        thisBaggagesInsurances.ButtonCancelClick = function (e) {
            var controlChangedObjID = $(e.currentTarget).attr('id');
            var idPax = $(e.currentTarget).data('passanger');
            for (var s = 0; s < thisBaggagesInsurances.baggages.length; s += 1) {
                if (thisBaggagesInsurances.baggages[s] != null) {
                    if (thisBaggagesInsurances.baggages[s].insurance.id == controlChangedObjID) {
                        if (thisBaggagesInsurances.baggagesInsert[s] == true) {
                            thisBaggagesInsurances.baggagesInsert[s] = false;
                            var numInsurances = thisBaggagesInsurances.GetInsuranceActivatedCount();
                            var alias = "";
                            if (numInsurances == 1)
                                alias = thisBaggagesInsurances.baggages[s].insurance.name;
                            else
                                alias = thisBaggagesInsurances.baggages[s].insurance.pluralName;
                            if (thisBaggagesInsurances.baggagesInsert[s] != true)
                                thisBaggagesInsurances.removeBaggageInsuranceToPriceDisplay(thisBaggagesInsurances.baggages[s].insurance.id);

                            $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"][data-passanger="' + idPax + '"]').parent().parent().removeClass("active");
                            $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"][data-passanger="' + idPax + '"]').removeClass("disableButton");
                            $("span", $('[data-object="' + thisBaggagesInsurances.labelButtonContract + '"][data-passanger="' + idPax + '"]')).html(thisBaggagesInsurances.NotContractInsurance);
                            $('[data-object="baggagecheck"][data-passanger="' + idPax + '"]').removeAttr("checked");
                        }
                    }
                }
            }
            return false;
        };
        thisBaggagesInsurances.GetInsuranceActivatedCount = function () {
            var count = 0;
            for (var s = 0; s < thisBaggagesInsurances.baggages.length; s += 1)
                if (thisBaggagesInsurances.baggagesInsert[s] == true)
                    count++;
            return count;
        };

        thisBaggagesInsurances.baggageChanged = function (controlChangedObj) {
            var controlChangedObjID = controlChangedObj.attr('id');
            var ssrSelected = controlChangedObj.val();
            thisBaggagesInsurances.getSSRInsuraceInputObject();
            if (ssrSelected == thisBaggagesInsurances.noBagsSSR) {
                $('#dvBaggageInfoAnulacionTotal').hide();
            } else {
                if (thisBaggagesInsurances.SSRInsuraceInputObj && thisBaggagesInsurances.SSRInsuraceInputObj.IsSEAclicked) {
                    $('#dvBaggageInfoAnulacionTotal').show();
                }
            }

            for (var i = 0; i < thisBaggagesInsurances.baggages.length; i += 1) {
                if (thisBaggagesInsurances.baggages[i].id == controlChangedObjID) {
                    if (ssrSelected == thisBaggagesInsurances.noBagsSSR) {
                        $('#' + thisBaggagesInsurances.baggages[i].insurance.div).hide();
                        $('#' + thisBaggagesInsurances.baggages[i].insurance.id).removeAttr('checked');
                        thisBaggagesInsurances.baggageInsuranceClicked(this.getById(thisBaggagesInsurances.baggages[i].insurance.id));
                    }
                    else {
                        if ($('#' + thisBaggagesInsurances.baggages[i].insurance.div + ':visible').length == 0) {
                            $('#' + thisBaggagesInsurances.baggages[i].insurance.div).show();
                            thisBaggagesInsurances.baggageInsuranceClicked(this.getById(thisBaggagesInsurances.baggages[i].insurance.id));
                        }
                    }
                    //return;
                }
            }

            var valueBaggages = thisBaggagesInsurances.noBagsSSR.replace("0", "");
            var obj = controlChangedObj.parent().find("[data-maletapax]");
            var baggagePos = parseInt(ssrSelected.replace(valueBaggages, "")) - 1;
            var paxid = parseInt(obj.data("maletapax"));
            var objectKG = $(obj).find("[data-totalkg]");

            thisBaggagesInsurances.BaggageChanges(baggagePos, paxid, objectKG);

        };

        thisBaggagesInsurances.baggageInsuranceClicked = function (controlChangedObj) {
            var controlChangedObjID = controlChangedObj.attr('id');
            for (var s = 0; s < thisBaggagesInsurances.baggages.length; s += 1) {
                if (this.baggages[s] != null) {
                    if (this.baggages[s].insurance.id == controlChangedObjID) {
                        var numInsurances = $('input[id*="MyDearThings"]:checked').size();
                        var alias = "";
                        if (numInsurances == 1) {
                            alias = this.baggages[s].insurance.name;
                        } else {
                            alias = this.baggages[s].insurance.pluralName;
                        }
                        if ($('#' + this.baggages[s].insurance.id).attr('checked')) {
                            thisBaggagesInsurances.addBaggageInsuranceToPriceDisplay(this.baggages[s].insurance.id, this.baggages[s].insurance.code, alias, this.baggages[s].insurance.price);
                        } else
                            thisBaggagesInsurances.removeBaggageInsuranceToPriceDisplay(this.baggages[s].insurance.id);
                    }
                }
            }
        };

        thisBaggagesInsurances.addBaggageInsuranceToPriceDisplay = function (id, code, name, price) {
            thisBaggagesInsurances.insurancesSelected[id] = [];
            thisBaggagesInsurances.insurancesSelected[id]["code"] = code;
            thisBaggagesInsurances.insurancesSelected[id]["name"] = name;
            thisBaggagesInsurances.insurancesSelected[id]["price"] = price;
            thisBaggagesInsurances.redisplayInsuranceToPriceDisplay(code);
        };

        thisBaggagesInsurances.removeBaggageInsuranceToPriceDisplay = function (id) {
            if (thisBaggagesInsurances.insurancesSelected[id]) {
                var code = thisBaggagesInsurances.insurancesSelected[id]["code"];
                delete thisBaggagesInsurances.insurancesSelected[id];
                thisBaggagesInsurances.redisplayInsuranceToPriceDisplay(code);
            }
        };

        thisBaggagesInsurances.redisplayInsuranceToPriceDisplay = function (code) {
            var quantity = 0,
                amount = 0,
                name = '';

            for (var ins in thisBaggagesInsurances.insurancesSelected) {
                if (thisBaggagesInsurances.insurancesSelected[ins].code == code) {
                    quantity += 1;
                    amount += thisBaggagesInsurances.insurancesSelected[ins].price;
                    name = thisBaggagesInsurances.insurancesSelected[ins].name;
                }
            }

            if (amount > 0) {
                var selectedInsBags = [];
                selectedInsBags['insurancesBags'] = [];
                selectedInsBags['insurancesBags']['num'] = quantity
                selectedInsBags['insurancesBags']['desc'] = name;
                selectedInsBags['insurancesBags']['price'] = amount;
                thisBaggagesInsurances.SBSidebarObj.setService('insurancesBags', selectedInsBags, name);
                thisBaggagesInsurances.SBSidebarObj.displayServiceTooltip('insurancesBags' + selectedInsBags, name);
            }
            else
                thisBaggagesInsurances.SBSidebarObj.removeService('insurancesBags');

        };

        thisBaggagesInsurances.IcoBaggageClick = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            var valueBaggages = thisBaggagesInsurances.noBagsSSR.replace("0", "");
            var obj = $(e.currentTarget);
            var baggagePos = parseInt(obj.data("maleta"));
            var paxid = $(obj).parent("[data-MaletaPax]").data("maletapax");

            thisBaggagesInsurances.getById(thisBaggagesInsurances.baggages[paxid].id).val(valueBaggages + (baggagePos + 1));
            thisBaggagesInsurances.getById(thisBaggagesInsurances.baggages[paxid].id).change();

            var maximum = null;

            $("[data-maletapax]").each(function () {
                var value = parseFloat($(this).data('maletapax'));
                maximum = (value > maximum) ? value : maximum;
            });

            if (paxid == maximum)
                thisBaggagesInsurances.scrollDownToNextArea("insuranceTab");

        };

        thisBaggagesInsurances.BaggageChanges = function (baggagePos, paxid, objectKG) {
            //ico
            var obj = $("[data-maletapax=" + paxid + "]");
            $("[data-maleta]", obj).removeClass("active");
            for (var i = 0; i < baggagePos + 1; i++)
                $("[data-maleta=" + i + "]", obj).addClass("active");

            //KG
            objectKG.html(thisBaggagesInsurances.maxKG * (baggagePos + 1));

            if ((baggagePos + 1) > 0) $('[data-object="BagsPax"][ref="' + paxid + '"]').show();
            else $('[data-object="BagsPax"][ref="' + paxid + '"]').hide();
            if (baggagePos + 1 != 1)
                $('[data-object="BagsPax"][ref="' + paxid + '"] [data-object="BagsPaxNumber"]').html(thisBaggagesInsurances.labelMaletas.replace("{0}", (baggagePos + 1)));
            else
                $('[data-object="BagsPax"][ref="' + paxid + '"] [data-object="BagsPaxNumber"]').html(thisBaggagesInsurances.labelMaleta.replace("{0}", (baggagePos + 1)));
        };

        thisBaggagesInsurances.scrollDownToNextArea = function (e) {
            setTimeout(function () { $('html, body').animate({ scrollTop: $('#' + e).offset().top }, 400); }, 100);
        };

        thisBaggagesInsurances.IcoBaggageHoverIn = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            var obj = $(e.currentTarget);
            var objParent = obj.parent("[data-maletapax]");
            var baggagePos = parseInt(obj.data("maleta"));

            $("[data-maleta]", objParent).removeClass("active");
            for (var i = 0; i < baggagePos + 1; i++)
                $("[data-maleta=" + i + "]", objParent).addClass("active");
        };
        thisBaggagesInsurances.IcoBaggageHoverOut = function (e) {
            if (e.preventDefault)
                e.preventDefault();
            else
                e.returnValue = false;
            var valueBaggages = thisBaggagesInsurances.noBagsSSR.replace("0", "");
            var obj = $(e.currentTarget).parent("[data-maletapax]");
            var paxid = parseInt(obj.data("maletapax"));
            var baggagePos = parseInt(thisBaggagesInsurances.getById(thisBaggagesInsurances.baggages[paxid].id).val().replace(valueBaggages, ""));

            $("[data-maleta]", obj).removeClass("active");
            for (var i = 0; i < baggagePos; i++)
                $("[data-maleta=" + i + "]", obj).addClass("active");
        };

        return thisBaggagesInsurances;
    };

    /*
    Name:
    Class MissedFlightInsuranceInput
    Param:
    None
    Return: 
    An instance of MissedFlightInsuranceInput
    Functionality:
    This class represents a MissedFlightInsuranceInput object in services page
    Notes:
    This object is used during the standard booking and change flow
    Class Hierarchy:
    SkySales -> VUELING -> MissedFlightInsuranceInput
    */
    VUELING.Class.MissedFlightInsuranceInput = function () {
        var parent = SKYSALES.Class.SkySales(),
        thisMissedFlightInsuranceInput = SKYSALES.Util.extendObject(parent);

        thisMissedFlightInsuranceInput.SBSidebarName = 'SBSidebar';
        thisMissedFlightInsuranceInput.SBSidebarObj = null;
        thisMissedFlightInsuranceInput.SSRInsuraceInputName = 'SSRInsuraceInput';
        thisMissedFlightInsuranceInput.SSRInsuraceInputObj = null;
        thisMissedFlightInsuranceInput.noneSelectedBtn = null;
        thisMissedFlightInsuranceInput.itemSelectedBtn = null;

        thisMissedFlightInsuranceInput.feesCount = 0;
        thisMissedFlightInsuranceInput.insurancePrice = '';
        thisMissedFlightInsuranceInput.insuranceName = '';
        thisMissedFlightInsuranceInput.checkboxIds = [];
        thisMissedFlightInsuranceInput.ContractInsurance = "Contratado";
        thisMissedFlightInsuranceInput.NotContractInsurance = "Contratar cobertura";

        thisMissedFlightInsuranceInput.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.getSBSidebarObject();
            this.addEvents();
        };

        thisMissedFlightInsuranceInput.setVars = function () {
            thisMissedFlightInsuranceInput.noneSelectedBtn = this.getById(this.noneSelectedBtn);
            thisMissedFlightInsuranceInput.itemSelectedBtn = this.getById(this.itemSelectedBtn);
            thisMissedFlightInsuranceInput.SBSidebarObj = this.getSBSidebarObject();
        };

        thisMissedFlightInsuranceInput.addEvents = function () {
            if (thisMissedFlightInsuranceInput.noneSelectedBtn.attr('id') != null) {
                thisMissedFlightInsuranceInput.noneSelectedBtn.click(this.noneSelectedHandler);
                thisMissedFlightInsuranceInput.itemSelectedBtn.click(this.itemSelectedHandler);
            }
        };

        thisMissedFlightInsuranceInput.getSBSidebarObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisMissedFlightInsuranceInput.SBSidebarName.length) === thisMissedFlightInsuranceInput.SBSidebarName) {
                    thisMissedFlightInsuranceInput.SBSidebarObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisMissedFlightInsuranceInput.getSSRInsuraceInputObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisMissedFlightInsuranceInput.SSRInsuraceInputName.length) === thisMissedFlightInsuranceInput.SSRInsuraceInputName) {
                    thisMissedFlightInsuranceInput.SSRInsuraceInputObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisMissedFlightInsuranceInput.noneSelectedHandler = function () {
            $(thisMissedFlightInsuranceInput.itemSelectedBtn).parent().removeClass("active");
            $(thisMissedFlightInsuranceInput.itemSelectedBtn).removeClass("disableButton");
            $("span", thisMissedFlightInsuranceInput.itemSelectedBtn).html(thisMissedFlightInsuranceInput.NotContractInsurance);

            for (var i = 0; i < thisMissedFlightInsuranceInput.checkboxIds.length; i++) {
                $("#" + thisMissedFlightInsuranceInput.checkboxIds[i]).attr('checked', false);
            }

            if (thisMissedFlightInsuranceInput.SBSidebarObj != null) {
                thisMissedFlightInsuranceInput.SBSidebarObj.removeService('insuranceMissedFlight');
            }
            return false;
        };

        thisMissedFlightInsuranceInput.itemSelectedHandler = function () {
            thisMissedFlightInsuranceInput.itemSelectedBtn.parent().addClass("active");
            thisMissedFlightInsuranceInput.itemSelectedBtn.addClass("disableButton");
            $("span", thisMissedFlightInsuranceInput.itemSelectedBtn).html(thisMissedFlightInsuranceInput.ContractInsurance);

            for (var i = 0; i < thisMissedFlightInsuranceInput.checkboxIds.length; i++) {
                $("#" + thisMissedFlightInsuranceInput.checkboxIds[i]).attr('checked', true);
            }

            if (thisMissedFlightInsuranceInput.SBSidebarObj != null) {

                var servicesList = [],
                    service = [];
                service['num'] = thisMissedFlightInsuranceInput.feesCount;
                service['desc'] = thisMissedFlightInsuranceInput.insuranceName;
                var pricePerPax = parseFloat(thisMissedFlightInsuranceInput.insurancePrice.replace(",", "."));
                service['price'] = pricePerPax * thisMissedFlightInsuranceInput.feesCount;

                servicesList[0] = service;

                thisMissedFlightInsuranceInput.SBSidebarObj.setService('insuranceMissedFlight', servicesList, thisMissedFlightInsuranceInput.insuranceName);

                thisMissedFlightInsuranceInput.getSSRInsuraceInputObject();

                if (thisMissedFlightInsuranceInput.SSRInsuraceInputObj && thisMissedFlightInsuranceInput.SSRInsuraceInputObj.IsSEAclicked) {
                    $('[data-object="MessageAnulacionTotal"]').show();
                }

            }
            return false;
        };

        return thisMissedFlightInsuranceInput;
    };


    /*
    Name:
    Class ShowEditForm
    Param:
    None
    Return:
    An instance of ShowEditForm
    Functionality:
    The ShowEditForm class is used to show and hide the form for edit data.
    Notes:
    You need a div with the data for show, and another div with the inputs for editing the data.
    When you click for Edit this class hide the div for show, and show the div for edit.
    Class Hierarchy:
    SkySales -> ShowEditForm
    */
    VUELING.Class.ShowEditForm = function () {
        var showEditForm = new SKYSALES.Class.SkySales(),
            thisShowEditForm = SKYSALES.Util.extendObject(showEditForm);

        thisShowEditForm.showElementId = '';
        thisShowEditForm.showElement = null;
        thisShowEditForm.editElementId = '';
        thisShowEditForm.editElement = null;
        thisShowEditForm.showLinkId = '';
        thisShowEditForm.showLink = null;
        thisShowEditForm.editLinkId = '';
        thisShowEditForm.editLink = null;

        thisShowEditForm.setVars = function () {
            showEditForm.setVars.call(this);
            thisShowEditForm.showElement = this.getById(this.showElementId);
            thisShowEditForm.editElement = this.getById(this.editElementId);
            thisShowEditForm.showLink = this.getById(this.showLinkId);
            thisShowEditForm.editLink = this.getById(this.editLinkId);
        };

        thisShowEditForm.init = function (paramObj) {
            this.setSettingsByObject(paramObj);
            this.setVars();
            this.addEvents();

            this.updateShow(); // Al cargar la página se muestra por defecto en modo de ver, no de editar
        };

        thisShowEditForm.updateShowHandler = function () {
            thisShowEditForm.updateShow();
        };

        thisShowEditForm.updateEditHandler = function () {
            thisShowEditForm.updateEdit();
        };

        thisShowEditForm.updateShow = function () {
            $('form').each(function () {
                this.reset();
            });
            this.showElement.show();
            this.editElement.hide();
            thisShowEditForm.editLink.show();
            return false;
        };

        thisShowEditForm.updateEdit = function () {
            this.showElement.hide();
            this.editElement.show();
            thisShowEditForm.editLink.hide();
            return false;
        };

        thisShowEditForm.addEvents = function () {
            showEditForm.addEvents.call(this);

            this.showLink.click(this.updateShowHandler);
            this.editLink.click(this.updateEditHandler);
        };

        return thisShowEditForm;
    };

    VUELING.Class.showHiddenFields = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisshowHiddenFields = SKYSALES.Util.extendObject(parent);

        thisshowHiddenFields.id = '';
        thisshowHiddenFields.numPax = '';
        thisshowHiddenFields.idDNI = '';

        thisshowHiddenFields.init = function (json) {
            this.setSettingsByObject(json);
            this.addEvents();
        };

        thisshowHiddenFields.addEvents = function () {
            $("#" + thisshowHiddenFields.id).click(function () {
                if ($(this).is(":checked")) {
                    $("#" + thisshowHiddenFields.idDNI).attr("disabled", "disabled");
                    SKYSALES.Util.removeAttribute($("#" + thisshowHiddenFields.idDNI), "required");
                    if ($("#" + thisshowHiddenFields.idDNI + '.validationError').length > 0)
                        SKYSALES.Util.validate(this);
                } else {
                    $("#" + thisshowHiddenFields.idDNI).removeAttr("disabled");
                    SKYSALES.Util.setAttribute($("#" + thisshowHiddenFields.idDNI), "required", "true");
                }
            });
        };
        return thisshowHiddenFields;
    };

    VUELING.Class.showAndValidateHiddenFields = function () {
        var parent = new SKYSALES.Class.SkySales(),
            showAndValidateHiddenFields = SKYSALES.Util.extendObject(parent);

        showAndValidateHiddenFields.id = '';
        showAndValidateHiddenFields.layerToShow = '';
        showAndValidateHiddenFields.thisLayerMakesThemHide = '';
        showAndValidateHiddenFields.starterElement = '';
        showAndValidateHiddenFields.newElementRequired = '';
        showAndValidateHiddenFields.newElementRequiredError = '';

        showAndValidateHiddenFields.init = function (json) {
            this.setSettingsByObject(json);
            this.addEvents();
        };

        showAndValidateHiddenFields.addEvents = function () {
            $("#" + showAndValidateHiddenFields.starterElement).click(function () {
                if ($(this).is(":checked")) {
                    $("#" + showAndValidateHiddenFields.layerToShow).show();
                    SKYSALES.Util.setAttribute($("#" + showAndValidateHiddenFields.newElementRequired), "required", "true");
                    SKYSALES.Util.setAttribute($("#" + showAndValidateHiddenFields.newElementRequired), "requirederror", showAndValidateHiddenFields.newElementRequiredError);
                    if ($("#" + showAndValidateHiddenFields.id + '.validationError').length > 0)
                        SKYSALES.Util.validate(this);
                }
            });
            $("#" + showAndValidateHiddenFields.thisLayerMakesThemHide).click(function () {
                if ($(this).is(":checked")) {
                    $("#" + showAndValidateHiddenFields.layerToShow).hide();
                    SKYSALES.Util.removeAttribute($("#" + showAndValidateHiddenFields.newElementRequired), "required");
                }
            });

        };
        return showAndValidateHiddenFields;
    };

    /*
    Name: 
    Class ToggleViewCustom
    Param:
    None
    Return: 
    An instance of ToggleViewCustom
    Functionality:
    The ToggleViewCustom class is used to show and hide dom elements.
    Notes:
    It is set up so that you can click different elements to show and hide the dom object.
    You can have a link that you click to show the element, and anothe that you click to hide it.
    showId is the id of the html element that you click to show the element
    hideId is the id of the html element that you click to hide the element
    elementId is the id of the element you are showing and hiding
    Class Hierarchy:
    SkySales -> ToggleViewCustom
    */
    VUELING.Class.ToggleViewCustom = function () {
        var toggleView = new SKYSALES.Class.SkySales(),
            thisToggleView = SKYSALES.Util.extendObject(toggleView);

        thisToggleView.showId = '';
        thisToggleView.hideId = '';
        thisToggleView.elementId = '';

        thisToggleView.show = null;
        thisToggleView.hide = null;
        thisToggleView.element = null;

        thisToggleView.setVars = function () {
            toggleView.setVars.call(this);
            thisToggleView.show = this.getById(this.showId);
            thisToggleView.hide = this.getById(this.hideId);
            thisToggleView.element = this.getById(this.elementId);
        };

        thisToggleView.init = function (paramObj) {
            this.setSettingsByObject(paramObj);
            this.setVars();
            this.addEvents();
        };

        thisToggleView.updateShowHandler = function () {
            thisToggleView.updateShow();
        };

        thisToggleView.updateHideHandler = function () {
            thisToggleView.updateHide();
        };

        thisToggleView.updateShow = function () {
            this.element.show();

            //    $(this.show).parent().removeClass('pulsado');
            //    $(this.show).parent().addClass('pulsado_hover');

            $(this.show).parent().addClass('hover');

            if ($(this.show).hasClass('last')) {
                $(this.show).removeClass('last');
            }
        };

        thisToggleView.updateHide = function () {
            this.element.hide();

            //    $(this.show).parent().removeClass('pulsado_hover');
            //    $(this.show).parent().addClass('pulsado');

            $(this.show).parent().removeClass('hover');

            if ($(this.show).parent().children('ul').find('.last')) {
                $(this.show).addClass('last');
            }
        };

        thisToggleView.updateToggleHandler = function () {
            thisToggleView.updateToggle();
        };

        thisToggleView.updateToggle = function () {
            if (this.element.is(':visible')) {
                this.updateHide();
            } else {
                this.updateShow();
            }
        };

        thisToggleView.addEvents = function () {
            toggleView.addEvents.call(this);

            if (this.showId === this.hideId) {
                this.show.click(this.updateToggleHandler);
            } else {
                this.show.click(this.updateShowHandler);
                this.hide.click(this.updateHideHandler);
            }
        };
        return thisToggleView;
    };

    /*
    Customized class to stylize the dropdowns for the date
    Class Hierarchy:
    SkySales -> SKYSALES.Class.DateInput -> VUELING.Class.CustomDateInput
    */
    VUELING.Class.CustomDateInput = function () {
        var parent = new SKYSALES.Class.DateInput(),
            thisCustomDateInput = SKYSALES.Util.extendObject(parent);

        thisCustomDateInput.init = function (json) {
            parent.init(json);

            VUELING.applyJqueryMenuSelectWithObject(this.dateMonth, 'selectMes');
            VUELING.applyJqueryMenuSelectWithObject(this.dateYear, 'selectAno');
        };
        return thisCustomDateInput;
    };

    /*
    Class Hierarchy:
    SkySales -> VUELING.Class.DisplayTextbox
    */
    VUELING.Class.DisplayTextbox = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisDisplayTextbox = SKYSALES.Util.extendObject(parent);

        thisDisplayTextbox.index = 0;
        thisDisplayTextbox.id = '';
        thisDisplayTextbox.displayTextbox = {};
        thisDisplayTextbox.paymentAccountNumber = {};

        thisDisplayTextbox.changeCCNumberFocus = function () {
            var displayTextbox = this.displayTextbox,
                count = displayTextbox.val().length,
                maxVal = parseInt(displayTextbox.attr("maxlength")),
                sig = '',
                ob = {},
                index = this.index,
                nextDisplayTextboxIndex = index + 1,
                nextDisplayTextbox = {},
                paymentAccountNumber = this.paymentAccountNumber,
                displayTextboxes = paymentAccountNumber.displayTextboxes,
                numberOfDisplayTextboxes = displayTextboxes.length,
                indexOfLastDisplayTextbox = numberOfDisplayTextboxes - 1,
                thisIsTheLastDisplayTextbox = (index === indexOfLastDisplayTextbox);

            if (!thisIsTheLastDisplayTextbox) {
                if (count === maxVal) {
                    nextDisplayTextbox = displayTextboxes[nextDisplayTextboxIndex];
                    nextDisplayTextbox.focus();
                }
            }
        };

        thisDisplayTextbox.onlyNumbers = function (evt) {
            //trukuxzo
            //get key event
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            //only numbers
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            else
                return true;
        };

        thisDisplayTextbox.validateCCNumberInputHandler = function (evt) {
            return thisDisplayTextbox.onlyNumbers(evt);
        };

        thisDisplayTextbox.changeCCNumberFocusHandler = function () {
            thisDisplayTextbox.changeCCNumberFocus();
        };

        thisDisplayTextbox.addEvents = function () {
            this.displayTextbox.keypress(thisDisplayTextbox.validateCCNumberInputHandler);
            this.displayTextbox.keyup(thisDisplayTextbox.changeCCNumberFocusHandler);
        };

        thisDisplayTextbox.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
        };

        return thisDisplayTextbox;
    };

    /*
    Customized class to create CustomPaymentFees instead of PaymentFees 
    Class Hierarchy:
    SkySales -> SKYSALES.Class.PaymentTypes -> VUELING.Class.CustomPaymentTypes
    */
    VUELING.Class.CustomPaymentTypes = function () {
        var parent = new SKYSALES.Class.PaymentTypes(),
            thisCustomPaymentTypes = SKYSALES.Util.extendObject(parent);

        thisCustomPaymentTypes.isInVlg = false;

        thisCustomPaymentTypes.initPaymentTypeArray = function () {
            var paymentTypeArray = this.paymentTypeArray || [],
                paymentType = null,
                i = 0,
                len = paymentTypeArray.length,
                hasDefault = false;


            if (this.isInVlg === false) {
                for (i = 0; i < len; i += 1) {
                    paymentType = new VUELING.Class.CustomPaymentType();
                    paymentType.paymentTypes = this;
                    paymentType.init(paymentTypeArray[i]);
                    paymentTypeArray[i] = paymentType;

                    if (paymentType.isDefault === true && hasDefault === false) {
                        paymentType.activate();
                        hasDefault = true;
                    }
                }
                if (!hasDefault) {
                    paymentType.init(paymentTypeArray[0]);
                    paymentTypeArray[0] = paymentType;
                    paymentType.activate();
                }
            }
            else {
                for (i = 0; i < len; i += 1) {
                    paymentType = new VUELING.Class.CustomPaymentType();
                    paymentType.paymentTypes = this;
                    paymentType.init(paymentTypeArray[i]);
                    paymentTypeArray[i] = paymentType;

                    if (paymentType.containerId === 'ExternalAccount_container') {
                        paymentType.activate();
                    }
                }
            }

            this.paymentTypeArray = paymentTypeArray;
        };

        thisCustomPaymentTypes.initPaymentFees = function () {
            var paymentFees = new VUELING.Class.CustomPaymentFees();
            paymentFees.init(this.paymentFees);
            this.paymentFees = paymentFees;
        };

        return thisCustomPaymentTypes;
    }

    /*
    Name: 
    Class CustomPaymentType
    Functionality:
    This class represents a Payment Type (Credit card, voucher, etc.)
    Notes:
    Class Hierarchy:
    SkySales  -> PaymentType -> CustomPaymentType
    */
    VUELING.Class.CustomPaymentType = function () {
        var parent = new SKYSALES.Class.PaymentType(),
            thisCustomPaymentType = SKYSALES.Util.extendObject(parent);

        thisCustomPaymentType.CustomPaymentTypesObj = null;

        // copied without changes from parent class
        thisCustomPaymentType.updatePaymentTypeHandler = function (e) {
            e.preventDefault();

            $(thisCustomPaymentType.paymentMethodRows).find("input:radio:checked").removeAttr("checked");
            $(thisCustomPaymentType.paymentMethodRows).removeClass("selected");
            $(thisCustomPaymentType.paymentMethodRowssto).removeClass("formRowHover-checked");
            if (this.nodeName == "FIELDSET") {
                $(".formRowHover-checked").removeClass("formRowHover-checked");
            }

            thisCustomPaymentType.updatePaymentType();

            $('#separatorCardTax').remove();
            $('#tableCardTax').remove();

            return false;
        };

        // customized to create CustomPaymentMethod objects instead of PaymentMethod objects.
        thisCustomPaymentType.initPaymentMethodArray = function () {
            var paymentMethodArray = this.paymentMethodArray || [],
                paymentMethod = null,
                i = 0,
                len = paymentMethodArray.length;

            for (i = 0; i < len; i += 1) {
                paymentMethod = new VUELING.Class.CustomPaymentMethod();
                paymentMethod.paymentType = this;
                paymentMethod.nameSpaceName = this.nameSpaceName;
                paymentMethod.init(paymentMethodArray[i]);
                paymentMethodArray[i] = paymentMethod;
            }
            this.paymentMethodArray = paymentMethodArray;
        };

        // copied without changes from parent class
        thisCustomPaymentType.updatePaymentMethodHandler = function () {
            var key = $(this).val();
            thisCustomPaymentType.updatePaymentMethod(key);
            var keyArr = key.split(":");
            $('input[id^="textBoxAccountNumber_' + keyArr[1] + '"]').first().focus();
            thisCustomPaymentType.addChargePaymentByCard();
        };

        // copied without changes from parent class
        thisCustomPaymentType.dropDownSelectorHandler = function () {
            var key = $(this).val();
            $("#" + thisCustomPaymentType.newPaymentMethodId).val(key);
            thisCustomPaymentType.updatePaymentMethod(key);
            var keyArr = key.split(":");
            $('input[id^="textBoxAccountNumber_' + keyArr[1] + '"]').first().focus();
            thisCustomPaymentType.addChargePaymentByCard();
        };

        thisCustomPaymentType.addChargePaymentByCard = function () {
            var paymentSidBarController = VUELING.Util.getObjectInstance("C3PaymentSidBarController");
            if (paymentSidBarController) {
                paymentSidBarController.addChargePaymentByCard();
            }
        };

        thisCustomPaymentType.iDealBankSelectorHandler = function () {
            var key = $(this).val();
            $("[id*=" + thisCustomPaymentType.iDealBankValueId + "]'").val(key);
        };

        thisCustomPaymentType.sofortCountrySelectorHandler = function () {
            var key = $(this).val();
            $("[id*=" + thisCustomPaymentType.sofortCountryValueId + "]'").val(key);
        };

        return thisCustomPaymentType;
    };

    VUELING.Class.C3PaymentSidBarController = function () {
        var parent = new SKYSALES.Class.SkySales(),
           thisC3PaymentSidBarController = SKYSALES.Util.extendObject(parent);

        //#region Properties

        thisC3PaymentSidBarController.CustomPaymentTypesName = "paymentTypes";

        thisC3PaymentSidBarController.title = "";
        thisC3PaymentSidBarController.taxText = "";

        //#endregion Properties

        thisC3PaymentSidBarController.init = function (json) {
            thisC3PaymentSidBarController.setSettingsByObject(json);
            thisC3PaymentSidBarController.initObjects();
        };

        thisC3PaymentSidBarController.initObjects = function () {
        };

        thisC3PaymentSidBarController.addChargePaymentByCard = function () {
            try {
                var customPaymentTypesObj = VUELING.Util.getObjectInstance(thisC3PaymentSidBarController.CustomPaymentTypesName);
                if (customPaymentTypesObj) {
                    var paymentSlectorId = "CONTROLGROUPPAYMENTBOTTOM$ControlGroupPaymentInputViewPaymentView$DropDownListPaymentMethodCode";
                    var paymentCode = $('input:radio[name=' + paymentSlectorId + ']:checked').val();
                    if (paymentCode) {
                        paymentCode = paymentCode.replace('_', ':');
                        if (paymentCode.indexOf("-") != -1)
                            paymentCode = paymentCode.substr(0, paymentCode.indexOf(":") + 3);
                        var paymentCustomFee = customPaymentTypesObj.paymentFees.getPaymentFee(paymentCode);

                        $('#separatorCardTax').remove();
                        $('#tableCardTax').remove();

                        var titleLine = '';
                        if (thisC3PaymentSidBarController.title != '') {
                            titleLine = "<thead><tr><th colspan='3'><span>" + thisC3PaymentSidBarController.title + "</span></th></tr></thead>";
                        }

                        if (paymentCustomFee && paymentCustomFee.amount > 0) {

                            var html = "<div id='separatorCardTax' class='sepTotal sepTotalPrice'></div>" +
                                "<table id='tableCardTax' cellspacing='0' cellpadding='0' border='0' class='sideTable serviceInfo'>" +
                                titleLine +
                                "<tbody><tr><td colspan='2' class='col1'>" + thisC3PaymentSidBarController.taxText + "</td>" +
                                "<td id='creditCardTax' class='col3 price7'>" + paymentCustomFee.amountFormatted + "</td></tr></tbody>" +
                                "</table>";

                            $('#cardTaxContainer').html(html);
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }

        };

        return thisC3PaymentSidBarController;
    };

    /*
    Name: 
    Class CustomPaymentMethod
    Functionality:
    This class represents a Payment Method (Visa, Master Card, Discover, etc.)
    Notes:
    Class Hierarchy:
    SkySales -> PaymentMethod -> CustomPaymentMethod
    */
    VUELING.Class.CustomPaymentMethod = function () {
        var parent = new SKYSALES.Class.PaymentMethod(),
            thisCustomPaymentMethod = SKYSALES.Util.extendObject(parent);



        // customized to create CustomPaymentField objects instead of PaymentField objects.
        thisCustomPaymentMethod.initPaymentFieldArray = function () {
            var paymentFieldArray = this.paymentFieldArray || [],
                paymentField = null,
                i = 0,
                len = paymentFieldArray.length;

            for (i = 0; i < len; i += 1) {
                paymentField = new VUELING.Class.CustomPaymentField();
                paymentField.nameSpaceName = this.nameSpaceName;
                paymentField.init(paymentFieldArray[i]);
                paymentFieldArray[i] = paymentField;
            }
            this.paymentFieldArray = paymentFieldArray;
        };

        thisCustomPaymentMethod.activate = function () {
            var cardNumbers = $(".cardNumbers"),
                rowDiv = this.accountNumberText.parent();

            parent.activate.call(this);

            if (this.isStoredPayment) {
                cardNumbers.hide();
                rowDiv.addClass("noInput");
            }
            else {
                cardNumbers.show();
                rowDiv.removeClass("noInput");
            }

            if ($('a#Sofort_tab').hasClass('pulsado')) {
                var countryOptions = $('#Sofort_container input[type=radio]:checked');
                if (countryOptions.size() === 0) {
                    $('#Sofort_container input[type=radio]').first().attr("checked", "checked").change();
                }
            }
        };


        // copied without changes from parent class
        thisCustomPaymentMethod.updatePaymentAmountHandler = function () {
            thisCustomPaymentMethod.updatePaymentAmount();
        };

        // copied without changes from parent class
        thisCustomPaymentMethod.updatePaymentAccountNumberHandler = function () {
            thisCustomPaymentMethod.updatePaymentAccountNumber();
        };

        return thisCustomPaymentMethod;
    };

    /*
    Name: 
    Class CustomPaymentField    
    Functionality:
    This class represents a Payment Field (account number, expiration date, CVV, etc.)
    Notes:
    Class Hierarchy:
    SkySales  -> SKYSALES.Class.PaymentField -> VUELING.Class.CustomPaymentField
    */
    VUELING.Class.CustomPaymentField = function () {
        var parent = SKYSALES.Class.PaymentField(),
            thisCustomPaymentField = SKYSALES.Util.extendObject(parent);

        thisCustomPaymentField.validRanges = [];

        thisCustomPaymentField.removeAttributes = function () {
            var validRanges = this.validRanges,
                e = this.container;

            SKYSALES.Util.removeAttribute(e, 'valueinranges', validRanges);
            parent.removeAttributes.call(this);
        };

        thisCustomPaymentField.addAttributes = function (paymentMethod) {
            var validRanges = this.validRanges,
                e = this.container;

            SKYSALES.Util.setAttribute(e, 'valueinranges', validRanges);
            parent.addAttributes.call(this, paymentMethod);
        };

        return thisCustomPaymentField;
    };


    // modified to allow the total payment amount to be shown even when no payment method, or a payment method
    // without a fee is selected.
    VUELING.Class.CustomPaymentFees = function () {
        var parent = new SKYSALES.Class.PaymentFees(),
            thisCustomPaymentFees = SKYSALES.Util.extendObject(parent);

        thisCustomPaymentFees.quotedAmountFormatted = "";
        thisCustomPaymentFees.SBSidebarName = "SBSidebar";
        thisCustomPaymentFees.SBSidebarObj = null;

        thisCustomPaymentFees.init = function (json) {
            parent.init(json);
            this.getSBSidebarObject();
            if (json['quotedAmountFormatted'] !== undefined)
                this.quotedAmountFormatted = json['quotedAmountFormatted'];
        };

        thisCustomPaymentFees.getSBSidebarObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisCustomPaymentFees.SBSidebarName.length) === thisCustomPaymentFees.SBSidebarName) {
                    thisCustomPaymentFees.SBSidebarObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisCustomPaymentFees.updatePaymentAmountHandler = function () {
            thisCustomPaymentFees.updatePaymentAmount();
        };

        thisCustomPaymentFees.updatePaymentFeeArrayHandler = function (data) {
            thisCustomPaymentFees.updatePaymentFeeArray(data);
        };

        thisCustomPaymentFees.updatePaymentFeeHandler = function () {
            thisCustomPaymentFees.updatePaymentFee();
        };

        // modified to handle case when no payment fee is currently enabled
        thisCustomPaymentFees.updatePaymentFee = function (key, amount) {
            var paymentFee,
                quotedAmount = this.quotedAmount,
                paymentMethod = this.paymentMethod;

            if (key === "PayPal:PY") {
                key = "ExternalAccount:PY";
            }
            if (key === "PayPal:PP") {
                key = "PrePaid:PP";
            }
            if (key === "iDeal:ID") {
                key = "ExternalAccount:ID";
            }
            paymentFee = this.paymentFeeHash[key] || {};

            this.deactivatePaymentFees();

            amount = parseFloat(amount, 10);
            quotedAmount = parseFloat(quotedAmount, 10);

            if (quotedAmount === amount || isNaN(amount)) {
                this.activatePaymentFees(paymentFee);
                if (paymentMethod) {
                    paymentMethod.paymentType.paymentTypes.inlineDCC.getInlineDCC(paymentMethod);
                }
            } else {
                this.updatePaymentAmount(key, amount);
            }

        };

        thisCustomPaymentFees.getPaymentFee = function (key) {
            return this.paymentFeeHash[key];
        };

        // customized to show the total payment amount even when a payment type with a fee is not currently selected
        thisCustomPaymentFees.activatePaymentFees = function (paymentFee) {
            var html = '';

            if (!paymentFee.totalFormatted) {
                paymentFee.totalFormatted = this.quotedAmountFormatted;
            }

            if (thisCustomPaymentFees.SBSidebarObj != null) {
                var textCard = "";
                if (paymentFee.key != undefined) {
                    if (paymentFee.key == "ExternalAccount:PY" || paymentFee.key == "PrePaid:PP") {
                        textCard = "PayPal";
                    } else {
                        textCard = $("#ExternalAccount_container .paymentMethodRow.selected label").text();
                        textCard = textCard.split("(")[0];
                    }
                }
                thisCustomPaymentFees.SBSidebarObj.removeService('payment');
                if (paymentFee.amount) {
                    var selectedPayment = [];
                    selectedPayment['pay'] = [];
                    selectedPayment['pay']['num'] = 1;
                    selectedPayment['pay']['desc'] = this.priceDisplayText + textCard;
                    selectedPayment['pay']['price'] = paymentFee.amount;
                    if (paymentFee.amountBeforeDiscount) {
                        selectedPayment['pay']['amountBeforeDiscount'] = paymentFee.amountBeforeDiscount;
                    }
                    thisCustomPaymentFees.SBSidebarObj.setService('payment', selectedPayment);
                }
            }
            else {
                if (paymentFee.amount != undefined)
                    $('#selectAside .totalPrice strong').html(SKYSALES.Util.convertToLocaleCurrency(paymentFee.total));
                else
                    $('#selectAside .totalPrice strong').html(paymentFee.totalFormatted);
            }

            html = this.getHtml(paymentFee);
            this.container.html(html);
            this.container.show();
        };

        $("#totalRow").show();

        return thisCustomPaymentFees;
    };


    /*
    Class Hierarchy:
    SkySales -> VUELING.Class.PaymentAccountNumber
    */
    VUELING.Class.PaymentAccountNumber = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisPaymentAccountNumber = SKYSALES.Util.extendObject(parent);

        thisPaymentAccountNumber.accountNumberInputId = '';
        thisPaymentAccountNumber.accountNumberInput = null;
        thisPaymentAccountNumber.paymentMethodDropdownId = '';
        thisPaymentAccountNumber.paymentMethodDropdown = null;
        thisPaymentAccountNumber.displayTextboxes = [];
        thisPaymentAccountNumber.displayTextboxObjects = [];
        thisPaymentAccountNumber.textBoxAccountNumberIdBase = '';
        thisPaymentAccountNumber.numberOfDisplayTextboxes = 4;
        thisPaymentAccountNumber.maxLength = 0;

        thisPaymentAccountNumber.showDisplayTextboxes = function () {
            var numTextboxes = this.displayTextboxes.length,
                i = 0;

            //            VV : Visa Vueling             - 16 - 4/4/4/4
            //            VE : Visa Electron / Debito   - 16 - 4/4/4/4
            //            VI : Visa Credito             - 16 - 4/4/4/4
            //            MD : Mastercard Debito        - 16 - 4/4/4/4
            //            MC : Mastercard Credito       - 16 - 4/4/4/4
            //            DI : Dinners Club             - 14 - 4/6/4
            //            AX : American Express         - 15 - 4/6/5

            if (this.paymentMethodDropdown.val() === 'DI') {
                this.displayTextboxes[numTextboxes - 1].hide();
                this.displayTextboxes[1].attr('maxlength', '6');
                this.displayTextboxes[2].attr('maxlength', '4');
            } else if (this.paymentMethodDropdown.val() === 'AX') {
                this.displayTextboxes[numTextboxes - 1].hide();
                this.displayTextboxes[1].attr('maxlength', '6');
                this.displayTextboxes[2].attr('maxlength', '5');
            } else {
                for (i = 0; i < numTextboxes; i += 1) {
                    this.displayTextboxes[i].attr('maxlength', '4');
                    this.displayTextboxes[i].show();
                }
            }
            this.concatAccountNumber();
        };
        thisPaymentAccountNumber.concatAccountNumber = function () {
            var accountNumber = '',
                accountNumberParts = [],
                len = this.displayTextboxes.length,
                i = 0;
            for (i = 0; i < len; i += 1) {
                if (this.displayTextboxes[i].is(':visible')) {
                    accountNumberParts.push(this.displayTextboxes[i].val());
                }
            }
            accountNumber = accountNumberParts.join('');
            this.accountNumberInput.val(accountNumber);
            this.accountNumberInput.change();
        };
        thisPaymentAccountNumber.paymentMethodChangeHandler = function () {
            thisPaymentAccountNumber.showDisplayTextboxes();
        };
        thisPaymentAccountNumber.displayTextboxBlurHandler = function () {
            thisPaymentAccountNumber.concatAccountNumber();
        };
        thisPaymentAccountNumber.setVars = function () {
            var displayTextboxes = this.displayTextboxes,
                textBoxAccountNumberIdBase = this.textBoxAccountNumberIdBase,
                numberOfDisplayTextboxes = this.numberOfDisplayTextboxes,
                i = 0,
                textBoxAccountNumberId = '';

            if (numberOfDisplayTextboxes > 0 && textBoxAccountNumberIdBase.length > 0) {
                for (i = 0; i < numberOfDisplayTextboxes; i += 1) {
                    textBoxAccountNumberId = textBoxAccountNumberIdBase + i;
                    displayTextboxes.push(textBoxAccountNumberId);
                }
            }
            thisPaymentAccountNumber.accountNumberInput = this.getById(this.accountNumberInputId);
            thisPaymentAccountNumber.paymentMethodDropdown = this.getById(this.paymentMethodDropdownId);
        };
        thisPaymentAccountNumber.addEvents = function () {
            this.paymentMethodDropdown.change(this.paymentMethodChangeHandler);
        };
        thisPaymentAccountNumber.initDisplayTextboxes = function () {
            var len = this.displayTextboxes.length,
                i = 0,
                displayTextbox = null,
                id = '',
                displayTextboxObject = null,
                json = {};
            for (i = 0; i < len; i += 1) {
                id = this.displayTextboxes[i];
                displayTextbox = this.getById(id);
                if (displayTextbox) {
                    displayTextbox.blur(this.displayTextboxBlurHandler);
                    this.displayTextboxes[i] = displayTextbox;
                    json = {
                        "index": i,
                        "id": id,
                        "displayTextbox": displayTextbox,
                        "paymentAccountNumber": this
                    };
                    displayTextboxObject = new VUELING.Class.DisplayTextbox();
                    displayTextboxObject.init(json);
                    this.displayTextboxObjects[i] = displayTextboxObject;
                }
            }
        };
        thisPaymentAccountNumber.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.initDisplayTextboxes();
            this.addEvents();
            if (this.accountNumberInput.val() === '') {
                this.paymentMethodDropdown.change();
            }

            if (VUELING.Util.IsiPad())
                this.iPadStyle();
        };

        thisPaymentAccountNumber.iPadStyle = function () {
            this.accountNumberInput.attr('style', '');
            this.accountNumberInput.attr('class', 'typeText');
            $(this.displayTextboxes).each(function () {
                $(this).hide();
            });
            var currMaxLength = this.maxLength;
            if (currMaxLength == 0) {
                $(thisPaymentAccountNumber.displayTextboxes).each(function () {
                    currMaxLength += parseInt($(this).attr("maxLength"));
                });
            }

            this.accountNumberInput.attr('maxlength', currMaxLength);

            var displayTextboxObject = new VUELING.Class.DisplayTextbox();
            this.accountNumberInput.keypress(displayTextboxObject.validateCCNumberInputHandler);

            this.accountNumberInput.show();
        };

        return thisPaymentAccountNumber;
    };


    /*
    Class Hierarchy:
    SkySales -> SKYSALES.Class.StoredPayment -> VUELING.Class.CustomStoredPayment
    */
    VUELING.Class.CustomStoredPayment = function () {
        var parent = new SKYSALES.Class.StoredPayment(),
            thisCustomStoredPayment = SKYSALES.Util.extendObject(parent);
        thisCustomStoredPayment.confirmDeleteLinkId = '';
        thisCustomStoredPayment.confirmDeleteLink = null;
        thisCustomStoredPayment.modifyLinkId = '';
        thisCustomStoredPayment.modifyLink = null;
        thisCustomStoredPayment.cancelLinkId = '';
        thisCustomStoredPayment.cancelLink = null;
        thisCustomStoredPayment.toggleEditMode = '';
        thisCustomStoredPayment.sectionId = '';
        thisCustomStoredPayment.inputs = "input[type='text'],select";
        //        thisCustomStoredPayment.inputs = "input[type='text'],input[type='radio'],select";
        thisCustomStoredPayment.elements = null;
        thisCustomStoredPayment.buttonDivId = '';
        thisCustomStoredPayment.buttonDiv = null;
        thisCustomStoredPayment.deletePaymentPopup = null;
        thisCustomStoredPayment.deletePopupConfirmId = '';
        thisCustomStoredPayment.formDataDivId = '';
        thisCustomStoredPayment.accountNumberBackup = '';
        thisCustomStoredPayment.accountNumberIdForBackup = '';

        thisCustomStoredPayment.setVars = function () {
            parent.setVars.call(this);
            this.modifyLink = this.getById(this.modifyLinkId);
            this.elements = $('#' + this.sectionId).find(this.inputs);
            this.buttonDiv = this.getById(this.buttonDivId);
            this.cancelLink = this.getById(this.cancelLinkId);
            this.confirmDeleteLink = this.getById(this.confirmDeleteLinkId);


        };

        thisCustomStoredPayment.init = function (paramObj) {
            this.setSettingsByObject(paramObj);
            this.setVars();
            this.addEvents();
            this.stylizeSelectBoxes();
            this.initToggle();
            this.initPopUp();
        };

        thisCustomStoredPayment.addEvents = function () {
            parent.addEvents.call(this);
            this.modifyLink.click(this.toggleEditClickHandler);
            this.cancelLink.click(this.toggleEditClickHandler);
            this.confirmDeleteLink.click(this.confirmDeleteClickHandler);
        };

        thisCustomStoredPayment.stylizeSelectBoxes = function () {

        };
        thisCustomStoredPayment.initPopUp = function () {
            var json = {};
            this.deletePaymentPopup = new SKYSALES.Class.BlockedPopUp();
            json.closeElement = $("#" + this.deletePopupConfirmId + " .close");
            this.deletePaymentPopup.init(json);
        };
        thisCustomStoredPayment.unwrap = function (element) {
            element.each(function () {
                $(this).replaceWith(this.childNodes);
            });
        };
        thisCustomStoredPayment.initToggle = function () {

            var previewSpan = null,
            expirationMonthNode = null,
            toggleEditArgs = {
                eventsEnabled: false,
                copyCss: false,
                onpreview: function (e, ui) {

                    if (ui.element.attr('id').indexOf('expirationDateMonth') === -1 && ui.element.attr('id').indexOf('expirationDateYear') === -1 && ui.element.attr('id').indexOf('PayPalEmail') === -1) {
                        previewSpan = ui.preview.parent().find('span.unwrapText');
                        previewSpan.text(ui.preview.text());
                        thisCustomStoredPayment.unwrap(previewSpan);

                        $('span.icoCards').hide();
                    }
                    if (ui.element.attr('id').indexOf('AccountNumber') != -1) {
                        ui.element.siblings('input').hide();

                    };
                    if (ui.element.attr('id').indexOf('PayPalEmail') === -1) {

                        ui.preview.hide();
                    }
                    else { ui.preview.removeClass().addClass('txtEdit'); }


                    //concatenate the expiration date month and year

                    if (ui.element.attr('id').indexOf('expirationDateYear') != -1) {
                        expirationMonthNode = ui.element.parent().find('select[id*="expirationDateMonth"]');
                        ui.element.parent().append(expirationMonthNode.find(':selected').text() + "/" + ui.preview.text());

                    }





                    //hide the styled dropdowns as well as the real dropdown

                    if (ui.element[0].nodeName.toLowerCase() === 'select') {
                        ui.element.siblings('a').hide();
                    }

                },
                onedit: function (e, ui) {
                    //rewrap the preview value so we can manipulate 


                    if (ui.element.attr('id').indexOf('PaymentMethodCode') === -1) {
                        ui.element.parent().contents().filter(function () { return this.nodeType != 1; }).wrap("<span class='unwrapText'/>");

                        //different html for card type
                    } else {
                        ui.element.parent().children('span').contents().filter(function () { return this.nodeType != 1; }).wrap("<span class='unwrapText'/>");
                        ui.element.show();
                    }
                    ui.element.parent().find('span.unwrapText').hide();
                    ui.element.parent().find('span.icon').show();


                    //show display textboxes for account number
                    if (ui.element.attr('id').indexOf('AccountNumber') != -1) {
                        ui.element.hide();
                        //ui.element.val('');
                        ui.element.siblings('input').show();
                    }


                    //hide real dropdowns, show styled ones
                    if (ui.element[0].nodeName.toLowerCase() === 'select') {
                        if (ui.element.attr('id').indexOf('expirationDateMonth') != -1) {
                            ui.element.siblings('a[id*="expirationDateMonth"]').addClass('selectMes');
                        }
                        else if (ui.element.attr('id').indexOf('expirationDateYear') != -1) {
                            ui.element.siblings('a[id*="expirationDateYear"]').addClass('selectAno');
                        };
                        if (ui.element.siblings('a').length > 0) {
                            ui.element.siblings('a').show();
                            ui.element.hide();
                        }
                    }


                    if (ui.element.attr('id').indexOf('expirationDateYear') != -1) {
                        ui.element.parent().show();

                    }
                }
            };

            if (thisCustomStoredPayment.elements !== null) {
                $(thisCustomStoredPayment.elements)
                    .toggleEdit(toggleEditArgs)
                    .toggleEdit('preview');

                thisCustomStoredPayment.toggleEditMode = 'preview';
                thisCustomStoredPayment.buttonDiv.hide();
            }
        };
        thisCustomStoredPayment.confirmDeleteClickHandler = function () {
            thisCustomStoredPayment.deleteInput.val(thisCustomStoredPayment.key);
        }
        thisCustomStoredPayment.toggleEditClickHandler = function () {
            if (thisCustomStoredPayment.toggleEditMode == 'preview') {
                $('#' + thisCustomStoredPayment.formDataDivId).show();
                thisCustomStoredPayment.toggleEditMode = 'edit';
                $('#' + thisCustomStoredPayment.sectionId).find(".noInput").removeClass("noInput").addClass('toggleditPlaceHolder');
                thisCustomStoredPayment.buttonDiv.show();
                var keyArr = thisCustomStoredPayment.buttonDivId.split("_")[1];
                $('input[id^="TextBoxAccNoId1_' + keyArr + '"]').first().show(0, function () { this.focus(); });
            }
            else {
                $('#' + thisCustomStoredPayment.formDataDivId).hide();
                thisCustomStoredPayment.toggleEditMode = 'preview';
                $('#' + thisCustomStoredPayment.sectionId).find(".toggleditPlaceHolder").addClass("noInput");
                thisCustomStoredPayment.buttonDiv.hide();
                $('#' + thisCustomStoredPayment.accountNumberIdForBackup).val(thisCustomStoredPayment.accountNumberBackup);
            }
            $(thisCustomStoredPayment.elements).toggleEdit(thisCustomStoredPayment.toggleEditMode);
        };
        thisCustomStoredPayment.updateDeleteInputHandler = function (e) {
            thisCustomStoredPayment.updateDeleteInput();

        };
        thisCustomStoredPayment.updateDeleteInput = function () {
            var message = this.message;
            this.deletePaymentPopup.show(this.deletePopupConfirmId);

            //                this.deleteInput.val(this.key);

            //            return retVal;
        };

        thisCustomStoredPayment.updateDefaultInputHandler = function () {
            thisCustomStoredPayment.updateDefaultInput();
        };

        thisCustomStoredPayment.updateDefaultInput = function () {
            var submitName = this.submitName,
                defaultInput = this.defaultInput,
                defaultInputName = defaultInput.attr('name'),
                defaultInputValue = thisCustomStoredPayment.key,
                postHash = {},
                eventTargetName = '__EVENTTARGET';

            postHash[defaultInputName] = defaultInputValue;
            postHash[eventTargetName] = '';
            postHash[submitName] = "SetDefault";
            thisCustomStoredPayment.defaultInput.val(thisCustomStoredPayment.key);
            $.post(this.url, postHash, this.updatePrimaryHandler);
        };
        return thisCustomStoredPayment;
    };

    /*
    Name:
    Class SearchChange
    Param:
    None
    Return:
    An instance of SearchChange
    Functionality: This object helps with the displaying of SSRs in the "Tu plan de viaje" 
    Notes:
    Class Hierarchy:
    SkySales -> SearchChange
    */
    VUELING.Class.SearchChange = function () {
        var parent = new SKYSALES.Class.SkySales(),
        thisSearchChange = SKYSALES.Util.extendObject(parent);

        thisSearchChange.numberOfMarkets = 0;
        thisSearchChange.flightsToChangeId = '';
        thisSearchChange.onlyOutboundId = '';
        thisSearchChange.onlyInboundId = '';
        thisSearchChange.bothFlightsId = '';
        thisSearchChange.onlyOutbound = '';
        thisSearchChange.onlyInbound = '';
        thisSearchChange.bothFlights = '';
        thisSearchChange.outboundChangeCheckboxId = '';
        thisSearchChange.inboundChangeCheckboxId = '';
        thisSearchChange.commonOriginId = '';
        thisSearchChange.commonDestinationId = '';
        thisSearchChange.outboundOriginId = '';
        thisSearchChange.outboundDestinationId = '';
        thisSearchChange.inboundOriginId = '';
        thisSearchChange.inboundDestinationId = '';
        thisSearchChange.originMacId1 = 'originMac1';
        thisSearchChange.destinationMacId1 = 'destinationMac1';
        thisSearchChange.originMacId2 = 'originMac2';
        thisSearchChange.destinationMacId2 = 'destinationMac2';

        thisSearchChange.flightsToChange = {};
        thisSearchChange.commonOrigin = {};
        thisSearchChange.commonDestination = {};
        thisSearchChange.outboundOrigin = {};
        thisSearchChange.outboundDestination = {};
        thisSearchChange.inboundOrigin = {};
        thisSearchChange.inboundDestination = {};
        thisSearchChange.originalOutboundOrigin = '';
        thisSearchChange.originalOutboundDestination = '';
        thisSearchChange.originalInboundOrigin = '';
        thisSearchChange.originalInboundDestination = '';
        thisSearchChange.labelDatePickerDescription = '';

        thisSearchChange.DateOrigin = '';
        thisSearchChange.DateDestination = '';

        thisSearchChange.outboundFlawn = false;
        thisSearchChange.HybridFlight = false;

        thisSearchChange.hideMacCheckboxes = function (json) {
            this.originMac1.hide();
            this.destinationMac1.hide();
            this.originMac2.hide();
            this.destinationMac2.hide();
        };

        thisSearchChange.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.addEvents();
            this.commonOrigin.val(this.originalOutboundOrigin);
            this.commonDestination.val(this.originalOutboundDestination);

            if (this.outboundFlawn) {
                this.onlyOutbound.attr('disabled', true);
                this.bothFlights.attr('disabled', true);
                this.onlyInbound.click();
            } else if (this.inboundChangeCheckbox.prop("checked")) {
                if (this.outboundChangeCheckbox.prop("checked")) {
                    this.bothFlights.click();
                }
                else {
                    this.onlyInbound.click();
                    if (this.HybridFlight) {
                        this.bothFlights.attr('disabled', true);
                }
            }
            } else if (this.HybridFlight) {
                this.bothFlights.attr('disabled', true);
                this.onlyOutbound.click();
            } else {
                this.onlyOutbound.click();
            }

            // Force date controls to enable/disable as needed
            this.inboundChangeCheckbox.click().click();
            this.outboundChangeCheckbox.click().click();

            if (this.numberOfMarkets === 1) {
                this.flightsToChange.hide();
            }
            this.hideMacCheckboxes();

            this.LoadDatePickers();
        };
        thisSearchChange.setVars = function () {
            thisSearchChange.flightsToChange = this.getById(this.flightsToChangeId);
            thisSearchChange.onlyOutbound = this.getById(this.onlyOutboundId);
            thisSearchChange.onlyInbound = this.getById(this.onlyInboundId);
            thisSearchChange.bothFlights = this.getById(this.bothFlightsId);
            thisSearchChange.outboundChangeCheckbox = this.getById(this.outboundChangeCheckboxId);
            thisSearchChange.inboundChangeCheckbox = this.getById(this.inboundChangeCheckboxId);
            thisSearchChange.commonOrigin = this.getById(this.commonOriginId);
            thisSearchChange.commonDestination = this.getById(this.commonDestinationId);
            thisSearchChange.outboundOrigin = this.getById(this.outboundOriginId);
            thisSearchChange.outboundDestination = this.getById(this.outboundDestinationId);
            thisSearchChange.inboundOrigin = this.getById(this.inboundOriginId);
            thisSearchChange.inboundDestination = this.getById(this.inboundDestinationId);
            thisSearchChange.originalOutboundOrigin = this.outboundOrigin.val();
            thisSearchChange.originalOutboundDestination = this.outboundDestination.val();
            thisSearchChange.originalInboundOrigin = this.inboundOrigin.val();
            thisSearchChange.originalInboundDestination = this.inboundDestination.val();
            thisSearchChange.originMac1 = this.getById(this.originMacId1);
            thisSearchChange.destinationMac1 = this.getById(this.destinationMacId1);
            thisSearchChange.originMac2 = this.getById(this.originMacId2);
            thisSearchChange.destinationMac2 = this.getById(this.destinationMacId2);
        };
        thisSearchChange.onlyOutboundClick = function () {
            var outboundChangeCheckboxChecked = this.outboundChangeCheckbox.is(':checked'),
                inboundChangeCheckboxChecked = this.inboundChangeCheckbox.is(':checked'),
                origin = this.commonOrigin.val(),
                destination = this.commonDestination.val();
            if (!outboundChangeCheckboxChecked) {
                this.outboundChangeCheckbox.click();
            }
            if (inboundChangeCheckboxChecked) {
                this.inboundChangeCheckbox.click();
            }
            this.outboundOrigin.val(origin);
            this.outboundDestination.val(destination);
            this.inboundOrigin.val(this.originalInboundOrigin);
            this.inboundDestination.val(this.originalInboundDestination);
        };
        thisSearchChange.onlyOutboundClickHandler = function () {
            thisSearchChange.onlyOutboundClick();
        };
        thisSearchChange.onlyInboundClick = function () {
            var outboundChangeCheckboxChecked = this.outboundChangeCheckbox.is(':checked'),
                inboundChangeCheckboxChecked = this.inboundChangeCheckbox.is(':checked'),
                origin = this.commonOrigin.val(),
                destination = this.commonDestination.val();
            if (outboundChangeCheckboxChecked) {
                this.outboundChangeCheckbox.click();
            }
            if (!inboundChangeCheckboxChecked) {
                this.inboundChangeCheckbox.click();
            }
            this.outboundOrigin.val(this.originalOutboundOrigin);
            this.outboundDestination.val(this.originalOutboundDestination);
            this.inboundOrigin.val(destination);
            this.inboundDestination.val(origin);
        };
        thisSearchChange.onlyInboundClickHandler = function () {
            thisSearchChange.onlyInboundClick();
        };
        thisSearchChange.bothFlightsClick = function () {
            var outboundChangeCheckboxChecked = this.outboundChangeCheckbox.is(':checked'),
                inboundChangeCheckboxChecked = this.inboundChangeCheckbox.is(':checked'),
                origin = this.commonOrigin.val(),
                destination = this.commonDestination.val();
            if (!outboundChangeCheckboxChecked) {
                this.outboundChangeCheckbox.click();
            }
            if (!inboundChangeCheckboxChecked) {
                this.inboundChangeCheckbox.click();
            }
            this.outboundOrigin.val(origin);
            this.outboundDestination.val(destination);
            this.inboundOrigin.val(destination);
            this.inboundDestination.val(origin);
        };
        thisSearchChange.bothFlightsClickHandler = function () {
            thisSearchChange.bothFlightsClick();
        };
        thisSearchChange.commonChange = function () {
            var origin = this.commonOrigin.val(),
                destination = this.commonDestination.val();
            this.updateWhatsChecked();
            if (this.outboundChangeChecked) {
                this.outboundOrigin.val(origin);
                this.outboundDestination.val(destination);
                this.inboundOrigin.val(this.originalInboundOrigin);
                this.inboundDestination.val(this.originalInboundDestination);
            } else if (this.inboundChangeChecked) {
                this.outboundOrigin.val(this.originalOutboundOrigin);
                this.outboundDestination.val(this.originalOutboundDestination);
                this.inboundOrigin.val(destination);
                this.inboundDestination.val(origin);
            } else if (this.bothFlightsChecked) {
                this.outboundOrigin.val(origin);
                this.outboundDestination.val(destination);
                this.inboundOrigin.val(destination);
                this.inboundDestination.val(origin);
            }
        };
        thisSearchChange.commonChangeHandler = function () {
            thisSearchChange.commonChange();
        };
        thisSearchChange.updateWhatsChecked = function () {
            thisSearchChange.outboundChangeChecked = this.onlyOutbound.is(':checked');
            thisSearchChange.inboundChangeChecked = this.onlyInbound.is(':checked');
            thisSearchChange.bothFlightsChecked = this.bothFlights.is(':checked');
        };
        thisSearchChange.addEvents = function () {
            this.onlyOutbound.click(this.onlyOutboundClickHandler);
            this.onlyInbound.click(this.onlyInboundClickHandler);
            this.bothFlights.click(this.bothFlightsClickHandler);
            this.commonOrigin.change(this.commonChangeHandler);
            this.commonDestination.change(this.commonChangeHandler);
        };

        thisSearchChange.LoadDatePickers = function () {
            var markets = VUELING.Util.getObjectInstance('flightSearch');
            if (markets != undefined)
                for (var i = 0; i < markets.marketArray.length; i++)
                    for (var h = 0; h < markets.marketArray[i].marketDateArray.length ; h++) {
                        var departureDatepickerManager = markets.marketArray[i].marketDateArray[h].datePickerManager;
                        if (departureDatepickerManager != undefined) {
                            var departureDatepicker = departureDatepickerManager.linkedDate;
                            if (departureDatepicker != null) {
                                departureDatepicker.datepicker("option", {
                                    firstDay: 1,
                                    "showButtonPanel": true,
                                    "beforeShow": function (input, inst) { thisSearchChange.insertLegend(); },
                                    "beforeShowDay": function (date) {
                                        var day = date.getDate();
                                        var month = date.getMonth() + 1;
                                        var year = date.getFullYear();
                                        if (day <= 9) day = "0" + day;
                                        if (month <= 9) month = "0" + month;

                                        if (thisSearchChange.DateOrigin == year + "/" + month + "/" + day
                                            || thisSearchChange.DateDestination == year + "/" + month + "/" + day)
                                            return [true, "ui-state-current"]
                                        else
                                            return [true, ""]
                                    },
                                });
                            }
                        }
                    }
        };
        thisSearchChange.insertLegend = function () {
            clearTimeout(thisSearchChange.insertLegendTimeOut.timer);
            thisSearchChange.insertLegendTimeOut.timer = setTimeout(thisSearchChange.insertLegendTimeOut, 10);
        };
        thisSearchChange.insertLegendTimeOut = function () {
            var html = thisSearchChange.labelDatePickerDescription;
            var content = $("#ui-datepicker-div .ui-datepicker-buttonpane.ui-widget-content");
            if (content.length > 0) {
                var child;
                if (content.children().length == 1) {
                    child = content.children()[0];
                } else {
                    child = content.children()[1];
                }
                $(child).before(html);
            }

            $(".ui-datepicker").prepend('<div id="datepickerCloseId" class="ui-datepicker-closeButton"></div>');

            $("<a>", {
                href: "#",
                "class": "displayBlock",
                text: $(".ui-datepicker-close").text(),
                click: function (e) {
                    if (e != undefined)
                        e.preventDefault();
                    var markets = VUELING.Util.getObjectInstance('flightSearch');
                    if (markets != undefined) {
                        for (var i = 0; i < markets.marketArray.length; i++)
                            for (var h = 0; h < markets.marketArray[i].marketDateArray.length ; h++) {
                                var departureDatepickerManager = markets.marketArray[i].marketDateArray[h].datePickerManager;
                                if (departureDatepickerManager != undefined) {
                                    var departureDatepicker = departureDatepickerManager.linkedDate;
                                    if (departureDatepicker != null)
                                        departureDatepicker.datepicker("hide");
                                }
                            }
                    }
                }
            }).prependTo($(".ui-datepicker #datepickerCloseId"));
            $(".ui-datepicker-close").remove();
        };

        return thisSearchChange;
    };

    /*
    Name:
    Class FrequentFlyers
    Param:
    uiMap (Array) : an array of objects containing:
    firstName (String) : Id of DOM text entry element for first name
    lastName (String) : Id of DOM text entry element for last name
    type (String) : pax type of ADT, CHD or INF for UI group for passenger in position
    flyerSelect (String) : Id of select DOM element that list frequent flyers
    loyaltySection (Object) : holder for loyalty program UI map:
    isSelectedId (String) : Id of checkbox DOM element that indicates if customer programs are in effect
    programNumberId (String) : Id of text entry DOM element for customer program number
    programChooseName (String) : Name of checkbox DOM elements to indicate selected loyalty program
    personList (Array) : an array for frequent passenger data object:
    id (number) : frequent passenger identificator
    type (String) : pax type of ADT, CHD or INF
    firstName (String) : passenger first name
    lastName (String) : passenger last name
    defaultLoyaltyProgram (String): default loyalty program for the passenger (currently VYPNT and IBIBP only)
    loyaltyPrograms (Object): hash list of all pax customer programs with "loyalty id":"program number" structure
    firstOptionText (String): text to show in the first option for select of frequent flyers
    lastOptionText (String): text to show in the last option for select of frequent flyers
    None
    Return:
    An instance of FrequentFlyers
    Functionality:
    Handles the frequent flyer functionality for logged in user
    Class Hierarchy:
    SkySales -> VUELING -> FrequentFlyers
    */
    VUELING.Class.FrequentFlyers = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisFF = SKYSALES.Util.extendObject(parent);

        thisFF.uiMap = null;
        thisFF.personList = null;
        thisFF.loyaltyPrograms = null;
        thisFF.firstOptionText = "";
        thisFF.lastOptionText = "";
        thisFF.chkPassengerId = ""; 
        thisFF.tagRadioTitles = ""; 

        thisFF.init = function (json) {
            this.setSettingsByObject(json);
            this.addEvents();
            this.addEventsToPersonTypeRadios();
            this.setVars();
            this.setUi();
        };

        thisFF.setVars = function () {
            
            if (this.chkPassengerId != "") {
                this.chkPassenger = $('#' + this.chkPassengerId);
            } 
            if (this.tagRadioTitles != "") {
                this.tagRadioTitles = $(this.tagRadioTitles);
            }
        };
        
        thisFF.setUi = function () {
            // pre-populate dropdowns
            var postSetUp = function () { };
            for (var ui in this.uiMap) {
                if (!this.uiMap.hasOwnProperty(ui)) continue;
                ui = this.uiMap[ui];
                if (this.personList != null && this.personList.length > 0) {
                    var $select = $('#'.concat(ui.flyerSelect));
                    $select.append('<option value="">' + this.firstOptionText + '</option>');
                    for (var person in this.personList) {
                        var person = this.personList[person];
                        if (person.type === ui.type) {
                            var $option = $('<option></option>').val(person.id).text(person.firstName + ' ' + person.lastName);
                            if (person.id == ui.selectedPersonId) {
                                $option.attr('selected', true);
                                var originalPostCall = postSetUp;
                                var $localSelect = $select;
                                postSetUp = function () {
                                    $localSelect.trigger('change');
                                    originalPostCall();
                                };
                                //$('#'.concat(ui.firstName, ', #', ui.lastName)).attr('disabled', true);
                            }
                            $select.append($option);
                        }
                    }
                    $select.append('<option value="-1">' + this.lastOptionText + '</option>');
                }
            }
            postSetUp();
        };

        thisFF.addEvents = function () {
            if (this.personList != null && this.personList.length > 0) {
                for (var ui in this.uiMap) {
                    if (this.uiMap.hasOwnProperty(ui)) {
                        ui = this.uiMap[ui];
                        var $select = $('#'.concat(ui.flyerSelect));
                        var $programNumber = $('#'.concat(ui.loyaltySection.programNumberId));
                        $select.change(this.frequentFlyerSelectHandler);
                        $select.focus(this.frequentFlyerFocus);
                        var $loyaltySelection = $(':radio[name="'.concat(ui.loyaltySection.programChooseName).concat('"]'));
                        $loyaltySelection.click(this.loyaltySelectionHandler).data('sectionSelect', $select.attr('id')).data('sectionNumberEntry', $programNumber.attr('id'));
                        var $saveFrequentFlyer = $('#'.concat(ui.saveFrequentSection.saveFrequentFlyerId));
                        $saveFrequentFlyer.change(this.savefrequentFlyerSelectHandler);
                    }
                }
            }
        };

        thisFF.addEventsToPersonTypeRadios = function () {
            $('.personTypeId').change(function (e) {
                var item = $(e.currentTarget);
                var blockId = item.attr('datablock');
                var value = '';
                if (item.is(":checked")) {
                    value = item.val();
                }
                thisFF.RemoveChangeEvents();
                shouldUpdateRadioBlock(blockId, value);
                thisFF.addEventsToPersonTypeRadios();
            });
        };

        thisFF.RemoveChangeEvents = function (e) {
            $('.personTypeId').off("change");
        };

        function shouldUpdateRadioBlock(indexArrayChanged, radioSelectedValue) {
            var arrayOfCombos = $('.cmbCopy');
            
            if (arrayOfCombos.length == 1) {
                if (thisFF.chkPassenger != null) {
                    if (thisFF.chkPassenger.is(":checked")) {
                        updateRadios(radioSelectedValue, indexArrayChanged);
                    }
                }
            } else {
                for (var i = 0; i < arrayOfCombos.length; i++) {
                    if ($(arrayOfCombos[i]).val() == indexArrayChanged) {
                        var arrayToChangeIndex = i + 1;
                        updateRadios(radioSelectedValue, arrayToChangeIndex);
                        shouldUpdateRadioBlock(i + 2, radioSelectedValue);
                    }
                }
            }
        };

        function updateRadios(radioSelectedValue, blockOfRadiosToChange) {
            var tag = thisFF.tagRadioTitles.selector + blockOfRadiosToChange;
            var arrayFrom = $('[name="' + tag + '"]');
            arrayFrom.removeAttr('checked');
            arrayFrom.filter('[value=' + radioSelectedValue + ']').attr('checked', 'checked');
            arrayFrom.blur();

        }

        thisFF.frequentFlyerFocus = function() {
            this.selectedIndex = "";
        };

        thisFF.loyaltySelectionHandler = function () {
            var $this = $(this);
            var $select = $('#'.concat($this.data('sectionSelect')));
            if ($this.is(":checked") && !$select.attr('disabled')) {
                var person = thisFF.getPersonByValue($select.val());
                if (person != null) {
                    var $entry = $('#'.concat($this.data('sectionNumberEntry')));
                    $entry.val(person.loyaltyPrograms[$this.attr('value')] || "");
                }
            }
        }

        thisFF.getPersonByValue = function (value) {
            for (var person in thisFF.personList) { person = thisFF.personList[person]; if (person.id == value) return person; }
            return null;
        }

        thisFF.frequentFlyerSelectHandler = function () {
            if (thisFF.personList != null && thisFF.personList.length > 0) {
                var $this = $(this);
                var selectedValue = $this.val() || '';
                if (selectedValue < 0) selectedValue = '';
                var previousValue = $this.data('previous') || '';
                $this.data('previous', selectedValue);
                for (var ui in thisFF.uiMap) {
                    ui = thisFF.uiMap[ui];
                    var $select = $('#'.concat(ui.flyerSelect));
                    // hide/show (non IE) or disable/enable (IE and x-browsers) options
                    if ($select.attr('id') != $this.attr('id')) {
                        if (previousValue) {
                            $select.children("option[value='" + previousValue + "']:first").removeAttr('disabled').show();
                        }
                        if (selectedValue) {
                            $select.children("option[value='" + selectedValue + "']:first").attr('disabled', true).hide();
                        }
                    } else { // populate selected user fields
                        var firstName = '', lastName = '', firstLastName = '', secondLastName = '', loyaltyProgram = '', loyaltyProgramNumber = '', pTitle = '';
                        var famNumResiDni = '', resiMuniCode = '', resiDocAcre = '', famNumComAut = '', famNumCert = '';
                        var documentType = '', documentNumber = '', birthDay = '', email = '', phone = '', address = '', city = '', postCode = '', country = '';
                        var element;
                        if (selectedValue) {
                            var person = thisFF.getPersonByValue(selectedValue);
                            if (person != null) {
                                firstName = person.firstName;
                                lastName = person.lastName;

                                var lastNameArray = lastName.split(' ');
                                firstLastName = lastNameArray[0];
                                secondLastName = lastNameArray.length != 1 ? lastNameArray[lastNameArray.length - 1] : "";

                                pTitle = person.title;
                                loyaltyProgram = person.defaultLoyaltyProgram;
                                loyaltyProgramNumber = person.loyaltyPrograms[loyaltyProgram];

                                if (person.documentType != "TR" && person.documentType != "" && person.documentNumber) {
                                    if (person.documentType) documentType = person.documentType;
                                    if (person.documentNumber) documentNumber = person.documentNumber;
                                }

                                if (person.birthDay) birthDay = person.birthDay;
                                if (person.email) email = person.email;
                                if (person.phone) phone = person.phone;
                                if (person.address) address = person.address;
                                if (person.city) city = person.city;
                                if (person.postCode) postCode = person.postCode;
                                if (person.country) country = person.country;
                                if (person.famNumResiDni) famNumResiDni = person.famNumResiDni;
                                if (person.resiMuniCode) resiMuniCode = person.resiMuniCode;
                                if (person.resiDocAcre) resiDocAcre = person.resiDocAcre;
                                if (person.famNumComAut) famNumComAut = person.famNumComAut;
                                if (person.famNumCert) famNumCert = person.famNumCert;
                            }

                            if (ui.saveFrequentSection != undefined && ui.saveFrequentSection.saveFrequentFlyerLabel != undefined) {
                                $('#'.concat(ui.saveFrequentSection.saveFrequentFlyerLabel).concat(' span')).text(ui.saveFrequentSection.updateFrequentFlyerText);
                                var $saveFrequentFlyer = $('#'.concat(ui.saveFrequentSection.saveFrequentFlyerId));
                                $saveFrequentFlyer.prop('checked', true);
                            }

                        }
                        else {
                            if (ui.saveFrequentSection != undefined && ui.saveFrequentSection.saveFrequentFlyerLabel != undefined) {
                                $('#'.concat(ui.saveFrequentSection.saveFrequentFlyerLabel).concat(' span')).text(ui.saveFrequentSection.saveFrequentFlyerText);
                                var $saveFrequentFlyer = $('#'.concat(ui.saveFrequentSection.saveFrequentFlyerId));
                                $saveFrequentFlyer.prop('checked', false);
                            }
                        }

                        if (selectedValue == '') {
                            if ($('#'.concat(ui.firstName))) {
                                var elementname = $('#'.concat(ui.firstName));
                                elementname.val(firstName);
                                thisFF.updateClassValidation(elementname[0]);
                            }
                            if ($('#'.concat(ui.lastName))) {
                                var elementSurname = $('#'.concat(ui.lastName));
                                elementSurname.val(lastName);
                                thisFF.updateClassValidation(elementSurname[0]);
                            }
                            if ($('#'.concat(ui.firstLastName))) {
                                var elementFirstSurname = $('#'.concat(ui.firstLastName));
                                elementFirstSurname.val(firstLastName);
                                thisFF.updateClassValidation(elementFirstSurname[0]);
                            }
                            if ($('#'.concat(ui.secondLastName))) {
                                var elementSecondSurname = $('#'.concat(ui.secondLastName));
                                elementSecondSurname.val(secondLastName);
                                thisFF.updateClassValidation(elementSecondSurname[0]);
                            }
                            element = document.getElementById(ui.documentType);
                            if (element) {
                                element.value = documentType;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.documentNumber);
                            if (element) {
                                element.value = documentNumber;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.day);
                            if (element) {
                                element.value = "none";

                                thisFF.removeStyles(element.parentElement, "check--OK");
                                thisFF.removeStyles(element.parentElement, "check--FAIL");
                                // elimino el borde rojo del textBox 
                                thisFF.removeStyles(element, "validationError");
                                //elimina el texto de Error
                                if (element.parentElement != undefined) {
                                    element.parentElement.lastChild.textContent = "";
                                }
                                // elimina el estilo de error del label
                                thisFF.removeStyles(element.parentElement.parentElement.parentElement.children[0], "validationErrorLabel");
                            }
                            element = document.getElementById(ui.month);
                            if (element) {
                                element.value = "none";
                                thisFF.removeStyles(element, "validationError");
                            }
                            element = document.getElementById(ui.year);
                            if (element) {
                                element.value = "none";
                                thisFF.removeStyles(element, "validationError");
                            }
                            element = document.getElementById(ui.email);
                            if (element) {
                                element.value = email;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.phone);
                            if (element) {
                                element.value = phone;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.address);
                            if (element) {
                                element.value = address;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.city);
                            if (element) {
                                element.value = city;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.postCode);
                            if (element) {
                                element.value = postCode;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.country);
                            if (element) {
                                element.value = country;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.famNumResiDni);
                            if (element) {
                                element.value = famNumResiDni;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.resiMuniCode);
                            if (element) {
                                element.value = resiMuniCode;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.resiDocAcre);
                            if (element) {
                                element.value = resiDocAcre;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.famNumComAut);
                            if (element) {
                                element.value = famNumComAut;
                                thisFF.updateClassValidation(element);
                            }
                            element = document.getElementById(ui.famNumCert);
                            if (element) {
                                element.value = famNumCert;
                                thisFF.updateClassValidation(element);
                            }
                            
                            $(':radio[name="' + ui.title + '"]').filter(':checked').attr('checked', false);
                            $(':radio[name="' + ui.title + '"]').change();

                            var parentIRadio = $(':radio[name="' + ui.title + '"]')[0].parentElement.parentElement;
                            thisFF.updateRadioClassValidation(parentIRadio);
                        } else {
                            if ($('#'.concat(ui.firstName))) { $('#'.concat(ui.firstName)).val(firstName).change(); }
                            if ($('#'.concat(ui.lastName))) { $('#'.concat(ui.lastName)).val(lastName).change(); }
                            if ($('#'.concat(ui.firstLastName))) { $('#'.concat(ui.firstLastName)).val(firstLastName).change(); }
                            if ($('#'.concat(ui.secondLastName))) { $('#'.concat(ui.secondLastName)).val(secondLastName).change(); }
                            if ($('#'.concat(ui.documentType))) { $('#'.concat(ui.documentType)).val(documentType).change(); }
                            if ($('#'.concat(ui.documentNumber))) { $('#'.concat(ui.documentNumber)).val(documentNumber).change(); }

                            thisFF.RemoveChangeEvents();
                            if (pTitle == '') {
                                $(':radio[name="' + ui.title + '"]').filter(':checked').attr('checked', false);

                            } else {
                                $(':radio[name="' + ui.title + '"]').filter('[value=' + pTitle + ']').attr('checked', 'checked');
                            }
                            $(':radio[name="' + ui.title + '"]').blur();
                            
                            thisFF.addEventsToPersonTypeRadios();
                            if ($(':radio[name="' + ui.title + '"]:checked').length == 1) {
                                $(':radio[name="' + ui.title + '"]:checked').change();
                            } else {
                                $(':radio[name="' + ui.title + '"]').first().change();
                            }
                      
                        
                            if (birthDay != "") {
                                var day = birthDay.slice(8, 10);
                                if (day.slice(0, 1) == '0') day = day.slice(1, 2);
                                var month = birthDay.slice(5, 7);
                                if (month.slice(0, 1) == '0') month = month.slice(1, 2);

                                if (ui.day) $('#'.concat(ui.day)).val(day);
                                if (ui.month) $('#'.concat(ui.month)).val(month);
                                if (ui.year) $('#'.concat(ui.year)).val(birthDay.slice(0, 4));
                            }
                            else {
                                var none = "none";
                                if (ui.day) $('#'.concat(ui.day)).val(none);
                                if (ui.month) $('#'.concat(ui.month)).val(none);
                                if (ui.year) $('#'.concat(ui.year)).val(none);
                            }

                            if ($('#'.concat(ui.day))) $('#'.concat(ui.day)).change();
                            if ($('#'.concat(ui.month))) $('#'.concat(ui.month)).change();
                            if ($('#'.concat(ui.year))) $('#'.concat(ui.year)).change();

                            if (ui.famNumResiDni) { $('#'.concat(ui.famNumResiDni)).val(famNumResiDni).change(); }
                            if (ui.resiMuniCode) { $('#'.concat(ui.resiMuniCode)).val(resiMuniCode).change(); }
                            if (ui.resiDocAcre) { $('#'.concat(ui.resiDocAcre)).val(resiDocAcre).change(); }
                            if (ui.famNumComAut) { $('#'.concat(ui.famNumComAut)).val(famNumComAut).change(); }
                            if (ui.famNumCert) { $('#'.concat(ui.famNumCert)).val(famNumCert).change(); }
                            if (ui.email) { $('#'.concat(ui.email)).val(email).change(); }
                            if (ui.phone) { $('#'.concat(ui.phone)).val(phone).change(); }
                            if (ui.address) { $('#'.concat(ui.address)).val(address).change(); }
                            if (ui.city) { $('#'.concat(ui.city)).val(city).change(); }
                            if (ui.postCode) { $('#'.concat(ui.postCode)).val(postCode).change(); }
                            if (ui.country) { $('#'.concat(ui.country)).val(country).blur(); }
                        }
                        // amend loyalty section
                        var $checkbox = $('#'.concat(ui.loyaltySection.isSelectedId));
                        if (loyaltyProgramNumber) {
                            if (!$checkbox.is(":checked")) $checkbox.click();
                            $(':radio[name="'.concat(ui.loyaltySection.programChooseName, '"][value="', loyaltyProgram, '"]')).attr('checked', true).click();
                        } else {
                            if ($checkbox.is(":checked")) $checkbox.click();
                        }
                    }
                    // if select element is replaced by selectmenu widget - refresh it
                    //                    if ($select.data("selectmenu") != null) $select.selectmenu('refresh'); // TODO: for some reason selectmenu doesn't support disabled elements
                }
            }
        };
        
        thisFF.updateRadioClassValidation = function (element) {
            thisFF.removeStyles(element, "check--OK");
            thisFF.removeStyles(element, "check--FAIL");

            var posiP = element.children.length - 1;
            var p = $(element).find('p').last();
            if (p.length > 0) {
                element.children[posiP].outerText = "";
            }

            for (var index = 0, l = element.children.length; index < l; ++index) {
                thisFF.removeStyles(element.children[index], "validationErrorLabel");
            }

            thisFF.removeStyles(element.parentElement.parentElement.children[0], "validationErrorLabel");

        };
        thisFF.updateClassValidation = function (element) {
            if (element) {
                // elimino los iconos de Check
                thisFF.removeStyles(element.parentElement, "check--OK");
                thisFF.removeStyles(element.parentElement, "check--FAIL");
                // elimino el borde rojo del textBox 
                thisFF.removeStyles(element, "validationError");
                //elimina el texto de Error
                if (element.parentElement.children[1] != undefined)
                    element.parentElement.children[1].outerText = "";

                thisFF.removeStyles(element.parentElement.parentElement.parentElement.children[0], "validationErrorLabel");
            }
        };

        thisFF.removeStyles = function (element, withoutstyle) {
            if (element.classList && element.classList.contains(withoutstyle))
                element.classList.remove(withoutstyle);
        };

        thisFF.savefrequentFlyerSelectHandler = function () {
            for (var ui in thisFF.uiMap) {
                ui = thisFF.uiMap[ui];
                var $this = $(this);
                var $select = $('#'.concat(ui.flyerSelect));
                var $saveFrequentFlyer = $('#'.concat(ui.saveFrequentSection.saveFrequentFlyerId));

                if ($saveFrequentFlyer.attr('id') == $this.attr('id')) {
                    if (!$saveFrequentFlyer.is(":checked")) {
                        $select.val('');
                        $select.change();
                    }
                }
            }
        };


        return thisFF;
    };

    /*
    Name:
    Class AttributeToggleBase
    Param:
    onId (String) : toggle "ON" element ID,
    offId (string): toggle "OFF" element ID,
    toggleDomIds (Array of String): element IDs of DOM elements on which attribute will be toggles
    attributes (Hash (or JS object)): name<>value pairs of attributes that are going to be toggles (on or off)
    None
    Return:
    An instance of AttributeToggle
    Functionality:
    Toggles element attributes. This class needs to inherited and two of its methods overridden: addAttribute(element, attributeName, attributeValue) and removeAttribute(element, attributeName)
    Class Hierarchy:
    SkySales -> VUELING -> AttributeToggleBase
    */
    VUELING.Class.AttributeToggleBase = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisAT = SKYSALES.Util.extendObject(parent);

        thisAT.onId = null;
        thisAT.offId = null;
        thisAT.toggleDomIds = [];
        thisAT.attributes = {};

        thisAT.onElement = null;
        thisAT.offElement = null;

        thisAT.addAttribute = function (elementId, attributeName, attributeValue) {
            throw "VUELING.Class.AttributeToggleBase.addAttribute(elementId, attributeName, attributeValue) is not overridden";
        };
        thisAT.removeAttribute = function (elementId, attributeName) {
            throw "VUELING.Class.AttributeToggleBase.removeAttribute(elementId, attributeName) is not overridden";
        };

        thisAT.addAttributeHandler = function () {
            var attributes = this.attributes;
            var domIds = this.toggleDomIds;
            for (var attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    var attributeValue = attributes[attributeName];
                    for (var index = 0, l = domIds.length; index < l; ++index) {
                        this.addAttribute(domIds[index], attributeName, attributeValue);
                    }
                }
            }
        };
        thisAT.removeAttributeHandler = function () {
            var attributes = this.attributes;
            var domIds = this.toggleDomIds;
            for (var attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    for (var index = 0, l = domIds.length; index < l; ++index) {
                        this.removeAttribute(domIds[index], attributeName);
                    }
                }
            }
        };

        thisAT.init = function (json) {
            this.setSettingsByObject(json);
            if (typeof this.onId === "undefined" || typeof this.offId === "undefined" || this.toggleDomIds.length < 1) throw "VUELING.Class.AttributeToggleBase is not properly initialized";

            this.onElement = $('#'.concat(this.onId));
            this.offElement = $('#'.concat(this.offId));
            this.addEvents();

            if ((this.onElement.is(":radio,:checkbox") && this.onElement.is(":checked"))) { this.addAttributeHandler(); }
            if ((this.offElement.is(":radio,:checkbox") && this.offElement.is(":checked"))) { this.removeAttributeHandler(); }
        };

        thisAT.addEvents = function () {
            var self = this;
            this.onElement.click(function () {
                var $this = $(this);

                if ($this.is(":checkbox") && self.onId == self.offId) { if (!$this.is(":checked")) return; }
                else if (!($this.is(":radio,:checkbox") && $this.is(":checked"))) { return; }

                self.addAttributeHandler();
            });
            this.offElement.click(function () {
                var $this = $(this);

                if ($this.is(":checkbox") && self.onId == self.offId) { if ($this.is(":checked")) return; }
                else if (!($this.is(":radio,:checkbox") && $this.is(":checked"))) { return; }

                self.removeAttributeHandler();
            });
        };

        return thisAT;
    };

    /*
    Name:
    Class ElementDataToggle
    Param:
    See AttributeToggleBase
    None
    Return:
    An instance of ElementDataToggle
    Functionality:
    Toggles DOM element data attribute (used by jQuery (and HTML5?))
    Class Hierarchy:
    SkySales -> VUELING -> AttributeToggleBase -> ElementDataToggle
    */
    VUELING.Class.ElementDataToggle = function () {
        var parent = new VUELING.Class.AttributeToggleBase(),
            thisAT = SKYSALES.Util.extendObject(parent);

        parent.addAttribute = function (elementId, attributeName, attributeValue) {
            SKYSALES.Util.setAttribute(this.getById(elementId), attributeName, attributeValue);
        };
        parent.removeAttribute = function (elementId, attributeName) {
            SKYSALES.Util.removeAttribute(this.getById(elementId), attributeName);
        };

        return thisAT;
    };

    /*
    Name:
    Class ElementAttributeToggle
    Param:
    See AttributeToggleBase
    None
    Return:
    An instance of ElementAttributeToggle
    Functionality:
    Toggles DOM element attribute
    Class Hierarchy:
    SkySales -> VUELING -> AttributeToggleBase -> ElementAttributeToggle
    */
    VUELING.Class.ElementAttributeToggle = function () {
        var parent = new VUELING.Class.AttributeToggleBase(),
            thisAT = SKYSALES.Util.extendObject(parent);

        parent.addAttribute = function (elementId, attributeName, attributeValue) {
            $('#'.concat(elementId)).attr(attributeName, attributeValue);
        };
        parent.removeAttribute = function (elementId, attributeName) {
            $('#'.concat(elementId)).removeAttr(attributeName);
        };

        return thisAT;
    };

    /*
    Name:
    Class DisableCopyPaste
    Param:
    elementId (String) : input element ID
    Return:
    An instance of DisableCopyPaste
    Functionality:
    Disables Copy and Paste functionality on input DOM element
    Class Hierarchy:
    SkySales -> VUELING -> DisableCopyPaste
    */
    VUELING.Class.DisableCopyPaste = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisDCP = SKYSALES.Util.extendObject(parent);

        thisDCP.elementId = null;

        thisDCP.element = null;

        thisDCP.init = function (json) {
            thisDCP.setSettingsByObject(json);
            if (typeof thisDCP.elementId === "undefined") throw "VUELING.Class.DisableCopyPaste is not properly initialized";

            thisDCP.element = $('#'.concat(thisDCP.elementId));
            this.addEvents();
        };

        thisDCP.addEvents = function () {
            thisDCP.element.bind('cut copy paste', function (e) {
                e.preventDefault();
            });
        };

        return thisDCP;
    };

    /*
    Name: 
    Class PetInput
    Param:
    None
    Return: 
    An instance of PetInput
    Functionality:
    This class represents a PetInput
    Notes:
    This object is used during the standard booking and change flow
    Class Hierarchy:
    SkySales -> VUELING -> PetInput
    */
    VUELING.Class.PetInput = function () {
        var parent = SKYSALES.Class.SkySales(),
        thisPetInput = SKYSALES.Util.extendObject(parent);
        thisPetInput.flightPartSsrArray = null;
        thisPetInput.SeatMaps = [];
        thisPetInput.SeatMapTypeSuffix = 'seatmap';
        thisPetInput.petPrice = null;
        thisPetInput.paxCount = null;
        thisPetInput.petCode = null;
        thisPetInput.petName = null;
        thisPetInput.petNamePlural = null;
        thisPetInput.addPetPopup = null;
        thisPetInput.addPetPopupId = '';
        thisPetInput.current_paxNum = '';
        thisPetInput.current_segNum = '';
        thisPetInput.current_price = '';
        thisPetInput.cancelSeatId = '';
        thisPetInput.cancelPetId = '';
        thisPetInput.cancelSeat = null;
        thisPetInput.cancelPet = null;
        thisPetInput.current_checkBox = null;
        thisPetInput.noneSelectedBtn = null;
        thisPetInput.itemSelectedBtn = null;
        thisPetInput.toggleId = '';
        thisPetInput.toggleSpecialEquipmentId = '';
        thisPetInput.togglePetSeparatorId = '';
        thisPetInput.ContractInsurance = '';
        thisPetInput.NotContractInsurance = '';
        thisPetInput.Anadir = '';
        thisPetInput.NotAnadir = '';

        thisPetInput.SBSidebarName = 'SBSidebar';
        thisPetInput.SBSidebarObj = null;
        thisPetInput.SSRInsuraceInputName = 'SSRInsuraceInput';
        thisPetInput.SSRInsuraceInputObj = null;
        thisPetInput.zeroCurrency = '';

        thisPetInput.init = function (json) {
            this.setSettingsByObject(json);
            this.setVars();
            this.getSBSidebarObject();
            this.addEvents();
            this.initAddPetPopup();
            this.setAvailable();
        };

        thisPetInput.setVars = function () {
            thisPetInput.addPetPopup = this.getById(this.addPetPopupId);
            thisPetInput.cancelSeat = this.getById(this.cancelSeatId);
            thisPetInput.cancelPet = this.getById(this.cancelPetId);
            thisPetInput.noneSelectedBtn = this.getById(this.noneSelectedBtn);
            thisPetInput.itemSelectedBtn = this.getById(this.itemSelectedBtn);
            var auxPetPrice = 0;
            for (var i in thisPetInput.petPrice) {
                auxPetPrice += parseFloat(thisPetInput.petPrice[i]);
            }
            thisPetInput.petPrice = auxPetPrice / thisPetInput.paxCount;
        };

        thisPetInput.addEvents = function () {
            $('div .petTable .typeCheck').click(this.CheckBoxClickEventHandler);
            thisPetInput.cancelSeat.click(this.cancelSeatEventHandler);
            thisPetInput.cancelPet.click(this.cancelPetEventHandler);
            if (thisPetInput.noneSelectedBtn.attr('id') != null) {
                thisPetInput.noneSelectedBtn.click(this.noneSelectedHandler);
                thisPetInput.itemSelectedBtn.click(this.itemSelectedHandler);
            }
            $('span.petPricePax').html("(+" + SKYSALES.Util.convertToLocaleCurrency(thisPetInput.petPrice) + ")");
        };

        thisPetInput.noneSelectedHandler = function () {
            thisPetInput.clearAll();
            if ($("#" + thisPetInput.toggleId).is(":visible")) {
                $("#" + thisPetInput.toggleId).slideUp("fast");
            }

            if ($("#" + thisPetInput.togglePetSeparatorId).is(":visible")) {
                $("#" + thisPetInput.togglePetSeparatorId).hide();
            }

            $(thisPetInput.itemSelectedBtn).parent().removeClass("active");
            $(thisPetInput.itemSelectedBtn).removeClass("disableButton");
            $("span", thisPetInput.itemSelectedBtn).html(thisPetInput.NotAnadir);
            $('#dvPetInfoAnulacionTotal').hide();

            return false;
        };

        thisPetInput.itemSelectedHandler = function () {
            if ($("#" + thisPetInput.toggleId).is(":hidden")) {
                $("#" + thisPetInput.toggleId).slideDown("fast");
                thisPetInput.itemTrigger();
            }

            if (!$("#" + thisPetInput.toggleSpecialEquipmentId).is(":hidden")) {
                $("#" + thisPetInput.togglePetSeparatorId).show();
            }

            $(thisPetInput.itemSelectedBtn).parent().addClass("active");
            $(thisPetInput.itemSelectedBtn).addClass("disableButton");
            $("span", thisPetInput.itemSelectedBtn).html(thisPetInput.Anadir);

            thisPetInput.getSSRInsuraceInputObject();
            if (thisPetInput.SSRInsuraceInputObj && thisPetInput.SSRInsuraceInputObj.IsSEAclicked) {
                $('[data-object="MessageAnulacionTotal"]').show();
            }
            return false;
        };

        thisPetInput.initAddPetPopup = function () {
            if (this.addPetPopupId != '') {
                thisPetInput.addPetPopup = new SKYSALES.Class.BlockedPopUp();
                var json = {};
                json.closeElement = $('#' + this.addPetPopupId + ' .blockUIPopUpClose');
                thisPetInput.addPetPopup.init(json);
            }
        };

        thisPetInput.getSBSidebarObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisPetInput.SBSidebarName.length) === thisPetInput.SBSidebarName) {
                    thisPetInput.SBSidebarObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisPetInput.getSSRInsuraceInputObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisPetInput.SSRInsuraceInputName.length) === thisPetInput.SSRInsuraceInputName) {
                    thisPetInput.SSRInsuraceInputObj = SKYSALES.Instance[ins];
                    break;
                }
            }
        };

        thisPetInput.getSeatMapObject = function () {
            for (var ins in SKYSALES.Instance) {
                if (ins.substring(0, thisPetInput.SeatMapTypeSuffix.length) === thisPetInput.SeatMapTypeSuffix) {
                    thisPetInput.SeatMaps.push(SKYSALES.Instance[ins]);
                }
            }
        };

        thisPetInput.cancelSeatEventHandler = function () {
            var paxNum = thisPetInput.current_paxNum - 1;
            thisPetInput.ChangePet();
            thisPetInput.addPetPopup.close();
            $('span.seatLegend a.seatButton').each(function () {
                if (this.id.split("_")[1] == paxNum)
                    this.click();
            });

            if (thisPetInput.SeatMaps.length == 0)
                thisPetInput.getSeatMapObject();

            if (thisPetInput.SeatMaps.length > 0) {
                for (var i = 0; i < thisPetInput.SeatMaps.length; i++) {
                    var seatMap = thisPetInput.SeatMaps[i];
                    seatMap.PaxSeatDeleteByPaxId(paxNum);
                }
            }
        };

        thisPetInput.cancelPetEventHandler = function () {
            thisPetInput.current_checkBox.attr('checked', false);
            thisPetInput.ChangePet();
            thisPetInput.addPetPopup.close();
        };

        thisPetInput.resetSelection = function () {
            thisPetInput.current_paxNum = '';
            thisPetInput.current_segNum = '';
            thisPetInput.current_price = '';
        };

        thisPetInput.CheckBoxClickEventHandler = function () {
            thisPetInput.current_checkBox = $(this);
            thisPetInput.current_paxNum = $(this).attr('id').substring($(this).attr('id').length - 7, $(this).attr('id').length - 6);
            thisPetInput.current_segNum = $(this).attr('id').substring($(this).attr('id').length - 3, $(this).attr('id').length - 2);

            thisPetInput.changePrice($(this));

            thisPetInput.current_price = $("ssrPetPrice_" + thisPetInput.current_paxNum).text();

            if (thisPetInput.SeatMaps.length == 0)
                thisPetInput.getSeatMapObject();

            var hasPassengerSeatAssignedInAnyJourney = false;

            if (thisPetInput.current_checkBox.is(':checked') && thisPetInput.SeatMaps.length > 0) {
                for (var i = 0; i < thisPetInput.SeatMaps.length; i++) {
                    var seatMap = thisPetInput.SeatMaps[i];
                    var paxId = thisPetInput.current_paxNum - 1;

                    if (typeof seatMap.PassengerHasSeatAssigned != 'function' || seatMap.PassengerHasSeatAssigned(paxId)) {
                        hasPassengerSeatAssignedInAnyJourney = true;
                        break;
                    }
                }
            }

            if (hasPassengerSeatAssignedInAnyJourney) {
                thisPetInput.addPetPopup.show(thisPetInput.addPetPopupId);
            } else
                thisPetInput.ChangePet();
        };

        thisPetInput.ChangePet = function () {

            function setPetsService() {
                var finalPrice = thisPetInput.petPrice;
                var alias = "";
                if (checkedCount == 1) {
                    alias = thisPetInput.petName;
                } else {
                    alias = thisPetInput.petNamePlural;
                }
                var selectedPets = [];
                selectedPets[thisPetInput.petCode] = [];
                selectedPets[thisPetInput.petCode]['num'] = checkedCount;
                selectedPets[thisPetInput.petCode]['desc'] = alias;
                selectedPets[thisPetInput.petCode]['price'] = finalPrice * checkedCount;
                thisPetInput.SBSidebarObj.setService('pets', selectedPets, alias);
            }

            var checkedCount = $('div .petTable .typeCheck:checked').length;
            if (thisPetInput.current_checkBox.is(':checked')) {
                for (var pos = 0; pos < thisPetInput.flightPartSsrArray.length; pos++) {
                    var newId = thisPetInput.current_checkBox.attr('id').slice(0, -7) + thisPetInput.current_paxNum + "_1_" + thisPetInput.current_segNum + "_1";
                    $('#' + newId).attr('checked', true);
                    thisPetInput.current_segNum++;
                }
                setPetsService();
            }
            else {
                for (var pos = 0; pos < thisPetInput.flightPartSsrArray.length; pos++) {
                    var newId = thisPetInput.current_checkBox.attr('id').slice(0, -7) + thisPetInput.current_paxNum + "_1_" + thisPetInput.current_segNum + "_1";
                    $('#' + newId).attr('checked', false);
                    thisPetInput.current_segNum++;
                }
                if (checkedCount > 0) {
                    setPetsService();
                }
                else {
                    if (thisPetInput.SBSidebarObj != null)
                        thisPetInput.SBSidebarObj.removeService('pets');
                }
            }

            thisPetInput.setAvailable();
        };

        thisPetInput.clearAll = function () {
            $('div .petTable .passenger input').each(function () {
                if ($(this).is(':checked')) {
                    $(this).attr('checked', false);
                    $(this).removeAttr('disabled');
                }
                if ($(this).is(':disabled')) {
                    $(this).attr('checked', false);
                    $(this).removeAttr('disabled');
                }

            });
            if (thisPetInput.SBSidebarObj != null)
                thisPetInput.SBSidebarObj.removeService('pets');
            thisPetInput.resetPrices();
            thisPetInput.resetSelection();
        };

        thisPetInput.itemTrigger = function () {
            var check = !(thisPetInput.paxCount > 1);
            $('div .petTable .passenger input').each(function (index) {
                $(this).attr('checked', check);

                if (thisPetInput.paxCount == 1) {
                    if ($(this).is(':checked')) {
                        thisPetInput.current_paxNum = 1;
                        $(this).triggerHandler("click");
                    }
                }
            });
        };

        thisPetInput.resetPrices = function() {
            for (var i = 0; i < parseInt(thisPetInput.paxCount) ; i += 1) {
                var index = i + 1;
                $("#ssrPetPrice_" + index).html(thisPetInput.zeroCurrency);
            }
        }

        thisPetInput.changePrice = function (checkbox) {
            var price = 0;
            if (checkbox.is(':checked')) {
                price = SKYSALES.Util.convertToLocaleCurrency(thisPetInput.petPrice);
            $("#ssrPetPrice_" + thisPetInput.current_paxNum).html(price);
            }
            else
                $("#ssrPetPrice_" + thisPetInput.current_paxNum).html(thisPetInput.zeroCurrency);

        };

        thisPetInput.setAvailable = function () {
            var checkedCount = $('div .petTable .typeCheck:checked').length;
            var j;
            var availableCount = thisPetInput.paxCount;
            for (j = 0; j < thisPetInput.flightPartSsrArray.length; j++) {
                if (thisPetInput.flightPartSsrArray[j] < availableCount)
                    availableCount = thisPetInput.flightPartSsrArray[j];
            }
            var i;
            var objects = $('div .petTable .typeCheck');
            for (i = 0; i < $('div .petTable .typeCheck').length; i++) {
                var paxNum = objects[i].id.substring(objects[i].id.length - 7, objects[i].id.length - 6);
                var segNum = parseInt(objects[i].id.substring(objects[i].id.length - 3, objects[i].id.length - 2)) + 1;
                var newId = objects[i].id.slice(0, -7) + paxNum + "_1_" + segNum + "_1";
                if (checkedCount >= availableCount) {
                    if (checkedCount > availableCount) {
                        $('#' + objects[i].id).attr('checked', false);
                        $('#' + newId).attr('checked', false);
                        checkedCount--;
                    }
                    if (!($('#' + objects[i].id).is(':checked')))
                        $('#' + objects[i].id).attr('disabled', 'disabled');
                    else
                        $('#' + objects[i].id).removeAttr('disabled');
                }
                else
                    $('#' + objects[i].id).removeAttr('disabled');

            }

            if (checkedCount > 0)
                thisPetInput.itemSelectedBtn.trigger('click');
            else
                thisPetInput.noneSelectedBtn.trigger('click');

            thisPetInput.resetSelection();
        };

        thisPetInput.PassengerHasPet = function (paxId) {
            var selector = $("input[type='checkbox'][class='typeCheck'][checked='checked'][data_paxid=" + paxId + "]");
            return selector.length > 0;
        };

        thisPetInput.PassengerCancelPet = function (paxId) {
            thisPetInput.current_checkBox = $("input[type='checkbox'][class='typeCheck'][data_paxid=" + paxId + "]");
            thisPetInput.cancelPetEventHandler();
        };

        return thisPetInput;
    };

    VUELING.Class.PetConditions = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisPetConditions = SKYSALES.Util.extendObject(parent);

        thisPetConditions.infoLinkId = '';
        thisPetConditions.infoLinkCloseButtonId = '';
        thisPetConditions.infoBoxId = '';
        thisPetConditions.forcedWidth = '500px';
        thisPetConditions.isMultiple = false;
        thisPetConditions.hideErrorsOnClose = true;

        thisPetConditions.infoLink = null;
        thisPetConditions.infoLinkCloseButton = null;
        thisPetConditions.blockUI = null;
        thisPetConditions.newSearchCloseButton = null;

        thisPetConditions.namedAnchor = '';

        thisPetConditions.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
            this.addEvents();
        };

        thisPetConditions.initObject = function () {
            if (!thisPetConditions.isMultiple) {
                thisPetConditions.infoLink = this.getById(thisPetConditions.infoLinkId);
                thisPetConditions.infoLinkCloseButton = this.getById(thisPetConditions.infoLinkCloseButtonId);
            } else {
                thisPetConditions.infoLink = $('.' + thisPetConditions.infoLinkId);
                thisPetConditions.infoLinkCloseButton = $('.' + thisPetConditions.infoLinkCloseButtonId);
            }
            thisPetConditions.blockUI = new SKYSALES.Class.BlockedPopUp();
            if (thisPetConditions.hideErrorsOnClose !== true) {
                thisPetConditions.blockUI.hideErrorMsg = false;
            }
            var json = {};
            json.closeElement = thisPetConditions.infoLinkCloseButton;
            json.properties = { css: { width: thisPetConditions.forcedWidth } };
            thisPetConditions.blockUI.init(json);
        };

        thisPetConditions.addEvents = function () {
            $(thisPetConditions.infoLink).live("click", function (e) {
                thisPetConditions.openInfoBox(e);
            });
        };

        thisPetConditions.openInfoBox = function (e) {
            if (e != undefined)
                e.preventDefault();

            thisPetConditions.blockUI.show(thisPetConditions.infoBoxId);
            if (thisPetConditions.namedAnchor != '') {
                var aTag = $("a[name='" + thisPetConditions.namedAnchor + "']");

                if (aTag.length) {
                    aTag[0].scrollIntoView(true);
                }
            }
        };

        return thisPetConditions;
    };

    /*
    Name: 
    Class Multicity12h
    Param:
    None
    Return: 
    An instance of PetInput
    Functionality:
    This class represents a Multicity12h
    Notes:
    This object is used during the standard booking and change flow
    Class Hierarchy:
    SkySales -> VUELING -> Multicity12h
    */
    VUELING.Class.Multicity12h = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisMulticity12h = SKYSALES.Util.extendObject(parent);

        thisMulticity12h.infoLinkId = '';
        thisMulticity12h.infoLinkCloseButtonId = '';
        thisMulticity12h.infoBoxId = '';
        thisMulticity12h.MessageErrorNotAvailable = '';
        thisMulticity12h.MessageErrorNotAvailableWithBCN = '';
        thisMulticity12h.MessageErrorNotAvailablePopUp = '';
        thisMulticity12h.MessageErrorNotAvailablePopUpWithBCN = '';
        thisMulticity12h.IsMultiCity = false;
        thisMulticity12h.waitingHours = 12;
        thisMulticity12h.forcedWidth = '500px';
        thisMulticity12h.isMultiple = false;
        thisMulticity12h.HubStations = '';

        thisMulticity12h.timeZoneDifferenceArrive = 0;
        thisMulticity12h.timeZoneDifferenceDeparture = 0;

        thisMulticity12h.infoLink = null;
        thisMulticity12h.infoLinkCloseButton = null;
        thisMulticity12h.blockUI = null;
        thisMulticity12h.newSearchCloseButton = null;

        thisMulticity12h.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
            this.addEvents();
        };

        thisMulticity12h.initObject = function () {
            if (!thisMulticity12h.isMultiple) {
                thisMulticity12h.infoLink = this.getById(thisMulticity12h.infoLinkId);
                thisMulticity12h.infoLinkCloseButton = this.getById(thisMulticity12h.infoLinkCloseButtonId);
            } else {
                thisMulticity12h.infoLink = $('.' + thisMulticity12h.infoLinkId);
                thisMulticity12h.infoLinkCloseButton = $('.' + thisMulticity12h.infoLinkCloseButtonId);
            }
            thisMulticity12h.blockUI = new SKYSALES.Class.BlockedPopUp();
            var json = {};
            json.closeElement = thisMulticity12h.infoLinkCloseButton;
            json.properties = { css: { width: thisMulticity12h.forcedWidth } };
            thisMulticity12h.blockUI.init(json);
        };

        thisMulticity12h.addEvents = function () {
            $(thisMulticity12h.infoLink).live("click", function (e) {
                thisMulticity12h.openInfoBox(e);
            });
        };

        thisMulticity12h.openInfoBox = function (e) {
            if (e != undefined)
                e.preventDefault();

            var msg = thisMulticity12h.MessageErrorNotAvailablePopUp;
            var thisAvailabilityInput = VUELING.Util.getObjectInstance('availabilityInput');
            if (thisAvailabilityInput.departureStationCodeInput2.val() == thisAvailabilityInput.arrivalStationCodeInput1.val() &&
               $.inArray(thisAvailabilityInput.departureStationCodeInput2.val(), thisMulticity12h.HubStations) >= 0) {
                msg = thisMulticity12h.MessageErrorNotAvailablePopUpWithBCN;
            }
            $("#" + thisMulticity12h.infoBoxId + " .dvDescription").html(msg);
            thisMulticity12h.blockUI.show(thisMulticity12h.infoBoxId);
        };

        return thisMulticity12h;
    };

    VUELING.Class.MemberPassenger = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisPassenger = SKYSALES.Util.extendObject(parent);

        thisPassenger.uiMap = [];
        thisPassenger.member = null;
        thisPassenger.selectedPaxId = -1;
        thisPassenger.isIBPossibleInReturn = "";
        thisPassenger.isIBPossibleInOutbound = "";
        thisPassenger.LoyaltyProgramaIberiaCode = "";
        thisPassenger.Puntox2ParagraphId = "";


        thisPassenger.init = function (json) {
            this.setSettingsByObject(json);
            this.addEvents();
            this.setUi();
        };

        thisPassenger.setUi = function () {
            if (thisPassenger.selectedPaxId > -1) {
                $('#'.concat(thisPassenger.uiMap[thisPassenger.selectedPaxId].imFlying)).attr('checked', true).click().attr('checked', true);
            } else {
                for (var index in this.uiMap) {
                    var ui = this.uiMap[index], $chbox = $('#'.concat(ui.imFlying));
                    var isBonus = this.uiMap[index].IsBonusBeneficiary == 'true';

                    if ($('#' + ui.firstName).val() != '' || $('#' + ui.lastName).val() != '') {
                        if ($('#' + ui.firstName).val() != this.member.firstName || $('#' + ui.lastName).val() != this.member.lastName) {
                            $('#' + ui.imFlying).removeAttr('checked');
                            return;
                        }
                    }
                    if (isBonus) {
                        thisPassenger.imMy25Profile(this.uiMap[index]);
                        break;
                    }
                    if ($chbox.is(':checked')) {
                        $chbox.attr('checked', true).click().attr('checked', true);
                        break;
                    }
                }
            }
            thisPassenger.checkboxLoyaltySelectionHandler;
        };

        thisPassenger.addEvents = function () {
            if (this.uiMap != null && this.uiMap.length > 0) {
                for (var index in this.uiMap) {
                    var ui = this.uiMap[index];
                    $('#'.concat(ui.imFlying)).click(this.imFlyingSelectionHandler).data('index', index);;
                    $(':radio[name="'.concat(ui.loyaltySection.programChooseName).concat('"]')).click(this.loyaltySelectionHandler).data('index', index);
                    $(':checkbox[name="'.concat(ui.loyaltySection.isSelectedId).concat('"]')).change(this.checkboxLoyaltySelectionHandler).data('index', index);
                }

            }
        };

        thisPassenger.updateRadioClassValidation = function (element) {

            thisPassenger.removeStyles(element, "check--OK");
            thisPassenger.removeStyles(element, "check--FAIL");
            var posiP = element.children.length - 1;
            var p = $(element).find('p').last();
            if (p.length > 0) {
                element.children[posiP].outerText = "";
            }
            for (var index = 0, l = element.children.length; index < l; ++index) {
                thisPassenger.removeStyles(element.children[index], "validationErrorLabel");
            }
            thisPassenger.removeStyles(element.parentElement.parentElement.children[0], "validationErrorLabel");
        };

        thisPassenger.updateClassValidation = function (element) {
            // elimino los iconos de Check
            thisPassenger.removeStyles(element[0].parentElement, "check--OK");
            thisPassenger.removeStyles(element[0].parentElement, "check--FAIL");
            // elimino el borde rojo del textBox 
            thisPassenger.removeStyles(element[0], "validationError");
            //elimina el texto de Error
            if (element[0].parentElement.children[1] != undefined) {
                element[0].parentElement.children[1].outerText = "";
            }
            // elimina el estilo de error del label
            thisPassenger.removeStyles(element[0].parentElement.parentElement.parentElement.children[0], "validationErrorLabel");
        };

        thisPassenger.removeStyles = function (element, withoutstyle) {
            if (element.classList && element.classList.contains(withoutstyle))
                element.classList.remove(withoutstyle);
        };


        thisPassenger.imFlyingSelectionHandler = function () {
            var $this = $(this);
            var index = $this.data('index');
            var enabled = $this.is(":checked");

            if (thisPassenger.uiMap[index].firstName) {
                $('#'.concat(thisPassenger.uiMap[index].firstName)).val(enabled ? thisPassenger.member.firstName : '');
                $('#'.concat(thisPassenger.uiMap[index].firstName)).val() != "" ?
                    $('#'.concat(thisPassenger.uiMap[index].firstName)).change() :
                    thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].firstName)));
            }
            if (thisPassenger.uiMap[index].lastName) {
                $('#'.concat(thisPassenger.uiMap[index].lastName)).val(enabled ? thisPassenger.member.lastName : '');
                $('#'.concat(thisPassenger.uiMap[index].lastName)).val() != "" ?
                   $('#'.concat(thisPassenger.uiMap[index].lastName)).change() :
                   thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].lastName)));
            }
            if (thisPassenger.uiMap[index].firstLastName) {
                var lastNameArray = thisPassenger.member.lastName.split(' ');
                var firstLastName = lastNameArray[0];

                $('#'.concat(thisPassenger.uiMap[index].firstLastName)).val(enabled ? firstLastName : '');
                $('#'.concat(thisPassenger.uiMap[index].firstLastName)).val() != "" ?
                   $('#'.concat(thisPassenger.uiMap[index].firstLastName)).change() :
                   thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].firstLastName)));
            }
            if (thisPassenger.uiMap[index].secondLastName) {
                var lastNameArray = thisPassenger.member.lastName.split(' ');
                var secondLastName = lastNameArray.length != 1 ? lastNameArray[lastNameArray.length - 1] : '';

                $('#'.concat(thisPassenger.uiMap[index].secondLastName)).val(enabled ? secondLastName : '');
                $('#'.concat(thisPassenger.uiMap[index].secondLastName)).change();
                //thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].secondLastName)));
            }
            if (thisPassenger.uiMap[index].famNumResiDni) {
                $('#'.concat(thisPassenger.uiMap[index].famNumResiDni)).val(enabled ? thisPassenger.member.famNumResiDni : '');
                $('#'.concat(thisPassenger.uiMap[index].famNumResiDni)).val() != "" ?
                    $('#'.concat(thisPassenger.uiMap[index].famNumResiDni)).change() : thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].famNumResiDni)));
            }

            if (thisPassenger.uiMap[index].resiMuniCode) {
                $('#'.concat(thisPassenger.uiMap[index].resiMuniCode)).val(enabled ? thisPassenger.member.resiMuniCode : '');
                $('#'.concat(thisPassenger.uiMap[index].resiMuniCode)).val() != "" ?
                    $('#'.concat(thisPassenger.uiMap[index].resiMuniCode)).change() :
                    thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].resiMuniCode)));
            }
            if (thisPassenger.uiMap[index].resiDocAcre) {
                $('#'.concat(thisPassenger.uiMap[index].resiDocAcre)).val(enabled ? thisPassenger.member.resiDocAcre : '');
                $('#'.concat(thisPassenger.uiMap[index].resiDocAcre)).val() != "" ?
                   $('#'.concat(thisPassenger.uiMap[index].resiDocAcre)).change() :
                   thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].resiDocAcre)));
            }
            if (thisPassenger.uiMap[index].famNumComAut) {
                $('#'.concat(thisPassenger.uiMap[index].famNumComAut)).val(enabled ? thisPassenger.member.famNumComAut : '');
                $('#'.concat(thisPassenger.uiMap[index].famNumComAut)).val() != "" ?
                   $('#'.concat(thisPassenger.uiMap[index].famNumComAut)).change() :
                   thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].famNumComAut)));
            }
            if (thisPassenger.uiMap[index].famNumCert) {
                $('#'.concat(thisPassenger.uiMap[index].famNumCert)).val(enabled ? thisPassenger.member.famNumCert : '');
                $('#'.concat(thisPassenger.uiMap[index].famNumCert)).val() != "" ?
                   $('#'.concat(thisPassenger.uiMap[index].famNumCert)).change() :
                   thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].famNumCert)));
            }

            if (thisPassenger.uiMap[index].title) {
                if (enabled) {
                    if (thisPassenger.member.title != "") {
                        $(':radio[name="' + thisPassenger.uiMap[index].title + '"]').filter('[value=' + thisPassenger.member.title + ']').attr('checked', true);
                    } else {
                        $(':radio[name="' + thisPassenger.uiMap[index].title + '"]').filter(':checked').attr('checked', false);
                    }
                    $(':radio[name="' + thisPassenger.uiMap[index].title + '"]').blur();
                }
                else {
                        $(':radio[name="' + thisPassenger.uiMap[index].title + '"]').filter(':checked').attr('checked', false);
                        var parentRadio = $(':radio[name="' + thisPassenger.uiMap[index].title + '"]')[0].parentElement.parentElement;
                        thisPassenger.updateRadioClassValidation(parentRadio);
                }

            }

            if (thisPassenger.member.defaultLoyaltyProgram.length > 0
                &&
                (
                    (thisPassenger.member.defaultLoyaltyProgram == thisPassenger.LoyaltyProgramaIberiaCode && thisPassenger.isIBPossibleInReturn != 'NotPossible' && thisPassenger.isIBPossibleInOutbound != 'NotPossible')
                    ||
                    (thisPassenger.member.defaultLoyaltyProgram != thisPassenger.LoyaltyProgramaIberiaCode)
                )
            ) {
                var $loyaltyCheckbox = $('#'.concat(thisPassenger.uiMap[index].loyaltySection.isSelectedId));
                if (enabled) {
                    if (!$loyaltyCheckbox.is(':checked')) $loyaltyCheckbox.click();
                    $(':radio[name="'.concat(thisPassenger.uiMap[index].loyaltySection.programChooseName, '"][value="', thisPassenger.member.defaultLoyaltyProgram, '"]')).attr('checked', true).click();
                    $('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)).val(thisPassenger.member.loyaltyPrograms[thisPassenger.member.defaultLoyaltyProgram]);

                    $('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)).val() != "" ?
                        $('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)).change() :
                        thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)));

                    var ffs = $('#'.concat(thisPassenger.uiMap[index].flyerSelect));
                    ffs.val(ffs.find('option:first').val());
                } else {
                    if ($loyaltyCheckbox.is(':checked')) $loyaltyCheckbox.click();
                    $('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)).val('');

                    thisPassenger.updateClassValidation($('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)));
                }
            }

            if (enabled) {
                $('#'.concat(thisPassenger.uiMap[index].saveFrequentFlyer)).hide();
                $('#'.concat(thisPassenger.uiMap[index].saveFrequentFlyerLabel).concat(' span')).hide();
            }
            else {
                $('#'.concat(thisPassenger.uiMap[index].saveFrequentFlyer)).show();
                $('#'.concat(thisPassenger.uiMap[index].saveFrequentFlyerLabel).concat(' span')).show();
            }
        };

        thisPassenger.imMy25Profile = function (uimap) {
            $('#'.concat(uimap.firstName)).val(thisPassenger.member.firstName).prop('disabled', true);
            $('#'.concat(uimap.lastName)).val(thisPassenger.member.lastName).prop('disabled', true);
        };

        thisPassenger.checkboxLoyaltySelectionHandler = function () {
            var anyChecked = false;
            for (var index in thisPassenger.uiMap) {
                var ui = thisPassenger.uiMap[index];
                if ($(':checkbox[name="'.concat(ui.loyaltySection.isSelectedId).concat('"]')).is(":checked")) {
                    anyChecked = true;
                    break;
                }
            }
            if (!anyChecked) {
                $('#' + thisPassenger.Puntox2ParagraphId).hide();
            } else {
                $('#' + thisPassenger.Puntox2ParagraphId).show();
            }
        };

        thisPassenger.loyaltySelectionHandler = function () {
            var $this = $(this);
            var index = $this.data('index');
            var $imFlying = $('#'.concat(thisPassenger.uiMap[index].imFlying));
            if ($this.is(":checked") && $imFlying.is(":checked")) {
                $('#'.concat(thisPassenger.uiMap[index].loyaltySection.programNumberId)).val(thisPassenger.member.loyaltyPrograms[$this.attr('value')] || "");
            }
        };

        return thisPassenger;
    };

    /*
    Name: 
    Class PctcECI
    Param:
    None
    Return: 
    An instance of PctcECI
    Functionality:
    This class represents a PctcECI
    Notes:
    This object is used during the Emergency Contact Information page
    Class Hierarchy:
    SkySales -> VUELING -> PctcECI
    */
    VUELING.Class.PctcECI = function () {
        var parent = new SKYSALES.Class.SkySales(),
            thisPctcECI = SKYSALES.Util.extendObject(parent),
            resource = SKYSALES.Util.getResource();

        thisPctcECI.nameId = "";
        thisPctcECI.telephoneID = "";
        thisPctcECI.dropDownPsgId = "";
        thisPctcECI.checkId = "";
        thisPctcECI.toggleLinkId = "";
        thisPctcECI.numpaxId = "";

        thisPctcECI.nameInput = null;
        thisPctcECI.phoneInput = null;
        thisPctcECI.dropDownPsgInput = null;
        thisPctcECI.checkInput = null;
        thisPctcECI.toggleLink = null;

        thisPctcECI.init = function (paramObj) {
            this.setSettingsByObject(paramObj);
            this.setVars();
            this.addEvents();
        };

        thisPctcECI.setVars = function () {
            parent.setVars.call(this);
            thisPctcECI.nameInput = this.getById(thisPctcECI.nameId);
            thisPctcECI.phoneInput = this.getById(thisPctcECI.telephoneID);
            thisPctcECI.dropDownPsgInput = this.getById(thisPctcECI.dropDownPsgId);
            thisPctcECI.checkInput = this.getById(thisPctcECI.checkId);
            thisPctcECI.toggleLink = this.getById(thisPctcECI.toggleLinkId);
        };

        thisPctcECI.addEvents = function () {
            parent.addEvents.call(this);
            thisPctcECI.dropDownPsgInput.change(thisPctcECI.dropDownPsgInputHandler);
            thisPctcECI.checkInput.change(thisPctcECI.checkInputHandler);
            thisPctcECI.toggleLink.click(thisPctcECI.ToggleClickHandler);
        };

        thisPctcECI.ToggleClickHandler = function (e) {
            if ($("#pctcContacts_fullName" + thisPctcECI.numpaxId).is(":hidden")) {
                SKYSALES.Util.removeRequiredAttribute(thisPctcECI.nameInput);
                SKYSALES.Util.removeRequiredAttribute(thisPctcECI.phoneInput);
                thisPctcECI.cleanNames();
            } else {
                SKYSALES.Util.setAttribute(thisPctcECI.nameInput, 'required', 'true');
                SKYSALES.Util.setAttribute(thisPctcECI.phoneInput, 'required', 'true');
            }
        };

        thisPctcECI.checkInputHandler = function (e) {
            thisPctcECI.cleanNames();
            var paxSelectedId = $(thisPctcECI.dropDownPsgInput).val();
            var checkedandselected = $(this).is(":checked") && $(thisPctcECI.dropDownPsgInput).selectedIndex != 0;
            var checkednnotselected = $(this).is(":checked") && $(thisPctcECI.dropDownPsgInput).selectedIndex == 0 && $("#" + $(thisPctcECI.dropDownPsgInput).attr("id") + " option").size() == 2;

            if (checkedandselected || checkednnotselected) {
                if (checkednnotselected)
                    $(thisPctcECI.dropDownPsgInput).val($("#" + $(thisPctcECI.dropDownPsgInput).attr("id") + " option").last().val());
                $(thisPctcECI.nameInput).val($("#pctcContacts_fullName" + paxSelectedId).val());
                $(thisPctcECI.phoneInput).val($("#pctcContacts_telephone" + paxSelectedId).val());
            }
            if (!$(this).is(":checked") && $(thisPctcECI.dropDownPsgInput).selectedIndex != 0) {
                $(thisPctcECI.dropDownPsgInput).val('');
            }
        };

        thisPctcECI.dropDownPsgInputHandler = function (e) {
            thisPctcECI.cleanNames();
            if (this.value != "") {
                $(thisPctcECI.nameInput).val($("#pctcContacts_fullName" + this.value).val());
                $(thisPctcECI.phoneInput).val($("#pctcContacts_telephone" + this.value).val());
                $(thisPctcECI.checkInput).prop('checked', true);
            } else {
                $(thisPctcECI.checkInput).prop('checked', false);
            }
        };

        thisPctcECI.cleanNames = function () {
            $(thisPctcECI.nameInput).val("");
            $(thisPctcECI.phoneInput).val("");
        };
        return thisPctcECI;
    };

    VUELING.Class.InsuranceConditions = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisInsuranceConditions = SKYSALES.Util.extendObject(parent);

        thisInsuranceConditions.infoLinkId = '';
        thisInsuranceConditions.infoLinkCloseButtonId = '';
        thisInsuranceConditions.infoBoxId = '';
        thisInsuranceConditions.forcedWidth = '500px';
        thisInsuranceConditions.isMultiple = false;
        thisInsuranceConditions.hideErrorsOnClose = true;

        thisInsuranceConditions.infoLink = null;
        thisInsuranceConditions.infoLinkCloseButton = null;
        thisInsuranceConditions.blockUI = null;
        thisInsuranceConditions.newSearchCloseButton = null;

        thisInsuranceConditions.namedAnchor = '';

        thisInsuranceConditions.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
            this.addEvents();
        };

        thisInsuranceConditions.initObject = function () {
            if (!thisInsuranceConditions.isMultiple) {
                thisInsuranceConditions.infoLink = this.getById(thisInsuranceConditions.infoLinkId);
                thisInsuranceConditions.infoLinkCloseButton = this.getById(thisInsuranceConditions.infoLinkCloseButtonId);
            } else {
                thisInsuranceConditions.infoLink = $('.' + thisInsuranceConditions.infoLinkId);
                thisInsuranceConditions.infoLinkCloseButton = $('.' + thisInsuranceConditions.infoLinkCloseButtonId);
            }
            thisInsuranceConditions.blockUI = new SKYSALES.Class.BlockedPopUp();
            if (thisInsuranceConditions.hideErrorsOnClose !== true) {
                thisInsuranceConditions.blockUI.hideErrorMsg = false;
            }
            var json = {};
            json.closeElement = thisInsuranceConditions.infoLinkCloseButton;
            json.properties = { css: { width: thisInsuranceConditions.forcedWidth } };
            thisInsuranceConditions.blockUI.init(json);
        };

        thisInsuranceConditions.addEvents = function () {
            $(thisInsuranceConditions.infoLink).live("click", function (e) {
                thisInsuranceConditions.openInfoBox(e);
            });
        };

        thisInsuranceConditions.openInfoBox = function (e) {
            if (e != undefined)
                e.preventDefault();

            thisInsuranceConditions.blockUI.show(thisInsuranceConditions.infoBoxId);
            if (thisInsuranceConditions.namedAnchor != '') {
                var aTag = $("a[name='" + thisInsuranceConditions.namedAnchor + "']");

                if (aTag.length) {
                    aTag[0].scrollIntoView(true);
                }
            }
        };

        return thisInsuranceConditions;
    };


    VUELING.Class.BoardingPassSMS = function () {
        var parent = SKYSALES.Class.SkySales(),
        thisBoardingPassSMS = SKYSALES.Util.extendObject(parent);

        // parameters
        thisBoardingPassSMS.smsSectionId = "";
        thisBoardingPassSMS.url = "";
        thisBoardingPassSMS.passengerNumber = -1;
        thisBoardingPassSMS.statusError = "Error";
        thisBoardingPassSMS.statusFailed = "Failed";
        thisBoardingPassSMS.statusSuccess = "Success";
        thisBoardingPassSMS.showId = "";

        thisBoardingPassSMS.journeyIdaCanSendSms = "";
        thisBoardingPassSMS.journeyVueltaCanSendSms = "";

        thisBoardingPassSMS.IdDivOneJourneyMessage = "";
        thisBoardingPassSMS.IdDivRoundTripMessage = "";
        thisBoardingPassSMS.IdDivMoreThan2Journeys = "";

        thisBoardingPassSMS.existsJourneyCanSendSms = "";
        thisBoardingPassSMS.isMultiJourney = "";

        thisBoardingPassSMS.IdDivContent = "";
        thisBoardingPassSMS.IdDivResultOK = "";
        thisBoardingPassSMS.IdDivResultKO = "";
        thisBoardingPassSMS.IdDivIcoLoading = "";

        thisBoardingPassSMS.IdDivOpenJaw = "";
        thisBoardingPassSMS.IsMulticiy = "";

        // initialized objects
        thisBoardingPassSMS.smsSection = null;
        thisBoardingPassSMS.phoneCode = null;
        thisBoardingPassSMS.phoneNumber = null;

        thisBoardingPassSMS.init = function (json) {
            thisBoardingPassSMS.setSettingsByObject(json);
            thisBoardingPassSMS.initObject();
            thisBoardingPassSMS.addEvents();
        };

        thisBoardingPassSMS.initObject = function () {
            thisBoardingPassSMS.smsSection = this.getById(thisBoardingPassSMS.smsSectionId);
            thisBoardingPassSMS.phoneCode = $('input.codeTel', thisBoardingPassSMS.smsSection);
            thisBoardingPassSMS.phoneNumber = $('input.numTel', thisBoardingPassSMS.smsSection);

            thisBoardingPassSMS.showSmsMessage();
        };

        thisBoardingPassSMS.showSmsMessage = function () {
            if (thisBoardingPassSMS.existsJourneyCanSendSms == "true" && thisBoardingPassSMS.isMultiJourney == "true") {
                $('#' + thisBoardingPassSMS.IdDivMoreThan2Journeys).removeClass("hidden");
            }
            else if (thisBoardingPassSMS.journeyIdaCanSendSms == "true" && thisBoardingPassSMS.journeyVueltaCanSendSms == "true") {
                if (thisBoardingPassSMS.IsMulticiy == 'true') {
                    $('#' + thisBoardingPassSMS.IdDivOpenJaw).removeClass("hidden");
                } else {
                    $('#' + thisBoardingPassSMS.IdDivRoundTripMessage).removeClass("hidden");
                }
            }
            else if (thisBoardingPassSMS.journeyIdaCanSendSms == "true" || thisBoardingPassSMS.journeyVueltaCanSendSms == "true") {
                if (thisBoardingPassSMS.IsMulticiy == 'true') {
                    $('#' + thisBoardingPassSMS.IdDivOpenJaw).removeClass("hidden");
                } else {
                    $('#' + thisBoardingPassSMS.IdDivOneJourneyMessage).removeClass("hidden");
                }
            }
        };

        thisBoardingPassSMS.addEvents = function () {
            $('a.btSmall', thisBoardingPassSMS.smsSection).click(function (e) {
                e.preventDefault();
                var prefix = thisBoardingPassSMS.phoneCode.val().substring(1);
                var number = thisBoardingPassSMS.phoneNumber.val();
                if (prefix.length == 0 || number.length < 5) {
                    return;
                }

                thisBoardingPassSMS.smsSection.find("#" + thisBoardingPassSMS.IdDivContent).hide();
                $("#" + thisBoardingPassSMS.IdDivIcoLoading).toggleClass("hidden");

                $.ajax({
                    url: thisBoardingPassSMS.url,
                    timeout: 270000,
                    data:
                        {
                            passengerNumber: thisBoardingPassSMS.passengerNumber,
                            phonePrefix: prefix,
                            phoneNumber: number
                        },
                    dataType: "json",
                    error: function () { thisBoardingPassSMS.setResultMessage(thisBoardingPassSMS.statusError, thisBoardingPassSMS.IdDivResultKO, 'txtResult_KO_DIV'); },
                    success: function (data) { thisBoardingPassSMS.setResultMessage(data.result ? thisBoardingPassSMS.statusSuccess : thisBoardingPassSMS.statusFailed, thisBoardingPassSMS.IdDivResultOK, 'txtResult_OK_DIV'); },
                    complete: function (data) {
                        //                        $("#" + thisBoardingPassSMS.IdDivIcoLoading).toggleClass("hidden");
                    }
                });
            });


            $("#" + thisBoardingPassSMS.showId).click(function () {
                thisBoardingPassSMS.smsSection.find("#" + thisBoardingPassSMS.IdDivContent).show();
                thisBoardingPassSMS.smsSection.find("#" + thisBoardingPassSMS.IdDivResultKO).hide();
                thisBoardingPassSMS.smsSection.find("#" + thisBoardingPassSMS.IdDivResultOK).hide();
            });

            $('.select', thisBoardingPassSMS.smsSection).change(function () {

                thisBoardingPassSMS.phoneCode.val('+'.concat($(this).val()));
            });
        };

        thisBoardingPassSMS.setResultMessage = function (message, divId, txtDivId) {
            thisBoardingPassSMS.smsSection.find("#" + thisBoardingPassSMS.IdDivContent).hide();
            thisBoardingPassSMS.smsSection.find("#" + divId).show();
            thisBoardingPassSMS.smsSection.find("#" + txtDivId).text(message);
            $("#" + thisBoardingPassSMS.IdDivIcoLoading).toggleClass("hidden");
        };

        return thisBoardingPassSMS;
    };


    VUELING.Class.ExpressCheckOutServices = function () {
        var parent = SKYSALES.Class.SkySales(),
            thisExpressCheckOutServices = SKYSALES.Util.extendObject(parent);

        thisExpressCheckOutServices.infoLinkCloseButtonId = '';
        thisExpressCheckOutServices.infoLinkCloseByPrefId = '';
        thisExpressCheckOutServices.infoBoxId = '';
        thisExpressCheckOutServices.forcedWidth = '';
        thisExpressCheckOutServices.forcedTop = '';
        thisExpressCheckOutServices.SeatMapTypeName = "ajaxSeatMap";

        thisExpressCheckOutServices.applyNoSeat = false;
        thisExpressCheckOutServices.applyNoBag = false;
        thisExpressCheckOutServices.applyNoInsure = false;

        thisExpressCheckOutServices.SeatMap = null;
        thisExpressCheckOutServices.infoLinkCloseButton = null;
        thisExpressCheckOutServices.infoLinkCloseByPref = '';
        thisExpressCheckOutServices.blockUI = null;

        thisExpressCheckOutServices.init = function (json) {
            this.setSettingsByObject(json);
            this.initObject();
            this.addEvents();
            this.showPopUpExpress();
            this.addEventsPostOpen();

            if (this.applyNoSeat) this.SelectNoSeat();
            if (this.applyNoBag) this.SelectNoBag();
            if (this.applyNoInsure) this.SelectNoInsure();
        };

        thisExpressCheckOutServices.initObject = function () {
            thisExpressCheckOutServices.infoLinkCloseButton = this.getById(thisExpressCheckOutServices.infoLinkCloseButtonId);
            thisExpressCheckOutServices.infoLinkCloseByPref = this.getById(thisExpressCheckOutServices.infoLinkCloseByPrefId);
        };

        thisExpressCheckOutServices.addEvents = function () {
            thisExpressCheckOutServices.infoLinkCloseByPref.click(function (e) {
                thisExpressCheckOutServices.infoLinkCloseButton.click();
            });
        };

        thisExpressCheckOutServices.addEventsPostOpen = function () {
            thisExpressCheckOutServices.infoLinkCloseButton.click(function (e) {
                var insurancesObj = VUELING.Util.getObjectInstance('SSRInsuraceInput');
                if (insurancesObj != null)
                    insurancesObj.uncheckAllInsurances(e);
            });
        };

        thisExpressCheckOutServices.showPopUpExpress = function () {
            thisExpressCheckOutServices.blockUI = new SKYSALES.Class.BlockedPopUp();
            var json = {};
            json.closeElement = thisExpressCheckOutServices.infoLinkCloseButton;
            if (thisExpressCheckOutServices.forcedWidth != "") {
                if (json.properties == undefined) json.properties = {};
                if (json.properties.css == undefined) json.properties.css = {};
                json.properties.css.width = thisExpressCheckOutServices.forcedWidth;
            }
            if (thisExpressCheckOutServices.forcedTop != "") {
                if (json.properties == undefined) json.properties = {};
                if (json.properties.css == undefined) json.properties.css = {};
                json.properties.css.top = thisExpressCheckOutServices.forcedTop;
            }
            thisExpressCheckOutServices.blockUI.init(json);
            thisExpressCheckOutServices.blockUI.show(thisExpressCheckOutServices.infoBoxId);

            $('.blockPage .contentSection').removeClass('scrollDefault');
            $('.blockUI.sectionBorder_lightBox.blockPage').addClass('expressFee_lightBox');

            var realContentHeight = $('#realContent').outerHeight();
            if ($('.blockPage .contentSection').height() > realContentHeight) {
                $('.blockPage .contentSection').removeAttr('style');
                $('.blockPage .contentSection').attr('style', 'height:' + realContentHeight + 'px !important;');
            }
        };

        thisExpressCheckOutServices.SelectNoSeat = function () {
            $("#noChooseSeats").click();
        };
        thisExpressCheckOutServices.SelectNoBag = function () {
            $("#handBaggage").click();
        };
        thisExpressCheckOutServices.SelectNoInsure = function () {
            $("#insure_SENO").click();
        };

        return thisExpressCheckOutServices;
    };
    /*
    ---------------------------------------------------------------------------------------------------------------------------------------
    Functions to execute in all pages when it is Ready or Load
    ---------------------------------------------------------------------------------------------------------------------------------------
    */

    VUELING.applyJqueryMenuSelect = function () {

    };


    VUELING.trackingFunction = function (parameter, eventName, description) {
        var lastchar = eventName.substring(eventName.length - 1, eventName.length);
        var eventsString = eventName;
        if (lastchar == ',') {
            eventsString = eventName.substring(0, eventName.length - 1);
        };

        var lastchar2 = description.substring(description.length - 1, description.length);
        var descriptionString = description;
        if (lastchar2 == ',') {
            descriptionString = descriptionString.substring(0, descriptionString.length - 1);
        };

        var s = s_gi(s_account);
        s.linkTrackVars = "events";
        s.linkTrackEvents = eventsString;
        s.events = eventsString;

        if (parameter != '') {
            if (parameter == 's.prop54') {
                var locationHash = location.hash;
                switch (locationHash) {
                    case "#error":
                        s.prop54 = "Error";
                        break;
                    case "#av":
                        s.prop54 = "Asistente";
                        break;
                    default:
                        s.prop54 = "Facebook";
                        break;
                }
                s.linkTrackVars = "prop54, events";
            }
            else if (parameter == 's.prop50') {
                s.prop50 = window.location.pathname;
                s.linkTrackVars = "prop50, events";
            }
            else {
                var expression = new String(parameter + " = '" + description + "'");
                eval(expression.toString());
                var paramsnum = parameter.split(".");
                s.linkTrackVars = paramsnum[1] + ", events";
            }
        }
        s.tl(this, 'o', descriptionString);

    };

    VUELING.trackingEvents = function () {

        $("#validQuickSearchButton").click(function () { VUELING.trackingFunction('', 'event2', 'Compra Express started'); });


        // Iniciar sesión área privada
        $("#goToLoginMyVueling").click(function () { VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesion MyVueling'); });
        $("#loginNow").click(function () { VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesion MyVueling'); });
        $("#MemberLoginScheduleSelectView_LinkButtonLogIn").click(function () { VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesion MyVueling'); });
        $("#MemberLoginContactView_LinkButtonLogIn").click(function () { VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesion MyVueling'); });
        $("#MemberLoginServicesView_LinkButtonLogIn").click(function () { VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesion MyVueling'); });
        $("#MemberLoginPaymentTopView_LinkButtonLogIn").click(function () { VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesion MyVueling'); });
        $("#ChatButtonErrorTopPage").click(function () {
            ANB_ChatWindow("error");
            return false;
        });
        $("#ChatButtonErrorPageComplete").click(function () {
            ANB_ChatWindow("error");
            return false;
        });

        //ContactPage PopUpChatButton
        $("#CallMeBackView_DropDown").click(function () { VUELING.trackingFunction('', 'event87', 'Click desplegar ventana CallMeBack'); });
        $("#CallMeBackView_LinkCall").click(function () { VUELING.trackingFunction('', 'event89', 'Click Iniciar Llamada'); });
        $("#CallMeBackView_LinkChat").click(function () {
            VUELING.trackingFunction('', 'event88', 'Click Iniciar chat');
            ANB_ChatWindow("CallMeBack");
            return false;
        });



        //Cerrar sesión área privada
        $("#StaticHeaderViewSearchView_MemberLoginHeaderSearchView_LinkButtonLogOut").click(function () { VUELING.trackingFunction('', 'event35', 'Cerrar sesion MyVueling'); });
        $("#StaticHeaderViewRegisterView_MemberLoginHeaderRegisterView_LinkButtonLogOut").click(function () { VUELING.trackingFunction('', 'event35', 'Cerrar sesion MyVueling'); });
        $("#MemberLoginScheduleSelectView_LinkButtonLogOut").click(function () { VUELING.trackingFunction('', 'event35', 'Cerrar sesion MyVueling'); });
        $("#MemberLoginContactView_LinkButtonLogOut").click(function () { VUELING.trackingFunction('', 'event35', 'Cerrar sesion MyVueling'); });
        $("#MemberLoginServicesView_LinkButtonLogOut").click(function () { VUELING.trackingFunction('', 'event35', 'Cerrar sesion MyVueling'); });
        $("#MemberLoginPaymentTopView_LinkButtonLogOut").click(function () { VUELING.trackingFunction('', 'event35', 'Cerrar sesion MyVueling'); });

        //DoubleClick
        $("#doubleClickWebloyaltyImg").click(function () { VUELING.trackingFunction('', 'event15', 'Click en imagen de Webloyalty'); });

        //Reserva de vuelos:Selecciona tu vuelo
        $("#calendar_link_0").click(function () { VUELING.trackingFunction('', 'event7', 'Ir a vista mensual'); });

        $("#newSearch").click(function () { VUELING.trackingFunction('', 'evento68', 'Nueva Búsqueda'); });
        $("#atAGlanceModifySearchLink").click(function () { VUELING.trackingFunction('', 'evento68', 'Nueva Búsqueda'); });
        $("#TaxAndFeeCurrencyConverterControlSelectView_CurrencyConverterControlSelectView_DropDownListConversionCurrency").click(function () { VUELING.trackingFunction('', 'evento67', 'Cambia de divisa'); });

        $("#CONTROLGROUPMAINCONTACT_CONTROLGROUPCONTACTCONTROLS_ContactInputView_CheckBoxPromoOpt").click(function () { VUELING.trackingFunction('', 'event9', 'Alta pedida News'); });

        $("#ControlGroupScheduleSelectView_AvailabilityInputScheduleSelectView_PromoCodeScheduleSelectView_LinkButtonApplyPromo").click(function () { VUELING.trackingFunction('', 'event8', 'Código de descuento añadido'); });

        //Selecciona tu vuelo: Combos de ordenación de resultados de availability
        $("#dropDownListSorter0").change(function () { VUELING.trackingFunction('', 'event92', 'Reordenación de vuelos por precio/fecha combo ida'); });
        $("#dropDownListSorter1").change(function () { VUELING.trackingFunction('', 'event92', 'Reordenación de vuelos por precio/fecha combo vuelta'); });

        //TODO:          Código de descuento incorrecto


        //            VUELING.trackingFunction('','event18', 'Product Views');


        //TODO:          Compra Express started
        //Reserva de vuelos:Selecciona tu vuelo


        //Reserva de vuelos: Tu vuelo
        $("#TaxAndFeeCurrencyConverterControlSelectView_CurrencyConverterControlSelectView_DropDownListConversionCurrency").click(function () { VUELING.trackingFunction('', 'event67', 'Cambia de divisa'); });


        //            VUELING.trackingFunction('','event28', 'Flight Selected TV');


        //TODO:          Compra Express started
        //Reserva de vuelos: Tu vuelo



        //Reserva de vuelos:Personaliza tu vuelo
        //TODO:          Compra Express started
        //Reserva de vuelos:Personaliza tu vuelo

        //Reserva de vuelos:Forma de Pago

        //            VUELING.trackingFunction('','scCheckout', 'scCheckout');


        //TODO:          Compra Express started
        //Reserva de vuelos:Forma de Pago

        $("#CurrencyConverterPaymentView_DropDownListConversionCurrency").click(function () { VUELING.trackingFunction('', 'event67', 'Cambia de divisa'); });


        //Reserva de vuelos:Itinerario

        //            VUELING.trackingFunction('','Purchase', 'evento Purchase contador (PNRs)');

        //TODO:          PNR
        //Reserva de vuelos:Itinerario


        //MyVueling
        //TODO:         MyVueling:Alta confirmada 1	MyVueling:Alta confirmada 2
        //TODO:         Alta pedida MyVueling	Alta confirmada MyVueling

        //MyVueling:Home
        if (window.location.pathname.indexOf("HomePrivateArea") != -1) {
            VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesión MyVueling');
            //MyVueling:Home
            //MyVueling
        };
        //Acceso a Pago Post-Venta
        if (window.location.pathname.indexOf("PaymentChange") != -1) {
            VUELING.trackingFunction('', 'event33', 'Acceso a pago post-venta');

        };


        //Check in Online empezado			1	event49		Evento lanzado al comenzar el check-in online
        if (window.location.pathname.indexOf("SearchWebCheckin.aspx") != -1) {
            VUELING.trackingFunction('', 'event49', 'Check in Online empezado');

        };

        //MyVueling:Home
        if (window.location.pathname.indexOf("HomePrivateArea") != -1) {
            VUELING.trackingFunction('s.prop50', 'event34', 'Iniciar sesión MyVueling');
            //MyVueling:Home
            //MyVueling
        };


        // Family Fares

        //Un evento (evento72) que recopila las veces que se muestra la capa en PTV. 
        var element = document.getElementById("blockUIPopUpForContingencyServices");
        if (element != null) {
            VUELING.trackingFunction('', 'event72', 'Capa mostrada en PTV');
        }

        //Un evento (evento74) que se lanza de forma asíncrona sin pageview cuando el clientCONTROLGROUPSERVICES_LinkButtonSubmite selecciona quedarse en PTV y añadir más Ancillaries. Este evento se debe lanzar cuando hace click en la opción de texto ofrecido o la “X” en la capa. 
        $("#ContingencyServicesClosePref").click(function () { VUELING.trackingFunction('', 'event74', 'Quedarse en PTV y añadir más ancillaries'); });
        $("#ContingencyServicesClose").click(function () { VUELING.trackingFunction('', 'event74', 'Quedarse en PTV y añadir más ancillaries'); });

        //Un evento (evento73) que se lanza de forma asíncrona sin pageview cuando el cliente selecciona avanzar a FDP con las condiciones propuestas por vueling.
        $("#blockUIPopUpForContingencyServices #CONTROLGROUPSERVICES_LinkButtonSubmit").click(function () { VUELING.trackingFunction('', 'event73', 'Avanzar a FDP con condiciones propuestas por Vueling'); });


        $("#list-invoice").click(function () { VUELING.trackingFunction('', 'event15', 'Conectar con GAC'); });
        $("#group-reservation").click(function () { VUELING.trackingFunction('', 'event17', 'Conectar con Grupos'); });
        if ($('#agenciasBody').size() > 0)
            $("#topLinkGroups").click(function () { VUELING.trackingFunction('', 'event17', 'Conectar con Grupos'); });

        if (window.location.pathname.indexOf("WebCheckinSummary.aspx") != -1) {
            //Un evento (event17) que se lanza de forma asíncrona cuando se hace click en enviar documentos del check-in a PDF.
            $("#WebCheckinSummaryView1_getPdf").click(function () { VUELING.trackingFunction('', 'event17', 'ImprimirPDFCheckinSummary'); });
            $("#WebCheckinSummaryView2_getPdf").click(function () { VUELING.trackingFunction('', 'event17', 'ImprimirPDFCheckinSummary'); });

            //Un evento (event41) que se lanza de forma asíncrona cuando se hace click en enviar documentos del check-in via SMS.
            $("#WebCheckinSummaryCheckinSummaryView_sms_formsend").click(function () { VUELING.trackingFunction('', 'event41', 'EnviarSMSCheckinSummary'); });
        }


        if (window.location.pathname.indexOf("WebCheckin.aspx") != -1 || window.location.pathname.indexOf("WebCheckin.aspx#") != -1
            || window.location.pathname.indexOf("WebCheckin1.aspx") != -1 || window.location.pathname.indexOf("WebCheckin1.aspx#") != -1) {
            //Un evento (event43) que se lanza de forma asíncrona cuando se hace click al seleccionar asiento autoasignado en WebCheckin.
            $("#btFreeSeats").click(function () { VUELING.trackingFunction('', 'event43', 'Asiento autoasignado'); });
            $("#sec5").click(function () { VUELING.trackingFunction('', 'event43', 'Asiento autoasignado'); });

            //Un evento (event42) que se lanza de forma asíncrona cuando se hace click al seleccionar asiento de pago en WebCheckin.
            $("#btAdd").click(function () { VUELING.trackingFunction('', 'event42', 'Asiento de pago'); });
            $("#sec1").click(function () { VUELING.trackingFunction('', 'event42', 'Asiento de pago'); });
            $("#sec2").click(function () { VUELING.trackingFunction('', 'event42', 'Asiento de pago'); });
            $("#sec3").click(function () { VUELING.trackingFunction('', 'event42', 'Asiento de pago'); });
            $("#sec4").click(function () { VUELING.trackingFunction('', 'event42', 'Asiento de pago'); });
        }

    };

    VUELING.applyJqueryMenuSelectWithObject = function (object, styleClasses) {

        //        if (styleClasses)
        //            object.siblings('a.ui-selectmenu').addClass(styleClasses);
    };
    VUELING.Util.ready = function () {
        // Ejecute When Page Is Ready (For Vueling Custom Functions)
    };
    VUELING.Util.load = function () {
        // Ejecute When Page Is Load (For Vueling Custom Functions)
        //VUELING.applyJqueryMenuSelect();
        VUELING.trackingEvents();
    };

    VUELING.Util.ForceChangeToValidate = function (e) {
        if(!($.browser.msie && $.browser.version <= 8)) {
            var controlId = e.getAttribute("id").replace(/_[a-zA-Z0-9]+$/, "");
            controlId = controlId + "_";

            $("fieldset input[id^=" + controlId + "], fieldset select[id^=" + controlId + "]").blur();
        }
        return SKYSALES.Util.validate(e);
    }

    $(document).ready(VUELING.Util.ready);
    $(window).load(VUELING.Util.load);
}());