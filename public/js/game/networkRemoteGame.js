/**
 * Created by manland on 22/03/15.
 */

import {Game} from './game';
import {ScoreView} from './scoreView';
import {ConsoleView} from './consoleView';
import {connect as io} from 'socket.io-client';

export class NetworkRemoteGame {
    constructor(roomName) {
        let game;
        let socket = io();
        let myId = -1;

        var jsRoomFullHtmlElement = document.getElementById('js-room-full');

        if(localStorage.player === undefined) {
            window.location = 'index.html';
        }

        new ScoreView(socket);
        new ConsoleView(socket);

        socket.on('connect', () => {
            socket.emit('joinRoom', roomName, JSON.parse(localStorage.player));
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
                foodEatenCallback: (food, snake) => {
                    socket.emit('foodEaten', food.id, snake.id);
                },
                snakeDeadCallback: (snake, optAgainstSnake) => {
                    socket.emit('dead', snake.id, optAgainstSnake !== undefined ? optAgainstSnake.id : undefined);
                },
                snakeChangeDirectionCallback: (e) => {
                    socket.emit('changeDirection', {id: e.id, direction: e.direction, x: e.x, y: e.y});
                }
            };

            game = new Game(gameOptions);
            game.draw();

            var intervalId = setInterval(() => {
                if(game.isFinish) {
                    clearInterval(intervalId);
                    socket.emit('finish');
                }
            }, 30);

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
            jsRoomFullHtmlElement.style.display = 'inline-block';
        });

        socket.on('finish', () => {
            game.isFinish = true;
        });

        socket.on('addFood', (food) => {
            game.addFood(food);
        });
    }
}