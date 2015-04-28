import {CONFIG as objectConfig} from '../../../shared/entityCst';

export class ConsoleView {
    constructor(socket, getPlayerById) {
        this.htmlElement = document.getElementById('js-console-view');
        this.inputHtmlElement = document.getElementById('js-console-input');
        this.inputHtmlElement.addEventListener('keypress', (evt) => {
            var key = evt.which || evt.keyCode;
            if (key == 13) { // 13 == enter
                this.sendText(socket);
            }
        });
        let submitInputHtmlElement = document.getElementById('js-console-submit-input');
        submitInputHtmlElement.addEventListener('click', () => {
            this.sendText(socket);
        });

        socket.on('objectEaten', (data) => {
            let player = getPlayerById(data.playerId) || {pseudo: data.playerId, color: undefined};
            //this.appendText(player.pseudo + ' eat a ' + data.type, player.color);
            if (data.type === objectConfig.OBJECT.ICE.type) {
                this.appendText(player.pseudo + ' slipped on Ice', player.color);
            } else if (data.type === objectConfig.OBJECT.BOMB.type) {
                this.appendText(player.pseudo + ' walked on a Mine (-1)', player.color);   
            } else if (data.type === objectConfig.OBJECT.PORTAL.type) {
                this.appendText(player.pseudo + ' went through a Portal', player.color);
            } else {
                this.appendText(player.pseudo + ' got some Energy (+1)', player.color);   
            }
        });
        socket.on('dead', (playerId, optAgainstPlayerId) => {
            let player = getPlayerById(playerId) || {pseudo: playerId, color: undefined};
            if(optAgainstPlayerId === undefined || optAgainstPlayerId === null) {
                this.appendText(player.pseudo + ' died (-1)', player.color);
            } else if(playerId === optAgainstPlayerId) {
                this.appendText(player.pseudo + ' killed himself (-1)', player.color);
            } else {
                let playerAgainst = getPlayerById(optAgainstPlayerId) || {pseudo: optAgainstPlayerId, color: undefined};
                this.appendText(playerAgainst.pseudo + ' killed ' + player.pseudo + ' (+1)', playerAgainst.color);
            }
        });
        socket.on('newPlayer', (player) => {
            this.appendText(player.pseudo + ' joined game as player!', player.color);
        });
        socket.on('newWatcher', (playerConfig) => {
            this.appendText(playerConfig.pseudo + ' joined game as watcher!', playerConfig.color);
        });
        socket.on('message', (message) => {
            let {playerId, text} = message;
            let player = getPlayerById(playerId) || {pseudo: playerId, color: undefined};
            this.appendText(player.pseudo + ' : ' + text, player.color);
        });
    }

    sendText(socket) {
        let text = this.inputHtmlElement.value;
        if(text !== undefined && text !== '') {
            socket.emit('message', text);
            this.inputHtmlElement.value = '';
        }
    }

    appendText(text, optColor) {
        optColor = optColor || '#FFF';
        let li = document.createElement('li');
        li.style.color = optColor;
        li.innerHTML = text;
        this.htmlElement.appendChild(li);
        this.htmlElement.scrollTop = li.offsetTop;
    }
}