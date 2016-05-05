// The state responsible for the menu of our game 
var menuState = {

	create: function() { 
		// The menu has the sky background 
		game.add.image(0, 0, 'sky');
		// Here's the title. The tween animates the title so that it falls from above and bounces a bit. 
		var nameLabel = game.add.text(game.world.centerX, -50, 'War Glax', { font: '70px Geo', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5, 0.5);
		game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
		// If there isn't a best score found in the local storage, we create a best score starting at 0 
		if (!localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', 0);
		}
		// This updates the best store 
		if (game.global.score > localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', game.global.score);	
		}
		// The following desplays the score of the last game played as well as the best score in the local storage 
		var text = 'score: ' + game.global.score + '\nbest score: ' + localStorage.getItem('bestScore');
		var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
		scoreLabel.anchor.setTo(0.5, 0.5);
		// This is intended so that, different devices will display different texts. 
		if (this.game.device.desktop) {
			var text = 'press the up arrow key to start';
		}
		else {
			var text = 'touch the screen to start';
		}
		var startLabel = game.add.text(game.world.centerX, game.world.height-80, text, { font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);
		// The tween animates the text 
		game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start(); 
		// The mute button is added and clicking it or touching it calls the toggleSound function 
		this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
		this.muteButton.input.useHandCursor = true;
		if (game.sound.mute) {
			this.muteButton.frame = 1;
		}
		// Pressing the up arrow executes the start function which takes us to the play state 
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.addOnce(this.start, this);
		// The line below is intended so that a touch or click calls the start function. 
		game.input.onDown.addOnce(this.start, this);
	},
	// Toggles between mute and un-mute 
	toggleSound: function() {
		game.sound.mute = ! game.sound.mute;
		this.muteButton.frame = game.sound.mute ? 1 : 0;		
	},

	start: function() {
		// We go to the play state 
		game.state.start('play');	
	}
};