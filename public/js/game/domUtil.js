/**
 * Created by manland on 06/04/15.
 */

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

export class DomUtil {
    static onTabVisibilityChange(callback) {
        onTabVisibilityChangeCallbacks.push(callback);
    }


}