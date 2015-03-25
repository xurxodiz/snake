/**
 * Created by manland on 21/03/15.
 */

import * as CONSTANTS from './entityCst';

export class Food {
    constructor(game, optPosition) {
        this.type = CONSTANTS.ENTITIES.FOOD;

        this.dx = CONSTANTS.CONFIG.FOOD.dx;
        this.dy = CONSTANTS.CONFIG.FOOD.dy;
        this.radius = CONSTANTS.CONFIG.FOOD.radius;

        this.isMovable = false;
        this.game = game;

        if(!optPosition) {
            this.move();
        } else {
            this.x = optPosition.x;
            this.y = optPosition.y;
        }

        this.width = this.height = this.radius;
    }

    destroy() {
        if(this.game !== undefined) {//already deleted
            this.game.entities.splice(this.game.entities.indexOf(this), 1);
            this.game = undefined;
        }
    }

    move() {
        var wcells = this.game.width / this.dx;
        var hcells = this.game.height / this.dy;

        var randomx = Math.floor(Math.random() * wcells);
        var randomy = Math.floor(Math.random() * hcells);

        this.x = randomx * this.dx;
        this.y = randomy * this.dy;
    }

    checkCollision() {
        return false;
    }

    draw(drawableUtil) {
        drawableUtil.circle("#FF0000", this.x+this.radius, this.y+this.radius, this.radius);
    }

}