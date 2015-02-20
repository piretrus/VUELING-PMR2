///#source 1 1 /skysales/js/VuelingBase/vueling-js/Class.ShareInSocial.js
VUELING.Class.ShareInSocial = function() {
    var parent = new SKYSALES.Class.SkySales(),
        thisClass = SKYSALES.Util.extendObject(parent);

    thisClass.SocialShareGivePointsUrl = null;
    thisClass.SessionId = null;

    thisClass.shareGoogle = 0;
    thisClass.shareTwitter = 0;
    thisClass.shareFacebook = 0;

    thisClass.buttonGoogleId = "";
    thisClass.buttonTwitterId = "";
    thisClass.buttonFacebookId = "";

    thisClass.valueGoogleId = "";
    thisClass.valueTwitterId = "";
    thisClass.valueFacebookId = "";

    thisClass.divValuesId = "";

    thisClass.textViewPointsId = "";

    thisClass.totalWinTextId = "";
    thisClass.twitterTextParam = "";
    thisClass.twitterUrlParam = "";

    thisClass.facebookUrlParam = "";

    thisClass.facebookIdSharePoints = "";

    thisClass.mensajeCompartir1 = "";
    thisClass.mensajeCompartir2 = "";
    thisClass.mensajeCompartir3 = "";
    thisClass.mensajeCompartirFinal = "";

    thisClass.rrssUsadas = 0;

    thisClass.buttonGoogleElement = null;
    thisClass.valueGoogleElement = null;
    thisClass.buttonTwitterElement = null;
    thisClass.valueTwitterElement = null;
    thisClass.buttonFacebookElement = null;
    thisClass.valueFacebookElement = null;
    thisClass.divValuesElement = null;
    thisClass.textViewPointsElement = null;
    thisClass.totalWinTextElement = null;

    thisClass.isIE = "";

    thisClass.init = function(json) {
        this.setSettingsByObject(json);
        this.setVars();
        this.addEvents();
    };

    thisClass.setVars = function() {
        thisClass.buttonGoogleElement = $("#" + thisClass.buttonGoogleId);
        thisClass.buttonTwitterElement = $("#" + thisClass.buttonTwitterId);
        thisClass.buttonFacebookElement = $("#" + thisClass.buttonFacebookId);
        thisClass.valueGoogleElement = $("#" + thisClass.valueGoogleId);
        thisClass.valueTwitterElement = $("#" + thisClass.valueTwitterId);
        thisClass.valueFacebookElement = $("#" + thisClass.valueFacebookId);
        thisClass.divValuesElement = $('#' + thisClass.divValuesId);
        thisClass.textViewPointsElement = $("#" + thisClass.textViewPointsId);
        thisClass.totalWinTextElement = $("#" + thisClass.totalWinTextId);
        thisClass.isIE = (window.navigator.userAgent.indexOf("MSIE") != -1
            || (window.navigator.userAgent.indexOf("rv:11") != -1));
    };

    thisClass.addEvents = function() {
        this.setTwitter();
        this.loadFacebook();
        this.loadGooglePlus();
        if (thisClass.isIE) {
            thisClass.buttonTwitterElement.click(function () {
                window.open(thisClass.buttonTwitterElement.attr("href"), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
                thisClass.givePointsSuccess(0, "Twitter");
            });
        }
    };

    thisClass.setTwitter = function() {
        thisClass.buttonTwitterElement.attr("href",
            "https://twitter.com/intent/tweet?text=" + thisClass.uriencode(thisClass.twitterTextParam) + "&url=" + thisClass.uriencode(thisClass.twitterUrlParam));
    };

    if (!($.browser.msie && $.browser.version <= 8)) {
        twttr.ready(function(twttr) {
            //This event will be triggered when the user publishes a Tweet (either new, or a reply)
            //through the Tweet Web Intent.
            twttr.events.bind('tweet', function(event) {
                //TODO TRUST2P-33
                //Por politica de uso ni Facebook ni G+ admiten ganar puntos de ningun tipo usando publicaciones
                //via su plataforma, por lo tanto se deshabilita la obtencion de puntos pero se facilita al usuario
                //poder publicar un mensaje.
                //thisClass.givePoints("Twitter");
                thisClass.givePointsSuccess(0, "Twitter");
            });
        });
    } else {
        thisClass.buttonTwitterElement.removeAttr("href");
    }

    thisClass.loadFacebook = function() {
        thisClass.buttonFacebookElement.click(function () {
            if (thisClass.isIE) {
                thisClass.givePointsSuccess(0, "Facebook");
            }
            FB.ui(
                {
                    method: 'feed',
                    link: thisClass.facebookUrlParam
                },
                thisClass.responseFacebook
            );
        });
        FB.init({
            appId: thisClass.facebookIdSharePoints,
            status: true,
            xfbml: true,
            version: 'v2.2'
        });
    };

    thisClass.loadGooglePlus = function() {
        thisClass.buttonGoogleElement.click(function () {
            thisClass.responseGooglePlus();
         });
    };

    thisClass.responseFacebook = function (response) {
        if (response) {
            if (response.post_id) { //Solo llega si el usuario ha compartido correctamente
                //TODO TRUST2P-33
                //Por politica de uso ni Facebook ni G+ admiten ganar puntos de ningun tipo usando publicaciones
                //via su plataforma, por lo tanto se deshabilita la obtencion de puntos pero se facilita al usuario
                //poder publicar un mensaje.
                //thisClass.givePoints("Facebook");
                thisClass.givePointsSuccess(0, "Facebook");
            }
        }
    };

    thisClass.responseGooglePlus = function (response) {
        //TODO TRUST2P-33
        //Por politica de uso ni Facebook ni G+ admiten ganar puntos de ningun tipo usando publicaciones
        //via su plataforma, por lo tanto se deshabilita la obtencion de puntos pero se facilita al usuario
        //poder publicar un mensaje.
        //thisClass.givePoints("Google+");
        thisClass.givePointsSuccess(0, "Google+");
    };

    thisClass.givePoints = function (network) {
        $.ajax({
            type: "GET",
            url: thisClass.SocialShareGivePointsUrl + "/GivePoints",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            data: { "network": network, "sessionid": thisClass.SessionId },
            success: function (data) { 
                thisClass.givePointsSuccess(data, network); 
            },
            error: function () { }
        });
    };

    thisClass.givePointsSuccess = function(data, network){
        thisClass.rrssUsadas++;
        switch(network) {
            case "Google+":
                if (data > 0) {
                    thisClass.shareGoogle = parseInt(data);
                    thisClass.valueGoogleElement.text('+' + data);
                }
                thisClass.buttonGoogleElement.removeClass("btDisable").addClass("btSocial--active");
                thisClass.buttonGoogleElement.removeAttr("href");
                thisClass.buttonGoogleElement.attr('onclick', '').unbind('click');
                break;
            case "Twitter":
                if (data > 0) {
                    thisClass.shareTwitter = parseInt(data);
                    thisClass.valueTwitterElement.text('+' + data);
                }
                thisClass.buttonTwitterElement.removeClass("btDisable").addClass("btSocial--active");
                thisClass.buttonTwitterElement.removeAttr("href");
                break;
            case "Facebook":
                if (data > 0) {
                    thisClass.shareFacebook = parseInt(data);
                    thisClass.valueFacebookElement.text('+' + data);
                }
                thisClass.buttonFacebookElement.removeClass("btDisable").addClass("btSocial--active");
                thisClass.buttonFacebookElement.unbind("click");
                break;
        };

        thisClass.divValuesElement.css("display", "block");
        thisClass.textViewPointsElement.removeClass("hidden");

        thisClass.totalWinTextElement.text("");
        if (thisClass.rrssUsadas == 1) {
            thisClass.totalWinTextElement.text(thisClass.mensajeCompartir1);
        } else if (thisClass.rrssUsadas == 2) {
            thisClass.totalWinTextElement.text(thisClass.mensajeCompartir2);
        } else if (thisClass.rrssUsadas >= 3) {
            thisClass.totalWinTextElement.html("<strong>" + thisClass.mensajeCompartir3 + "</strong><br>" + thisClass.mensajeCompartirFinal);
        }

    };

    thisClass.uriencode = function (str) {
        return encodeURIComponent(str);
    };

    return thisClass;
};