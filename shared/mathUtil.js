/**
 * Created by manland on 06/04/15.
 */

module.exports.MathUtil = {
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};