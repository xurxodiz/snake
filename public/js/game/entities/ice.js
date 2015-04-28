/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';
import {MathUtil} from '../../../../shared/mathUtil';

export class Ice {
    constructor(game, optProperties) {
        this.type = ENTITIES.OBJECT;

        this.dx = CONFIG.OBJECT.ICE.dx;
        this.dy = CONFIG.OBJECT.ICE.dy;
        this.radius = CONFIG.OBJECT.ICE.radius;

        this.isMovable = false;
        this.game = game;

        this.id = optProperties.id;
        this.subtype = CONFIG.OBJECT.ICE.type;
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
        snake.x += MathUtil.randomInt(1, 10);
        snake.y += MathUtil.randomInt(1, 10);
        let newdir = MathUtil.randomInt(0, 3);
        // only lateral turns are allowed
        // (that is, no u-turns)
        if (newdir != snake.direction && newdir != snake.direction + 2 && newdir != snake.direction - 2) {
            snake.changeDirection(newdir);
        }
    }

    draw(drawableUtil) {
        drawableUtil.ice(this.x + this.radius, this.y + this.radius);
    }

}