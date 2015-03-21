/**
 * Created by manland on 21/03/15.
 */
export class KeyboardController {
    constructor(snake) {
        this.snake = snake;
        document.onkeypress = this.onKeyDown.bind(this);
        document.onkeydown = this.onKeyDown.bind(this);
    }

    onKeyDown (evt) {
        var newdir = evt.keyCode - 37;

        // only lateral turns are allowed
        // (that is, no u-turns)
        if (newdir != this.snake.direction && newdir != this.snake.direction+2 && newdir != this.snake.direction-2) {
            this.snake.direction = newdir;
        }
    };
};

const KEYBOARD_CONTROLLER_NAME = 'KeyboardController';
export default KEYBOARD_CONTROLLER_NAME;