// The boot state is the state before the load state
var bootState = {
// This loads the progress bar for the load state
	preload: function () {
		game.load.image('progressBar', 'assets/progressBar.png');
	},
// Some settings 
	create: function() { 
		game.add.image(0, 0, 'sky');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// If device is not desktop, then it's mobile. We set the type of scaling to show all 
		if (!game.device.desktop) {
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			// Adding color to the page hides the white borders we might have. 
			document.body.style.backgroundColor = '#3498db';
			// This sets the min and max width and height of the game 
			game.scale.minWidth = 250;
			game.scale.minHeight = 170;
			game.scale.maxWidth = 1000;
			game.scale.maxHeight = 680;
			// We center the game on the screen 
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			// Apply scale changes 
			game.scale.setScreenSize(true);
		} 
		// We start the load state
		game.state.start('load');
	}
};