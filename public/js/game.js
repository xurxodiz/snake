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



        for(var controller in controllers) {
            for(let i=0; i<controllers[controller].nb; i++) {
                let color = controllers[controller].color;
                let snakeView = new SnakeView({snakeInitSize, color}, this.gameBoardView.entity, drawableUtil);
                this.gameBoardView.addDrawableEntity(snakeView);
                if (controller === 'KeyboardController') {
                    new KeyboardController(snakeView.entity);
                } else if (controller === 'IAController') {
                    new IAController(snakeView.entity, this.gameBoardView.entity);
                } else {
                    throw new Error('Unknown controller', controller);
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