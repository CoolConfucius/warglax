# War Glax: 
## A Game made using the Phaser game engine 
A portal cracked open in the sky and monsters from another world are attacking the sky villagers of Glax. While the experts are working on closing the portal, a warrior buys them time by battling with the enemies. His weapon of choice is clouds made into green cubes with properties that destroy enemies. Solar energy pieces that take the form of stars boost the warrior's flight speed and repair his red shield named Lives. 

How to play:

Character and Stars: 
Use the arrow keys to move your character. You gain 10 points for each star you collect. You initial speed is slow, but your speed increases with score until you reach a maximum speed. 

Green squares: 
They are your weapons and defense against enemies. The squares stack. You gain 5 points for each enemy killed by squares. 

Move squares: 
Gently touching the squares move them with arcade physics, the squares will move at the speed proportional to the speed you pushed them. Squares move when enemies collide into them. 

Push squares: 
Run into the squares and see them go fast. Useful for killing distant enemies or collecting distant stars. When the squares hit the bounds, they bounce, but the bounce speed is a lot slower than the speed it was pushed. 

Pull squares: 
When a square is stuck on the bounds, you can touch it then move backwards to pull it then hurl it. 

Hurl squares:
When your character is touching a square, but not moving it, then you can hurl the square by pressing the direction you want to hurl it at. Can hurl diagonally using a combination of arrow keys. Relatively complex to execute with precision, but it isn't necessary to use this move to achieve a high score. Easiest to use when squares are stuck on walls or corners. 

Enemies: 
Enemies spawn from the portal. All enemies have the same size and movement speed. The direction they spawn from the portal is random. They bounce when they hit the bounds and their speed is unchanged. In the beginning, the spawning rate of enemies is slow. The rate increases with your score until it reaches a maximum. The max number of enemies that can be on screen is 20. 

Bosses: 
Spawn from the portal and similar to enemies except: They are bigger and faster. And they can go through squares! A boss is summoned when you gain 1000 points. So at score 1000, there's one boss. At 2000, there's two bosses, and so on. There can be a maximum of ten bosses on screen. If you reach a score of 11000, consider yourself victorious. At that point, the bosses give up and return to the world they came from along with the enemies. Then the portal closes. The end. 

Life points: 
You start out with 100 life points. You gain one life point when you collect a star. A hit from an enemy costs 10 life points per moment. A hit from a boss costs 20 life points per moment. When your life drops below 0, you go back to the menu. 

Hints:
--If you want to score fast and think you can easily avoid enemies, widen focus to whole screen and collect stars. 
--When there's a lot of enemies or bosses on screen, narrow focus to the character and its surroundings and focus on dodging. 
--Enemies and bosses drain a fixed amount of life "per moment". This means the an enemy can deal damage twice or more than the fixed amount depending on the context. When hit, move away from the enemy or boss quickly so minimize damage. Staying with or moving with the enemies or bosses allow them to drain your life quickly. Say you have 
--When surrounded by enemies and bosses and it's impossible to get out unscratched, run through enemies, not bosses. 
--You can hide your character within the green squares to avoid enemies, but this doesn't work with bosses. And hiding is no fun. 
--In the beginning, gaining points increase your speed, but they also increase the spawning rate of enemies. In the later game, gaining points summon bosses. In general, your score is your progress in the game and more progress means more difficulty. Collect stars to progress faster or avoid them if you want the opposite. 
--Enemies and bosses can collect stars for you. You can also use squares to collect stars. 





May 2016 updates: 
Added HTML H1 tag. 
Now, when taking a star, gets additional points based on current score. 




Winter 2015 Logs: 
Post Second Milestone Updates:
--Introduced bosses. These are larger and faster than enemies, and they go through green squares. Gain 1000 points for each boss summon. I showed a glimpse of them in the presentation. At that point, the maximum number of bosses was 5. 
--Points added from stars went from 5 to 10. 
--Now there are two stars on screen. Both stars look the same and give the same number of points. When you only see one star on screen, it means the stars are overlapping. 
--Maximum number of bosses went from 5 to 10. 
--Maximum number of enemies on screen went from 10 to 20. 
-- Introduced lives 

Life Points, the Major Feature: 
--start with 100 life points 
--each star gives 1 point 
--enemies drain 10 points per moment. There are 60 moments per second. 
--bosses drain 20 points per moment 
--when hit, the character shrinks temporarily for a moment, a tween similar to the temporary growth when collecting stars. 
--spills pixels and plays audio when hit 
--when life drops below zero, return to menu 

Last minute surprise before submission addition: 
--reach score 11000 for a surprise. 

On sprites: 
--Thanks to your help, now the game uses the sprite sheet I made based on the original Phaser dude sprite sheet. 
--In the sky background, I added thunderbolts and a portal at where enemies spawn. 
--I changed the color of the pixel into red. With the character colored white, spilling red pixels will stand out. This might potentially make the game PG, but I don't think red pixels are graphic. 

Time spent/ Notes on the work I've done: 
I didn't measure the time I spent. Coding on the bosses took time and on lives took time. A lot of time is spent on testing the game and changing the difficulty. As a general rule, if I reach score 6000, then I up the difficulty. If I fail to reach 5000 with multiple tries, then I lower the difficulty. 
At first, I was thinking about implementing lives like how traditional simple games do: 
Whole number lives that decrement by one when hit by the enemy, then the player re-spawn. 
But this has its complications. If the players re-spawns at the position they died in, and an enemy is there, then the player is hit again. If the player re-spawns at the center and there's an enemy at the center, then the player is hit again. 
An idea to get around this is to make a function that kills all enemies and bosses on the screen when the player is hit so that the player won't get hit repeatedly. Another idea is to just kill the enemy that hit the player. 
But I decided on a different approach that is more fun and doesn't involve re-spawning the player or killing enemies when hit. Here, instead of having a few stocks, the player starts out with a lot of life. This allows for variety on incrementing or decrementing lives. While the player has a lot life, enemies can also take a lot of life if the player is not careful. 
With life points, the player can last much longer. To balance this out, I made it so that bosses drain more life than enemies. I also made it so that stars give life points. This gives more incentive to collect stars and allows for recovery. But also kept in mind to make it so that stars don't give too much. A decent balance I found is: start with 100, +1 per star, -10 per enemy hit, and -20 per boss hit. 
I also allowed some people to play my game and got compliments. 

The character sprite sheet is based on the original Phaser dude sprite sheet. The star and sky in this game are edited from sprites given by the Phaser tutorial. The audio files are from Phaser. 


