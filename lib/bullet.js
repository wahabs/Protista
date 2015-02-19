(function() {
  window.Protista = window.Protista || {};

  var Bullet = Protista.Bullet = function(options) {
    this.COLOR = "#ff0000";
    this.RADIUS = 5;
    //this.vel = Protista.Util.randomVec(0.1);
    this.ship = options.game.ship;
    this.vel = this.ship.vel.map(function(el) {
      return (el+Math.random()) * 2;
    });

    Protista.MovingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
    this.isWrappable = false;
  }

  Protista.Util.inherits(Protista.Bullet, Protista.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Protista.Asteroid) {
      this.game.remove(otherObject);
    }
  }

  Bullet.prototype.move = function() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    };


})();
