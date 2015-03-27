/**
 * Created by manland on 26/03/15.
 */

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

function Room(properties, socket) {
    this.name = properties.name;
    this.nbPlayers = properties.nbPlayers;
    this.infiniteWallSize = properties.infiniteWallSize;
    this.socket = socket;
    this.players = [];
    this.watchers = [];
    this.isStarted = false;
    this.restartInProgress = false;
}

Room.prototype.addPlayer = function(player) {
    player.socket.join(this.name);
    player.id = this.players.length;
    this.emit('newPlayer', player.toDistant());
    if(this.isStarted === false) {
        this.players.push(player);
        this.start();
    } else {
        this.toWatcher(player);
        this.players.push(player);
    }
};

Room.prototype.toPlayers = function() {
    this.players.forEach(function(player) {
        var gameConfig = {nbFood: 0, snakeInitSize: 10, controllers: []};
        this.players.forEach(function(p, index) {
            var distantPlayer = p.toDistant();
            if(p === player) {
                distantPlayer.type = 'KeyboardController';
                gameConfig.controllers.push(distantPlayer);
            } else {
                distantPlayer.type = 'RemoteNetworkController';
                gameConfig.controllers.push(distantPlayer);
            }
            if(index === 0) {
                var nbIaNeeded = this.nbPlayers - this.players.length;
                for(var i=0; i<nbIaNeeded; i++) {
                    if(p === player) {
                        gameConfig.controllers.push({id: i + 1000, type: 'IAController', color: '#ff0000'});
                    } else {
                        gameConfig.controllers.push({id: i + 1000, type: 'RemoteNetworkController', color: '#ff0000'});
                    }
                }
            }
        }.bind(this));
        player.emit('roomGame', gameConfig);
    }.bind(this));
};

Room.prototype.toWatcher = function(watcher) {
    var gameConfig = {nbFood: 0, snakeInitSize: 10, controllers: []};
    this.players.forEach(function(p) {
        var distantPlayer = p.toDistant();
        distantPlayer.type = 'RemoteNetworkController';
        gameConfig.controllers.push(distantPlayer);
    }.bind(this));
    var nbIaNeeded = this.nbPlayers - this.players.length;
    for(var i=0; i<nbIaNeeded; i++) {
        gameConfig.controllers.push({id: i+1000, type: 'RemoteNetworkController', color: '#ff0000'});
    }
    watcher.emit('roomGame', gameConfig);
    watcher.emit('start');
};

Room.prototype.isFull = function() {
    return this.players.length >= this.nbPlayers;
};

Room.prototype.start = function() {
    this.isStarted = true;
    this.toPlayers();
    setTimeout(function () {
        this.emit('start');
        setTimeout(function () {
            this.addFood();
        }.bind(this), 200);
    }.bind(this), 3000);
};

Room.prototype.restart = function() {
    if(this.restartInProgress === false) {
        this.restartInProgress = true;
        setTimeout(function () {
            this.restartInProgress = false;
            this.emit('restart');
            this.start();
        }.bind(this), 1000);
    }
};

Room.prototype.addFood = function() {
    this.emit('addFood', randomFoodPosition());
};

Room.prototype.finish = function(data) {
    this.emit('finish', data);
    this.isStarted = false;
    this.restart();
};

Room.prototype.emit = function(event, data) {
    this.socket.emit(event, data);
};

Room.prototype.toDistant = function() {
    return {name: this.name, nbPlayers: this.nbPlayers, infiniteWallSize: this.infiniteWallSize, nbPlayersInGame: this.players.length};
};

module.exports = Room;