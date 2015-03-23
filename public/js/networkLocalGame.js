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
                nbFood: 1,
                snakeInitSize: 50,
                controllers: [
                    {type: 'KeyboardController', color: '#ff0000', id: 1},
                    {type: 'IAController', color: '#00ff00', id: 2}
                    //{type: 'IAController', color: '#00ffff', id: 3},
                    //{type: 'IAController', color: '#0000ff', id: 4},
                    //{type: 'IAController', color: '#ff00ff', id: 5}
                ]
            };
            this.game = new Game(gameOptions);
            this.game.draw();
            let toSendGameOptions = {
                nbFood: 1,
                snakeInitSize: 50,
                controllers: []
            };
            this.game.gameBoardView.entity.movableEntities.forEach((e) => {
                toSendGameOptions.controllers.push({
                    id: e.id,
                    type: 'RemoteNetworkController',
                    color: e.color,
                    initPosition: {x: e.x, y: e.y, direction: e.direction}
                });
            });
            socket.emit('newRoom', toSendGameOptions);
            setInterval(() => {
                this.game.gameBoardView.entity.movableEntities.forEach((e) => {
                    if(e.isDead) {
                        socket.emit('dead', {id: e.id});
                    } else {
                        socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                    }
                });
            }, 50);
        });
        socket.on('start', () => {
            console.log('start local');
            this.game.run();
        });
    }
}
