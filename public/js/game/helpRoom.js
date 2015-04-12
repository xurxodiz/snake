/**
 * Created by manland on 12/04/15.
 */

import {Game} from './game';
import {IA as iaConfig, CONFIG as objectConfig} from '../../../shared/entityCst';
import {ConsoleView} from './consoleView';
import {ScoreView} from './scoreView';

/**
 * Fake room to take snapshot for helpView
 * To view this room go on : http://127.0.0.1:3000/game.html?h#h
 */
export class HelpRoom {
    static build() {
        let playerPseudo = 'Me';
        let playerColor = '#0FF000';

        document.getElementById('js-start-in-seconds').style.display = 'none';

        let game = new Game({
            snakeInitSize: 10,
            infiniteWallSize: true,
            controllers: [
                {id: 1, type: 'IAController', color: iaConfig.color, pseudo: 'I@1'},
                {id: 2, type: 'IAController', color: iaConfig.color, pseudo: 'I@2'},
                {id: 3, type: 'KeyboardController', color: playerColor, pseudo: playerPseudo}
            ],
            callbacks: {
                gameFinishCallback: function() {}
            }
        });

        game.addObject(objectConfig.OBJECT.FOOD.build(1));
        game.addObject(objectConfig.OBJECT.BOMB.build(2));
        game.addObject(objectConfig.OBJECT.ICE.build(3));
        game.addObject(objectConfig.OBJECT.PORTAL.build(4));

        new ConsoleView({
            on: (evt, cb) => {
                if(evt === 'newPlayer') {
                    cb({pseudo: playerPseudo, color: playerColor})
                }
            },
            emit: (evt, cb) => {}
        }, (playerId) => {
            return {};
        });

        new ScoreView({
            on: (evt, cb) => {
                if(evt === 'newPlayer') {
                    cb({pseudo: playerPseudo, color: playerColor, score: 10})
                }
            }
        });

        game.draw();
    }
}