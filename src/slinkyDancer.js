var SlinkyDancer = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('slinky');
};

SlinkyDancer.prototype = Object.create(Dancer.prototype);
SlinkyDancer.prototype.constructor = SlinkyDancer;

SlinkyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};
var growCircle = 1;
var big = false;
var small = true;
var circleCoord = function(t) {
  var xcoor = Math.cos(t)*growCircle;
  var ycoor = Math.sin(t)*growCircle;
  if(small){
    growCircle = growCircle * 1.1;
  }
  if(big){
    growCircle = growCircle * 0.9;
  }
  if(small && growCircle > 200){
    small = false;
    big = true;
  }
  if(big && growCircle < 10){
    small = true;
    big = false;
  }
  return {x:xcoor, y:ycoor};
};

// should remove the lapFunction from circle
SlinkyDancer.prototype.circle = function() {
  var start = -1;
  var end = 1;
  var t = start;
  var inc = 0.01;
  var accelerate = 0.9;
  var lapT = function() {
    var context = this;
    setTimeout(function() {
      t = t+inc;
      // if (t >= end) {
      //   t = start;
      // }
      // set position of this
      var coordinates = circleCoord(t);
      //var coordinates = lissajousCoor(t);
      var bodyCenter = screenCenter();
      context.setPosition(bodyCenter.y + coordinates.y, bodyCenter.x + coordinates.x);
      lapT.call(context);
    }, 0.0001);
  };
  lapT.call(this);

};
