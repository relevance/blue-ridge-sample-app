require("../../spec_helper.js");
require("../../../../public/javascripts/project.js");

Screw.Unit(function() {

  describe("Doubly-Nested Project", function() {
    after(function(){ teardownFixtures() });
    
    describe("getLinesOfCodeForForm", function(){
      it("returns an array that is the numeric values of all lines-of-code inputs in the given form", function(){
        fixture($('<form id="project"/>')
          .append($("<div class='some-middleman-div'/>")
            .append('<input type="text" value="123" class="lines-of-code"/>')
            .append('<input type="text" value="321" class="lines-of-code"/>')));
        
        expect(Project.getLinesOfCodeForForm("#project")).to(equal, [123, 321]);
      });
      
      it("returns a zero for an input with a non-numeric value", function(){
        fixture($('<form id="project"/>')
          .append($("<div class='some-middleman-div'/>")
            .append('<input type="text" value="abc" class="lines-of-code"/>')
            .append('<input type="text" value="321" class="lines-of-code"/>')));
        
        expect(Project.getLinesOfCodeForForm("#project")).to(equal, [0, 321]);
      });
    });
    
    describe("getTotalLinesOfCodeForForm", function(){
      it("sums the lines of code values for the given form", function(){
        var form = "form";
        mock(Project).should_receive("getLinesOfCodeForForm").with_arguments(form).at_least(1, "times").and_return([123, 321])
        expect(Project.getTotalLinesOfCodeForForm(form)).to(equal, 444);
      });
    });
    
    describe("calculateLinesOfCodePercentageForInput", function(){
      it("returns a percentage given an input and the total lines of code", function(){
        fixture($('<form id="project"/>').append('<input type="text" value="123" class="lines-of-code"/>'));
        expect(Project.calculateLinesOfCodePercentageForInput("#project input:first", 444)).to(equal, 0.28);
      });
      
      it("returns zero if the total lines of code given is zero", function(){
        expect(Project.calculateLinesOfCodePercentageForInput(null, 0)).to(equal, 0);
      });
      
      it("returns zero if the input has a non-numeric value", function(){
        fixture($('<form id="project"/>').append('<input type="text" value="abc" class="lines-of-code"/>'));
        expect(Project.calculateLinesOfCodePercentageForInput("#project input:first", 444)).to(equal, 0);
      });
    });
    
    describe("calculateAndDisplayLinesOfCodePercentagesForForm", function(){
      it("for each lines-of-code input plug the associated percentage into the view", function(){
        fixture($('<form id="project"/>')
          .append('<input type="text" value="123" class="lines-of-code"/>')
          .append('<span class="percentage"/>')
          .append('<input type="text" value="321" class="lines-of-code"/>')
          .append('<span class="percentage"/>'));
        
        Project.calculateAndDisplayLinesOfCodePercentagesForForm("#project");
        expect($("span.percentage:first").text()).to(equal, "28%");
        expect($("span.percentage:last").text()).to(equal, "72%");
      });
    });
    
    describe("getLanguagesForForm", function(){
      it("returns an array of the language names in the given form", function(){
        fixture($('<form id="project"/>')
          .append('<input type="text" value="Ruby" class="language-name"/>')
          .append('<input type="text" value="JavaScript" class="language-name"/>'));
        
        expect(Project.getLanguagesForForm("#project")).to(equal, ["Ruby", "JavaScript"]);
      });
      
      it("returns an empty array if there are no lanuages present", function(){
        fixture($('<form id="project"/>'));        
        expect(Project.getLanguagesForForm("#project")).to(equal, []);
      });
    });

    describe("calculateRewriteTextForForm", function(){
      it("returns 'Yes' if the language list includes any language other than 'Scala'", function(){
        mock(Project).should_receive("getLanguagesForForm").with_arguments("#project").at_least(1, "time").and_return(["blub"]);
        expect(Project.calculateRewriteTextForForm("#project")).to(equal, "Yes");
      });
      
      it("returns 'No' if the language list only includes 'Scala'", function(){
        mock(Project).should_receive("getLanguagesForForm").with_arguments("#project").at_least(1, "time").and_return(["Scala"]);
        expect(Project.calculateRewriteTextForForm("#project")).to(equal, "No");
      });
    });

  });

});
