var onTabVisibilityChangeCallbacks = [];

(function() {
    let hidden, visibilityChange;
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            onTabVisibilityChangeCallbacks.forEach((cb) => {
                cb({visible: false});
            });
        } else {
            onTabVisibilityChangeCallbacks.forEach((cb) => {
                cb({visible: true});
            });
        }
    }

    document.addEventListener(visibilityChange, handleVisibilityChange.bind(this), false);
})();

var buildBound = function(e) {
    e.preventDefault();
    var touch;
    if(e.changedTouches) {
        for(var i=0, len=e.changedTouches.length; i<len && touch === undefined; i++) {
            if(e.changedTouches[i].target === e.target) {
                touch = e.changedTouches[i];
            }
        }
    }
    var x = touch ? touch.clientX : e.clientX;
    var y = touch ? touch.clientY : e.clientY;
    var l = e.target.offsetLeft;
    var t = e.target.offsetTop;
    return {
        originalEvent: e,
        x: x,
        y: y,
        height: e.target.offsetHeight,
        width: e.target.offsetWidth,
        top: t,
        left: l,
        insideX: x - l,
        insideY: y - t
    };
};

export class DomUtil {
    static onTabVisibilityChange(callback) {
        onTabVisibilityChangeCallbacks.push(callback);
    }

    static buildTouchButton(className, container, onTouch) {
        var div = document.createElement('div');
        div.classList.add(className);
        var _handleStart = function(e) {
            if(e.target === div) {
                onTouch(buildBound(e));
            }
        };
        div.addEventListener('touchstart', _handleStart, false);
        div.addEventListener('mousedown', _handleStart, false);
        container.appendChild(div);
        return {
            div: div,
            destroy: () => {
                div.removeEventListener('touchstart', _handleStart);
                div.removeEventListener('mousedown', _handleStart);
                container.removeChild(div);
            }
        };
    }
}