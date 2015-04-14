var game = new Phaser.Game(375, 667, Phaser.AUTO, 'gameDiv');
// var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'gameDiv');

game.global = {
  taps: 0,
  enemyHP: 0,
  enemyHPTotal: 0,
  level: 1,
  enemyNumber: 1,
  coins: 0,
  player: {
    name: 'hero',
    skill1: 0,
    skill2: 0,
    skill3: 0,
    skill4: 0,
    skill5: 0,
    skill6: 0,
  }
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');