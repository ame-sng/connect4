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
    }
  } clicks();
};

const clicks = () => {
  $(".column").on("click", whenClicked);
  $(".column").on("click", () => {$("audio#coindrop")[0].play()});
  // const $restart = $(".restart");
  $(".restart").on("click", restart);
  $(".restart2").on("click", hidemodal);
}

// changes the html components
// loop through array. If index displays A or B, change html colour
const renderUpdate = () => {
 for (let row = 0; row < game.board.length; row++){
   for(let col = 0; col < game.board[0].length; col++){
     const cellPosition = game.board[row][col];
     if (cellPosition === PLAYER1){
      ($(`#col-${col} > .cell-${row}`)).addClass("player1cell");
      console.log($(`#col-${col} > .cell-${row}`));
     } else if( cellPosition === PLAYER2){
      ($(`#col-${col} > .cell-${row}`)).addClass("player2cell")
      } 
   }
 }
 results(game.board);
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


const whenClicked = (event) => {
  const colIndex = $(event.currentTarget).index()
  console.log(colIndex);
  for(let r = game.board.length - 1; r > -1; r--){
    if (game.board[r][colIndex] === EMPTY){
      if (counter%2 !== 0){
      game.board[r][colIndex] = PLAYER1;
      counter += 1;
      $("h2").text("Player 2, pick a slot").css("color", "rgb(148, 245, 119)")
      // .addClass("player2")
      console.log("counter: " + counter);
      console.log(game.board)
      renderUpdate();
      return;
    } else if (counter % 2 === 0) {
      game.board[r][colIndex] = PLAYER2;
      counter += 1;
      console.log("counter: " + counter);
      $("h2").text("Player 1, pick a slot").css("color", "rgb(225, 72, 125)")
      console.log(game.board)
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

//* get coordinates for column
const vertical = (coordinates) => {
  return { rowIndex: coordinates.rowIndex + 1, colIndex: coordinates.colIndex };
};

//console.log(diffRowSameCol({rowIndex: 1,colIndex: 0}))

//*push column into new array to check if all same
const callCol = (xBoard, colIndex) => {
  const newArray = [];
  for (let i = -1; i < game.board[0].length; i++) {
    //console.log(i)
    let columnStart = { rowIndex: i, colIndex };
    let column = vertical(columnStart); //for each row, +1 while col is same
    // console.log(vertical(columnStart))
    const index = xBoard[column.rowIndex][column.colIndex];
    // console.log(index);
    newArray.push(index);
    console.log("newArray: " + newArray)
  }
  return newArray;
};

// console.log("callCol: " + callCol(game.board, 1));

//* loop over each column
const checkVertical = (xBoard) => {
  for (let col = 0; col < game.board[0].length; col++) {
    // console.log(callCol(xBoard, col));
    let results = callCol(xBoard, col);
    if (countSame(results) === PLAYER1) {
      return PLAYER1;
    } else if (countSame(results) === PLAYER2) {
      return PLAYER2;
    }
  }
  return EMPTY;
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



const restart = () => {
  for(let i = 0; i< game.board.length; i++){
      for(let j = 0; j< game.board[0].length; j++){
        game.board[i][j]= EMPTY;
        }
      }console.log(game.board);
      renderUpdate();
      counter = 1;
      $("h2").text("Player 1 goes first!").css("color", "rgb(225, 72, 125)");
      $("audio#buttonsound")[0].play();
      $(".slots").removeClass("player1cell");
      $(".slots").removeClass("player2cell");
}

const hidemodal = () => {
  for(let i = 0; i< game.board.length; i++){
    for(let j = 0; j< game.board[0].length; j++){
      game.board[i][j]= EMPTY;
      }
    }console.log(game.board);
    renderUpdate();
    counter = 1;
    $("h2").text("Player 1 goes first!").css("color", "rgb(225, 72, 125)");
  $(".modal").css("display","none");
  $(".slots").removeClass("player1cell");
      $(".slots").removeClass("player2cell");
  $("audio#buttonsound")[0].play();
}


////////////////////////
//* RENDER
////////////////////////

const main = () => {
  $(".letsgo").on("click", ()=>{$("#instructions").css("display", "none")})
  renderUpdate();
  generateBoard(game.board);
  results(game.board);
};
$(main);


// $(".restart2").on("click", () => {
  //   location.reload()}; 