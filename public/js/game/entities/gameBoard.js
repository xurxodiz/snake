/**
 * Created by manland on 21/03/15.
 */

import {CONFIG, ENTITIES} from '../../../../shared/entityCst';

export class GameBoard {
    constructor(callbacks) {
        this.type = ENTITIES.GAME_BOARD;
        this.foodEatenCallback = callbacks.foodEatenCallback;
        this.snakeDeadCallback = callbacks.snakeDeadCallback;

        this.x = this.y = 0;
        this.width = CONFIG.GAME_BOARD.width;
        this.height = CONFIG.GAME_BOARD.height;
        this.entities = [];
        this.movableEntities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
        if(entity.isMovable === true) {
            this.movableEntities.push(entity);
        }
    }

    move() {
        this.movableEntities.forEach((e) => e.move());
    }

    checkCollision() {
        let atLeastOneDead = false;
        let toDelete = [];
        for(let e of this.entities) {
            if(!e.isDead && e.isLocal) {
                let collision = e.checkCollision(this, {outside: true, strict: true});
                if (collision && e.type === ENTITIES.SNAKE) {//collision between game and snake
                    console.warn('collision with game');
                    e.dead();
                    this.snakeDeadCallback(e);
                    atLeastOneDead = true;
                }
                for (let e2 of this.entities) {
                    collision = e.checkCollision(e2, {outside: false, strict: false});
                    if (collision && e.type === ENTITIES.SNAKE && e2.type === ENTITIES.SNAKE) {//collision between snake and snake (himself possible)
                        console.warn('collision with himself');
                        e.dead();
                        this.snakeDeadCallback(e);
                        atLeastOneDead = true;
                    } else if (collision && e.type === ENTITIES.SNAKE && e2.type === ENTITIES.FOOD) {//collision between snake and food
                        e.growth();
                        this.foodEatenCallback(e2, e);
                        toDelete.push(e2);

                    } else if (collision && e.type === ENTITIES.FOOD && e2.type === ENTITIES.SNAKE) {//collision between food and snake
                        this.foodEatenCallback(e, e2);
                        toDelete.push(e);
                        e2.growth();
                    }
                }
            }
        }
        toDelete.forEach((e) => {
            e.destroy();
        });
        return atLeastOneDead;
    }

    nbMovableEntitiesInGame() {
        let nb = 0;
        for(let e of this.movableEntities) {
            if(!e.isDead) {
                nb++;
            }
        }
        return nb;
    }

    draw(drawableUtil) {
        drawableUtil.grid(0, 0, this.width, this.height);
        this.entities.forEach((e) => e.draw(drawableUtil));
    }
}