2048-tris: A combination of 2048 and Tetris created at HackWaterloo by Taras Kolomatski and Kelvin Jiang

Programmed in HTML5, CSS3 and Javascript. Implements JQuery

Winner of the "Most Functional Hack" award at HackWaterloo

How to play:
Download the zip file from Github, unzip and run index.html in your favourite web browser

The game circulates between 2 modes: Tetris mode and 2048 mode.

You win once you combine your blocks together to make 2048, you are permitted to keep going.
You lose if you stack your blocks to or past the top of the screen, please press "r" to restart.

In Tetris mode:
Stack the blocks together, you enter 2048 mode once an active falling block has been locked in place.

Controls:
A/D: Move left/right
S: Increase falling velocity
W: Rotate Counterclockwise, can cause weird block placements occasionally
Shift: Randomize all numbers in the active falling block (limited to 5 per game)
R: Restart

Note: It is generally recommended to arrange the blocks such that there is a chain of increasing consecutive powers of 2 for easy scoring
Clearing lines will incur a 2000 point PENALTY, because when you clear lines, it implies that you give up on dealing with the blocks already in place (and actually getting points like you should)

In 2048 mode:
Quick! You have just a nick of time to combine adjacent equal powers of 2 into a larger power! Use this time wisely to score points and give yourself more space to work with!
While 2048 mode is active, a golden rectangle will appear, you can delay the end of 2048-tris by making valid moves, otherwise it goes away in around 1-2 seconds

Controls:
W/A/S/D: Combine adjacent identical powers of 2 in the specified directionf
R: Restart

Known bugs:
-Sometimes rotation will place a block well outside where it's supposed to be. Has to do with the placement algorithm being too aggressive in determining a block space

Note: Inexperienced players will end up with a lot of floating blocks as they continue playing, PICK YOUR DIRECTIONS CAREFULLY DURING THIS MODE

Version history:
1.0 - March 29
-Initial release

1.0000001 - Jul 13
-Edited readme

Further note: Everytime you restart, a huge block with huge numbers will appear, THIS IS INTENTIONAL FOR DEMONSTRATION PURPOSES
