(function() {
window.Protista = window.Protista || {};

var Util = Protista.Util = function() {};

Protista.Util.inherits = function(ChildClass, ParentClass) {
  Surrogate = function() {};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
};

Protista.Util.randomVec = function(length){
  var dirX = (Math.random() * 2) - 1;
  var dirY = (Math.random() * 2) - 1;
  return [dirX/Math.sqrt(length), dirY/Math.sqrt(length)];
};

})();
