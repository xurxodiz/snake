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
            color: '#FF0000',
            collision: function(snake) {
                snake.growth();
            }
        },
        BOMB: {
            type: 'BOMB',
            dx: 10,
            dy: 10,
            radius: 5,
            color: '#FFFF00',
            collision: function(snake) {
                snake.dead();
            }
        }
    }
};

module.exports.IA = {
    color: '#FF0000',
    pseudo: 'I@'
};