/**
 * Created by manland on 30/03/15.
 */
export class ConsoleView {
    constructor(socket, getPlayerById) {
        this.htmlElement = document.getElementById('js-console-view');

        socket.on('objectEaten', (data) => {
            let player = getPlayerById(data.playerId) || {pseudo: data.playerId, color: undefined};
            this.appendText(player.pseudo + ' eat a ' + data.type, player.color);
        });
        socket.on('dead', (playerId, optAgainstPlayerId) => {
            let player = getPlayerById(playerId) || {pseudo: playerId, color: undefined};
            if(optAgainstPlayerId === undefined || optAgainstPlayerId === null) {
                this.appendText(player.pseudo + ' dead (-1)', player.color);
            } else if(playerId === optAgainstPlayerId) {
                this.appendText(player.pseudo + ' kill himself (-1)', player.color);
            } else {
                let playerAgainst = getPlayerById(optAgainstPlayerId) || {pseudo: optAgainstPlayerId, color: undefined};
                this.appendText(playerAgainst.pseudo + ' kill ' + player.pseudo + ' (+1)', playerAgainst.color);
            }
        });
        socket.on('newPlayer', (player) => {
            this.appendText(player.pseudo + ' join game as player!', player.color);
        });
        socket.on('newWatcher', (playerConfig) => {
            this.appendText(playerConfig.pseudo + ' join game as watcher!', playerConfig.color);
        });
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