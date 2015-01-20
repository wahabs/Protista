Function.prototype.inherits = function(superclass) {
  function Surrogate() {};
  Surrogate.prototype = superclass.prototype;
  this.prototype = new Surrogate();
};

function MovingObject () {
  this.location = "space";
};

function Ship () {
  MovingObject.call(this);
  this.vel = 0;
};
Ship.inherits(MovingObject);

function Asteroid () {
  MovingObject.call(this);
};
Asteroid.inherits(MovingObject);

Ship.prototype.go = function(vel) {
  this.vel += vel;
}

var myShip = new Ship();
myShip.go(50);
var myAsteroid = new Asteroid();
