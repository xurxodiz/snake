/**
 * Created by manland on 26/03/15.
 */

function Player(properties, socket) {
    this.id = -1;
    this.pseudo = properties.pseudo || 'IA';
    this.color = properties.color || '#f85500';
    this.score = 0;
    this.entitiesManaged = [];
    this.socket = socket;
}

Player.prototype.manage = function(ia) {
    this.entitiesManaged.push(ia);
};

Player.prototype.dead = function() {
    this.score -= 1;
};

Player.prototype.killIa = function(room) {
    this.entitiesManaged.forEach(function (ia) {
        room.emit('dead', ia.id);
    });
};

Player.prototype.emit = function(/*event, ...args*/) {
    this.socket.emit.apply(this.socket, arguments);
};

Player.prototype.toDistant = function() {
    return {id: this.id, pseudo: this.pseudo, color: this.color, score: this.score};
};

module.exports = Player;