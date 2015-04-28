/**
 * Created by manland on 22/03/15.
 */

import {connect as io} from 'socket.io-client';
import {ENTITIES} from '../../../../shared/entityCst';

export class RemoteNetworkController {

    constructor(snake, game) {
        this.snake = snake;
        this.game = game;
        this.socket = io();
        this.handlers = [];
        this.handlers.push({evt: 'changedDirection', fn: this.handleChangedDirection.bind(this)});
        this.handlers.push({evt: 'dead', fn: this.handleDead.bind(this)});
        this.handlers.push({evt: 'objectEaten', fn: this.handleObjectEaten.bind(this)});
        this.handlers.forEach((h) => this.socket.on(h.evt, h.fn));
    }

    handleChangedDirection(data) {
        if(data.id === this.snake.id) {
            if(this.game.isStarted === false) {
                this.snake.changeInitPosition(data);
            } else {
                this.snake.direction = data.direction;
                this.snake.positions[0].x = data.x;
                this.snake.positions[0].y = data.y;
            }
        }
    }

    handleDead(playerId) {
        if (playerId === this.snake.id) {
            this.snake.dead();
        }
    }

    handleObjectEaten(data) {
        let {objectId, type, playerId} = data;
        this.game.gameBoard.entities.forEach((e) => {
            if(e.id === objectId && e.subtype === type) {
                if (playerId === this.snake.id) {
                    e.collision(this.snake);
                }
                e.destroy();
            }
        });
    }

    destroy() {
        this.handlers.forEach((h) => this.socket.removeListener(h.evt, h.fn));
        this.handlers = [];
        this.socket = undefined;
        this.snake = undefined;
        this.game = undefined;
    }

}