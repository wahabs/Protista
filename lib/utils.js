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

Protista.Util.dotProduct = function(a, b) {
  var n = 0;
  var lim = Math.min(a.length, b.length);
  for (var i = 0; i < lim; i++) {
    n += a[i] * b[i];
  }
  return n;
};

})();
