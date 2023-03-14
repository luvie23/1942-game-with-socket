import Player from "/js/Player.js"


const gameScreen = document.getElementById('gameScreen');
const ctx = gameScreen.getContext("2d");
gameScreen.width = 600;
gameScreen.height = 800;
const player = new Player(gameScreen.width/2.5, gameScreen.height/1.1)



function gameLoop(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, gameScreen.width, gameScreen.height)
    player.draw(ctx)
}
setInterval(gameLoop, 1000/60)