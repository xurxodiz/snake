import lib from './lib';

export class Game {

    run() {
        lib.init();
        var loop = () => {
            window.requestAnimationFrame(() => {
                this.draw();
                loop();
            });
        };
        loop();
        this.id = setInterval(this.step.bind(this), 75);
    }

    step() {
        lib.move();
        if (lib.checkCollision()) {
            if (this.id) {
                clearInterval(this.id);
            }
            console.log("you are dead. size: " + lib.getScore());
        }
    }

    draw() {
        lib.draw();
    }
};