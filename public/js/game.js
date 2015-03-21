import lib from './lib';

export class Game {

    gamerun() {
        lib.init(this);
        var loop = () => {
            window.requestAnimationFrame(() => {
                this.draw();
                loop();
            });
        };
        loop();
    }

    step() {
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