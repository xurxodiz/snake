/**
 * Created by manland on 29/03/15.
 */

var CONFIG = require('./entityCst').CONFIG;

var randomFoodPosition = function() {
    var width = CONFIG.GAME_BOARD.width;
    var height = CONFIG.GAME_BOARD.height;
    var dx = CONFIG.FOOD.dx;
    var dy = CONFIG.FOOD.dy;

    var wCells = width / dx;
    var hCells = height / dy;

    var randomX = Math.floor(Math.random() * wCells);
    var randomY = Math.floor(Math.random() * hCells);

    return {x: randomX * dx, y: randomY * dy};
};

module.exports.foodUtil = {
    randomPosition: randomFoodPosition
};

var randomSnakePosition = function() {
    var width = CONFIG.GAME_BOARD.width;
    var height = CONFIG.GAME_BOARD.height;

    var x = Math.floor(Math.random() * width);
    x = Math.floor((x + 5) / 10) * 10;//round to decade
    if(x < 30) {
        x = 30
    } else if(x > width - 30) {
        x = width - 30;
    }
    var y = Math.floor(Math.random() * height);
    y = Math.floor((y + 5) / 10) * 10;//round to decade
    if(y < 30) {
        y = 30;
    } else if(y > height-30) {
        y = height-30;
    }

    return {x: x, y: y};
};

module.exports.snakeUtil = {
    randomPosition: randomSnakePosition
};