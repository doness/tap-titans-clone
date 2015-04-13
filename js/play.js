var playState = {

  create: function() {
    this.tapsLabel = game.add.text(10, 30, 'taps: ' + game.global.taps, { font: '14px Arial', fill: '#ffffff' });
    this.levelLabel = game.add.text(10, 50, 'level: ' + game.global.level, { font: '14px Arial', fill: '#ffffff' });
    this.enemyNumberLabel = game.add.text(10, 70, game.global.enemyNumber + ' / ' + this.calculateTotalEnemy(), { font: '14px Arial', fill: '#ffffff' });
    this.enemyHPLabel = game.add.text(10, 90, 'enemyHP: ' + game.global.enemyHP, { font: '14px Arial', fill: '#ffffff' });
    this.coinsLabel = game.add.text(10, 110, 'coins: ' + game.global.coins, { font: '14px Arial', fill: '#ffffff' });

    this.spawnEnemy();
    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 1);

    this.coins = game.add.group();
    this.coins.enableBody = true;
    this.coins.createMultiple(500, "coin");
    this.coins.setAll('anchor.x', 0.5);
    this.coins.setAll('anchor.y', 1);
    this.coins.setAll('checkWorldBounds', true);

    this.ground = game.add.sprite(0, game.world.centerY, 'ground');
    this.ground.anchor.setTo(0, 0);
    game.physics.arcade.enable(this.ground);
    this.ground.body.immovable = true;

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tapCheck, this);
    game.input.onDown.add(this.tapCheck, this);
  },

  update: function() {
    this.coinsLabel.text = 'coins: ' + game.global.coins;
    game.physics.arcade.collide(this.coins, this.ground, this.stopCoinSlide());
  },

  stopCoinSlide: function() {
    this.coins.forEachAlive(function(coin){
      if (coin.body.y + coin.body.height > game.world.centerY - 1){
        coin.body.velocity.x = 0;
      }
    }, this);
  },

  spawnEnemy: function() {
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.scale.setTo(7, 7);
    this.enemy.anchor.setTo(0.5, 1);
    game.global.enemyHP = this.calculateEnemyHP();
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  spawnMiniBoss: function() {
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.scale.setTo(10, 10);
    this.enemy.anchor.setTo(0.5, 1);
    game.global.enemyHP = this.calculateEnemyHP();
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  spawnBoss: function() {
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.scale.setTo(10, 13);
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

  removeCoin: function(coin) {
    var coinValue = 10;
    var coinLabel = game.add.text(coin.x, coin.y, coinValue, { font: '14px Arial', fill: 'orange' });
    coinLabel.anchor.setTo(0.5, 0.5);
    var coinTween = game.add.tween(coinLabel);
    coinTween.to({y: coin.y - 50}, 500);
    coinTween.start();
    coinTween.onComplete.add( function() {
      coinLabel.destroy();
    }, this);
    game.global.coins += coinValue;
    // this.coinsLabel.text = 'coins: ' + game.global.coins;
    coin.kill();
  },

  dropCoins: function() {
    var coinsNumber = 3;
    for (var i = 0; i < coinsNumber; i++) {
      var coin = this.coins.getFirstDead();
      coin.body.collideWorldBounds = true;
      coin.anchor.setTo(0.5, 1);
      coin.reset(this.enemy.x, this.enemy.y - this.enemy.height / 2);
      game.physics.arcade.enable(coin);
      coin.body.bounce.set(0.3);
      coin.body.friction.set(0.5);
      coin.body.gravity.y = 1000;
      coin.body.velocity.y = -500;
      coin.body.velocity.x = Math.random() * 100 * util.plusOrMinus();
    }
    this.coins.setAll('inputEnabled', true);
    this.coins.callAll('events.onInputDown.add', 'events.onInputDown', this.removeCoin);
  },

  removeEnemy: function() {
    this.dropCoins();
    this.enemy.kill();
    var totalEnemy = this.calculateTotalEnemy();
    if (game.global.enemyNumber === totalEnemy) {
      game.global.level ++;
      this.levelLabel.text = 'level: ' + game.global.level;
      game.global.enemyNumber = 1;
      game.time.events.add(500, this.spawnEnemy, this);
    } else {
      if (game.global.enemyNumber === totalEnemy - 1 && game.global.level % 10 === 9) {
        game.time.events.add(500, this.spawnBoss, this);
      } else if (game.global.enemyNumber === totalEnemy - 1) {
        game.time.events.add(500, this.spawnMiniBoss, this);
      } else {
        game.time.events.add(500, this.spawnEnemy, this);
      }
      game.global.enemyNumber ++;
    }
    this.enemyNumberLabel.text = game.global.enemyNumber + ' / ' + this.calculateTotalEnemy();
  },

  displayTap: function(x, y) {
    game.global.taps ++;
    this.tapsLabel.text = 'taps: ' + game.global.taps;
    var taplocationLabel = game.add.text(x, y, x + ',' + y, { font: '14px Arial', fill: '#ffffff' });
    taplocationLabel.anchor.setTo(0.5, 0.5);
    var taplocationTween = game.add.tween(taplocationLabel);
    taplocationTween.to({y: y - 30}, 500);
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