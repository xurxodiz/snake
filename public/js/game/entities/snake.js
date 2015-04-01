/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';
import {snakeUtil} from '../../../../shared/gameUtil';

export class Snake {

    constructor(options, gameBoard) {
        this.type = ENTITIES.SNAKE;
        var {id, pseudo, snakeInitSize, initPosition, color, isInfiniteWallSize, snakeChangeDirectionCallback} = options;

        this.id = id;
        this.pseudo = pseudo;
        this.dx = CONFIG.SNAKE.dx;
        this.dy = CONFIG.SNAKE.dy;
        this.direction = 0;
        this.color = color;
        this.snakeInitSize = snakeInitSize;
        this.isInfiniteWallSize = isInfiniteWallSize;
        this.snakeChangeDirectionCallback = snakeChangeDirectionCallback;
        this.isMovable = true;
        this.isDead = false;

        this.changeInitPosition(initPosition, gameBoard);
    }

    changeInitPosition(initPosition) {
        let myInitPosition;
        if(initPosition === undefined) {
            let {x, y} = snakeUtil.randomPosition();
            myInitPosition = {x, y, direction: this.direction};
        } else {
            myInitPosition = initPosition;
        }
        this.positions = [];
        for(let i=0; i<this.snakeInitSize; i++) {
            this.positions.push(myInitPosition);
        }
        //by convenience x, y of snake are his head !
        this.x = this.positions[0].x;
        this.y = this.positions[0].y;
    }

    growth() {
        this.needGrowth = true;
    }

    dead() {
        this.isDead = true;
    }

    changeDirection(newDirection) {
        if(this.direction !== newDirection) {
            this.direction = newDirection;
            this.snakeChangeDirectionCallback(this);
        }
    }

    move() {
        if(!this.isDead) {
            var {x, y} = this.positions[0]; // peek head

            // create new head relative to current head
            var n = {x: -1, y: -1, direction: this.direction};
            switch (this.direction) {
                case 0: // left
                    n.x = x - this.dx;
                    n.y = y;
                    break;
                case 1: // up
                    n.x = x;
                    n.y = y - this.dy;
                    break;
                case 2: // right
                    n.x = x + this.dx;
                    n.y = y;
                    break;
                case 3: // down
                    n.x = x;
                    n.y = y + this.dy;
                    break;
            }

            this.positions.unshift(n);
            this.x = this.positions[0].x;
            this.y = this.positions[0].y;
            if (this.needGrowth === true) {
                this.needGrowth = false;
            } else if(this.isInfiniteWallSize === false) {
                this.positions.pop();
            }
        } else if(this.positions.length > 1 && this.isInfiniteWallSize === false) {//keep head (aka 0) to draw bike
            this.positions.pop();
        }
    }

    checkCollision(otherEntity, options) {
        let {x, y} = this.positions[0]; // peek head
        if(otherEntity === this) {// are we eating ourselves?
            for (let i = 1; i < this.positions.length; i++) {
                if (this.positions[i].x == x && this.positions[i].y == y) {
                    return true;
                }
            }
        } else if(otherEntity.type === ENTITIES.SNAKE) {// are we eating other snake?
            for (let i = 0; i < otherEntity.positions.length; i++) {
                if (otherEntity.positions[i].x == x && otherEntity.positions[i].y == y) {
                    return true;
                }
            }
        } else {
            x = x + 1;
            y = y + 1;
            let inside = false;
            if(options.strict === false) {
                inside = x >= otherEntity.x && x <= otherEntity.x + otherEntity.width &&
                y >= otherEntity.y && y <= otherEntity.y + otherEntity.height;
            } else {
                inside = x > otherEntity.x && x < otherEntity.x + otherEntity.width &&
                y > otherEntity.y && y < otherEntity.y + otherEntity.height;
            }
            if(options.outside === true) {
                return !inside;
            }
            return inside;
        }

        return false;
    }

    draw(drawableUtil) {
        let position;
        for (let i = 0; i < this.positions.length; i++) {
            position = this.positions[i];
            let {x, y, direction} = position;
            if(this.positions[i-1]){
                if (direction === this.positions[i-1].direction) {
                    drawableUtil.tail(this.color, x, y, this.dx, this.dy, direction);
                }else{
                    drawableUtil.tailcurved(this.color, x, y, this.dx, this.dy, direction, this.positions[i-1].direction);
                }
            }
        }
        drawableUtil.bike(this.color, this.positions[0].x, this.positions[0].y, this.direction);
    }

}