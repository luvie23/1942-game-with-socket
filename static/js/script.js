import Player from "/js/Player.js";
import Enemy from "/js/Enemy.js";


const gameScreen = document.getElementById('gameScreen');
const ctx = gameScreen.getContext("2d");
gameScreen.width = 600;
gameScreen.height = 800;
const player = new Player(gameScreen.width/2.5, gameScreen.height/1.1)

let enemies = [];
let enemySpawn = 50;

function game(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, gameScreen.width, gameScreen.height)
    
    player.draw(ctx)
    if(enemies.length < enemySpawn){
        let enemy = new Enemy(Math.floor(Math.random() * gameScreen.width - 60)+1, Math.floor(Math.random() * 50), Math.floor(Math.random() * 10)+1);
        
        enemies.push(enemy);
    }
    for(let i=0;i<enemies.length;i++){
        let enemy = enemies[i];
        enemy.y += enemy.speed
        if(enemy.y > gameScreen.height){
            enemies.splice(i,1)
        }
        enemy.draw(ctx)
    }

    for(let i=0;i<player.bullets.length;i++){
        let bulletX = player.bullets[i].x;
        let bulletY = player.bullets[i].y;

        for(let j=0;j<enemies.length;j++){
            let enemy = enemies[j];
            let bothX = bulletX - enemy.x;
            if(bothX > 0 && bothX <50){
                let bothY = bulletY - enemy.y
                if(bothY > 0 && bothY <50){
                    console.log('hit')
                    player.bullets.splice(i,1);
                    enemies.splice(j,1);
                }
            } 
        }
    }
}

setInterval(game, 25)