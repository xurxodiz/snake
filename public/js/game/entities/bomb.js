/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';

export class Bomb {
    constructor(game, optProperties) {
        this.type = ENTITIES.OBJECT;

        this.dx = CONFIG.OBJECT.BOMB.dx;
        this.dy = CONFIG.OBJECT.BOMB.dy;
        this.radius = CONFIG.OBJECT.BOMB.radius;

        this.isMovable = false;
        this.game = game;

        this.id = optProperties.id;
        this.subtype = CONFIG.OBJECT.BOMB.type;
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
        drawableUtil.circle(CONFIG.OBJECT.BOMB.color, this.x+this.radius, this.y+this.radius, this.radius);
    }

}/**
 * Created by manland on 02/04/15.
 */
