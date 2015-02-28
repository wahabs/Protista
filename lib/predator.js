(function() {
  window.Protista = window.Protista || {};

var Predator = Protista.Predator = function(options) {
  this.RADIUS = _.random(20, 50);
  this.COLOR = this.getColorFromRadius();
  this.vel = Protista.Util.randomVec(1);
  this.sprite = new Image();
  this.sprite.src = "images/enemyA.png";
  Protista.movingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
}

Protista.Util.inherits(Protista.Predator, Protista.movingObject);

Predator.prototype.getColorFromRadius = function() {
  if (this.RADIUS < 25) {
    return "#00BFFF";
  } else if (this.RADIUS < 35) {
    return "#007FFF";
  } else if (this.RADIUS < 45) {
    return "#50A6C2";
  } else {
    return "#0D4F8B";
  }
};

Predator.prototype.draw = function(ctx) {
  var that = this;

  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2*Math.PI,
    false
  );

  ctx.fill();

};

Predator.prototype.collideWith = function(otherObject) {
  // assume perfectly elastic collision with mass proportional to radius

  if (otherObject instanceof Protista.Bullet) {
    var multiplier = 0;
  } else if (otherObject instanceof Protista.Ship) {
    var multiplier = 1.01;
  } else { // another Predator
    var multiplier = 0.999;
  }

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

  var newNormal = _.map(unitNormal, function(num) { return num * v1N_ * multiplier });
  var newTangent = _.map(unitTangent, function(num) { return num * v1T_ * multiplier });

  this.vel = [newNormal[0] + newTangent[0], newNormal[1] + newTangent[1]];

}

})();
