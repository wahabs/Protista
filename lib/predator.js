(function() {
  window.Protista = window.Protista || {};

var Predator = Protista.Predator = function(options) {
  this.COLOR = "#0000ff";
  this.RADIUS = 40;
  this.vel = Protista.Util.randomVec(1);

  Protista.movingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
}

Protista.Util.inherits(Protista.Predator, Protista.movingObject);

Predator.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Protista.Ship) {
    otherObject.relocate();
  }
}

})();
