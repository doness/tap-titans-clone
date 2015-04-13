var playState = {

  create: function() {
    game.global.taps = 0;
    game.global.level = 1;
    game.global.enemyNumber = 1;
    game.global.coins = 0;

    this.tapsLabel = game.add.text(10, 30, 'taps: ' + game.global.taps, { font: '14px Arial', fill: '#ffffff' });
    this.levelLabel = game.add.text(10, 50, 'level: ' + game.global.level, { font: '14px Arial', fill: '#ffffff' });
    this.enemyNumberLabel = game.add.text(10, 70, game.global.enemyNumber + ' / ' + this.calculateTotalEnemy(), { font: '14px Arial', fill: '#ffffff' });
    this.enemyHPLabel = game.add.text(10, 90, 'enemyHP: ' + game.global.enemyHP, { font: '14px Arial', fill: '#ffffff' });
    this.coinsLabel = game.add.text(10, 110, 'coins: ' + game.global.coins, { font: '14px Arial', fill: '#ffffff' });

    this.spawnEnemy();
    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 1);

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tapCheck, this);
    game.input.onDown.add(this.tapCheck, this);
  },

  update: function() {
    this.coinsLabel.text = 'coins: ' + game.global.coins;
  },

  spawnEnemy: function() {
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.scale.setTo(7, 7);
    this.enemy.anchor.setTo(0.5, 1);
    game.global.enemyHP = this.calculateEnemyHP();
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  calculateTotalEnemy: function() {
    // implement calculate total enemy
    var totalEnemy = 10;
    return totalEnemy;
  },

  calculateEnemyHP: function() {
    // implement calculate enemy hp
    var enemyHP = 100;
    return enemyHP;
  },

  calculatePlayerDamage: function() {
    // implement calculate player damage
    var playerDamage = 30;
    return Math.min(playerDamage, game.global.enemyHP);
  },

  displayDamage: function(damage) {
    var damageLabel = game.add.text(game.world.centerX, game.world.centerY - 30, damage, { font: '14px Arial', fill: '#ffffff' });
    damageLabel.anchor.setTo(0.5, 0.5);
    var damageTween = game.add.tween(damageLabel);
    damageTween.to({y: game.world.centerY - 160}, 1000);
    damageTween.start();
    damageTween.onComplete.add( function() {
      damageLabel.destroy();
    }, this);
  },

  attackEnemy: function() {
    var playerDamage = this.calculatePlayerDamage();
    this.displayDamage(playerDamage);
    game.global.enemyHP -= playerDamage;
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  removeCoin: function(item) {
    var coin = 10;
    var coinLabel = game.add.text(item.x, item.y, coin, { font: '14px Arial', fill: 'orange' });
    coinLabel.anchor.setTo(0.5, 0.5);
    var coinTween = game.add.tween(coinLabel);
    coinTween.to({y: item.y - 50}, 1000);
    coinTween.start();
    coinTween.onComplete.add( function() {
      coinLabel.destroy();
    }, this);
    game.global.coins += coin;
    // this.coinsLabel.text = 'coins: ' + game.global.coins;
    item.kill();
  },

  dropCoins: function() {
    // implement drop coins
    coins = game.add.group();
    var coinsNumber = 3;
    for (var i = 0; i < coinsNumber; i++) {
      var coin = coins.create(game.world.randomX, game.world.randomY, 'coin', 0);
    }
    coins.setAll('inputEnabled', true);
    coins.callAll('events.onInputDown.add', 'events.onInputDown', this.removeCoin);
  },

  removeEnemy: function() {
    this.enemy.kill();
    this.dropCoins();
    // implement check for 5th and 10th enemy
    if (game.global.enemyNumber === this.calculateTotalEnemy()) {
      game.global.level ++;
      this.levelLabel.text = 'level: ' + game.global.level;
      game.global.enemyNumber = 1;
      this.enemyNumberLabel.text = game.global.enemyNumber + ' / ' + this.calculateTotalEnemy();
    } else {
      game.global.enemyNumber ++;
      this.enemyNumberLabel.text = game.global.enemyNumber + ' / ' + this.calculateTotalEnemy();
    }
    game.time.events.add(500, this.spawnEnemy, this);
  },

  displayTap: function(x, y) {
    game.global.taps ++;
    this.tapsLabel.text = 'taps: ' + game.global.taps;
    var taplocationLabel = game.add.text(x, y, x + ',' + y, { font: '14px Arial', fill: '#ffffff' });
    taplocationLabel.anchor.setTo(0.5, 0.5);
    var taplocationTween = game.add.tween(taplocationLabel);
    taplocationTween.to({y: y - 30}, 1000);
    taplocationTween.start();
    taplocationTween.onComplete.add( function() {
      taplocationLabel.destroy();
    }, this);
  },

  tapCheck: function() {
    this.displayTap(game.input.x,game.input.y);
    if (this.enemy.alive) {
      this.attackEnemy();
      if (game.global.enemyHP === 0) {
        this.removeEnemy();
      }
    }
  },

};