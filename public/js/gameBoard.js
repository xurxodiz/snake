/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class GameBoard {
    constructor(width, height) {
        this.type = ENTITIES.GAME_BOARD;

        this.x = this.y = 0;
        this.width = width;
        this.height = height;
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    checkCollision() {
        for(var e of this.entities) {
            var collision = e.checkCollision(this, {outside: true});
            if(collision && e.type === ENTITIES.SNAKE) {//collision between game and snake
                return e;
            }
            for(var e2 of this.entities) {
                var collision = e.checkCollision(e2, {outside: false});
                if (collision && e.type === ENTITIES.SNAKE && e2.type === ENTITIES.SNAKE) {//collision between snake and snake (himself possible)
                    return e;
                } else if(collision && e.type === ENTITIES.SNAKE && e2.type === ENTITIES.FOOD) {//collision between snake and food
                    e.growth();
                    e2.move();
                } else if(collision && e.type === ENTITIES.FOOD && e2.type === ENTITIES.SNAKE) {//collision between food and snake
                    e.move();
                    e2.growth();
                }
            }
        }
        return false;
    }
}