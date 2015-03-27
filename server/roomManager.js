/**
 * Created by manland on 26/03/15.
 */

function RoomManager() {
    this.rooms = [];
}

RoomManager.prototype.addRoom = function(room) {
    this.rooms.push(room);
};

RoomManager.prototype.findRoomByName = function(name) {
    for(var i=0; i<this.rooms.length; i++) {
        if(this.rooms[i].name === name) {
            return this.rooms[i];
        }
    }
};

RoomManager.prototype.toDistant = function() {
    var res = [];
    for(var i=0; i<this.rooms.length; i++) {
        res.push(this.rooms[i].toDistant());
    }
    return res;
};

module.exports = new RoomManager();