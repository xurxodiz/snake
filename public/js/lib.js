import {Snake} from './snake';

var ctx;
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

var snake;
var size;

var food;

var id;

exports.init = function init(game) {
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext("2d");
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

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

exports.screenclear = function screenclear() {
  ctx.fillStyle = "#000000";
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0,0,WIDTH,HEIGHT);
};

exports.drawsnake = function drawsnake() {
  ctx.fillStyle = "#FFFFFF";
  snake.positions.forEach(function(p) {
    rect(p.x, p.y, dx, dy);
  })
};

exports.drawfood = function drawfood() {
  ctx.fillStyle = "#FF0000";
  circle(food.x+food.r, food.y+food.r, food.r);
};