/**
 * Created by manland on 02/04/15.
 */

import {CONFIG} from '../../../../shared/entityCst';
import {Food} from './food';
import {Bomb} from './bomb';
import {Ice} from './ice';

export class ObjectFactory {
    static build(gameBoard, properties) {
        if(properties.type === CONFIG.OBJECT.FOOD.type) {
            return new Food(gameBoard, properties);
        } else if(properties.type === CONFIG.OBJECT.BOMB.type) {
            return new Bomb(gameBoard, properties);
        }  else if(properties.type === CONFIG.OBJECT.ICE.type) {
            return new Ice(gameBoard, properties);
        } else {
            throw new Error('Unknown object type ' + properties.type);
        }
    }
}