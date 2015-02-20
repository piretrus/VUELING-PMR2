/*=================================================================================================
This file is part of the Navitaire NewSkies application.
© 2010 Navitaire, a division of Accenture LLP  All Rights Reserved
=================================================================================================*/

/*global $ SKYSALES window Option document */

if (SKYSALES.Class.Cancel === undefined)
{
    /*
    Class Cancel
    */
    SKYSALES.Class.Cancel = function ()
    {
        var thisCancel = this;
        var cancelArray = [];
        /*
            Cancel extends CancelBase
        */
        var Cancel = function ()
        {
            var cancelBase = new SKYSALES.Class.CancelBase();
            var thisCancel = SKYSALES.Util.extendObject(cancelBase);
            return thisCancel;
        };
        thisCancel.addCancel = function (paramObj)
        {
            var cancel = new Cancel();
            cancel.init(paramObj);
            cancelArray[cancelArray.length] = cancel;
        };
        return thisCancel;
    };
    SKYSALES.Class.Cancel.initializeCancel = function ()
    {
        var paramObject = {
            objNameBase: 'cancel',
            objType: 'Cancel',
            selector: 'div.cancelContainer'
        };
        SKYSALES.Util.initializeNewObject(paramObject);
    };
    $(document).ready(SKYSALES.Class.Cancel.initializeCancel);
}

