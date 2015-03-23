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
        
        let position;
        for (let i = 0; i < this.entity.positions.length; i++) {
            position = this.entity.positions[i];
            let {x, y, direction} = position;
            if(this.entity.positions[i-1]){
                if (direction === this.entity.positions[i-1].direction) {
                    this.drawableUtil.tail(this.options.color, x, y, this.entity.dx, this.entity.dy, direction);
                }else{
                    this.drawableUtil.tailcurved(this.options.color, x, y, this.entity.dx, this.entity.dy, direction, this.entity.positions[i-1].direction);
                }
            }
        };

        let {x, y} = this.entity.positions[0];
        this.drawableUtil.bike(x, y, this.entity.direction);
    }
}