/**
 * Created by manland on 21/03/15.
 */

var angleToDegrees = function(angle) {
    let degrees = 0;
    switch (angle) {
        case 0:
            degrees = -90;
            break;
        case 1:
            degrees = 0;
            break;
        case 2:
            degrees = 90;
            break;
        case 3:
            degrees = 180;
            break;
        default:
            degrees = 0;
    }
    return degrees;
}

export class DrawableUtil {
    constructor(ctx) {
        this.ctx = ctx;
    }

    rect(color, x, y, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    tail(color, x, y, width, height, angle) {
        this.ctx.save();
        let gradient;
        if(angle === 0 || angle === 2) {//left or right
            gradient = this.ctx.createLinearGradient(x, y, x, y + 10);
        } else {//up or down
            gradient = this.ctx.createLinearGradient(x, y, x + 10, y);
        }
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.3, "transparent");
        gradient.addColorStop(0.4, color);//"#9bdcd8");
        gradient.addColorStop(0.6, color);//"#9bdcd8");
        gradient.addColorStop(0.7, "transparent");
        gradient.addColorStop(1, "transparent");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.restore();
    }

    circle(color, x, y, radius) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    /*
    0 left
    1 up
    2 right
    3 bottom
    */
    bike(x, y, angle) {
        let img = new Image();
        img.src = '../images/trake_bike.png';

        this.ctx.save();

        this.ctx.translate(x, y);
        this.ctx.translate(5, 5);

        this.ctx.rotate(angleToDegrees(angle) * Math.PI/180);

        this.ctx.drawImage(img, -5, -28, 10, 33);

        this.ctx.restore();
    }
}