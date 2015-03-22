/**
 * Created by manland on 20/03/15.
 */
import {Game} from './game';
import {NetworkLocalGame} from './networkLocalGame';
import {NetworkRemoteGame} from './networkRemoteGame';

window.onload = function() {
    let hash = window.location.hash.substring(1);
    if(hash === 'local') {
        new NetworkLocalGame();
    } else if(hash === 'remote') {
        new NetworkRemoteGame();
    } else {
        let game = new Game({
            nbFood: 1,
            snakeInitSize: 10,
            controllers: [
                //{type: 'KeyboardController', color: '#ff0000', id: 1},
                {type: 'IAController', color: '#00ff00', id: 2},
                {type: 'IAController', color: '#00ffff', id: 3},
                {type: 'IAController', color: '#0000ff', id: 4},
                {type: 'IAController', color: '#ff00ff', id: 5}
            ]
        });
        game.draw();
        game.dj();

        setTimeout(function () {
            game.run();
        }, 3000);
    }
};