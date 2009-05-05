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

// require("../../vendor/plugins/blue-ridge/lib/jquery-1.2.6.js");
require("../../vendor/plugins/blue-ridge/lib/jquery-1.3.2.js");

require("../../vendor/plugins/blue-ridge/lib/jquery.fn.js");
require("../../vendor/plugins/blue-ridge/lib/jquery.print.js");
require("../../vendor/plugins/blue-ridge/lib/screw.builder.js");
require("../../vendor/plugins/blue-ridge/lib/screw.matchers.js");
require("../../vendor/plugins/blue-ridge/lib/screw.events.js");
require("../../vendor/plugins/blue-ridge/lib/screw.behaviors.js");
require("../../vendor/plugins/blue-ridge/lib/smoke.core.js");
require("../../vendor/plugins/blue-ridge/lib/smoke.mock.js");
require("../../vendor/plugins/blue-ridge/lib/smoke.stub.js");
require("../../vendor/plugins/blue-ridge/lib/screw.mocking.js");

require(derive_spec_name_from_current_file());
