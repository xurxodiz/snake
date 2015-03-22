/**
 * Created by manland on 20/03/15.
 */
import {Game} from './game';

window.onload = function() {
    let game = new Game({
        nbFood: 1,
        controllers: [
            {type: 'KeyboardController', nb: 0, color: '#ff0000'},
            {type: 'IAController', nb: 1, color: '#00ff00'},
            {type: 'IAController', nb: 1, color: '#00ffff'},
            {type: 'IAController', nb: 1, color: '#0000ff'},
            {type: 'IAController', nb: 1, color: '#ff00ff'}
        ],
        snakeInitSize: 5
    });
    game.draw();
    game.dj();

    setTimeout(function () {
        game.run();
    }, 3000);
};