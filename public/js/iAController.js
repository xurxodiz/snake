/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class IAController {
    constructor(snake, gameBoard) {
        this.snake = snake;
        this.gameBoard = gameBoard;
        setInterval(this.move.bind(this), 70);
    }

    move() {
        for(var e of this.gameBoard.entities) {
            if(e.type === ENTITIES.FOOD) {
                if(e.x > this.snake.x && this.checkDirection(2)) {
                    this.snake.direction = 2;
                } else if(e.x < this.snake.x && this.checkDirection(0)) {
                    this.snake.direction = 0;
                } else if(e.y > this.snake.y && this.checkDirection(3)) {
                    this.snake.direction = 3;
                } else if(e.y < this.snake.y && this.checkDirection(1)) {
                    this.snake.direction = 1;
                }
                return;
            }
        }
    }

    checkDirection(newdir) {
        return newdir != this.snake.direction && newdir != this.snake.direction+2 && newdir != this.snake.direction-2;
    }
}