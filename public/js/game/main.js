/**
 * Created by manland on 20/03/15.
 */
import {Dj} from './dj';
import {Game} from './game';
import {Food} from './entities/food';
import {NetworkRemoteGame} from './networkRemoteGame';
import {DomUtil} from './domUtil';

window.onload = function() {
    new Dj();
    let roomName = window.location.hash.substring(1);
    let watchRoom = window.location.search.substring(1) === 'w';
    if(roomName === '') {
        window.location = 'index.html';
    } else {
        new NetworkRemoteGame(roomName, watchRoom);
        if(watchRoom === false) {
            DomUtil.onTabVisibilityChange((evt) => {
                console.log(evt);
                if(evt.visible === false) {
                    //when user change tab, we put it in watcher
                    window.location = 'game.html?w#'+roomName;
                }
            });
        }
    }
};