(function() {
  window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView = function(game, canvasEl) {
    this.game = game;
    this.ctx = canvasEl.getContext("2d");
  }

  GameView.prototype.start = function() {
    this.bindKeyHandlers();

    window.setInterval((function() {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 1000/60);
  };

  GameView.prototype.bindKeyHandlers = function(){
    var game = this.game;
    key( "w", function() { game.ship.power([0, -2]);  } );
    key( "a", function() { game.ship.power([-2, 0]);  } );
    key( "s", function() { game.ship.power([0, 2]);   } );
    key( "d", function() { game.ship.power([2, 0]);   } );
    key( "h", function() { game.ship.fireBullet();    } );
  }

})();
