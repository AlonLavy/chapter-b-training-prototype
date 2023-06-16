class Obstacle extends BoardItem {
    constructor(location) {
        super(location);
        this.color = color;
    }

    draw(center) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 60);
        context.fillStyle = this.color; //color
        context.fill();
    }
}