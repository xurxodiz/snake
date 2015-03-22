/**
 * Created by manland on 22/03/15.
 */

import {Game} from './game';
import {connect as io} from 'socket.io-client';

export class NetworkRemoteGame {
    constructor() {
        let socket = io();
        let game;
        socket.emit('enterInRoom');
        socket.on('joinRoom', function (gameOptions) {
            console.log('joinRoom remote', gameOptions);
            game = new Game(gameOptions);
            game.draw();
        });

        socket.on('start', () => {
            console.log('start remote');
            game.run();
        });
    }
}