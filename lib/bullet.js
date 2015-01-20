(function() {
  window.Asteroids = window.Asteroids || {};

  var Bullet = Asteroids.Bullet = function(options) {
    this.COLOR = "#ff0000";
    this.RADIUS = 5;
    //this.vel = Asteroids.Util.randomVec(0.1);
    this.ship = options.game.ship;
    this.vel = this.ship.vel.map(function(el) {
      return (el+Math.random()) * 2;
    });

    Asteroids.MovingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
    this.isWrappable = false;
  }

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
    }
  }

  Bullet.prototype.move = function() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    };


})();
