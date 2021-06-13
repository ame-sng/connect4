////////////////////////////////
//MVP
////////////////////////////////

A 6 x 5 grid with clickable spaces
When space is clicked, it will display either disc 1 or disc 2
Disc 1 and Disc 2 alternates with every click
Win by four in a row horizontally, vertically or diagonally
Determine tie
Restart game

`Extra`
Modal pop ups
Start Game and Instructions
Show disc hover above column


`Bonus`
Change grid
Keep track of score for each player
Include animation (e.g. disc drop + sound)
Players can change their position choices if they made a mistake


////////////////////////////////
//DATA AND LOGIC
////////////////////////////////

//========================
// DATA 
//========================

#### Board + Players
.
     `0    1    2    3    4`
_0_ ["?", "?", "?", "?", "?"],
_1_ ["?", "?", "?", "?", "?"],
_2_ ["?", "?", "?", "?", "?"],
_3_ ["?", "?", "?", "?", "?"],
_4_ ["?", "?", "?", "?", "?"],
_5_ ["?", "?", "?", "?", "?"]

- Empty Board: [?]
- Player 1: [A]
- Player 2: [B]
- Game: board, turn
- Click


#### Winning Combo:
`Horizontal`
row === same 
col === += (loop)

["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["?", "A", "A", "A", "A"]   [5][1], [5][2], [5][3], [5][4]
    
`Vertical`
row === += (loop)
col === same

["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["?", "?", "A", "?", "?"],  [2][2]
["?", "?", "A", "?", "?"],  [3][2]
["?", "?", "A", "?", "?"],  [4][2]
["?", "?", "A", "?", "?"]   [5][2]
    
`Diagonal Right`
row === -= (loop)
col === += (loop)
["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "A"],                          [2][4]
["?", "?", "?", "A", "?"],                  [3][3]
["?", "?", "A", "?", "?"],          [4][2]
["?", "A", "?", "?", "?"]   [5][1]
    
`Diagonal Left`
row === += (loop)
col === += (loop)

["?", "?", "?", "?", "?"],
["?", "?", "?", "?", "?"],
["A", "?", "?", "?", "?"],  [2][0]
["?", "A", "?", "?", "?"],          [3][1]
["?", "?", "A", "?", "?"],                  [4][2]
["?", "?", "?", "A", "?"]                           [5][3]

M

Identify filled space:

 

//========================
// LOGIC
//========================


#### Player 1 vs Player 2
Player 1 goes first with red disc, Player 2 goes second with blue disc.
User goes every alternate move.
_Code needed: Global variable flag to control turn_

#### Placing the disc
Disc turns on the lower most row when column is clicked.
User picks an empty space.
User picks spaces right or left.
_Code needed: Identify corresponding point in array to space clicked on board_
_Movement of right or left selection in array_
_Once bottom array is filled, next array is filled_
    
#### Empty space turns to disc 1 or disc 2
Global variable flag to control disc colour (same as player flag)
Identify space that has already been clicked on
_Code needed: If space is empty, allow disc to be place. User clicks space._
_Space turns to player's colour_
_If space has existing disc, player cannot place disc_
_Once placed, it is next player's turn_

#### Reset Game
User clicks restart button
_Code needed: change all spaces to original_

