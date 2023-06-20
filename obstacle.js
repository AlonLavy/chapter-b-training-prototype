import { BoardItem } from "./boardItem.js";

export class Obstacle extends BoardItem {
    constructor(location, color) {
        super(location);
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.center.x - 30, this.center.y - 30, 60, 60);
        context.fillStyle = this.color; //color
        context.fill();
    }

    makeNextMove(board, pacman)
    {
        this.location = this.location;
    }
}