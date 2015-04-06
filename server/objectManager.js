/**
 * Created by manland on 06/04/15.
 */

var objectUtil = require('../shared/gameUtil').objectUtil;
var objectConfig = require('../shared/entityCst').CONFIG.OBJECT;
var MathUtil = require('../shared/mathUtil').MathUtil;

function ObjectManager(room) {
    this.room = room;
    this.currentIdObject = 0;
    this.objects = [];
    this.timeouts = [];
    this.types = [];
    for(var conf in objectConfig) {
        this.types.push(objectConfig[conf].type);
    }
}

ObjectManager.prototype.start = function() {
    this.addObject(objectConfig.FOOD.type);
    this.addRandom();
};

ObjectManager.prototype.finish = function() {
    this.objects = [];
    this.timeouts.forEach(function(clearTime) {
        clearTimeout(clearTime);
    });
    this.timeouts = [];
};

ObjectManager.prototype.objectEaten = function(objectId, playerId) {
    for(var i=0; i<this.objects.length; i++) {
        if (this.objects[i].id === objectId) {
            var type = this.objects[i].type;
            this.objects.splice(i, 1);
            this.room.emit('objectEaten', {objectId: objectId, type: type, playerId: playerId});
            if(type === objectConfig.FOOD.type) {//readd food for ia
                this.addObject(type);
            }
            return;
        }
    }
};

ObjectManager.prototype.addObject = function(type) {
    var object = {id: this.currentIdObject, type: type, position: objectUtil.randomPosition()};
    this.currentIdObject++;
    this.objects.push(object);
    this.room.emit('addObject', object);
};

ObjectManager.prototype.addRandom = function() {
    this.timeouts.push(setTimeout(function () {
        var toAdd = this.types[MathUtil.randomInt(0, this.types.length)];
        this.addObject(toAdd);
        this.addRandom();
    }.bind(this), MathUtil.randomInt(1000, 10000)));
};

module.exports = ObjectManager;