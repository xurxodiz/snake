/**
 * Created by manland on 22/03/15.
 */

import {connect as io} from 'socket.io-client';

export class RemoteNetworkController {

    constructor(snake) {
        console.log('NEW REMOTE NETWORK CONTROLLER');
        this.snake = snake;
        this.socket = io();
        this.socket.on('changedDirection', this.handleChangedDirection.bind(this));
        this.socket.on('dead', this.handleDead.bind(this));
    }

    handleChangedDirection(data) {
        if(data.id === this.snake.id) {
            this.snake.direction = data.direction;
            this.snake.positions[0].x = data.x;
            this.snake.positions[0].y = data.y;
        }
    }

    handleDead(data) {
        if (data.id === this.snake.id) {
            this.snake.dead();
        }
    }

    destroy() {
        this.socket.removeListener('changedDirection', this.handleChangedDirection);
        this.socket.removeListener('dead', this.handleDead);
        this.socket = undefined;
        this.snake = undefined;
    }

}