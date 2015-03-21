import {DrawableUtil} from './drawableUtil';
import {GameBoardView} from './gameBoardView';
import {SnakeView} from './snakeView';
import {FoodView} from './foodView';
import {KeyboardController} from './keyboardController';
import {IAController} from './iAController';

export class Game {
    constructor(options) {
        var {nbFood, controller, snakeInitSize} = options;

        var canvas = document.getElementById('canvas');
        var drawableUtil = new DrawableUtil(canvas.getContext("2d"));
        this.gameBoardView = new GameBoardView(canvas.clientWidth, canvas.clientHeight, drawableUtil);

        var snakeView = new SnakeView({snakeInitSize}, this.gameBoardView.entity, drawableUtil);
        this.snake = snakeView.entity;
        this.gameBoardView.addDrawableEntity(snakeView);

        if(controller === 'KeyboardController') {
            new KeyboardController(this.snake);
        } else if(controller === 'IAController') {
            new IAController(this.snake, this.gameBoardView.entity);
        } else {
            throw new Error('Unknown controller', controller);
        }

        for(let i=0; i<nbFood; i++) {
            this.gameBoardView.addDrawableEntity(new FoodView(this.gameBoardView.entity, drawableUtil));
        }
    }

    run() {
        var loop = () => {
            window.requestAnimationFrame(() => {
                this.draw();
                loop();
            });
        };
        loop();
        this.intervalId = setInterval(this.step.bind(this), 60);
    }

    step() {
        this.snake.move();
        if (this.gameBoardView.entity.checkCollision()) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            console.log("you are dead. size: " + this.snake.positions.length);
        }
    }

    draw() {
        this.gameBoardView.draw();
    }
};