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
            this.drawableUtil.tail("#FFFFFF", x, y, this.entity.dx, this.entity.dy);
        });
        var {x, y} = this.entity.positions[0];
        this.drawableUtil.bike(x, y, this.entity.direction);
    }
}