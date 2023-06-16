class Ghost extends BoardItem {
    constructor(location, color, losePoints, livesTaken) {
        super(location);
        this.losePoints = losePoints;
        this.livesTaken - livesTaken;
        this.color = color;
    }

    draw(center) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }
}