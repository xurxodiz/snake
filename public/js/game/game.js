import {DrawableUtil} from './drawableUtil';
import {GameBoard} from './entities/gameBoard';
import {Food} from './entities/food';
import {CONFIG} from '../../../shared/entityCst';
import {ControllerFactory} from './controllers/controllerFactory';

export class Game {
    constructor(options) {
        let nbFood = options.nbFood;
        let controllers = options.controllers;
        let snakeInitSize = options.snakeInitSize;
        let isInfiniteWallSize = options.infiniteWallSize;
        let callbacks = options.callbacks;

        this.isStarted = false;
        this.isFinish = false;
        this.controllers = [];

        var canvas = document.getElementById('canvas');
        canvas.setAttribute('width', CONFIG.GAME_BOARD.width);
        canvas.setAttribute('height', CONFIG.GAME_BOARD.height);
        this.drawableUtil = new DrawableUtil(canvas.getContext("2d"));
        this.gameBoard = new GameBoard(callbacks);

        let factory = new ControllerFactory();
        for(let {type, color, id, initPosition} of controllers) {
            this.controllers.push(factory.build(type, id, snakeInitSize, initPosition, color, isInfiniteWallSize, this.gameBoard));
        }

        for(let i=0; i<nbFood; i++) {
            this.gameBoard.addEntity(new Food(this.gameBoard));
        }
    }

    run() {
        this.isStarted = true;
        if(this.intervalId === undefined) {
            this.intervalId = setInterval(this.step.bind(this), 60);
        }
    }

    step() {
        this.gameBoard.move();
        let atLeastOneDead = this.gameBoard.checkCollision();
        if (this.isFinish || (atLeastOneDead && this.gameBoard.nbMovableEntitiesInGame() <= 1)) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = undefined;
                this.isStarted = false;
            }
            this.isFinish = true;
        }
    }

    draw() {
        var loop = () => {
            window.requestAnimationFrame(() => {
                this.gameBoard.draw(this.drawableUtil);
                if(this.isFinish === false) {
                    loop();
                }
            });
        };
        loop();
    }

    addFood(optProperties) {
        this.gameBoard.addEntity(new Food(this.gameBoard, optProperties));
    }

    destroy() {
        this.controllers.forEach((controller) => {
            controller.destroy();
        });
    }

}