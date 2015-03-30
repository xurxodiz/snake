/**
 * Created by undless on 30/03/15.
 */

export class ColorPicker {
    constructor() {
        
        let colorbike = document.getElementById('js-player-colorbike');
        let colorpicker = document.getElementById('js-player-colorpicker');
        let colorinput = document.getElementById('js-player-colorinput');

        colorbike.addEventListener('click', (event) => {
            console.log('click on bike');
            colorpicker.classList.toggle('player-colorpicker-visible');
        });

        colorpicker.addEventListener('mousedown', (event) => {
            this.plop();
        });
        colorpicker.addEventListener('mousemove', (event) => {
            this.plop();
        });
    }

    plop() {
        let test = document.getElementById('js-player-colorinput');
        console.log('select color');
        /*
        test.value = "#888888";
        test.onchange();
        */
    };
}