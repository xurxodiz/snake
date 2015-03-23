/**
 * Created by manland on 21/03/15.
 */

import {Food} from './food';

export class FoodView {
    constructor(game, drawableUtil, optPosition) {
        this.entity = new Food(game, optPosition);
        this.drawableUtil = drawableUtil;
    }

    draw() {
        this.drawableUtil.circle("#FF0000", this.entity.x+this.entity.r, this.entity.y+this.entity.r, this.entity.r);
    }
}