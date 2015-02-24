(function() {
  window.Protista = window.Protista || {};

  var GameView = Protista.GameView = function(game, canvasEl) {
    var that = this;
    that.game = game;
    that.ctx = canvasEl.getContext("2d");
  }

  GameView.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.loadMedia();

    background = new Image();
    background.onload = function () {
      that.ctx.drawImage(background, 0, 0);
    };
    background.src = 'images/background.png';

    window.setInterval((function() {
      this.game.step();
      this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
      background.onload();
      this.game.draw(this.ctx);

    }).bind(this), 1000/60);

  };

  GameView.prototype.bindKeyHandlers = function() {
    var game = this.game;
    key( "w", function() { game.ship.power([0, -2]);  } );
    key( "a", function() { game.ship.power([-2, 0]);  } );
    key( "s", function() { game.ship.power([0, 2]);   } );
    key( "d", function() { game.ship.power([2, 0]);   } );
    key( "h", function() { game.ship.fireBullet();    } );
  }

  GameView.prototype.loadMedia = function() {
    this.audioEl = document.createElement('audio');
    this.audioEl.setAttribute('src', 'audio/powell_forbidden_friendship.mp3');
    this.audioEl.play();


  }

})();
