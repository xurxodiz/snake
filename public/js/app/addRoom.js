/**
 * Created by manland on 24/03/15.
 */
export class AddRoom {
    constructor(socket) {
        let inputName = document.getElementById('js-add-room-name');
        let inputNbPlayers = document.getElementById('js-add-room-nb-players');
        let checkboxInfiniteWallSize = document.getElementById('js-add-room-infinite-wall');
        let form = document.getElementById('js-add-room-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            socket.emit('addRoom', {
                name: inputName.value,
                nbPlayers: parseInt(inputNbPlayers.value),
                infiniteWallSize: checkboxInfiniteWallSize.checked
            });
            inputName.value = '';
        });
    }
}