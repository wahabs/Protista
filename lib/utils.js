(function() {
window.Asteroids = window.Asteroids || {};

var Util = Asteroids.Util = function() {};

Asteroids.Util.inherits = function(ChildClass, ParentClass) {
  Surrogate = function() {};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

Asteroids.Util.randomVec = function(length){
  var dirX = (Math.random() * 2) - 1;
  var dirY = (Math.random() * 2) - 1;
  return [dirX/Math.sqrt(length), dirY/Math.sqrt(length)];
};

})();
