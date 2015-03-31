var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var mime = require('mime');
var constants = require('./constants');

app.listen(constants.port);

function handler (req, res) {
    var path = req.url;
    if(path[path.length-1] === '/') {
        path = path + 'index.html';
    }
    if(path.indexOf('?') > -1) {
        path = path.split('?')[0];
    }
    fs.readFile(__dirname + '/public/' + path, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.writeHead(200, {'Content-Type': mime.lookup(path)});
        res.end(data);
    });
}

var roomManager = require('./server/roomManager');
var Room = require('./server/room');
var Player = require('./server/player');

io.on('connection', function (socket) {

    socket.on('getRooms', function () {
        socket.emit('rooms', roomManager.toDistant());
    });

    socket.on('addRoom', function (data) {
        roomManager.addRoom(new Room(data, io.to(data.name)));
        io.emit();//what the fuck ?? Need it, else io doesn't flush next request !?
        io.emit('rooms', roomManager.toDistant());
    });

    socket.on('joinRoom', function (roomName, playerConfig) {
        var room = roomManager.findRoomByName(roomName);
        if(!room) {
            socket.emit('roomNotFound');
            return;
        }

        if(room.isFull()) {
            room.addWatcher(socket);
            socket.trakeWatcherRoom = room;
            socket.emit('roomFull');
            return;
        }

        var player = new Player(playerConfig, socket);
        room.addPlayer(player);
        if(socket.trakeRoom && socket.trakePlayer) {
            socket.trakeRoom.deletePlayer(socket.trakePlayer);
        }
        socket.trakePlayer = player;
        socket.trakeRoom = room;

        io.emit('rooms', roomManager.toDistant());

        socket.on('changeDirection', function (data) {
            room.emit('changedDirection', data);
        });

        socket.on('dead', function(playerId, optAgainstPlayerId) {
            room.playerDead(playerId, optAgainstPlayerId);
        });

        socket.on('finish', function() {
            room.finish();
        });

        socket.on('foodEaten', function(foodId, playerId) {
            room.foodEaten(foodId, playerId);
        });
    });

    socket.on('disconnect', function () {
        if(socket.trakeRoom && socket.trakePlayer) {
            socket.leave(socket.trakeRoom.name);
            socket.trakeRoom.deletePlayer(socket.trakePlayer);
            if(socket.trakeRoom.players.length === 0) {
                roomManager.deleteRoom(socket.trakeRoom);
            } else {
                socket.trakeRoom.emit('userDisconnected', {id: socket.trakePlayer.id});
            }
            io.emit('rooms', roomManager.toDistant());
        }
        if(socket.trakeWatcherRoom) {
            socket.trakeWatcherRoom.removeWatcher(socket);
            socket.leave(socket.trakeWatcherRoom.name);
        }
        socket.trakePlayer = undefined;
        socket.trakeRoom = undefined;
        socket.trakeWatcherRoom = undefined;
    });
});