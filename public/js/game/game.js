import {DrawableUtil} from './drawableUtil';
import {GameBoard} from './entities/gameBoard';
import {Food} from './entities/food';
import {CONFIG} from '../../../shared/entityCst';
import {ControllerFactory} from './controllers/controllerFactory';
import {ObjectFactory} from './entities/objectFactory';

export class Game {
    constructor(options) {
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

        for(let {type, color, id, initPosition, pseudo} of controllers) {
            this.controllers.push(ControllerFactory.build(this, type, id, pseudo, snakeInitSize, initPosition, color, isInfiniteWallSize, this.gameBoard, callbacks.snakeChangeDirectionCallback));
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
        let entities = ObjectFactory.build(this.gameBoard, properties);
        entities.forEach((e) => {
            this.gameBoard.addEntity(e);
        });
    }

    destroy() {
        this.controllers.forEach((controller) => {
            controller.destroy();
        });
        this.controllers = [];
    }

}