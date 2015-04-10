var loadState = {

  preload: function () {
    // Load a new asset that we will use in the menu state
    game.load.image('background', 'assets/background.png');
  },

  create: function() {
    // Go to the menu state
    game.state.start('menu');
  }
};