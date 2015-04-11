/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';

export class Portal {
    constructor(game, optProperties, positionPropName) {
        //this.toPortal setted by factory

        this.type = ENTITIES.OBJECT;

        this.dx = CONFIG.OBJECT.PORTAL.dx;
        this.dy = CONFIG.OBJECT.PORTAL.dy;
        this.radius = CONFIG.OBJECT.PORTAL.radius;

        this.isMovable = false;
        this.game = game;

        this.id = optProperties.id;
        this.subtype = CONFIG.OBJECT.PORTAL.type;
        this.x = optProperties[positionPropName].x;
        this.y = optProperties[positionPropName].y;

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
        snake.positions[0] = {x: this.toPortal.x, y: this.toPortal.y};
        this.toPortal.destroy();
    }

    draw(drawableUtil) {
        drawableUtil.circle(CONFIG.OBJECT.PORTAL.color, this.x+this.radius, this.y+this.radius, this.radius);
    }

}