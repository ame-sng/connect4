

////////////////////////////////
////////////////////////////////
//* Game set-up
////////////////////////////////
////////////////////////////////

//=======================
//? Objects
//=======================

const empty = "?";
const player1 = "A";
const player2 = "B";

//=======================
//? Board, Turn
//=======================

const game = { 
    board : [
        ["?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?"],
        ["?", "?", "?", "?", "?"],
        ["A", "A", "A", "A", "A"],
        ["?", "?", "?", "?", "?"] 
    ] ,
    totalRows: 6,
    totalCols: 5,
    turn() {
        const player1turn = true;
        return player1turn ? player1 : player2;
    }
}

//================
//* Winning combos
//================

//*call out row
const callRow = (xBoard, rowIndex) => {
    return xBoard[rowIndex];
}
/* console.log(callRow(game.board, 1)) */

//*check if all values are same (horizontal win)
const equal = (array) => {
    if (array.every((input => input === player1) || (input => input === player2)) === true) {
        return array;
    };
}
//testing equal function
/* let testArray = callRow(game.board,4)
console.log("testArray: " + equal(testArray)) */

//*check if there's a horizontal win
const checkHorizontal = (xBoard) => {
    for (let rowIndex = 0; rowIndex < game.board.length; rowIndex++) {
        let results = callRow(xBoard, rowIndex);
        if (equal(results)){
            return results[0]; //ADD ALERT if results[0]==="A", return "player1 won"
        }
    }
    return empty;
}
//test checkHorizontal function
/* console.log("checkH: " + checkHorizontal(game.board)) */

//* get coordinates for column
const diffRowSameCol = (coordinates) => {
    return {row:coordinates.row + 1, col: coordinates.col}
}


board : [
    ["?", "A", "?", "?", "?"],
    ["?", "A", "?", "?", "?"],
    ["?", "A", "?", "?", "?"],
    ["?", "A", "?", "?", "?"],
    ["?", "A", "?", "?", "?"],
    ["?", "A", "?", "?", "?"] 
] ,

//call out column, put in new array to check if all same
const callCol = (xBoard) => {
    const newArray = [];
    for(let i = 0; i < game.board.length; i++){
        
    }
    if(equal(newArray)===true)
}

callCol(game.board)


const main = () => {
 



}
$(main);