export class KeyboardController {
    constructor(snake) {
        this.snake = snake;
        document.onkeypress = this.onKeyDown.bind(this);
        document.onkeydown = this.onKeyDown.bind(this);
    }

    onKeyDown (evt) {
        if(evt.target === document.body) {
            var newdir = evt.keyCode - 37;

            // only lateral turns are allowed
            // (that is, no u-turns)
            if (newdir != this.snake.direction && newdir != this.snake.direction + 2 && newdir != this.snake.direction - 2) {
                this.snake.changeDirection(newdir);
            }
        }
    };

    destroy() {
        document.onkeypress = undefined;
        document.onkeydown = undefined;
        this.snake = undefined;
    }
};