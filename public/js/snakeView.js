/**
 * Created by manland on 21/03/15.
 */

import {Snake} from './snake';

export class SnakeView {
    constructor(options, game, drawableUtil) {
        this.entity = new Snake(options, game);
        this.drawableUtil = drawableUtil;
    }

    draw() {
        this.entity.positions.forEach((position) => {
            var {x, y} = position;
            this.drawableUtil.rect("#FFFFFF", x, y, this.entity.dx, this.entity.dy);
        });
    }
}