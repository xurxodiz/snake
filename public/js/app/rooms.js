/**
 * Created by manland on 24/03/15.
 */

import {connect as io} from 'socket.io-client';

export class Rooms {
    constructor(htmlContainer, socket) {
        socket.on('rooms', (rooms) => {
            console.log(rooms);
            htmlContainer.innerHTML = '';
            rooms.forEach((room) => {
                let li = document.createElement('li');
                let linkRoom = document.createElement('a');
                linkRoom.setAttribute('href', '/game.html#' + room.name);

                let roomName = document.createElement('span');
                roomName.setAttribute('class', 'room-name');
                roomName.innerHTML = room.name;

                let roomPlayerNb = document.createElement('span');
                roomPlayerNb.setAttribute('class', 'room-playerNb');
                roomPlayerNb.innerHTML = room.nbPlayersInGame;

                let roomPlayerTotal = document.createElement('span');
                roomPlayerTotal.setAttribute('class', 'room-playerTotal');
                roomPlayerTotal.innerHTML = room.nbPlayers;

                linkRoom.appendChild(roomName);
                roomPlayerNb.appendChild(roomPlayerTotal);
                linkRoom.appendChild(roomPlayerNb);
                li.appendChild(linkRoom);
                htmlContainer.appendChild(li);
            });
        });
    }
}