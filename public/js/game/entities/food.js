/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';
import {foodUtil} from '../../../../shared/gameUtil';

export class Food {
    constructor(game, optProperties) {
        this.type = ENTITIES.FOOD;

        this.dx = CONFIG.FOOD.dx;
        this.dy = CONFIG.FOOD.dy;
        this.radius = CONFIG.FOOD.radius;

        this.isMovable = false;
        this.game = game;

        if(!optProperties || !optProperties.position) {
            this.move();
        } else {
            this.id = optProperties.id;
            this.x = optProperties.position.x;
            this.y = optProperties.position.y;
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