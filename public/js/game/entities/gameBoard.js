/**
 * Created by manland on 21/03/15.
 */

import * as CONSTANTS from './entityCst';

export class GameBoard {
    constructor(width, height, callbacks) {
        this.type = CONSTANTS.ENTITIES.GAME_BOARD;
        this.foodEatenCallback = callbacks.foodEatenCallback;
        this.snakeDeadCallback = callbacks.snakeDeadCallback;

        this.x = this.y = 0;
        this.score = 0;
        this.width = width;
        this.height = height;
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
                if (collision && e.type === CONSTANTS.ENTITIES.SNAKE) {//collision between game and snake
                    console.warn('collision with game');
                    e.dead();
                    this.snakeDeadCallback(e);
                    atLeastOneDead = true;
                }
                for (let e2 of this.entities) {
                    collision = e.checkCollision(e2, {outside: false, strict: false});
                    if (collision && e.type === CONSTANTS.ENTITIES.SNAKE && e2.type === CONSTANTS.ENTITIES.SNAKE) {//collision between snake and snake (himself possible)
                        console.warn('collision with himself');
                        e.dead();
                        this.snakeDeadCallback(e);
                        atLeastOneDead = true;
                    } else if (collision && e.type === CONSTANTS.ENTITIES.SNAKE && e2.type === CONSTANTS.ENTITIES.FOOD) {//collision between snake and food
                        this.score = this.score + 1;
                        e.growth();
                        this.foodEatenCallback(e2, e);
                        toDelete.push(e2);

                    } else if (collision && e.type === CONSTANTS.ENTITIES.FOOD && e2.type === CONSTANTS.ENTITIES.SNAKE) {//collision between food and snake
                        this.score = this.score + 1;
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
        drawableUtil.rect("#000000", 0, 0, this.width, this.height);
        this.entities.forEach((e) => e.draw(drawableUtil));
    }
}