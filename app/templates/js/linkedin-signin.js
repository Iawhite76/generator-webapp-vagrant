var member;

function isAndroid(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1;
}

function isIOS7(){
    return navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i);
}

function queueReload(){
    // Fix for iOS 7 Bug
    if(isIOS7()){
        setTimeout(function(){location.reload()}, 2000);
    }
}

function onLinkedInLoad() {
    queueReload();
    IN.UI.Authorize().place();
    IN.Event.on(IN, "auth", function () { checkLinkedIn(); });
}

function checkLinkedIn() {
    IN.API.Profile("me").result(displayResult);
    loadData();
    dcsMultiTrack('DCSext.pSA', 'retail-d2c-2014', 'DCSext.pSU', 'allow-access-linkedin', 'DCSext.pPID', 'Plastics_us_en_retail-d2c-2014_allow-access-linkedin');
}

function displayResult(profiles) {
    member = profiles.values[0];
}

function loadData() {



    IN.API.Profile("me")
        .fields(["id", "firstName", "lastName", "headline", "emailAddress", "phone-numbers","positions:(title,company)"])
        .result(function(result) {

            // Define variables
            var firstName, lastName, emailAddress, title, company, phone = "";

            // Get the Profile object
            var profile = result.values[0];

            // Get the first name
            if(profile.firstName){
                firstName = profile.firstName;
            }

            // Get the last name
            if(profile.lastName){
                lastName = profile.lastName;
            }

            // Get the email address
            if(profile.emailAddress){
                emailAddress = profile.emailAddress;
            }

            // Get the phone number
            if(profile.phoneNumbers.values){
                phone = profile.phoneNumbers.values[0].phoneNumber;
            }

            // Get the user's current company and title
            if(profile.positions){
                company = profile.positions.values[0].company.name;
                title = profile.positions.values[0].title;
            }

            // Get the user's headline (will update title/company if not set by above
            if(profile.headline){

                if(profile.headline.indexOf(" at ") !== -1){
                    if(title == ""){
                        title = profile.headline.substring( 0, profile.headline.indexOf(" at ") );
                    }
                    if(company == ""){
                        company = profile.headline.substring( profile.headline.indexOf(" at ")+4 );
                    }
                }else{
                    if(title == ""){
                        title = profile.headline;
                    }
                }

            }

            // Populate fields
            $("#control_NameFirst").val(firstName);
            $("#control_NameLast").val(lastName);
            $("#control_Email").val(emailAddress);
            $("#control_JobTitle").val(title);
            $("#control_CompanyName").val(company);
            $("#control_PhoneNumber").val(phone);
        });
}