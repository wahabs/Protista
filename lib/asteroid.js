(function() {
  window.Protista = window.Protista || {};

var Asteroid = Protista.Asteroid = function(options) {
  this.COLOR = "#0000ff";
  this.RADIUS = 40;
  this.vel = Protista.Util.randomVec(1);

  Protista.MovingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
}

Protista.Util.inherits(Protista.Asteroid, Protista.MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Protista.Ship) {
    otherObject.relocate();
  }
}

})();
