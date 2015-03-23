/**
 * Created by manland on 21/03/15.
 */

import {GameBoard} from './gameBoard';
import {FoodView} from './foodView';

export class GameBoardView {
    constructor(width, height, callbacks, drawableUtil) {
        this.entity = new GameBoard(width, height, callbacks);
        this.drawableUtil = drawableUtil;
        this.drawableEntities = [];
    }

    addDrawableEntity(drawableEntity) {
        this.drawableEntities.push(drawableEntity);
        this.entity.addEntity(drawableEntity.entity);
    }

    draw() {
        this.drawableUtil.rect("#000000", 0, 0, this.entity.width, this.entity.height);
        this.drawableEntities.forEach((e) => e.draw());
    }
}