/**
 * Created by manland on 02/04/15.
 */

import {CONFIG} from '../../../../shared/entityCst';
import {Food} from './food';
import {Bomb} from './bomb';
import {Ice} from './ice';
import {Portal} from './portal';

export class ObjectFactory {
    static build(gameBoard, properties) {
        if(properties.type === CONFIG.OBJECT.FOOD.type) {
            return [new Food(gameBoard, properties)];
        } else if(properties.type === CONFIG.OBJECT.BOMB.type) {
            return [new Bomb(gameBoard, properties)];
        }  else if(properties.type === CONFIG.OBJECT.ICE.type) {
            return [new Ice(gameBoard, properties)];
        }  else if(properties.type === CONFIG.OBJECT.PORTAL.type) {
            let portal1 = new Portal(gameBoard, properties, 'position', 'color');
            let portal2 = new Portal(gameBoard, properties, 'position2', 'color2');
            portal1.toPortal = portal2;
            portal2.toPortal = portal1;
            return [portal1, portal2];
        } else {
            throw new Error('Unknown object type ' + properties.type);
        }
    }
}