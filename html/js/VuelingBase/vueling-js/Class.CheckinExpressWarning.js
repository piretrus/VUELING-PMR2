

VUELING.Class.CheckinExpressWarning = function () {
    var parent = SKYSALES.Class.SkySales(),
        checkinExpressWarning = SKYSALES.Util.extendObject(parent);

    checkinExpressWarning.IdCheckinExpressWarningContent = '';
    checkinExpressWarning.IdCheckinExpressWarningIda = '';
    checkinExpressWarning.IdCheckinExpressWarningIdaVuelta = '';
    checkinExpressWarning.IdCheckinExpressWarningVuelta = '';
    checkinExpressWarning.routeReplaceToken = '';
    checkinExpressWarning.routeIda = '';
    checkinExpressWarning.routeVuelta = '';

    checkinExpressWarning.init = function (json) {
        this.setSettingsByObject(json);
    };

    checkinExpressWarning.showContent = function (journeyIdaHasExeptions, journeyVueltaHasExeptions) {
        var typeWarning = $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).attr("typeWarning");

        switch (typeWarning) {
            case "MasDeSieteDiasIdaVuelta":
                {
                    var textToReplace = $('#MasDeSieteDiasIdaVuelta').text();
                    var textReplaced = textToReplace;

                    if (journeyIdaHasExeptions == "false" && journeyVueltaHasExeptions == "false") {
                        textReplaced = this.replaceTextWithRoute(textToReplace, '');
                    }
                    else if (journeyIdaHasExeptions == "true") {
                        textReplaced = this.replaceTextWithRoute(textToReplace, checkinExpressWarning.routeVuelta);
                    }
                    else if (journeyVueltaHasExeptions == "true") {
                        textReplaced = this.replaceTextWithRoute(textToReplace, checkinExpressWarning.routeIda);
                    }

                    $('#MasDeSieteDiasIdaVuelta').text(textReplaced);

                    $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).show();
                    break;
                }
            case "MenosDeSieteDiasIdaVuelta":
                {
                    var textToReplace = $('#MenosDeSieteDiasIdaVuelta').text();
                    var textReplaced = textToReplace;

                    if (journeyIdaHasExeptions == "false" && journeyVueltaHasExeptions == "false") {
                        textReplaced = this.replaceTextWithRoute(textToReplace, '');
                    }
                    else if (journeyIdaHasExeptions == "true") {
                        textReplaced = this.replaceTextWithRoute(textToReplace, checkinExpressWarning.routeVuelta);
                    }
                    else if (journeyVueltaHasExeptions == "true") {
                        textReplaced = this.replaceTextWithRoute(textToReplace, checkinExpressWarning.routeIda);
                    }

                    $('#MenosDeSieteDiasIdaVuelta').text(textReplaced);

                    $('#' + checkinExpressWarning.IdCheckinExpressWarningIdaVuelta).show();
                    $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).show();
                    break;
                }
            case "MenosDeSieteDiasIda_MasDeSieteVuelta":
                {
                    if (journeyIdaHasExeptions == "false")
                        $('#' + checkinExpressWarning.IdCheckinExpressWarningIda).show();

                    if (journeyVueltaHasExeptions == "false")
                        $('#' + checkinExpressWarning.IdCheckinExpressWarningVuelta).show();

                    $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).show();
                    break;
                }
            case "MenosDeUnaHoraIdaVuelta":
                {
                    $('#' + checkinExpressWarning.IdCheckinExpressWarningIdaMenosCuatro).show();
                    $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).show();
                    break;
                }
            case "MenosDeUnaHoraIdaVuelta":
                {
                    $('#' + checkinExpressWarning.IdCheckinExpressWarningIdaMenosCuatro).show();
                    $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).show();
                    break;
                }
            case "IdaVoladaMenosDeSieteVuelta": case "IdaVoladaMasDeSieteVuelta":
                $('#' + checkinExpressWarning.IdCheckinExpressWarningContent).show();
                break;
        }
    };

    checkinExpressWarning.showIda = function () {
        if ($('#' + checkinExpressWarning.IdCheckinExpressWarningIdaVuelta).attr("typeWarning") == "MenosDeSieteDiasIdaVuelta")
            checkinExpressWarning.showContent();
        else
            $('#' + checkinExpressWarning.IdCheckinExpressWarningIda).show();
    };

    checkinExpressWarning.showVuelta = function () {
        if ($('#' + checkinExpressWarning.IdCheckinExpressWarningIdaVuelta).attr("typeWarning") == "MenosDeSieteDiasIdaVuelta")
            checkinExpressWarning.showContent();
        else
            $('#' + checkinExpressWarning.IdCheckinExpressWarningVuelta).show();
    };

    checkinExpressWarning.replaceTextWithRoute = function (textToReplace, route) {
        return textToReplace.replace(checkinExpressWarning.routeReplaceToken, route);
    };

    return checkinExpressWarning;
};