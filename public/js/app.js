/**
 * Created by manland on 20/03/15.
 */
import {Game} from './game';

setTimeout(function() {
    new Game({nbFood: 1, controllers: {'KeyboardController': 0, 'IAController': 1}, snakeInitSize: 5}).run();
}, 3000);