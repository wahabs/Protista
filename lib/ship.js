(function() {
  window.Asteroids = window.Asteroids || {};

  var Ship = Asteroids.Ship = function(options) {
    this.COLOR = "#00ff00";
    this.RADIUS = 10;
    //this.vel = Asteroids.Util.randomVec(0.1);
    this.vel = [0, 0];
    Asteroids.MovingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
  }

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse) {
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  }

  Ship.prototype.fireBullet = function() {
    var that = this;
    that.game.add(new Asteroids.Bullet({game: that.game, pos: that.pos}))
  }

})();
