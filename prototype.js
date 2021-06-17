////////////////////////////////
////////////////////////////////
//* Game set-up
////////////////////////////////
////////////////////////////////

//=======================
//? Objects
//=======================
const EMPTY = "?";
const PLAYER1 = "A";
const PLAYER2 = "B";

//=======================
//? Board
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
  board1: [
    ["?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?"],
    ["?", "?", "?", "?", "?", "?", "?"],
    
  ],
};

/////////////////////////////
//* Generate and render board
/////////////////////////////

//cell is game.board[r][c]
//append cell to column
//append column to board


let boardChosen = game.board1


const boardSize = () => {
    if (boardChosen === game.board1){
        $(".board").addClass("board6x7");
        $(".column").addClass("column6x7");
    }
}

// const boardSize = () => {
//     if (boardChosen === game.board1){
//         $(".board").attr("class","board6x7");
//         $(".column").attr("class","column6x7");
//     }
// }

//*generateBoard function okay!

const generateBoard = (xBoard) => {
  for (c = 0; c < xBoard[0].length; c++) {
    const $column = $("<div>")
      .addClass("column")
      .attr("id", "col-" + c);
    $(".board").append($column);
    for (r = 0; r < xBoard.length; r++) {
      const $cell = $("<div>")
        .attr("class", "cell-" + r).addClass("slots")
        .addClass("cellprop")
        // .text(game.board[r][c])
      $column.append($cell);
      
    }clicks();
    restartClick();  
  }boardSize(); 
  
};

const clicks = () => {
  $(".column").on("click", whenClicked);
  $(".column").on("click", () => {$("audio#coindrop")[0].play()});
  // const $restart = $(".restart");
//   $(".restart").on("click", restart);
//   $(".restart2").on("click", hidemodal);
}


//*renderUpdate board is okay!
// changes the html components
// loop through array. If index displays A or B, change html colour
const renderUpdate = () => {
 for (let row = 0; row < game.board1.length; row++){
   for(let col = 0; col < game.board1[0].length; col++){
     const cellPosition = game.board1[row][col];
     if (cellPosition === PLAYER1){
      ($(`#col-${col} > .cell-${row}`)).addClass("player1cell");
      console.log($(`#col-${col} > .cell-${row}`));
     } else if( cellPosition === PLAYER2){
      ($(`#col-${col} > .cell-${row}`)).addClass("player2cell")
      } 
      
   }
   
 } console.log(game.board1)
 results(game.board1);
}
  

////////////////////////
//* Click Event
////////////////////////

// add function that allows when column is clicked, for position to be updated in array
// loop such that when bottom row index is full, update the next
// if all filled, prevent loop
//column is event.currentTarget
//when column is clicked, if row:[5] is empty, return row:[5], if it is filled; return and run loop for row:[4] etc..

let counter = 1;

//*whenClicked function is okay

const whenClicked = (event) => {
  const colIndex = $(event.currentTarget).index()
//   console.log(colIndex);
  for(let r = game.board1.length - 1; r > -1; r--){
    if (game.board1[r][colIndex] === EMPTY){
      if (counter%2 !== 0){
      game.board1[r][colIndex] = PLAYER1;
      counter += 1;
      $("h2").text("Player 2, pick a slot").css("color", "rgb(148, 245, 119)")
      // .addClass("player2")
      console.log("counter: " + counter);
    //   console.log(game.board1)
      renderUpdate();
      return;
    } else if (counter % 2 === 0) {
      game.board1[r][colIndex] = PLAYER2;
      counter += 1;
      console.log("counter: " + counter);
      $("h2").text("Player 1, pick a slot").css("color", "rgb(214, 119, 233)")
      // .addClass("player1")
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
    if (array[i] === PLAYER1 || array[i] === PLAYER2) {
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


//*horizontal function okay!
//*check if there's a horizontal win
const checkHorizontal = (xBoard) => {
  for (const each of xBoard) {
    if (countSame(each) === PLAYER1) {
      return PLAYER1;
    } else if (countSame(each) === PLAYER2) {
      return PLAYER2;
    }
  }
  return EMPTY;
};

// console.log("checkH: " + checkHorizontal(game.board));

//========================
//? CHECK VERTICAL WIN
//========================
//! NOT OKAY
//* get coordinates for column
const vertical = (coordinates) => {
  return {rowIndex: coordinates.rowIndex + 1, colIndex: coordinates.colIndex };
};

//*push column into new array to check if all same
const callCol = (xBoard, colIndex) => {
  const newArray = [];
  for (let i = -1; i < xBoard[0].length; i++) {
    // console.log(i)
    let columnStart = {rowIndex: i, colIndex};
    let column = vertical(columnStart); //for each row, +1 while col is same
    // console.log(vertical(columnStart))
    const index = xBoard[column.rowIndex][column.colIndex];
    console.log("index: " + index);
    newArray.push(index);
    console.log("newArray: " + newArray)
  }
  return newArray;
};

// console.log("callCol: " + callCol(game.board, 1));

//* loop over each column
const checkVertical = (xBoard) => {
  for (let col = 0; col < xBoard[0].length; col++) {
    // console.log(xBoard, col);
    let results = callCol(xBoard, col);
    if (countSame(results) === PLAYER1) {
      return PLAYER1;
    } else if (countSame(results) === PLAYER2) {
      return PLAYER2;
    }
  }
  return EMPTY;
};

// console.log("checkVer: " + checkVertical(game.board1));

//===========================
//? CHECK DIAGONAL DOWN WIN
//===========================
//* DD is okay!
//* get coordinates for column
const diagonalDown = (coordinates) => {
  return {
    rowIndex: coordinates.rowIndex++,
    colIndex: coordinates.colIndex--,
  };
};

//!just need to check first 6 
const checkDD = (xBoard) => {
  for (let row = 0; row < xBoard.length - 3; row++) {
    for (let col = 0; col < xBoard[0].length - 3; col++) {
      const newArray = [];
      for (let arrLoop = 0; arrLoop < 4; arrLoop++) {
        let diagonalArray = diagonalDown({
          rowIndex: row + arrLoop,
          colIndex: col + arrLoop,
        });
        let index = xBoard[diagonalArray.rowIndex][diagonalArray.colIndex];
        newArray.push(index);
      }
      if (countSame(newArray) === PLAYER1) {
        return PLAYER1;
      } else if (countSame(newArray) === PLAYER2) {
        return PLAYER2;
      }
    }
  }
  return EMPTY;
};

// console.log(checkDD(game.board));

//===========================
//? CHECK DIAGONAL UP WIN
//===========================
//* DU is okay!
//* get coordinates for column
const diagonalUp = (coordinates) => {
  return {
    rowIndex: coordinates.rowIndex--,
    colIndex: coordinates.colIndex++,
  };
};

//!just need to check first 6

const checkDU = (xBoard) => {
  for (let row = xBoard.length - 1; row > xBoard.length - 4; row--) {
    for (let col = 0; col < xBoard[0].length - 3; col++) {
      const newArray = [];
      for (let arrLoop = 0; arrLoop < 4; arrLoop++) {
        let diagonalArray = diagonalUp({
          rowIndex: row - arrLoop,
          colIndex: col + arrLoop,
        });
        let index = xBoard[diagonalArray.rowIndex][diagonalArray.colIndex];
        newArray.push(index);
      }
      if (countSame(newArray) === PLAYER1) {
        return PLAYER1;
      } else if (countSame(newArray) === PLAYER2) {
        return PLAYER2;
      }
    }
  }
  return EMPTY;
};

// console.log(checkDU(game.board));

//===========================
//? WINNER WINNER
//===========================

const fullBoard = (xBoard) => {
  for (const row of xBoard) {
    if (row.includes(EMPTY)) {
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
    if (result != EMPTY) {
      if (result == PLAYER1) {
        console.log("Player 1 has won!");
        // alert("Player 1 has won!"); // EXTRA: change to modal
        $("#myModal").css("display", "block");
        $("p").text("Player 1 has won!");
        $(".close").on("click", ()=>{$("#myModal").css("display", "none")})
        $("audio#winning")[0].play();
        return;
      } else if (result == PLAYER2) {
        console.log("Player 2 has won!");
        // alert("Player 2 has won!");
        $("#myModal").css("display", "block");
        $("p").text("Player 2 has won!");
        $(".close").on("click", ()=>{$("#myModal").css("display", "none")})
        $("audio#winning")[0].play();
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
        $("audio#tie")[0].play();
    return;
  }
};


////////////////////////
//* RESTART GAME
////////////////////////

//* Restart Okay!

const restartClick = () => {
$(".restart").on("click", restart);
$(".restart2").on("click", hidemodal);
}

const restart = () => {
    let xBoard = game.board1
  for(let i = 0; i< xBoard.length; i++){
      for(let j = 0; j< xBoard[0].length; j++){
        xBoard[i][j]= EMPTY;
        }
      }
    //   console.log(xBoard);
      renderUpdate();
      counter = 1;
      $("h2").text("Player 1, pick a slot").css("color", "rgb(214, 119, 233)");
      $("audio#buttonsound")[0].play();
      $(".slots").removeClass("player1cell");
      $(".slots").removeClass("player2cell");
}

const hidemodal = () => {
    let xBoard = game.board1
  for(let i = 0; i< xBoard.length; i++){
    for(let j = 0; j< xBoard[0].length; j++){
      xBoard[i][j]= EMPTY;
      }
    }
    // console.log(xBoard);
    renderUpdate();
    counter = 1;
    $("h2").text("Player 1, pick a slot").css("color", "rgb(214, 119, 233)");
  $(".modal").css("display","none");
  $(".slots").removeClass("player1cell");
      $(".slots").removeClass("player2cell");
  $("audio#buttonsound")[0].play();
}


////////////////////////
//* RENDER
////////////////////////

const main = () => {
    
    generateBoard(game.board1);
    
    results(game.board1);
    
    
};
$(main);


// $(".restart2").on("click", () => {
  //   location.reload()}; 