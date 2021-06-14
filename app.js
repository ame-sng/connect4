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
  board: [
    ["?", "?", "?", "?", "?"],
    ["?", "B", "?", "?", "?"],
    ["?", "B", "?", "?", "A"],
    ["?", "B", "?", "A", "?"],
    ["?", "B", "A", "?", "?"],
    ["?", "A", "?", "?", "?"],
  ],
  totalRows: 6,
  totalCols: 5,
  turn() {
    const player1turn = true;
    return player1turn ? player1 : player2;
  },
};

////////////////////////
//* Winning combos
////////////////////////

//*Logic:
//*Identify row/column/diagonal has As or 4 Bs. Extract column/diagonal in a new array.
//*Check in array that subsequent 3 indexes are the same as first one.

//========================
//? 4 EQUAL FUNCTION
//========================
//* Function to check all 4 are the same
const countSame = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "A" || array[i] === "B") {
      if (
        array[i] === array[i + 1] &&
        array[i + 1] === array[i + 2] &&
        array[i + 2] === array[i + 3]
      ) {
        return array[i];
      }
    }
  }
};

//========================
//? CHECK HORIZONTAL WIN
//========================

//*check if there's a horizontal win
const checkHorizontal = (xBoard) => {
  for (const each of xBoard) {
    if (countSame(each) === "A") {
      return "Player1 wins";
    } else if (countSame(each) === "B") {
      return "Player2 wins";
    }
  }
  return empty;
};

console.log("checkH: " + checkHorizontal(game.board));

//========================
//? CHECK VERTICAL WIN
//========================

//* get coordinates for column
const vertical = (coordinates) => {
  return { rowIndex: coordinates.rowIndex + 1, colIndex: coordinates.colIndex };
};

//console.log(diffRowSameCol({rowIndex: 1,colIndex: 0}))

//*push column into new array to check if all same
const callCol = (xBoard, colIndex) => {
  const newArray = [];
  for (let i = 0; i < xBoard.length; i++) {
    //console.log(i)
    let columnStart = { rowIndex: i - 1, colIndex };
    let column = vertical(columnStart); //for each row, +1 while col is same
    // console.log(vertical(columnStart))
    const index = xBoard[column.rowIndex][column.colIndex];
    // console.log(index)
    newArray.push(index);
  }
  return newArray;
};

//console.log("callCol: " + callCol(game.board, 1));

const checkVertical = (xBoard) => {
  for (let col = 0; col < game.board.length; col++) {
    //console.log(callCol(xBoard, col));
    let results = callCol(xBoard, col);
    if (countSame(results) === "A") {
      return "Player1 wins";
    } else if (countSame(results) === "B") {
      return "Player2 wins";
    }
  }
  return empty;
};

console.log("checkVer: " + checkVertical(game.board));




// const main = () => {

// }
// $(main);

//====================================
//* TO DELETE
//====================================
// let testFunc = callRow(game.board,5)

// const checkforFour = (array) => {
//     let countType = array.reduce((allTypes, types) => {
//       if (types in allTypes) {
//         allTypes[types]++
//       }
//       else {
//         allTypes[types] = 1
//       }
//       return allTypes
//     }, {});
//     return countType;
//     }

// // console.log(checkforFour(testFunc))

// const equal = (array) => {
//     if (array.every((input => input === player1) || (input => input === player2)) === true) {
//         return true;
//     };
//     return false;
// }

// const checkHorizontal = (xBoard) => {
//     for (let rowIndex = 0; rowIndex < game.winlength; rowIndex++) {
//         let results = callRow(xBoard, rowIndex);
//         if (
//     }
//     return empty;
// }

// checkHorizontal(game.board)

// const checkVertical = (xBoard) => {
//     for (let i = 0; i < game.board.length; i++) {
//         let results = callCol(xBoard, i);
//         if (equal(results)){
//             return results[0]; //ADD ALERT if results[0]==="A", return "player1 won"
//         }
//     }
//     return empty;
// }

// let testCol = callCol(game.board)
// console.log(checkVertical(game.board))
