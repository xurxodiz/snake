/**
 * Created by manland on 24/03/15.
 */

import {connect as io} from 'socket.io-client';

export class Rooms {
    constructor(htmlContainer) {
        let socket = io();
        socket.on('connect', () => {
            socket.on('rooms', (rooms) => {
                htmlContainer.innerHTML = '';
                rooms.forEach((room) => {
                    let li = document.createElement('li');
                    let linkRoom = document.createElement('a');
                    linkRoom.setAttribute('href', '/game.html#' + room.name);
                    linkRoom.innerText = room.name + ' (' + room.nbPlayersInGame + '/' + room.nbPlayers + ' players)';
                    li.appendChild(linkRoom);
                    htmlContainer.appendChild(li);
                });
            });
            socket.emit('getRooms');
        });
    }
}