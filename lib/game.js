(function() {
  window.Protista = window.Protista || {};

  var Game = Protista.Game = function() {
    this.DIM_X = 1000;
    this.DIM_Y = 1000;
    this.NUM_ASTEROIDS = 20;
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Protista.Ship({game: this, pos: this.randomPosition()});
    this.bullets = [];
  };

  Game.prototype.randomPosition = function() {
    return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
  };

  Game.prototype.add = function(obj) {
    if (obj instanceof Protista.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Protista.Bullet) {
      this.bullets.push(obj);
    }
  }

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(
        new Protista.Asteroid({game: this, pos: this.randomPosition() })
      );
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    })
  }

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  }

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (obj) {
      obj.move();
    })
  }

  Game.prototype.wrap = function(pos) {
    return [this.DIM_X - pos[0], this.DIM_Y - pos[1] ];
  }

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = 0; j < this.allObjects().length; j++) {

        if ( j !== i && this.allObjects()[i].isCollidedWith(this.allObjects()[j]) ) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }

      }
    }

  }

  Game.prototype.remove = function(obj) {

    if (obj instanceof Protista.Asteroid) {
      var idx = this.asteroids.indexOf(obj);
      if (idx !== -1) {
        this.asteroids = this.asteroids.slice(0, idx).concat(this.asteroids.slice(idx+1))
      }
    } else if (obj instanceof Protista.Bullet) {
      var idx = this.bullets.indexOf(obj);
      if (idx !== -1) {
        this.bullets = this.bullets.slice(0, idx).concat(this.bullets.slice(idx+1))
      }
    }

  }

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  }

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] >= this.DIM_X || pos[0] <= 0 ||
            pos[1] >= this.DIM_Y || pos[1] <= 0);
  }

})();
