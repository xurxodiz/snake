/**
 * Created by manland on 26/03/15.
 */

var foodUtil = require('../shared/gameUtil').foodUtil;
var iaConfig = require('../shared/entityCst').IA;

function Room(properties, socket) {
    this.name = properties.name;
    this.nbPlayers = properties.nbPlayers;
    this.infiniteWallSize = properties.infiniteWallSize;
    this.socket = socket;
    this.players = [];
    this.watchers = [];
    this.foods = [];
    this.isStarted = false;
    this.restartInProgress = false;
    this.currentIdPlayer = 0;
}

Room.prototype.addPlayer = function(player) {
    player.socket.join(this.name);
    player.id = this.currentIdPlayer;
    this.currentIdPlayer++;
    this.emitAllPlayers(player/*player is also a socket*/, player);
    if(this.isStarted === false) {
        this.players.push(player);
        this.start();
    } else {
        this.toWatcher(player);
        this.players.push(player);
    }
    this.emit('newPlayer', player.toDistant());
};

Room.prototype.emitAllPlayers = function(socket, optNewPlayer) {
    var players = [];
    this.players.forEach(function(player) {
        players.push(player.toDistant());
    });
    if(optNewPlayer !== undefined) {
        players.push(optNewPlayer.toDistant());
    }
    socket.emit('allPlayers', players);
};

Room.prototype.deletePlayer = function(player) {
    var indexPlayer = this.players.indexOf(player);
    if(indexPlayer > -1) {
        this.playerDead(player.id);
        this.players[indexPlayer].killIa(this);
        this.players.splice(indexPlayer, 1);
    }
};

Room.prototype.toPlayers = function() {
    this.players.forEach(function(player) {
        var gameConfig = {nbFood: 0, snakeInitSize: 10, infiniteWallSize: this.infiniteWallSize, controllers: []};
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
                        var ia = {id: i + 100000, type: 'IAController', color: iaConfig.color, pseudo: iaConfig.pseudo+i};
                        player.manage(ia);
                        gameConfig.controllers.push(ia);
                    } else {
                        gameConfig.controllers.push({id: i + 100000, type: 'RemoteNetworkController', color: iaConfig.color, pseudo: iaConfig.pseudo+i});
                    }
                }
            }
        }.bind(this));
        player.emit('roomGame', gameConfig);
    }.bind(this));
};

Room.prototype.toWatchers = function() {
    this.watchers.forEach(this.toWatcher.bind(this));
};

Room.prototype.toWatcher = function(watcher) {
    var gameConfig = {nbFood: 0, snakeInitSize: 10, infiniteWallSize: this.infiniteWallSize, controllers: []};
    this.players.forEach(function(p) {
        var distantPlayer = p.toDistant();
        distantPlayer.type = 'RemoteNetworkController';
        gameConfig.controllers.push(distantPlayer);
    }.bind(this));
    var nbIaNeeded = this.nbPlayers - this.players.length;
    for(var i=0; i<nbIaNeeded; i++) {
        gameConfig.controllers.push({id: i+100000, type: 'RemoteNetworkController', color: iaConfig.color, pseudo: iaConfig.pseudo+i});
    }
    watcher.emit('roomGame', gameConfig);
    if(this.isStarted === false) {
        watcher.emit('start');
    }
};

Room.prototype.isFull = function() {
    return this.players.length >= this.nbPlayers;
};

Room.prototype.addWatcher = function(socket) {
    this.emitAllPlayers(socket);
    this.toWatcher(socket);
    socket.join(this.name);
    this.watchers.push(socket);
};

Room.prototype.removeWatcher = function(socket) {
    var index = this.watchers.indexOf(socket);
    if(index > -1) {
        this.watchers.splice(index, 1);
    }
};

Room.prototype.start = function() {
    this.isStarted = true;
    this.toPlayers();
    this.toWatchers();
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

Room.prototype.foodEaten = function(foodId, playerId) {
    this.foods.forEach(function(food, index) {
        if (food.id === foodId) {
            this.foods.splice(index, 1);
            this.emit('foodEaten', {foodId: foodId, playerId: playerId});
            this.addFood();
        }
    }.bind(this));
};

Room.prototype.addFood = function() {
    var food = {id: this.foods.length, position: foodUtil.randomPosition()};
    this.foods.push(food);
    this.emit('addFood', food);
};

Room.prototype.playerDead = function(playerId, optAgainstPlayerId) {
    this.players.forEach(function(player) {
        if(player.id === playerId) {
            player.dead();
            this.emit('scoreOf', player.toDistant());
        } else if(optAgainstPlayerId !== undefined && player.id === optAgainstPlayerId) {
            player.score += 1;
            this.emit('scoreOf', player.toDistant());
        }
    }.bind(this));
    this.emit('dead', playerId, optAgainstPlayerId);
};

Room.prototype.finish = function() {
    this.emit('finish');
    this.isStarted = false;
    this.restart();
};

Room.prototype.emit = function(/*event, ...args*/) {
    this.socket.emit.apply(this.socket, arguments);
};

Room.prototype.toDistant = function() {
    return {name: this.name, nbPlayers: this.nbPlayers, infiniteWallSize: this.infiniteWallSize, nbPlayersInGame: this.players.length};
};

module.exports = Room;