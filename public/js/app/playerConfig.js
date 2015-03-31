/**
 * Created by manland on 27/03/15.
 */

export class PlayerConfig {
    constructor() {
        let inputPseudo = document.getElementById('js-player-pseudo');
        let colorbike = document.getElementById('js-player-colorbike');

        if(localStorage.player !== undefined) {
            var player = JSON.parse(localStorage.player);
            inputPseudo.value = player.pseudo;
            colorbike.style.backgroundColor = player.color;
        } else {
            this.saveConf(inputPseudo.value, colorbike.style.backgroundColor);
        }

        inputPseudo.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            this.saveConf(inputPseudo.value, colorbike.style.backgroundColor);
        });
    };

    saveConf(pseudo, color) {
        localStorage.player = JSON.stringify({pseudo: pseudo, color: color});
    };
}