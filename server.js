const Enemy = require('./static/js/Enemy.js')


const express = require('express');
const app = express();
const server = app.listen(8888);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

let enemies = [];
let enemySpawn = 3;

io.on('connection', function(socket){
    socket.on('newConnection', function(){
       
    })

    socket.on('playerMovement', function(data){
        io.emit('updatePlayerPosition', data);
    })

    socket.on('shootBullet', function(data){

        io.emit('drawBullet', data)
    })

    socket.on('getEnemies', function(){
        if(enemies.length < enemySpawn){
            let enemy = new Enemy(Math.floor(Math.random() * 600 - 60)+1, Math.floor(Math.random() * 50), Math.floor(Math.random() * 10)+1);

            enemies.push(enemy)
        }
        for(let i=0;i<enemies.length;i++){
            let enemy = enemies[i];
            enemy.y += enemy.speed
            if(enemy.y > 800){
                socket.emit('removeEnemy', {index: i})
                enemies.splice(i,1)
            }
            io.emit('drawEnemy', {x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height})
        }
    })

})

app.get('/', function(req, res){
    res.render('index');
})


// for(let i=0;i<this.bullets.length;i++){
//     let bullet = this.bullets[i];
//     bullet.y -= bullet.speed;
//     if(bullet.y < 0){
//         this.bullets.splice(i,1)
//     }
//     ctx.fillStyle = "red"
//     ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
// }