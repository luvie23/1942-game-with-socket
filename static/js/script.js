import Player from "/js/Player.js";

const gameScreen = document.getElementById('gameScreen');
const ctx = gameScreen.getContext("2d");
gameScreen.width = 600;
gameScreen.height = 800;
const player = new Player(gameScreen.width/2.5, gameScreen.height/1.1)

const socket = io();

socket.emit('newConnection');

const playerSprite = new Image();
playerSprite.src = '/sprites/player/player.png';

const enemySprite = new Image();
enemySprite.src = '/sprites/player/enemy.png';

const bgImg = new Image();
bgImg.src = '/sprites/player/bg.jpg';

function game(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, gameScreen.width, gameScreen.height)
    ctx.drawImage(bgImg, 0, 0);
    
    socket.emit('playerMovement', player.draw());
    socket.on('updatePlayerPosition', function(data){
            ctx.drawImage(playerSprite, data.x, data.y, data.width, data.height)
    })

    if(player.shootBullet().length > 0){
        let bullets = player.shootBullet();
        for(let i=0;i<bullets.length;i++){
            let bullet = bullets[i];
            bullet.y -= bullet.speed;
            if(bullet.y < 0){
                bullets.splice(i,1)
            }
            let bulletInfo = {x: bullet.x, y: bullet.y, width: bullet.width, height: bullet.height}
            socket.emit('shootBullet', bulletInfo)
        }
    }

    socket.on('drawBullet', function(data){
        ctx.fillStyle = "red";
        ctx.fillRect(data.x, data.y, data.width, data.height)
    })

    socket.emit('getEnemies');

    socket.on('drawEnemy', function(data){
        ctx.drawImage(enemySprite, data.x, data.y, data.width, data.height)
    })
}

setInterval(game, 25)

function hitDetection(){
    for(let i=0;i<player.bullets.length;i++){
        let bulletX = player.bullets[i].x;
        let bulletY = player.bullets[i].y;
        let enemies =[]
        socket.on('getEnemiesList', function(data){
            enemies = data;
            console.log(enemies)
        })
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
