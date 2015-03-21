import {Snake} from './snake';
import {DrawableSnake} from './drawableSnake';
import {DrawableUtil} from './drawableUtil';

var WIDTH;
var HEIGHT;

var dx = 10;
var dy = 10;
var dr = 5;

// 0: left
// 1: up
// 2: right
// 3: down
var direction;

var snake, drawableSnake;
var size;

var food;

var id;

var drawableUtil;

exports.init = function init(game) {
    drawableUtil = new DrawableUtil(document.getElementById('canvas').getContext("2d"));
  WIDTH = canvas.clientWidth;
  HEIGHT = canvas.clientHeight;

  createsnake();
  newfood();

  direction = 0;
  size = 1;

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
    drawableSnake = new DrawableSnake(drawableUtil, snake);
}

function newfood() {
  var wcells = WIDTH/dx;
  var hcells = HEIGHT/dy;

  var randomx = Math.floor(Math.random()*wcells);
  var randomy = Math.floor(Math.random()*hcells);

  food = {
    x: randomx * dx,
    y: randomy * dy,
    r: dr
  };
  size = size+1;
}

exports.movesnake = function movesnake() {
    return snake.move(direction, food);
};

exports.die = function die() {
    if (id) {
        clearInterval(id);
    }
    return size;
};

exports.screenclear = function screenclear() {
    drawableUtil.rect("#000000", 0, 0, WIDTH, HEIGHT);
};

exports.drawsnake = function drawsnake() {
    drawableSnake.draw();
};

exports.drawfood = function drawfood() {
    drawableUtil.circle("#FF0000", food.x+food.r, food.y+food.r, food.r);
};