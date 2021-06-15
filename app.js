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
    ["?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?"],
  ],
  totalRows: 6,
  totalCols: 5,
};

////////////////////////
//* Generate board
////////////////////////

//cell is game.board[r][c]
//append cell to column
//append column to board

let cellprop = {
  background: "#1f3dc2",
  display: "flex",
  height: "70px",
  width: "70px",
  "border-radius": "100%",
  margin: "0 10px",
  "justify-content": "center",
  "align-items": "center",
  // "color": "#1f3dc2"
};

//! add function that allows when column is clicked, for cell to turn colour.
const generateBoard = (xBoard) => {
  for (c = 0; c < xBoard[0].length; c++) {
    const $column = $("<div>")
      .addClass("column")
      .attr("id", "col-" + c).on("click", fillIn);;
    $(".board").append($column);
    for (r = 0; r < xBoard.length; r++) {
      const $cell = $("<div>")
        .attr("class", "cell-" + r)
        .css(cellprop)
        .text(game.board[r][c])
      $column.append($cell);
    }
  }
};

// const cellValue = () => {
//     for(r = 0; r<game.board.length; r++){
//         for(c=0; c<game.board[0].length; c++){
//             let cell = game.board[r][c]
//             console.log(cell);
//         }
//     }
//     }
//     cellValue();

////////////////////////
//* Click Event
////////////////////////

//!function click to identify player turn
//!pass through game.board into browser
let player1turn = true;

const fillIn = (event) => {
  let $column = $(event.currentTarget);
  if (player1turn === true) {
    $column
      .children() //!figure out how to change the lowermost cell (loop?)
      .css({
        "background-color": "black",
        color: "white",
      })
      .text("A");
    player1turn = false;
  }
  else if (player1turn === false) {
    $column.children().css({ "background-color": "greenyellow", color: "black" }).text("B");
    player1turn = true;
  }
};

//when click on column, the lowermost cell turns colour
// let $column = $(".column");

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
      return player1;
    } else if (countSame(each) === "B") {
      return player2;
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
  for (let i = 0; i < game.board[0].length; i++) {
    //console.log(i)
    let columnStart = { rowIndex: i, colIndex };
    let column = vertical(columnStart); //for each row, +1 while col is same
    // console.log(vertical(columnStart))
    const index = xBoard[column.rowIndex][column.colIndex];
    console.log(index);
    newArray.push(index);
  }
  return newArray;
};

// console.log("callCol: " + callCol(game.board, 1));

//* loop over each column
const checkVertical = (xBoard) => {
  for (let col = 0; col < game.board[0].length; col++) {
    console.log(callCol(xBoard, col));
    let results = callCol(xBoard, col);
    if (countSame(results) === "A") {
      return player1;
    } else if (countSame(results) === "B") {
      return player2;
    }
  }
  return empty;
};

console.log("checkVer: " + checkVertical(game.board));

//===========================
//? CHECK DIAGONAL DOWN WIN
//===========================

//* get coordinates for column
const diagonalDown = (coordinates) => {
  return {
    rowIndex: coordinates.rowIndex++,
    colIndex: coordinates.colIndex--,
  };
};

//!just need to check first 6 [0][0],[1][0],[2][0],[0][1],[1][1],[2],[1]
//thanks to Samuel for helping out!
const checkDD = (xBoard) => {
  for (let row = 0; row < game.board.length - 3; row++) {
    for (let col = 0; col < game.board[0].length - 3; col++) {
      const newArray = [];
      for (let arrLoop = 0; arrLoop < 4; arrLoop++) {
        let diagonalArray = diagonalDown({
          rowIndex: row + arrLoop,
          colIndex: col + arrLoop,
        });
        let index = xBoard[diagonalArray.rowIndex][diagonalArray.colIndex];
        newArray.push(index);
        console.log(diagonalArray);
        console.log(index);
        console.log(newArray);
      }
      if (countSame(newArray) === "A") {
        return player1;
      } else if (countSame(newArray) === "B") {
        return player2;
      }
    }
  }
  return empty;
};

console.log(checkDD(game.board));

//===========================
//? CHECK DIAGONAL UP WIN
//===========================

//* get coordinates for column
const diagonalUp = (coordinates) => {
  return {
    rowIndex: coordinates.rowIndex--,
    colIndex: coordinates.colIndex++,
  };
};

//!just need to check first 6 [3][0],[4][0],[5][0],[3][1],[4][1],[5],[1]

const checkDU = (xBoard) => {
  for (let row = game.board.length - 1; row > game.board.length - 4; row--) {
    for (let col = 0; col < game.board[0].length - 3; col++) {
      console.log(row);
      console.log(col);
      const newArray = [];
      for (let arrLoop = 0; arrLoop < 4; arrLoop++) {
        let diagonalArray = diagonalUp({
          rowIndex: row - arrLoop,
          colIndex: col + arrLoop,
        });
        let index = xBoard[diagonalArray.rowIndex][diagonalArray.colIndex];
        newArray.push(index);
        console.log(diagonalArray);
        console.log(index);
        console.log(newArray);
      }
      if (countSame(newArray) === "A") {
        return player1;
      } else if (countSame(newArray) === "B") {
        return player2;
      }
    }
  }
  return empty;
};

console.log(checkDU(game.board));

//===========================
//? WINNER WINNER
//===========================

const fullBoard = (xBoard) => {
  for (const row of xBoard) {
    if (row.includes(empty)) {
      return false;
    }
  }
  return true;
};

const results = (xBoard) => {
  const checkThroughFunctions = [
    checkHorizontal,
    checkVertical,
    checkDD,
    checkDU,
  ];
  for (const each of checkThroughFunctions) {
    const result = each(xBoard);
    if (result != empty) {
      if (result == player1) {
        console.log("Player 1 has won!");
        alert("Player 1 has won!"); //! EXTRA: change to modal
        return;
      } else if (result == player2) {
        console.log("Player 1 has won!");
        alert("Player 2 has won!");
        return;
      }
    }
  }
  if (fullBoard(xBoard) === true) {
    console.log("It's a tie!");
    alert("It's a tie!");
    return;
  }
};

////////////////////////
//* RENDER
////////////////////////

const main = () => {
  generateBoard(game.board);
};
$(main);

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

// const callDR = (xBoard, row, col) => {
//     const newArray = [];
//     for(let i = 0; i < xBoard.length; i++){
//       let diagonalStart = {rowIndex: row, colIndex: col}
//       let diagonal = diagonalRL(diagonalStart)
//       console.log(diagonal)
//       const index = xBoard[diagonal.rowIndex][diagonal.colIndex];
//       console.log(index)
//       newArray.push(index);
//     }
//     return newArray
// }

// console.log(callDR(game.board, 4, 0));

// const checkDR = (xBoard) => {
//   for (let i = 0; i < xBoard.length; i++) {
//     //console.log(callCol(xBoard, col));
//     let results = callDR(xBoard, xBoard.length - 1, i);
//     if (countSame(results) === "A") {
//       return "Player1 wins";
//     } else if (countSame(results) === "B") {
//       return "Player2 wins";
//     }
//   }
//   return empty;
// };

// console.log("checkDR: " + checkDR(game.board));

//   const callDL = (xBoard, row, col) => {
//     const newArray = [];
//     for(let i = 0; i < xBoard.length; i++){
//       let diagonalStart = {rowIndex: row++, colIndex: col--}
//       let diagonal = diagonalRL(diagonalStart)
//       console.log(diagonal)
//       const index = xBoard[diagonal.rowIndex][diagonal.colIndex];
//       console.log(index)
//       newArray.push(index);
//     }
//     return newArray
// }

// //   console.log(callDL(game.board, 5, 4));

// const checkDL = (xBoard) => {
//   for (let i = 0; i < xBoard.length; i++) {
//     //console.log(callCol(xBoard, col));
//     let results = callDL(xBoard, i, xBoard.length-1);
//     if (countSame(results) === "A") {
//       return "Player1 wins";
//     } else if (countSame(results) === "B") {
//       return "Player2 wins";
//     }
//   }
//   return empty;
// };

// console.log("checkDL: " + checkDL(game.board));
// const checkDU = (xBoard) => {
//   for (let row = 0; row < game.board.length -3; row++) {
//     for (let col = game.board[0].length - 1; col > game.board[0].length - 3; col--) {
//       console.log(row)
//       console.log(col)
//         const newArray = [];
//       for (let arrLoop = 0; arrLoop < 4; arrLoop++) {
//         let arraySix = diagonalUp({
//           rowIndex: row + arrLoop,
//           colIndex: col + arrLoop,
//         });
//         let index = xBoard[arraySix.rowIndex][arraySix.colIndex];
//         newArray.push(index);
//         console.log(arraySix);
//         console.log(index);
//         console.log(newArray);
//       }
//       if (countSame(newArray) === "A") {
//         return "Player1 wins";
//       } else if (countSame(newArray) === "B") {
//         return "Player2 wins";
//       }
//     }
//   }
//   return empty;
// };

// console.log(checkDU(game.board));
