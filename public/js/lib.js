import {Snake} from './snake';
import {SnakeView} from './snakeView';
import {DrawableUtil} from './drawableUtil';
import {Food} from './food';
import {FoodView} from './foodView';

var WIDTH;
var HEIGHT;

// 0: left
// 1: up
// 2: right
// 3: down
var direction;

var snake, snakeView;
var food, foodView;

var id;

var drawableUtil;

exports.init = function init(game) {
    drawableUtil = new DrawableUtil(document.getElementById('canvas').getContext("2d"));
  WIDTH = canvas.clientWidth;
  HEIGHT = canvas.clientHeight;

  createsnake();
  newfood();

  direction = 0;

  id = setInterval(game.step.bind(game), 75);
};

exports.onKeyDown = function onKeyDown(evt) {
  var newdir = evt.keyCode - 37;

  // only lateral turns are allowed
  // (that is, no u-turns)
  if (newdir != direction && newdir != direction+2 && newdir != direction-2) {
    direction = newdir;
  }
};

function createsnake() {
    snake = new Snake({width: WIDTH, height: HEIGHT, newfood: newfood});
    snakeView = new SnakeView(snake, drawableUtil);
}

function newfood() {
    food = new Food({width: WIDTH, height: HEIGHT});
    foodView = new FoodView(food, drawableUtil);
}

exports.movesnake = function movesnake() {
    return snake.move(direction, food);
};

exports.die = function die() {
    if (id) {
        clearInterval(id);
    }
    return snake.positions.length;//nb food eaten
};

exports.screenclear = function screenclear() {
    drawableUtil.rect("#000000", 0, 0, WIDTH, HEIGHT);
};

exports.drawsnake = function drawsnake() {
    snakeView.draw();
};

exports.drawfood = function drawfood() {
    foodView.draw();
};