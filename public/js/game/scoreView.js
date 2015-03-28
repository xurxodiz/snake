/**
 * Created by manland on 28/03/15.
 */
export class ScoreView {
    constructor(socket) {
        var scoreView = document.getElementById('js-score-view');
        var liByPlayerId = {};
        socket.on('allPlayers', function(players) {
            scoreView.innerHTML = '';
            players.forEach((player) => {
                var li = document.createElement('li');
                li.innerHTML = player.pseudo + ' ( ' + player.score + ')';
                li.style.color = player.color;
                liByPlayerId[player.id] = li;
                scoreView.appendChild(li);
            });
        });
        socket.on('newPlayer', function(player) {
            if(liByPlayerId[player.id] !== undefined) {
                liByPlayerId[player.id].innerHTML = player.pseudo + ' ( ' + player.score + ')';
            } else {
                var li = document.createElement('li');
                li.innerHTML = player.pseudo + ' ( ' + player.score + ')';
                li.style.color = player.color;
                liByPlayerId[player.id] = li;
                scoreView.appendChild(li);
            }
        });
        socket.on('scoreOf', function(player) {
            liByPlayerId[player.id].innerHTML = player.pseudo + ' ( ' + player.score + ')';
        });
        socket.on('userDisconnected', function(player) {
            scoreView.removeChild(liByPlayerId[player.id]);
        });
    }
}