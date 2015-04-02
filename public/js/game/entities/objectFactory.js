/**
 * Created by manland on 02/04/15.
 */

import {CONFIG} from '../../../../shared/entityCst';
import {Food} from './food';
import {Bomb} from './bomb';

export class ObjectFactory {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    build(properties) {
        if(properties.type === CONFIG.OBJECT.FOOD.type) {
            return new Food(this.gameBoard, properties);
        } else if(properties.type === CONFIG.OBJECT.BOMB.type) {
            return new Bomb(this.gameBoard, properties);
        } else {
            throw new Error('Unknown object type ' + properties.type);
        }
    }
}