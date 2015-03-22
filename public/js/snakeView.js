/**
 * Created by manland on 21/03/15.
 */

import {Snake} from './snake';

export class SnakeView {
    constructor(options, game, drawableUtil) {
        this.options = options;
        this.entity = new Snake(options, game);
        this.drawableUtil = drawableUtil;
    }

    draw() {
        this.entity.positions.forEach((position) => {
            let {x, y, direction} = position;
            this.drawableUtil.tail(this.options.color, x, y, this.entity.dx, this.entity.dy, direction);
        });
        let {x, y} = this.entity.positions[0];
        this.drawableUtil.bike(x, y, this.entity.direction);
    }
}