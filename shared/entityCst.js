/**
 * Created by manland on 21/03/15.
 */
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
            color: '#FF0000'
        },
        BOMB: {
            type: 'BOMB',
            dx: 10,
            dy: 10,
            radius: 5,
            color: '#FFFF00'
        },
        ICE: {
            type: 'ICE',
            dx: 30,
            dy: 30,
            radius: 15,
            color: '#0000FF'
        }
    }
};

module.exports.IA = {
    color: '#f85500',
    pseudo: 'I@'
};