var loadState = {

  preload: function () {

    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('ground', 'assets/ground.png');

    game.load.image('button1', 'assets/button1.png');
    game.load.image('button2', 'assets/button2.png');
    game.load.image('button3', 'assets/button3.png');
    game.load.image('button4', 'assets/button4.png');

  },

  create: function() {
    game.state.start('menu');
  }

};