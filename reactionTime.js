function reactionTime() {
  let gameState; 
  let startTime, reactionTime; 
  var gameList;
  var reactScene; 
  let col;

  //Setup function
  this.enter = function() {
    col = color('rgb(167,198,201)');
    background(150);
    backButton(); 
    startText();

    //Game Setup
    gameState = 'Waiting';
    reactScene = false; 
  }

  //Draw Function
  this.draw = function() {
    //Changes the game state
    switch(gameState){
      case 'Playing':
        background(150);
        text('Wait for the Color to Change', width/2, height/2);
        break; 
      case 'Reaction': 
        background('green'); 
        text('Click Now', width/2, height/2); 
        break;
      case 'Result': 
        background(150);
        text('Your reaction time: ' + round(reactionTime) + 'ms', width/2, height/2);
        break;
      default: break; 
    }

    //Changes Scene
    if(reactScene === true){
      removeElements();
      this.sceneManager.showScene(solo);
    }
  }

  //Mouse Click function
  this.mouseClicked = function() {
    //Changes the game state
    switch(gameState){
      case 'Waiting': 
        gameState = 'Playing'; 
        setTimeout(startReaction, random(1000, 5000));
        break;
      case 'Reaction': 
        reactionTime = millis() - startTime; 
        gameState = 'Result';
        break;
      case 'Result': 
        gameState = 'Waiting'; 
        background(150); 
        text('Click to Start', width/2, height/2);
        break;
      default: break;
    }
  }

  //Changes gameState to 'Reaction' and sets timer
  function startReaction() {
    gameState = 'Reaction'; 
    startTime = millis(); 
  }

  //Changes Scene
  function changeGame () {
    reactScene = true; 
  }

  //Start Text
  function startText() {
    textAlign(CENTER);
    textSize(30);
    textStyle(BOLD);
    text('Click to Start', width/2, height/2);
  }

  //Back button
  function backButton() {
    gameList = createButton('<<<'); 
    gameList.position(width/2 - 435, height/2 - 435);
    gameList.size(150, 50);
    gameList.style('background-color', col);
    gameList.style('color', 'red');
    gameList.style('font-size', '20px');
    gameList.mousePressed(changeGame);
  }
}