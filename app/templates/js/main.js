/*!
 * Project Scripts
 */

<% if(includeModernizr) { %>
/* jshint ignore:start */

/* Add Modernizr test for mobile */
Modernizr.addTest('ismobile', function () {
 return navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/g) ? true : false;
});

/* jshint ignore:end */

<% } %> // if (includeModernizr)


<% if(brightcove) { %>
/**
 * Get FLV url for brightcove video using Media API
 * @function getFLVURL
 */
function getFLVURL() {
  var videoID = $(/* target the element with brightcove video id data attribute */).attr('data-video');
  var url = 'https://api.brightcove.com/services/library?command=find_video_by_id&video_id=' + videoID + '&video_fields=name,FLVURL,linkURL&media_delivery=http&token=nXZiA6HgwJuTfF6ZE9daHEEalrOrrcYrGwdfASgqqqu2jxa_-ynWGQ..';
  var result = null;
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'jsonp',
    async: true,
    success: function (data) {
      if (data) {
        $(/* target the element with brightcove video id data attribute */).attr('href', data.FLVURL);
      } else {
        $(/* target the element with brightcove video id data attribute */).attr('href', '#');
      }
    }
  });
}
<% } %> // end if (brightcove)


<% if(webtrends) { %>
/* jshint ignore:start */

/**
* Sizmek Conversion
* @function sizmekConversion
*/
function sizmekConversion(el, conversionID, isRedirect) {
  try {
    var redirURL = (el === undefined) ? undefined : $(el).attr('href');
    var target = (el === undefined) ? undefined : $(el).attr('target');

    var conversionTag = document.createElement('SCRIPT');
    conversionTag.src = 'https://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID=' + conversionID + '&rnd=' + (Math.round(Math.random() * 1000000));
    document.body.appendChild(conversionTag);

    if (redirURL !== undefined && isRedirect) {
      if (target === undefined || target === '_blank') {
        window.open(redirURL);
      } else {
        var redirFunction = function () {
          document.location.href = redirURL;
        };
        setTimeout(redirFunction, 1000);
      }
    }
  }
  catch (e) {}
}

/**
 * Builds and fires a Webtrends 'dcsMultiTrack' event, then redirects the user to the specified URL.
 * @function wtTrack
 */
function wtTrack(target, pSA, pSU, pPID, dcsuri, z_mktmsite, z_mce, lookup) {
  var redirURL = $(target).attr("href");
  var target = $(target).attr("target");

  dcsMultiTrack('DCSext.pSA', pSA, 'DCSext.pSU', pSU, 'DCS.dcsuri', dcsuri, 'DCSext.pPID', pPID, 'WT.z_mktmsite', z_mktmsite, 'WT.z_mce', z_mce, 'WT.z_mce Lookup', lookup);

  if (target != "_blank") {
    var redirFunction = function () {
      document.location.href = redirURL;
    };
    setTimeout(redirFunction, 1000);
  }else{
    window.open(redirURL);
  }
}

/**
 * Builds and fires a Webtrends 'dcsMultiTrack' event
 * @function wtTrackStatic
 */
function wtTrackStatic(pSA, pSU, pPID, dcsuri, z_mktmsite, z_mce, lookup) {
  dcsMultiTrack('DCSext.pSA', pSA, 'DCSext.pSU', pSU, 'DCS.dcsuri', dcsuri, 'DCSext.pPID', pPID, 'WT.z_mktmsite', z_mktmsite, 'WT.z_mce', z_mce, 'WT.z_mce Lookup', lookup);
}

/**
 * Get the query string
 * @function getQueryString
 */
function getQueryString(desired) {
  var qs = window.location.search.substr(1).split('&');
  for (var i = 0; i < qs.length; i++) {
    var temp = qs[i].split('=');
    if (temp[0].toLowerCase() === desired.toLowerCase()) {
      return temp[1];
    }
  }
  return '';
}

/* jshint ignore:end */

<% } %> // end webtrends conditional

'use strict';

$(function () {

<% if (formValidation) { %>

/* jshint ignore:start */

	$(/* Target linkedin button here */).on('click', function (e) {
	  e.preventDefault();
	  onLinkedInLoad();
	});

	/* jshint ignore:start */

		<% if (webtrends) { %>
	  /* Analytics: Set the 'WebtrendsID' */
	  var wtid = getQueryString('WT.mc_id');
	  var regex_script_tag = /(%3C*|<)[^*]?script/;

	  if (wtid.match(regex_script_tag)) {
	      wtid = /* Set wtid here */'';
	  }
	  if (wtid) {
	      $.cookie('WebtrendsID', wtid, { expires: 1, path: '/', secure: false });
	  }
	  if (!$.cookie('WebtrendsID')) {
	      $.cookie('WebtrendsID', /* wtid */'', { expires: 1, path: '/', secure: false });
	  }



	  /* Analytics: Set the 'Referrer' */
	  var referrer = getQueryString('referrer');

	  if (referrer.match(regex_script_tag)) {
	      var stripped_url = [location.protocol, '//', location.host, location.pathname].join('');
	      referrer = stripped_url;
	  }
	  if (referrer) {
	      $.cookie('Referrer', referrer, { expires: 1, path: '/', secure: false });
	  }



	  /* Form: populate fields */
	  $('input#WebtrendsID').val($.cookie('WebtrendsID'));
	  if ($.cookie('Referrer')) {
	      $('input#Referrer').val($.cookie('Referrer'));
	  } else {
	      var this_referrer = document.location.href.match(/(^[^#]*)/)[0];
	      if (this_referrer.match(regex_script_tag)) {
	          var stripped_url = [location.protocol, '//', location.host, location.pathname].join('');
	          $('input#Referrer').val(stripped_url);
	      } else {
	          $('input#Referrer').val(document.location.href.match(/(^[^#]*)/)[0]);
	      }
	  }

	  <% } %> // end if (webtrends)
 
	  /* Process form */
	  $(/* Target you form here and edit below */).on('submit', function (e) {

	      e.preventDefault();

	      // Remove previous errors
	      $('.form-group').removeClass('has-error');
	      // Update value of submit btn and disable it
	      // This will help prevent a user from clicking submit multiple times if the ajax post takes a few seconds to process
	      $('input#btn-submit').attr('disabled', 'disabled').val('Processing...');

	      $.ajax({
	          type: 'post',
	          url: '/resources/process.php',
	          data: $('form#contact-us').serialize(),
	          error: function () {
	              var message = '<p>We&rsquo;re sorry, but your request cannot be processed at this time. Please try again later.</p>';
	              $('#error-message-container').html(message);

	              // Reset submit btn
	              $('input#btn-submit').removeAttr('disabled').val('Submit');
	          },
	          success: function (data) {
	              var obj = jQuery.parseJSON(data);
	              if (obj.errors === 'false') {
	                  // Success
	                  $('input#btn-submit').removeAttr('disabled').val('Submit');
	                  $('form#contact-us')[0].reset();
	                  $('#confirmationModal').modal('show');
	                  $('#error-message-container').empty();
	                  
	              } else {

	                  // Reset submit btn
	                  $('input#btn-submit').removeAttr('disabled').val('Submit');

	                  var required_fields = '';
	                  var count = 0;
	                  var message = "The following validation errors have occurred:<ul class='bullets'>";

	                  // Silverpop Error
	                  if (obj.message === 'AddRecipient Error') {
	                      message = '<li>We&rsquo;re sorry, but your request cannot be processed at this time. Please try again later.</li>';
	                  }

	                  $.each(obj.fields_missing, function (i, fieldid) {
	                      $('#control_' + fieldid).parent().addClass('has-error');
	                  });
	                  $.each(obj.fields_invalid, function (i, fieldid) {
	                      $('#control_' + fieldid).parent().addClass('has-error');
	                  });

	                  $.each(obj.fields_missing, function (count, error) {
	                      if (error === 'NameFirst') {
	                          message += '<li>First Name is required</li>';
	                      } else if (error === 'NameLast') {
	                          message += '<li>Last Name is required</li>';
	                      } else if (error === 'CompanyName') {
	                          message += '<li>Company Name is required</li>';
	                      } else if (error === 'Email') {
	                          message += '<li>Email is required</li>';
	                      } else if (error === 'PhoneNumber') {
	                          message += '<li>Telephone Number is required</li>';
	                      } else if (error === 'ZipPostalCode') {
	                          message += '<li>Zip/Postal Code is required</li>';
	                      } else {
	                          if (count < 1) {
	                              message += '<li>One or more invalid characters are present.</li>';
	                          }
	                          count++;
	                      }
	                  });

	                  count = 0;
	                  $.each(obj.fields_invalid, function (count, error) {
	                      if (error === 'NameFirst') {
	                          message += '<li>Invalid First Name</li>';
	                      } else if (error === 'NameLast') {
	                          message += '<li>Invalid Last Name</li>';
	                      } else if (error === 'CompanyName') {
	                          message += '<li>Invalid Company Name</li>';
	                      } else if (error === 'Email') {
	                          message += '<li>Invalid Email</li>';
	                      } else if (error === 'PhoneNumber') {
	                          message += '<li>Invalid Telephone Number</li>';
	                      } else if (error === 'ZipPostalCode') {
	                          message += '<li>Invalid Zip/Postal Code</li>';
	                      } else {
	                          if (count < 1) {
	                              message += '<li>One or more invalid characters are present.</li>';
	                          }
	                          count++;
	                      }

	                  });

	                  count = 0;
	                  $.each(obj.fields_equals, function (count, error) {

	                      if (error === 'CountryCode') {
	                          message += '<li>Invalid country code</li>';
	                      } else if (error === 'LanguageCode') {
	                          message += '<li>Invalid language code</li>';
	                      } else if (error === 'CampaignID') {
	                          message += '<li>Invalid campaign id</li>';
	                      } else if (error === 'RegionCode') {
	                          message += '<li>Invalid region code</li>';
	                      } else {
	                          if (count < 1) {
	                              message += '<li>One or more invalid characters are present.</li>';
	                          }
	                          count++;
	                      }

	                  });

	                  message += '</ul>';

	                  $('#error-message-container').html(message);

	              }
	          }
	      });
	  });



	  /* Prevent the page being iFramed (prevents clickjacking) */
	  if (window.top !== window.self) {
	      window.top.location = window.self.location;
	  }
/* jshint ignore:end */
<% } %> // end if (formValidation)

});

