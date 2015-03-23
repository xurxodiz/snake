/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class Food {
    constructor(game, optPosition) {
        this.type = ENTITIES.FOOD;

        this.dx = 10;
        this.dy = 10;
        this.dr = 5;
        this.isMovable = false;
        this.game = game;

        if(!optPosition) {
            this.move();
        } else {
            this.x = optPosition.x;
            this.y = optPosition.y;
        }

        this.r = this.dr;
        this.width = this.height = this.dr;
    }

    checkCollision() {
        return false;
    }

    move() {
        var wcells = this.game.width/this.dx;
        var hcells = this.game.height/this.dy;

        var randomx = Math.floor(Math.random()*wcells);
        var randomy = Math.floor(Math.random()*hcells);

        this.x = randomx * this.dx;
        this.y = randomy * this.dy;
    }
}