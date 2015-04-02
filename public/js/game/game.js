import {DrawableUtil} from './drawableUtil';
import {GameBoard} from './entities/gameBoard';
import {Food} from './entities/food';
import {CONFIG} from '../../../shared/entityCst';
import {ControllerFactory} from './controllers/controllerFactory';
import {ObjectFactory} from './entities/objectFactory';

export class Game {
    constructor(options) {
        let nbFood = options.nbFood;
        let controllers = options.controllers;
        let snakeInitSize = options.snakeInitSize;
        let isInfiniteWallSize = options.infiniteWallSize;
        let callbacks = options.callbacks;
        this.gameFinishCallback = callbacks.gameFinishCallback;

        this.isStarted = false;
        this.isFinish = false;
        this.controllers = [];

        var canvas = document.getElementById('canvas');
        canvas.setAttribute('width', CONFIG.GAME_BOARD.width);
        canvas.setAttribute('height', CONFIG.GAME_BOARD.height);
        this.drawableUtil = new DrawableUtil(canvas.getContext("2d"));
        this.gameBoard = new GameBoard(callbacks);
        this.objectFactory = new ObjectFactory(this.gameBoard);

        let factory = new ControllerFactory();
        for(let {type, color, id, initPosition, pseudo} of controllers) {
            this.controllers.push(factory.build(this, type, id, pseudo, snakeInitSize, initPosition, color, isInfiniteWallSize, this.gameBoard, callbacks.snakeChangeDirectionCallback));
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
        this.gameBoard.checkCollision();
        if (this.isFinish || this.gameBoard.nbMovableEntitiesInGame() <= 1) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = undefined;
                this.isStarted = false;
            }
            this.isFinish = true;
            this.gameFinishCallback();
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

    addObject(properties) {
        this.gameBoard.addEntity(this.objectFactory.build(properties));
    }

    destroy() {
        this.controllers.forEach((controller) => {
            controller.destroy();
        });
        this.controllers = [];
    }

}