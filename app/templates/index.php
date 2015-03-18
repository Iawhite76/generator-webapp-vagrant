<?php
    if (isset($_SERVER['ENV']) && $_SERVER['ENV'] !== "dev" && $_SERVER['ENV'] !== "internal") {
        if($_SERVER['SERVER_PORT'] != '443') { header('Location: https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); exit(); }
    }

    <% if (formValidation) { %>
      require('resources/functions.php');
    <% } %>
   
?><!doctype html>
<!--[if IE 8]>         <html lang="en-US" class="no-js lt-ie10 lt-ie9 ie8"> <![endif]-->
<!--[if IE 9]>         <html lang="en-US" class="no-js lt-ie10 ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en-US" class="no-js"> <!--<![endif]-->
  <head>

    <meta charset="utf-8">
    <title>Project Name</title>
    <meta name="description" content="">
    <% if (!disableResponsive) { %><meta name="viewport" content="width=device-width"><% } %>
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="shortcut icon" href="/favicon.ico">
    <!-- build:css css/production.min.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
    <!-- endbower -->
    <link rel="stylesheet" href="css/main.css" />
    <!-- endbuild -->

  
  </head>
  
  <body>

  <div class="container">
    <div class="header"> </div><!-- /.header -->

    <div class="content">
        <% if (multiPage) { %>
        <?php 
          
          include 'resources/router.php';
          
        ?>
        <% } else { %>
        <h1>Ready</h1>
        <% } %>

        <% if (formValidation && !multiPage) { %>
        <form id="contact-us" role="form" novalidate>
          <div class="row">
              <div class="col-xs-12 col-md-6">
                <div class="form-group">
                  <label for="control_NameFirst" id="label_NameFirst" class="control-label">First Name<span class="required">*</span></label>
                  <input type="text" id="control_NameFirst" name="NameFirst" class="form-control input" tabindex="1" maxlength="25" />
                </div>
              </div>

              <div class="col-xs-12 col-md-6">
                <div class="form-group">
                  <label for="control_NameLast" id="label_NameLast" class="control-label">Last Name<span class="required">*</span></label>
                  <input type="text" id="control_NameLast" name="NameLast" class="form-control input" tabindex="2" maxlength="25" />
                </div>
              </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <label for="control_JobTitle" id="label_JobTitle" class="control-label">Job Title</label>
                <input type="text" id="control_JobTitle" name="JobTitle" class="form-control input" tabindex="3" />
              </div>
            </div>

            <div class="col-xs-12 col-md-6">
              <div class="form-group">
                <label for="control_CompanyName" id="label_CompanyName" class="control-label">Company Name<span class="required">*</span></label>
                <input type="text" id="control_CompanyName" name="CompanyName" class="form-control input" tabindex="4" />
              </div>
            </div>
          </div>

        

          <div class="row">
            <div class="col-xs-12">
              <div class="form-group">
                <label for="control_Email" id="label_Email" class="control-label">Email<span class="required">*</span></label>
                <input type="email" id="control_Email" name="Email" class="form-control input" tabindex="5" />
              </div>
            </div>
          </div>

          <div class="row">
              <div class="col-xs-12 col-md-6">
                <div class="form-group">
                  <label for="control_PhoneNumber" id="label_PhoneNumber" class="control-label">Telephone Number<span class="required">*</span></label>
                  <input type="text" id="control_PhoneNumber" name="PhoneNumber" class="form-control input" tabindex="6" />
                </div>
              </div>
              <div class="col-xs-12 col-md-6">
                <div class="form-group">
                  <label for="control_ZipPostalCode" id="label_ZipPostalCode" class="control-label">US Postal Code<span class="required">*</span></label>
                  <input type="text" id="control_ZipPostalCode" name="ZipPostalCode" class="form-control input" tabindex="7" />
                </div>
              </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="form-group legend-group">
                <legend class="control-label">Required fields<span class="required">*</span></legend>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="checkbox custom-checkbox">
                <input type="checkbox" name="OptIn" id="control_OptIn" tabindex="8" value="" checked>
                <label for="control_OptIn" id="label_OptIn" class="control-label">
                  Please send me UPS emails containing videos, white papers, and webinars
                  on ways to use logistics to help businesses grow and compete.
                </label>
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-12">
              <div id="error-message-container" class="form-control-static"></div>
            </div>
          </div>

        <div class="row">
          <div class="col-md-12">
            <button id="btn-submit" class="btn cta" tabindex="9" type="submit" name="submit"><span>Submit</span></button>
          </div>
        </div>

          <div class="invisible"><input type="checkbox" name="BotTrap" id="BotTrap" value="1" tabindex="-1"/></div>
          <input type="hidden" name="RegionCode" id="RegionCode" value="US"/>
          <input type="hidden" name="CountryCode" id="CountryCode" value="US"/>
          <input type="hidden" name="LanguageCode" id="LanguageCode" value="EN"/>
          <input type="hidden" name="CampaignID" id="CampaignID" value=""/>
          <input type="hidden" name="WebtrendsID" id="WebtrendsID" value=""/>
          <input type="hidden" name="Referrer" id="Referrer" value=""/>
          <input type="hidden" name="posted" value="True" />

        </form>
        <% } %> 

    </div><!-- /.content -->

    <div class="footer"> </div><!-- /.footer -->
  </div><!-- /.container -->

  <!-- build:js js/production.min.js -->
  <!-- bower:js -->
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <% if (includeModernizr) { %>
  <script src="bower_components/modernizr/modernizr.js"></script>
  <% } %>
  <% if (includeBootstrap) { %>
  <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
  <% } %>
  <% if (webtrends && formValidation) { %>
  <script src="bower_components/jquery.cookie/jquery.cookie.js"></script>
  <% } %>
  <!-- endbower -->
  <script src="//localhost:35729/livereload.js"></script>
  <% if (linkedInSignin) { %>
  <script type="text/javascript" src="js/vendor/linkedin-signin.js"></script>
  <% } %>
  <% if (brightcove) { %>
  <script type='text/javascript' src='js/vendor/BrightcoveExperiences.js'></script>
  <% } %>
  <% if (customInput) { %>
  <script type='text/javascript' src='js/vendor/customInput.js'></script>
  <% } %>
  <% if (webtrends) { %>
  <script type="text/javascript" src="js/vendor/TBv3.08.6.2webtrends.js"></script>
  <% } %>
  <script type="text/javascript" src="js/main.js"></script>
  <!-- endbuild -->

  



  <% if (webtrends) { %>
  <!-- BEGIN WEBTRENDS TAG -->
  <script type="text/javascript">
    //<![CDATA[
      var _tag1 = new WebTrends();
      console.log('webtrends 1');
      _tag1.dcsid = "";
      _tag1.domain = "wtsdc.ups.com";
      _tag1.dcsGetId();
      _tag1.dcsVar();
      _tag1.dcsMeta();
      _tag1.dcsAdv();
      _tag1.dcsTag();
      var _tag2 = new WebTrends();
      console.log('webtrends 2');
      _tag2.dcsid = "";
      _tag2.domain = "ssdc.ups.com";
      _tag2.fpcdom = _tag1.fpcdom;
      _tag2.onsitedoms = _tag1.onsitedoms;
      _tag2.dcsGetId();
      _tag2.dcsVar();
      _tag2.dcsMeta();
      _tag2.dcsAdv();
      _tag2.dcsTag();
    //]]>>
  </script>
  <% } %>

  <% if (linkedInSignin) { %>
  <script type="text/javascript" src="//platform.linkedin.com/in.js">
    api_key: // ADD THIS AFTER SETTING UP AT LINKEDIN DEVELOPER SITE
    authorize: true
    scope: r_basicprofile r_emailaddress r_contactinfo
  </script>
  <% } %>

  </body>
</html>
