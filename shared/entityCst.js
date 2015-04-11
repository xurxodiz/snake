var gameUtil = require('./gameUtil');

module.exports.ENTITIES = {
    GAME_BOARD: 'gameBoard',
    SNAKE: 'snake',
    OBJECT: 'object'
};

module.exports.CONFIG = {
    GAME_BOARD: {
        width: 400,
        height: 400
    },
    SNAKE: {
        dx: 10,
        dy: 10
    },
    OBJECT: {
        FOOD: {
            type: 'FOOD',
            dx: 10,
            dy: 10,
            radius: 5,
            color: '#FF0000',
            build: function(id) {
                return {id: id, type: 'FOOD', position: gameUtil.objectUtil.randomPosition()};
            }
        },
        BOMB: {
            type: 'BOMB',
            dx: 10,
            dy: 10,
            radius: 5,
            color: '#FFFF00',
            build: function(id) {
                return {id: id, type: 'BOMB', position: gameUtil.objectUtil.randomPosition()};
            }
        },
        ICE: {
            type: 'ICE',
            dx: 30,
            dy: 30,
            radius: 15,
            color: '#0000FF',
            build: function(id) {
                return {id: id, type: 'ICE', position: gameUtil.objectUtil.randomPosition()};
            }
        },
        PORTAL: {
            type: 'PORTAL',
            dx: 30,
            dy: 30,
            radius: 15,
            color: '#FF00FF',
            build: function(id) {
                return {id: id, type: 'PORTAL', position: gameUtil.objectUtil.randomPosition(), position2: gameUtil.objectUtil.randomPosition()};
            }
        }
    }
};

module.exports.IA = {
    color: '#f85500',
    pseudo: 'I@'
};