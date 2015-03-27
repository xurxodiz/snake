import {Rooms} from './rooms';
import {AddRoom} from './addRoom';
import {PlayerConfig} from './playerConfig';

window.onload = function() {
    new Rooms(document.getElementById('js-rooms-container'));
    new AddRoom();
    new PlayerConfig();
};