import {DrawableUtil} from './drawableUtil';
import {SnakeView} from './snakeView';
import {FoodView} from './foodView';
import {GameBoardView} from './gameBoardView';

// 0: left
// 1: up
// 2: right
// 3: down
var direction;

var gameBoard, gameBoardView;
var snake;

exports.init = function init() {
    var canvas = document.getElementById('canvas');
    var drawableUtil = new DrawableUtil(canvas.getContext("2d"));
    gameBoardView = new GameBoardView(canvas.clientWidth, canvas.clientHeight, drawableUtil);

    var snakeView = new SnakeView(gameBoardView.entity, drawableUtil);
    snake = snakeView.entity;
    gameBoardView.addDrawableEntity(snakeView);
    gameBoardView.addDrawableEntity(new FoodView(gameBoardView.entity, drawableUtil));

    direction = 0;
};

exports.onKeyDown = function onKeyDown(evt) {
  var newdir = evt.keyCode - 37;

  // only lateral turns are allowed
  // (that is, no u-turns)
  if (newdir != direction && newdir != direction+2 && newdir != direction-2) {
    direction = newdir;
  }
};

exports.move = function move() {
    return snake.move(direction);
};

exports.checkCollision = function checkCollision() {
    var res = gameBoardView.entity.checkCollision();
    return res;
};

exports.getScore = function getScore() {
    return snake.positions.length;//nb food eaten
};

exports.draw = function draw() {
    gameBoardView.draw();
};