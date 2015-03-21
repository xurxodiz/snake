/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class Snake {

    constructor(options, gameBoard) {
        this.type = ENTITIES.SNAKE;
        var {snakeInitSize} = options;

        this.dx = 10;
        this.dy = 10;
        this.direction = 0;
        this.isMovable = true;
        let initPosition = {x: Math.floor(Math.random() * gameBoard.width), y: Math.floor(Math.random() * gameBoard.height)};
        this.positions = [];
        for(let i=0; i<snakeInitSize; i++) {
            this.positions.push(initPosition);
        }
        //by convenience x, y of snake are his head !
        this.x = this.positions[0].x;
        this.y = this.positions[0].y;
    }

    growth() {
        this.needGrowth = true;
    }

    move() {
        var {x, y} = this.positions[0]; // peek head

        // create new head relative to current head
        var n = {x: -1, y: -1};
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
        if(this.needGrowth === true) {
            this.needGrowth = false;
        } else {
            this.positions.pop();
        }
    }

    checkCollision(otherEntity, options) {
        if(otherEntity === this) {// are we eating ourselves?
            var {x, y} = this.positions[0]; // peek head
            for (var i = 1; i < this.positions.length; i++) {
                if (this.positions[i].x == x && this.positions[i].y == y) {
                    return true;
                }
            }
        } else {
            var {x, y} = this.positions[0];
            var inside = false;
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

}