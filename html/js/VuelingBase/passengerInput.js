/*
    Dependencies:
        This file depends on other JavaScript files to be there at run time.
        
        jquery.js:
            $ is a jquery variable
        common.js:
            SKYSALES namespace is used to avoid name collisions.

    General Notes:
        This is the base file for passengerInput view
        
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

//Replacement of a ton of script in the passenger control

/*global contactData: false, $: false */
function populatePassenger(object, index)
{
    var fieldsetIndex = 0,
    passengerFields = null,
    fieldIdentifiers = null;
    
    //Don't even do anything unless contactData is available
    if(contactData){ 
    //get the fieldset that has all the fields for the passenger passed in
    var fieldsetIndex = index - 1;
    var passengerFields = $('#passengerInputContent>fieldset:eq(' + fieldsetIndex + ')');
    //these are the items that are maped to the contactData item included in the passengerFields control
        var fieldIdentifiers = [
            {'name': 'DropDownListTitle', 'value': contactData.title},
            {'name': 'TextBoxFirstName', 'value': contactData.firstName},
            {'name': 'TextBoxMiddleName', 'value': contactData.middleName},
            {'name': 'TextBoxLastName', 'value': contactData.lastName},
            {'name': 'TextBoxCustomerNumber', 'value': contactData.customerNumber},
            {'name': 'DropDownListBirthDateDay', 'value': contactData.bdayDay},
            {'name': 'DropDownListBirthDateMonth', 'value': contactData.bdayMonth},
            {'name': 'DropDownListBirthDateYear', 'value': contactData.bdayYear},
            {'name': 'DropDownListGender', 'value': contactData.gender},
            {'name': 'DropDownListNationality', 'value': contactData.nationality},
            {'name': 'DropDownListResidentCountry', 'value': contactData.countryOfResidence},
            {'name': 'TextBoxProgramNumber', 'value': contactData.programNumber},
            {'name': 'DropDownListProgram', 'value': contactData.programCode}
       ];
    }
    
    var isChecked = false;
    if (object && object.id)
    {
        isChecked = $('#' + object.id).is(':checked');
    }
    if (isChecked)
    {
        $.map(fieldIdentifiers, function (obj) {
            if (obj)
            {
                $(":input[id*=" + obj.name + "]", passengerFields).val(obj.value);
            }
        });         
    }
    else {
        $.map(fieldIdentifiers, function (obj) {
            if (obj)
            {
                $(":input[id*=" + obj.name + "]", passengerFields).val('');
            }
        });  
    }      
}
