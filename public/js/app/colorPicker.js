/**
 * Created by undless on 30/03/15.
 */

export class ColorPicker {
    constructor() {
        let colorbike = document.getElementById('js-player-colorbike');
        let colorpicker = document.getElementById('js-player-colorpicker');

        colorbike.addEventListener('click', (event) => {
            colorpicker.classList.toggle('player-colorpicker-visible');
        });

        colorpicker.addEventListener('click', (event) => {
            let selectedcolor = this.trackColor(event.clientX, event.clientY);
            let player = JSON.parse(localStorage.player);
            localStorage.player = JSON.stringify({pseudo: player.pseudo, color: selectedcolor});
        });
        colorpicker.addEventListener('mousemove', (event) => {
            this.trackColor(event.clientX, event.clientY);
        });
    }

    trackColor(x, y) {
        let colorpicker = document.getElementById('js-player-colorpicker');
        let colorpickeroffset = this.getGlobalOffset(colorpicker);
        let colorX = x - colorpickeroffset.left;

        if (colorX < 0) { // RaZ si dépasse les bornes
            colorX = 0;
        }else if (colorX > 300) {
            colorX = 300;
        }

        let r=0, g=0, b=0;

        if(colorX <= 50) // 1/6 (50px)
        {
            r=255;
            g=0;
            b=Math.round(colorX*255/50);
        }
        else if(colorX <= 100) // 2/6 (100px)
        {
            r=Math.round(255 - (colorX - 50) * 255/50);
            g=0;
            b=255;
        }
        else if(colorX <= 150) // 3/6 (150px)
        {
            r=0;
            g=Math.round( (colorX - 100) * 255/50);
            b=255;
        }
        else if(colorX <= 200) // 4/6 (200px)
        {
            r=0;
            g=255;
            b=Math.round(255 - (colorX - 150) *255/50);
        }
        else if(colorX <= 250) // 5/6 (250px)
        {
            r=Math.round((colorX - 200) * 255/50);
            g=255;
            b=0;
        }
        else if(colorX <= 300) // 6/6 (300px)
        {
            r=255;
            g=Math.round(255 - (colorX - 250) * 255/50);
            b=0;
        }

        let colorbike = document.getElementById('js-player-colorbike');
        colorbike.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
        return( 'rgb('+r+','+g+','+b+')' );
    };


    getGlobalOffset(el) {
        let x = 0, y = 0, maxWhile = 10000;
        while (el && maxWhile > 0) {
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
            maxWhile = maxWhile - 1;
        }
        return { left: x, top: y };
    }
}


