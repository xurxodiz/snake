/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';

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

    checkCollision() {
        return false;
    }

    draw(drawableUtil) {
        drawableUtil.circle(CONFIG.OBJECT.ICE.color, this.x+this.radius, this.y+this.radius, this.radius);
    }

}