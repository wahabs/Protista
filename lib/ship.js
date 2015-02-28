(function() {
  window.Protista = window.Protista || {};

  var Ship = Protista.Ship = function(options) {
    this.COLOR = "#49E20E";
    this.RADIUS = 10;
    //this.vel = Protista.Util.randomVec(0.1);
    this.vel = [0, 0];
    Protista.movingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
  }

  Protista.Util.inherits(Protista.Ship, Protista.movingObject);

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

  Ship.prototype.collideWith = function(otherObject) {
  // assume perfectly elastic collision with mass proportional to radius
    if (!(otherObject instanceof Protista.Bullet)) {

      var x1 = this.pos[0];
      var y1 = this.pos[1];
      var x2 = otherObject.pos[0];
      var y2 = otherObject.pos[1];

      var m1 = this.radius;
      var m2 = otherObject.radius;

      var unitNormal = _.map([x2-x1, y2-y1], function(num) {
        return num / Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
      })

      var unitTangent = [-unitNormal[1], unitNormal[0]];

      var v1N = Protista.Util.dotProduct(unitNormal, this.vel);
      var v1T = Protista.Util.dotProduct(unitTangent, this.vel);
      var v2N = Protista.Util.dotProduct(unitNormal, otherObject.vel);
      var v2T = Protista.Util.dotProduct(unitTangent, otherObject.vel);

      var v1N_ = (v1N * (m1-m2) + 2*m2*v2N) / (m1+m2);
      var v1T_ = v1T;

      var newNormal = _.map(unitNormal, function(num) { return num * v1N_ });
      var newTangent = _.map(unitTangent, function(num) { return num * v1T_ });

      this.vel = [newNormal[0] + newTangent[0], newNormal[1] + newTangent[1]];

    }
  }

})();
