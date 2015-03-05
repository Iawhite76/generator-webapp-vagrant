<?php

/**
 * Get the current page's URL
 *
 * @return string Returns page URL
 */
if (!function_exists('get_curr_url')) {
  function get_curr_url() {
      $url = 'http';
      if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") { $url .= "s"; }
      $url .= "://";
      $url .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
      return $url;
  }
}


?>
