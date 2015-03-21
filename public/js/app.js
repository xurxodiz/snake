/**
 * Created by manland on 20/03/15.
 */
import {Game} from './game';

setTimeout(function() {
    new Game({nbFood: 100, controller: 'KeyboardController', snakeInitSize: 50}).run();
    //new Game({nbFood: 5, controller: 'IAController', snakeInitSize: 5}).run();
}, 3000);