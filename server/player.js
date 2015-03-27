/**
 * Created by manland on 26/03/15.
 */

function Player(properties, socket) {
    this.id = -1;
    this.pseudo = properties.pseudo || 'IA';
    this.color = properties.color || '#ff0000';
    this.socket = socket;
}

Player.prototype.emit = function(event, data) {
    this.socket.emit(event, data);
};

Player.prototype.toDistant = function() {
    return {id: this.id, pseudo: this.pseudo, color: this.color};
};

module.exports = Player;