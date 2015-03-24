/**
 * Created by manland on 24/03/15.
 */
export class Dj {
    constructor() {
        var music = document.getElementById('musicplease');
        var musicSwitch = document.getElementById('musicSwitch');
        if(!localStorage.muteMusic) {
            music.play();
        } else {
            musicSwitch.classList.toggle('icon-volume');
            musicSwitch.classList.toggle('icon-mute');
        }

        musicSwitch.addEventListener('click', function() {
            if (musicSwitch.classList.contains('icon-volume')) {
                music.pause();
                localStorage.muteMusic = true;
            } else {
                music.play();
                localStorage.muteMusic = false;
            }
            musicSwitch.classList.toggle('icon-volume');
            musicSwitch.classList.toggle('icon-mute');
        }, false);
    }
}