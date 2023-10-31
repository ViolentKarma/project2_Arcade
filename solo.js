function solo() {
    var clickerG; 
    var reactGame;
    var gif_createImg;

    var soloScene;
    let col;

    this.enter = function() {
        col = color('rgb(167,198,201)');
        gif_createImg = createImg("skel.gif");

        clickerGame();
        reactionGame();

        soloScene = 0;
    }

    this.draw = function() {
        background(125);
        gif_createImg.size(width, height);
        gif_createImg.position(0, 0);

        if(soloScene === 1){
            removeElements();
            this.sceneManager.showScene(clicker); 
        } else if(soloScene === 2){
            removeElements(); 
            this.sceneManager.showScene(reactionTime); 
        }
    }

    //Clicker Button
    function clickerGame() {
        clickerG = createButton('Clicker'); 
        clickerG.position(width/2 - 100, height/2 - 50);
        clickerG.size(150, 50);
        clickerG.style('background-color', col);
        clickerG.style('color', 'red');
        clickerG.style('font-size', '20px');
        clickerG.mousePressed(clickerScene);
    }

    //React Button
    function reactionGame() {
        reactGame = createButton('Reaction Test');
        reactGame.position(width/2 - 100, height/2 + 50);
        reactGame.size(150, 50);
        reactGame.style('background-color', col);
        reactGame.style('color', 'red');
        reactGame.style('font-size', '20px');
        reactGame.mousePressed(reactionScene);
    }

    function clickerScene() {
        soloScene = 1;
    }

    function reactionScene() {
        soloScene = 2; 
    }

}