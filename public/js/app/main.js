import {Rooms} from './rooms';
import {AddRoom} from './addRoom';

window.onload = function() {
    new Rooms(document.getElementById('js-rooms-container'));
    new AddRoom();
};