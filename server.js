const express = require('express');
const app = express();
const server = app.listen(8888);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

io.on('connection', function(socket){
    socket.on('newConnection', function(){

    })


})

app.get('/', function(req, res){
    res.render('index');
})