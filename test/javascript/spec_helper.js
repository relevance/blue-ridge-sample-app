// Use this file to require common dependencies or to setup useful test functions.

function fixture(element) {
  $('<div id="fixtures"/>').append(element).appendTo("body");
}

function cleanFixtures() {
  $("#fixtures").remove();
}

// Stub out some common plugins.
jQuery.fn.live = function(){};
jQuery.fn.defaultValue = function(){};