ScalaEnvy (Blue-Ridge Sample App)
=================================

Welcome to the sample application for [Blue-Ridge](http://github.com/relevance/blue-ridge). Blue-Ridge is a JavaScript testing plugin for Rails.  Blue-Ridge adds support for command-line and in-browser JavaScript unit tests to your Rails app, allowing you to give your JavaScript code the testing love it deserves.

This sample application demonstrates: 

* using nested `describe` functions
* setting up per-spec HTML "fixtures"
* stubbing functions
* mocking functions
* running the Blue Ridge specs as part of your default Rake task

To verify that all the tests pass, clone the repo and follow the instructions below, or simply check out the app's latest build on [RunCodeRun](http://runcoderun.com/relevance/blue-ridge-sample-app).


Noteworthy Bits
---------------

* public/javascripts/project.js: the JavaScript code used to power the app's client-side interactivity
* test/javascript/project\_spec.js: the specs for the JavaScript code present in public/javascripts/project.js
* test/javascript/spec\_helper.js: the helper code used by project\_spec.js and available to any other JavaScript specs you might define for the app


Installing and Running
----------------------

To install:

    git clone git://github.com/relevance/blue-ridge-sample-app.git scalaenvy
    cd scalaenvy
    cp config/database.sample.yml config/database.yml
    rake db:migrate

To run all of the JavaScript specs:

    rake test:javascripts

To run *all* of tests (i.e., Ruby *and* JavaScript):

    rake

To run the application:

    script/server 

The sample app should now be running at http://localhost:3000


Notes
-------------------------------------

This sample app uses jQuery exclusively, but Blue-Ridge plays nicely with Prototype as well.  Check out the [Blue-Ridge README](http://github.com/relevance/blue-ridge) for an example of testing JavaScript that relies on Prototype.
