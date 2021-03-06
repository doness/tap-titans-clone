var menuState = {

  create: function() {
    var nameLabel = game.add.text(game.world.centerX, -50, 'Tap Titans Clone', { font: '40px Arial', fill: '#ffffff' });
    nameLabel.anchor.setTo(0.5, 0.5);
    game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();

    // If 'bestScore' is not defined
    // It means that this is the first time the game is played
    if (!localStorage.getItem('bestScore')) {
        // Then set the best score to 0
        localStorage.setItem('bestScore', 0);
    }

    // If the score is higher than the best score
    if (game.global.score > localStorage.getItem('bestScore')) {
        // Then update the best score
        localStorage.setItem('bestScore', game.global.score);
    }

    var text = 'score: ' + game.global.score + '\nbest score: ' +
    localStorage.getItem('bestScore');
    var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
    scoreLabel.anchor.setTo(0.5, 0.5);

    var text2;
    if (game.device.desktop) {
        text2 = 'press the up arrow key to start';
    }
    else {
        text2 = 'touch the screen to start';
    }
    var startLabel = game.add.text(game.world.centerX, game.world.height-80, text2, { font: '25px Arial', fill: '#ffffff' });
    startLabel.anchor.setTo(0.5, 0.5);
    game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 500).loop().start();

    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
    game.input.onDown.addOnce(this.start, this);

  },

  start: function() {
    game.state.start('play');
  },
};