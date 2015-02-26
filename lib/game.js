(function() {
  window.Protista = window.Protista || {};

  var Game = Protista.Game = function() {
    alert("Hi there! Protista is still under development, but feel free to play. WASD keys to move, H to fire.");
    this.DIM_X = 1000;
    this.DIM_Y = 1000;
    this.predators = [];
    this.addPredators(20);
    this.ship = new Protista.Ship({game: this, pos: this.randomPosition()});
    this.bullets = [];
  };

  Game.prototype.randomPosition = function() {
    return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
  };

  Game.prototype.add = function(obj) {
    if (obj instanceof Protista.Predator) {
      this.predators.push(obj);
    } else if (obj instanceof Protista.Bullet) {
      this.bullets.push(obj);
    }
  }

  Game.prototype.addPredators = function(numPredators) {
    for (var i = 0; i < numPredators; i++) {
      this.predators.push(
        new Protista.Predator({game: this, pos: this.randomPosition() })
      );
    }
  };

  Game.prototype.draw = function(ctx) {

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    })
  }

  Game.prototype.allObjects = function() {
    return this.predators.concat(this.bullets).concat([this.ship]);
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

    if (obj instanceof Protista.Predator) {
      var idx = this.predators.indexOf(obj);
      if (idx !== -1) {
        this.predators = this.predators.slice(0, idx).concat(this.predators.slice(idx+1))
      }
    } else if (obj instanceof Protista.Bullet) {
      var idx = this.bullets.indexOf(obj);
      if (idx !== -1) {
        this.bullets = this.bullets.slice(0, idx).concat(this.bullets.slice(idx+1))
      }
    }

    if (this.predators.length < 2) {
      this.addPredators(12);
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
