/**
 * Created by manland on 29/03/15.
 */

var CONFIG = require('./entityCst').CONFIG;

var randomPosition = function() {
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
    randomPosition: randomPosition
};