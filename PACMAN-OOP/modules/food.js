export class Food extends BoardItem {
    constructor(location, color, value) {
        super(location);
        this.value = value;
        this.color = color;
    }

    draw(center, context) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }
}