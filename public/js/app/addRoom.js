/**
 * Created by manland on 24/03/15.
 */
export class AddRoom {
    constructor(socket) {
        let btnaddform = document.getElementById('js-addroom');
        let btnaddformbtn = document.getElementById('js-addroom-btn');
        let sectionaddform = document.getElementById('js-addroomform');

        let inputName = document.getElementById('js-addroomform-name');
        let inputNbPlayers = document.getElementById('js-addroomform-nb-players');
        let checkboxInfiniteWallSize = document.getElementById('js-addroomform-infinite-wall');
        let form = document.getElementById('js-addroomform-form');

        btnaddformbtn.addEventListener('click', (event) => {
            sectionaddform.style.height = '90px';
            btnaddform.style.padding = '0px';
            btnaddform.style.height = '0px';
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            socket.emit('addRoom', {
                name: inputName.value,
                nbPlayers: parseInt(inputNbPlayers.value),
                infiniteWallSize: checkboxInfiniteWallSize.checked
            });
            window.location = 'game.html#' + inputName.value;
            inputName.value = '';
        });

    }
}