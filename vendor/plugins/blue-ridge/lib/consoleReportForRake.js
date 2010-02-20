(function($) {
  var colors = {'pass': '32', 'fail': '31'};
  function colorize(text, status){
  return "\u001B[" + colors[status] + "m" + text + "\u001B[0m";
  }
  $(Screw).bind("before", function(){
    $('.it')
      .bind('passed', function(){ 
        java.lang.System.out.print(colorize('.', 'pass'));
      })
      .bind('failed', function(e, reason){
        print(colorize("\nFAILED: " + BlueRidge.CommandLine.exampleName(this), 'fail'));
        print(colorize("          " + reason + "\n", 'fail'));
      });
  });

  $(Screw).bind("after", function(){
    var testCount = $('.passed').length + $('.failed').length;
    var failures = $('.failed').length;
    var elapsedTime = ((new Date() - Screw.suite_start_time)/1000.0);
    var status_to_colorize;
    
    if(failures > 0){
      status_to_colorize = 'fail';
    }else{
      status_to_colorize = 'pass';
    };
    print("\n")
    print(colorize(testCount + ' test(s), ' + failures + ' failure(s)', status_to_colorize));
    print(colorize(elapsedTime.toString() + " seconds elapsed",status_to_colorize));
    
    if(failures > 0) { java.lang.System.exit(1) };
  });
})(jQuery);
