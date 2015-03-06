<?php
    if (isset($_SERVER['ENV']) && $_SERVER['ENV'] !== "dev" && $_SERVER['ENV'] !== "internal") {
        if($_SERVER['SERVER_PORT'] != '443') { header('Location: https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); exit(); }
    }
   
?><!doctype html>
<html class="no-js">
  <head>

    <meta charset="utf-8">
    <title>Project Name</title>
    <meta name="description" content="">
    <% if (!disableResponsive) { %><meta name="viewport" content="width=device-width"><% } %>
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="shortcut icon" href="/favicon.ico">
    <% if (includeModernizr) { %><!-- build:js js/modernizr.min.js -->
    <script src="bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->
    <!-- build:css css/main.min.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <link rel="stylesheet" href="css/main.css">
    <!-- endbuild -->
    <% } if (includeRespond) { %><!-- build:js js/respond.min.js -->
    <!--[if lt IE 9]>
    <script src="bower_components/respond/dest/respond.src.js"></script>
    <![endif]-->
    <!-- endbuild -->
    <% } %>

  <% if (webtrends) { %>
    <!-- BEGIN WEBTRENDS TAG -->
    <script type="text/javascript" src="/resources/TBv3.08.6.2webtrends.js"></script>
    <script type="text/javascript">
      //<![CDATA[
        var _tag1 = new WebTrends();
        _tag1.dcsid = ""; 
        _tag1.domain = "wtsdc.ups.com";
        _tag1.dcsGetId();
        _tag1.dcsVar();
        _tag1.dcsMeta();
        _tag1.dcsAdv();
        _tag1.dcsTag();
        var _tag2 = new WebTrends();
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

    <script type="text/javascript" src="js/linkedin-signin.js"></script>
  <%  %>

  </head>

  <body>

  <div class="container">
    <div class="header"> </div><!-- /.header -->

    <div class="content">
        <h1>Ready</h1>
    </div><!-- /.content -->

    <div class="footer"> </div><!-- /.footer -->
  </div><!-- /.container -->


  <!-- build:js js/vendors.min.js -->
  <!-- bower:js -->

  <!-- endbower -->
  <!-- endbuild -->
  
  <!-- TODO only have this script in development -->
  <script src="//localhost:35729/livereload.js"></script>

  <% if (brightcove) { %>
  <script type='text/javascript' src='js/BrightcoveExperiences.js'></script>
  <% } %>

  <% if (customInput) { %>
  <script type='text/javascript' src='js/BrightcoveExperiences.js'></script>
  <% } %>
  </body>
</html>
