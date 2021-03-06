(function() {

window.Protista = window.Protista || {};

var movingObject = Protista.movingObject = function(pos, vel, radius, color, game) {
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
  this.game = game;
  this.isWrappable = true;
}

movingObject.prototype.draw = function(ctx) {
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

movingObject.prototype.move = function() {
  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
    this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
      }
  }
};

movingObject.prototype.isCollidedWith = function(otherObject) {
  var distance = Math.sqrt(
      Math.pow(this.pos[0] - otherObject.pos[0], 2) +
      Math.pow(this.pos[1] - otherObject.pos[1], 2)
    );

  var minDistance = this.radius + otherObject.radius;

  return (distance <= minDistance);
}

movingObject.prototype.collideWith = function(otherObject) {


}





})();
