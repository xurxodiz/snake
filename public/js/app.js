/**
 * Created by manland on 20/03/15.
 */
import {Game} from './game';

setTimeout(function() {
    new Game({nbFood: 1, controllers: {'KeyboardController': {nb: 1, color: '#ff0000'}, 'IAController': {nb: 1, color: '#00ff00'}}, snakeInitSize: 5}).run();
}, 3000);