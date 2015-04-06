/**
 * Created by manland on 06/04/15.
 */
export class MathUtil {
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}