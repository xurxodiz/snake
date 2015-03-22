/**
 * Created by manland on 20/03/15.
 */
import {Game} from './game';

window.onload = function() {
    let game = new Game({
        nbFood: 3,
        controllers: {
            'KeyboardController': {nb: 1, color: '#ff0000'},
            'IAController': {nb: 2, color: '#00ff00'}
        },
        snakeInitSize: 50
    });
    game.draw();

    setTimeout(function () {
        game.run();
    }, 3000);
};