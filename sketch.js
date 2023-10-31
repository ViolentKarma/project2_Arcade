let sceneChange; 
let shared;
let soloCheck, startTime;
let col;
var gif_createImg;

//Creates the Grid for the Multiplayer game
const squares = [
  { x: 50, y: 50, w: 250, h: 250 },
  { x: 300, y: 50, w: 250, h: 250 },
  { x: 600, y: 50, w: 250, h: 250 },
  { x: 50, y: 300, w: 250, h: 250 },
  { x: 300, y: 300, w: 250, h: 250 },
  { x: 600, y: 300, w: 250, h: 250 },
  { x: 50, y: 600, w: 250, h: 250 },
  { x: 300, y: 600, w: 250, h: 250 },
  { x: 600, y: 600, w: 250, h: 250 },
]; 

//Preloads Server and Gif
function preload() {
  partyConnect("wss://demoserver.p5party.org", "tic_tac_toe");
  shared = partyLoadShared("shared");

  gif_createImg = createImg("background.gif");
}

//Setup Function
function setup() {
  createCanvas(900, 900);
  sceneChange = new SceneManager();
  col = color('rgb(167,198,201)');

  //Buttons
  soloButton();
  multiButton();

  //Setup
  soloCheck = 0;
  resetBoard();

}

//Draw Function
function draw() {
  background(50);
  //Animate Gif
  gif_createImg.size(width, height);
  gif_createImg.position(0, 0);

  //change Scene
  if(soloCheck === 1){
    //Setup Solo Game
    soloCheck = 0; 
    removeElements();
    sceneChange.wire();
    sceneChange.draw();
    sceneChange.showScene(solo);
  } else if(soloCheck === 2) {
    //Setup Multiplayer Game
    background(50);
    removeElements();
    drawGrid();
    drawMarks();
    drawWinner();
  }
}

//Change to Solo game
function soloChange() {
  soloCheck = 1;
}

//Change to Multiplayer game
function multiChange() {
  soloCheck = 2;
}

//Solo Button
function soloButton(){
  soloSelect = createButton('Solo Play'); 
  soloSelect.position(width/2 - 100, height/2 - 50);
  soloSelect.size(150, 50);
  soloSelect.style('background-color', col);
  soloSelect.style('color', 'red');
  soloSelect.style('font-size', '20px');
  soloSelect.mousePressed(soloChange);
}

//Multiplayer Button
function multiButton() {
  multiSelect = createButton('Multiplayer');
  multiSelect.position(width/2 - 100, height/2 + 50);
  multiSelect.size(150, 50);
  multiSelect.style('background-color', col);
  multiSelect.style('color', 'red');
  multiSelect.style('font-size', '20px');
  multiSelect.mousePressed(multiChange);
}

/*****************Multiplayer Mode*********************/
/******************************************************
Mode was created using the p5.party(https://p5party.org)
documentation. Tic Tac Toe example used for this moode.
*******************************************************/

//Mouse pressed fucntion
function mousePressed() {
  // if the game is already over, reset the board
  if (checkWin("x") || checkWin("o") || checkDraw()) {
    resetBoard();
    return;
  }

  // find the square that was clicked, if any
  const index = squares.findIndex((square) =>
    pointInRect({ x: mouseX, y: mouseY }, square)
  );

  // if no square was clicked, bail
  if (index === -1) return;

  // if the square is already filled, bail
  if (shared.board[index] !== "empty") return;

  // an empty square was clicked, set it according to the current turn
  shared.board[index] = shared.turn;

  // switch turns
  if (shared.turn === "x") {
    shared.turn = "o";
  } else {
    shared.turn = "x";
  }
}

//Function check if there is a winner
function drawWinner() {
  push();
  fill("#fff");
  textSize(25);
  textAlign(CENTER, CENTER);

  if (checkWin("x")) {
    text("x wins!", width * 0.5, height - 40);
  } else if (checkWin("o")) {
    text("o wins!", width * 0.5, height - 40);
  } else if (checkDraw()) {
    text("draw!", width * 0.5, height - 40);
  }

  pop();
}

//Function draws the grid
function drawGrid() {
  push();
  noFill();
  stroke("#888");
  strokeWeight(2);

  //Draw Lines
  line(300, 50, 300, 850);
  line(600, 50, 600, 850);
  line(50, 300, 850, 300);
  line(50, 600, 850, 600);
  pop();
}

//Function created the X or O
function drawMarks() {
  push();
  noFill();
  stroke("white");
  strokeWeight(8);
  ellipseMode(CORNER);

  // loop through each square in the grid
  squares.forEach((square, index) => {
    // inset the square to size the x and o
    const s = insetRect(square, 20);

    // check the shared board state to see if and which mark to draw
    if (shared.board[index] === "x") {
      line(s.x, s.y, s.x + s.w, s.y + s.h);
      line(s.x + s.w, s.y, s.x, s.y + s.h);
    }
    if (shared.board[index] === "o") {
      ellipse(s.x, s.y, s.w, s.h);
    }
  });
  pop();
}

//Resets the board
function resetBoard() {
  partySetShared(shared, {
    // prettier-ignore
    board: [
      "empty", "empty", "empty",
      "empty", "empty", "empty",
      "empty", "empty", "empty"
    ],
    turn: "x",
  });
}

// checks to see if the game has ended in a win for `mark`
function checkWin(mark) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // find which squares have the provided mark
  const xIndexes = getIndexes(shared.board, mark);

  // check if mark is inall the squares in any win combo
  const xWin = winCombos.find(
    (combo) =>
      xIndexes.includes(combo[0]) &&
      xIndexes.includes(combo[1]) &&
      xIndexes.includes(combo[2])
  );

  return Boolean(xWin);
}

// checks if the game has ended in a draw
function checkDraw() {
  if (checkWin("x") || checkWin("o")) return false;
  return shared.board.every((square) => square !== "empty");
}

// returns the indexes of all items in array matching value
function getIndexes(a, value) {
  const indexes = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] === value) {
      indexes.push(i);
    }
  }
  return indexes;
}

// checks if point p {x, y} is in rect r {x, y, w, h}
function pointInRect(p, r) {
  return p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h;
}

// returns a new rect {x, y, w, h} based on rect r and inset by amount
function insetRect(r, amount) {
  return {
    x: r.x + amount,
    y: r.y + amount,
    w: r.w - amount * 2,
    h: r.h - amount * 2,
  };
}