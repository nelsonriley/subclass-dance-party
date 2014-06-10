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
    }

  });

  $(".taseNeighborButton").on("click", function() {
    findNeighbor(window.dancers[0]);
  });

  var findNeighbor = function(dancer) {
    var dancer = dancer.$node;
    // find dancers coordinates
    // define accumulator to high number
    var shortestDistance = 3000;
    // define index as 0 by default
    var index = 0;
    // iterate over all dancers
    for (var i = 0; i<window.dancers.length; i++) {
      var neighbor = window.dancers[i].$node;
      var y1 = dancer.css('top').slice(0,8);
      var x1 = dancer.css('left').slice(0,8);
      var y2 = neighbor.css('top').slice(0,8);
      var x2 = neighbor.css('left').slice(0,8);
      // calculate distance from dancer
      // a2 + b2 = c2
      var distanceX = Math.pow((x2-x1), 2);
      var distanceY = Math.pow((y2-y1), 2);
      var distance = Math.pow(distanceX+distanceY, 0.5);
      // if distance < accumulator AND distance > 0
      if (distance < shortestDistance && distance > 0) {
        shortestDistance = distance;
        index = i;
      }
    }

    // tase nearest neighbor
    window.dancers[index].$node.remove();
    window.dancers.splice(index, 1);
  };

  // jQuery event delegation options:
  // 1) attach the event when the element is added to the dom
  // 2) use event delegation (best option)
    // capturing happens first   window >to> element
    // bubbling happens next    element >to> window

  $("body").on("mouseover", ".dancer", function() {
    $(this).addClass( "hover" );
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

