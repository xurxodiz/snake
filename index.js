/**
 * Created by manland on 20/03/15.
 */
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

var randomFoodPosition = function randomFoodPosition() {
    var width = 600;
    var height = 600;
    var dx = 10;
    var dy = 10;

    var wcells = width / dx;
    var hcells = height / dy;

    var randomx = Math.floor(Math.random() * wcells);
    var randomy = Math.floor(Math.random() * hcells);

    return {x: randomx * dx, y: randomy * dy};
};

var rooms = [{name: 'test', nbPlayers: 2, nbPlayersInGame: 0, isStarted: false}, {name: 'other', nbPlayers: 5, nbPlayersInGame: 0, isStarted: false}];

var roomsGame = {
    /*_default: {
        nbFood: 0,
        snakeInitSize: 10,
        controllers: [
            //{type: 'KeyboardController', color: '#ff0000', id: 1}
            //{type: 'IAController', color: '#00ff00', id: 2},
            //{type: 'IAController', color: '#00ffff', id: 3}
            //{type: 'IAController', color: '#0000ff', id: 4},
            //{type: 'IAController', color: '#ff00ff', id: 5}
        ]
    }*/
}

var findRoomByName = function findRoomByName(name) {
    for(var i=0; i<rooms.length; i++) {
        if(rooms[i].name === name) {
            return rooms[i];
        }
    }
};

var timeout;

io.on('connection', function (socket) {
    socket.on('getRooms', function() {
        socket.emit('rooms', rooms);
    });
    socket.on('addRoom', function (data) {
        data.nbPlayersInGame = 0;
        data.isStarted = false;
        rooms.push(data);
        io.emit('rooms', rooms);
    });
    socket.on('joinRoom', function (roomName) {

        var room = findRoomByName(roomName);
        if(!room) {
            socket.emit('roomNotFound');
            return;
        }

        if(room.nbPlayersInGame >= room.nbPlayers) {
            socket.emit('roomFull');
            return;
        }

        if(room.nbPlayersInGame < room.nbPlayers) {
            socket.join(roomName);
            socket.roomJoined = room;
            room.nbPlayersInGame = room.nbPlayersInGame + 1;
            io.emit('rooms', rooms);
            var config = roomsGame[roomName] || {nbFood: 0, snakeInitSize: 10, controllers: []};
            var newControllers = [];
            var newPlayerAffected = false;
            var controller, i;
            if(config.controllers.length === 0) {
                newControllers.push({id: 1, type: 'KeyboardController', color: '#0000ff'});
                for (i = 1; i < room.nbPlayers; i++) {
                    newControllers.push({id: i+1, type: 'IAController', color: '#ff0000'});
                }
            } else {
                for (i = 0; i < config.controllers.length; i++) {
                    controller = config.controllers[i];
                    if (controller.type === 'KeyboardController') {
                        controller.type = 'RemoteNetworkController';
                        newControllers.push(controller);
                    } else if (newPlayerAffected === false) {
                        newPlayerAffected = true;
                        controller.type = 'RemoteNetworkController';//'KeyboardController';
                        newControllers.push(controller);
                    } else {
                        controller.type = 'RemoteNetworkController';
                        newControllers.push(controller);
                    }
                }
            }
            config.controllers = newControllers;
            roomsGame[roomName] = config;
            socket.emit('roomGame', config);
            io.to(socket.roomJoined.name).emit('newPlayer');
        }

        if(room.isStarted === false) {
            room.isStarted = true;
            setTimeout(function () {
                io.to(socket.roomJoined.name).emit('start');
                setTimeout(function () {
                    io.to(socket.roomJoined.name).emit('addFood', randomFoodPosition());
                }, 200);
            }, 3000);
        }

        socket.on('changeDirection', function (data) {
            io.to(socket.roomJoined.name).emit('changedDirection', data);
        });
        socket.on('dead', function(data) {
            io.to(socket.roomJoined.name).emit('dead', data);
        });

        socket.on('finish', function(data) {
            io.to(socket.roomJoined.name).emit('finish', data);
            if(timeout === undefined) {
                timeout = setTimeout(function () {
                    timeout = undefined;
                    io.to(socket.roomJoined.name).emit('restart', roomsGame[socket.roomJoined.name]);
                    setTimeout(function () {
                        io.to(socket.roomJoined.name).emit('start');
                        setTimeout(function () {
                            io.to(socket.roomJoined.name).emit('addFood', randomFoodPosition());
                        }, 200);
                    }, 3000);
                }, 1000);
            }
        });
        socket.on('foodEaten', function() {
            io.to(socket.roomJoined.name).emit('addFood', randomFoodPosition());
        });
    });

});

console.log('open webbrowser on http://127.0.0.1:' + constants.port);