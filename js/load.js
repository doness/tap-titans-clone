var loadState = {

  preload: function () {

    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');

  },

  create: function() {
    game.state.start('menu');
  }

};