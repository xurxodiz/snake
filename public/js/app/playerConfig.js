/**
 * Created by manland on 27/03/15.
 */

export class PlayerConfig {
    constructor() {
        let inputPseudo = document.getElementById('js-player-pseudo');
        let inputColor = document.getElementById('js-player-colorinput');
        let colorbike = document.getElementById('js-player-colorbike');
        let form = document.getElementById('js-player-form');

        if(localStorage.player !== undefined) {
            var player = JSON.parse(localStorage.player);
            inputPseudo.value = player.pseudo;
            inputColor.value = player.color;
            this.updateColorBike(player.color);
        } else {
            localStorage.player = JSON.stringify({pseudo: inputPseudo.value, color: inputColor.value});
        }

        inputColor.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            this.saveConf(inputPseudo.value, inputColor.value);
            this.updateColorBike(inputColor.value);
        });

        inputPseudo.addEventListener('change', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            this.saveConf(inputPseudo.value, inputColor.value);
        });
    };

    saveConf(pseudo, color) {
        localStorage.player = JSON.stringify({pseudo: pseudo, color: color});
    };
    updateColorBike(color) {
        let colorbike = document.getElementById('js-player-colorbike');
        colorbike.style.backgroundColor = color;
    };

}