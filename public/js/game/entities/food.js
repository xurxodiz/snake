/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';

export class Food {
    constructor(game, optProperties) {
        this.type = ENTITIES.OBJECT;

        this.dx = CONFIG.OBJECT.FOOD.dx;
        this.dy = CONFIG.OBJECT.FOOD.dy;
        this.radius = CONFIG.OBJECT.FOOD.radius;

        this.isMovable = false;
        this.game = game;

        this.id = optProperties.id;
        this.subtype = CONFIG.OBJECT.FOOD.type;
        this.x = optProperties.position.x;
        this.y = optProperties.position.y;

        this.width = this.height = this.radius;
    }

    destroy() {
        if(this.game !== undefined) {//already deleted
            this.game.entities.splice(this.game.entities.indexOf(this), 1);
            this.game = undefined;
        }
    }

    //collision is check by snake
    checkCollision() {
        return false;
    }

    collision(snake) {
        snake.growth();
    }

    draw(drawableUtil) {
        drawableUtil.circle(CONFIG.OBJECT.FOOD.color, this.x+this.radius, this.y+this.radius, this.radius);
    }

}