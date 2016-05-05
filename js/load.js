// The load state loads the assets that will be used in the game 
var loadState = {

	preload: function () {
		// Add a loading label on the screen
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);
		// Display the progress bar 
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);
		// Dude is the spritesheet for the character you play as 
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		// The following are sprites used in the game:
		game.load.image('square', 'assets/square.png');
    	game.load.image('star0', 'assets/star0.png');
		game.load.image('enemy0', 'assets/enemy0.png');
		game.load.image('boss', 'assets/boss.png');
		game.load.image('youwin', 'assets/Youwin.png')
		game.load.image('pixel', 'assets/pixel.png');
		game.load.image('sky', 'assets/sky.png');
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		game.load.image('jumpButton', 'assets/jumpButton.png');
		game.load.image('downButton', 'assets/jumpButton.png');
		game.load.image('rightButton', 'assets/rightButton.png');
		game.load.image('leftButton', 'assets/leftButton.png');
		// The following are audio used in the game: 
		game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
		game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
		game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
	},

	create: function() { 
		// We go to the menu state 
		game.state.start('menu');
		game.add.image(0, 0, 'sky');
	}
};