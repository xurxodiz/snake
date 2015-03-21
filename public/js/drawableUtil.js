/**
 * Created by manland on 21/03/15.
 */
export class DrawableUtil {
    constructor(ctx) {
        this.ctx = ctx;
    }

    rect(color, x, y, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    circle(color, x, y, radius) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }
}