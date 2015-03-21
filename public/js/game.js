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
            var size = lib.die();
            //alert("you are dead. size: " + size);
            console.log("you are dead. size: " + size);
        }
    }

    draw() {
        lib.screenclear();
        lib.drawsnake();
        lib.drawfood();
    }
};