import {DomUtil} from '../domUtil';

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    FirefoxOs: function() {
        return (!!(navigator.mozApps) && navigator.userAgent.search('Mobile') !== -1);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.FirefoxOs());
    }
};

export class KeyboardController {
    constructor(snake) {
        this.snake = snake;
        document.onkeypress = this.onKeyDown.bind(this);
        document.onkeydown = this.onKeyDown.bind(this);
        this.htmlToRemove = [];
        if(isMobile.any() && ('ontouchstart' in window || navigator.msMaxTouchPoints)) {
            this.htmlToRemove.push(DomUtil.buildTouchButton('leftRightButton', ['icon-arrow-left', 'icon-arrow-right'], document.body, this.onLeftRight.bind(this)));
            this.htmlToRemove.push(DomUtil.buildTouchButton('topBottomButton', ['icon-arrow-up', 'icon-arrow-down'], document.body, this.onTopBottom.bind(this)));
        }
    }

    onKeyDown (evt) {
        if(evt.target === document.body) {
            let newdir = evt.keyCode - 37;

            // only lateral turns are allowed
            // (that is, no u-turns)
            if (newdir != this.snake.direction && newdir != this.snake.direction + 2 && newdir != this.snake.direction - 2) {
                this.snake.changeDirection(newdir);
            }
        }
    }

    onLeftRight(evt) {
        let newdir;
        if(evt.insideX < evt.width/2) {
            newdir = 0;//left
        } else {
            newdir = 2;//right
        }
        if (newdir != this.snake.direction && newdir != this.snake.direction + 2 && newdir != this.snake.direction - 2) {
            this.snake.changeDirection(newdir);
        }
    }

    onTopBottom(evt) {
        let newdir;
        if(evt.insideY < evt.height/2) {
            newdir = 1;//top
        } else {
            newdir = 3;//bottom
        }
        if (newdir != this.snake.direction && newdir != this.snake.direction + 2 && newdir != this.snake.direction - 2) {
            this.snake.changeDirection(newdir);
        }
    }

    destroy() {
        document.onkeypress = undefined;
        document.onkeydown = undefined;
        this.snake = undefined;
        this.htmlToRemove.forEach((e) => {
            e.destroy();
        });
    }
}