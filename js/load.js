var loadState = {

  preload: function () {

    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');

  },

  create: function() {
    // Go to the menu state
    game.state.start('menu');
  }
};