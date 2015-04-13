var loadState = {

  preload: function () {

    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('ground', 'assets/ground.png');

  },

  create: function() {
    game.state.start('menu');
  }

};