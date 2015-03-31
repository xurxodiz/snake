/**
 * Created by manland on 30/03/15.
 */
export class ConsoleView {
    constructor(socket) {
        this.htmlElement = document.getElementById('js-console-view');
        let players = [];
        socket.on('foodEaten', (data) => {
            let {foodId, playerId} = data;
            if(playerId === undefined) {
                playerId = 'IA';
            }
            this.appendText(playerId + ' eat a food');
        });
        socket.on('dead', (playerId, optAgainstPlayerId) => {
            if(optAgainstPlayerId === undefined || optAgainstPlayerId === null) {
                this.appendText(playerId + ' dead (-1)');
            } else {
                this.appendText(optAgainstPlayerId + ' kill ' + playerId + ' (+1)');
            }
        });
        socket.on('newPlayer', (player) => {
            players.push(player);
            this.appendText(player.pseudo + ' join game as player!');
        });
        socket.on('newWatcher', (playerConfig) => {
            this.appendText(playerConfig.pseudo + ' join game as watcher!');
        });
    }

    appendText(text) {
        let li = document.createElement('li');
        li.innerHTML = text;
        if(this.htmlElement.innerHTML !== '') {
            this.htmlElement.insertBefore(li, this.htmlElement.children[0]);
        } else {
            this.htmlElement.appendChild(li);
        }
    }
}