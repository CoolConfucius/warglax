// The play state is the state responsible for when we are actually playing the game 
var playState = {
	// The create function is where we set up the game and display sprites. 
	create: function() { 
		// We use sky as our background for the game 
		game.add.image(0, 0, 'sky');
		// We tell phaser what keys we want to use in the game 
		this.cursor = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
		// Now the wasd keys can function like the arrow keys 
		this.wasd = {
			up: game.input.keyboard.addKey(Phaser.Keyboard.W),
			left: game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: game.input.keyboard.addKey(Phaser.Keyboard.D),
			down: game.input.keyboard.addKey(Phaser.Keyboard.S)
		};
		// If the game is running on a mobile device, we call the function addMobileInputs which will be explored later 
		if (!game.device.desktop) {
			this.addMobileInputs();
		}
		// We start with score 0 and 100 life points 
		game.global.score = 0;
		game.global.lives = 100;
		// We set the player in the center of the game world 
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
		game.physics.arcade.enable(this.player); // Use Arcade physics engine 
		// Anchor point is set to the middle of the sprite 
		this.player.anchor.setTo(0.5, 0.5);
		// Create the left and right animations by looping the specified frames 
    	this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.player.animations.add('right', [5, 6, 7, 8], 10, true);
		// The player can't move out of the game world 
		this.player.body.collideWorldBounds = true;
    	// We make a group called enemies so we don't have to create them one by one. They all share the same properties. We have 20 of them. 
		this.enemies = game.add.group();
		this.enemies.enableBody = true; // Enable arcade physics 
		this.enemies.createMultiple(20, 'enemy0');
		// Bosses are similar to enemies in code. The boss sprite is larger and we have 10 of them. 
		this.bosses = game.add.group();
		this.bosses.enableBody = true; 
		this.bosses.createMultiple(10, 'boss');
		// Code for the surpise when you reach score 11000
		this.win = game.add.group();
		this.win.enableBody = true; 
		this.win.createMultiple(4, 'youwin');
		// The first star
		this.star = game.add.sprite(60, 140, 'star0');
		game.physics.arcade.enable(this.star); // Use Arcade physics engine 
		this.star.anchor.setTo(0.5, 0.5);
		// The second star is like the first star, but with a different initial spot 
		this.star2 = game.add.sprite(120, 280, 'star0');
		game.physics.arcade.enable(this.star2); 
		this.star2.anchor.setTo(0.5, 0.5);
		// We add the score and life points text in the game at the specified coordinates. 
		this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });	
		this.lifeLabel = game.add.text(30, 50, 'lives: 100', { font: '18px Arial', fill: '#ffffff' });	
		// The following five lines are responsible for the animation that plays when the character gets hit and spills pixels 
		this.emitter = game.add.emitter(0, 0, 15);
		this.emitter.makeParticles('pixel');
		this.emitter.setYSpeed(-150, 150);
		this.emitter.setXSpeed(-150, 150);
		this.emitter.gravity = 0;
		// The below are sounds borrowed from Phaser. 
		this.jumpSound = game.add.audio('jump'); // For when a square kills an enemy. In the Phaser book example game, it was the audio used for jump. 
		this.starSound = game.add.audio('coin'); // When the player collects a star. In the Phaser book example game, it was collecting a coin. 
		this.deadSound = game.add.audio('dead'); // When the player is hit 
		// These variables will make more sense when we go to the code in the update function 
		this.nextEnemy = 0; // Spawning rate of enemies 
		this.nextBoss = 1000; // Score needed to summon the first boss
		// We create the squares 
    	this.squares = game.add.group();
    	this.squares.enableBody = true;  // Enable arcade physics 
    	// The squares appear surrounding the character. All squares share the same size and other properties. 
    	// They can't go outside the bounds. They bounce, but their speed decreases significantly after a bounce 
    	for (var i = 0; i < 5; i++)
	    {        
	        var square = this.squares.create(game.world.width/2 - 100 + i*50, game.world.height/2+100, 'square');        
	        square.body.collideWorldBounds = true;  
	        square.body.bounce.x = 0.1;
			square.body.bounce.y = 0.1;  
	    }
	    for (var i = 0; i < 5; i++)
	    {        
	        var square = this.squares.create(game.world.width/2 - 100 + i*50, game.world.height/2-100, 'square');        
	        square.body.collideWorldBounds = true;    
	       	square.body.bounce.x = 0.1;
			square.body.bounce.y = 0.1;  
	    }
	    for (var i = 0; i < 4; i++)
	    {        
	        var square = this.squares.create(game.world.width/2 - 100, game.world.height/2+50 - 50*i, 'square');        
	        square.body.collideWorldBounds = true;    
	       	square.body.bounce.x = 0.1;
			square.body.bounce.y = 0.1;  	        
	    }
	    for (var i = 0; i < 4; i++)
	    {        
	        var square = this.squares.create(game.world.width/2 + 100, game.world.height/2+50 - 50*i, 'square');        
	        square.body.collideWorldBounds = true;    
	       	square.body.bounce.x = 0.1;
			square.body.bounce.y = 0.1;  	        
	    }
	},
	// According to the Phaser book, the update function is called 60 times per second and it contains the game's logic. 
	update: function() {
		// So when two elements overlap or collide, a function is called. The functions will be explored in further detail 
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.bosses, this.playerDie2, null, this);
		game.physics.arcade.overlap(this.player, this.star, this.takeStar, null, this);
		game.physics.arcade.overlap(this.squares, this.star, this.takeStar, null, this);
		game.physics.arcade.overlap(this.enemies, this.star, this.takeStar, null, this);
		game.physics.arcade.overlap(this.bosses, this.star, this.takeStar, null, this);		
		game.physics.arcade.overlap(this.player, this.star2, this.takeStar2, null, this);
		game.physics.arcade.overlap(this.squares, this.star2, this.takeStar2, null, this);
		game.physics.arcade.overlap(this.enemies, this.star2, this.takeStar2, null, this);
		game.physics.arcade.overlap(this.bosses, this.star2, this.takeStar2, null, this);	
		game.physics.arcade.overlap(this.player, this.win, this.playerWin, null, this);
		game.physics.arcade.overlap(this.win, this.star, this.takeStar, null, this);
		game.physics.arcade.overlap(this.win, this.star2, this.takeStar2, null, this);
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemies, this.layer);
		game.physics.arcade.collide(this.player, this.squares, this.pushSquare, null, this);
		game.physics.arcade.collide(this.squares, this.enemies, this.killEnemy, null, this);		
		game.physics.arcade.collide(this.squares, this.squares, this.stopSquare, null, this); 
		game.physics.arcade.collide(this.win, this.enemies, this.killEnemy, null, this);
		game.physics.arcade.collide(this.win, this.bosses, this.killEnemy, null, this);
		// We call the movePlayer function which we'll explore soon. 
		this.movePlayer();
		// The spawning rate of enemies increases with score until it reaches its max 
		if (this.nextEnemy < game.time.now) {
			var start = 4000, end = 1000, score = 100;
			var delay = Math.max(start - (start-end)*game.global.score/score, end);			    
			this.addEnemy();
			this.nextEnemy = game.time.now + delay;
		}
		// The condition for summoning the next boss is to reach a score of 1000 more than the score needed to summon the previous boss 
		if (game.global.score >= this.nextBoss) {
			this.addBoss();
			this.nextBoss = this.nextBoss + 1000; 			
		}
		// Code for the surprise 
		if (game.global.score >= 11000) {
			this.addWin();
		}
	},
	// Function responsible for moving the player. 
	movePlayer: function() {
		// The character's speed increases with score but the increase stops when the score reaches 500. 
		var speedPlus = game.global.score;
		if (game.global.score>=500) {speedPlus=500;}
		// Pressing the right arrow key or wasd key moves the player to the direction 
		// The spritesheet animation plays when the player moves left or right. 
		if (this.cursor.left.isDown || this.wasd.left.isDown || this.moveLeft) {
			this.player.body.velocity.x = -100 - speedPlus;
			this.player.animations.play('left'); 
		}
		else if (this.cursor.right.isDown || this.wasd.right.isDown || this.moveRight) {
			this.player.body.velocity.x = 100 + speedPlus;
			this.player.animations.play('right');
		}
		else if (this.cursor.up.isDown || this.wasd.up.isDown || this.moveUp) {
			this.player.body.velocity.y = -100 - speedPlus;			
		}
		else if (this.cursor.down.isDown || this.wasd.down.isDown || this.moveDown) {
			this.player.body.velocity.y = 100 + speedPlus;			
		}
		// The player stops when no keys are pressed down. The player will display frame 4 of the spritesheet where the character is facing us. 
		else {
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
 			this.player.animations.stop(); 
	        this.player.frame = 4; 
		}		
	},
	// In the logic of this code, all the enemies are 'dead' and adding an enemy means making a dead one alive. 
	addEnemy: function() {
		var enemy = this.enemies.getFirstDead();
		if (!enemy) {
			return;
		}
		enemy.anchor.setTo(0.5, 1);
		// The portral where the is near the top vertically and center horizontally 
		enemy.reset(game.world.centerX, 50);		
		// Enemies bounce and bouncing doesn't change their speed. 
		enemy.body.bounce.x = 1;
		enemy.body.bounce.y = 1;
		// Enemies all have the same speed. The direction they move when spawned is random. 
		enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
		enemy.body.velocity.y = 100 * Phaser.Math.randomSign();
		// Enemies can't move out of the game world 
		enemy.checkWorldBounds = true;
		enemy.body.collideWorldBounds = true;
	},
	// Like with the enemies, all bosses are 'dead' in the code logic and adding one is making a dead one alive. 
	addBoss: function() {
		var boss = this.bosses.getFirstDead();
		if (!boss) {
			return;
		}
		// Same properties as the enemies except that bosses move faster. 
		boss.anchor.setTo(0.5, 1);
		boss.reset(game.world.centerX, 50);		
		boss.body.bounce.x = 1;
		boss.body.bounce.y = 1;
		boss.body.velocity.x = 150 * Phaser.Math.randomSign();
		boss.body.velocity.y = 150 * Phaser.Math.randomSign();
		boss.checkWorldBounds = true;
		boss.body.collideWorldBounds = true;
	},
	// Code for the surprise 
	addWin: function() {
		var winning = this.win.getFirstDead();
		if (!winning) {
			return;
		}
		winning.anchor.setTo(0.5, 1);
		winning.reset(game.world.centerX, 50);		
		winning.body.bounce.x = 1.5;
		winning.body.bounce.y = 1.5;
		winning.body.velocity.x = 50 * Phaser.Math.randomSign();
		winning.body.velocity.y = 50 * Phaser.Math.randomSign();
		winning.checkWorldBounds = true;
		winning.body.collideWorldBounds = true;
	},
	// The takeStar function has two parameters. It says player in the first parameter, but this function is called when the player, squares, enemies, or bosses overlap with the star. 
	takeStar: function(player, star) {
		// We add 10 points to the score and update the score label 
		game.global.score += (Math.floor(game.global.score / 500) + 10);
		this.scoreLabel.text = 'score: ' + game.global.score;
		// We add 1 life point and update the lives label 
		game.global.lives += 1; 
		this.lifeLabel.text = 'lives: ' + game.global.lives;
		// We call the following function that moves the star 
		this.updatestarPosition();
		// We play the audio. 
		this.starSound.play();
		// The animations are just for show. The player grows larger just for a moment and returns to the original size. 
		game.add.tween(this.player.scale).to({x:1.3, y:1.3}, 50).to({x:1, y:1}, 150).start();
		this.star.scale.setTo(0, 0);
		game.add.tween(this.star.scale).to({x: 1, y:1}, 300).start();
	},
	// When playing the game, it seems like the star disappears when collected and a new one appears. In code logic, the star just changed its location. 
	updatestarPosition: function() {
		// These are the possible spots where the star may go to in the game 
		var starPosition = [
			{x: 60, y: 60}, {x: 230, y: 60}, {x: 400, y: 60}, {x: 570, y: 60}, 
			{x: 60, y: 180}, {x: 230, y: 180}, {x: 400, y: 180}, {x: 570, y: 180},
			{x: 60, y: 300}, {x: 230, y: 300}, {x: 400, y: 300}, {x: 570, y: 300},
			{x: 60, y: 420}, {x: 230, y: 420}, {x: 400, y: 420}, {x: 570, y: 420}
		];
		// We don't want the star to go to the same spot where it was collected 
		for (var i = 0; i < starPosition.length; i++) {
			if (starPosition[i].x === this.star.x) {
				starPosition.splice(i, 1);
			}
		}
		// We change the star's position in the game 
		var newPosition = starPosition[game.rnd.integerInRange(0, starPosition.length-1)];
		this.star.reset(newPosition.x, newPosition.y);
	},
	// The previous functions apply to star1. The following two functions are exactly the same as the ones above except they apply to star2. 
	takeStar2: function(player, star2) {
		game.global.score += (Math.floor(game.global.score / 500) + 10);
		// game.global.score += 10;
		this.scoreLabel.text = 'score: ' + game.global.score;
		game.global.lives += 1; 
		this.lifeLabel.text = 'lives: ' + game.global.lives;
		this.updatestarPosition2();
		this.starSound.play();
		game.add.tween(this.player.scale).to({x:1.3, y:1.3}, 50).to({x:1, y:1}, 150).start();
		this.star2.scale.setTo(0, 0);
		game.add.tween(this.star2.scale).to({x: 1, y:1}, 300).start();
	},
	updatestarPosition2: function() {
		var starPosition = [
			{x: 60, y: 60}, {x: 230, y: 60}, {x: 400, y: 60}, {x: 570, y: 60}, 
			{x: 60, y: 180}, {x: 230, y: 180}, {x: 400, y: 180}, {x: 570, y: 180},
			{x: 60, y: 300}, {x: 230, y: 300}, {x: 400, y: 300}, {x: 570, y: 300},
			{x: 60, y: 420}, {x: 230, y: 420}, {x: 400, y: 420}, {x: 570, y: 420}
		];
		for (var i = 0; i < starPosition.length; i++) {
			if (starPosition[i].x === this.star2.x) {
				starPosition.splice(i, 1);
			}
		}
		var newPosition = starPosition[game.rnd.integerInRange(0, starPosition.length-1)];
		this.star2.reset(newPosition.x, newPosition.y);
	},
	// This is the function called when the player is hit by an enemy. 
	playerDie: function() {
		if (!this.player.alive) {
			return;
		}
		// We play the audio and the animation 
		this.deadSound.play();
		this.emitter.x = this.player.x;
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
		// If life points are above 0, do the following. Else, then see the else statement. 
		if (game.global.lives > 0) {			
			// The enemy bites of 10 life points per moment. Life has been drained, so we update the text. 
			game.global.lives -= 10; 
			this.lifeLabel.text = 'lives: ' + game.global.lives;
			game.add.tween(this.player.scale).to({x:0.3, y:0.3}, 50).to({x:1, y:1}, 150).start();
		}
		else{			
			// The player is removed from the game 
			this.player.kill();
			// We return to the menu, but after a short delay to give time for the audio and animation 
			game.time.events.add(1000, this.startMenu, this);	
		}				
	},
	// The follwing is the function called when the player is hit by a boss. 
	// It's exactly the same as the previous function except that the boss takes 20 life per moment. 
	playerDie2: function() {
		if (!this.player.alive) {
			return;
		}
		this.deadSound.play();
		this.emitter.x = this.player.x;
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
		if (game.global.lives > 0) {			
			game.global.lives -= 20; 
			this.lifeLabel.text = 'lives: ' + game.global.lives;
			game.add.tween(this.player.scale).to({x:0.3, y:0.3}, 50).to({x:1, y:1}, 150).start();
		}
		else{			
			this.player.kill();
			game.time.events.add(1000, this.startMenu, this);	
		}				
	},
	// Code for the surprise 
	playerWin: function() {
		if (!this.player.alive) {
			return;
		}
		this.deadSound.play();
		this.emitter.x = this.player.x;
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
		if (game.global.lives > 0) {			
			game.global.lives -= 5; 
			this.lifeLabel.text = 'lives: ' + game.global.lives;
			game.add.tween(this.player.scale).to({x:1.5, y:1.5}, 50).to({x:1, y:1}, 150).start();
		}
		else{			
			this.player.kill();
			game.time.events.add(1000, this.startMenu, this);	
		}				
	},
	// Pushing the square makes it go really fast 
	// I made it so that the wasd keys don't trigger this function. 
	// So for strategic reasons, the play can use wasd keys to move squares slowly and use arrow keys when they want to push 
	pushSquare: function (player, square) {    
	    if (this.cursor.left.isDown)
	    {        
	        square.body.velocity.x = -1000;        
	    }
	    else if (this.cursor.right.isDown)
	    {        
	        square.body.velocity.x = 1000;
	    }
	    else if (this.cursor.up.isDown)
	    {
	        square.body.velocity.y = -1000;

	    }else if (this.cursor.down.isDown)
	    {        
	        square.body.velocity.y = 1000;
	    }
	},
	// We call this function when squares and enemies collide 
	killEnemy: function(square, enemy) {    
    enemy.kill(); //The enemy is removed from the screen 
    this.jumpSound.play(); //The audio is played 
    // We gain 5 points for each enemy we kill. We update the score text. 
	game.global.score += 5;
	this.scoreLabel.text = 'score: ' + game.global.score;    
	},
	// We call this function when squares touch each other. 
	stopSquare: function(square1, square2) {
    if (square1.body.touching.square2) {square1.body.velocity.x=0; square1.body.velocity.y=0;    };    
	},
	// This function is called after a delay when the player's life goes to 0 or below, either killed by enemies or bosses. We go back the start menu. 
	startMenu: function() {
		game.state.start('menu');
	},
	// The following is my attempt at adding mobile inputs. Ideally, icons representing arrow keys will appear on screen and touching them would be equivalent to using arrow keys. 
	addMobileInputs: function() {
		this.moveLeft = false;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		// The sprites should all appear on the same vertical coordinate, but spaced out horizontally. Add move left button. 
		this.leftButton = game.add.sprite(50, 247, 'leftButton');
		this.leftButton.inputEnabled = true;
		this.leftButton.events.onInputOver.add(function(){this.moveLeft=true;}, this);
		this.leftButton.events.onInputOut.add(function(){this.moveLeft=false;}, this);
		this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
		this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);
		this.leftButton.alpha = 0.5;
		// Add the move right button. I got these button sprites from Phaser, except for the downButton.  
		this.rightButton = game.add.sprite(130, 247, 'rightButton');
		this.rightButton.inputEnabled = true;
		this.rightButton.events.onInputOver.add(function(){this.moveRight=true;}, this);
		this.rightButton.events.onInputOut.add(function(){this.moveRight=false;}, this);
		this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this);
		this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);
		this.rightButton.alpha = 0.5;
		// Add the move up button. The sprite is named jumpButton. It's a button used to jump in the example game. 
		this.upButton = game.add.sprite(350, 247, 'jumpButton');
		this.upButton.inputEnabled = true;
		this.upButton.events.onInputOver.add(function(){this.moveUp=true;}, this);
		this.upButton.events.onInputOut.add(function(){this.moveUp=false;}, this);
		this.upButton.events.onInputDown.add(function(){this.moveUp=true;}, this);
		this.upButton.events.onInputUp.add(function(){this.moveUp=false;}, this);
		this.upButton.alpha = 0.5;
		// Add the move down button. I made this sprite by inverting the jumpButton sprite. 
		this.downButton = game.add.sprite(430, 247, 'downButton');
		this.downButton.inputEnabled = true;
		this.downButton.events.onInputOver.add(function(){this.moveDown=true;}, this);
		this.downButton.events.onInputOut.add(function(){this.moveDown=false;}, this);
		this.downButton.events.onInputDown.add(function(){this.moveDown=true;}, this);
		this.downButton.events.onInputUp.add(function(){this.moveDown=false;}, this);
		this.downButton.alpha = 0.5;
	}
};