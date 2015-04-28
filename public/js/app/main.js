import {Rooms} from './rooms';
import {AddRoom} from './addRoom';
import {PlayerConfig} from './playerConfig';
import {ColorPicker} from './colorPicker';
import {connect as io} from 'socket.io-client';

window.onload = function() {
    let socket = io();
    new Rooms(document.getElementById('js-rooms-container'), socket);
    new AddRoom(socket);
    new PlayerConfig();
    new ColorPicker();
    socket.on('connect', () => {
        socket.emit('getRooms');
    });
};