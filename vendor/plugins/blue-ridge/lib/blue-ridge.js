function require(url, options) {
  //this function expects to be ran from the context of the spec/javascripts/fixtures or test/javascript/fixtures
  //directory, so add a '../' prefix to all Javascript paths
  url = "../" + url;
  
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = url;
  
  options = options || {};
  
  if (options['onload']) {
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = options['onload'];
  }
  
  head.appendChild(script);
}

function debug(message) {
  document.writeln(message + " <br/>");
}

function derive_spec_name_from_current_file() {
  var file_prefix = new String(window.location).match(/.*\/(.*?)\.html/)[1];
  return file_prefix + "_spec.js";
}

var BLUE_RIDGE_LIB_PREFIX = BLUE_RIDGE_LIB_PREFIX || "../../vendor/plugins/blue-ridge/lib/";

// require(BLUE_RIDGE_LIB_PREFIX + "jquery-1.2.6.js");
require(BLUE_RIDGE_LIB_PREFIX + "jquery-1.3.2.js");

require(BLUE_RIDGE_LIB_PREFIX + "jquery.fn.js");
require(BLUE_RIDGE_LIB_PREFIX + "jquery.print.js");
require(BLUE_RIDGE_LIB_PREFIX + "screw.builder.js");
require(BLUE_RIDGE_LIB_PREFIX + "screw.matchers.js");
require(BLUE_RIDGE_LIB_PREFIX + "screw.events.js");
require(BLUE_RIDGE_LIB_PREFIX + "screw.behaviors.js");
require(BLUE_RIDGE_LIB_PREFIX + "smoke.core.js");
require(BLUE_RIDGE_LIB_PREFIX + "smoke.mock.js");
require(BLUE_RIDGE_LIB_PREFIX + "smoke.stub.js");
require(BLUE_RIDGE_LIB_PREFIX + "screw.mocking.js");

require(derive_spec_name_from_current_file());
