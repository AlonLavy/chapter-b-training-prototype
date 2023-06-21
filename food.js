export class Food extends BoardItem {
    constructor(location, color) {
        super(location);
        this.color = color;
    }

    draw(context, keysDown) {
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