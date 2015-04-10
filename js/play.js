var playState = {

  create: function() {
    this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
    game.global.score = 0;

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tapCount, this);
    game.input.onDown.add(this.tapCount, this);
  },

  update: function() {

  },

  tapCount: function() {
    game.global.score ++;
    this.scoreLabel.text = 'score: ' + game.global.score;
  },

  startMenu: function() {
    game.state.start('menu');
  },

};