var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var http = require('http');

// http.listen(port, function() {
//     console.log('listening on *: ' + port);
// });
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

// app.get("/",function(req, res){
//   res.sendFile(__dirname + '/public/default.html');
// })
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');

    socket.on('move', function(msg){
      console.log("User made a move ");
      console.log(msg);
      socket.broadcast.emit('move', msg);
    });
});

// io.on('connection', function(){
//   console.log("User Connected");
// });
//
// io.on('move', function(msg) {
//   console.log("Move Received");
//   io.broadcast.emit('move', msg);
// });


server.listen(8080);
console.log("Serve Listening at: 8080");
