/**
 * Created by manland on 27/03/15.
 */
export class PlayerConfig {
    constructor() {
        let inputPseudo = document.getElementById('js-player-pseudo');
        let inputColor = document.getElementById('js-player-color');
        let form = document.getElementById('js-player-form');

        if(localStorage.player !== undefined) {
            var player = JSON.parse(localStorage.player);
            inputPseudo.value = player.pseudo;
            inputColor.value = player.color;
        } else {
            localStorage.player = JSON.stringify({pseudo: inputPseudo.value, color: inputColor.value});
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            localStorage.player = JSON.stringify({pseudo: inputPseudo.value, color: inputColor.value});
        });
    }
}