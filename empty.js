import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";

const context = canvas.getContext("2d");
export class Empty extends BoardItem {
  constructor(location) {
    super(location);
    this.value = 0;
  }

  draw() {
    super.realignCenter();
    context.beginPath();
    context.rect(this.center.x - 30, this.center.y - 30, 60, 60);
    context.fillStyle = CONSTANTS.colorPalette.backgroundColor;
    context.fill();
  }

  makeNextMove(_, __) {
    return;
  }
}
