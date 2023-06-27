import { BoardItem } from "./boardItem.js";

const context = canvas.getContext("2d");
export class Food extends BoardItem {
    constructor(location, color) {
        super(location);
        this.color = color;
        this.points = 1;
    }

    draw() {
        context.beginPath();
        context.arc(this.center.x, this.center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }

    makeNextMove(_, __)
    {
        return;
    }
}