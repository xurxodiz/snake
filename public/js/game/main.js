/**
 * Created by manland on 20/03/15.
 */
import {Dj} from './dj';
import {NetworkRemoteGame} from './networkRemoteGame';
import {DomUtil} from './domUtil';
import {HelpRoom} from './helpRoom';
import {HelpView} from './helpView';

window.onload = function() {
    new Dj();
    let roomName = window.location.hash.substring(1);
    if(roomName === '') {
        window.location = 'index.html';
    } else if(roomName === 'h' && window.location.search.substring(1) === 'h') {
        HelpRoom.build();
    } else {
        new HelpView();
        let watchRoom = window.location.search.substring(1) === 'w';
        new NetworkRemoteGame(roomName, watchRoom);
        if(watchRoom === false) {
            DomUtil.onTabVisibilityChange((evt) => {
                if(evt.visible === false) {
                    //when user change tab, we put it in watcher
                    window.location = 'game.html?w#'+roomName;
                }
            });
        }
    }
};