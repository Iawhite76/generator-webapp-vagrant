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
