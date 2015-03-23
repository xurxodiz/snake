/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class Snake {

    constructor(options, gameBoard) {
        this.type = ENTITIES.SNAKE;
        var {id, snakeInitSize, initPosition, color} = options;

        this.id = id;
        this.dx = 10;
        this.dy = 10;
        this.direction = 0;
        this.color = color;
        this.isMovable = true;
        this.isDead = false;
        let myInitPosition;
        if(initPosition === undefined) {
            this.isLocal = true;
            let x = Math.floor(Math.random() * gameBoard.width);
            x = Math.floor((x + 5) / 10) * 10;
            let y = Math.floor(Math.random() * gameBoard.height);
            y = Math.floor((y + 5) / 10) * 10;
            myInitPosition = {x, y, direction: this.direction};
        } else {
            this.isLocal = false;
            myInitPosition = initPosition;
        }
        this.positions = [];
        for(let i=0; i<snakeInitSize; i++) {
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
            } else {
                this.positions.pop();
            }
        }
    }

    checkCollision(otherEntity, options) {
        if(otherEntity === this) {// are we eating ourselves?
            let {x, y} = this.positions[0]; // peek head
            for (let i = 1; i < this.positions.length; i++) {
                if (this.positions[i].x == x && this.positions[i].y == y) {
                    return true;
                }
            }
        } else if(otherEntity.type === ENTITIES.SNAKE) {// are we eating other snake?
            let {x, y} = this.positions[0]; // peek head
            for (let i = 0; i < otherEntity.positions.length; i++) {
                if (otherEntity.positions[i].x == x && otherEntity.positions[i].y == y) {
                    return true;
                }
            }
        } else {
            let {x, y} = this.positions[0];
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

}