(function() {
  window.Protista = window.Protista || {};

var Predator = Protista.Predator = function(options) {
  this.COLOR = "#0000ff";
  this.RADIUS = 40;
  this.vel = Protista.Util.randomVec(1);
  this.sprite = new Image();
  this.sprite.src = "images/enemyA.png";

  Protista.movingObject.call(this, options.pos, this.vel, this.RADIUS, this.COLOR, options.game);
}

Protista.Util.inherits(Protista.Predator, Protista.movingObject);

Predator.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Protista.Ship) {
    otherObject.relocate();
  }
}

Predator.prototype.draw = function(ctx) {
  var that = this;

  // ctx.drawImage(this.sprite, 90, 90, this.radius, this.radius, this.pos[0], this.pos[1], 90, 90);
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
  // collisionBoost = Math.floor((Math.random() * 2)) + 1;
  this.vel[0] = -this.vel[0];
  this.vel[1] = -this.vel[1];
  otherObject.vel[0] = -otherObject.vel[0];
  otherObject.vel[1] = -otherObject.vel[1];
}

})();
