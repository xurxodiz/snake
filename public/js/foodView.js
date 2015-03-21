/**
 * Created by manland on 21/03/15.
 */
export class FoodView {
    constructor(food, drawableUtil) {
        this.food = food;
        this.drawableUtil = drawableUtil;
    }

    draw() {
        this.drawableUtil.circle("#FF0000", this.food.x+this.food.r, this.food.y+this.food.r, this.food.r);
    }
}