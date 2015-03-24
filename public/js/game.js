import {DrawableUtil} from './drawableUtil';
import {GameBoard} from './entities/gameBoard';
import {Snake} from './entities/snake';
import {Food} from './entities/food';
import {KeyboardController} from './controllers/keyboardController';
import {IAController} from './controllers/iAController';
import {RemoteNetworkController} from './controllers/remoteNetworkController';

export class Game {
    constructor(options) {
        let nbFood = options.nbFood;
        let controllers = options.controllers;
        let snakeInitSize = options.snakeInitSize;
        let callbacks = options.callbacks;

        this.isFinish = false;

        var canvas = document.getElementById('canvas');
        this.drawableUtil = new DrawableUtil(canvas.getContext("2d"));
        this.gameBoard = new GameBoard(canvas.clientWidth, canvas.clientHeight, callbacks);

        for(let {type, color, id, initPosition} of controllers) {
            let snake = new Snake({id, snakeInitSize, initPosition, color}, this.gameBoard);
            this.gameBoard.addEntity(snake);
            if (type === 'KeyboardController') {
                new KeyboardController(snake);
            } else if (type === 'IAController') {
                new IAController(snake, this.gameBoard);
            } else if(type === 'RemoteNetworkController') {
                new RemoteNetworkController(snake);
            } else {
                throw new Error('Unknown controller', type);
            }
        }

        for(let i=0; i<nbFood; i++) {
            this.gameBoard.addEntity(new Food(this.gameBoard));
        }
    }

    run() {
        this.intervalId = setInterval(this.step.bind(this), 60);
    }

    step() {
        this.gameBoard.move();
        let atLeastOneDead = this.gameBoard.checkCollision();
        if (this.isFinish || (atLeastOneDead && this.gameBoard.nbMovableEntitiesInGame() <= 1)) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.isFinish = true;
            console.log("You WIN ! size: " + this.gameBoard.score);
        }
    }

    draw() {
        var loop = () => {
            window.requestAnimationFrame(() => {
                this.gameBoard.draw(this.drawableUtil);
                loop();
            });
        };
        loop();
    }

    addFood(position) {
        this.gameBoard.addEntity(new Food(this.gameBoard, position));
    }

    dj() {
        var music = document.getElementById('musicplease')
        var musicSwitch = document.getElementById('musicSwitch')
        music.play();

        musicSwitch.addEventListener('click', function() {
            if (musicSwitch.classList.contains('icon-volume')) { 
                music.pause();
            }else{
                music.play();
            }
            musicSwitch.classList.toggle('icon-volume');
            musicSwitch.classList.toggle('icon-mute');
        }, false);
    }
};