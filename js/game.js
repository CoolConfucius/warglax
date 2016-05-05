// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
// Define our global variable 
game.global = {
	score: 0
};
// We add four states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
// We start the boot state 
game.state.start('boot');