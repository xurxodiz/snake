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
};

export class DrawableUtil {
    constructor(ctx) {
        this.ctx = ctx;
        this.gridImg = new Image();
        this.gridImg.src = '../images/trake_gridbg.png';
        this.bikeImg = new Image();
        this.bikeImg.src = '../images/trake_bike.png';
        this.iceImg = new Image();
        this.iceImg.src = '../images/trake_ice_30x30.png';
    }

    rect(color, x, y, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.closePath();
        this.ctx.fill();
    }
    grid(x, y, width, height) {
        this.ctx.fillStyle = this.ctx.createPattern(this.gridImg, "repeat");
        this.ctx.fillRect(0, 0, 300, 300);

        //this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    tail(color, x, y, width, height, direction) {
        this.ctx.beginPath();
        if(direction === 0 || direction === 2) {//left or right
            this.ctx.moveTo(x, y+(height/2));
            this.ctx.lineTo(x+width, y+(height/2));
        } else {//up or down
            this.ctx.moveTo(x+(width/2), y);
            this.ctx.lineTo(x+(width/2), y+height);
        }
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /*
    0 left
    1 up
    2 right
    3 down
    */
    
    tailcurved(color, x, y, width, height, directionfrom, directionto) {
        this.ctx.beginPath();
        if(directionfrom === 0) { // FROM left
            if (directionto === 1) {
                this.ctx.moveTo(x+width, y+(height/2));
                this.ctx.lineTo(x+(width/2), y);
            }else{
                this.ctx.moveTo(x+width, y+(height/2));
                this.ctx.lineTo(x+(width/2), y+height);
            }
        } else if(directionfrom === 2) { // FROM right
            if (directionto === 1) {
                this.ctx.moveTo(x, y+(height/2));
                this.ctx.lineTo(x+(width/2), y);
            }else{
                this.ctx.moveTo(x, y+(height/2));
                this.ctx.lineTo(x+(width/2), y+height);
            }
        } else if(directionfrom === 1) { // FROM up
            if (directionto === 0) {
                this.ctx.moveTo(x+(width/2), y+height);
                this.ctx.lineTo(x, y+(height/2));
            }else{
                this.ctx.moveTo(x+(width/2), y+height);
                this.ctx.lineTo(x+width, y+(height/2));
            }
        } else if(directionfrom === 3) { // FROM down
            if (directionto === 0) {
                this.ctx.moveTo(x+(width/2), y);
                this.ctx.lineTo(x, y+(height/2));
            }else{
                this.ctx.moveTo(x+(width/2), y);
                this.ctx.lineTo(x+width, y+(height/2));
            }
        }
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    circle(color, x, y, radius) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    ice(x, y) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.drawImage(this.iceImg, -15, -15, 30, 30);
        this.ctx.restore();
    }

    bike(color, x, y, angle) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.translate(5, 5);
        this.ctx.fillStyle = color;
        this.ctx.rotate(angleToDegrees(angle) * Math.PI/180);
        this.ctx.fillRect(-5, -28, 10, 33);
        this.ctx.drawImage(this.bikeImg, -5, -28, 10, 33);
        this.ctx.restore();
    }
}