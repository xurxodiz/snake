/**
 * Created by manland on 24/03/15.
 */

import {connect as io} from 'socket.io-client';

export class AddRoom {
    constructor() {
        let inputName = document.getElementById('js-add-room-name');
        let inputNbPlayers = document.getElementById('js-add-room-nb-players');
        let form = document.getElementById('js-add-room-form');
        let socket = io();
        socket.on('connect', () => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                socket.emit('addRoom', {name: inputName.value, nbPlayers: parseInt(inputNbPlayers.value)});
                inputName.value = '';
            });
        });
    }
}