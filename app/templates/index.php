<!doctype html>
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

  </body>
</html>
