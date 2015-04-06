/**
 * Created by manland on 29/03/15.
 */

import {Snake} from '../entities/snake';
import {KeyboardController} from '../controllers/keyboardController';
import {IAController} from '../controllers/iAController';
import {RemoteNetworkController} from '../controllers/remoteNetworkController';

export class ControllerFactory {
    static build(game, type, id, pseudo, snakeInitSize, initPosition, color, isInfiniteWallSize, gameBoard, snakeChangeDirectionCallback) {
        let snake = new Snake({id, pseudo, snakeInitSize, initPosition, color, isInfiniteWallSize, snakeChangeDirectionCallback}, gameBoard);
        gameBoard.addEntity(snake);
        if (type === 'KeyboardController') {
            snake.isLocal = true;
            return new KeyboardController(snake);
        } else if (type === 'IAController') {
            snake.isLocal = true;
            return new IAController(snake, gameBoard);
        } else if(type === 'RemoteNetworkController') {
            snake.isLocal = false;
            return new RemoteNetworkController(snake, game);
        } else {
            throw new Error('Unknown controller', type);
        }
    }
}