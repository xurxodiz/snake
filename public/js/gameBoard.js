/**
 * Created by manland on 21/03/15.
 */

import ENTITIES from './entityCst';

export class GameBoard {
    constructor(width, height) {
        this.type = ENTITIES.GAME_BOARD;

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
        for(let e of this.entities) {
            if(e.isLocal === true && !e.isDead) {
                let collision = e.checkCollision(this, {outside: true, strict: true});
                if (collision && e.type === ENTITIES.SNAKE) {//collision between game and snake
                    console.warn('collision with game');
                    e.dead();
                    atLeastOneDead = true;
                }
                for (let e2 of this.entities) {
                    let collision = e.checkCollision(e2, {outside: false, strict: false});
                    if (collision && e.type === ENTITIES.SNAKE && e2.type === ENTITIES.SNAKE) {//collision between snake and snake (himself possible)
                        console.warn('collision with himself');
                        e.dead();
                        atLeastOneDead = true;
                    } else if (collision && e.type === ENTITIES.SNAKE && e2.type === ENTITIES.FOOD) {//collision between snake and food
                        this.score = this.score + 1;
                        e.growth();
                        e2.move();
                    } else if (collision && e.type === ENTITIES.FOOD && e2.type === ENTITIES.SNAKE) {//collision between food and snake
                        this.score = this.score + 1;
                        e.move();
                        e2.growth();
                    }
                }
            }
        }
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
}