var BlinkyDancer = function(top, left, timeBetweenSteps){
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('blinky');
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};

// LissajousCurve
// 80, 1, 80, 1
//  x = cos(a*t)-cos^3(b*t)     y = sin(c*t)-sin^3(dt)
//  cos^3x = cos(cos(cos(x)))     source: http://mathhelpforum.com/calculus/209123-difference-between-cos-3-x-cos-x-3-a.html
//  still need to know     ?from? > t > ?to?
//  circle is   0 > t > 2*PI,   increment  0.01

var lissajousCoor = function(t,a,b) {
  var a = a ? a : 1;
  var b = b ? b : 80;
  var xcoor = (Math.cos(a*t)-Math.cos(Math.cos(Math.cos(b*t))))  *200;
  var ycoor = (Math.sin(a*t)-Math.sin(Math.sin(Math.sin(b*t))))  *200;
  return {x:xcoor, y:ycoor};
};

var parametricCircleCoor = function(t) {
  var xcoor = Math.cos(t)*200;
  var ycoor = Math.sin(t)*200;
  return {x:xcoor, y:ycoor};
};

// should remove the lapFunction from circle
BlinkyDancer.prototype.circle = function() {
  var start = -1;
  var end = 1;
  var t = start;
  var inc = 0.001;
  var lapT = function() {
    var context = this;
    setTimeout(function() {
      t = t+inc;
      if (t >= end) {
        t = start;
      }
      // set position of this
      //var coordinates = parametricCircleCoor(t);
      var coordinates = lissajousCoor(t);
      var bodyCenter = screenCenter();
      context.setPosition(bodyCenter.y + coordinates.y, bodyCenter.x + coordinates.x);
      lapT.call(context);
    }, 1);
  };
  lapT.call(this);

};
