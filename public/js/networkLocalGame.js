/**
 * Created by manland on 22/03/15.
 */

import {Game} from './game';
import {connect as io} from 'socket.io-client';

export class NetworkLocalGame {
    constructor() {
        let socket = io();
        socket.on('connect', () => {
            let gameOptions = {
                nbFood: 0,
                snakeInitSize: 50,
                controllers: [
                    {type: 'KeyboardController', color: '#ff0000', id: 1},
                    {type: 'IAController', color: '#00ff00', id: 2},
                    {type: 'IAController', color: '#00ffff', id: 3},
                    //{type: 'IAController', color: '#0000ff', id: 4},
                    //{type: 'IAController', color: '#ff00ff', id: 5}
                ],
                callbacks: {
                    foodEatenCallback: function () {
                        socket.emit('foodEaten');
                    }
                }
            };
            this.game = new Game(gameOptions);
            this.game.draw();
            let toSendGameOptions = {
                nbFood: gameOptions.nbFood,
                snakeInitSize: gameOptions.snakeInitSize,
                controllers: []
            };
            this.game.gameBoard.movableEntities.forEach((e) => {
                toSendGameOptions.controllers.push({
                    id: e.id,
                    type: 'RemoteNetworkController',
                    color: e.color,
                    initPosition: {x: e.x, y: e.y, direction: e.direction}
                });
            });
            socket.emit('newRoom', toSendGameOptions);
            var intervalId = setInterval(() => {
                if(this.game.isFinish) {
                    clearInterval(intervalId);
                    socket.emit('finish');
                } else {
                    this.game.gameBoard.movableEntities.forEach((e) => {
                        if (e.isDead) {
                            socket.emit('dead', {id: e.id});
                        } else {
                            socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                        }
                    });
                }
            }, 50);
        });
        socket.on('start', () => {
            this.game.run();
        });
        socket.on('finish', () => {
            this.game.isFinish = true;
        });
        socket.on('addFood', (position) => {
            this.game.addFood(position);
        });
    }
}
