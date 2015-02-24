(function() {
  window.Protista = window.Protista || {};

  var Ship = Protista.Ship = function(options) {
    this.COLOR = "#00ff00";
    this.RADIUS = 10;
    //this.vel = Protista.Util.randomVec(0.1);
    this.vel = [0, 0];
    Protista.Cell.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
  }

  Protista.Util.inherits(Protista.Ship, Protista.Cell);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse) {
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  }

  Ship.prototype.fireBullet = function() {
    var that = this;
    that.game.add(new Protista.Bullet({game: that.game, pos: that.pos}))
  }

})();
