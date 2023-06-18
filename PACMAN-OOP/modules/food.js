export class Food extends BoardItem {
    constructor(location, color) {
        super(location);
        this.color = color;
    }

    draw(center, context) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }

    makeNextMove(board, pacman)
    {
        this.location = this.location;
    }
}