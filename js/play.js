var playState = {

  create: function() {
    this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
    game.global.score = 0;

    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy');
    this.enemy.scale.setTo(10, 10);
    this.enemy.anchor.setTo(0.5, 1);

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 1);

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