import {DrawableUtil} from './drawableUtil';
import {GameBoardView} from './gameBoardView';
import {SnakeView} from './snakeView';
import {FoodView} from './foodView';
import {KeyboardController} from './keyboardController';
import {IAController} from './iAController';

export class Game {
    constructor(options) {
        var {nbFood, controllers, snakeInitSize} = options;

        var canvas = document.getElementById('canvas');
        var drawableUtil = new DrawableUtil(canvas.getContext("2d"));
        this.gameBoardView = new GameBoardView(canvas.clientWidth, canvas.clientHeight, drawableUtil);

        for(let {type, nb, color} of controllers) {
            for(let i=0; i<nb; i++) {
                let snakeView = new SnakeView({snakeInitSize, color}, this.gameBoardView.entity, drawableUtil);
                this.gameBoardView.addDrawableEntity(snakeView);
                if (type === 'KeyboardController') {
                    new KeyboardController(snakeView.entity);
                } else if (type === 'IAController') {
                    new IAController(snakeView.entity, this.gameBoardView.entity);
                } else {
                    throw new Error('Unknown controller', type);
                }
            }
        }

        for(let i=0; i<nbFood; i++) {
            this.gameBoardView.addDrawableEntity(new FoodView(this.gameBoardView.entity, drawableUtil));
        }
    }

    run() {
        this.intervalId = setInterval(this.step.bind(this), 60);
    }

    step() {
        this.gameBoardView.entity.move();
        if (this.gameBoardView.entity.checkCollision()) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            console.log("you are dead. size: " + this.gameBoardView.entity.score);
        }
    }

    draw() {
        let loop = () => {
            window.requestAnimationFrame(() => {
                this.gameBoardView.draw();
                loop();
            });
        };
        loop();
    }
};