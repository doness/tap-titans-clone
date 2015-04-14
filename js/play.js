var playState = {

  create: function() {
    this.emptyHpBar = game.add.sprite(game.world.centerX, 45, 'emptyHpBar');
    this.fullHpBar = game.add.sprite(game.world.centerX - 100, 45, 'fullHpBar');
    this.emptyHpBar.anchor.setTo(0.5, 0);
    this.fullHpBar.anchor.setTo(0, 0);

    this.tapsLabel        = game.add.text(10, 30, 'taps: ' + game.global.taps, { font: '14px Arial', fill: '#ffffff' });
    this.enemyNumberLabel = game.add.text(300, 30, game.global.enemyNumber + ' / ' + this.calculateTotalEnemy(), { font: '14px Arial', fill: '#ffffff' });
    this.levelLabel       = game.add.text(game.world.centerX, 10, 'level: ' + game.global.level, { font: '14px Arial', fill: '#ffffff' });
    this.enemyHPLabel     = game.add.text(game.world.centerX, 48, game.global.enemyHP + ' HP', { font: '12px Arial', fill: '#000000' });
    this.coinsLabel       = game.add.text(game.world.centerX, 70, 'coins: ' + game.global.coins, { font: '14px Arial', fill: '#ffffff' });
    this.coinsLabelIcon   = game.add.sprite(this.coinsLabel.x - 45, this.coinsLabel.y, 'coin');

    this.levelLabel.anchor.setTo(0.5, 0);
    this.enemyHPLabel.anchor.setTo(0.5, 0);
    this.coinsLabel.anchor.setTo(0.5, 0);

    this.spawnEnemy();

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

    this.button1 = game.add.sprite(0, game.world.height, 'button1');
    this.button1.inputEnabled = true;
    this.button1.anchor.setTo(0, 1);
    // this.button1.events.onInputDown.add(this.fap(), this);
    this.button2 = game.add.sprite(this.button1.width + 5, game.world.height, 'button2');
    this.button2.inputEnabled = true;
    this.button2.anchor.setTo(0, 1);
    this.button3 = game.add.sprite(this.button1.width*2 + 10, game.world.height, 'button3');
    this.button3.inputEnabled = true;
    this.button3.anchor.setTo(0, 1);
    this.button4 = game.add.sprite(this.button1.width*3 + 15, game.world.height, 'button4');
    this.button4.inputEnabled = true;
    this.button4.anchor.setTo(0, 1);

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 1);

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tapCheck, this);
    game.input.onDown.add(this.tapCheck, this);
  },

  update: function() {
    this.coinsLabel.text = 'coins: ' + game.global.coins;
    game.physics.arcade.collide(this.ground, this.coins);
    this.fullHpBar.scale.setTo(game.global.enemyHP / game.global.enemyHPTotal, 1);
  },

  spawnEnemy: function() {
    var totalEnemy = this.calculateTotalEnemy();
    var enemyType = game.global.enemyNumber === totalEnemy ? game.global.level % 5 === 0 ? 'boss' : 'mini-boss' : 'titan';
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.anchor.setTo(0.5, 1);
    if (enemyType === 'boss'){
      this.enemy.scale.setTo(10, 13);
    } else if (enemyType === 'mini-boss'){
      this.enemy.scale.setTo(10, 10);
    } else {
      this.enemy.scale.setTo(7, 7);
    }
    var newEnemyHP = this.calculateEnemyHP(enemyType);
    game.global.enemyHPTotal = newEnemyHP;
    game.global.enemyHP = newEnemyHP;
    this.enemyHPLabel.text =  game.global.enemyHP + ' HP';
  },

  calculateTotalEnemy: function() {
    // implement calculate total enemy
    var totalEnemy = 10;
    return totalEnemy;
  },

  calculateEnemyHP: function(type) {
    // implement calculate enemy hp
    var hpModifier = [2,4,6,7,10];
    var titanHP = Math.floor( 18.5 * Math.pow(1.57, Math.min(game.global.level, 156)) * Math.pow(1.17, Math.max(game.global.level - 156, 0)) );
    var bossHP = titanHP * hpModifier[(game.global.level - 1) % 5];
    if (type === "titan"){
      return titanHP;
    } else {
      return bossHP;
    }
  },

  calculatePlayerDamage: function() {
    // implement calculate player damage
    var playerDamage = 15;
    return Math.min(playerDamage, game.global.enemyHP);
  },

  displayDamage: function(damage) {
    var damageLabel = game.add.text(game.world.centerX, game.world.centerY - 30, damage, { font: '20px Arial', fill: '#ffffff' });
    damageLabel.anchor.setTo(0.5, 0.5);
    var damageTween = game.add.tween(damageLabel);
    damageTween.to({y: game.world.centerY - 160, alpha: 0}, 1500);
    damageTween.start();
    damageTween.onComplete.add( function() {
      damageLabel.destroy();
    }, this);
  },

  attackEnemy: function() {
    var playerDamage = this.calculatePlayerDamage();
    this.displayDamage(playerDamage);
    game.global.enemyHP -= playerDamage;
    this.enemyHPLabel.text =  game.global.enemyHP + ' HP';
  },

  removeCoin: function(coin) {
    var coinLabel = game.add.text(coin.x, coin.y - 30, coin.gold, { font: '22px Arial', fill: 'orange' });
    coinLabel.anchor.setTo(0.5, 0.5);
    var coinTween = game.add.tween(coinLabel);
    coinTween.to({y: coin.y - 100, alpha: 0}, 1500);
    coinTween.start();
    coinTween.onComplete.add( function() {
      coinLabel.destroy();
    }, this);
    var coinAnimation = game.add.tween(coin);
    coinAnimation.to({x: 150, y: 78}, 1000);
    coinAnimation.start();
    coinAnimation.onComplete.add( function(){
      game.global.coins += coin.gold;
      coin.kill();
    }, this);
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
      coin.body.drag.set(80);
      coin.body.gravity.y = 1500;
      coin.body.velocity.y = -500;
      coin.body.velocity.x = Math.random() * 150 * util.plusOrMinus();
      coin.gold = Math.ceil( game.global.enemyHPTotal * (0.02 + (0.00045 * Math.min(game.global.level, 150))) );
      game.time.events.add(3000, this.removeCoin, this, coin);
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
      game.time.events.add(500, this.spawnEnemy, this);
      game.global.enemyNumber ++;
    }
    this.enemyNumberLabel.text = game.global.enemyNumber + ' / ' + this.calculateTotalEnemy();
  },

  displayTap: function(x, y) {
    game.global.taps ++;
    this.tapsLabel.text = 'taps: ' + game.global.taps;
    var taplocationLabel = game.add.text(x, y, x + ',' + y, { font: '12px Arial', fill: '#ffffff' });
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