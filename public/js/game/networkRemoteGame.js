/**
 * Created by manland on 22/03/15.
 */

import {Game} from './game';
import {ScoreView} from './scoreView';
import {ConsoleView} from './consoleView';
import {connect as io} from 'socket.io-client';

export class NetworkRemoteGame {
    constructor(roomName, watchRoom) {
        let game;
        let socket = io();
        let myId = -1;

        var jsRoomFullHtmlElement = document.getElementById('js-room-full');
        var showWatcherSpan = function() {
            jsRoomFullHtmlElement.style.display = 'block';
        };

        if(localStorage.player === undefined) {
            window.location = 'index.html';
        }

        new ScoreView(socket);
        new ConsoleView(socket, (playerId) => {
            for(let entity of game.gameBoard.entities) {
                if(entity.id === playerId) {
                    return entity;
                }
            }
        });

        socket.on('connect', () => {
            if(watchRoom === false) {
                socket.emit('joinRoom', roomName, JSON.parse(localStorage.player));
            } else {
                socket.emit('watchRoom', roomName, JSON.parse(localStorage.player));
                showWatcherSpan();
            }
        });

        socket.on('roomNotFound', () => {
            window.alert('Room not exist !');
        });

        var initGame = function(gameOptions) {
            gameOptions.controllers.forEach((controller) => {
                if(controller.id === myId) {
                    controller.type = 'KeyboardController';
                } else if(controller.type === 'KeyboardController') {
                    controller.type = 'RemoteNetworkController';
                }
            });
            gameOptions.callbacks = {
                objectEatenCallback: (food, snake) => {
                    socket.emit('objectEaten', food.id, snake.id);
                },
                snakeDeadCallback: (snake, optAgainstSnake) => {
                    socket.emit('dead', snake.id, optAgainstSnake !== undefined ? optAgainstSnake.id : undefined);
                },
                snakeChangeDirectionCallback: (e) => {
                    socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                },
                gameFinishCallback: () => {
                    socket.emit('finish');
                }
            };

            game = new Game(gameOptions);
            game.draw();

            game.gameBoard.entities.forEach((e) => {
                if (e.isLocal) {
                    socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                }
            });
        };

        socket.on('roomGame', (gameOptions) => {
            gameOptions.controllers.forEach((controller) => {
                if(controller.type === 'KeyboardController') {
                    myId = controller.id;
                }
            });
            initGame(gameOptions);
        });

        socket.on('start', () => {
            game.gameBoard.entities.forEach((e) => {
                if (e.isLocal) {
                    socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                }
            });
            game.run();
        });

        socket.on('restart', () => {
            game.destroy();
        });

        socket.on('roomFull', () => {
            showWatcherSpan();
        });

        socket.on('finish', () => {
            game.isFinish = true;
        });

        socket.on('addObject', (object) => {
            game.addObject(object);
        });
    }
}