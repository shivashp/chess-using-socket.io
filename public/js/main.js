var socket = io.connect("http://localhost:8080");
var initGame = function () {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    };

    board = new ChessBoard('gameBoard', cfg);
    game = new Chess();
}

var handleMove = function(source, target) {
    var str = source+'-'+target;
    // var move = game.move({from: source, to: target});
    var move = game.move({from: source, to: target});
    console.log("Move initiated");
    str = {from: source, target: target};
    console.log(str);
    socket.emit('move', str);
}

socket.on('move', function (msg) {
    console.log("Moved");
    console.log(msg);
    var source = msg.from;
    var target = msg.target;
    console.log(source, target);
    game.move({from: source, to: target});
    board.position(game.fen());
});
initGame();
