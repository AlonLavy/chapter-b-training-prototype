import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";

export class Empty extends BoardItem{
    constructor(location)
    {
        super(location);
        this.value = 0;
    }

    draw(context, keysDown)
    {
        super.realignCenter();
        context.beginPath();
        context.rect(this.center.x - 30, this.center.y - 30, 60, 60);
        context.fillStyle = CONSTANTS.colorPalette.backgroundColor; //color
        context.fill();
    }

    makeNextMove(board, pacman)
    {
        1 + 1 == 2;
    }
}