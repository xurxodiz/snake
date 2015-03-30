/**
 * Created by manland on 20/03/15.
 */
import {Dj} from './dj';
import {Game} from './game';
import {Food} from './entities/food';
import {NetworkRemoteGame} from './networkRemoteGame';

window.onload = function() {
    new Dj();
    let roomName = window.location.hash.substring(1);
    if(roomName === '') {
        var game = new Game({
            nbFood: 1,
            snakeInitSize: 20,
            controllers: [
                {type: 'KeyboardController', color: '#9bdcd8', id: 1},
                {type: 'IAController', color: '#fc780b', id: 2},
                {type: 'IAController', color: '#fc780b', id: 3}
                //{type: 'IAController', color: '#fc780b', id: 4},
                //{type: 'IAController', color: '#fc780b', id: 5}
            ],
            callbacks: {
                foodEatenCallback: function () {
                    game.gameBoard.addEntity(new Food(game.gameBoard));
                },
                snakeDeadCallback: function() {
                    //TODO : what to do ?
                }
            }
        });
        game.draw();

        setTimeout(function () {
            game.run();
        }, 3000);
    } else {
        new NetworkRemoteGame(roomName);
    }
};