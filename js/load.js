var loadState = {

  preload: function () {

    game.load.image('player', 'assets/player.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('coin', 'assets/coin.png');
    game.load.image('ground', 'assets/ground.png');

    game.load.image('button0', 'assets/button1.png');
    game.load.image('button1', 'assets/button2.png');
    game.load.image('button2', 'assets/button3.png');
    game.load.image('button3', 'assets/button4.png');

    game.load.image('menu', 'assets/menu.png');
    game.load.image('menuCloseButton', 'assets/menu-close.png');
    game.load.iamge('menuScrollableBackground', 'assets/menu-scrollable-background.png');
    game.load.iamge('menuItemBackground', 'assets/menu-item-background.png');
    game.load.iamge('menuButton0', 'assets/menubutton.png');
    game.load.iamge('menuButton1', 'assets/menubutton.png');
    game.load.iamge('menuButton2', 'assets/menubutton.png');
    game.load.iamge('menuButton3', 'assets/menubutton.png');
    game.load.iamge('icon', 'assets/icon.png');

    game.load.iamge('playerSkill', 'assets/player-skills.png');
    game.load.iamge('damage-display', 'assets/damage-display.png');

    game.load.image('emptyHpBar', 'assets/emptyhpbar.png');
    game.load.image('fullHpBar', 'assets/fullhpbar.png');

  },

  create: function() {
    game.state.start('menu');
  }

};