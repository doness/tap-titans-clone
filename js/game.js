// Initialise Phaser
var game = new Phaser.Game(375, 667, Phaser.AUTO, 'gameDiv');

// Define our 'global' variable
game.global = {
  taps: 0,
  enemyHP: 0,
  level: 0
};

// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// Start the 'boot' state
game.state.start('boot');