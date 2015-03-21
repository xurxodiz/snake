/**
 * Created by manland on 21/03/15.
 */
export class DrawableSnake {
    constructor(drawableUtil, snake) {
        this.drawableUtil = drawableUtil;
        this.snake = snake;
    }

    draw() {
        this.snake.positions.forEach((position) => {
            var {x, y} = position;
            this.drawableUtil.rect("#FFFFFF", x, y, this.snake.dx, this.snake.dy);
        });
    }
}