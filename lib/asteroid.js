(function() {
  window.Asteroids = window.Asteroids || {};

var Asteroid = Asteroids.Asteroid = function(options) {
  this.COLOR = "#0000ff";
  this.RADIUS = 40;
  this.vel = Asteroids.Util.randomVec(1);

  Asteroids.MovingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
}

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Asteroids.Ship) {
    otherObject.relocate();
  }
}

})();
