var Project = (function($){
  return {
    getLanguagesForForm: function(form){
      return $(form).find(".language-name").map(function(){
        return $(this).val();
      });
    },
    
    calculateRewriteTextForForm: function(form){
      var languages = this.getLanguagesForForm(form);
      return (languages.length == 1 && languages[0] == "Scala") ? "No": "Yes";
    },
    
    getLinesOfCodeForForm: function(form){
      var linesOfCode = [];

      $(form).find(".lines-of-code").each(function(){
        var value = parseInt($(this).val());
        if(isNaN(value)) { value = 0 };
        linesOfCode.push(value);
      });
    
      return linesOfCode;
    },
  
    getTotalLinesOfCodeForForm: function(form){
      var linesOfCode = this.getLinesOfCodeForForm(form);
      var sum = 0;

      $.each(linesOfCode, function(){
        sum += this;
      });
    
      return sum;
    },
  
    calculateLinesOfCodePercentageForInput: function(input, totalLinesOfCode){
      if(totalLinesOfCode == 0) { return 0 };
      var value = parseInt($(input).val());
      if(isNaN(value)) { value = 0 };
      return (value/totalLinesOfCode).toFixed(2);
    },
  
    calculateAndDisplayLinesOfCodePercentagesForForm: function(form){
      var totalLinesOfCode = this.getTotalLinesOfCodeForForm(form);
      var _this = this;
      $(form).find(".lines-of-code").each(function(){
        var percentage = _this.calculateLinesOfCodePercentageForInput(this, totalLinesOfCode);
        percentage = Math.floor(percentage*100) + "%";
        $(this).next(".percentage").text(percentage);
      });
    }
  };
})(jQuery);

/* Wiring code:  This is declarative code and so does not have test specifications. */
function initLanguageFields() {
  Project.calculateAndDisplayLinesOfCodePercentagesForForm("#new_project");
  $('#new_project .language-name').defaultValue("Language");
  $('#new_project .lines-of-code').defaultValue("Lines of Code");
}

(function($){
  $(function(){
    $(".lines-of-code").live("keyup", function(){
      Project.calculateAndDisplayLinesOfCodePercentagesForForm("#new_project");
    });
  
    $(".remove-language-link").live("click", function(){
      $(this).parents("fieldset").remove();
      Project.calculateAndDisplayLinesOfCodePercentagesForForm("#new_project");
    });
  
    $("#add-another-language-link").click(function(){
      $("#new_project .next-language-form:last").load("/projects/language_form", null, function(){
        initLanguageFields();
      });
    });                                             
    
    $("#should-i-rewrite-button").click(function(){
      $("#results").text(Project.calculateRewriteTextForForm("#new_project"));
    });
  
    initLanguageFields();
  });
})(jQuery);