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
                var nextDirection = this.snake.direction;
                if(e.x > this.snake.x && this.checkDirection(2)) {
                    nextDirection = 2;
                } else if(e.x < this.snake.x && this.checkDirection(0)) {
                    nextDirection = 0;
                } else if(e.y > this.snake.y && this.checkDirection(3)) {
                    nextDirection = 3;
                } else if(e.y < this.snake.y && this.checkDirection(1)) {
                    nextDirection = 1;
                } else if(e.x === this.snake.x && (!this.checkDirection(2) || !this.checkDirection(0))) {//TODO : not working, food are probably behind me but i can't return me
                    nextDirection = 1;
                } else if(e.x !== this.snake.x && (!this.checkDirection(3) || !this.checkDirection(1))) {//TODO : not working, food are probably behind me but i can't return me
                    nextDirection = 0;
                } else if(this.snake.x === 0 || this.snake.x === this.gamaBoard.width) {
                    nextDirection = 1;
                } else if(this.snake.y === 0 || this.snake.y === this.gamaBoard.height) {
                    nextDirection = 0;
                }
                this.snake.direction = nextDirection;
                return;
            }
        }
    }

    checkDirection(newdir) {
        return newdir != this.snake.direction+2 && newdir != this.snake.direction-2;
    }
}