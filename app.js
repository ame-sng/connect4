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
};

/////////////////////////////
//* Generate and render board
/////////////////////////////

//cell is game.board[r][c]
//append cell to column
//append column to board

let cellprop = {
  "background": "#073bad72",
  "display": "flex",
  "height": "70px",
  "width": "70px",
  "border-radius": "50%",
  "margin": "2px 5px",
  "justify-content": "center",
  "align-items": "center",
  "box-shadow":"inset 0px 0px 0px 7px #144abeb6",
  //"color": "#1f3dc2"
};


const generateBoard = (xBoard) => {
  for (c = 0; c < xBoard[0].length; c++) {
    const $column = $("<div>")
      .addClass("column")
      .attr("id", "col-" + c);
    $(".board").append($column);

    for (r = 0; r < xBoard.length; r++) {
      const $cell = $("<div>")
        .attr("class", "cell-" + r)
        .css(cellprop)
        // .text(game.board[r][c])
      $column.append($cell);
      
    }
  } $(".column").on("click", whenClicked) 
};


// changes the html components
// loop through array. If index displays A or B, change html colour
const renderUpdate = () => {
 for (let row = 0; row < game.board.length; row++){
   for(let col = 0; col < game.board[0].length; col++){
     const cellPosition = game.board[row][col];
     if (cellPosition === "A"){
      ($(`#col-${col} > .cell-${row}`)).css({"background-image": "linear-gradient(50deg,rgb(115, 15, 134), rgb(214, 119, 233)"});
      console.log($(`#col-${col} > .cell-${row}`));
     } else if( cellPosition === "B"){
      ($(`#col-${col} > .cell-${row}`)).css({"background-image": "linear-gradient(50deg,rgb(50, 124, 27), rgb(148, 245, 119)"});
      } //else if(cellPosition === "?"){
    //   ($(`#col-${col} > .cell-${row}`)).css({"background": "#073bad72","box-shadow":"inset 0px 0px 0px 7px #144abeb6"});
    //  }
   }
 }
 results(game.board);
}
  

////////////////////////
//* Click Event
////////////////////////


//! add function that allows when column is clicked, for position to be updated in array
// loop such that when bottom row index is full, update the next
//! if all filled, prevent loop
//column is event.currentTarget
//when column is clicked, if row:[5] is empty, return row:[5], if it is filled; return and run loop for row:[4] etc..
//! r is not updating with new loop
//! not returning even if colIndex === A || B

let player1turn = true;
let counter = 1;

const whenClicked = (event) => {
  const colIndex = $(event.currentTarget).index()
  console.log(colIndex);
  for(let r = game.board.length - 1; r > -1; r--){
    if (game.board[r][colIndex] === "?"){
      if (counter%2 !== 0){
      game.board[r][colIndex] = "A";
      counter += 1
      console.log("counter: " + counter);
      renderUpdate();
      return;
    } else if (counter % 2 === 0) {
      game.board[r][colIndex] = "B"
      counter += 1
      console.log("counter: " + counter);
      renderUpdate();
      return;
    }
    } 
  }
    
}


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

// console.log("checkH: " + checkHorizontal(game.board));

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
    // console.log(index);
    newArray.push(index);
  }
  return newArray;
};

// console.log("callCol: " + callCol(game.board, 1));

//* loop over each column
const checkVertical = (xBoard) => {
  for (let col = 0; col < game.board[0].length; col++) {
    // console.log(callCol(xBoard, col));
    let results = callCol(xBoard, col);
    if (countSame(results) === "A") {
      return player1;
    } else if (countSame(results) === "B") {
      return player2;
    }
  }
  return empty;
};

// console.log("checkVer: " + checkVertical(game.board));

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
        // console.log(diagonalArray);
        // console.log(index);
        // console.log(newArray);
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

// console.log(checkDD(game.board));

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
      // console.log(row);
      // console.log(col);
      const newArray = [];
      for (let arrLoop = 0; arrLoop < 4; arrLoop++) {
        let diagonalArray = diagonalUp({
          rowIndex: row - arrLoop,
          colIndex: col + arrLoop,
        });
        let index = xBoard[diagonalArray.rowIndex][diagonalArray.colIndex];
        newArray.push(index);
        // console.log(diagonalArray);
        // console.log(index);
        // console.log(newArray);
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

// console.log(checkDU(game.board));

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
        // alert("Player 1 has won!"); //! EXTRA: change to modal
        $("#myModal").css("display", "block");
        $("p").text("Player 1 has won!");
        $(".close").on("click", ()=>{$("#myModal").css("display", "none")})
        return;
      } else if (result == player2) {
        console.log("Player 2 has won!");
        // alert("Player 2 has won!");
        $("#myModal").css("display", "block");
        $("p").text("Player 2 has won!");
        $(".close").on("click", ()=>{$("#myModal").css("display", "none")})
        return;
      }
    }
  }
  if (fullBoard(xBoard) === true) {
    console.log("It's a tie!");
    // alert("It's a tie!");
    $("#myModal").css("display", "block");
        $("p").text("It's a tie!");
        $(".close").on("click", ()=>{$("#myModal").css("display", "none")})
    return;
  }
};


////////////////////////
//* RESTART GAME
////////////////////////

const restart = () => 
{$("button").on("click", () => {
  location.reload();
})}


////////////////////////
//* RENDER
////////////////////////

const main = () => {
  generateBoard(game.board);
  renderUpdate();
  restart();
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

 // turn() {
  //   player1turn = true;
  //   player1turn ? player1 : player2;
  // }



// for (let i = game.board[0].length - 1; i >= 0; i--){
//   console.log(i)
// }

 
// const fillIn  (event) => {
//   let $column = $(event.)
// }


// const fillIn = (event) => {
//   let $column = $(event.target);
//   let $cell = $column.children()
//   $cell.css({
//         "background-color": "black",
//         color: "white",
//       })
//       .text("A");
  //   player1turn = false;
  //   if ($cell.text() === "A" || "B"){
  //     return;
  //   }
  //   }  //! why doesn' return work
  // }
  // else if (player1turn === false) {
  //   $column.children().eq(5)
  //   .css({ "background-color": "greenyellow", color: "black" }).text("B");
  //   player1turn = true;
  // }
// };

//when click on column, the lowermost cell turns colour
// let $column = $(".column");
