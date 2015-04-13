var playState = {

  create: function() {
    game.global.taps = 0;
    this.tapsLabel = game.add.text(10, 30, 'taps: ' + game.global.taps, { font: '14px Arial', fill: '#ffffff' });

    game.global.level = 1;
    this.levelLabel = game.add.text(10, 50, 'level: ' + game.global.level, { font: '14px Arial', fill: '#ffffff' });

    game.global.enemyNumber = 1;
    this.enemyNumberLabel = game.add.text(10, 70, game.global.enemyNumber + ' / ' + this.calculateTotalEnemy(), { font: '14px Arial', fill: '#ffffff' });

    this.enemyHPLabel = game.add.text(10, 90, 'enemyHP: ' + game.global.enemyHP, { font: '14px Arial', fill: '#ffffff' });
    this.spawnEnemy();

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 1);

    this.emitter = game.add.emitter(0, 0, 15);
    this.emitter.makeParticles('pixel');
    this.emitter.setYSpeed(-150, 150);
    this.emitter.setXSpeed(-150, 150);
    this.emitter.gravity = 0;

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.tapCheck, this);
    game.input.onDown.add(this.tapCheck, this);
  },

  update: function() {

  },

  spawnEnemy: function() {
    this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy').sendToBack();
    this.enemy.scale.setTo(7, 7);
    this.enemy.anchor.setTo(0.5, 1);
    game.global.enemyHP = this.calculateEnemyHP();
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  calculateTotalEnemy: function() {
    // calculate total enemy
    var totalEnemy = 10;
    return totalEnemy;
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
    var playerDamage = this.calculatePlayerDamage();
    this.displayDamage(playerDamage);
    game.global.enemyHP -= playerDamage;
    this.enemyHPLabel.text = 'enemyHP: ' + game.global.enemyHP;
  },

  enemyDie: function() {
    this.enemy.kill();
    // drop coins
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
    // this.emitter.x = x;
    // this.emitter.y = y;
    // this.emitter.start(true, 600, null, 15);
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
    game.global.taps ++;
    this.tapsLabel.text = 'taps: ' + game.global.taps;
    if (this.enemy.alive) {
      this.attackEnemy();
      if (game.global.enemyHP === 0) {
        this.enemyDie();
      }
    }
  },

};