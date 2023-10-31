function clicker() {
  var score, count, countTouch, costCheck, costTouch; 
  var buttonClick, buttonUpgrade, buttonCount, gameList;
  let col;
  let sceneClicker;

  //Setup Function
  this.enter = function() {
    col = color('rgb(167,198,201)');

    //buttons
    clickButton(); 
    upgradeButton();
    countButton();
    backButton();
    
    setInterval(controlScore, 1000);

    //Game Setup
    score = 0; 
    count = 0; 
    countTouch = 1; 
    costCheck = 20;
    costTouch = 10;

    sceneClicker = false; 
  }

  //Draw Function
  this.draw = function() { 
    background(0, 110, 250);
    
    if(sceneClicker === true){
      removeElements();
      this.sceneManager.showScene(solo); 
    }

    overlay();
    disButton();
  }

  //Changes scene
  function changeGame () {
    sceneClicker = true; 
  }

  //Adds score
  function increaseScore() {
    score += countTouch; 
  }

  //Score Controller
  function controlScore() {
    score += count; 
  }

  //Click Controller
  function controlClick() {
    countTouch++;
    score -= round(costTouch);
    costTouch *= 1.15; 
  }

  //Count Controller
  function controlCount() {
    count++;
    score -= round(costCheck);
    costCheck *= 2.15;
  }

  // Disable/enable button
  function disButton() {
    if (costTouch <= score) {
      buttonUpgrade.removeAttribute('disabled');
      buttonUpgrade.style('background-color', col);
      buttonUpgrade.style('color', 'red');
    } else {
      buttonUpgrade.attribute('disabled', '');
      buttonUpgrade.style('background-color', 'grey');
      buttonUpgrade.style('color', 'black');
    }

    if (costCheck <= score) {
      buttonCount.removeAttribute('disabled');
      buttonCount.style('background-color', col);
      buttonCount.style('color', 'red');
    } else {
      buttonCount.attribute('disabled', '');
      buttonCount.style('background-color', 'grey');
      buttonCount.style('color', 'black');
    }
  }
  
  //Click Button
  function clickButton() {
    buttonClick = createButton('Click Me'); 
    buttonClick.position(width / 2 - 100, height / 2);
    buttonClick.size(150, 50);
    buttonClick.style('background-color', col);
    buttonClick.style('color', 'red');
    buttonClick.style('font-size', '20px');
    buttonClick.mousePressed(increaseScore); 
  }

  //upgrade button
  function upgradeButton() {
    buttonUpgrade = createButton('Upgrade Click'); 
    buttonUpgrade.position(width / 2, height - 100);
    buttonUpgrade.size(150, 50);
    buttonUpgrade.style('background-color', 'grey');
    buttonUpgrade.style('color', 'black');
    buttonUpgrade.style('font-size', '20px');
    buttonUpgrade.mousePressed(controlClick);
  }

  //count button
  function countButton (){
    buttonCount = createButton('Upgrade Count'); 
    buttonCount.position(width / 2 - 250, height - 100);    
    buttonCount.size(150, 50);
    buttonCount.style('background-color', col);
    buttonCount.style('color', 'red');
    buttonCount.style('font-size', '20px');
    buttonCount.mousePressed(controlCount); 
  }

  //back button
  function backButton(){ 
    gameList = createButton('<<<'); 
    gameList.position(width/2 - 435, height/2 - 435);
    gameList.size(150, 50);
    gameList.style('background-color', col);
    gameList.style('color', 'red');
    gameList.style('font-size', '20px');
    gameList.mousePressed(changeGame);
  }

  //Text
  function overlay() {
    textSize(32);
    textAlign(CENTER);
    textStyle(BOLD); 
    text('Score: ' + score, width / 2- 25, height / 2 - 50);

    textSize(20);
    text('Click Count: ' + countTouch, width / 2 + 75, height - 175);
    text('Next Upgrade: ' + round(costTouch), width / 2 + 75, height - 145);
    text('Auto Click: ' + count, width / 2 - 185, height - 175);
    text('Next Upgrade: ' + round(costCheck), width / 2 - 185, height - 145);
  }
}