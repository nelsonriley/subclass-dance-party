$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
     // this is the button clicked
     // data gets the data-dancer-maker-funtion-name attribute on the button
     // so danceMakerFunctionName is a string
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
      //console.log(window);
      //the window object has access to:
        // all functions in the global scope
        // $, jQuery
        // document / body / childnodes
        // localStorge
        // screen / availHeight + availWidth
        // lots provided by webkit: speechRecognition, SVG handlers
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    $('body').append(dancer.$node);

    window.dancers.push(dancer);

  });

  $(".lineUpButton").on("click", function(event) {

    var dancers = window.dancers;
    for (var i = 0 ; i < dancers.length ; i++) {
      var left = $("body").width() * Math.random();
      var top = 100;
      dancers[i].setPosition(top, left);
    };

    // console.log($(".winky"));

  });

  // $(".winky").hover(
  //   function(event) {
  //     console.log("hovering");
  //     $(this).addClass( "hover" );
  //   }, function(event) {
  //     $(this).removeClass( "hover" );
  //   }
  // );

});

