/**
 * Created by manland on 22/03/15.
 */

import {Game} from './game';
import {connect as io} from 'socket.io-client';

export class NetworkRemoteGame {
    constructor(roomName) {
        let game;
        let socket = io();
        this.myId = -1;

        socket.on('connect', () => {
            socket.emit('joinRoom', roomName);
        });

        socket.on('roomNotFound', () => {
            window.alert('Room not exist !');
        });

        socket.on('roomGame', (gameOptions) => {
            gameOptions.controllers.forEach((controller) => {
                if(controller.type === 'KeyboardController') {
                    this.myId = controller.id;
                }
            });
            gameOptions.callbacks = {
                foodEatenCallback: () => {
                    socket.emit('foodEaten');
                }
            };
            console.log(gameOptions);
            game = new Game(gameOptions);
            game.draw();

            var intervalId = setInterval(() => {
                if(game.isFinish) {
                    clearInterval(intervalId);
                    socket.emit('finish');
                } else {
                    game.gameBoard.entities.forEach((e) => {
                        if (e.isDead) {
                            socket.emit('dead', {id: e.id});
                        } else {
                            socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                        }
                    });
                }
            }, 50);
        });

        socket.on('newPlayer', () => {
            console.log('New player !');
        });

        socket.on('roomFull', () => {
            window.alert('The room is full !');
        });

        socket.on('start', () => {
            game.run();
        });

        socket.on('restart', (gameOptions) => {
            console.log('restart', gameOptions);
            game.destroy();
            gameOptions.controllers.forEach((controller) => {
                if(controller.id === this.myId) {
                    controller.type = 'KeyboardController';
                } else if(controller.type === 'KeyboardController') {
                    controller.type = 'RemoteNetworkController';
                }
            });
            gameOptions.callbacks = {
                foodEatenCallback: () => {
                    socket.emit('foodEaten');
                }
            };
            game = new Game(gameOptions);
            game.draw();

            var intervalId = setInterval(() => {
                if(game.isFinish) {
                    clearInterval(intervalId);
                    socket.emit('finish');
                } else {
                    game.gameBoard.entities.forEach((e) => {
                        if (e.isDead) {
                            socket.emit('dead', {id: e.id});
                        } else {
                            socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                        }
                    });
                }
            }, 50);
        });

        socket.on('finish', () => {
            game.isFinish = true;
        });

        socket.on('addFood', (position) => {
            game.addFood(position);
        });
    }
}