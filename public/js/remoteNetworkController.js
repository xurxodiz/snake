/**
 * Created by manland on 22/03/15.
 */

import {connect as io} from 'socket.io-client';

export class RemoteNetworkController {

    constructor(snake) {
        console.log('NEW REMOTE NETWORK CONTROLLER');
        let socket = io();
        socket.on('changedDirection', (data) => {
            if(data.id === snake.id) {
                snake.direction = data.direction;
            }
        });
    }

}