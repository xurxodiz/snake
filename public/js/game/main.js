/**
 * Created by manland on 20/03/15.
 */
import {Dj} from './dj';
import {Game} from './game';
import {Food} from './entities/food';
import {NetworkRemoteGame} from './networkRemoteGame';

window.onload = function() {
    new Dj();
    let roomName = window.location.hash.substring(1);
    let watchRoom = window.location.search.substring(1) === 'w';
    if(roomName === '') {
        window.location = 'index.html';
    } else {
        new NetworkRemoteGame(roomName, watchRoom);
    }
};