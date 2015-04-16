var game = new Phaser.Game(375, 667, Phaser.AUTO, 'gameDiv');
// var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'gameDiv');

game.global = {
  taps: 0,
  enemyHP: 0,
  enemyHPTotal: 0,
  level: 1,
  enemyNumber: 1,
  coins: 0,
  menu: {
    menu0Level: [1, 0, 0, 0, 0, 0],
    menu1Level: [2, 0, 0, 0, 0, 0],
    menu2Level: [3, 0, 0, 0, 0, 0],
    menu3Level: [4, 0, 0, 0, 0, 0],
  },
  baseMenu: {
    menu0Level: data.playerSkills,
    menu1Level: data.hero,
    menu2Level: [3, 0, 0, 0, 0, 0],
    menu3Level: [4, 0, 0, 0, 0, 0],
  }
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');