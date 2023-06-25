import { BoardItem } from "./boardItem.js";

export class Food extends BoardItem {
    constructor(location, color) {
        super(location);
        this.color = color;
        this.points = 1;
    }

    draw(context, keysDown) {
        context.beginPath();
        context.rect(this.center.x - 30, this.center.y - 30, 60, 60);
        context.fillStyle = CONSTANTS.colorPalette.backgroundColor; //color
        context.fill();

        context.beginPath();
        context.arc(this.center.x, this.center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }

    makeNextMove(board, pacman)
    {
        this.location = this.location;
    }
}