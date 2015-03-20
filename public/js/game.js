import lib from './lib';

export class Game {

    gamerun() {
        lib.init(this);
    }

    step() {
        this.update();
        this.draw();
    }

    update() {
        if (!lib.movesnake()) {
            alert("you are dead. size: " + lib.size);
            lib.die();
        }
    }

    draw() {
        lib.screenclear();
        lib.drawsnake();
        lib.drawfood();
    }
};