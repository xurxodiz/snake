/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class Snake {

    constructor(game) {
        this.type = ENTITIES.SNAKE;

        this.dx = 10;
        this.dy = 10;
        this.positions = [{x: game.width / 2, y: game.height / 2}];
    }

    growth() {
        this.needGrowth = true;
    }

    move(direction) {
        var {x, y} = this.positions[0]; // peek head

        // create new head relative to current head
        var n = {x: -1, y: -1};
        switch (direction) {
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
            var inside = x >= otherEntity.x && x <= otherEntity.x + otherEntity.width &&
                    y >= otherEntity.y && y <= otherEntity.y + otherEntity.height;
            if(options.outside === true) {
                return !inside;
            }
            return inside;
        }

        return false;
    }

}