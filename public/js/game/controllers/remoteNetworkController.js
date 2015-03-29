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
        this.socket.on('changedDirection', this.handleChangedDirection.bind(this));
        this.socket.on('dead', this.handleDead.bind(this));
        this.socket.on('foodEaten', this.handleFoodEaten.bind(this));
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

    handleDead(data) {
        if (data.id === this.snake.id) {
            this.snake.dead();
        }
    }

    handleFoodEaten(foodId, snakeId) {
        if (snakeId === this.snake.id) {
            this.snake.growth();
        }
        this.game.gameBoard.entities.forEach((e) => {
            if(e.id === foodId && e.type === ENTITIES.FOOD) {
                e.destroy();
            }
        });
    }

    destroy() {
        this.socket.removeListener('changedDirection');
        this.socket.removeListener('dead');
        this.socket.removeListener('foodEaten');
        this.socket = undefined;
        this.snake = undefined;
        this.game = undefined;
    }

}