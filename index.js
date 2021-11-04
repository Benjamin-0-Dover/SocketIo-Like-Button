var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

var likes = 0;

app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {  
    //Like button
    client.on('liked', function(data) {
    	  likes++;
		  io.emit('buttonUpdate', likes);
    });
    //Dislike button
    client.on('un_liked', function(data) {
    	  likes = likes - 1
		  io.emit('buttonUpdate', likes);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
