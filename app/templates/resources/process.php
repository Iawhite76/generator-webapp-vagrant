<?php
error_reporting(E_ALL ^ E_NOTICE);
require_once('classes/EngagePod.php');
require_once('classes/FormValidator.php');

if (isset($_POST['posted']) && $_POST['posted'] == "True"){
    $silverpop = new EngagePod(array(
        'username'       => $_SERVER['ENGAGE_USERNAME'],
        'password'       => $_SERVER['ENGAGE_PASSWORD'],
        'engage_server'  => $_SERVER['ENGAGE_SERVER'],
    ));
    $validations = array(
        'NameFirst'             => 'name',
        'NameLast'              => 'name',
        'CompanyName'           => 'alfanum',
        'Email'                 => 'email',
        'PhoneNumber'           => 'phone',
        'ZipPostalCode'         => 'zipcode',
        'JobTitle'              => 'alfanum',
        'OptIn'                 => 'name'
    );
    $required = array(
        'NameFirst',
        'NameLast',
        'CompanyName',
        'Email',
        'PhoneNumber',
        'ZipPostalCode'
    );
    $sanitize = array(
        'NameFirst',
        'NameLast',
        'CompanyName',
        'Email' => 'email',
        'PhoneNumber',
        'ZipPostalCode',
        'Referrer',
        'RegionCode',
        'CountryCode',
        'LanguageCode',
        'CampaignID',
        'WebtrendsID',
        'BotTrap'
    );
    $equals = array(
        'RegionCode'            => $_SERVER['REGION_CODE'],
        'CountryCode'           => $_SERVER['COUNTRY_CODE'],
        'LanguageCode'          => $_SERVER['LANGUAGE_CODE'],
        'CampaignID'            => $_SERVER['CAMPAIGN_ID']
    );
    $data = array(
        'NameFirst'             => $_POST['NameFirst'],
        'NameLast'              => $_POST['NameLast'],
        'CompanyName'           => $_POST['CompanyName'],
        'Email'                 => $_POST['Email'],
        'PhoneNumber'           => $_POST['PhoneNumber'],
        'ZipPostalCode'         => $_POST['ZipPostalCode'],
        'RegionCode'            => $_POST['RegionCode'],
        'CountryCode'           => $_POST['CountryCode'],
        'LanguageCode'          => $_POST['LanguageCode'],
        'CampaignID'            => $_POST['CampaignID'],
        'WebtrendsID'           => $_POST['WebtrendsID'],
        'BotTrap'               => $_POST['BotTrap'],
        'Referrer'              => $_POST['Referrer']
    );
    $validator = new FormValidator($validations, $required, $sanitize, $equals);
    $response = "";
    if ($validator->validate($data)) {
        $error = false;
        $data = $validator->sanitize($data);
        $response = $silverpop->addContact($_SERVER['ENGAGE_DB_ID'], true, $data);
    } else {
        $error = true;
        $response = $validator->getJSON();
    }

    echo $response;

}else{
    header('HTTP/1.0 400 Bad Request');
}

?>