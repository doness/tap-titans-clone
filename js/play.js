var playState = {

  create: function() {
    game.global.taps = 0;
    this.tapsLabel = game.add.text(10, 10, 'taps: ' + game.global.taps, { font: '14px Arial', fill: '#ffffff' });

    game.global.level = 1;
    this.levelLabel = game.add.text(10, 30, 'level: ' + game.global.level, { font: '14px Arial', fill: '#ffffff' });

    this.enemyHPLabel = game.add.text(10, 50, 'enemyHP: ' + game.global.enemyHP, { font: '14px Arial', fill: '#ffffff' });
    this.spawnEnemy();

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 1);

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tapCheck, this);
    game.input.onDown.add(this.tapCheck, this);
  },

  update: function() {

  },

  spawnEnemy: function() {
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.scale.setTo(10, 10);
    this.enemy.anchor.setTo(0.5, 1);
    game.global.enemyHP = this.calculateEnemyHP();
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  calculateEnemyHP: function() {
    // calculate enemy hp
    var enemyHP = 100;
    return enemyHP;
  },

  calculatePlayerDamage: function() {
    // calculate player damage
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
    if (this.enemy.alive) {
      var playerDamage = this.calculatePlayerDamage();
      this.displayDamage(playerDamage);
      game.global.enemyHP -= playerDamage;
      this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
    }
  },

  tapCheck: function() {
    game.global.taps ++;
    this.tapsLabel.text = 'taps: ' + game.global.taps;
    if (this.enemy.alive) {
      this.attackEnemy();
      if (game.global.enemyHP === 0) {
        this.enemy.kill();
        game.time.events.add(500, this.spawnEnemy, this);
      }
    }
  },

  startMenu: function() {
    game.state.start('menu');
  },

};