/**
 * Created by manland on 21/03/15.
 */
export class Snake {

    constructor(game) {
        this.dx = 10;
        this.dy = 10;
        this.game = game;
        this.positions = [{x: this.game.width / 2, y: this.game.height / 2}];
    }

    isInCollisionWith(position) {
        var {x, y} = position;
        // are we out of the playground?
        if (x < 0 || x > this.game.width - 1 || y < 0 || y > this.game.height - 1) {
            return true;
        }
        // are we eating ourselves?
        for (var i = 0; i < this.positions.length; i++) {
            if (this.positions[i].x == x && this.positions[i].y == y) {
                return true;
            }
        }
        return false;
    }

    meal(position, food) {
        var {x, y} = position;
        return (x == food.x && y == food.y);
    }

    move(direction, food) {
        var {x, y} = this.positions[0]; // peek head

        // create new head relative to current head
        var n = {x: -1, y: -1};
        switch (direction) {
            case 0: // left
                n.x = x - this.dx;
                n.y = y;
                break;
            case 1: // up
                n.x = x;
                n.y = y - this.dy;
                break;
            case 2: // right
                n.x = x + this.dx;
                n.y = y;
                break;
            case 3: // down
                n.x = x;
                n.y = y + this.dy;
                break;
        }

        // if out of box or collision with ourselves, we die
        if (this.isInCollisionWith(n)) {
            return false;
        }

        this.positions.unshift(n);

        // if there's food there
        if (this.meal(n, food)) {
            this.game.newfood(); // we eat it and another shows up
        } else {
            this.positions.pop();
            // we only remove the tail if there wasn't food
            // if there was food, the snake grew
        }

        return true;
    }

}